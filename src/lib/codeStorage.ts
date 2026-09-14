// Long-term "resume where you left off" storage: a student's in-progress
// code for each problem, kept in localStorage so it survives closing the
// tab, restarting the browser, or coming back months later.

const KEY_PREFIX = 'codeloom-code:'

export function getSavedCode(problemId: string): string | null {
  try {
    return localStorage.getItem(KEY_PREFIX + problemId)
  } catch {
    return null
  }
}

export function saveCode(problemId: string, code: string): void {
  try {
    localStorage.setItem(KEY_PREFIX + problemId, code)
  } catch {
    // localStorage unavailable (private mode, quota, etc.) — code just won't persist.
  }
}
