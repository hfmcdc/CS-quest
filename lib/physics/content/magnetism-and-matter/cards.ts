import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c05");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Magnetic dipole moment", "Magnetic dipole moment of a bar magnet", "m = q_m\\,(2l)",
      [["m", "magnetic moment, directed from S to N", "A m² (= J T⁻¹)"], ["q_m", "pole strength", "A m"], ["2l", "magnetic length", "m"]],
      "A current loop has m = NIA, so a bar magnet is equivalent to a solenoid."),
    card(id("f"), "Axial field", "Field of a short bar magnet at a point on its axis (r ≫ l)", "B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{2m}{r^3}",
      [["B", "magnetic field, along m", "T"], ["μ₀/4π", "10⁻⁷", "T m A⁻¹"], ["m", "magnetic moment", "A m²"], ["r", "distance from the centre", "m"]]),
    card(id("f"), "Equatorial field", "Field of a short bar magnet at a point on its equatorial line (r ≫ l)", "B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{m}{r^3}",
      [["B", "magnetic field, opposite to m", "T"]], "The axial field is twice the equatorial field at the same distance."),
    card(id("f"), "Torque on a magnet", "Torque on a magnetic dipole in a uniform field", "\\vec\\tau = \\vec m\\times\\vec B,\\qquad \\tau = mB\\sin\\theta",
      [["τ", "torque", "N m"], ["θ", "angle between m and B", "rad"]]),
    card(id("f"), "Horizontal and vertical components", "Components of the Earth's field", "B_H = B_E\\cos\\delta,\\qquad B_V = B_E\\sin\\delta",
      [["B_E", "total field of the Earth at the place", "T"], ["δ", "angle of dip", "rad"], ["B_H", "horizontal component", "T"], ["B_V", "vertical component", "T"]]),
    card(id("f"), "Angle of dip", "Angle of dip in terms of the field components", "\\tan\\delta = \\dfrac{B_V}{B_H}",
      [["δ", "angle between the Earth's total field and the horizontal", "rad"]], "δ = 0° at the magnetic equator and 90° at the magnetic poles."),
    card(id("f"), "Magnetisation", "Magnetisation of a material", "M = \\dfrac{m_{\\text{net}}}{V}",
      [["M", "magnetisation (magnetic moment per unit volume)", "A m⁻¹"], ["m_net", "net magnetic moment", "A m²"], ["V", "volume", "m³"]]),
    card(id("f"), "B, H and M", "Relation between B, the magnetising field H and M", "\\vec B = \\mu_0\\,(\\vec H + \\vec M)",
      [["B", "total magnetic field in the material", "T"], ["H", "magnetising field (intensity)", "A m⁻¹"]]),
    card(id("f"), "Susceptibility", "Magnetic susceptibility", "\\chi = \\dfrac{M}{H}",
      [["χ", "susceptibility (no unit)"]], "Small and positive for paramagnetic, small and negative for diamagnetic, large and positive for ferromagnetic substances."),
    card(id("f"), "Relative permeability", "Relative permeability and permeability", "\\mu_r = 1 + \\chi,\\qquad \\mu = \\mu_0\\mu_r,\\qquad B = \\mu_0\\mu_r H",
      [["μ_r", "relative permeability (no unit)"], ["μ", "permeability of the material", "T m A⁻¹"]]),
    card(id("f"), "Curie's law", "Curie's law for paramagnetic materials", "\\chi = \\dfrac{C}{T}",
      [["C", "Curie constant", "K"], ["T", "absolute temperature", "K"]], "Susceptibility falls as the temperature rises, because thermal motion disturbs the alignment of dipoles."),
    card(id("f"), "Classes of magnetic materials", "Susceptibility of dia-, para- and ferromagnetic substances", "\\chi_{\\text{dia}}<0\\ (\\text{small}),\\quad \\chi_{\\text{para}}>0\\ (\\text{small}),\\quad \\chi_{\\text{ferro}}\\gg 1",
      [["dia", "e.g. bismuth, copper, water: weakly repelled"], ["para", "e.g. aluminium, sodium: weakly attracted"], ["ferro", "e.g. iron, cobalt, nickel: strongly attracted"]],
      "A ferromagnet becomes paramagnetic above its Curie temperature."),
  ],
};
