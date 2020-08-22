import React, { Component } from 'react';
import { Tabs, InputItem, List, Picker } from 'antd-mobile'
import { MySelect } from '../../../../components/dataview'
import { carOwnerApi } from '../../api'
import { getParamsObj } from '../../../../utils/util'

class Tabdingbaotong_wx extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartype: [],
      carAgeData: [{ value: '0', label: '3个月（含）以内' }, { value: '1', label: '3个月以上至33个月' }, { value: '2', label: '33个月以上' }],
      carAgeData1: [{ value: 'NEW', label: '新车' }, { value: 'SUB_NEW', label: '次新车' }, { value: 'NO_DATA', label: '暂不提供此类服务' }],
      serviceLifeData: [{ value: 'ONE_YEAR', label: '1年3万公里' }, { value: 'TWO_YEAR', label: '2年6万公里' }, { value: 'THREE_YEAR', label: '3年9万公里' }],
      serviceTypeData: [{ value: 'ENGINE', label: '发动机保障' }, { value: 'THREE_MAJOR', label: '三大件保障' }, { value: 'WHOLE_CAR', label: '全车保障' },],
      price: '',
      cuxiaoData: []
    }
  }
  componentDidMount() {
    this.getInsuranceActiveList()
    carOwnerApi.getExtentionCarType()
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            carType: res.data.map(v => {
              return {
                value: v.code,
                label: v.name
              }
            })
          })
        }
      })
    let params = getParamsObj();
    switch(params.oneindex) {
      case '0':
        document.title = '诚信服务';
        break;
      case '1':
        document.title = '延保服务';
        break;
      case '2':
        document.title = '服务活动';
        break;
      case '3':
        document.title = '保修政策';
        break;
      case '4':
        document.title = '满意度调查';
        break;
      case '5':
        document.title = '定保通';
        break;
    }
  }
  onChangeCar(type, val) {
    this.setState({
      [type]: val
    }, () => this.postData())
  }
  postData() {
    const { code, carAge, serviceLife, serviceType } = this.state
    if (this.state.carAge == '2') {
      return
    }
    if (code && carAge && serviceLife && serviceType) {
      carOwnerApi.extenInSur({
        code: code[0],
        type: carAge[0] == '0' ? 'NEW' : 'SUB_NEW',
        serviceLife: serviceLife[0],
        serviceType: serviceType[0]
      })
        .then(res => {
          if (res && res.code === '0') {
            this.setState({
              price: res.data
            })
          }
        })
    }
  }
  getInsuranceActiveList() {
    carOwnerApi.getInsuranceActiveList(1)
      .then(res => {
        if (res && res.code === '0') {
          this.setState({
            cuxiaoData: res.data
          })
        }
      })
  }
  render() {
    // const CustomChildren = props => (
    //   <div
    //     className='my-picker'
    //     onClick={props.onClick}
    //   >
    //   {props.extra}
    //   </div>
    // );
    return (
      <div className='tab-content'>

          <div>
            <div className="title-detail bg">
              忧客户所忧,以客户第一为理念,以为用户省钱、省时、省心为宗旨,以专业、诚意为源点,一汽丰田为客户量身打造的“定保通”项目。
              <p>
                所谓“定保通”就是一汽丰田为用户提供的一种打包的多次定期保养服务项目,用户只需预先在卡里储存一些资金,就可享受一汽丰田授权特约经销店( 4S店)提供的较低养护价格及各种免费增值服务,同时省去咨询保养事项、了解保养内容的烦恼,可谓用户爱车的“贴身管家”。
              </p>
              <p>
                对用户而言，“定保通” 具备省钱、省时、省心三大特点。
              </p>
            </div>
            <div className="suowei">
              <div className="item">
                <div className="top">
                  所谓<span>省钱,</span>
                </div>
                <ul className='list'>
                  <li>用户仅需在定保通储值卡中预先存储一定费用，即可轻松享受更低套餐折扣的养护服务与多项免费增值服务。</li>
                  <li>即可轻松享受更低套餐折扣的养护服务与多项免费增值服务。</li>
                </ul>
              </div>
              <div className="item">
                <div className="top">
                  所谓<span>省时,</span>
                </div>
                <ul className='list'>
                  <li>省去用户咨询保养事项、了解保养内容的时间，还具有服务优先权，通过电话预约进店保养，随到随办，节省了到店排队等候的时间，同时，由于是预付保养，也省去了交款出单等繁琐流程。</li>
                  <li>还具有服务优先权，通过电话预约进店保养，随到随办，</li>
                  <li>节省了到店排队等候的时间，同时，由于是预付保养，</li>
                  <li>也省去了交款出单等繁琐流程。</li>
                </ul>
              </div>
              <div className="item">
                <div className="top">
                  所谓<span>省心,</span>
                </div>
                <ul className='list'>
                  <li>确保用户透明保养，透明消费，并签署购买协议，充分保障消费者权益。定保通的具体项目与作业时间，根据各经销商实际情况会有所不同，详细可咨询当地经销商。</li>
                  <li>并签署购买协议，充分保障消费者权益。</li>
                  <li>定保通的具体项目与作业时间，</li>
                  <li>根据各经销商实际情况会有所不同，详细可咨询当地经销商。</li>
                </ul>
              </div>
            </div>
            <div className="pic">
              <img src={require('../../../../imgs/carowner-pic2.png')} alt="" />
              <img src={require('../../../../imgs/carowner-pic1.png')} alt="" />
            </div>
          </div>
          
      </div>
    );
  }
}

export default Tabdingbaotong_wx;
