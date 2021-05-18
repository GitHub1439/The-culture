<template>
	<div>
		<div class="top">
			<div class="el-rates">
				<el-rate
			  void-color="rgba(238,97,45,0.5)"
			  :colors="['#f7ba2a','#f7ba2a','#f7ba2a']"
			  class="clearfix"
			  v-model="form.value1" show-score
			  @change="changeRate"
				></el-rate>
				<!-- <div>{{form.value1}}</div> -->
			</div>
			
			<div class="pingjia">{{courseContent.recommendation}}人评价</div>
			<div class="title">湖南省龙凤工作室测试测试测试测</div>
		</div>
		<div class="bottom">
			<div class="bottom-title">
				<div class="recommend">推荐</div>
				<div>资源</div>
			</div>
			<div>
				<div class="about-item" v-for="(item,index) in recommend" @click="replacePage(item)">
					<img
					  v-if="item.resourceFormatIdFk"
					  :src="
					    require(`../../assets/img/fileType2/${item.resourceFormatIdFk}.png`)
					  "
					  alt=""
					/>
					<div class="about-content">
						<p>{{item.resourceInfoName}}</p>
						<div class="about-item-statistics"> {{item.resourceScore}}分 | {{item.resourceInfoViewnumber}} 阅读 | {{item.resourceDownload}}下载 </div>
					</div>
				</div>
				<div v-if="recommend.length == 0" style="padding: 10px;">
					无推荐资源
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		props:["id","resource"],
		data(){
			return{
				form:{
					value1:  2,
				},
				recommend:[], //推荐资源
				courseContent:{},
				value:0
			}
		},
		created() {
			this.courseContent = JSON.parse(JSON.stringify(this.resource))
			this.form.value1 = this.courseContent.resourceScore
			this.value = this.courseContent.resourceScore
			this.findResourceInfoListRecommend()
		},
		methods:{
			changeRate(e){
				let query = {score:e,id:this.id}
				this.$api.resourceScore(query).then(res=>{
				  if(res.data.code = 200){
					  if(res.data.message != undefined){
						  this.$message({
						    showClose: true,
						    message: res.data.message,
						    type: "warning",
						  });
						  this.form.value1 = this.value
					  }else{
						  this.$emit("succeedRate")
					  }
					 
				  }else{
					  this.$message({
					    showClose: true,
					    message: res.data.message,
					    type: "warning",
					  });
					  this.form.value1 = this.value
				  }
				}) 
			},
			findResourceInfoListRecommend(){
				let query = {
					pageIndex: 1,
					pageSize: 3,
					gradeId: 408,
					resourceId: 202
				}
				this.$api.findResourceInfoListRecommend(query).then(res=>{
				  if(res.data.code = 200){
					  this.recommend = res.data.data.records;
				  }else{
					  this.$message({
					    showClose: true,
					    message: res.data.message,
					    type: "warning",
					  });
				  }
				
				}) 
			},
			replacePage(item){
				this.$router.replace({path: "/Workspace-resource",query:{tdata:JSON.stringify({id: item.resourceInfoId,sversionId: item.sversionId,resourceFormatIdFk: item.resourceFormatIDfk})}})
			}
		}
	}
</script>

<style lang="less" scoped>
	.top{
		height: 156px;
		background: #fff;
		padding: 20px;
		-webkit-box-shadow: 0 6px 2px 0 rgb(7 73 99 / 6%);
		box-shadow: 0 6px 2px 0 rgb(7 73 99 / 6%);
		text-align: left;
		
		>.pingjia{
			padding-left: 10px;
			color: #2c3e50;
			margin: 10px 0;
		}
		>.title{
		    width: auto;
		    line-height: 1.5em;
		    display: inline-block;
		    padding: 5px 20px;
		    margin-top: 10px;
		    border: 1px solid #00a0e9;
		    border-radius: 15px;
		    text-align: center;
		    padding-top: 2px;
		    font-size: 14px;
		    color: #00a0e9;
		}
		>.el-rates {
			// margin-bottom: 20px;
			// height: 20px;
			// line-height: 1;
			display: flex;
			font-size: 45px;
			justify-content: space-between;
			> .el-rate {
			  height: 40px;
			  text-align: center;
			  /deep/i{
				  font-size: 32px;
			  }
			  > .el-rate__item {
				  font-size: 32px;
			    > .el-rate__icon { 
			      font-size: 45px;
			    }
			  }
			}
		}
	}
	.bottom{
		background-color: #fff;
		margin-top: 15px;
		padding: 15px;
		>.bottom-title{
			font-size: 20px;
			display: flex;
		}
		.recommend{
			    padding-bottom: 10px;
			    border-bottom: 3px solid #0a76d9;
		}
		.about-item{
			display: flex;
			margin-top: 20px;
			padding-bottom: 15px;
			border-bottom: 1px solid #e9e9e9;
			text-align: left;
			cursor: pointer;
			.about-content{
				padding-left: 10px;
				line-height: 1.5em;
				font-size: 15px;
				color: #666;
				div{
					margin-top: 5px;
				}
			}
			img{
				width: 50px;
				height: 50px;
			}
			.about-item-statistics{
					margin-top: 5px;
			}
		}
	}
</style>
