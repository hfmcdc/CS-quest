import type { PhysNumerical } from "../../types";
import { E, ME, MP, MU0, GRAV, RAD, tex as T } from "./fmt";

/**
 * Numerical problems. Final answers and every number in the worked solutions are computed from the stated inputs.
 * scripts/verify-physics.ts independently re-solves each answer from its accepted equation.
 * Constants (NCERT): e = 1.6e-19 C, m_e = 9.1e-31 kg, m_p = 1.67e-27 kg, mu_0 = 4*pi*1e-7 T m/A, g = 9.8 m/s^2.
 */
const CONST = "Take $e = 1.6\\times10^{-19}$ C";

// ---------------------------------------------------------------------------------------------------- practice
export const practice: PhysNumerical[] = [
  (() => {
    const q = E, v = 2e6, B = 0.5, F = q * v * B;
    return {
      id: "n-force-perp", tag: "Force on charges",
      text: `A proton moves with a speed of $2.0\\times10^{6}$ m/s perpendicular to a uniform magnetic field of $0.50$ T. Find the magnitude of the magnetic force on it. (${CONST}.)`,
      vars: ["F", "q", "v", "B", "theta"], formulas: ["F = q v B sin(theta)", "F = q v B"],
      formulaTex: "F = qvB\\sin\\theta",
      given: { q, v, B, theta: Math.PI / 2 }, target: "F", answer: F, unit: "N", answerTex: `${T(F)}\\ \\text{N}`,
      hints: ["Which formula gives the force on a moving charge in a magnetic field? Mind the angle between $\\vec v$ and $\\vec B$.", "The velocity is perpendicular to the field, so $\\sin\\theta = 1$."],
      steps: ["The force on a moving charge is $F = qvB\\sin\\theta$.", `Here $\\theta = 90^\\circ$, so $\\sin\\theta = 1$.`, `$F = (${T(q)})(${T(v)})(${T(B)}) = ${T(F)}\\ \\text{N}$`],
    };
  })(),
  (() => {
    const q = E, v = 3e7, B = 0.1, th = 30, F = q * v * B * Math.sin(RAD(th));
    return {
      id: "n-force-angle", tag: "Force on charges",
      text: `An electron moves at $3.0\\times10^{7}$ m/s in a uniform magnetic field of $0.10$ T. Its velocity makes an angle of $30^\\circ$ with the field. Find the force on the electron. (${CONST}.)`,
      vars: ["F", "q", "v", "B", "theta"], formulas: ["F = q v B sin(theta)"],
      formulaTex: "F = qvB\\sin\\theta",
      given: { q, v, B, theta: RAD(th) }, target: "F", answer: F, unit: "N", answerTex: `${T(F)}\\ \\text{N}`,
      hints: ["The angle in the formula is the angle between the velocity and the field.", "$\\sin30^\\circ = 0.5$."],
      steps: ["$F = qvB\\sin\\theta$ with $q = e$.", `$F = (${T(q)})(${T(v)})(${T(B)})\\sin30^\\circ$`, `$F = ${T(q * v * B)}\\times0.5 = ${T(F)}\\ \\text{N}$`],
      traps: [{ value: q * v * B, msg: "That ignores the angle. Include $\\sin\\theta$ for $\\theta = 30^\\circ$." }],
    };
  })(),
  (() => {
    const m = ME, v = 4e6, q = E, B = 1e-3, r = (m * v) / (q * B);
    return {
      id: "n-radius-electron", tag: "Circular & helical motion",
      text: `An electron moving at $4.0\\times10^{6}$ m/s enters a uniform magnetic field of $1.0$ mT perpendicular to its velocity. Find the radius of its circular path. ($m_e = 9.1\\times10^{-31}$ kg, ${CONST}.)`,
      vars: ["r", "m", "v", "q", "B"], formulas: ["r = m v/(q B)"],
      formulaTex: "r = \\dfrac{mv}{qB}",
      given: { m, v, q, B }, target: "r", answer: r, unit: "m", answerTex: `${T(r)}\\ \\text{m}\\ (= ${T(r * 100)}\\ \\text{cm})`,
      hints: ["The magnetic force supplies the centripetal force: $qvB = mv^2/r$.", "Convert $1.0$ mT to tesla: $10^{-3}$ T."],
      steps: ["$qvB = \\dfrac{mv^2}{r}\\ \\Rightarrow\\ r = \\dfrac{mv}{qB}$", `$r = \\dfrac{(${T(m)})(${T(v)})}{(${T(q)})(${T(B)})}$`, `$r = ${T(r)}\\ \\text{m} = ${T(r * 100)}\\ \\text{cm}$`],
    };
  })(),
  (() => {
    const m = MP, q = E, B = 0.5, Tp = (2 * Math.PI * m) / (q * B);
    return {
      id: "n-period-proton", tag: "Circular & helical motion",
      text: `Find the time period of revolution of a proton moving perpendicular to a uniform magnetic field of $0.50$ T. ($m_p = 1.67\\times10^{-27}$ kg, ${CONST}.)`,
      vars: ["T", "m", "q", "B"], formulas: ["T = 2 pi m/(q B)"],
      formulaTex: "T = \\dfrac{2\\pi m}{qB}",
      given: { m, q, B }, target: "T", answer: Tp, unit: "s", answerTex: `${T(Tp)}\\ \\text{s}`,
      hints: ["Use $T = 2\\pi r/v$ together with $r = mv/(qB)$.", "The speed cancels, so it is not needed."],
      steps: ["$T = \\dfrac{2\\pi r}{v} = \\dfrac{2\\pi}{v}\\cdot\\dfrac{mv}{qB} = \\dfrac{2\\pi m}{qB}$", `$T = \\dfrac{2\\pi(${T(m)})}{(${T(q)})(${T(B)})}$`, `$T = ${T(Tp)}\\ \\text{s}$`],
    };
  })(),
  (() => {
    const I = 5, l = 0.4, B = 0.2, th = 30, F = I * l * B * Math.sin(RAD(th));
    return {
      id: "n-wire-force", tag: "Current-carrying conductors",
      text: "A straight wire of length $0.40$ m carries a current of $5.0$ A in a uniform magnetic field of $0.20$ T. The wire makes an angle of $30^\\circ$ with the field. Find the force on the wire.",
      vars: ["F", "I", "l", "B", "theta"], formulas: ["F = I l B sin(theta)"],
      formulaTex: "F = IlB\\sin\\theta",
      given: { I, l, B, theta: RAD(th) }, target: "F", answer: F, unit: "N", answerTex: `${T(F)}\\ \\text{N}`,
      hints: ["The force on a straight conductor depends on the angle between the wire and the field.", "$\\sin30^\\circ = 0.5$."],
      steps: ["$F = IlB\\sin\\theta$", `$F = (${T(I)})(${T(l)})(${T(B)})\\sin30^\\circ = ${T(I * l * B)}\\times0.5$`, `$F = ${T(F)}\\ \\text{N}$`],
    };
  })(),
  (() => {
    const I1 = 10, I2 = 5, d = 0.02, Fl = (MU0 * I1 * I2) / (2 * Math.PI * d);
    return {
      id: "n-parallel-wires", tag: "Current-carrying conductors",
      text: "Two long parallel wires $2.0$ cm apart in vacuum carry currents of $10$ A and $5.0$ A in the same direction. Find the force per metre of length between them. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["F", "L", "mu0", "I1", "I2", "d"], formulas: ["F = mu0 I1 I2 L/(2 pi d)"],
      formulaTex: "\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}",
      given: { mu0: MU0, I1, I2, L: 1, d }, target: "F", answer: Fl, unit: "N m^-1", answerTex: `${T(Fl)}\\ \\text{N m}^{-1}`,
      hints: ["The field of one wire at the position of the other is $\\mu_0 I/(2\\pi d)$.", "The force per unit length is $I_2$ times that field. Convert $d$ to metres."],
      steps: ["$\\dfrac{F}{L} = \\dfrac{\\mu_0 I_1 I_2}{2\\pi d}$", `$\\dfrac{F}{L} = \\dfrac{(4\\pi\\times10^{-7})(${T(I1)})(${T(I2)})}{2\\pi(${T(d)})}$`, `$\\dfrac{F}{L} = ${T(Fl)}\\ \\text{N m}^{-1}$ (attractive, since the currents are parallel)`],
    };
  })(),
  (() => {
    const N = 100, R = 0.1, I = 0.5, B = (MU0 * N * I) / (2 * R);
    return {
      id: "n-loop-centre", tag: "Biot–Savart & Ampère",
      text: "A circular coil of 100 turns and radius $10$ cm carries a current of $0.50$ A. Find the magnetic field at its centre. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "N", "I", "R"], formulas: ["B = mu0 N I/(2 R)"],
      formulaTex: "B = \\dfrac{\\mu_0 N I}{2R}",
      given: { mu0: MU0, N, I, R }, target: "B", answer: B, unit: "T", answerTex: `${T(B)}\\ \\text{T}\\ (= ${T(B * 1e3)}\\ \\text{mT})`,
      hints: ["For one turn the centre field is $\\mu_0 I/2R$. How do $N$ turns change it?", "Convert the radius to metres."],
      steps: ["$B = \\dfrac{\\mu_0 N I}{2R}$", `$B = \\dfrac{(4\\pi\\times10^{-7})(${T(N)})(${T(I)})}{2(${T(R)})}$`, `$B = ${T(B)}\\ \\text{T}$`],
    };
  })(),
  (() => {
    const I = 10, r = 0.05, B = (MU0 * I) / (2 * Math.PI * r);
    return {
      id: "n-straight-wire", tag: "Biot–Savart & Ampère",
      text: "A long straight wire carries a current of $10$ A. Find the magnetic field at a point $5.0$ cm from the wire. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "I", "r"], formulas: ["B = mu0 I/(2 pi r)"],
      formulaTex: "B = \\dfrac{\\mu_0 I}{2\\pi r}",
      given: { mu0: MU0, I, r }, target: "B", answer: B, unit: "T", answerTex: `${T(B)}\\ \\text{T}`,
      hints: ["Apply Ampère's circuital law to a circle of radius $r$ around the wire.", "$\\dfrac{\\mu_0}{2\\pi} = 2\\times10^{-7}$ T m/A."],
      steps: ["Ampère's law: $B(2\\pi r) = \\mu_0 I\\ \\Rightarrow\\ B = \\dfrac{\\mu_0 I}{2\\pi r}$", `$B = \\dfrac{(2\\times10^{-7})(${T(I)})}{${T(r)}}$`, `$B = ${T(B)}\\ \\text{T}$`],
    };
  })(),
  (() => {
    const N = 1500, l = 0.5, I = 2, n = N / l, B = MU0 * n * I;
    return {
      id: "n-solenoid", tag: "Biot–Savart & Ampère",
      text: "A long solenoid of length $0.50$ m has 1500 turns and carries a current of $2.0$ A. Find the magnetic field near the centre inside it. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "n", "N", "l", "I"], formulas: ["B = mu0 n I", "B = mu0 N I/l"],
      formulaTex: "B = \\mu_0 nI,\\quad n = \\dfrac{N}{l}",
      given: { mu0: MU0, n, I }, target: "B", answer: B, unit: "T", answerTex: `${T(B)}\\ \\text{T}\\ (= ${T(B * 1e3)}\\ \\text{mT})`,
      hints: ["First find the number of turns per unit length.", "$B = \\mu_0 nI$ for a long solenoid."],
      steps: [`$n = \\dfrac{N}{l} = \\dfrac{${T(N)}}{${T(l)}} = ${T(n)}\\ \\text{m}^{-1}$`, "$B = \\mu_0 nI$", `$B = (4\\pi\\times10^{-7})(${T(n)})(${T(I)}) = ${T(B)}\\ \\text{T}$`],
    };
  })(),
  (() => {
    const N = 50, I = 2, A = 0.05 * 0.08, B = 0.3, tau = N * I * A * B;
    return {
      id: "n-torque", tag: "Loops & dipole moment",
      text: "A rectangular coil of 50 turns, $5.0$ cm by $8.0$ cm, carries a current of $2.0$ A. It is placed in a uniform magnetic field of $0.30$ T with the plane of the coil parallel to the field. Find the torque on the coil.",
      vars: ["tau", "N", "I", "A", "B", "theta"], formulas: ["tau = N I A B sin(theta)", "tau = N I A B"],
      formulaTex: "\\tau = NIAB\\sin\\theta",
      given: { N, I, A, B, theta: Math.PI / 2 }, target: "tau", answer: tau, unit: "N m", answerTex: `${T(tau)}\\ \\text{N m}`,
      hints: ["$\\theta$ is the angle between the normal to the coil and the field.", "If the plane is parallel to the field, the normal is perpendicular to it."],
      steps: [`Area $A = (0.05)(0.08) = ${T(A)}\\ \\text{m}^2$.`, "The plane is parallel to $\\vec B$, so the normal is perpendicular to $\\vec B$: $\\theta = 90^\\circ$ and $\\sin\\theta = 1$ (maximum torque).", `$\\tau = NIAB = (${T(N)})(${T(I)})(${T(A)})(${T(B)}) = ${T(tau)}\\ \\text{N m}$`],
    };
  })(),
  (() => {
    const N = 20, r = 0.05, I = 3, A = Math.PI * r * r, m = N * I * A;
    return {
      id: "n-dipole", tag: "Loops & dipole moment",
      text: "A circular coil of 20 turns and radius $5.0$ cm carries a current of $3.0$ A. Find its magnetic dipole moment.",
      vars: ["m", "N", "I", "A", "r"], formulas: ["m = N I A", "m = N I pi r^2"],
      formulaTex: "m = NIA",
      given: { N, I, A }, target: "m", answer: m, unit: "A m^2", answerTex: `${T(m)}\\ \\text{A m}^2`,
      hints: ["The magnetic moment of a loop is current times area, for each turn.", "The area of a circle is $\\pi r^2$."],
      steps: [`$A = \\pi r^2 = \\pi(${T(r)})^2 = ${T(A)}\\ \\text{m}^2$`, "$m = NIA$", `$m = (${T(N)})(${T(I)})(${T(A)}) = ${T(m)}\\ \\text{A m}^2$`],
    };
  })(),
  (() => {
    const G = 60, Ig = 5e-3, I = 3, S = (Ig * G) / (I - Ig);
    return {
      id: "n-shunt", tag: "Galvanometer",
      text: "A galvanometer of resistance $60\\ \\Omega$ gives full-scale deflection for $5.0$ mA. What shunt resistance is needed to convert it into an ammeter of range $0$–$3.0$ A?",
      vars: ["S", "Ig", "G", "I"], formulas: ["S = Ig G/(I - Ig)"],
      formulaTex: "I_g G = (I - I_g)S",
      given: { Ig, G, I }, target: "S", answer: S, unit: "Ω", answerTex: `${T(S)}\\ \\Omega`,
      hints: ["The shunt is in parallel with the galvanometer, so both have the same potential difference.", "The current through the shunt is $I - I_g$."],
      steps: ["Parallel branches: $I_g G = (I - I_g)S$", `$S = \\dfrac{I_g G}{I - I_g} = \\dfrac{(${T(Ig)})(${T(G)})}{${T(I)} - ${T(Ig)}}$`, `$S = ${T(S)}\\ \\Omega$ (connected in parallel)`],
    };
  })(),
  (() => {
    const G = 50, Ig = 2e-3, V = 10, R = V / Ig - G;
    return {
      id: "n-voltmeter", tag: "Galvanometer",
      text: "A galvanometer of resistance $50\\ \\Omega$ gives full-scale deflection for $2.0$ mA. What series resistance converts it into a voltmeter of range $0$–$10$ V?",
      vars: ["R", "V", "Ig", "G"], formulas: ["R = V/Ig - G", "V = Ig (G + R)"],
      formulaTex: "V = I_g(G + R)",
      given: { V, Ig, G }, target: "R", answer: R, unit: "Ω", answerTex: `${T(R)}\\ \\Omega`,
      hints: ["At full scale the current through the series combination is $I_g$.", "The total resistance must be $V/I_g$."],
      steps: ["At full scale: $V = I_g(G + R)$", `$R = \\dfrac{V}{I_g} - G = \\dfrac{${T(V)}}{${T(Ig)}} - ${T(G)}$`, `$R = ${T(R)}\\ \\Omega$ (connected in series)`],
    };
  })(),
  (() => {
    const q = E, B = 0.2, m = ME, nu = (q * B) / (2 * Math.PI * m);
    return {
      id: "n-frequency", tag: "Circular & helical motion",
      text: `Find the frequency of revolution of an electron moving perpendicular to a uniform magnetic field of $0.20$ T. ($m_e = 9.1\\times10^{-31}$ kg, ${CONST}.)`,
      vars: ["nu", "q", "B", "m"], formulas: ["nu = q B/(2 pi m)"],
      formulaTex: "\\nu = \\dfrac{qB}{2\\pi m}",
      given: { q, B, m }, target: "nu", answer: nu, unit: "Hz", answerTex: `${T(nu)}\\ \\text{Hz}`,
      hints: ["The frequency is $1/T$, where $T = 2\\pi m/(qB)$.", "It does not depend on the speed of the electron."],
      steps: ["$\\nu = \\dfrac{1}{T} = \\dfrac{qB}{2\\pi m}$", `$\\nu = \\dfrac{(${T(q)})(${T(B)})}{2\\pi(${T(m)})}$`, `$\\nu = ${T(nu)}\\ \\text{Hz}$`],
    };
  })(),
  (() => {
    const m = MP, v = 3e6, th = 60, q = E, B = 0.3, r = (m * v * Math.sin(RAD(th))) / (q * B);
    return {
      id: "n-helix-radius", tag: "Circular & helical motion",
      text: `A proton enters a uniform magnetic field of $0.30$ T with a speed of $3.0\\times10^{6}$ m/s at $60^\\circ$ to the field. Find the radius of its helical path. ($m_p = 1.67\\times10^{-27}$ kg, ${CONST}.)`,
      vars: ["r", "m", "v", "q", "B", "theta"], formulas: ["r = m v sin(theta)/(q B)"],
      formulaTex: "r = \\dfrac{m v\\sin\\theta}{qB}",
      given: { m, v, theta: RAD(th), q, B }, target: "r", answer: r, unit: "m", answerTex: `${T(r)}\\ \\text{m}`,
      hints: ["Only the component of velocity perpendicular to $\\vec B$ causes circular motion.", "$v_\\perp = v\\sin\\theta$."],
      steps: [`$v_\\perp = v\\sin60^\\circ = ${T(v * Math.sin(RAD(th)))}\\ \\text{m s}^{-1}$`, "$r = \\dfrac{m v_\\perp}{qB} = \\dfrac{m v\\sin\\theta}{qB}$", `$r = \\dfrac{(${T(m)})(${T(v * Math.sin(RAD(th)))})}{(${T(q)})(${T(B)})} = ${T(r)}\\ \\text{m}$`],
      traps: [{ value: (m * v * Math.cos(RAD(th))) / (q * B), msg: "You used $v\\cos\\theta$. The radius depends on the component perpendicular to $\\vec B$, $v\\sin\\theta$." }],
    };
  })(),
];

// ---------------------------------------------------------------------------------------------------- board level
export const board: PhysNumerical[] = [
  (() => {
    const V = 500, B = 2e-3, m = ME, q = E, v = Math.sqrt((2 * q * V) / m), r = (m * v) / (q * B);
    return {
      id: "b-electron-accel", tag: "Circular & helical motion",
      text: `An electron is accelerated from rest through a potential difference of $500$ V and then enters a uniform magnetic field of $2.0$ mT perpendicular to its velocity. Find the radius of its path. ($m_e = 9.1\\times10^{-31}$ kg, ${CONST}.)`,
      vars: ["r", "m", "V", "q", "B", "v"], formulas: ["r = sqrt(2 m V/q)/B", "r = m v/(q B)"],
      formulaTex: "r = \\dfrac{mv}{qB},\\quad \\tfrac12 mv^2 = qV",
      given: { m, V, q, B }, target: "r", answer: r, unit: "m", answerTex: `${T(r)}\\ \\text{m}\\ (= ${T(r * 100)}\\ \\text{cm})`,
      hints: ["Step 1: the kinetic energy gained equals $qV$. Step 2: the magnetic force provides the centripetal force.", "$v = \\sqrt{2qV/m}$, then $r = mv/(qB)$."],
      steps: ["Energy gained: $\\tfrac12 mv^2 = qV\\ \\Rightarrow\\ v = \\sqrt{\\dfrac{2qV}{m}}$", `$v = \\sqrt{\\dfrac{2(${T(q)})(${T(V)})}{${T(m)}}} = ${T(v)}\\ \\text{m s}^{-1}$`, "Magnetic force gives the centripetal force: $r = \\dfrac{mv}{qB}$", `$r = \\dfrac{(${T(m)})(${T(v)})}{(${T(q)})(${T(B)})} = ${T(r)}\\ \\text{m}$`],
    };
  })(),
  (() => {
    const L = 0.4, mass = 0.02, B = 0.5, g = GRAV, I = (mass * g) / (B * L);
    return {
      id: "b-levitate", tag: "Current-carrying conductors",
      text: "A horizontal wire of length $0.40$ m and mass $20$ g is placed perpendicular to a horizontal magnetic field of $0.50$ T. What current must flow through it so that the magnetic force just balances its weight? (Take $g = 9.8$ m/s$^2$.)",
      vars: ["I", "L", "B", "m", "g"], formulas: ["I L B = m g"],
      formulaTex: "ILB = mg",
      given: { L, B, m: mass, g }, target: "I", answer: I, unit: "A", answerTex: `${T(I)}\\ \\text{A}`,
      hints: ["For equilibrium the upward magnetic force equals the weight.", "Convert the mass to kilograms. The wire is perpendicular to the field, so $\\sin\\theta = 1$."],
      steps: ["Magnetic force upward $= ILB$ (wire $\\perp$ field). Weight $= mg$.", "Equilibrium: $ILB = mg\\ \\Rightarrow\\ I = \\dfrac{mg}{BL}$", `$I = \\dfrac{(${T(mass)})(${T(g)})}{(${T(B)})(${T(L)})} = ${T(I)}\\ \\text{A}$`],
    };
  })(),
  (() => {
    const I1 = 6, I2 = 4, r = 0.04, B = (MU0 * (I1 - I2)) / (2 * Math.PI * r);
    return {
      id: "b-midpoint", tag: "Biot–Savart & Ampère",
      text: "Two long straight parallel wires, $8.0$ cm apart in air, carry currents of $6.0$ A and $4.0$ A in the same direction. Find the net magnetic field at the point midway between them. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "I1", "I2", "r", "d"], formulas: ["B = mu0 (I1 - I2)/(2 pi r)", "B = mu0 (I1 - I2)/(pi d)"],
      formulaTex: "B = \\dfrac{\\mu_0 (I_1 - I_2)}{2\\pi r}",
      given: { mu0: MU0, I1, I2, r }, target: "B", answer: B, unit: "T", answerTex: `${T(B)}\\ \\text{T}`,
      hints: ["The midpoint is $4.0$ cm from each wire. Between two parallel currents the two fields point in opposite directions.", "Net field $= B_1 - B_2$."],
      steps: ["Distance of the midpoint from each wire: $r = 4.0\\ \\text{cm} = 0.04$ m.", "Between the wires, the fields of parallel currents are in opposite directions, so they subtract:", `$B = \\dfrac{\\mu_0}{2\\pi r}(I_1 - I_2) = \\dfrac{(2\\times10^{-7})(${T(I1)} - ${T(I2)})}{${T(r)}} = ${T(B)}\\ \\text{T}$`, "The direction is that of the field of the $6.0$ A wire."],
    };
  })(),
  (() => {
    const N = 800, l = 0.4, B = 6e-3, I = (B * l) / (MU0 * N);
    return {
      id: "b-solenoid-current", tag: "Biot–Savart & Ampère",
      text: "A solenoid of length $0.40$ m has 800 turns. What current must it carry to produce a magnetic field of $6.0$ mT near its centre? (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "N", "l", "I", "n"], formulas: ["B = mu0 N I/l", "B = mu0 n I"],
      formulaTex: "B = \\mu_0 \\dfrac{N}{l} I",
      given: { mu0: MU0, N, l, B }, target: "I", answer: I, unit: "A", answerTex: `${T(I)}\\ \\text{A}`,
      hints: ["Use $B = \\mu_0 nI$ with $n = N/l$.", "Convert $6.0$ mT to tesla."],
      steps: ["$B = \\mu_0 nI = \\mu_0\\dfrac{N}{l}I\\ \\Rightarrow\\ I = \\dfrac{Bl}{\\mu_0 N}$", `$I = \\dfrac{(${T(B)})(${T(l)})}{(4\\pi\\times10^{-7})(${T(N)})} = ${T(I)}\\ \\text{A}$`],
    };
  })(),
  (() => {
    const G = 40, Ig = 0.1, I = 1, S = (Ig * G) / (I - Ig), RA = (G * S) / (G + S);
    return {
      id: "b-ammeter-resistance", tag: "Galvanometer",
      text: "A galvanometer of resistance $40\\ \\Omega$ shows full-scale deflection for $100$ mA. It is converted into an ammeter of range $0$–$1.0$ A by a shunt. Find the resistance of the ammeter so formed.",
      vars: ["RA", "G", "S", "Ig", "I"], formulas: ["RA = Ig G/I", "RA = G S/(G + S)"],
      formulaTex: "R_A = \\dfrac{GS}{G+S}",
      given: { Ig, G, I }, target: "RA", answer: RA, unit: "Ω", answerTex: `${T(RA)}\\ \\Omega`,
      hints: ["First find the shunt $S$ from $I_g G = (I - I_g)S$.", "The ammeter is $G$ and $S$ in parallel: $R_A = GS/(G+S)$."],
      steps: [`Shunt: $S = \\dfrac{I_g G}{I - I_g} = \\dfrac{(${T(Ig)})(${T(G)})}{${T(I)} - ${T(Ig)}} = ${T(S)}\\ \\Omega$`, `Ammeter resistance (parallel combination): $R_A = \\dfrac{GS}{G+S} = \\dfrac{(${T(G)})(${T(S)})}{${T(G)} + ${T(S)}} = ${T(RA)}\\ \\Omega$`, `Check: $R_A = I_gG/I = ${T(Ig * G / I)}\\ \\Omega$`],
      traps: [{ value: S, msg: "That is the shunt resistance. The ammeter's resistance is the parallel combination of $G$ and $S$." }],
    };
  })(),
  (() => {
    const N = 200, r = 0.05, I = 2, B = 0.5, A = Math.PI * r * r, thNormal = 60, tau = N * I * A * B * Math.sin(RAD(thNormal));
    return {
      id: "b-coil-torque-angle", tag: "Loops & dipole moment",
      text: "A circular coil of 200 turns and radius $5.0$ cm carries a current of $2.0$ A in a uniform magnetic field of $0.50$ T. The plane of the coil makes an angle of $30^\\circ$ with the field. Find the torque on the coil.",
      vars: ["tau", "N", "I", "A", "r", "B", "theta", "alpha"], formulas: ["tau = N I A B sin(theta)", "tau = N I pi r^2 B sin(theta)", "tau = N I A B cos(alpha)"],
      formulaTex: "\\tau = NIAB\\sin\\theta\\quad(\\theta\\text{ from the normal})",
      given: { N, I, A, B, theta: RAD(thNormal) }, target: "tau", answer: tau, unit: "N m", answerTex: `${T(tau)}\\ \\text{N m}`,
      hints: ["In $\\tau = NIAB\\sin\\theta$, $\\theta$ is the angle between the normal to the coil and $\\vec B$, not the plane.", "The plane makes $30^\\circ$ with $\\vec B$, so the normal makes $60^\\circ$."],
      steps: [`$A = \\pi r^2 = \\pi(${T(r)})^2 = ${T(A)}\\ \\text{m}^2$`, "The normal is perpendicular to the plane, so its angle with $\\vec B$ is $\\theta = 90^\\circ - 30^\\circ = 60^\\circ$.", `$\\tau = NIAB\\sin60^\\circ = (${T(N)})(${T(I)})(${T(A)})(${T(B)})(0.866)$`, `$\\tau = ${T(tau)}\\ \\text{N m}$`],
      traps: [{ value: N * I * A * B * Math.sin(RAD(30)), msg: "You used the angle between the plane and the field. $\\theta$ in $\\tau = NIAB\\sin\\theta$ is measured from the normal, which is $60^\\circ$ here." }],
    };
  })(),
];

// ---------------------------------------------------------------------------------------------------- HOTS
export const hots: PhysNumerical[] = [
  (() => {
    const m = MP, v = 4e6, th = 30, q = E, B = 0.2, p = (2 * Math.PI * m * v * Math.cos(RAD(th))) / (q * B), Tp = (2 * Math.PI * m) / (q * B);
    return {
      id: "h-pitch", tag: "Circular & helical motion",
      text: `A proton moving at $4.0\\times10^{6}$ m/s enters a uniform magnetic field of $0.20$ T at an angle of $30^\\circ$ to the field. Find the pitch of its helical path. ($m_p = 1.67\\times10^{-27}$ kg, ${CONST}.)`,
      vars: ["p", "m", "v", "theta", "q", "B"], formulas: ["p = 2 pi m v cos(theta)/(q B)"],
      formulaTex: "p = v\\cos\\theta\\cdot\\dfrac{2\\pi m}{qB}",
      given: { m, v, theta: RAD(th), q, B }, target: "p", answer: p, unit: "m", answerTex: `${T(p)}\\ \\text{m}`,
      hints: ["The pitch is the distance moved along $\\vec B$ in one revolution.", "Only $v\\cos\\theta$ moves the proton along the field; the period depends on $m$, $q$ and $B$ only."],
      steps: [`Component along $\\vec B$: $v_\\parallel = v\\cos30^\\circ = ${T(v * Math.cos(RAD(th)))}\\ \\text{m s}^{-1}$ (unchanged).`, `Time period: $T = \\dfrac{2\\pi m}{qB} = ${T(Tp)}\\ \\text{s}$`, `Pitch: $p = v_\\parallel T = (${T(v * Math.cos(RAD(th)))})(${T(Tp)}) = ${T(p)}\\ \\text{m}$`],
      traps: [{ value: (2 * Math.PI * m * v * Math.sin(RAD(th))) / (q * B), msg: "You used $v\\sin\\theta$. The pitch is the distance along the field, which uses $v\\cos\\theta$." }],
    };
  })(),
  (() => {
    const q = E, B = 1, K = 1;
    const rp = Math.sqrt(2 * MP * K) / (q * B), re = Math.sqrt(2 * ME * K) / (q * B), ratio = rp / re;
    return {
      id: "h-same-ke", tag: "Circular & helical motion",
      text: `A proton and an electron have the same kinetic energy and enter the same uniform magnetic field perpendicular to it. Find the ratio of the radius of the proton's path to that of the electron's. ($m_p = 1.67\\times10^{-27}$ kg, $m_e = 9.1\\times10^{-31}$ kg.)`,
      vars: ["r", "m", "K", "q", "B"], formulas: ["r = sqrt(2 m K)/(q B)"],
      formulaTex: "r = \\dfrac{\\sqrt{2mK}}{qB}\\ \\Rightarrow\\ \\dfrac{r_p}{r_e} = \\sqrt{\\dfrac{m_p}{m_e}}",
      given: { m: MP, K, q, B }, ratio: { given2: { m: ME, K, q, B } }, target: "r", answer: ratio, unit: "", answerTex: `${T(ratio)}`,
      hints: ["Write the radius in terms of the kinetic energy: $mv = \\sqrt{2mK}$.", "$K$, $q$ and $B$ are the same for both particles. What is left?"],
      steps: ["$r = \\dfrac{mv}{qB} = \\dfrac{\\sqrt{2mK}}{qB}$", "With the same $K$, $q$ and $B$: $r\\propto\\sqrt{m}$.", `$\\dfrac{r_p}{r_e} = \\sqrt{\\dfrac{m_p}{m_e}} = \\sqrt{\\dfrac{1.67\\times10^{-27}}{9.1\\times10^{-31}}} = \\sqrt{${T(MP / ME)}} = ${T(ratio)}$`],
    };
  })(),
  (() => {
    const I1 = 6, I2 = 3, d = 0.3, x = (I1 * d) / (I1 + I2);
    return {
      id: "h-neutral-point", tag: "Biot–Savart & Ampère",
      text: "Two long straight parallel wires $30$ cm apart carry currents of $6.0$ A and $3.0$ A in the same direction. Find the distance from the $6.0$ A wire, on the line joining the wires, at which the net magnetic field is zero.",
      vars: ["I1", "I2", "x", "d", "mu0"], formulas: ["I1/x = I2/(d - x)"],
      formulaTex: "\\dfrac{\\mu_0 I_1}{2\\pi x} = \\dfrac{\\mu_0 I_2}{2\\pi (d - x)}",
      given: { I1, I2, d }, target: "x", answer: x, unit: "m", answerTex: `${T(x)}\\ \\text{m}\\ (= ${T(x * 100)}\\ \\text{cm})`,
      hints: ["For parallel currents the fields oppose only between the wires, so the point lies between them. Which wire is it closer to?", "Equate the two fields: $\\dfrac{I_1}{x} = \\dfrac{I_2}{d - x}$."],
      steps: ["Fields cancel only between the wires, at distance $x$ from the $6.0$ A wire and $(d - x)$ from the other.", "$\\dfrac{\\mu_0 I_1}{2\\pi x} = \\dfrac{\\mu_0 I_2}{2\\pi(d - x)}\\ \\Rightarrow\\ I_1(d - x) = I_2 x$", `$x = \\dfrac{I_1 d}{I_1 + I_2} = \\dfrac{(${T(I1)})(${T(d)})}{${T(I1)} + ${T(I2)}} = ${T(x)}\\ \\text{m} = ${T(x * 100)}\\ \\text{cm}$`, "The point is nearer to the wire with the smaller current, as expected: $10$ cm from the $3.0$ A wire."],
    };
  })(),
  (() => {
    const Lw = 1, Ac = Math.pow(Lw / (2 * Math.PI), 2) * Math.PI, As = Math.pow(Lw / 4, 2), ratio = Ac / As;
    return {
      id: "h-circle-square", tag: "Loops & dipole moment",
      text: "A wire of length $1.0$ m carrying a current $I$ is bent into a circle in one case and into a square in another. Each loop is placed in the same uniform magnetic field with its plane parallel to the field. Find the ratio of the torque on the circular loop to that on the square loop.",
      vars: ["tau", "N", "I", "A", "B", "theta"], formulas: ["tau = N I A B sin(theta)", "tau = N I A B"],
      formulaTex: "\\tau = NIAB\\sin\\theta\\ \\Rightarrow\\ \\tau\\propto A",
      given: { N: 1, I: 1, A: Ac, B: 1, theta: Math.PI / 2 }, ratio: { given2: { N: 1, I: 1, A: As, B: 1, theta: Math.PI / 2 } }, target: "tau", answer: ratio, unit: "", answerTex: `${T(ratio)}\\ \\left(=\\dfrac{4}{\\pi}\\right)`,
      hints: ["$N$, $I$, $B$ and $\\theta$ are the same in both cases, so the torque depends only on the area.", "Circle: perimeter $2\\pi r = 1$ m. Square: perimeter $4a = 1$ m."],
      steps: ["Same $N$, $I$, $B$ and $\\theta = 90^\\circ$, so $\\tau\\propto A$.", `Circle: $2\\pi r = 1\\Rightarrow r = \\dfrac{1}{2\\pi}$, so $A_c = \\pi r^2 = \\dfrac{1}{4\\pi} = ${T(Ac)}\\ \\text{m}^2$.`, `Square: $4a = 1\\Rightarrow a = 0.25$ m, so $A_s = a^2 = ${T(As)}\\ \\text{m}^2$.`, `$\\dfrac{\\tau_c}{\\tau_s} = \\dfrac{A_c}{A_s} = ${T(ratio)}$ (the circle encloses more area for the same perimeter).`],
    };
  })(),
  (() => {
    const G = 90, Ig = 0.1, I = 1, S = (Ig * G) / (I - Ig);
    return {
      id: "h-shunt-fraction", tag: "Galvanometer",
      text: "A galvanometer has a resistance of $90\\ \\Omega$. A shunt is connected across it so that only $10\\%$ of the total current passes through the galvanometer. Find the value of the shunt resistance.",
      vars: ["Ig", "I", "G", "S"], formulas: ["Ig G = (I - Ig) S"],
      formulaTex: "I_g G = (I - I_g)S,\\quad I_g = 0.1\\,I",
      given: { Ig, G, I }, target: "S", answer: S, unit: "Ω", answerTex: `${T(S)}\\ \\Omega`,
      hints: ["The shunt carries the remaining $90\\%$ of the current.", "The potential differences across the galvanometer and the shunt are equal."],
      steps: ["Let the total current be $I$. Then $I_g = 0.10\\,I$ and the shunt carries $0.90\\,I$.", "Equal potential difference: $(0.10\\,I)G = (0.90\\,I)S$", `$S = \\dfrac{0.10}{0.90}\\,G = \\dfrac{G}{9} = \\dfrac{${T(G)}}{9} = ${T(S)}\\ \\Omega$`],
    };
  })(),
  (() => {
    const d = 0.1, th = 30, r = d / Math.sin(RAD(th)), B = 0.5, q = E, m = MP, v = (q * B * r) / m;
    return {
      id: "h-slab", tag: "Circular & helical motion",
      text: `A proton enters a region of uniform magnetic field $0.50$ T and width $10$ cm. It enters perpendicular to the boundary and to the field, and leaves the region with its direction deflected by $30^\\circ$. Find its speed. ($m_p = 1.67\\times10^{-27}$ kg, ${CONST}.)`,
      vars: ["r", "m", "v", "q", "B", "d", "theta"], formulas: ["r = m v/(q B)", "sin(theta) = d/r"],
      formulaTex: "r = \\dfrac{mv}{qB},\\quad \\sin\\theta = \\dfrac{d}{r}",
      given: { r, m, q, B }, target: "v", answer: v, unit: "m s^-1", answerTex: `${T(v)}\\ \\text{m s}^{-1}`,
      hints: ["Sketch the circular arc. The centre lies on the entry boundary, so the width $d$ and the radius are related through the deflection angle.", "The arc turns through $30^\\circ$ while crossing a width $d$, so $\\sin30^\\circ = d/r$."],
      steps: ["The proton enters perpendicular to the boundary, so the centre of its circle lies on the entry boundary.", `Having turned through $\\theta = 30^\\circ$ it has moved $d = r\\sin\\theta$ across the region: $r = \\dfrac{d}{\\sin30^\\circ} = \\dfrac{${T(d)}}{0.5} = ${T(r)}\\ \\text{m}$`, "From $r = \\dfrac{mv}{qB}$: $v = \\dfrac{qBr}{m}$", `$v = \\dfrac{(${T(q)})(${T(B)})(${T(r)})}{${T(m)}} = ${T(v)}\\ \\text{m s}^{-1}$`],
    };
  })(),
];

// ---------------------------------------------------------------------------------------------------- JEE Main
export const jee: PhysNumerical[] = [
  (() => {
    const I = 2, a = 0.1, b = 0.2, B = ((MU0 * I) / 4) * (1 / a - 1 / b);
    return {
      id: "j-two-arcs", tag: "Biot–Savart & Ampère",
      text: "A closed loop consists of two concentric semicircular arcs of radii $10$ cm and $20$ cm, joined by straight segments along the radial lines. It carries a current of $2.0$ A. Find the magnitude of the magnetic field at the common centre. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "I", "a", "b"], formulas: ["B = mu0 I (1/a - 1/b)/4"],
      formulaTex: "B = \\dfrac{\\mu_0 I}{4}\\left(\\dfrac{1}{a} - \\dfrac{1}{b}\\right)",
      given: { mu0: MU0, I, a, b }, target: "B", answer: B, unit: "T", answerTex: `${T(B)}\\ \\text{T}\\ (=\\pi\\times10^{-6}\\ \\text{T})`,
      hints: ["Straight segments along a radius through the centre contribute nothing ($d\\vec l\\parallel\\vec r$). For a semicircle $B = \\mu_0 I/4R$.", "Going round the closed loop, the current circulates in opposite senses on the two arcs. Do the fields add or subtract?"],
      steps: ["Radial straight segments: $d\\vec l\\parallel\\vec r$, so $dB = 0$.", "Semicircle of radius $R$: $B = \\dfrac{\\mu_0 I}{4R}$.", "Around the closed loop the current is clockwise on one arc and anticlockwise on the other, so the two fields are opposite and subtract (inner arc dominates).", `$B = \\dfrac{\\mu_0 I}{4}\\left(\\dfrac{1}{a} - \\dfrac{1}{b}\\right) = \\dfrac{(4\\pi\\times10^{-7})(${T(I)})}{4}\\left(\\dfrac{1}{${T(a)}} - \\dfrac{1}{${T(b)}}\\right) = ${T(B)}\\ \\text{T}$`],
    };
  })(),
  (() => {
    const m = MP, q = E, V1 = 100, B1 = 0.5, r1 = 0.02, V2 = 2 * V1, B2 = B1 / 2;
    const rr = (V: number, B: number) => Math.sqrt((2 * m * V) / q) / B;
    const r2 = r1 * (rr(V2, B2) / rr(V1, B1));
    return {
      id: "j-radius-scaling", tag: "Circular & helical motion",
      text: "A charged particle accelerated from rest through a potential difference $V$ enters a uniform magnetic field $B$ perpendicular to its velocity and moves in a circle of radius $2.0$ cm. The accelerating potential difference is now doubled and the magnetic field is halved. Find the new radius of the circle.",
      vars: ["r", "m", "V", "q", "B"], formulas: ["r = sqrt(2 m V/q)/B"],
      formulaTex: "r = \\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}\\ \\Rightarrow\\ r\\propto\\dfrac{\\sqrt V}{B}",
      given: { m, V: V2, q, B: B2 }, ratio: { given2: { m, V: V1, q, B: B1 }, scale: r1 }, target: "r", answer: r2, unit: "m", answerTex: `${T(r2 * 100)}\\ \\text{cm}\\ (= 2\\sqrt2\\times2.0\\ \\text{cm})`,
      hints: ["Eliminate the speed: $qV = \\tfrac12 mv^2$ gives $v = \\sqrt{2qV/m}$. Put it in $r = mv/(qB)$.", "$r\\propto\\sqrt{V}/B$. Doubling $V$ multiplies $r$ by $\\sqrt2$; halving $B$ multiplies it by $2$."],
      steps: ["$qV = \\tfrac12 mv^2\\ \\Rightarrow\\ v = \\sqrt{\\dfrac{2qV}{m}}$, and $r = \\dfrac{mv}{qB} = \\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}$", "So $r\\propto\\dfrac{\\sqrt V}{B}$ for the same particle.", "$\\dfrac{r_2}{r_1} = \\sqrt{\\dfrac{V_2}{V_1}}\\cdot\\dfrac{B_1}{B_2} = \\sqrt2\\times2 = 2\\sqrt2$", `$r_2 = 2\\sqrt2\\times2.0\\ \\text{cm} = ${T(r2 * 100)}\\ \\text{cm}$`],
      traps: [{ value: r1 * Math.SQRT2, msg: "You accounted for the doubled potential difference but not the halved field. Halving $B$ doubles $r$." }, { value: r1 * 2, msg: "You accounted for the halved field but not the doubled potential difference. $r\\propto\\sqrt V$ as well." }],
    };
  })(),
  (() => {
    const I1 = 10, I2 = 5, Lw = 0.2, d1 = 0.05, d2 = 0.15, F = ((MU0 * I1 * I2 * Lw) / (2 * Math.PI)) * (1 / d1 - 1 / d2);
    const F1 = (MU0 * I1 * I2 * Lw) / (2 * Math.PI * d1), F2 = (MU0 * I1 * I2 * Lw) / (2 * Math.PI * d2);
    return {
      id: "j-loop-near-wire", tag: "Current-carrying conductors",
      text: "A rectangular loop of length $20$ cm and width $10$ cm lies in the plane of a long straight wire carrying $10$ A. The longer sides are parallel to the wire and the nearer one is $5.0$ cm from it. The loop carries $5.0$ A, with the current in the nearer side in the same direction as in the wire. Find the magnitude of the net force on the loop. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["F", "mu0", "I1", "I2", "L", "d1", "d2"], formulas: ["F = mu0 I1 I2 L (1/d1 - 1/d2)/(2 pi)"],
      formulaTex: "F = \\dfrac{\\mu_0 I_1 I_2 L}{2\\pi}\\left(\\dfrac{1}{d_1} - \\dfrac{1}{d_2}\\right)",
      given: { mu0: MU0, I1, I2, L: Lw, d1, d2 }, target: "F", answer: F, unit: "N", answerTex: `${T(F)}\\ \\text{N}\\ (\\text{attractive})`,
      hints: ["The forces on the two shorter sides are equal and opposite, so they cancel. Only the two long sides matter.", "The nearer side has current parallel to the wire (attraction); the farther side has antiparallel current (repulsion). The nearer force is larger."],
      steps: ["Forces on the two short sides cancel (equal and opposite).", `Near side ($d_1 = 5.0$ cm, parallel current, attracted): $F_1 = \\dfrac{\\mu_0 I_1 I_2 L}{2\\pi d_1} = ${T(F1)}\\ \\text{N}$`, `Far side ($d_2 = 15$ cm, antiparallel current, repelled): $F_2 = \\dfrac{\\mu_0 I_1 I_2 L}{2\\pi d_2} = ${T(F2)}\\ \\text{N}$`, `Net force: $F = F_1 - F_2 = ${T(F)}\\ \\text{N}$, directed towards the wire.`],
    };
  })(),
  (() => {
    const G = 100, Ig = 5e-3, Vr = 5, RV = Vr / Ig, E0 = 6, R1 = 1000, R2 = 1000, Rp = (R2 * RV) / (R2 + RV), V = (E0 * Rp) / (R1 + Rp);
    return {
      id: "j-voltmeter-loading", tag: "Galvanometer",
      text: "A galvanometer of resistance $100\\ \\Omega$ and full-scale current $5.0$ mA is converted into a voltmeter of range $0$–$5.0$ V. It is then connected across a $1.0$ k$\\Omega$ resistor $R_2$ that is in series with another $1.0$ k$\\Omega$ resistor $R_1$ across an ideal $6.0$ V battery. What does the voltmeter read?",
      vars: ["V", "E", "R1", "R2", "RV", "Rp"], formulas: ["V = E (R2 RV/(R2 + RV))/(R1 + R2 RV/(R2 + RV))", "V = E Rp/(R1 + Rp)"],
      formulaTex: "V = \\dfrac{E\\,R_p}{R_1 + R_p},\\quad R_p = \\dfrac{R_2R_V}{R_2+R_V}",
      given: { E: E0, R1, R2, RV }, target: "V", answer: V, unit: "V", answerTex: `${T(V)}\\ \\text{V}`,
      hints: ["The voltmeter's resistance is $R_V = V_{range}/I_g$. It is in parallel with $R_2$, so it changes the circuit.", "Replace $R_2$ and $R_V$ by their parallel combination $R_p$, then use the potential divider formula."],
      steps: [`Voltmeter resistance: $R_V = \\dfrac{5.0}{5.0\\times10^{-3}} = ${T(RV)}\\ \\Omega$ (series resistor $= R_V - G = ${T(RV - G)}\\ \\Omega$).`, `Parallel with $R_2$: $R_p = \\dfrac{R_2R_V}{R_2+R_V} = \\dfrac{(${T(R2)})(${T(RV)})}{${T(R2)}+${T(RV)}} = ${T(Rp)}\\ \\Omega$`, `Potential divider: $V = E\\dfrac{R_p}{R_1 + R_p} = (${T(E0)})\\dfrac{${T(Rp)}}{${T(R1)}+${T(Rp)}} = ${T(V)}\\ \\text{V}$`, `Without the voltmeter the p.d. across $R_2$ would be $${T(E0 / 2)}\\ \\text{V}$. The finite resistance of the voltmeter lowers the reading.`],
      traps: [{ value: E0 / 2, msg: "That is the p.d. without the voltmeter. The voltmeter's finite resistance ($R_V = V_{range}/I_g$) is in parallel with $R_2$ and lowers the reading." }],
    };
  })(),
  (() => {
    const m = MP, q = E, v = 2e6, th = 60, B = 0.4, n = 5, Tp = (2 * Math.PI * m) / (q * B), p = v * Math.cos(RAD(th)) * Tp, d = n * p;
    return {
      id: "j-helix-advance", tag: "Circular & helical motion",
      text: `A proton enters a uniform magnetic field of $0.40$ T with a speed of $2.0\\times10^{6}$ m/s at $60^\\circ$ to the field. How far does it advance along the field direction while completing 5 revolutions? ($m_p = 1.67\\times10^{-27}$ kg, ${CONST}.)`,
      vars: ["d", "n", "p", "m", "v", "theta", "q", "B"], formulas: ["d = n 2 pi m v cos(theta)/(q B)", "p = 2 pi m v cos(theta)/(q B)"],
      formulaTex: "d = n\\,p = n\\,\\dfrac{2\\pi m\\,v\\cos\\theta}{qB}",
      given: { n, m, v, theta: RAD(th), q, B }, target: "d", answer: d, unit: "m", answerTex: `${T(d)}\\ \\text{m}`,
      hints: ["The motion along the field is uniform at $v\\cos\\theta$, and the period depends only on $m$, $q$ and $B$.", "Distance along the field $=$ (number of revolutions) $\\times$ (pitch)."],
      steps: [`$T = \\dfrac{2\\pi m}{qB} = \\dfrac{2\\pi(${T(m)})}{(${T(q)})(${T(B)})} = ${T(Tp)}\\ \\text{s}$`, `$v_\\parallel = v\\cos60^\\circ = ${T(v * Math.cos(RAD(th)))}\\ \\text{m s}^{-1}$`, `Pitch: $p = v_\\parallel T = ${T(p)}\\ \\text{m}$`, `Five revolutions: $d = 5p = ${T(d)}\\ \\text{m}$`],
      traps: [{ value: p, msg: "That is the pitch, i.e. the advance in one revolution. The question asks about 5 revolutions." }],
    };
  })(),
  (() => {
    const N = 10, R = 0.1, I = 2, x = 0.1, B = (MU0 * N * I * R * R) / (2 * Math.pow(R * R + x * x, 1.5)), B0 = (MU0 * N * I) / (2 * R);
    return {
      id: "j-axis-field", tag: "Biot–Savart & Ampère",
      text: "A circular coil of 10 turns and radius $10$ cm carries a current of $2.0$ A. Find the magnetic field on its axis at a distance of $10$ cm from its centre. (Take $\\mu_0 = 4\\pi\\times10^{-7}$ T m/A.)",
      vars: ["B", "mu0", "N", "I", "R", "x"], formulas: ["B = mu0 N I R^2/(2 (R^2 + x^2)^(3/2))"],
      formulaTex: "B = \\dfrac{\\mu_0 N I R^2}{2\\,(R^2 + x^2)^{3/2}}",
      given: { mu0: MU0, N, I, R, x }, target: "B", answer: B, unit: "T", answerTex: `${T(B)}\\ \\text{T}`,
      hints: ["Use the formula for the field on the axis of a circular loop (from the Biot–Savart law), multiplied by the number of turns.", "Here $x = R$, so $R^2 + x^2 = 2R^2$."],
      steps: ["$B = \\dfrac{\\mu_0 N I R^2}{2(R^2 + x^2)^{3/2}}$", `With $x = R$: $(R^2 + x^2)^{3/2} = (2R^2)^{3/2} = 2\\sqrt2\\,R^3$, so $B = \\dfrac{\\mu_0 N I}{4\\sqrt2\\,R}$`, `$B = \\dfrac{(4\\pi\\times10^{-7})(${T(N)})(${T(I)})}{4\\sqrt2\\,(${T(R)})} = ${T(B)}\\ \\text{T}$`, `Check: this is $\\dfrac{1}{2\\sqrt2}$ of the field at the centre, $${T(B0)}\\ \\text{T}$.`],
      traps: [{ value: B0, msg: "That is the field at the centre of the coil. You need the field at $x = 10$ cm along the axis." }],
    };
  })(),
];
