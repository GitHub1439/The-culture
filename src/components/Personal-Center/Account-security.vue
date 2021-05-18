<template>
  <div class="Account-security">
    <!-- <div class="message-column">账号安全</div> -->
    <ul>
      <li class="clearfix">
        <label>账号</label>
        <div class="details">{{ $store.getters.user.username }}</div>
        <div class="btn" @click="AccountOuterVisible = true">修改</div>
      </li>
      <li class="clearfix">
        <label>手机账号</label>
        <div class="details">
          可以使用手机{{ $store.getters.user.mobile | mobile }}登录
        </div>
        <div class="btn" @click="updatePhone">{{$store.getters.userInformation.mobile==null?'未绑定':'已绑定'}}</div>
      </li>
      <li class="clearfix">
        <label>登陆密码</label>
        <div class="details">
          密码要求至少包含字母，符号或数字中的两项且长度超过8
          位，建议您经常修改密码，以保证帐号更加安全。
        </div>
        <div class="btn" @click="passWordOuterVisible = true">修改</div>
      </li>
    </ul>

    <!-- 账号安全 -->
    <el-dialog
      title="修改账号"
      class="change-Account"
      :visible.sync="AccountOuterVisible"
    >
      <div class="input-box">
        <label>账号</label>
        <el-input v-model="form1.value" placeholder="请输入内容"></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="AccountOuterVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 换绑手机号 -->
    <el-dialog
      title="换绑手机号"
      class="change-Account"
      :visible.sync="phoneNumberOuterVisible"
      width="500px"
    >
      
      <div class="input-box clearfix">
        <label>原手机号</label>
        <el-input
          v-model="form2.oldPhoneNumber"
          placeholder="请输入手机号"
        ></el-input>
        <div
          class="getCode"
          :style="
            form2.oldPhoneNumber == ''
              ? 'background: #efefef;color: #bbbbbb;'
              : ''
          "
          @click="getCode"
        >
          {{ codeFlag ? codeNumber : "获取验证码" }}
        </div>
      </div>
      <div class="input-box clearfix">
        <label>短信验证码</label>
        <el-input
          v-model="form2.compareCode"
          placeholder="请输入验证码"
        ></el-input>
      </div>
      <div class="input-box clearfix">
        <label>新手机号</label>
        <el-input
          v-model="form2.newPhoneNumber"
          placeholder="请输入新手机号"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="phoneNumberOuterVisible = false">取 消</el-button>
        <el-button type="primary" @click="amendPhoneNumber">保 存</el-button>
      </div>
    </el-dialog>
    <!-- 修改密码 -->
    <el-dialog
      title="修改密码"
      class="change-Account"
      :visible.sync="passWordOuterVisible"
      width="350px"
    >
      <div class="input-box clearfix">
        <label>原始密码</label>
        <el-input
          show-password
          v-model="form3.oldPassword"
          placeholder="请输入原始密码"
        ></el-input>
      </div>
      <div class="input-box clearfix">
        <label>新密码</label>
        <el-input
          show-password
          v-model="form3.newPassword"
          placeholder="请输入新密码"
        ></el-input>
      </div>
      <div class="input-box clearfix">
        <label>确认密码</label>
        <el-input
          show-password
          v-model="form3.new2Password"
          placeholder="请确认密码"
        ></el-input>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="passWordOuterVisible = false">取 消</el-button>
        <el-button type="primary" @click="amendPassword">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Account-security",
  components: {},
  data() {
    return {
      AccountOuterVisible: false,
      phoneNumberOuterVisible: false,
      passWordOuterVisible: false,
      input: "",
      codeNumber: 60,
      codeFlag: false,
      codeSetInterval: "",
      form1: {
        value: this.$store.getters.userInformation.username,
      },
      form2: {
        oldPhoneNumber: this.$store.getters.userInformation.mobile,
        newPhoneNumber: "",
        compareCode: "",
      },
      form3: {
        oldPassword: "",
        newPassword: "",
        new2Password: "",
      },
      flag:false,
    };
  },
  created() {},
  methods: {
    submit(){
      this.$api.upusers({id:this.$store.getters.userInformation.id,username:this.form1.value}).then(res=>{
          if(res.data.code == 200){
            this.$notify({
                  title: '成功',
                  message: res.data.msg,
                  type: 'success'
                });
                this.AccountOuterVisible = false
                this.$store.getters.user.username = this.form1.value
                this.getUser();
          }
      })
    },
    updatePhone(){
      this.form2.newPhoneNumber='';
      this.form2.compareCode='';
      this.phoneNumberOuterVisible = true
    },
    getCode() {
      if (this.form2.oldPhoneNumber == "") {
        return;
      }
      // 节流阀
      if (this.codeFlag) {
        return;
      }
      if (this.codeNumber == 60) {
        if (!/^1[345678]\d{9}$/.test(this.form2.oldPhoneNumber)) {
          this.$message({
            message: "请输入正确的手机号",
            type: "warning",
          });
          return;
        }
        this.$http
          .get("validata/smsCode/" + this.form2.oldPhoneNumber)
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
    // 修改手机号
    amendPhoneNumber() {
      this.$http
        .post(
          "users/upmobile?mobile=" +
            this.form2.oldPhoneNumber +
            "&newmobile=" +
            this.form2.newPhoneNumber +
            "&code=" +
            this.form2.compareCode
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 获取用户信息
            this.getUser();
            setTimeout(() => {
              this.phoneNumberOuterVisible = false;
            }, 1000);
          } else {
            this.$message({
              showClose: true,
              message: res.data.msg,
              type: "error",
            });
          }
        });
    },
    // 修改密码
    amendPassword() {
      if (this.form3.oldPassword == "") {
        this.$message({
          showClose: true,
          message: "请输入原始密码",
          type: "error",
        });
        return;
      } else if (
        this.form3.newPassword == "" ||
        this.form3.new2Password == ""
      ) {
        this.$message({
          showClose: true,
          message: "请输入密码",
          type: "error",
        });
        return;
      } else if (this.form3.newPassword !== this.form3.new2Password) {
        this.$message({
          showClose: true,
          message: "两次密码不一致",
          type: "error",
        });
        return;
      }
      this.$http
        .post(
          "users/password?username=" +
            this.$store.getters.user.username +
            "&oldpassword=" +
            this.form3.oldPassword +
            "&newpassword=" +
            this.form3.new2Password
        )
        .then((res) => {
          if (res.data.code == 200) {
            this.$message({
              message: "修改成功",
              type: "success",
            });
            // 获取用户信息
            this.getUser();
            setTimeout(() => {
              this.form3 = {};
              this.passWordOuterVisible = false;
              localStorage.clear();
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
    },
    // 获取用户信息
    getUser() {
      this.$http
        .get("users/info/" +this.$store.getters.user.username)
        .then((res) => {
          this.$store.commit("SET_USER", res.data.data); // 设置用户信息
          this.flag=false
        });
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
  filters: {
    mobile(val) {
      if (val) {
        return `${val.substring(0, 2)}*******${val.substring(9)}`;
      }
    },
  },
};
</script>
<style lang="less">
.Account-security {
  float: left;
  background-color: #fff;
  > .message-column {
    padding-left: 40px;
    height: 63px;
    line-height: 63px;
    border-bottom: 1px solid rgba(24, 25, 26, 0.1);
  }
  > ul {
    > li {
      line-height: 33px;
      padding: 22.5px 0;
      margin: 0 40px;
      border-bottom: 1px solid rgba(24, 25, 26, 0.1);
      > label {
        width: 64px;
        margin-right: 64px;
        float: left;
        font-size: 16px;
        color: #999999;
      }
      > .details {
        width: 409px;
        float: left;
        font-size: 16px;
        color: #18191a;
      }
      > .btn {
        cursor: pointer;
        float: right;
        width: 108px;
        height: 34px;
        background: #3d78ff;
        border-radius: 4px;

        text-align: center;
        line-height: 34px;
        font-size: 16px;
        color: #ffffff;
      }
    }
    > li:nth-last-child(1) {
      border: none;
    }
  }
  // 账号修改
  > .change-Account {
    .input-box {
      margin-bottom: 42px;
      > .getCode {
        cursor: pointer;
        width: 124px;
        height: 32px;
        background: #3d78ff;
        border-radius: 4px;
        text-align: center;
        font-size: 14px;
        line-height: 32px;
        color: #fff;
        margin-left: 14px;
      }
      > label {
        width: 70px;
        float: left;
        line-height: 32px;
        margin-right: 14px;
        font-size: 14px;
        color: #666666;
      }
      > div {
        line-height: 32px;
        float: left;
      }
      > .btn {
        margin-left: 16px;
        cursor: pointer;
        width: 88px;
        height: 32px;
        border: 1px solid #bbbbbb;

        font-size: 14px;
        line-height: 32px;
        text-align: center;
        color: #18191a;
      }
      // 输入框
      > .el-input {
        width: 200px;
        .el-input__inner {
          height: 32px;
          line-height: 32px;
        }
        .el-input__icon {
          line-height: 0;
        }
      }
    }
  }
}
</style>