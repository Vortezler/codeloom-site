import curriculumData from '../data/curriculum.json'
import UnitCard from '../components/UnitCard'
import type { CurriculumUnit } from '../types'

const units = curriculumData.units as CurriculumUnit[]

export default function Curriculum() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Curriculum</h1>
        <p className="mt-2 max-w-2xl text-text-muted">
          The full course arc, unit by unit. New members can look ahead to see what's coming; returning members can
          jump straight to where the club left off.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {units.map((unit) => (
          <UnitCard key={unit.id} unit={unit} />
        ))}
      </div>
    </div>
  )
}
