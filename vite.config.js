import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (id.includes('framer-motion')) return 'motion';
          if (id.includes('@supabase')) return 'supabase';
          if (id.includes('three')) return 'three';
          if (id.includes('cobe')) return 'cobe';
          if (id.includes('lucide-react')) return 'icons';
          if (id.includes('dompurify')) return 'dompurify';
          if (id.includes('react-dom') || id.includes('react-router')) return 'react-vendor';
          if (id.includes('/react/')) return 'react-vendor';
          return undefined;
        },
      },
    },
  },
})
