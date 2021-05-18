<template>
  <div class="home container">
    <!-- 头部 -->
    <div class="title"  data-aos="fade-up" :data-aos-once="false">
      <span>教研工具</span>
      <!-- <span>Teaching and research tools</span> -->
    </div>
    <div class="middle"  >
      <div  @click="downLoad(item)" v-for="(item, index) in advantageData" :key="index" data-aos="fade-up" :data-aos-once="false" :data-aos-delay="index==0?100:index==1?200:index==2?300:index==3?400:500">
         <img :src="item.icon" alt="" />
            <div>{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {

      advantageData: [
        {
          icon: require("../../assets/img/Index/announcement/dingding.png"),
          name: "钉钉客户端",
          downLoad:
            "https://www.dingtalk.com/win/d/qd=2017120202091367000001711",
        },
        {
          icon: require("../../assets/img/Index/announcement/office.png"),
          name: "Office",
          downLoad: "https://www.office.com/",
        },
        {
          icon: require("../../assets/img/Index/announcement/star.png"),
          name: "问卷星",
          downLoad: "https://www.wjx.cn/",
        },
        {
          icon: require("../../assets/img/Index/announcement/yinxiang.png"),
          name: "印象笔记",
          downLoad: "https://www.yinxiang.com/download/",
        },
        {
          icon: require("../../assets/img/Index/announcement/xmind.png"),
          name: "XMind",
          downLoad: "https://www.xmind.cn/",
        },
        {
          icon: require("../../assets/img/Index/announcement/team.png"),
          name: "Teambition",
          downLoad: "https://www.pcsoft.com.cn/down/157165?module=soft",
        },
      ],
     
    };
  },
  created() {},
  methods: {
    jump(url){
        window.open(url)
    },
     downLoad(item) {
      var tempwindow = window.open("_blank");
      tempwindow.location.href = item.downLoad;
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 43px;
  padding-bottom: 83px;
  > .title {
    text-align: left;
    width: 1200px;
    border-bottom: 2px solid #d9d4d4;
    padding-bottom: 11px;
    > span{
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #174b80;
    }
  }
  > .middle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    margin-top: 35px;
    > div {
      width:190px;
      height: 70px;
      background: #eeeeee;
      margin-right: 12px;
      display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    cursor: pointer;
    &:hover{
     background: #d1cfcf;
    }
      > img {
        width: 41px;
        height: 41px;
        vertical-align: middle;
        margin: 0 17px 0 20px;
      }
      >div{
font-size: 14px;
font-family: Microsoft YaHei, Microsoft YaHei-Regular;
font-weight: 400;
text-align: left;
color: #707070;
width: 130px;
      }
    }
  }
}
</style>
