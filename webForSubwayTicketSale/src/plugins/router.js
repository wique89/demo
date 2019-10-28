import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/modules/routes";
import { store } from "@/plugins/vuex-store";
import storage from "@/lib/utils/storage";

Vue.use(VueRouter);

var router = new VueRouter({
  routes
});

// window.addEventListener("storage", function(ev) {
//   const key = storage.PREFIX + "token";
//   if (ev && ev.key == key && !ev.newValue) window.location = "/#/login";
// });

// // 路由token验证
// router.beforeEach((to, from, next) => {
//   if (!(store.state.token || to.name == "login" || to.name == "invite")) {
//     next({ name: "login" });
//   } else {
//     next();
//   }
// });

// router.afterEach(() => {});

export default router;
