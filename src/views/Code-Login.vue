<template>
  <div class="change-password-box">
    <Swiper class="swiper" />
    <div class="logo">
      <div class="container">
        <img src="../assets/img/login/logo2.png" alt />
      </div>
    </div>
    <div class="container">
      <div class="swiper-box">
        <!-- <img src="../assets/img/Swiper/01.png" alt /> -->
        <!-- <p>精品资源，在线学习。</p> -->
      </div>
      <div class="Change-Password clearfix">
        <!-- <img src="../assets/img/Swiper/box.png" alt /> -->
        <div class="header-title">
          <div>欢迎登陆</div>
          <span>信息技术应用能力提升2.0一站式研训平台</span>
        </div>
        <QRcode @QRcodeSignIn="QRcodeSignIn" style="margin-left: 40px" />

        <div class="back-box clearfix">
          <router-link tag="div" to="/login" class="back-password"
            >返回</router-link
          >
          <!-- <router-link tag="div" to="/register" class="register" @click="jump(2)">注册</router-link> -->
        </div>
      </div>
    </div>
    <!-- 底部背景 -->
    <!-- <img class="footer-img" src="../assets/img/Swiper/bg.png" alt /> -->
  </div>
</template>

<script>
import Swiper from "@/components/login/Swiper";
import QRcode from "@/components/login/QRcode.vue";
export default {
  name: "Change-Password",
  components: { Swiper, QRcode },
  data() {
    const validatePassword = (rule, value, callback) => {
      if (this.passwordFlag.test(value)) {
        callback();
      } else {
        callback("字母+数字组合,至少包含一个字母和数字,长度控制在8-16位");
      }
    };
    return {
      form: {
        phoneNumber: "",
        code: "",
        passWord: "",
        newPassWord: "",
      },
      rules: {
        phoneNumber: [
          { required: true, message: "请输入手机号", trigger: "blur" },
        ],
        passWord: [
          { required: true, message: "请输入新密码", trigger: "blur" },
          { required: true, validator: validatePassword, trigger: "blur" },
        ],
      },
      passwordFlag: /^(?![^a-zA-Z]+$)(?!\D+$).{8,16}$/, // 密码验证
      codeNumber: 60, // 验证码时长
      codeFlag: false, // 获取验证码
      codeSetInterval: "", // 验证码定时器
      pwdFlag: false, // 密码验证
    };
  },
  created() {},
  methods: {
    // 密码验证
    pwdBlur() {
      var reg = /^(?![^a-zA-Z]+$)(?!\D+$).{8,15}$/;
      if (!reg.test(this.form.passWord)) {
        this.$message({
          message: "字母+数字组合,至少包含一个字母和数字,长度控制在8-15",
          type: "warning",
        });
        this.pwdFlag = false;
        return;
      } else {
        this.pwdFlag = true;
      }
    },
    // 获取证书
    getCertificate() {
      this.$http
        .post("redis/upUserInfoBytoken?certificate=1345583303566934018")
        .then((res) => {
          if (res.data.code == 200) {
            setTimeout(() => {
              if (this.$route.query.redirect) {
                this.$router.push(this.$route.query.redirect);
              } else {
                // this.socket(); //webscoket
                this.$router.push({ path: "/" });
              }
            }, 100);
          } else if (res.data.code == 2020) {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "error",
            });
          } else if (res.data.code == 2030) {
            this.$message({
              showClose: true,
              message: res.data.data,
              type: "error",
            });
          }
        });
    },
    // 表单验证
    submitForm() {
      var flag;
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    // 二维码登录
    QRcodeSignIn(el) {
      this.setUserInformation(el); // 设置用户信息
    },
    // 设置用户信息
    setUserInformation(jsonData) {
      localStorage.setItem("isLogin", true);
      localStorage.setItem("token", jsonData.access_token);
      localStorage.setItem("user", JSON.stringify(jsonData));
      // this.$store.state.login.token = jsonData.access_token;
      this.$store.commit("setIsLogin", true);
      this.$store.commit("SET_USER", jsonData); // 设置用户信息
      this.$http.defaults.headers.common["token"] = jsonData.access_token;
      // 获取证书
      this.getCertificate();
    },
    // 获取验证码
    getCode() {
      if (this.form.phoneNumber == "") {
        return;
      }
      // 节流阀
      if (this.codeFlag) {
        return;
      }
      if (this.codeNumber == 60) {
        if (!/^1[345678]\d{9}$/.test(this.form.phoneNumber)) {
          this.$message({
            message: "请输入正确的手机号",
            type: "warning",
          });
          return;
        }
        this.$http
          .get("validata/smsCode/" + this.form.phoneNumber)
          .then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "发送成功",
                type: "success",
              });

              this.codeFlag = true;
              this.codeSetInterval = setInterval(() => {
                this.codeNumber--;
              }, 1000);
            }
          });
      }
    },
    // 修改密码
    changePassword() {
      if (this.submitForm() !== false) {
        this.$http
          .post(
            "oauth/mombile/password?mobile=" +
              this.form.phoneNumber +
              "&code=" +
              this.form.code +
              "&password=" +
              this.form.passWord
          )
          .then((res) => {
            if (res.data.code == 200) {
              this.$message({
                message: "修改成功",
                type: "success",
              });
              // 跳转登录页面
              setTimeout(() => {
                this.$router.push("/login");
              }, 1000);
            } else {
              this.$message({
                showClose: true,
                message: res.data.msg,
                type: "error",
              });
            }
          });
      }
    },
  },
  mounted() {},
  watch: {
    codeNumber(newV, oldV) {
      if (this.codeNumber == 0) {
        this.codeNumber = 60;
        this.codeFlag = false;
        window.clearTimeout(this.codeSetInterval);
      }
    },
  },
};
</script>
<style lang="less" scoped>
.change-password-box {
  > .swiper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }
  > .logo {
    position: fixed;
    top: 10%;
    left: 30%;
    transform: translate(-50%, -50%);
    img {
      width: 321px;
      height: 52px;
    }
  }
  > .container {
    width: 1200px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    > .swiper-box {
      > img {
        width: 619px;
        height: 327px;
      }
      > p {
        padding-left: 100px;
        font-size: 35px;
        font-weight: 600;
        letter-spacing: 4px;
      }
    }
    .Change-Password {
      z-index: 9;
      position: absolute;
      top: 50%;
      right: 0%;
      transform: translate(0%, -50%);
      width: 496px;
      height: 580px;
      background: #fff;
      border-radius: 12px;
      padding: 0 43px;
      box-sizing: border-box;
      box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.12);
      text-align: left;
      > img {
        position: absolute;
        top: -130px;
        right: -130px;
        width: 226px;
        height: 226px;
      }
      > .header-title {
        margin-bottom: 20px;
        padding: 34px 0 17px 0;
        text-align: left;
        > span {
          opacity: 0.4;
          font-size: 18px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          text-align: left;
          color: #000000;
          letter-spacing: 2px;
        }
        > div {
          font-size: 36px;
          font-family: Microsoft YaHei, Microsoft YaHei-Semibold;
          font-weight: 600;
          text-align: left;
          color: #3d78ff;
          letter-spacing: 4px;
          margin-bottom: 5px;
        }
      }

      > .input-box {
        margin-bottom: 24px;
        > label {
          display: block;
          margin-bottom: 8px;
          font-size: 14px;
          font-weight: 500;
          line-height: 24px;
          color: #262626;
        }
        > .code {
          width: 236px;
        }
        > .getCode {
          cursor: pointer;
          float: right;
          width: 124px;
          height: 42px;
          background: #4444e5;
          border-radius: 4px;
          text-align: center;

          font-size: 14px;
          line-height: 42px;
          color: #fff;
        }
      }

      .demo-ruleForm {
        margin-bottom: 40px;
        > .el-form-item {
          margin-bottom: 25px;
          > .el-form-item__content {
            > label {
              display: block;
              margin-bottom: 8px;
              font-size: 14px;
              font-weight: 500;
              line-height: 24px;
              color: #262626;
            }
            > .el-input {
            }
          }
        }
        > .codeDiv {
          > .el-form-item__content {
            > .el-input {
              width: 236px;
            }
            > .getCode {
              cursor: pointer;
              float: right;
              width: 124px;
              height: 42px;
              background: #3d78ff;
              border-radius: 4px;
              text-align: center;

              font-size: 14px;
              line-height: 42px;
              color: #fff;
            }
          }
        }
      }

      > .Sign_box {
        position: relative;
        > .sign_opacity {
          position: absolute;
          z-index: 9;
          top: 0;
          width: 100%;
          height: 42px;
          opacity: 0.75;
          background: #ffffff;
        }
        > .Sign_in {
          cursor: pointer;
          overflow: hidden;
          margin-top: 24px;
          height: 42px;
          background: #3d78ff;
          border-radius: 4px;
          // box-shadow: 0px 3px 12px 0px rgba(107, 112, 255, 0.38);

          text-align: center;
          font-size: 16px;
          font-weight: 500;
          line-height: 42px;
          color: #fff;
        }
      }
      > .back-box {
        width: 236px;
        height: 51px;
       background: rgba(61,120,255,0.18);
        border-radius: 26px;
        line-height: 51px;
        margin-left: 80px;
        margin-top: 67px;
        text-align: center;
        color: #3d78ff;
        cursor: pointer;
        > .back-passward {
font-size: 16px;
font-family: Microsoft YaHei, Microsoft YaHei-Regular;
font-weight: 400;
text-align: center;
         
        }
      }
    }
  }

  // 底部背景
  > .footer-img {
    position: fixed;
    z-index: -1;
    bottom: 0;
    height: 20%;
    width: 100%;
  }
}
</style>