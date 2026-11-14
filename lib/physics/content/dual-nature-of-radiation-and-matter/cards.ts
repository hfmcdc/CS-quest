import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c11");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Photon energy", "Energy of a photon", "E = h\\nu = \\dfrac{hc}{\\lambda}",
      [["E", "photon energy", "J (or eV; 1 eV = 1.6 × 10⁻¹⁹ J)"], ["h", "Planck's constant, 6.63 × 10⁻³⁴", "J s"], ["ν", "frequency", "Hz"], ["λ", "wavelength", "m"]],
      "A handy form: E (eV) = 1240 / λ (nm)."),
    card(id("f"), "Einstein's photoelectric equation", "Einstein's photoelectric equation", "h\\nu = \\phi_0 + K_{max}",
      [["φ₀", "work function of the metal", "J or eV"], ["K_max", "maximum kinetic energy of the photoelectrons", "J or eV"]],
      "One photon gives all its energy to one electron."),
    card(id("f"), "Threshold frequency", "Threshold frequency and threshold wavelength", "\\nu_0 = \\dfrac{\\phi_0}{h},\\qquad \\lambda_0 = \\dfrac{hc}{\\phi_0}",
      [["ν₀", "threshold frequency, below which there is no emission", "Hz"], ["λ₀", "threshold wavelength", "m"]]),
    card(id("f"), "Maximum kinetic energy", "Maximum kinetic energy in terms of frequency", "K_{max} = h(\\nu - \\nu_0)",
      [["ν", "frequency of the incident light", "Hz"]], "K_max depends on ν, not on intensity."),
    card(id("f"), "Stopping potential", "Stopping potential", "eV_0 = K_{max}",
      [["V₀", "stopping potential", "V"], ["e", "electron charge, 1.6 × 10⁻¹⁹", "C"]], "A graph of V₀ against ν is a straight line of slope h/e."),
    card(id("f"), "Effect of intensity", "Effect of intensity and frequency on the photoelectric current", "I_{sat}\\propto \\text{intensity};\\qquad V_0\\ \\text{depends on}\\ \\nu\\ \\text{only}",
      [["I_sat", "saturation photocurrent (for ν above the threshold)", "A"]], "Doubling the intensity doubles the number of photons, and so the saturation current, but not K_max."),
    card(id("f"), "Photon momentum", "Momentum of a photon", "p = \\dfrac{h}{\\lambda} = \\dfrac{E}{c}",
      [["p", "photon momentum", "kg m s⁻¹"], ["E", "photon energy", "J"], ["c", "speed of light", "m s⁻¹"]], "A photon has zero rest mass."),
    card(id("f"), "de Broglie wavelength", "de Broglie wavelength of a particle", "\\lambda = \\dfrac{h}{p} = \\dfrac{h}{mv}",
      [["λ", "de Broglie wavelength", "m"], ["p", "momentum", "kg m s⁻¹"], ["m", "mass", "kg"], ["v", "speed", "m s⁻¹"]]),
    card(id("f"), "de Broglie wavelength and kinetic energy", "de Broglie wavelength in terms of kinetic energy", "\\lambda = \\dfrac{h}{\\sqrt{2mK}}",
      [["K", "kinetic energy", "J"]]),
    card(id("f"), "Accelerated charged particle", "de Broglie wavelength of a particle of charge q accelerated through a potential difference V", "\\lambda = \\dfrac{h}{\\sqrt{2mqV}}",
      [["q", "charge", "C"], ["V", "accelerating potential difference", "V"]]),
    card(id("f"), "Electron wavelength", "de Broglie wavelength of an electron accelerated through V volts", "\\lambda = \\dfrac{12.27}{\\sqrt{V}}\\ \\text{\\AA} = \\dfrac{1.227}{\\sqrt{V}}\\ \\text{nm}",
      [["V", "accelerating voltage in volts (numerically)"]], "Obtained from λ = h/√(2meV)."),
  ],
};
