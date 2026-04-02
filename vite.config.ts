import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import viteCompression from "vite-plugin-compression";
import path from "path";

// Set defaults for local development
const port = Number(process.env.PORT || "5173");
const basePath = process.env.BASE_PATH || "/";

export default defineConfig({
  base: basePath,
  plugins: [
    react(),
    tailwindcss(),
    viteCompression({
      algorithm: "brotliCompress",
      ext: ".br",
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "src"),
      // Changed this to look inside your current project folder
      "@assets": path.resolve(import.meta.dirname, "src/assets"), 
    },
    dedupe: ["react", "react-dom"],
  },
  root: path.resolve(import.meta.dirname),
  build: {
    outDir: path.resolve(import.meta.dirname, "dist"),
    emptyOutDir: true,
    sourcemap: false,
    cssCodeSplit: true,
    chunkSizeWarningLimit: 450,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;

          if (id.includes("/node_modules/react/") || id.includes("/node_modules/react-dom/")) {
            return "vendor-react";
          }

          if (
            id.includes("/node_modules/three/") ||
            id.includes("/node_modules/@react-three/") ||
            id.includes("/node_modules/@types/three/")
          ) {
            return "vendor-three";
          }

          if (id.includes("/node_modules/lucide-react/")) {
            return "vendor-lucide";
          }

          if (id.includes("/node_modules/@radix-ui/")) {
            return "vendor-radix";
          }
        },
      },
    },
  },
  server: {
    port,
    host: "127.0.0.1", 
    fs: {
      strict: false,
    },
  },
  preview: {
    port,
    host: "127.0.0.1",
  },
});