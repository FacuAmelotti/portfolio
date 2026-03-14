import { useEffect, useRef } from "react"
import projects from "../data/projects"
import "./styles/projects.css"

export default function Projects() {
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cardsRef.current
    if (!el) return

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      e.stopPropagation()

      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) return

      const next = el.scrollTop + e.deltaY
      el.scrollTop = Math.max(0, Math.min(maxScroll, next))
    }

    let startY = 0
    let startX = 0
    let lastY = 0
    let isVerticalGesture: boolean | null = null

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

      const maxScroll = el.scrollHeight - el.clientHeight
      if (maxScroll <= 0) {
        lastY = currentY
        return
      }

      const next = el.scrollTop + stepDeltaY
      el.scrollTop = Math.max(0, Math.min(maxScroll, next))
      lastY = currentY
    }

const onTouchEnd = (e: TouchEvent) => {
  e.stopPropagation()
  startY = 0
  startX = 0
  lastY = 0
  isVerticalGesture = null
}


    el.addEventListener("wheel", onWheel, { passive: false })
    el.addEventListener("touchstart", onTouchStart, { passive: true })
    el.addEventListener("touchmove", onTouchMove, { passive: false })
    el.addEventListener("touchend", onTouchEnd, { passive: true })
    el.addEventListener("touchcancel", onTouchEnd, { passive: true })

    return () => {
      el.removeEventListener("wheel", onWheel)
      el.removeEventListener("touchstart", onTouchStart)
      el.removeEventListener("touchmove", onTouchMove)
      el.removeEventListener("touchend", onTouchEnd)
      el.removeEventListener("touchcancel", onTouchEnd)
    }
  }, [])

  return (
    <section id="projects" className="projects-section">
      <div className="projects-wrap">
        <div className="projects-header">
          <span className="projects-label">/ own_projects</span>
          <h2 className="projects-title">Own Projects</h2>
        </div>

        <div ref={cardsRef} className="cards-container" data-no-nav>
          {projects.map((project, index) => (
            <article className="project-card" key={project.title}>
              <div className="card-glow" />

              <div className="card-content">
                <div className="card-top">
                  <span className="project-status">READY</span>
                  <span className="card-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="project-title">{project.title}</h3>

                <p className="project-desc">{project.description}</p>

                <div className="tech-stack">
                  {project.tech.map((tech) => (
                    <span className="tech-badge" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
