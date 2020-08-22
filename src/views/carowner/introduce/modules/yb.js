import React, { Component } from 'react';
import {carOwnerApi} from '../../api'
import '../index.less'
class Yb extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cuxiaoData:[]
    }
  }
  componentDidMount() {
    this.getInsuranceActiveList()
  }
  getInsuranceActiveList() {
    carOwnerApi.getInsuranceActiveList(1)
      .then(res => {
        if(res && res.code === '0') {
          this.setState({
            cuxiaoData:res.data
          })
        }
      })
  }
  render() {
    return (
      <div className='introduce'>
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
              <img src={require('../../../../imgs/carowner-pic3.png')} alt=""/>
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
              <img src={require('../../../../imgs/carowner-pic4.png')} alt=""/>
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
              <img src={require('../../../../imgs/carowner-pic5.png')} alt=""/>
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
              <img src={require('../../../../imgs/carowner-pic6.png')} alt=""/>
              </div>
              <div className="type">
                <div className="type-l">
                  <img src={require('../../../../imgs/carowner-pic7.png')} alt=""/>
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
                  <img src={require('../../../../imgs/carowner-pic8.png')} alt=""/>
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
                this.state.cuxiaoData.length && this.state.cuxiaoData.map((v,i) => {
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
    );
  }
}

export default Yb;
