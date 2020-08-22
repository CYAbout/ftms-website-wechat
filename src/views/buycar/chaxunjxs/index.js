import React, { Component } from 'react';
import Jingxiaoshang from '../../../components/jingxiaoshang'
import { carOwnerApi } from '../../carowner/api'
import { Toast } from 'antd-mobile'
import './index.less'
import { comApi } from '../../../components/api';

const BMap = window.BMap || {}
class Chaxunjxs extends Component {
  constructor(state) {
    super(state)
    this.state = {
      sexData: [{ label: '先生', value: '1' }, { label: '女士', value: '2' }],
      sexValue: '1',
      dateBaoyang: '',
      pailiang: '',
      data1: [{ value: '1', label: '卡罗拉1' }, { value: 'vdv', label: '卡罗拉2' }, { value: '3', label: '卡罗拉3' }],
      data2: [{ value: '1', label: '23ef33' }, { value: 'vjyuu', label: 'vjyuu' }, { value: '3', label: 'thr' }],
      data3: [{ value: '1', label: 'f34f43' }, { value: '76ju', label: '76ju' }, { value: '3', label: 'thr' }],
      data4: [{ value: '1', label: 'f34f43' }, { value: '76ju', label: '76ju' }, { value: '3', label: 'thr' }],
      addressValue: '1',
      addressData: [],
      province: [],
      citys: [],
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }

  componentDidMount() {
    document.title = '经销商查询';
    this.getShengFen()
    this.getHereAddress()
  }
  onChangeHandle(type, val, name = '', v = {}) {
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
  onSearch(opt = { dealerName: this.state.dealerName, cityid: this.state.citysValue, provinceid: this.state.provinceValue }) {
    console.log(this.state.dealerName)
    carOwnerApi.getDealer(opt)
      .then(res => {
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
  jumpShijia(v) {
    console.log(v, '123')
    // return
    this.props.history.push({ pathname: '/buycar/shijia', state: v });
  }
  render() {
    return (
      <div className='chaxunjxs'>
        <div className="title-img">
          <img src={require('../../../imgs/chaxunjxs-banner.png')} alt="" />
          {/* <span>经销商查询</span> */}
        </div>
        <Jingxiaoshang {...this.state} onSearch={() => {
          this.onSearch()
        }} onChangeHandle={this.onChangeHandle} jumpShijia={(e, v) => { this.jumpShijia(v); }} />
        {/* <Jingxiaoshang {...this.props} onSearch={() =>{
          this.props.onSearch()
        }} onChangeHandle={this.props.onChangeHandle} /> */}
      </div>
    );
  }
}

export default Chaxunjxs;
