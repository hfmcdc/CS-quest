import type { AnsSpec } from "../../physics/types";
import type { ChemCard, ChemChapterContent, ChemConceptQ, ChemLevel, ChemNumQ, ChemQuestion, ChemSection } from "../types";

/**
 * Chapter 3 · Chemical Kinetics (CBSE 2026-27, 7 marks).
 * Syllabus scope: rate of a chemical reaction, factors influencing rate, integrated rate equations (zero and first order),
 * temperature dependence of rate (Arrhenius), collision theory. Practicals are not covered here.
 * Every numerical answer is recomputed independently by `npm run verify:chemistry`.
 */

const q = (id: string, tag: string, level: ChemLevel, text: string, options: string[], ans: number, why: string, hint: string, steps?: string[], challenge?: boolean): ChemQuestion =>
  ({ id, tag, level, text, options, answer: options[ans], why, hint, ...(steps ? { steps } : {}), ...(challenge ? { challenge } : {}) });

const ar = (id: string, level: ChemLevel, a: string, r: string, ans: number, why: string, hint: string): ChemQuestion =>
  q(id, "Assertion–Reason", level, `Assertion (A): ${a}\nReason (R): ${r}`, AR_OPTIONS, ans, why, hint, undefined, true);

const AR_OPTIONS = [
  "Both A and R are true and R is the correct explanation of A.",
  "Both A and R are true but R is not the correct explanation of A.",
  "A is true but R is false.",
  "A is false but R is true.",
];

const sections: ChemSection[] = [
  {
    kind: "concepts",
    title: "Rate of a reaction",
    items: [
      { label: "Average rate", body: "Change in concentration of a reactant or product per unit time: rate = −Δ[R]/Δt = +Δ[P]/Δt. Unit: mol L⁻¹ s⁻¹ (or mol L⁻¹ min⁻¹)." },
      { label: "Instantaneous rate", body: "Rate at one moment of time: the slope of the tangent to the concentration–time curve, −d[R]/dt." },
      { label: "General reaction", body: "For aA + bB → cC + dD, rate = −(1/a)Δ[A]/Δt = −(1/b)Δ[B]/Δt = +(1/c)Δ[C]/Δt = +(1/d)Δ[D]/Δt. Dividing by the stoichiometric coefficient makes the rate the same for every species." },
      { label: "Factors", body: "Concentration of reactants, temperature, and presence of a catalyst." },
    ],
  },
  {
    kind: "concepts",
    title: "Rate law, order and molecularity",
    items: [
      { label: "Rate law", body: "rate = k[A]ˣ[B]ʸ. The exponents x and y are found by experiment. They need not equal the stoichiometric coefficients." },
      { label: "Order", body: "Sum of the exponents in the rate law (x + y). It can be zero, a whole number or a fraction." },
      { label: "Rate constant k", body: "Equals the rate when every concentration is 1 mol L⁻¹. Its unit depends on the order: (mol L⁻¹)¹⁻ⁿ s⁻¹. Zero order: mol L⁻¹ s⁻¹. First order: s⁻¹. Second order: L mol⁻¹ s⁻¹." },
      { label: "Molecularity", body: "Number of reacting species that collide simultaneously in an elementary reaction. It is always a whole number (1, 2, rarely 3) and is never zero or fractional. Order is found by experiment; molecularity is a theoretical idea." },
    ],
  },
  {
    kind: "table",
    title: "Zero order and first order at a glance",
    head: ["", "Zero order", "First order"],
    rows: [
      ["Rate law", "rate = k", "rate = k[R]"],
      ["Integrated equation", "[R] = −kt + [R]₀", "ln[R] = −kt + ln[R]₀"],
      ["Rate constant", "k = ([R]₀ − [R])/t", "k = (2.303/t) log([R]₀/[R])"],
      ["Straight-line plot", "[R] against t, slope = −k", "ln[R] against t, slope = −k"],
      ["Half-life", "t½ = [R]₀/2k", "t½ = 0.693/k (independent of [R]₀)"],
      ["Unit of k", "mol L⁻¹ s⁻¹", "s⁻¹"],
    ],
    note: "For a first-order reaction 75% completion takes two half-lives, and about 99.9% completion takes about ten.",
  },
  {
    kind: "concepts",
    title: "Temperature, Arrhenius equation and collision theory",
    items: [
      { label: "Arrhenius equation", body: "k = A e^(−Ea/RT). A is the pre-exponential (frequency) factor, Ea the activation energy in J mol⁻¹, R = 8.314 J mol⁻¹ K⁻¹. The factor e^(−Ea/RT) is the fraction of molecules with energy equal to or greater than Ea." },
      { label: "Log forms", body: "log k = log A − Ea/(2.303 RT). A plot of log k against 1/T is a straight line of slope −Ea/(2.303 R). Between two temperatures: log(k₂/k₁) = (Ea/2.303R)(1/T₁ − 1/T₂)." },
      { label: "Temperature effect", body: "For many reactions near room temperature the rate roughly doubles for a 10 K rise, because the fraction of molecules with energy ≥ Ea increases sharply." },
      { label: "Catalyst", body: "Gives an alternative pathway with lower Ea, so k increases. It does not change ΔH, ΔG or the equilibrium constant." },
      { label: "Collision theory", body: "Reaction needs collisions that are effective: the molecules must have energy ≥ threshold energy and the correct orientation. k = P Z e^(−Ea/RT), where P is the steric (probability) factor and Z the collision frequency. Ea = threshold energy − average energy of reactants." },
    ],
  },
  {
    kind: "mistakes",
    title: "Common mistakes",
    items: [
      { body: "Writing the rate law from the balanced equation. Orders come from experiment, except for an elementary step." },
      { body: "Using ln with 2.303: ln x = 2.303 log x. Use 2.303 only with log." },
      { body: "Putting temperature in °C in the Arrhenius equation. Always convert to kelvin." },
      { body: "Mixing units of Ea. If R = 8.314 J mol⁻¹ K⁻¹, Ea must be in J mol⁻¹ (convert kJ to J)." },
      { body: "Saying a catalyst changes ΔH or the equilibrium constant. It changes only the speed." },
    ],
  },
];

const card = (id: string, tag: string, front: string, back: string): ChemCard => ({ id, tag, front, back });

const cards: ChemCard[] = [
  card("kn-c1", "Rate of reaction", "Average rate of reaction", "Average rate = −Δ[R]/Δt = +Δ[P]/Δt\n\nΔ[R], Δ[P]: change in concentration (mol L⁻¹)\nΔt: time interval (s)\nUnit: mol L⁻¹ s⁻¹\nApplication: gives the mean speed over an interval."),
  card("kn-c2", "Rate of reaction", "Instantaneous rate", "Rate = −d[R]/dt = +d[P]/dt\n\nIt is the slope of the tangent to the concentration–time curve at that instant.\nUnit: mol L⁻¹ s⁻¹."),
  card("kn-c3", "Rate of reaction", "Rate for aA + bB → cC + dD", "Rate = −(1/a) Δ[A]/Δt = −(1/b) Δ[B]/Δt = (1/c) Δ[C]/Δt = (1/d) Δ[D]/Δt\n\nCondition: dividing by the stoichiometric coefficient gives one rate for the whole reaction.\nExample: 2N₂O₅ → 4NO₂ + O₂ has rate = −½ d[N₂O₅]/dt = ¼ d[NO₂]/dt."),
  card("kn-c4", "Rate law & order", "Rate law", "Rate = k[A]ˣ[B]ʸ\n\nk: rate constant\nx, y: orders with respect to A and B (found by experiment)\nCaution: x and y are not generally the stoichiometric coefficients."),
  card("kn-c5", "Rate law & order", "Order of a reaction", "Order = x + y (sum of exponents in the rate law)\n\nIt can be 0, a whole number or a fraction.\nZero order: rate is independent of concentration."),
  card("kn-c6", "Rate law & order", "Molecularity", "Number of reacting species colliding simultaneously in an elementary reaction.\n\nValues: 1 (unimolecular), 2 (bimolecular), rarely 3.\nNever zero or fractional. Order can be."),
  card("kn-c7", "Rate law & order", "Units of the rate constant k", "General: (mol L⁻¹)¹⁻ⁿ s⁻¹ for order n\n\nZero order: mol L⁻¹ s⁻¹\nFirst order: s⁻¹\nSecond order: L mol⁻¹ s⁻¹"),
  card("kn-c8", "Integrated rate equations", "Zero-order reaction: integrated rate equation", "[R] = [R]₀ − kt\nk = ([R]₀ − [R])/t\nt½ = [R]₀/2k\n\n[R]₀: initial concentration, [R]: concentration at time t\nPlot of [R] against t is a straight line with slope −k."),
  card("kn-c9", "Integrated rate equations", "First-order reaction: integrated rate equation", "ln[R] = −kt + ln[R]₀\nk = (2.303/t) log([R]₀/[R])\n\nPlot of ln[R] against t is a straight line with slope −k.\nUnit of k: s⁻¹ (or min⁻¹)."),
  card("kn-c10", "Integrated rate equations", "Half-life of a first-order reaction", "t½ = 0.693/k\n\nIndependent of the initial concentration.\nAfter 2 half-lives 75% is consumed; after 3, 87.5%."),
  card("kn-c11", "Integrated rate equations", "Half-life of a zero-order reaction", "t½ = [R]₀/2k\n\nDirectly proportional to the initial concentration."),
  card("kn-c12", "Arrhenius equation", "Arrhenius equation", "k = A e^(−Ea/RT)\n\nA: pre-exponential (frequency) factor, same unit as k\nEa: activation energy (J mol⁻¹)\nR = 8.314 J mol⁻¹ K⁻¹, T in kelvin\ne^(−Ea/RT): fraction of molecules with energy ≥ Ea."),
  card("kn-c13", "Arrhenius equation", "Logarithmic form of the Arrhenius equation", "log k = log A − Ea/(2.303 RT)\n\nPlot of log k against 1/T: straight line, slope = −Ea/(2.303 R), intercept = log A.\nPlot of ln k against 1/T has slope −Ea/R."),
  card("kn-c14", "Arrhenius equation", "Arrhenius equation at two temperatures", "log(k₂/k₁) = (Ea/2.303R)(1/T₁ − 1/T₂) = (Ea/2.303R)(T₂ − T₁)/(T₁T₂)\n\nk₁, k₂ at T₁, T₂ (kelvin)\nUse Ea in J mol⁻¹ with R = 8.314 J mol⁻¹ K⁻¹."),
  card("kn-c15", "Arrhenius equation", "Effect of a catalyst", "A catalyst provides an alternative path with lower activation energy, so k increases.\n\nUnchanged: ΔH, ΔG and the equilibrium constant."),
  card("kn-c16", "Collision theory", "Effective collision", "A collision that leads to products. It needs:\n1. energy ≥ threshold energy\n2. proper orientation of the molecules"),
  card("kn-c17", "Collision theory", "Activation energy and threshold energy", "Ea = threshold energy − average kinetic energy of the reactants\n\nEa is the minimum extra energy the reactant molecules need to reach the threshold energy."),
  card("kn-c18", "Collision theory", "Collision-theory rate constant", "k = P Z e^(−Ea/RT)\n\nZ: collision frequency\nP: probability (steric) factor, accounts for orientation\ne^(−Ea/RT): fraction of collisions with enough energy."),
  card("kn-c19", "Arrhenius equation", "Rule of thumb for temperature", "For many reactions near room temperature the rate roughly doubles for every 10 K rise.\n\nReason: the fraction of molecules with energy ≥ Ea increases sharply with T."),
];

const concept: ChemConceptQ[] = [
  { id: "kn-s1", tag: "Rate law & order", level: 1, q: "Define the order of a reaction. Can it be fractional?", groups: [["sum"], ["power", "exponent"], ["rate law", "rate expression", "rate equation"]],
    model: "The order is the sum of the powers (exponents) of the concentration terms in the experimentally determined rate law. Yes, it can be zero, a whole number or a fraction.", hint: "Think about the rate law rate = k[A]ˣ[B]ʸ. What do you do with x and y?" },
  { id: "kn-s2", tag: "Rate law & order", level: 2, q: "Why can the molecularity of a reaction never be zero or fractional?", groups: [["number of"], ["whole number", "integer", "cannot be zero", "can not be zero"]],
    model: "Molecularity is the number of reacting species that collide simultaneously in an elementary step. You cannot have zero or a fraction of a molecule colliding, so it must be a whole number.", hint: "What does molecularity count? Can you count half a molecule?" },
  { id: "kn-s3", tag: "Arrhenius equation", level: 2, q: "Why does the rate of a reaction increase with temperature?", groups: [["fraction", "more molecules", "number of molecules", "greater number", "larger number", "kinetic energy"], ["activation energy", "threshold", "effective collision"]],
    model: "On raising the temperature the fraction of molecules with energy equal to or greater than the activation energy (threshold energy) increases, so there are more effective collisions per second.", hint: "Think about the energy distribution of molecules and the activation energy." },
  { id: "kn-s4", tag: "Arrhenius equation", level: 2, q: "How does a catalyst increase the rate of a reaction?", groups: [["lower", "decrease", "reduce"], ["activation energy", "energy barrier"]],
    model: "A catalyst provides an alternative reaction path with a lower activation energy, so a larger fraction of molecules can react at the same temperature. It does not change ΔH or the equilibrium constant.", hint: "Which energy quantity does the catalyst change?" },
  { id: "kn-s5", tag: "Rate law & order", level: 1, q: "What is the unit of the rate constant for a first-order reaction?", groups: [["s-1", "per second", "time-1", "1/s", "min-1", "per minute", "per time", "h-1"]],
    model: "s⁻¹ (or min⁻¹, h⁻¹): for rate = k[R], dividing the unit of rate by the unit of concentration leaves only time⁻¹.", hint: "Divide the unit of rate by the unit of concentration.", reject: ["mol", "l mol", "dm3", "litre"] },
  { id: "kn-s6", tag: "Integrated rate equations", level: 2, q: "For a zero-order reaction, what graph gives a straight line and what is its slope?", groups: [["[r] against t", "[r] vs t", "[r] versus t", "concentration against time", "concentration vs time", "concentration versus time", "[a] against t", "[a] vs t"], ["-k", "negative k", "minus k"]],
    model: "A plot of concentration [R] against time t is a straight line with slope −k.", hint: "Use [R] = [R]₀ − kt and compare it with y = mx + c." },
  { id: "kn-s7", tag: "Integrated rate equations", level: 2, q: "Why is the half-life of a first-order reaction independent of the initial concentration?", groups: [["0.693", "ln 2", "ln2"], ["independent", "does not depend", "not depend", "no dependence", "doesn't depend"]],
    model: "For a first-order reaction t½ = 0.693/k. The expression contains only k, not [R]₀, so the half-life does not depend on the initial concentration.", hint: "Write the formula for t½ and see which quantities appear in it." },
  { id: "kn-s8", tag: "Collision theory", level: 2, q: "What is meant by an effective collision?", groups: [["threshold", "sufficient energy", "minimum energy", "activation energy", "enough energy"], ["orientation", "oriented"]],
    model: "An effective collision is one in which the colliding molecules have energy equal to or greater than the threshold energy and are properly oriented, so that products form.", hint: "Two conditions must both be met: one about energy and one about geometry." },
  { id: "kn-s9", tag: "Collision theory", level: 2, q: "Define activation energy.", groups: [["minimum", "least", "extra", "excess"], ["threshold", "average", "reactant", "react"]],
    model: "Activation energy is the minimum extra energy that the reactant molecules must acquire (above their average energy) to reach the threshold energy and form products: Ea = threshold energy − average energy of reactants.", hint: "It is an energy barrier. Between which two energies is it measured?" },
];

const R_NOTE = "Use R = 8.314 J mol⁻¹ K⁻¹ and 2.303 for ln 10.";
const num = (id: string, tag: string, level: ChemLevel, text: string, formulaOptions: string[], formulaAnswer: number, ans: AnsSpec, ansShow: string, steps: string[], hint: string): ChemNumQ =>
  ({ id, tag, level, text, formulaOptions, formulaAnswer, ans, ansShow, steps, hint });


const numerical: ChemNumQ[] = [
  num("kn-n1", "Integrated rate equations", 1, "A first-order reaction has k = 2.0 × 10⁻³ s⁻¹. Calculate its half-life.",
    ["$t_{1/2}=\\frac{0.693}{k}$", "$t_{1/2}=\\frac{[\\text{R}]_0}{2k}$", "$t_{1/2}=\\frac{1}{k[\\text{R}]_0}$", "$t_{1/2}=0.693\\,k$"], 0,
    { value: 346.5, dim: [0, 0, 1, 0, 0, 0, 0], unit: "s", tol: 0.01, needUnit: true },
    "$t_{1/2}=346.5\\ \\text{s}\\approx 347\\ \\text{s}$",
    ["Half-life of a first-order reaction: t½ = 0.693/k.", "t½ = 0.693 / (2.0 × 10⁻³ s⁻¹)", "t½ = 346.5 s ≈ 347 s"], "Which half-life formula has no concentration term?"),
  num("kn-n2", "Integrated rate equations", 1, "The half-life of a first-order reaction is 20 minutes. Calculate the rate constant in min⁻¹.",
    ["$k=\\frac{0.693}{t_{1/2}}$", "$k=\\frac{[\\text{R}]_0}{2\\,t_{1/2}}$", "$k=0.693\\,t_{1/2}$", "$k=\\frac{1}{t_{1/2}[\\text{R}]_0}$"], 0,
    { value: 0.03465 / 60, dim: [0, 0, -1, 0, 0, 0, 0], unit: "min^-1", tol: 0.01, needUnit: true },
    "$k=0.0347\\ \\text{min}^{-1}$",
    ["For first order, k = 0.693/t½.", "k = 0.693 / 20 min = 0.03465 min⁻¹ ≈ 3.47 × 10⁻² min⁻¹"], "Rearrange t½ = 0.693/k for k."),
  num("kn-n3", "Rate law & order", 1, "For a reaction with rate = k[A]², the concentration of A is tripled. By what factor does the rate change?",
    ["$\\frac{\\text{rate}_2}{\\text{rate}_1}=\\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^{2}$", "$\\frac{\\text{rate}_2}{\\text{rate}_1}=\\frac{[\\text{A}]_2}{[\\text{A}]_1}$", "$\\frac{\\text{rate}_2}{\\text{rate}_1}=\\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^{0}$", "$\\frac{\\text{rate}_2}{\\text{rate}_1}=2\\,\\frac{[\\text{A}]_2}{[\\text{A}]_1}$"], 0,
    { value: 9, dim: [0, 0, 0, 0, 0, 0, 0], unit: "", tol: 0.001, needUnit: false },
    "$\\frac{\\text{rate}_2}{\\text{rate}_1}=3^2=9$",
    ["The order with respect to A is 2, so rate ∝ [A]².", "Ratio = (3)² = 9. The rate becomes nine times."], "The exponent in the rate law is the order."),
  num("kn-n4", "Integrated rate equations", 2, "A first-order reaction has k = 6.93 × 10⁻³ s⁻¹. How much time is needed for 75% of the reactant to react?",
    ["$t=\\frac{2.303}{k}\\log\\frac{[\\text{R}]_0}{[\\text{R}]}$", "$t=\\frac{[\\text{R}]_0-[\\text{R}]}{k}$", "$t=\\frac{2.303}{k}\\log\\frac{[\\text{R}]}{[\\text{R}]_0}$", "$t=\\frac{1}{k}\\left(\\frac{1}{[\\text{R}]}-\\frac{1}{[\\text{R}]_0}\\right)$"], 0,
    { value: 200, dim: [0, 0, 1, 0, 0, 0, 0], unit: "s", tol: 0.01, needUnit: true },
    "$t=200\\ \\text{s}$",
    ["If 75% reacts, [R] = 25% of [R]₀, so [R]₀/[R] = 4.", "t = (2.303/6.93 × 10⁻³ s⁻¹) × log 4", "log 4 = 0.6021, so t = 332.3 × 0.6021 ≈ 200 s", "Check: 75% completion is two half-lives, and t½ = 0.693/k = 100 s."], "75% reacted means 25% remains. What is [R]₀/[R]?"),
  num("kn-n5", "Integrated rate equations", 2, "A zero-order reaction: the concentration of a reactant falls from 0.80 mol L⁻¹ to 0.60 mol L⁻¹ in 25 minutes. Calculate k in mol L⁻¹ min⁻¹.",
    ["$k=\\frac{[\\text{R}]_0-[\\text{R}]}{t}$", "$k=\\frac{2.303}{t}\\log\\frac{[\\text{R}]_0}{[\\text{R}]}$", "$k=\\frac{0.693}{t}$", "$k=\\frac{[\\text{R}]_0}{2t}$"], 0,
    { value: 8.0e-3 * 1000 / 60, dim: [-3, 0, -1, 0, 0, 1, 0], unit: "mol L^-1 min^-1", tol: 0.01, needUnit: true },
    "$k=8.0\\times10^{-3}\\ \\text{mol L}^{-1}\\text{ min}^{-1}$",
    ["For zero order, [R] = [R]₀ − kt, so k = ([R]₀ − [R])/t.", "k = (0.80 − 0.60) mol L⁻¹ / 25 min", "k = 8.0 × 10⁻³ mol L⁻¹ min⁻¹"], "For a zero-order reaction the concentration falls linearly."),
  num("kn-n6", "Rate law & order", 2, "The initial rate of a reaction A → products is 0.020 mol L⁻¹ s⁻¹ at [A] = 0.10 mol L⁻¹, and it becomes 0.080 mol L⁻¹ s⁻¹ at [A] = 0.20 mol L⁻¹. Taking the order from these data, calculate the rate constant k in L mol⁻¹ s⁻¹.",
    ["$k=\\frac{\\text{rate}}{[\\text{A}]^{2}}$", "$k=\\frac{\\text{rate}}{[\\text{A}]}$", "$k=\\text{rate}$", "$k=\\text{rate}\\times[\\text{A}]^{2}$"], 0,
    { value: 2.0e-3, dim: [3, 0, -1, 0, 0, -1, 0], unit: "L mol^-1 s^-1", tol: 0.01, needUnit: true },
    "$k=2.0\\ \\text{L mol}^{-1}\\text{ s}^{-1}$",
    ["Doubling [A] made the rate 0.080/0.020 = 4 times, so 2ˣ = 4 and the order x = 2.", "rate = k[A]², so k = rate/[A]² = 0.020 / (0.10)²", "k = 2.0 L mol⁻¹ s⁻¹ (unit of a second-order k)."], "Find the factor by which the rate changes when concentration doubles."),
  num("kn-n7", "Arrhenius equation", 2, "For a reaction Ea = 60 kJ mol⁻¹. By what factor does the rate constant increase when the temperature is raised from 300 K to 310 K? (" + R_NOTE + ")",
    ["$\\log\\frac{k_2}{k_1}=\\frac{E_a}{2.303R}\\left(\\frac{T_2-T_1}{T_1T_2}\\right)$", "$\\log\\frac{k_2}{k_1}=\\frac{E_a}{2.303R}\\left(T_2-T_1\\right)$", "$\\frac{k_2}{k_1}=\\frac{T_2}{T_1}$", "$\\log\\frac{k_2}{k_1}=\\frac{2.303R}{E_a}\\left(\\frac{T_2-T_1}{T_1T_2}\\right)$"], 0,
    { value: 2.17, dim: [0, 0, 0, 0, 0, 0, 0], unit: "", tol: 0.01, needUnit: false },
    "$\\frac{k_2}{k_1}\\approx 2.17$",
    ["log(k₂/k₁) = (Ea/2.303R)(T₂ − T₁)/(T₁T₂)", "= (60000 / (2.303 × 8.314)) × (10 / (300 × 310))", "= 3133.7 × 1.0753 × 10⁻⁴ = 0.3370", "k₂/k₁ = antilog 0.3370 ≈ 2.17"], "Convert Ea to J mol⁻¹ before using R = 8.314."),
  num("kn-n8", "Arrhenius equation", 3, "The rate of a reaction doubles when the temperature rises from 298 K to 308 K. Calculate the activation energy in kJ mol⁻¹. (" + R_NOTE + ")",
    ["$E_a=\\frac{2.303R\\,T_1T_2}{T_2-T_1}\\log\\frac{k_2}{k_1}$", "$E_a=\\frac{2.303R\\,(T_2-T_1)}{T_1T_2}\\log\\frac{k_2}{k_1}$", "$E_a=2.303R\\,\\log\\frac{k_2}{k_1}$", "$E_a=\\frac{R\\,T_1T_2}{T_2-T_1}\\,\\frac{k_2}{k_1}$"], 0,
    { value: 52900, dim: [2, 1, -2, 0, 0, -1, 0], unit: "kJ mol^-1", tol: 0.01, needUnit: true },
    "$E_a\\approx 52.9\\ \\text{kJ mol}^{-1}$",
    ["Doubling the rate means k₂/k₁ = 2 and log 2 = 0.3010.", "Ea = 2.303 × 8.314 × (298 × 308 / 10) × 0.3010 J mol⁻¹", "= 19.147 × 9178.4 × 0.3010 ≈ 5.29 × 10⁴ J mol⁻¹", "Ea ≈ 52.9 kJ mol⁻¹"], "Rearrange the two-temperature Arrhenius equation for Ea."),
  num("kn-n9", "Integrated rate equations", 3, "A first-order reaction is 20% complete in 10 minutes. Calculate its rate constant in min⁻¹.",
    ["$k=\\frac{2.303}{t}\\log\\frac{[\\text{R}]_0}{[\\text{R}]}$", "$k=\\frac{[\\text{R}]_0-[\\text{R}]}{t}$", "$k=\\frac{0.693}{t}$", "$k=\\frac{2.303}{t}\\log\\frac{[\\text{R}]}{[\\text{R}]_0}$"], 0,
    { value: 0.022318 / 60, dim: [0, 0, -1, 0, 0, 0, 0], unit: "min^-1", tol: 0.01, needUnit: true },
    "$k=2.23\\times10^{-2}\\ \\text{min}^{-1}$",
    ["20% complete means [R] = 80% of [R]₀, so [R]₀/[R] = 100/80 = 1.25.", "k = (2.303/10 min) × log 1.25", "log 1.25 = 0.0969, so k = 0.2303 × 0.0969 = 2.23 × 10⁻² min⁻¹"], "If 20% has reacted, what percentage remains?"),
];

const questions: ChemQuestion[] = [
  q("kn-m1", "Rate of reaction", 1, "Which is the correct unit of the rate of a reaction?", ["mol L⁻¹ s⁻¹", "s⁻¹", "L mol⁻¹ s⁻¹", "mol s"], 0, "Rate is change in concentration (mol L⁻¹) per unit time (s), so mol L⁻¹ s⁻¹. s⁻¹ is the unit of k for first order.", "Rate = concentration change ÷ time."),
  q("kn-m2", "Rate law & order", 1, "The unit of the rate constant of a first-order reaction is:", ["s⁻¹", "mol L⁻¹ s⁻¹", "L mol⁻¹ s⁻¹", "mol² L⁻² s⁻¹"], 0, "k = rate/[R] = (mol L⁻¹ s⁻¹)/(mol L⁻¹) = s⁻¹.", "Divide the unit of rate by the unit of concentration."),
  q("kn-m3", "Rate law & order", 1, "The exponents in the rate law of a reaction are obtained:", ["only by experiment (in general)", "from the stoichiometric coefficients of the balanced equation always", "from the molecular mass of reactants", "from the equilibrium constant"], 0, "Orders are determined experimentally. They equal the coefficients only for an elementary reaction.", "Rate laws cannot be read from the balanced equation in general."),
  q("kn-m4", "Rate law & order", 1, "Molecularity of a reaction can be:", ["only a positive whole number", "zero", "a fraction", "negative"], 0, "Molecularity counts colliding species, so it is a whole number: 1, 2 or rarely 3.", "You cannot count a fraction of a molecule."),
  q("kn-m5", "Rate of reaction", 2, "For 2N₂O₅ → 4NO₂ + O₂, NO₂ forms at 4.0 × 10⁻³ mol L⁻¹ s⁻¹. The rate of disappearance of N₂O₅ is:", ["2.0 × 10⁻³ mol L⁻¹ s⁻¹", "4.0 × 10⁻³ mol L⁻¹ s⁻¹", "8.0 × 10⁻³ mol L⁻¹ s⁻¹", "1.0 × 10⁻³ mol L⁻¹ s⁻¹"], 0, "−½ d[N₂O₅]/dt = ¼ d[NO₂]/dt, so −d[N₂O₅]/dt = ½ × 4.0 × 10⁻³ = 2.0 × 10⁻³.", "Two moles of N₂O₅ give four moles of NO₂."),
  q("kn-m6", "Rate law & order", 2, "For rate = k[A]²[B], [A] is doubled and [B] is halved. The rate:", ["doubles", "is unchanged", "becomes four times", "becomes half"], 0, "Factor = 2² × ½ = 2.", "Square the change in A and multiply by the change in B."),
  q("kn-m7", "Integrated rate equations", 2, "A first-order reaction has k = 0.0693 min⁻¹. Its half-life is:", ["10 min", "1 min", "0.693 min", "100 min"], 0, "t½ = 0.693/k = 0.693/0.0693 = 10 min.", "t½ = 0.693/k for first order."),
  q("kn-m8", "Integrated rate equations", 2, "The half-life of a zero-order reaction is:", ["directly proportional to the initial concentration", "independent of the initial concentration", "inversely proportional to the initial concentration", "proportional to the square of the initial concentration"], 0, "t½ = [R]₀/2k for zero order.", "Write t½ = [R]₀/2k and look at [R]₀."),
  q("kn-m9", "Arrhenius equation", 2, "For the Arrhenius equation, a plot of ln k against 1/T has a slope equal to:", ["−Ea/R", "−Ea/2.303R", "Ea/R", "ln A"], 0, "ln k = ln A − Ea/RT, so the slope is −Ea/R. (The slope is −Ea/2.303R only for log k.)", "The question uses ln, not log."),
  q("kn-m10", "Arrhenius equation", 2, "A catalyst increases the rate of a reaction by:", ["lowering the activation energy", "increasing ΔH of the reaction", "shifting the equilibrium towards the products", "increasing the threshold energy"], 0, "A catalyst provides an alternative path with lower Ea. ΔH and K are unchanged.", "A catalyst changes only the speed, not the thermodynamics."),
  q("kn-m11", "Integrated rate equations", 3, "A first-order reaction is 75% complete in 32 minutes. Its half-life is:", ["16 min", "8 min", "32 min", "64 min"], 0, "75% completion means two half-lives, so t½ = 32/2 = 16 min.", "After one half-life 50% is consumed. After two?"),
  q("kn-m12", "Rate law & order", 1, "Which of these does not change the value of the rate constant k of a given reaction?", ["Concentration of the reactants", "Temperature", "Presence of a catalyst", "Activation energy"], 0, "k depends on temperature and catalyst (through Ea). It does not depend on concentration.", "Which factor changes the rate but not k?"),
  q("kn-m13", "Collision theory", 2, "For a collision to be effective the molecules must have:", ["energy ≥ threshold energy and proper orientation", "energy ≥ threshold energy only", "proper orientation only", "the same mass"], 0, "Both conditions are needed, which is why P (the steric factor) appears in k = P Z e^(−Ea/RT).", "Two conditions: energy and geometry."),
];

const challenge: ChemQuestion[] = [
  ar("kn-a1", 2, "The half-life of a first-order reaction stays the same as the reaction proceeds.", "For a first-order reaction t½ = 0.693/k.", 0, "t½ contains only the constant k, so it does not change with concentration. R is exactly why A is true.", "Check which quantities appear in t½ = 0.693/k."),
  ar("kn-a2", 2, "The molecularity of a reaction can be fractional.", "The order of a reaction can be fractional.", 3, "Molecularity must be a whole number, so A is false. The order can be zero or fractional, so R is true.", "Which quantity is theoretical and which is experimental?"),
  ar("kn-a3", 2, "The rate constant of a reaction increases with temperature.", "At higher temperature a larger fraction of molecules has energy equal to or greater than the activation energy.", 0, "k = A e^(−Ea/RT). The fraction e^(−Ea/RT) grows with T, so both statements are true and R explains A.", "Think about the exponential factor in the Arrhenius equation."),
  ar("kn-a4", 2, "The rate of a reaction equals its rate constant when all reactant concentrations are 1 mol L⁻¹.", "In rate = k[A]ˣ[B]ʸ, unit concentrations make [A]ˣ[B]ʸ equal to 1.", 0, "With every concentration equal to 1, the concentration terms are 1, so rate = k. R is the reason.", "Substitute [A] = [B] = 1 in the rate law."),
  q("kn-a5", "Rate law & order", 3, "Initial rates for A + B → products: (0.10, 0.10) → 2.0 × 10⁻³; (0.20, 0.10) → 4.0 × 10⁻³; (0.20, 0.20) → 1.6 × 10⁻² (concentrations in mol L⁻¹, rates in mol L⁻¹ s⁻¹). The overall order is:", ["3", "2", "1", "4"], 0, "Doubling [A] (B fixed) doubles the rate, so order 1 in A. Doubling [B] (A fixed) quadruples the rate, so order 2 in B. Overall order = 3.", "Compare two experiments in which only one concentration changes.", undefined, true),
  q("kn-a6", "Rate law & order", 3, "A reaction has k = 3.0 × 10⁻⁴ mol L⁻¹ s⁻¹. Its order is:", ["zero", "first", "second", "third"], 0, "The unit of k for order n is (mol L⁻¹)¹⁻ⁿ s⁻¹. For mol L⁻¹ s⁻¹, 1 − n = 1, so n = 0.", "Compare the unit with (mol L⁻¹)¹⁻ⁿ s⁻¹.", undefined, true),
  q("kn-a7", "Integrated rate equations", 3, "The time for 99.9% completion of a first-order reaction is about how many times its half-life?", ["10", "3", "100", "1000"], 0, "t(99.9%) = (2.303/k) log 1000 = 6.909/k. Dividing by t½ = 0.693/k gives about 9.97, i.e. about 10.", "Use t = (2.303/k) log([R]₀/[R]) with [R]₀/[R] = 1000.", undefined, true),
];

const predict: ChemQuestion[] = [
  q("kn-p1", "Rate law & order", 1, "Predict the outcome: for rate = k[A]², the concentration of A is doubled. The rate:", ["becomes four times", "doubles", "is unchanged", "becomes half"], 0, "Rate ∝ [A]², so the factor is 2² = 4.", "Raise the change to the order.", ["Read the order from the rate law: 2.", "Factor = (new/old)² = 2² = 4."]),
  q("kn-p2", "Integrated rate equations", 2, "Predict the outcome: the initial concentration of a first-order reactant is doubled. The half-life:", ["stays the same", "doubles", "becomes half", "becomes four times"], 0, "t½ = 0.693/k has no concentration term.", "Which formula gives t½ for first order?", ["First order: t½ = 0.693/k.", "[R]₀ does not appear, so t½ is unchanged."]),
  q("kn-p3", "Integrated rate equations", 2, "Predict the outcome: a zero-order reaction has [R]₀ = 0.80 mol L⁻¹ and k = 0.020 mol L⁻¹ min⁻¹. The concentration after 20 minutes is:", ["0.40 mol L⁻¹", "0.78 mol L⁻¹", "0.60 mol L⁻¹", "0.20 mol L⁻¹"], 0, "[R] = [R]₀ − kt = 0.80 − 0.020 × 20 = 0.40 mol L⁻¹.", "Zero order falls linearly with time.", ["Use [R] = [R]₀ − kt.", "kt = 0.020 × 20 = 0.40 mol L⁻¹.", "[R] = 0.80 − 0.40 = 0.40 mol L⁻¹."]),
  q("kn-p4", "Integrated rate equations", 2, "Predict the outcome: for a first-order reaction, the fraction of reactant left after three half-lives is:", ["1/8", "1/6", "1/3", "1/4"], 0, "Each half-life halves the amount: ½ × ½ × ½ = 1/8 (12.5% left).", "Halve the amount once for each half-life.", ["After 1 half-life: ½.", "After 2: ¼.", "After 3: ⅛."]),
  q("kn-p5", "Arrhenius equation", 2, "Predict the outcome: a catalyst is added to a reaction at constant temperature. What happens to k, Ea and ΔH?", ["k increases, Ea decreases, ΔH unchanged", "k increases, Ea unchanged, ΔH decreases", "k unchanged, Ea decreases, ΔH decreases", "k decreases, Ea increases, ΔH unchanged"], 0, "The catalyst lowers Ea, so k = A e^(−Ea/RT) rises. ΔH depends only on reactants and products, so it is unchanged.", "A catalyst changes the path, not the starting and ending energies.", ["Catalyst provides a lower-Ea path.", "Lower Ea makes e^(−Ea/RT) larger, so k increases.", "ΔH is unchanged because the reactants and products are the same."]),
  q("kn-p6", "Rate law & order", 3, "Predict the outcome: a gaseous reaction has rate = k[A][B]. The volume of the vessel is halved at constant temperature. The rate:", ["becomes four times", "doubles", "becomes half", "is unchanged"], 0, "Halving the volume doubles every concentration, so the rate changes by 2 × 2 = 4.", "Concentration is moles per volume.", ["Volume ½ means [A] and [B] each become 2×.", "Rate ∝ [A][B], so the factor is 2 × 2 = 4."]),
];

export const content: ChemChapterContent = { sections, questions, cards, challenge, concept, numerical, predict };
