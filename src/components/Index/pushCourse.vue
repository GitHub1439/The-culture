<template>
  <div class="home container">
    <!-- 头 -->
    <div class="title" data-aos="fade-up" :data-aos-once="false">
      <img src="../../assets/img/Index/pushcourse/like.png" alt="" />
      <span>为您推送以下学习任务</span>
      <span @click="changeAnswer">更改测评</span>
    </div>
    <!-- 教研课程 -->
    <div class="resource" data-aos="fade-up" :data-aos-once="false">
      <!-- 标题 -->
      <div class="title">教研课程</div>
      <!-- 内容 -->
      <ul>
        <li
          v-for="(item, index) in researchCourse"
          @click="videoJump(item)"
          :key="index"
        >
          <!-- 图片 -->
          <img :src="item.courseLogo" alt="" />
          <!-- 内容 -->
          <div class="contents">
            <!-- 标题 -->
            <div class="name">{{ item.courseName }}</div>
            <!-- label标签 -->
            <div
              class="label"
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
              {{
                item.label == 0
                  ? "专家讲座"
                  : item.label == 1
                  ? "案例学习"
                  : item.label == 2
                  ? "任务驱动"
                  : "参与式培训"
              }}
            </div>
          </div>
          <!-- 底部 老师 及 学习进度 -->

          <ul>
            <!-- 主讲老师 -->
            <li>
              <span>主讲老师</span>
              <span> | </span>
              <span>{{ item.lecturerName }}</span>
            </li>
            <!-- 学习进度 -->
            <li>
              <span
                v-html="`学习进度：${$options.filters.percentageFilters(item)}`"
              ></span>
              <!-- <span>|</span>
              <span></span> -->
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <!-- <div class="liveclass"  data-aos="fade-up" :data-aos-once="false">
     
      <div class="title" >直播课程</div>
     
      <ul>
        <li v-for="(item, index) in liveCourse" :key="index">
          <div class="hover">
            <div>进入直播间</div>
          </div>
         
          <img :src="item.pic" alt="" />
          
          <div class="contents">
            
            <div class="name">{{ item.title }}</div>
           
            <div class="time">开课时间{{ item.createTime }}</div>
          </div>
         

          <ul>
            
            <li>
              <span>主讲老师</span>
              <span>|</span>
              <span>{{ item.teacher }}</span>
            </li>
            
            <li>
              <span>直播时长</span>
              <span>|</span>
              <span>{{ item.progress }}分钟</span>
            </li>
          </ul>
        </li>
      </ul>
    </div> -->
  </div>
</template>


<script>
export default {
  components: {},
  props: ["resourcesData"],
  data() {
    return {
      researchCourse: [],
      liveCourse: [],
    };
  },
  created() {},
  methods: {
    changeAnswer() {
      this.$emit("changeAnwer", true);
    },
    // 获取推荐课程
    getPushCourse() {
      this.$api.selectReCourseByUser().then((res) => {
        if (res.data.code == 200) {
          if (res.data.data.code == 200) {
            this.researchCourse = res.data.data.message.slice(0, 4);
            this.$emit("isShow", 200);
          }
          
        }
        if(res.data.code == 500){
          if (res.data.data.code == 201) {
            this.$emit("isShow", 201);
            this.$message({
              showClose: true,
              message: "暂无推荐课程信息，请答题后查看",
              type: "warning",
            });
          } else {
            this.$emit("isShow", 203);
          }
        }
      });
      // this.researchCourse= JSON.parse(sessionStorage.getItem('courseData')).slice(0,4);
    },
    // 直播跳转
    videoJump(item) {
      if (item.isPlay == 0) {
        return;
      }
      this.setCourseStudy(item.id, item.tutorialMode);
      window.open(item.baseUrl);
    },
    // 设置学习时间
    setCourseStudy(courseId, tutorialMode) {
      this.$api
        .recordStatus({
          courseId: courseId,
          tutorialMode: tutorialMode,
        })
        .then((res) => {});
    },
  },
  mounted() {
    this.getPushCourse();
  },
  filters: {
    courseName(val) {
      if (val.length > 23) {
        return `${val.substring(0, 23)}...`;
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
  watch: {
    // resourcesData:{
    //    immediate:true,
    //  handler:function(a,b){
    //    if(this.resourcesData){
    //      this.researchCourse= JSON.parse(sessionStorage.getItem('courseData')).slice(0,4);
    //    }
    //  }
    // }
  },
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 45px;
  > .title {
    height: 55px;
    background-color: rgba(253, 98, 76, 0.23);
    border-radius: 5px;
    text-align: left;
    line-height: 55px;
    > img {
      width: 27px;
      height: 26px;
      margin: 0 17px 0 14px;
    }
    > span:first-child {
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #000000;
    }
    > span:last-child {
      font-size: 14px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #fd624c;
      margin-left: 9px;
      cursor: pointer;
      &:hover {
        color: #f34731;
      }
    }
  }
  > .resource {
    > .title {
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
      margin: 41px 0 17px 0;
    }
    > ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;

      > li {
        width: 285px;
        height: 320px;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        margin-right: 20px;
        cursor: pointer;
        transition: all linear 0.1;
        -webkit-transition: all 0.1s; /* Safari */
        &:hover {
          margin-top: -3px;
        }
        > img {
          width: 285px;
          height: 175px;
          border-radius: 5px;
        }
        > .contents {
          width: 285px;
          height: 95px;
          position: relative;
          > .name {
            width: 252px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 7px 0 0 16px;
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
          > .label {
            position: absolute;
            top: 41px;
            left: 16px;
            padding: 8px 5px;
            background: rgba(61, 120, 255, 0.23);
            border-radius: 4px;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #3d78ff;
          }
        }
        > ul {
          width: 285px;
          height: 38px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          border-top: 1px solid #e0e0e0;
          align-items: center;
          > li:first-child {
            margin-left: 18px;
            > span {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
            }
          }
          > li:last-child {
            margin-right: 18px;
            > span {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #999999;
            }
          }
        }
      }
    }
  }
  > .liveclass {
    > .title {
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
      margin: 41px 0 17px 0;
    }
    > ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;

      > li {
        width: 285px;
        height: 320px;
        background: #ffffff;
        border-radius: 5px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        margin-right: 20px;
        position: relative;
        &:hover {
          > .hover {
            display: block;
          }
        }
        > .hover {
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          width: 285px;
          height: 320px;
          background: rgba(0, 0, 0, 0.16);
          border-radius: 5px;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          > div {
            width: 168px;
            height: 61px;
            background: #000000;
            border-radius: 31px;
            margin: 75px 0 0 59px;
            font-size: 18px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 61px;
            cursor: pointer;
          }
        }
        > img {
          width: 285px;
          height: 175px;
          border-radius: 5px;
        }
        > .contents {
          width: 285px;
          height: 95px;
          > .name {
            width: 252px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin: 7px 0 0 16px;
          }
          > .time {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #3d78ff;
            margin: 20px 0 0 16px;
          }
        }
        > ul {
          width: 285px;
          height: 38px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: space-between;
          border-top: 1px solid #e0e0e0;
          align-items: center;
          > li:first-child {
            margin-left: 18px;
            > span {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
            }
          }
          > li:last-child {
            margin-right: 18px;
            > span {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #999999;
            }
          }
        }
      }
    }
  }
}
</style>
