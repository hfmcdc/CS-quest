import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c13");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Composition of a nucleus", "Composition of the nucleus ᴬ_Z X", "A = Z + N",
      [["A", "mass number (number of nucleons)"], ["Z", "atomic number (number of protons)"], ["N", "number of neutrons"]],
      "Isotopes: same Z, different A. Isobars: same A, different Z. Isotones: same N."),
    card(id("f"), "Atomic mass unit", "Atomic mass unit and its energy equivalent", "1\\ \\text{u} = 1.66\\times10^{-27}\\ \\text{kg} \\equiv 931.5\\ \\text{MeV}/c^2",
      [["u", "1/12 of the mass of a carbon-12 atom", "kg"], ["1 eV", "1.6 × 10⁻¹⁹ J"]]),
    card(id("f"), "Nuclear radius", "Radius of a nucleus of mass number A", "R = R_0\\,A^{1/3},\\qquad R_0 = 1.2\\ \\text{fm}",
      [["R", "nuclear radius", "m"], ["R₀", "constant, ≈ 1.2 × 10⁻¹⁵ m", "m"], ["A", "mass number"]], "1 fm = 10⁻¹⁵ m. Volume is proportional to A."),
    card(id("f"), "Nuclear density", "Density of nuclear matter", "\\rho = \\dfrac{3\\,m_{u}}{4\\pi R_0^{3}} \\approx 2.3\\times10^{17}\\ \\text{kg m}^{-3}",
      [["ρ", "nuclear density", "kg m⁻³"], ["m_u", "average mass of a nucleon, ≈ 1.66 × 10⁻²⁷ kg", "kg"]], "It is the same for all nuclei, because mass and volume are both proportional to A."),
    card(id("f"), "Mass–energy equivalence", "Einstein's mass–energy relation", "E = mc^2",
      [["E", "energy equivalent of the mass m", "J"], ["m", "mass", "kg"], ["c", "speed of light, 3 × 10⁸", "m s⁻¹"]]),
    card(id("f"), "Mass defect", "Mass defect of a nucleus ᴬ_Z X of mass M", "\\Delta m = Z\\,m_p + (A - Z)\\,m_n - M",
      [["Δm", "mass defect", "u or kg"], ["m_p, m_n", "masses of a proton and a neutron", "u"], ["M", "mass of the nucleus", "u"]]),
    card(id("f"), "Binding energy", "Binding energy of a nucleus", "E_b = \\Delta m\\,c^2 = \\Delta m\\times931.5\\ \\text{MeV/u}",
      [["E_b", "binding energy: energy needed to separate the nucleus into free nucleons", "J or MeV"]]),
    card(id("f"), "Binding energy per nucleon", "Binding energy per nucleon", "\\bar E_b = \\dfrac{E_b}{A}",
      [["Ē_b", "average binding energy per nucleon", "MeV"]], "A measure of stability. It is about 8 MeV for most nuclei and has a maximum (about 8.75 MeV) near A = 56."),
    card(id("f"), "Q-value of a reaction", "Energy released (Q-value) in a nuclear reaction", "Q = \\left(\\sum m_{\\text{reactants}} - \\sum m_{\\text{products}}\\right)c^2",
      [["Q", "energy released (positive) or absorbed (negative)", "J or MeV"]], "Equivalently, the difference in total binding energy of products and reactants."),
    card(id("f"), "Nuclear force", "Properties of the nuclear force", "\\text{strong, short-range (a few fm), charge-independent, attractive at ~1 fm, repulsive at < 0.8 fm}",
      [["Nature", "acts between all pairs of nucleons (p–p, n–n, p–n) and is much stronger than the electrostatic force at short range"]]),
    card(id("f"), "Nuclear fission", "Nuclear fission", "{}^{235}_{92}\\text{U} + n \\to {}^{236}_{92}\\text{U} \\to \\text{two medium-mass nuclei} + \\text{neutrons} + \\approx 200\\ \\text{MeV}",
      [["Why energy is released", "fragments have higher binding energy per nucleon (≈ 8.5 MeV) than the heavy nucleus (≈ 7.6 MeV)"]], "A chain reaction occurs when the emitted neutrons cause further fissions."),
    card(id("f"), "Nuclear fusion", "Nuclear fusion", "{}^{2}_{1}\\text{H} + {}^{2}_{1}\\text{H} \\to {}^{3}_{2}\\text{He} + n + 3.27\\ \\text{MeV}",
      [["Condition", "very high temperature (≈ 10⁷ – 10⁹ K) to overcome Coulomb repulsion"], ["Source of energy", "Sun and stars"]]),
  ],
};
