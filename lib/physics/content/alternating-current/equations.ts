import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c07");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Capacitive reactance", "An AC source of angular frequency $\\omega$ is connected across a capacitor $C$. Which equation gives the opposition (reactance) offered by the capacitor?",
      ["X_C = \\dfrac{1}{\\omega C}", "X_C = \\omega C", "X_C = \\dfrac{\\omega}{C}", "X_C = \\dfrac{1}{\\omega^2 C}"], 0,
      "A higher frequency or larger capacitance lets more charge flow, so the opposition is smaller: $X_C = 1/\\omega C$. For DC ($\\omega = 0$) it is infinite."),
    eqq(id("e"), "Impedance", "A resistor $R$, inductor (reactance $X_L$) and capacitor (reactance $X_C$) are in series across an AC source. Which equation gives the impedance $Z$?",
      ["Z = \\sqrt{R^2 + (X_L - X_C)^2}", "Z = R + X_L + X_C", "Z = \\sqrt{R^2 + (X_L + X_C)^2}", "Z = \\sqrt{R^2 - (X_L - X_C)^2}"], 0,
      "The voltages across L and C are $180^\\circ$ out of phase, so the net reactance is $X_L - X_C$. This is $90^\\circ$ out of phase with $R$, so they combine as a vector sum."),
    eqq(id("e"), "Resonance", "In a series LCR circuit the current is maximum at a particular angular frequency $\\omega_0$. Which equation gives it?",
      ["\\omega_0 = \\dfrac{1}{\\sqrt{LC}}", "\\omega_0 = \\sqrt{LC}", "\\omega_0 = \\dfrac{1}{LC}", "\\omega_0 = \\dfrac{1}{\\sqrt{L/C}}"], 0,
      "The current is maximum when $X_L = X_C$, that is $\\omega_0L = \\dfrac{1}{\\omega_0C}$, giving $\\omega_0 = \\dfrac{1}{\\sqrt{LC}}$."),
    eqq(id("e"), "Average power", "A series circuit has an rms voltage $V_{rms}$, rms current $I_{rms}$ and the voltage leads the current by $\\phi$. Which equation gives the average power consumed?",
      ["\\bar P = V_{rms}\\,I_{rms}\\cos\\phi", "\\bar P = V_{rms}\\,I_{rms}\\sin\\phi", "\\bar P = \\dfrac{V_{rms}\\,I_{rms}}{\\cos\\phi}", "\\bar P = V_{rms}\\,I_{rms}\\tan\\phi"], 0,
      "Only the component of current in phase with the voltage does net work: $\\bar P = V_{rms}I_{rms}\\cos\\phi$. For a pure inductor or capacitor $\\phi = 90^\\circ$ and the average power is zero."),
    eqq(id("e"), "Transformer", "An ideal transformer has $N_p$ turns in its primary and $N_s$ in its secondary. Which equation relates the voltages $V_p$ and $V_s$?",
      ["\\dfrac{V_s}{V_p} = \\dfrac{N_s}{N_p}", "\\dfrac{V_s}{V_p} = \\dfrac{N_p}{N_s}", "V_s\\,V_p = N_s\\,N_p", "V_s - V_p = N_s - N_p"], 0,
      "The same flux links both coils, so emf per turn is equal: $V_s/N_s = V_p/N_p$. Currents are in the inverse ratio, $I_p/I_s = N_s/N_p$."),
    eqq(id("e"), "rms current", "An alternating current has a peak value $i_m$. Which equation gives its rms value?",
      ["I_{rms} = \\dfrac{i_m}{\\sqrt{2}}", "I_{rms} = \\dfrac{i_m}{2}", "I_{rms} = i_m\\sqrt{2}", "I_{rms} = \\dfrac{2\\,i_m}{\\pi}"], 0,
      "The mean value of $\\sin^2\\omega t$ over a cycle is $\\tfrac12$, so $I_{rms}^2 = \\tfrac12 i_m^2$ and $I_{rms} = i_m/\\sqrt2 \\approx 0.707\\,i_m$."),
  ],
};
