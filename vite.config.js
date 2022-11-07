import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "lib/LaziBoi.js"),
      name: "LaziBoi",
      fileName: "laziboi",
    },
    rollupOptions: {
      external: [],
      output: {
        globals: {},
      },
    },
    minify: true,
  },
});
