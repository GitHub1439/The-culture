import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./js/cookie";
import './style/rem'
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import api from "./api/article.js"; // 导入api接口
Vue.prototype.$api = api; // 将api挂载到vue的原型上
Vue.prototype.$store = store;
let Base64 = require('js-base64').Base64
Vue.prototype.$Base64 = Base64;
// import './config/rem';
// 设置title
import VueWechatTitle from "vue-wechat-title";
Vue.use(VueWechatTitle);
Vue.use(MintUI);
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
import less from "less";
Vue.use(less);
import { Button } from "vant";
Vue.use(Button);
import 'font-awesome/css/font-awesome.min.css'
import scroll from "vue-seamless-scroll";
Vue.use(scroll);
import axios from "axios";
Vue.prototype.$http = axios;
// const requestApi = "/wllxApi";
// axios.defaults.baseURL = requestApi; // 配置axios请求的地址
axios.defaults.headers.post["Content-Type"] = "application/json; charset=utf-8";
axios.defaults.crossDomain = true;
axios.defaults.withCredentials = true; //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
// axios.defaults.headers.common["token"] =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcmdhbml6YXRpb25JZCI6bnVsbCwiY29kZSI6MjAwLCJyb2xlaWRzIjpudWxsLCJoZWFkSW1nVXJsIjoiaHR0cDovL2xlc3Nvbi5obmVkdTEyMy5jbi9pbWFnZS8yMDIwLTA3LTE2LzAxOTU5Ny5qcGciLCJ1c2VyX25hbWUiOiJtdCIsInNjb3BlIjpbImFwcCJdLCJpZCI6IjEzNDYzODA5ODQ3MzU2MzM0MDgiLCJleHAiOjE2MTE3NDY5NDUsImp0aSI6IjcxM2JlNTlkLTVlNTAtNGI1ZS1iZDVlLWIzYzZkZDM1N2Y2NSIsImNsaWVudF9pZCI6ImFwcCIsInVzZXJuYW1lIjoibXQifQ.GX0mOhtEti4P03EmY_mA2jWzr_tp0dRvR4s5S-kBwtg"; // 设置请求头为 Authorization
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
