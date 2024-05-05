import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Especifica el nombre del directorio de salida aquí
    rollupOptions: {
      input: {
        main: 'src/main.jsx', // Ruta al archivo de entrada JavaScript
      },
    },
  },
});