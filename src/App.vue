<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>|
      <router-link to="/about">About</router-link>
    </div>-->
    <Header v-if="$route.meta.header !== 'none'" />
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" v-wechat-title="$route.meta.title"></router-view>
    <Footer class="footer" v-if="$route.meta.footer !== 'none'" />
  </div>
</template>
<script>
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";

export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
  computed: {
  },
  data() {
    return {};
  },
  created() {},
  mounted() {
    // var arr = ["Index", "Login"];
    // this.$store.commit("SET_KEEP_ALIVE", arr);
    // console.log(this.$store.getters.keepAlive);
  },
  methods: {},
};
</script>
<style lang="less">

@import "./style/base.css";
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
