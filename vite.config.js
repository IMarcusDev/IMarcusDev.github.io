import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://backend-production-225f.up.railway.app", // URL del backend en Railway
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
