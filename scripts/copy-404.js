import { cpSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const distDir = join(process.cwd(), 'dist')
const indexPath = join(distDir, 'index.html')
const errorPath = join(distDir, '404.html')

if (!existsSync(indexPath)) {
  console.error('dist/index.html not found. Run `bun run build` first.')
  process.exit(1)
}

cpSync(indexPath, errorPath)
console.log('Created dist/404.html for GitHub Pages SPA routing.')
