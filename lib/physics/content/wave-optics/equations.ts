import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c10");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Fringe width", "In Young's double-slit experiment the slits are $d$ apart, the screen is at a distance $D$ and the wavelength is $\\lambda$. Which equation gives the fringe width $\\beta$?",
      ["\\beta = \\dfrac{\\lambda D}{d}", "\\beta = \\dfrac{\\lambda d}{D}", "\\beta = \\dfrac{d D}{\\lambda}", "\\beta = \\dfrac{\\lambda}{d D}"], 0,
      "A bright fringe appears where $\\dfrac{yd}{D} = n\\lambda$, so adjacent fringes are separated by $\\beta = \\dfrac{\\lambda D}{d}$: larger for a longer wavelength or a more distant screen, smaller for a larger slit separation."),
    eqq(id("e"), "Malus' law", "Plane-polarised light of intensity $I_0$ falls on a polaroid whose pass axis makes an angle $\\theta$ with the polarisation direction. Which equation gives the transmitted intensity?",
      ["I = I_0\\cos^2\\theta", "I = I_0\\cos\\theta", "I = I_0\\sin^2\\theta", "I = I_0\\sin\\theta"], 0,
      "Only the component of the electric field along the pass axis, $E_0\\cos\\theta$, is transmitted. Intensity is proportional to the square of the amplitude, so $I = I_0\\cos^2\\theta$."),
    eqq(id("e"), "Brewster's law", "Light is incident on a transparent surface of refractive index $n$ at the polarising angle $i_B$. Which equation relates them?",
      ["\\tan i_B = n", "\\sin i_B = n", "\\cos i_B = n", "\\tan i_B = \\dfrac{1}{n}"], 0,
      "At the Brewster angle the reflected and refracted rays are perpendicular. Then $r = 90^\\circ - i_B$ and Snell's law gives $n = \\dfrac{\\sin i_B}{\\cos i_B} = \\tan i_B$."),
    eqq(id("e"), "Single-slit diffraction", "Light of wavelength $\\lambda$ falls on a single slit of width $a$. Which equation gives the angles $\\theta$ at which the intensity is zero?",
      ["a\\sin\\theta = n\\lambda", "a\\sin\\theta = \\left(n + \\dfrac12\\right)\\lambda", "a\\cos\\theta = n\\lambda", "\\dfrac{a}{\\sin\\theta} = n\\lambda"], 0,
      "At the angle where the path difference between the slit's edges is $n\\lambda$, the slit can be split into pairs of strips that cancel exactly, giving minima at $a\\sin\\theta = n\\lambda$ ($n = 1, 2, \\ldots$)."),
    eqq(id("e"), "Refraction of a wavefront", "A plane wave goes from a medium where its speed is $v_1$ into one where its speed is $v_2$. With $i$ the angle of incidence and $r$ the angle of refraction, which equation follows from Huygens' construction?",
      ["\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2}", "\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_2}{v_1}", "\\sin i\\,\\sin r = \\dfrac{v_1}{v_2}", "\\dfrac{\\cos i}{\\cos r} = \\dfrac{v_1}{v_2}"], 0,
      "In the same time $t$ the wavefront travels $v_1t$ in medium 1 and $v_2t$ in medium 2. The geometry gives $\\sin i = v_1t/AC$ and $\\sin r = v_2t/AC$, so $\\sin i/\\sin r = v_1/v_2$."),
    eqq(id("e"), "Phase difference", "Two waves of wavelength $\\lambda$ reach a point with a path difference $\\Delta$. Which equation gives their phase difference $\\phi$?",
      ["\\phi = \\dfrac{2\\pi}{\\lambda}\\,\\Delta", "\\phi = \\dfrac{\\lambda}{2\\pi}\\,\\Delta", "\\phi = 2\\pi\\lambda\\,\\Delta", "\\phi = \\dfrac{\\pi\\,\\Delta}{\\lambda^2}"], 0,
      "A path difference of one wavelength corresponds to a phase difference of $2\\pi$, so $\\phi = 2\\pi\\Delta/\\lambda$."),
  ],
};
