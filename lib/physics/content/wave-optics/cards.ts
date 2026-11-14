import { card, ids } from "../../builders";
import type { FlashcardsContent } from "../../types";

const id = ids("c10");

export const content: FlashcardsContent = {
  cards: [
    card(id("f"), "Huygens' principle", "Huygens' principle", "\\text{Every point on a wavefront is a source of secondary wavelets; the new wavefront is their common tangent}",
      [["Wavefront", "surface of constant phase"], ["Ray", "line perpendicular to the wavefront"]]),
    card(id("f"), "Refraction by wavefronts", "Law of refraction from Huygens' principle", "\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2} = \\dfrac{\\lambda_1}{\\lambda_2} = n_{21}",
      [["v₁, v₂", "speeds in the two media", "m s⁻¹"], ["λ₁, λ₂", "wavelengths in the two media", "m"]], "The frequency does not change on refraction."),
    card(id("f"), "Phase difference", "Phase difference corresponding to a path difference", "\\phi = \\dfrac{2\\pi}{\\lambda}\\,\\Delta",
      [["φ", "phase difference", "rad"], ["Δ", "path difference", "m"], ["λ", "wavelength", "m"]],
      "Constructive interference: Δ = nλ. Destructive: Δ = (n + ½)λ."),
    card(id("f"), "Path difference in Young's experiment", "Path difference at a point y from the central maximum", "\\Delta = \\dfrac{y\\,d}{D}",
      [["y", "distance of the point from the central fringe", "m"], ["d", "separation of the slits", "m"], ["D", "distance from the slits to the screen", "m"]], "Valid for d ≪ D and small angles."),
    card(id("f"), "Bright fringes", "Position of the n-th bright fringe", "y_n = \\dfrac{n\\,\\lambda D}{d},\\qquad n = 0, \\pm1, \\pm2, \\ldots",
      [["y_n", "distance of the n-th bright fringe from the centre", "m"]]),
    card(id("f"), "Dark fringes", "Position of dark fringes", "y_n = \\left(n + \\dfrac12\\right)\\dfrac{\\lambda D}{d}",
      [["n", "0, 1, 2 … (n = 0 is the first dark fringe)"]]),
    card(id("f"), "Fringe width", "Fringe width in Young's double-slit experiment", "\\beta = \\dfrac{\\lambda D}{d}",
      [["β", "fringe width, the same for bright and dark fringes", "m"]], "In a medium of refractive index n the wavelength is λ/n, so β decreases."),
    card(id("f"), "Intensity pattern", "Intensity in the interference pattern of two identical sources", "I = 4I_0\\cos^2\\dfrac{\\phi}{2}",
      [["I₀", "intensity of each source alone", "W m⁻²"], ["φ", "phase difference at the point", "rad"]], "Maximum 4I₀ at φ = 0, 2π, … and zero at φ = π, 3π, …"),
    card(id("f"), "Single-slit minima", "Directions of minima in single-slit diffraction", "a\\sin\\theta = n\\lambda,\\qquad n = \\pm1, \\pm2, \\ldots",
      [["a", "slit width", "m"], ["θ", "angle from the central axis", "rad"], ["λ", "wavelength", "m"]]),
    card(id("f"), "Central maximum", "Width of the central maximum in single-slit diffraction", "2y = \\dfrac{2\\lambda D}{a}",
      [["2y", "linear width of the central maximum", "m"], ["D", "distance to the screen", "m"]], "Angular width is 2λ/a: a narrower slit gives a wider central maximum."),
    card(id("f"), "Malus' law", "Malus' law for polarised light through an analyser", "I = I_0\\cos^2\\theta",
      [["I₀", "intensity of the plane-polarised light incident", "W m⁻²"], ["θ", "angle between the polarisation direction and the pass axis", "rad"]],
      "Unpolarised light of intensity I₀ emerges from one polaroid with intensity I₀/2."),
    card(id("f"), "Brewster's law", "Brewster's law", "\\tan i_B = n",
      [["i_B", "polarising (Brewster) angle", "rad"], ["n", "refractive index of the reflecting medium"]], "At this angle the reflected light is completely plane polarised, and the reflected and refracted rays are at 90°."),
  ],
};
