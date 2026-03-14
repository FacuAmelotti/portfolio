export type MusicTrack = {
  id: string
  title: string
  subtitle?: string
  description: string
  cover: string
  audioSrc?: string
  accent?: string
}

export type MusicCanvasProps = {
  active: boolean
  accent?: string
}

export type MusicInfoProps = {
  label?: string
  title: string
  description: string
}

export type MusicControlsProps = {
  isPlaying: boolean
  onPlayPause: () => void
  onPrev: () => void
  onNext: () => void
}

export type MusicPlaylistProps = {
  tracks: MusicTrack[]
  currentIndex: number
  onSelect: (index: number) => void
}
