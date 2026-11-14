import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c14");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Doped semiconductor", "In a doped semiconductor at a fixed temperature, $n_e$ and $n_h$ are the electron and hole concentrations and $n_i$ is the intrinsic concentration. Which equation holds?",
      ["n_e\\,n_h = n_i^{\\,2}", "n_e + n_h = n_i", "n_e = n_h", "\\dfrac{n_e}{n_h} = n_i"], 0,
      "Doping adds one type of carrier and, through recombination, reduces the other, but their product stays fixed at $n_i^2$ for a given temperature."),
    eqq(id("e"), "Intrinsic semiconductor", "Which equation describes the carrier concentrations in a pure (intrinsic) semiconductor?",
      ["n_e = n_h = n_i", "n_e = 2\\,n_h = n_i", "n_e\\,n_h = 0", "n_e = n_h = n_i^{\\,2}"], 0,
      "Thermal energy breaks bonds in pairs, creating one free electron and one hole each time, so $n_e = n_h = n_i$."),
    eqq(id("e"), "Dynamic resistance", "On the forward characteristic of a diode, a small change $\\Delta V$ in voltage produces a change $\\Delta I$ in current. Which equation gives the dynamic resistance $r_d$?",
      ["r_d = \\dfrac{\\Delta V}{\\Delta I}", "r_d = \\dfrac{\\Delta I}{\\Delta V}", "r_d = \\Delta V\\,\\Delta I", "r_d = \\dfrac{V}{I}"], 0,
      "The dynamic resistance is the reciprocal of the slope of the $I$–$V$ curve at that point, $\\Delta V/\\Delta I$. It is not the same as the static ratio $V/I$."),
    eqq(id("e"), "Diode and resistor in series", "A silicon diode (forward voltage drop $V_d$) and a resistor $R$ are connected in series to a supply of voltage $V$, with the diode forward-biased. Which equation gives the current $I$?",
      ["I = \\dfrac{V - V_d}{R}", "I = \\dfrac{V}{R}", "I = \\dfrac{V + V_d}{R}", "I = \\dfrac{V - V_d}{R^2}"], 0,
      "The diode drops about $V_d$ (0.7 V for silicon), leaving $V - V_d$ across the resistor, so $I = (V - V_d)/R$."),
    eqq(id("e"), "Full-wave rectifier", "A full-wave rectifier is fed with an a.c. input of frequency $f_{in}$. Which equation gives the frequency $f_{out}$ of the ripple in its output?",
      ["f_{out} = 2\\,f_{in}", "f_{out} = f_{in}", "f_{out} = \\dfrac{f_{in}}{2}", "f_{out} = f_{in}^{\\,2}"], 0,
      "Both the positive and the negative half-cycles of the input produce a pulse of current in the same direction, so there are two pulses per input cycle."),
    eqq(id("e"), "Field in the depletion layer", "The barrier potential across a depletion layer of width $d$ is $V_B$. Which equation gives the average electric field $E$ in the layer?",
      ["E = \\dfrac{V_B}{d}", "E = V_B\\,d", "E = \\dfrac{d}{V_B}", "E = \\dfrac{V_B}{d^2}"], 0,
      "For a uniform field, $V_B = Ed$, so $E = V_B/d$. With $V_B\\approx0.7$ V and $d\\approx10^{-6}$ m this is of the order of $10^{5}$ to $10^{6}$ V m⁻¹, a very strong field."),
  ],
};
