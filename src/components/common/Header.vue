<template>
  <div class="home">
    <div class="logo-box">
        <table></table>
      <div class="container">
        <img src="../../assets/img/header/logo.png" alt="" />
        <div>
          <input placeholder="请输入课程名称" type="text" />
          <div><img src="../../assets/img/header/search.png" alt="" /></div>
        </div>
      </div>
    </div>
    <div class="nav-box">
        <ul class="container">
          <li
            @click="jump(item.path, index)"
            :class="{ add: num == index }"
            v-for="(item, index) in navList"
            :key="index"
          >
            {{ item.label }}
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        num: 0,
        path:'',
         navList: [
        {
          path: "/",
          label: "首页",
          index: 0,
        },
        
        {
          path: "/resourceBundle",
          label: "教研资源",
          index: 1,
        },
        {
          path: "/Live-class",
          label: "直播课堂",
          index: 2,
        },
        
        
        // {
        //   path: "/Works",
        //   label: "优秀工作坊",
        //   index: 4,
        // },
        {
          path: "/Works",
          label: "工作坊",
          index: 3,
        },
        {
          path: "/Resource-result",
          label: "教研成果",
          index: 4,
        },
        {
          path: "/Map",
          label: "学习地图",
          index: 5,
        },
        {
          path: "/Personal-Center",
          label: "个人中心",
          index: 6,
        },
        
      ],
    };
  },
  methods: {
    // 导航跳转
      jump(path, index) {
        // if(index!==3){
          this.$router.push({ path: `${path}` });
   //      }else{
   //        // var jmid = window.btoa(id);
   //        this.$api.findCurrentWorkspaceIdToUserId().then(res=>{
			//   if(res.data.data){
			// 	  var jmid =  this.$Base64.encode(res.data.data)
			// 	  var yhToken = window.btoa(this.$store.getters.user.access_token);
			// 	  var url =
			// 	    "http://study.hnedu123.cn:9999/workspace/#/?workspaceId=" +
			// 	    jmid+"&marking=" +
			// 	    yhToken;
			// 	  // var url =
			// 	  //   "http://localhost:8080/#/?workspaceId=" +
			// 	  //   jmid+"&marking=" +
			// 	  //   yhToken;
			// 	  window.location.href = url;
			//   }else{
			// 	  this.$message({
			// 	    showClose: true,
			// 	    message: "查询不到工作室id",
			// 	    type: "error"
			// 	  });
			//   }
			
   //        })
          
   //      }
      
    },
  },
  watch: {
    $route(to, from) {
      this.navList.forEach((item, index) => {
        this.num = to.path == item.path ? item.index : this.num;
       });
      
      if(to.path == '/resourceBundle'){
          this.num = 1
      }
      if(to.path == '/TheResearchResources'){
          this.num = 1
      }
      if(to.path == '/Resource-result'){
          this.num = 4
      }
      if(to.query.theResearchResources){
          this.num = 1
      }
      if(to.query.theResearchResources){
          this.num = 1
      }
    },
  },
  mounted(){
    
  },
  created(){
    
  },
};
</script>
<style lang="less">

.home {
  > .logo-box {
    background-image: linear-gradient(to right, #033e80, #5782ae);
    width: 100%;
    height: 87px;
    
      
    > .container {
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
      height: 87px;
      width: 1200px;
      > img {
          width: 653px;
          height:47px;
      }
      > div {
        height: 35px;
        > input {
          width: 260px;
          height: 35px;
          padding: 0  0 0 8px;
          border: 0;
          font-size: 12px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #999999;
        }
        > div {
          width: 35px;
          height: 35px;
          background: #022243;
          float: right;
          > img {
            width: 27px;
            height: 28px;
            text-align: center;
          }
        }
      }
    }
    
  }
  >.nav-box{
         background-image: linear-gradient(to right, #2152DB, #60B8F7);
         box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16); 
         height: 50px;
         >ul{
             display: flex;
             flex-flow: row nowrap;
             justify-content: flex-start;
             align-items: center;
             height: 50px;
             line-height: 50px;
             >.add{
                font-weight: 700;
                color: #3d78ff;
                background: #ffffff;
             }
             >li{
                font-size: 18px;
                font-family: Microsoft YaHei, Microsoft YaHei-Regular;
                font-weight: 400;
                color: #ffffff;
                width: 90px;
                height: 50px;
                text-align: center;
                align-items: center;
                margin-right: 68px;
                cursor: pointer;
                transition: all .5s ease;
             }
         }
    }
}
</style>