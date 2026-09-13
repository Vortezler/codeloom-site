import { NavLink } from 'react-router-dom'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/curriculum', label: 'Curriculum' },
  { to: '/practice', label: 'Practice' },
]

const topLinkClass = ({ isActive }: { isActive: boolean }) =>
  `whitespace-nowrap px-3 py-1.5 text-sm font-medium transition-colors ${
    isActive ? 'bg-surface-raised text-accent' : 'text-text-muted hover:bg-surface hover:text-text'
  }`

const bottomLinkClass = ({ isActive }: { isActive: boolean }) =>
  `flex flex-1 flex-col items-center justify-center py-2 text-xs font-medium ${
    isActive ? 'text-accent' : 'text-text-muted'
  }`

export default function NavBar() {
  return (
    <>
      {/* Top bar: logo everywhere, full link row on tablet/desktop only. */}
      <header className="sticky top-0 z-20 border-b border-border bg-bg/95 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <NavLink to="/" className="flex shrink-0 items-center gap-1.5 text-lg font-bold tracking-tight text-text">
            <img src="/codeloom-logo-mark.png" alt="" className="h-10 w-10 shrink-0 object-contain" />
            <span>Codeloom</span>
          </NavLink>
          <ul className="hidden items-center gap-1 sm:flex">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} end={link.end} className={topLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {/* Bottom tab bar: phone-width only, replaces the top link row for easier thumb reach. */}
      <nav className="bottom-tab-bar fixed inset-x-0 bottom-0 z-20 flex border-t border-border bg-bg/95 backdrop-blur sm:hidden">
        {links.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.end} className={bottomLinkClass}>
            {link.label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
