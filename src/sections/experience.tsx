import { useEffect, useRef } from "react"
import experience from "../data/experience"
import "./styles/experience.css"

export default function Experience() {
  const windowRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const windowEl = windowRef.current
    const scrollEl = bodyRef.current
    if (!windowEl || !scrollEl) return

    let startY = 0
    let startX = 0
    let lastY = 0
    let isVerticalGesture: boolean | null = null

    const canScroll = () => scrollEl.scrollHeight > scrollEl.clientHeight + 1

    const scrollByDelta = (deltaY: number) => {
      if (!canScroll()) return

      const maxScroll = scrollEl.scrollHeight - scrollEl.clientHeight
      const next = scrollEl.scrollTop + deltaY
      scrollEl.scrollTop = Math.max(0, Math.min(maxScroll, next))
    }

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()
      scrollByDelta(e.deltaY)
    }

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return

      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      lastY = startY
      isVerticalGesture = null

      e.stopPropagation()
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return

      const touch = e.touches[0]
      const currentY = touch.clientY
      const currentX = touch.clientX

      const totalDeltaY = startY - currentY
      const totalDeltaX = startX - currentX
      const stepDeltaY = lastY - currentY

      if (isVerticalGesture === null) {
        isVerticalGesture = Math.abs(totalDeltaY) > Math.abs(totalDeltaX)
      }

      if (!isVerticalGesture) return

      e.preventDefault()
      e.stopPropagation()

      scrollByDelta(stepDeltaY)
      lastY = currentY
    }

    const onTouchEnd = (e: TouchEvent) => {
      e.stopPropagation()
      startY = 0
      startX = 0
      lastY = 0
      isVerticalGesture = null
    }

    windowEl.addEventListener("wheel", onWheel, { passive: false })
    windowEl.addEventListener("touchstart", onTouchStart, { passive: true })
    windowEl.addEventListener("touchmove", onTouchMove, { passive: false })
    windowEl.addEventListener("touchend", onTouchEnd, { passive: true })
    windowEl.addEventListener("touchcancel", onTouchEnd, { passive: true })

    return () => {
      windowEl.removeEventListener("wheel", onWheel)
      windowEl.removeEventListener("touchstart", onTouchStart)
      windowEl.removeEventListener("touchmove", onTouchMove)
      windowEl.removeEventListener("touchend", onTouchEnd)
      windowEl.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [])

  return (
    <section id="experience" className="experience-section">
      <div className="experience-shell">
        <div className="experience-terminal" ref={windowRef} data-no-nav>
          <div className="experience-header">
            <div className="experience-header-icon">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <rect x="1" y="1" width="4" height="4" fill="#fff" opacity=".9" />
                <rect x="7" y="1" width="4" height="4" fill="#fff" opacity=".9" />
                <rect x="1" y="7" width="4" height="4" fill="#fff" opacity=".9" />
                <rect x="7" y="7" width="4" height="4" fill="#fff" opacity=".9" />
              </svg>
            </div>

            <span className="experience-titlebar">
              C:\Users\Facu\Portfolio\Experience
            </span>

            <div className="experience-dots">
              <span className="experience-dot dot-green" title="Minimizar">_</span>
              <span className="experience-dot dot-yellow" title="Maximizar">☐</span>
              <span className="experience-dot dot-red" title="Cerrar">✕</span>
            </div>
          </div>

          <nav className="experience-menubar">
            {["File", "Edit", "View", "Favorites", "Tools", "Help"].map((item) => (
              <span key={item} className="experience-menu-item">{item}</span>
            ))}
          </nav>

          <div className="experience-body-split">
            <aside className="experience-panel">
              <div className="experience-panel-section">
                <div className="experience-panel-header">
                  <span>Recent folders</span>
                  <span className="experience-panel-arrow">▲</span>
                </div>

                <div className="experience-panel-body">
                  <a className="experience-panel-link experience-panel-link--active">💼 Experience</a>
                  <a className="experience-panel-link">🔧 Tech Stack</a>
                  <a className="experience-panel-link">🚀 Projects</a>
                  <a className="experience-panel-link">🎵 Music</a>
                  <a className="experience-panel-link">👤 About</a>
                  <a className="experience-panel-link">✉️ Contact</a>
                </div>
              </div>

              <div className="experience-panel-section">
                <div className="experience-panel-header">
                  <span>Details</span>
                  <span className="experience-panel-arrow">▲</span>
                </div>

                <div className="experience-panel-details">
                  <p className="experience-panel-details-title">Experience</p>

                  <div className="experience-panel-details-row">
                    <span>Items:</span>
                    <strong>{experience.length} roles</strong>
                  </div>
                </div>
              </div>
            </aside>

            <div className="experience-content-area">
              <div className="experience-banner">
                <div className="experience-folder-icon" aria-hidden="true" />

                <div>
                  <div className="experience-kicker">CAREER_PATH</div>
                  <h2 className="experience-title">Experiencia profesional</h2>
                  <p className="experience-subtitle">
                    Roles, proyectos y enfoque tecnico en desplieges, desarrollos, infraestructuras y tutorias.
                  </p>
                </div>
              </div>

              <div className="experience-body" ref={bodyRef} data-no-nav>
                <div className="experience-list">
                  {experience.map((job, index) => (
                    <article
                      key={`${job.company}-${job.role}-${job.year}`}
                      className={`experience-card${index === 0 ? " experience-card" : ""}`}
                    >
                      <div className={`experience-card-icon experience-card-icon--${getIconVariant(index)}`}>
                        {getRoleIcon(index)}
                      </div>

                      <div className="experience-card-body">
                        <div className="experience-card-top">
                          <div className="experience-meta">
                            <span className="experience-year">{job.year}</span>
                            <span className="experience-separator" />
                            <span className="experience-role">{job.role}</span>
                          </div>

                          <div className="experience-company-wrap">
                            <span className="experience-index">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="experience-company">{job.company}</h3>
                          </div>
                        </div>

                        <ul className="experience-tasks">
                          {job.tasks.map((task) => (
                            <li key={task} className="experience-task">
                              <span className="experience-bullet">◆</span>
                              <span>{task}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="experience-statusbar">
            <span className="experience-status-pane">
              {experience.length} object(s)
            </span>

            <span className="experience-status-grip" aria-hidden="true">◢</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function getIconVariant(index: number): string {
  const variants = ["dev", "teach", "infra", "net"]
  return variants[index % variants.length]
}

function getRoleIcon(index: number): string {
  const icons = ["💻", "📚", "🖥️", "🌐"]
  return icons[index % icons.length]
}
