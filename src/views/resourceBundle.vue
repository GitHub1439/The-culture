<template>
  <div class="Course-Container">
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">教研资源</el-breadcrumb-item>
        <el-breadcrumb-item>课程分类</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="title" data-aos="fade-down" :data-aos-once="false">
        {{ categoryList.categoryName }}
      </div>
    </div>

    <!-- 资源包 -->
    <div class="video-zone_list">
      <div class="container">
        <ul class="list">
          <li
            v-for="(item, index) in categoryList.list"
            :key="index"
            @click="courseJump(item,index)"
          >
            <img :src="item.imgUrl" alt />
            <div>
              <div class="video-title">
                {{ item.categoryName | courseName }}
              </div>
              <div class="video-num">课程总数：12节</div>
            </div>
          </li>
        </ul>
      </div>
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
      pageForm: {
        pageSize: 12, // 个数
        pageNum: 1, // 页码
        pageTotal: 0, // 总数
      },
      categoryList: {},
    };
  },
  created() {},
  methods: {
    // 获取分类列表
    getHomeCategoryInfo() {

         const loading = this.$loading({
          lock: true,
          text: 'Loading',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
      this.$api.HomeCategoryInfo(1).then((res) => {
        if (res.data.code == 200) {
          this.categoryList = res.data.data;
          loading.close();
        }
      });
    },
    // 课程跳转
    courseJump(item,index) {
       this.$router.push({
        path: "/TheResearchResources",
        query: {
          courseInfo: JSON.stringify(item),
          childIndex: index+1,
        },
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
  mounted() {
    this.getHomeCategoryInfo();
  },
  watch: {
    $route(to, from) {
      if (to.path == "/CourseContainer") {
        if (this.$route.query.courseCategoryName) {
          this.videoList = [];
        }
      }
    },
  },
  filters: {
    courseName(val) {
      if (val.length > 13) {
        return `${val.substring(0, 12)}...`;
      } else {
        return val;
      }
    },
  },
};
</script>
<style lang="less" scoped>
.Course-Container {
  position: relative;
  padding: 30px 0 100px 0;
  // 分类

  > .container {
    .title {
      padding-bottom: 5px;
      font-size: 20px;
      font-family: Microsoft YaHei, Microsoft YaHei-Bold;
      font-weight: 700;
      text-align: left;
      color: #000000;
      margin: 20px 0;
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
  }

  // 视频专区
  > .video-zone_list {
    .list {
      > li {
        position: relative;
        box-sizing: border-box;
        float: left;
        margin: 0 20px 32px 0;
        cursor: pointer;
        overflow: hidden;
        width: 285px;
        height: 252px;
        box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.16);
        border-radius: 10px;
        > img {
          width: 100%;
          height: 175px;
        }
        > div {
          height: 51px;
          width: 258px;
          position: relative;
          padding: 0 14px;
          > .video-title {
              padding-top: 11px;
            line-height: 23px;

            font-size: 14px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            color: #000000;
            line-height: 20px;
          }
          > .video-num {
            font-size: 12px;
            font-family: Microsoft YaHei, Microsoft YaHei-Regular;
            font-weight: 400;
            text-align: left;
            margin-top: 12px;
            color: #999999;
          }
          > .video-label {
            position: absolute;

            top: 45px;
            left: 16px;
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