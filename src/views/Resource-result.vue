<template>
  <div class="Course-Container2">
    <div class="nav"  data-aos="fade-down" :data-aos-once="false">
      <div class="container">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">教研成果</el-breadcrumb-item>
          <el-breadcrumb-item>成果列表</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="title">
          {{categoryList.categoryName}}
        </div>
        <ul>
          <li
            :class="navIndex == index ? 'li_active' : ''"
            v-for="(item, index) in categoryList.list"
            :key="index"
            @click="navChoice(item, index), getParentId(item, index)"
          >
            {{ item.categoryName }}
          </li>
        </ul>
      </div>
    </div>
    <!-- 视频专区 -->
    <div class="video-zone_list">
      <div class="container">
        <ul class="list">
          <!-- <li
            v-for="(item, index) in videoList"
            :key="index"
            @click="courseJump(item)"
          >
            <img :src="item.courseLogo" alt />
            <div class="video-title">{{ item.courseName | courseName }}</div>

            <ul>
              <li>主讲老师：{{ item.lecturerName }}</li>
              <li
                v-html="`学习进度：${$options.filters.percentageFilters(item)}`"
              ></li>
            </ul>

            
          </li> -->
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
                :class="
                  item.format == 1
                    ? 'primary'
                    : item.format == 2
                    ? 'danger'
                    : item.format == 3
                    ? 'orange'
                    : item.format == 4
                    ? 'danger'
                    : item.format == 5
                    ? 'success'
                    : 'dark'
                "
              >
                <span>{{
            item.format == 1
              ? "Word"
              : item.format == 2
              ? "PDF"
              : item.format == 3
              ? "PPT"
              : item.format == 4
              ? "Video"
              : item.format == 5
              ? "Excle"
              : "TXT"
          }}</span>
              </div>
            </div>

            <ul>
              <li>主讲老师|{{ item.lecturerName | teacher }}</li>
              <li
                v-html="`学习进度：${$options.filters.percentageFilters(item)}`"
              ></li>
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
    <!-- <CourseRecommendation title="猜你喜欢" /> -->
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
          id: "",
          categoryName: "课程",
        },
      ],
      nav1List: [], // 导航栏列表
      navIndex: 0, // 导航栏索引
      courseIndex: 0, // 课程分类索引
      parentId: "1303274563601207351", // 分类id
      videoList: [], // 课程列表
      pageForm: {
        pageSize: 12, // 个数
        pageNum: 1, // 页码
        pageTotal: 0, // 总数
      },
      categoryList:{},
    };
  },
  created() {},
  methods: {
    // 选择分类
    navChoice(item, index) {
      this.navIndex = index;
      this.pageForm.pageNum = 1;
    },
    // 获取分类列表
    getHomeCategoryInfo() {
      this.$api.ClassChildren(2).then((res) => {
        if (res.data.code == 200) {
          this.categoryList = res.data.data;
          this.parentId = this.categoryList.list[0].id;
          this.getCourse();
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
          query: { courseId: item.id },
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
      if (item && item !== "") {
        this.parentId = item.id; // 获取分类ID
        this.getCourse()
      }
      // 获取目录s
   
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
       this.$api
        .ClassifyCourseByCategoryId(this.parentId, 2, this.pageForm)
        .then((res) => {
          this.pageForm.pageTotal = res.data.data.total;
          this.videoList = res.data.data.rows;
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
    // 选择分类
    this.$nextTick(() => {
      // 判断是否从首页点过来的
      if (this.$route.query.courseInfo) {
        this.getHomeCategoryInfo();
        this.parentId = this.$route.query.courseInfo.id;
        this.navIndex = this.$route.query.childIndex;
        // this.getCourse();
      } else {
        // 设置默认目录id
        // this.getParentId();
        this.getHomeCategoryInfo();
      }
    });
  },
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
      if (val.length > 12) {
        return `${val.substring(0, 12)}...`;
      } else {
        return val;
      }
    },
    teacher(val){
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

<style lang="less">
.Course-Container2 {
  position: relative;
  padding: 30px 0 100px 0;

  // 分类
  > .nav {
    margin-bottom: 20px;
    background: #ffffff;
box-shadow: 0px 3px 6px 0px rgba(0,0,0,0.16); 
    > .container {
      >.title{
         border-bottom: 1px solid #e6e5e5;
        padding-bottom: 5px;
        padding:20px 0;
        font-size: 20px;
        font-family: Microsoft YaHei, Microsoft YaHei-Bold;
        font-weight: 700;
        text-align: left;
        color: #000000;
      
          }
      > ul {
        padding: 8px 0 0 0;
        height: 40px;
        > li {
          position: relative;
          cursor: pointer;
          margin-right: 40px;
          margin-bottom: 20px;
          float: left;
          line-height: 20px;
          >img{
            width: 22px;
            height: 23px;
            vertical-align: middle;
          }
        }
        > .li_active {
          font-size: 16px;
          color: #3d78ff;
        }
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
          position: relative;
          > .video-title {
            padding: 11px 14px 0 14px;
            font-size: 18px;
            font-weight: 500;
            color: #18191a;
            line-height: 23px;
            text-align: left;
          }
          > .orange {
            background: #fbe3ba;
             >span{
              color: #e68a09;
            }
            
          }
          > .primary {
            background: #d2e0ff;
            >span{
              color: #3d78ff;
            }
            
          }
          > .danger {
            background: #ffded9;
            >span{
              color: #fc634d;
            }
          }
          > .success {
            background: #c8e8ee;
            >span{
              color: #1499b5;
            }
          }
          > .dark {
            background: #d5dde3;
            >span{
              color: #5e7d96;
              
            }
          }
          > .video-label {
            position: absolute;
            width: 87px;
            height: 28px;
            top: 45px;
            left: 16px;
            text-align: center;
            border-radius: 4px;
            > span {
              font-size: 14px;
              font-family: Microsoft YaHei, Microsoft YaHei-Regular;
              font-weight: 400;
              text-align: center;
              line-height: 24px;
            }
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
          >li:last-child{
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