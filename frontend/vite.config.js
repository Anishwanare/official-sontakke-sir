export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['xlsx'],  // Externally link to xlsx
    },
  },
});
