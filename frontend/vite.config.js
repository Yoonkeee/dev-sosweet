import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  publicDir: '/public',
  server: {
    proxy: {
      '/api': { target: 'http://127.0.0.1:8000', changeOrigin: true }, // Local Server
      // '/api': { target: 'http://211.250.82.235:55000', changeOrigin: true }, // Dev Server
      '/google-oauth': {
        target: 'https://oauth2.googleapis.com',
        // target: 'https://accounts.google.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/google-oauth/, ''),
      },
      '/google-photo': {
        target: 'https://photoslibrary.googleapis.com/v1',
        // target: 'https://accounts.google.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/google-photo/, ''),
      },
    },
  },
});
