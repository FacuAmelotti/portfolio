import { useEffect, useMemo, useRef, useState } from "react"
import { songs } from "../data/songs"
import "./styles/music.css"

type SongCategory = "favorites" | "others" | "beats" | "nostalgias"

type SongItem = {
  title: string
  subtitle?: string
  description: string
  cover: string
  audio?: string
  glowInner?: string
  glowMid?: string
  dots?: number
  dotSize?: number
  dotColor?: string
  rotationSpeed?: number
  category?: SongCategory
}

export default function Music({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const audioContextRef = useRef<AudioContext | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const sourceRef = useRef<MediaElementAudioSourceNode | null>(null)
  const frequencyDataRef = useRef<Uint8Array<ArrayBuffer> | null>(null)
  const beatLevelRef = useRef(0)

  const allSongs = songs as SongItem[]

  const favoriteSongs = useMemo(
    () => allSongs.filter((song) => (song.category ?? "favorites") === "favorites"),
    [allSongs]
  )

  const otherSongs = useMemo(
    () => allSongs.filter((song) => song.category === "others"),
    [allSongs]
  )

  const beatSongs = useMemo(
    () => allSongs.filter((song) => song.category === "beats"),
    [allSongs]
  )

  const nostalgiaSongs = useMemo(
    () => allSongs.filter((song) => song.category === "nostalgias"),
    [allSongs]
  )

  const playableSongs = useMemo(
    () =>
      allSongs.filter((song) => {
        const category = song.category ?? "favorites"
        return category === "favorites" || category === "others"
      }),
    [allSongs]
  )

  const initialSong = playableSongs[0] ?? allSongs[0]

  const [currentSong, setCurrentSong] = useState<SongItem>(initialSong)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLibraryOpen, setIsLibraryOpen] = useState(false)

  const currentSongIndexInAll = useMemo(
    () => allSongs.findIndex((song) => song === currentSong),
    [allSongs, currentSong]
  )

  const currentPlayableIndex = useMemo(
    () => playableSongs.findIndex((song) => song === currentSong),
    [playableSongs, currentSong]
  )

  const isCurrentSongPlayable = currentPlayableIndex !== -1

  useEffect(() => {
    document.body.classList.add("music-page")
    return () => {
      document.body.classList.remove("music-page")
    }
  }, [])

  useEffect(() => {
    if (!currentSong?.audio) return

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
  }, [currentSong, isPlaying])

  useEffect(() => {
    if (!active) {
      if (audioRef.current) {
        audioRef.current.pause()
      }
      setIsPlaying(false)
    }
  }, [active])

  useEffect(() => {
    if (!isLibraryOpen) return

    const previousOverflow = document.body.style.overflow
    const previousTouchAction = document.body.style.touchAction

    document.body.style.overflow = "hidden"
    document.body.style.touchAction = "none"

    return () => {
      document.body.style.overflow = previousOverflow
      document.body.style.touchAction = previousTouchAction
    }
  }, [isLibraryOpen])

  useEffect(() => {
    if (!isLibraryOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsLibraryOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLibraryOpen])

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

      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius * 1.05 * (1 + beat * 0.28))
      gradient.addColorStop(0, currentSong.glowInner ?? "rgba(255,180,60,0.12)")
      gradient.addColorStop(0.45, currentSong.glowMid ?? "rgba(255,120,20,0.05)")
      gradient.addColorStop(1, "rgba(0,0,0,0)")

      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.95 * (1 + beat * 0.26), 0, Math.PI * 2)
      ctx.fillStyle = gradient
      ctx.fill()

      ctx.beginPath()
      ctx.arc(cx, cy, outerRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,255,255,${0.08 + beat * 0.18})`
      ctx.lineWidth = 2 + beat * 1.8
      ctx.stroke()

      ctx.beginPath()
      ctx.arc(cx, cy, mainRadius, 0, Math.PI * 2)
      ctx.strokeStyle = `rgba(255,255,255,${0.2 + beat * 0.28})`
      ctx.lineWidth = 1.5 + beat * 2
      ctx.stroke()

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

      ctx.beginPath()
      ctx.arc(cx, cy, radius * 0.08 * (1 + beat * 1.5), 0, Math.PI * 2)
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
    if (!playableSongs.length) return

    if (!isCurrentSongPlayable) {
      setCurrentSong(playableSongs[0])
      return
    }

    setCurrentSong(playableSongs[(currentPlayableIndex + 1) % playableSongs.length])
  }

  const handlePrev = () => {
    if (!playableSongs.length) return

    if (!isCurrentSongPlayable) {
      setCurrentSong(playableSongs[playableSongs.length - 1])
      return
    }

    setCurrentSong(
      playableSongs[(currentPlayableIndex - 1 + playableSongs.length) % playableSongs.length]
    )
  }

  const handleSelectSong = (song: SongItem) => {
    setCurrentSong(song)
    setIsLibraryOpen(false)
  }

  const renderSongSection = (
    title: string,
    items: SongItem[],
    categoryClassName: string
  ) => {
    if (!items.length) return null

    return (
      <div className={`music-library-section ${categoryClassName}`}>
        <div className="music-library-section-header">
          <h4 className="music-library-section-title">{title}</h4>
          <span className="music-library-section-count">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>

        <div className="music-library-list">
          {items.map((song) => {
            const songIndex = allSongs.findIndex((item) => item === song)
            const isActive = song === currentSong

            return (
              <button
                key={`${song.title}-${songIndex}`}
                type="button"
                className={`music-song-card ${isActive ? "active" : ""}`}
                onClick={() => handleSelectSong(song)}
              >
                <div className="music-song-card-cover">
                  <img src={song.cover} alt={song.title} />
                </div>

                <div className="music-song-card-info">
                  <div className="music-song-card-title">{song.title}</div>
                  <div className="music-song-card-genre">
                    {song.subtitle ?? title}
                  </div>
                </div>

                <div className="music-song-card-index">
                  {String(songIndex + 1).padStart(2, "0")}
                </div>
              </button>
            )
          })}
        </div>
      </div>
    )
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
        <button
          className="music-library-trigger"
          onClick={() => setIsLibraryOpen(true)}
          aria-label="Abrir tracklist"
          type="button"
        >
          <img
            src="/icons/headphones.png"
            alt=""
            className="music-library-trigger-icon"
          />
        </button>

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
                <button
                  className="btn btn-ghost"
                  onClick={handlePrev}
                  aria-label="Canción anterior"
                  type="button"
                />

                <button
                  className={`btn btn-primary ${isPlaying ? "playing" : ""}`}
                  onClick={togglePlay}
                  aria-label={isPlaying ? "Pausar canción" : "Reproducir canción"}
                  type="button"
                >
                  {isPlaying ? "⏸" : "▶"}
                </button>

                <button
                  className="btn btn-ghost"
                  onClick={handleNext}
                  aria-label="Siguiente canción"
                  type="button"
                />
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
                {isCurrentSongPlayable ? (
                  <>
                    <span className="music-meta-current">
                      {String(currentPlayableIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="music-meta-sep">/</span>
                    <span className="music-meta-total">
                      {String(playableSongs.length).padStart(2, "0")}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="music-meta-current">
                      {String(currentSongIndexInAll + 1).padStart(2, "0")}
                    </span>
                    <span className="music-meta-sep">•</span>
                    <span className="music-meta-total">
                      {(currentSong.category ?? "favorites").toUpperCase()}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {isLibraryOpen && (
        <div
          className="music-library-overlay"
          onClick={() => setIsLibraryOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby="music-library-title"
        >
          <div
            className="music-library-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="music-library-header">
              <div>
                <h3 id="music-library-title" className="music-library-title">
                  Tracklist
                </h3>
              </div>

              <button
                className="music-library-close"
                onClick={() => setIsLibraryOpen(false)}
                aria-label="Cerrar tracklist"
                type="button"
              >
                ✕
              </button>
            </div>

            <div
              className="music-library-grid"
              onWheel={(e) => e.stopPropagation()}
              onTouchMove={(e) => e.stopPropagation()}
            >
              {renderSongSection("Favoritas", favoriteSongs, "favorites")}
              {renderSongSection("Otras", otherSongs, "others")}
              {renderSongSection("Beats", beatSongs, "beats")}
              {renderSongSection("Nostalgias", nostalgiaSongs, "nostalgias")}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}