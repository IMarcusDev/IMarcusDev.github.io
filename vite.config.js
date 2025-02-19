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
        target: "https://backend-production-0b8e.up.railway.app", // Asegúrate de que la URL tenga el protocolo correcto (http/https)
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
