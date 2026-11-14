import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c12");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Alpha-particle scattering", "Conclusions of the Geiger–Marsden α-scattering experiment", "\\text{Atom is mostly empty space; positive charge and mass are concentrated in a tiny nucleus}",
      [["Observation", "most α particles pass straight through; a very few (about 1 in 8000) are deflected by more than 90°"], ["Size", "nucleus ≈ 10⁻¹⁵ m, atom ≈ 10⁻¹⁰ m"]]),
    card(id("f"), "Distance of closest approach", "Distance of closest approach of an α particle (kinetic energy K) head-on to a nucleus of charge Ze", "r_0 = \\dfrac{1}{4\\pi\\varepsilon_0}\\,\\dfrac{2Ze^2}{K}",
      [["r₀", "distance of closest approach", "m"], ["Z", "atomic number of the target nucleus"], ["K", "initial kinetic energy of the α particle", "J"], ["2e", "charge of the α particle", "C"]],
      "At closest approach all the kinetic energy has become electrostatic potential energy."),
    card(id("f"), "Bohr's quantisation condition", "Bohr's first postulate: allowed orbits", "L = m v r = \\dfrac{n h}{2\\pi},\\qquad n = 1, 2, 3, \\ldots",
      [["L", "angular momentum of the electron", "kg m² s⁻¹"], ["n", "principal quantum number"], ["h", "Planck's constant", "J s"]], "In these stationary orbits the electron does not radiate."),
    card(id("f"), "Bohr's frequency condition", "Bohr's second postulate: emission or absorption of a photon", "h\\nu = E_i - E_f",
      [["E_i", "energy of the initial (higher) level", "J or eV"], ["E_f", "energy of the final level", "J or eV"], ["ν", "frequency of the photon", "Hz"]]),
    card(id("f"), "Radius of the n-th orbit", "Radius of the n-th Bohr orbit of hydrogen", "r_n = n^2\\,a_0,\\qquad a_0 = 0.529\\ \\text{\\AA}",
      [["r_n", "orbit radius", "m"], ["a₀", "Bohr radius (n = 1)", "m"]]),
    card(id("f"), "Speed in the n-th orbit", "Speed of the electron in the n-th Bohr orbit", "v_n = \\dfrac{v_1}{n},\\qquad v_1 \\approx 2.19\\times10^{6}\\ \\text{m s}^{-1}",
      [["v_n", "orbital speed", "m s⁻¹"], ["v₁", "speed in the first orbit", "m s⁻¹"]]),
    card(id("f"), "Energy of the n-th level", "Total energy of the electron in the n-th orbit of hydrogen", "E_n = -\\dfrac{13.6}{n^2}\\ \\text{eV}",
      [["E_n", "total energy (negative: the electron is bound)", "eV"]], "Ground state: −13.6 eV. Ionisation energy: 13.6 eV."),
    card(id("f"), "Kinetic and potential energy", "Kinetic, potential and total energy in a Bohr orbit", "K = -E_n,\\qquad U = 2E_n",
      [["K", "kinetic energy (positive)", "eV"], ["U", "electrostatic potential energy", "eV"]]),
    card(id("f"), "Rydberg formula", "Wavelengths in the hydrogen spectrum", "\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right),\\qquad R = 1.097\\times10^{7}\\ \\text{m}^{-1}",
      [["n_i", "initial level (higher)"], ["n_f", "final level"], ["R", "Rydberg constant", "m⁻¹"], ["λ", "wavelength of the emitted photon", "m"]]),
    card(id("f"), "Spectral series", "Spectral series of hydrogen (by final level n_f)", "\\text{Lyman } (n_f=1),\\ \\text{Balmer } (2),\\ \\text{Paschen } (3),\\ \\text{Brackett } (4),\\ \\text{Pfund } (5)",
      [["Lyman", "ultraviolet"], ["Balmer", "visible"], ["Paschen, Brackett, Pfund", "infrared"]], "Longest wavelength in a series: n_i = n_f + 1. Shortest (series limit): n_i = ∞."),
    card(id("f"), "Number of spectral lines", "Number of different spectral lines when an electron falls from level n", "N = \\dfrac{n(n-1)}{2}",
      [["n", "highest level from which the transitions start"]]),
  ],
};
