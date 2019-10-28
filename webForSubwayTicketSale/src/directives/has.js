import Vue from "vue";
import storage from "@/lib/utils/storage.js";

//检查某些元素是否有权限
Vue.directive("has", {
  inserted: (el, binding) => {
    if (!Vue.prototype.$_has(binding.value)) {
      if (el.parentNode) {
        el.parentNode.removeChild(el);
      } else {
        console.error(
          "key: [",
          binding.value,
          "], cannot remove el:",
          el,
          el.parentNode
        );
      }
    }
  }
});

Vue.prototype.$_has = value => {
  let exists = false;

  const curr_permissions = storage.getItem("curr_permissions");

  if (value && curr_permissions) {
    for (let i = 0; i < curr_permissions.length; i++) {
      if (curr_permissions[i].indexOf(value) > -1) {
        exists = true;
        break;
      }
    }
  }

  return exists;
};
