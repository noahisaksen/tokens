import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'

const basePath = process.env.VITE_BASE_PATH ?? '/tokens-codex/'

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
