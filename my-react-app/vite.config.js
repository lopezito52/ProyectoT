import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: 'src/main.jsx', // Ajusta esta ruta según la ubicación de tu archivo de entrada JavaScript
      },
    },
  },
});
