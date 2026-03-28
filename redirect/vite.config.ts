import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@shared": path.resolve(__dirname, "../shared/src"),
      "@script": path.resolve(__dirname, "../script/src"),
    },
  },
  build: {
    modulePreload: false,
  },
  plugins: [viteSingleFile(), createHtmlPlugin()],
});
