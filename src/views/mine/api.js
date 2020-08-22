import { HTTPGet, HTTPPost, HTTPPut } from '../../utils/http'
const pix = '/api'
export const userApi = {
  // 获取图片验证
  getPicCode: () => {
    let codekey = ''
    return fetch(`/website/${pix}/getImageCode`).then(res => {
      codekey = res.headers.get('codekey')
      return res.json()
    }).then(data => {
      return { ...data, codekey }
    }).catch(err => console.log(err))
  },
  checkImageCode: (data) => {
    return HTTPGet(`${pix}/checkImageCode`, data, { noErrorWarning: true });
  },
  sendMobileCode: (data) => {
    return HTTPPost(`${pix}/sendMobileCode`, data);
  },
  updateMobile: (data) => {
    return HTTPPost(`${pix}/updateMobile`, data);
  },
  getLoveCarList: () => {
    return HTTPGet(`/api/loveCarList`);
  },
  getMyLoveCar: (data) => {
    return HTTPGet(`/Website/Vehicle/carInfo`, data, { noErrorWarning: true });
  },
  carBind: (params) => {
    return HTTPGet(`/Website/Vehicle/bindCar`, params);
  },
  carQuery: (url) => {
    return HTTPGet(url);
  },
  carUpdate: (params) => {
    return HTTPPost(`/api/updateCarInfo`, params);
  },
  // 取消试驾预约
  cancelTestCar: (id) => {
    return HTTPGet(`/api/updateSubscribeStatus/${id}`);
  },
  // 取消保养or维修预约
  cancelService: (id) => {
    return HTTPGet(`/api/updateServiceStatus/${id}`);
  },
  // 卡券列表
  getCardList: (params) => {
    return HTTPPost(`/api/cardList`, params);
  },
  // 预约试驾列表
  getDriveList: (data) => {
    return HTTPPost(`/api/queryDriveList`, data);
  },
  // 预约试驾列表 type:1 预约保养 2预约维修
  getMainTainList: (data) => {
    return HTTPPost(`/api/queryMainTainList`, data);
  },
  logout: () => {
    return HTTPPost(`/api/logout`, {}, true);
  },
  wxLogout: () => {
    return HTTPPost(`/api/wxLogout`, {}, true);
  },
  getUserInfo: () => {
    return HTTPGet(`/api/userInfo`);
  },
  modifyUserInfo: (params) => {
    return HTTPPost(`/api/updateUserInfo`, params);
  },
  modifyPassword: (params) => {
    return HTTPPost(`/api/updatePassword`, params);
  },
  uploadAvatar: (params, token) => {
    return HTTPPost(`/website/User/changeThumb`, params, false, { headers: { accessToken: token } })
  },
  getMyFootPrint: () => {
    return HTTPPost(`/api/personalFootPrint`, { beginPage: 1, pageSize: 1000 });
  },
}

export const orderApi = {
  getOrders: (params) => {
    return HTTPPost(`/api/orderList`, params);
  },
  getOrderDetail: (params) => {
    return HTTPGet(`/api/orderDetail`, params);
  },
}