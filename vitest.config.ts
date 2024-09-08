/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vite";

import viteConfig from "./vite.config";

// https://vitejs.dev/config/
export default mergeConfig(viteConfig, defineConfig({
  server: {
    port: 5175,
    open: false,
  },
  test: {
    setupFiles: "vitest.setup.ts",
    environment: "happy-dom",
    css: true,
  },
}));
