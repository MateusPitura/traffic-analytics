import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared/src"),
    }
  },
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["iife"],
      name: "Analytics",
      fileName: () => "analytics.js",
    },
  },
});