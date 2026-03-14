import { useEffect, useRef, useState } from "react"
import { songs } from "../data/songs"
import "./styles/music.css"

export default function Music({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const beatLevelRef = useRef(0)

  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  const currentSong = songs[currentSongIndex]

  useEffect(() => {
    if (!currentSong.audio) return

    let cancelled = false

    const setupAudio = async () => {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }

      if (sourceRef.current) {
        sourceRef.current.disconnect()
        sourceRef.current = null
      }

      const audio = new Audio(currentSong.audio)
      audio.preload = "auto"
      audio.crossOrigin = "anonymous"
      audioRef.current = audio

      audio.onended = () => {
        if (!cancelled) setIsPlaying(false)
      }

      try {
        if (!audioContextRef.current) {
          const AudioContextCtor =
            window.AudioContext ||
            (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext

          if (AudioContextCtor) {
            audioContextRef.current = new AudioContextCtor()
          }
        }

        const audioContext = audioContextRef.current
        if (audioContext) {
          const analyser = audioContext.createAnalyser()
          analyser.fftSize = 512
          analyser.smoothingTimeConstant = 0.72

          const source = audioContext.createMediaElementSource(audio)
          source.connect(analyser)
          analyser.connect(audioContext.destination)

          analyserRef.current = analyser
          sourceRef.current = source
          frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>
            //frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount) as Uint8Array<ArrayBuffer>
        }
      } catch {
        analyserRef.current = null
        sourceRef.current = null
        frequencyDataRef.current = null
      }

      if (isPlaying && !cancelled) {
        try {
          if (audioContextRef.current?.state === "suspended") {
            await audioContextRef.current.resume()
          }
          await audio.play()
          if (!cancelled) setIsPlaying(true)
        } catch {
          if (!cancelled) setIsPlaying(false)
        }
      }
    }

    setupAudio()

    return () => {
      cancelled = true
      if (audioRef.current) {
        audioRef.current.pause()
      }
      if (sourceRef.current) {
        sourceRef.current.disconnect()
        sourceRef.current = null
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect()
        analyserRef.current = null
      }
      frequencyDataRef.current = null
      beatLevelRef.current = 0
    }
  }, [currentSongIndex])

  useEffect(() => {
    if (!active) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
    }
  }, [active])

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
        setIsPlaying(false)
        return
      }

      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume()
      }

      await audioRef.current.play()
      setIsPlaying(true)
    } catch {
      setIsPlaying(false)
    }
  }

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

    const getBeatLevel = () => {
      const analyser = analyserRef.current
      const frequencyData = frequencyDataRef.current

      if (!analyser || !frequencyData || !isPlaying) {
        beatLevelRef.current *= 0.9
        return beatLevelRef.current
      }

      analyser.getByteFrequencyData(frequencyData)

      let bassSum = 0
      let midSum = 0

      const bassCount = Math.max(10, Math.floor(frequencyData.length * 0.12))
      const midStart = bassCount
      const midEnd = Math.max(midStart + 8, Math.floor(frequencyData.length * 0.35))

      for (let i = 0; i < bassCount; i++) {
        bassSum += frequencyData[i]
      }

      for (let i = midStart; i < midEnd; i++) {
        midSum += frequencyData[i]
      }

      const bassAvg = bassSum / bassCount
      const midAvg = midSum / Math.max(1, midEnd - midStart)

      const bassNorm = Math.min(1.4, bassAvg / 95)
      const midNorm = Math.min(1.2, midAvg / 130)

      const energy = bassNorm * 0.78 + midNorm * 0.22

      beatLevelRef.current = beatLevelRef.current * 0.72 + energy * 0.28
      return beatLevelRef.current
    }

    const draw = () => {
      time += 0.016
      ctx.clearRect(0, 0, w, h)

      const beat = getBeatLevel()

      // MÁS EXAGERADO
      const bgPulse = 1 + beat * 0.55
      const circlePulse = 1 + beat * 0.7 + Math.sin(time * 2.4) * 0.05

      const root = canvas.closest(".music-root") as HTMLElement | null
      if (root) {
        root.style.setProperty("--music-bg-scale", `${1.12 * bgPulse}`)
        root.style.setProperty("--music-bg-brightness", `${0.54 + beat * 0.7}`)
        root.style.setProperty("--music-bg-saturate", `${1 + beat * 1.1}`)
      }

      const cx = w / 2
      const cy = h / 2
      const radius = Math.min(w, h) * 0.38

     const outerRadius = (radius + 16) * (1 + beat * 0.28)
      const mainRadius = radius * circlePulse
      const innerRadius = radius * 0.68 * (1 + beat * 0.38)
      const innerRadius2 = radius * 0.46 * (1 + beat * 0.5)

      // glow central
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.05 * (1 + beat * 0.28))
      gradient.addColorStop(0, currentSong.glowInner ?? "rgba(255,180,60,0.12)")
      gradient.addColorStop(0.45, currentSong.glowMid ?? "rgba(255,120,20,0.05)")
      gradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.95 * (1 + beat * 0.26), 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      // aro exterior
      ctx.beginPath()
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + beat * 0.18})`
      ctx.lineWidth = 2 + beat * 1.8
      ctx.stroke()

      // aro principal
      ctx.beginPath()
      ctx.arc(cx, cy, mainRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,255,255,${0.2 + beat * 0.28})`
      ctx.lineWidth = 1.5 + beat * 2
      ctx.stroke()

      // aro punteado 1
      const dots = currentSong.dots ?? 96
      for (let i = 0; i < dots; i++) {
        const angle = (i / dots) * Math.PI * 2 + time * (currentSong.rotationSpeed ?? 0.15)
        const x = cx + Math.cos(angle) * innerRadius
        const y = cy + Math.sin(angle) * innerRadius

        ctx.beginPath()
        ctx.arc(x, y, (currentSong.dotSize ?? 2) * (1 + beat * 2.2), 0, Math.PI * 2)
        ctx.fillStyle = currentSong.dotColor ?? "rgba(255,255,255,0.65)"
        ctx.fill()
      }

      // aro punteado 2
      const dots2 = Math.floor((currentSong.dots ?? 96) * 0.5)
      for (let i = 0; i < dots2; i++) {
        const angle = (i / dots2) * Math.PI * 2 - time * ((currentSong.rotationSpeed ?? 0.15) * 1.7)
        const x = cx + Math.cos(angle) * innerRadius2
        const y = cy + Math.sin(angle) * innerRadius2

        ctx.beginPath()
        ctx.arc(x, y, (currentSong.dotSize ?? 2) * 0.8 * (1 + beat * 1.8), 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${0.38 + beat * 0.28})`
        ctx.fill()
      }

      // núcleo
      ctx.beginPath()
     ctx.arc(cx, cy, radius * 0.08 * (1 + beat * 1.5), 0, Math.PI * 2)  // era 0.75
      ctx.fillStyle = `rgba(255,255,255,${0.9 + beat * 0.1})`
      ctx.fill()

      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener("resize", resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [active, currentSong, isPlaying])

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length)
  }

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length)
  }

  return (
    <div
      className="music-root"
      style={
        {
          ["--music-bg-image" as any]: `url("${currentSong.cover}")`,
          ["--music-bg-scale" as any]: "1.12",
          ["--music-bg-brightness" as any]: "0.54",
          ["--music-bg-saturate" as any]: "1",
        } as React.CSSProperties
      }
    >
      <div className="music-bg" />
      <div className="music-vignette" />

      <div className="music-layout">
        <div className="music-canvas-wrapper">
          <canvas ref={canvasRef} className="music-canvas" />
        </div>

        <div className="music-content">
          <div className="music-info">
            <div className="music-label">FaK1NG</div>

            <h2 className="music-title">{currentSong.title}</h2>

            {currentSong.subtitle && (
              <div className="music-subtitle">{currentSong.subtitle}</div>
            )}

            <p className="music-desc">{currentSong.description}</p>

           <div className="music-bottom">
             <div className="music-controls">
               <button className="btn btn-ghost" onClick={handlePrev}></button>

               <button className="btn btn-primary" onClick={togglePlay}>
                 {isPlaying ? "⏸" : "▶"}
               </button>

               <button className="btn btn-ghost" onClick={handleNext}></button>
             </div>

             <div className="music-donate-wrap">
               <a
                 className="music-donate-btn"
                 href="https://link.mercadopago.com.ar/hornerito"
                 target="_blank"
                 rel="noreferrer"
               >
                 <span className="music-donate-icon">◎</span>
                 <span className="music-donate-text">Apoyar proyecto</span>
               </a>
             </div>

             <div className="music-meta">
               <span className="music-meta-current">
                 {String(currentSongIndex + 1).padStart(2, "0")}
               </span>
               <span className="music-meta-sep">/</span>
               <span className="music-meta-total">
                 {String(songs.length).padStart(2, "0")}
               </span>
             </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  )
}
