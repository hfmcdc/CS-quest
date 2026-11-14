import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c06");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Magnetic flux", "Magnetic flux through a plane surface in a uniform field", "\\Phi_B = BA\\cos\\theta",
      [["Φ_B", "magnetic flux", "Wb (= T m²)"], ["B", "magnetic field", "T"], ["A", "area", "m²"], ["θ", "angle between B and the normal to the surface", "rad"]]),
    card(id("f"), "Faraday's law", "Faraday's law of electromagnetic induction", "\\varepsilon = -N\\,\\dfrac{d\\Phi_B}{dt}",
      [["ε", "induced emf", "V"], ["N", "number of turns"], ["dΦ/dt", "rate of change of flux per turn", "Wb s⁻¹"]],
      "The negative sign expresses Lenz's law."),
    card(id("f"), "Lenz's law", "Lenz's law (direction of the induced current)", "\\text{Induced current opposes the change in flux that produces it}",
      [["Why", "Follows from conservation of energy."]]),
    card(id("f"), "Induced current and charge", "Induced current and charge that flows in a closed circuit of resistance R", "I = \\dfrac{\\varepsilon}{R},\\qquad Q = \\dfrac{\\Delta\\Phi}{R}",
      [["I", "induced current", "A"], ["Q", "charge passing through the circuit", "C"], ["ΔΦ", "total change in flux (per turn × N)", "Wb"], ["R", "resistance", "Ω"]],
      "The charge depends only on the change in flux, not on how fast it changes."),
    card(id("f"), "Motional emf", "Emf induced in a rod of length l moving with velocity v perpendicular to B", "\\varepsilon = B\\,l\\,v",
      [["B", "magnetic field", "T"], ["l", "length of the rod", "m"], ["v", "speed", "m s⁻¹"]], "Zero if the velocity is along the rod or along B."),
    card(id("f"), "Rotating rod", "Emf across a rod of length l rotating about one end with angular speed ω in a field B", "\\varepsilon = \\dfrac12\\,B\\,\\omega\\,l^2",
      [["ω", "angular speed", "rad s⁻¹"]]),
    card(id("f"), "Force on a moving rod", "Force needed to pull a rod (resistance R in the circuit) at constant speed", "F = BIl = \\dfrac{B^2 l^2 v}{R}",
      [["I", "induced current", "A"], ["R", "total resistance of the circuit", "Ω"]], "Mechanical work is converted into heat: Fv = I²R."),
    card(id("f"), "Eddy currents", "Eddy currents", "\\text{Closed induced currents in a bulk conductor, opposing the change in flux}",
      [["Uses", "induction furnace, electromagnetic braking; reduced by laminating cores"]]),
    card(id("f"), "Self-inductance", "Self-inductance and the emf it produces", "\\Phi = LI,\\qquad \\varepsilon = -L\\,\\dfrac{dI}{dt}",
      [["L", "self-inductance", "H (= Wb A⁻¹ = V s A⁻¹)"], ["dI/dt", "rate of change of current", "A s⁻¹"]]),
    card(id("f"), "Inductance of a long solenoid", "Self-inductance of a long solenoid (air core)", "L = \\mu_0\\,n^2\\,A\\,l",
      [["n", "turns per unit length", "m⁻¹"], ["A", "area of cross-section", "m²"], ["l", "length", "m"], ["μ₀", "permeability of free space", "T m A⁻¹"]],
      "With a core of relative permeability μ_r, replace μ₀ by μ₀μ_r."),
    card(id("f"), "Mutual inductance", "Mutual inductance of two coils", "\\Phi_2 = M\\,I_1,\\qquad \\varepsilon_2 = -M\\,\\dfrac{dI_1}{dt}",
      [["M", "mutual inductance", "H"], ["I₁", "current in the primary coil", "A"], ["ε₂", "emf induced in the secondary", "V"]],
      "Depends on the geometry of the coils and the medium, and M₁₂ = M₂₁."),
  ],
};
