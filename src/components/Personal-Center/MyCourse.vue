<template>
  <div class="MyCourse" @click="seeDetails = false">
    <div class="message-column">
      <div class="box-left">
        <div>
          <img src="../../assets/img/Personal-Center/t-01.png" alt="" />
        </div>
        学习记录
      </div>
      <div class="box-right">
        <ul>
          <li
            :class="tabIndex == index ? 'li-active' : ''"
            v-for="(item, index) in tab"
            :key="index"
            @click="tabClick(index), (tabIndex = index)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="course-list">
      <ul class="list">
        <li class="clearfix" v-for="(item, index) in myCourseList" :key="index">
          <div class="box clearfix">
            <img :src="item.courseLogo" alt />
            <div class="course">
              <div class="title">{{ item.courseName }}</div>
              <div class="study">
                学习到{{ item.studyTime | studyTimeFilters }}
              </div>
              <el-progress
                :percentage="item | percentageFilters"
                color="#3d78ff"
                :stroke-width="4"
              ></el-progress>
            </div>
            <div class="btn">
              <div @click="evaluate(item)" v-show="item.isCommented !== 1">
                评价
              </div>
              <div @click="keepLearning(item)">继续学习</div>
            </div>
          </div>
        </li>
      </ul>
    </div>

    <!-- 分页 -->
    <el-pagination
      background
      hide-on-single-page
      layout="prev, pager, next"
      @current-change="currentChange"
      :total="pageForm.total"
      :page-size="pageForm.pageSize"
      :current-page="pageForm.pageNum"
    ></el-pagination>

    <CourseEvaluate
      v-if="CourseEvaluateFlag"
      :courseDetails="courseDetails"
      @dialogClose="dialogClose"
    />

    <div class="No" v-if="tabIndex == 0 && No">
      <img src="../../assets/img/Personal-Center/course-img.png" alt />
      <!-- <router-link tag="div" to="/CourseClassificationNav">添加课程</router-link> -->
    </div>
    <div class="No" v-if="tabIndex == 1 && No2">
      <img src="../../assets/img/Personal-Center/course-img.png" alt />
      <!-- <router-link tag="div" to="/CourseClassificationNav">添加课程</router-link> -->
    </div>
  </div>
</template>

<script>
import CourseEvaluate from "@/components/Personal-Center/Course-evaluate";

export default {
  name: "MyCourse",
  components: {
    CourseEvaluate,
  },
  data() {
    return {
      tab: ["正在学习", "学习完成"],
      tabIndex: 0, // 栏目索引
      courseId: "", // 课程id
      myCourseList: [], // 我的课程列表
      myClassList: [], // 我的课程列表

      dialogVisible: false, // 评价框
      courseDetails: "", // 当前评价的课程

      form: {
        value1: 0, // 星
        evaluateValue: "", // 评价
        courseOrClass: "", // 0课程 1班级
      },
      pageForm: {
        pageSize: 4,
        pageNum: 1,
        total: 0,
      },
      pageForm2: {
        pageSize: 4,
        pageNum: 1,
        total: 0,
      },
      pageForm3: {
        pageSize: 4,
        pageNum: 1,
        total: 0,
      },
      CourseEvaluateFlag: false, // 评价框

      No: false,
      No2: false,
    };
  },
  created() {
    this.getMyCourse(0); // 获取我的课程
  },
  methods: {
    // tab
    tabClick(index) {
      this.getMyCourse(index); // 获取我的课程
    },
    // 分页
    currentChange(el) {
      if (this.tabIndex == 0) {
        this.pageForm2.pageNum = el;
      } else if (this.tabIndex == 1) {
        this.pageForm3.pageNum = el;
      }
      this.getMyCourse(this.tabIndex); // 获取我的课程
    },
    // 获取我的课程
    getMyCourse(isFinished) {
      if (this.tabIndex == 0) {
        this.pageForm = this.pageForm2;
      } else if (this.tabIndex == 1) {
        this.pageForm = this.pageForm3;
      }
        this.$api.myCourse(isFinished,this.pageForm)
        .then((res) => {
          this.myCourseList = res.data.data.records;
          this.pageForm.total = res.data.data.total;
          if (this.myCourseList.length == 0) {
            if (this.tabIndex == 0) {
              this.No = true;
            } else {
              this.No = false;
            }
            if (this.tabIndex == 1) {
              this.No2 = true;
            } else {
              this.No2 = false;
            }
          }
        });
    },
    // 继续学习
    keepLearning(item) {
      if (item.tutorialMode == 0) {
        window.open(item.baseUrl);
      } else {
        this.$router.push({
          path: "/CourseDetails",
          query: { courseId: item.courseId },
        });
      }
    },
    // 学习进度
    format(percentage) {
      if (percentage) {
        return percentage == 100 || percentage > 100
          ? "已学完"
          : `已学${percentage}%`;
      }
    },
    // 评价
    evaluate(item) {
      this.CourseEvaluateFlag = true; // 显示评论框
      setTimeout(() => {
        this.courseDetails = item; // 当前评论的课程
        this.courseDetails.id = this.courseDetails.courseId;
      }, 100);
    },
    // 子组件关闭评论框
    dialogClose(val) {
      if (val) {
        this.getMyCourse(this.tabIndex); // 获取我的课程
      }
      this.CourseEvaluateFlag = false;
    },
    // 换算时间
    formatSeconds(value) {
      var theTime = parseInt(value); // 秒
      var middle = 0; // 分
      var hour = 0; // 小时

      if (theTime > 60) {
        middle = parseInt(theTime / 60);
        theTime = parseInt(theTime % 60);
        if (middle > 60) {
          hour = parseInt(middle / 60);
          middle = parseInt(middle % 60);
        }
      }
      var result = "" + parseInt(theTime) + "秒";
      if (middle > 0) {
        result = "" + parseInt(middle) + "分" + result;
      }
      if (hour > 0) {
        result = "" + parseInt(hour) + "小时" + result;
      }
      return result;
    },
  },
  mounted() {},
  filters: {
    percentageFilters(val) {
      if (val) {
        if (val.studyTime == 0) {
          return 0;
        } else {
          var data = parseFloat(
            Math.round((val.studyTime / val.videoLength) * 10000) / 100.0
          );
          if (data > 100) {
            data = 100;
          }
          return data;
        }
      }
    },
    // 换算时间
    studyTimeFilters(val) {
      if (val) {
        var theTime = parseInt(val / 1000); // 秒
        var middle = 0; // 分
        var hour = 0; // 小时

        if (theTime > 60) {
          middle = parseInt(theTime / 60);
          theTime = parseInt(theTime % 60);
          if (middle > 60) {
            hour = parseInt(middle / 60);
            middle = parseInt(middle % 60);
          }
        }
        var result = "" + parseInt(theTime) + "秒";
        if (middle > 0) {
          result = "" + parseInt(middle) + "分" + result;
        }
        if (hour > 0) {
          result = "" + parseInt(hour) + "小时" + result;
        }
        return result;
      }
    },
  },
  watch: {},
};
</script>
<style lang="less">
.MyCourse {
  position: relative;
  float: left;
  width: 944px;
  min-height: 799px;
  background-color: #fff;
  > .message-column {
    padding-left: 40px;
    height: 63px;
    border-bottom: 1px solid rgba(24, 25, 26, 0.1);
    > .box-left {
      float: left;
      font-weight: 700;
      line-height: 63px;
      > div {
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
    }
    > .box-right {
      float: left;
      > ul {
        padding: 15px 0 0 28px;
        > li {
          cursor: pointer;
          padding: 8px 15px;
          text-align: center;
          float: left;
          color: #18191a;
        }
        > .li-active {
          background-color: #3d78ff;
          border-radius: 17px;
          color: #ffffff;
          animation: pulse 1s;
        }
      }
    }
  }

  .course-list {
    .list {
      padding: 16px 40px;
      > li {
        position: relative;
        margin-bottom: 17px;
        padding: 29px 16px 15px 29px;
        background: #ffffff;
        border-radius: 4px;
        box-shadow: 0px 0px 12px 0px rgba(24, 25, 26, 0.12);
        > .box {
          position: relative;
          padding-bottom: 15px;
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
              text-align: left;
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
              text-align: left;
            }
            > .el-progress {
              width: 330px;
              float: left;
              text-align: left;
              .el-progress-bar__outer {
                background-color: rgba(107, 112, 255, 0.2);
              }
              .el-progress-bar {
                width: 91%;
                margin-right: -70px;
              }
              .el-progress__text {
                margin-left: 22px;
                font-size: 12px;
                font-weight: 500;
                color: #3d78ff;
              }
            }
          }
          > .btn {
            position: absolute;
            right: 0;
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
  // 分页
  .el-pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
    text-align: center;
    margin-bottom: 40px;
    > .el-pager {
      > li:not(.disabled):hover {
        color: #3d78ff;
      }
      > .active {
        background-color: #3d78ff !important;
        &:hover {
          color: #fff !important;
        }
      }
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