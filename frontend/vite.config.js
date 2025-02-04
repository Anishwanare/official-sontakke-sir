import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["xlsx", "react-icons"],  // Include react-icons in optimized dependencies
  },
  build: {
    commonjsOptions: {
      include: [/xlsx/, /node_modules/, /react-icons/],  // Add react-icons to commonjs optimization
    },
    rollupOptions: {
      external: ["react-icons/md"], // Add react-icons/md to external to avoid bundling it
    },
  },
});
