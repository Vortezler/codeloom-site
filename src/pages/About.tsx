const strategies = [
  {
    title: 'Project-centered meetings',
    body: 'Every session is built around making something — not just reading slides. Concepts get introduced through the project that needs them.',
  },
  {
    title: 'Scaffolded starter code',
    body: "Members never start from a blank file. Each project ships with starter code so the focus stays on the new concept, not on boilerplate.",
  },
  {
    title: 'Junior mentors',
    body: 'Older or returning members help newer ones during work time, reinforcing their own understanding while giving everyone more one-on-one help.',
  },
  {
    title: 'Concept refreshers',
    body: 'Meetings open with a short warm-up revisiting a previous concept, so ideas stick before new ones stack on top.',
  },
  {
    title: 'Extension challenges',
    body: 'Returning students who finish early (or want more) get optional stretch challenges layered onto the same project as everyone else.',
  },
]

export default function About() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-extrabold tracking-tight">About Codeloom</h1>
        <p className="mt-3 max-w-2xl text-text-muted">
          Codeloom is Jones Middle School's Python programming club, built around hands-on projects and a growing
          curriculum that carries members from their very first program through object-oriented Python.
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <h2 className="text-xl font-bold">Club history</h2>
        <div className="mt-4 space-y-4 text-text-muted">
          <p>
            <span className="font-semibold text-text">Year 1</span> started with an all-new cohort — every member
            began at square one, working through the curriculum from the very first unit together.
          </p>
          <p>
            <span className="font-semibold text-text">Year 2</span> brought a mixed cohort: returning members who
            already covered Year 1 material alongside brand-new members starting fresh. That's exactly why this
            site's curriculum is open to everyone at any time — new members can look ahead to see what's coming,
            and returning members can jump straight to where they left off.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold">How sessions work</h2>
        <p className="mt-2 text-text-muted">
          Every meeting follows the same five ideas, working together to keep the pace approachable for new coders
          and engaging for returners:
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {strategies.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-surface p-5">
              <h3 className="font-semibold text-accent">{s.title}</h3>
              <p className="mt-1.5 text-sm text-text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
