import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c09");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Spherical mirror", "For a spherical mirror, with object distance $u$ and image distance $v$ both measured from the pole by the Cartesian sign convention, which equation gives its focal length $f$?",
      ["\\dfrac{1}{f} = \\dfrac{1}{v} + \\dfrac{1}{u}", "\\dfrac{1}{f} = \\dfrac{1}{v} - \\dfrac{1}{u}", "f = v + u", "f = \\dfrac{u\\,v}{u - v}"], 0,
      "For a mirror the relation is $\\dfrac1v + \\dfrac1u = \\dfrac1f$. The version with a minus sign is the thin-lens formula."),
    eqq(id("e"), "Thin lens", "For a thin lens, with $u$ and $v$ the object and image distances from the optical centre (Cartesian convention), which equation gives the focal length $f$?",
      ["\\dfrac{1}{f} = \\dfrac{1}{v} - \\dfrac{1}{u}", "\\dfrac{1}{f} = \\dfrac{1}{v} + \\dfrac{1}{u}", "f = v - u", "f = \\dfrac{u + v}{u\\,v}"], 0,
      "For a thin lens $\\dfrac1v - \\dfrac1u = \\dfrac1f$. Check: an object at $u = -2f$ gives $\\dfrac1v = \\dfrac1f - \\dfrac1{2f} = \\dfrac1{2f}$, so $v = 2f$, as expected."),
    eqq(id("e"), "Lens maker's formula", "A thin lens of refractive index $n$ (in air) has surfaces of radii of curvature $R_1$ and $R_2$. Which equation gives its focal length?",
      ["\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)", "\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} + \\dfrac{1}{R_2}\\right)", "\\dfrac{1}{f} = n\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)", "f = (n - 1)\\left(R_1 - R_2\\right)"], 0,
      "Combining refraction at the two surfaces gives the lens maker's formula $\\dfrac1f = (n-1)\\left(\\dfrac1{R_1} - \\dfrac1{R_2}\\right)$ with radii signed by the Cartesian convention."),
    eqq(id("e"), "Refraction", "A ray passes from a medium of refractive index $n_1$ into one of index $n_2$. If $i$ and $r$ are the angles of incidence and refraction, which equation holds?",
      ["n_1\\sin i = n_2\\sin r", "n_1\\sin r = n_2\\sin i", "n_1\\cos i = n_2\\cos r", "\\dfrac{n_1}{\\sin i} = n_2\\sin r"], 0,
      "Snell's law: $n\\sin\\theta$ stays constant across the boundary, so $n_1\\sin i = n_2\\sin r$."),
    eqq(id("e"), "Total internal reflection", "Light travels in a medium of refractive index $n$ towards a boundary with air. Which equation gives the critical angle $i_c$ for total internal reflection?",
      ["\\sin i_c = \\dfrac{1}{n}", "\\sin i_c = n", "\\cos i_c = \\dfrac{1}{n}", "\\tan i_c = \\dfrac{1}{n}"], 0,
      "At the critical angle the refracted ray grazes the surface ($r = 90^\\circ$): $n\\sin i_c = 1\\times\\sin90^\\circ$, so $\\sin i_c = 1/n$."),
    eqq(id("e"), "Prism", "A prism of angle $A$ has an angle of minimum deviation $D_m$. Which equation gives the refractive index $n$ of its material?",
      ["n = \\dfrac{\\sin\\dfrac{A + D_m}{2}}{\\sin\\dfrac{A}{2}}", "n = \\dfrac{\\sin\\dfrac{A}{2}}{\\sin\\dfrac{A + D_m}{2}}", "n = \\dfrac{\\sin (A + D_m)}{\\sin A}", "n = \\dfrac{\\sin\\dfrac{A - D_m}{2}}{\\sin\\dfrac{A}{2}}"], 0,
      "At minimum deviation the ray passes symmetrically, $r = A/2$ and $i = (A + D_m)/2$. Snell's law then gives $n = \\sin i/\\sin r$."),
  ],
};
