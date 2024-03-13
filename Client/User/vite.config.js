import { defineConfig } from "vite";
import react from "@vitejs/plugin-react"; // Import the react plugin

export default defineConfig({
  plugins: [react()], // Use the react plugin
  server: {
    watch: {
      usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 3000,
  },
});
