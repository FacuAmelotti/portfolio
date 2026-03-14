import { useEffect, useRef, useState } from "react"
import FolderNode from "../components/tech/FolderNode"
import TechModal from "../components/tech/TechModal"
import { techTree } from "../data/techTree"
import type { TechFile } from "../types/tech"
import "./styles/tech.css"

export default function Tech() {
  const [openFile, setOpenFile] = useState<TechFile | null>(null)
  const [openFolder, setOpenFolder] = useState<string | null>(null)
  const treeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = treeRef.current
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
  }, [])

  return (
    <section id="tech" className="tech-section">
      <h2 className="s-title">
        My Tech Stack
      </h2>

      <div
        ref={treeRef}
        className="tech-tree"
        data-count={techTree.length}
      >
        {techTree.map((folder, i) => (
          <FolderNode
            key={i}
            folder={folder}
            onOpenFile={setOpenFile}
            openFolder={openFolder}
            setOpenFolder={setOpenFolder}
            level={0}
          />
        ))}
      </div>

      <TechModal
        file={openFile}
        onClose={() => setOpenFile(null)}
      />
    </section>
  )
}