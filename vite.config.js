import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  test: {
    globals: true,   // This enables the global test functions like describe, it, expect
    environment: 'jsdom',  // If you're testing a DOM-based application, set it to 'jsdom'
    coverage: {
      reporter: ['text', 'lcov', 'json'],  // You can choose the reporters you want (text, lcov, json, etc.)
      all: true, // Collect coverage for all files, not just the ones tested
      include: ['src/**/*.js', 'src/**/*.vue'],  // Path to the files you want to include in the coverage
      exclude: ['src/**/*.test.js', 'src/**/*.test.vue'],  // Exclude test files from coverage
    },
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  plugins: [vue(), tailwindcss()],
});
