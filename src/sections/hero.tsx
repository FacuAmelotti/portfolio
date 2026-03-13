import { useEffect, useRef, useState } from "react"
import "./styles/hero.css"

function useParticles(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  // Referencia interna para disparar partículas desde fuera del loop principal
  const burstRef = useRef<(x: number, y: number) => void>(() => {})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf: number
    let W = 0, H = 0

    interface P { x:number; y:number; vx:number; vy:number; r:number; a:number; life?: number }
    let particles: P[] = []
    let bursts: P[] = [] // Partículas de click

    const resize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
      spawn()
    }

    const spawn = () => {
      const count = Math.floor((W * H) / 10000)
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        r: Math.random() * 1.2 + 0.4,
        a: Math.random() * 0.3 + 0.1,
      }))
    }

    // Función para crear la explosión de bits al clickear
    burstRef.current = (x: number, y: number) => {
      for (let i = 0; i < 15; i++) {
        bursts.push({
          x, y,
          vx: (Math.random() - 0.5) * 8,
          vy: (Math.random() - 0.5) * 8,
          r: Math.random() * 2 + 1,
          a: 1,
          life: 1 // Vida de la partícula (1 a 0)
        })
      }
    }

    const tick = () => {
      ctx.clearRect(0, 0, W, H)

      // 1. Partículas de fondo (Ambiente)
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 157, ${p.a * 0.5})` // Verde terminal sutil
        ctx.fill()
      }

      // 2. Partículas de ráfaga (Click)
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i]
        b.x += b.vx; b.y += b.vy
        b.vx *= 0.95; b.vy *= 0.95 // Fricción
        b.life! -= 0.02

        if (b.life! <= 0) {
          bursts.splice(i, 1)
          continue
        }

        ctx.fillStyle = `rgba(0, 255, 157, ${b.life})`
        ctx.fillRect(b.x, b.y, b.r * 2, b.r * 2) // Cuadrados para look "bit"
      }

      // 3. Conexiones
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d = Math.sqrt(dx*dx + dy*dy)
          if (d < 120) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 255, 157, ${(1 - d/120) * 0.05})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener("resize", resize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize) }
  }, [canvasRef])

  return { triggerBurst: burstRef.current }
}

const FULL = "Facundo\nAmelotti"

function useTypewriter(active: boolean) {
  const [displayed, setDisplayed] = useState("")
  const [done, setDone] = useState(false)
  const t = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!active) { setDisplayed(""); setDone(false); return }
    let i = 0
    setDisplayed(""); setDone(false)

    const type = () => {
      i++
      setDisplayed(FULL.slice(0, i))
      if (i < FULL.length) {
        t.current = setTimeout(type, 60 + (Math.random() - 0.5) * 30)
      } else {
        setDone(true)
      }
    }
    t.current = setTimeout(type, 350)
    return () => { if (t.current) clearTimeout(t.current) }
  }, [active])

  return { displayed, done }
}

export default function Hero({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { displayed, done } = useTypewriter(active)
  const [reveal, setReveal] = useState(false)
  const [isClicking, setIsClicking] = useState(false)

  const { triggerBurst } = useParticles(canvasRef)

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setReveal(true), 200)
      return () => clearTimeout(t)
    }
    setReveal(false)
  }, [done])

const handleSystemClick = (e: React.MouseEvent) => {
  // Disparamos las partículas que ya teníamos
  triggerBurst(e.clientX, e.clientY);

  // Guardamos las coordenadas en variables de CSS para el gradiente
  const root = e.currentTarget as HTMLElement;
  root.style.setProperty('--click-x', `${e.clientX}px`);
  root.style.setProperty('--click-y', `${e.clientY}px`);

  setIsClicking(true);

  // Reducimos el tiempo para que sea un feedback instantáneo y "snappy"
  setTimeout(() => setIsClicking(false), 150);
};

  const lines = displayed.split("\n")
  const firstLine = lines[0] ?? ""
  const secondLine = lines[1] ?? ""
  const onFirstLine = !displayed.includes("\n")

  return (
    <div
      className={`hero-root ${isClicking ? "system-click-flash" : ""}`}
      onMouseDown={handleSystemClick}
    >
      <canvas ref={canvasRef} className="hero-canvas" />

      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />


      <div className="section-wrap hero-content-wrap">
        <div className="hero-content">
          <div className="hero-status">
            <span className="status-dot" />
            System: Operational
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
                  {done  && <span className="tw-caret done" />}
                </span>
              </>
            )}
          </h1>

          <p className={`hero-role hero-reveal hero-reveal-1 ${reveal ? "visible" : ""}`}>
            &gt; Software Developer // Backend // DevOps
          </p>

          <p className={`hero-desc hero-reveal hero-reveal-2 ${reveal ? "visible" : ""}`}>
            Ingeniería de sistemas escalables y arquitectura de alto rendimiento.
            Expertise en automatización y despliegue de infraestructuras críticas.
          </p>

          <div className={`hero-actions hero-reveal hero-reveal-3 ${reveal ? "visible" : ""}`}>
            <button className="btn btn-primary">Initialize_Projects.sh</button>
            <button className="btn btn-ghost">Fetch_CV.pdf</button>
            <button className="btn btn-ghost">Establish_Contact</button>
          </div>
        </div>
      </div>
    </div>
  )
}