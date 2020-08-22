
import { HTTPGet, HTTPPost } from '../../utils/http'
const pix = '/api'
export const carOwnerApi = {
  // 延保计算
  extenInSur: (data) => {
    return HTTPPost(`${pix}/extentionCalculator`, data);
  },
  getMagazineList: (data) => {
    return HTTPPost(`${pix}/getMagazineList`, data);
  },
  getMagazineDetail: (data) => {
    return HTTPGet(`${pix}/getMagazineDetail/${data}`);
  },
  carList: (data) => {
    return HTTPGet(`/Website/News/carList`, data);
  },
  carDetail: (data) => {
    return HTTPGet(`/Website/News/carDetail/id/${data}`);
  },
  // 保养计划
  maintainPlan: (data) => {
    return HTTPPost(`${pix}/maintainPlan`, data);
  },
  // 获取用户预约信息
  getUserInfo: (data) => {
    return HTTPPost(`/website/Maintenance/getUserInfo`, data, false, { noErrorWarning: true });
  },
  // 预约试驾：带入信息
  getTestDriveInfo: (data) => {
    return HTTPPost(`/Website/TestDrive/getTestDriveInfo`, data, false, { noErrorWarning: true });
  },
  // 公共车型 
  getVehicleList: (data) => {
    return HTTPGet(`/website/Maintenance/getVehicleList`, data, { noErrorWarning: true });
  },
  // 预约保养 预约维修 车型接口
  getAllVehicleList: (data) => {
    return HTTPGet(`/website/Maintenance/getAllVehicleList`, data, { noErrorWarning: true });
  },
  // 延保计算车型 
  getExtentionCarType: (data) => {
    return HTTPGet(`${pix}/getExtentionCarType`, data);
  },
  // 服务大厅：获取保养计划车型列表
  getMaintainCarType: (data) => {
    return HTTPGet(`${pix}/getMaintainCarType`, data);
  },
  // 违章查询
  trafficViolationsList: (data) => {
    return HTTPPost(`${pix}/TrafficViolationsList`, data);
  },
  // 服务大厅：违章查询带入用户车架号
  getCarCode: (data) => {
    return HTTPGet(`${pix}/getCarCode`, data, { noErrorWarning: true });
  },
  // 获取省份城市
  getProvince: () => {
    return HTTPGet(`/website/Maintenance/getProvince`, {}, { noErrorWarning: true });
  },
  getCity: (data) => {
    return HTTPGet(`/website/Maintenance/getCity`, data, { noErrorWarning: true });
  },

  // 经销商查询
  // getDealer: (data) => {
  //   console.log(data)
  //   return HTTPGet(`/Website/Dealer/getDealer`,data,{noErrorWarning:true});
  // },
  getDealer: (data) => {
    if (data.cityid && Array.isArray([data.cityid])) {
      data.cityid = data.cityid[0]
    }
    if (data.provinceid && Array.isArray([data.provinceid])) {
      data.provinceid = data.provinceid[0]
    }
    return HTTPPost(`/Website/Dealer/getDealer`, data, false, { noErrorWarning: true });
  },
  //预约保养维护
  addMaintenance: (data) => {
    return HTTPPost(`/website/Maintenance/addMaintenance`, data);
  },
  repair: (data) => {
    return HTTPPost(`/website/Maintenance/repair`, data);
  },
  // 预约试驾 
  addTestDrive: (data) => {
    return HTTPPost(`/Website/TestDrive/addTestDrive`, data);
  },
  // 纯牌零件：一级分类
  getFirstClassify: (data) => {
    return HTTPGet(`/Website/Component/getFirstClassify`, data);
  },
  // 纯牌零件：二级分类
  getSecondClassify: (data) => {
    return HTTPPost(`/Website/Component/getSecondClassify`, data);
  },
  // 纯牌零件：零件列表
  getList: (data) => {
    return HTTPGet(`/Website/Component/getList/id/${data}`);
  },
  // 纯牌零件：零件详情
  getDetail: (data) => {
    return HTTPGet(`/Website/Component/getDetail/id/${data}`);
  },
  // 丰享汇：最新活动列表
  curActivityList: (data) => {
    return HTTPGet(`${pix}/CurActivityList`, data);
  },
  // 丰享汇：车主入会列表
  getOwnerStory: (data) => {
    return HTTPGet('/website/News/getOwnerStory?type=story&page=1&row=100');
  },
  // 丰享汇：车主入会详情
  getOwnerStoryDetail: (id) => {
    return HTTPGet(`/website/News/getOwnerStoryDetail/id/${id}`)
  },
  // 丰享汇：往期活动列表
  pastActivityList: (data) => {
    return HTTPPost(`${pix}/PastActivityList`, data);
  },
  // 丰享汇：活动详情
  activityDetail: (data) => {
    return HTTPGet(`${pix}/ActivityDetail/${data}`);
  },
  // 服务大厅：预约保养：发短信
  sendMsg: (data) => {
    return HTTPGet(`${pix}/sendMsg`);
  },
  // 活动中心：活动列表 
  getActivities: (data) => {
    if (data.cate) {
      return HTTPGet(`/Website/Activity/getActivities/page/${data.page}/row/${data.row}/cate/${data.cate}`);
    }
    return HTTPGet(`/Website/Activity/getActivities/page/${data.page}/row/${data.row}/type/${data.type}`);
  },
  // 服务大厅：违章查询：省份简称列表（车牌号码）
  getProvinceBrief: () => {
    return HTTPGet(`${pix}/getProvinceBrief`);
  },
  // 新车保险、延保促销活动列表 /api/
  getInsuranceActiveList: (data) => {
    return HTTPGet(`${pix}/getInsuranceActiveList/${data}`);
  },
  // 根据id获取预约保养，预约维修信息
  getDateInfo: (data) => {
    return HTTPPost(`/website/Maintenance/getUserInfo`, data);
  },
  // 根据id修改预约保养信息
  updateMaintenance: (data) => {
    return HTTPPost(`/website/Maintenance/addMaintenance`, data);
  },
  // 根据id修改预约维修信息
  updateRepair: (data) => {
    return HTTPPost(`/website/Maintenance/repair`, data);
  },
}