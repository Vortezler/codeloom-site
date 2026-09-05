interface ExternalLink {
  name: string
  url: string
  description: string
}

const groups: { topic: string; links: ExternalLink[] }[] = [
  {
    topic: 'Beginner-friendly',
    links: [
      {
        name: 'CodingBat (Python)',
        url: 'https://codingbat.com/python',
        description: 'Short, focused function-writing exercises with instant feedback.',
      },
      {
        name: 'W3Schools Python Exercises',
        url: 'https://www.w3schools.com/python/exercise.asp',
        description: 'Quick exercises paired with a reference for every core concept.',
      },
    ],
  },
  {
    topic: 'More of a challenge',
    links: [
      {
        name: 'Codewars',
        url: 'https://www.codewars.com/?language=python',
        description: 'Community-ranked "kata" from easy to very hard — good for stretch goals.',
      },
      {
        name: 'HackerRank (Python)',
        url: 'https://www.hackerrank.com/domains/python',
        description: 'Structured tracks covering the same topics as the club, plus more.',
      },
    ],
  },
]

export default function ExternalPracticeLinks() {
  return (
    <section className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">More Practice</h2>
        <p className="mt-1 text-sm text-text-muted">
          Want extra reps outside the club? These free sites are great for more practice at your own pace.
        </p>
      </div>
      {groups.map((group) => (
        <div key={group.topic}>
          <h3 className="text-sm font-semibold uppercase tracking-wide text-text-muted">{group.topic}</h3>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            {group.links.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="rounded-xl border border-border bg-surface p-4 transition-colors hover:border-border-hover"
              >
                <p className="font-semibold text-accent">{link.name}</p>
                <p className="mt-1 text-sm text-text-muted">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      ))}
    </section>
  )
}
