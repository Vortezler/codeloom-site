import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import problemsData from '../data/problems.json'
import ProblemFilterBar from '../components/ProblemFilterBar'
import ProblemCard from '../components/ProblemCard'
import ExternalPracticeLinks from '../components/ExternalPracticeLinks'
import { useLocalProgress } from '../hooks/useLocalProgress'
import type { Difficulty, Problem, Topic } from '../types'

const problems = problemsData.problems as Problem[]

function isTopic(value: string | null): value is Topic {
  return value !== null && (['variables', 'loops', 'conditionals', 'functions', 'oop'] as string[]).includes(value)
}

export default function Practice() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null)

  const topicParam = searchParams.get('topic')
  const topic = isTopic(topicParam) ? topicParam : null

  const { isSolved, markSolved } = useLocalProgress()

  const setTopic = (t: Topic | null) => {
    setSearchParams(t ? { topic: t } : {})
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return problems.filter((p) => {
      if (difficulty && p.difficulty !== difficulty) return false
      if (topic && !p.topics.includes(topic)) return false
      if (q && !p.title.toLowerCase().includes(q) && !p.prompt.toLowerCase().includes(q)) return false
      return true
    })
  }, [search, difficulty, topic])

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Practice</h1>
        <p className="mt-2 max-w-2xl text-text-muted">
          Pick a problem, write real Python in the editor, and hit Run for instant pass/fail feedback. Problems cap
          out at OOP/classes-level difficulty — nothing beyond what Unit 6 covers.
        </p>
      </div>

      <ProblemFilterBar
        search={search}
        onSearchChange={setSearch}
        difficulty={difficulty}
        onDifficultyChange={setDifficulty}
        topic={topic}
        onTopicChange={setTopic}
      />

      <div className="space-y-3">
        <p className="text-xs text-text-muted">
          {filtered.length} problem{filtered.length === 1 ? '' : 's'}
        </p>
        {filtered.length === 0 && (
          <p className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-text-muted">
            No problems match those filters yet.
          </p>
        )}
        {filtered.map((problem) => (
          <ProblemCard
            key={problem.id}
            problem={problem}
            isSolved={isSolved(problem.id)}
            onSolved={() => markSolved(problem.id)}
          />
        ))}
      </div>

      <ExternalPracticeLinks />
    </div>
  )
}
