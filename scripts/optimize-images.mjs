// Turns the photos in public/images/ into the site's optimised AVIF + WebP images.
// Runs automatically before `npm run dev` and `npm run build`.
//
//   hero.jpg         -> hero banner at 400/800/1200/1920 px wide + og.jpg for social sharing
//   service-N.jpg    -> service card N at 400/800 px wide
//   work-N.jpg       -> "Work sites" gallery, every work-* file, sorted by N:
//                       400/800 px thumbnails, and 1200/1920 px for the lightbox
//   public/logo.png  -> 96 px high WebP, inlined into the page as a data URI (it is ~2.5 KB)
//
// Each size is written as AVIF (smallest, most browsers) and WebP (fallback). Photos are never
// upscaled: a size wider than the original is replaced by the original width. Output goes to
// public/optimized/ (file names carry a content hash, so they can be cached forever) and the
// list of images to src/generated/photos.json, which the pages import.
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
const EXT = /\.(jpe?g|png|webp)$/i
// Part of every output hash: change it when the encoding settings change, so files are rebuilt.
const SETTINGS = 'v3'
const FORMATS = {
  avif: (p) => p.avif({ quality: 50, effort: 4 }),
  webp: (p) => p.webp({ quality: 72, effort: 5 }),
}

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

// Writes `file` at each of `widths` (capped at the original width) in AVIF and WebP.
// Returns { width, height, avif, webp, src }: avif/webp are srcset strings, src is a WebP
// fallback for very old browsers, width/height the largest size (for the aspect ratio).
// Unchanged photos are not re-encoded: the hashed output files already exist.
async function responsive(file, name, widths) {
  const input = readFileSync(`${SRC}/${file}`)
  const { width: original } = await sharp(input).rotate().metadata()
  const sizes = [...new Set(widths.map((w) => Math.min(w, original)))]
  const hash = createHash('sha1').update(input).update(SETTINGS).digest('hex').slice(0, 8)
  const sets = { avif: [], webp: [] }
  let largest = null
  for (const w of sizes) {
    const pipeline = sharp(input).rotate().resize({ width: w, withoutEnlargement: true })
    for (const [format, encode] of Object.entries(FORMATS)) {
      const outName = `${name}-${w}.${hash}.${format}`
      const outPath = `${OUT}/${outName}`
      if (!existsSync(outPath)) writeFileSync(outPath, await encode(pipeline.clone()).toBuffer())
      written.add(outName)
      sets[format].push(`${URL_BASE}/${outName} ${w}w`)
    }
    largest = w
  }
  const { width, height } = await sharp(`${OUT}/${name}-${largest}.${hash}.webp`).metadata()
  const fallbackWidth = sizes.find((w) => w >= 800) ?? largest
  return {
    width,
    height,
    avif: sets.avif.join(', '),
    webp: sets.webp.join(', '),
    src: `${URL_BASE}/${name}-${fallbackWidth}.${hash}.webp`,
  }
}

const photos = { hero: null, og: null, logo: null, services: {}, work: [] }

for (const file of sources) {
  const name = baseName(file)
  if (name === 'hero') {
    photos.hero = await responsive(file, name, [400, 800, 1200, 1920])
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
    photos.services[numberOf(name)] = await responsive(file, name, [400, 800])
  } else if (/^work-.+$/.test(name)) {
    const thumb = await responsive(file, `${name}-thumb`, [400, 800])
    const full = await responsive(file, name, [1200, 1920])
    photos.work.push({ name, thumb, full })
  }
}
photos.work.sort((a, b) => numberOf(a.name) - numberOf(b.name) || a.name.localeCompare(b.name))

// Logo: small enough to inline, which saves a request on every page.
if (existsSync('public/logo.png')) {
  const buf = await sharp('public/logo.png').resize({ height: 96 }).webp({ quality: 80, effort: 6 }).toBuffer()
  const { width, height } = await sharp(buf).metadata()
  photos.logo = { src: `data:image/webp;base64,${buf.toString('base64')}`, width, height }
}

// Drop optimised files whose source photo was removed or replaced.
for (const f of readdirSync(OUT)) if (!written.has(f)) rmSync(`${OUT}/${f}`)

writeFileSync(MANIFEST, JSON.stringify(photos, null, 2) + '\n')
console.log(
  `optimize-images: hero ${photos.hero ? 'yes' : 'no'}, ` +
    `${Object.keys(photos.services).length} service, ${photos.work.length} work photo(s)`,
)
