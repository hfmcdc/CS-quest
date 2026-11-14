import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c01");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Coulomb's law", "Two point charges $q_1$ and $q_2$ are at rest in vacuum, a distance $r$ apart. Which equation gives the magnitude of the force between them?",
      ["F = \\dfrac{k\\,q_1 q_2}{r^2}", "F = \\dfrac{k\\,q_1 q_2}{r}", "F = \\dfrac{k\\,(q_1 + q_2)}{r^2}", "F = k\\,q_1 q_2\\, r^2"], 0,
      "Coulomb's law is an inverse-square law that is proportional to the product of the charges, so $F = kq_1q_2/r^2$. The other options have the wrong power of $r$ or add the charges instead of multiplying them."),
    eqq(id("e"), "Field of a point charge", "A student needs the magnitude of the electric field at distance $r$ from an isolated point charge $q$ in vacuum.",
      ["E = \\dfrac{k\\,q}{r^2}", "E = \\dfrac{k\\,q}{r}", "E = \\dfrac{k\\,q^2}{r^2}", "E = k\\,q\\,r^2"], 0,
      "$E = F/q_0$ with $F = kqq_0/r^2$ gives $E = kq/r^2$: linear in the source charge and inverse-square in distance."),
    eqq(id("e"), "Torque on a dipole", "An electric dipole of moment $p$ makes an angle $\\theta$ with a uniform electric field $E$. Which equation gives the magnitude of the torque on it?",
      ["\\tau = pE\\sin\\theta", "\\tau = pE\\cos\\theta", "\\tau = \\dfrac{p\\sin\\theta}{E}", "\\tau = pE^2\\sin\\theta"], 0,
      "$\\vec\\tau = \\vec p\\times\\vec E$, so $\\tau = pE\\sin\\theta$. It is zero when $\\vec p\\parallel\\vec E$ and maximum when they are perpendicular."),
    eqq(id("e"), "Equatorial field of a dipole", "Find the magnitude of the field of a short dipole of moment $p$ at a point on its equatorial plane, at a distance $r$ from its centre ($r\\gg a$).",
      ["E = \\dfrac{k\\,p}{r^3}", "E = \\dfrac{2k\\,p}{r^3}", "E = \\dfrac{k\\,p}{r^2}", "E = \\dfrac{k\\,p}{r}"], 0,
      "On the equatorial plane the components along the dipole axis add and the perpendicular components cancel. For $r\\gg a$ the result is $kp/r^3$. The axial field is $2kp/r^3$."),
    eqq(id("e"), "Gauss's theorem", "A closed surface encloses a net charge $q$ in vacuum. Which equation gives the net electric flux through it?",
      ["\\phi = \\dfrac{q}{\\varepsilon_0}", "\\phi = q\\,\\varepsilon_0", "\\phi = \\dfrac{q}{4\\pi\\varepsilon_0}", "\\phi = \\dfrac{\\varepsilon_0}{q}"], 0,
      "Gauss's theorem states $\\oint\\vec E\\cdot d\\vec S = q_{\\text{enc}}/\\varepsilon_0$. The factor $1/4\\pi\\varepsilon_0$ appears in the field of a point charge, not in the total flux."),
    eqq(id("e"), "Plane sheet", "Using Gauss's theorem, which equation gives the field near an infinite thin plane sheet carrying uniform surface charge density $\\sigma$?",
      ["E = \\dfrac{\\sigma}{2\\varepsilon_0}", "E = \\dfrac{\\sigma}{\\varepsilon_0}", "E = \\dfrac{\\sigma}{4\\pi\\varepsilon_0 r^2}", "E = \\dfrac{2\\sigma}{\\varepsilon_0}"], 0,
      "The field points away from the sheet on both sides, so the flux through a pillbox is $2EA = \\sigma A/\\varepsilon_0$, giving $E = \\sigma/2\\varepsilon_0$, independent of distance."),
  ],
};
