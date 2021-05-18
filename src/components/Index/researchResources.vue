<template>
  <div class="home container">
    <!-- 头部 -->
    <div class="title" data-aos="fade-up" :data-aos-once="false">
      <span>教研资源</span>
      <!-- <span>Teaching and research resources</span> -->
    </div>
    <!-- middle -->
    <div class="middle" data-aos="fade-up" :data-aos-once="false">
      <!-- 左部tab栏 -->
      <div class="left-box">
        <img :src="resourceTab.imgUrl" alt="" />
        <div class="name" v-if="resourceTab.categoryName">
          {{ resourceTab.categoryName }}
        </div>

        <div class="more" @click="jumpMore">
          查看更多 <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <!-- 右部切换内容 -->
      <div class="right-box">
        <div
          v-for="(item, index) in resourceContents"
          :key="index"
          @click="TabJump(item, index, num, parentId)"
        >
          <img :src="item.imgUrl" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  components: {},
  data() {
    return {
      num: 0,
      resourceTab: {},
      resourceContents: [],
      parentId: "1303274563601207357",
    };
  },
  created() {},
  methods: {
    getResources(item, index) {
      this.num = index;
      this.parentId = item.id;
      if (item.list.length > 6) {
        this.resourceContents = item.list.slice(0, 6);
      } else {
        this.resourceContents = item.list;
      }
    },
    getHomeCategoryInfo() {
      this.$api.HomeCategoryInfo().then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          this.resourceTab = res.data.data;
          if (res.data.data.list.length > 6) {
            this.resourceContents = res.data.data.list.slice(0, 6);
          } else {
            this.resourceContents = res.data.data.list;
          }
        }
      });
    },
    jumpMore() {
      this.$router.push({
        path: "/resourceBundle",
      });
    },
    // 课程跳转
    TabJump(item, index, num, parentId) {
      this.$router.push({
        path: "/TheResearchResources",
        query: {
          courseInfo: JSON.stringify(item),
          childIndex: index + 1,
        },
      });
    },
  },
  mounted() {
    this.getHomeCategoryInfo();
  },
};
</script>
<style lang="less" scoped>
.home {
  margin-top: 43px;
  > .title {
    text-align: left;
    width: 1200px;
    > span{
      font-size: 26px;
      font-family: Microsoft YaHei, Microsoft YaHei-Regular;
      font-weight: 400;
      text-align: left;
      color: #174b80;
    }
  }
  > .middle {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    margin-top: 12px;
    height: 365px;
    width: 1200px;
    > .left-box {
      width: 285px;
      height: 365px;
      position: relative;
      > img {
        width: 285px;
        height: 365px;
      }
      > .name {
        position: absolute;
        top: 37px;
        margin-left: 46px;
        width: 193px;
        font-size: 20px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: center;
        color: #ffffff;
        line-height: 26px;
      }
      > .more {
        position: absolute;
        top: 207px;
        margin-left: 46px;
        width: 98px;
        height: 28px;
        border: 1px solid #ffffff;
        font-size: 14px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 400;
        text-align: center;
        color: #ffffff;
        line-height: 28px;
        cursor: pointer;
      }
    }
    > .right-box {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;
      > div {
        margin-left: 10px;
         width: 295px;
          height: 178px;
        > img {
          width: 295px;
          height: 178px;
          cursor: pointer;
        }
      }
      >div:first-child,div:nth-child(2),div:nth-child(3){
        margin-bottom:9px;
      }
    }
  }
}
</style>
