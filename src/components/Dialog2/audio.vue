<template>
  <div>
    <audio controls style="width: 80%; margin-top: 100px">
      <source :src="resourceAddr" />
    </audio>
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
