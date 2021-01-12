import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "jquery-ui-dist/jquery-ui";
import "./registerServiceWorker";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueCookies from "vue-cookies";

Vue.config.productionTip = false;

const swLocation = '../public/sw-config.js';

new Vue({
  router,
  store,
  vuetify,
  VueCookies,
  render: h => h(App)
}).$mount("#app");
