import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c08");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Speed of light from constants", "Maxwell's equations predict the speed $c$ of electromagnetic waves in terms of the permeability $\\mu_0$ and permittivity $\\varepsilon_0$ of free space. Which equation is correct?",
      ["c = \\dfrac{1}{\\sqrt{\\mu_0\\,\\varepsilon_0}}", "c = \\sqrt{\\mu_0\\,\\varepsilon_0}", "c = \\dfrac{1}{\\mu_0\\,\\varepsilon_0}", "c = \\sqrt{\\dfrac{\\mu_0}{\\varepsilon_0}}"], 0,
      "Check dimensions: $\\mu_0\\varepsilon_0$ has units $\\text{s}^2\\text{m}^{-2}$, so $1/\\sqrt{\\mu_0\\varepsilon_0}$ is a speed. $\\sqrt{\\mu_0/\\varepsilon_0}$ is the impedance of free space (in ohms)."),
    eqq(id("e"), "Displacement current", "A changing electric flux $\\Phi_E$ through a surface acts as a source of magnetic field. Which equation gives the displacement current $I_d$?",
      ["I_d = \\varepsilon_0\\,\\dfrac{d\\Phi_E}{dt}", "I_d = \\dfrac{1}{\\varepsilon_0}\\dfrac{d\\Phi_E}{dt}", "I_d = \\varepsilon_0\\,\\Phi_E\\,t", "I_d = \\mu_0\\,\\dfrac{d\\Phi_E}{dt}"], 0,
      "Maxwell defined $I_d = \\varepsilon_0\\,d\\Phi_E/dt$, so that the total current $I_c + I_d$ is continuous. For a charging capacitor it equals the conduction current in the wires."),
    eqq(id("e"), "Field amplitudes", "In a plane electromagnetic wave in vacuum the amplitudes of the electric and magnetic fields are $E_0$ and $B_0$. Which equation relates them?",
      ["E_0 = c\\,B_0", "E_0 = \\dfrac{B_0}{c}", "E_0 = c^2\\,B_0", "E_0 = B_0 - c"], 0,
      "From the wave equations, $E/B = c$ at every instant. Hence $E_0 = cB_0$, and the electric field is numerically much larger than the magnetic field."),
    eqq(id("e"), "Wavelength and frequency", "An electromagnetic wave of frequency $\\nu$ travels in vacuum. Which equation gives its wavelength $\\lambda$?",
      ["\\lambda = \\dfrac{c}{\\nu}", "\\lambda = c\\,\\nu", "\\lambda = \\dfrac{\\nu}{c}", "\\lambda = \\dfrac{c}{\\nu^2}"], 0,
      "The wave travels one wavelength in one period: $c = \\nu\\lambda$, so $\\lambda = c/\\nu$."),
    eqq(id("e"), "Wave number", "Which equation correctly gives the wave number $k$ of a wave of wavelength $\\lambda$?",
      ["k = \\dfrac{2\\pi}{\\lambda}", "k = 2\\pi\\lambda", "k = \\dfrac{\\lambda}{2\\pi}", "k = \\dfrac{1}{2\\pi\\lambda}"], 0,
      "In $\\sin(kx - \\omega t)$ the phase changes by $2\\pi$ when $x$ increases by one wavelength, so $k\\lambda = 2\\pi$."),
    eqq(id("e"), "Refractive index", "An electromagnetic wave travels with speed $v$ in a medium and with speed $c$ in vacuum. Which equation gives the refractive index $n$ of the medium?",
      ["n = \\dfrac{c}{v}", "n = \\dfrac{v}{c}", "n = c\\,v", "n = \\dfrac{c}{v^2}"], 0,
      "Refractive index is the ratio of the speed in vacuum to the speed in the medium, $n = c/v = \\sqrt{\\mu_r\\varepsilon_r}$. It is greater than 1 for ordinary media."),
  ],
};
