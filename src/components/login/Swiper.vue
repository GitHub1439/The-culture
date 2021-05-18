<template>
  <div class="Swiper">
    <!-- 轮播图 -->
    <el-carousel indicator-position="outside" :interval="6000" height="100vh">
      <el-carousel-item v-for="(item, index) in img" :key="index">
        <img style="width: 100%; height: 100%" :src="item.url" alt />
        <div class="meng"></div>
        <div class="box clearfix">
          <div class="details" v-html="item.details"></div>
          <div class="title">{{ item.title }}</div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "Swiper",
  data() {
    return {
      img: [
        {
          title: "————（英）洛克  ————",
          details:
            "教育上的错误比别的错误更不可轻犯。</br>教育上的错误正和错配了药一样，</br>第一次弄错了，绝不能错第二次、</br>第三次去补救，他们的影响是终身洗刷不掉的。",
          url: require("../../assets/img/login/banner1.png"),
        },
        {
          title: "————  莎士比亚  ————",
          details:
            "时间会刺破青春表面的彩饰，</br>会在美人的额上掘深沟浅槽；</br>会吃掉稀世之珍！天生丽质，</br>什么都逃不过他那横扫的镰刀。",
           url: require("../../assets/img/login/banner2.png"),
        },
        {
          title: "————  鲁迅  ————",
          details:
            "在行进时，也时时有人退伍，</br>有人落荒，有人颓唐，有人叛变，</br>然而只要无碍于进行，则越到后来，</br>这队伍也就越成为纯粹、精锐的队伍了。",
           url: require("../../assets/img/login/banner3.png"),
        },
      ],
    };
  },
  created() {},
  computed: {},
  components: {},
  methods: {},
  mounted() {},
  watch: {},
  filters: {},
};
</script>

<style lang="less">
.Swiper {
  min-height: 100vh;
  min-width: 100vw;
  position: relative;

  .Layout {
    width: 1200px;
    margin: 0 auto;
  }

  // 轮播图
  .el-carousel {
    position: absolute;
    top: 0;
    min-width: 100vw;
    min-height: 100vh;

    .meng {
      position: absolute;
      top: 0;
      width: 100%;
      min-height: 100vh;
      background: rgba(0, 0, 0, 0.42);
    }

    img {
      width: 100%;
      min-height: 100vh;
    }

    // 箭头
    .carousel__arrow {
      display: none;
    }

    .el-carousel__button {
      width: 20px !important;
      height: 3px !important;
      // border-radius: 50% !important;
      // border: 1px solid #1f62d5;
      background: rgba(255, 255, 255, 0.46);
    }

    .is-active .el-carousel__button {
      background-color: #f43d05;
    }

    .el-carousel__indicators--outside button {
      opacity: 1;
    }

    .el-carousel__indicators--outside {
      position: absolute;
      bottom: 8%;
      left: 50%;
      min-width: 1200px;
      transform: translate(-50%, -60px);
    }

    .el-carousel__indicator--horizontal {
      display: inline-block;
      padding: 12px 4px;
      float: left;
      transform: translate(200px, 0);
    }

    .box {
      position: absolute;
      bottom: 21%;
      min-width: 1200px;
      left: 50%;
      transform: translate(-33%, 0);

      > div {
        font-size: 16px;
        color: #fff;
      }

      > .details {
        width: 345px;
        line-height: 23px;
        color: #fff;
      }

      > .title {
        line-height: 48px;
      }
    }
  }
}
</style>