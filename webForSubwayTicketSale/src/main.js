import Vue from "vue";

import api from "@/plugins/api";
import { store } from "@/plugins/vuex-store";
import router from "@/plugins/router";
import "@/plugins/element";
import "@/directives/has";
import "@/filters/number";
import App from "@/modules/app.vue";

// import "@/assets/iconfont/iconfont_common/iconfont.js";
// import "@/assets/iconfont/iconfont_dcc/iconfont.js";
// import "@/assets/iconfont/iconfont_common/iconfont.css";
// import "@/assets/iconfont/iconfont_dcc/iconfont.css";
import "@/assets/css/common.css";

Vue.config.productionTip = false;
Vue.prototype.$api = api;

new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
});
