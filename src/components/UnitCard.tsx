import { Link } from 'react-router-dom'
import type { CurriculumUnit } from '../types'

export default function UnitCard({ unit }: { unit: CurriculumUnit }) {
  return (
    <Link
      to={`/curriculum/${unit.id}`}
      className="block rounded-xl border border-border bg-surface p-5 transition-colors hover:border-border-hover"
    >
      <h3 className="font-bold text-text">{unit.title}</h3>
      <p className="mt-1.5 text-sm text-text-muted">{unit.summary}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-text-muted">
        <span>{unit.concepts.length} concept{unit.concepts.length === 1 ? '' : 's'}</span>
        {unit.projects.length > 0 && <span>{unit.projects.length} project{unit.projects.length === 1 ? '' : 's'}</span>}
      </div>
    </Link>
  )
}
