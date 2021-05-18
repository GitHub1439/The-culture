<template>
  <div class="home">
    <!-- 测评弹框 -->
    <Measurement :Visible='Visible' @Course="getCourse" :key="key"  /> 
    <!-- <div class="carousel">
      <el-carousel height="381px">
        <el-carousel-item
          :style="{
            backgroundImage: 'url(' + item.pic + ')',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '100% 100%',
            backgroundSize: '100% 100%',
            cursor: 'pointer'
          }"
          v-for="(item, index) in carousel"
          :key="index"
          @click.native="jump(item.url)"
        >
        </el-carousel-item>
      </el-carousel>
    </div> -->
    <!-- 轮播 资讯公告 教研工具 -->
    <Announcement />
    <!-- 教研资源 -->
    <ResearchResources />
    <!-- 教研成果 -->
    <ResearchResults />
    <!-- 直播课堂 -->
    <LiveClassroom />
    <!-- 推送课程 -->
    <!-- <PushCourse ref="pushCourse" v-show="isshow"   @changeAnwer="changeAnwer" @isShow='isShow' /> -->
    <!-- 友情链接 -->
    <Link />
    <!-- 底部 -->
  </div>
</template>


<script>


import Announcement from "../components/Index/announcement";
import ResearchResources from "../components/Index/researchResources";
import ResearchResults  from "../components/Index/researchResults";
import LiveClassroom  from "../components/Index/liveClassroom";
import Link  from "../components/Index/link";
import PushCourse  from "../components/Index/pushCourse";
import Measurement  from "../components/dialog/measurement";
export default {
  name: "home",
  components: {
   Announcement,
   ResearchResources,
   ResearchResults,
   LiveClassroom,
   Link,
   Measurement,
   PushCourse
  },
  data() {
    return {
      carousel: [
        {
          pic: require("../assets/img/Index/carousel/pic1.png"),
          url:'/Map'
        },
        {
          pic: require("../assets/img/Index/carousel/pic2.png"),
        },
        {
          pic: require("../assets/img/Index/carousel/pic3.png"),
        },
      ],
      resourcesData:[],
      Visible:false,
      key:0,
      status:1,
      isshow:true
     
    };
  },
  watch:{
    
  },
  created() {},
  methods: {
    getCourse(data){
      location.reload()
    },
    changeAnwer(data){  
        this.Visible = data;
        this.key +=1
    },
    isShow(data){
      
        this.Visible = data==201?true:false;
        this.key +=1
        this.isshow = data == 200?true:false;
     
      
    },
    jump(item){
      this.$router.push({path:item})
    },
  },
  mounted() {},
};
</script>
<style lang="less" scoped>
.home {
  > .carousel {
    /deep/ .el-carousel__button {
      width: 10px;
      height: 10px;
      border-radius: 50%;

      background: #000000;
      transition: all 0.3s;
    }
    /deep/ .el-carousel__indicator--horizontal {
      padding: 0;
      margin-left: 10px;
      margin-bottom: 32px;
    }
    /deep/ .el-carousel__indicator.is-active button {
      width: 30px;
      border-radius: 5px;
      background-color: #000000;
    }
    /deep/ .el-carousel__button {
      opacity: 0.6;
    }
  }
}
</style>
