import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? 'tokens-codex'
const basePath = process.env.VITE_BASE_PATH ?? `/${repoName}/`

// https://vite.dev/config/
export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? basePath : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
