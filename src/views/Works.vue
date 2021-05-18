<template>
  <div class="work">
    <div class="container">
      <!-- 工作坊简介 -->
      <!-- <div class="info">
        <img src="../assets/img/works/info.png" alt="" />
        <div>
          <div class="title">工作坊简介</div>
          <div class="contents">
            <span> “信息技术能力提升工程2.0整校推进项目工作坊”</span
            >是根据《教育部关于实施全国中小学教师信息技术应用能力提升工程2.0的意见》和湖南省《湖南省中小学教师信息技术应用能力提升工程2.0试点工作方案》等相关文件要求打造的一站式综合研修平台。他主要面向县域内教育管理者、培训团队、学科骨干教师和县域内的教师等教育工作者，通过采用在线学习、在线研修、在线研讨和在线协作等混合式研修方式，分层次、分类别、有针对性的来整体提升县域内各级各类教育工作者的信息技术能力和素养。
          </div>
        </div>
      </div> -->
      <!-- 工作坊列表 -->
	  <div class="work-title">
		  <div class="title">名师工作坊</div>
		  <div class="my-work" @click="toMy()">我的工作坊></div>
	  </div>
      <ul>
        <li v-for="(item, index) in worksList" :key="index">
          <div class="teacher">
            <img :src="item.workspaceAvatar" alt="" />
            
          </div>
          <div class="btn" >
			  <div class="workspaceName">{{item.workspaceName}}</div>
			  <div><div class="into" @click="goWorkSpace(item)">进入工作坊</div></div>
		  </div>
        </li>
      </ul>
	  <div class="welcome">欢迎进入名师工作坊学习更多优质课程</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      worksList: [],
	  url: window.location.origin == "http://localhost:8081" || window.location.origin == "http://192.168.0.133:8081" ? "http://192.168.0.133:8080/#/?workspaceId=" : "http://study.hnedu123.cn:9999/workspace/#/?workspaceId="
    };
  },
  methods: {
        getWorks(){
         
		  this.$api.selectTeacherWorkspaceList().then(res=>{
		    if(res.data.code == 200)
		      this.worksList = res.data.data
		  })
        },
		toMy(){ // 去我的工作坊
			this.$api.findCurrentWorkspaceIdToUserId().then(res=>{
			  if(res.data.data){
				  var jmid =  this.$Base64.encode(res.data.data)
				  var yhToken = window.btoa(this.$store.getters.user.access_token);
				  var url =
				    this.url +
				    jmid+"&marking=" +
				    yhToken;
				 //  var url =
					// "http://192.168.0.133:8080/#/?workspaceId=" +
					// jmid+"&marking=" +
					// yhToken;
				  // window.location.href = url;
				  window.open(url)
			  }else{
				  this.$message({
					showClose: true,
					message: "查询不到工作室id",
					type: "error"
				  });
			  }
		   })
		},
		goWorkSpace(item){
			var jmid =  this.$Base64.encode(item.workspaceId)
			var yhToken = window.btoa(this.$store.getters.user.access_token);
			var url =
			  this.url +
			  jmid+"&marking=" +
			  yhToken;
			// var url =
			// 	"http://192.168.0.133:8080/#/?workspaceId=" +
			// 	jmid+"&marking=" +
			// 	yhToken;
			window.open(url)
			// window.location.href = url;
		}
  },
  filters: {
    info(val) {
      if (val.length > 35) {
        return `${val.substring(0, 35)}...`;
      } else {
        return val;
      }
    },
  },
  mounted() {
    this.getWorks();
  },
  watch: {},
};
</script>

<style lang="less" scoped>
.work {
  background: #ffffff;
  > .container {
    > .info {
      display: flex;
      justify-content: flex-start;
      flex-flow: row nowrap;
      align-items: center;
      height: 323px;
      background: #ffffff;

      > img {
        width: 229px;
        height: 263px;
        margin-right: 52px;
        margin-left: 33px;
      }
      > div {
        > .title {
          width: 130px;
          height: 35px;
          font-size: 26px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          color: #000000;
        }
        > .contents {
          width: 839px;
          height: 149px;
          font-size: 16px;
          font-family: Microsoft YaHei, Microsoft YaHei-Bold;
          font-weight: 700;
          text-align: left;
          line-height: 32px;
          > span {
            color: #3d78ff;
          }
        }
      }
    }
	.work-title{
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #CDCDCD;
		padding: 24px 0 5px;
		.title{
			font-size: 24px;
			color: #000000;
			height: 31px;
			line-height: 31px;
		}
		.my-work{
			background-color: #3D78FF;
			color: #ffffff;
			text-align: center;
			padding: 10px 13px;
			border-radius: 8px;
			cursor: pointer;
			transition: 0.5s;
			border: 1px solid #3D78FF;
			box-sizing: border-box;
		}
		.my-work:hover{
			background-color: #ffffff;
			color: #3D78FF;
		}
	}
    > ul {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      margin-top: 36px;
      padding-bottom: 150px;
      li{
		  width: 285px;
		  height: 285px;
		  display: flex;
		  flex-direction: column;
		  margin-bottom: 30px;
		  border-radius: 10px;
		  margin-right: 20px;
		  img{
			  width: 100%;
			  height: 140px;
		  }
		  .teacher{
			  height: 140px;
			  border-top-left-radius: 10px;
			  border-top-right-radius: 10px;
		  }
		  .btn{
			  background-color: #F6F6F6;
			  flex: 1;
			  display: flex;
			  flex-direction: column;
			  .workspaceName{
				  font-size: 16px;
				  color: #000000;
				  line-height: 25px;
				  height: 50px;
				  margin: 17px;
				  flex: 1;
				  font-weight: bold;
				  display:-webkit-box;
				  overflow:hidden;
				  text-overflow:ellipsis;
				  -webkit-line-clamp:2;
				  -webkit-box-orient:vertical;
				  text-align: center;
			  }
			  .into{
				  border: 1px solid #3D78FF;
				  padding: 5px 19px;
				  color: #3D78FF;
				  margin: 10px 0 20px;
				  cursor: pointer;
				  display: inline-block;
			  }
			  .into:hover{
				  background-color: #3D78FF;
				  color: #ffffff;
			  }
		  }
		  
	  }
	  li:nth-child(4n){
		  margin-right: 0;
	  }
    }
	.welcome{
		background-color: #F6F6F6;
		font-size: 16px;
		color: #7D7D7D;
		height: 55px;
		line-height: 55px;
		text-align: center;
		margin: 0 auto 150px;
	}
  }
}
</style>