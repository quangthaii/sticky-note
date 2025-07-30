import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/sticky-note/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
      '@/components': '/src/components',
      '@/contexts': '/src/contexts',
      '@/hooks': '/src/hooks',
      '@/configs': '/src/configs',
      '@/types': '/src/types',
      '@/utils': '/src/utils',
    },
  },
});
