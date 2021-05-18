<template>
  <div class="Dialog">
    <div
      class="container"
      v-if="
        resourceFormatIdFk <= 3 ||
        resourceFormatIdFk == 5 ||
        resourceFormatIdFk == 6
      "
    >
      <div class="pic">
        <img
          :src="
            require(`../../assets/img/courseDetails/${resourceFormatIdFk}.png`)
          "
          alt=""
        />
      </div>
      <div class="contents">
        <div class="title">{{ data.courseName }}</div>
        <div class="teacher">
          主讲老师: <span>{{ data.lecturerName }}</span> 文档格式:
          <span>{{
            data.format == 1
              ? "Word"
              : data.format == 2
              ? "PDF"
              : data.format == 3
              ? "PPT"
              : data.format == 5
              ? "Excle"
              : "TXT"
          }}</span>
        </div>
        <div class="label">
          {{
            data.label == 0
              ? "专家讲座"
              : data.label == 1
              ? "案例学习"
              : data.label == 2
              ? "任务驱动"
              : "参与式培训"
          }}
        </div>
        <ul>
          <li>{{data.countStudy}}<span>浏览量</span></li>
          <li>{{data.countBuy}}<span>报名人数</span></li>
          <li @click="commit">
            <img src="../../assets/img/courseDetails/comment2.png" alt="" />

            <span>评价</span>
          </li>
        </ul>
      </div>

      <div class="score-box">
        <div class="score">
          <div>
            {{ data.gradeDto.avgComment }}
            <p>课程总评分</p>
          </div>
          <div>
            <el-rate
              :value="data.gradeDto.avgComment / 2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>

            <div class="num">{{ data.gradeDto.total }}人评价</div>
          </div>
        </div>
        <div class="btn" @click="dialogVisible = true">立即学习</div>
      </div>
    </div>
    <!-- <c_pdf
      ref="pdf"
      v-if="resourceFormatIdFk <= 3"
      :resourceAddr="resourceAddr"
    ></c_pdf> -->
    <!-- 视频 -->
    <div v-else-if="resourceFormatIdFk == 4" class="video-box">
      <c_video class="video" :resourceAddr="resourceAddr"></c_video>

      <div class="right-box">
        <div class="teacher">
          <img :src="data.headImgUrl" alt="" />
          <div>
            <div>主讲老师:{{ data.lecturerName }}</div>
            <div>
              分类:{{
                data.label == 0
                  ? "专家讲座"
                  : data.label == 1
                  ? "案例学习"
                  : data.label == 2
                  ? "任务驱动"
                  : "参与式培训"
              }}
            </div>
          </div>
        </div>
        <div class="score">
          <div>
            {{ data.gradeDto.avgComment }}
            <p>课程总评分</p>
          </div>
          <div>
            <el-rate
              :value="data.gradeDto.avgComment / 2"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}"
            >
            </el-rate>

            <div class="num">{{ data.gradeDto.total }}人评价</div>
          </div>
        </div>
        <div class="course">
          <!-- <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in data.lecutrerCourseList"
              :key="index"
              :type="activity.type"
              :size="activity.size"
              :class="{add:num == index}"
              
            >
             <span @click="selectCourse(activity,index)">{{ activity.courseName }}</span> 
            </el-timeline-item>
          </el-timeline> -->
		  <el-scrollbar style="height:100%">
			  <ul class="el-timeline">
			  			<li class="el-timeline-item"  v-for="(activity, index) in data.lecutrerCourseList" @click="selectCourse(activity,index)"
			  				:key="index"
			  				:type="activity.type"
			  				:size="activity.size"
			  				:class="{add:num == index}">
			  				<div class="el-timeline-item__tail" :class="num == index ? 'el-timeline-item__tail__node--primary' : ''"></div>
			  				<div class="el-timeline-item__node el-timeline-item__node--large" :class="num == index ? 'el-timeline-item__node--primary' : ''"></div>
			  				<div class="el-timeline-text">{{ activity.courseName }}</div> 
			  			  </li>
			  </ul>
		  </el-scrollbar>
		  
        </div>
        <div @click="commit" class="btn">
          <img src="../../assets/img/courseDetails/comment3.png" alt="" />
          <span>评价</span>
        </div>
      </div>
    </div>

    <c_audio
      v-else-if="resourceFormatIdFk == 7"
      :resourceAddr="resourceAddr"
    ></c_audio>
    <el-dialog :visible.sync="dialogVisible" width="60%">
      <c_pdf
        ref="pdf"
        v-if="resourceFormatIdFk <= 3"
        :resourceAddr="resourceAddr"
      ></c_pdf>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import c_audio from "./audio";
import c_pdf from "./pdf";
import c_video from "./video";
export default {
  name: "Dialog",
  components: {
    c_audio,
    c_pdf,
    c_video,
  },
  data() {
    return {
      num:0,
      resourceAddr: "", // 预览文件地址
      resourceFormatIdFk: "", // 文件类型
      data: {},
      dialogVisible: false,
      CourseEvaluateFlag: false, // 评价框
      activities: [
        {
          content: "狮王进行曲",
          size: "large",
          type: "primary",
          color: "#fff",
        },
        {
          content: "太阳出来喜洋洋",
          size: "large",
          color: "#fff",
        },
        {
          content: "雪绒花",
          size: "large",
          color: "#fff",
        },
        {
          content: "微笑波尔卡",
          size: "large",
          color: "#fff",
        },
      ],
    };
  },
  created() {},
  mounted() {},
  watch: {
    $route(to, from) {
      // if(to.query.courseId){
        
      // }
    },
  },
  methods: {
    // 选中课程
    selectCourse(item,index){
        this.num = index;
        this.$router.push({
          path: "/CourseDetails",
          query: { courseId: item.courseId },
        });
    },
    // 获取地址
    getData(params) {
      this.resourceFormatIdFk = params.format; // 文件类型
      params.lecutrerCourseList.forEach((item,index) => {
        item.type = 'primary';
        item.size = 'large'
      });
      this.data = params;

      let obj = {
        resourceUrl: params.baseUrl,
      };
      // axios.defaults.baseURL = '/fileApi';
      this.$api.online(obj).then((res) => {
		  if(res.data.code == 200){
			  this.resourceAddr = res.data.data.fileAddress;
		  }else{
			  this.$message({
			    showClose: true,
			    message: res.data.msg,
			    type: "warning",
			  });
		  }
        
      });
    },
    commit() {
      this.$emit("commit", true);
    },
    // 下载
    downloadWeekly(resourceInfoPhysicsAddr, fileName) {
      this.axios
        .post("http://fs.hnedu.cn/onlineFile/verifyUser", {
          pathUrl: resourceInfoPhysicsAddr,
          fileName: fileName,
        })
        .then((v) => {
          if (v.data.code == 200) {
            const u = "http://fs.hnedu.cn/onlineFile/download";
            this.axios({
              method: "POST",
              url: u,
              responseType: "blob",
              data: {
                pathUrl: resourceInfoPhysicsAddr,
                fileName: fileName,
              },
            })
              .then((res) => {
                const content = res.data;
                if (!content) {
                  return;
                }
                const blob = new Blob([content]);
                if ("download" in document.createElement("a")) {
                  // 非IE下载
                  const elink = document.createElement("a");
                  elink.download = fileName;
                  elink.style.display = "none";
                  elink.href = URL.createObjectURL(blob);
                  document.body.appendChild(elink);
                  elink.click();
                  URL.revokeObjectURL(elink.href); // 释放URL 对象
                  document.body.removeChild(elink);
                } else {
                  // IE10+下载
                  navigator.msSaveBlob(blob, file);
                }
              })
              .catch();
          } else {
            this.$message({
              type: "info",
              message: v.data.msg,
            });
          }
        });
    },
  },
};
</script>
<style lang="less" scoped>
	@deep:~'>>>';
.Dialog {
  .container {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    height: 310px;
    background-color: #fff;
    > .pic {
      width: 212px;
      height: 256px;
      margin-left: 34px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    > .contents {
      margin-left: 48px;
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      > .title {
        font-size: 26px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #000000;
        margin-bottom: 16px;
      }
      > .teacher {
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #999999;
        > span {
          color: #000;
          font-size: 14px;
          margin-right: 10px;
          font-weight: 500;
        }
      }
      > .label {
        width: 76px;
        height: 26px;
        background: rgba(61, 120, 255, 0.23);
        border-radius: 4px;
        font-size: 12px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        color: #3d78ff;
        line-height: 26px;
        margin-bottom: 36px;
        margin-top: 20px;
      }
      > ul {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        > li {
          font-size: 32px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #000000;
          > span {
            color: #707070;
            font-size: 16px;
            display: block;
            margin-top: 5px;
          }

          > img {
            width: 32px;
            height: 30px;
            cursor: pointer;
          }
        }
      }
    }
    > .score-box {
      margin-left: 236px;
      > .score {
        display: flex;
        justify-content: flex-start;
        > div:first-child {
          font-size: 34px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
          > p {
            font-size: 9px;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            margin-top: 8px;
          }
        }
        > div:last-child {
          width: 140px;
          .num {
            font-size: 14px;
            font-family: Source Han Sans CN, Source Han Sans CN-Regular;
            font-weight: 400;
            text-align: center;
            color: #a7a7a7;
            margin-top: 20px;
          }
        }
      }
      > .btn {
        margin-top: 37px;
        width: 140px;
        height: 43px;
        background: #fd624c;
        border-radius: 5px;
        font-size: 26px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 43px;
        cursor: pointer;
      }
    }
  }
  .video-box {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    width: 100%;
    > .video {
      width: 886px;
    }
    > .right-box {
      width: 324px;
      height: 569px;
      background: #2d2d2d;
      > .teacher {
        margin-top: 24px;
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
        height: 320px;
        overflow: auto;
        ::-webkit-scrollbar {
          display: none; /* Chrome Safari */
        }
        /deep/ .el-timeline {
			.el-timeline-item{
				padding-top: 10px;
				padding-bottom: 28px;
				cursor: pointer;
			}
			.el-timeline-item__tail{
				left: 49px;
				top: 10px;
				z-index: 1;
			}
			.el-timeline-item__node{
				left: 43px;
				top: 10px;
				z-index: 2;
			}
			.el-timeline-text{
				top: 10px;
				text-align: left;
				padding-left: 80px;
				color: #a5a5a5;
			}
			.el-timeline-item__tail__node--primary{
				border-color: #409EFF;
			}
          .add{
            background: #1e1e1e;
          }
          /deep/ .el-timeline-item {
            padding-bottom: 28px;
            
            cursor: pointer;
          }
          /deep/ .el-timeline-item__wrapper {
            top: 10px;
          }
          /deep/.el-timeline-item__node--primary {
            background-color: #a5a5a5;
          }
          /deep/ .el-timeline-item__tail {
            left: 49px;
            top: 10px;
          }
          /deep/ .el-timeline-item__node--large {
            left: 43px;
            top: 10px;
          }
          /deep/ .el-timeline-item__content {
            text-align: left;
            margin-left: 60px;
            color: #a5a5a5;
            line-height: 21px;
          }
        }
      }
      > .btn {
        width: 324px;
        height: 58px;
        background: #555555;
        text-align: center;
        line-height: 58px;
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
  }
}
</style>