<template>
  <div class="home">
    <el-dialog title="" :visible.sync="outerVisible" width="60%" :modal='modal'>
      <el-dialog
        width="30%"
        title="内层 Dialog"
        :visible.sync="innerVisible"
        append-to-body
      >
      <div>
        是否确认提交该测评
      </div>
      </el-dialog>
      <!-- 测评题 -->
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
      <!-- <div slot="footer" class="dialog-footer">
        <el-button @click="outerVisible = false">取 消</el-button>
        <el-button type="primary" @click="innerVisible = true"
          >打开内层 Dialog</el-button
        >
      </div> -->
    </el-dialog>
  </div>
</template>
<script>
export default {
  props: ["Visible"],
  mounted() {
    this.outerVisible = this.Visible;
    this.getQuestion();
  },
  watch:{
    Visible:{
       immediate:true,
     handler:function(){
       if(this.Visible){
         console.log(this.Visible)
         this.outerVisible= this.Visible;
       }
     }
    },
  },
  
  data() {
    return {
      outerVisible: false,
      innerVisible: false,
      modal:true,
      answers:{
        answerList:[
          
        ]
      },
      radioArray:[],
      
      protect: [
        
      ],
    };
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
};
</script>
<style lang="less" scoped>
.home {
  .body {
    > .title {
      text-align: left;
      border-bottom: 1px solid #d9d4d4;
      padding-bottom: 11px;
      margin-left: 40px;
      > span:first-child {
        font-size: 26px;
        font-family: Microsoft YaHei, Microsoft YaHei-Regular;
        font-weight: 400;
        text-align: left;
        color: #000000;
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