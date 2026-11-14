import { C, ids, nq } from "../../builders";
import type { AdvancedContent } from "../../types";

const id = ids("c01");

/** Level 1 = CBSE Board, 2 = CBSE HOTS, 3 = JEE Main. */
export const content: AdvancedContent = {
  problems: [
    nq({
      id: id("a"), tag: "Dipole field", level: 1,
      g: { q: "4 µC", d: "2 cm", r: "40 cm" },
      q: "An electric dipole consists of charges +{q} and −{q} separated by {d}. Find the electric field at a point on its axis, {r} from its centre (treat the dipole as short).",
      sym: { E: "electric field", p: "dipole moment", q: "charge", d: "separation", r: "distance from centre" },
      rels: [["p", "q*d"], ["E", "2*k*p/r^3"]], consts: ["k"],
      calc: (s) => 2 * C.k * (s.q * s.d) / (s.r ** 3), unit: "N/C",
      show: "p = q\\,(2a),\\qquad E = \\dfrac{2kp}{r^3}",
      hint: "First find the dipole moment p = q × (separation), then use the axial-field formula.",
      steps: [
        "Dipole moment: $p = q\\times 2a = ({v.q})({v.d}) = 8\\times10^{-8}\\ \\text{C m}$.",
        "Axial field of a short dipole: $E = \\dfrac{2kp}{r^3}$.",
        "$E = \\dfrac{2({c.k})(8\\times10^{-8})}{({v.r})^3} = {ans}$, along the direction of $\\vec p$.",
      ],
    }),
    nq({
      id: id("a"), tag: "Superposition", level: 1,
      g: { q: "5 µC", a: "30 cm" },
      q: "Three equal charges of {q} each are placed at the corners of an equilateral triangle of side {a}. Find the magnitude of the net force on any one of the charges.",
      sym: { F: "net force", q: "each charge", a: "side of the triangle" },
      rels: [["F", "sqrt(3)*k*q^2/a^2"]], consts: ["k"],
      calc: (s) => Math.sqrt(3) * C.k * s.q * s.q / (s.a * s.a), unit: "N",
      show: "F = 2F_0\\cos 30^\\circ = \\sqrt{3}\\,\\dfrac{kq^2}{a^2}",
      hint: "Each of the other two charges exerts a force kq²/a². The angle between those forces is 60°.",
      steps: [
        "Each of the other two charges exerts a force of magnitude $F_0 = \\dfrac{kq^2}{a^2}$, with $60^\\circ$ between the two forces.",
        "Resultant: $F = 2F_0\\cos30^\\circ = \\sqrt3\\,F_0 = \\sqrt3\\,\\dfrac{kq^2}{a^2}$.",
        "$F = \\sqrt3\\,\\dfrac{({c.k})({v.q})^2}{({v.a})^2} = {ans}$, directed away from the centroid.",
      ],
    }),
    nq({
      id: id("a"), tag: "Gauss's theorem: symmetry", level: 2,
      g: { q: "26.55 nC" },
      q: "A point charge {q} is placed at one corner of a cube. Find the electric flux through one face of the cube that does **not** contain the corner.",
      sym: { phi: "flux (φ)", q: "charge" },
      rels: [["phi", "q/(24*eps0)"]], consts: ["eps0"],
      calc: (s) => s.q / (24 * C.eps0), unit: "N m^2/C",
      show: "\\phi_{\\text{face}} = \\dfrac{q}{24\\,\\varepsilon_0}",
      hint: "Imagine eight identical cubes sharing that corner, so the charge sits at the centre of a larger cube.",
      steps: [
        "Place 8 identical cubes around the charge so that it lies at the centre of a big cube. Total flux through the big cube $= q/\\varepsilon_0$.",
        "The big cube has 24 small faces (6 faces × 4), all equivalent by symmetry. Flux through each is $\\dfrac{q}{24\\varepsilon_0}$.",
        "The three faces that touch the charge have zero flux (the field is parallel to them), and each of the other three faces is one such small face.",
        "$\\phi = \\dfrac{{v.q}}{24\\times{c.eps0}} = {ans}$.",
      ],
    }),
    nq({
      id: id("a"), tag: "Equilibrium of charged spheres", level: 2,
      g: { m: "10 g", g: "10 m/s^2", L: "50 cm", x: "60 cm" },
      q: "Two identical small spheres, each of mass {m}, carry equal charges and hang from a common point by insulating threads each {L} long. In equilibrium they are {x} apart. Find the charge on each sphere.",
      sym: { q: "charge on each sphere", theta: "angle of each thread with the vertical (θ)", F: "electrostatic force", m: "mass", g: "gravitational acceleration", x: "separation", L: "thread length" },
      rels: [["theta", "asin(x/(2*L))"], ["F", "m*g*tan(theta)"], ["q", "sqrt(F*x^2/k)"]], consts: ["k"],
      ranges: { x: [0.2, 1], L: [1, 3] },
      calc: (s) => { const th = Math.asin(s.x / (2 * s.L)); return Math.sqrt(s.m * s.g * Math.tan(th) * s.x * s.x / C.k); },
      mid: (s) => { const si = s.x / (2 * s.L); return { sin: si, tan: si / Math.sqrt(1 - si * si), F: s.m * s.g * si / Math.sqrt(1 - si * si) }; },
      unit: "µC",
      show: "\\tan\\theta = \\dfrac{F}{mg},\\quad F = \\dfrac{kq^2}{x^2}",
      hint: "For each sphere, tension balances the weight vertically, and its horizontal component balances the electrostatic repulsion.",
      steps: [
        "For one sphere: $T\\cos\\theta = mg$ and $T\\sin\\theta = F$, so $F = mg\\tan\\theta$.",
        "$\\sin\\theta = \\dfrac{x/2}{L} = \\dfrac{0.30}{0.50} = {m.sin}$, so $\\tan\\theta = {m.tan}$.",
        "$F = mg\\tan\\theta = ({v.m})({v.g})({m.tan}) = {m.F}\\ \\text{N}$.",
        "$F = \\dfrac{kq^2}{x^2} \\Rightarrow q = x\\sqrt{\\dfrac{F}{k}} = {ans}$.",
      ],
    }),
    nq({
      id: id("a"), tag: "Continuous charge distribution", level: 3,
      g: { Q: "4 µC", R: "10 cm" },
      q: "A charge {Q} is distributed uniformly on a thin semicircular wire of radius {R}. Find the magnitude of the electric field at the centre of the semicircle.",
      sym: { E: "electric field", Q: "total charge", R: "radius" },
      rels: [["E", "2*k*Q/(pi*R^2)"]], consts: ["k"],
      calc: (s) => 2 * C.k * s.Q / (Math.PI * s.R * s.R), unit: "N/C",
      show: "E = \\dfrac{2kQ}{\\pi R^2}",
      hint: "Take a small element subtending angle dθ. By symmetry, only the components along the axis of symmetry add up.",
      steps: [
        "Linear density $\\lambda = \\dfrac{Q}{\\pi R}$. An element $dq = \\lambda R\\,d\\theta$ gives $dE = \\dfrac{k\\,dq}{R^2}$.",
        "Components perpendicular to the symmetry axis cancel. Along the axis: $E = \\int_0^{\\pi}\\dfrac{k\\lambda}{R}\\sin\\theta\\,d\\theta = \\dfrac{2k\\lambda}{R}$.",
        "$E = \\dfrac{2kQ}{\\pi R^2} = \\dfrac{2({c.k})({v.Q})}{\\pi({v.R})^2} = {ans}$.",
      ],
    }),
    nq({
      id: id("a"), tag: "Dipole in a uniform field", level: 3,
      g: { m: "2 g", a: "1 cm", q: "1 µC", E: "500 N/C" },
      q: "Two small balls, each of mass {m}, carry charges $+q$ and $-q$, where $q$ is {q}, and are fixed at the ends of a light rod of length $2a$, where $a$ is {a}. The rod is free to rotate about its centre in a uniform electric field of {E}. For small angular displacements from equilibrium, find the time period of oscillation.",
      sym: { T: "time period", I: "moment of inertia", p: "dipole moment", E: "electric field", m: "mass of each ball", a: "half-length", q: "charge" },
      rels: [["I", "2*m*a^2"], ["p", "2*q*a"], ["T", "2*pi*sqrt(I/(p*E))"]],
      calc: (s) => { const I = 2 * s.m * s.a * s.a; const p = 2 * s.q * s.a; return 2 * Math.PI * Math.sqrt(I / (p * s.E)); },
      mid: (s) => ({ I: 2 * s.m * s.a * s.a, p: 2 * s.q * s.a }),
      unit: "s",
      show: "T = 2\\pi\\sqrt{\\dfrac{I}{pE}}",
      hint: "For a small angle, sin θ ≈ θ, so the restoring torque is −pEθ and the motion is simple harmonic.",
      steps: [
        "Restoring torque: $\\tau = -pE\\sin\\theta \\approx -pE\\theta$, so $I\\alpha = -pE\\theta$ and $\\omega^2 = \\dfrac{pE}{I}$.",
        "$I = 2ma^2 = {m.I}\\ \\text{kg m}^2$ and $p = q(2a) = {m.p}\\ \\text{C m}$.",
        "$T = 2\\pi\\sqrt{\\dfrac{I}{pE}} = 2\\pi\\sqrt{\\dfrac{{m.I}}{({m.p})({v.E})}} = {ans}$.",
      ],
    }),
  ],
};
