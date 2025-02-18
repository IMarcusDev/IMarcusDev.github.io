import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  base: 'https://IMarcusDev.github.io/ProjectConsultorio',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
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
    },
    allowedHosts: ["susan-core-b-viewing.trycloudflare.com"] // <-- Agregado aquí
  }
});
