import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c03");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Current and drift velocity", "A conductor of cross-section $A$ has $n$ free electrons per unit volume, each of charge $e$, drifting with speed $v_d$. Which equation gives the current?",
      ["I = n\\,e\\,A\\,v_d", "I = \\dfrac{n\\,e\\,v_d}{A}", "I = \\dfrac{e\\,A\\,v_d}{n}", "I = \\dfrac{n\\,e\\,A}{v_d}"], 0,
      "In time $t$ the charge crossing the section is that in a cylinder of length $v_dt$: $Q = n(Av_dt)e$. So $I = Q/t = neAv_d$."),
    eqq(id("e"), "Resistance of a wire", "A uniform wire has resistivity $\\rho$, length $l$ and cross-sectional area $A$. Which equation gives its resistance?",
      ["R = \\dfrac{\\rho\\,l}{A}", "R = \\dfrac{\\rho\\,A}{l}", "R = \\dfrac{l}{\\rho\\,A}", "R = \\rho\\,l\\,A"], 0,
      "Resistance grows with length (more collisions) and falls with area (more parallel paths): $R = \\rho l/A$."),
    eqq(id("e"), "Terminal voltage", "A cell of emf $\\varepsilon$ and internal resistance $r$ is delivering a current $I$. Which equation gives the potential difference $V$ across its terminals?",
      ["V = \\varepsilon - I\\,r", "V = \\varepsilon + I\\,r", "V = \\dfrac{\\varepsilon}{I\\,r}", "V = \\varepsilon - \\dfrac{I}{r}"], 0,
      "Part of the emf is used up driving current through the cell's own resistance: $V = \\varepsilon - Ir$. It equals $\\varepsilon$ only on open circuit."),
    eqq(id("e"), "Power in a resistor", "A resistor $R$ has a potential difference $V$ across it. Which equation gives the power dissipated in it?",
      ["P = \\dfrac{V^2}{R}", "P = \\dfrac{R}{V^2}", "P = V\\,R^2", "P = \\dfrac{V}{R}"], 0,
      "$P = VI$ and $I = V/R$, so $P = V^2/R$. The option $V/R$ is just the current."),
    eqq(id("e"), "Temperature dependence", "The resistance of a metallic conductor is $R_0$ at temperature $T_0$ and its temperature coefficient of resistance is $\\alpha$. Which equation gives its resistance $R_T$ at temperature $T$?",
      ["R_T = R_0\\left[1 + \\alpha\\,(T - T_0)\\right]", "R_T = R_0\\left[1 - \\alpha\\,(T - T_0)\\right]", "R_T = R_0\\,\\alpha\\,(T - T_0)", "R_T = \\dfrac{R_0}{1 + \\alpha\\,(T - T_0)}"], 0,
      "For metals $\\alpha>0$, so resistance rises with temperature: $R_T = R_0[1+\\alpha(T-T_0)]$. The version with a minus sign would apply only to a material with a negative coefficient."),
    eqq(id("e"), "Mobility", "The mobility $\\mu$ of charge carriers is defined from their drift speed $v_d$ in a field $E$. Which equation is correct?",
      ["\\mu = \\dfrac{v_d}{E}", "\\mu = v_d\\,E", "\\mu = \\dfrac{E}{v_d}", "\\mu = \\dfrac{v_d}{E^2}"], 0,
      "Mobility is drift speed per unit field, $\\mu = v_d/E$, with unit $\\text{m}^2\\text{V}^{-1}\\text{s}^{-1}$. Since $v_d = eE\\tau/m$, also $\\mu = e\\tau/m$."),
  ],
};
