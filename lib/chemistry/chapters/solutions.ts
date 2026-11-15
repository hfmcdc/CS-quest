import type { AnsSpec } from "../../physics/types";
import type { ChemCard, ChemChapterContent, ChemConceptQ, ChemLevel, ChemNumQ, ChemQuestion, ChemSection } from "../types";

/**
 * Chapter 1 · Solutions (CBSE 2026-27, 7 marks).
 * Syllabus scope: types of solutions, expression of concentration, solubility (Henry's law), vapour pressure of liquid solutions
 * (Raoult's law), ideal and non-ideal solutions, colligative properties and determination of molar mass, abnormal molar masses.
 * Every numerical answer is recomputed independently by `npm run verify:chemistry`.
 */

const q = (id: string, tag: string, level: ChemLevel, text: string, options: string[], ans: number, why: string, hint: string, extra?: { steps?: string[]; challenge?: boolean }): ChemQuestion =>
  ({ id, tag, level, text, options, answer: options[ans], why, hint, ...(extra?.steps ? { steps: extra.steps } : {}), ...(extra?.challenge ? { challenge: true } : {}) });

const AR = [
  "Both A and R are true and R is the correct explanation of A.",
  "Both A and R are true but R is not the correct explanation of A.",
  "A is true but R is false.",
  "A is false but R is true.",
];
const ar = (id: string, level: ChemLevel, a: string, r: string, ans: number, why: string, hint: string): ChemQuestion =>
  q(id, "Assertion–Reason", level, `Assertion (A): ${a}\nReason (R): ${r}`, AR, ans, why, hint, { challenge: true });

const sections: ChemSection[] = [
  {
    kind: "table",
    title: "Expressing concentration",
    head: ["Term", "Definition", "Unit"],
    rows: [
      ["Mass percentage", "mass of component ÷ total mass of solution × 100", "%"],
      ["Volume percentage", "volume of component ÷ total volume of solution × 100", "%"],
      ["Parts per million", "parts of component ÷ total parts × 10⁶", "ppm"],
      ["Mole fraction (x)", "moles of component ÷ total moles of all components", "none"],
      ["Molarity (M)", "moles of solute ÷ litres of solution", "mol L⁻¹"],
      ["Molality (m)", "moles of solute ÷ kilograms of solvent", "mol kg⁻¹"],
    ],
    note: "Molarity depends on temperature because volume changes. Molality and mole fraction do not, because they use masses and moles.",
  },
  {
    kind: "concepts",
    title: "Solubility and Henry's law",
    items: [
      { label: "Solids in liquids", body: "Like dissolves like. A saturated solution is in dynamic equilibrium with undissolved solute. If dissolution is endothermic, solubility rises with temperature (Le Chatelier). Pressure has almost no effect." },
      { label: "Gases in liquids: Henry's law", body: "The partial pressure of a gas above a solution is proportional to its mole fraction in the solution: p = K_H x. A larger K_H means lower solubility at a given pressure. K_H rises with temperature, so gas solubility falls as temperature rises (dissolution of a gas is exothermic)." },
      { label: "Applications", body: "Soft drinks are bottled under high pressure of CO₂. Scuba divers breathe He–O₂ mixtures because N₂ dissolves in blood under pressure and bubbles out on ascent (bends). At high altitude low O₂ pressure causes anoxia. Aquatic life prefers cold water because it holds more dissolved O₂." },
    ],
  },
  {
    kind: "concepts",
    title: "Vapour pressure and Raoult's law",
    items: [
      { label: "Two volatile liquids", body: "p₁ = x₁p₁°, p₂ = x₂p₂°, p_total = p₁° + (p₂° − p₁°)x₂. The vapour is richer in the more volatile component (Dalton: y₁ = p₁/p_total)." },
      { label: "Non-volatile solute", body: "Vapour pressure falls: (p₁° − p₁)/p₁° = x₂ (relative lowering of vapour pressure)." },
      { label: "Ideal solutions", body: "Obey Raoult's law at all concentrations, with ΔmixH = 0 and ΔmixV = 0. A–B interactions are about equal to A–A and B–B. Examples: n-hexane + n-heptane, bromoethane + chloroethane." },
      { label: "Positive deviation", body: "Vapour pressure is higher than Raoult's law predicts. A–B attractions are weaker than A–A and B–B; ΔmixH > 0 and ΔmixV > 0. Examples: ethanol + acetone, carbon disulphide + acetone." },
      { label: "Negative deviation", body: "Vapour pressure is lower. A–B attractions are stronger; ΔmixH < 0 and ΔmixV < 0. Examples: chloroform + acetone, nitric acid + water." },
      { label: "Azeotropes", body: "Constant-boiling mixtures whose vapour has the same composition as the liquid, so they cannot be separated by distillation. Positive deviation gives a minimum-boiling azeotrope (ethanol + water, about 95% ethanol). Negative deviation gives a maximum-boiling azeotrope (nitric acid + water, about 68% HNO₃)." },
    ],
  },
  {
    kind: "table",
    title: "Colligative properties",
    head: ["Property", "Expression", "Notes"],
    rows: [
      ["Relative lowering of vapour pressure", "(p₁° − p₁)/p₁° = x₂", "Non-volatile solute"],
      ["Elevation of boiling point", "ΔT_b = K_b m", "K_b in K kg mol⁻¹ (water 0.52)"],
      ["Depression of freezing point", "ΔT_f = K_f m", "K_f in K kg mol⁻¹ (water 1.86, benzene 5.12)"],
      ["Osmotic pressure", "Π = CRT = (n/V)RT", "R = 0.0821 L atm K⁻¹ mol⁻¹"],
      ["Molar mass from ΔT", "M₂ = K × w₂ × 1000 / (ΔT × w₁)", "w₁ = mass of solvent in grams"],
      ["Molar mass from Π", "M₂ = w₂RT / (ΠV)", "Suited to polymers and proteins"],
    ],
    note: "Colligative properties depend on the number of solute particles, not on their nature. Osmotic pressure is measured at room temperature and is large even for dilute solutions.",
  },
  {
    kind: "concepts",
    title: "Osmosis and abnormal molar masses",
    items: [
      { label: "Osmosis", body: "Solvent flows through a semipermeable membrane from lower to higher solute concentration. Isotonic solutions have equal osmotic pressure. Cells shrink in a hypertonic solution and swell in a hypotonic one. 0.9% NaCl is isotonic with blood." },
      { label: "Reverse osmosis", body: "Pressure greater than the osmotic pressure applied on the solution side drives solvent out of the solution: used for desalination." },
      { label: "van't Hoff factor", body: "i = normal molar mass / observed molar mass = observed colligative property / calculated value = moles of particles after / before association or dissociation. Dissociation (KCl in water, i ≈ 2) gives i > 1. Association (ethanoic acid dimerising in benzene, i ≈ 0.5) gives i < 1." },
      { label: "Modified equations", body: "ΔT_b = i K_b m, ΔT_f = i K_f m, Π = i CRT, (p₁° − p₁)/p₁° = i x₂." },
    ],
  },
  {
    kind: "mistakes",
    title: "Common mistakes",
    items: [
      { body: "Using grams of solvent as kilograms in molality, or litres of solvent instead of litres of solution in molarity." },
      { body: "Putting w₁ in kilograms in M₂ = K × w₂ × 1000 / (ΔT × w₁). The 1000 already converts to kilograms." },
      { body: "Forgetting temperature must be in kelvin in Π = CRT." },
      { body: "Saying positive deviation has ΔmixH < 0. It is ΔmixH > 0." },
      { body: "Ignoring i for electrolytes: 0.1 m NaCl has about twice the effect of 0.1 m glucose." },
    ],
  },
];

const card = (id: string, tag: string, front: string, back: string): ChemCard => ({ id, tag, front, back });

const cards: ChemCard[] = [
  card("sl-c1", "Concentration", "Mass percentage", "Mass % = (mass of component ÷ total mass of solution) × 100\n\nNo unit (written %).\nExample: 5 g glucose in 95 g water is 5%."),
  card("sl-c2", "Concentration", "Parts per million (ppm)", "ppm = (parts of component ÷ total parts of solution) × 10⁶\n\nUsed for very low concentrations, such as dissolved O₂ in water or pollutants in air."),
  card("sl-c3", "Concentration", "Mole fraction", "xₐ = nₐ / (nₐ + n_b)\n\nSum of all mole fractions = 1.\nNo unit, independent of temperature."),
  card("sl-c4", "Concentration", "Molarity", "M = moles of solute ÷ volume of solution in litres\n\nUnit: mol L⁻¹ (or M).\nChanges with temperature because volume does."),
  card("sl-c5", "Concentration", "Molality", "m = moles of solute ÷ mass of solvent in kg\n\nUnit: mol kg⁻¹.\nIndependent of temperature because it uses masses."),
  card("sl-c6", "Solubility", "Henry's law", "p = K_H x\n\np: partial pressure of the gas above the solution\nx: mole fraction of the gas in solution\nHigher K_H means lower solubility; K_H increases with temperature."),
  card("sl-c7", "Solubility", "Applications of Henry's law", "Soft drinks: CO₂ under high pressure.\nScuba divers: He–O₂ mixtures avoid bends.\nHigh altitude: low O₂ pressure causes anoxia.\nAquatic life: more O₂ dissolves in cold water."),
  card("sl-c8", "Vapour pressure", "Raoult's law for two volatile liquids", "p₁ = x₁p₁°,  p₂ = x₂p₂°\np_total = p₁° + (p₂° − p₁°)x₂\n\np°: vapour pressure of the pure component.\nVapour composition: y₁ = p₁/p_total."),
  card("sl-c9", "Vapour pressure", "Raoult's law for a non-volatile solute", "(p₁° − p₁)/p₁° = x₂\n\nRelative lowering of vapour pressure equals the mole fraction of the solute.\nSo vapour pressure falls when a non-volatile solute is added."),
  card("sl-c10", "Ideal and non-ideal", "Ideal solution", "Obeys Raoult's law at all concentrations.\nΔmixH = 0 and ΔmixV = 0.\nA–B interactions ≈ A–A and B–B.\nExamples: n-hexane + n-heptane; bromoethane + chloroethane."),
  card("sl-c11", "Ideal and non-ideal", "Positive deviation", "Vapour pressure is higher than predicted.\nA–B attractions weaker than A–A and B–B.\nΔmixH > 0, ΔmixV > 0.\nExamples: ethanol + acetone; CS₂ + acetone.\nGives a minimum-boiling azeotrope."),
  card("sl-c12", "Ideal and non-ideal", "Negative deviation", "Vapour pressure is lower than predicted.\nA–B attractions stronger than A–A and B–B.\nΔmixH < 0, ΔmixV < 0.\nExamples: chloroform + acetone; HNO₃ + water.\nGives a maximum-boiling azeotrope."),
  card("sl-c13", "Ideal and non-ideal", "Azeotropes", "Constant-boiling mixtures: the vapour has the same composition as the liquid, so distillation cannot separate them.\n\nMinimum-boiling: ethanol–water (95% ethanol).\nMaximum-boiling: HNO₃–water (68% HNO₃)."),
  card("sl-c14", "Colligative properties", "Elevation of boiling point", "ΔT_b = K_b m\n\nK_b: molal elevation constant (K kg mol⁻¹); water 0.52\nm: molality of the solute\nFor molar mass: M₂ = K_b × w₂ × 1000 / (ΔT_b × w₁)."),
  card("sl-c15", "Colligative properties", "Depression of freezing point", "ΔT_f = K_f m\n\nK_f: molal depression constant (K kg mol⁻¹); water 1.86, benzene 5.12\nM₂ = K_f × w₂ × 1000 / (ΔT_f × w₁)\nUse: antifreeze, salt on icy roads."),
  card("sl-c16", "Colligative properties", "Osmotic pressure", "Π = CRT = (n/V)RT\n\nΠ: osmotic pressure (atm or bar)\nC: molarity (mol L⁻¹)\nR = 0.0821 L atm K⁻¹ mol⁻¹, T in kelvin\nM₂ = w₂RT/(ΠV): used for polymers and proteins."),
  card("sl-c17", "Colligative properties", "Isotonic, hypertonic and hypotonic", "Isotonic: same osmotic pressure (0.9% NaCl matches blood).\nHypertonic: higher concentration than the cell; the cell shrinks.\nHypotonic: lower concentration; the cell swells and may burst."),
  card("sl-c18", "Colligative properties", "Reverse osmosis", "Pressure greater than the osmotic pressure is applied to the solution side, so pure solvent passes through the membrane.\n\nUse: desalination of sea water."),
  card("sl-c19", "Abnormal molar mass", "van't Hoff factor", "i = normal molar mass / observed molar mass\n  = observed colligative property / calculated value\n  = particles after / particles before\n\ni > 1: dissociation (KCl, i ≈ 2)\ni < 1: association (ethanoic acid in benzene, i ≈ 0.5)"),
  card("sl-c20", "Abnormal molar mass", "Colligative equations with i", "ΔT_b = i K_b m\nΔT_f = i K_f m\nΠ = i CRT\n(p₁° − p₁)/p₁° = i x₂"),
  card("sl-c21", "Solubility", "Solids in liquids", "Like dissolves like.\nSaturated solution: dynamic equilibrium.\nEndothermic dissolution: solubility increases with temperature.\nPressure has hardly any effect."),
];

const concept: ChemConceptQ[] = [
  { id: "sl-s1", tag: "Solubility", level: 2, q: "Why does the solubility of a gas in a liquid decrease as temperature increases?", groups: [["exothermic", "heat is released", "releases heat", "heat evolved"], ["le chatelier", "equilibrium", "shift", "decreas", "backward", "reverse"]],
    model: "Dissolution of a gas in a liquid is exothermic, so by Le Chatelier's principle raising the temperature shifts the equilibrium backwards and the gas comes out of solution.", hint: "Is heat released or absorbed when a gas dissolves?" },
  { id: "sl-s2", tag: "Solubility", level: 1, q: "State Henry's law.", groups: [["partial pressure"], ["mole fraction", "proportional", "directly proportional"]],
    model: "The partial pressure of a gas in the vapour phase is proportional to the mole fraction of the gas in the solution: p = K_H x.", hint: "It links the pressure of the gas above the liquid to its concentration in the liquid." },
  { id: "sl-s3", tag: "Concentration", level: 2, q: "Why is molality preferred to molarity when studying solutions at different temperatures?", groups: [["temperature"], ["mass", "weight"]],
    model: "Molality uses the mass of solvent, which does not change with temperature, whereas molarity uses the volume of solution, which changes with temperature.", hint: "Which quantity changes with temperature, mass or volume?" },
  { id: "sl-s4", tag: "Ideal and non-ideal", level: 2, q: "What are azeotropes?", groups: [["constant", "same composition", "fixed composition", "same as the liquid", "identical composition"], ["boil", "distill", "distil", "vapour", "vapor"]],
    model: "Azeotropes are binary mixtures that boil at a constant temperature and whose vapour has the same composition as the liquid, so they cannot be separated by simple distillation.", hint: "Think about what happens to the composition during boiling." },
  { id: "sl-s5", tag: "Ideal and non-ideal", level: 2, q: "Why does a mixture showing positive deviation from Raoult's law form a minimum-boiling azeotrope?", groups: [["higher vapour pressure", "higher vapor pressure", "more volatile", "weaker", "lower boiling", "minimum", "lower than"]],
    model: "In positive deviation the vapour pressure is higher than expected because A–B attractions are weaker. At the composition of maximum vapour pressure the mixture boils at a lower temperature than either component, giving a minimum-boiling azeotrope.", hint: "Higher vapour pressure means it boils more easily." },
  { id: "sl-s6", tag: "Colligative properties", level: 1, q: "What are colligative properties?", groups: [["number", "amount"], ["particles", "molecules", "moles", "ions"]],
    model: "Colligative properties are properties of a solution that depend on the number of solute particles and not on their nature.", hint: "They count particles, not identity." },
  { id: "sl-s7", tag: "Colligative properties", level: 3, q: "Why is osmotic pressure preferred over other colligative properties for finding the molar mass of proteins and polymers?", groups: [["room temperature", "ordinary temperature", "at the same temperature", "constant temperature", "without heating"], ["large", "magnitude", "measurable", "dilute", "concentration", "molarity"]],
    model: "Osmotic pressure is measured at room temperature, so heat-sensitive biomolecules are not damaged, and it has a large measurable magnitude even for very dilute solutions, which suits macromolecules of low solubility.", hint: "Think about temperature and about how big the effect is." },
  { id: "sl-s8", tag: "Abnormal molar mass", level: 2, q: "Why does 0.1 m KCl solution lower the freezing point about twice as much as 0.1 m glucose solution?", groups: [["dissociat", "ionis", "ioniz", "ions"]],
    model: "KCl dissociates into K⁺ and Cl⁻, giving about twice as many particles. Colligative properties depend on the number of particles, so the van't Hoff factor is about 2. Glucose does not dissociate.", hint: "Count the particles each solute produces." },
  { id: "sl-s9", tag: "Abnormal molar mass", level: 2, q: "Why does the molar mass of ethanoic acid in benzene come out as about double the normal value?", groups: [["associat", "dimer", "dimeris", "dimeriz"], ["hydrogen bond", "fewer particles", "less particles", "lower number", "number of particles"]],
    model: "In benzene ethanoic acid molecules associate into dimers through hydrogen bonding, so the number of particles is halved and the observed molar mass is about double.", hint: "What do ethanoic acid molecules do in a non-polar solvent?" },
  { id: "sl-s10", tag: "Ideal and non-ideal", level: 2, q: "Why does a mixture of chloroform and acetone show negative deviation from Raoult's law?", groups: [["stronger", "strong", "more"], ["hydrogen bond", "interaction", "attraction", "force"]],
    model: "Chloroform and acetone form hydrogen bonds with each other, so the A–B interactions are stronger than A–A and B–B. Molecules escape less easily and the vapour pressure is lower than predicted.", hint: "Compare the attractions between unlike and like molecules." },
];

const num = (id: string, tag: string, level: ChemLevel, text: string, formulaOptions: string[], formulaAnswer: number, ans: AnsSpec, ansShow: string, steps: string[], hint: string): ChemNumQ =>
  ({ id, tag, level, text, formulaOptions, formulaAnswer, ans, ansShow, steps, hint });

const D0: AnsSpec["dim"] = [0, 0, 0, 0, 0, 0, 0];
const PRESS: AnsSpec["dim"] = [-1, 1, -2, 0, 0, 0, 0];

const numerical: ChemNumQ[] = [
  num("sl-n1", "Concentration", 1, "4.0 g of NaOH (molar mass 40 g mol⁻¹) is dissolved in water to make 250 mL of solution. Calculate the molarity.",
    ["$M=\\frac{n}{V\\ (\\text{in L})}$", "$M=\\frac{n}{m_{\\text{solvent}}\\ (\\text{in kg})}$", "$M=\\frac{w_2}{w_1+w_2}\\times 100$", "$M=\\frac{n_2}{n_1+n_2}$"], 0,
    { value: 400, dim: [-3, 0, 0, 0, 0, 1, 0], unit: "mol L^-1", tol: 0.01, needUnit: true },
    "$M=0.40\\ \\text{mol L}^{-1}$",
    ["n = 4.0 g / 40 g mol⁻¹ = 0.10 mol", "V = 250 mL = 0.250 L", "M = 0.10 / 0.250 = 0.40 mol L⁻¹"], "Convert mL to L first."),
  num("sl-n2", "Concentration", 1, "5.0 g of glucose is dissolved in 95 g of water. Calculate the mass percentage of glucose.",
    ["$\\text{mass \\%}=\\frac{w_{\\text{solute}}}{w_{\\text{solution}}}\\times 100$", "$\\text{mass \\%}=\\frac{w_{\\text{solute}}}{w_{\\text{solvent}}}\\times 100$", "$\\text{mass \\%}=\\frac{n_{\\text{solute}}}{n_{\\text{solution}}}\\times 100$", "$\\text{mass \\%}=\\frac{w_{\\text{solute}}}{V_{\\text{solution}}}\\times 100$"], 0,
    { value: 5.0, dim: D0, unit: "", tol: 0.01, needUnit: false },
    "$5.0\\ \\%$",
    ["Mass of solution = 5.0 + 95 = 100 g", "Mass % = (5.0 / 100) × 100 = 5.0%"], "The denominator is the mass of the whole solution."),
  num("sl-n3", "Concentration", 2, "18 g of glucose (molar mass 180 g mol⁻¹) is dissolved in 500 g of water. Calculate the molality.",
    ["$m=\\frac{n_{\\text{solute}}}{w_{\\text{solvent}}\\ (\\text{in kg})}$", "$m=\\frac{n_{\\text{solute}}}{V_{\\text{solution}}\\ (\\text{in L})}$", "$m=\\frac{n_{\\text{solute}}}{n_{\\text{total}}}$", "$m=\\frac{w_{\\text{solute}}}{w_{\\text{solution}}}\\times 100$"], 0,
    { value: 0.20, dim: [0, -1, 0, 0, 0, 1, 0], unit: "mol kg^-1", tol: 0.01, needUnit: true },
    "$m=0.20\\ \\text{mol kg}^{-1}$",
    ["n = 18 / 180 = 0.10 mol", "Mass of solvent = 500 g = 0.500 kg", "m = 0.10 / 0.500 = 0.20 mol kg⁻¹"], "Divide by kilograms of solvent, not of solution."),
  num("sl-n4", "Concentration", 2, "A solution contains 36 g of water and 46 g of ethanol (molar masses 18 and 46 g mol⁻¹). Calculate the mole fraction of ethanol.",
    ["$x_{\\text{eth}}=\\frac{n_{\\text{eth}}}{n_{\\text{eth}}+n_{\\text{water}}}$", "$x_{\\text{eth}}=\\frac{w_{\\text{eth}}}{w_{\\text{eth}}+w_{\\text{water}}}$", "$x_{\\text{eth}}=\\frac{n_{\\text{eth}}}{n_{\\text{water}}}$", "$x_{\\text{eth}}=\\frac{n_{\\text{eth}}}{V}$"], 0,
    { value: 1 / 3, dim: D0, unit: "", tol: 0.01, needUnit: false },
    "$x_{\\text{ethanol}}=0.333$",
    ["n(water) = 36/18 = 2.0 mol", "n(ethanol) = 46/46 = 1.0 mol", "x = 1.0 / (1.0 + 2.0) = 0.333"], "Convert both masses to moles first."),
  num("sl-n5", "Solubility", 2, "The solubility of a gas in water is 1.5 × 10⁻³ mol L⁻¹ at a partial pressure of 1.0 atm. Calculate its solubility at 3.0 atm and the same temperature.",
    ["$\\frac{S_2}{S_1}=\\frac{p_2}{p_1}$", "$\\frac{S_2}{S_1}=\\frac{p_1}{p_2}$", "$S_2=S_1+p_2$", "$\\frac{S_2}{S_1}=\\left(\\frac{p_2}{p_1}\\right)^{2}$"], 0,
    { value: 4.5, dim: [-3, 0, 0, 0, 0, 1, 0], unit: "mol L^-1", tol: 0.01, needUnit: true },
    "$S_2=4.5\\times10^{-3}\\ \\text{mol L}^{-1}$",
    ["Henry's law: solubility is proportional to partial pressure at constant T.", "S₂ = 1.5 × 10⁻³ × (3.0 / 1.0)", "S₂ = 4.5 × 10⁻³ mol L⁻¹"], "Solubility rises in proportion to pressure."),
  num("sl-n6", "Vapour pressure", 2, "The vapour pressure of pure water at 298 K is 23.8 mm Hg. A solution of a non-volatile solute has solute mole fraction 0.020. Calculate the vapour pressure of the solution.",
    ["$p_1=p_1^{\\circ}\\,(1-x_2)$", "$p_1=p_1^{\\circ}\\,x_2$", "$p_1=p_1^{\\circ}+x_2$", "$p_1=\\frac{p_1^{\\circ}}{x_2}$"], 0,
    { value: 23.324 * 133.322368, dim: PRESS, unit: "mmHg", tol: 0.01, needUnit: true },
    "$p_1=23.3\\ \\text{mm Hg}$",
    ["Mole fraction of solvent x₁ = 1 − 0.020 = 0.980", "p₁ = x₁p₁° = 0.980 × 23.8", "p₁ = 23.3 mm Hg"], "Raoult's law uses the mole fraction of the solvent."),
  num("sl-n7", "Vapour pressure", 2, "At a given temperature the vapour pressures of pure liquids A and B are 450 mm Hg and 700 mm Hg. Calculate the total vapour pressure of an ideal solution in which the mole fraction of A is 0.40.",
    ["$p_{\\text{total}}=x_{\\text{A}}p_{\\text{A}}^{\\circ}+x_{\\text{B}}p_{\\text{B}}^{\\circ}$", "$p_{\\text{total}}=p_{\\text{A}}^{\\circ}+p_{\\text{B}}^{\\circ}$", "$p_{\\text{total}}=x_{\\text{A}}x_{\\text{B}}$", "$p_{\\text{total}}=\\frac{p_{\\text{A}}^{\\circ}}{x_{\\text{A}}}$"], 0,
    { value: 600 * 133.322368, dim: PRESS, unit: "mmHg", tol: 0.01, needUnit: true },
    "$p_{\\text{total}}=600\\ \\text{mm Hg}$",
    ["x_B = 1 − 0.40 = 0.60", "p_A = 0.40 × 450 = 180 mm Hg", "p_B = 0.60 × 700 = 420 mm Hg", "p_total = 180 + 420 = 600 mm Hg"], "Add the partial pressures of both components."),
  num("sl-n8", "Colligative properties", 2, "1.8 g of glucose (180 g mol⁻¹) is dissolved in 100 g of water. Calculate the elevation of boiling point. (K_b of water = 0.52 K kg mol⁻¹)",
    ["$\\Delta T_b=K_b\\,m$", "$\\Delta T_b=\\frac{K_b}{m}$", "$\\Delta T_b=K_b\\,x_2$", "$\\Delta T_b=K_b\\,CRT$"], 0,
    { value: 0.052, dim: [0, 0, 0, 0, 1, 0, 0], unit: "K", tol: 0.01, needUnit: true },
    "$\\Delta T_b=0.052\\ \\text{K}$",
    ["n = 1.8/180 = 0.010 mol; solvent = 0.100 kg", "m = 0.010/0.100 = 0.10 mol kg⁻¹", "ΔT_b = 0.52 × 0.10 = 0.052 K"], "First find the molality."),
  num("sl-n9", "Colligative properties", 3, "1.0 g of an unknown non-electrolyte dissolved in 25 g of benzene lowers the freezing point by 1.0 K. Calculate its molar mass. (K_f of benzene = 5.12 K kg mol⁻¹)",
    ["$M_2=\\frac{K_f\\times w_2\\times 1000}{\\Delta T_f\\times w_1}$", "$M_2=\\frac{\\Delta T_f\\times w_1}{K_f\\times w_2\\times 1000}$", "$M_2=K_f\\,\\Delta T_f$", "$M_2=\\frac{K_f\\times w_1\\times 1000}{\\Delta T_f\\times w_2}$"], 0,
    { value: 0.2048, dim: [0, 1, 0, 0, 0, -1, 0], unit: "g mol^-1", tol: 0.01, needUnit: true },
    "$M_2=204.8\\ \\text{g mol}^{-1}\\approx 205\\ \\text{g mol}^{-1}$",
    ["M₂ = K_f × w₂ × 1000 / (ΔT_f × w₁)", "= 5.12 × 1.0 × 1000 / (1.0 × 25)", "= 5120 / 25 = 204.8 g mol⁻¹"], "w₁ is the mass of the solvent in grams."),
  num("sl-n10", "Colligative properties", 3, "0.60 g of urea (60 g mol⁻¹) is dissolved in water to make 200 mL of solution at 300 K. Calculate the osmotic pressure. (R = 0.0821 L atm K⁻¹ mol⁻¹)",
    ["$\\Pi=CRT$", "$\\Pi=\\frac{CR}{T}$", "$\\Pi=mRT$", "$\\Pi=\\frac{RT}{C}$"], 0,
    { value: 1.2315 * 101325, dim: PRESS, unit: "atm", tol: 0.01, needUnit: true },
    "$\\Pi\\approx 1.23\\ \\text{atm}$",
    ["n = 0.60/60 = 0.010 mol; V = 0.200 L", "C = 0.010/0.200 = 0.050 mol L⁻¹", "Π = 0.050 × 0.0821 × 300 = 1.23 atm"], "Use molarity (per litre of solution) and T in kelvin."),
  num("sl-n11", "Abnormal molar mass", 3, "Calculate the freezing-point depression of a 0.10 molal aqueous KCl solution, assuming complete dissociation. (K_f of water = 1.86 K kg mol⁻¹)",
    ["$\\Delta T_f=i\\,K_f\\,m$", "$\\Delta T_f=K_f\\,m$", "$\\Delta T_f=\\frac{K_f\\,m}{i}$", "$\\Delta T_f=i\\,K_f\\,CRT$"], 0,
    { value: 0.372, dim: [0, 0, 0, 0, 1, 0, 0], unit: "K", tol: 0.01, needUnit: true },
    "$\\Delta T_f=0.372\\ \\text{K}$",
    ["KCl → K⁺ + Cl⁻, so i = 2", "ΔT_f = 2 × 1.86 × 0.10", "ΔT_f = 0.372 K"], "KCl gives two particles."),
  num("sl-n12", "Abnormal molar mass", 3, "2.0 g of ethanoic acid (60 g mol⁻¹) in 25 g of benzene lowers the freezing point by 3.4 K. Calculate the van't Hoff factor. (K_f of benzene = 5.12 K kg mol⁻¹)",
    ["$i=\\frac{\\Delta T_f\\ (\\text{observed})}{\\Delta T_f\\ (\\text{calculated})}$", "$i=\\frac{\\Delta T_f\\ (\\text{calculated})}{\\Delta T_f\\ (\\text{observed})}$", "$i=\\frac{M_{\\text{observed}}}{M_{\\text{normal}}}$", "$i=K_f\\,m$"], 0,
    { value: 3.4 / (5.12 * (2.0 / 60 / 0.025)), dim: D0, unit: "", tol: 0.01, needUnit: false },
    "$i\\approx 0.50$",
    ["m = (2.0/60) / 0.025 kg = 1.333 mol kg⁻¹", "Calculated ΔT_f = 5.12 × 1.333 = 6.83 K", "i = 3.4 / 6.83 = 0.498 ≈ 0.50 (association into dimers)"], "Compare the observed depression with the one you would calculate without association."),
];

const questions: ChemQuestion[] = [
  q("sl-m1", "Concentration", 1, "Which concentration term does not change with temperature?", ["molality", "molarity", "volume percentage", "mass/volume percentage"], 0, "Molality uses masses of solute and solvent, which do not change with temperature.", "Which term uses mass rather than volume?"),
  q("sl-m2", "Solubility", 1, "Henry's law relates the solubility of a gas to its:", ["partial pressure", "molar mass", "colour", "density"], 0, "Solubility is proportional to the partial pressure of the gas above the solution.", "Think about pressure."),
  q("sl-m3", "Solubility", 1, "A higher value of Henry's law constant K_H means the gas is:", ["less soluble", "more soluble", "equally soluble", "insoluble in all liquids"], 0, "p = K_H x, so for the same pressure a larger K_H means a smaller mole fraction dissolved.", "Rearrange p = K_H x for x."),
  q("sl-m4", "Concentration", 1, "The unit of molality is:", ["mol kg⁻¹", "mol L⁻¹", "mol", "kg mol⁻¹"], 0, "Moles of solute per kilogram of solvent.", "Per kilogram of solvent."),
  q("sl-m5", "Ideal and non-ideal", 2, "For an ideal solution:", ["ΔmixH = 0 and ΔmixV = 0", "ΔmixH > 0 and ΔmixV > 0", "ΔmixH < 0 and ΔmixV < 0", "ΔmixH < 0 and ΔmixV > 0"], 0, "Ideal solutions have no heat change and no volume change on mixing.", "A–B interactions equal A–A and B–B."),
  q("sl-m6", "Ideal and non-ideal", 2, "Which pair shows positive deviation from Raoult's law?", ["ethanol and acetone", "chloroform and acetone", "nitric acid and water", "n-hexane and n-heptane"], 0, "Ethanol + acetone has weaker A–B interactions than A–A and B–B.", "Hydrogen bonding in ethanol is disrupted by acetone."),
  q("sl-m7", "Ideal and non-ideal", 2, "Negative deviation from Raoult's law occurs when:", ["A–B interactions are stronger than A–A and B–B", "A–B interactions are weaker than A–A and B–B", "A–B interactions equal A–A and B–B", "the solution is ideal"], 0, "Stronger attractions between unlike molecules reduce the vapour pressure.", "Molecules escape less easily."),
  q("sl-m8", "Colligative properties", 2, "Which of the following is a colligative property?", ["osmotic pressure", "viscosity", "density", "surface tension"], 0, "Osmotic pressure depends only on the number of solute particles.", "It depends on the count of particles."),
  q("sl-m9", "Abnormal molar mass", 2, "Which 0.1 m aqueous solution has the lowest freezing point?", ["K₂SO₄", "NaCl", "glucose", "urea"], 0, "K₂SO₄ gives three ions (i ≈ 3), the most particles.", "Compare the van't Hoff factors."),
  q("sl-m10", "Colligative properties", 2, "Isotonic solutions have the same:", ["osmotic pressure", "boiling point only", "density", "colour"], 0, "Isotonic solutions have equal osmotic pressure, so there is no net osmosis between them.", "Think about osmosis."),
  q("sl-m11", "Colligative properties", 2, "In reverse osmosis the pressure applied to the solution side must be:", ["greater than the osmotic pressure", "equal to the osmotic pressure", "less than the osmotic pressure", "zero"], 0, "Only a pressure above Π pushes solvent out of the solution.", "It must overcome osmosis."),
  q("sl-m12", "Abnormal molar mass", 2, "The van't Hoff factor for ethanoic acid dimerising completely in benzene is:", ["0.5", "1", "2", "3"], 0, "Two molecules form one particle, so the number of particles halves and i = 0.5.", "Association reduces particle number."),
  q("sl-m13", "Abnormal molar mass", 3, "Which 0.1 M solution has the highest boiling point?", ["BaCl₂", "NaCl", "glucose", "urea"], 0, "BaCl₂ gives three ions (i ≈ 3), so it has the largest boiling-point elevation.", "Count ions per formula unit."),
  q("sl-m14", "Colligative properties", 2, "Red blood cells placed in 0.5% NaCl solution (hypotonic to blood) will:", ["swell and may burst", "shrink", "stay unchanged", "dissolve completely at once"], 0, "Water enters the cell because the outside solution is more dilute.", "Water moves towards the more concentrated side."),
  q("sl-m15", "Ideal and non-ideal", 3, "A minimum-boiling azeotrope is formed by a solution showing:", ["positive deviation", "negative deviation", "no deviation", "any deviation equally"], 0, "Positive deviation raises the vapour pressure, so the mixture boils at a lower temperature than the components.", "Which deviation gives higher vapour pressure?"),
];

const challenge: ChemQuestion[] = [
  ar("sl-a1", 2, "Aquatic species are more comfortable in cold water than in warm water.", "The solubility of oxygen in water decreases as temperature increases.", 0, "Cold water holds more dissolved O₂, which is why it suits aquatic life.", "Which water holds more O₂?"),
  ar("sl-a2", 2, "The molality of a solution does not change with temperature.", "Molality is defined using the mass of solute and the mass of solvent.", 0, "Masses do not depend on temperature, so molality is constant.", "Compare mass and volume."),
  ar("sl-a3", 2, "Osmotic pressure is a colligative property.", "Osmotic pressure depends on the number of solute particles and not on their nature.", 0, "That is the definition of a colligative property.", "What does colligative mean?"),
  ar("sl-a4", 3, "A 0.1 M NaCl solution shows a larger boiling-point elevation than a 0.1 M glucose solution.", "NaCl dissociates in water, increasing the number of particles.", 0, "More particles give a larger colligative effect.", "Count the particles."),
  ar("sl-a5", 3, "A solution showing positive deviation from Raoult's law has ΔmixH < 0.", "In positive deviation A–B interactions are weaker than A–A and B–B.", 3, "Weaker A–B interactions mean heat is absorbed, so ΔmixH > 0 and A is false. R is true.", "Weaker interactions need energy to separate molecules."),
  q("sl-a6", "Vapour pressure", 3, "For an ideal solution with x_A = 0.25, p_A° = 80 mm Hg and p_B° = 120 mm Hg, the mole fraction of B in the vapour phase is about:", ["0.82", "0.75", "0.25", "0.60"], 0, "p_A = 0.25 × 80 = 20; p_B = 0.75 × 120 = 90; p_total = 110; y_B = 90/110 = 0.82.", "Find each partial pressure, then divide p_B by the total.", { challenge: true }),
  q("sl-a7", "Abnormal molar mass", 3, "A 0.20 molal solution lowers the freezing point of water by 0.744 K (K_f = 1.86 K kg mol⁻¹). The solute is most likely:", ["a salt giving two ions per formula unit", "a non-electrolyte", "a solute that associates", "a salt giving three ions"], 0, "i = 0.744 / (1.86 × 0.20) = 2.0, so the solute gives two particles.", "Calculate i = observed ÷ calculated.", { challenge: true }),
];

const predict: ChemQuestion[] = [
  q("sl-p1", "Solubility", 1, "Predict the outcome: the pressure of a gas above water is doubled at constant temperature. The amount of gas dissolved:", ["doubles", "halves", "stays the same", "becomes four times"], 0, "Henry's law: solubility is proportional to partial pressure.", "p = K_H x.", { steps: ["Henry's law: x ∝ p.", "Doubling p doubles x.", "The dissolved amount doubles."] }),
  q("sl-p2", "Solubility", 1, "Predict the outcome: a bottle of soda is warmed. The solubility of CO₂ in it:", ["decreases", "increases", "stays the same", "becomes zero at once"], 0, "Gas solubility falls as temperature rises because K_H increases.", "Dissolution of a gas is exothermic.", { steps: ["Dissolving a gas releases heat.", "Heating shifts the equilibrium towards undissolved gas.", "Solubility decreases."] }),
  q("sl-p3", "Ideal and non-ideal", 2, "Predict the outcome: ethanol is mixed with acetone. Compared with Raoult's law the vapour pressure is:", ["higher, with ΔmixV > 0", "lower, with ΔmixV < 0", "equal, with ΔmixV = 0", "lower, with ΔmixV > 0"], 0, "A–B interactions are weaker than A–A and B–B, so it shows positive deviation.", "Ethanol's hydrogen bonds are weakened by acetone.", { steps: ["Ethanol is hydrogen-bonded; acetone breaks some of these bonds.", "A–B attractions are weaker, so molecules escape more easily.", "Vapour pressure is higher; ΔmixH > 0 and ΔmixV > 0."] }),
  q("sl-p4", "Ideal and non-ideal", 2, "Predict the outcome: chloroform and acetone are mixed. The temperature of the mixture:", ["rises", "falls", "stays exactly the same", "first falls then rises"], 0, "Hydrogen bonding between unlike molecules makes ΔmixH < 0, so heat is released.", "Negative deviation means stronger A–B attractions.", { steps: ["Chloroform forms hydrogen bonds with acetone.", "A–B interactions are stronger, so ΔmixH < 0.", "Heat is released and the mixture warms."] }),
  q("sl-p5", "Colligative properties", 1, "Predict the outcome: a red blood cell is placed in a hypertonic NaCl solution. The cell:", ["shrinks", "swells and bursts", "is unchanged", "dissolves"], 0, "Water leaves the cell towards the more concentrated solution.", "Which way does water move?", { steps: ["The outside solution is more concentrated.", "Water flows out of the cell through the membrane.", "The cell shrinks."]}),
  q("sl-p6", "Colligative properties", 2, "Predict the outcome: a non-volatile solute is dissolved in water. Which set of changes occurs?", ["vapour pressure falls, boiling point rises, freezing point falls", "vapour pressure rises, boiling point falls, freezing point rises", "vapour pressure falls, boiling point falls, freezing point rises", "no change in any of them"], 0, "All colligative effects follow from the lowered vapour pressure.", "Which direction does each property move?", { steps: ["A non-volatile solute lowers the vapour pressure.", "The solution must be hotter to reach atmospheric pressure, so the boiling point rises.", "The freezing point falls."] }),
  q("sl-p7", "Colligative properties", 1, "Predict the outcome: salt is spread on an icy road. The ice melts because the salt:", ["lowers the freezing point of water", "raises the freezing point", "reacts with ice to form gas", "raises the boiling point only"], 0, "Dissolved salt depresses the freezing point.", "A colligative effect.", { steps: ["Salt dissolves in a film of water on the ice.", "The solution has a lower freezing point than pure water.", "Ice melts at temperatures below 0 °C."] }),
  q("sl-p8", "Abnormal molar mass", 2, "Predict the outcome: equal molal solutions of glucose and CaCl₂ are compared. The CaCl₂ solution has a freezing point that is:", ["lower, since i ≈ 3", "higher, since i ≈ 1", "the same", "lower, since i ≈ 2"], 0, "CaCl₂ gives three ions, so the depression is about three times larger.", "Count the ions.", { steps: ["CaCl₂ → Ca²⁺ + 2Cl⁻, so i ≈ 3.", "ΔT_f = i K_f m is about three times that of glucose.", "Its freezing point is lower."] }),
];

export const content: ChemChapterContent = { sections, questions, cards, challenge, concept, numerical, predict };
