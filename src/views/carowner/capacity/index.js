import React, { Component } from 'react';
import {getParamsObj} from '../../../utils/util'
import { Tabs, Modal, Icon } from 'antd-mobile';

import './index.less'

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class Capacity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showApp1Modal: false,
      showApp2Modal: false,
      modalFlag: false,
      tabIndex: 0
    }
  }
  showModal() {
    window.myModal();
    this.setState({
      modalFlag: true,
    });
  }
  onClose = key => () => {
    window.myModal1();
    this.setState({
      [key]: false,
    });
  }
  componentDidMount() {
    // 官微的部分选项卡要求注释隐藏 而且有单独页面跳转 为了不单独将选项卡拆成但页面和配置路由 减少工作量 所以通过url带tabindex来判断 跳转的是那一选项卡
    let params = getParamsObj();
    this.setState({
      tabIndex: Number(params.tabIndex || params.tabindex)? Number(params.tabIndex || params.tabindex): 0
    })
    document.title = '智能互联'
  }
  setIndex(v, i) {
    this.setState({
      tabIndex: i
    })
  }
  render() {
    const tabs = [
      // { title: '车联网' },
      { title: '卡罗拉互联' },
      { title: '手机互联' },
    ];
    return (
      <div className='capacity'>
        <div className="title-img">
          <img src={require('../../../imgs/chelianwang-banner.png')} alt="" />
          {/* <span>
            智能互联
          </span> */}
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            page = {this.state.tabIndex}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            onTabClick={(v, i) => this.setIndex(v, i)}
          >
            {/* <div className="chelianwang">
              <div className="title-text">
                一汽丰田车联网通过车内网、车载移动互联网和车际网，<br />
                建立车与车主、车与路、车与车、车与外部世界之间的连接，<br />
                实现智能动态信息服务和车辆智能化控制。<br />
                致力于为车主提供全面、智能、贴心的车联网服务。
          </div>
              <div className="download-box ">
                <div className="l">
                  <img src={require('../../../imgs/chelianwang-logo.png')} alt="" />
                  <span>一汽丰田</span>
                </div>
                <div className="r" onClick={() => this.setState({
                  showApp1Modal: true
                }, () => window.myModal())}>
                  <span>点击下载</span>
                  <img src={require('../../../imgs/chelianwang-download.png')} alt="" />
                </div>
              </div>
              <div className="xinengyuan">
                <h3 className="title mb-4" style={{ textAlign: 'left' }}>
                  新能源专享
            </h3>
                <ul>
                  <li className="item">
                    <h3 className="left-border">
                      功能简介
                </h3>
                    <p>
                      通过官方APP中的新能源专享功能，可以实现车辆信息的实时查看、充电桩的查找、生态指数排名与消息推送等服务，
                      从而提升新能源车主用车的便捷性，享受全新的智能车生活时代。
                </p>
                  </li>
                  <li className="item">
                    <h3 className="left-border">
                      互联车型
                </h3>
                    <div className="img">
                      <img src={require('../../../imgs/chelianwang-car.png')} alt="" />
                    </div>
                    <div className="car-title">
                      卡罗拉双引擎E+
                </div>
                  </li>
                  <li className="item">
                    <h3 className="left-border">
                      功能介绍
                </h3>
                    <div className="phone-box">
                      <div className="jieshao">
                        <div className="img">
                          <img src={require('../../../imgs/chelianwang-p1.png')} alt="" />
                        </div>
                        <div className="num">
                          1
                    </div>
                        <div className="phone-title">
                          车辆信息实时展示，<br />随时查看您的爱车状态
                    </div>
                      </div>
                      <div className="jieshao">
                        <div className="img">
                          <img src={require('../../../imgs/chelianwang-p2.png')} alt="" />
                        </div>
                        <div className="num">
                          2
                    </div>
                        <div className="phone-title">
                          充电桩查找，<br />
                          快速查找您身边的充电桩。
                    </div>
                      </div>
                      <div className="jieshao">
                        <div className="img">
                          <img src={require('../../../imgs/chelianwang-p3.png')} alt="" />
                        </div>
                        <div className="num">
                          3
                    </div>
                        <div className="phone-title">
                          生态指数统计，<br />
                          环保贡献，一目了然。
                    </div>
                      </div>
                    </div>
                  </li>
                </ul>

              </div>
              <div className="more-gn">
                <h3 className="title">
                  更多功能，敬请期待
              </h3>
                <div className="icons">
                  <ul>
                    <li>
                      <img src={require('../../../imgs/chelianwang-icon-1.png')} alt="" />
                      <span>车辆控制</span>
                    </li>
                    <li>
                      <img src={require('../../../imgs/chelianwang-icon-2.png')} alt="" />
                      <span>车况监视</span>
                    </li>
                  </ul>
                  <ul>
                    <li>
                      <img src={require('../../../imgs/chelianwang-icon-3.png')} alt="" />
                      <span>地图寻车</span>
                    </li>
                    <li>
                      <img src={require('../../../imgs/chelianwang-icon-4.png')} alt="" />
                      <span>保养提醒</span>
                    </li>
                    <li>
                      <img src={require('../../../imgs/chelianwang-icon-5.png')} alt="" />
                      <span>车辆健康报告</span>
                    </li>
                  </ul>
                  <div className="zhuyi">
                    (*注：车联网功能仅适用部分车型)
                </div>
                </div>
              </div>
              <Modal
                className='my-modal app-modal-box'
                visible={this.state.showApp1Modal}
                transparent
                onClose={() => this.setState({ showApp1Modal: false }, () => window.myModal1())}
              >
                <div className="img-box">
                  <img src={require('../../../imgs/app-ewm-znhl.png')} alt="" />
                </div>
                <div className='app-txt'>一汽丰田App</div>
              </Modal>
            </div> */}
            <div className="kaluolahulian">
              <div className="title-text">
                {/* <p>一汽丰田卡罗拉互联致力于为卡罗拉17款全系车型车主提供便捷的智能汽车服务，</p> */}
                <p>一汽丰田卡罗拉互联致力于为卡罗拉17款车型车主提供更便捷的智能汽车服务，</p>
                <p>通过线缆或无线直显方式把手机与车载机相连接，</p>
                <p>使驾驶人员更便捷、更安全的在车载机上操作导航，电话，音乐，视频等手机的各项功能，</p>
                <p>从而提高舒适性，趣味性及安全性，为用户开启智能驾驶时代的汽车生活。</p>
                {/* 一汽丰田卡罗拉互联致力于为<br />
          卡罗拉17款全系车型车主提供便捷的智能汽车服务，<br />
          通过线缆或无线直显方式把手机与车载机相连接，<br />
          使驾驶人员更便捷，更安全的在车载机上操作<br />
          导航，电话，音乐，视频等手机的各项功能，从而提高<br />
          舒适性，趣味性及安全性，<br />
          为用户开启智能驾驶时代的汽车生活。 */}
              </div>
              <div className="download-box mt-8">
                <div className="l">
                  <img src={require('../../../imgs/kll-icon.png')} alt="" />
                  <span>
                    卡罗拉互联
                <p>仅适用于卡罗拉17款全系车型</p>
                  </span>

                </div>
                <div className="r" onClick={() => this.setState({
                  showApp2Modal: true
                }, () => window.myModal())}>
                  <span>点击下载</span>
                  <img src={require('../../../imgs/chelianwang-download.png')} alt="" />
                </div>
              </div>
              <div className="tab-content">
                <Tabs
                  tabs={[{ title: 'DA多媒体显示系统' }, { title: 'AVN多媒体导航系统' }]}
                  animated={false}
                  swipeable={false}
                  useOnPan={false}
                  renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
                >
                  <div className='avn'>
                    <div className='item box-big'>
                      <h3 className="left-border mt-8">
                        产品简介
              </h3>
                      <p>
                        本应用程序用于一汽丰田卡罗拉汽车上的有线镜像功能。<br />
                        通过线缆直显方式把iphone4s以上的手机与车载机相连接，使驾驶人员在行驶中更便捷，更安全的在车载机上操作导航功能，从而提高驾驶的安全性，为用户开启智能驾驶时代的汽车生活。
                </p>
                    </div>
                    <div className='item'>
                      <h3 className="left-border mt-8 box-big">
                        界面展示
              </h3>
                      <div className="jiemian-title box-big">
                        IOS系统 - DA多媒体显系统
              </div>
                      <div className='imgs-box'>
                        <div className="imgs">
                          {
                            [1, 2, 3].map((v, i) => {
                              return (
                                <div className="img" key={i}>
                                  <img src={require(`../../../imgs/ios-${v}.png`)} alt="" />
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                      <div className="jiemian-title box-big">
                        Android系统 - DA多媒体显系统
              </div>
                      <div className='imgs-box'>
                        <div className="imgs">
                          {
                            [1, 2, 3, 4].map((v, i) => {
                              return (
                                <div className="img" key={i}>
                                  <img src={require(`../../../imgs/andriod-${v}.png`)} alt="" />
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="avn">
                    <div className='item'>
                      <h3 className="left-border mt-8 box-big">
                        产品简介
              </h3>
                      <p className="box-big">
                        本应用程序用于一汽丰田卡罗拉汽车上有线镜像功能。
                        通过线缆或无线直显方式把Android4.0.3以上的手机与车载机相连接。使驾驶人员更便捷，更安全的在车载机上操作导航，电话,音乐,视频等手机的各项功能。从而提高舒适性,趣味性及安全性,为用户开启智能驾驶时代的汽车生活。
                </p>
                    </div>
                    <div className='item'>
                      <h3 className="left-border mt-8 box-big">
                        界面展示
              </h3>
                      <div className="jiemian-title box-big">
                        Android系统 - DA多媒体显系统
              </div>
                      <div className='imgs-box'>
                        <div className="imgs">
                          {
                            [1, 2, 3].map((v, i) => {
                              return (
                                <div className="img" key={i}>
                                  <img src={require(`../../../imgs/Android-da-${v}.png`)} alt="" />
                                </div>
                              )
                            })
                          }
                        </div>
                      </div>
                    </div>
                  </div>
                </Tabs>
              </div>
              <Modal
                className='my-modal app2-modal-box'
                visible={this.state.showApp2Modal}
                transparent
                onClose={() => this.setState({ showApp2Modal: false }, () => window.myModal1())}
              // maskClosable={true}
              // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
              >
                <div className="tab-content">
                  <Tabs
                    tabs={[{ title: 'DA多媒体显示系统' }, { title: 'AVN多媒体导航系统' }]}
                    animated={false}
                    swipeable={false}
                    useOnPan={false}
                    renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
                  >
                    <div className='da'>
                      <div className="erweima-item">
                        <div className="img-box">
                          <img src={require('../../../imgs/DA-erweima-IOS.png')} alt="" />
                        </div>
                        <div className='app-txt'>IOS系统下载</div>
                      </div>
                      <div className="erweima-item">
                        <div className="img-box">
                          <img src={require('../../../imgs/DA-erweima-wdj.png')} alt="" />
                        </div>
                        <div className='app-txt'>豌豆荚市场下载</div>
                      </div>
                      <div className="erweima-item">
                        <div className="img-box">
                          <img src={require('../../../imgs/DA-erweima-360.png')} alt="" />
                        </div>
                        <div className='app-txt'>360助手下载</div>
                      </div>
                    </div>
                    <div className='avn'>
                      <div className="erweima-item">
                        <div className="img-box">
                          <img src={require('../../../imgs/AVN-erweima-wdj.png')} alt="" />
                        </div>
                        <div className='app-txt'>豌豆荚市场下载</div>
                      </div>
                      <div className="erweima-item">
                        <div className="img-box">
                          <img src={require('../../../imgs/AVN-erweima-360.png')} alt="" />
                        </div>
                        <div className='app-txt'>360助手下载</div>
                      </div>
                    </div>
                  </Tabs>
                </div>

              </Modal>
            </div>
            <div className='mobile-innerconnect'>
              <div className='introduce'>
                <div className='title-content'>
                  <p>CarLife拥有强大的百度地图资源，带来全新的驾驶体验。</p>
                  <p>可以同步查阅手机通讯录。</p>
                  <p>并且满足您随时随地播放音乐或电台，一路畅听</p>
                  <p>音乐盛宴的需求。</p>
                  <p>CarLife率先支持Android和iPhone双平台。</p>
                  <p>只需通过USB连接手机与座驾便可无需分心，安全驾驶。</p>
                </div>
                <div className='title'>产品简介</div>
                <div className='da'>
                  <div className='da-t'>DA介绍</div>
                  <div className='da-item' myorder='1.'>
                    各种操作按钮静电化。
                      </div>
                  <div className='da-item' myorder=''>
                    实现同时兼具科技和简单的CarLife操作平滑面板。
                      </div>
                  <div className='da-item' myorder='2.'>
                    搭载静电触控屏。简洁的薄型液晶屏实现轻快的使用体验。同时也实现了畅快的触控感。
                      </div>
                  <div className='da-item' myorder='3.'>
                    9寸大型液晶屏。迎合中国用户需求的同时，也提高了辨识度和操作感。(分辨率1280x720)
                      </div>
                  <div className='da-item' myorder='4.'>
                    在主界面采用了具有科技感和控制性强势的卡片式HMI设计。
                      </div>
                </div>
                <div className='da gray'>
                  <div className='da-t'>Baidu&nbsp;CarLife介绍</div>
                  <div className='da-item' myorder='1.'>
                    CarLife拥有强大的百度地图资源，融入车规级HMI界面，带来全新的驾驶体验。
                      </div>
                  <div className='da-item' myorder='2.'>
                    便捷的电话服务，可同步查阅手机通讯录，一目了然，尽在掌握。
                      </div>
                  <div className='da-item' myorder='3.'>
                    随时随地播放您的本地音乐，便可在线收听音乐或电台一路畅听音乐盛宴。
                      </div>
                  <div className='da-item' myorder='4.'>
                    CarLife率先支持Android和iPhone双平台，覆盖多种主流手机品牌。您只需通过USB连接手机与座驾便可无需分心，安全驾驶。
                      </div>
                  <div className='da-item' myorder='5.'>
                    CarLife配合您最熟悉的操作方式，无论是几句简单的语音指令，还是轻点触控。
                      </div>
                </div>
                <div className='shouce'>
                  <div className='title'>互联车型</div>
                </div>
                <div className='car-container'>
                  <div className='car-item'>
                    <div className='img'>
                      <img src={require(`../../../imgs/car-corolla-e.png`)} alt="" />
                    </div>
                    <div className='car-name'>卡罗拉双擎E+</div>
                  </div>
                  <div className='car-item'>
                    <div className='img'>
                      <img src={require(`../../../imgs/car-corolla.png`)} alt="" />
                    </div>
                    <div className='car-name'>COROLLA&nbsp;卡罗拉</div>
                  </div>
                  <div className='car-item'>
                    <div className='img'>
                      <img src={require(`../../../imgs/car-corolla-sq.png`)} alt="" />
                    </div>
                    <div className='car-name'>卡罗拉双擎</div>
                  </div>
                  <div className='car-item'>
                    <div className='img'>
                      <img src={require(`../../../imgs/car-yize.png`)} alt="" />
                    </div>
                    <div className='car-name'>IZOA&nbsp;奕泽</div>
                  </div>
                </div>
                <div className='title'>界面展示</div>
                <div className='img-show sigle'>
                  <img src={require(`../../../imgs/jiemian.png`)} alt="" />
                </div>
                <div className='title'>硬件连接方法</div>
                <div className='img-show bg'>
                  <img src={require(`../../../imgs/connect-android.png`)} alt="" />
                  <div className='desc'>
                    <div className='t'>Android手机</div>
                    <div className='info'>连接要求</div>
                    <div className='info'>支持版本：Android&nbsp;OS&nbsp;5.0以上</div>
                    <div className='info'>连接需要：USB&nbsp;Cable</div>
                  </div>
                </div>
                <div className='img-show bg'>
                  <img src={require(`../../../imgs/connect-apple.png`)} alt="" />
                  <div className='desc'>
                    <div className='t'>iPhone手机</div>
                    <div className='info'>连接要求</div>
                    <div className='info'>支持版本：iPhone6&nbsp;iOS9.0以上</div>
                    <div className='info'>连接需要：iPhone&nbsp;Lighting&nbsp;Cable</div>
                  </div>
                </div>
                <div className='title'>从DA操作CarLife方法</div>
                <div className='img-show'>
                  <img src={require(`../../../imgs/fun-1.png`)} alt="" />
                  <div className='arrow'>
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                  </div>
                  <img src={require(`../../../imgs/fun-2.png`)} alt="" />
                  <div className='arrow'>
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                  </div>
                  <div className='mul'>
                    <img src={require(`../../../imgs/fun-3-1.png`)} alt="" />
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                    <img src={require(`../../../imgs/fun-3-2.png`)} alt="" />
                  </div>
                  <div className='arrow'>
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                  </div>
                  <img src={require(`../../../imgs/fun-4.png`)} alt="" />
                  <div className='arrow'>
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                  </div>
                  <img src={require(`../../../imgs/fun-5.png`)} alt="" />
                  <div className='arrow'>
                    <img src={require(`../../../imgs/fun-arrow.png`)} alt="" />
                  </div>
                  <img src={require(`../../../imgs/fun-6.png`)} alt="" />
                </div>
                <div className='mybtns'>
                  <div onClick={() => { this.showModal() }}>
                    <img src={require(`../../../imgs/icon-apple.png`)} alt="" />iPhone下载</div>
                  <div onClick={() => { this.showModal() }}>
                    <img src={require(`../../../imgs/icon-android.png`)} alt="" />Android下载</div>
                </div>
                <Modal
                  visible={this.state.modalFlag}
                  transparent
                  maskClosable={true}
                  onClose={this.onClose('modalFlag')}
                  wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                  afterClose={() => { }}
                >
                  <div className='mobilehl-modal'>
                    <img src={require('../../../imgs/code2-mobilehl.png')} />
                  </div>
                </Modal>
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Capacity;
