import React, { Component } from 'react';
import { Tabs, InputItem, List, Picker } from 'antd-mobile'
import { MySelect } from '../../../../components/dataview'
import { carOwnerApi } from '../../api'
import { getParamsObj } from '../../../../utils/util'

class Tabtwo extends Component {
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
    // document.title = '延保服务';
    // let params = getParamsObj();
    // switch(params.oneindex) {
    //   case '0':
    //     document.title = '诚信服务';
    //     break;
    //   case '1':
    //     document.title = '服务产品';
    //     break;
    //   case '2':
    //     document.title = '服务活动';
    //     break;
    //   case '3':
    //     document.title = '保修政策';
    //     break;
    //   case '4':
    //     document.title = '满意度调查';
    //     break;
    // }
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
        <Tabs
          tabs={[{ title: '延保服务' }, { title: '延保计算器' }]}
          animated={false}
          swipeable={false}
          useOnPan={false}
          page={(this.props.twoIndex && this.props.twoIndex < 3) ? this.props.twoIndex : 0}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} prefixCls = {'yanbao'}/>}
          onTabClick={(v, i) => this.props.setTwoIndex(v,i)}
        >
          {/* <div>
            <h3 className="title">
              定保通
            </h3>
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
          </div> */}
          <div>
            <h3 className="title">
              人有医保 &nbsp;车有延保
            </h3>
            <div className="yanbaofuwu">
              <div className="bl">
                延长保修服务
              </div>
              <p>
                是为车辆提供原厂质保期结束后一定时间内或公里数的延长保修服务。当车辆出现保修范围内的故障时可免费获得维修服务。
              </p>
            </div>
            <div className="yanbaofuwu">
              <div className="bl">
                AAA品牌延保
              </div>
              <p>
                AAA延保产品是一汽丰田为旗下相关车型提供的、有保险托底的延保产品。
              </p>
            </div>
            <div className="yanbaofuwu">
              <div className="bl">
                保障责任和保障范围
              </div>
              <div className="bg-box bg-box-1">
                <div className="top">
                  <div className="l">
                    <img src={require('../../../../imgs/carowner-pic3.png')} alt="" />
                  </div>
                  <div className="r">
                    保障责任
                  </div>
                </div>
                <div className="bottom">
                  在正常使用条件下由于材料或
                  制造商的质量问题而造成的零件
                  损坏导致的修理及更换工时费
                  用和零配件费用。
                </div>
              </div>
              <div className="bg-box bg-box-2">
                <div className="top">
                  <div className="l">
                    <img src={require('../../../../imgs/carowner-pic4.png')} alt="" />
                  </div>
                  <div className="r">
                    保障范围
                  </div>
                </div>
                <div className="bottom">
                  <p>全面保障：和厂家原厂保修范围一致</p>
                  <p>三大保障：发动机总成、变速器总成、前/后轮驱动</p>
                  <p>发动机保障：发动机总成</p>
                </div>
              </div>
              <div className="bg-box bg-box-3">
                <div className="top">
                  <div className="l">
                    <img src={require('../../../../imgs/carowner-pic5.png')} alt="" />
                  </div>
                  <div className="r">
                    延保年限或公里数
                  </div>
                </div>
                <div className="bottom">
                  <p>1年3万公里</p>
                  <p>2年6万公里</p>
                  <p>3年9万公里</p>
                </div>
              </div>
            </div>
            <div className="youshi yanbaofuwu">
              <div className="bl">
                AAA品牌延保的优势
                </div>
              <div className="con">
                <p>购买产品的客户可享受全国经销店免费</p>
                <ul>
                  <li>
                    &nbsp;&nbsp;经销店维修的安心
                    </li>
                  <li>
                    &nbsp;&nbsp;厂家统一服务的安心
                    </li>
                  <li>
                    &nbsp;&nbsp;厂家承保的安心
                    </li>
                  <li>
                    &nbsp;&nbsp;二手车残值的安心
                    </li>
                </ul>
              </div>
            </div>
            <div className="taocan yanbaofuwu">
              <div className="bl">
                套餐组合
                </div>
              <div className="pic-box">
                <div className="pic-tc">
                  <img src={require('../../../../imgs/carowner-pic6.png')} alt="" />
                </div>
                <div className="type">
                  <div className="type-l">
                    <img src={require('../../../../imgs/carowner-pic7.png')} alt="" />
                  </div>
                  <div className="type-r">
                    <h3>安享套餐</h3>
                    <div>
                      定通保+AAA延保
                        </div>
                  </div>
                </div>
                <div className="type">
                  <div className="type-l">
                    <img src={require('../../../../imgs/carowner-pic8.png')} alt="" />
                  </div>
                  <div className="type-r">
                    <h3>适用车型</h3>
                    <div>
                      COROLLA卡罗拉、RAV4荣放、VIOS威驰
                        </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="yanbaofuwu">
              <ul>
                {
                  this.state.cuxiaoData.length && this.state.cuxiaoData.map((v, i) => {
                    return (
                      <li key={i}>
                        <div className="bl">
                          {v.activityTitle}
                        </div>
                        <p>
                          {v.activityContent}
                        </p>
                      </li>
                    )
                  })
                }
              </ul>
              <div className="tishi">
                *详情请垂询当地经销商
                </div>
            </div>
          </div>
          <div className='tabtwo-three'>
            <ul className='input-box'>
              <li>
                <div className="l label-must">
                  车型:
                </div>
                <div className="r">
                  <MySelect
                    extra="请选择车型"
                    value={this.state.code}
                    data={this.state.carType}
                    onChange={(v) => this.onChangeCar('code', v)}
                  />
                </div>
              </li>
              <li className="r-text-top">
                <div className="l label-must">
                  车龄:
                </div>
                <div className="r">
                  <MySelect
                    extra="请选择车龄"
                    value={this.state.carAge}
                    data={this.state.carAgeData}
                    onChange={(v) => this.onChangeCar('carAge', v)}
                  />
                </div>

              </li>
              <li className="r-text">
                <div>
                  从新车销售到预计购买延保的月数
                </div>
              </li>
              <li>
                <div className="l">
                  车辆类型:
                </div>
                <div className="r no-border">
                  {this.state.carAge && this.state.carAgeData1[this.state.carAge].label}
                  {/* {this.state.carAge} */}
                </div>
              </li>
            </ul>
            <ul className='input-box'>
              <li>
                <div className="l label-must w" style={{ color: this.state.carAge == '2' ? '#b9b9b9' : '#000' }}>
                  延保服务提供年限:
                </div>
                <div className="r">
                  <MySelect
                    extra="请选择年限"
                    disabled={this.state.carAge == '2'}
                    value={this.state.serviceLife}
                    data={this.state.serviceLifeData}
                    onChange={(v) => this.onChangeCar('serviceLife', v)}
                  />
                </div>
              </li>
              <li>
                <div className="l label-must w" style={{ color: this.state.carAge == '2' ? '#b9b9b9' : '#000' }}>
                  延保服务类型:
                </div>
                <div className="r">
                  <MySelect
                    disabled={this.state.carAge == '2'}
                    extra="请选择服务类型"
                    value={this.state.serviceType}
                    data={this.state.serviceTypeData}
                    onChange={(v) => this.onChangeCar('serviceType', v)}
                  />
                </div>
              </li>
            </ul>
            <div className="cankaojia">
              <div className="price">
                <h3>延保参考价:</h3>
                {this.state.price && <div>{this.state.price}</div>}
              </div>
              <div className="zhu">
                <div className="l">注: &nbsp;</div>
                <div className="text">
                  以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商。
                </div>
              </div>
            </div>
          </div>
        </Tabs>
      </div>
    );
  }
}

export default Tabtwo;
