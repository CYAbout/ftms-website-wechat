import React, { Component } from 'react';
import { Tabs, Button, Popover } from 'antd-mobile';
import moment from 'moment'
import PicList from './module/picList'
import GetMore from '../../../components/getmore'
import { comApi } from '../../../components/api';
import MyVideo from '../../../components/common/myvideo'
import { carOwnerApi } from '../api'
import { toJump } from '../../../utils/jumpLink';
import { getParamsObj } from '../../../utils/util'
import './index.less'

class Fengxianghui extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      beginPage: 1,
      pageSize: 5,
      videoUrl: [],
      videoUrl2: [],
      data: [
      ],
      curActivity: [],
      newActivity: [],
      oldActivity: [],
      step: 5,
      huiyuanData: [
        // {
        //   img:'huiyuan-5.png',
        //   tishi:'经销店推荐认证车主（每个店只有1个名额）',
        //   p:'8',
        // },
        {
          img: 'huiyuan-1.png',
          tishi: '未购车客户，完成会员注册即可成为普通卡会员',
          p: '0',
        },
        {
          img: 'huiyuan-2.png',
          tishi: '车主名下认证1台车辆或车辆一年累计1200积分以下',
          p: '2',
        },
        {
          img: 'huiyuan-3.png',
          tishi: '车主名下认证2台车辆或车辆一年累计1200积分以上、5000积分以下',
          p: '4',
        },
        {
          img: 'huiyuan-4.png',
          tishi: '车主名下认证3台及以上车辆或车辆一年累计5000积分以上',
          p: '6',
        },
        {
          img: 'huiyuan-5.png',
          tishi: '经销店推荐认证车主（每个店只有1个名额）',
          p: '8',
        },

      ],
      isFirst: true,
      tabindex: 0
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.curActivityList()
    this.newActivityList()
    this.pastActivityList()
    this.getVideo()
    this.setState({
      tabindex: +getParamsObj().tabindex || 0
    })
    // 官微的部分选项卡要求注释隐藏 而且有单独页面跳转 为了不单独将选项卡拆成但页面和配置路由 减少工作量 所以通过url带tabindex来判断 跳转的是那一选项卡
    let params = getParamsObj();
    this.setState({
      tabIndex: Number(params.tabIndex || params.tabindex)? Number(params.tabIndex || params.tabindex): 0
    })
    document.title = '丰享汇'
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        tabindex: +getParamsObj().tabindex || 0
      })
    }
  }
  getVideo() {
    comApi.getVideoUrl('LegalRight')
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            videoUrl: res.data
          })
        }
      })
    comApi.getVideoUrl('EasyLife')
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            videoUrl2: res.data
          })
        }
      })
  }
  curActivityList() {
    carOwnerApi.getOwnerStory()
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            curActivity: res.data.dataList
          })
        }
      })
  }
  newActivityList() {
    carOwnerApi.curActivityList()
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            newActivity: res.data
          })
        }
      })
  }
  pastActivityList() {
    const opt = {
      beginPage: this.state.beginPage,
      pageSize: this.state.pageSize,
    }
    carOwnerApi.pastActivityList(opt)
      .then(res => {
        if (res && res.code == 0) {
          if (res.data.dataList) {
            this.setState({
              oldActivity: [...this.state.oldActivity, ...res.data.dataList],
              beginPage: this.state.beginPage + 1,
              hasNextPage: res.data.hasNextPage
            })
          }
          this.setState({
            showLoading: false,
          })
        }
      })
  }

  getMoreData() {
    // 请求
    this.setState({
      showLoading: true,
    })
    this.pastActivityList()

  }

  setStep(step) {
    if (this.state.isFirst) {
      this.setState({
        isFirst: false
      })
      if (step > 0) {
        this.setState({
          step: 1
        })
      } else {
        this.setState({
          step: 1
        })
      }
    }
    if (this.state.step + step > 5 || this.state.step + step < 1) {
      return
    }
    this.setState({
      step: this.state.step + step
    })
  }
  render() {
    const { newActivity, oldActivity, curActivity, step, huiyuanData } = this.state
    const tabs = [
      { title: '丰·权益' },
      { title: '汇·生活' },
    ];
    return (
      <div className='fengxianghui'>
        <div className="title-img">
          <img src={require('../../../imgs/fxh-banner.png')} alt="" />
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            animated={false}
            swipeable={false}
            page={this.state.tabindex}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            onTabClick={(v, i) => {
              this.props.history.push(`/carowner/fengxianghui?tabindex=${i}`)
            }}
          >
          </Tabs>
          {+this.state.tabindex === 0 && <div className="quanyi">
            <h3 className="title">
              加入我们， 见证每一次惊喜
              </h3>
            {/* <div className="video-box">
                <span className="paly-btn"></span>
                <img src={require('../../../imgs/ruhuivideo-0.png')} alt=""/>
              </div> */}
            <ul className="video-list box-big">
              {
                this.state.videoUrl.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="video-box-play">
                        <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                      </div>
                      {/* <p>{v.videoName}</p> */}
                    </li>
                  )
                })
              }
            </ul>
            <PicList />
          </div>}
          {+this.state.tabindex !== 0 && <div className="shenghuo">
            <h3 className="title">
              车主会员盛典
              </h3>
            {/* <div className="video-box">
                <span className="paly-btn"></span>
                <img src={require('../../../imgs/ruhuivideo-1.png')} alt=""/>
              </div> */}
            <ul className="video-list box-big">
              {
                this.state.videoUrl2.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="video-box-play">
                        <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                      </div>
                      {/* <p>{v.videoName}</p> */}
                    </li>
                  )
                })
              }
            </ul>
            {/* <div className="huiyuandj">
                <h3 className="title">
                会员等级体系
                </h3>
                <div className='content-block'>
                  <div className="img-box">
                    <img src={require(`../../../imgs/${huiyuanData[step-1].img}`)} alt=""/>
                  </div>
                  <div className="tishi">
                    * {huiyuanData[step-1].tishi} 
                  </div>
                  
                  {step === 5 ? <div className="blod">
                  优先参加一汽丰田举行的大型活动
                  </div>
                  :<div className="blod">
                  受邀参加一汽丰田举行的会员活动
                  </div>}
                  {step !== 1 && <div className="blod">
                  消费积分赠送（消费额{(step - 1)*2}0%）
                  </div>}
                  <div className="blod">
                  阶梯性赠送：
                  </div>
                  <ul>
                    <li>经销商店只承担1500积分/台</li>
                    <li>1-3台推荐购车赠送3000积分/台</li>
                    <li>4-5台推荐购车赠送4500积分/台</li>
                    <li>6-10台推荐购车赠送6000积分/台</li>
                    <li>10台以上推荐购车赠送9000积分/台</li>
                  </ul>

                  {step === 5 &&<div className="blod">
                  机场休息区免费服务（部分城市）
                  </div>}
                  {step === 5 && <div className="blod">
                  绿色保养维修服务【无需等待（部分城市）】
                  </div>}
                  {step !== 1 && <div className="blod">
                  生日当月回厂赠送积分翻倍
                  </div>}
                </div>
                <div className="btn-box">
                  <span onClick={() => this.setStep(-1)}>
                    <img src={require('../../../imgs/carowner-lbtn.png')} alt=""/>
                  </span>
                  <span onClick={() => this.setStep(1)}>
                    <img src={require('../../../imgs/carowner-rbtn.png')} alt=""/>
                  </span>
                </div>
              </div> */}
            {/* <ul className="jifen-btn">
                <Popover
                  overlayClassName="fortest"
                  overlay={<img src={require("../../../imgs/fxh-ewm.png")} alt="img"/>}
                  placement='top'
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-3, -8],
                  }}
                >
                  <li>
                    积分游戏
                  </li>
                </Popover>
                <Popover
                  overlayClassName="fortest"
                  overlay={<img src={require("../../../imgs/fxh-ewm.png")} alt="img"/>}
                  placement='top'
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-3, -8],
                  }}
                >
                  <li>
                  积分商城
                  </li>
                </Popover>
                <Popover
                  overlayClassName="fortest"
                  overlay={<img src={require("../../../imgs/fxh-ewm.png")} alt="img"/>}
                  placement='top'
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-3, -8],
                  }}
                >
                  <li>
                  查积分
                  </li>
                </Popover>
                <Popover
                  overlayClassName="fortest"
                  overlay={<img src={require("../../../imgs/fxh-ewm.png")} alt="img"/>}
                  placement='top'
                  align={{
                    overflow: { adjustY: 0, adjustX: 0 },
                    offset: [-3, -8],
                  }}
                >
                  <li>
                  赚积分
                  </li>
                </Popover>
              </ul> */}
            <h3 className="title">
              车主故事
              </h3>
            <ul className='wenzhang-box'>
              {
                curActivity.map((v, i) => {
                  return (
                    <li className="wenzhang" key={i} onClick={() => toJump('story', v.url, v.id, v.has_detail)}>
                      <div className="img-box">
                        <img src={v.m_pic} alt="" />
                      </div>
                      <h4>{v.title}</h4>
                      <div className="time">
                        {moment(v.addtime).format('YYYY-MM-DD')}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <h3 className="title">
              积分商城
              </h3>
            <div className="jifen-shop">
              <p>一汽丰田丰享汇积分商城是一汽丰田为了打造更美好的用车生活体验，全面提升一汽丰田丰享汇品牌服务，而特别推出的一项客户回馈服务。</p>
              <p>目前积分商城已上架部分商品，在未来还将推出更多服务和权益，为会员带来尊享体验。</p>
              <div className="img">
                <img src={require(`../../../imgs/fxh-new-1.png`)} alt="" />
              </div>
            </div>
            <h3 className="title">
              最新活动
              </h3>
            <ul className='wenzhang-box'>
              {
                newActivity.map((v, i) => {
                  return (
                    <li className="wenzhang" key={i} onClick={() => toJump('fengxianghui', v.url, v.id, v.has_detail)}>
                      <div className="img-box">
                        <img src={v.wapActivityPic} alt="" />
                      </div>
                      <h4>{v.activityTitle}</h4>
                      <div className="time">
                        {moment(v.activityDate).format('YYYY-MM-DD')}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            <h3 className="title no-mb">
              往期活动
              </h3>
            <ul className="wangqihuodong">
              {
                oldActivity.map((v, i) => {
                  return (
                    <li key={i} className='wenzhang' onClick={() => toJump('fengxianghui', v.url, v.id, v.has_detail)}>
                      <div className="img-box">
                        <img src={v.wapActivityPic} alt="" />
                      </div>
                      <h4>{v.activityTitle}</h4>
                      <div className="time">
                        {moment(v.activityDate).format('YYYY-MM-DD')}
                      </div>
                    </li>
                  )
                })
              }
            </ul>
            {!!oldActivity.length && <GetMore
              showLoading={this.state.showLoading}
              noMore={!this.state.hasNextPage}
              getMoreData={this.getMoreData}
            />}
            {/* <div className="my-btn mb-8 mt-8">
              <Button inline onClick={() => this.props.history.push('/brand/activity')} > &nbsp;&nbsp;&nbsp;查看更多&nbsp;&nbsp;&nbsp;</Button>
            </div> */}
          </div>}
        </div>
      </div>
    );
  }
}

export default Fengxianghui;
