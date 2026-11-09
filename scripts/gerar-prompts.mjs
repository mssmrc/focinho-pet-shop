#!/usr/bin/env node
/**
 * Gera public/images/PROMPTS-IA.md a partir de src/content/images.json.
 * Uso: npm run images:prompts  (rode de novo sempre que mudar a lista de imagens)
 */
import { readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const images = JSON.parse(await readFile(join(ROOT, 'src/content/images.json'), 'utf8'))

const lines = [
  '# Prompts para gerar as imagens por IA',
  '',
  'As fotos atuais são placeholders do Unsplash. Para deixar o case com a cara do negócio,',
  'gere cada imagem com o prompt abaixo (Midjourney, DALL·E, Ideogram, Leonardo, Gemini…)',
  'e salve **com o mesmo nome e caminho**. Os prompts estão em inglês porque a maioria dos',
  'geradores responde melhor assim. Formato sugerido: `.jpg`, até 400 KB.',
  '',
]
for (const img of Object.values(images)) {
  lines.push(
    `## \`public/${img.file}\``,
    '',
    `Uso: ${img.alt} · proporção ${img.ratio}`,
    '',
    '```text',
    img.prompt,
    '```',
    '',
  )
}
await writeFile(join(ROOT, 'public/images/PROMPTS-IA.md'), lines.join('\n'))
console.log(`PROMPTS-IA.md gerado com ${Object.keys(images).length} imagens.`)
