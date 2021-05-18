<template>
  <div class="Personal-information">
    <div class="message-column">
      <div>
        <img src="../../assets/img/Personal-Center/t-06.png" alt="" />
      </div>
      个人信息
      <!-- <div class="edit" @click="editUser">{{ edit ? "保存" : "编辑" }}</div> -->
    </div>
    <ul v-if="!edit">
      
      <li class="clearfix">
        <label>用户名</label>
        <div class="details" v-if="!editNickname">{{ $store.getters.userInformation.nickname }}</div>
        <el-input
          class="input"
          maxlength="5"
          v-model="form.nickname"
          width="200"
          placeholder="请输入内容"
          v-if="editNickname"
        ></el-input>
        <div class="btn" @click="updateNickname">{{editNickname?'保存':'修改'}}</div>
      </li>
      <li class="clearfix">
        <label>性别</label>
        <div class="details" v-if="!editSex">
          {{$store.getters.userInformation.sex == 1?'男':$store.getters.userInformation.sex == 0?'女':'保密'}}
        </div>
        <el-radio-group v-model="form.sex"  v-if="editSex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
          <el-radio label="2">保密</el-radio>
        </el-radio-group>
        <div class="btn" @click="updateSex" >{{editSex?'保存':'修改'}}</div>
      </li>
      <li class="clearfix">
        <label>证件号码</label>
        <div class="details" v-if="!editNum">{{ $store.getters.userInformation.identityCard }}</div>
        <el-form ref="form" :model="form" :rules="rule1" v-else width="200">
            <el-form-item prop="identityCard">
              <el-input  class="input" v-model="form.identityCard"  width="200"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn need-bind" @click="updateNum" >{{editNum?'保存':((form.identityCard!==null ||form.identityCard!=="" )?'已绑定':'未绑定')}}</div>
      </li>
      <li class="clearfix">
        <label>邮箱地址</label>
        <div class="details" v-if="!editEmail">{{ $store.getters.userInformation.mailbox }}</div>
         <el-form ref="form" :model="form" :rules="rule2" v-else width="200">
            <el-form-item prop="mailbox">
              <el-input  class="input" v-model="form.mailbox" width="200"></el-input>
            </el-form-item>
        </el-form>
        <div class="btn need-bind" @click="updateEmail" >{{editEmail?'保存':((form.mailbox==null || form.mailbox=="")?'未绑定':'已绑定')}}</div>
      </li>
    </ul>
    <ul v-if="edit">
     
      <!-- <li class="clearfix">
        <label>用户名</label>
        <div class="details">{{$store.getters.userInformation.username}}</div>
      </li>-->
      <li class="clearfix">
        <label>姓名</label>
        <!-- <div class="details">{{$store.getters.userInformation.nickname}}</div> -->
        <el-input
          class="input"
          maxlength="5"
          v-model="form.nickname"
          width="200"
          placeholder="请输入内容"
        ></el-input>
      </li>
      <li class="clearfix">
        <label>性别</label>
        <el-radio-group v-model="form.sex">
          <el-radio label="1">男</el-radio>
          <el-radio label="0">女</el-radio>
          <el-radio label="2">保密</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <AccountSecurity style="width: 100%" />
  </div>
</template>

<script>
import AccountSecurity from "./Account-security.vue";
export default {
  name: "Personal-information",
  components: {
    AccountSecurity,
  },
  data() {

    var validateEmail = (rule, value, callback) => {
      console.log(value)
      if (value === "") {
        callback(new Error("请正确填写邮箱"));
      } else {
        if (value !== "") {
          var reg = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
          if (!reg.test(value)) {
            callback(new Error("请输入有效的邮箱"));
          }
        }
        callback();
      }
    };
        const checkIDCard = (rule, value, callback) => {
      const IDCardReg = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[0-2])(([0-2][1-9])|10|20|30|31)\d{3}(\d|X|x)$/
      // const sfzhReg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
      if (value) {
        if (IDCardReg.test(value)) {
          callback()
        } else {
          callback(new Error('身份证号格式不正确'))
        }
      } else {
        callback(new Error('请输入身份证号'))
      }
    }
    return {
      edit: false,
      editNickname:false,
      editSex:false,
      editNum:false,
      editEmail:false,
      imageUrl: this.$store.getters.userInformation.headImgUrl,
      form: {
        headImgUrl: this.$store.getters.userInformation.headImgUrl, // 头像
        sex: this.$store.getters.userInformation.sex + "", // 1表示男 0表示女，2保密
        nickname: this.$store.getters.userInformation.nickname,
        username: this.$store.getters.userInformation.username,
        identityCard:this.$store.getters.userInformation.identityCard,
        mailbox:this.$store.getters.userInformation.mailbox
      },
      rule1: {
          identityCard: [
            { required: true, message: '请输入身份证号', trigger: 'blur' },
             { validator: checkIDCard, trigger: 'blur' }
          ],
      },
      rule2: {
          mailbox: [
            { required: true, validator: validateEmail, trigger: "blur" }

          ],
      },
    };
  },
  created() {
    // 获取用户信息
    this.getUser();
  },
  methods: {
    
    // 图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      let formData = new FormData();
      formData.append("file", file.raw);
      this.form.headImgUrl = res.data[0].addr; // 获取头像
    },
    // 限制图片大小和格式
    beforeAvatarUpload(file) {
      const isJPG =
        file.type === "image/png" ||
        file.type === "image/jpg" ||
        file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    updateInfomation(data){
      let obj = {
        id:this.$store.getters.userInformation.id,
        nickname:data.nickname,
        sex:data.sex,
        identityCard:data.identityCard,
        mailbox:data.mailbox,
        
      }
      this.$api.upusers(obj).then(res=>{
          if(res.data.code == 200){
            this.$notify({
                  title: '成功',
                  message: res.data.msg,
                  type: 'success'
                });
                this.getUser();
                this.editNickname = false;
                this.editEmail = false;
                 this.editNum = false;
                  this.editSex = false;
          }else{
            this.$notify({
                  title: '失败',
                  message: res.data.msg,
                  type: 'error'
                });
          }
      })
    },
    // 修改用户名
    updateNickname(){
          if(this.editNickname){
              
              this.updateInfomation({
              nickname:this.form.nickname,
            })
            // 
          }else{
            
            this.editNickname = true;

          }
    },
    // 修改性别
    updateSex(){
      if(this.editSex){
             
              this.updateInfomation({
              sex:this.form.sex,
            })
          }else{
            this.editSex = true;
          }
    },
    updateNum(){
      if(this.editNum){
             
              this.updateInfomation({
              identityCard:this.form.identityCard,
            })
          }else{
            this.editNum = true;
          }
    },
    updateEmail(){
      if(this.editEmail){
              
              this.updateInfomation({
              mailbox:this.form.mailbox,
            })
          }else{
            this.editEmail = true;
          }
    },
    // 用户编辑
    editUser() {
      if (this.edit) {
        this.$http.post("users/user", this.form).then((res) => {
          if (res.data.code == 200) {
            this.getUser(); // 获取用户信息
            this.$notify({
              title: "成功",
              message: "保存成功",
              type: "success",
            });
          } else {
            this.$notify.error({
              title: "错误",
              message: "修改失败",
            });
          }
        });
      }
      this.edit = !this.edit;
    },
    // 获取用户信息
    getUser() {
      this.$http
        .get("users/info/" + this.$store.getters.user.username)
        .then((res) => {
          this.$store.commit("SET_USER_INFORMATION", res.data.data); // 设置用户信息
        });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.Personal-information {
  float: left;
  width: 944px;
  background-color: #fff;
  min-height: 799px;
  text-align: left;
  > .message-column {
    padding: 0 40px;
    height: 63px;
    line-height: 63px;
    border-bottom: 1px solid rgba(24, 25, 26, 0.1);
    text-align: left;
    font-weight: 600;
    > div:nth-child(1) {
      margin-right: 11px;
      float: left;
      position: relative;
      top: 13px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #ebf2ff;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18px;
        height: 18px;
      }
    }
    > .edit {
      cursor: pointer;
      float: right;
      font-size: 16px;
      color: #3d78ff;
    }
  }
  > ul {
    padding-top: 24px;
    > li {
      padding: 22.5px 0;
      margin: 0 40px;
      border-bottom: 1px solid rgba(24, 25, 26, 0.1);
      position: relative;
      > label {
        display: inline-block;
        width: 64px;
        margin-right: 64px;
        float: left;
        font-size: 16px;
        color: #999999;
        line-height: 40px;
      }
      > img {
        width: 106px;
        height: 106px;
        border-radius: 50%;
      }
      > .details {
        width: 409px;
        float: left;
        font-size: 16px;
        color: #18191a;
        line-height: 40px;
      }
      >.need-bind{
        position: absolute;
        top: 30px;
        right: 0;
      }
      >.btn{
        width: 109px;
        height: 40px;
        opacity: 1;
        transition: all .3s ease;
        background: #f0f0f0;
        float: right;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        line-height: 40px;
        color: #18191a;
        cursor: pointer;
        border-radius: 5px;
        &:hover{
          color: #fff;
          
          background: rgb(29, 119, 253);
        }
      }
      /deep/ .el-form-item{
        margin-bottom: 0;
      }
       .el-input {
        width: 320px;
        height: 40px;
      }
      .el-radio-group {
        margin-top: 13px;
      }
    }
  }
}
</style>