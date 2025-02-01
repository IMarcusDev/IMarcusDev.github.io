import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';  // Importa el módulo 'path'

export default defineConfig({
  plugins: [
    vue(),          
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),  // Configura el alias '@' para que apunte a la carpeta 'src'
      '#': path.resolve(__dirname, 'public'),
    },
  },
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          changeOrigin: true,
          secure: false
        }
      }
    }
});