import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { defineConfig } from 'vite'
import electron from 'vite-plugin-electron/simple'

// https://vitejs.dev/config/
export default defineConfig({
  // Define mode explicitly
  mode: process.env.NODE_ENV || 'development',
  define: {
    // Make NODE_ENV available in the client code
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
  },
  plugins: [
    react(),
    tailwindcss(),
    electron({
      main: {
        // Shortcut of `build.lib.entry`.
        entry: 'electron/main.ts',
      },
      preload: {
        // Shortcut of `build.rollupOptions.input`.
        // Preload scripts may contain Web assets, so use the `build.rollupOptions.input` instead `build.lib.entry`.
        input: path.join(__dirname, 'electron/preload.ts'),
      },
    }),
  ],
})
