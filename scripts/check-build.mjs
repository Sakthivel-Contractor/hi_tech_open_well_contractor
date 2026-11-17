// Runs at the end of `npm run build`. Fails the build (exit code 1) when the pre-rendered
// site in dist/ would publish something it must not:
//   - placeholder or demo text (e.g. "[GOOGLE REVIEW LINK]", sample-review badges, TODO)
//   - an unfilled template variable such as "{district}" in a title or description
//   - a page without exactly one <title>, a meta description, a canonical URL or one <h1>
//   - a canonical URL that is not this page's own address on the live domain
//   - JSON-LD that is not valid JSON
//   - a sitemap URL with no built page, or one that is marked noindex
//   - a review card whose text is not a filled entry in src/data/reviews.js (no demo reviews)
// Usage: node scripts/check-build.mjs [distDir]   (default: dist)
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import { business } from '../src/data/business.js'
import { filledReviews, fieldIn } from '../src/data/reviews.js'

const distDir = path.resolve(process.argv[2] || 'dist')
const site = business.siteUrl.replace(/\/$/, '')

// Text that must never reach the live site. Matched case-sensitively against the page text,
// attributes and JSON-LD; CSS and app scripts are skipped (class names like .img-placeholder).
const FORBIDDEN = [
  '[GOOGLE REVIEW LINK]',
  'isSample',
  'மாதிரி',
  '>Sample<',
  'Lorem ipsum',
  'lorem ipsum',
  'PLACEHOLDER',
  'TODO',
  'FIXME',
  'REAL STREET',
  'REAL PIN',
  'REAL_LAT',
  'REAL_LNG',
  'REAL PROFILE',
]

// Every review text the site may show, in both languages, whitespace-normalised.
const squash = (s) => s.replace(/\s+/g, ' ').trim()
const knownReviewTexts = new Set(
  filledReviews.flatMap((r) => ['ta', 'en'].map((l) => squash(fieldIn(r.text, l)))),
)

const errors = []
const fail = (file, message) => errors.push(`${file}: ${message}`)

function htmlFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const full = path.join(dir, name)
    if (statSync(full).isDirectory()) return name === 'assets' ? [] : htmlFiles(full)
    return name.endsWith('.html') ? [full] : []
  })
}

// dist/index.html -> '/', dist/contact/index.html -> '/contact'
function pagePath(file) {
  const rel = path.relative(distDir, file).split(path.sep).join('/')
  if (rel === 'index.html') return '/'
  return '/' + rel.replace(/\/index\.html$/, '').replace(/\.html$/, '')
}

const decode = (s) =>
  s.replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>')
const all = (html, re) => [...html.matchAll(re)]
const attr = (tag, name) => tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'))?.[1]

function metaContent(html, key, value) {
  const tag = all(html, /<meta\b[^>]*>/gi)
    .map((m) => m[0])
    .find((t) => attr(t, key)?.toLowerCase() === value)
  return tag ? decode(attr(tag, 'content') ?? '') : null
}

if (!existsSync(path.join(distDir, 'index.html'))) {
  console.error(`check-build: no ${distDir}/index.html. Run the build first.`)
  process.exit(1)
}

const pages = new Map() // path -> { file, noindex }

for (const file of htmlFiles(distDir)) {
  const rel = path.relative(distDir, file)
  const html = readFileSync(file, 'utf8')
  const p = pagePath(file)
  const isNotFound = p === '/404'

  const content = html
    .replace(/<style\b[\s\S]*?<\/style>/gi, '')
    .replace(/<script\b(?![^>]*application\/ld\+json)[^>]*>[\s\S]*?<\/script>/gi, '')
  for (const word of FORBIDDEN) {
    if (content.includes(word)) fail(rel, `contains forbidden text "${word}"`)
  }

  for (const m of all(html, /<blockquote\b[^>]*class="review-text"[^>]*>\s*<p[^>]*>([\s\S]*?)<\/p>/gi)) {
    const text = squash(decode(m[1]).replace(/<[^>]+>/g, '').replace(/^[“"]|[”"]$/g, ''))
    if (!knownReviewTexts.has(text)) fail(rel, `shows a review that is not in src/data/reviews.js: "${text.slice(0, 60)}"`)
  }

  const titles = all(html, /<title>([\s\S]*?)<\/title>/gi).map((m) => decode(m[1]).trim())
  if (titles.length !== 1 || !titles[0]) fail(rel, `expected exactly one non-empty <title>, found ${titles.length}`)

  const robots = (metaContent(html, 'name', 'robots') ?? '').toLowerCase()
  const noindex = robots.includes('noindex')
  pages.set(p, { file: rel, noindex })

  if (isNotFound) {
    if (!noindex) fail(rel, '404 page must be noindex')
  } else {
    const description = metaContent(html, 'name', 'description')
    if (!description?.trim()) fail(rel, 'missing meta description')

    const canonicals = all(html, /<link\b[^>]*rel="canonical"[^>]*>/gi).map((m) => attr(m[0], 'href'))
    const expected = site + (p === '/' ? '/' : p)
    if (canonicals.length !== 1) fail(rel, `expected one canonical link, found ${canonicals.length}`)
    else if (canonicals[0] !== expected) fail(rel, `canonical is ${canonicals[0]}, expected ${expected}`)

    const h1s = all(html, /<h1\b/gi).length
    if (h1s !== 1) fail(rel, `expected exactly one <h1>, found ${h1s}`)

    // Unfilled i18n variables such as {district} in the text people and search engines see first.
    const visibleMeta = [titles[0] ?? '', description ?? '', metaContent(html, 'property', 'og:title') ?? '']
    for (const text of visibleMeta) {
      const left = text.match(/\{[a-zA-Z]+\}/)
      if (left) fail(rel, `unfilled template variable ${left[0]} in "${text}"`)
    }
  }

  for (const m of all(html, /<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)) {
    try {
      JSON.parse(m[1])
    } catch (error) {
      fail(rel, `invalid JSON-LD: ${error.message}`)
    }
  }
}

// Every sitemap URL must be a built, indexable page.
const sitemapFile = path.join(distDir, 'sitemap.xml')
if (!existsSync(sitemapFile)) {
  fail('sitemap.xml', 'missing')
} else {
  const locs = all(readFileSync(sitemapFile, 'utf8'), /<loc>([^<]+)<\/loc>/g).map((m) => m[1].trim())
  if (!locs.length) fail('sitemap.xml', 'has no URLs')
  for (const loc of locs) {
    if (!loc.startsWith(site + '/')) {
      fail('sitemap.xml', `${loc} is not on ${site}`)
      continue
    }
    const p = loc.slice(site.length) || '/'
    const page = pages.get(p)
    if (!page) fail('sitemap.xml', `${loc} has no built page`)
    else if (page.noindex) fail('sitemap.xml', `${loc} is noindex but listed`)
  }
}

if (errors.length) {
  console.error(`check-build: ${errors.length} problem(s) found in ${distDir}:`)
  for (const e of errors) console.error(`  - ${e}`)
  process.exit(1)
}
console.log(`check-build: OK (${pages.size} pages checked)`)
