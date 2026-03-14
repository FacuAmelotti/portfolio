
import { useState } from "react"

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false)

  const togglePlay = () => {
    setIsPlaying((prev) => !prev)
  }

  const stop = () => {
    setIsPlaying(false)
  }

  return {
    isPlaying,
    togglePlay,
    stop,
  }
}
