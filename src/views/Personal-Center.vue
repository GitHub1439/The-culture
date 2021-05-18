<template>
  <div class="PersonalCenter">
    <div class="container">
      <div class="column">
        <div class="userImg">
          <img :src="$store.getters.userInformation.headImgUrl" alt />
          <img
            @click="columnIndex = 4"
            src="../assets/img/Personal-Center/edit.png"
            alt=""
          />
        </div>
        <div class="userName">
          {{ $store.getters.userInformation.username | username }}
        </div>
        <ul>
          <li
            :class="columnIndex == index ? 'li_active' : ''"
            v-for="(item, index) in columnList"
            :key="index"
            @click="columnIndexActive(index)"
          >
            <div>
              <img
                :src="
                  columnIndex == index
                    ? require('../assets/img/Personal-Center/' +
                        't-0' +
                        (index + 1) +
                        '.png')
                    : require('../assets/img/Personal-Center/' +
                        'f-0' +
                        (index + 1) +
                        '.png')
                "
                alt=""
              />
              {{ item }}
            </div>
          </li>
        </ul>
      </div>
      <!-- 我的课程 -->
      <MyCourse ref="MyCourse" v-if="columnIndex == 0" />
      <MyIntegral v-if="columnIndex == 1" />
      <MyCertificate v-if="columnIndex == 2" />
      <MyMessage v-if="columnIndex == 3" />
      <MyMeasurement v-if="columnIndex == 4" />
      <PersonalInformation v-if="columnIndex == 5" />
      <AccountSecurity v-if="columnIndex == 6" />
    </div>
  </div>
</template>

<script>
import MyCourse from "../components/Personal-Center/MyCourse"; // 我的课程
import MyIntegral from "../components/Personal-Center/MyIntegral"; // 我的课程
import MyCertificate from "../components/Personal-Center/MyCertificate"; // 我的证书
import MyMessage from "../components/Personal-Center/MyMessage"; // 我的消息
import MyMeasurement from "../components/Personal-Center/MyMeasurement"; // 我的测评
import PersonalInformation from "../components/Personal-Center/Personal-information"; // 个人信息
import AccountSecurity from "../components/Personal-Center/Account-security"; // 账号安全
export default {
  name: "Personal-Center",
  components: {
    MyCourse,
    MyIntegral,
    MyCertificate,
    MyMessage,
    AccountSecurity,
    PersonalInformation,
    MyMeasurement
  },
  data() {
    return {
      columnIndex: 0,
      columnList: [
        "学习记录",
        "我的积分",
        "我的证书",
        "我的消息",
        "我的测评",
        "个人信息",
        "退出登录",
      ],
    };
  },
  created() {
    this.$http
      .get("users/info/" + this.$store.getters.user.username)
      .then((res) => {
        this.$store.commit("SET_USER_INFORMATION", res.data.data); // 设置用户信息
      });
  },
  methods: {
    // 栏目选中索引
    columnIndexActive(index) {
      if (this.columnList.length - 1 !== index || index ==2 || index == 5) {
        this.columnIndex = index;
      }
      else {
        window.localStorage.clear();
        window.sessionStorage.clear();
        this.$store.state.menuIndex = 0;
        this.$router.push("/Login");
      }
    },
  },
  mounted() {
    // 栏目选中索引
    if (this.$route.query.columnIndex) {
      this.columnIndexActive(this.$route.query.columnIndex);
    }
  },
  watch: {
    $route(to, form) {
      if (to.name == "PersonalCenter") {
        this.columnIndexActive(this.$route.query.columnIndex);
      }
    },
  },
  filters: {
    username(val) {
      if (val) {
        if (val.length > 8) {
          return `${val.substring(0, 8)}...`;
        } else {
          return val;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.PersonalCenter {
  padding-bottom: 30px;
  min-height: 100vh;
  background: #f4f5f9;
  > .container {
    padding-top: 35px;
    .column {
      margin-right: 9px;
      float: left;
      width: 210px;
      height: 714px;
      background: #ffffff;
      border-radius: 4px;
      > .userImg {
        position: relative;
        > img:nth-child(1) {
          display: block;
          margin: 23px auto 13px auto;
          width: 86px;
          height: 86px;
          border-radius: 50%;
        }
        > img:nth-child(2) {
          cursor: pointer;
          position: absolute;
          right: 60px;
          bottom: -5px;
          width: 29px;
          height: 29px;
        }
      }
      > .userName {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
        color: #3d3d3d;
      }
      > ul {
        margin-top: 33px;
        > li {
          cursor: pointer;
          margin-bottom: 20px;
          line-height: 50px;
          font-weight: 500;
          text-align: center;
          color: #18191a;
          > div {
            margin: 0 auto;
            width: 132px;
            > img {
              vertical-align: middle;
              width: 18px;
              height: 18px;
              transform: translateY(-1px);
            }
          }
        }
        > .li_active {
          color: #3d78ff;
          > div {
            border-radius: 13px;
            box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
          }
        }
        > li:nth-last-child(1) {
          > div {
            color: #999999;
            padding-top: 10px;
            border-top: 1px solid #dedede;
          }
        }
      }
    }
  }
}
</style>