<template>
  <div class="MyMeasurement">
    <div class="message-column">
      <div>
        <img src="../../assets/img/Personal-Center/t-05.png" alt="" />
      </div>
      我的测评
    </div>

  <div class="body">
        <div class="title">
          <span>请完成您的学习测评</span>
          <span>您需要完成10道测评题目</span>
        </div>
        <!-- 题库 -->
        <div class="question">
          <!--  -->
          <div v-for="(item, index) in protect" :key="index">
            <!-- 题目 -->
            <div class="title">{{ index+1 +'.'+item.questionContent }}</div>
            <!-- 答案 -->
             <el-radio-group v-model="radioArray[index]" @change="selectRadio(item)">
            <el-radio
              v-for="(option, i) in item.optionsList"
              :key="i"
              
              :label="item.id+option.optionSign"
              >{{ option.optionContent }}</el-radio
            >
             </el-radio-group>
          </div>
          <!-- 提交测试 -->
          <div class="submit">
            <div @click="submit" :class="{add:radioArray.length==10}">提交测评</div>
          </div>
        </div>
      </div>

    
  </div>
</template>

<script>
export default {
  name: "MyIntegral",
  components: {},
  data() {
    return {
      radioArray:[],
      protect: [
        
      ],
    };
  },
  created() {
   
  },
  methods: {
   // 单选框选择时
    selectRadio(item){
        console.log(item)
        console.log(this.radioArray)
    },
    // 测评题库
    getQuestion(){
      this.$api.Question().then(res=>{
        if(res.data.code == 200)
        this.protect = res.data.data;
      })
    },
    
    // 提交测评
    submit(){
      // 未全选
      if(this.radioArray.length<10){
       this.$message({
          message: '请完成您的学习测评后再进行提交',
          type: 'warning'
        });
      }
      // 答题完毕
      else{
        let answerList = {'answerList':[]}
        this.radioArray.forEach((item,index)=>{

          let answer = {
            questionId:item.length>2?item.substring(0,2):item.substring(0,1),
            option:item.length>2?item.substring(2):item.substring(1),
          }
          answerList.answerList.push(answer)
        })
        console.log(answerList.answerList)
        this.$api.submitQuestion(answerList).then(res=>{
              if(res.data.code == 200){
              //  sessionStorage.setItem("courseData", JSON.stringify(res.data.data));
                // this.$store.state.data = res.data.data
                // console.log(JSON.parse(sessionStorage.getItem('courseData')))
                this.$emit('Course',true)
                this.outerVisible = false;
              }
        })
      }
    },
  },
  mounted() {
    this.getQuestion();
  },
  filters: {
  },
};
</script>
<style lang="less">
.MyMeasurement {
  position: relative;
  float: left;
  width: 944px;
  background-color: #fff;
  min-height: 799px;
  > .message-column {
    padding-left: 40px;
    height: 63px;
    line-height: 63px;
    font-weight: 700;
    border-bottom: 1px solid rgba(24, 25, 26, 0.1);
    text-align: left;
    > div {
      margin-right: 11px;
      float: left;
      position: relative;
      top: 13px;
      width: 35px;
      height: 35px;
      border-radius: 50%;
      background-color: #ebf2ff;
      > img {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 18px;
        height: 18px;
      }
    }
  }
  .body {
    margin-top: 27px;
    > .title {
      text-align: left;
      border-bottom: 1px solid #d9d4d4;
      padding-bottom: 11px;
      margin-left: 40px;
      > span:first-child {
        font-size: 16px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
font-weight: 400;
text-align: left;
color: #18191a;
      }
      > span:last-child {
        margin-left: 23px;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #fd624c;
      }
    }
    > .question {
      display: flex;
      flex-flow: column nowrap;
      justify-content: flex-start;
      align-self: flex-start;
      height: 550px;
      overflow: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      > div {
        text-align: left;
        padding: 29px 0 29px 40px;
        > .title {
          font-size: 20px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: left;
          color: #333333;
        }
        > .el-radio-group {
          margin-top: 29px;
        }
      }
      > .submit {
        text-align: center;
        >.add{
          background-color: #3D78FF;
          color: #fff;
          &:hover{
            background-color: #316cf5;
          }
        }
        > div {
            cursor: pointer;
            margin-left: 220px;
          background-color: #d9d4d4;
          width: 354px;
          height: 72px;
          border-radius: 50px;
          line-height: 72px;
          font-size: 26px;
          font-family: Microsoft YaHei, Microsoft YaHei-Regular;
          font-weight: 400;
          text-align: center;
          color: #000000;
          &:hover{
            background-color:#ccc7c7 ;
          }
        }
      }
    }
  }
}
</style>