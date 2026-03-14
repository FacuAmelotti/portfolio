import { useEffect, useRef, useState } from "react"
import "./styles/about.css"

const BOOT_SEQUENCE = [
    { delay: 0, text: "INICIO DEL SISTEMA v2.4.1 .............. [OK]" },
    { delay: 80, text: "CARGANDO PERFIL DE USUARIO ............. [OK]" },
    { delay: 160, text: "INICIALIZANDO MÓDULOS .................. [OK]" },
    { delay: 240, text: "ESTABLECIENDO CONEXIÓN ................. [OK]" },
    { delay: 320, text: "SINCRONIZANDO ENTORNO .................. [OK]" },
    { delay: 400, text: "" },

    { delay: 450, text: "$ whoami" },
    { delay: 650, text: "> Facundo Amelotti — Software Developer" },
    { delay: 820, text: "> Backend Engineer · DevOps Practitioner · Game Developer" },
    { delay: 1000, text: "" },

    { delay: 1050, text: "$ cat about.txt" },
    { delay: 1250, text: "> Construyo software desde la arquitectura hasta el despliegue." },
    { delay: 1450, text: "> APIs escalables, sistemas bien diseñados y productos reales." },
    { delay: 1650, text: "> También creo mundos interactivos y sistemas de gameplay." },
    { delay: 1850, text: "" },

    { delay: 1900, text: "$ cat philosophy.txt" },
    { delay: 2100, text: "> El buen software no aparece por accidente." },
    { delay: 2300, text: "> Se diseña, se refactoriza, se prueba, y se vuelve a mejorar." },
    { delay: 2500, text: "> Creo en arquitectura clara, sistemas mantenibles," },
    { delay: 2700, text: "> y ciclos de feedback rápidos." },
    { delay: 2900, text: "" },

    { delay: 2950, text: "$ ls -la skills/" },
    { delay: 3150, text: "> drwxr backend_architecture/   java · spring · rest apis · seguridad" },
    { delay: 3350, text: "> drwxr devops_automation/      docker · ci/cd · pipelines · infra" },
    { delay: 3550, text: "> drwxr database_systems/       mysql · mongodb · data modeling" },
    { delay: 3750, text: "> drwxr frontend_interfaces/    react · vue · ui systems" },
    { delay: 3950, text: "> drwxr game_development/       unity · gameplay systems · rpg mechanics" },
    { delay: 4150, text: "" },

    { delay: 4200, text: "$ cat experience.log" },
    { delay: 4400, text: "> 8+ años programando" },
    { delay: 4600, text: "> 15+ proyectos desarrollados" },
    { delay: 4800, text: "> APIs, plataformas, juegos y herramientas." },
    { delay: 5000, text: "" },

    { delay: 5050, text: "$ cat current_focus.txt" },
    { delay: 5250, text: "> arquitectura backend profesional" },
    { delay: 5450, text: "> microservicios y sistemas distribuidos" },
    { delay: 5650, text: "> automatización y devops" },
    { delay: 5850, text: "> construcción de productos propios" },
    { delay: 6050, text: "" },

    { delay: 6100, text: "$ uptime" },
    { delay: 6300, text: "> Ubicación: Necochea, Buenos Aires, Argentina" },
    { delay: 6500, text: "> Modalidad: remoto / internacional" },
    { delay: 6700, text: "> Estado: construyendo cosas todos los días" },
    { delay: 6900, text: "" },

    { delay: 6950, text: "$ echo \"software is never finished\"" },
    { delay: 7150, text: "> only improved." },
    { delay: 7350, text: "" },

    { delay: 7400, text: "$ _" },

]

export default function About({ active }: { active: boolean }) {
const [isEntering, setIsEntering] = useState(false)
  const [lines, setLines] = useState<string[]>([])
  const [isGlitching, setIsGlitching] = useState(false)
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([])
  const termBodyRef = useRef<HTMLDivElement>(null)

  // Lógica de explosión de símbolos verdes
  const spawnSymbols = (x: number, y: number) => {
    const symbols = ["0", "1", "λ", "∫", "√", "µ", "∆", "§", "æ", "0xCF", ">>", "{", "}", "::"]
    const count = 12

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div")
      el.className = "bit-particle" // Asegúrate de tener esta clase en tu CSS
      el.innerText = symbols[Math.floor(Math.random() * symbols.length)]
      document.body.appendChild(el)

      const angle = Math.random() * Math.PI * 2
      const velocity = 3 + Math.random() * 7
      const vx = Math.cos(angle) * velocity
      const vy = Math.sin(angle) * velocity

      let posX = x
      let posY = y
      let opacity = 1
      let rotation = 0

      const animate = () => {
        posX += vx
        posY += vy
        opacity -= 0.02
        rotation += velocity

        el.style.position = "fixed"
        el.style.top = "0"
        el.style.left = "0"
        el.style.pointerEvents = "none"
        el.style.zIndex = "9999"
        el.style.color = "#00ff50"
        el.style.fontFamily = "monospace"
        el.style.textShadow = "0 0 8px rgba(0, 255, 80, 0.8)"
        el.style.transform = `translate(${posX}px, ${posY}px) rotate(${rotation}deg)`
        el.style.opacity = opacity.toString()

        if (opacity > 0) {
          requestAnimationFrame(animate)
        } else {
          el.remove()
        }
      }
      requestAnimationFrame(animate)
    }
  }

  const handleTerminalClick = (e: React.MouseEvent) => {
    spawnSymbols(e.clientX, e.clientY)
    setIsGlitching(true)
    setTimeout(() => setIsGlitching(false), 150)
  }

useEffect(() => {
  if (!active) return

  setIsEntering(true)
  const t = setTimeout(() => setIsEntering(false), 650)

  return () => clearTimeout(t)
}, [active])


useEffect(() => {
  if (!active) return

  timersRef.current.forEach(clearTimeout)
  timersRef.current = []
  setLines([])

  BOOT_SEQUENCE.forEach(({ delay, text }) => {
    const t = setTimeout(() => {
      setLines((prev) => [...prev, text])
    }, delay)
    timersRef.current.push(t)
  })

  return () => {
    timersRef.current.forEach(clearTimeout)
  }
}, [active])



  useEffect(() => {
    const el = termBodyRef.current
    if (!el) return

    el.scrollTo({
      top: el.scrollHeight,
      behavior: "smooth",
    })
  }, [lines])

    useEffect(() => {
      const el = termBodyRef.current
      if (!el) return

      const onWheel = (e: WheelEvent) => {
        e.preventDefault()
        e.stopPropagation()

        const maxScroll = el.scrollHeight - el.clientHeight
        if (maxScroll <= 0) return

        const next = el.scrollTop + e.deltaY
        el.scrollTop = Math.max(0, Math.min(maxScroll, next))
      }

      el.addEventListener("wheel", onWheel, { passive: false })

      return () => {
        el.removeEventListener("wheel", onWheel)
      }
    }, [])


  return (
    <section id="about" className="about-section" onMouseDown={handleTerminalClick}>
      <div className="about-bg" />
      <div className={`about-scanlines ${isEntering ? "about-scanlines-active" : ""}`} />

      <div className="about-vignette" />

      <div className="about-shell">
        <div
          className={`about-terminal ${isGlitching ? "glitch-active" : ""} ${
            isEntering ? "about-enter-active" : ""
          }`}
        >

          <div className="term-header">
            <div className="term-dots">
              <span className="term-dot dot-red" />
              <span className="term-dot dot-yellow" />
              <span className="term-dot dot-green" />
            </div>

            <span className="term-title">facu@portfolio:~/about</span>
            <span className="term-hint">system_active</span>
          </div>

          <div className="term-body no-page-nav" ref={termBodyRef} data-no-nav>

            <div className="term-lines">
              {lines.map((line, i) => (
                <div key={i} className="term-line">
                  {line === "" ? (
                    <span className="term-empty">&nbsp;</span>
                  ) : line.startsWith("$") ? (
                    <span className="term-cmd">
                      <span className="term-prompt">❯</span> {line.slice(2)}
                    </span>
                  ) : line.startsWith(">") ? (
                    <span className="term-output">{line.slice(2)}</span>
                  ) : (
                    <span className="term-system">{line}</span>
                  )}
                </div>
              ))}

              <div className="term-line">
                <span className="term-cursor-line">
                  <span className="term-prompt">❯</span>
                  <span className="term-blink-cursor" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}