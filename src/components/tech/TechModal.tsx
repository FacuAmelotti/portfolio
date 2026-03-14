import { useEffect, useRef } from "react"
import type { TechFile } from "../../types/tech"

type Props = {
  file: TechFile | null
  onClose: () => void
}

export default function TechModal({ file, onClose }: Props) {
  const bodyRef = useRef<HTMLPreElement>(null)

  useEffect(() => {
    if (!file) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [file, onClose])

  useEffect(() => {
    const el = bodyRef.current
    if (!el || !file) return

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

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
      lastY = startY
    }

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length !== 1) return

      const touch = e.touches[0]
      const currentY = touch.clientY
      const currentX = touch.clientX

      const deltaY = lastY - currentY
      const deltaX = currentX - startX

      if (Math.abs(deltaY) >= Math.abs(deltaX)) {
        e.preventDefault()
        e.stopPropagation()

        const maxScroll = el.scrollHeight - el.clientHeight
        if (maxScroll <= 0) {
          lastY = currentY
          return
        }

        const next = el.scrollTop + deltaY
        el.scrollTop = Math.max(0, Math.min(maxScroll, next))
      }

      lastY = currentY
    }

    const onTouchEnd = () => {
      startY = 0
      startX = 0
      lastY = 0
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
  }, [file])

  useEffect(() => {
    if (!file) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [file])

  if (!file) return null

  return (
    <div
      className="tech-modal-overlay"
      onMouseDown={onClose}
    >
      <div
        className="tech-modal"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="tech-modal-header">
          <span className="tech-modal-title">{file.name}</span>

          <button
            type="button"
            className="tech-modal-close"
            onClick={onClose}
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        <pre ref={bodyRef} className="tech-modal-body">
          {file.content}
        </pre>
      </div>
    </div>
  )
}