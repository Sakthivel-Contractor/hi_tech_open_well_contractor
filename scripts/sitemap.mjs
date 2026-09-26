// Runs after `vite-ssg build`: writes dist/sitemap.xml and dist/robots.txt
// from the same data the site uses, so new districts are picked up automatically.
// Also turns the pre-rendered /404 page into dist/404.html for static hosts.
import { existsSync, renameSync, rmSync, writeFileSync } from 'node:fs'
import { business } from '../src/data/business.js'
import { districtPaths } from '../src/data/areas.js'

const site = business.siteUrl.replace(/\/$/, '')
const today = new Date().toISOString().slice(0, 10)
const pages = [
  { path: '/', priority: '1.0' },
  { path: '/contact', priority: '0.8' },
  ...districtPaths.map((path) => ({ path, priority: '0.9' })),
  { path: '/privacy', priority: '0.3' },
]

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (p) => `  <url>
    <loc>${site}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${site}/sitemap.xml
`

writeFileSync('dist/sitemap.xml', sitemap)
writeFileSync('dist/robots.txt', robots)

if (existsSync('dist/404/index.html')) {
  renameSync('dist/404/index.html', 'dist/404.html')
  rmSync('dist/404', { recursive: true })
}
console.log(`sitemap.xml: ${pages.length} URLs, robots.txt written (site: ${site})`)
