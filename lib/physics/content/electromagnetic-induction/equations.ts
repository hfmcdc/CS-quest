import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c06");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Flux through a coil", "A uniform field $B$ makes an angle $\\theta$ with the normal to a flat loop of area $A$. Which equation gives the magnetic flux through the loop?",
      ["\\Phi = B\\,A\\cos\\theta", "\\Phi = B\\,A\\sin\\theta", "\\Phi = \\dfrac{B\\cos\\theta}{A}", "\\Phi = B\\,A^2\\cos\\theta"], 0,
      "Flux is $\\vec B\\cdot\\vec A = BA\\cos\\theta$, with $\\theta$ measured from the normal. It is maximum when the loop's plane is perpendicular to $B$."),
    eqq(id("e"), "Induced emf", "The magnetic flux through each turn of a coil of $N$ turns changes at a rate $d\\Phi/dt$. Which equation gives the induced emf, including its sign convention?",
      ["\\varepsilon = -N\\,\\dfrac{d\\Phi}{dt}", "\\varepsilon = N\\,\\Phi\\,t", "\\varepsilon = -\\dfrac{\\Phi}{N\\,t}", "\\varepsilon = -\\dfrac{N}{d\\Phi/dt}"], 0,
      "Faraday's law: the emf equals the rate of change of the total flux linkage, $-N\\,d\\Phi/dt$. The minus sign is Lenz's law."),
    eqq(id("e"), "Motional emf", "A conducting rod of length $l$ moves with speed $v$ perpendicular to its length in a uniform field $B$ perpendicular to the velocity. Which equation gives the emf across its ends?",
      ["\\varepsilon = B\\,l\\,v", "\\varepsilon = \\dfrac{B\\,l}{v}", "\\varepsilon = B\\,l\\,v^2", "\\varepsilon = \\dfrac{B\\,v}{l}"], 0,
      "In time $dt$ the rod sweeps an area $l\\,v\\,dt$, so $d\\Phi/dt = Blv$."),
    eqq(id("e"), "Self-induced emf", "The current in a coil of self-inductance $L$ changes at a rate $dI/dt$. Which equation gives the self-induced emf?",
      ["\\varepsilon = -L\\,\\dfrac{dI}{dt}", "\\varepsilon = -\\dfrac{1}{L}\\dfrac{dI}{dt}", "\\varepsilon = L\\,I\\,t", "\\varepsilon = -\\dfrac{L}{I}\\dfrac{dI}{dt}"], 0,
      "The flux linked with the coil is $\\Phi = LI$, so $\\varepsilon = -d\\Phi/dt = -L\\,dI/dt$. The emf opposes the change in current."),
    eqq(id("e"), "Solenoid inductance", "A long air-cored solenoid has $n$ turns per unit length, cross-sectional area $A$ and length $l$. Which equation gives its self-inductance?",
      ["L = \\mu_0\\,n^2\\,A\\,l", "L = \\mu_0\\,n\\,A\\,l", "L = \\dfrac{\\mu_0\\,n^2\\,A}{l}", "L = \\mu_0\\,n^2\\,A\\,l^2"], 0,
      "Flux linkage is $N\\Phi = (nl)(\\mu_0nI\\,A) = \\mu_0n^2AlI$, so $L = \\mu_0n^2Al$: it depends only on geometry and the core material."),
    eqq(id("e"), "Mutual induction", "Current $I_1$ in a primary coil changes at a rate $dI_1/dt$. Which equation gives the emf induced in a neighbouring secondary coil with mutual inductance $M$?",
      ["\\varepsilon_2 = -M\\,\\dfrac{dI_1}{dt}", "\\varepsilon_2 = -\\dfrac{1}{M}\\dfrac{dI_1}{dt}", "\\varepsilon_2 = M\\,I_1\\,t", "\\varepsilon_2 = -M\\,I_1"], 0,
      "The flux linked with the secondary is $\\Phi_2 = MI_1$, so the induced emf is $-d\\Phi_2/dt = -M\\,dI_1/dt$."),
  ],
};
