/** Number formatting for question text and worked solutions (LaTeX subset strings). */

export function fmtNum(x: number, sig = 3): string {
  if (!Number.isFinite(x)) return "?";
  if (x === 0) return "0";
  const a = Math.abs(x);
  if (a >= 1e-3 && a < 1e5) return String(Number(x.toPrecision(sig)));
  const [m, e] = x.toExponential(sig - 1).split("e");
  const mant = String(Number(m));
  const exp = parseInt(e, 10);
  return mant === "1" ? `10^{${exp}}` : mant === "-1" ? `-10^{${exp}}` : `${mant}\\times10^{${exp}}`;
}

/** Plain-text version for tests and aria labels. */
export function fmtPlain(x: number, sig = 3): string {
  return fmtNum(x, sig).replace(/\\times/g, "×").replace(/\^\{(-?\d+)\}/g, "^$1");
}
