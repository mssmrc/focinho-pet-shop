#!/usr/bin/env node
/**
 * Baixa as fotos PLACEHOLDER do Unsplash (licença gratuita) para public/images/.
 *
 * Uso:  npm run images:baixar            (não sobrescreve o que já existe)
 *       npm run images:baixar -- --forcar
 *
 * A lista de fotos fica em src/content/images.json. Cada imagem tem uma ou mais opções do
 * Unsplash: o script tenta na ordem e usa a primeira que baixar. Se nenhuma funcionar,
 * o site mostra um espaço reservado no lugar — nada quebra.
 * Para as versões definitivas, gere as imagens com os prompts de public/images/PROMPTS-IA.md
 * e salve por cima, com o mesmo nome. Rode no seu computador (precisa de internet).
 */
import { access, mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FORCE = process.argv.includes('--forcar')
const WIDTH = 1600
const HEADERS = { 'User-Agent': 'site-demonstrativo/1.0 (download de placeholders)' }

const images = JSON.parse(await readFile(join(ROOT, 'src/content/images.json'), 'utf8'))
const exists = (p) =>
  access(p).then(
    () => true,
    () => false,
  )

/** O link de download do Unsplash redireciona para a foto; pedimos uma versão menor. */
async function fetchUnsplash(id) {
  const first = await fetch(`https://unsplash.com/photos/${id}/download?force=true`, {
    headers: HEADERS,
    redirect: 'manual',
  })
  const location = first.headers.get('location')
  if (!location) throw new Error(`HTTP ${first.status} (foto indisponível ou Unsplash+)`)
  const url = new URL(location)
  url.searchParams.set('w', String(WIDTH))
  url.searchParams.set('q', '80')
  url.searchParams.set('fm', 'jpg')
  url.searchParams.set('fit', 'max')
  const res = await fetch(url, { headers: HEADERS })
  const type = res.headers.get('content-type') ?? ''
  if (!res.ok || !type.startsWith('image/')) throw new Error(`HTTP ${res.status} (${type || 'sem tipo'})`)
  const buf = Buffer.from(await res.arrayBuffer())
  if (buf.length > 5 * 1024 * 1024) throw new Error('arquivo maior que 5 MB')
  return buf
}

let ok = 0
let skipped = 0
let failed = 0
for (const [key, img] of Object.entries(images)) {
  const out = join(ROOT, 'public', img.file)
  if (!FORCE && (await exists(out))) {
    console.log(`= já existe: public/${img.file}`)
    skipped++
    continue
  }
  let done = false
  for (const id of img.unsplash) {
    try {
      const buf = await fetchUnsplash(id)
      await mkdir(dirname(out), { recursive: true })
      await writeFile(out, buf)
      console.log(`✔ public/${img.file} (${Math.round(buf.length / 1024)} KB, unsplash ${id})`)
      done = true
      break
    } catch (err) {
      console.warn(`  … ${key}: opção ${id} falhou (${err.message})`)
    }
  }
  if (done) ok++
  else {
    console.error(`✖ ${key}: nenhuma opção funcionou. Gere com o prompt de PROMPTS-IA.md.`)
    failed++
  }
}
console.log(`\n${ok} baixadas, ${skipped} já existiam, ${failed} sem imagem.`)
if (failed) process.exitCode = 1
