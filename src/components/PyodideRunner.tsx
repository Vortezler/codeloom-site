import { useEffect, useState } from 'react'
import CodeEditor from './CodeEditor'
import { ensureReady, runStudentCode, type RunResult } from '../lib/pyodideClient'
import type { Problem } from '../types'

interface PyodideRunnerProps {
  problem: Problem
  onAllPassed: () => void
}

type EnvStatus = 'loading' | 'ready' | 'error'

export default function PyodideRunner({ problem, onAllPassed }: PyodideRunnerProps) {
  const [code, setCode] = useState(problem.starterCode)
  const [envStatus, setEnvStatus] = useState<EnvStatus>('loading')
  const [running, setRunning] = useState(false)
  const [result, setResult] = useState<RunResult | null>(null)
  const [runError, setRunError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    setEnvStatus('loading')
    ensureReady()
      .then(() => {
        if (!cancelled) setEnvStatus('ready')
      })
      .catch(() => {
        if (!cancelled) setEnvStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [])

  const retryLoad = () => {
    setEnvStatus('loading')
    ensureReady()
      .then(() => setEnvStatus('ready'))
      .catch(() => setEnvStatus('error'))
  }

  const handleRun = async () => {
    setRunning(true)
    setRunError(null)
    setResult(null)
    try {
      const r = await runStudentCode(code, problem.testCases)
      setResult(r)
      setEnvStatus('ready')
      if (!r.loadError && r.results.length > 0) {
        const allPass = r.results.every((t, i) => t.ok && t.value === problem.testCases[i].expected)
        if (allPass) onAllPassed()
      }
    } catch (err) {
      setEnvStatus('error')
      setRunError(err instanceof Error ? err.message : String(err))
    } finally {
      setRunning(false)
    }
  }

  return (
    <div className="space-y-4">
      <CodeEditor value={code} onChange={setCode} />

      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={handleRun}
          disabled={running || envStatus === 'error'}
          className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-bg transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          {running ? 'Running…' : 'Run'}
        </button>
        <button
          onClick={() => {
            setCode(problem.starterCode)
            setResult(null)
            setRunError(null)
          }}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text"
        >
          Reset to starter code
        </button>
        <EnvStatusBadge status={envStatus} onRetry={retryLoad} />
      </div>

      {runError && (
        <p className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3 text-sm text-danger">{runError}</p>
      )}

      {result?.loadError && (
        <div className="rounded-lg border border-danger/40 bg-danger/10 px-4 py-3">
          <p className="text-sm font-semibold text-danger">Your code didn't run:</p>
          <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-danger">{result.loadError}</pre>
        </div>
      )}

      {result && !result.loadError && (
        <div className="space-y-2">
          {result.results.map((r, i) => {
            const expected = problem.testCases[i].expected
            const pass = r.ok && r.value === expected
            return (
              <div
                key={i}
                className={`rounded-lg border px-4 py-3 text-sm ${
                  pass ? 'border-success/40 bg-success/10' : 'border-danger/40 bg-danger/10'
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs">
                  <span className={pass ? 'text-success' : 'text-danger'}>{pass ? '✓ PASS' : '✗ FAIL'}</span>
                  <span className="text-text-muted">{problem.testCases[i].call}</span>
                </div>
                {!pass && (
                  <p className="mt-1 font-mono text-xs text-text-muted">
                    expected <span className="text-text">{expected}</span>, got{' '}
                    <span className="text-danger">{r.ok ? r.value : r.error}</span>
                  </p>
                )}
              </div>
            )
          })}
          {result.stdout && (
            <div className="rounded-lg border border-border bg-surface-raised px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">Printed output</p>
              <pre className="mt-1 whitespace-pre-wrap font-mono text-xs text-text-muted">{result.stdout}</pre>
            </div>
          )}
          {result.results.length > 0 && result.results.every((t, i) => t.ok && t.value === problem.testCases[i].expected) && (
            <p className="text-sm font-semibold text-success">All tests passed! 🎉</p>
          )}
        </div>
      )}
    </div>
  )
}

function EnvStatusBadge({ status, onRetry }: { status: EnvStatus; onRetry: () => void }) {
  if (status === 'loading') {
    return <span className="text-xs text-text-muted">Loading Python environment…</span>
  }
  if (status === 'error') {
    return (
      <span className="text-xs text-danger">
        Couldn't load Python — check your connection.{' '}
        <button onClick={onRetry} className="font-semibold underline">
          Retry
        </button>
      </span>
    )
  }
  return <span className="text-xs text-text-muted">Python ready</span>
}
