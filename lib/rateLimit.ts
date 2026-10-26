// A simple per-visitor limit so one person can't run up the AI bill.
// In-memory, so it resets when the server restarts and is per instance on serverless
// hosts. It is a courtesy limit, not a security boundary; the API key's own quota is
// the real backstop.

const WINDOW_MS = 60 * 60 * 1000
export const LIMIT_PER_HOUR = 30

const hits = new Map<string, number[]>()

export function allow(visitor: string, now = Date.now()): boolean {
  const recent = (hits.get(visitor) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT_PER_HOUR) {
    hits.set(visitor, recent)
    return false
  }
  recent.push(now)
  hits.set(visitor, recent)
  return true
}

export function resetLimits() {
  hits.clear()
}
