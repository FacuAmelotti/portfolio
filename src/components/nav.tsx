type Section = "hero" | "about" | "tech" | "projects" | "experience" | "music" | "contact"

interface NavProps {
  current: Section
  sections: Section[]
  onNavigate: (s: Section) => void
  transitioning: boolean
}



export default function Nav({ current, sections, onNavigate, transitioning }: NavProps) {
  return (
    <nav className={`nav ${transitioning ? "is-transitioning" : ""}`}>
      <button
        className="nav-logo"
        onClick={() => onNavigate("hero")}
        disabled={transitioning}
      >
        F4k4<span style={{ color: "var(--ink-ghost)" }}>_</span>dev
      </button>

      <ul className="nav-links">
        {sections.slice(1).map((s) => (
          <li key={s}>
            <button
              className={current === s ? "active" : ""}
              onClick={() => onNavigate(s)}
              disabled={transitioning}
            >
              {s}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
