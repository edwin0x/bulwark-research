import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/start/plugin'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [tanstackStart(), tailwindcss()],
})
