import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "jquery-ui-dist/jquery-ui";

createApp(App)
  .use(router)
  .use(store)
  .mount("#app");
