import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

// Configuración de Vite para compilar todo en un único archivo HTML
export default defineConfig({
  plugins: [
    react(),
    viteSingleFile() // Plugin que inyecta todo el CSS y JS en el HTML
  ],
  build: {
    // Configuración de construcción optimizada
    minify: 'terser', // Minificación agresiva del código JS
    target: 'es2020', // Versión de JavaScript compatible
    
    rollupOptions: {
      // Configuración de salida para generar un único archivo
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  // Configuración del servidor de desarrollo
  server: {
    port: 5173,
    strictPort: false
  }
})
