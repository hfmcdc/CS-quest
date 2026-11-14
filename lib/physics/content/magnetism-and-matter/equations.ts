import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c05");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Axial field of a bar magnet", "A short bar magnet of magnetic moment $m$ lies along an axis. Which equation gives its field at a point on that axis at a large distance $r$ from its centre?",
      ["B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{2m}{r^3}", "B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{m}{r^3}", "B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{2m}{r^2}", "B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{2m}{r}"], 0,
      "A short magnet behaves like a magnetic dipole, whose field falls as $1/r^3$. On the axis it is $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{r^3}$, twice the equatorial value $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{r^3}$."),
    eqq(id("e"), "Torque on a magnet", "A bar magnet of moment $m$ is placed in a uniform field $B$, with its axis making an angle $\\theta$ with the field. Which equation gives the torque on it?",
      ["\\tau = m\\,B\\sin\\theta", "\\tau = m\\,B\\cos\\theta", "\\tau = \\dfrac{m\\sin\\theta}{B}", "\\tau = m\\,B^2\\sin\\theta"], 0,
      "$\\vec\\tau = \\vec m\\times\\vec B$, so $\\tau = mB\\sin\\theta$: zero when aligned with the field and maximum at $90^\\circ$."),
    eqq(id("e"), "Earth's field components", "At a place the Earth's total magnetic field is $B_E$ and the angle of dip is $\\delta$. Which equation gives the horizontal component $B_H$?",
      ["B_H = B_E\\cos\\delta", "B_H = B_E\\sin\\delta", "B_H = B_E\\tan\\delta", "B_H = \\dfrac{B_E}{\\cos\\delta}"], 0,
      "The dip angle $\\delta$ is measured from the horizontal, so the horizontal component is $B_E\\cos\\delta$ and the vertical one is $B_E\\sin\\delta$."),
    eqq(id("e"), "Susceptibility", "A material placed in a magnetising field $H$ acquires a magnetisation $M$. Which equation defines its magnetic susceptibility $\\chi$?",
      ["\\chi = \\dfrac{M}{H}", "\\chi = M\\,H", "\\chi = \\dfrac{H}{M}", "\\chi = \\dfrac{M}{H^2}"], 0,
      "Susceptibility is the magnetisation produced per unit magnetising field, $\\chi = M/H$. It is dimensionless."),
    eqq(id("e"), "B, H and M", "Which equation relates the total magnetic field $B$ inside a material to the magnetising field $H$ and the magnetisation $M$?",
      ["B = \\mu_0\\,(H + M)", "B = \\mu_0\\,(H - M)", "B = \\dfrac{H + M}{\\mu_0}", "B = \\mu_0\\,H\\,M"], 0,
      "The total field is the field of the applied currents ($\\mu_0H$) plus the field of the induced magnetisation ($\\mu_0M$): $B = \\mu_0(H+M)$."),
    eqq(id("e"), "Relative permeability", "Which equation relates the relative permeability $\\mu_r$ of a material to its susceptibility $\\chi$?",
      ["\\mu_r = 1 + \\chi", "\\mu_r = 1 - \\chi", "\\mu_r = \\dfrac{1}{\\chi}", "\\mu_r = \\mu_0\\chi"], 0,
      "From $B = \\mu_0(H+M) = \\mu_0H(1+\\chi)$ and $B = \\mu_0\\mu_rH$ we get $\\mu_r = 1+\\chi$. Hence $\\mu_r<1$ for diamagnetic and $\\mu_r>1$ for paramagnetic materials."),
  ],
};
