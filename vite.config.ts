import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  
  // ⚠️ САМОЕ ВАЖНОЕ: base должен совпадать с именем репозитория
  base: '/SPA/',  // ← Если репозиторий называется "portfolio"
  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});