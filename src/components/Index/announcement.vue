<template>
  <div class="home">
    <div class="container">
      <!-- 轮播 -->
      <div class="carousel" data-aos="fade-right" :data-aos-once="false">
        <el-carousel height="325px">
          <el-carousel-item
            :style="{
              backgroundImage: 'url(' + item.homeSlideshowImgUrl + ')',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '100% 100%',
              backgroundSize: '100% 100%',
            }"
            v-for="(item, index) in carousel"
            :key="index"
            @click.native="bannerJump(item)"
          >
            <div class="bottom-info">
              <div class="bottom-info-container">
                {{ item.homeSlideshowName }}
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 公告资讯 -->
      <div class="information" data-aos="fade-left" :data-aos-once="false">
        <div>
          <div class="title">
            <span
              @click="(num = index), getNotice(item.type, 10)"
              v-for="(item, index) in choiceBox"
              :key="index"
              :class="{ select: num == index }"
              >{{ item.label }}</span
            >
            <div class="more"   @click="goMore">
              
              <span>查看更多</span> 
              <img src="../../assets/img/Index/announcement/more.png" alt="">
              
              </div>
            <div class="line" :class="{ add: num == 1, add2: num == 2 }"></div>
          </div>
          <!-- 内容 -->
          <div class="News-box-all News1">
            <ul>
              <li
                v-for="(list, index) in editableData"
                :key="index"
                class="fa"
                @click="jump(list.infoId, list.type)"
              >
                <span class="title">{{ list.infoTitle }}</span>
                <span  v-if="list.creatTime">{{
                  list.creatTime.substring(5, 10)
                }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
    </div>
  </div>
</template>


<script>
export default {
  name: "home",
  components: {},
  data() {
    return {
      num: 0,
      carousel: [
        {
          pic: require("../../assets/img/Index/carousel/pic1.png"),
        },
        {
          pic: require("../../assets/img/Index/carousel/pic2.png"),
        },
        {
          pic: require("../../assets/img/Index/carousel/pic3.png"),
        },
      ],
      choiceBox: [
        {
          label: "资讯公告",
          type: 0,
        },
        {
          label: "资料汇编",
          type: 1,
        },
        {
          label: "区域动态",
          type: 3,
        },
      ],
      editableData: [
        {
          details: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序",
          title: "关于2020年新的教资要求和报考...",
          pic: require("../../assets/img/Index/announcement/New1.png"),
          createTime: "2020-01-20",
        },
        {
          details: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序、",
          title: "关于2020年新的教资要求和报考...",
          pic: require("../../assets/img/Index/announcement/New2.png"),
          createTime: "2020-01-20",
        },
        {
          details: "稳定有序、高质量完成2020年高职扩招专项工作稳定有序、",
          title: "关于2020年新的教资要求和报考...",
          pic: require("../../assets/img/Index/announcement/New2.png"),
          createTime: "2020-01-20",
        },
      ],
      notice: [],
      
    };
  },
  created() {},

  methods: {
    downLoad(item) {
      var tempwindow = window.open("_blank");
      tempwindow.location.href = item.downLoad;
    },
    getNotice(type, limit) {
      this.$api.Notice(type, limit).then((res) => {
        if (res.data.code == 200) {
          res.data.data.forEach((element) => {
            if (element.infoSubhead)
              element.infoSubhead = element.infoSubhead.substring(0, 40) + "...";
          });
          this.editableData = res.data.data;
        }
      });
    },
    // 获取轮播图
    getBanner() {
      this.$api.carousel().then((res) => {
        this.carousel = res.data.data;
      });
    },
    // 公告资讯详情
    jump(infoId, isnotice) {
      this.$router.push({
        path: "/News-details",
        query: { infoId: infoId, isnotice: isnotice },
      });
    },
    // 轮播跳转
    bannerJump(item) {
      window.open(item.externalLinkUrl);
    },
    goMore() {
      this.$router.push({
        path: "/Information-details",
        query: { isnotice: this.num },
      });
    },
    // 获取资讯 公告
    // getNotice() {
    //   this.$http.get("/course/info/api/getHomeInfo?classId=1").then(res => {
    //     res.data.data.forEach(item => {
    //       if (item.type == 0) {
    //         if(item.infoSubhead.length >=36 && item.infoSubhead){
    //           item.infoSubhead=item.infoSubhead.substring(0,36)+'...'
    //         }
    //         this.editableData.push(item);
    //       } else if (item.type == 1) {
    //         this.notice.push(item);
    //       }
    //     });
    //   });
    // },
  },
  mounted() {
    this.getNotice(0, 8);
    this.getBanner();
  },
};
</script>
<style lang="less" scoped>
.home {
  > .container {
    margin-top: 49px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    > .carousel {
      width: 589px;
      height: 325px;
      position: relative;
      /deep/.el-carousel__indicators--horizontal {
        // margin-top: 100px;
        margin-left: 220px;
      }
      /deep/.el-carousel__button {
        width: 10px;
        height: 10px;
        border-radius: 50%;
      }
      > .el-carousel {
        // box-shadow: 12px 12px 8px #dae5ed;
        height: 100%;
        > .el-carousel__container {
          > .el-carousel__item {
            cursor: pointer;
            > .bottom-info {
              position: absolute;
              color: white;
              text-align: center;
              bottom: 0px;
              height: 40px;
              line-height: 40px;
              width: 100%;
              background: rgba(0, 0, 0, 0.5);
              font-size: 16px;
              > .bottom-info-container {
                text-align: left;
                margin-left: 20px;
              }
            }
          }
        }
      }
    }
    > .information {
      width: 583px;
      height: 325px;
      > div {
        .News-box-all {
          overflow-x: hidden;
          overflow-y: scroll;
          height: 300px;

          &::-webkit-scrollbar {
            display: none;
          }
          > ul {
            margin-top: 27px;
            > li {
              width: 583px;
              height: 21px;
              text-align: left;
              cursor: pointer;
              margin-bottom: 18px;
              position: relative;
              &:hover{
                >.title{
                  color: #174b80;
                }
              }
            >.title{
             width: 460px;
              height: 21px;
              font-size: 16px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: left;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              color: #333333;
              display: inline-block;
            }
              > span:last-child {
                font-size: 16px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: #999999;
                float: right;
              }
              &::before {
                content: "";
                width: 7px;
                height: 7px;
                display: inline-block;
                border-radius: 50%;
                background: #fd624c;
                vertical-align: middle;
                margin-right: 14px;
                margin-top: -14px;
              }
            }
          }
        }
        > .title {
          position: relative;

          border-bottom: 2px solid #ccc;
          padding-bottom: 10px;
          text-align: left;
          > span {
            width: 80px;
            height: 26px;
            font-size: 20px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            margin-right: 28px;
            color: #000000;
            cursor: pointer;
          }
          > .more {
              float: right;
              cursor: pointer;
              >span{

                font-size: 14px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                text-align: left;
                color: #000000;
              }
              >img{
                width: 17px;
                height: 17px;
                margin-left: 5px;
                vertical-align: middle;
              }

          }
          > .line {
            width: 87px;
            height: 2px;
            background-color: #174b80;
            position: absolute;
            top: 30px;
            border-radius: 2px;
            -webkit-transition: all 0.5s ease;
            transition: all 0.5s ease;
          }
          .add {
            margin-left: 105px;
          }
          .add2 {
            margin-left: 215px;
          }
          .select {
            font-weight: 700;
            color: #174b80;
          }
        }
      }
    }
    > .tool {
      width: 257px;
      height: 282px;

      margin: 0;
      > .title {
        width: 257px;
        border-bottom: 2px solid #eeeeee;
        padding-bottom: 8px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        position: relative;
        > div:first-child {
          font-size: 20px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          color: #174b80;
        }
        > .line {
          width: 87px;
          height: 2px;
          background-color: #174b80;
          position: absolute;
          top: 30px;
          border-radius: 2px;
        }
        > .div:nth-child(2) {
          font-size: 14px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #000000;
        }
      }
      > .contents {
        margin-top: 23px;
        width: 257px;
        height: 220px;
        background: #f6f6f6;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: flex-start;

        > .icon:first-child,
        .icon:nth-child(2),
        .icon:nth-child(3) {
          margin-top: 28px;
        }
        > .icon {
          height: 70px;
          margin-left: 25px;
          cursor: pointer;
          > img {
            width: 44px;
            height: 44px;
            margin-bottom: 10px;
          }
          > p {
            height: 16px;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: center;
            color: #999999;
          }
        }
      }
    }
  }
}
</style>
