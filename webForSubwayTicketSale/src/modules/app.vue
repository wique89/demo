<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import { mapMutations, mapGetters } from "vuex";

export default {
  name: "app",
  data() {
    return {};
  },

  created() {
    // this.getHomeInfo();
  },

  // computed: {
  //   ...mapGetters(["getEventSource"])
  // },

  // methods: {
  //   ...mapMutations(["setEventSource"])
  // }
};
</script>
<style>
#app {
  padding: 0;
  margin: 0;
  list-style-type: none;
  text-decoration: none;
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    "微软雅黑", Arial, sans-serif;
  outline: none;
  outline-style: none;
  box-sizing: border-box;
}

/* 复写注册拍照dialog样式 */
.camera-item>.el-dialog>.el-dialog__body {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
