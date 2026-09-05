import { Link, useParams } from 'react-router-dom'
import curriculumData from '../data/curriculum.json'
import type { CurriculumUnit, Topic } from '../types'

const units = curriculumData.units as CurriculumUnit[]

// Best-guess mapping from unit to its closest practice topic tag, since the
// practice bank's topics (variables/loops/conditionals/functions/oop) are
// coarser than the club's six curriculum units.
const UNIT_TOPIC: Record<string, Topic> = {
  'unit-1': 'variables',
  'unit-2': 'variables',
  'unit-3': 'loops',
  'unit-4': 'loops',
  'unit-5': 'functions',
  'unit-6': 'oop',
}

export default function CurriculumUnit() {
  const { unitId } = useParams<{ unitId: string }>()
  const unit = units.find((u) => u.id === unitId)

  if (!unit) {
    return (
      <div className="space-y-4">
        <p className="text-text-muted">Unit not found.</p>
        <Link to="/curriculum" className="font-medium text-accent hover:text-accent-hover">
          ← Back to curriculum
        </Link>
      </div>
    )
  }

  const topic = UNIT_TOPIC[unit.id]

  return (
    <div className="space-y-8">
      <div>
        <Link to="/curriculum" className="text-sm font-medium text-text-muted hover:text-text">
          ← Curriculum
        </Link>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight">{unit.title}</h1>
        <p className="mt-2 max-w-2xl text-text-muted">{unit.summary}</p>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="font-bold">Concepts covered</h2>
        <ul className="mt-3 list-inside list-disc space-y-1.5 text-text-muted">
          {unit.concepts.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      {unit.projects.length > 0 && (
        <section className="rounded-2xl border border-border bg-surface p-6">
          <h2 className="font-bold">Projects</h2>
          <div className="mt-3 space-y-4">
            {unit.projects.map((p) => (
              <div key={p.title}>
                <h3 className="font-semibold text-teal">{p.title}</h3>
                <p className="mt-0.5 text-sm text-text-muted">{p.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="rounded-2xl border border-dashed border-border p-6">
        <h2 className="font-bold text-text-muted">Lesson notes</h2>
        <p className="mt-2 whitespace-pre-wrap text-sm italic text-text-muted">{unit.lessonNotes}</p>
      </section>

      {topic && (
        <Link
          to={`/practice?topic=${topic}`}
          className="inline-block rounded-lg bg-accent px-5 py-2.5 font-semibold text-bg transition-colors hover:bg-accent-hover"
        >
          Practice these concepts →
        </Link>
      )}
    </div>
  )
}
