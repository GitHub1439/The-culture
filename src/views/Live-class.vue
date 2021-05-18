<template>
  <div class="Live-class">
	  <div class="live-head">
		  <el-breadcrumb separator-class="el-icon-arrow-right">
		    <el-breadcrumb-item :to="{ path: '/' }">教研成果</el-breadcrumb-item>
			<el-breadcrumb-item >直播课堂</el-breadcrumb-item>
		    <el-breadcrumb-item>直播列表</el-breadcrumb-item>
		  </el-breadcrumb>
		  <div style="height: 22px;">{{this.liveList.length > 0 ? courseBanner.courseName : ""}}</div>
	  </div>
    <!-- 直播课程菜单 -->
    <div class="liveCourse-menu">
      <div class="container">
        
        
        <!-- <div
          class="video-Notice"
          v-else-if="courseBanner.isPlay == 0"
          :style="`background:url(${courseBanner.courseLogo}) no-repeat;background-size: 100% 100%;`"
        >
          <div class="meng"></div>
          <div class="title">
            <div>
              <img src="../assets/img/Live-class/video-recorder.png" alt="" />
              <span>即将直播</span>
            </div>
          </div>
          <div class="date">{{ courseBanner.beginCourseTime }}</div>
          <div class="courseName">{{ courseBanner.courseName }}</div>
        </div> -->
        <div class="video-box">
			<div class="video-none" v-if="this.liveList.length == 0 && courseBanner.isPlay == 0">
			  <img src="../assets/img/Live-class/none2.png" alt="" />
			</div>
          <div class="left-box"  v-if="courseBanner.isPlay == 1 || courseBanner.isPlay == 2">
            <img :src="courseBanner.courseLogo" alt />
            <div class="shadow-box"></div>
            <div class="play">
              <img
                src="../assets/img/Live-class/play.png"
                v-if="courseBanner.isPlay == 1 || courseBanner.isPlay == 2"
                @click="videoJump(courseBanner)"
                alt
              />
              <!-- -->
            </div>
            <div class="courseFlag">
              <img
                v-if="courseBanner.isPlay == 1"
                src="../assets/img/Live-class/video-flag-fff.gif"
                alt
              />
              <span v-if="courseBanner.isPlay == 0">暂未开播</span>
              <span v-if="courseBanner.isPlay == 1">直播中</span>
              <span v-if="courseBanner.isPlay == 2">直播结束</span>
            </div>
            <div class="live-desc">
              <div class="title">{{ courseBanner.courseName }}</div>
              <div class="time">
                开播时间：{{
                  courseBanner.beginCourseTime +
                  "~" +
                  courseBanner.endCourseTime
                }}
              </div>
            </div>
          </div>
		  
		  <div
		    class="video-Notice"
		    v-else-if="courseBanner.isPlay == 0 && this.liveList.length > 0"
		    :style="`background:url(${courseBanner.courseLogo}) no-repeat;background-size: 100% 100%;`"
		  >
		    <div class="meng"></div>
		    <div class="title">
		      <div>
		        <img src="../assets/img/Live-class/video-recorder.png" alt="" />
		        <span>即将直播</span>
		      </div>
		    </div>
		    <div class="date">{{ courseBanner.beginCourseTime }}</div>
		    <div class="courseName">{{ courseBanner.courseName }}</div>
		  </div>

          <div class="live-list">

            <div class="title">
				<ul>
					<li v-for="(item,index) in liveListQuery" :key="index" :class="index == liveActive ? 'live-active' : ''" @click="changeList(index)">{{item}}</li>
					<!-- <li>未开始</li>
					<li>直播</li>
					<li>回放</li> -->
				</ul>
			</div>
            <ul>
              <li v-for="(item,index) in liveList" @click="liveId = --index,getCourseDetails(item.id)" :key="index" :class="[{selectLive:liveId===index},liveListClass[item.isPlay]]">
                      <div> <!-- <img v-if="liveId===index" src="../assets/img/Live-class/video-flag-fff.gif" alt=""> --><span class="id" v-show="false">{{index+=1}}</span>   <span class="name">{{item.courseName | courseName}}</span></div>
                      <div>{{item.beginCourseTime}} 
						<div v-if="item.isPlay == 1"><img src="../assets/img/Live-class/video-now.png" alt=""><span style="color: #3D78FF;">直播中</span></div>
						<div v-if="item.isPlay == 0" class="disable-btn">未开始</div>
						<div class="playback" v-if="item.isPlay == 2" @click.stop="videoJump(item)">回放</div>
					  </div>
                  
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- 直播课程表 -->
    <!-- 直播回放 -->
    <div class="excellent-course">
      <div class="container">
        <div class="header-nav">
          <div class="category">直播回放</div>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, index) in classify"
              :key="index"
              :label="item.categoryName"
              :name="item.id.toString()"
            ></el-tab-pane>
          </el-tabs>
        </div>
        <div class="course-list">
          <ul>
            <span v-if="liveLimitCourseList.length == 0">暂无直播</span>
            <li
              v-for="(item, index) in liveLimitCourseList"
              :key="index"
              @click="videoJump(item)"
            >
              <img :src="item.courseLogo" alt />

              <div class="course-title">
                {{ item.courseName | courseName }}
              </div>
              <div class="live-date">
                开课时间:{{ item.beginCourseTime | beginCourseTime }}
              </div>
              <div class="bottom">
                <div class="live-teacher">
                  {{ item.lecturerName }}
                </div>
                <!-- <div class="live-time">
                  直播时间：{{ item.beginCourseTime.substring(11, 16) }}
                </div> -->
              </div>
			  <div class="logo-code">
				  <img src="../assets/img/Live-class/zhibo.png" alt=""><span>视频</span>
			  </div>

              <div class="course-cover">
                <div
                  class="course-flag"
                  v-if="item.isPlay == 0"
                  style="background-color: #0d0d0f"
                >
                  {{ item.beginCourseTime | beginCourseTime }}
                </div>
                <!-- <div
                  class="course-flag"
                  v-if="item.isPlay == 1 || item.isPlay == 2"
                >
                  进入直播间
                </div> -->
				<div class="zhibo-play">
					<img src="../assets/img/Live-class/zhibo-play.png" alt="">
				</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="page">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageForm.total"
        :current-page="pageForm.pageIndex"
        :page-size="pageForm.pageSize"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Live-class",
  components: {},
  data() {
    return {
      that: this,
      liveId:0,
      courseBanner: {}, // 课程banner
      dateCourseList: [], // 日期课程列表
      liveFlag: "", // 直播状态
      activeName: "1000",
      liveId: "",
      liveCourseList: [], // 直播课程列表
      classify: [], //三级目录
      liveLimitCourseList: [],
      liveList:[],
      pageForm: {
        pageNum: 1,
        pageSize: 8,
        total: 0,
		isPlay:2
      },
	  query: {
		  isPlay:""
	  },
	  liveListQuery:["直播目录","未开始","直播","回放"],
	  liveActive:0,
	  liveListClass:["noBegin","now","finnish"]
    };
  },
  created() {
    this.getClassify(); //获取三级目录
    this.getLimitLive(""); //获取直播集合
    this.getCourseBanner(); // 获取课程轮播
	this.changeList()
    // this.courseLivePageCalendar();//获取直播列表
  },
  mounted() {},
  methods: {
    // 获取课程轮播
    getCourseBanner() {
      this.$http
        .get("course/courseLive/course/courseLivePageBanner")
        .then((res) => {
          this.courseBanner = res.data.data;
        });
    },
    courseLivePageCalendar(){
      this.$api.courseLivePageCalendar({isPlay:0}).then(res=>{
              this.liveList = res.data.data
      })
    },
    // 直播列表
    handleClick(tab, event) {
      console.log(tab);
      this.pageForm.pageNum = 1;
	  if(tab.label == "全部"){
		  this.getLimitLive("");
	  }else{
		  this.getLimitLive(tab.name);
	  }
      
    },
    //获取三级分类接口
    getClassify() {
      this.$http
        .get(
          "course/category/getClassChildren?parentId=1303274563601207429&type=3&userId=" +
            this.$store.getters.user.id
        )
        // this.$api.liveClassChildren(this.$store.getters.user.id,1303274563601207429)
        .then((res) => {
          this.classify = res.data.data.list;
		  this.activeName = this.classify.length > 0 ? this.classify[0].id : ""
        });
    },
    //分页查询直播
    getLimitLive(categoryId) {
      // this.$http
      //   .get("course/courseLive/course/courseLivePage", {
      //     pageSize: this.pageForm.pageSize,
      //     pageNum: this.pageForm.pageIndex,
      //     categoryId: categoryId,
      //   })
      this.$api.courseLivePage(categoryId || "", this.pageForm).then((res) => {
        this.liveLimitCourseList = res.data.data.rows;
        this.pageForm.total = res.data.data.total;
      });
    },
    // 分页
    handleCurrentChange(val) {
      this.pageForm.pageNum = val;
      this.getLimitLive(this.activeName);
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
      this.$http
        .post("course/coursestudy/recordStatus", {
          courseId: courseId,
          tutorialMode: tutorialMode,
        })
        .then((res) => {});
    },
    getCourseDetails(id){
      this.$api.courseDetail(id).then(res=>{
        this.courseBanner = res.data.data
      })
    },
	changeList(index){//筛选直播类型
		this.liveActive = index || ""
		if(index){
			this.query.isPlay = (index -1)< 0 ?  "" : (index -1)
		}else{
			this.query.isPlay = ""
		}
		let query = this.query
		this.$api.courseLivePage("", query).then((res) => {
				  this.liveList = res.data.data.rows
				  this.liveId = 0
				  this.getCourseDetails(res.data.data.rows[0].id)
		});
	},
	playback(){//直播回放
		
	},
    // 日期对比
    DateDifferences(faultDate, completeTime) {
      var stime = new Date(faultDate).getTime();
      var etime = new Date(completeTime).getTime();
      var usedTime = etime - stime; //两个时间戳相差的毫秒数
      return usedTime;
    },
    // 日期对比
    DateDifference(faultDate, completeTime) {
      var stime = new Date(faultDate).getTime();
      var etime = new Date(completeTime).getTime();
      var usedTime = etime - stime; //两个时间戳相差的毫秒数
      var days = Math.floor(usedTime / (24 * 3600 * 1000));
      //计算出小时数
      var leave1 = usedTime % (24 * 3600 * 1000); //计算天数后剩余的毫秒数
      var hours = Math.floor(leave1 / (3600 * 1000));
      //计算相差分钟数
      var leave2 = leave1 % (3600 * 1000); //计算小时数后剩余的毫秒数
      var minutes = Math.floor(leave2 / (60 * 1000));
      var time = days + "天" + hours + "时" + minutes + "分";
      return usedTime;
    },
    DateDifferences(faultDate, completeTime) {
      var stime = new Date(faultDate).getTime();
      var etime = new Date(completeTime).getTime();
      var usedTime = etime - stime; //两个时间戳相差的毫秒数
      return usedTime;
    },
    // 获取当前时间
    getTime() {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hh = date.getHours();
      var mm = date.getMinutes();
      var ss = date.getSeconds();
      var rq = year + "-" + month + "-" + day + " " + hh + ":" + mm + ":" + ss;
      return rq;
    },
  },
  watch: {},
  filters: {
    beginCourseTime(val, that) {
      if (val) {
        return val.substring(5, 10);
      }
    },
    courseName(val) {
      if (val.length > 14) {
        return `${val.substring(0, 14)}...`;
      } else {
        return val;
      }
    },
  },
};
</script>
<style lang="less">
.page {
  margin-top: 80px;
  padding-bottom: 50px;
  .el-pagination {
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
}
.Live-class {
  padding-top: 30px;
  min-height: 100vh;
  // 直播课程菜单
  .live-head{
	  width: 1200px;
	  margin: 0px auto 10px;
	  text-align: left;
	  font-size: 24px;
	  .el-breadcrumb{
		  font-size: 18px;
		  margin-bottom: 23px;
	  }
  }
  > .liveCourse-menu {
    .video-none {
      width: 100%;
      height: 539px;
      > img {
        width: 100%;
        height: 100%;
      }
    }
    .video-Notice {
      // position: relative;
      // width: 100%;
      height: 539px;
      font-size: 32px;
      color: #ffffff;
	  border-radius: 5px;
	  margin-right: 6px;
	  flex: 1;
	  background-size: 100% 100%!important;
      > .meng {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 351px;
        background: rgba(0, 0, 0, 0.6);
      }
      > .title {
        position: relative;
        padding: 131px 0 75px 0;
        > div {
          text-align: center;
          > img {
            width: 88px;
            height: 79px;
            vertical-align: middle;
          }
          > span {
            width: 128px;
            color: #ffffff;
            display: inline-block;
            transform: translate(19px, 16px);
          }
        }
      }
      > .date,
      > .courseName {
        position: relative;
        text-align: center;
        margin-bottom: 14px;
      }
    }
    .video-box {
      float: left;
      position: relative;
      width: 100%;
      height: 539px;
	  display: flex;
	  > .video-none{
		  margin-right: 6px;
	  }
      > .left-box {
        width: 849px;
        height: 539px;
        float: left;
		margin-right: 6px;
        // position: relative;
        > .live-desc {
          position: absolute;
          bottom: 0;
          width: 849px;
          height: 56px;
          background: rgba(0, 0, 0, 0.7);
          display: flex;
          justify-content: space-between;
          flex-flow: row nowrap;
          align-items: center;
          border-radius: 3px;
		  border-bottom-left-radius: 5px;
		  border-bottom-right-radius: 5px;
          > div:first-child {
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            margin-left: 21px;
			letter-spacing:2px;
          }
          > div:last-child {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #ffffff;
            margin-right: 19px;
			letter-spacing:1px;
          }
        }
        > img {
          position: absolute;
          z-index: -1;
          top: 0;
          left: 0;
          width: 849px;
          height: 100%;
          object-fit: cover;
          border-radius: 5px;
        }
        > .shadow-box {
          position: absolute;
          top: 0;
          left: 0;
          z-index: -1;
          width: 849px;
          height: 100%;
          opacity: 0.6;
          background: #232323;
          border-radius: 5px;
        }
        > .play {
          text-align: center;
          margin-top: 150px;
          > img {
            width: 96px;
            height: 96px;
            cursor: pointer;
          }
          // font-size: 20px;
          // text-align: center;
          // color: #ffffff;
        }
        > .courseFlag {
          margin-left: 282px;
          margin-top: 46px;
          width: 286px;
          height: 64px;
          background: #17140f;
          border-radius: 32px;
          line-height: 64px;
          text-align: center;
          > img {
            transform: translateY(-2px);
            width: 24px;
            height: 24px;
            vertical-align: middle;
          }
          > span {
            color: #ffffff;
            font-size: 18px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
          }
        }
        > .enter {
          cursor: pointer;
          margin: 0 auto;
          width: 186px;
          height: 50px;
          background: #3d78ff;
          border-radius: 4px;

          line-height: 50px;
          font-size: 20px;
          text-align: center;
          color: #ffffff;
        }
      }

      > .live-list {
        box-sizing: border-box;
        // position: absolute;
        right: 0;
        top: 0;
        width: 345px;
        height: 100%;
        background: #2d2d2d;
        // border-top-right-radius: 10px;
        // border-bottom-right-radius: 10px;
		border-radius: 5px;
        >.title{
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #ffffff;
          padding: 13px 0;
          margin-left: 21px;
		  width: 345px;
		  >ul{
			  display: flex;
			  align-items: center;
			  color: #999999;
			  font-size: 12px;
			  >li{
				cursor: pointer;
				  margin: 0 5px;
			  }
			  >.live-active{
				  color: #ffffff;
				  font-size: 16px;
			  }
		  }
        }
        >ul{
          height: 493px;
          overflow: auto;
          &::-webkit-scrollbar {
            display: none; /* Chrome Safari */
          }
		  >.noBegin{
		  	  background: #1e1e1e;
			  color: #ffffff;
			  >div:first-child{
				// color: #999999;
				>.name{
				  // color: #ffffff;
				}
			  }
			  div:last-child{
				  color: #999999;
				  .disable-btn{
					  background-color: #999999;
					  color: #ffffff;
					  width: 46px;
					  height: 21px;
					  text-align: center;
					  line-height: 21px;
					  border-radius: 21px;
					  justify-content: center;
				  }
			  }
		  }
		  .finnish{
		  			      background: #1e1e1e;
		  }
          >.selectLive{
            background: #14100D;
            >div:first-child{
              color:rgba(253,98,76,1);
			  >.name{
			    color:#3D78FF;
			  }
            }
            >div:last-child{
               // margin-left:53px;
            }
          }
          
          >li{
            padding: 11px 51px 11px 21px;
            cursor: pointer;
			color:#ffffff;
            background: #1e1e1e;
            >div:first-child{
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
font-weight: 400;
text-align: left;
font-size: 14px;
color: #ffffff;
transition: all .3s ease;
               >img{
              width: 19px;
              height: 19px;
              vertical-align: middle;
              margin-right: 11px;
            }
            >.id{
              margin-right: 11px;
            }
            >.name{
              
            }
            }
            >div:last-child{
              font-size: 12px;
                color:rgba(255,255,255,.6);
                // margin-left:21px ;
                // margin-top:5px ;
                text-align: left;
                 transition: all linear 0.2;
				 display: flex;
				 justify-content: space-between;
				 align-items: flex-end;
				 height: 21px;
				 div{
					 display: flex;
					 align-items: center;
				 }
				 .playback{
					 width: 46px;
					 height: 21px;
					 color: #ffffff;
					 background-color: #3D78FF;
					 text-align: center;
					 line-height: 21px;
					 border-radius: 21px;
					 justify-content: center;
				 }
				 img{
					 width: 19px;
					 height: 15px;
					 margin-right: 5px;
				 }
            }
           
           

          }
		  >li:hover{
			  background: #14100D;
			  >.name{
			    color:#3D78FF;
			  }
			  >div:first-child{
			    >.name{
			      color:#3D78FF;
			    }
			  }
		  }
        }
      }
    }
  }

  // 精品课程
  > .excellent-course {
    .header-nav {
      padding: 58px 0 20px 0;
      > .category {
        // float: left;
        text-align: left;
        font-size: 32px;
        line-height: 24px;
        border-bottom: 1px solid #d9d4d4;
        padding-bottom: 26px;
      }
      > .el-tabs {
        .el-tabs__item.is-active {
          color: #3d78ff;
        }
        .el-tabs__item {
          font-size: 16px;
          color: #262626;
        }
        .el-tabs__active-bar {
          height: 3px;
          border-radius: 6px;
          background-color: #3d78ff;
        }
        .el-input__inner {
          height: 42px;
        }
        .el-tabs__header {
        }
        .el-tabs__content {
        }
        .el-tabs__nav-wrap::after {
          height: 0;
        }
      }
    }
    .course-list {
      > ul {
        > li {
          overflow: hidden;
          margin: 0 41px 50px 0;
          float: left;
          cursor: pointer;
          position: relative;
          width: 285px;
          height: 332px;
          box-sizing: border-box;
          border-radius: 10px;
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
		  padding-bottom: 53px;
		  .logo-code{
			  position: absolute;
			  // left: 20px;
			  bottom: 157px;
			  display: flex;
			  align-items: center;
			  color: #FFFFFF;
			  font-size: 12px;
			  padding: 5px 20px;
			  // background-color: rgba(23,76,130,0.5);
			  background-image: linear-gradient(to right, #0043ff, #ffffff);
			  opacity: 0.5;
			  width: 100%;
			  box-sizing: border-box;
			  img{
				  width: 19px;
				  height: 17px;
				  margin-right: 5px;
			  }
		  }
          > img {
            display: block;
            width: 100%;
            height: 175px;
          }
          > .course-title {
            padding: 14px 14px 20px 14px;
            color: #0d0d0f;
            text-align: left;
			font-size: 14px;
			color: #000000;
			line-height: 20px;
          }
          > .live-date {
            margin-left: 16px;
            color: #7d7d7d;
            text-align: left;
			font-size: 16px;
          }
          > .bottom {
            border-top: 1px solid #e0e0e0;
            display: flex;
            flex-flow: row nowrap;
            justify-content: space-between;
            // margin-top:36px;
            padding: 10px 16px;
			position: absolute;
			height: 53px;
			box-sizing: border-box;
			bottom: 0;
			width: 100%;
            > .live-teacher,
            > .live-time {
              font-size: 12px;
              color: 7d7d7d;
			  line-height: 32px;
			  font-size: 12px;
            }
          }

          > .live-teacher {
          }

          > .course-cover {
            display: none;
            position: absolute;
            top: 0;
            width: 100%;
            height: 175px;
            background: rgba(0, 0, 0, 0.6);
            border-radius: 6px;
			.zhibo-play{
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				img{
					width: 70px;
					height: 70px;
				}
			}

            > .course-flag {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              width: 154px;
              height: 36px;
              background: #000;
              border-radius: 18px;
              line-height: 36px;
              font-size: 14px;
              text-align: center;
              color: #ffffff;
            }
          }
        }
        > li:hover {
          box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          > .course-cover {
            display: block;
          }
        }
        > li:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
