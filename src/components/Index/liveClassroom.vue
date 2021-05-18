<template>
  <div class="home container">
    <!-- 头部 -->
    <div class="title" data-aos="fade-up" :data-aos-once="false">
     
       <div>
       <span>直播课堂</span>
      </div>
      <div @click="jumpMore()">查看更多<img src="../../assets/img/Index/announcement/more.png" alt=""></div>
    </div>
    <div class="middle" data-aos="fade-up" :data-aos-once="false">
      <!-- Tab切换 -->
      <ul class="tabs">
        <li v-for="(item, index) in resultsTab" :key="index">
          <span
            :class="{ add: index == num }"
            @click="changeLiveList(item.id, tableForm), (num = index)"
            >{{ item.categoryName }}</span
          >
        </li>
      </ul>

      <ul class="contents">
        <li
          v-for="(item, index) in liveClass"
          :key="index"
          @click="videoJump(item)"
        >
          <div>
            <div class="liveLogo">
              <img :src="item.courseLogo" alt="" />
              <div>
                <img src="../../assets/img/Index/liveclass/live.png" alt="" />
                <div class="name">{{ item.courseName }}</div>
                <div class="line"></div>
              </div>
            </div>

            <div class="name">{{ item.courseName }}</div>
            <div class="teacher">主讲老师:{{ item.lecturerName }}</div>
          </div>
          <div></div>
          <div></div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      num: 0,
      tableForm: {
        pageIndex: 1,
        pageSize: 3,
        total: 0,
      },
      resultsTab: [
        {
          label: "全部",
          id: 1,
        },
        {
          label: "我是接班人",
          id: 2,
        },
        {
          label: "教学知识",
          id: 3,
        },
        {
          label: "综合素质",
          id: 4,
        },
      ],
      liveClass: [
        {
          pic: require("../../assets/img/Index/liveclass/pic1.png"),
          name: "上九天揽月",
          teacher: "郭晓芳",
        },
        {
          pic: require("../../assets/img/Index/liveclass/pic2.png"),
          name: "疫情下的“无名英雄 ",
          teacher: "郭晓芳",
        },
        {
          pic: require("../../assets/img/Index/liveclass/pic1.png"),
          name: "英雄的城市，英雄的人民 ",
          teacher: "郭晓芳",
        },
      ],
    };
  },
  created() {},
  methods: {
    // 获取直播tabs
    getliveClassChildren() {
      this.$http
        .get(
          `course/category/getClassChildren?parentId=1303274563601207429&userId=${this.$store.getters.user.id}&type=3`
        )
        // this.$api.liveClassChildren(this.$store.getters.user.id,1303274563601207429)
        .then((res) => {
          this.resultsTab = res.data.data.list;
        });
    },
    jumpMore() {
      this.$router.push({
        path: "/Live-class",
      });
    },
    // 直播列表
    changeLiveList(id, form) {
      this.$api.courseLivePage(id, form).then((res) => {
        if (res.data.code == 200) this.liveClass = res.data.data.rows;
      });
    },
    // 直播跳转
    videoJump(item) {
      if (item.isPlay == 0) {
         this.$message({
                message:'暂未开播，尽情期待',
                type: 'warning'
              });
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
    this.getliveClassChildren();
    this.changeLiveList("", this.tableForm);
  },
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 43px;
  > .title {
    text-align: left;
    width: 1200px;
    border-bottom: 2px solid #d9d4d4;
    padding-bottom: 11px;

     display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
    > div:first-child {
      > span {
        font-size: 26px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #174b80;
      }
    }
    > div:last-child {
      font-size: 16px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      cursor: pointer;
      color: #000000;
      >img{
        width: 16px;
        height: 16px;
        vertical-align: middle;
        margin-left: 3px;
        margin-top: -3px;
      }
    }
  }
  > .middle {
    > .tabs {
      margin: 28px 0 23px 0;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      height: 20px;
      li {
        width: 185px;
        border-right: 1px solid #d9d4d4;
        border-left: 1px solid #d9d4d4;
        height: 20px;
        > span {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #000000;
          cursor: pointer;
        }
        > .add {
          color: #174b80;
          font-weight: 700;
          border-bottom: 2px solid #174b80;
          padding-bottom: 6px;
        }
      }
    }
    > .contents {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      margin-top: 35px;
      > li {
        width: 371px;
        height: 305px;
        position: relative;
        margin-right: 35px;
        cursor: pointer;
        z-index: 99;
        &:hover {
          > div:first-child {
            margin-top: 5px;
            >.liveLogo{
              >div{
                opacity: 1;
              }
            }
          }
          > div:nth-child(2) {
            margin-top: 15px;
          }
          > div:last-child {
            margin-top: 35px;
          }
        }
        > div:first-child {
          box-shadow: 0px 5px 7px 1px rgba(0, 0, 0, 0.16);
          transition: all linear 0.2;
          -webkit-transition: all 0.2s; /* Safari */
          //   z-index: 99;
          //   position: absolute;
          background-color: #fff;

          > .liveLogo {
            width: 371px;
            height: 233px;
            position: relative;
            > img {
              width: 371px;
              height: 233px;
            }
            > div {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
               width: 371px;
              height: 233px;
              opacity: 0;
              transition: all .3s ease;
              text-align: center;
              background: rgba(0,0,0,.8);
              > img {
                width: 53px;
                height: 48px;
                margin: 57px 0 17px 0;
              }
              > .name {
                font-size: 18px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: center;
                color: #ffffff;
              }
              >.line{
                width: 25px;
                height: 4px;
                opacity: 1;
                background: #ffffff;
                margin-left: 46%;
                margin-top: 20px;
              }
            }
          }
          > .name {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Bold;
            font-weight: 700;
            text-align: left;
            color: #212121;
            padding: 12px 0 0 21px;
          }
          > .teacher {
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            padding: 6px 0 12px 21px;
          }
        }
        > div:nth-child(2) {
          position: absolute;
          top: -8px;
          right: -10px;
          width: 373px;
          height: 304px;
          background: #ffffff;
          border: 1px solid #bbbbbb;
          z-index: -1;
          transition: all linear 0.3;
          -webkit-transition: all 0.3s; /* Safari */
        }
        > div:last-child {
          position: absolute;
          top: -18px;
          right: -20px;
          width: 373px;
          height: 304px;
          background: #ffffff;
          border: 1px solid #bbbbbb;
          z-index: -4;
          transition: all linear 0.4;
          -webkit-transition: all 0.4s; /* Safari */
        }
      }
    }
  }
}
</style>
