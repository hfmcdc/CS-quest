import type { EqSpec } from "../types";
import { EqParseError, buildTable, compile, parseSide, substitutedLiterals, varsOf, type Env, type Fn, type Node, type SymbolTable } from "./expr";

/**
 * Equation checking by numerical equivalence.
 *
 * A question declares a small system of model relations, e.g. [["V","I*R"],["P","V*I"]].
 * Independent variables (never a subject) are sampled at random; the subjects are computed from the model.
 * A student's equation is accepted if it holds, within tolerance, at every sample point. So any correct
 * rearrangement or substitution is accepted ("P = I^2 R", "R = P/I^2", "P = V^2/R"), while a wrong relation fails.
 *
 * The checker never says "incorrect" for something it could not read: unknown symbols and syntax problems
 * come back as "uncertain" so the UI shows the model equation for manual comparison instead.
 */

export type EqStatus = "correct" | "incorrect" | "uncertain";
export interface EqResult { status: EqStatus; message: string }

const TRIALS = 10;
const REL_TOL = 0.012;

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const ANGLE_NAMES = new Set(["theta", "phi", "alpha", "beta", "psi", "delta", "gamma"]);

function closeEnough(a: number, b: number): boolean {
  if (!Number.isFinite(a) || !Number.isFinite(b)) return false;
  return Math.abs(a - b) <= REL_TOL * Math.max(Math.abs(a), Math.abs(b)) + 1e-300;
}

interface Model { subjects: string[]; fns: Fn[]; independent: string[] }

function compileModel(rels: [string, string][], table: SymbolTable, symbols: string[]): Model {
  const subjects = rels.map((r) => r[0]);
  const fns = rels.map((r) => compile(parseSide(r[1], table, false)));
  const independent = symbols.filter((s) => !subjects.includes(s));
  return { subjects, fns, independent };
}

/** Build the environment for one sampling trial, or null if the model gives a non-finite value. */
function sample(model: Model, spec: EqSpec, rnd: () => number): Env | null {
  for (let attempt = 0; attempt < 40; attempt++) {
    const env: Env = { ...spec.consts };
    for (const name of model.independent) {
      const r = spec.ranges?.[name] ?? (ANGLE_NAMES.has(name) ? [0.25, 1.15] : [0.5, 4]);
      env[name] = r[0] + (r[1] - r[0]) * rnd();
    }
    let ok = true;
    model.subjects.forEach((s, i) => {
      const v = model.fns[i](env);
      if (!Number.isFinite(v)) ok = false;
      env[s] = v;
    });
    if (ok) return env;
  }
  return null;
}

interface Parsed { sides: Fn[]; nodes: Node[] }

/** Split "a = b = c" on single "=" signs. */
function splitEquals(s: string): string[] {
  const parts: string[] = [];
  let cur = "";
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    const p = s[i - 1];
    const n = s[i + 1];
    if (c === "=" && p !== "<" && p !== ">" && p !== "!" && p !== "=" && n !== "=") { parts.push(cur); cur = ""; } else cur += c;
  }
  parts.push(cur);
  return parts;
}

function parseStatement(stmt: string, table: SymbolTable, target: string, tight: boolean): Parsed {
  const parts = splitEquals(stmt).map((p) => p.trim());
  if (parts.some((p) => p === "")) throw new EqParseError("An equation needs something on both sides of the equals sign.");
  const nodes: Node[] = parts.map((p) => parseSide(p, table, tight));
  if (parts.length === 1) {
    // Just an expression: treat it as "target = expression".
    nodes.unshift({ t: "var", name: target });
  }
  return { sides: nodes.map(compile), nodes };
}

function holds(p: Parsed, env: Env): boolean {
  const vals = p.sides.map((f) => f(env));
  for (let i = 0; i + 1 < vals.length; i++) if (!closeEnough(vals[i], vals[i + 1])) return false;
  return true;
}

function holdsOnAll(p: Parsed, model: Model, spec: EqSpec, seed: number): boolean | null {
  const rnd = mulberry32(seed);
  let n = 0;
  for (let t = 0; t < TRIALS; t++) {
    const env = sample(model, spec, rnd);
    if (!env) continue;
    n++;
    if (!holds(p, env)) return false;
  }
  return n >= TRIALS / 2 ? true : null;
}

/** An equation such as "F = F" or "2F = F + F" is always true and says nothing about physics. */
function isIdentity(p: Parsed, model: Model, spec: EqSpec, mustInclude: string[]): boolean {
  const rnd = mulberry32(99);
  const env = sample(model, spec, rnd);
  if (!env) return false;
  for (const name of mustInclude) {
    const bumped: Env = { ...env, [name]: env[name] * 1.37 };
    if (!holds(p, bumped)) return false; // changing the quantity breaks the equation → it constrains it
  }
  return true;
}

export function checkEquation(input: string, spec: EqSpec): EqResult {
  const raw = input.trim();
  if (!raw) return { status: "uncertain", message: "Type the main equation you used." };

  const hasLog = spec.rels.some((r) => /\b(exp|ln)\s*\(/.test(r[1]));
  const names = [...spec.symbols, ...Object.keys(spec.consts)];
  const table = buildTable(names, spec.aka, hasLog ? ["exp", "ln"] : []);
  const model = compileModel(spec.rels, table, spec.symbols);
  const mustInclude = spec.mustInclude ?? [spec.target];

  const statements = raw.split(/[;\n]+/).map((x) => x.trim()).filter(Boolean);
  let unreadable: EqParseError | null = null;
  let sawTrivial = false;
  let sawNoTarget = false;
  let substituted = false;

  for (const stmt of statements) {
    let variants: Parsed[] = [];
    try {
      const a = parseStatement(stmt, table, spec.target, false);
      variants = [a];
      // "1/2pi sqrt(LC)": also read implicit multiplication as binding tighter than "/".
      const b = parseStatement(stmt, table, spec.target, true);
      variants.push(b);
    } catch (e) {
      if (e instanceof EqParseError) { if (!variants.length) { unreadable = unreadable ?? e; continue; } } else throw e;
    }
    for (const v of variants) {
      const used = new Set<string>();
      v.nodes.forEach((n) => varsOf(n, used));
      const hit = mustInclude.filter((m) => used.has(m));
      if (!hit.length) { sawNoTarget = true; continue; }
      const ok = holdsOnAll(v, model, spec, 12345);
      if (ok === null) return { status: "uncertain", message: "I couldn't test that equation reliably. Compare it with the model equation below." };
      if (ok) {
        if (isIdentity(v, model, spec, hit)) { sawTrivial = true; continue; }
        return { status: "correct", message: "Your equation is equivalent to the model equation (checked numerically; rearrangements are accepted)." };
      }
    }

    // Accept an equation written with the question's numbers substituted, e.g. F = 9e9 × 3e-6 × 5e-6 / 0.3^2
    for (const v of variants) {
      const used = new Set<string>();
      v.nodes.forEach((n) => varsOf(n, used));
      if (!mustInclude.some((m) => used.has(m))) continue;
      const lits = v.nodes.reduce((acc, n) => acc + substitutedLiterals(n), 0);
      const others = [...used].filter((u) => !mustInclude.includes(u)).length;
      if (lits + others < 2) continue;
      if (holds(v, { ...spec.consts, ...spec.actual })) { substituted = true; }
    }
  }

  if (substituted) {
    return { status: "correct", message: "Your equation holds with the given values substituted. Remember to write the formula in symbols first in an exam." };
  }

  if (unreadable && !sawTrivial) {
    const msg = unreadable.kind === "unknown-symbol"
      ? `I couldn't read “${unreadable.token}” in your equation, so I can't check it automatically. Compare it with the model equation below.`
      : "I couldn't read that as an equation, so I can't check it automatically. Compare it with the model equation below.";
    return { status: "uncertain", message: msg };
  }
  if (sawTrivial) return { status: "incorrect", message: "That equation is always true, so it doesn't use any physics. Write the relation between the quantities." };
  if (sawNoTarget) {
    return { status: "incorrect", message: `Your equation should involve ${mustInclude.join(" or ")}, the quantity asked for.` };
  }

  // a known slip with a targeted message?
  for (const trap of spec.traps ?? []) {
    const rels = spec.rels.map((r) => (r[0] === trap.rel[0] ? ([r[0], trap.rel[1]] as [string, string]) : r));
    try {
      const tModel = compileModel(rels, table, spec.symbols);
      for (const stmt of statements) {
        const p = parseStatement(stmt, table, spec.target, false);
        if (holdsOnAll(p, tModel, spec, 777) === true) return { status: "incorrect", message: trap.msg };
      }
    } catch { /* ignore */ }
  }
  return { status: "incorrect", message: "That equation does not match the relation needed here. Check each quantity and power, then compare with the model equation." };
}

/** The relation system as a self-test hook: does the model satisfy its own relations? Used by the verify script. */
export function modelHoldsItself(spec: EqSpec): boolean {
  const table = buildTable([...spec.symbols, ...Object.keys(spec.consts)], spec.aka, spec.rels.some((r) => /\b(exp|ln)\s*\(/.test(r[1])) ? ["exp", "ln"] : []);
  const model = compileModel(spec.rels, table, spec.symbols);
  const rnd = mulberry32(5);
  for (let i = 0; i < 6; i++) if (!sample(model, spec, rnd)) return false;
  return true;
}

/** Evaluate the model's final subject from SI values; used to cross-check calc() against the stated equation. */
export function evalModel(spec: EqSpec, values: Env): number {
  const table = buildTable([...spec.symbols, ...Object.keys(spec.consts)], spec.aka, spec.rels.some((r) => /\b(exp|ln)\s*\(/.test(r[1])) ? ["exp", "ln"] : []);
  const env: Env = { ...spec.consts, ...values };
  for (const [subject, rhs] of spec.rels) {
    env[subject] = compile(parseSide(rhs, table, false))(env);
  }
  return env[spec.target];
}
