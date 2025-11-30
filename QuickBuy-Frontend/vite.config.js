import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss';
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: 'localhost'
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss(), 
        autoprefixer(),
      ],
    },
  },
});
