import { useState, useEffect, useCallback } from "react"
import Hero from "./sections/hero"
import About from "./sections/about"
import Tech from "./sections/tech"
import Projects from "./sections/projects"
import Experience from "./sections/experience"
import Contact from "./sections/contact"
import Music from "./sections/music"
import Nav from "./components/nav"
import "./styles/globals.css"
import "./styles/app.css"

const SECTIONS = ["hero", "about", "tech", "projects", "experience","music", "contact"] as const
type Section = (typeof SECTIONS)[number]

const SECTION_COMPONENTS: Record<Section, React.ComponentType<{ active: boolean }>> = {
  hero: Hero,
  about: About,
  tech: Tech,
  projects: Projects,
  experience: Experience,
  music: Music,
  contact: Contact,
}

export default function App() {
  const [current, setCurrent] = useState<Section>("hero")
  const [prev, setPrev] = useState<Section | null>(null)
  const [direction, setDirection] = useState<"up" | "down">("down")
  const [transitioning, setTransitioning] = useState(false)

  const goTo = useCallback(
    (target: Section) => {
      if (target === current || transitioning) return
      const fromIdx = SECTIONS.indexOf(current)
      const toIdx = SECTIONS.indexOf(target)
      setDirection(toIdx > fromIdx ? "down" : "up")
      setPrev(current)
      setTransitioning(true)
      setCurrent(target)
      setTimeout(() => {
        setPrev(null)
        setTransitioning(false)
      }, 700)
    },
    [current, transitioning]
  )

  const goNext = useCallback(() => {
    const idx = SECTIONS.indexOf(current)
    if (idx < SECTIONS.length - 1) goTo(SECTIONS[idx + 1])
  }, [current, goTo])

  const goPrev = useCallback(() => {
    const idx = SECTIONS.indexOf(current)
    if (idx > 0) goTo(SECTIONS[idx - 1])
  }, [current, goTo])

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") goNext()
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") goPrev()
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [goNext, goPrev])

  // Wheel navigation with debounce
  useEffect(() => {
    let lastWheel = 0

    const handler = (e: WheelEvent) => {
      if (transitioning) return

      // Si el evento ocurre dentro de algo interactivo o con scroll interno, no navegar
      if (shouldBlockPageNavigation(e.target) || isScrollableElement(e.target)) {
        return
      }

      const now = Date.now()
      if (now - lastWheel < 900) return

      if (e.deltaY > 30) {
        lastWheel = now
        goNext()
      } else if (e.deltaY < -30) {
        lastWheel = now
        goPrev()
      }
    }

    window.addEventListener("wheel", handler, { passive: true })
    return () => window.removeEventListener("wheel", handler)
  }, [goNext, goPrev, transitioning])


  // Touch swipe
  useEffect(() => {
    let startY = 0
    let startX = 0
    let blocked = false

    const onStart = (e: TouchEvent) => {
      const targetBlocked =
        shouldBlockPageNavigation(e.target) || isScrollableElement(e.target)

      blocked = targetBlocked
      startY = e.touches[0].clientY
      startX = e.touches[0].clientX
    }

    const onEnd = (e: TouchEvent) => {
      if (transitioning || blocked) {
        blocked = false
        return
      }

      const endY = e.changedTouches[0].clientY
      const endX = e.changedTouches[0].clientX

      const diffY = startY - endY
      const diffX = startX - endX

      if (Math.abs(diffY) < Math.abs(diffX)) {
        blocked = false
        return
      }

      if (Math.abs(diffY) > 60) {
        diffY > 0 ? goNext() : goPrev()
      }

      blocked = false
    }

    window.addEventListener("touchstart", onStart, { passive: true })
    window.addEventListener("touchend", onEnd, { passive: true })

    return () => {
      window.removeEventListener("touchstart", onStart)
      window.removeEventListener("touchend", onEnd)
    }
  }, [goNext, goPrev, transitioning])


const BLOCK_NAV_SELECTOR = `
  [data-no-nav],
  .no-page-nav,
  input,
  textarea,
  select,
  button,
  a,
  [role="button"],
  [contenteditable="true"]
`

function getTargetElement(target: EventTarget | null): Element | null {
  if (!target) return null

  if (target instanceof Element) return target

  if (target instanceof Node) {
    return target.parentElement
  }

  return null
}

function shouldBlockPageNavigation(target: EventTarget | null) {
  const el = getTargetElement(target)
  if (!el) return false
  return !!el.closest(BLOCK_NAV_SELECTOR)
}

function isScrollableElement(target: EventTarget | null) {
  let el = getTargetElement(target)

  while (el) {
    if (el instanceof HTMLElement) {
      const style = window.getComputedStyle(el)
      const overflowY = style.overflowY
      const canScroll =
        (overflowY === "auto" || overflowY === "scroll") &&
        el.scrollHeight > el.clientHeight

      if (canScroll) return true
    }

    el = el.parentElement
  }

  return false
}

  return (
    <div className="app">
      <Nav
        current={current}
        sections={[...SECTIONS]}
        onNavigate={goTo}
        transitioning={transitioning}
      />


      {/* Dot navigator */}
<aside className={`dot-nav ${transitioning ? "is-transitioning" : ""}`}>
  {SECTIONS.map((s) => (
    <button
      key={s}
      className={`dot ${s === current ? "active" : ""}`}
      onClick={() => goTo(s)}
      aria-label={s}
      disabled={transitioning}
    />
  ))}
</aside>


      {/* Section progress bar */}
<div className={`progress-bar progress-${current}`}>
  <div
    className="progress-fill"
    style={{
      width: `${((SECTIONS.indexOf(current) + 1) / SECTIONS.length) * 100}%`,
    }}
  />
</div>


      {/* Section counter */}
      <div className="section-counter">
        <span className="counter-current">
          {String(SECTIONS.indexOf(current) + 1).padStart(2, "0")}
        </span>
        <span className="counter-sep">/</span>
        <span className="counter-total">{String(SECTIONS.length).padStart(2, "0")}</span>
      </div>

      {/* Canvas */}
      <main className="stage">
        {SECTIONS.map((s) => {
          const Component = SECTION_COMPONENTS[s]
          const isActive = s === current
          const isPrev = s === prev
          let cls = "slide"
          if (isActive) cls += direction === "down" ? " enter-down" : " enter-up"
          if (isPrev) cls += direction === "down" ? " exit-up" : " exit-down"
          if (!isActive && !isPrev) cls += " hidden"
          return (
            <div key={s} className={cls}>
              <Component active={isActive} />
            </div>
          )
        })}
      </main>

      {/* Arrow hints */}
     <div className={`nav-arrows ${transitioning ? "is-transitioning" : ""}`}>
       <button
         className={`arrow-btn ${SECTIONS.indexOf(current) === 0 ? "disabled" : ""}`}
         onClick={goPrev}
         aria-label="Previous"
         disabled={transitioning || SECTIONS.indexOf(current) === 0}
       >
        🢁
       </button>

       <button
         className={`arrow-btn ${SECTIONS.indexOf(current) === SECTIONS.length - 1 ? "disabled" : ""}`}
         onClick={goNext}
         aria-label="Next"
         disabled={transitioning || SECTIONS.indexOf(current) === SECTIONS.length - 1}
       >
         🢃
       </button>
     </div>

    </div>
  )
}