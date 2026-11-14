import { eqq, ids } from "../../builders";
import type { EquationsContent } from "../../types";

const id = ids("c13");

export const content: EquationsContent = {
  questions: [
    eqq(id("e"), "Nuclear radius", "A nucleus has mass number $A$. Which equation gives its radius, where $R_0$ is a constant of about $1.2\\times10^{-15}$ m?",
      ["R = R_0\\,A^{1/3}", "R = R_0\\,A", "R = R_0\\,A^{3}", "R = \\dfrac{R_0}{A^{1/3}}"], 0,
      "Experiments show that nuclear volume is proportional to the number of nucleons, $\\tfrac43\\pi R^3\\propto A$, so $R\\propto A^{1/3}$."),
    eqq(id("e"), "Mass defect", "A nucleus $^A_Z\\text{X}$ has mass $M$, and $m_p$ and $m_n$ are the masses of a proton and a neutron. Which equation gives its mass defect $\\Delta m$?",
      ["\\Delta m = Z\\,m_p + (A - Z)\\,m_n - M", "\\Delta m = Z\\,m_p + (A - Z)\\,m_n + M", "\\Delta m = Z\\,m_n + (A - Z)\\,m_p - M", "\\Delta m = M - A\\,m_p"], 0,
      "The nucleus has $Z$ protons and $A - Z$ neutrons. The mass defect is the amount by which the separate nucleons outweigh the bound nucleus."),
    eqq(id("e"), "Binding energy", "The mass defect of a nucleus is $\\Delta m$. Which equation gives its binding energy $E_b$?",
      ["E_b = \\Delta m\\,c^2", "E_b = \\Delta m\\,c", "E_b = \\dfrac{\\Delta m}{c^2}", "E_b = \\dfrac{1}{2}\\,\\Delta m\\,c"], 0,
      "The missing mass has been radiated away as the nucleus formed. By Einstein's relation, the energy equivalent is $\\Delta m\\,c^2$, which is also the energy needed to take the nucleus apart."),
    eqq(id("e"), "Binding energy per nucleon", "A nucleus of mass number $A$ has a binding energy $E_b$. Which equation gives its binding energy per nucleon $\\bar E_b$?",
      ["\\bar E_b = \\dfrac{E_b}{A}", "\\bar E_b = E_b\\,A", "\\bar E_b = \\dfrac{A}{E_b}", "\\bar E_b = \\dfrac{E_b}{A^2}"], 0,
      "Dividing the total binding energy by the number of nucleons gives the average energy per nucleon, which indicates how tightly the nucleus is bound."),
    eqq(id("e"), "Mass–energy", "A mass $m$ is converted entirely into energy $E$. Which equation relates them?",
      ["E = m\\,c^2", "E = m\\,c", "E = \\dfrac{1}{2}\\,m\\,c", "E = m^2\\,c"], 0,
      "Einstein's mass–energy relation is $E = mc^2$. Even a tiny mass corresponds to a large amount of energy because $c^2$ is so large."),
    eqq(id("e"), "Nuclear density", "A nucleus of mass number $A$ and radius $R = R_0A^{1/3}$ has a mass of about $A\\,m_u$. Which equation gives its density $\\rho$?",
      ["\\rho = \\dfrac{3\\,m_u}{4\\pi R_0^3}", "\\rho = \\dfrac{3\\,m_u\\,A}{4\\pi R_0^3}", "\\rho = \\dfrac{4\\pi R_0^3}{3\\,m_u}", "\\rho = \\dfrac{3\\,m_u}{4\\pi R_0^3\\,A^{1/3}}"], 0,
      "$\\rho = \\dfrac{A\\,m_u}{\\tfrac43\\pi R_0^3A} = \\dfrac{3m_u}{4\\pi R_0^3}$. The factor $A$ cancels, so all nuclei have the same density."),
  ],
};
