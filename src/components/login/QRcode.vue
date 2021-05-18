<template>
  <div class="QRcode">
    <div id="login_container"></div>
    <!-- <div class="QRcode-cover">湖南教育APP扫描二维码</div> -->
  </div>
</template>

<script>
export default {
  name: "QRcode",
  components: {},
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.$nextTick(() => {
      this.codeLogin();
    });
  },
  methods: {
    codeLogin() {
      var url = encodeURIComponent(
        location.href.match(/(\S*)Login/)[1] + "Login"
      );
      // var url = encodeURIComponent('http://localhost:8080/#/login');
      var demo = encodeURIComponent(
        "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoamacv58smgzy4f58j&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=" +
          url
      );
      var obj = DDLogin({
        id: "login_container",
        goto: demo,
        style: "border:none;background-color:transparent;margin: 0 auto;",
        width: "290px",
        height: "290px"
      });
      var hanndleMessage = function(event) {
        var origin = event.origin;
        if (origin == "https://login.dingtalk.com") {
          //判断是否来自ddLogin扫码事件。
          var loginTmpCode = event.data; //拿到loginTmpCode后就可以在这里构造跳转链接进行跳转了
          var url =
            "https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=dingoamacv58smgzy4f58j&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=REDIRECT_URI&loginTmpCode=" +
            loginTmpCode;
          window.location.href = url;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", hanndleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", hanndleMessage);
      }
      var code = this.$route.query.code;
      var status = this.$route.query.state;
      if (!code) {
        return;
      }
      this.$http
        .post(
          "oauth/dingTalk/token?code=" +
            code +
            "&status=" +
            status +
            "&certificate=1345583303566934018" +
            "&isFreeLogin=0"
        )
        .then(res => {
          if (res.data.code == 200) {
            this.$emit("QRcodeSignIn", res.data);
          } else {
            this.$message({
              message: "扫码登录失败",
              type: "warning"
            });
            setTimeout(() => {
              window.location.replace(
                location.href.match(/(\S*)Login/)[1] + "Login"
              );
            }, 1000);
          }
        });
    }
  },
  watch: {}
};
</script>
<style lang="less">
// 二维码文字遮盖
.QRcode-cover {
  position: absolute;
  top: 265px;
  left: 96px;
  font-size: 14px;
  width: 170px;
  height: 30px;
  line-height: 30px;
  background: #fff;
}
</style>