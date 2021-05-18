<template>
  <div class="home">
    <div class="container">
      <el-page-header @back="goBack" content="培训反馈"> </el-page-header>
      <div class="contents">
        <div class="left-box">
          <img :src="certificateData.picture" alt="" />
          <div>
            <div>证书名称:{{ certificateData.certificateName }}</div>
            <div class="platformName">
              发证机构:{{ certificateData.platformName }}
            </div>
            <div>获取时间:{{ certificateData.gmtCreate }}</div>
          </div>
        </div>
        <div class="right-box">
          <div class="rate">
            <label>评分:</label>
            <el-rate  allow-half v-model="form.grade" :colors="colors" > </el-rate>
          </div>
          <div class="label">
            <label>标签:</label>
            <ul>
              <li v-for="(item, index) in labels" :key="index" @click="selectTab(item,index)" :class="{add:num == index}">
                {{ item.label }}
              </li>
            </ul>
          </div>
          <div class="commit">
            <label>评价:</label>
            <el-input
              type="textarea"
              placeholder="请输入内容"
              v-model="form.comment"
              maxlength="200"
              show-word-limit
            >
            </el-input>
          </div>
          <!--  -->
          <div class="submit">
            <div @click="submit">提交</div>
            <div>取消</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  created(){
    
  },
  watch:{
    $route(to,from){
        console.log(to,from)
    }
  },
  data() {
    return {
      certificateData: {},
      num:0,
      form: {
        comment: "",
        grade: 1,
        label: "",
        id:''
      },
      labels: [
        {
          label: "条理清晰",
        },
        {
          label: "给我带来很大帮助",
        },
        {
          label: "简单易学",
        },
        {
          label: "五星好评!",
        },
        {
          label: "太秀了！！",
        },
        {
          label: "爱了爱了！！",
        },
      ],
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"], // 等同于 { 2: '#99A9BF', 4: { value: '#F7BA2A', excluded: true }, 5: '#FF9900' }
    };
  },
  methods: {
    goBack() {
        this.$router.push({path:'/Personal-Center',query:{columnIndex:2}})
      },
      // 选择标签
      selectTab(item,index){
          this.num = index
          this.form.label = item.label;
      },
      // 提交评价
      submit(){
        this.form.grade*2;
        this.$api.certificatesFeedback(this.form).then(res=>{
          if(res.data.code == 200){
               this.$message({
                message: res.data.message,
                type: 'success'
              });
              this.$router.push({path:'/Personal-Center',query:{columnIndex:2}})
          }
          
        })
      },
  },
  mounted(){
    this.$api.myCertificates()
    .then((res) => {
        this.certificateData = res.data.data[0];
        this.form.id= res.data.data[0].id
    });
  },
};
</script>
<style lang="less" scoped>
.home {
  background-color: #f6f6f6;
  > .container {
    >.el-page-header{
      padding:36px 0 25px 0;
      margin-right: 20px;
      /deep/ .el-page-header__title{
        display: none;
      }
     /deep/  .el-page-header__left::after{
        right: -5px;
      }
    }
    > .contents {
      background-color: #fff;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      padding: 104px 187px 90px 89px;
      > .left-box {
        width: 267px;
        height: 300px;
        background: #ffffff;
        border: 1px solid #d9d4d4;
        border-radius: 5px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        position: relative;
        > img {
          width: 220px;
          height: 150px;
          position: absolute;
          top: -30px;
          left: -24px;
        }
        > div {
          position: absolute;
          top: 145px;
          width: 220px;
          > div {
            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
            margin-top: 16px;
            margin-left: 22px;
          }
          > div:first-child {
            width: 100%;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            border-bottom: 1px solid #d9d4d4;
            padding-bottom: 15px;

            margin-top: 0;
          }
          > div:nth-child(2) {
          }
          > div:last-child {
          }
        }
      }
      > .right-box {
        width: 600px;
        height: 360px;
        margin-left: 59px;
        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        > div {
          display: flex;
          flex-flow: row nowrap;
          justify-content: flex-start;
          > label {
            width: 48px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
          }
         
        }
        >.label{
          >ul{
            display: flex;
            flex-flow: row wrap;
            justify-content: space-between;
            width: 545px;
            >li{
              width: 175px;
              height: 39px;
              border: 1px solid #d9d4d4;
              border-radius: 2px;
              line-height: 39px;
              margin-bottom: 10px;
              cursor: pointer;
            }
            >.add{
              background: #fefaf1;
              border: 1px solid #e68a09;
              color: #e68a09;
            }
          }
          
        }
        >.commit{
         /deep/ .el-textarea__inner{
           height: 152px;
         }
        }
        > .submit {
          display: flex;
          justify-content: center;
          > div {
            width: 126px;
            height: 39px;
            font-size: 16px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            line-height: 39px;
            margin-right: 19px;
            cursor: pointer;
          }
          > div:first-child {
            background: #3d78ff;
            color: #ffffff;
            &:hover{
              background: #2161f5;
            }
          }
          > div:last-child {
            background: #f6f6f6;
            color: #000;
            &:hover{
              background:#ccc9c9;
            }
          }
        }
      }
    }
  }
}
</style>