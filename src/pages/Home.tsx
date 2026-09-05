import { Link } from 'react-router-dom'
import scheduleData from '../data/schedule.json'
import type { ScheduleSemester } from '../types'

const schedule = scheduleData as { schoolYear: string; semesters: ScheduleSemester[] }

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl border border-border bg-surface px-6 py-12 text-center sm:px-10">
        <p className="font-mono text-sm uppercase tracking-widest text-accent">Jones Middle School · Python Club</p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">Codeloom</h1>
        <p className="mx-auto mt-4 max-w-2xl text-balance text-text-muted">
          Codeloom is Jones Middle School's Python programming club. We meet biweekly to build real projects, learn
          core programming concepts, and level up together — no experience required.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/curriculum"
            className="rounded-lg bg-accent px-5 py-2.5 font-semibold text-bg transition-colors hover:bg-accent-hover"
          >
            View the Curriculum
          </Link>
          <Link
            to="/practice"
            className="rounded-lg border border-border bg-surface-raised px-5 py-2.5 font-semibold text-text transition-colors hover:border-border-hover"
          >
            Start Practicing
          </Link>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        <InfoCard label="Meeting cadence" value="Biweekly" detail="Every other week during the school year." />
        <InfoCard label="Registration fee" value="$30 one-time" detail="Covers materials for the whole year." />
        <InfoCard label="Snacks" value="Included" detail="Every meeting. Yes, really." />
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <div className="flex items-baseline justify-between gap-3">
          <h2 className="text-xl font-bold">Meeting schedule</h2>
          <span className="text-sm text-text-muted">{schedule.schoolYear}</span>
        </div>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
          {schedule.semesters.map((semester) => (
            <div key={semester.name}>
              <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">
                {semester.name} · {semester.year}
              </h3>
              <ul className="mt-2 space-y-1.5 text-sm">
                {semester.meetings.map((meeting) => (
                  <li key={meeting.date} className="flex items-baseline justify-between gap-3">
                    <span className="text-text">{meeting.date}</span>
                    {meeting.label && <span className="text-teal">{meeting.label}</span>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-bold">Currently recruiting</h2>
        <p className="mt-2 text-text-muted">
          Codeloom is open to new middle-school members. Whether you've never written a line of code or you were
          part of Codeloom last year, there's a place for you — new students start from the beginning, and
          returning students pick up right where the curriculum leaves off. Come to the interest meeting to sign
          up.
        </p>
        <p className="mt-4">
          <Link to="/about" className="font-medium text-accent hover:text-accent-hover">
            Learn more about how the club works →
          </Link>
        </p>
      </section>
    </div>
  )
}

function InfoCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">{label}</p>
      <p className="mt-1 text-2xl font-bold text-teal">{value}</p>
      <p className="mt-1 text-sm text-text-muted">{detail}</p>
    </div>
  )
}
