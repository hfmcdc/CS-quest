import { ids, nq } from "../../builders";
import type { AdvancedContent } from "../../types";

const id = ids("c09");

const SIGN = "Use the Cartesian sign convention.";

export const content: AdvancedContent = {
  problems: [
    nq({
      id: id("a"), tag: "Magnification by a lens", level: 1,
      g: { f: "20 cm", u: "-30 cm" },
      q: `An object is placed {u} from a convex lens of focal length {f}. Find the magnification of the image. ${SIGN}`,
      sym: { m: "magnification", v: "image distance", u: "object distance", f: "focal length" },
      rels: [["v", "1/(1/f+1/u)"], ["m", "v/u"]], ranges: { f: [0.5, 1.5], u: [-4, -2] },
      calc: (s) => (1 / (1 / s.f + 1 / s.u)) / s.u,
      mid: (s) => ({ v: 1 / (1 / s.f + 1 / s.u) * 100 }),
      unit: "",
      show: "\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f},\\qquad m = \\dfrac{v}{u}",
      hint: "Find v first from the lens formula, then m = v/u.",
      steps: ["$\\dfrac{1}{v} = \\dfrac{1}{20} + \\dfrac{1}{-30} = \\dfrac{1}{60}$, so $v = {m.v}\\ \\text{cm}$.", "$m = \\dfrac{v}{u} = \\dfrac{60}{-30} = {ans}$. The image is real, inverted and twice the size of the object."],
    }),
    nq({
      id: id("a"), tag: "Lenses in contact", level: 1,
      g: { P1: "5 D", P2: "-2 D" },
      q: "A convex lens of power {P1} is placed in contact with a concave lens of power {P2}. Find the power of the combination.",
      sym: { P: "power of the combination", P1: "power of the first lens", P2: "power of the second lens" },
      rels: [["P", "P1+P2"]],
      calc: (s) => s.P1 + s.P2, unit: "D",
      show: "P = P_1 + P_2",
      hint: "For thin lenses in contact, powers add algebraically.",
      steps: ["$P = P_1 + P_2 = (+5) + (-2) = {ans}$.", "The combination is converging, with focal length $f = 1/P = 33.3\\ \\text{cm}$."],
    }),
    nq({
      id: id("a"), tag: "Minimum deviation", level: 2,
      g: { A: "60°", Dm: "30°" },
      q: "A prism of angle {A} produces a minimum deviation of {Dm} for a certain ray. Find the refractive index of the material of the prism.",
      sym: { n: "refractive index", A: "angle of the prism", Dm: "angle of minimum deviation (D_m)" },
      rels: [["n", "sin((A+Dm)/2)/sin(A/2)"]], ranges: { A: [0.8, 1.2], Dm: [0.2, 0.6] },
      calc: (s) => Math.sin((s.A + s.Dm) / 2) / Math.sin(s.A / 2), unit: "",
      show: "n = \\dfrac{\\sin\\dfrac{A + D_m}{2}}{\\sin\\dfrac{A}{2}}",
      hint: "Use the prism formula with the angle of minimum deviation.",
      steps: ["$n = \\dfrac{\\sin\\frac{A + D_m}{2}}{\\sin\\frac{A}{2}} = \\dfrac{\\sin45^\\circ}{\\sin30^\\circ}$.", "$n = \\dfrac{0.7071}{0.5} = {ans}$."],
    }),
    nq({
      id: id("a"), tag: "Apparent depth", level: 2,
      g: { d: "1.2 m", n: "4/3" },
      q: "A coin lies at the bottom of a tank of water of depth {d}. The refractive index of water is {n}. How deep does the coin appear when viewed from directly above?",
      sym: { dapp: "apparent depth", d: "real depth", n: "refractive index of water" },
      rels: [["dapp", "d/n"]], aka: { dapp: ["d_app", "d'"] },
      calc: (s) => s.d / s.n, unit: "cm",
      show: "n = \\dfrac{\\text{real depth}}{\\text{apparent depth}}",
      hint: "For near-normal viewing, apparent depth = real depth / n.",
      steps: ["$n = \\dfrac{\\text{real depth}}{\\text{apparent depth}} \\Rightarrow d_{app} = \\dfrac{d}{n}$.", "$d_{app} = \\dfrac{1.2}{4/3} = 0.9\\ \\text{m} = {ans}$."],
    }),
    nq({
      id: id("a"), tag: "Lens immersed in a liquid", level: 3,
      g: { ng: "1.5", nw: "4/3", R1: "20 cm", R2: "-20 cm" },
      q: "A thin equiconvex glass lens ($n = {ng}$) has radii of curvature {R1} and {R2}. Find its focal length when it is immersed in water of refractive index {nw}.",
      sym: { f: "focal length in water", ng: "refractive index of glass", nw: "refractive index of water", R1: "first radius", R2: "second radius" },
      rels: [["f", "1/((ng/nw-1)*(1/R1-1/R2))"]], ranges: { ng: [1.4, 2], nw: [1, 1.2], R1: [0.2, 1], R2: [-1, -0.2] },
      calc: (s) => 1 / ((s.ng / s.nw - 1) * (1 / s.R1 - 1 / s.R2)), unit: "cm",
      show: "\\dfrac{1}{f} = \\left(\\dfrac{n_g}{n_w} - 1\\right)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)",
      hint: "Use the refractive index of glass relative to water in the lens maker's formula.",
      steps: ["Relative index: $\\dfrac{n_g}{n_w} = \\dfrac{1.5}{4/3} = 1.125$.", "$\\dfrac{1}{f} = (1.125 - 1)\\left(\\dfrac{1}{20} + \\dfrac{1}{20}\\right) = 0.125\\times0.1 = 0.0125\\ \\text{cm}^{-1}$.", "$f = {ans}$, four times its focal length in air (20 cm)."],
    }),
    nq({
      id: id("a"), tag: "Compound microscope, image at near point", level: 3,
      g: { fo: "1 cm", uo: "-1.2 cm", fe: "5 cm", D: "25 cm" },
      q: "A compound microscope has an objective of focal length {fo} and an eyepiece of focal length {fe}. An object is placed {uo} from the objective, and the final image is formed at the least distance of distinct vision, {D}. Find the magnitude of the magnifying power. (Cartesian convention for the objective.)",
      sym: { m: "magnitude of the magnifying power", v0: "image distance of the objective (v₀)", fo: "objective focal length (f_o)", uo: "object distance for the objective (u_o)", fe: "eyepiece focal length (f_e)", D: "least distance of distinct vision" },
      rels: [["v0", "1/(1/fo+1/uo)"], ["m", "-(v0/uo)*(1+D/fe)"]], aka: { fo: ["f_o"], fe: ["f_e"], uo: ["u_o"], v0: ["v_o", "vo"] }, ranges: { fo: [0.5, 1], uo: [-3, -1.5] },
      calc: (s) => { const v0 = 1 / (1 / s.fo + 1 / s.uo); return -(v0 / s.uo) * (1 + s.D / s.fe); },
      mid: (s) => ({ v0: 1 / (1 / s.fo + 1 / s.uo) * 100 }),
      unit: "",
      show: "m = \\left|\\dfrac{v_o}{u_o}\\right|\\left(1 + \\dfrac{D}{f_e}\\right)",
      hint: "Objective: find v_o from the lens formula. The eyepiece acts as a simple microscope with the image at the near point.",
      steps: ["Objective: $\\dfrac{1}{v_o} = \\dfrac{1}{f_o} + \\dfrac{1}{u_o} = 1 - \\dfrac{1}{1.2} = \\dfrac{1}{6}$, so $v_o = {m.v0}\\ \\text{cm}$ and $m_o = \\left|\\dfrac{v_o}{u_o}\\right| = 5$.", "Eyepiece (image at the near point): $m_e = 1 + \\dfrac{D}{f_e} = 1 + \\dfrac{25}{5} = 6$.", "$m = m_om_e = {ans}$."],
    }),
  ],
};
