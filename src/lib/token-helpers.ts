import { decode, encode } from 'gpt-tokenizer'

export interface TokenSegment {
  id: number
  text: string
}

export const tokenize = (text: string): TokenSegment[] => {
  if (!text.trim()) {
    return []
  }

  const tokenIds = encode(text)
  return tokenIds.map((id) => ({
    id,
    text: decode([id]),
  }))
}

export const countTokens = (text: string): number => {
  if (!text) return 0
  return encode(text).length
}

export const getColorForIndex = (index: number) => {
  const goldenRatio = 0.618033988749895
  const hue = (index * goldenRatio * 360) % 360
  const saturation = 60 + ((index * 17) % 25)
  const lightness = 80 + ((index * 13) % 12)

  return {
    background: `hsl(${hue}, ${saturation}%, ${lightness}%)`,
    border: `hsl(${hue}, ${saturation}%, ${lightness - 20}%)`,
    text: `hsl(${hue}, ${saturation + 15}%, ${lightness - 60}%)`,
  }
}
