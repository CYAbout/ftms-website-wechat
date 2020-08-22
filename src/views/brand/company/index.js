import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { comApi } from '../../../components/api';
import MyVideo from '../../../components/common/myvideo'
import './index.less'

class Company extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: [],
      videoUrl2: [],
      videoUrl3: [],
      tabindex: 0
    }
  }
  componentDidMount() {
    this.getVideo()
  }
  getVideo() {
    comApi.getVideoUrl('BrandConcept')
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            videoUrl: res.data
          })
        }
      })
    comApi.getVideoUrl('BrandSystem')
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            videoUrl3: res.data
          })
        }
      })
    comApi.getVideoUrl('BrandReview')
      .then(res => {
        if (res && res.code == '0') {
          this.setState({
            videoUrl2: res.data
          })
        }
      })
  }
  render() {
    const tabs = [
      { title: '致真至极' },
      { title: '品牌体系' },
    ];
    document.title="企业品牌";
    return (
      <div className='company'>
        <div className="title-img">
          <img src={require('../../../imgs/qiyepinpai-banner.png')} alt="" />
          {/* <span>企业品牌</span>*/}
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            animated={false}
            page={this.state.tabindex}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            onTabClick={(v,i) => this.setState({tabindex:i,})}
          >
          <div>
            {
              +this.state.tabindex === 0 ?
              <div className="zhizhen">
                <h3 className="title">
                  品牌理念解读
              </h3>
                <div className="img-box">
                  <img src={require('../../../imgs/qiyepinpai-all-zhen.png')} alt="" />
                </div>
                <div className="img-box">
                  <img src={require('../../../imgs/qiyepinpai-all-ji.jpg')} alt="" />
                </div>
                <h3 className="title">
                  品牌理念视频
              </h3>
                {/* <div className="img-box video-box">
              <span className="play-btn"></span>
                <img src={require('../../../imgs/qiyepinpai-video1.png')} alt=""/>
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
              </div>
              :
              <div className="tixi">
                <h3 className="title">
                  一汽丰田品牌体系架构
                </h3>
                <div className="tables">
                  <div className="sanjiao">
                  </div>
                  <div className="table-1">
                    <ul>
                      <li className='title h-li'>企业愿景</li>
                      <li className='title'>企业精神</li>
                      <li className='title'>品牌资产</li>
                      <li className='title'>品牌定位</li>
                      <li className='title'>品牌口号</li>
                    </ul>
                    <ul>
                      <li className='h-li'>成为最受信赖的企业，通过稳健的经营和持续的发展，成为社会认可，用户满意，员工成长的成功企业</li>
                      <li>尊重 挑战 速度 诚信</li>
                      <li>信</li>
                      <li>以可信赖的产品与服务，满足用户多远出行需求。</li>
                      <li>致真 至极</li>
                    </ul>
                  </div>
                  <div className="table-2">
                    <ul>
                      <li className='title'>产品</li>
                      <li>亚洲龙</li>
                      <li>皇冠</li>
                      <li>卡罗拉双擎E+</li>
                      <li>普拉多</li>
                      <li>荣放</li>
                      <li>奕泽</li>
                      <li>卡罗拉</li>
                      <li>卡罗拉双擎</li>
                      <li>威驰</li>
                      <li>威驰FS</li>
                      <li>柯斯达</li>
                    </ul>
                    <ul>
                      <li className='title h-li'>客户服务</li>
                      <li>诚信服务</li>
                      <li>安心二手车</li>
                      <li>纯牌零件</li>
                      <li>纯正用品+品牌优选</li>
                      <li>安心租车</li>
                      <li>AAA延保</li>
                      <li>AAA保险</li>
                      <li className='h-li'>贴心金融</li>
                    </ul>
                    <ul>
                      <li className='title'>渠道</li>
                      <li>高素质服务团队</li>
                      <li>高标准服务流程</li>
                      <li>高品质店铺形象</li>
                      <li>智能化产品体验</li>
                      <li className='title'>企业社会责任</li>
                      <li>安全</li>
                      <li>环保</li>
                      <li>育人</li>
                    </ul>
                  </div>
                  <div className="table-3">
                    <div className="title-b">
                      经营理念：客户第一、经销商第二、厂家第三
                  </div>
                    {/* <div className="table-box">
                    <ul>
                      <li className='title'>坚守真实  追求极致</li>
                      <li>全面导入TNGA新能源</li>
                      <li>车型EV/PHEV车型</li>
                      <li>只能终端/车载网联</li>
                      <li className='title titlt-t-2'>坚守真实  追求极致</li>
                      <li>客服人员素养</li>
                      <li>经营能力提示</li>
                      <li>改善硬件环境</li>
                      <li>智能化升级</li>
                    </ul>
                    <ul>
                      <li className='title'>坚守真实  追求极致</li>
                      <li>管家式服务，全程无忧</li>
                      <li>一站式服务，更便携高效</li>
                      <li>覆盖用户出行全周期</li>
                      <li className='title titlt-t-2'>坚守真实  追求极致</li>
                      <li className='h-li-2'>标签化</li>
                      <li className='h-li-2'>可延续</li>
                    </ul>
                  </div> */}
                  </div>
                </div>
                <h3 className="title">
                  品牌回顾视频
              </h3>
                {/* <div className="img-box video-box">
              <span className="play-btn"></span>
                <img src={require('../../../imgs/qiyepinpai-video2.png')} alt=""/>
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
                <h3 className="title">
                  品牌感性视频
              </h3>
                <ul className="video-list box-big">
                  {
                    this.state.videoUrl3.map((v, i) => {
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
                {/* <div className="img-box video-box">
                <span className="play-btn"></span>
                <img src={require('../../../imgs/qiyepinpai-video2.png')} alt=""/>
              </div>
              <div className="img-box video-box">
                <span className="play-btn"></span>
                <img src={require('../../../imgs/qiyepinpai-video2.png')} alt=""/>
              </div>
              <div className="img-box video-box">
                <span className="play-btn"></span>
                <img src={require('../../../imgs/qiyepinpai-video2.png')} alt=""/>
              </div> */}
              </div>
              }
            </div>
            
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Company;
