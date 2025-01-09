import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['xlsx'],  // Exclude xlsx from the bundle
    },
  },
  optimizeDeps: {
    include: ['xlsx'],  // Ensure xlsx is included in dependencies optimization
  },
});
