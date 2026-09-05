import type { TestCase } from '../types'

export interface TestCaseResult {
  ok: boolean
  value?: string
  error?: string
}

export interface RunResult {
  loadError: string | null
  results: TestCaseResult[]
  stdout: string
}

const RUN_TIMEOUT_MS = 5000

type PendingEntry = {
  resolve: (data: string) => void
  reject: (err: Error) => void
  timeoutId: number
}

let worker: Worker | null = null
let readyPromise: Promise<void> | null = null
let msgCounter = 0
const pending = new Map<string, PendingEntry>()

function createWorker(): Worker {
  const w = new Worker(new URL('../workers/pyodideWorker.ts', import.meta.url))
  w.onmessage = (e: MessageEvent) => {
    const { id, type, data, error } = e.data
    const entry = pending.get(id)
    if (!entry) return
    clearTimeout(entry.timeoutId)
    pending.delete(id)
    if (type === 'result') entry.resolve(data)
    else entry.reject(new Error(error || 'Unknown Python worker error'))
  }
  return w
}

function getWorker(): Worker {
  if (!worker) worker = createWorker()
  return worker
}

/** Loads the (cached, singleton) Pyodide worker. Safe to call repeatedly. */
export function ensureReady(): Promise<void> {
  if (readyPromise) return readyPromise
  const w = getWorker()
  readyPromise = new Promise((resolve, reject) => {
    const id = 'init'
    const handleMsg = (e: MessageEvent) => {
      if (e.data.id !== 'init') return
      w.removeEventListener('message', handleMsg)
      if (e.data.type === 'ready') resolve()
      else reject(new Error(e.data.error || 'Failed to load the Python environment'))
    }
    w.addEventListener('message', handleMsg)
    w.postMessage({ id, type: 'init' })
  })
  return readyPromise
}

function resetWorker(reason: string) {
  if (worker) worker.terminate()
  worker = null
  readyPromise = null
  pending.forEach((entry) => entry.reject(new Error(reason)))
  pending.clear()
}

function buildHarness(studentCode: string, testCases: TestCase[]): string {
  const codeJson = JSON.stringify(studentCode)
  const callsJson = JSON.stringify(testCases.map((t) => t.call))
  return `
import sys, io, json

__student_code = ${codeJson}
__calls = ${callsJson}

def __run():
    results = []
    ns = {}
    buf = io.StringIO()
    old = sys.stdout
    sys.stdout = buf
    try:
        exec(__student_code, ns)
    except Exception as e:
        sys.stdout = old
        return {"loadError": f"{type(e).__name__}: {e}", "results": [], "stdout": buf.getvalue()}
    sys.stdout = old
    for call in __calls:
        sys.stdout = buf
        try:
            value = eval(call, ns)
            sys.stdout = old
            results.append({"ok": True, "value": str(value)})
        except Exception as e:
            sys.stdout = old
            results.append({"ok": False, "error": f"{type(e).__name__}: {e}"})
    return {"loadError": None, "results": results, "stdout": buf.getvalue()}

json.dumps(__run())
`
}

/** Runs student code against test cases inside the sandboxed worker, with a timeout guard against infinite loops. */
export async function runStudentCode(studentCode: string, testCases: TestCase[]): Promise<RunResult> {
  await ensureReady()
  const w = getWorker()
  const id = `run-${msgCounter++}`
  const harness = buildHarness(studentCode, testCases)

  return new Promise<RunResult>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      pending.delete(id)
      resetWorker('timeout')
      reject(
        new Error(
          'Your code took too long to run (possibly an infinite loop). It was stopped after 5 seconds — the Python environment is reloading.'
        )
      )
    }, RUN_TIMEOUT_MS)

    pending.set(id, {
      resolve: (data: string) => resolve(JSON.parse(data) as RunResult),
      reject,
      timeoutId,
    })

    w.postMessage({ id, type: 'run', harness })
  })
}
