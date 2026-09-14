// A short-lived safety net, separate from the long-term saved code: every
// so often we snapshot whatever's in the editor into a rolling buffer of at
// most 10 entries (oldest dropped first) so an accidental Reset or a wiped
// editor can be undone. Lives in sessionStorage, so it clears itself when
// the tab closes — it's a "just in case" net, not the real save.

const STORAGE_KEY = 'codeloom-autosave-history'
const MAX_SNAPSHOTS = 10

export interface Snapshot {
  problemId: string
  code: string
  savedAt: number
}

function readAll(): Snapshot[] {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

function writeAll(snapshots: Snapshot[]): void {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshots))
  } catch {
    // sessionStorage unavailable — autosave just won't persist this session.
  }
}

/** Appends a snapshot, dropping the oldest one once there are more than MAX_SNAPSHOTS. */
export function pushSnapshot(problemId: string, code: string): void {
  const snapshots = readAll()
  snapshots.push({ problemId, code, savedAt: Date.now() })
  while (snapshots.length > MAX_SNAPSHOTS) {
    snapshots.shift()
  }
  writeAll(snapshots)
}

/** Most recent snapshot for a given problem, if any. */
export function getLatestSnapshot(problemId: string): Snapshot | null {
  const snapshots = readAll().filter((s) => s.problemId === problemId)
  return snapshots.length > 0 ? snapshots[snapshots.length - 1] : null
}
