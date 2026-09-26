import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { execFile } from 'node:child_process'
import { districtPaths } from './src/data/areas.js'

// During `npm run dev`, re-optimise photos when a file in public/images/ is added,
// changed or removed. The regenerated src/generated/photos.json reloads the page.
function watchPhotos() {
  let timer
  return {
    name: 'watch-photos',
    configureServer(server) {
      server.watcher.on('all', (_event, file) => {
        if (!/[\\/]public[\\/]images[\\/]/.test(file)) return
        clearTimeout(timer)
        timer = setTimeout(() => {
          execFile(process.execPath, ['scripts/optimize-images.mjs'], (err, stdout, stderr) => {
            if (err) server.config.logger.error(stderr || err.message)
            else server.config.logger.info(stdout.trim())
          })
        }, 300)
      })
    },
  }
}

export default defineConfig({
  plugins: [vue(), watchPhotos()],
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Writes /contact/index.html etc. so clean URLs work on every static host.
    dirStyle: 'nested',
    includedRoutes(paths) {
      const staticPaths = paths.filter((p) => !p.includes(':'))
      // '/404' is moved to dist/404.html by scripts/sitemap.mjs
      return [...staticPaths, ...districtPaths, '/404']
    },
  },
})
