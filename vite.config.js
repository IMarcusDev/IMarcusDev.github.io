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
        target: "backend-production-225f.up.railway.app",
        changeOrigin: true,
        secure: false
      }
    },
  }
});
