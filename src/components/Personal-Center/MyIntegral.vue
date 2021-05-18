<template>
  <div class="MyIntegral">
    <div class="message-column">
      <div>
        <img src="../../assets/img/Personal-Center/t-02.png" alt="" />
      </div>
      我的积分
    </div>

    <div class="integral-box">
      <div>
        <div class="total-integral">总积分</div>
        <div class="minute">
          <span>{{ userIntegral ? userIntegral.totalIntegral : 0 }}</span
          >分
        </div>
       
      </div>
      <div class="btn-details">
      
      </div>
    </div>
    <!-- 积分规则 -->
    <div>
    

      <!-- 积分记录 -->
      <div class="integral_record-show">
        <div class="title">积分记录</div>
        <ul>
          <li
            class="clearfix"
            v-for="(item, index) in IntegralRecordList"
            :key="index"
          >
            <div class="name">{{ item.source }}</div>
            <div class="integral">{{ item.changeNum | changeNum }}</div>
            <div class="date">{{ item.changeTime }}</div>
          </li>
        </ul>
      </div>
    </div>

    
  </div>
</template>

<script>
export default {
  name: "MyIntegral",
  components: {},
  data() {
    return {
      userIntegral: "", // 用户积分
      IntegralRecordList: [], // 积分记录列表
      dialogVisible1: false, // 积分记录
      dialogVisible2: false, // 积分规则
    };
  },
  created() {
    // 获取用户积分
    this.getUserIntegral();
    // 获取积分记录
    this.getIntegralRecord();
  },
  methods: {
    // 获取用户积分
    getUserIntegral() {
      
        this.$api.selectByUserId(this.$store.getters.user.id)
        .then((res) => {
          this.userIntegral = res.data.data;
        });
    },
    // 获取积分记录
    getIntegralRecord() {
      
        this.$api.personalList(this.$store.getters.user.id)
        .then((res) => {
          this.IntegralRecordList = res.data.data;
        });
    },
  },
  mounted() {},
  filters: {
    changeNum(val) {
      if (val) {
        if (val.toString().substring(0, 1) == "-") {
          return val;
        } else {
          return "+" + val;
        }
      }
    },
  },
};
</script>
<style lang="less">
.MyIntegral {
  position: relative;
  float: left;
  width: 944px;
  background-color: #fff;
  min-height: 799px;
  > .message-column {
    padding-left: 40px;
    height: 63px;
    line-height: 63px;
    font-weight: 700;
    border-bottom: 1px solid rgba(24, 25, 26, 0.1);
    text-align: left;
    > div {
      margin-right: 11px;
      float: left;
      position: relative;
      top: 13px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #ebf2ff;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18px;
        height: 18px;
      }
    }
  }
  > .integral-box {
    position: relative;
    margin: 24px auto 0 auto;
    width: 869px;
    height: 193px;
    background: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
    > div {
      text-align: center;
      width: 100%;
      float: left;
      text-align: center;
      > .total-integral {
        margin: 59px 0 25px 0;
        color: #18191a;
      }
      > .minute {
        margin-bottom: 8px;
        color: #18191a;
        > span {
          font-size: 34px;
          color: #3d78ff;
        }
      }
      > .to-convert {
        color: #bbbbbb;
        > i {
          margin-right: 6px;
          color: #bbbbbb;
        }
        > span {
          font-size: 14px;
          color: #3d78ff;
        }
      }
    }
    > .btn-details {
      padding-top: 10px;
      > div {
        display: inline-block;
        cursor: pointer;
        //margin: 0 8px 0 auto;
        font-size: 14px;
        color: #999999;
      }
    }
  }
  // 积分记录
  .integral_record-show {
    background: #ffffff;
    > .title {
      padding: 32px 0 16px 0;
      font-size: 24px;
      text-align: center;
      color: #333333;
    }
    > ul {
      padding: 0 42px;
      box-sizing: border-box;
      height: 500px;
      overflow-y: scroll;
      > li {
        position: relative;
        padding: 25px 0;
        border-bottom: 1px solid rgba(24, 25, 26, 0.1);
        > .name {
          float: left;
          color: #333333;
        }
        > .integral {
          float: right;
          font-size: 20px;
          color: #3d78ff;
        }
        > .date {
          position: absolute;
          right: 0;
          top: 10px;
          font-size: 14px;
          color: #999999;
        }
      }
      > li:nth-last-child(1) {
        border: none;
      }
    }
    > ul::-webkit-scrollbar {
      width: 5px;
      height: 10px;
      /**/
    }
    > ul::-webkit-scrollbar-track {
      background: rgb(239, 239, 239);
      border-radius: 2px;
    }
    > ul::-webkit-scrollbar-thumb {
      background: #bfbfbf;
      border-radius: 10px;
    }
    > ul::-webkit-scrollbar-thumb:hover {
      background: #333;
    }
    > ul::-webkit-scrollbar-corner {
      background: #179a16;
    }
  }
  // 积分规则
  .integral_rule-show {
    width: 869px;
    background: #ffffff;
    padding: 0 42px 42px 42px;
    box-sizing: border-box;
    margin: 0 auto;
    > .title {
      padding: 32px 0 16px 0;
      font-size: 24px;
      text-align: center;
      color: #333333;
    }
    > .column-title {
      font-size: 18px;
      color: #18191a;
      margin-bottom: 16px;
    }
    > .column-title2 {
      margin-top: 40px;
    }
    > p {
      color: #333333;
      line-height: 24px;
    }
  }
  > .el-dialog__wrapper {
    .el-dialog {
      border-radius: 19px;
      overflow: hidden;
      margin-top: 0 !important;
      width: 648px;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      .el-dialog__header {
        padding: 0;
        .el-dialog__headerbtn {
          // display: none;
        }
      }
      .el-dialog__body {
        padding: 0;
      }
    }
  }
}
</style>