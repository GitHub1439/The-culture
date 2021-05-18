<template>
  <div class="Map">
    <!-- top -->
    <div class="top"></div>
    <div class="middle">
      <div>
        <table></table>
        <div class="punctuation1">“</div>
        <div class="line1">您好！欢迎开启学习地图</div>
        <div class="line2">您的学习过程一共有四个阶段，请尽快完成学习！</div>
        <div class="punctuation2">”</div>
      </div>
    </div>
    <div class="map">
      <table></table>
      <div class="line">
        <ul>
          <li
            v-for="(item, index) in phase"
            :key="index"
            :class="{
              first: index == 0,
              second: index == 1,
              third: index == 2,
              fourth: index == 3,
              studyed: item.isshow == true,
            }"
          >
            <div
              class="plane"
              :class="
                index == 0
                  ? 'fly1'
                  : index == 1
                  ? 'fly2'
                  : index == 2
                  ? 'fly3'
                  : 'fly4'
              "
            >
              <img
                src="../assets/img/map/fly-true.png"
                v-if="item.isshow == true"
                alt=""
              />

              <img src="../assets/img/map/fly-false.png" v-else alt="" />
            </div>

            <div
              class="mark"
              :class="
                index == 0
                  ? 'mark-box-1'
                  : index == 1
                  ? 'mark-box-2'
                  : index == 2
                  ? 'mark-box-3'
                  : 'mark-box-4'
              "
            >
              <img
                class="unarrive"
                src="../assets/img/map/unarrive.png"
                alt=""
                v-if="item.isshow == false"
              />
              <img
                class="arrived"
                v-else-if="item.isshow == true && item.tag !== 0"
                src="../assets/img/map/arrived.png"
                alt=""
              />
              <img
                v-else
                class="coordinates"
                src="../assets/img/map/coordinates.png"
                alt=""
              />
              <div>
                您目前处于第{{
                  index == 0
                    ? "一"
                    : index == 1
                    ? "二"
                    : index == 2
                    ? "三"
                    : "四"
                }}阶段
              </div>
            </div>
            <div class="data">
              <div class="num">0{{ index + 1 }}</div>
              <div class="info">
                <div>
                  {{
                    index == 0
                      ? "完善个人中心"
                      : index == 1
                      ? "普遍性学习"
                      : index == 2
                      ? "提交作业"
                      : "申请结业"
                  }}
                </div>
                <div class="second" v-if="index == 1 || index == 2">
                  {{ index == 1 ? "学习40堂课程" : "一份毕业成果" }}
                </div>
              </div>
              <div class="btn">
                <div @click="jump(5)" v-if="index == 0">
                  {{ item.tag == 0 ? "立即完善" : "修改信息" }}
                </div>
                <div @click="item.isshow==true?jump(null):''" v-if="index == 1">立即学习</div>
                <div v-if="index == 2" @click="submit(item)">
                  {{ item.tag == 0 ? "立即提交" : "查看作品" }}
                </div>
                <div v-if="index == 3" @click="applyForCertificate(item)">
                  {{
                    item.tag == 0
                      ? "立即申请"
                      : item.tag == 1
                      ? "正在审核"
                      : item.tag == 2
                      ? "审核通过"
                      : "审核未过"
                  }}
                </div>
              </div>
            </div>
          </li>
        </ul>
        <!-- <div class="start-title">开始你的学习之旅吧！</div> -->
        <img class="start" src="../assets/img/map/start.png" alt="" />

        <img
          v-if="phase[3].isshow"
          class="end_see"
          src="../assets/img/map/end_see.png"
          alt=""
        />
        <img
          v-else
          class="end_unsee"
          src="../assets/img/map/end_unsee.png"
          alt=""
        />
      </div>
    </div>
    <!-- 未到提交作业时间弹框 -->
    <el-dialog
      title="温馨提示"
      :visible.sync="TimeVisible"
      width="20%"
      center
      class="time_dialog"
    >
      <img class="clock" src="../assets/img/map/clock.png" alt="" />
      <div class="timeOut">还未到提交作业时间 暂时不能提交</div>
    </el-dialog>
    <!-- 提交作业弹框 -->
    <el-dialog
      :visible.sync="UpdateVisible"
      width="40%"
      center
      class="update_dialog"
    >
      <div class="update_body">
        <div class="title">
          发布作品<span
            >*请上传1个作品，作品质量将影响平台对您的审核和闯关进度</span
          >
        </div>
        <el-upload
          :action="`http://wj.hnedu123.cn:9099/file/handelResource`"
          list-type="picture-card"
          :headers="headers"
          :on-remove="handleRemove"
          :on-success="fileHandleAvatarSuccess"
          :before-upload="fileBeforeAvatarUpload"
          :limit="1"
          :file-list="ruleForm.resourceInfoAddr"
          :on-exceed="fileLimite"
        >
          <i slot="default" class="el-icon-plus"></i>
          <div slot="file">
            <img
              class="el-upload-list__item-thumbnail"
              :src="changeImg"
              alt=""
            />
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)"
              >
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove"
              >
                <i class="el-icon-delete"></i>
              </span>
            </span>
          </div>
        </el-upload>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
          class="demo-ruleForm"
          style="margin-top: 20px"
        >
          <el-form-item label="作品标题" prop="resourceInfoName">
            <el-input v-model="ruleForm.resourceInfoName"></el-input>
          </el-form-item>
          <el-form-item label="作品分类" prop="resourceTypeIdFk">
            <el-select
              v-model="ruleForm.resourceTypeIdFk"
              placeholder="请选择作品分类"
            >
              <el-option
                v-for="(item, index) in classification"
                :key="index"
                :label="item.resourceTypeName"
                :value="item.resourceTypeId"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="作品简介" prop="resourceInfoDescription">
            <el-input
              type="textarea"
              v-model="ruleForm.resourceInfoDescription"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="update_btn" @click="submitResource">提交</div>
    </el-dialog>

    <!-- 审核未过弹框 -->
    <el-dialog
      :visible.sync="failureVisible"
      width="45%"
      center
      class="failure_dialog"
    >
      <div class="failure_body" v-if="phase[2].tag == 3">
        <img src="../assets/img/map/shibai.png" alt="" />
        <table></table>
        <p>
          抱歉!<br />
          <span>您的作品未审核通过 请重新提交</span>
        </p>
      </div>
      <div class="failure_body" v-if="phase[2].tag == 2">
        <img src="../assets/img/map/access.png" alt="" />
        <table></table>
        <p>恭喜你，你的作品通过审核！</p>
      </div>
      <div class="failure_body" v-if="phase[2].tag == 1">
        <img src="../assets/img/map/appvaling.png" alt="" />
        <table></table>
        <p>您的申请正在审核中</p>
        <div class="info">审核通过之后 会以短信形式通知， 请注意查收！</div>
      </div>
      <el-form :model="ruleForm" label-width="200px" style="margin-top: 20px">
        <el-form-item label="作品标题">
          <el-input v-model="ruleForm.resourceInfoName" disabled></el-input>
        </el-form-item>
        <el-form-item label="作品分类">
          <el-select v-model="ruleForm.resourceTypeIdFk" disabled>
            <el-option
              v-for="(item, index) in classification"
              :key="index"
              :label="item.resourceTypeName"
              :value="item.resourceTypeId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="作品简介">
          <el-input
            type="textarea"
            v-model="ruleForm.resourceInfoDescription"
            disabled
          ></el-input>
        </el-form-item>
      </el-form>

      <el-button
        type="primary"
        size="large"
        @click="handelDetails(phase[2].tag)"
      >
        {{ phase[2].tag == 1 || phase[2].tag == 2 ? "确定" : "再次提交" }}
      </el-button>
    </el-dialog>

    <el-dialog
      title="请完成以下课程"
      :visible.sync="centerDialogVisible"
      width="80%"
      center
    >
      <div class="body">
        <div class="title">
          教研课程
          <span>共计{{ videoList.length }}门课程</span>
        </div>
        <ul>
          <li
            v-for="(item, index) in videoList"
            :key="index"
            @click="courseJump(item)"
          >
            <img :src="item.courseLogo" alt />
            <div>
              <div class="video-title">{{ item.courseName | courseName }}</div>
              <div
                class="video-label"
                :class="
                  item.label == 0
                    ? 'primary'
                    : item.label == 1
                    ? 'success'
                    : item.label == 2
                    ? 'danger'
                    : 'orange'
                "
              >
                <span>{{
                  item.label == 0
                    ? "专家讲座"
                    : item.label == 1
                    ? "案例学习"
                    : item.label == 2
                    ? "任务驱动"
                    : "参与式培训"
                }}</span>
              </div>
            </div>

            <ul>
              <li>主讲老师|{{ item.lecturerName | teacher }}</li>
              <li
                v-html="`学习进度：${$options.filters.percentageFilters(item)}`"
              ></li>
            </ul>
          </li>
        </ul>
      </div>
    </el-dialog>
    <!-- 查看上传作品-->
    <el-dialog
      :visible.sync="dialogSee"
      width="50%"
      height="50%"
      center
      class="dialog_see"
    >
      <Preview :key="key" :obj="data" />
    </el-dialog>
  </div>
</template>
<script>
import Preview from "../components/dialog/map_resource";
export default {
  components: {
    Preview,
  },
  data() {
    return {
      key: 1,
      data: {
        resourceFormatIdFk: "", //组件传值
        resourceAddr: "",
      },
      centerDialogVisible: false, //课程弹窗列表
      TimeVisible: false,
      UpdateVisible: false,
      AuditVisible: false,
      failureVisible: false,
      dialogSee: false,
      ruleForm: {
        workspaceId: "",
        resourceInfoName: "", //资源名称
        resourceInfoDescription: "", // 简介
        resourceSize: "", //资源大小
        resourceInfoAddr: [], // 资源地址
        resourceInfoPhysicsAddr: "", //  资源物理地址  磁盘路径
        uploadType: 1, // 0 大赛资源  1 工作室资源  2平台资源
        originality: 3, // 1 原创可下载  2 原创不可下载  3非原创
        type: "", // 资源格式名称
        resourceTypeIdFk: '', //  资源类型ID外键
        catalogInfoIdFk: 0, //章节外键
        resourceDisplay: 1, //国标资源
      },
      changeImg: "",
      timer: "",//按钮节流
      headers: {
        token: this.$store.getters.user.access_token,
      },
      disabled: false,
      rules: {
        resourceInfoDescription: [
          { required: true, message: "请输入资源简介", trigger: "blur" },
        ],
        resourceInfoName: [
          { required: true, message: "请输入资源名称", trigger: "blur" },
        ],
        resourceTypeIdFk: [
          { required: true, message: "请选择作品分类", trigger: "change" },
        ],
      },
      classification: [], //分类列表
      // 阶段数据
      phase: [],
      videoList: [],
      timer: null,
      resourceFlag: false, //资源预览开关，为true时才可点击预览
    };
  },
  methods: {
    // 课程跳转
    courseJump(item) {
      if (item.tutorialMode == 0) {
        window.open(item.baseUrl);
      } else {
        this.$router.push({
          path: "/CourseDetails",
          query: { courseId: item.id },
        });
      }
    },
    jump(index) {
      if (index !== null) {
        this.$router.push({
          path: "/Personal-Center",
          query: { columnIndex: index },
        });
      } else {

        this.$router.push({ path: "/TheResearchResources" });
      }
    },
    // 申请证书
    applyForCertificate(item) {
      if (item.isshow) {
        let that = this;
        if (item.tag == 0) {
          this.timer = setTimeout(() => {
            that.$api.applyForCertificate().then((res) => {
              if (res.data.code == 200) {
                that.$notify({
                  title: "成功",
                  message: "申请成功",
                  type: "success",
                });
                that.getStage();
              }
            });
          }, 2000);
        }
        if (item.tag == 3) {
          this.$alert("是否再次提交申请", {
            confirmButtonText: "确定",
            callback: (action) => {
              this.timer = setTimeout(() => {
                that.$api.applyForCertificate().then((res) => {
                  if (res.data.code == 200) {
                    that.$notify({
                      title: "成功",
                      message: "申请成功",
                      type: "success",
                    });
                    that.getStage();
                  }
                });
              }, 2000);
            },
          });
        }
      }
    },
    // 提交作品
    submit(item) {
      // 如果已经到达该状态
      if (item.isshow) {
        // 判断时间是否在提交作业时间区间内
        let timeFlag =
          new Date().getTime() >= new Date(item.submitJobTime).getTime();
        // 如果状态为时间未到
        if (!timeFlag) {
          this.TimeVisible = true;
        } else {
          // 否则如果状态为立即提交
          if (item.tag == 0) {
            //  弹出提交作品弹窗
            this.findIdByAreaAndType();
            this.UpdateVisible = true;
          } else {
            //  否则
            this.failureVisible = true;
            this.getResource(item.resourceId)
          }
          //  正在审核
          //  if(item.tag == 1 ){
          //  this.failureVisible= true;
          //  }
          // //  审核未过
          //  if(item.tag == 3 ){
          //    this.failureVisible= true;
          //   }
        }
        // this.AuditVisible= true;
      }
    },
    // 表单验证
    submitForm() {
      var flag;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          flag = true;
        } else {
          flag = false;
        }
      });
      return flag;
    },
    // 提交作品
    submitResource() {
      let that = this;
      if (this.submitForm()) {
        // 资源地址  判断上传了文件没
        if (this.ruleForm.resourceInfoAddr.length == 0) {
          this.$notify({
            title: "警告",
            message: "请上传资源文件",
            type: "warning",
          });
          return;
        } else {
          this.ruleForm.resourceInfoAddr = this.ruleForm.resourceInfoAddr[0] 
          clearTimeout(this.timer);
          that.timer = setTimeout(function () {
            that.$api.workspaceResource(that.ruleForm.workspaceId,that.ruleForm).then((res) => {
              if(res.data.code == 200){
                  that.$notify({
            title: "成功",
            message: "作业提交成功",
            type: "success",
          });
          that.UpdateVisible = false;
          that.addUserWorks(res.data.data)
              }
            });
          }, 1000);
        }
      }
    },
    // 保存资源id
    addUserWorks(resourceId){
      let userData = {
        userId:this.$store.getters.user.id,
        resourceId:resourceId,
        auditState:1
      }
      this.$api.addUserWorks(userData).then(res=>{

      })
    },
    // 获取资源详情
    getResource(resourceId){
      this.$api.findById(resourceId).then(res=>{
        if(res.data.code = 200)
            this.ruleForm = res.data.data;
      })
    },
    // 获取工作室workspaceid
    findIdByAreaAndType() {
      this.$api.findIdByAreaAndType().then((res) => {
        if (res.data !== 0) {
          console.log(res);
          this.ruleForm.workspaceId = res.data;
        }
      });
    },
    // 第三阶段查看提交进度弹框按钮操作
    handelDetails(tag) {
      if (tag == 1) {
        this.failureVisible = false;
      } else if (tag == 2) {
        this.failureVisible = false;
      } else {
        this.failureVisible = false;
        this.UpdateVisible = true;
        this.resourceFlag = false;
      }
    },
    // 控制上传类型
    fileBeforeAvatarUpload(file) {
      var flag = true;
      if (
        file.name.split(".")[1] == "png" ||
        file.name.split(".")[1] == "jpg"
      ) {
        this.changeImg = require("../assets/img/map/fileType/8.png");
        this.data.resourceFormatIdFk = 8;
      } else if (file.name.split(".")[1] == "mp4") {
        this.changeImg = require("../assets/img/map/fileType/6.png");
        this.data.resourceFormatIdFk = 6;
      } else if (file.name.split(".")[1] == "mp3") {
        this.changeImg = require("../assets/img/map/fileType/7.png");
        this.data.resourceFormatIdFk = 7;
      } else if (
        file.name.split(".")[1] == "doc" ||
        file.name.split(".")[1] == "docx"
      ) {
        this.changeImg = require("../assets/img/map/fileType/4.png");
        this.data.resourceFormatIdFk = 4;
      } else if (
        file.name.split(".")[1] == "xls" ||
        file.name.split(".")[1] == "xlsx"
      ) {
        this.changeImg = require("../assets/img/map/fileType/5.png");
        this.data.resourceFormatIdFk = 3;
      } else if (file.name.split(".")[1] == "txt") {
        this.changeImg = require("../assets/img/map/fileType/1.png");
        this.data.resourceFormatIdFk = 1;
      } else if (
        file.name.split(".")[1] == "ppt" ||
        file.name.split(".")[1] == "pptx"
      ) {
        this.changeImg = require("../assets/img/map/fileType/2.png");
        this.data.resourceFormatIdFk = 2;
      } else if (
        file.name.split(".")[1] == "rar" ||
        file.name.split(".")[1] == "zip"
      ) {
        this.changeImg = require("../assets/img/map/fileType/9.png");
        this.data.resourceFormatIdFk = 0;
      } else if (file.name.split(".")[1] == "pdf") {
        this.changeImg = require("../assets/img/map/fileType/12.png");
        this.data.resourceFormatIdFk = 5;
      } else {
        this.changeImg = require("../assets/img/map/fileType/10.png");
        this.data.resourceFormatIdFk = 10;
      }
      if (!flag) {
        this.$notify({
          title: "警告",
          message: `系统暂不支持此格式上传，支持格式（${fileType}）`,
          type: "warning",
        });
      }
      return flag;
    },
    // 超出限制
    fileLimite(files, fileList) {
      this.$notify({
        title: "警告",
        message: "上传文件超出限制",
        type: "warning",
      });
    },
    handleRemove(file, fileList) {
      this.ruleForm.resourceInfoAddr = [];
      this.$api
        .handleFlieResourcesDelete({
          path: this.ruleForm.resourceInfoPhysicsAddr,
        })
        .then((res) => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "删除磁盘文件成功",
              type: "success",
            });
            this.resourceFlag = false;
          }
        });
    },
    // 查看文件
    handlePictureCardPreview() {
      if (this.resourceFlag) {
        this.key++;
        console.log(this.ruleForm.resourceInfoAddr[0]);
        this.data.resourceAddr = this.ruleForm.resourceInfoAddr[0];
        // this.dialogImageUrl = file.url;
        this.dialogSee = true;
      }
    },
    // 上传的文件
    fileHandleAvatarSuccess(res, file) {
      if (res.code == 200) {
        this.$notify({
          title: "成功",
          message: "上传成功",
          type: "success",
        });
        console.log(res);

        (this.ruleForm.resourceSize = res.data[0].size), //资源大小
          (this.ruleForm.resourceInfoPhysicsAddr = res.data[0].absolutePath), //  资源物理地址  磁盘路径
          (this.ruleForm.type = res.data[0].type), // 资源格式名称
          this.$http
            .post(`http://wj.hnedu123.cn:9099/onlineFile/Online`, {
              resourceUrl: res.data[0].absolutePath,
            })
            .then((res) => {
              this.ruleForm.resourceInfoAddr[0] = res.data.data.fileAddress;
              this.data.resourceAddr = this.ruleForm.resourceInfoAddr[0];
              console.log(this.ruleForm.resourceInfoAddr[0]);
              this.resourceFlag = true;
            });
      } else {
        this.$notify({
          title: "警告",
          message: "上传失败",
          type: "warning",
        });
      }
    },
    // 获取阶段
    getStage() {
      this.$api.stage().then((res) => {
        this.phase = res.data.data;
      });
    },
    // 获取分类列表
    getClassification() {
      this.classification = [];
      this.$api.findTypeAll().then((res) => {
        if (res.data.code == 200) {
          res.data.data.forEach((item, i) => {
            if (item.resourceTypeId !== null) {
              this.classification.push(item);
            }
          });
        }
      });
    },
    // 获取阶段课程列表
    getStageCourse(stageid) {
      this.$api.stageCourse(stageid).then((res) => {
        if (res.data.code == 200) {
          this.centerDialogVisible = true;
          this.videoList = res.data.data;
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "warning",
          });
        }
      });
    },
  },
  mounted() {
    this.getStage();
    this.getClassification();
  },
  watch: {},
  filters: {
    courseName(val) {
      if (val.length > 13) {
        return `${val.substring(0, 12)}...`;
      } else {
        return val;
      }
    },
    teacher(val) {
      if (val.length > 3) {
        return `${val.substring(0, 3)}...`;
      } else {
        return val;
      }
    },
    percentageFilters(val) {
      if (val) {
        if (val.studyTime == 0) {
          return `<span style="color:red;">${0}%</span>`;
        } else {
          var data = parseFloat(
            Math.round((val.studyTime / val.videoLength) * 10000) / 100.0
          );
          if (data > 100) {
            data = 100;
            return `<span style="color:green;">${data}%</span>`;
          }
          return `<span style="color:red;">${data}%</span>`;
        }
      }
    },
    studyTime(val) {
      let time = Math.round(val / 1000 / 60 / 60);
      return time;
    },
  },
};
</script>

<style lang="less" scoped>
.Map {
  > .top {
    height: 270px;
    background: url("../assets/img/map/top.png") no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
  }
  > .middle {
    height: 172px;
    background: #174b80;

    > div {
      color: #fff;
      width: 963px;
      height: 100px;
      text-align: center;
      margin: 0 auto;
      position: relative;
      > div {
        text-align: left;
        font-size: 32px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        color: #ffffff;
        margin-left: 150px;
      }
      > .line1 {
        margin-top: 39px;
        width: 395px;
        margin-bottom: 15px;
      }
      > .line2 {
        width: 744px;
      }
      > .punctuation1 {
        position: absolute;
        font-size: 130px;
        top: 10px;
        left: -150px;
      }
      > .punctuation2 {
        font-size: 130px;
        margin-top: -20px;
        float: right;
      }
    }
  }
  > .map {
    height: 2435px;
    background: url("../assets/img/map/map-bg.png") no-repeat;
    background-size: 100% 100%;
    background-position: 100% 100%;
    margin: 0 auto;
    text-align: center;
    > .line {
      width: 597px;
      height: 1777px;
      background: url("../assets/img/map/line.png") no-repeat;
      background-size: 100% 100%;
      background-position: 100% 100%;
      margin: 160px 0 0 30%;
      position: relative;
      > .start {
        width: 175px;
        height: 152px;
        margin-top: -103px;
        margin-left: -30px;
        cursor: pointer;
      }
      // >.start-title{
      //   margin-left: 460px;
      // }
      > .end_see,
      .end_unsee {
        width: 296px;
        height: 244px;
        position: absolute;
        bottom: -100px;
        left: -60px;
      }

      > ul {
        width: 520px;
        position: absolute;
        right: -292px;
        > .first {
          margin-top: 198px;
        }
        > .second {
          margin-top: 270px;
          margin-left: -450px;
        }
        > .third {
          margin-top: 208px;
          margin-left: -120px;
        }
        > .fourth {
          margin-top: 293px;
          margin-left: -450px;
        }
        > .studyed {
          background: linear-gradient(282deg, #60b8f7 0%, #2152db 100%);
          > .data {
            .btn {
              background: #7db3ef;
              width: 122px;
              height: 159px;
              font-size: 32px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              cursor: pointer;
              color: #2f68e1;
              display: inline-block;
              vertical-align: middle;
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
              -moz-osx-font-smoothing: grayscale;
              position: relative;
              -webkit-transition-property: color;
              transition-property: color;
              -webkit-transition-duration: 0.3s;
              transition-duration: 0.3s;
              &:focus,
              &:hover,
              &:active {
                color: white;
              }
              &:focus:before,
              &:hover:before,
              &:active:before {
                -webkit-transform: scale(1);
                transform: scale(1);
              }
              &:before {
                content: "";
                position: absolute;
                z-index: -1;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: #2f68e1;
                -webkit-transform: scale(0);
                transform: scale(0);
                -webkit-transition-property: transform;
                transition-property: transform;
                -webkit-transition-duration: 0.3s;
                transition-duration: 0.3s;
                -webkit-transition-timing-function: ease-out;
                transition-timing-function: ease-out;
              }
            }
          }
        }

        > li {
          width: 520px;
          height: 159px;

          background: #999999;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          position: relative;
          > .plane {
            position: absolute;
            width: 81px;
            height: 82px;
            > img {
              width: 100%;
              height: 100%;
            }
          }
          > .fly1 {
            left: -105px;
            top: 310px;
            transform: rotate(-35deg);
          }
          > .fly2 {
            right: -90px;
            top: 235px;
            transform: rotate(0deg);
          }
          > .fly3 {
            left: -55px;
            top: 310px;
            transform: rotate(-150deg);
          }
          > .fly4 {
            right: 100px;
            top: 280px;
            transform: rotate(0deg);
          }
          > .mark-box-1 {
            left: -105px;
            top: 20px;
          }
          > .mark-box-2 {
            right: -90px;
            top: -90px;
          }
          > .mark-box-3 {
            left: -55px;
            top: -110px;
          }
          > .mark-box-4 {
            right: -55px;
            top: -126px;
          }
          > .mark {
            position: absolute;
            // &:hover{
            //     >div{
            //       display: block;
            //     }
            // }
            .coordinates:hover + div {
              display: block;
            }
            > div {
              position: absolute;
              width: 366px;
              height: 60px;
              background: rgba(0, 0, 0, 0.83);
              font-size: 20px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              text-align: center;
              color: #ffffff;
              line-height: 60px;
              border-radius: 20px;
              z-index: 88;
              left: -130px;
              bottom: -90px;
              display: none;
              &:before {
                position: relative;
                top: -53px;
                left: 80px;
                content: "";
                border-width: 0 10px 10px 10px;
                border-style: solid;
                border-color: transparent transparent rgba(0, 0, 0, 0.83)
                  transparent;
              }
            }
            > img {
              width: 64px;
              height: 101px;
            }
            > .unarrive {
              // display: none;
            }
            > .arrived {
              // display: none;
            }
            > .coordinates {
              width: 86px;
              height: 145px;
              margin-top: -45px;
              -webkit-transform: translateZ(0);
              transform: translateZ(0);
              box-shadow: 0 0 1px rgba(0, 0, 0, 0);
              -webkit-backface-visibility: hidden;
              backface-visibility: hidden;
              -moz-osx-font-smoothing: grayscale;
              -webkit-transition-duration: 0.5s;
              transition-duration: 0.5s;
              cursor: pointer;
              &:focus,
              &:hover,
              &:active {
                -webkit-transform: scale(1.2);
                transform: scale(1.2);
                -webkit-transition-timing-function: cubic-bezier(
                  0.47,
                  2.02,
                  0.31,
                  -0.36
                );
                transition-timing-function: cubic-bezier(
                  0.47,
                  2.02,
                  0.31,
                  -0.36
                );
              }
              // display: none;
            }
          }
          > .data {
            height: 159px;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            align-items: center;
            > .num {
              font-size: 80px;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              text-align: center;
              color: #ffffff;
              margin-left: 32px;
            }
            > .info {
              > div:first-child {
                font-size: 32px;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: 700;
                text-align: left;
                color: #ffffff;
                margin-bottom: 10px;
              }
              > div:nth-child(2) {
                font-size: 24px;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: 400;
                text-align: left;
                color: #ffffff;
                margin-bottom: 10px;
              }
            }

            > .btn {
              width: 122px;
              height: 159px;
              background: #7d7d7d;
              font-size: 32px;
              color: #ffffff;
              font-family: Microsoft YaHei, Microsoft YaHei-Bold;
              font-weight: 700;
              cursor: pointer;
              > div {
                width: 64px;
                margin-top: 38px;
                margin-left: 29px;
              }
            }
          }
        }
      }
    }
  }
  .clock {
    width: 212px;
    height: 156px;
    text-align: center;
    margin-left: 20px;
  }
  .timeOut {
    font-size: 26px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: center;
    color: #000000;
    line-height: 40px;
    margin-top: 51px;
  }
  //   /deep/ .time_dialog .el-dialog__header{
  //        width: 242px;
  // height: 70px;
  // background: #3d78ff;
  // border-radius: 35px;
  // padding: 0;
  // font-size: 36px;
  // font-family: Microsoft YaHei, Microsoft YaHei-Regular;
  // font-weight: 400;
  // text-align: center;
  // color: #ffffff;
  // line-height: 55px;
  // margin-left: 30px;
  //   }
  .audit_dialog {
    /deep/ .el-dialog__header {
      height: 0;
      padding: 0;
    }
    /deep/ .el-dialog__headerbtn .el-dialog__close {
      color: rgb(153, 151, 151);
    }
    /deep/ .el-input.is-disabled .el-input__inner {
      border: 0;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
      background: #fff;
    }
    /deep/ .el-textarea.is-disabled .el-textarea__inner {
      border: 0;
      background-color: #fff;
    }
  }
  .dialog_see {
    /deep/ .el-dialog__header {
      height: 0;
      padding: 0;
    }
  }

  .update_dialog {
    .update_body {
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      > .title {
        margin-bottom: 20px;
        font-size: 26px;
        color: #000000;
        > span {
          font-size: 14px;
          color: #999999;
          margin-left: 20px;
        }
      }
    }
    .update_btn {
      width: 480px;
      height: 65px;
      background: #3d78ff;
      border-radius: 5px;
      font-size: 24px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #ffffff;
      line-height: 65px;
      margin-left: 40px;
      cursor: pointer;
      transition: all 0.3s ease;
      &:hover {
        background: #125da3;
      }
    }
  }
  /deep/ .update_dialog .el-dialog__header {
    height: 0;
    padding: 0;
  }

  .failure_dialog {
    /deep/ .el-dialog__header {
      height: 0;
      padding: 0;
    }
    /deep/ .el-dialog__headerbtn .el-dialog__close {
      color: rgb(153, 151, 151);
    }
    /deep/ .el-input.is-disabled .el-input__inner {
      border: 0;
    }
    /deep/ .el-input.is-disabled .el-input__inner {
      background: #fff;
    }
    /deep/ .el-textarea.is-disabled .el-textarea__inner {
      border: 0;
      background-color: #fff;
    }
    .el-button {
      margin-left: 110px;
      width: 400px;
    }
  }

  .failure_body {
    position: relative;
    width: 600px;
    > img {
      width: 330px;
      height: 266px;
      position: absolute;
      top: -80px;
      left: 50%;
      margin-left: -165px;
    }

    > p {
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #000000;
      margin-top: 220px;
      margin-left: 20px;
      line-height: 40px;
      > span {
        font-size: 22px;
        color: #7d7d7d;
      }
    }

    > .info {
      font-size: 18px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #7d7d7d;
      margin-left: 60px;
      margin-top: 20px;
    }
  }

  /deep/ .update_dialog .el-dialog__headerbtn .el-dialog__close {
    color: rgb(153, 151, 151);
  }
  /deep/ .el-dialog__header {
    background: #3d78ff;
  }
  /deep/ .el-dialog__title {
    color: #fff;
  }
  /deep/ .el-dialog__headerbtn .el-dialog__close {
    color: #fff;
  }
  .body {
    > .title {
      margin-left: 153px;
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
      margin-bottom: 18px;
      > span {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #fd624c;
        margin-left: 21px;
      }
    }
    > ul {
      height: 640px;
      margin-left: 153px;
      margin-bottom: 183px;
      overflow: auto;
      ::-webkit-scrollbar {
        display: none; /* Chrome Safari */
      }
      > li {
        position: relative;
        box-sizing: border-box;
        float: left;
        margin: 0 38px 12px 0;
        cursor: pointer;
        overflow: hidden;
        width: 285px;
        height: 310px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        border-radius: 10px;
        > img {
          width: 100%;
          height: 151px;
        }
        > div {
          height: 120px;
          width: 268px;
          position: relative;
          > .video-title {
            padding: 11px 14px 0 14px;
            font-size: 18px;
            font-weight: 500;
            color: #18191a;
            line-height: 23px;
            text-align: left;
          }
          > .orange {
            background: #ff7a05;
          }
          > .primary {
            background: #0582ff;
          }
          > .danger {
            background: #e74c3c;
          }
          > .success {
            background: #008000;
          }
          > .video-label {
            position: absolute;
            width: 87px;
            height: 28px;
            top: 45px;
            left: 16px;
            text-align: center;
            border-radius: 4px;
            > span {
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: center;
              color: #ffffff;
              line-height: 24px;
            }
          }
        }

        > ul {
          // position: absolute;
          width: 100%;
          // bottom: 0;
          height: 39px;
          border-top: 1px solid rgba(0, 0, 0, 0.16);
          > li {
            text-align: center;
            line-height: 39px;
            float: left;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
          }
          > li:nth-child(1) {
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin-left: 19px;
            // position: relative;
            // &::after {
            //   content: "";
            //   position: absolute;
            //   right: 0;
            //   width: 1px;
            //   height: 100%;
            //   background-color: rgba(0, 0, 0, 0.16);
            // }
          }
          > li:last-child {
            float: right;
            margin-right: 18px;
          }
        }
      }
    }
  }
}
</style>