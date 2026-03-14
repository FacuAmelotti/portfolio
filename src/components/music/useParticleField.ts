
import { useMemo } from "react"

export function useParticleField() {
  const config = useMemo(() => {
    return {
      rings: 2,
      dots: 96,
      innerScale: 0.68,
    }
  }, [])

  return { config }
}
