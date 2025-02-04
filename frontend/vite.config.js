import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["xlsx", "react-icons", "react-icons/gi", "react-icons/md"],  // Include react-icons/gi and react-icons/md in optimized dependencies
  },
  build: {
    commonjsOptions: {
      include: [/xlsx/, /node_modules/, /react-icons/],  // Add react-icons to commonjs optimization
    },
    rollupOptions: {
      external: [
        "react-icons/md",   // Exclude md icons from bundling
        "react-icons/gi",   // Exclude gi icons from bundling
      ],
    },
  },
});
