// Turns the photos in public/images/ into the site's optimised WebP images.
// Runs automatically before `npm run dev` and `npm run build`.
//
//   hero.jpg         -> hero banner (max 1920 px wide) + og.jpg for social sharing
//   service-N.jpg    -> service card N (max 800 px wide)
//   work-N.jpg       -> "Work sites" gallery, every work-* file, sorted by N
//                       (max 1200 px wide for the lightbox, plus a 600 px tile)
//
// Aspect ratio is kept; each WebP is compressed to about 200 KB or less. Output goes to
// public/optimized/ (file names carry a content hash, so they can be cached forever) and
// the list of images to src/generated/photos.json, which the pages import.
//
// `node scripts/optimize-images.mjs --prune-dist` runs after the build and removes the
// original photos from dist/, so only the optimised copies are deployed.
import sharp from 'sharp'
import { createHash } from 'node:crypto'
import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'

const SRC = 'public/images'
const OUT = 'public/optimized'
const URL_BASE = '/optimized'
const MANIFEST = 'src/generated/photos.json'
const MAX_BYTES = 200 * 1024
const EXT = /\.(jpe?g|png|webp)$/i
// Part of every output hash: change it when the encoding settings change, so files are rebuilt.
const SETTINGS = 'v2'

const sources = existsSync(SRC) ? readdirSync(SRC).filter((f) => EXT.test(f)) : []
const baseName = (file) => file.replace(EXT, '').toLowerCase()
const numberOf = (name) => Number(name.match(/-(\d+)$/)?.[1] ?? Infinity)

if (process.argv.includes('--prune-dist')) {
  for (const file of sources) rmSync(`dist/images/${file}`, { force: true })
  if (existsSync('dist/images') && readdirSync('dist/images').length === 0) rmSync('dist/images', { recursive: true })
  console.log(`optimize-images: removed ${sources.length} original photo(s) from dist/`)
  process.exit(0)
}

mkdirSync(OUT, { recursive: true })
mkdirSync('src/generated', { recursive: true })
const written = new Set()

// Quality never drops below 45, so a very detailed photo may end up a little over the target.
async function encodeUnderLimit(pipeline) {
  for (let quality = 82; quality >= 50; quality -= 6) {
    const buf = await pipeline.clone().webp({ quality, effort: 6 }).toBuffer()
    if (buf.length <= MAX_BYTES) return buf
  }
  return pipeline.clone().webp({ quality: 45, effort: 6 }).toBuffer()
}

// Resizes `file` to at most `maxWidth` wide (never upscales) and returns { src, width, height }.
// Unchanged photos are not re-encoded: the hashed output file already exists.
async function webp(file, name, maxWidth) {
  const input = readFileSync(`${SRC}/${file}`)
  const hash = createHash('sha1').update(input).update(`${maxWidth}${SETTINGS}`).digest('hex').slice(0, 8)
  const outName = `${name}-${maxWidth}.${hash}.webp`
  const outPath = `${OUT}/${outName}`
  const pipeline = sharp(input).rotate().resize({ width: maxWidth, withoutEnlargement: true })
  if (!existsSync(outPath)) writeFileSync(outPath, await encodeUnderLimit(pipeline))
  const { width, height } = await sharp(outPath).metadata()
  written.add(outName)
  return { src: `${URL_BASE}/${outName}`, width, height }
}

const photos = { hero: null, og: null, services: {}, work: [] }

for (const file of sources) {
  const name = baseName(file)
  if (name === 'hero') {
    photos.hero = await webp(file, name, 1920)
    // Social sharing preview (1200x630 JPEG, which every platform accepts).
    const input = readFileSync(`${SRC}/${file}`)
    const hash = createHash('sha1').update(input).update(SETTINGS).digest('hex').slice(0, 8)
    const ogName = `og.${hash}.jpg`
    if (!existsSync(`${OUT}/${ogName}`)) {
      await sharp(input)
        .rotate()
        .resize(1200, 630, { fit: 'cover', position: 'attention' })
        .jpeg({ quality: 78, mozjpeg: true })
        .toFile(`${OUT}/${ogName}`)
    }
    written.add(ogName)
    photos.og = `${URL_BASE}/${ogName}`
  } else if (/^service-\d+$/.test(name)) {
    photos.services[numberOf(name)] = await webp(file, name, 800)
  } else if (/^work-.+$/.test(name)) {
    const full = await webp(file, name, 1200)
    const tile = await webp(file, name, 600)
    photos.work.push({ name, ...full, tile: tile.src })
  }
}
photos.work.sort((a, b) => numberOf(a.name) - numberOf(b.name) || a.name.localeCompare(b.name))

// Drop optimised files whose source photo was removed or replaced.
for (const f of readdirSync(OUT)) if (!written.has(f)) rmSync(`${OUT}/${f}`)

writeFileSync(MANIFEST, JSON.stringify(photos, null, 2) + '\n')
console.log(
  `optimize-images: hero ${photos.hero ? 'yes' : 'no'}, ` +
    `${Object.keys(photos.services).length} service, ${photos.work.length} work photo(s)`,
)
