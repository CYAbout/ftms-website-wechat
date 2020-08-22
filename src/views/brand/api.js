
import {HTTPGet,HTTPPost} from '../../utils/http'
const pix = '/api'
export const brandApi = {
  // 企业历程
  companyHistory:(data) => {
    return HTTPPost(`${pix}/companyHistory`, data);
  },
  // 企业新闻：新闻展示列表
  newsList:(data) => {
    return HTTPGet(`/Website/News/newsList`, data);
  },
  // 企业新闻：新闻详情
  newsDetail:(data) => {
    return HTTPGet(`/Website/News/newsDetail`, data);
  },
  // 粉丝互动：丰巢世界：热门话题列表
  getHotTopic:(data) => {
    return HTTPGet(`/Website/FengChao/getHotTopic`, data);
  },
  // 粉丝互动：丰巢世界：帖子列表
  getPostList:(data) => {
    return HTTPGet(`/Website/FengChao/getPostList`, data);
  },
  // 粉丝互动：丰巢世界：帖子详情
  getPostDetail:(data) => {
    return HTTPGet(`/Website/FengChao/getPostDetail`, data);
  },
  // 粉丝互动：丰巢世界：个人中心
  getPersonInfo:(data) => {
    return HTTPGet(`/Website/FengChao/getPersonInfo`, data);
  },
  // 粉丝互动：精彩推荐：文章列表
  getList:(data) => {
    return HTTPPost(`/Website/FansArticle/getList`,data);
  },
  // 粉丝互动：丰巢世界：评论列表
  getRemarkList:(data) => {
    return HTTPGet(`/Website/FengChao/getRemarkList`, data);
  },
  // 粉丝互动：精彩推荐：文章详情
  getDetail:(data) => {
    return HTTPPost(`/Website/FansArticle/getDetail`, data);
  },
  // 丰享汇：活动详情
  activityDetail: (data) => {
    return HTTPGet(`${pix}/ActivityDetail/${data}`);
  },
  // 活动中心：活动列表 
  getActivities: (data) => {
    return HTTPGet(`/Website/Activity/getActivities/page/${data.page}/row/${data.row}/type/${data.type}`);
  },
  // 活动中心：活动
  getDetailActivity: (data) => {
    return HTTPGet(`/Website/Activity/getDetail/id/${data}`);
  },
  // 粉丝互动：文章详情：收藏文章   
  collect:(data) => {
    data = {...data,id:+data.id}
    return HTTPPost(`/Website/FansArticle/collect`, data);
  },
  // 精彩互动：视频专区：收藏视频
  collectVideo:(data) => {
    data = {...data,id:+data.id}
    return HTTPPost(`/Website/FansArticle/collectVideo`, data);
  },
}