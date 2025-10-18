import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      ui: path.resolve(__dirname, 'src/ui'),
      routes: path.resolve(__dirname, 'src/routes'),
      components: path.resolve(__dirname, 'src/components'),
      utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  build: {
    // Relative to the root
    outDir: 'dist',
    rollupOptions: {
      input: path.resolve(__dirname, 'index.html'),
    },
  },
  server: {
    open: true, // Abre o navegador automaticamente
    port: 3001, // Porta do servidor de desenvolvimento
  },
});
