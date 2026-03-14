
import { useEffect, useRef } from "react"
import type { MusicCanvasProps } from "./music.types"
import { hexToRgba } from "./music.utils"

export default function MusicCanvas({ active, accent = "#ffb43c" }: MusicCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let raf = 0
    let w = 0
    let h = 0
    let time = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = canvas.width = rect.width
      h = canvas.height = rect.height
    }

    const draw = () => {
      time += 0.01
      ctx.clearRect(0, 0, w, h)

      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.38
      const innerRadius = radius * 0.68

      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 0.95)
      glow.addColorStop(0, hexToRgba(accent, 0.16))
      glow.addColorStop(0.35, hexToRgba(accent, 0.07))
      glow.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.92, 0, Math.PI * 2)
      ctx.fillStyle = glow
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, radius + 16, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.05)"
      ctx.lineWidth = 2
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, radius, 0, Math.PI * 2)
      ctx.strokeStyle = "rgba(255,255,255,0.18)"
      ctx.lineWidth = 1.5
      ctx.stroke()

      const dots = 96
      for (let i = 0; i < dots; i++) {
        const angle = (i / dots) * Math.PI * 2 + time * 0.18
        const x = cx + Math.cos(angle) * innerRadius
        const y = cy + Math.sin(angle) * innerRadius

        ctx.beginPath()
        ctx.arc(x, y, 2, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255,255,255,0.68)"
        ctx.fill()
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [active, accent])

  return <canvas ref={canvasRef} className="musi
