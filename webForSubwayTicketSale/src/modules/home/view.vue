<template>
  <div class="home">
    <!-- 返回主页按钮 -->
    <div @click="showHome" class="btn-goto-home" v-show="currentStep!='home' ">
      <i class="el-icon-s-home"></i>
      <a>首页</a>
    </div>
    <div class="content">
      <div class="div-current-step">
        <div class="full-line line0" v-show="currentStep=='home' && showLineImageIndex==0"></div>
        <div class="full-line line1" v-show="currentStep=='home' && showLineImageIndex==1"></div>
        <div class="full-line line2" v-show="currentStep=='home' && showLineImageIndex==2"></div>
        <div class="full-line line3" v-show="currentStep=='home' && showLineImageIndex==3"></div>
        <div class="div-switch" v-show="currentStep=='home'  ">
          <div class="swith-line-button">
            <el-button type="info" @click="showLineImage(1)">1号线</el-button>
          </div>
          <div class="swith-line-button">
            <el-button type="info" @click="showLineImage(2)">2号线</el-button>
          </div>
          <div class="swith-line-button">
            <el-button type="info" @click="showLineImage(3)">3号线</el-button>
          </div>
          <div class="swith-line-button">
            <el-button type="info" @click="showLineImage(0)">全&nbsp; 部</el-button>
          </div>
        </div>
        <div class="showsites" v-show="currentStep=='showsites'">
          <div class="site-show">
            <div class="site" @click="chooseSite(l)" v-for="l in sites" :key="l.id">
              <div class="site-name">{{l.name}}</div>
              <br />
              <div class="site-metro-name">
                <i class="el-icon-map-location"></i>
                {{l.metroName}}
              </div>
            </div>
          </div>
        </div>

        <!-- <div class="showlines" v-show="currentStep=='showlines'">
          <div class="lines-show">
            <div class="line" v-for="l in recommandLines" :key="l.index">
              <div class="line-index">{{l.index}}</div>
              <div class="line-bus-key-name">{{l.bus_key_name}}:</div>
               <div class="line-end-name">{{l.endname}}</div>
            </div>
          </div>
          <div @click="showOrderticket" class="btn-goto-orderticket">
            <i class="el-icon-plus"></i>
            <a>确认购票</a>
          </div>
        </div>-->
        <div
          class="orderticket"
          v-show="currentStep=='showlines'||currentStep=='orderticket'||currentStep=='pay'||currentStep=='payresult'"
        >
          <div class="left">
            <div class="line-display" v-for="l in lineDisplay" :key="l.index">
              <div class="line-start">
                <i class="el-icon-map-location" v-bind:style="{'color':l.color}"></i>
                <div class="line-start-flag-circle" v-bind:style="{'border-color':l.color}"></div>
              </div>
              <div class="line-start-name">{{l.startname}}</div>
              <div style="clear:both;"></div>
              <div
                class="line-bus-key-name"
                v-bind:style="{'background':l.color}"
              >{{l.bus_key_name}}</div>
              <div style="clear:both;"></div>
              <div class="line-end-name">{{l.endname}}</div>
              <div style="clear:both;"></div>
              <div class="line-end">
                <div class="line-end-flag-circle" v-bind:style="{'border-color':l.color}"></div>
              </div>
              <div class="line-vline" v-bind:style="{'background':l.color}"></div>
            </div>
          </div>
          <div class="right">
            <div class="targetSite">{{targetSite}}</div>
            <div class="ticketCount">
              <i class="el-icon-arrow-left decrease" @click="ticketCountChange(-1)" />
              <a>购买车票{{ticketCount}}张</a>
              <i class="el-icon-arrow-right increase" @click="ticketCountChange(1)" />
            </div>
            <div class="totalFee">合计票款{{totalFee}}元</div>
            <div class="paytype-choose">请选择支付方式</div>
            <div class="paytype-list">
              <img @click="showPay('zfb')" src="./../../assets/img/subway/alipay.png" />
              <img @click="showPay('zfb')" src="./../../assets/img/subway/weixinpay.png" />
              <img @click="showPay('zfb')" src="./../../assets/img/subway/UnionPay.png" />
            </div>
          </div>
        </div>
      </div>

      <div class="voice-control" v-show="showVoiceControlProperty">
        <div
          class="voice-control-btn voice-control-ready"
          @click="toggleSpeaking"
          v-show="speaking==false"
        >语音查询</div>
        <div
          class="voice-control-btn voice-control-speaking"
          @click="toggleSpeaking"
          v-show="speaking==true"
        >
          <img v-show="mic_state=='SILENCE'" src="./../../assets/img/subway/wake.png" />
          <img v-show="mic_state=='LISTENING'" src="./../../assets/img/subway/speaking.gif" />
          <img v-show="mic_state=='UNDERSTANDING'" src="./../../assets/img/subway/loading.gif" />
        </div>
      </div>
    </div>
    <div class="show-text" v-show="showText">
      <div class="text">{{text4Voice}}</div>
    </div>
    <div class="ws-message">
      <div>Debug Message:</div>
      {{mic_state}} -- {{wsmessage}}
    </div>

    <el-dialog :visible.sync="showQRcodeForPay" width="400px">
      <div style="margin: 0 auto; text-align:center;">
        <img class="qrcode-pay" src="./../../assets/img/subway/qrcode-pay.jpg" />
        <br />
        <div class="qrcode-pay-desc">请扫码支付</div>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="showPayResultDialog" width="400px">
      <div style="margin: 0 auto; text-align:center;">
        <img class="qrcode-payback" src="./../../assets/img/subway/weixinpay.png" />
        <br />
        <div class="qrcode-pay-desc">
          支付成功,
          <br />请取票!
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import datetimeUtil from "./../../lib/utils/datetimeUtil.js";
export default {
  name: "home",

  data() {
    return {
      showLineImageIndex: 0,
      payType: {},
      ticketCount: 1,

      currentSite: "机场路站西",

      sites: [
        {
          id: "BV10680168",
          name: "高新万达广场",
          address: "唐延路与科技七路交汇处",
          metroName: "科技路(地铁站)",
          metroAddress: "(在建)6号线;3号线"
        },
        {
          id: "BV11042652",
          name: "万达广场(大明宫店)",
          address: "凤城一路369号",

          metroName: "建筑科技大学·李家村(地铁站)",
          metroAddress: "(在建)5号线一期;4号线"
        }
      ],
      targetSite: "人民路站",

      expenseForTicket: 0, //单张票价
      startname: "",

      recommandLines: [
        {
          index: 1,
          startname: "机场西(T1/T2/T3)机场西(T1/T2/T3)",
          endname: "北客站(北广场)",
          bus_key_name: "机场城际线",
          color: "blue"
        },
        {
          index: 2,
          startname: "北客站(北广场)",
          endname: "行政中心",
          bus_key_name: "地铁4号线",
          color: "red"
        },
        {
          index: 3,
          startname: "行政中心",
          endname: "人民路站",
          bus_key_name: "地铁3号线",
          color: "green"
        }
      ],
      steps: [
        "home",
        "showsites",
        "showlines",
        "orderticket",
        "pay",
        "payresult"
      ],
      currentStep: "home",
      showText: false,
      text4Voice: "我要去西交大",

      showVoiceControlProperty: true,

      showQRcodeForPay: false,
      showPayResultDialog: false,

      speaking: false,
      currentTime: "",

      webSocketAddress: "ws://127.0.0.1:50002",
      mic_state: "SILENCE",
      wsmessage: "",
      websocket: null
    };
  },

  created() {
    if (GLOBAL_WS_ADDRESS != undefined) {
      this.webSocketAddress = GLOBAL_WS_ADDRESS;
    }
    this.initWebsocket();
  },

  components: {},

  computed: {
    totalFee() {
      return this.ticketCount * this.expenseForTicket;
    },
    lineDisplay() {
      var colors = ["#C90913", "#1CAE5B", "#24ABF2"];
      var list = [];

      for (let index = 0; index < this.recommandLines.length; index++) {
        const element = this.recommandLines[index];
        element.color = colors[index % colors.length];
        list.push(element);
      }

      return list;
    }
  },

  methods: {
    showLineImage(lineIndex) {
      this.showLineImageIndex = lineIndex;
    },
    toggleSpeaking() {
      var self = this;
      self.speaking = true;

      self.sendMessage("ui.dialog.click", "");
    },
    showVoiceText(txt) {
      var self = this;
      self.text4Voice = txt;
      self.showText = true;
    },
    hideVoiceText(txt) {
      var self = this;
      self.showText = false;
    },
    showVoiceControl() {
      var self = this;
      self.showVoiceControlProperty = true;
    },
    hideVoiceControl() {
      var self = this;
      self.showVoiceControlProperty = false;
    },
    //show page
    showHome(resetAllProperty) {
      var self = this;
      resetAllProperty = resetAllProperty | true;
      self.currentStep = "home";

      if (resetAllProperty == true) {
        self.text4Voice = "";
        self.showText = false;

        self.payType = {};
        self.ticketCount = 0;

        self.sites = [];
        self.targetSite = "";

        self.recommandLines = [];
        self.expenseForTicket = 0;

        self.showQRcodeForPay = false;
        self.showPayResultDialog = false;

        self.speaking = false;
        self.mic_state = "";
      }

      self.reportScene("home");

      //获取当前所在站点，建议在展示首页时调用。
      self.sendMessage("skill.upload.station", self.currentSite);
    },
    showSites(sites) {
      var self = this;
      self.currentStep = "showsites";
      if (sites && sites.length > 0) {
        for (let index = 0; index < sites.length; index++) {
          sites[index].index = index;
        }

        self.sites = sites;
      }
      self.reportScene("poilist");
    },
    chooseSite(site) {
      var self = this;
      self.targetSite = site;
      if (site.index == undefined) {
        for (let index = 0; index < self.sites.length; index++) {
          self.sites[index].index = index;
        }
      }
      var chooseIndex = site.index + 1;

      self.sendMessage(
        "skill.metro.selected",
        '{ "num": "' + chooseIndex + '" }'
      );
    },

    showLines(lines) {
      var self = this;
      // self.currentStep = "showlines";
      if (lines && lines.length > 0) {
        for (let index = 0; index < lines.length; index++) {
          lines[index].index = index;
        }
        self.recommandLines = lines;
      }
      self.reportScene("route");

      //
      self.showOrderticket();
    },

    showOrderticket() {
      var self = this;
      self.showPayResultDialog = false;
      self.showQRcodeForPay = false;
      self.currentStep = "orderticket";

      self.ticketCount = 1;
      self.reportScene("buy");
    },

    ticketCountChange(changeValue) {
      var self = this;
      this.ticketCount += changeValue;
      if (this.ticketCount <= 0) {
        this.ticketCount = 1;
      }
      var data = '{"count":"' + this.ticketCount + '"}';
      self.sendMessage("skill.metro.count", data);
    },
    showPay(payType) {
      var self = this;
      self.payType = payType;
      self.currentStep = "pay";
      // 弹出付款二维码
      self.showQRcodeForPay = true;

      //mock
      // setTimeout(() => {
      //   //self.showPayResult();
      //   // 关闭付款二维码，弹出付款反馈
      //   self.showQRcodeForPay = false;
      //   self.showPayResult();
      // }, 3000);
    },
    showPayResult() {
      var self = this;

      self.currentStep = "payresult";
      self.showPayResultDialog = true;
      self.showQRcodeForPay = false;
      //mock
      setTimeout(() => {
        console.log("关闭付款结果");
        self.showPayResultDialog = false;
        self.showHome();
      }, 3000);

      self.reportScene("ticket");
    },
    reportScene(scene) {
      var self = this;
      self.sendMessage("skill.upload.scene", scene);
    },

    initWebsocket() {
      var self = this;
      var websocket = null;
      //判断当前浏览器是否支持WebSocket
      if ("WebSocket" in window) {
        websocket = new WebSocket(self.webSocketAddress);
      } else {
        alert("当前浏览器 Not support websocket");
      }
      //连接发生错误的回调方法
      websocket.onerror = function() {
        console.log("WebSocket连接发生错误");
      };
      //连接成功建立的回调方法
      websocket.onopen = function() {
        console.log("WebSocket连接成功");
        websocket.send("user:test");

        var subscribeTopics = [
          "command://DUI.Metro.BuyTickets",
          "context.input.text",
          "context.output.text",
          "ui.avatar.show",
          "ui.avatar.hide",
          "ui.avatar.listening",
          "ui.avatar.understanding",
          "ui.avatar.silence",
          "skill.metro.home",
          "skill.metro.poilist",
          "skill.metro.route",
          "skill.metro.buy",
          "skill.metro.ticket",
          "phone.metro.pay"
        ];
        var data = "";
        for (let index = 0; index < subscribeTopics.length; index++) {
          const element = subscribeTopics[index];
          if (data.length > 0) data += ",";
          data += '{"topic":"' + element + '"}';
        }
        var msg = '{"event": "subscribe", "data": [' + data + "]}";
        console.log(msg);
        websocket.send(msg);
      };
      //接收到消息的回调方法
      websocket.onmessage = function(event) {
        console.log("onmessage event:" + event);
        if (event.data && event.data.length > 0) {
          self.handleMessage(JSON.parse(event.data));
        }
      };
      //连接关闭的回调方法
      websocket.onclose = function() {
        console.log("WebSocket连接关闭");
      };
      //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = function() {
        self.closeWebSocket();
      };

      self.websocket = websocket;
    },
    //关闭WebSocket连接
    closeWebSocket() {
      self.websocket.close();
    },

    updateMicStatus(micState) {
      var self = this;
      self.mic_state = micState;
      if (self.mic_state == "SILENCE") {
        self.speaking = false;
      }
      if (self.mic_state == "LISTENING") {
        self.speaking = true;
      }
      if (self.mic_state == "UNDERSTANDING") {
        self.speaking = true;
      }
    },
    handleMessage(message) {
      var self = this;
      console.log("handleMessage:" + message.event);
      self.wsmessage = message;

      switch (message.event) {
        case "command://DUI.Metro.BuyTickets":
          break;
        case "context.input.text": //实时识别结果, 最终识别结果
          var text = "";
          if (message.data.eof == 0) {
            text = message.data.var;
          } else if (message.data.eof == 1) {
            text = message.data.text;
          }

          self.showVoiceText(text);
          break;
        case "context.output.text": //对话输出结果
          var text = message.data.input;
          self.showVoiceText(text);
          break;
        case "ui.avatar.show": //麦克风图标(含ui条)显示
          self.showVoiceControl();
          self.showVoiceText("");
          break;
        case "ui.avatar.hide": //麦克风图标(含ui条)隐藏
          self.hideVoiceControl();
          self.hideVoiceText();
          break;
        case "ui.avatar.listening": //麦克风图标倾听动效
          console.log("正在倾听。。。");
          self.updateMicStatus("LISTENING");
          break;
        case "ui.avatar.understanding": //麦克风图标正在识别理解动效
          console.log("语义理解中。。。");
          self.updateMicStatus("UNDERSTANDING");
          break;
        case "ui.avatar.silence": //麦克风图标静止
          console.log("结果返回。。。");
          self.updateMicStatus("SILENCE");
          break;
        case "skill.metro.home":
          console.log("显示或回到首页");
          self.showHome();
          break;

        case "skill.metro.poilist": //展示多个结果列表页
          var sites = message.data.poilist;
          if (sites == undefined || sites.length == 0) {
            console.log("没有站点结果");
          } else {
            if (sites.length > 1) {
              console.log("存在多个结果时的站点选择");
              self.showSites(sites);
            }
          }

          break;
        case "skill.metro.route": //展示路径规划页
          //单张票价
          self.expenseForTicket = message.data.expense;
          self.startname = message.data.startname;
          self.targetSite = message.data.endname;

          var lines = message.data.route;
          if (lines == undefined || lines.length == 0) {
            console.log("没有路线结果");
          } else {
            self.showLines(lines);
          }

          break;
        case "skill.metro.buy": //展示购票详情页
          self.showOrderticket();
          break;
        case "skill.metro.ticket": //展示出票页
          self.showPayResultDialog = true;

          setTimeout(function() {
            self.showPayResultDialog = false;
            self.showHome();
          }, 5000);

          break;

        default:
          break;
      }
    },
    sendMessage(event, data) {
      var self = this;
      if (event == undefined) {
        event = "";
      }
      if (data == undefined) {
        data = "";
      }
      var message = '{"event": "' + event + '", "data": "' + data + '"}';
      console.log("sendMessage:", message);
      self.websocket.send(message);
    }
  }
};
</script>

<style scoped lang="less">
.div-switch {
  text-align: right;
  padding: 20px 20px;
  position: absolute;
  right: 10px;
  top: 20px;
}
.swith-line-button {
  margin: 10px;
}

.line-display {
  color: white;
  margin-bottom: 35px;
  margin-left: 20px;
  position: relative;
  .line-vline {
    background: red;
    width: 12px;
    height: 106px;
    position: absolute;
    top: 13px;
    left: 46px;
  }
  .line-start {
    margin-left: 10px;
    .el-icon-map-location {
      float: left;
      font-size: 1.5rem;
    }
    .line-start-flag-circle {
      float: left;
      border: solid 3px red;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      margin-left: 10px;
      margin-right: 10px;
    }
  }

  .line-start-name {
    font-size: 18px;
    float: left;
  }
  .line-bus-key-name {
    margin-top: 10px;
    margin-bottom: 50px;
    clear: both;
    margin-left: 70px;
    padding: 3px 5px;
    background: red;
    width: fit-content;
    border-radius: 3px;
    font-size: 14px;
  }
  .line-end-name {
    font-size: 18px;
    margin-left: 70px;

    margin-bottom: -17px;
  }
  .line-end {
    margin-left: 10px;
    .line-end-flag-circle {
      margin-left: 34px;
      float: left;
      border: solid 3px red;
      height: 10px;
      width: 10px;
      border-radius: 50%;
    }
  }
}

.btn-goto-orderticket {
  display: none;
  position: absolute;
  bottom: 50px;
  left: 410px;
  font-size: 1.9rem;
  color: white;
  cursor: pointer;
  border: solid 2px #5367b3;
  border-radius: 6px;
  padding: 10px 30px;
}
.btn-goto-orderticket:hover {
  background: #4960b9;
}
.btn-goto-home {
  position: absolute;
  top: -60px;
  right: 50px;
  font-size: 1.9rem;
  color: white;
  cursor: pointer;
  border: solid 1px #4960b9;
  border-radius: 6px;
  padding: 2px 20px;
}
.btn-goto-home:hover {
  background: #4960b9;
}
.ws-message {
  display: none;
  background: gray;
  margin: 20px 0px;
  color: white;
}
.qrcode-pay {
  margin: 0 auto;
  width: 250px;
  height: 250px;
  // border: solid 3px #7d7878;
  padding: 10px;
  border-radius: 5px;
}

.qrcode-pay-desc {
  color: #272626;
  font-size: 3rem;
}

.qrcode-payback {
  margin: 0 auto;
  width: 250px;
  height: 250px;
  // border: solid 3px #7d7878;
  padding: 10px auto;
  border-radius: 5px;
}

.site-show {
  margin-left: 150px;
  margin-right: 50px;
  max-height: 500px;
  overflow: auto;
  .site {
    cursor: pointer;
    height: 80px;
    line-height: 40px;
    clear: both;
    color: white;
    font-size: 1.6rem;
    background: #4d5686;
    padding: 20px 20px;
    margin-bottom: 1px;

    .site-name {
      float: left;
      margin-right: 20px;
    }
    .site-metro-icon {
    }
    .site-metro-name {
      float: left;
    }
  }
}

.lines-show {
  text-align: right;
  margin-left: 150px;
  margin-right: 50px;
  max-height: 500px;
  overflow: auto;
  .line {
    cursor: pointer;
    height: 100px;
    line-height: 100px;
    clear: both;
    color: white;
    font-size: 2.2rem;
    background: #4d5686;
    padding: 5px 20px;
    margin-bottom: 1px;
    .line-index {
      float: left;
      border: solid 1px #fff;
      border-radius: 50px;
      height: 40px;
      line-height: 40px;
      width: 40px;
      text-align: center;
      margin-top: 30px;
      margin-right: 10px;
    }
    .line-bus-key-name {
      float: left;
      margin-right: 20px;
    }

    .line-end-name {
      float: left;
    }
  }
}

.div-current-step {
  width: 100%;
  height: 100%;
  .full-line {
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
  }
  .line0 {
    background-image: url("./../../assets/img/subway/line-full.jpg");
  }
  .line1 {
    background-image: url("./../../assets/img/subway/line1.jpg");
  }
  .line2 {
    background-image: url("./../../assets/img/subway/line2.jpg");
  }
  .line3 {
    background-image: url("./../../assets/img/subway/line3.jpg");
  }
  .showline {
    width: 100%;
    height: 100%;
  }
  .orderticket {
    width: 100%;
    height: 100%;

    .left {
      max-height: 80%;
      width: 50%;
      padding-left: 90px;
      float: left;
      overflow: auto;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .right {
      width: 40%;
      float: left;
      text-align: center;
      border: solid 1px #ddd;
      border-radius: 3px;
      color: white;
      .targetSite {
        height: 120px;
        line-height: 120px;
        font-size: 2.5rem;
        background: #4d5686;
        border-bottom: solid 1px #ddd;
      }
      .ticketCount {
        height: 100px;
        line-height: 100px;
        font-size: 2rem;

        background: #566275;
        border-bottom: solid 1px #ddd;

        .increase {
          cursor: pointer;
          margin-left: 50px;
          font-size: 3rem;
          font-weight: bold;
          color: orangered;
          vertical-align: middle;
        }
        .decrease {
          cursor: pointer;
          margin-right: 50px;
          font-size: 3rem;
          font-weight: bold;
          color: orangered;
          vertical-align: middle;
        }
      }
      .totalFee {
        height: 100px;
        line-height: 100px;
        font-size: 2rem;

        background: #566275;
        border-bottom: solid 1px #ddd;
      }
      .paytype-choose {
        height: 50px;
        line-height: 50px;
        font-size: 1rem;

        background: #4d5686;
        border-bottom: solid 1px #ddd;
      }
      .paytype-list {
        img {
          cursor: pointer;
          width: 80px;
          height: 80px;
          margin: 20px;
        }
      }
    }
  }
}
.show-text {
  border: solid 1px #ddd;
  position: absolute;
  bottom: 0px;
  z-index: 9999;
  background: white;

  width: 100%;
  height: 120px;
  .text {
    color: #252424;
    font-size: 2.2rem;
    margin-left: 150px;
    margin-top: 30px;
  }
}
.home {
  position: relative;
  height: 650px;
}
.content {
  height: 650px;
}

.voice-control {
  .voice-control-btn {
    cursor: pointer;
    margin-left: 10px;
    width: 120px;
    height: 120px;
    border-radius: 120px;
    text-align: center;
    line-height: 120px;
    color: white;
    font-size: 20px;
    font-weight: bold;
    position: fixed;
    bottom: 30%;
  }
  .voice-control-ready {
    background: #ea4e53;
  }
  .voice-control-ready:hover {
    background: #d87e81;
  }

  .voice-control-speaking {
    background: #d3f3f3;

    img {
      width: 120px;
      margin-top: 20px;
    }
  }
}
</style>
