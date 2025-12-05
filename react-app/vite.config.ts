import { fileURLToPath, URL } from 'url';

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    assetsInlineLimit: 10240
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData:
          '@import \'src/theme/scss/colors.scss\';@import \'src/theme/scss/spacing.scss\';@import \'src/theme/scss/typography.scss\';'
      }
    }
  }
});
