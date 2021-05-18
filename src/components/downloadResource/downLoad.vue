<template>
  <div></div>
</template>



<script>
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    getDownloads(resourceInfoId){
      this.$api.downNum(resourceInfoId).then((res) => {
      });
    },
    downloadWeekly(params) {
              if(params.originality == 2){
          this.$notify({
            title: '下载失败',
            message: '该资源不可对外下载',
            type: 'error'
          });
          return
        }
        this.$api.download({
                pathUrl: params.resourceInfoPhysicsAddr,

                fileName:params.resourceOrigin,
              })
              .then((res) => {
                console.log(res);
                const content = res.data;
                this.getDownloads(params.resourceInfoId)
                if (!content) {
                  return;
                }

                const blob = new Blob([content]);

                if ("download" in document.createElement("a")) {
                  // 非IE下载

                  const elink = document.createElement("a");

                  elink.download = params.resourceOrigin;

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
          
    },
  },
};
</script>

<style lang="scss" scoped>
</style>