<template>
  <div class="home">
      <div class="container">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
            <div></div>
      </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      
      
    };
  },
  created() {},
  mounted() {
    
  },
  methods: {
      
  },
};
</script>
<style lang="less" scoped>
.home{
    background-color: #F8F8F8;
    .container{
        background-color: #fff;
        >div:first-child{
            width: 100%;
            height: 387px;
            background:url('../assets/img/worksInfo/info.png') no-repeat;
            background-size: 100%;
        }
        >div:nth-child(2){
            width: 100%;
            height: 1026px;
            background:url('../assets/img/worksInfo/team.png') no-repeat;
            background-size: 100%;
        }
        >div:nth-child(3){
            width: 100%;
            height: 1252px;
            background:url('../assets/img/worksInfo/course.png') no-repeat;
            background-size: 100%;
        }
        >div:nth-child(4){
            width: 100%;
            height: 1149px;
            background:url('../assets/img/worksInfo/content1.png') no-repeat;
            background-size: 100%;
        }
        >div:nth-child(5){
            width: 100%;
            height: 1211px;
            background:url('../assets/img/worksInfo/content2.png') no-repeat;
            background-size: 100%;
        }
        >div:nth-child(6){
            width: 100%;
            height: 1106px;
            background:url('../assets/img/worksInfo/content3.png') no-repeat;
            background-size: 100%;
        }
    }
}
    
</style>