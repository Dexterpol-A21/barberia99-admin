// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    server: {
      fs: {
        // Permite a Vite acceder a archivos de dependencias una carpeta arriba (evita el error de strict allow list)
        allow: ['..']
      }
    }
  },

  integrations: [react()]
});