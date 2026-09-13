interface PythonMarkProps {
  className?: string
}

/** A two-snake mark evoking Python, drawn in the site's own teal/amber palette. */
export default function PythonMark({ className }: PythonMarkProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M6 5.5C4 5.5 4 9 6.5 9H13c2.5 0 2.5 3.5 0 3.5"
        stroke="var(--color-teal)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="7" cy="6" r="1" fill="var(--color-teal)" />
      <path
        d="M18 18.5C20 18.5 20 15 17.5 15H11c-2.5 0-2.5-3.5 0-3.5"
        stroke="var(--color-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="17" cy="18" r="1" fill="var(--color-accent)" />
    </svg>
  )
}
