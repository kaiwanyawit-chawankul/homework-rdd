import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,   // This enables the global test functions like describe, it, expect
    environment: 'jsdom',  // If you're testing a DOM-based application, set it to 'jsdom'
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [vue(), tailwindcss()],
});
