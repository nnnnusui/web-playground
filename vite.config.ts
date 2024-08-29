import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import happyCssModules from "vite-plugin-happy-css-modules";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    happyCssModules({ pattern: "src/**/*.module.{css,scss,less}" }),
  ],
});
