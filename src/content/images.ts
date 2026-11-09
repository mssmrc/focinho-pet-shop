/**
 * Imagens do site. A lista fica em images.json (fonte única), que também é lida por:
 *  - scripts/baixar-imagens.mjs  → baixa os placeholders do Unsplash para public/
 *  - public/images/PROMPTS-IA.md → prompts para gerar as versões definitivas por IA
 * Para trocar uma foto: substitua o arquivo em public/ mantendo o mesmo nome.
 * Se um arquivo não existir, o site mostra um espaço reservado no lugar (não quebra).
 */
import data from './images.json'

export type ImageKey = keyof typeof data

export const IMAGES = Object.fromEntries(
  Object.entries(data).map(([key, v]) => [key, { src: `/${v.file}`, alt: v.alt }]),
) as Record<ImageKey, { src: string; alt: string }>
