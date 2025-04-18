import { resolve } from "path";
import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    root: "./",
  },
  plugins: [
    swc.vite({
      module: { type: "es6" },
    }),
    tsConfigPaths(),
  ],
  resolve: {
    alias: {
      src: resolve(__dirname, "./src"),
    },
  },
});
