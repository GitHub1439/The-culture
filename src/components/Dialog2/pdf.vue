<template>
  <div class="pdf">
    <el-button-group>
      <!-- <el-button type="primary" size="mini" @click="yl()">预览</el-button> -->
      <el-button
        type="primary"
        icon="el-icon-arrow-left"
        size="mini"
        @click="prePage"
        >上一页</el-button
      >
      <el-button type="primary" size="mini" @click="nextPage"
        >下一页<i class="el-icon-arrow-right el-icon--right"></i
      ></el-button>
      <!-- <el-button type="primary" size="mini" @click="downloadWeekly('随机.xlsx')"> 下载 </el-button> -->
    </el-button-group>
    <div style="margin: 10px 0; color: #409eff; text-align: center">
      {{ pageNum }} / {{ pageTotalNum }}
    </div>
    
    <pdf
      :page="pageNum"
      :src="resourceAddr"
      @progress="loadedRatio = $event"
      @num-pages="pageTotalNum = $event"
      
    ></pdf>
  </div>
</template>
<script>
import pdf from "vue-pdf";
export default {
  props: ["resourceAddr"],
  name: "Pdf",
  components: {
    pdf,
  },
  watch:{
  },
  data() {
    return {
      url:
        "http://fs.hnedu.cn/megagame/document/2020-10-21/1603263749908.pdf",
      pageNum: 1,
      pageTotalNum: 1, // 总页数
      loadedRatio: 0, // 当前页面的加载进度，范围是0-1 ，等于1的时候代表当前页已经完全加载完成了
      // resourceAddr: "",
      FileExt: "",
      FileExtImg: "",
    };
  },
  mounted() {
    // this.yl();
  },
  created(){
  },
  methods: {
    yl() {
      // this.axios.post("http://wj.hnedu123.cn/onlineFile/Online", {
      //   "resourceUrl": "9M/KvH29v7tn8rEZTzlNYk1VS1KFOdDtIOHmpCzLMpT3cza9JBaSAoNnAg8Ow0xoMIWXDUpdlRvTvfj1fiffmw=="
      // }).then(v => {
      //   console.log(v)
      //   this.url = v.data.data.fileAddress
      // })
      // var data = {
      //   id: this.resourceId,
      // };
      // api.courseParticulars(data).then((res) => {
      //   console.log(res);
      //   if (res.data.resourceFormatIdFk !== 8) {
      //     let params = {
      //       resourceUrl: res.data.resourceInfoPhysicsAddr,
      //     };
      //     api.getresource(params).then((res) => {
      //       console.log(res);
      //       this.resourceAddr = res.data.fileAddress;
      //     });
      //   } else {
      //     this.resourceAddr = res.data.resourceInfoAddr;
      //   }
      // });
    },

    downloadWeekly(resourceInfoPhysicsAddr, fileName) {
      this.axios.defaults.headers.common["eduCheck"] = "2222";
      this.axios
        .post("http://fs.hnedu.cn/onlineFile/verifyUser", {
          pathUrl: resourceInfoPhysicsAddr,

          fileName: fileName,
        })
        .then((v) => {
          if (v.data.code == 200) {
            const u = "http://fs.hnedu.cn/onlineFile/download";
            this.axios({
              method: "POST",
              url: u,

              responseType: "blob",

              data: {
                pathUrl: resourceInfoPhysicsAddr,

                fileName: fileName,
              },
            })
              .then((res) => {
                console.log(res);
                const content = res.data;

                if (!content) {
                  return;
                }

                const blob = new Blob([content]);

                if ("download" in document.createElement("a")) {
                  // 非IE下载

                  const elink = document.createElement("a");

                  elink.download = fileName;

                  elink.style.display = "none";

                  elink.href = URL.createObjectURL(blob);

                  document.body.appendChild(elink);

                  elink.click();

                  URL.revokeObjectURL(elink.href); // 释放URL 对象

                  document.body.removeChild(elink);
                } else {
                  // IE10+下载

                  navigator.msSaveBlob(blob, file);
                }
              })
              .catch();
          } else {
            this.$message({
              type: "info",

              message: v.data.msg,
            });
          }
        });
    },

    // 上一页

    prePage() {
      let page = this.pageNum;

      page = page > 1 ? page - 1 : this.pageTotalNum;

      this.pageNum = page;
    },

    // 下一页

    nextPage() {
      let page = this.pageNum;

      page = page < this.pageTotalNum ? page + 1 : 1;

      this.pageNum = page;
    },
  },
};
</script>

<style lang="less" scoped>
.pdf {
  .el-button-group {
    display: block;
    text-align: center;
    .el-button {
      display: inline-block;
      float: none;
    }
  }
}
</style>
