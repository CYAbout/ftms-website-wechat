import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import { Popover } from 'antd-mobile'
import './index.less'

@withRouter
class Footer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
    };
    this.jumpLink = this.jumpLink.bind(this)
  }

  handleVisibleChange = (visible) => {
    this.setState({
      list: [
      ],
    });
  };
  jumpLink(url, type) {
    if (type === 1) {
      window.location = url;
    } else {
      this.props.history.push(url)
    }
  }
  render() {
    return (
      <div className='footer'>
        <footer>
          <ul className='one'>
            <li onClick={() => this.jumpLink('/footer/zhengce')}>网站政策</li>
            <li onClick={() => this.jumpLink('/footer/zhaomu')}>经销商招募</li>
            <li onClick={() => this.jumpLink('/footer/tenderlist')}>供应商招募公告</li>
            <li onClick={() => this.jumpLink('/footer/wapmap')}>网站地图</li>
            <li onClick={() => this.jumpLink('http://www.hotjob.cn/wt/FTMS/web/index?brandCode=null', 1)}>加入我们</li>
          </ul>
          <div className='two'>
            <div className="l">
              <a href="tel:400-810-1210">
                <img src={require("../../../imgs/footer-phone.png")} alt="img" />
              </a>
            </div>
            <div className="r">
              <div className="t">
                <span>800-810-1210</span>
                <span>(固话拨打，免费)</span>
              </div>
              <div className="b">
                <span>400-810-1210</span>
                <span>(手机拨打，只需付市话费)</span>
              </div>
            </div>
          </div>

          <ul className='three'>
            <li>
              <a href="https://mall.ftms.com.cn/" target="_blank">
                <img src={require("../../../imgs/footer-1.png")} alt="img" />
              </a>
            </li>
            <li>
              <a href="https://ftms.tmall.com/" target="_blank">
                <img src={require("../../../imgs/footer-2.png")} alt="img" />
              </a>
            </li>
            <li>
              <a href="https://mall.jd.com/index-831360.html" target="_blank">
                <img src={require("../../../imgs/footer-3.png")} alt="img" />
              </a>
            </li>
            <li>
              <a href="https://weibo.com/officialftms" target="_blank">
                <img src={require("../../../imgs/footer-4.png")} alt="img" />
              </a>
            </li>
            <li>
              <Popover
                overlayClassName="fortest"
                overlay={<img src={require("../../../imgs/foot-ewm-1.png")} alt="img" />}
                placement='top'
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-3, -8],
                }}
              >
                <img src={require("../../../imgs/footer-5.png")} alt="img" />
              </Popover>
            </li>
            <li>
              <Popover
                overlayClassName="fortest"
                overlay={<img src={require("../../../imgs/foot-ewm-2.png")} alt="img" />}
                placement='top'
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-3, -8],
                }}
              >
                <img src={require("../../../imgs/footer-6.png")} alt="img" />
              </Popover>
            </li>
            <li>
              <Popover
                overlayClassName="fortest"
                overlay={<img src={require("../../../imgs/app-ewm-footer.png")} alt="img" />}
                placement='top'
                align={{
                  overflow: { adjustY: 0, adjustX: 0 },
                  offset: [-3, -8],
                }}
              >
                <img src={require("../../../imgs/footer-7.png")} alt="img" />
              </Popover>
            </li>

            {/* <li>
              <img src={require("../../../imgs/footer-6.png")} alt="img"/>
            </li>
            <li>
              <img src={require("../../../imgs/footer-7.png")} alt="img"/>
            </li> */}
          </ul>
          <div className="four">
            <div className="t">
              一汽丰田汽车销售有限公司版权所有 Copyright 2018 FAW TOYOTA Motor Sales Co.,LTD
            </div>
            <div className="b">
              京ICP备07503373号-1 | 京公网安备110105019374号
            </div>
          </div>
        </footer>
      </div>
    );
  }
}

export default Footer;
