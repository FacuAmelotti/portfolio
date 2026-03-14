import type { MusicControlsProps } from "./music.types"

export default function MusicControls({
  isPlaying,
  onPlayPause,
  onPrev,
  onNext,
}: MusicControlsProps) {
  return (
    <div className="music-controls">
      <button className="btn btn-ghost" onClick={onPrev}>
        Prev
      </button>

      <button className="btn btn-primary" onClick={onPlayPause}>
        {isPlaying ? "Pause" : "Play"}
      </button>

      <button className="btn btn-ghost" onClick={onNext}>
        Next
      </button>
    </div>
  )
}

