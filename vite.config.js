import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    host: '127.0.0.1', // Fuerza IPv4 para evitar problemas con ::1
    port: 4000,         // Puerto alternativo por si 5173 está bloqueado
    strictPort: true    // Lanza error si el puerto ya está en uso
  }
});
