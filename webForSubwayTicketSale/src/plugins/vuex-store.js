import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    currentLibrary: {}
  },

  getters: {},

  mutations: {
    setCurrentLibrary(state, payload) {
      state.currentLibrary = payload
    }
  }
});

const register = (name, parent, module) => {
  module.store &&
    store.registerModule(module.store.namespace || name, module.store);
  module.route && parent.push(module.route);
};

export { register, store };
