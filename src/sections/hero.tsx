import { useEffect, useMemo, useRef, useState } from "react"
import "./styles/hero.css"

type SymbolColumn = {
  id: number
  left: number
  delay: number
  duration: number
  size: number
  opacity: number
  length: number
}

const FULL = "Facundo\nAmelotti"

const GLYPHS =
  "01<>[]{}()/\\|+-=_#@$%&!?~^アイウエオカキクケコサシスセソナニヌネノΞΣΔΛΩЖЯ"

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

function buildInitialStream(length: number) {
  return Array.from({ length }, () => randomGlyph())
}

function shuffle<T>(arr: T[]) {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function createSpacedPositions(count: number, minGap = 7) {
  const slots: number[] = []
  let current = 3

  while (current <= 97) {
    slots.push(current)
    current += minGap
  }

  return shuffle(slots).slice(0, count)
}

function useSymbolColumns(count = 10) {
  return useMemo<SymbolColumn[]>(() => {
    const positions = createSpacedPositions(count, 8)

    return positions.map((left, i) => ({
      id: i,
      left,
      delay: Math.random() * -8,
      duration: 3.2 + Math.random() * 3.2, // más rápido
      size: 15 + Math.random() * 4, // más ancho/grande
      opacity: 0.12 + Math.random() * 0.16,
      length: 18 + Math.floor(Math.random() * 14),
    }))
  }, [count])
}

function useAnimatedSymbolStreams(columns: SymbolColumn[], active: boolean) {
  const [streams, setStreams] = useState<string[]>([])

  useEffect(() => {
    setStreams(columns.map((col) => buildInitialStream(col.length).join("\n")))
  }, [columns])

  useEffect(() => {
    if (!active || columns.length === 0) return

    const interval = window.setInterval(() => {
      setStreams((prev) =>
        prev.map((stream) => {
          const chars = stream.split("\n")
          const mutations = Math.max(1, Math.floor(chars.length * 0.16))

          for (let i = 0; i < mutations; i++) {
            const pos = Math.floor(Math.random() * chars.length)
            chars[pos] = randomGlyph()
          }

          if (Math.random() < 0.22) {
            chars.shift()
            chars.push(randomGlyph())
          }

          return chars.join("\n")
        })
      )
    }, 150)

    return () => clearInterval(interval)
  }, [active, columns])

  return streams
}

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const burstRef = useRef<(x: number, y: number) => void>(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let W = 0
    let H = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 1.6)

    interface P {
      x: number
      y: number
      vx: number
      vy: number
      r: number
      a: number
      life?: number
      square?: boolean
    }

    let particles: P[] = []
    let bursts: P[] = []

    const LINK_DIST = 110
    const LINK_DIST_SQ = LINK_DIST * LINK_DIST

    const resize = () => {
      W = window.innerWidth
      H = window.innerHeight

      canvas.width = Math.floor(W * dpr)
      canvas.height = Math.floor(H * dpr)
      canvas.style.width = `${W}px`
      canvas.style.height = `${H}px`

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      spawn()
    }

    const spawn = () => {
      const area = W * H
      const count = Math.max(18, Math.min(42, Math.floor(area / 32000)))

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        r: Math.random() * 1.2 + 0.45,
        a: Math.random() * 0.22 + 0.06,
      }))
    }

    burstRef.current = (x: number, y: number) => {
      for (let i = 0; i < 14; i++) {
        bursts.push({
          x,
          y,
          vx: (Math.random() - 0.5) * 6.4,
          vy: (Math.random() - 0.5) * 6.4,
          r: Math.random() * 1.8 + 0.8,
          a: 1,
          life: 1,
          square: true,
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = W
        else if (p.x > W) p.x = 0

        if (p.y < 0) p.y = H
        else if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,157,${p.a * 0.42})`
        ctx.fill()
      }

      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]
        b.x += b.vx
        b.y += b.vy
        b.vx *= 0.95
        b.vy *= 0.95
        b.life = (b.life ?? 0) - 0.03

        if ((b.life ?? 0) <= 0) {
          bursts.splice(i, 1)
          continue
        }

        ctx.fillStyle = `rgba(0,255,157,${b.life})`
        ctx.fillRect(b.x, b.y, b.r * 2, b.r * 2)
      }

      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i]

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j]
          const dx = p1.x - p2.x
          const dy = p1.y - p2.y
          const distSq = dx * dx + dy * dy

          if (distSq < LINK_DIST_SQ) {
            const alpha = (1 - distSq / LINK_DIST_SQ) * 0.03
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0,255,157,${alpha})`
            ctx.lineWidth = 0.5
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()

    let resizeTimeout = 0
    const onResize = () => {
      window.clearTimeout(resizeTimeout)
      resizeTimeout = window.setTimeout(resize, 90)
    }

    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      window.clearTimeout(resizeTimeout)
    }
  }, [canvasRef])

  return {
    triggerBurst: (x: number, y: number) => burstRef.current(x, y),
  }
}

function useTypewriter(active: boolean) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!active) {
      setDisplayed("")
      setDone(false)
      return
    }

    let i = 0
    setDisplayed("")
    setDone(false)

    const type = () => {
      i++
      setDisplayed(FULL.slice(0, i))

      if (i < FULL.length) {
        timeoutRef.current = setTimeout(type, 34 + (Math.random() - 0.5) * 12)
      } else {
        setDone(true)
      }
    }

    timeoutRef.current = setTimeout(type, 140)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [active])

  return { displayed, done }
}

export default function Hero({ active }: { active: boolean }) {
  const rootRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { displayed, done } = useTypewriter(active)
  const { triggerBurst } = useParticles(canvasRef)

  const symbolColumns = useSymbolColumns(10)
  const symbolStreams = useAnimatedSymbolStreams(symbolColumns, active)

  const [reveal, setReveal] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setReveal(true), 120)
      return () => clearTimeout(t)
    }
    setReveal(false)
  }, [done])

  useEffect(() => {
    const root = rootRef.current
    if (!root) return

    let raf = 0
    let time = 0

    const animateIdle = () => {
      time += 0.008
      root.style.setProperty("--drift-x", `${Math.sin(time) * 10}px`)
      root.style.setProperty("--drift-y", `${Math.cos(time * 0.8) * 8}px`)
      raf = requestAnimationFrame(animateIdle)
    }

    raf = requestAnimationFrame(animateIdle)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    const root = rootRef.current
    if (!root) return

    const rect = root.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    const px = (x / rect.width) * 100
    const py = (y / rect.height) * 100

    root.style.setProperty("--mx", `${px}%`)
    root.style.setProperty("--my", `${py}%`)

    const offsetX = ((x / rect.width) - 0.5) * 20
    const offsetY = ((y / rect.height) - 0.5) * 16

    root.style.setProperty("--parallax-x", `${offsetX}px`)
    root.style.setProperty("--parallax-y", `${offsetY}px`)
  }

  const handleSystemClick = (e: React.MouseEvent) => {
    const root = rootRef.current
    if (!root) return

    triggerBurst(e.clientX, e.clientY)

    const rect = root.getBoundingClientRect()
    root.style.setProperty("--click-x", `${e.clientX - rect.left}px`)
    root.style.setProperty("--click-y", `${e.clientY - rect.top}px`)

    setIsClicking(true)
    window.setTimeout(() => setIsClicking(false), 150)
  }

  const lines = displayed.split("\n")
  const firstLine = lines[0] ?? ""
  const secondLine = lines[1] ?? ""
  const onFirstLine = !displayed.includes("\n")

  return (
    <div
      ref={rootRef}
      className={`hero-root ${isClicking ? "system-click-flash" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseDown={handleSystemClick}
    >
      <div className="hero-bg-vignette" />
      <div className="hero-bg-grid" />
      <div className="hero-bg-glow" />
      <div className="hero-bg-noise" />

      <div className="hero-symbols-layer" aria-hidden="true">
        {symbolColumns.map((col, index) => (
          <span
            key={col.id}
            className="hero-symbol-column"
            style={
              {
                left: `${col.left}%`,
                animationDelay: `${col.delay}s`,
                animationDuration: `${col.duration}s`,
                fontSize: `${col.size}px`,
                opacity: col.opacity,
              } as React.CSSProperties
            }
          >
            {symbolStreams[index] ?? ""}
          </span>
        ))}
      </div>

      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      <div className="section-wrap hero-content-wrap">
        <div className="hero-content">
          <div className="hero-status">
            <span className="status-dot" />
            Online
          </div>

          <h1 className="hero-name">
            {firstLine}
            {onFirstLine && <span className="tw-caret" />}
            {displayed.includes("\n") && (
              <>
                <br />
                <span className="lime">
                  {secondLine}
                  {!done && <span className="tw-caret" />}
                  {done && <span className="tw-caret done" />}
                </span>
              </>
            )}
          </h1>


          <p className={`hero-role hero-reveal hero-reveal-1 ${reveal ? "visible" : ""}`}>
             &gt; Software Developer
          </p>

          <p className={`hero-desc hero-reveal hero-reveal-2 ${reveal ? "visible" : ""}`}>
            Ingeniería de sistemas escalables, observabilidad, automatización y despliegue
            de infraestructuras modernas.
          </p>
        </div>
      </div>
    </div>
  )
}