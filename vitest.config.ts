/// <reference types="vitest" />
import { defineConfig, mergeConfig } from "vite";

import viteConfig from "./vite.config";

// https://vitejs.dev/config/
export default mergeConfig(viteConfig, defineConfig({
  test: {
    setupFiles: "vitest.setup.ts",
  },
}));
