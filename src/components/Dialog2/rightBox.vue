<template>
  <div class="home">
    <div class="right-box">
      <div class="teacher">
        <img :src="courseDetails.headImgUrl" alt="" />
        <div>
          <div>主讲老师:{{ courseDetails.lecturerName }}</div>
          <div>
            分类:{{
              courseDetails.label == 0
                ? "专家讲座"
                : courseDetails.label == 1
                ? "案例学习"
                : courseDetails.label == 2
                ? "任务驱动"
                : "参与式培训"
            }}
          </div>
        </div>
      </div>
      <div class="score">
        <div>
          {{ courseDetails.gradeDto.avgComment }}
          <p>课程总评分</p>
        </div>
        <div>
          <el-rate
            :value="courseDetails.gradeDto.avgComment / 2"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}"
          >
          </el-rate>

          <div class="num">{{ courseDetails.total }}人评价</div>
        </div>
      </div>
      <div class="course">
        <!-- <el-timeline>
                    <el-timeline-item
                      v-for="(
                        activity, index
                      ) in courseDetails.lecutrerCourseList"
                      :key="index"
                      :type="activity.type"
                      :size="activity.size"
                      :class="{ add: num == index }"
                    >
                      <span @click="selectCourse(activity, index)">{{
                        activity.courseName
                      }}</span>
                    </el-timeline-item>
                  </el-timeline> -->
        <ul class="timeline">
          <li
           :class="{ add: num == index }"
            v-for="(activity, index) in courseDetails.lecutrerCourseList"
            :key="index"
          >
            <div>{{ index + 1 }}</div>
            <span @click="selectCourse(activity, index)">{{
              activity.courseName
            }}</span>
          </li>
        </ul>
        <!-- <el-scrollbar style="height:100%">
				  			  <ul class="el-timeline">
				  			  			<li class="el-timeline-item"  v-for="(activity, index) in courseDetails.lecutrerCourseList" @click="selectCourse(activity,index)"
				  			  				:key="index"
				  			  				:type="activity.type"
				  			  				:size="activity.size"
				  			  				:class="{add:num == index}">
				  			  				<div class="el-timeline-item__tail" :class="num == index ? 'el-timeline-item__tail__node--primary' : ''"></div>
				  			  				<div class="el-timeline-item__node el-timeline-item__node--large" :class="num == index ? 'el-timeline-item__node--primary' : ''"></div>
				  			  				<div class="el-timeline-text">{{ activity.courseName }}</div> 
				  			  			  </li>
										  <li v-if="courseDetails.lecutrerCourseList.length == 0">无课程</li>
				  			  </ul>
				  </el-scrollbar> -->
      </div>
      <div @click="commit" class="btn">
        <img src="../../assets/img/courseDetails/comment3.png" alt="" />
        <span>评价</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["courseId"],
  data() {
    return {
      courseDetails: {},
      num: 0,
    };
  },
  created() {},
  computed: {},
  components: {},
  methods: {
    // 获取课程
    getCourse(courseId) {
      this.$api.getCourse(courseId).then((res) => {
        if (res.data.code == 200) {
          res.data.data.lecutrerCourseList.forEach((item, index) => {
            item.type = "primary";
            item.size = "large";
          });
          this.courseDetails = res.data.data;
        }
      });
    },
    commit() {
      this.$emit("commit", true);
    },
    // 选中课程
    selectCourse(item, index) {
      this.num = index;
      this.$router.push({
        path: "/CourseDetails",
        query: { courseId: item.courseId },
      });
      // this.$emit("getVideo", item.courseId);
    },
  },
  mounted() {
    this.getCourse(this.courseId);
  },
  watch: {
    courseId: {
      immediate: true,
      handler() {
        this.getCourse(this.courseId);
      },
    },
  },
  filters: {},
};
</script>
<style lang="less" >
// /deep/ .el-timeline {
//   .el-timeline-item {
//     padding-top: 10px;
//     padding-bottom: 28px;
//     cursor: pointer;
//   }
//   .el-timeline-item__tail {
//     left: 49px;
//     top: 10px;
//     z-index: 1;
//   }
//   .el-timeline-item__node {
//     left: 43px;
//     top: 10px;
//     z-index: 2;
//   }
//   .el-timeline-text {
//     top: 10px;
//     text-align: left;
//     padding-left: 80px;
//     color: #a5a5a5;
//   }
//   .el-timeline-item__tail__node--primary {
//     border-color: #409eff;
//   }
//   .add {
//     background: #1e1e1e;
//   }
//   /deep/ .el-timeline-item {
//     padding-bottom: 28px;

//     cursor: pointer;
//   }
//   /deep/ .el-timeline-item__wrapper {
//     top: 10px;
//   }
//   /deep/.el-timeline-item__node--primary {
//     background-color: #a5a5a5;
//   }
//   /deep/ .el-timeline-item__tail {
//     left: 49px;
//     top: 10px;
//   }
//   /deep/ .el-timeline-item__node--large {
//     left: 43px;
//     top: 10px;
//   }
//   /deep/ .el-timeline-item__content {
//     text-align: left;
//     margin-left: 60px;
//     color: #a5a5a5;
//     line-height: 21px;
//   }
// }
</style>
<style lang="less" scoped>
@deep:~ '>>>';
.right-box {
  width: 324px;
  height: 563px;
  background: #2d2d2d;
  > .teacher {
    padding-top: 24px;
    margin-bottom: 28px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    > img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      margin-right: 24px;
    }
    > div {
      > div:first-child {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #ffffff;
        margin-bottom: 6px;
      }
      > div:last-child {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #7d7d7d;
      }
    }
  }
  > .score {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    > div:first-child {
      font-size: 34px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #f8d214;
      > p {
        font-size: 9px;
        font-family: Source Han Sans CN, Source Han Sans CN-Regular;
        font-weight: 400;
        text-align: center;
        color: #999999;
        margin-top: 8px;
      }
    }
    > div:last-child {
      > .num {
        font-size: 14px;
        font-family: Source Han Sans CN, Source Han Sans CN-Regular;
        font-weight: 400;
        text-align: center;
        color: #a7a7a7;
        margin-top: 15px;
      }
    }
  }
  > .course {
    margin-top: 34px;
    height: 318px;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    .timeline {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
    
      > li {
          padding-left: 40px;
      padding-right: 10px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        height: 42px;
        cursor: pointer;
        margin-top: 5px;
        transition: all 0.75 ease;
        > div {
          color: #a5a5a5;
        }
        span {
          color: #a5a5a5;
          line-height: 21px;
          display: inline-block;
          width: 200px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          text-align: left;
          margin-left: 22px;
        }
      }
      >.add{
        background: #1e1e1e;
      }
    }
  }
  > .btn {
    width: 324px;
    height: 53px;
    background: #555555;
    text-align: center;
    line-height: 53px;
    cursor: pointer;
    > img {
      width: 32px;
      height: 30px;
      vertical-align: middle;
    }
    > span {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #999999;
      margin-left: 14px;
    }
  }
}
</style>