import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js', // Pointe explicitement vers postcss.config.js
  },
  server: {
    hmr: {
      overlay: true, // Active l'overlay d'erreur
    },
  },
});