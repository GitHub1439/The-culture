<template>
  <div>
    <video
      controlslist="nodownload"
      controls="controls"
      style="width:100%; height: 100%;"
      autoplay
      muted
      :src="resourceAddr"
    ></video>
  </div>
</template>



<script>
export default {
  props: ["resourceAddr"],
  name: "Video",
  data() {
    return {};
  },
};
</script>

<style lang="less" scoped>
</style>
