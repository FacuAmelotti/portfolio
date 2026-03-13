interface NavProps {
  current: string
  sections: string[]
  onNavigate: (s: any) => void
}

export default function Nav({ current, sections, onNavigate }: NavProps) {
  return (
    <nav className="nav">
      <button className="nav-logo" onClick={() => onNavigate("hero")}>
        F4k4<span style={{ color: "var(--ink-ghost)" }}>_</span>dev
      </button>
      <ul className="nav-links">
        {sections.slice(1).map((s) => (
          <li key={s}>
            <button
              className={current === s ? "active" : ""}
              onClick={() => onNavigate(s)}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}