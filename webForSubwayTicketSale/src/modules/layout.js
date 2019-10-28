import Layout from "./layout.vue";
import {
  register
} from "@/plugins/vuex-store";

let children = [];

/* ************ Module: home **************** */
import home from "@/modules/home";
register("home", children, home);
/* ****************************************** */


export default {
  route: {
    path: "",
    redirect: "home",
    component: Layout,
    children: children
  }
};