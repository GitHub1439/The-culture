<template>
  <div class=" ">
    <!-- left-box -->
    <div class="container information">
      <div class="left-box">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{
            isnotice == 0 ? "资讯公告" : isnotice == 1 ? "资料汇编" : "区域动态"
          }}</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="ul-list">
          <ul>
            <li v-for="(list, index) in editableData" :key="index">
              <div class="time" v-if="list.creatTime">
                <div>{{ list.creatTime.substring(8, 10) }}</div>
                <div>{{ list.creatTime.substring(0, 7) }}</div>
                <div>
                  {{
                    isnotice == 0 ? "资讯公告" : isnotice == 1 ? "资料汇编" : "区域动态"
                  }}
                </div>
              </div>
              <div class="info">
                <div class="title" @click="jump(list.infoId,list.type)">{{ list.infoTitle | morethan }}</div>
                <div class="details">{{ list.infoSubhead | morethan }}</div>
                <div class="time">发布时间 | {{ list.creatTime }}</div>
              </div>
            </li>
          </ul>
          <div class="page">
            <el-pagination
              background
              :page-size.sync="tableForm.pageSize"
              layout="prev, pager, next"
              :total="tableForm.total"
              @current-change="pageChange"
            >
            </el-pagination>
          </div>
        </div>
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
            <div class="more" @click="goMore">查看更多</div>
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
            <div class="more" @click="goMore">查看更多</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "About",
  components: {
  },
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
      editableData: [
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
      ],
      notice: [
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
        {
          infoTitle: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          creatTime: "2020-01-20",
        },
      ],
      tableForm: {
        pageSize: 8,
        pageNum: 1,
        total: 0,
      },
      isnotice: "",
    };
  },
  created() {
    this.isnotice = this.$route.query.isnotice;
  },
  mounted() {
    this.getList(this.isnotice, this.tableForm);
    this.getNotice(this.isnotice==0?1:this.isnotice==1?0:0,5)
  },
  watch: {
    $route(to, from) {
      this.editableData = [];
      this.notice = [];
      this.num = 0;


       var arr =  [
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
      ];
      this.choiceBox = arr
      this.isnotice = to.query.isnotice;
      this.getList(this.isnotice, this.tableForm); //在mounted调用的methods里的方法
      this.getNotice(this.isnotice==0?1:this.isnotice==1?0:0,5)
    },


    
  },
  filters: {
    morethan: function (oldVal) {
      return oldVal.length > 34 ? oldVal.slice(0, 34) + "..." : oldVal;
    },
  },
  methods: {
    // 获取公告资讯列表
    getList(type, form) {
      this.$api.Homelist(type, form).then((res) => {
        this.editableData = res.data.data.records;
        this.tableForm.total = res.data.data.total;
      });
    },
    getNotice(type, limit) {
      this.$api.Notice(type, limit).then((res) => {
        if (res.data.code == 200) {
          res.data.data.forEach((element) => {
            if(element.infoSubhead)
            element.infoSubhead = element.infoSubhead.substring(0, 40) + "...";
          });
          this.notice = res.data.data;
        }
      });
    },
    // 列表分页
    pageChange(val) {
      this.tableForm.pageNum = val;
      this.getList(this.isnotice, this.tableForm);
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
};
</script>
<style lang="less" scoped>
.information {
  margin-top: 20px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  height: 1000px;
  .left-box {
    width: 765px;
    height: 802px;
    .el-breadcrumb {
      margin-bottom: 18px;
    }
    > .ul-list {
      padding: 18px 25px 54px 36px;
      > ul {
        list-style: disc;
        > li:not(:nth-child(1)) {
          margin-top: 22px;
        }
        > li {
          height: 120px;
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          > .time {
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
              margin-left: 17px;
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
          > .info {
            display: flex;
            flex-flow: column nowrap;
            justify-content: space-between;
            margin-left: 32px;
            > .title {
              font-size: 18px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              color: #000000;
              line-height: 26px;
              cursor: pointer;
              &:hover{
                margin-left: 5px;
                color: #0582ff;
              }
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
      }
      > .page {
        margin-top: 54px;
        text-align: center;
      }
    }
  }
//   .right-box-title {
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
//     width: 364px;
//     height: 477px;
//     border: 1px solid #fff;
//     background-color: #f0f0f0;
//     > .contents {
//       margin: 15px 24px 47px 14px;

//       > .more {
//         width: 321px;
//         height: 45px;
//         border: 1px solid #3d78ff;
//         line-height: 45px;
//         text-align: center;
//         font-size: 16px;
//         font-family: Microsoft YaHei, Microsoft YaHei-Regular;
//         font-weight: 400;
//         text-align: center;
//         cursor: pointer;
//         border-radius: 5px;
//         color: #3d78ff;
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
    width: 364px;
    height: 477px;
    border: 1px solid #fff;
    background-color: #f0f0f0;
    > .contents {
      margin: 15px 24px 47px 14px;

      > .more {
        width: 321px;
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
</style>