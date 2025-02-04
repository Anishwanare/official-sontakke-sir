import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ["xlsx","react-icons"],
  },
  build: {
    commonjsOptions: {
      include: [/xlsx/, /node_modules/, /react-icons/],
    },
  },
});
