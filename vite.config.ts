import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import wasm from "vite-plugin-wasm";
import topLevelAwait from "vite-plugin-top-level-await";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const baseConfig: UserConfigExport = {
    server: {
      proxy: {
        "/api": "http://localhost:5000/",
      },
    },
    plugins: [wasm(), topLevelAwait(), react()],
  };

  if (mode === "debug") {
    baseConfig.build = {
      sourcemap: true,
      minify: false,
    };
  }

  return baseConfig;
});
