import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,           // expõe em 0.0.0.0, acessível em qualquer interface
    port: 5173,
    hmr: {
      host: 'localhost',  // força o HMR a apontar para localhost
      protocol: 'ws',
      port: 5173,
    },
  },
});
