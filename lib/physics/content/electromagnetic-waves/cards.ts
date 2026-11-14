import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c08");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Displacement current", "Displacement current produced by a changing electric flux", "I_d = \\varepsilon_0\\,\\dfrac{d\\Phi_E}{dt}",
      [["I_d", "displacement current", "A"], ["ε₀", "permittivity of free space", "C² N⁻¹ m⁻²"], ["Φ_E", "electric flux through the surface", "N m² C⁻¹"]],
      "It exists in a charging capacitor, where there is no conduction current between the plates."),
    card(id("f"), "Ampere–Maxwell law", "Ampere's circuital law with the displacement current", "\\oint \\vec B\\cdot d\\vec l = \\mu_0\\,(I_c + I_d)",
      [["I_c", "conduction current", "A"], ["I_d", "displacement current", "A"]], "Total current is continuous across a capacitor: I_c in the wires equals I_d between the plates."),
    card(id("f"), "Speed of EM waves in vacuum", "Speed of electromagnetic waves in free space", "c = \\dfrac{1}{\\sqrt{\\mu_0\\varepsilon_0}} = 3\\times10^{8}\\ \\text{m s}^{-1}",
      [["c", "speed of light in vacuum", "m s⁻¹"], ["μ₀", "permeability of free space", "T m A⁻¹"], ["ε₀", "permittivity of free space", "C² N⁻¹ m⁻²"]]),
    card(id("f"), "Wave relation", "Relation between speed, frequency and wavelength", "c = \\nu\\,\\lambda",
      [["ν", "frequency", "Hz"], ["λ", "wavelength", "m"]]),
    card(id("f"), "Sinusoidal EM wave", "Fields of a plane EM wave travelling along +x", "E_y = E_0\\sin(kx - \\omega t),\\qquad B_z = B_0\\sin(kx - \\omega t)",
      [["E₀, B₀", "amplitudes of the electric and magnetic fields", "V m⁻¹, T"], ["k", "wave number, 2π/λ", "m⁻¹"], ["ω", "angular frequency, 2πν", "rad s⁻¹"]],
      "E, B and the direction of propagation are mutually perpendicular (transverse wave)."),
    card(id("f"), "Direction of propagation", "Direction in which an electromagnetic wave travels", "\\vec E\\times\\vec B\\ \\text{points along the direction of propagation}",
      [["E", "electric field vector", "V m⁻¹"], ["B", "magnetic field vector", "T"]], "Both fields are perpendicular to the direction of travel, so EM waves are transverse."),
    card(id("f"), "Amplitude ratio", "Ratio of the electric and magnetic field amplitudes in vacuum", "\\dfrac{E_0}{B_0} = c",
      [["E₀", "electric field amplitude", "V m⁻¹"], ["B₀", "magnetic field amplitude", "T"]], "E and B oscillate in phase."),
    card(id("f"), "Wave number and angular frequency", "Wave number and angular frequency", "k = \\dfrac{2\\pi}{\\lambda},\\qquad \\omega = 2\\pi\\nu,\\qquad c = \\dfrac{\\omega}{k}",
      [["k", "wave number", "m⁻¹"], ["ω", "angular frequency", "rad s⁻¹"]]),
    card(id("f"), "Speed in a medium", "Speed of an EM wave in a medium", "v = \\dfrac{1}{\\sqrt{\\mu\\varepsilon}} = \\dfrac{c}{\\sqrt{\\mu_r\\varepsilon_r}},\\qquad n = \\dfrac{c}{v}",
      [["v", "speed in the medium", "m s⁻¹"], ["μ_r, ε_r", "relative permeability and permittivity"], ["n", "refractive index"]],
      "The frequency stays the same when a wave enters a medium; the wavelength changes."),
    card(id("f"), "Electromagnetic spectrum", "Electromagnetic spectrum in order of decreasing wavelength", "\\text{radio} > \\text{microwave} > \\text{infrared} > \\text{visible} > \\text{ultraviolet} > \\text{X-ray} > \\gamma\\text{-ray}",
      [["radio", "wavelength > 0.1 m: communication, broadcasting"], ["microwave", "0.1 m to 1 mm: radar, ovens, satellite links"], ["infrared", "1 mm to 700 nm: heating, remote controls, night vision"],
       ["visible", "700 nm to 400 nm: vision"], ["ultraviolet", "400 nm to 1 nm: sterilisation, LASIK eye surgery"], ["X-ray", "1 nm to 10⁻³ nm: medical imaging"], ["γ-ray", "< 10⁻³ nm: cancer treatment, nuclear processes"]],
      "Frequency increases in the reverse order. All travel at c in vacuum."),
  ],
};
