<template>
  <div class="Article" v-html="resourceAddr"></div>
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
 
<style lang="less">
// .ql-align-justify {
img {
  max-width: 100% !important;
}
.Article {
  ul {
    list-style-type: disc;
  }
}
// }
</style>