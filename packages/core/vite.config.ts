/// <reference types="vite/client" />
/// <reference types="vitest" />

import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    dir: './__tests__/unit',
    globals: true,
    environment: 'happy-dom',
  }
})
