<template>
  <div class="home">
    <div class="container">
      <div class="tdetail-top">
        <div class="teachin-list">
          <el-row>
            <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
              <div class="details">
                <el-row>
                  <el-col :xs="6" :sm="6" :md="3" :lg="3" :xl="3">
                    <img
                      v-if="courseContent.resourceFormatIdFk"
                      :src="
                        require(`../assets/img/fileType2/${courseContent.resourceFormatIdFk}.png`)
                      "
                      alt=""
                      style="width: 100px; height: 100px"
                    />
                  </el-col>
                  <!-- <el-col :xs="24" :sm="24" :md="5" :lg="5" :xl="5">
                  <pdimgThree :lx="courseContent.formatName"></pdimgThree>
                </el-col> -->
                  <el-col :xs="18" :sm="18" :md="19" :lg="19" :xl="19">
                    <div class="list-wz1">
                      <el-row>
                        <el-col :xs="24" :sm="24" :md="10" :lg="10" :xl="10">
                          <div>{{ courseContent.resourceInfoName }}</div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
                          <div>
                            {{
                              courseContent.uploadType == 0
                                ? "大赛"
                                : courseContent.uploadType == 1
                                ? "工作室"
                                : courseContent.uploadType == 2
                                ? "平台"
                                : ""
                            }}
                          </div>
                        </el-col>
                        <el-col :xs="12" :sm="12" :md="4" :lg="4" :xl="4">
                          <div>
                            {{
                              courseContent.resourceTypeIdFk == 1
                                ? "教学设计"
                                : courseContent.resourceTypeIdFk == 2
                                ? "教学课件"
                                : courseContent.resourceTypeIdFk == 3
                                ? "课堂实录"
                                : courseContent.resourceTypeIdFk == 4
                                ? "素材"
                                : courseContent.resourceTypeIdFk == 5
                                ? "微课"
                                : courseContent.resourceTypeIdFk == 6
                                ? "习题"
                                : courseContent.resourceTypeIdFk == 7
                                ? "试卷"
                                : courseContent.resourceTypeIdFk == 8
                                ? "工具"
                                : courseContent.resourceTypeIdFk == 9
                                ? "数学教才"
                                : courseContent.resourceTypeIdFk == 10
                                ? "实验"
                                : courseContent.resourceTypeIdFk == 11
                                ? "课标解读"
                                : courseContent.resourceTypeIdFk == 12
                                ? "教材教法"
                                : courseContent.resourceTypeIdFk == 13
                                ? "教学反思"
                                : (courseContent.resourceTypeIdFk = 14
                                    ? "教学资源包"
                                    : "教学视频")
                            }}
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="18" :lg="18" :xl="18">
                    <div class="list-wz2">
                      {{ courseContent.resourceInfoDescription }}
                    </div>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">
                    <div class="list-wz3">
                      <div>
                        {{
                          courseContent.resourceScore == null
                            ? "0"
                            : courseContent.resourceScore
                        }}分
                      </div>
                      <div>{{ courseContent.resourceInfoViewnumber }}阅读</div>
                      <div>{{ courseContent.resourceDownload }}下载</div>
                      <div>{{ courseContent.uploadTime | uploadTime }}上传</div>
                      <div>
                        {{ courseContent.resourceSize }}
                      </div>
                      <div>作者：{{ courseContent.resourceAuthorName }}</div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" :lg="6" :xl="6">
              <div class="list-bt hidden-md-and-down">
                <div>
                  <a target="_blank" @click="xzl(courseContent.resourceInfoId)">
                    点击下载
                  </a>
                </div>
                <!-- <div
            v-if="courseContent.enshrineStatus == '0' ? '0' : '1'"
            @click="collectResource(),(id = courseContent.resourceInfoId)"
          >
            <Icon type="md-heart" />
            加入收藏
          </div> -->
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
      <div class="main el-row">
		  <div class="el-col-xl-17">
			  
		  
        <div id="dplayer" v-show="courseContent.resourceFormatIdFk == 6" ref="dplayer"></div>
		<c_pdf
		  ref="pdf"
		  v-if="courseContent.resourceFormatIdFk <= 5"
		  :resourceAddr="resourceAddr"
		></c_pdf>
		<!-- <c_video
		  v-else-if="courseContent.resourceFormatIdFk == 6"
		  :resourceAddr="resourceAddr"
		></c_video> -->
		<c_audio
		  v-else-if="courseContent.resourceFormatIdFk == 7"
		  :resourceAddr="resourceAddr"
		></c_audio>
		<c-img v-else-if="courseContent.resourceFormatIdFk == 8" :resourceAddr="resourceAddr">
		</c-img>
		<c-article
		      v-else-if="courseContent.resourceFormatIdFk == 10"
		      :resourceAddr="resourceAddr"
		    >
		    </c-article>
			</div>
		<div class="detailRight el-col-xl-7">
			<detailRight v-if="courseContent.resourceFormatIdFk" :id="resourceInfo.id" :resource="courseContent" @succeedRate="succeedRate"></detailRight>
		</div>
      </div>
      <Download ref="download" />
    </div>
  </div>
</template>
<script>
import DPlayer from "dplayer";
import Download from "../components/downloadResource/downLoad";
import CourseEvaluate from "@/components/Personal-Center/Course-evaluate"; // 评价
import c_audio from "../components/Dialog2/audio";
import c_pdf from "../components/Dialog2/pdf";
import c_video from "../components/Dialog2/video"; 
import cImg from "../components/Dialog2/img";
import cArticle from "../components/Dialog2/Article";
import detailRight from "../components/Dialog2/detailRight";
export default {
  components: {
    Download,
	CourseEvaluate,
	c_audio,
	c_pdf,
	c_video,
	cImg,
	cArticle,
	detailRight
  },
  data() {
    return {
      resourceInfo: {},
      courseContent: {},
      currentTime: "",
	  resourceInfoAddr:"",
	  resourceAddr:"",
    };
  },
  filters: {
    uploadTime(val) {
      if (val) {
        return `${val.substring(0, 10)}`;
      }
    },
  },
  watch:{
  },
  created() {
    if (this.$route.query.tdata) {
        
      this.resourceInfo = JSON.parse(this.$route.query.tdata);
    //   this.$store.commit("SET_TOKEN", this.$route.query.tdata.token);
    //   this.$http.defaults.headers.common[
    //     "token"
    //   ] = this.$route.query.tdata.token;
      this.getResource(this.resourceInfo);
    }
  },
  mounted() {},
  methods: {
    getResource(resourceInfo) {
      this.$api.resourceInfo({ id: resourceInfo.id }).then((res) => {
		  let obj = {
		    resourceUrl: res.data.data.resourceInfoAddr
		  };
		  this.$api.online(obj).then((res) => {
		    // this.resourceAddr = res.data.data.fileAddress;
			this.resourceAddr = res.data.data.fileAddress
		  });
		// this.resourceInfoAddr = res.data.data.resourceInfoAddr
        this.courseContent = res.data.data;
		console.log(this.courseContent)
		// this.resourceAddr = res.data.data.resourceInfoAddr
		if(this.courseContent.resourceFormatIdFk == 6){
				  this.getVideo(this.courseContent);
		}
        
      });
    },
    xzl() {
      this.$refs.download.downloadWeekly({
        resourceInfoPhysicsAddr: this.courseContent.resourceInfoPhysicsAddr,
        resourceOrigin: this.courseContent.resourceOrigin,
        originality: this.courseContent.originality,
        resourceInfoId: this.courseContent.resourceInfoId,
      });
    },
    getVideo(item) {
      var that = this;
      console.log(item);
      this.dp = new DPlayer({
        container: document.getElementById("dplayer"),
        autoplay: true,
        video: {
          quality: [
            {
              name: "基础",
              url: item.resourceInfoAddr,
            },
          ],
          defaultQuality: 0,
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

      // 定时器
      this.menu_show_setInterval = setInterval(() => {
        that.currentTime = that.dp.video.currentTime;
        if (document.querySelector(".dplayer-menu")) {
          document.querySelector(".dplayer-menu").style = " display:none"; // 隐藏右键菜单
        }
      }, 10);
      document.oncontextmenu = () => false; // 阻止页面所有右键事件
    },
	succeedRate(){
		this.getResource(this.resourceInfo);
	}
  },
};
</script>
<style lang="less" scoped>
.home {
  background: #ffffff;
  .tdetail-top {
    width: 1200px;
    background: #ffffff;
    padding: 15px 0;
    box-shadow: 0px 1px 3px 0px rgb(221, 221, 221);
    margin: 20px 0;
    .list-bt {
      display: flex;
      > div:nth-child(1) {
        background: #0a76da;
        color: #fff;
      }
      .collect {
        background: rgba(255, 67, 66, 1);
        color: #fff;
        // margin: 20px 20px;
        // margin-left: 20px;
      }
    }
    .teachin-list {
      display: flex;
      justify-content: space-between;
      background: #ffffff;
      margin: 15px 0px;
      > .el-row {
        width: 100%;
        > .el-col {
          > .details {
            display: flex;
            // width: 85%;
            > .el-row {
              width: 100%;
              > .el-col {
                > div:nth-child(1) {
                  // width: 92px;
                  // height: 108px;
                  position: relative;
                }
              }
            }
          }
          > .list-bt {
            margin-top: 0px;
            margin-right: 20px;
            > div:nth-child(1),
            > div:nth-child(2) {
              margin: 20px 0px;
              margin-left: 20px;
              width: 111px;
              height: 33px;
              line-height: 31px;
              border-radius: 17px;
              background: #ffffff;
              font-size: 14px;
              text-align: center;
            }
            > div:nth-child(1) {
              border: 1px solid #0a76da;
              a {
                color: #0a76da;
              }
            }
            > div:nth-child(1):hover {
              background-color: #0a76da;
              a {
                color: #fff;
                cursor: pointer;
              }
            }
            .collect {
              margin-left: 20px;
              border: 1px solid rgba(255, 68, 66, 1);
              color: rgba(255, 68, 66, 1);
            }
            .collect:hover {
              color: #fff;
              background-color: rgba(255, 68, 66, 1);
            }
          }
        }
      }

      .icon {
        width: 92px;
        height: 108px;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;
        position: absolute;
      }
    }
    .list-wz1 {
      font-size: 20px;
      width: 100%;
      margin-top: 10px;
      display: flex;
      align-items: center;
      font-weight: 400;
      color: #343434;
      text-align: left;
      > .el-row {
        width: 100%;
        > .el-col:nth-child(1) {
          > div {
            margin-right: 10px;
            font-weight: 600;
          }
        }
        > .el-col:nth-child(2),
        > .el-col:nth-child(3) {
          > div {
            text-align: center;
            padding: 0px 14px;
            border-radius: 13px;
            height: 26px;
            line-height: 24px;
            font-size: 14px;
            margin-left: 10px;
          }
        }
        > .el-col:nth-child(2) {
          > div {
            border: 1px solid #009a44;
            color: #009a44;
          }
        }
        > .el-col:nth-child(3) {
          > div {
            color: rgba(250, 104, 15, 1);
            border: 1px solid rgba(250, 104, 15, 1);
          }
        }
      }
    }
    .list-wz2 {
      // width: 722px;
      line-height: 1.5em;
      font-size: 14px;
      margin-top: 6px;
      color: #666666;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
      overflow: hidden;
      text-align: left;
    }
    .list-wz3 {
      padding-left: 100px;
      font-size: 14px;
      font-weight: 400;
      color: #666666;
      height: 22px;
      line-height: 22px;
      > div {
        float: left;
        position: relative;
        padding: 0px 10px;
        // border-right: 1px solid rgba(51, 51, 51, 0.23);
      }
      > div::after {
        content: "";
        position: absolute;
        top: 4px;
        right: 0;
        bottom: 4px;
        width: 1px;
        background-color: #d0d0d0;
      }
      > div:last-child::after {
        display: none;
      }
      i {
        color: RGBA(255, 67, 66, 1);
        font-size: 22px;
      }
    }
  }
  .main {
	  display: flex;
	  justify-content: space-between;
	  .detailRight{
		  margin-left: 20px;
	  }
    #dplayer {
      width: 100%;
      height: 600px;
      margin-bottom: 50px;
    }
  }
}
</style>