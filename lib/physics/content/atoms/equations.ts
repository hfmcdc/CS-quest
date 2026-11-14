import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c12");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Energy levels of hydrogen", "Which equation gives the total energy of the electron in the $n$-th orbit of a hydrogen atom?",
      ["E_n = -\\dfrac{13.6}{n^2}\\ \\text{eV}", "E_n = -\\dfrac{13.6}{n}\\ \\text{eV}", "E_n = +\\dfrac{13.6}{n^2}\\ \\text{eV}", "E_n = -13.6\\,n^2\\ \\text{eV}"], 0,
      "The energy is negative (the electron is bound) and its magnitude falls as $1/n^2$: $-13.6$ eV, $-3.4$ eV, $-1.51$ eV, … approaching zero as $n\\to\\infty$."),
    eqq(id("e"), "Bohr radius", "The radius of the first Bohr orbit of hydrogen is $a_0$. Which equation gives the radius $r_n$ of the $n$-th orbit?",
      ["r_n = n^2\\,a_0", "r_n = n\\,a_0", "r_n = \\dfrac{a_0}{n^2}", "r_n = \\dfrac{a_0}{n}"], 0,
      "From the quantisation condition and the Coulomb force, $r_n\\propto n^2$. So the radii are $a_0, 4a_0, 9a_0, \\ldots$"),
    eqq(id("e"), "Angular momentum", "Which equation expresses Bohr's quantisation condition for the angular momentum $L$ of the electron in a stationary orbit?",
      ["L = \\dfrac{n\\,h}{2\\pi}", "L = n\\,h", "L = \\dfrac{h}{2\\pi\\,n}", "L = \\dfrac{n\\,h}{4\\pi}"], 0,
      "Bohr postulated that only orbits with angular momentum equal to an integral multiple of $h/2\\pi$ are allowed. De Broglie's picture explains this as fitting a whole number of wavelengths on the orbit."),
    eqq(id("e"), "Hydrogen spectrum", "An electron in a hydrogen atom falls from level $n_i$ to level $n_f$. Which equation gives the wavelength $\\lambda$ of the emitted photon (Rydberg constant $R$)?",
      ["\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)", "\\dfrac{1}{\\lambda} = R\\left(\\dfrac{1}{n_f} - \\dfrac{1}{n_i}\\right)", "\\lambda = R\\left(\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}\\right)", "\\dfrac{1}{\\lambda} = R\\left(n_i^2 - n_f^2\\right)"], 0,
      "Using $h\\nu = E_i - E_f$ with $E_n = -13.6/n^2$ eV, the energy of the photon is proportional to $\\dfrac{1}{n_f^2} - \\dfrac{1}{n_i^2}$, and $\\dfrac1\\lambda = \\dfrac{E}{hc}$."),
    eqq(id("e"), "Photon emission", "An atom makes a transition from an energy level $E_i$ to a lower level $E_f$ and emits a photon of frequency $\\nu$. Which equation is Bohr's frequency condition?",
      ["h\\nu = E_i - E_f", "h\\nu = E_i + E_f", "\\nu = h\\,(E_i - E_f)", "h\\nu = \\dfrac{E_i}{E_f}"], 0,
      "Energy conservation: the photon carries away the energy difference between the two levels, $h\\nu = E_i - E_f$."),
    eqq(id("e"), "Orbital speed", "The speed of the electron in the first Bohr orbit of hydrogen is $v_1$. Which equation gives its speed $v_n$ in the $n$-th orbit?",
      ["v_n = \\dfrac{v_1}{n}", "v_n = n\\,v_1", "v_n = \\dfrac{v_1}{n^2}", "v_n = n^2\\,v_1"], 0,
      "From $mv_nr_n = nh/2\\pi$ with $r_n\\propto n^2$ we get $v_n\\propto 1/n$. The electron moves more slowly in higher orbits."),
  ],
};
