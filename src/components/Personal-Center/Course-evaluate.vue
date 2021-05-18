<template>
  <div class="Course-evaluate">
    <!-- 课程评价 -->
    <el-dialog title :visible.sync="dialogVisible" @close="dialogClose">
      <div class="course-evaluate">
        <div class="title">
          课程评价
          <span>{{courseDetails.courseName}}</span>
        </div>
        <div class="evaluate-title">您觉得课程怎么样？</div>
        <!-- 评分 -->
        <el-rate
          void-color="rgba(238,97,45,0.5)"
          :colors="['#ee612d','#ee612d','#ee612d']"
          class="clearfix"
          v-model="form.value1"
        ></el-rate>
        <div class="evaluate-message">
          <span>{{form.evaluateValue}}</span>
          <div class="btn" @click="edit" v-if="form.evaluateValue!==''">更换评语</div>
        </div>
        <div class="evaluate-btn" @click="submitEvaluate">提交评价</div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Course-evaluate",
  props: ["courseDetails"],
  components: {},
  data() {
    return {
      dialogVisible: true,
      form: {
        value1: 0, // 星
        evaluateValue: "", // 评价
        courseOrClass: "" // 0课程 1班级
      },

      evaluateList: [], // 总评价列表
      arr: [], // 当前给星的评级列表
      No: false,
      No2: false
    };
  },
  created() {
   this.$api.getcomment().then(res => {
      this.evaluateList = res.data.data;
    });
  },
  mounted() {},
  methods: {
    // 关闭评论框
    dialogClose() {
      this.$emit("dialogClose", false);
    },
    // 修改评语
    edit() {
      this.form.evaluateValue = this.arr[
        Math.floor(Math.random() * this.arr.length)
      ];
    },
    // 提交评价
    submitEvaluate() {
        let params = {
          courseComment: this.form.evaluateValue,
          courseId: this.courseDetails.id,
          grade: this.form.value1 * 2
        }
        this.$api.creatcoursecomment(params)
        .then(res => {
          if (res.data.code == 200) {
            this.$notify({
              title: "成功",
              message: "评论成功",
              type: "success"
            });
            this.$emit("dialogClose", true);
          } else if (res.data.code == 600) {
            this.$notify.error({
              title: "错误",
              message: res.data.data
            });
            this.$emit("dialogClose", false);
          } else {
            this.$notify.error({
              title: "错误",
              message: "评论失败"
            });
            this.$emit("dialogClose", false);
          }
        });
    }
  },
  mounted() {},
  filters: {},
  watch: {
    "form.value1"(newVal, oldVal) {
      this.arr = this.evaluateList[newVal];
      this.form.evaluateValue = this.arr[0];
    }
  }
};
</script>
<style lang="less">
.Course-evaluate {
  position: relative;
  float: left;
  width: 944px;
  min-height: 799px;
  background-color: #fff;
  > .el-tabs {
    .el-tabs__item.is-active {
      color: #18191a;
    }
    .el-tabs__item {
      padding: 0 32px !important;
      font-size: 16px;
      font-weight: 500;
      color: #7d7d7d;
    }
    .el-tabs__active-bar {
      height: 3px;
      border-radius: 6px;
      background-color: #3d78ff;
    }
    .el-input__inner {
      height: 42px;
    }
  }

  .list {
    padding: 32px 40px;
    > li {
      position: relative;
      margin-bottom: 32px;
      padding: 29px 16px 15px 29px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 0px 12px 0px rgba(24, 25, 26, 0.12);
      > .box {
        > i {
          cursor: pointer;
          position: absolute;
          top: 16px;
          right: 16px;
          > .see-details {
            display: none;
            position: absolute;
            left: -54px;
            top: 27px;
            width: 118px;
            height: 124px;
            background: #ffffff;
            border: 1px solid #cccccc;
            border-radius: 6px;
            box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
            > ul {
              padding-top: 16px;
              > li {
                padding: 16px 0 16px 16px;
                font-size: 14px;
                font-weight: 500;
                color: #18191a;
              }
            }
          }
        }
        // 三角形
        .triangle {
          position: absolute;
          top: -10px;
          left: 50px;
          > .border-box {
            position: relative;
            width: 0;
            height: 0;
            border-width: 0 10px 10px;
            border-style: solid;
            border-color: transparent transparent #dedede;
          }
          > .border-box::before {
            content: "";
            position: absolute;
            top: 2px;
            left: -8px;
            border-width: 0 8px 8px;
            border-style: solid;
            border-color: transparent transparent #fff;
          }
        }
        > img {
          margin-right: 45px;
          display: block;
          float: left;
          width: 149px;
          height: 84px;
          border-radius: 4px;
        }
        > .course {
          > .title {
            font-size: 18px;
            font-weight: 500;
            color: #18191a;
            > span {
              margin-left: 24px;
              font-size: 12px;
              color: #ee612d;
              > img {
                margin-right: 4px;
                position: relative;
                top: 5px;
                // vertical-align: middle;
                width: 20px;
                height: 20px;
              }
            }
          }
          > .study {
            margin-top: 34px;
            font-size: 12px;
            color: #7d7d7d;
          }
          > .el-progress {
            width: 330px;
            float: left;
            .el-progress-bar__outer {
              background-color: rgba(107, 112, 255, 0.2);
            }
            .el-progress-bar {
              width: 91%;
              margin-right: -70px;
            }
            .el-progress__text {
              margin-left: 25px;
              font-size: 12px;
              font-weight: 500;
              color: #3d78ff;
            }
          }
        }
        > .btn {
          float: right;
          > div {
            cursor: pointer;
            float: left;
            height: 32px;
            line-height: 32px;
            font-size: 14px;
            border-radius: 4px;
          }
          > div:nth-child(1) {
            margin-right: 24px;
            width: 87px;
            border: 1px solid #3d78ff;
            text-align: center;
            color: #3d78ff;
          }
          > div:nth-child(2) {
            width: 115px;
            background: #3d78ff;
            text-align: center;
            color: #ffffff;
          }
        }
      }
    }
  }

  > .el-dialog__wrapper {
    .el-dialog {
      border-radius: 19px;
      overflow: hidden;
      margin-top: 0 !important;
      width: 648px;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .el-dialog__header {
        padding: 0;
        .el-dialog__headerbtn {
          // display: none;
        }
      }
      .el-dialog__body {
        padding: 0;
      }
    }
  }

  // 评价
  .course-evaluate {
    height: 457px;
    padding: 40px 40px 0 40px;
    > .title {
      color: #666666;
      > span {
        margin-left: 16px;
      }
    }
    > .evaluate-title {
      padding: 44px 0 64px 0;
      text-align: center;
      color: #18191a;
    }
    > .el-rate {
      height: 40px;
      text-align: center;
      > .el-rate__item {
        > i {
          font-size: 45px;
        }
      }
    }
    > .evaluate-message {
      margin: 30px 0 100px 0;
      > span {
        color: #ee612d;
        display: inline-block;
        margin-bottom: 10px;
      }
      > .btn {
        cursor: pointer;
        float: right;
        color: #3d78ff;
      }
    }
    > .evaluate-btn {
      float: right;
      cursor: pointer;
      width: 156px;
      height: 44px;
      background: #3d78ff;
      border-radius: 4px;

      line-height: 44px;
      text-align: center;
      color: #ffffff;
    }
  }

  > .No {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    text-align: center;
    > img {
      display: block;
      width: 418px;
      height: 240px;
    }
    > div {
      cursor: pointer;
      margin: 64px auto 0 auto;
      width: 224px;
      height: 48px;
      background: #3d78ff;
      border-radius: 4px;

      line-height: 48px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>