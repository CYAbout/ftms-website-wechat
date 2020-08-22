
import {HTTPGet,HTTPPost} from '../../utils/http'
const pix = '/api'
export const homeApi = {
  // 轮播图
  slideshow:(data) => {
    return HTTPGet(`${pix}/slideshow/${data}`);
  },
  // 车型列表
  brandModels:(data) => {
    return HTTPGet(`/Website/Car/brandModels`);
  },
  // 底部列表
  getAdvertisement:(data) => {
    return HTTPGet(`/Website/Tender/getAdvertisement/position/${data}`);
  },
}