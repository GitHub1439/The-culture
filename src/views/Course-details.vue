<template>
  <div class="home">
    <div class="container CourseDetails">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="{
            path:
              theResearchResources == 1
                ? '/TheResearchResources'
                : '/Resource-result',
          }"
          >{{
            theResearchResources ? "教研资源" : "教研成果"
          }}</el-breadcrumb-item
        >
        <el-breadcrumb-item>资源详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="course-top">
        <div class="container">
          <div class="course-box">
            <div class="video" v-show="courseDetails !== ''">
              <!-- <Video :courseDetails="courseDetails" /> -->

              <!-- 视频 -->
              <div>
                <div class="course" v-if="courseDetails.lecturerName">
                  <div class="courseTeacher">
                    讲课老师:{{ courseDetails.lecturerName }}
                  </div>
                  <div class="courseName">
                    {{ courseDetails.courseName }}
                  </div>
                  <div class="courseCount">
                    最近在学：{{ courseDetails.countStudy }}人
                  </div>
                </div>
                <div id="dplayer" ref="dplayer"></div>
              </div>

              <Right
                @commit="commit"
                @getVideo="changeCourse"
                :courseId="courseId"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- <Dialog
        class="resource"
        ref="dia"
        v-show="courseDetails.type == 2"
        @commit="commit"
      /> -->
      <div class="middle">
        <div class="course-introduction" v-if="courseDetails">
          <!-- 课程信息 -->
          <div class="classInfo">
            <div class="title">课程信息</div>
            <div class="info">课程简介</div>
            <div class="name">课程名称:{{ courseDetails.courseName }}</div>
            <p>简介：{{ courseDetails.introduce }}</p>
            <div class="time">上传时间</div>
            <div>{{ courseDetails.gmtCreate | time }}</div>
          </div>

          <div class="cover">
            <img :src="courseDetails.courseLogo" alt />
            <div>
              <div class="video-title">
                {{ courseDetails.courseName | courseName }}
              </div>
              <div
                class="video-label"
                :class="
                  courseDetails.label == 0
                    ? 'primary'
                    : courseDetails.label == 1
                    ? 'success'
                    : courseDetails.label == 2
                    ? 'danger'
                    : 'orange'
                "
              >
                <span>{{
                  courseDetails.format == 1
                    ? "Word"
                    : courseDetails.format == 2
                    ? "PDF"
                    : courseDetails.format == 3
                    ? "PPT"
                    : courseDetails.format == 5
                    ? "Excle"
                    : courseDetails.format == 4
                    ? "Video"
                    : "TXT"
                }}</span>
              </div>
            </div>

            <ul>
              <li>主讲老师：{{ courseDetails.lecturerName }}</li>
              <li
                v-html="
                  `学习进度：${$options.filters.percentageFilters(
                    courseDetails
                  )}`
                "
              ></li>
            </ul>
          </div>
          <div></div>
        </div>
        <!-- 课程评价 -->
        <div class="evaluate clearfix" v-if="courseDetails">
          <!-- 课程评价 -->
          <div class="course-evaluate">
            <div v-if="courseCommentList.length == 0" class="uncomment">
              <img src="../assets/img/courseDetails/uncomment.png" alt="" />
              <p>暂无评论</p>
            </div>
            <ul v-else>
              <li
                class="clearfix"
                v-for="(item, index) in courseCommentList"
                :key="index"
              >
                <div class="user">
                  <img :src="item.userImgUrl" alt />
                  <div>{{ item.userName }}</div>
                </div>
                <div class="user-evaluate">
                  <el-rate
                    :value="item.grade / 2"
                    :max="5"
                    disabled
                    text-color="#ff9900"
                    score-template="{value}"
                  ></el-rate>
                  <div class="details">{{ item.courseComment }}</div>
                  <div class="time">
                    <span>{{ item.gradeDate }}</span>
                    <img
                      @click="playLike(item.id, item.isLike)"
                      v-if="item.isLike == 0"
                      src="../assets/img/courseDetails/like.png"
                      alt=""
                    />
                    <img
                      @click="playLike(item.id, item.isLike)"
                      v-else
                      src="../assets/img/courseDetails/islike.png"
                      alt=""
                    />
                    <span>赞</span>
                    <span>{{ item.likeCount }}</span>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              background
              layout="prev, pager, next"
              @current-change="currentChange"
              :total="pageForm.total"
              :page-size="pageForm.pageSize"
              :current-page="pageForm.pageIndex"
              hide-on-single-page
            ></el-pagination>
          </div>
        </div>
      </div>

      <CourseEvaluate
        v-if="CourseEvaluateFlag"
        :courseDetails="courseDetails"
        @dialogClose="dialogClose"
      />
    </div>
  </div>
</template>
<script>
import DPlayer from "dplayer";
import CourseEvaluate from "@/components/Personal-Center/Course-evaluate"; // 评价
import Dialog from "@/components/Dialog2/Dialog"; // 评价
import Right from "@/components/Dialog2/rightBox";
export default {
  name: "CourseDetails",
  components: {
    // Video,
    CourseEvaluate,
    Dialog,
    Right,
  },
  data() {
    return {
      courseDetails: "",
      courseRecommendList: [], // 课程推荐列表
      courseCommentList: [
        {
          userName: "asdsadsad",
          courseComment: "asdasdasdasdasd",
          gradeDate: "2020-11-11",
          grade: 1,
          num: 22,
        },
      ], // 课程评论列表
      pageForm: {
        pageIndex: 1,
        pageSize: 6,
        total: 0,
      },
      CourseEvaluateFlag: false, // 评价框

      menu_show_setInterval: "", //  隐藏菜单定时器
      newCurrentTime: "", // 拖动后的视频播放时间
      currentTime: "", // 视频当前播放时间
      dp: "",
      courseId: this.$route.query.courseId,
      theResearchResources: this.$route.query.theResearchResources,
    };
  },

  created() {
    // this.getCourseRecommend(); // 获取课程推荐
    this.getCourseComment(); // 获取课程评论
  },
  mounted() {
    var that = this;
    this.getCourse(); // 获取课程
    this.$nextTick(() => {
      setTimeout(() => {
        window.addEventListener("beforeunload", (e) => {
          that.setCourseStudy(); // 设置学习时间
        });
      }, 100);
    });
  },
  methods: {
    // format(percentage) {
    //   return courseDetails.gradeDto.goodComment;
    // },
    commit(event) {
      this.CourseEvaluateFlag = event;
    },
    // 获取课程
    getCourse() {
      this.$api.getCourse(this.courseId).then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.introduce && res.data.data.introduce.length >= 42) {
            res.data.data.introduce =
              res.data.data.introduce.substring(0, 42) + "...";
          }
          res.data.data.lecutrerCourseList.forEach((item, index) => {
            item.type = "primary";
            item.size = "large";
          });
          this.courseDetails = res.data.data;
          console.log(this.courseDetails);
          // if (res.data.data.type == 1) {
          //   this.$refs.dia.getData(res.data.data);
          // }

          this.getVideo(this.courseDetails);
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "warning",
          });
        }
      });
    },
    changeCourse(courseId) {
      this.$api.getCourse(courseId).then((res) => {
        if (res.data.code == 200) {
          this.getVideo(res.data.data);
        } else {
          this.$message({
            showClose: true,
            message: res.data.message,
            type: "warning",
          });
        }
      });
    },
    // 获取课程评论
    getCourseComment() {
      this.$api.courseview(this.courseId, this.pageForm).then((res) => {
        this.courseCommentList = res.data.data.records;
        this.pageForm.total = res.data.data.total;
      });
    },
    currentChange(val) {
      this.pageForm.pageIndex = val;
      this.getCourseComment(); // 获取课程评论
    },
    // 子组件关闭评论框
    dialogClose(val) {
      if (val) {
        this.getCourseComment(); // 获取课程评论
        this.getCourse(); // 获取课程
      }
      this.CourseEvaluateFlag = false;
    },
    // 点赞
    playLike(id, isLike) {
      let obj = {
        gradeId: id,
        isLike: isLike,
      };
      if (isLike == 0) {
        this.courseCommentList.forEach((element) => {
          if (element.id == id) {
            element.isLike = 1;
            element.likeCount++;
          }
        });
      } else {
        this.courseCommentList.forEach((element) => {
          if (element.id == id) {
            element.isLike = 0;
            element.likeCount--;
          }
        });
      }
      this.$api.addGradeLike(obj).then((res) => {
        //  if(res.data.code == 200){
        //      this.courseCommentList.forEach(element => {
        //          if(element.id == id){
        //              element.isLike = 1;
        //              element.likeCount++
        //          }
        //      });
        //  }
        //  else if(res.data.code == 201){
        //     this.courseCommentList.forEach(element => {
        //          if(element.id == id){
        //              element.isLike = 0;
        //              element.likeCount--
        //          }
        //      });
        //  }
      });
    },
    // 获取视频
    getVideo(item) {
      var that = this;
      console.log(item);
      if (!item.baseUrl || !item.highUrl || !item.middleUrl || !item.lowUrl) {
        this.$message({
          showClose: true,
          message: "播放资源未查到",
          type: "warning",
        });
        return;
      }
      let status = {
        ".m3u8": "hls",
        ".mp4": "normal",
        ".flv": "flv",
      };
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),
        autoplay: true,
        video: {
          quality: [
            {
              name: "超清",
              url: item.highUrl,
              type:
                item.highUrl &&
                status[item.highUrl.substring(item.highUrl.lastIndexOf("."))],
            },
            {
              name: "高清",
              url: item.middleUrl,
              type:
                item.middleUrl &&
                status[
                  item.middleUrl.substring(item.middleUrl.lastIndexOf("."))
                ],
            },
            {
              name: "清晰",
              url: item.lowUrl,
              type:
                item.lowUrl &&
                status[item.lowUrl.substring(item.lowUrl.lastIndexOf("."))],
            },
            {
              name: "基础",
              url: item.baseUrl,
              type:
                item.baseUrl &&
                status[item.baseUrl.substring(item.baseUrl.lastIndexOf("."))],
            },
          ],
          defaultQuality: 0,
          pic: item.courseLogo, //封面图
          thumbnails: "thumbnails.jpg", //略缩图
        },
        screenshot: false,
        contextmenu: [
          {
            text: "custom1",
            link: "https://github.com/DIYgod/DPlayer",
          },
          {
            text: "custom2",
            click: (player) => {
              console.log(player);
            },
          },
        ], // 右键菜单
        highlight: [], //节点
        mutex: true, //关闭多开
        hotkey: false, //快进快退快捷键禁用
      });
      // 阻止拖动视频进度条
      var oldTime = 0;
      if (item.studyTime !== 0) {
        this.dp.seek(parseInt(item.studyTime) / 1000); // 跳转指定时间
        oldTime = item.studyTime;
      } else {
        oldTime = 0;
      }

      // 阻止拖动视频进度条
      setInterval(function () {
        var newTime = that.dp.video.currentTime;
        if (newTime - oldTime > 2) {
          // that.dp.seek(oldTime);
          // that.dp.notice("不允许拖放进度条哦");
        } else {
          oldTime = newTime;
        }
      }, 10);

      // 定时器
      this.menu_show_setInterval = setInterval(() => {
        that.currentTime = that.dp.video.currentTime;
        if (document.querySelector(".dplayer-menu")) {
          document.querySelector(".dplayer-menu").style = " display:none"; // 隐藏右键菜单
        }
      }, 10);
      document.oncontextmenu = () => false; // 阻止页面所有右键事件

      //视频总时长
      that.duration = that.dp.video.duration;

      // 获取当前视频播放长度
      that.dp.on("timeupdate", function () {
        // dp.video.currentTime: 返回视频当前播放时间
        that.currentTime = that.dp.video.currentTime;
        // 看完了直接请求接口
        if (that.dp.video.currentTime == that.dp.video.duration) {
          that.setCourseStudy(); // 设置学习时间
        }
      });
    },
    // 设置学习时间
    setCourseStudy() {
      this.$api
        .recordStatus({
          courseId: this.courseId,
          studyTime: this.currentTime,
        })
        .then((res) => {});
    },
  },
  watch: {
    $route(to, from) {
      if (to.fullPath !== "/CourseDetails") {
        // 清除菜单显示定时器
        window.clearInterval(this.menu_show_setInterval);
      }
      if (to.query.courseId) {
        console.log(to.query.courseId);
        this.courseId = to.query.courseId;
        this.theResearchResources = to.query.theResearchResources;
      }

      // this.getCourse(); // 获取课程
      // // this.getCourseRecommend(); // 获取课程推荐
      // this.getCourseComment(); // 获取课程评论
    },
    courseId() {
      this.getCourse(); // 获取课程
      // this.getCourseRecommend(); // 获取课程推荐
      this.getCourseComment(); // 获取课程评论
    },
  },
  filters: {
    introduce(val) {
      if (val) {
        if (val.length > 200) {
          return `${val.substring(0, 200)}...`;
        } else {
          return val;
        }
      }
    },
    courseName(val) {
      if (val.length > 12) {
        return `${val.substring(0, 12)}...`;
      } else {
        return val;
      }
    },
    time(val) {
      if (val.length > 10) {
        return `${val.substring(0, 11)}`;
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
  },
};
</script>
<style lang="less" scoped>


.home {
  background: #f6f6f6;
}
.uncomment {
  text-align: center;
  font-size: 18px !important;
  color: #999999 !important;
  > img {
    width: 400px;
    height: 390px;
    margin-bottom: 10px;
    margin-left: -70px;
  }
}
.CourseDetails {
  min-height: 100vh;
  /deep/.el-breadcrumb {
    font-size: 18px;
    padding: 40px 0 17px 0;
  }
  #dplayer {
    height: 476px;
    width: 876px;
  }
  > .resource {
    box-shadow: 0 1px 7px 1px rgb(146, 145, 145);
  }
  > .course-top {
    padding-top: 27px;
    // height: 574px;
    width: 100%;
    .course-box {
      width: 100%;
      > .video {
        background: #dbdbdb;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        > div:first-child {
          .course {
            box-sizing: border-box;
            
            padding: 0 0 0 23px;
            line-height: 87px;
            color: #ffffff;
            height: 87px;
            background: #000;
            width: 876px;
            > .courseName {
              font-size: 16px;
              margin-left: 44px;
              font-weight: 700;
              float: left;
            }
            > .courseTeacher,
            > .courseCount {
              font-size: 16px;
              float: left;
              font-size: 12px;
            }
            > .courseCount {
              position: relative;
              margin-left: 17px;
              &::after {
                content: "";
                position: absolute;
                top: 36px;
                left: -8px;
                width: 1px;
                height: 15px;
                background: #ffffff;
              }
            }
          }
        }
        // > .right-box {
        //   width: 324px;
        //   height: 559px;
        //   background: #2d2d2d;
        //   > .teacher {
        //     margin-top: 24px;
        //     margin-bottom: 28px;
        //     display: flex;
        //     flex-flow: row nowrap;
        //     justify-content: center;
        //     align-items: center;
        //     > img {
        //       width: 52px;
        //       height: 52px;
        //       border-radius: 50%;
        //       margin-right: 24px;
        //     }
        //     > div {
        //       > div:first-child {
        //         font-size: 16px;
        //         font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        //         font-weight: 400;
        //         text-align: left;
        //         color: #ffffff;
        //         margin-bottom: 6px;
        //       }
        //       > div:last-child {
        //         font-size: 14px;
        //         font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        //         font-weight: 400;
        //         text-align: left;
        //         color: #7d7d7d;
        //       }
        //     }
        //   }
        //   > .score {
        //     display: flex;
        //     flex-flow: row nowrap;
        //     justify-content: center;
        //     align-items: center;
        //     margin-top: 20px;
        //     > div:first-child {
        //       font-size: 34px;
        //       font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        //       font-weight: 400;
        //       text-align: center;
        //       color: #f8d214;
        //       > p {
        //         font-size: 9px;
        //         font-family: Source Han Sans CN, Source Han Sans CN-Regular;
        //         font-weight: 400;
        //         text-align: center;
        //         color: #999999;
        //         margin-top: 8px;
        //       }
        //     }
        //     > div:last-child {
        //       > .num {
        //         font-size: 14px;
        //         font-family: Source Han Sans CN, Source Han Sans CN-Regular;
        //         font-weight: 400;
        //         text-align: center;
        //         color: #a7a7a7;
        //         margin-top: 15px;
        //       }
        //     }
        //   }
        //   // > .course {
        //   //   margin-top: 34px;
        //   //   height: 320px;
        //   //   overflow-y: auto;
        //   //   &::-webkit-scrollbar {
        //   //     display: none; /* Chrome Safari */
        //   //   }
        //   //   /deep/ .el-timeline {
        //   //     .add {
        //   //       background: #1e1e1e;
        //   //     }
        //   //     /deep/ .el-timeline-item {
        //   //       padding-bottom: 28px;

        //   //       cursor: pointer;
        //   //     }
        //   //     /deep/ .el-timeline-item__wrapper {
        //   //       top: 10px;
        //   //     }
        //   //     /deep/.el-timeline-item__node--primary {
        //   //       background-color: #a5a5a5;
        //   //     }
        //   //     /deep/ .el-timeline-item__tail {
        //   //       left: 49px;
        //   //       top: 10px;
        //   //     }
        //   //     /deep/ .el-timeline-item__node--large {
        //   //       left: 43px;
        //   //       top: 10px;
        //   //     }
        //   //     /deep/ .el-timeline-item__content {
        //   //       text-align: left;
        //   //       margin-left: 60px;
        //   //       color: #a5a5a5;
        //   //       line-height: 21px;
        //   //     }
        //   //   }
        //   // }
        //   > .btn {
        //     width: 324px;
        //     height: 53px;
        //     background: #555555;
        //     text-align: center;
        //     line-height: 53px;
        //     cursor: pointer;
        //     > img {
        //       width: 32px;
        //       height: 30px;
        //       vertical-align: middle;
        //     }
        //     > span {
        //       font-size: 16px;
        //       font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        //       font-weight: 400;
        //       text-align: left;
        //       color: #999999;
        //       margin-left: 14px;
        //     }
        //   }
        // }
      }
    }
  }

  .middle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    padding-bottom: 91px;
    .course-introduction {
      > .classInfo {
        width: 245px;
        height: 354px;
        background: #ffffff;
        padding: 0 23px;
        text-align: left;
        margin-top: 15px;
        > .title {
          font-size: 20px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
          border-bottom: 1px solid #d9d4d4;
          padding-bottom: 19px;
          padding-top: 15px;
        }
        > .info {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
          margin: 23px 0 15px 0;
        }
        > .name {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
        }
        > p {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
          line-height: 25px;
        }
        > .time {
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
          margin-top: 21px;
        }
        > div:last-child {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
          margin: 11px 0 29px 0;
        }
      }
      > .cover {
        position: relative;
        box-sizing: border-box;
        cursor: pointer;
        overflow: hidden;
        width: 285px;
        height: 335px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        border-radius: 10px;
        margin-top: 15px;
        > img {
          width: 100%;
          height: 175px;
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
            left: 20px;
            text-align: center;
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
            width: 50%;
            float: left;
            font-size: 14px;
            color: #7d7d7d;
          }
          > li:nth-child(1) {
            position: relative;
            &::after {
              content: "";
              position: absolute;
              right: 0;
              width: 1px;
              height: 100%;
              background-color: rgba(0, 0, 0, 0.16);
            }
          }
        }
      }
    }
    // 课程评价
    > .evaluate {
      // padding-top: 45px;
      width: 900px;
      float: left;
      background-color: #fff;
      margin-top: 15px;
      // 课程评价
      .course-evaluate {
        float: left;
        width: 975px;
        text-align: left;
        > .evaluate-word {
          // margin-bottom: 12px;
          font-size: 18px;
          font-weight: 700;
          color: #626262;
          line-height: 36px;

          > .btn {
            cursor: pointer;
            float: right;
            width: 91px;
            height: 36px;
            text-align: center;
            border: 1px solid #707070;
          }
        }

        > ul {
          > li {
            padding: 32px 40px 32px 0;
            margin-left: 38px;
            border-bottom: 1px solid rgba(24, 25, 26, 0.1);
            > .user {
              margin-right: 24px;
              float: left;
              width: 72px;
              text-align: center;
              > img {
                padding-bottom: 8px;
                height: 72px;
                width: 100%;
                border-radius: 50%;
              }
              > div {
                font-size: 16px;
                color: #7d7d7d;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 1;
                overflow: hidden;
              }
            }
            > .user-evaluate {
              > .details {
                margin: 13px 0 27px 0;
                font-size: 16px;
                color: #18191a;
                font-family: Microsoft YaHei, Microsoft YaHei-Bold;
                font-weight: 700;
                text-align: left;
              }
              > .time {
                //   float: right;
                font-size: 14px;
                color: #ababab;
                > span:nth-child(1) {
                  margin-right: 44px;
                }
                > span:nth-child(3) {
                  margin-right: 6px;
                }
                > img {
                  vertical-align: bottom;
                  cursor: pointer;
                  margin-right: 10px;
                }
              }
            }
          }
          > li:nth-last-child(1) {
            border: none;
          }
        }
        > .el-pagination {
          text-align: center;
        }
      }
      // 课程推荐
      .course-recommend {
        float: right;
        width: 350px;
        > .column {
          font-size: 18px;
          font-weight: 700;
          color: #626262;
        }
        > ul {
          padding-top: 36px;
          > li {
            padding-bottom: 10px;
            cursor: pointer;
            margin-bottom: 33px;
            width: 346px;
            height: 204px;
            border-radius: 6px;
            overflow: hidden;
            > img {
              display: block;
              width: 100%;
              height: 156px;
              object-fit: cover;
            }
            > .courseName {
              box-sizing: border-box;
              padding: 14px 8px 0 8px;
              font-size: 18px;
              font-weight: 500;
              color: #18191a;

              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              overflow: hidden;
            }
          }
          > li:hover {
            box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          }
        }
      }
    }
  }
  // 分页
  .el-pagination {
    text-align: center;
    margin-bottom: 40px;
    > .el-pager {
      > li:not(.disabled):hover {
        color: #4444e5;
      }
      > .active {
        background-color: #4444e5 !important;
        &:hover {
          color: #fff !important;
        }
      }
    }
  }
}
</style>