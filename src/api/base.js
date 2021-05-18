/**
 * 接口域名的管理
 */
const base = {    
    HomeInfo: '/course/info/api/getHomeInfo',//公告资讯
    HomeSlideshow:'/course/homeslideshow/getHomeSlideshow',//首页轮播
    HomeInfolist:'/course/info/api/getHomeInfolist',//公告资讯列表
    getHomedetails:'/course/info/api/getHomeInfoOne',//公告资讯详情
    HomeCategoryInfo:"/course/course/api/getHomeCategoryInfo",//首页教研资源
    HomeCategoryCourseInfo:'course/course/api/getHomeCategoryCourseInfo',//首页教研成果
    liveClassChildren:'course/category/getClassChildren',//首页直播课堂tab栏
    courseLivePage:'course/courseLive/course/courseLivePage',//首页直播课堂列表
    Question:'/course/courseQuestionBank/selectCourseQuestionRandom',//首页测评题
    submitQuestion:'/course/courseUserAnswerRecord/recommendCourse',//提交首页测评数据
    ClassifyCourseByCategoryId:'course/course/api/getClassifyCourseByCategoryId',//教研资源列表
    myCourse:'course/coursestudy/myCourse',//获取我的课程
    selectByUserId:'user-center/userIntegral/userIntegral/selectByUserId',//获取用户积分
    personalList:'user-center/userIntegral/userIntegral/personalList',//获取用户积分记录
    myCertificates:'user-center/basicinfo/myCertificates',//获取证书
    certificatesFeedback:'user-center/basicinfo/certificatesFeedback',//证书反馈
    getCourse:'course/course/api/getCourse',//获取课程信息
    courseview:'course/comment/api/courseview',//获取课程评论
    addGradeLike:'course/comment/api/addGradeLike',//点赞
    online:'http://wj.hnedu123.cn:9099/onlineFile/Online',//预览
    getcomment:'course/comment/api/getcomment',//评语
    creatcoursecomment:'course/comment/api/creatcoursecomment',//提交评语
    recordStatus:'course/coursestudy/recordStatus',//保存进度
    selectReCourseByUser:'course/courseUserAnswerRecord/selectReCourseByUser',//用户答题记录
    stage:'course/stageApi/begin/stage',//阶段
    stageCourse:'course/stageApi/stageCourse',//阶段课程列表
    recordStatus:'course/coursestudy/recordStatus',//记录课程时间
    findWorkSpace:'workspace/workSpace/findWorkSpace',//工作坊列表
    courseLivePageCalendar:'course/courseLive/course/courseLivePageCalendar',//获取日期选择
    upusers:'/users/upusers',//修改个人信息
    applyForCertificate:'user-center/basicinfo/applyForCertificate',//申请证书
    findIdByAreaAndType:'workspace/workspace/api/findIdByAreaAndType',//获取workespaceid
    findTypeAll:'workspace/resourceType/findTypeAll',//作品分类
    handleFlieResourcesDelete:'http://wj.hnedu123.cn:9099/file/handleFlieResourcesDelete',//删除作品磁盘资源
    workspaceResource:'workspace/workspace/api/upload/workspaceResource',//提交作品
    addUserWorks:'course/stage/addUserWorks',//提交作品后保存资源id用于回显
    findById:'workspace/resourceInfo/findById',//查询资源详情
    courseDetail:'course/courseLive/course/courseDetail',//查询课程详情
    findCurrentWorkspaceIdToUserId:'workspace/workspace/api/findCurrentWorkspaceIdToUserId',//获取workspaceid
    resourceInfo:'workspace/resourceInfo/findById',//获取工作坊资源详情
    downNum:'/workspace/resourceInfo/resourceInfoDownload',//下载量
    download:'http://120.78.220.65:9099/onlineFile/download',//下载
	resourceScore:'workspace/resourceScore/add', //评星
    findResourceInfoListRecommend:'workspace/resourceInfo/findResourceInfoListRecommend',//推荐资源
    selectTeacherWorkspaceList: "workspace/workSpace/selectTeacherWorkspaceList",//查询工作坊列表
}

export default base;