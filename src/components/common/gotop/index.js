import React, { Component } from 'react'
import { Drawer, ActionSheet } from 'antd-mobile'
import { share } from '../../../utils/myshare'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import {setShowHeader,setShowFooterShare} from '../../../redux/showHeader.redux'
import './index.less'

const isIPhone = new RegExp('\\biPhone\\b|\\biPod\\b', 'i').test(window.navigator.userAgent);
let wrapProps;
let scrollToTop
if (isIPhone) {
  wrapProps = {
    onTouchStart: e => e.preventDefault(),
  };
}
@connect(
  state => state,
  {setShowHeader,setShowFooterShare}
)
class Gotop extends Component {
  constructor(props) {
    super(props)
    this.state = {
      show: false,
      showBtn: false,
      showShar: false,
      open: false,
      // shared: false,
      localUrl: '',
      hideShare: false
    }
  }
  componentDidMount() {
    // 监听滚动事件
    window.addEventListener('scroll', this.move)
    window.addEventListener('touchmove', (f) => f, { passive: false })
    // this.goTo();
  }
  componentWillReceiveProps(nextProps) {
    //当路由切换时
    console.log('nextProps.location,this.props.location', nextProps.location, this.props.location)
    this.hideShare();
    if (this.props.location.pathname !== nextProps.location.pathname) {
      this.setState({
        showBtn: false,
      })
    }
  }
  componentWillMount() {
    this.hideShare();
  }
  componentWillUnmount() {
    // 清除定时器，移出监听事件
    window.clearInterval(scrollToTop);
    window.removeEventListener("scroll", this.move, false);
  }
  hideShare() {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/mine')) {
      this.setState({
        hideShare: true,
        showShar: false,
        showBtn: false
      })
    } else {
      this.setState({
        hideShare: false,
        // showShar: true,
        // showBtn: true
      })
    }
  }
  move = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.setState({
      show: scrollTop > 400,
    })
  }
  goTo() {
    window.scrollTo(0, 0);
    scrollToTop = window.setInterval(function () {
      let pos = window.pageYOffset;
      if (pos > 0) {
        window.scrollTo(0, pos - 20);
      } else {
        window.clearInterval(scrollToTop);
      }
    }, 2);
  }
  changeShowShar() {
    this.setState({
      showShar: !this.state.showShar
    })
  }
  changeShowBtn() {
    // this.showActionSheet()
    // this.onOpenChange() 
    // return
    if(this.props.showHeader.isShow) {
      this.props.setShowHeader(false)
      window.myModal1()
    }
    this.setState({
      showBtn: !this.state.showBtn
    })
  }
  // onOpenChange = (...args) => {
  //   console.log(args);
  //   this.setState({ open: !this.state.open });
  // }

  // showActionSheet = () => {
  //   const BUTTONS = ['Operation1', 'Operation2', 'Operation2', 'Delete', 'Cancel'];
  //   ActionSheet.showActionSheetWithOptions({
  //     options: BUTTONS,
  //     // cancelButtonIndex: BUTTONS.length - 1,
  //     // destructiveButtonIndex: BUTTONS.length - 2,
  //     // title: 'title',
  //     // message: 'I am description, description, description',
  //     maskClosable: true,
  //     'data-seed': 'logId',
  //     wrapProps,
  //   },
  //   (buttonIndex) => {
  //     // this.setState({ clicked: BUTTONS[buttonIndex] });
  //   });
  // }

  handleShare(type) {
    if (type === 'qqzone') {
      share('qzone')
    } else if(type === 'weibo'){
      share('sinaminiblog')
    }else{
      this.props.setShowFooterShare(true)
      this.setState({
        showBtn: false,
        // shared: true,
        localUrl: window.location.href
      },()=>window.myModal())
    }
  }

  handleCancel() {
    this.props.setShowFooterShare(false)
    this.setState({
      // shared: false,
      localUrl: ''
    },() => window.myModal1())
  }

  render() {
    const notShow = ['/forgetpwd', '/login', '/register']
    const pathname = window.location.pathname
    if (notShow.indexOf(pathname) !== -1) {
      return null
    }
    const { show, showShar, showBtn, shared, localUrl, hideShare } = this.state
    const blurData = this.props.blurData
    const {isShowFooterShare} = this.props.showHeader
    return (
      // null
      <div
        className="fiexd-btn"
        // style={{position:blurData.isBF == 1 ? 'absolute' : 'fixed'}}
        // style={{bottom:blurData.isBF == 1 ? '0' : ''}}
        style={{ display: blurData.isBF == 1 ? 'none' : 'block' }}
      >
      {/* {} */}
      {/* <div style={{color:'#000'}}>
        {this.state.aa2}--{this.state.aa1}
      </div> */}
        {/* <div className="top-btn" style={{ height: showBtn ? 'auto' : null, }}>
          {
            showBtn ?
              <ul>
                {
                  showShar ?
                    <li>
                      <div className="fz" onClick={this.handleShare.bind(this, 'qq')}>
                        <img src={require(`../../../imgs/home-btn8.png`)} alt="img" />
                      </div>
                      <div className="fz" onClick={this.handleShare.bind(this, 'qqzone')}>
                        <img src={require(`../../../imgs/home-btn7.png`)} alt="img" />
                      </div>
                      <div className="fz" onClick={this.handleShare.bind(this, 'weibo')}>
                      <img src={require(`../../../imgs/home-btn6.png`)} alt="img" />
                      <img src={require(`../../../imgs/gotop-wb.png`)} alt="img" />
                      </div>
                    </li>
                    :
                    <li>
                      <div className="fix-btn" onClick={() => this.props.history.push('/3d/room')}>
                        <img src={require(`../../../imgs/home-btn5.png`)} alt="img" />
                        <span>数字<br />展厅</span>
                      </div>
                      <div className="fix-btn" onClick={() => this.props.history.push('/buycar/shijia')}>
                        <img src={require(`../../../imgs/home-btn4.png`)} alt="img" />
                        <span>预约<br />试驾</span>
                      </div>
                      <div className="fix-btn" onClick={() => this.props.history.push('/buycar/chaxunjxs')}>
                        <img src={require(`../../../imgs/home-btn3.png`)} alt="img" />
                        <span>经销商<br />查询</span>
                      </div>
                    </li>
                }
                {
                  !hideShare && (
                    <li className="fix-btn" onClick={() => this.changeShowShar()}>
                      <img src={require(`../../../imgs/home-btn2.png`)} alt="img" />
                      <span>分享</span>
                    </li>
                  )
                }

              </ul>
              : null
          }
          <div className="open" onClick={() => this.changeShowBtn()}>
            <img src={require(`../../../imgs/home-btn1.png`)} alt="img" />
          </div>
        </div> */}
        <div className='gotop'>
          {show && <div className="goback-btn" onClick={this.goTo}>
            返回顶部
              </div>}
        </div>
        {/* <div className={isShowFooterShare ? 'share in' : 'share'}>
          <div>
            <div className="title">长按复制链接，去粘贴给给好友吧～</div>
            <div className="url">{localUrl}</div>
            <div className="line"></div>
          </div>
          <a href="javascript:void(0)" onClick={this.handleCancel.bind(this)} className="btn_cancel">取消</a>
        </div> */}
        {/* <Drawer
            className="my-drawer-gotop"
            style={{ minHeight: 'auto' }}
            enableDragHandle
            contentStyle={{ color: '#A6A6A6', textAlign: 'center', paddingTop: 42 }}
            sidebar='{sidebar}'
            position='bottom'
            open={this.state.open}
            onOpenChange={this.onOpenChange}
          >
            Click upper-left corner
          </Drawer> */}
      </div>

    );
  }
}

export default withRouter(Gotop);
