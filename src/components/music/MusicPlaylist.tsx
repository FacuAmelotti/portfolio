import type { MusicPlaylistProps } from "./music.types"
import { pad2 } from "./music.utils"

export default function MusicPlaylist({
  tracks,
  currentIndex,
  onSelect,
}: MusicPlaylistProps) {
  return (
    <div className="music-playlist">
      {tracks.map((track, index) => {
        const active = index === currentIndex

        return (
          <button
            key={track.id}
            className={`music-playlist-item ${active ? "active" : ""}`}
            onClick={() => onSelect(index)}
          >
            <span className="music-playlist-index">{pad2(index + 1)}</span>
            <span className="music-playlist-text">
              <span className="music-playlist-title">{track.title}</span>
              {track.subtitle && (
                <span className="music-playlist-subtitle">{track.subtitle}</span>
              )}
            </span>
          </button>
        )
      })}
    </div>
  )
}

