import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8000,
  },
  base: "./",
  build: {
    outDir: "../docs",
    rollupOptions: {
      output: {
        entryFileNames: "js/main.js",
        assetFileNames: "css/[name][extname]",
      },
    },
  },
});
