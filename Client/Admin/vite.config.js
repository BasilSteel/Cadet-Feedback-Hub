import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/admin", // Путь для сборки админского приложения
    assetsDir: ".", // Папка с assets админского приложения
  },
  server: {
    port: 3001, // Порт для админского приложения
  },
});
