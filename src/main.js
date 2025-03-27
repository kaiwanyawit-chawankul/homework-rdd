import { createApp } from "vue";
import "./style.css";
// import App from "./App.vue";
import App2 from "./App2.vue";
import router from './router'; // import router

createApp(App2).use(router).mount('#app');