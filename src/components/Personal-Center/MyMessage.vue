<template>
  <div class="MyMessage">
    <div class="message-column">
      <div>
        <img src="../../assets/img/Personal-Center/t-04.png" alt="" />
      </div>
      我的消息
    </div>
    <ul>
      <li v-for="(item, index) in messageList" :key="index">
        <div class="message-title">{{ item.platformMsgTitle }}</div>
        <div class="message-date">{{ item.issueTime }}</div>
        <div class="message-details">{{ item.platformMsg }}</div>
      </li>
    </ul>

    <el-pagination
      background
      layout="prev, pager, next"
      @current-change="currentChange"
      :total="pageForm.total"
      :page-size="pageForm.pageSize"
      :current-page="pageForm.pageNum"
      hide-on-single-page
    ></el-pagination>

    <div class="No" v-if="No">
      <img src="../../assets/img/Personal-Center/no-news.png" alt />
      当前没有消息
    </div>
  </div>
</template>

<script>
export default {
  name: "MyMessage",
  components: {},
  data() {
    return {
      No: false,
      messageList: [], // 消息列表
      pageForm: {
        pageNum: 1,
        pageSize: 5,
        total: 0,
      },
    };
  },
  created() {
    this.getMessage(); // 获取消息
  },
  methods: {
    currentChange(val) {
      this.pageForm.pageNum = val;
      this.getMessage(); // 获取消息
    },
    // 获取消息
    getMessage() {
      this.$http
        .get("course/platformmsg/platform-msg/myMessages", {
          pageNum: this.pageForm.pageNum,
          pageSize: this.pageForm.pageSize,
        })
        .then((res) => {
          this.messageList = res.data.data.rows;
          this.pageForm.total = res.data.data.total;
          if (res.data.data.rows.length == 0) {
            this.No = true;
          }
        });
    },
  },
  mounted() {},
};
</script>
<style lang="less">
.MyMessage {
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
      text-align: left;
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
  > ul {
    text-align: left;
    > li {
      margin: 0 50px 0 40px;
      padding: 25px 0 25px 0;
      border-bottom: 1px solid rgba(24, 25, 26, 0.1);
      > .message-title {
        font-size: 16px;
        color: #18191a;
      }
      > .message-date {
        margin: 8px 0 16px 0;
        font-size: 12px;
        color: #999999;
      }
      > .message-details {
        font-size: 14px;
        color: #333333;
        line-height: 21px;
      }
    }
    > li:nth-last-child(1) {
      border: none;
    }
  }
  // 分页
  .el-pagination {
    position: absolute;
    bottom: 0;
    width: 100%;
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
  > .No {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #999;
    text-align: center;
    > img {
      display: block;
      width: 418px;
      height: 240px;
    }
  }
}
</style>