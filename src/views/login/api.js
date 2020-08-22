
import { HTTPGet, HTTPPost } from '../../utils/http'
const pix = '/api'
export const loginApi = {
  // 获取图片验证
  getPicCode: () => {
    let codekey = ''
    return fetch(`/website${pix}/getImageCode`).then(res => {
      codekey = res.headers.get('codekey')
      return res.json()
    }).then(data => {
      return { ...data, codekey }
    }).catch(err => console.log(err))
  },
  // 1.注册:register
  // 2.登录:login
  // 3.找回密码:findPassword
  // 4.更换手机号（新手机号）:changeMobileNew
  // 5.更换手机号（旧手机号）:changeMobileOld
  // 6.预约试驾:testDrive
  // 7.预约维修:maintenance
  // 8.预约保养:upkeep
  // 9.我要咨询:consulting
  // 10.下载型录:downloadCatalogue
  sendMobileCode: (data) => {
    return HTTPPost(`${pix}/sendMobileCode`, data);
  },
  login1: (data) => {
    return HTTPPost(`${pix}/mobileLogin`, data);
  },
  login2: (data) => {
    return HTTPPost(`${pix}/userNameLogin`, data);
  },
  register: (data) => {
    return HTTPPost(`${pix}/register`, data);
  },
  findPassword: (data) => {
    return HTTPPost(`${pix}/findPassword`, data);
  },
  findPasswordCheck: (data) => {
    return HTTPPost(`${pix}/findPasswordCheck`, data);
  },
  checkImageCode: (data) => {
    return HTTPGet(`${pix}/checkImageCode`, data,{noErrorWarning:true});
  },
}