import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c02");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Potential", "Electric potential at a point", "V = \\dfrac{W}{q_0}",
      [["V", "electric potential", "V (= J C⁻¹)"], ["W", "work done by an external agent in bringing q₀ from infinity", "J"], ["q₀", "small positive test charge", "C"]],
      "Potential is a scalar."),
    card(id("f"), "Potential difference", "Potential difference between points A and B", "V_B - V_A = \\dfrac{W_{AB}}{q_0} = -\\int_A^B \\vec E\\cdot d\\vec l",
      [["V_B − V_A", "potential difference", "V"], ["W_AB", "work done in moving q₀ from A to B", "J"]]),
    card(id("f"), "Potential of a point charge", "Potential at distance r from a point charge q", "V = \\dfrac{1}{4\\pi\\varepsilon_0}\\,\\dfrac{q}{r} = \\dfrac{kq}{r}",
      [["V", "potential", "V"], ["q", "source charge (with sign)", "C"], ["r", "distance", "m"]]),
    card(id("f"), "System of charges", "Potential due to a system of point charges", "V = \\dfrac{1}{4\\pi\\varepsilon_0}\\sum_{i}\\dfrac{q_i}{r_i}",
      [["q_i", "i-th charge (with sign)", "C"], ["r_i", "distance of the point from q_i", "m"]],
      "Add potentials algebraically (they are scalars)."),
    card(id("f"), "Dipole potential", "Potential of a short dipole at a point (r, θ)", "V = \\dfrac{1}{4\\pi\\varepsilon_0}\\,\\dfrac{p\\cos\\theta}{r^2}",
      [["p", "dipole moment", "C m"], ["θ", "angle between the position vector and p", "rad"], ["r", "distance from the centre", "m"]],
      "On the axis V = kp/r²; on the equatorial plane V = 0."),
    card(id("f"), "Field and potential", "Relation between electric field and potential", "E = -\\dfrac{dV}{dr}",
      [["E", "field component along r", "V m⁻¹"], ["dV/dr", "potential gradient", "V m⁻¹"]],
      "Field points in the direction of decreasing potential and is perpendicular to equipotential surfaces. For a uniform field, E = V/d."),
    card(id("f"), "Potential energy of two charges", "Electrostatic potential energy of two point charges", "U = \\dfrac{1}{4\\pi\\varepsilon_0}\\,\\dfrac{q_1 q_2}{r}",
      [["U", "potential energy of the pair", "J"], ["q₁, q₂", "charges (with sign)", "C"], ["r", "separation", "m"]]),
    card(id("f"), "Dipole energy", "Potential energy of a dipole in a uniform field", "U = -\\vec p\\cdot\\vec E = -pE\\cos\\theta",
      [["U", "potential energy", "J"], ["p", "dipole moment", "C m"], ["E", "field", "N C⁻¹"], ["θ", "angle between p and E", "rad"]],
      "Taking U = 0 when p is perpendicular to E."),
    card(id("f"), "Capacitance", "Definition of capacitance", "C = \\dfrac{Q}{V}",
      [["C", "capacitance", "F (= C V⁻¹)"], ["Q", "charge on either plate", "C"], ["V", "potential difference between the plates", "V"]]),
    card(id("f"), "Parallel-plate capacitor", "Capacitance of a parallel-plate capacitor (air or vacuum)", "C = \\dfrac{\\varepsilon_0 A}{d}",
      [["A", "area of each plate", "m²"], ["d", "plate separation", "m"], ["ε₀", "permittivity of free space", "C² N⁻¹ m⁻²"]]),
    card(id("f"), "Dielectric", "Capacitance with a dielectric of constant K filling the space", "C = \\dfrac{K\\varepsilon_0 A}{d} = K\\,C_0",
      [["K", "dielectric constant (no unit)"], ["C₀", "capacitance without the dielectric", "F"]]),
    card(id("f"), "Dielectric slab", "Capacitance with a slab of thickness t and constant K, with t < d", "C = \\dfrac{\\varepsilon_0 A}{d - t + \\dfrac{t}{K}}",
      [["t", "slab thickness", "m"], ["d", "plate separation", "m"], ["K", "dielectric constant"]]),
    card(id("f"), "Series combination", "Equivalent capacitance in series", "\\dfrac{1}{C} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2} + \\cdots",
      [["C", "equivalent capacitance", "F"], ["C₁, C₂ …", "individual capacitances", "F"]], "Each capacitor carries the same charge."),
    card(id("f"), "Parallel combination", "Equivalent capacitance in parallel", "C = C_1 + C_2 + \\cdots",
      [["C", "equivalent capacitance", "F"]], "Each capacitor has the same potential difference."),
    card(id("f"), "Energy stored", "Energy stored in a charged capacitor", "U = \\dfrac12 CV^2 = \\dfrac12 QV = \\dfrac{Q^2}{2C}",
      [["U", "stored energy", "J"], ["C", "capacitance", "F"], ["V", "potential difference", "V"], ["Q", "charge", "C"]]),
  ],
};
