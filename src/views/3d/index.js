import React, { Component } from 'react';
import './index.less';

const PATHS = {
  // avalon: '/3d/mobile/avalon/index.html',
  // izoa: '/3d/mobile/izoa/index.html',
  // corolla_phev: '/3d/mobile/corollaphev/index.html',
  // room: '/3d/mobile/room/index.html'

  avalon: '/3d/WeChat/avalon/index.html',
  izoa: '/3d/WeChat/izoa/index.html',
  corolla_phev: '/3d/WeChat/corollaphev/index.html',
  room: '/3d/WeChat/room/index.html'
}
class DM extends Component {

  componentDidMount() {
    this.compatible_ie();
  }

  compatible_ie() {
    let ua = window.navigator.userAgent.toLowerCase();
    let isWechat = false;
    //通过正则表达式匹配ua中是否含有MicroMessenger字符串
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
      isWechat = true;
    }
    if (!isWechat) {
      document.getElementById('dmContainer').className += " not_wechat";
    }
  }
  render() {
    let type = this.props.match.params.type;
    return (
      PATHS[type] ? (
        <div className="dm_container" id="dmContainer">
          {/* <iframe src={`http://wapsite.ftms.devbmsoft.cn${PATHS[type]}`} frameBorder="0" width="100%" height="100%"></iframe> */}
          <iframe src={`${PATHS[type]}`} frameBorder="0" width="100%" height="100%"></iframe>
        </div>
      ) : '该车型暂无3D展示'
    )
  }
}

export default DM;