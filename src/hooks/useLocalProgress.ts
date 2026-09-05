import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'codeloom-solved-problems'

function readSolved(): Set<string> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw)
    return new Set(Array.isArray(arr) ? arr : [])
  } catch {
    return new Set()
  }
}

function writeSolved(solved: Set<string>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(solved)))
  } catch {
    // localStorage unavailable (private mode, storage cleared, etc.) — progress just won't persist.
  }
}

/** Device-local "solved" tracking. No accounts, no sync — resets if the browser storage is cleared. */
export function useLocalProgress() {
  const [solved, setSolved] = useState<Set<string>>(() => readSolved())

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setSolved(readSolved())
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const markSolved = useCallback((problemId: string) => {
    setSolved((prev) => {
      if (prev.has(problemId)) return prev
      const next = new Set(prev)
      next.add(problemId)
      writeSolved(next)
      return next
    })
  }, [])

  const isSolved = useCallback((problemId: string) => solved.has(problemId), [solved])

  return { solved, isSolved, markSolved }
}
