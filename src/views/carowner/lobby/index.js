import React, { Component } from 'react';
import { Tabs, Button, Toast, Modal } from 'antd-mobile';
import Fuwuyuyue from './module/fuwuyuyue'
import Baoyang from './module/baoyang'
import moment from 'moment'
import { carOwnerApi } from '../api'
import { comApi } from '../../../components/api';
import { getParamsObj } from '../../../utils/util';
import phone from './phone.json';
import config from '../../../config.json';

import {
  MyInput,
  MySelect,
  MyDate
} from '../../../components/dataview/'
import './index.less'

const BMap = window.BMap || {}
class Lobby extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carTypeData: [{ label: '大型车', value: '01' }, { label: '小型车', value: '02' }],
      carTypeTxt: ['02'],
      isShowWeiZhangRes: false,
      weizhangData: {
        violationPunishListBOS: []
      },
      carType: [],
      carCode: [],
      carCodeData: [],
      province: [],
      citys: [],
      isAgree: false,
      phoneBx: '',
      sexData: [{ label: '先生', value: '1' }, { label: '女士', value: '0' }],
      faultPartData: [{ label: '车轮', value: '1' }],
      baoyangItemData: [
        { label: '调整制动/传动/转向/排气系统/前后悬挂/底盘', value: '1' },
        { label: '冷却系统/燃油系统/变速箱', value: '2' },
        { label: '门锁、铰链、天窗、发动机盖锁及后行李箱锁', value: '3' },
        { label: '轮胎换位', value: '4' },
        { label: '轮胎状态/电瓶状况', value: '5' },
        { label: '发动机动力性能下降,油耗增加,喷嘴堵塞', value: '6' },
      ],
      carNumber1: ['京'],
      carNumber1Data: [],
      baoyangItem: [],
      sex: '',
      dateBaoyang: '',
      pailiang: '',
      addressValue: '1',
      addressData: [],
      modelTypeData: [{ value: 'rav4', label: 'rav4' }],
      purchaseYearData: [{ value: '2018', label: '2018' }],
      drivingMileageData: [{ value: '1', label: '1' }],
      addressHere: [],
      tabIndex: getParamsObj().tabIndex ? +getParamsObj().tabIndex : 0,
      gotime: '',
      carCodeList: [],
      mobileChanged: false
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }
  componentDidMount() {
    let params = getParamsObj();
    this.getVehicleList()
    this.getShengFen()
    if (!params.modify) {
      this.getHereAddress()
    }
    this.getProvinceBrief()
    this.getTabIndex()
    console.log('--------------componentDidMount')

    // 官微的部分选项卡要求注释隐藏 而且有单独页面跳转 为了不单独将选项卡拆成但页面和配置路由 减少工作量 所以通过url带tabindex来判断 跳转的是那一选项卡
    this.setState({
      tabIndex: Number(params.tabIndex || params.tabindex)? Number(params.tabIndex || params.tabindex): 0
    })
    switch(params.tabIndex) {
      case '0':
        document.title = '保养计划';
        break;
      case '1':
        document.title = '预约保养';
        break;
      case '2':
        document.title = '预约维修';
        break;
      case '3':
        document.title = '违章查询';
        break;
      case '4':
        document.title = '紧急救援';
        break;
    }
  }
  componentWillReceiveProps() {
    console.log('--------------componentWillReceiveProps')
    // this.getTabIndex()
  }
  getTabIndex() {
    // const tabIndex = localStorage.getItem('tabsIndex')
    let params = getParamsObj();
    const tabIndex = params.tabIndex ? +params.tabIndex : 0
    console.log(tabIndex)
    // this.setState({
    //   tabIndex
    // })
    if (params.modify) {
      // 如果是修改，查询带入信息
      let userInfo = JSON.parse(localStorage.getItem('userInfo'))
      let accessToken = userInfo && userInfo.accessToken
      if (!accessToken) {
        // 不传入空值，让后端返回未登录状态-10
        accessToken = -10
      }
      let opt = {
        accessToken: accessToken,
        id: +params.id
      }
      carOwnerApi.getDateInfo(opt).then(res => {
        if (res && res.code == 0) {
          let obj = res.data;
          let gotiem = '';
          try {
            let str = `${obj.gotimeYear} ${obj.gotimeDate}`;
            str = str.replace(/-/g, '/');
            gotiem = new Date(str);
          } catch (err) {

          }
          this.setState({
            name: obj.name || '',
            sex: obj.sex ? obj.sex + "" : '',
            tel: obj.mobile,
            cid: [obj.cid],
            drivingMileage: [+obj.mileage],
            gotime: gotiem,
            // provinceValue: [obj.provinceid],
            // citysValue: [obj.cityid],
            // addressName: obj['dealer_name'],
            faultPart: obj.faultPart ? obj.faultPart : '',
            description: obj.description ? obj.description : '',
            modifyFlag: params.modify,
            commitId: +params.id,
          })
          this.getCurrentPositionByIp().then(ret => {
            const lat = ret.point.lat
            const lng = ret.point.lng
            this.getDefAddress(obj.city, lat, lng, obj['dealer_name'])
          })
        }
      });
    } else {
      // 如果不是修改
      console.log(params.modelType)

      let modelType = params.modelType;
      let cid = modelType ? [modelType] : '';
      let drivingMileage = parseInt(params.drivingMileage);
      if (+tabIndex === 1 || +tabIndex === 2 || +tabIndex === 3) {
        if (+tabIndex === 3) {
          this.getCarCode()
        }
        this.getUserInfo(cid);
        if (drivingMileage) {
          this.setState({
            drivingMileage: [drivingMileage]
          });
        }
        console.log(12313)
      }
    }
  }
  getUserInfo(cid = '') {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    let accessToken = userInfo && userInfo.accessToken
    if (!accessToken) {
      // 不传入空值，让后端返回未登录状态-10
      accessToken = -10
    }
    carOwnerApi.getUserInfo({ accessToken })
      .then(res => {
        if (res && res.code === '0') {
          const data = res.data;
          let mycid = data.cid ? [data.cid] : [];
          if (cid && cid.length > 0) {
            mycid = cid;
          }
          this.setState({
            // name: data.nickname || '',
            sex: data.sex ? data.sex + "" : '',
            tel: data.tel,
            mileage: data.mileage,
            cid: mycid
          }, () => {
            console.log(this.state, cid);
          })
        }
      })
  }
  getVehicleList() {
    if (!!this.state.carType.length) {
      return
    }
    carOwnerApi.getAllVehicleList()
      .then(res => {
        if (res) {
          this.setState({
            carType: res.data.map(v => {
              return {
                value: v.cid,
                label: v.name
              }
            })
          })
        }
      })
  }

  getProvinceBrief() {
    if (!!this.state.province.length) {
      return
    }
    carOwnerApi.getProvinceBrief()
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            carNumber1Data: res.data.map((v, i) => ({ label: v.provinceBrief, value: v.provinceBrief }))
          })
        }
      })
  }
  getShengFen() {
    if (!!this.state.province.length) {
      return
    }
    carOwnerApi.getProvince()
      .then(res => {
        if (res && res.code === '0') {
          this.setState({
            province: res.data.map((v) => ({ label: v.name, value: v.cid }))
          })
        }
      })
  }
  getCity(opt, cityId) {
    carOwnerApi.getCity(opt)
      .then(res => {
        if (res && res.code === '0') {
          this.setState({
            citys: res.data.map((v) => ({ label: v.name, value: v.cid }))
          })
          if (cityId) {
            if (res.data.length === 1) {
              cityId = res.data[0].cid
            }
            this.setState({
              citysValue: [cityId + ''], // 设置默认城市
            })
          }
        }
      })
  }
  onChangeHandle(type, val, name = '', v = {}) {
    if (type == 'gotime') {
      let hour = val.getHours();
      if (!(hour >= 9 && hour < 17) && !(hour === 17 && val.getMinutes() === 0)) {
        Toast.info('请在9:00~17:00之间选择时间', 1);
        return false;
      }
    }
    if (type === 'addressValue') {
      console.log(type, val, name)
      this.setState({
        addressName: name,
        addressAllData: v
      })
    }
    if (type === 'carCode') {
      const carArr = this.state.carCodeList.filter((cc) => cc.carCode === val[0])
      if (carArr.length) {
        this.setState({
          carNumber2: carArr[0].carNumber,
          carDriveNumber: carArr[0].carDriveNumber
        })
      }
    }
    const that = this
    console.log('va==', val)
    this.setState({
      [type]: val
    }, () => {
      if (type === 'citysValue') {
        that.onSearch({ cityid: val, provinceid: this.state.provinceValue })
      }
      if (type === 'provinceValue') {
        that.getCity({ cid: val })
      }
    })
  }
  getCarCode() {
    carOwnerApi.getCarCode()
      .then(res => {
        if (res && res.code === '0') {
          if (!!res.data.length) {
            this.setState({
              carCodeData: res.data.map(v => {
                return {
                  label: v.carCode,
                  value: v.carCode
                }
              }),
              carCodeList: res.data,
              carCode: [res.data[0].carCode],
              carNumber2: res.data[0].carNumber,
              carDriveNumber: res.data[0].carDriveNumber
            })
          } else {
            this.setState({
              showIsCar: true
            }, () => window.myModal())
          }
        }
      })
  }
  getWeiZhang() {
    const data = this.state
    const opt = {
      carNumber1: data.carNumber1[0],
      carNumber2: data.carNumber2,
      carType: data.carTypeTxt && data.carTypeTxt[0],
      carNumber: data.carNumber1 + data.carNumber2,
      carCode: data.carCode[0],
      carDriveNumber: data.carDriveNumber,
    }
    // let flag = 0
    // for(const k in opt) {
    //   if(!opt[k]) {
    //     flag++
    //   }
    // }
    // if(flag) {
    //   Toast.info('请完善信息!', 1);
    //   return
    // }
    if (!opt.carCode) {
      Toast.info('请选择您的车架号!', 1);
      return
    }
    if (!opt.carType) {
      Toast.info('请选择您的车型!', 1);
      return
    }
    if (!opt.carNumber2) {
      Toast.info('请输入车牌号码!', 1);
      return
    }
    if (!opt.carDriveNumber) {
      Toast.info('请输入发动机号!', 1);
      return
    }
    delete opt.carNumber1
    delete opt.carNumber2
    carOwnerApi.trafficViolationsList(opt)
      .then(res => {
        if (res && res.code === '0') {
          this.setState({
            weizhangData: res.data,
            isShowWeiZhangRes: true
          })
        }
      })
  }
  onSearch(opt = { dealerName: this.state.dealerName, cityid: this.state.citysValue, provinceid: this.state.provinceValue }) {
    carOwnerApi.getDealer(opt)
      .then(res => {
        // if (res && res.code === '0') {
        //   this.setState({
        //     addressAllData: res.data.list[0],
        //     addressData: res.data.list,
        //     mapData: res.data.list.map((v, i) => ({ text: v.name, location: `${v.lng},${v.lat}` })),
        //     sum: res.data.sum,
        //     addressValue: res.data.list[0].id,
        //     addressName: res.data.list[0].name
        //   })
        // }
        if (res && res.code == '0') {
          if (!!res.data.list.length) {
            this.setState({
              addressAllData: res.data.list[0],
              addressData: res.data.list,
              mapData: res.data.list.map((v, i) => ({ text: v.name, location: `${v.lng},${v.lat}` })),
              sum: res.data.sum,
              addressValue: res.data.list[0].id,
              addressName: res.data.list[0].name
            })
          } else {
            Toast.info('未查询到经销商', 1)
            this.setState({
              addressAllData: null,
              addressData: [],
              mapData: [],
              sum: 0,
              addressValue: '',
              addressName: ''
            })
          }

        }
      })
  }
  closeSuccess = () => {
    this.setState({
      successModal: false
    })
    let { tabIndex } = this.state
    let url = window.location.href
    if (url.indexOf('?') > -1) {
      url += `&tabIndex=${tabIndex}`
    } else {
      url += `?tabIndex=${tabIndex}`
    }
    window.location.href = url
    // window.myModal1()
  }
  postYuYue(type) {
    const data = this.state
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if (!accessToken) {
      Toast.info('请先登录', 1);
      // this.props.history.push('/login')
      window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
      return
    }
    const opt = {
      accessToken,
      tel: data.tel,
      code: data.code,
      name: data.name,
      sex: data.sex,
      cid: data.cid && data.cid[0],
      gotime: moment(data.gotime).format('YYYY-MM-DD HH:mm'),
      mileage: data.drivingMileage && data.drivingMileage[0],
      dealerName: data.addressName,
      sign: data.isAgree ? 1 : 0,
      baoyangItem: data.baoyangItem,
    }
    // this.setState({
    //   successModal: true
    // })
    // window.myModal()
    // return
    // let flag = 0
    // for(const k in opt) {
    //   if(!opt[k] && k !== 'sign') {
    //     flag++
    //   }
    // }
    if (!opt.name) {
      Toast.info('请输入姓名!', 1);
      return
    }
    if (!opt.sex) {
      Toast.info('请选择性别!', 1);
      return
    }
    if (!opt.tel) {
      Toast.info('请输入手机号!', 1);
      return
    }
    if (!opt.code && this.state.mobileChanged) {
      Toast.info('请输入验证码!', 1);
      return
    }
    if (!opt.cid) {
      Toast.info('请选择车型!', 1);
      return
    }
    if (!opt.gotime || opt.gotime.indexOf('date') > -1) {
      Toast.info('请选择预约时间!', 1);
      return
    }
    if (!opt.mileage) {
      Toast.info('请选择行驶里程数!', 1);
      return
    }
    // if(opt.baoyangItem.length==0&&type != 'three') {
    //   Toast.info('请选择保养项目!', 1);
    //   return
    // }
    if (type === 'three') {
      let description = data.description
      let faultPart = data.faultPart && data.faultPart[0]
      if (!faultPart) {
        Toast.info('请输入故障部位!', 1);
        return
      }
      if (!description) {
        Toast.info('请输入故障描述!', 1);
        return
      }
    }
    if (!opt.dealerName) {
      Toast.info('请选择经销商!', 1);
      return
    }
    if (!opt.sign) {
      Toast.info("请同意隐私策略", 1);
      return
    }
    if (type === 'three') {
      opt.description = data.description
      opt.faultPart = data.faultPart
      if (!opt.faultPart || !opt.faultPart) {
        Toast.info('请完善信息!', 1);
        return
      }
      if (this.state.modifyFlag) {
        opt['id'] = this.state.commitId;
        carOwnerApi.updateRepair(opt)
          .then(res => {
            if (res && res.code == '0') {
              this.setState({
                successModal: true
              })
              window.myModal()
            }
          })
      } else {
        carOwnerApi.repair(opt)
          .then(res => {
            if (res && res.code == '0') {
              this.setState({
                successModal: true
              })
              window.myModal()
            }
          })
      }
    } else {
      // carOwnerApi.sendMsg()
      //   .then(res => {
      //     if(res && res.code == '0') {

      //     }
      //   })
      if (this.state.modifyFlag) {
        opt['id'] = this.state.commitId;
        carOwnerApi.updateMaintenance(opt)
          .then(res => {
            if (res && res.code == '0') {
              this.setState({
                successModal: true
              })
              window.myModal()
            }
          })
      } else {
        carOwnerApi.addMaintenance(opt)
          .then(res => {
            if (res && res.code == '0') {
              this.setState({
                successModal: true
              })
              window.myModal()
            }
          })
      }
    }
    console.log(opt)
  }
  getCurrentPositionByIp = () => {
    return new Promise(function (resolve, reject) {
      try {
        let myCity = new BMap.LocalCity()
        myCity.get(function (result) {
          console.log('resultresult', result)
          resolve({
            address: result.name,
            id: '',
            point: result.center
          })
        })
      } catch (ex) {
        reject(ex)
      }
    })
  }
  getHereAddress() {
    this.getCurrentPositionByIp().then(res => {
      const cityName = res.address ? res.address + '' : '北京市'
      const lat = res.point.lat
      const lng = res.point.lng
      console.log(res, cityName)
      comApi.getRegionInfoByLocate({ cityName })
        .then(res => {
          if (res && res.code == 0) {
            this.setState({
              provinceValue: [res.data.provinceId + '']
            })
            this.getCity({ cid: res.data.provinceId }, res.data.cityId)
          }
        })
      carOwnerApi.getDealer({
        cityName,
        lng,
        lat
        // provinceName:cityName
      })
        .then(res => {
          if (res && res.code == 0 && res.data.list.length) {
            this.setState({
              addressHere: res.data.list,
              addressAllData: res.data.list[0],
              addressData: res.data.list,
              mapData: res.data.list.map((v, i) => ({ text: v.name, location: `${v.lng},${v.lat}` })),
              sum: res.data.sum,
              addressValue: res.data.list[0].id,
              addressName: res.data.list[0].name
            })
          }
        })
    })
  }
  getDefAddress(address, lat, lng, dealerName) {
    const cityName = address
    console.log('getDefAddress', address, lat, lng)
    comApi.getRegionInfoByLocate({ cityName })
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            provinceValue: [res.data.provinceId + '']
          })
          this.getCity({ cid: res.data.provinceId }, res.data.cityId)
        }
      })
    carOwnerApi.getDealer({
      cityName,
      lng,
      lat
      // provinceName:cityName
    })
      .then(res => {
        if (res && res.code == 0 && res.data.list.length) {
          let index = 0;
          for (let i in res.data.list) {
            if (dealerName === res.data.list[i].name) {
              index = i;
            }
          }
          this.setState({
            addressHere: res.data.list,
            addressAllData: res.data.list[index],
            addressData: res.data.list,
            mapData: res.data.list.map((v, i) => ({ text: v.name, location: `${v.lng},${v.lat}` })),
            sum: res.data.sum,
            addressValue: res.data.list[index].id,
            addressName: res.data.list[index].name
          })
        }
      })
  }
  setIndex(v, i, cid = '', million) {
    window.scrollTo(0, 0)
    localStorage.setItem('tabIndex', i)
    this.setState({
      tabIndex: i
    })
    if (i === 1 || i === 2 || i === 3) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'))
      const accessToken = userInfo && userInfo.accessToken
      if (!accessToken) {
        let url = window.location.href
        localStorage.removeItem('userInfo')
        if (cid || million) {
          if (url.indexOf('?') > -1) {
            url += `&modelType=${cid}&drivingMileage=${million}&tabIndex=${i}`
          } else {
            url += `?modelType=${cid}&drivingMileage=${million}&tabIndex=${i}`
          }
        }
        localStorage.setItem("redirectUrl", url)
        // window.location.href = '/login'
        // this.props.history.push('/login')
        window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
        return
      }
      if (i === 3) {
        this.getCarCode()
      }
      this.getUserInfo(cid)
    }
  }
  render() {
    const { weizhangData } = this.state
    const tabs = [
      { title: '保养计划' },
      { title: '预约保养' },
      { title: '预约维修' },
      { title: '违章查询' },
      { title: '紧急救援' },
    ];
    return (
      <div className='lobby'>
        <div className="title-img">
          <img src={require('../../../imgs/duwudat-1.png')} alt="" />
          {/* <span>服务大厅</span> */}
        </div>
        <div className="content just-my-tabs">
          <Tabs
            tabs={tabs}
            page={this.state.tabIndex}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
            // onChange={(v,i) => this.setIndex(1)}
            onTabClick={(v, i) => this.setIndex(v, i)}
          >
            <div className='one'>
              <Baoyang type='fwdt' setIndex={(v, i, cid, m) => this.setIndex(v, i, cid, m)} onChangeHandle={this.onChangeHandle} {...this.state} />
            </div>
            <div className='two'>
              <Fuwuyuyue close={this.closeSuccess} {...this.state} postYuYue={() => this.postYuYue('two')} onSearch={() => this.onSearch()} type='two' onChangeHandle={this.onChangeHandle} />
            </div>
            <div>
              <Fuwuyuyue close={this.closeSuccess} {...this.state} postYuYue={() => this.postYuYue('three')} onSearch={() => this.onSearch()} type='three' onChangeHandle={this.onChangeHandle} />
            </div>
            <div className='four'>
              <ul>
                <li className="label-box ">
                  <div className='l label-must'>
                    车架号码：
                  </div>
                  <div className="r">
                    {/* <MyInput
                      value={this.state.carCode}
                      placeholder='请输入车架号码'
                      maxLength={17}
                      ruleName='letterNum'
                      onChange={(v) => this.onChangeHandle('carCode', v)}
                    /> */}
                    <MySelect
                      // extra="请选择您的车型"
                      extra="请选择您的车架号"
                      value={this.state.carCode}
                      data={this.state.carCodeData}
                      onChange={(v) => this.onChangeHandle('carCode', v)}
                    />
                  </div>
                </li>
                <li className='label-box'>
                  <div className='l label-must'>
                    车型：
                  </div>
                  <div className="r">
                    <MySelect
                      extra="请选择您的车型"
                      value={this.state.carTypeTxt}
                      data={this.state.carTypeData}
                      onChange={(v) => this.onChangeHandle('carTypeTxt', v)}
                    />
                  </div>
                </li>
                <li className="label-box ">
                  <div className='l label-must'>
                    车牌号码：
                  </div>
                  <div className="r">
                    <div>
                      {/* <MyInput
                      value={this.state.carNumber1}
                      placeholder='京'
                      onChange={(v) => this.onChangeHandle('carNumber1', v)}
                      maxLength={1}
                    /> */}
                      {/* <MySelect
                      extra=" "
                      value={this.state.carNumber1}
                      data={this.state.carNumber1Data}
                      onChange={(v) => this.onChangeHandle('carNumber1',v)}
                    /> */}
                    </div>
                    <MyInput
                      value={this.state.carNumber2}
                      placeholder='请输入车牌号码'
                      // maxLength={5}
                      ruleName='letterNum'
                      onChange={(v) => this.onChangeHandle('carNumber2', v)}
                    />
                  </div>
                </li>
                <li className="label-box ">
                  <div className='l label-must'>
                    发动机号：
                  </div>
                  <div className="r">
                    <MyInput
                      value={this.state.carDriveNumber}
                      placeholder='请输入发动机号'
                      maxLength={16}
                      ruleName='letterNum'
                      onChange={(v) => this.onChangeHandle('carDriveNumber', v)}
                    />
                  </div>
                </li>

                <li>
                  <div className="tishi">
                    * 请对照《机动车行驶证》认真填写以上信息
                  </div>
                </li>
              </ul>
              <div className="my-btn mb-8 mt-8">
                <Button inline onClick={() => this.getWeiZhang()}>查询</Button>
              </div>
              <div className="my-line" />
              {this.state.isShowWeiZhangRes && <div className="result-koufen">
                <div className="my-table">
                  <div className="title">
                    <h3>查询结果</h3>
                  </div>
                  <ul className="list result-title">
                    <li>
                      <span>违章次数</span>
                      <span>总扣分</span>
                      <span>总罚款</span>
                    </li>
                    <li>
                      <span>{weizhangData.violationNum}条</span>
                      <span>{weizhangData.sumPoints}分</span>
                      <span>{weizhangData.sumFine}元</span>
                    </li>
                  </ul>
                  {
                    weizhangData.violationPunishListBOS.map((v, i) => {
                      return (
                        <ul className="list result-list" key={i}>
                          <li>
                            <span>{v.handleTime}</span>
                            <span>扣{v.points}分，罚款{v.fine}元</span>
                          </li>
                          <li>
                            <span>违章地点</span>
                            <span>{v.illegalsite}</span>
                          </li>
                          <li>
                            <span>违章行为</span>
                            <span>{v.illegalbehavior}</span>
                          </li>
                        </ul>
                      )
                    })
                  }
                </div>
              </div>}
               <Modal
                className='my-modal app-modal-box yuyue-modal-box'
                visible={this.state.showIsCar}
                transparent
              // onClose={() => this.props.close()}
              >
                {/* <div className="img-box">
                  <img src={require('../../../../imgs/login-success.png')} alt="" />
                </div> */}
                <div className='app-txt pt-4'>您还没有绑定车辆，立即去绑定吧！</div>
                <div className="my-btn mb-4 mt-4">
                  <Button inline onClick={() => {
                    this.props.history.push('/mine/addcar')
                    window.myModal1()
                  }}>立即绑定</Button>
                </div>
              </Modal> 
            </div>
            <div className='five'>
              <h3 className="title">
                一键呼叫
              </h3>
              <div className="jinjihujiao">
                <div className="l">
                  <img src={require('../../../imgs/phone-1.png')} alt="" />
                </div>
                <div className="c">
                  <h4>122报警</h4>
                  <p>全国道路交通事故报警台</p>
                </div>
                <div className="r">
                  <a href="tel:400-888-9999">
                    <img src={require('../../../imgs/phone-0.png')} alt="" />
                  </a>
                </div>
              </div>
              <div className="jinjihujiao">
                <div className="l">
                  <img src={require('../../../imgs/phone-3.png')} alt="" />
                </div>
                <div className="c">
                  <h4>一汽丰田救援</h4>
                  <p>400-810-1210</p>
                </div>
                <div className="r">
                  <a href="tel:400-810-1210">
                    <img src={require('../../../imgs/phone-0.png')} alt="" />
                  </a>
                </div>
              </div>
              <div className="jinjihujiao">
                <div className="l">
                  <img src={require('../../../imgs/phone-2.png')} alt="" />
                </div>
                <div className="c">
                  <h4>保险公司</h4>
                  <div className="baoxiangongsi">
                    <MySelect
                      extra="选择保险公司"
                      value={this.state.phoneBx}
                      data={phone}
                      onChange={(v) => this.onChangeHandle('phoneBx', v)}
                    />
                  </div>
                </div>
                <div className="r">
                  {this.state.phoneBx?<a href={`tel:${this.state.phoneBx}`}>
                    <img src={require('../../../imgs/phone-0.png')} alt="" />
                  </a>:<img src={require('../../../imgs/phone-0.png')} alt="" />}
                </div>
              </div>
              <h3 className="title mt-4">
                联系经销商
              </h3>
              <ul className="jingxiaoshanglx">
                {
                  this.state.addressHere.map((v, i) => {
                    return (
                      <li key={i}>
                        <div className="l">
                          <img src={require('../../../imgs/address-1.png')} alt="" />
                          <span>{v.distance}KM</span>
                        </div>
                        <div className="r">
                          <h4>{v.name}</h4>
                          <p>{v.address}</p>
                          <p>{v.phone_seal}</p>
                          <p>{v.phone_service}</p>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          </Tabs>
        </div>
      </div>

    );
  }
}

export default Lobby;
