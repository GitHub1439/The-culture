<template>
  <div>
    <img width="100%" :src="resourceAddr" alt="" />
  </div>
</template>
<script>
export default {
  props: ["resourceAddr"],
  data() {
    return {};
  },
};
</script>
<style lang="less" scoped>
</style>
