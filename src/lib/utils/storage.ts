/**
 * Typed localStorage helpers - SSR-safe.
 * Values are JSON-serialized. Use for non-sensitive client-only data.
 * For auth/session prefer iron-session via `src/lib/session.ts`.
 */

const isBrowser = () => typeof window !== "undefined" && !!window.localStorage;

export function getItem<T>(key: string, fallback: T | null = null): T | null {
  if (!isBrowser()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[storage] setItem failed for "${key}":`, err);
  }
}

export function removeItem(key: string): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.removeItem(key);
  } catch {}
}

export function clearStorage(): void {
  if (!isBrowser()) return;
  try {
    window.localStorage.clear();
  } catch {}
}

export function hasItem(key: string): boolean {
  if (!isBrowser()) return false;
  return window.localStorage.getItem(key) !== null;
}

// optional namespaced helper for typed keys
export const storage = {
  get: getItem,
  set: setItem,
  remove: removeItem,
  clear: clearStorage,
  has: hasItem,
};
