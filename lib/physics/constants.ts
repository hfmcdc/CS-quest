/**
 * Constants used in the Physics question banks. Every question that uses one states the value in its text,
 * and its answer is computed with exactly that value, so there is never ambiguity about rounding.
 */
export interface ConstInfo { value: number; tex: string; unit: string; label: string }

export const CONSTS = {
  k: { value: 9e9, tex: "9\\times10^{9}", unit: "N m^2 C^-2", label: "k" },
  eps0: { value: 8.85e-12, tex: "8.85\\times10^{-12}", unit: "C^2 N^-1 m^-2", label: "\\varepsilon_0" },
  e: { value: 1.6e-19, tex: "1.6\\times10^{-19}", unit: "C", label: "e" },
  me: { value: 9.1e-31, tex: "9.1\\times10^{-31}", unit: "kg", label: "m_e" },
  mp: { value: 1.67e-27, tex: "1.67\\times10^{-27}", unit: "kg", label: "m_p" },
  mu0: { value: 4e-7 * Math.PI, tex: "4\\pi\\times10^{-7}", unit: "T m A^-1", label: "\\mu_0" },
  c: { value: 3e8, tex: "3\\times10^{8}", unit: "m s^-1", label: "c" },
  h: { value: 6.63e-34, tex: "6.63\\times10^{-34}", unit: "J s", label: "h" },
  u: { value: 1.66e-27, tex: "1.66\\times10^{-27}", unit: "kg", label: "1\\,\\text{u}" },
  Rinf: { value: 1.097e7, tex: "1.097\\times10^{7}", unit: "m^-1", label: "R" },
} as const satisfies Record<string, ConstInfo>;

export type ConstName = keyof typeof CONSTS;
export const C = Object.fromEntries(Object.entries(CONSTS).map(([k, v]) => [k, v.value])) as Record<ConstName, number>;

/** 1 u in MeV/c², and 1 eV in joules, as used in Atoms and Nuclei. */
export const MEV_PER_U = 931.5;
export const EV = 1.6e-19;
