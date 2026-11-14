import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c07");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "AC voltage and current", "Sinusoidal alternating voltage and current", "v = v_m\\sin\\omega t,\\qquad i = i_m\\sin(\\omega t + \\phi),\\qquad \\omega = 2\\pi\\nu",
      [["v_m, i_m", "peak values", "V, A"], ["ω", "angular frequency", "rad s⁻¹"], ["ν", "frequency", "Hz"], ["φ", "phase difference", "rad"]]),
    card(id("f"), "rms values", "Root-mean-square value of alternating current and voltage", "I_{rms} = \\dfrac{i_m}{\\sqrt2} \\approx 0.707\\,i_m,\\qquad V_{rms} = \\dfrac{v_m}{\\sqrt2}",
      [["I_rms", "rms current", "A"], ["V_rms", "rms voltage", "V"]], "The rms value is the DC value that produces the same heating."),
    card(id("f"), "Inductive reactance", "Reactance of an inductor", "X_L = \\omega L = 2\\pi\\nu L",
      [["X_L", "inductive reactance", "Ω"], ["L", "inductance", "H"]], "In a pure inductor the current lags the voltage by π/2."),
    card(id("f"), "Capacitive reactance", "Reactance of a capacitor", "X_C = \\dfrac{1}{\\omega C} = \\dfrac{1}{2\\pi\\nu C}",
      [["X_C", "capacitive reactance", "Ω"], ["C", "capacitance", "F"]], "In a pure capacitor the current leads the voltage by π/2. A capacitor blocks DC."),
    card(id("f"), "Impedance", "Impedance of a series LCR circuit", "Z = \\sqrt{R^2 + (X_L - X_C)^2},\\qquad V_{rms} = I_{rms}Z",
      [["Z", "impedance", "Ω"], ["R", "resistance", "Ω"]]),
    card(id("f"), "Phase angle", "Phase angle in a series LCR circuit", "\\tan\\phi = \\dfrac{X_L - X_C}{R}",
      [["φ", "phase angle by which the voltage leads the current", "rad"]], "φ > 0 for an inductive circuit and φ < 0 for a capacitive one."),
    card(id("f"), "Resonance", "Resonant angular frequency of a series LCR circuit", "\\omega_0 = \\dfrac{1}{\\sqrt{LC}},\\qquad \\nu_0 = \\dfrac{1}{2\\pi\\sqrt{LC}}",
      [["ω₀", "resonant angular frequency", "rad s⁻¹"]], "At resonance X_L = X_C, Z = R is minimum and the current is maximum."),
    card(id("f"), "Average power", "Average power in an AC circuit", "\\bar P = V_{rms}\\,I_{rms}\\cos\\phi",
      [["P̄", "average power", "W"], ["cos φ", "power factor"]]),
    card(id("f"), "Power factor", "Power factor of a series LCR circuit", "\\cos\\phi = \\dfrac{R}{Z}",
      [["cos φ", "power factor (no unit)"]], "For a pure L or C, φ = 90° so the average power is zero (wattless current)."),
    card(id("f"), "LC oscillations", "Frequency of free oscillations in an LC circuit (qualitative treatment)", "\\omega = \\dfrac{1}{\\sqrt{LC}}",
      [["Idea", "energy oscillates between the electric field of C and the magnetic field of L"]]),
    card(id("f"), "AC generator", "Emf of a coil of N turns rotating in a uniform magnetic field", "e = NBA\\,\\omega\\sin\\omega t",
      [["N", "number of turns"], ["B", "magnetic field", "T"], ["A", "area of the coil", "m²"], ["ω", "angular speed of rotation", "rad s⁻¹"]], "Peak emf: ε₀ = NBAω."),
    card(id("f"), "Transformer", "Ideal transformer", "\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p} = \\dfrac{I_p}{I_s}",
      [["V_p, V_s", "primary and secondary voltages", "V"], ["N_p, N_s", "number of turns"], ["I_p, I_s", "currents", "A"]],
      "Step-up: N_s > N_p. It works only with AC (a changing flux is required)."),
  ],
};
