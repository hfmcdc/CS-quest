import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c14");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Energy bands", "Classification of solids by their energy bands (qualitative)", "\\text{conductor: bands overlap};\\quad \\text{semiconductor: } E_g < 3\\ \\text{eV};\\quad \\text{insulator: } E_g > 3\\ \\text{eV}",
      [["E_g", "energy gap between the valence band and the conduction band", "eV"], ["Si", "E_g ≈ 1.1 eV"], ["Ge", "E_g ≈ 0.67 eV"], ["Diamond", "E_g ≈ 5.4 eV (insulator)"]],
      "Resistivity: metals 10⁻² – 10⁻⁸ Ω m, semiconductors 10⁻⁵ – 10⁶ Ω m, insulators > 10⁸ Ω m."),
    card(id("f"), "Intrinsic semiconductor", "Carrier concentrations in a pure (intrinsic) semiconductor", "n_e = n_h = n_i",
      [["n_e", "number density of free electrons", "m⁻³"], ["n_h", "number density of holes", "m⁻³"], ["n_i", "intrinsic carrier concentration", "m⁻³"]],
      "Each broken covalent bond makes one electron and one hole. The concentration increases with temperature."),
    card(id("f"), "Extrinsic semiconductor", "Mass-action relation in a doped (extrinsic) semiconductor", "n_e\\,n_h = n_i^{\\,2}",
      [["n_i", "intrinsic concentration at the same temperature", "m⁻³"]], "Doping raises one kind of carrier and lowers the other."),
    card(id("f"), "n-type semiconductor", "n-type semiconductor", "n_e \\gg n_h\\quad(\\text{donor atoms: As, P, Sb; majority carriers are electrons})",
      [["Dopant", "pentavalent (group 15): 5 valence electrons, 4 bond with silicon, 1 is free"]]),
    card(id("f"), "p-type semiconductor", "p-type semiconductor", "n_h \\gg n_e\\quad(\\text{acceptor atoms: B, Al, In; majority carriers are holes})",
      [["Dopant", "trivalent (group 13): 3 valence electrons, leaving a hole in one bond"]]),
    card(id("f"), "p–n junction", "Depletion region and barrier potential of a p–n junction", "V_B \\approx 0.7\\ \\text{V (Si)},\\quad 0.3\\ \\text{V (Ge)};\\qquad E = \\dfrac{V_B}{d}",
      [["V_B", "barrier potential across the depletion layer", "V"], ["d", "width of the depletion layer, ≈ 10⁻⁶ m", "m"], ["E", "electric field in the depletion layer", "V m⁻¹"]],
      "The depletion layer has no mobile carriers, only fixed ions."),
    card(id("f"), "Forward bias", "Diode in forward bias (p-side to the positive terminal)", "I = \\dfrac{V - V_d}{R}\\quad(V > V_d)",
      [["V", "supply voltage", "V"], ["V_d", "voltage drop across the conducting diode (≈ 0.7 V for Si, 0.3 V for Ge)", "V"], ["R", "series resistor", "Ω"]],
      "Forward bias narrows the depletion layer and lowers the barrier: the current rises rapidly after the knee voltage."),
    card(id("f"), "Reverse bias", "Diode in reverse bias", "I_{\\text{reverse}}\\approx \\text{a few }\\mu\\text{A (very small)}",
      [["Effect", "widens the depletion layer and raises the barrier; only a small current of minority carriers flows"]], "A diode conducts in one direction only, which is why it is used as a rectifier."),
    card(id("f"), "Dynamic resistance", "Dynamic (a.c.) resistance of a diode at a point of the I–V curve", "r_d = \\dfrac{\\Delta V}{\\Delta I}",
      [["r_d", "dynamic resistance", "Ω"], ["ΔV", "small change in voltage", "V"], ["ΔI", "resulting change in current", "A"]]),
    card(id("f"), "Half-wave rectifier", "Output frequency of a half-wave rectifier", "f_{\\text{out}} = f_{\\text{in}}",
      [["f_in", "frequency of the input a.c.", "Hz"]], "One diode conducts only during alternate half-cycles."),
    card(id("f"), "Full-wave rectifier", "Output frequency of a full-wave rectifier", "f_{\\text{out}} = 2\\,f_{\\text{in}}",
      [["f_out", "frequency of the pulsating d.c. output (ripple)", "Hz"]], "Both half-cycles produce current in the same direction through the load."),
  ],
};
