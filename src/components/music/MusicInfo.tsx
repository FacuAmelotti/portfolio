
import type { MusicInfoProps } from "./music.types"

export default function MusicInfo({
  label = "Music Laboratory",
  title,
  description,
}: MusicInfoProps) {
  return (
    <div className="music-info">
      <div className="music-label">{label}</div>
      <h2 className="music-title">{title}</h2>
      <p className="music-desc">{description}</p>
    </div>
  )
}
