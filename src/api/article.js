/**
 * article模块接口列表
 */

import base from "./base"; // 导入接口域名列表
import axios from "./http"; // 导入http中创建的axios实例
import qs from "qs"; // 根据需求是否导入qs模块

const article = {
  // 公告资讯
  Notice(type, limit) {
    return axios.get(`${base.HomeInfo}`, {
      type: type,
      limit: limit,
    });
  },
  // 轮播
  carousel() {
    return axios.get(`${base.HomeSlideshow}`);
  },

  // 资讯公告列表
  Homelist(type, params) {
    return axios.get(`${base.HomeInfolist}?type=${type}`, params);
  },
  // 资讯公告详情
  Homedetails(infoId) {
    return axios.get(`${base.getHomedetails}`, {
      infoId: infoId,
    });
  },
  // 首页教研资源
  HomeCategoryInfo(type) {
    return axios.get(`${base.HomeCategoryInfo}?type=${type}`);
  },
  // 首页直播课堂tab栏
  liveClassChildren(userId, parentId,type) {
    return axios.get(`${base.liveClassChildren}`, {
      parentId: parentId,
      userId: userId,
      type:type
    });
  },

  ClassChildren(type) {
    return axios.get(`${base.liveClassChildren}`, {
      type: type,
    });
  },
  // 首页直播课堂列表
  courseLivePage(id, params) {
    return axios.get(`${base.courseLivePage}?categoryId=${id}`, params);
  },
  //首页教研成果
  HomeCategoryCourseInfo() {
    return axios.get(`${base.HomeCategoryCourseInfo}`);
  },
  // 获取测评问题
  Question() {
    return axios.get(`${base.Question}`);
  },
  // 提交测评题
  submitQuestion(params) {
    return axios.post(`${base.submitQuestion}`, params);
  },
  // 教研资源列表
  ClassifyCourseByCategoryId(parentId, type, params) {
    return axios.get(
      `${base.ClassifyCourseByCategoryId}?categoryId=${parentId}&type=${type}`,
      params
    );
  },
  // 获取课程
  myCourse(isFinished, params) {
    return axios.get(`${base.myCourse}?isFinished=${isFinished}`, params);
  },
  // 获取用户积分
  selectByUserId(userId) {
    return axios.get(`${base.selectByUserId}?userId=${userId}`);
  },
  // 获取用户积分记录
  personalList(userId) {
    return axios.get(`${base.personalList}?userId=${userId}`);
  },
  // 获取证书
  myCertificates() {
    return axios.get(`${base.myCertificates}`);
  },
  // 证书反馈
  certificatesFeedback(params) {
    return axios.post(`${base.certificatesFeedback}`, params);
  },
  // 获取课程信息
  getCourse(courseId) {
    return axios.get(`${base.getCourse}?courseId=${courseId}`);
  },
  // 获取课程评论
  courseview(courseId, params) {
    return axios.get(`${base.courseview}?courseId=${courseId}`, params);
  },
  // 点赞
  addGradeLike(params) {
    return axios.post(`${base.addGradeLike}`, params);
  },
  // 预览
  online(params) {
    return axios.post(`${base.online}`, params);
  },
  //评语
  getcomment() {
    return axios.get(`${base.getcomment}`);
  },
  // 提交评语
  creatcoursecomment(params) {
    return axios.post(`${base.creatcoursecomment}`, params);
  },
  // 保存进度
  recordStatus() {
    return axios.post(`${base.recordStatus}`, params);
  },
  // 答题记录
  selectReCourseByUser() {
    return axios.get(`${base.selectReCourseByUser}`);
  },
  // 阶段
  stage() {
    return axios.get(`${base.stage}`);
  },
  // 阶段下的课程列表
  stageCourse(stageid) {
    return axios.get(`${base.stageCourse}?stageid=${stageid}`);
  },
  // 记录课程时间
  recordStatus(params) {
    return axios.post(`${base.recordStatus}`, params);
  },
  // 工作坊列表
  findWorkSpace() {
    return axios.get(`${base.findWorkSpace}`);
  },
  // 获取日期选择
  courseLivePageCalendar() {
    return axios.get(`${base.courseLivePageCalendar}`);
  },
  // 修改个人信息
  upusers(params) {
    return axios.post(`${base.upusers}`, params);
  },
  // 申请证书
  applyForCertificate() {
    return axios.post(`${base.applyForCertificate}`);
  },
  // 获取workspaceid
  findIdByAreaAndType() {
    return axios.get(`${base.findIdByAreaAndType}`);
  },
  // 获取作品分类
  findTypeAll() {
    return axios.post(`${base.findTypeAll}`);
  },
  // 删除作品磁盘资源
  handleFlieResourcesDelete(params) {
    return axios.post(`${base.handleFlieResourcesDelete}`, params);
  },
  // 提交作品
  workspaceResource(workspaceId, params) {
    return axios.post(
      `${base.workspaceResource}?workspaceId=${workspaceId}`,
      params
    );
  },
  // 保存资源id
  addUserWorks(params) {
    return axios.post(`${base.addUserWorks}`, params);
  },

  //
  findById(id) {
    return axios.get(`${base.findById}?id=${id}`);
  },
  // 课程详情
  courseDetail(id) {
    return axios.get(`${base.courseDetail}?id=${id}`);
  },

  findCurrentWorkspaceIdToUserId() {
    return axios.get(`${base.findCurrentWorkspaceIdToUserId}`);
  },

  // 获取工作坊资源详情
  resourceInfo(id) {
    return axios.get(`${base.resourceInfo}`, id);
  },
  // 下载量
  downNum(id) {
    return axios.get(`${base.downNum}?id=${id}`);
  },
  //   判断登录
  verifyUser(params) {
    return axios.post(`${base.verifyUser}`, params);
  },
//   下载
download(params) {
    return axios.postDownload(`${base.download}`, params);
  },
  //   评星
  resourceScore(params) {
      return axios.post(`${base.resourceScore}`+"?id="+params.id+"&score="+params.score, params);
  },
  findResourceInfoListRecommend(params) {
      return axios.post(`${base.findResourceInfoListRecommend}`+"?pageIndex="+params.pageIndex+"&pageSize="+params.pageSize+"gradeId="+params.gradeId+"&resourceId="+params.resourceId, params);
  },
  selectTeacherWorkspaceList(params) {
      return axios.get(`${base.selectTeacherWorkspaceList}`);
  },
};

export default article;
