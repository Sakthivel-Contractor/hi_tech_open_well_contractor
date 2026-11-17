// Runs after `vite-ssg build`: writes dist/sitemap.xml, dist/robots.txt and dist/_headers
// from the same data the site uses, so new districts are picked up automatically.
// Also turns the pre-rendered /404 page into dist/404.html for static hosts.
//
// <lastmod> is the date of the last git commit that touched the files a page's content comes
// from (its page component plus the data and text it shows), or today when one of those files
// has uncommitted changes. Styling and script-only changes do not move it. Without git, the
// sitemap is written without <lastmod>.
import { execFileSync } from 'node:child_process'
import { existsSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { business } from '../src/data/business.js'
import { districtPaths } from '../src/data/areas.js'
import { servicePaths } from '../src/data/services.js'

const site = business.siteUrl.replace(/\/$/, '')

// Content sources shared by every page: the text, the business details and the reviews.
const shared = ['src/i18n.js', 'src/data/business.js', 'src/data/reviews.js']
const entries = [
  { path: '/', sources: ['src/pages/HomePage.vue', 'src/data/areas.js', 'src/data/photos.js', 'public/images'] },
  { path: '/contact', sources: ['src/pages/ContactPage.vue'] },
  ...servicePaths.map((path) => ({
    path,
    sources: ['src/pages/ServicePage.vue', 'src/data/services.js', 'src/data/areas.js'],
  })),
  ...districtPaths.map((path) => ({
    path,
    sources: ['src/pages/DistrictPage.vue', 'src/data/areas.js'],
  })),
  { path: '/privacy', sources: ['src/pages/PrivacyPage.vue'] },
]
const pages = entries.map((e) => e.path)

function git(args) {
  try {
    return execFileSync('git', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore'] }).trim()
  } catch {
    return null
  }
}

const today = new Date().toISOString().slice(0, 10)
function lastmod(sources) {
  const files = [...shared, ...sources]
  const dirty = git(['status', '--porcelain', '--', ...files])
  if (dirty === null) return null // not a git checkout
  if (dirty) return today
  return git(['log', '-1', '--format=%cs', '--', ...files]) || null
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map((e) => {
    const date = lastmod(e.sources)
    return `  <url>
    <loc>${site}${e.path}</loc>${date ? `\n    <lastmod>${date}</lastmod>` : ''}
  </url>`
  })
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`

writeFileSync('dist/sitemap.xml', sitemap)
writeFileSync('dist/robots.txt', robots)

// HTML must always be re-checked (a new deploy changes the hashed asset names it points to).
// Listed per page rather than as /* so it never overlaps the long-lived /assets/* and
// /optimized/* rules in netlify.toml. Netlify merges this file with netlify.toml.
const htmlPaths = [...pages, '/404.html']
const headers = htmlPaths
  .flatMap((p) => (p === '/' || p.endsWith('.html') ? [p] : [p, `${p}/`]))
  .map((p) => `${p}\n  Cache-Control: public, max-age=0, must-revalidate\n`)
  .join('')
writeFileSync('dist/_headers', headers)

if (existsSync('dist/404/index.html')) {
  renameSync('dist/404/index.html', 'dist/404.html')
  rmSync('dist/404', { recursive: true })
}
console.log(`sitemap.xml: ${pages.length} URLs, robots.txt, _headers written (site: ${site})`)
