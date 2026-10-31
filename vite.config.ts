import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages собирается с BASE_PATH=/suneater-landing/, Cloudflare и mead.fi с корнем.
  base: process.env.BASE_PATH ?? '/',
  plugins: [react(), tailwindcss()],
});
