import Vue from "vue";

Vue.filter("number", val => {
  return parseInt(val).toLocaleString();
});
