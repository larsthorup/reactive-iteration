/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    coverage: {
      provider: 'v8',
      reporter: ['lcov', 'text', 'html'],
    },
    environment: 'jsdom',
    setupFiles: ['src/vitest.setup.ts']
  },
})
