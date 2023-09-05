import Vue from "vue";
import App from "./App.vue";
import store from "./store";

Vue.config.productionTip = false;

require("./assets/styles/data-input.css");
require("./assets/styles/global-ui.css");

new Vue({
  store,
  render: (h) => h(App),
}).$mount("#app");
