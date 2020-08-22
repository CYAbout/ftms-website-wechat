import React, { Component } from 'react';
import {Button,Popover} from 'antd-mobile'
import {withRouter} from 'react-router-dom'

@withRouter
class PicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step:5,
      huiyuanData:[
        // {
        //   img:'huiyuan-5.png',
        //   tishi:'经销店推荐认证车主（每个店只有1个名额）',
        //   p:'8',
        // },
        {
          img:'huiyuan-1.png',
          tishi:'未购车客户，完成会员注册即可成为普通卡会员',
          p:'0',
        },
        {
          img:'huiyuan-2.png',
          tishi:'车主名下认证1台车辆或车辆一年累计1200积分以下',
          p:'2',
        },
        {
          img:'huiyuan-3.png',
          tishi:'车主名下认证2台车辆或车辆一年累计1200积分以上、5000积分以下',
          p:'4',
        },
        {
          img:'huiyuan-4.png',
          tishi:'车主名下认证3台及以上车辆或车辆一年累计5000积分以上',
          p:'6',
        },
        {
          img:'huiyuan-5.png',
          tishi:'经销店推荐认证车主（每个店只有1个名额）',
          p:'8',
        },
        
      ],
      isFirst:true,
      tabindex: 0
    }
  }
  jumpLink(type) {
    this.props.history.push(`/carowner/fengxianghui/detail/${type}`)
  }
  setStep(step) {
    if(this.state.isFirst) {
      this.setState({
        isFirst: false
      })
      if(step > 0) {
        this.setState({
          step: 1
        })
      }else {
        this.setState({
          step: 1
        })
      }
    }
    if(this.state.step + step > 5 || this.state.step + step < 1) {
      return
    }
    this.setState({
      step: this.state.step + step
    })
  }
  render() {
    const {step,huiyuanData} = this.state
    const type = this.props.type
    const list = [{
      title:'基础权益',
      type: 'quanyi',
      img:'fxh-list-1.png',
    },{
      title:'专享福利',
      type: 'fuli',
      img:'fxh-list-2.png',
    },{
      title:'积分获取',
      type: 'huoqu',
      img:'fxh-list-3.png',
    },{
      title:'积分使用',
      type: 'shiyong',
      img:'fxh-list-4.png',
    },]
    return (
      <div className='pic-list'>
        {/* <ul className="img-list">
          {
            list.map((v,i) => {
              return (
                <li style={{display:type === v.type ? 'none' : 'flex'}} key={i} onClick={() => this.jumpLink(v.type)}>
                  <img src={require(`../../../../imgs/${v.img}`)} alt=""/>
                  <span>{v.title}</span>
                </li>
              )
            })
          }
        </ul> */}
        <div className="ruhuifangshi">
          <div className="picc">
            <img src={require(`../../../../imgs/fxh-ruhui-0.png`)} alt=""/>
          </div>
          <h3 className="ruhui">
            入会方式
          </h3>
          {/* <div className='detail'>凡购买一汽丰田品牌的个人车主和关注一起丰田品牌的意向客户，均可加入丰享汇。</div> */}
          <p>① 在“<span>一汽丰田丰享汇</span>”公众号下“<span>享·我</span>”菜单中找到“<span>会员中心</span>”并点击进入</p>
          <p>② 完善个人信息填写点击“下一步”<span>按钮进入</span>“会员中心”</p>
          <p>③ 在“<span>会员中心</span>”页面找到“<span>我的爱车</span>”按钮点击进入</p>
          <p>④ 在“<span>我的爱车</span>”页面点击下方“<span>认证爱车</span>”按钮，提交相关资料完成车辆认证</p>
          <div className="btns">
            <div className="img">
              <img src={require("../../../../imgs/fxh-rh-ewm.png")} alt="img"/>
            </div>
            {/* <div className="my-btn mb-8">
              <Popover
                overlayClassName="ruhui-erweima"
                overlay={<img src={require("../../../../imgs/ruhui-erweima.png")} alt="img"/>}
                placement='top'
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [0, -12],
                }}
              >
                <Button inline onClick={() => this.restData()}>扫码入会</Button>
              </Popover>
            </div> */}
            </div>
          </div>
          <div className="liaojie">
              <h3>一分钟了解丰享汇</h3>
              <div className="detail">
                <p>一汽丰田丰享汇是一汽丰田官方车主俱乐部，</p>
                <p>加入丰享汇不仅可以体验触手可及的专业服务，</p>
                <p>还能享受跨平台、</p>
                <p>高价值的会员尊享权益，参加多样化的福利活动，</p>
                <p>为您的用车生活带来全方位的深度改变。</p>
                <p>快来加入我们，前方有更多惊喜等您来开启。</p>
              </div>
              <div className="img">
              <img src={require("../../../../imgs/fxh-rh-4.png")} alt="img"/>
              </div>
              <ul className='huiyuan-step'>
                <li>
                  <h4>① 注册认证</h4>
                  <p>用户注册成为一汽丰田丰享汇会员并完成车主认证，</p>
                  <p>即可获得积分奖励，其中：</p>
                  <p>荣耀卡会员奖励100积分</p>
                  <p>尊享卡会员经理1000积分</p>
                  <p>至尊卡会员奖励3000积分</p>
                </li>
                <li>
                  <h4>② 推荐购车</h4>
                  <p>所有会员（包含普通卡会员）成功推荐购车即可获得积分奖励，其中：</p>
                  <p>推荐购车1-3台推荐购车赠送3000积分/台</p>
                  <p>推荐购车4-5台推荐购车赠送4500积分/台</p>
                  <p>推荐购车6-10台推荐购车赠送6000积分/台</p>
                  <p>推荐购车10台以上推荐购车赠送9000积分/台</p>
                </li>
                <li>
                  <div className="img">
                  <img src={require("../../../../imgs/fxh-rh-5.png")} alt="img"/>
                  </div>
                </li>
                <li>
                  <h4>③ 增换购</h4>
                  <p>荣耀卡、尊享卡和至尊卡会员增购或换购一汽丰田车辆，每台获得10000积分</p>
                </li>
                <li>
                  <h4>④ 参加厂家活动</h4>
                  <p>会员参加厂商发布的活动，可获得积分奖励</p>
                </li>
                <li>
                  <h4>⑤ 平台签到</h4>
                  <p>每日签到可获得1积分</p>
                </li>
                <li>
                  <h4>⑥ 平台完善资料</h4>
                  <p>完善“我的资料”，可获得50积分</p>
                </li>
                <li>
                  <div className="img">
                  <img src={require("../../../../imgs/fxh-rh-6.png")} alt="img"/>
                  </div>
                </li>
                <li>
                  <h4>·积分如何使用</h4>
                  <p>① 兑换积分商城的商品和纯牌零件等</p>
                  <p>② 兑换活动特权</p>
                  <p>③ 在认证经销店返厂维修保养，积分可抵现金（不含保险事故车）和工时费</p>
                  <p>④ 购买延保产品抵现金</p>
                  <p>⑤ 续保抵现金</p>
                  <p>⑥ 店端指定商品及服务消费抵现金</p>
                  <p>⑦ 厂家其他服务抵用现金</p>
                </li>
                <li className='last-item'>
                  <span>*</span>
                  积分商城兑换订单可在“商城订单”中查询，维保订单可在“服务订单”中查询
                </li>
              </ul>
            </div>
            <div className="huiyuandj">
                <h3 className="title">
                会员等级体系
                </h3>
                <div className='content-block'>
                  <div className="img-box">
                    <img src={require(`../../../../imgs/${huiyuanData[step-1].img}`)} alt=""/>
                  </div>
                  <div className="tishi">
                    * {huiyuanData[step-1].tishi} 
                  </div>
                  {
                    step === 1 && <div><div className="desc-item" myorder='1.'>
                    受邀参加FTMS举行的会员活动
                    </div>
                    <div className="desc-item" myorder='2.'>
                    1~3台推荐购车赠送3000积分/台，
                    </div>
                    <div className="desc-item">
                    4~5台推荐购车赠送4500积分/台，
                    </div>
                    <div className="desc-item">
                    6~10台推荐购车赠送6000积分/台，
                    </div>
                    <div className="desc-item">
                    10台以上推荐购车赠送9000积分/台
                    </div>
                    </div>
                  }
                  {
                    step !== 1 && <div><div className="desc-item" myorder='1.'>
                    受邀参加FTMS举行的会员活动
                    </div>
                    <div className="desc-item" myorder='2.'>
                    增换购本品牌赠送10000积分
                    </div>
                    <div className="desc-item" myorder='3.'>
                    消费积分赠送(消耗额{20*(step-1)}%)
                    </div>
                    <div className="desc-item" myorder='4.'>
                    节点活动积分翻倍
                    </div>
                    <div className="desc-item" myorder='5.'>
                    生日当月赠送50%维修保养工时费积分
                    </div>
                    <div className="desc-item" myorder='6.'>
                    经销商根据自店情况设置客户权益
                    </div>
                    <div className="desc-item" myorder='7.'>
                    购买价值链卡券
                    </div>
                    <div className="desc-item" myorder='8.'>
                    包含普通卡会员所有权益
                    </div>
                    </div>
                  }
                </div>
                {/* 
                <div className="img-box">
                  <img src={require('../../../imgs/chaoji-ka.png')} alt=""/>
                </div> */}
                {/* {step} */}
                <div className="btn-box">
                  <span onClick={() => this.setStep(-1)}>
                    <img src={require('../../../../imgs/carowner-lbtn.png')} alt=""/>
                  </span>
                  <span onClick={() => this.setStep(1)}>
                    <img src={require('../../../../imgs/carowner-rbtn.png')} alt=""/>
                  </span>
                </div>
              </div>
      </div>
    );
  }
}

export default PicList;
