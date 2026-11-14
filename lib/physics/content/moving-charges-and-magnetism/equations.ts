import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c04");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Force on a moving charge", "A charge $q$ moves with speed $v$ in a uniform magnetic field $B$, its velocity making an angle $\\theta$ with the field. Which equation gives the magnitude of the magnetic force?",
      ["F = q\\,v\\,B\\sin\\theta", "F = q\\,v\\,B\\cos\\theta", "F = \\dfrac{q\\,v\\sin\\theta}{B}", "F = q\\,v^2 B\\sin\\theta"], 0,
      "$\\vec F = q\\,\\vec v\\times\\vec B$ so $F = qvB\\sin\\theta$. The force is zero when the charge moves along the field ($\\theta = 0$) and maximum when perpendicular."),
    eqq(id("e"), "Radius of the circular path", "A particle of mass $m$ and charge $q$ enters a uniform magnetic field $B$ with speed $v$ perpendicular to it. Which equation gives the radius of its path?",
      ["r = \\dfrac{m\\,v}{q\\,B}", "r = \\dfrac{q\\,B}{m\\,v}", "r = \\dfrac{m\\,v^2}{q\\,B}", "r = m\\,v\\,q\\,B"], 0,
      "The magnetic force provides the centripetal force: $qvB = \\dfrac{mv^2}{r}$, so $r = \\dfrac{mv}{qB}$."),
    eqq(id("e"), "Field of a long wire", "Which equation gives the magnetic field at a perpendicular distance $r$ from a long straight wire carrying a current $I$ in vacuum?",
      ["B = \\dfrac{\\mu_0 I}{2\\pi r}", "B = \\dfrac{\\mu_0 I}{2\\pi r^2}", "B = \\dfrac{\\mu_0 I}{4\\pi r^2}", "B = \\dfrac{\\mu_0 I r}{2\\pi}"], 0,
      "Applying Ampere's law to a circle of radius $r$: $B\\,(2\\pi r) = \\mu_0 I$. The field falls off as $1/r$ (not $1/r^2$, which belongs to a point charge or a single current element)."),
    eqq(id("e"), "Force on a conductor", "A straight wire of length $l$ carries a current $I$ in a uniform field $B$, the wire making an angle $\\theta$ with the field. Which equation gives the force on the wire?",
      ["F = B\\,I\\,l\\sin\\theta", "F = B\\,I\\,l\\cos\\theta", "F = \\dfrac{B\\,I\\sin\\theta}{l}", "F = B\\,I^2\\,l\\sin\\theta"], 0,
      "Summing $q\\vec v\\times\\vec B$ for the moving charges gives $\\vec F = I\\,\\vec l\\times\\vec B$, magnitude $BIl\\sin\\theta$."),
    eqq(id("e"), "Torque on a coil", "A coil of $N$ turns and area $A$ carries a current $I$ in a uniform field $B$; the normal to the coil makes an angle $\\theta$ with $B$. Which equation gives the torque on it?",
      ["\\tau = N\\,I\\,A\\,B\\sin\\theta", "\\tau = N\\,I\\,A\\,B\\cos\\theta", "\\tau = \\dfrac{N\\,I\\,A\\sin\\theta}{B}", "\\tau = N\\,I\\,A\\,B^2\\sin\\theta"], 0,
      "A current loop is a magnetic dipole of moment $m = NIA$, so $\\tau = mB\\sin\\theta = NIAB\\sin\\theta$."),
    eqq(id("e"), "Parallel conductors", "Two long parallel wires carry currents $I_1$ and $I_2$ and are a distance $d$ apart in vacuum. Which equation gives the force per unit length between them?",
      ["\\dfrac{F}{l} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}", "\\dfrac{F}{l} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d^2}", "\\dfrac{F}{l} = \\dfrac{\\mu_0 (I_1 + I_2)}{2\\pi d}", "\\dfrac{F}{l} = \\dfrac{\\mu_0 I_1 I_2\\, d}{2\\pi}"], 0,
      "Wire 1 produces $B = \\mu_0I_1/2\\pi d$ at wire 2, which exerts $F/l = I_2B = \\mu_0I_1I_2/2\\pi d$ on each unit length."),
  ],
};
