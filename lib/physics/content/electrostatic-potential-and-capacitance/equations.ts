import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c02");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Potential of a point charge", "Which equation gives the electric potential at distance $r$ from an isolated point charge $q$ (potential taken as zero at infinity)?",
      ["V = \\dfrac{k\\,q}{r}", "V = \\dfrac{k\\,q}{r^2}", "V = k\\,q\\,r", "V = \\dfrac{k\\,q^2}{r}"], 0,
      "Potential is work per unit charge: $V = -\\int_\\infty^r E\\,dr = \\int_r^\\infty \\dfrac{kq}{r^2}dr = \\dfrac{kq}{r}$. It falls as $1/r$, unlike the field, which falls as $1/r^2$."),
    eqq(id("e"), "Energy in a capacitor", "A capacitor of capacitance $C$ is charged to a potential difference $V$. Which equation gives the energy stored?",
      ["U = \\dfrac12\\,C V^2", "U = C V^2", "U = \\dfrac12\\,C^2 V", "U = \\dfrac{C V}{2}"], 0,
      "Work to add $dq$ at potential $q/C$ is $\\dfrac{q}{C}dq$. Integrating from $0$ to $Q$ gives $\\dfrac{Q^2}{2C} = \\dfrac12 CV^2$. The factor $\\tfrac12$ appears because the potential grows as charge is added."),
    eqq(id("e"), "Parallel-plate capacitor", "Which equation gives the capacitance of a parallel-plate capacitor with plate area $A$ and separation $d$ in vacuum?",
      ["C = \\dfrac{\\varepsilon_0 A}{d}", "C = \\dfrac{\\varepsilon_0 d}{A}", "C = \\dfrac{A}{\\varepsilon_0 d}", "C = \\varepsilon_0 A d"], 0,
      "Between the plates $E = \\sigma/\\varepsilon_0 = Q/\\varepsilon_0 A$, so $V = Ed = Qd/\\varepsilon_0 A$ and $C = Q/V = \\varepsilon_0 A/d$: larger area increases $C$, larger separation reduces it."),
    eqq(id("e"), "Series capacitors", "Two capacitors $C_1$ and $C_2$ are joined end to end so that they carry the same charge. Which equation gives the equivalent capacitance $C$?",
      ["\\dfrac{1}{C} = \\dfrac{1}{C_1} + \\dfrac{1}{C_2}", "C = C_1 + C_2", "C = C_1\\,C_2", "\\dfrac{1}{C} = \\dfrac{1}{C_1\\,C_2}"], 0,
      "With the same charge $Q$, the potential differences add: $\\dfrac{Q}{C} = \\dfrac{Q}{C_1} + \\dfrac{Q}{C_2}$. Simple addition, $C = C_1 + C_2$, holds for capacitors in parallel."),
    eqq(id("e"), "Field from potential", "Which equation connects the electric field $E$ along a direction $r$ to the potential $V$?",
      ["E = -\\dfrac{dV}{dr}", "E = V\\,r", "E = -\\dfrac{V}{r^2}", "E = -\\dfrac{dr}{dV}"], 0,
      "The field is the negative gradient of the potential, $E = -dV/dr$: it points towards decreasing potential and equals $V/d$ for a uniform field between plates."),
    eqq(id("e"), "Energy of a dipole", "An electric dipole of moment $p$ makes an angle $\\theta$ with a uniform field $E$. Which equation gives its potential energy (zero when $\\vec p \\perp \\vec E$)?",
      ["U = -pE\\cos\\theta", "U = -pE\\sin\\theta", "U = pE", "U = -pE^2\\cos\\theta"], 0,
      "Work done by the torque in turning the dipole is $\\int pE\\sin\\theta\\,d\\theta$, giving $U = -pE\\cos\\theta$. It is least ($-pE$) when $\\vec p\\parallel\\vec E$ and greatest ($+pE$) when antiparallel."),
  ],
};
