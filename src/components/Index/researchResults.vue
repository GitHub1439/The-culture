<template>
  <div class="home container">
    <!-- 头部 -->
    <div class="title" data-aos="fade-up" :data-aos-once="false">
      <div>
        <span>教研成果</span>
        <!-- <span>Teaching and research achievements</span> -->
      </div>
      <div @click="jumpMore()">查看更多<img src="../../assets/img/Index/announcement/more.png" alt=""></div>
    </div>

    <div class="middle" data-aos="fade-up" :data-aos-once="false">
      <!-- 左部tab栏 -->
      <ul class="left-box">
        <li
          v-for="(item, index) in resultsTab"
          :key="index"
          @click="
            changeTab(item, index),
              (num = index),
              (rightLabel = item.categoryName)
          "
          :class="{ add: num == index }"
        >
          <span>0{{ index + 1 }}</span>
          <span>{{ item.categoryName }}</span>
          <span><i class="el-icon-arrow-right"></i></span>
        </li>
      </ul>
      <!-- 右部切换内容 -->
      <div class="right-box">
        <ul>
          <li
            v-for="(item, index) in resultsContents.reflection"
            :key="index"
            @click="courseJump(item)"
          >
            <div class="name">{{ item.courseName }}</div>
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
            <ul>
              <li>
                <img :src="resultsContents.pic" alt="" />
                <span>{{ item.lecturerName }}</span>
              </li>
              <li>
                课程时长 :{{ Math.floor(item.videoLength / (1000 * 60)) }}分钟
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      num: 0,
      rightLabel: "课堂实录",
      resultsTab: [
        {
          label: "全部",
          id: 1,
        },
        {
          label: "课堂实录",
          id: 2,
        },
        {
          label: "教学反思",
          id: 3,
        },
        {
          label: "教学设计",
          id: 4,
        },
        {
          label: "教学素材",
          id: 5,
        },
      ],
      resultsContents: {
        pic: require("../../assets/img/Index/results/pic.png"),
        reflection: [
          {
            title: "恰利利恰利教学反思",
            url: "http://www.baidu.com",
          },
          {
            title: "浅谈常德丝弦进入小学的实践意义",
            url: "http://www.baidu.com",
          },
          {
            title: "分子及热运动",
            url: "http://www.baidu.com",
          },
          {
            title: "我的音乐教学之路",
            url: "http://www.baidu.com",
          },
          {
            title: "《小小鼓号手》教学反思",
            url: "http://www.baidu.com",
          },
          {
            title: "粗心的小画家",
            url: "http://www.baidu.com",
          },
        ],
      },
      info: {},
      tabIndex: 0,
    };
  },
  created() {},
  methods: {
    getHomeCategoryCourseInfo() {
      this.$api.HomeCategoryCourseInfo().then((res) => {
        if (res.data.code == 200) {
          this.resultsTab = res.data.data;
          this.changeTab(res.data.data[0], 0);
        }
      });
    },
    changeTab(item, index) {
      this.resultsContents.pic = item.imgUrl;
      this.resultsContents.reflection = item.list;
      this.info = item;
      this.tabIndex = index;
    },
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
    jumpMore() {
      console.log(this.tabIndex);
      this.$router.push({
        path: "/Resource-result",
        query: {
          courseInfo: this.info,
          childIndex: this.tabIndex + 1,
        },
      });
    },
  },
  mounted() {
    this.getHomeCategoryCourseInfo();
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
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: 12px;
    height: 367px;
    width: 1200px;
    > .left-box {
      width: 285px;
      height: 367px;
      background: #ffffff;
      box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.09);
      > li {
        width: 215px;
        height: 81px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        padding: 0 35px;
        cursor: pointer;
        > span {
          opacity: 1;
          font-size: 24px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          color: #000000;
        }
      }

      > .add {
        background: #1e548f;
        position: relative;
        &::after{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          right: -4px;
          top: 50%;
          margin-top: -5px;
          transform: rotate(45deg);
          background: #1e548f;
        }

        > span {
          color: #fff;
        }
        > span:last-child {
          color: #1e548f;
          width: 29px;
          height: 29px;
          border-radius: 50%;
          background: #fff;
          display: inline-block;
          text-align: center;
          line-height: 29px;
        }
      }
    }
    > .right-box {
      width: 908px;
      margin-left: 10px;
      background: #ffffff;
      box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.09);

      > ul {
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        >li:first-child,>li:nth-child(2),>li:nth-child(3){
border-bottom: 1px solid #e0e0e0;
        }
        >li:first-child,>li:nth-child(2),>li:nth-child(4),>li:nth-child(5){
border-right: 1px solid #e0e0e0;
        }
        > li {
          width: 260.5px;
          padding: 0 20px;
          display: flex;
          flex-flow: column nowrap;
          justify-content: center;
          height: 184px;
          cursor: pointer;
          
          
          > .name {
            font-size: 18px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            line-height: 28px;
          }
          > .label {
            width: 80px;
            height: 24px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #ffffff;
            line-height: 24px;
            border-radius: 3px;
            margin: 17px 0;
          }
          > .orange {
            color: #e68a09;
            background: rgba(246,191,95,0.43);
          }
          > .primary {
            color: #3d78ff;
            background: rgba(61,120,255, 0.23);
          }
          > .danger {
            color: #fc634d;
            background: rgba(252,100,78,0.21);
          }
          > .success {
            color: #1499b5;
            background: rgba(20,155,183, 0.23);
          }
          ul {
            display: flex;
            flex-flow: row nowrap;
            justify-content: flex-start;
            align-items: center;
            > li:first-child {
              > img {
                width: 22px;
                height: 22px;
                border-radius: 50%;
                vertical-align: middle;
              }
              > span {
                margin-left: 10px;
                font-size: 12px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: #000000;
              }
            }
            > li:last-child {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
              margin-left: 39px;
            }
          }
        }
      }
    }
  }
}
</style>
