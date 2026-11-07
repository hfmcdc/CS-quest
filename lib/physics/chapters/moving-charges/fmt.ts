/** Number formatting for worked solutions. Every figure in a solution is computed, never typed by hand. */

/** TeX for a number to `sf` significant figures: 0.0314 stays plain, 1.6e-13 becomes 1.6\times10^{-13}. */
export function tex(x: number, sf = 3): string {
  if (x === 0) return "0";
  const ax = Math.abs(x);
  if (ax >= 0.01 && ax < 10000) return String(parseFloat(x.toPrecision(sf)));
  const [m, e] = x.toExponential(sf - 1).split("e");
  return `${parseFloat(m)}\\times10^{${parseInt(e, 10)}}`;
}

/** Plain-text version used where the answer is also shown as "type this" text. */
export const num = (x: number, sf = 3) => tex(x, sf);

// Constants used in the NCERT numericals
export const E = 1.6e-19;      // C, magnitude of electron/proton charge
export const ME = 9.1e-31;     // kg
export const MP = 1.67e-27;    // kg
export const MU0 = 4 * Math.PI * 1e-7; // T m A^-1
export const GRAV = 9.8;       // m s^-2
export const RAD = (d: number) => (d * Math.PI) / 180;
