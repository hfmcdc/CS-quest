import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c09");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Mirror formula", "Mirror formula for a spherical mirror (Cartesian sign convention)", "\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f},\\qquad f = \\dfrac{R}{2}",
      [["u", "object distance (negative for a real object)", "m"], ["v", "image distance", "m"], ["f", "focal length (negative for concave, positive for convex)", "m"], ["R", "radius of curvature", "m"]],
      "Distances are measured from the pole; the direction of incident light is positive."),
    card(id("f"), "Magnification (mirror)", "Linear magnification produced by a spherical mirror", "m = \\dfrac{h'}{h} = -\\dfrac{v}{u}",
      [["m", "magnification (no unit); negative for a real, inverted image"], ["h, h'", "heights of object and image", "m"]]),
    card(id("f"), "Snell's law", "Snell's law of refraction", "n_1\\sin i = n_2\\sin r,\\qquad n = \\dfrac{c}{v}",
      [["n₁, n₂", "refractive indices of the two media"], ["i", "angle of incidence", "rad"], ["r", "angle of refraction", "rad"]]),
    card(id("f"), "Critical angle", "Critical angle for total internal reflection (dense to rare medium)", "\\sin i_c = \\dfrac{1}{n}",
      [["i_c", "critical angle", "rad"], ["n", "refractive index of the denser medium relative to the rarer one"]],
      "Total internal reflection occurs for light going from a denser to a rarer medium at an angle of incidence greater than i_c. Optical fibres use it."),
    card(id("f"), "Apparent depth", "Apparent depth of an object under a medium, seen from above (near-normal viewing)", "\\dfrac{\\text{real depth}}{\\text{apparent depth}} = n",
      [["n", "refractive index of the medium"]]),
    card(id("f"), "Refraction at a spherical surface", "Refraction at a single spherical surface", "\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}",
      [["n₁", "refractive index of the medium of the object"], ["n₂", "refractive index of the second medium"], ["R", "radius of curvature (sign by convention)", "m"]]),
    card(id("f"), "Thin lens formula", "Thin lens formula (Cartesian sign convention)", "\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}",
      [["f", "focal length (positive for convex, negative for concave)", "m"]], "Note the minus sign, unlike the mirror formula."),
    card(id("f"), "Lens maker's formula", "Lens maker's formula", "\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)",
      [["n", "refractive index of the lens material relative to the surrounding medium"], ["R₁, R₂", "radii of curvature of the first and second surfaces (with sign)", "m"]]),
    card(id("f"), "Magnification (lens)", "Linear magnification of a lens", "m = \\dfrac{h'}{h} = \\dfrac{v}{u}",
      [["m", "magnification (no unit); negative for a real, inverted image"]]),
    card(id("f"), "Power of a lens", "Power of a lens", "P = \\dfrac{1}{f}",
      [["P", "power", "dioptre (D = m⁻¹)"], ["f", "focal length", "m"]], "Positive for a converging lens, negative for a diverging lens."),
    card(id("f"), "Lenses in contact", "Combination of thin lenses in contact", "\\dfrac{1}{f} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2},\\qquad P = P_1 + P_2",
      [["f", "equivalent focal length", "m"], ["P", "net power", "D"]]),
    card(id("f"), "Prism", "Refractive index of a prism material from the angle of minimum deviation", "n = \\dfrac{\\sin\\dfrac{A + D_m}{2}}{\\sin\\dfrac{A}{2}}",
      [["A", "angle of the prism", "rad"], ["D_m", "angle of minimum deviation", "rad"]]),
    card(id("f"), "Thin prism", "Deviation by a thin prism of small angle", "\\delta = (n - 1)\\,A",
      [["δ", "angle of deviation", "rad"], ["A", "prism angle (small)", "rad"]], "Violet is deviated more than red: n is larger for shorter wavelengths (dispersion)."),
    card(id("f"), "Simple microscope", "Magnifying power of a simple microscope (image at the near point D = 25 cm)", "m = 1 + \\dfrac{D}{f}",
      [["D", "least distance of distinct vision, 25 cm", "m"], ["f", "focal length of the lens", "m"]], "With the image at infinity, m = D/f."),
    card(id("f"), "Compound microscope", "Magnifying power of a compound microscope", "m = \\left(\\dfrac{L}{f_o}\\right)\\left(\\dfrac{D}{f_e}\\right)\\ \\text{(image at infinity)}",
      [["L", "distance between the second focal point of the objective and the first focal point of the eyepiece", "m"], ["f_o, f_e", "focal lengths of objective and eyepiece", "m"]],
      "With the final image at the near point: m = (v_o/|u_o|)(1 + D/f_e)."),
    card(id("f"), "Astronomical telescope", "Magnifying power and length of an astronomical telescope in normal adjustment", "m = \\dfrac{f_o}{f_e},\\qquad L = f_o + f_e",
      [["f_o", "focal length of the objective (large)", "m"], ["f_e", "focal length of the eyepiece (small)", "m"]]),
  ],
};
