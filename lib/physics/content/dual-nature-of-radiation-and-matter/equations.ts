import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c11");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Photoelectric equation", "Light of frequency $\\nu$ falls on a metal of work function $\\phi_0$. Which equation gives the maximum kinetic energy $K_{max}$ of the emitted electrons?",
      ["K_{max} = h\\nu - \\phi_0", "K_{max} = h\\nu + \\phi_0", "K_{max} = \\dfrac{h\\nu}{\\phi_0}", "K_{max} = \\phi_0 - h\\nu"], 0,
      "By energy conservation for one photon and one electron, $h\\nu = \\phi_0 + K_{max}$. Emission needs $h\\nu>\\phi_0$."),
    eqq(id("e"), "Photon energy", "A photon has wavelength $\\lambda$ in vacuum. Which equation gives its energy $E$?",
      ["E = \\dfrac{h\\,c}{\\lambda}", "E = h\\,c\\,\\lambda", "E = \\dfrac{h\\,\\lambda}{c}", "E = \\dfrac{\\lambda}{h\\,c}"], 0,
      "$E = h\\nu$ and $\\nu = c/\\lambda$, so $E = hc/\\lambda$. Shorter wavelength means higher energy."),
    eqq(id("e"), "de Broglie wavelength", "A particle of mass $m$ moves with speed $v$. Which equation gives its de Broglie wavelength?",
      ["\\lambda = \\dfrac{h}{m\\,v}", "\\lambda = \\dfrac{m\\,v}{h}", "\\lambda = h\\,m\\,v", "\\lambda = \\dfrac{h}{m\\,v^2}"], 0,
      "De Broglie proposed that a particle of momentum $p$ has wavelength $\\lambda = h/p$, extending the photon relation $p = h/\\lambda$."),
    eqq(id("e"), "Stopping potential", "In a photoelectric experiment the retarding potential that just stops the fastest photoelectrons is $V_0$. Which equation connects it to $K_{max}$?",
      ["e\\,V_0 = K_{max}", "V_0 = e\\,K_{max}", "e\\,V_0 = \\dfrac{1}{K_{max}}", "V_0 = \\dfrac{e}{K_{max}}"], 0,
      "The work done against the retarding field, $eV_0$, takes all the kinetic energy of the fastest electron, so $eV_0 = K_{max}$."),
    eqq(id("e"), "Photon momentum", "A photon has wavelength $\\lambda$. Which equation gives its momentum $p$?",
      ["p = \\dfrac{h}{\\lambda}", "p = h\\,\\lambda", "p = \\dfrac{\\lambda}{h}", "p = \\dfrac{h}{\\lambda^2}"], 0,
      "Using $E = pc$ for a photon and $E = hc/\\lambda$ gives $p = h/\\lambda$."),
    eqq(id("e"), "Threshold frequency", "A metal has work function $\\phi_0$. Which equation gives the threshold frequency $\\nu_0$ below which no photoelectrons are emitted?",
      ["\\nu_0 = \\dfrac{\\phi_0}{h}", "\\nu_0 = h\\,\\phi_0", "\\nu_0 = \\dfrac{h}{\\phi_0}", "\\nu_0 = \\dfrac{\\phi_0}{h^2}"], 0,
      "Emission just becomes possible when $h\\nu_0 = \\phi_0$ (so $K_{max} = 0$), giving $\\nu_0 = \\phi_0/h$."),
  ],
};
