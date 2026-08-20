import { defineConfig } from "vitest/config";
import { resolve } from "node:path";

export default defineConfig({
  resolve: {
    // mirrors the "@/*" path alias in tsconfig.json
    alias: { "@": resolve(__dirname, "./src") },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
  },
});
