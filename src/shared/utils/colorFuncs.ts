const hexToRgb = (hex: string) => {
  hex = hex.replace('#', '')

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

const getLuminance = ({ r, g, b }: { r: number; g: number; b: number }) => {
  const rsrgb = r / 255
  const gsrgb = g / 255
  const bsrgb = b / 255

  const rFinal =
    rsrgb <= 0.03928 ? rsrgb / 12.92 : Math.pow((rsrgb + 0.055) / 1.055, 2.4)
  const gFinal =
    gsrgb <= 0.03928 ? gsrgb / 12.92 : Math.pow((gsrgb + 0.055) / 1.055, 2.4)
  const bFinal =
    bsrgb <= 0.03928 ? bsrgb / 12.92 : Math.pow((bsrgb + 0.055) / 1.055, 2.4)

  return 0.2126 * rFinal + 0.7152 * gFinal + 0.0722 * bFinal
}

const isColorLight = (hex: string) => {
  const rgb = hexToRgb(hex)

  const luminance = getLuminance(rgb)

  return luminance > 0.5
}

export { getLuminance, hexToRgb, isColorLight }
