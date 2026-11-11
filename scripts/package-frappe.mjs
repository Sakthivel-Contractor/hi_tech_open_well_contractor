import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const repoDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const distDir = path.join(repoDir, 'dist')
const appDir = path.resolve(process.argv[2] || path.join(repoDir, '../hitech_crm/hitech'))
const wwwDir = path.join(appDir, 'www')
const publicVueDir = path.join(appDir, 'public/vue')
const manifestPath = path.join(appDir, '.vue-build-files.json')

try {
  await readFile(path.join(distDir, 'index.html'))
  await readFile(path.join(appDir, 'hooks.py'))
} catch {
  throw new Error(
    `Expected a built dist/index.html and a Frappe app directory at ${appDir}. ` +
      'Pass the app directory as the first argument if it is elsewhere.',
  )
}

let previousFiles = []
try {
  previousFiles = JSON.parse(await readFile(manifestPath, 'utf8'))
} catch (error) {
  if (error.code !== 'ENOENT') throw error
}

await mkdir(wwwDir, { recursive: true })
for (const file of previousFiles) {
  const target = path.resolve(wwwDir, file)
  if (!target.startsWith(`${wwwDir}${path.sep}`)) {
    throw new Error(`Invalid path in ${manifestPath}: ${file}`)
  }
  await rm(target, { force: true, recursive: true })
}

await rm(publicVueDir, { force: true, recursive: true })
await mkdir(publicVueDir, { recursive: true })
await cp(path.join(distDir, 'assets'), path.join(publicVueDir, 'assets'), { recursive: true })

// Vite prefixes files copied from public/ with the configured base URL. Put
// those files in app public/ as well; /optimized remains served from www/ below.
async function copyPublicAssets(sourceDir, relativeDir = '') {
  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    if (!relativeDir && ['images', 'optimized'].includes(entry.name)) continue
    const relativePath = path.join(relativeDir, entry.name)
    const source = path.join(sourceDir, entry.name)
    const destination = path.join(publicVueDir, relativePath)
    if (entry.isDirectory()) {
      await mkdir(destination, { recursive: true })
      await copyPublicAssets(source, relativePath)
    } else {
      await cp(source, destination)
    }
  }
}

await copyPublicAssets(path.join(repoDir, 'public'))

const copiedFiles = []
async function copyWebsiteFiles(sourceDir, relativeDir = '') {
  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    const relativePath = path.join(relativeDir, entry.name)
    if (relativePath === 'assets' || relativePath.startsWith(`assets${path.sep}`)) continue

    const source = path.join(sourceDir, entry.name)
    const destination = path.join(wwwDir, relativePath)
    if (entry.isDirectory()) {
      await mkdir(destination, { recursive: true })
      await copyWebsiteFiles(source, relativePath)
    } else {
      await mkdir(path.dirname(destination), { recursive: true })
      await cp(source, destination)
      copiedFiles.push(relativePath.split(path.sep).join('/'))
    }
  }
}

await copyWebsiteFiles(distDir)
await writeFile(manifestPath, `${JSON.stringify(copiedFiles, null, 2)}\n`)
console.log(`Packaged ${copiedFiles.length} Vue website files into ${appDir}`)
