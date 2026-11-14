import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c04");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Magnetic force", "Magnetic force on a charge q moving with velocity v in a field B", "\\vec F = q\\,(\\vec v\\times\\vec B),\\qquad F = qvB\\sin\\theta",
      [["F", "magnetic force", "N"], ["q", "charge", "C"], ["v", "speed", "m s⁻¹"], ["B", "magnetic field", "T"], ["θ", "angle between v and B", "rad"]],
      "The force is perpendicular to both v and B, so it does no work."),
    card(id("f"), "Lorentz force", "Lorentz force on a charge in electric and magnetic fields", "\\vec F = q\\,(\\vec E + \\vec v\\times\\vec B)",
      [["E", "electric field", "N C⁻¹"], ["B", "magnetic field", "T (= N A⁻¹ m⁻¹)"]]),
    card(id("f"), "Circular motion", "Radius of the circular path of a charge moving perpendicular to B", "r = \\dfrac{mv}{qB}",
      [["r", "radius", "m"], ["m", "mass", "kg"], ["v", "speed", "m s⁻¹"], ["q", "charge", "C"], ["B", "field", "T"]], "Equivalent form: r = √(2mK)/(qB), where K is the kinetic energy."),
    card(id("f"), "Cyclotron frequency", "Period and frequency of circular motion in a magnetic field", "T = \\dfrac{2\\pi m}{qB},\\qquad \\nu = \\dfrac{qB}{2\\pi m}",
      [["T", "period", "s"], ["ν", "frequency", "Hz"]], "Independent of the speed and radius."),
    card(id("f"), "Biot–Savart law", "Biot–Savart law for the field of a current element", "d\\vec B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{I\\,d\\vec l\\times\\hat r}{r^2}",
      [["dB", "field due to the element", "T"], ["μ₀", "permeability of free space, 4π × 10⁻⁷", "T m A⁻¹"], ["I", "current", "A"], ["dl", "length element", "m"], ["r", "distance from the element", "m"]]),
    card(id("f"), "Circular loop (centre)", "Magnetic field at the centre of a circular coil of N turns", "B = \\dfrac{\\mu_0 N I}{2R}",
      [["N", "number of turns"], ["I", "current", "A"], ["R", "radius", "m"]]),
    card(id("f"), "Circular loop (axis)", "Magnetic field on the axis of a circular loop at distance x from its centre", "B = \\dfrac{\\mu_0 I R^2}{2\\,(R^2 + x^2)^{3/2}}",
      [["x", "distance along the axis", "m"], ["R", "radius", "m"]]),
    card(id("f"), "Ampere's circuital law", "Ampere's circuital law", "\\oint \\vec B\\cdot d\\vec l = \\mu_0\\, I_{\\text{enc}}",
      [["I_enc", "net current through the loop", "A"]]),
    card(id("f"), "Long straight wire", "Field at distance r from a long straight current-carrying wire", "B = \\dfrac{\\mu_0 I}{2\\pi r}",
      [["I", "current", "A"], ["r", "perpendicular distance", "m"]], "Field lines are circles around the wire (right-hand rule)."),
    card(id("f"), "Force on a conductor", "Force on a straight conductor of length l carrying current I in a field B", "\\vec F = I\\,(\\vec l\\times\\vec B),\\qquad F = BIl\\sin\\theta",
      [["I", "current", "A"], ["l", "length", "m"], ["θ", "angle between the wire and B", "rad"]]),
    card(id("f"), "Parallel currents", "Force per unit length between two long parallel currents", "\\dfrac{F}{l} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}",
      [["I₁, I₂", "currents", "A"], ["d", "separation", "m"]], "Currents in the same direction attract; opposite directions repel. This defines the ampere."),
    card(id("f"), "Torque on a loop", "Torque on a coil of N turns in a uniform field", "\\vec\\tau = N I\\,\\vec A\\times\\vec B,\\qquad \\tau = NIAB\\sin\\theta",
      [["τ", "torque", "N m"], ["A", "area of one turn", "m²"], ["θ", "angle between the normal to the coil and B", "rad"]]),
    card(id("f"), "Magnetic moment of a loop", "Magnetic dipole moment of a current loop", "\\vec m = N I\\,\\vec A",
      [["m", "magnetic moment", "A m² (= J T⁻¹)"]], "Direction is along the normal to the loop (right-hand rule)."),
    card(id("f"), "Galvanometer", "Current sensitivity of a moving-coil galvanometer", "\\dfrac{\\phi}{I} = \\dfrac{NAB}{k}",
      [["φ", "deflection", "rad"], ["k", "torsion constant of the spring", "N m rad⁻¹"]]),
    card(id("f"), "Ammeter (shunt)", "Shunt resistance to convert a galvanometer into an ammeter of range I", "S = \\dfrac{I_g\\,G}{I - I_g}",
      [["I_g", "current for full-scale deflection", "A"], ["G", "galvanometer resistance", "Ω"], ["S", "shunt, in parallel", "Ω"]]),
    card(id("f"), "Voltmeter (series resistor)", "Series resistance to convert a galvanometer into a voltmeter of range V", "R = \\dfrac{V}{I_g} - G",
      [["V", "full-scale voltage", "V"], ["R", "series resistance", "Ω"]]),
  ],
};
