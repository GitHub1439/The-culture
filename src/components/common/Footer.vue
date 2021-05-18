<template>
  <div class="home">
    <!-- 底部banner -->
    <div class="footer_banner">
      <div>赋能中小教师团队</div>
      <div>一站式研训平台</div>
    </div>
    <!-- 底部备案号 -->
    <div class="footer_communication">
      <ul class="container">
        <li>
          友情链接
        </li>
       <li v-for="(item,index) in link" :key="index" >
          {{item.title}}
       </li>
      </ul>

      <div class="bottom container">
        <div class="left-box">
          <div>联系地址：湖南省长沙市开福区东风路街道车站北路579号湘域智慧1栋716房</div>
          <div>
            <span>邮箱：hnyunpan@qq.com</span>
            <span>邮政编码：410000</span>
          </div>
          <div>版权所有：湖南云畔网络科技有限公司    湘ICP备18011859号</div>
        </div>
        <div class="right-box">
            <div>0731-85576619</div>
            <div>咨询热线</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
       link: [
        {
          pic: require("../../assets/img/Index/link/hn_rumours.png"),
          title: "教育部教师工作司",
          url:"http://pypt.rednet.cn/",
        },
        {
          pic: require("../../assets/img/Index/link/hn_report.png"),
          title: "教育厅教师工作与师范教育处",
          url:"http://wfblxx.rednet.cn/",
        },
        {
          pic: require("../../assets/img/Index/link/110.png"),
          title: "湖南教育大平台",
          url:"http://gat.hunan.gov.cn/",
        },
        {
          pic: require("../../assets/img/Index/link/chinese_report.png"),
          title: "湖南省中小学教师发展中心",
          url:"https://www.12377.cn/",
        },
      ],
    };
  },
  methods: {},
};
</script>
<style lang="less" scoped>
.home {
  > .footer_banner {
    text-align: center;
    height: 163px;
    background: url("../../assets/img/footer/footer-bg.png") no-repeat;
    background-position: 100% 100%;
    background-size: 100% 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
    align-items: center;
    > div:first-child {
      width: 288px;
      font-size: 36px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: center;
      color: #174b80;
    }
    > div:last-child {
      width: 288px;
      height: 44px;
      border: 1px solid #174b80;
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: center;
      color: #174b80;
      padding: 2px 43px;
      margin-top: 9px;
      line-height: 44px;
    }
  }
  > .footer_communication {
    height: 201px;
    background: #000000;
   
    > ul {
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      height: 71px;
      border-bottom: 1px solid #d9d4d4;
      padding-bottom: 5px;
      >li:nth-child(3){
        position: relative;
        margin: 0 58px;
          &::before{
            content: "";
          position: absolute;
          height: 15px;
          border-right: 1px solid #acaeb1;
          top:0;
          left:-29px ;
          
          }
      }
      >li:nth-child(4){
        position: relative;
        margin-right: 58px;
          &::before{
            content: "";
          position: absolute;
          height: 15px;
          border-right: 1px solid #acaeb1;
          top:0;
             left:-29px ;
          }
          &::after{
            content: "";
          position: absolute;
          height: 15px;
          border-right: 1px solid #acaeb1;
          top:0;
             right:-29px ;
          }
      }
      >li:first-child{
margin-right: 38px;
      }
      >li{
font-size: 14px;
font-family: Microsoft YaHei, Microsoft YaHei-Light;
font-weight: 300;
text-align: left;
color: #a9a9a9;



      }
    }
    >.bottom{
      display: flex;
      justify-content: space-between;
      flex-flow: row nowrap;
      margin-top: 24px;
      >.left-box{
        >div{
          font-size: 14px;
font-family: Microsoft YaHei, Microsoft YaHei-Light;
font-weight: 300;
text-align: left;
color: #a9a9a9;
margin-bottom: 11px;
        }

      }
      >.right-box{
        width: 241px;
        height: 45px;
        border: 1px solid #ffffff;
        padding:15px;
        margin-right: -450px;
        >div:first-child{
          font-size: 26px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          color: #d9d4d4;
        }
        >div:last-child{
          font-size: 14px;
font-family: Microsoft YaHei, Microsoft YaHei-Light;
font-weight: 300;
text-align: left;
color: #a9a9a9;
margin-top: 5px;
        }
      }
    }
  }
}
</style>