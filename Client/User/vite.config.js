import { defineConfig } from "vite";

export default defineConfig({
  build: {
    outDir: "dist/user", // Путь для сборки пользовательского приложения
    assetsDir: ".", // Папка с assets пользовательского приложения
  },
  server: {
    port: 3000, // Порт для пользовательского приложения
  },
});
