/** Fisher–Yates shuffle (returns a new array). Used for decks and option order. */
export function shuffled<T>(items: readonly T[]): T[] {
  const a = items.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export const range = (n: number): number[] => Array.from({ length: n }, (_, i) => i);
