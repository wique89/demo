import {
    register
} from "@/plugins/vuex-store";

const routes = [];

/* ************ Module: layout **************** */
import layout from "./layout.js";
register("layout", routes, layout);
/* ****************************************** */


export default routes;