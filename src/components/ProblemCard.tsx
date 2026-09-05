import { useState } from 'react'
import PyodideRunner from './PyodideRunner'
import type { Problem } from '../types'

const DIFFICULTY_STYLES: Record<Problem['difficulty'], string> = {
  beginner: 'bg-teal-muted text-teal',
  intermediate: 'bg-accent-muted text-accent',
  advanced: 'bg-danger/20 text-danger',
}

const DIFFICULTY_LABEL: Record<Problem['difficulty'], string> = {
  beginner: 'Beginner',
  intermediate: 'Intermediate',
  advanced: 'Advanced',
}

interface ProblemCardProps {
  problem: Problem
  isSolved: boolean
  onSolved: () => void
}

export default function ProblemCard({ problem, isSolved, onSolved }: ProblemCardProps) {
  const [open, setOpen] = useState(false)
  const [showHint, setShowHint] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-surface">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-start justify-between gap-3 px-5 py-4 text-left"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-text">{problem.title}</h3>
            {isSolved && <span className="text-sm text-success">✓ Solved</span>}
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${DIFFICULTY_STYLES[problem.difficulty]}`}>
              {DIFFICULTY_LABEL[problem.difficulty]}
            </span>
            {problem.topics.map((t) => (
              <span key={t} className="rounded-full bg-surface-raised px-2 py-0.5 text-xs font-medium text-text-muted">
                {t}
              </span>
            ))}
          </div>
        </div>
        <span className="mt-1 shrink-0 text-text-muted">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="space-y-4 border-t border-border px-5 py-4">
          <div className="flex items-start justify-between gap-3">
            <p className="text-sm text-text-muted">{problem.prompt}</p>
            <button
              onClick={() => setShowHint((h) => !h)}
              aria-label={showHint ? 'Hide hint' : 'Show hint'}
              title={showHint ? 'Hide hint' : 'Show hint'}
              className="shrink-0 rounded-full border border-border p-1.5 text-base leading-none hover:border-border-hover"
            >
              💡
            </button>
          </div>
          {showHint && (
            <p className="rounded-lg border border-teal-muted bg-teal-muted/40 px-4 py-3 text-sm text-teal">
              {problem.hint}
            </p>
          )}
          <PyodideRunner problem={problem} onAllPassed={onSolved} />
        </div>
      )}
    </div>
  )
}
