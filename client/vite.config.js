import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: true, // Ensure HMR is enabled
    // check for updates every 10 seconds
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx"
    },
    outDir: "../_server/core/static/core"
  },
  base: "/static"
})
