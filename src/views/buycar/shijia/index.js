import React, { Component } from 'react';
import Fuwuyuyue from '../../carowner/lobby/module/fuwuyuyue'
import { Toast } from 'antd-mobile';
import { carOwnerApi } from '../../carowner/api'
import { comApi } from '../../../components/api';
import { getParamsObj } from '../../../utils/util'
import moment from 'moment'
import {
  MyInput,
  MySelect,
  MyDate,
  MyInputarea,
  MyRadio,
  MySwitch

} from '../../../components/dataview/'
import Jingxiaoshang from '../../../components/jingxiaoshang'
import './index.less'

const BMap = window.BMap || {}
class Shijia extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carTypeData: [{ label: '大型车', value: '01' }, { label: '小型车', value: '02' }],
      isShowWeiZhangRes: false,
      weizhangData: {
        violationPunishListBOS: []
      },
      carType: [],
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
      sex: '1',
      dateBaoyang: '',
      pailiang: '',
      addressValue: '1',
      addressData: [],
      modelTypeData: [{ value: 'rav4', label: 'rav4' }],
      purchaseYearData: [{ value: '2018', label: '2018' }],
      drivingMileageData: [{ value: '1', label: '1' }],
      addressHere: [],
      tabIndex: 0,
      buyTime: '1',
      buyTimeData: [
        { value: '1', label: '一周内' },
        { value: '2', label: '1个月内' },
        { value: '3', label: '3个月内' },
        { value: '4', label: '半年内' },
        { value: '5', label: '短期内暂无计划' },
      ],
      successModal: false,
      gotime: null
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }
  componentDidMount() {
    document.title = '预约试驾'
    this.getVehicleList()
    this.getShengFen()
    this.getUserInfo()
    this.getHereAddress()
    this.getProvinceBrief()
  }
  closeSuccess = () => {
    this.setState({
      successModal: false
    })
    window.location.reload();
    // window.myModal1()
  }
  getUserInfo() {
    // console.log('1-------------------------------',moment("2019-04-30 00:00:00")._d,new Date())
    const urlCid = getParamsObj().cid
    const id = getParamsObj().id
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if (id) {
      carOwnerApi.getTestDriveInfo({ id, accessToken })
        .then(result => {
          if (result && result.code === '0') {
            const data = result.data.testDriveInfo
            const addressData = result.data.testDriveInfo.dealerInfo
            this.getCurrentPositionByIp().then(resIp => {
              const cityName = addressData.city ? addressData.city + '' : '北京市'
              const lat = resIp.point.lat
              const lng = resIp.point.lng
              this.setState({
                provinceValue: [addressData.provinceid + '']
              })
              this.getCity({ cid: addressData.provinceid + '' }, addressData.cityid)
              carOwnerApi.getDealer({
                cityName,
                lng,
                lat
              })
                .then(res => {
                  if (res && res.code == 0 && res.data.list.length) {
                    this.setState({
                      addressHere: res.data.list,
                      addressAllData: res.data.list[0],
                      addressData: res.data.list,
                      mapData: res.data.list.map((v, i) => ({ text: v.name, location: `${v.lng},${v.lat}` })),
                      sum: res.data.sum,
                      addressValue: addressData.id,
                      addressName: addressData.name
                    })
                  }
                })
            })

            this.setState({
              name: data.name || '',
              sex: (data.sex == 1 || data.sex == 0) ? data.sex + "" : '1',
              buyTime: data.plan_shopping_time || '1',
              tel: data.mobile || '',
              cid: data.vehiclaInfo.cid ? [data.vehiclaInfo.cid] : [],
              gotime: data.test_drive_date ? moment(data.test_drive_date)._d : null
            })
          }
        })
      return
    }
    if (!accessToken) {
      this.setState({
        cid: urlCid ? [urlCid] : []
      })
      return
    }
    console.log('aaaaaaaaa')
    carOwnerApi.getUserInfo({ accessToken })
      .then(res => {
        if (res && res.code === '0') {
          const data = res.data
          console.log('bbbbbbbbbbbbbb')
          this.setState({
            name: data.name || '',
            sex: data.sex ? data.sex + "" : '1',
            tel: data.tel,
            mileage: data.mileage,
            cid: urlCid ? [urlCid] : (data.cid ? [data.cid] : [])
          })
        }
      })
  }
  getVehicleList() {
    if (!!this.state.carType.length) {
      return
    }
    carOwnerApi.getVehicleList()
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
    const that = this
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
          this.setState({
            carCode: res.data.carCode
          })
        }
      })
  }
  // getWeiZhang() {
  //   const data = this.state
  //   const opt = {
  //     carNumber1:data.carNumber1[0],
  //     carNumber2:data.carNumber2,
  //     carType:data.carTypeTxt && data.carTypeTxt[0],
  //     carNumber:data.carNumber1 + data.carNumber2,
  //     carCode:data.carCode,
  //     carDriveNumber:data.carDriveNumber,
  //   }
  //   let flag = 0
  //   for(const k in opt) {
  //     if(!opt[k]) {
  //       flag++
  //     }
  //   }
  //   if(flag) {
  //     Toast.info('请完善信息!', 1);
  //     return
  //   }
  //   delete opt.carNumber1
  //   delete opt.carNumber2
  //   carOwnerApi.trafficViolationsList(opt)
  //     .then(res => {
  //       if(res && res.code === '0') {
  //         this.setState({
  //           weizhangData:res.data,
  //           isShowWeiZhangRes:true
  //         })
  //       }
  //     })
  // }
  onSearch(opt = { dealerName: this.state.dealerName }) {
    console.log(this.state.dealerName)
    carOwnerApi.getDealer(opt)
      .then(res => {
        if (res && res.code === '0') {
          this.setState({
            addressAllData: res.data.list[0],
            addressData: res.data.list,
            mapData: res.data.list.map((v, i) => ({ text: v.name, location: `${v.lng},${v.lat}` })),
            sum: res.data.sum,
            addressValue: res.data.list[0].id,
            addressName: res.data.list[0].name
          })
        }
      })
  }
  postYuYue(type) {
    const data = this.state
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    // if(!accessToken) {
    //   Toast.info('请先登录', 1);
    //   this.props.history.push('/login')
    //   return
    // }
    // 不需要token了20190327
    const opt = {
      tel: data.tel,
      code: data.code,
      name: data.name,
      sex: data.sex,
      cid: data.cid && data.cid[0],
      driveTime: moment(data.gotime).format('YYYY-MM-DD HH:mm'),
      // mileage: data.mileage,
      dealerName: data.addressName,
      sign: data.isAgree ? 1 : 0,
      levelId: data.buyTime[0]
    }
    console.log(opt)
    if (!this.state.mobileChanged) {
      delete opt.code
    }
    // this.setState({
    //   successModal: true
    // })
    // window.myModal()
    // return
    let flag = 0
    for (const k in opt) {
      if (!opt[k] && k !== 'sign') {
        flag++
      }
    }
    if (flag) {
      Toast.info('请完善信息!', 1);
      return
    }
    if (!opt.sign) {
      Toast.info("请同意隐私策略", 1);
      return
    }
    if (accessToken) {
      opt.accessToken = accessToken
    }
    const id = getParamsObj().id
    if (id) {
      opt.id = id
    }
    carOwnerApi.addTestDrive(opt)
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            successModal: true
          })
        }
      })
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
    const state = this.props.location.state
    console.log(state)
    if (getParamsObj().id) {
      return
    }
    if (state) {
      console.log(state)
      this.getCurrentPositionByIp().then(res => {
        const cityName = state.city ? state.city + '' : '北京市'
        // const lat = state.lat
        // const lng = state.lng
        const lat = res.point.lat
        const lng = res.point.lng
        this.setState({
          provinceValue: [state.provinceid + '']
        })
        this.getCity({ cid: state.provinceid + '' }, state.cityid)
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
                addressValue: state.id,
                addressName: state.name
              })
            }
          })
      })
      return
    }
    this.getCurrentPositionByIp().then(res => {
      const cityName = res.address ? res.address + '' : '北京市'
      const lat = res.point.lat
      const lng = res.point.lng
      console.log(cityName)
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
  render() {
    return (
      <div className='shijia'>
        <div className="title-img mb-8">
          <img src={require('../../../imgs/shijia-banner.png')} alt="" />
          {/* <span>预约试驾</span> */}
        </div>
        <div className="box-big">
          <Fuwuyuyue close={this.closeSuccess} {...this.state} postYuYue={() => this.postYuYue('three')} onSearch={() => this.onSearch()} type='shijia' onChangeHandle={this.onChangeHandle} />
        </div>
        {/* <div className="box">
          <h3 className='title'>
            个人信息
        </h3>
          <div className="my-line-m" />
          <div className="label-box ">
            <div className='l label-must'>
              请填写您的姓名：
                </div>
            <div className="r">
              <MyInput
                value={this.state.name}
                placeholder='请输入姓名'
                onChange={(v) => this.onChangeHandle('name', v)}
              />
            </div>
          </div>
          <div className="label-box sex-checked">
            <div className='l'>
            </div>
            <div className="r ">
              <MyRadio
                value={this.state.sexValue}
                data={this.state.sexData}
                onChange={(v) => this.onChangeHandle('sexValue', v)}
              />
            </div>
          </div>
          <div className="label-box">
            <div className='l label-must'>
              请填写您的手机：
                </div>
            <div className="r">
              <MyInput
                value={this.state.phone}
                ruleName='phone'
                placeholder='请输入手机号'
                onChange={(v) => this.onChangeHandle('phone', v)}
              />
            </div>
          </div>
          <h3 className='title pt-4'>
            预约信息
        </h3>
          <div className="my-line-m" />
          <ul>
            <li className='label-box'>
              <div className='l'>
                选择车型：
                  </div>
              <div className="r">
                <MySelect
                  extra="请选择车型"
                  value={this.state.type3}
                  data={this.state.data3}
                  onChange={(v) => this.onChangeHandle('type3', v)}
                />
              </div>
            </li>
            <li className='label-box'>
              <div className='l'>
                预约试驾时间：
                  </div>
              <div className="r">
                <MySelect
                  extra="请选择试驾时间"
                  value={this.state.type3}
                  data={this.state.data3}
                  onChange={(v) => this.onChangeHandle('type3', v)}
                />
              </div>
            </li>
            <li className='label-box radio-r'>
              <div className='l'>
                计划购车时间：
              </div>
              <div className="r ">
              <MyRadio
                value={this.state.buyTimeValue}
                data={this.state.buyTimeData}
                onChange={(v) => this.onChangeHandle('buyTimeValue', v)}
              />
              </div>
            </li>
            {this.state.type === 'three' &&
              <li className='label-box'>
                <div className='l'>
                  故障部位：
              </div>
                <div className="r">
                  <MySelect
                    extra="请填写行驶公里数"
                    value={this.state.type3}
                    data={this.state.data3}
                    onChange={(v) => this.onChangeHandle('type3', v)}
                  />
                </div>
              </li>}
            {
              this.state.type === 'three' &&
              <li className='label-box'>
                <div className='l'>
                  故障描述：
              </div>
                <div className="r">
                  <MyInputarea
                    placeholder='请输入故障描述'
                    value={this.state.type3}
                    onChange={(v) => this.onChangeHandle('type3', v)}
                  />
                </div>
              </li>
            }
          </ul>
          <h3 className='title pt-4'>
            经销商信息
        </h3>
          <div className="my-line-m" />
          <div className='label-box jingxiaoshang-tt'>
            <div className='l'>
              附近的经销商：
          </div>
            <div className="r">
            </div>
          </div>
          <Jingxiaoshang {...this.state} onChangeHandle={this.onChangeHandle} />
          <div className="agree">
            <MySwitch
              value={this.state.isAgree}
              label='我已同意'
              onChange={() => {
                this.onChangeHandle('isAgree', !this.state.isAgree ? true : false)
              }
              } />
            <span>《隐私协议》</span>
          </div>
          <div className="my-btn">
            <Button inline >马上预约</Button>
          </div>
        </div> */}
      </div>
    );
  }
}

export default Shijia;
