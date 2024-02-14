import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  publicDir: '/public',
  server: {
    proxy: {
      '/api': { target: 'http://211.250.82.235:55000', changeOrigin: true }, // Dev Server
    },
  },
});
