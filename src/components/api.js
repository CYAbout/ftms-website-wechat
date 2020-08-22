
import { HTTPGet, HTTPPost } from '../utils/http'
const pix = '/api'
export const comApi = {

  // 全局搜素
  search: (data) => {
    return HTTPPost(`${pix}/search`, data);
  },
  // 获取视频链接地址
  // 爱车课堂:LoveCarClass  防伪查询:SecurityCheck  丰权益:LegalRight
  // 汇生活:EasyLife 品牌理念:BrandConcept 品牌体系:BrandSystem
  // 环保视频:Environment 丰潮世界:FengChao 精彩推荐:Recommend
  getVideoUrl: (data) => {
    return HTTPGet(`${pix}/getVideoUrl/${data}`);
  },
  getVideoUrlByPaging: (data) => {
    return HTTPPost(`${pix}/getVideoUrlByPaging`, data);
  },
  // 根据定位查询省市信息
  getRegionInfoByLocate: (data) => {
    return HTTPPost(`${pix}/getRegionInfoByLocate`, data, false, { noErrorWarning: true });
  },
  // 判断用户是否登录（PHP调用）
  // /api/isLogging/{accessToken}
  isLogging: () => {
    return HTTPGet(`/website/api/userInfo`);
  },
}