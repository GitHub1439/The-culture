<template>
  <div class="News-details">
    <div class="news-box">
      <div class="container">
        <div class="left-box">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item
              >{{
             isnotice == 0 ? "资讯公告" : isnotice == 1 ? "资料汇编" : "区域动态"
          }}详情</el-breadcrumb-item
            >
          </el-breadcrumb>
          <div class="news-title">
            <div class="icon" v-if="newsDetails.creatTime">
              <div>{{ newsDetails.creatTime.substring(8, 10) }}</div>
              <div>{{ newsDetails.creatTime.substring(0, 7) }}</div>
              <div>
                {{
                     isnotice == 0 ? "资讯公告" : isnotice == 1 ? "资料汇编" : "区域动态"
                }}
              </div>
            </div>
            <div>
              <div class="title">{{ newsDetails.infoTitle }}</div>
              <div class="details">{{ newsDetails.infoSubhead }}</div>
              <div class="time">发布时间 | {{ newsDetails.creatTime }}</div>
            </div>
          </div>

          <img :src="newsDetails.imgUrl" alt="" />
          <div class="news-details" v-html="newsDetails.infoComment"></div>
        </div>
        <!-- right-box -->
         <!-- <div>
        <div class="right-box-title">
          {{ this.$route.query.isnotice == 0
              ? "资料汇编"
              :"资讯公告"}}
        </div>
        <div class="right-box">
          <div class="contents">
            <div class="new-list">
              <div v-for="(item, index) in notice" :key="index">
                <div @click="jump(item.infoId,item.type)">{{ item.infoTitle | morethan }}</div>
                <span>{{ item.creatTime }}</span>
              </div>
            </div>
            <div class="more" @click="goMore" >查看更多</div>
          </div>
        </div>
      </div> -->

      <div>
        <div class="right-box-title">
          <span
            @click="num = index,getNotice(item.type,5) "
            v-for="(item, index) in choiceBox"
            :key="index"
            :class="{ select: num == index }"
            >{{ item.label }}</span
          >
          <div class="line" :class="{ add: num == 1 }"></div>
        </div>
        <div class="right-box">
          <div class="contents">
            <div class="new-list">
              <div v-for="(item, index) in notice" :key="index">
                <div @click="jump(item.infoId,item.type)">{{ item.infoTitle | morethan }}</div>
                <span>{{ item.creatTime }}</span>
              </div>
            </div>
            <!-- 查看更多 -->
            <div class="more" @click="goMore" >查看更多</div>
          </div>
        </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "News-details",
  components: {},
  data() {
    return {
      choiceBox: [
        {
          label:
            this.$route.query.isnotice == 0
              ? "资料汇编"
              : this.$route.query.isnotice == 1
              ? "资讯公告"
              : "资讯公告",
          type:
            this.$route.query.isnotice == 0
              ? 1
              : this.$route.query.isnotice == 1
              ? 0
              : 0,
        },
        {
          label:
            this.$route.query.isnotice == 0
              ? "区域动态"
              : this.$route.query.isnotice == 1
              ? "区域动态"
              : "资料汇编",
          type:
            this.$route.query.isnotice == 0
              ? 3
              : this.$route.query.isnotice == 1
              ? 3
              : 1,
        },
      ],
      num:0,
      newsDetails: {},
      notice: [],
      isnotice: "",
      infoId: "",
    };
  },
  watch: {
    $route(to, from) {
      this.notice = [];
      this.newsDetails = {};
      this.isnotice = to.query.isnotice;
      this.infoId = to.query.infoId;
      this.getNotice(this.isnotice==0?1:this.isnotice==1?0:0,5); //在mounted调用的methods里的方法
      this.getDetails();
    },
  },
  created() {
    this.isnotice = this.$route.query.isnotice;
    this.infoId = this.$route.query.infoId;
  },
  methods: {
    getDetails() {
      this.$api.Homedetails(this.infoId).then((res) => {
        this.newsDetails = res.data.data;
      });
    },
    getNotice(type, limit) {
      this.$api.Notice(type, limit).then((res) => {
        if (res.data.code == 200) {
          res.data.data.forEach((element) => {
            element.infoSubhead = element.infoSubhead.substring(0, 20) + "...";
            element.infoTitle = element.infoTitle.substring(0, 28) + "...";
          });
          this.notice = res.data.data;
        }
      });
    },
    
    // 公告资讯详情
    jump(infoId, isnotice) {
      this.$router.push({
        path: "/News-details",
        query: { infoId: infoId, isnotice: isnotice },
      });
    },
    goMore() {
      this.$router.push({
        path: "/Information-details",
        query: { isnotice: this.notice[0].type},
      });
    },
  },
  filters: {
    morethan: function (oldVal) {
      return oldVal.length > 34 ? oldVal.slice(0, 34) + "..." : oldVal;
    },
  },
  mounted() {
    this.getNotice(this.isnotice==0?1:this.isnotice==1?0:0,5);
    this.getDetails();
  },
};
</script>
<style lang="less" scoped>
.News-details {
  min-height: 100vh;
  > .news-box {
    margin: 26px 0;
    > .container {
      box-sizing: border-box;
      display: flex;
      flex-flow: nowrap;
      justify-content: space-between;
      > .left-box {
        /deep/ .el-breadcrumb {
          border-bottom: 1px solid #eeeeee;
          padding-bottom: 22px;
        }
        width: 847px;
        > img {
          width: 848px;
          height: 412px;
        }
        > .news-title {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          margin: 9px 0 33px 0;
          > .icon {
            width: 80px;
            height: 120px;
            text-align: center;
            background: #eeeeee;
            > div:first-child {
              font-size: 40px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: center;
              color: #174b80;
              margin-top: 10px;
            }
            > div:nth-child(2) {
              font-size: 12px;
              width: 50px;
              margin-left: 7px;
              margin-right: 7px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              color: #000000;
              padding-bottom: 8px;
              margin-bottom: 8px;
              margin-top: 4px;
              text-align: center;
              border-bottom: 1px solid #5c5b5b;
            }
            > div:last-child {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              color: #000000;
            }
          }
          > div:last-child {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            margin-left: 32px;
            > .title {
              font-size: 23px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
            }
            > .details {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #7d7d7d;
              line-height: 20px;
            }
            > .time {
              font-size: 12px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #999999;
              line-height: 20px;
            }
          }
        }
        > .time {
          padding: 28px 0 16px 0;
          font-size: 14px;
          color: #717171;
          border-bottom: 1px solid #c7c7c7;
        }
        > .news-details {
          padding: 20px 0;
          color: #7d7d7d;
          line-height: 30px;
        }
      }
//  .right-box-title {
//     font-size: 20px;
//     font-family: Microsoft YaHei, Microsoft YaHei-Regular;
//     font-weight: 400;
//     text-align: left;
//     color: #0582ff;
//     margin-bottom: 9px;
//     padding-bottom: 9px;
//     border-bottom: 2px solid #eeeeee;

//     position: relative;
//     > span {
//       font-size: 20px;
//       font-family: Microsoft YaHei, Microsoft YaHei-Regular;
//       font-weight: 400;
//       text-align: left;
//       color: #000000;
//       margin-right: 28px;
//       cursor: pointer;
//     }
//     .select {
//       font-weight: 700;
//       color: #174b80;
//     }

//     > .line {
//       width: 87px;
//       height: 2px;
//       background-color: #174b80;
//       position: absolute;
//       top: 29px;
//       border-radius: 2px;
//       -webkit-transition: all 0.5s ease;
//       transition: all 0.5s ease;
//     }
//     .add {
//       margin-left: 105px;
//     }
//   }
//   .right-box {
//     width: 294px;
//     height: 477px;
//     border: 1px solid #fff;
//     background-color: #f0f0f0;
//     > .contents {
//       margin: 15px 24px 47px 14px;

//       > .more {
//         width: 260px;
//         height: 45px;
//         border: 1px solid #3d78ff;
//         line-height: 45px;
//         text-align: center;
//         font-size: 16px;
//         font-family: Microsoft YaHei, Microsoft YaHei-Regular;
//         font-weight: 400;
//         text-align: center;
//         cursor: pointer;
//         color: #3d78ff;
//         border-radius: 5px;
//         &:hover{
//           background-color: #3d78ff;
//           color: #fff;
//         }
//       }
//       > .title {
//         > .list {
//           width: 4px;
//           height: 18px;
//           background-color: #0582ff;
//           float: left;
//           margin-right: 10px;
//         }
//         > span {
//           font-size: 14px;
//           font-family: Microsoft YaHei, Microsoft YaHei-Light;
//           font-weight: 300;
//           text-align: left;
//           color: #000000;
//           line-height: 20px;
//         }
//       }
//       > .new-list {
//         > div:first-child {
//           margin-top: 24px;
//         }
//         > div {
//           text-align: left;
//  margin-bottom: 24px;
//           > div {
//             cursor: pointer;
//             line-height: 20px;
//             font-size: 14px;
//             font-family: Microsoft YaHei, Microsoft YaHei-Regular;
//             font-weight: 400;
//             text-align: left;
//             color: #000000;
//             &:hover {
//               color: #0582ff;
//             }
//           }
//           span {
//             opacity: 0.33;
//             font-size: 12px;
//             font-family: Microsoft YaHei, Microsoft YaHei-Regular;
//             font-weight: 400;
//             text-align: left;
//             color: #000000;
//             margin-top: 12px;
//           }
//         }
//       }
//     }
//   }
  .right-box-title {
    font-size: 20px;
    font-family: Microsoft YaHei, Microsoft YaHei-Regular;
    font-weight: 400;
    text-align: left;
    color: #0582ff;
    margin-bottom: 9px;
    padding-bottom: 9px;
    border-bottom: 2px solid #eeeeee;

    position: relative;
    > span {
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #000000;
      margin-right: 28px;
      cursor: pointer;
    }
    .select {
      font-weight: 700;
      color: #174b80;
    }

    > .line {
      width: 87px;
      height: 2px;
      background-color: #174b80;
      position: absolute;
      top: 29px;
      border-radius: 2px;
      -webkit-transition: all 0.5s ease;
      transition: all 0.5s ease;
    }
    .add {
      margin-left: 105px;
    }
  }
  .right-box {
     width: 324px;
    height: 477px;
    border: 1px solid #fff;
    background-color: #f0f0f0;
    > .contents {
      margin: 15px 24px 47px 14px;

      > .more {
         width: 291px;
        height: 45px;
        border: 1px solid #3d78ff;
        line-height: 45px;
        text-align: center;
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: center;
        cursor: pointer;
        color: #3d78ff;
        border-radius: 5px;
        &:hover{
          background-color: #3d78ff;
          color: #fff;
        }
      }
      > .title {
        > .list {
          width: 4px;
          height: 18px;
          background-color: #0582ff;
          float: left;
          margin-right: 10px;
        }
        > span {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Light;
          font-weight: 300;
          text-align: left;
          color: #000000;
          line-height: 20px;
        }
      }
      > .new-list {
        > div:first-child {
          margin-top: 24px;
        }
        > div {
          text-align: left;
 margin-bottom: 24px;
          > div {
            cursor: pointer;
            line-height: 20px;
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            &:hover {
              color: #0582ff;
            }
          }
          span {
            opacity: 0.33;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin-top: 12px;
          }
        }
      }
    }
  }
    }
  }
}
</style>