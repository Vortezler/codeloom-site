import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/practice', label: 'Practice' },
]

export default function NavBar() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur">
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
        <NavLink to="/" className="flex shrink-0 items-center gap-1.5 text-lg font-bold tracking-tight text-text">
          <span className="text-accent">&lt;/&gt;</span>
          <span className="hidden sm:inline">Codeloom</span>
        </NavLink>
        <ul className="flex items-center gap-0.5 sm:gap-2">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-1.5 py-1.5 text-xs font-medium transition-colors sm:px-3 sm:text-sm ${
                    isActive
                      ? 'bg-surface-raised text-accent'
                      : 'text-text-muted hover:bg-surface hover:text-text'
                  }`
                }
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}
