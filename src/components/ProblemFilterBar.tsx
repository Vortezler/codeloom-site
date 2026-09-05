import type { Difficulty, Topic } from '../types'

const DIFFICULTIES: Difficulty[] = ['beginner', 'intermediate', 'advanced']
const TOPICS: Topic[] = ['variables', 'loops', 'conditionals', 'functions', 'oop']

const TOPIC_LABELS: Record<Topic, string> = {
  variables: 'Variables',
  loops: 'Loops',
  conditionals: 'Conditionals',
  functions: 'Functions',
  oop: 'OOP',
}

interface ProblemFilterBarProps {
  search: string
  onSearchChange: (v: string) => void
  difficulty: Difficulty | null
  onDifficultyChange: (v: Difficulty | null) => void
  topic: Topic | null
  onTopicChange: (v: Topic | null) => void
}

export default function ProblemFilterBar({
  search,
  onSearchChange,
  difficulty,
  onDifficultyChange,
  topic,
  onTopicChange,
}: ProblemFilterBarProps) {
  return (
    <div className="space-y-3">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search problems…"
        className="w-full rounded-lg border border-border bg-surface px-4 py-2 text-sm text-text placeholder:text-text-muted focus:border-accent focus:outline-none"
      />

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Difficulty</span>
        <Chip label="All" active={difficulty === null} onClick={() => onDifficultyChange(null)} />
        {DIFFICULTIES.map((d) => (
          <Chip key={d} label={d} active={difficulty === d} onClick={() => onDifficultyChange(d)} />
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-text-muted">Topic</span>
        <Chip label="All" active={topic === null} onClick={() => onTopicChange(null)} />
        {TOPICS.map((t) => (
          <Chip key={t} label={TOPIC_LABELS[t]} active={topic === t} onClick={() => onTopicChange(t)} />
        ))}
      </div>
    </div>
  )
}

function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-3 py-1 text-xs font-medium capitalize transition-colors ${
        active ? 'bg-accent text-bg' : 'bg-surface-raised text-text-muted hover:text-text'
      }`}
    >
      {label}
    </button>
  )
}
