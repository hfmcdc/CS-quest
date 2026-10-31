/**
 * Tiny in-memory store that remembers where the student was inside each subject
 * (screen, topic, mode, practice progress) while they move between routes.
 * Module scope survives client-side navigation, so Back / subject switching
 * returns to the previous screen. Nothing is persisted: a refresh resets it,
 * which matches the app's "nothing is saved" promise.
 */
const store = new Map<string, unknown>();

export function readNav<T>(key: string, fallback: T): T {
  return store.has(key) ? (store.get(key) as T) : fallback;
}

export function writeNav<T>(key: string, value: T): void {
  store.set(key, value);
}

export function clearNav(key: string): void {
  store.delete(key);
}
