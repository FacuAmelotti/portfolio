export function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export function pad2(value: number) {
  return String(value).padStart(2, "0")
}

export function hexToRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "")
  const normalized =
    clean.length === 3
      ? clean.split("").map((c) => c + c).join("")
      : clean

  const num = parseInt(normalized, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255

  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
