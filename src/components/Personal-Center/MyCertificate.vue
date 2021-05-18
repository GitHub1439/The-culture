<template>
  <div class="MyCertificate">
    <div class="message-column">
      <div>
        <img src="../../assets/img/Personal-Center/t-03.png" alt="" />
      </div>
      我的证书
    </div>
    <div class="certificate-box" v-for="(item, index) in imgList" :key="index">
      <div class="certificate-msg clearfix">
        <div>
          <p>{{ item.certificateName }}</p>
          <p>证书名称</p>
        </div>
        <div>
          <p>{{ item.platformName }}</p>
          <p>认证机构</p>
        </div>
         <div>
             <p v-if="item.gmtCreate">{{ item.gmtCreate.substring(0,10) }}</p>
          <p>获取时间</p>
          </div>
        <div v-if="item.isShow" @click="$router.push({path:'/Training-Feedback',query:{data:item}})">
          <el-badge value="2" class="item">
          <img src="../../assets/img/Personal-Center/comment.png" alt="">
          </el-badge>
          <p>立即去评价</p>
        </div>

      </div>
      <div class="certificate-img">
        <img :src="item.picture" alt />
      </div>
    </div>
    <ul v-if="false">
      <li v-for="(item, index) in imgList" :key="index" class="clearfix">
        <img :src="item.picture" alt />
        <div class="certificate-details">
          <div class="certificateName">
            证书名称：
            <span>{{ item.certificateName }}</span>
          </div>
          <div class="gmtCreate">
            获取时间：
            <span>{{ item.gmtCreate }}</span>
          </div>
          <div class="gmtCreate">
            认证机构：
            <span>{{ item.platformName }}</span>
          </div>
        </div>
      </li>
    </ul>
    <div class="No" v-if="No">
      <img src="../../assets/img/Personal-Center/MyCertificate.png" alt />
      <p>学习未完成，暂无证书</p>
      <!-- <router-link tag="div" to="/CourseClassificationNav">添加课程</router-link> -->
    </div>
  </div>
</template>

<script>
export default {
  name: "MyCertificate",
  components: {},
  data() {
    return {
      imgList: [
      ],
      No: false,
    };
  },
  created() {
    this.$api.myCertificates()
    .then((res) => {
      if (res.data.data.length == 0) {
        this.No = true;
      } else {
        this.imgList = res.data.data;
      }
    });
  },
  methods: {},
  mounted() {},
};
</script>
<style lang="less">
.item{
  margin-top: 63px;
  margin-right: 10px;
}
.MyCertificate {
  position: relative;
  float: left;
  width: 944px;
  min-height: 799px;
  background-color: #fff;
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
  > .certificate-box {
    margin: 24px 56px;
    > .certificate-msg {
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.12);
      height: 193px;
      display: flex;
      flex-flow: nowrap;
      justify-content: space-around;
      > div {
        max-width: 25%;
        min-width: 25%;
        color: #18191a;
        text-align: center;
        > p:nth-child(1) {
          padding: 63px 0 12px 0;
          font-size: 20px;
        }
        > p:nth-child(2) {
          text-align: center;
        }
        
      }
      div:last-child{
        cursor: pointer;
      }
      
      div:nth-child(4){
        position: relative;
        &::after{
          content: "";
          position: absolute;
          height: 46px;
          border-right: 1px solid #acaeb1;
          top: 73.5px;
          left: 0;
        }

      }
      div:nth-child(2) {
        position: relative;
        &::after,
        &::before {
          content: "";
          position: absolute;
          height: 46px;
          border-right: 1px solid #acaeb1;
        }
        &::after {
          top: 73.5px;
          left: 0;
        }
        &::before {
          top: 73.5px;
          right: 0;
        }
      }
    }
    > .certificate-img {
      position: relative;
      width: 680px;
      height: 640px;
      background: url("../../assets/img/Personal-Center/certificate-bg.png")
        no-repeat;
      background-size: 100% 100%;
      margin: 0 auto;
      > img {
        position: absolute;
        top: 112px;
        right: 142px;
        width: 334px;
        height: 233px;
      }
    }
  }
  > ul {
    padding: 20px;
    > li {
      padding: 10px;
      background: #ffffff;
      border-radius: 4px;
      box-shadow: 0px 0px 12px 0px rgba(24, 25, 26, 0.12);
      > img {
        float: left;
        margin-right: 40px;
        border-radius: 4px;
        width: 356px;
        height: 200px;
        display: block;
      }
      > .certificate-details {
        float: left;
        padding-top: 50px;
        > .certificateName,
        > .gmtCreate {
          margin-bottom: 15px;
          font-size: 14px;
          color: #848080;
          > span {
            color: #000;
            font-size: 16px;
            font-weight: 700;
          }
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
    > p {
    }
    > div {
      cursor: pointer;
      margin: 64px auto 0 auto;
      width: 224px;
      height: 48px;
      background: #3d78ff;
      border-radius: 4px;

      line-height: 48px;
      font-size: 16px;
      text-align: center;
      color: #ffffff;
    }
  }
}
</style>