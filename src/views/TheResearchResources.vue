<template>
  <div class="Course-Container">
    <!-- 面包屑 -->

    <!-- 分类导航 -->
    <div class="nav" data-aos="fade-down" :data-aos-once="false">
      <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">教研资源</el-breadcrumb-item>
          <el-breadcrumb-item>资源列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title" data-aos="fade-down" :data-aos-once="false">
          {{ categoryList.categoryName }}
        </div>
        <!-- 栏目 -->
        <ul class="second-nav" :class="{ packup: pack }">
          <li
            v-for="(item, index) in categoryList.list"
            :key="index"
            :class="{ li_active: navIndex2 == index }"
            @click="
              (navIndex2 = index),
                (pageForm.pageNum = 1),
                getParentId(item, index)
            "
          >
            {{ item.categoryName }}
          </li>
          <span @click="pack = !pack">
            <i :class="!pack ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"></i>
            {{ pack ? "展开" : "收起" }}</span
          >
        </ul>
      </div>
    </div>
    <!-- 视频专区 -->
    <div class="video-zone_list">
      <div class="container">
        <ul class="list">
          <li
            v-for="(item, index) in videoList"
            :key="index"
            @click="courseJump(item)"
          >
            <img :src="item.courseLogo" alt />
            <div>
              <div class="video-title">{{ item.courseName | courseName }}</div>
              <div
                class="video-label"
                v-html="
                  `学习进度 | ${$options.filters.percentageFilters(item)}`
                "
              ></div>
            </div>

            <ul>
              <li>主讲老师|{{ item.lecturerName | teacher }}</li>
              <li>
                {{
                  `课程时长:${Math.floor(item.videoLength / (1000 * 60))}分钟`
                }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- none -->
    <div class="none" v-if="videoList.length == 0">
      <img src="../assets/img/Live-class/none.png" alt="" />
      暂无数据!
    </div>
    <!-- 分页 -->
    <div class="paging">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageForm.pageTotal"
        :page-size="pageForm.pageSize"
        :current-page="pageForm.pageNum"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        hide-on-single-page
      ></el-pagination>
    </div>
    <!-- 猜你喜欢 -->
  </div>
</template>

<script>
// import CourseRecommendation from "../components/Course-recommendation"; // 课程推荐
export default {
  name: "Course-Container",
  components: {
    // CourseRecommendation,
  },
  data() {
    return {
      breadcrumb: [
        {
          id: "1303274563601207350",
          categoryName: "教研资源",
        },
      ],
      nav1List: [], // 导航栏列表
      nav2List: [], //超出导航栏列表暂存
      nav3List: [], //超出导航栏列表暂存

      nav1List2: [],
      navIndex: 0, // 导航栏索引
      navIndex2: 0,
      courseIndex: 0, // 课程分类索引
      parentId: "1303274563601207350", // 分类id
      videoList: [], // 课程列表
      pageForm: {
        pageSize: 12, // 个数
        pageNum: 1, // 页码
        pageTotal: 0, // 总数
      },
      icon: false,
      categoryList: {},
      pack: false,
    };
  },
  created() {
    // 选择分类
    this.$nextTick(() => {
      // 判断是否从首页点过来的
      if (this.$route.query.courseInfo) {
        let data = JSON.parse(this.$route.query.courseInfo);
        console.log(data);
        this.getHomeCategoryInfo();
        this.parentId = data.id;
        this.navIndex2 = this.$route.query.childIndex;
        this.getCourse();
      }

      // 获取目录
      else {
        this.getHomeCategoryInfo();
      }
    });
  },
  methods: {
    // 选择分类
    navChoice(item, index) {
      this.navIndex = index;
      this.pageForm.pageNum = 1;
    },
    // 获取分类列表
    getHomeCategoryInfo() {
      this.$api.ClassChildren(1).then((res) => {
        if (res.data.code == 200) {
          this.categoryList = res.data.data;
        }
      });
    },
    // 课程跳转
    courseJump(item) {
      if (item.tutorialMode == 0) {
        window.open(item.baseUrl);
      } else {
        this.$router.push({
          path: "/CourseDetails",
          query: { courseId: item.id, theResearchResources: true },
        });
      }
    },
    // 选择分类
    selectClassification() {
      this.nav1List.forEach((item, index) => {
        if (item.categoryName == this.$route.query.courseCategoryName) {
          this.navIndex = index;
          this.navChoice(item, index); // 选择分类
          this.getParentId(item, index); // 获取分类
        }
      });
    },
    // 获取分类 id
    getParentId(item, index, flag) {
      if (item) {
        this.parentId = item.id; // 获取分类ID
        this.getCourse();
      }
    },
    // 课程分类索引
    courseIndexSelect(item, index) {
      this.courseIndex = index;
      if (item == "公开课") {
        this.isFree = 1;
      } else if (item == "付费课") {
        this.isFree = 0;
      } else {
        this.isFree = "";
      }
      // 获取课程列表
      this.getCourse();
    },
    // 面包屑选择
    breadcrumbSelect(item, index) {
      this.navIndex = 0; // 分类选择索引
      if (item.categoryName !== "全部") {
        // 切割面包屑
        this.breadcrumb.splice(index + 1);
      }

      // 分类id
      // this.categoryId = item.id;
      // 获取分类id  设置面包屑
      this.getParentId(item, 0, 1);
    },
    // 获取课程列表
    getCourse() {
      const loading = this.$loading({
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      this.$api
        .ClassifyCourseByCategoryId(this.parentId, 1, this.pageForm)
        .then((res) => {
          this.pageForm.pageTotal = res.data.data.total;
          this.videoList = res.data.data.rows;
          loading.close();
        });
    },
    handleCurrentChange(currentPage) {
      this.pageForm.pageNum = currentPage;
      // 获取课程列表
      this.getCourse();
    },
    handleSizeChange(currentPage) {
      this.pageForm.pageNum = currentPage;
      // 获取课程列表
      this.getCourse();
    },
  },
  mounted() {},
  watch: {
    $route(to, from) {
      if (to.path == "/CourseContainer") {
        if (this.$route.query.courseCategoryName) {
          this.videoList = [];
          this.selectClassification();
        }
      }
    },
  },
  filters: {
    courseName(val) {
      if (val.length > 30) {
        return `${val.substring(0, 30)}...`;
      } else {
        return val;
      }
    },
    teacher(val) {
      if (val.length > 3) {
        return `${val.substring(0, 3)}...`;
      } else {
        return val;
      }
    },
    percentageFilters(val) {
      if (val) {
        if (val.studyTime == 0) {
          return `<span style="color:red;">${0}%</span>`;
        } else {
          var data = parseFloat(
            Math.round((val.studyTime / val.videoLength) * 10000) / 100.0
          );
          if (data > 100) {
            data = 100;
            return `<span style="color:green;">${data}%</span>`;
          }
          return `<span style="color:red;">${data}%</span>`;
        }
      }
    },
  },
};
</script>
<style lang="less" scoped>
.Course-Container {
  position: relative;
  padding: 30px 0 100px 0;
  // 面包屑
  > .breadcrumb {
    height: 72px;
    line-height: 72px;
    > .container {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      > div {
        margin-right: 10px;
        float: left;
        cursor: pointer;
      }
      > div:nth-last-child(1) {
        > i {
          display: none;
        }
      }
    }
  }
  // 分类
  > .nav {
    min-height: 43px;
    line-height: 43px;
    margin-bottom: 20px;
    position: relative;
    background: #ffffff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);

    > .container {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      > .title {
        border-bottom: 1px solid #e6e5e5;
        padding-bottom: 5px;

        font-size: 20px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #000000;
      }
      .more {
        position: absolute;
        right: 300px;
        bottom: 0;
        cursor: pointer;
        color: #2b9fec;
        > img {
          vertical-align: middle;
          width: 24px;
          height: 24px;
        }
        &:hover {
          margin-left: 10px;
        }
      }

      .second-nav {
        text-align: left;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        padding: 19px 0 24px 0;
        position: relative;
        > li {
          text-align: left;
          margin-right: 40px;
          cursor: pointer;
          &:hover {
            color: #2b9fec;
          }
        }
        > .li_active {
          font-size: 16px;
          color: #3d78ff;
        }
        > span {
          position: absolute;
          bottom: 0;
          right: 0;
          cursor: pointer;
        }
      }
      .packup {
        height: 73px;
        overflow: hidden;
      }
    }
  }
  // 视频专区
  > .video-zone_list {
    .list {
      > li {
        position: relative;
        box-sizing: border-box;
        float: left;
        margin: 0 38px 32px 0;
        cursor: pointer;
        overflow: hidden;
        width: 268px;
        height: 309px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        border-radius: 10px;
        > img {
          width: 100%;
          height: 151px;
        }
        > div {
          height: 120px;
          width: 268px;
          > .video-title {
            padding: 11px 14px 0 14px;
            line-height: 23px;

            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            line-height: 20px;
          }
          > .video-label {
            margin-top: 10px;
            margin-left: 14px;
            text-align: center;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
          }
        }

        > ul {
          // position: absolute;
          width: 100%;
          // bottom: 0;
          height: 39px;
          border-top: 1px solid rgba(0, 0, 0, 0.16);
          > li {
            text-align: center;
            line-height: 39px;
            float: left;
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #999999;
          }
          > li:nth-child(1) {
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            margin-left: 19px;
            // position: relative;
            // &::after {
            //   content: "";
            //   position: absolute;
            //   right: 0;
            //   width: 1px;
            //   height: 100%;
            //   background-color: rgba(0, 0, 0, 0.16);
            // }
          }
          > li:last-child {
            float: right;
            margin-right: 18px;
          }
        }
      }
      > li:nth-child(4n) {
        margin-right: 0;
      }
    }
  }
  > .video-zone_list {
    ul {
      > li:hover {
        // box-shadow: 0px 3px 12px 0px rgba(0, 0, 0, 0.12);
      }
    }
  }
  // none
  > .none {
    font-size: 18px;
    text-align: center;
    color: #999999;
    > img {
      margin: 50px auto 20px auto;
      display: block;
      width: 323px;
      height: 196px;
    }
  }
  // 分页
  > .paging {
    // position: absolute;
    // bottom: 0;
    width: 100%;
    // 分页
    .el-pagination {
      text-align: center;
      margin: 40px 0;
      > .el-pager {
        > li:not(.disabled):hover {
          color: #3d78ff;
        }
        > .active {
          background-color: #3d78ff !important;
          &:hover {
            color: #fff !important;
          }
        }
      }
    }
  }
}
</style>