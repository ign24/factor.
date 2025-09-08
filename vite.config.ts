import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue'],
          three: ['three'],
          vueuse: ['@vueuse/core'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    target: 'es2015',
  },
  optimizeDeps: {
    include: ['vue', '@vueuse/core'],
    exclude: ['@/assets/effects/audio-reactive-water.js'],
  },
})