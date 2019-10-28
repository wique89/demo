<template>
  <div class="main-layout">
    <div class="header">
      <div class="logo">
        <img src="./../assets/img/subway/logo.png" />
      </div>
      <div class="current-time">
        <i class="el-icon-time"></i>
        {{currentTime}}
      </div>
      <div class="network-status">网络正常</div>
    </div>
    <div style="clear:both;"></div>

    <router-view ref="child" @onActiveIndexChange="onActiveIndexChange"></router-view>
    <div class="bottom"></div>
  </div>
</template>

<script>
// import { mapMutations } from "vuex";
import datetimeUtil from "./../lib/utils/datetimeUtil.js";
export default {
  name: "layout",
  data() {
    return {
      currentTime: "",
      currentRoute: "",
      ver: "null"
    };
  },

  components: {},

  computed: {
    // ...mapGetters()
  },

  created() {
    var self = this;
    window.setInterval(function() {
      self.currentTime = datetimeUtil.formatDateTime(new Date(), true);
    }, 1000);
  },

  mounted() {},

  methods: {
    // ...mapMutations(),
    onActiveIndexChange() {}

    // handleCommand(command) {
    //   console.log(command);
    //   this.$router.push(command);
    // }
  }
};
</script>

<style scoped lang="less">
.main-layout {
  width: 1024px;
  margin: 0 auto;
  margin-top: 20px;
  position: relative;
  background-image: url("./../assets/img/subway/bg2.jpg");
}
.header {
  padding: 20px;

  .logo {
    float: left;
    img {
      width: 80px;
      height: 100px;
    }
  }

  .network-status {
    float: right;
    font-size: 14px;
    color: #1bd26d;
    margin-top: 0px;
    font-weight: bold;
    margin-right: 16px;
  }

  .current-time {
    float: right;
    font-size: 19px;
    color: white;
  }
}
</style>
