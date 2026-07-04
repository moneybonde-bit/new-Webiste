import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "."),
      },
    },
    build: {
      // Target modern browsers — smaller, faster output
      target: ["es2020", "chrome80", "firefox78", "safari14"],
      // Warn on large chunks
      chunkSizeWarningLimit: 400,
      rollupOptions: {
        output: {
          // Fine-grained chunking keeps initial JS payload minimal
          manualChunks: {
            "react-vendor": ["react", "react-dom"],
            motion: ["motion", "motion/react"],
            i18n: ["i18next", "i18next-browser-languagedetector", "react-i18next"],
            form: ["react-hook-form", "zod", "@hookform/resolvers/zod"],
            scroll: ["react-scroll"],
          },
        },
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== "true",
      watch: process.env.DISABLE_HMR === "true" ? null : {},
    },
  };
});
