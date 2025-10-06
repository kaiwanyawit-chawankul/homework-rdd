import { createApp } from "vue";
import "./style.css";
import App2 from "./App2.vue";
import router from "./router"; // import router

// In production, prefetch the Editor chunk to shorten critical path without breaking tests
if (import.meta.env.PROD) {
  // Fire-and-forget dynamic import; bundlers prefetch/prioritize this chunk
  import(
    /* webpackPrefetch: true, vite-ignore */
    "./components/Editor.vue"
  );
}

createApp(App2).use(router).mount("#app");
