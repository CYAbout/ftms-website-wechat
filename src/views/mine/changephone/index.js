import React, { Component, Fragment } from 'react';
import UserLayout from '../components/layout';
import { Button, Modal, Toast } from 'antd-mobile';
import UserAlert from '../components/alert';
import { userApi } from '../api'
import {
  MyInput
} from '../../../components/dataview/';
import MyBack from '../components/back';
import config from '../../../config.json';

import './index.less';

class ChangePhone extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      picCodeImg: null,
      codeKey: null,
      seconds: 60,
      seconds2: 60,
      isShowSendBtn: true,
      isShowSendBtn2: true,
      canPostPhoneCode: false,
      userInfo: {},
      showMobile: ''
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
    this.getPicCodeData = this.getPicCodeData.bind(this);
  }

  componentDidMount() {
    this.getPicCodeData()
    const userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      const user = JSON.parse(userInfo);
      const showMobile = user.mobile ? user.mobile.substring(0, 3) + '****' + user.mobile.substring(7) : '';
      this.setState({
        userInfo: user,
        showMobile,
        // canPostPhoneCode: showMobile ? true : false
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval)
    clearInterval(this.interval2)
  }
  interval = null
  interval2 = null
  onChangeHandle(type, v) {
    if (type === 'imgVerificationCode') {
      this.setState({
        canPostPhoneCode: false
      })
    }
    if (type === 'imgVerificationCode' && v.length === 4) {
      // 校验图片验证码，成功才能发送手机验证码
      const opt = {
        codeKey: this.state.codekey,
        signCode: v,
      }
      userApi.checkImageCode(opt)
        .then(res => {
          console.log(res)
          if (res && res.code == '0') {
            this.setState({
              canPostPhoneCode: true
            })
          }
        })
    }
    this.setState({
      [type]: v
    })
  }

  handleSubmit() {
    const data = this.state
    if (!data.userInfo.mobile ||
      !data.oldMobileVerificationCode
      || !data.imgVerificationCode
      || !data.mobile
      || !data.mobileVerificationCode) {
      Toast.info('请完善信息！', 1)
      return
    }
    const opt = {
      oldMobile: data.userInfo.mobile,
      oldMobileVerificationCode: data.oldMobileVerificationCode,
      mobile: data.mobile,
      mobileVerificationCode: data.mobileVerificationCode,
      imgCodeKey: data.codeKey,
      imgVerificationCode: data.imgVerificationCode,
    }
    userApi.updateMobile(opt)
      .then(res => {
        if (res && res.code === '0') {
          this.setState({
            visible: true
          })
          window.myModal()
        }
      })
  }

  jumpTo() {
    localStorage.clear();
    // this.props.history.push('/login');
    window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
  }
  getPicCodeData() {
    userApi.getPicCode().then(res => {
      if (res && res.code === '0') {
        this.setState({
          picCodeImg: res.data.imgData,
          codekey: res.codekey
        })
      }
    })
  }
  getPhoneCode(type) {
    const data = this.state
    const opt = {
    }
    if (type === 'new') {
      if (!data.mobile) {
        Toast.info('请输入新手机号！', 1)
        return
      }
      if (!data.isShowSendBtn2) {
        return
      }
      opt.mobile = data.mobile
      opt.sendCodeType = 'changeMobileNew'
      if (!data.canPostPhoneCode) {
        Toast.info('请输入图片验证码！', 1)
        return
      }
    }
    if (type === 'old') {
      if (!data.userInfo.mobile) {
        Toast.info('请输入原手机号！', 1)
        return
      }
      if (!data.isShowSendBtn) {
        return
      }
      opt.mobile = data.userInfo.mobile
      opt.sendCodeType = 'changeMobileOld'
    }
    userApi.sendMobileCode(opt).then(res => {
      console.log(res)
      if (res && res.code === '0') {
        if (type === 'new') {
          this.setState({
            isShowSendBtn2: false
          })
          this.interval2 = setInterval(() => this.tick2(), 1000)
        } else {
          this.setState({
            isShowSendBtn: false
          })
          this.interval = setInterval(() => this.tick(), 1000)
        }
      }
    })
  }
  tick() {
    if (this.state.seconds <= 1) {
      this.setState({
        seconds: 60,
        isShowSendBtn: true
      })
      clearInterval(this.interval);
      return
    }
    this.setState((prevState) => ({
      seconds: prevState.seconds - 1
    }));
  }
  tick2() {
    if (this.state.seconds2 <= 1) {
      this.setState({
        seconds2: 60,
        isShowSendBtn2: true
      })
      clearInterval(this.interval2);
      return
    }
    this.setState((prevState) => ({
      seconds2: prevState.seconds2 - 1
    }));
  }
  render() {
    const { carInfo, step, showMobile, picCodeImg, canPostPhoneCode, isShowSendBtn, isShowSendBtn2, seconds, seconds2 } = this.state;

    return (
      <UserLayout>
        <div className='mine_change_phone'>
          <div className="ver_title"><MyBack />更换手机号</div>
          <div className="ver_line"></div>
          <div className="card form">
            <ul>
              <li className="label_box">
                <div className="l">原手机号码：</div>
                <div className="r">
                  <MyInput
                    placeholder='请输入原手机号码'
                    maxLength={11}
                    ruleName='phone'
                    value={showMobile}
                    onChange={(v) => this.onChangeHandle('oldMobile', v)}
                  />
                </div>
              </li>
              <li className="label_box">
                <div className="l">输入验证码：</div>
                <div className="r relative">
                  <MyInput
                    placeholder='请输入验证码'
                    maxLength={6}
                    value={this.state.oldMobileVerificationCode}
                    onChange={(v) => this.onChangeHandle('oldMobileVerificationCode', v)}
                  />
                  <div className="btn_link">
                    <div className="hori_line"></div>
                    <a href="javascript:void(0);" onClick={() => this.getPhoneCode('old')}>
                      {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                    </a>
                  </div>
                </div>
              </li>
              <li className="label_box">
                <div className="l">新手机号码：</div>
                <div className="r">
                  <MyInput
                    placeholder='请输入新手机号码'
                    maxLength={11}
                    ruleName='phone'
                    value={this.state.mobile}
                    onChange={(v) => this.onChangeHandle('mobile', v)}
                  />
                </div>
              </li>
              <li className="label_box">
                <div className="l">图片验证码：</div>
                <div className="r relative">
                  <MyInput
                    placeholder='请输入验证码'
                    maxLength={4}
                    value={this.state.imgVerificationCode}
                    onChange={(v) => this.onChangeHandle('imgVerificationCode', v)}
                  />
                  <div className="btn_link" onClick={this.getPicCodeData}>
                    <div className="hori_line"></div>
                    <a href="javascript:void(0);">
                      {picCodeImg && <img src={picCodeImg} alt="" />}
                    </a>
                  </div>
                </div>
              </li>
              <li className="label_box">
                <div className="l">输入验证码：</div>
                <div className="r relative">
                  <MyInput
                    placeholder='请输入验证码'
                    maxLength={6}
                    value={this.state.mobileVerificationCode}
                    onChange={(v) => this.onChangeHandle('mobileVerificationCode', v)}
                  />
                  <div className="btn_link">
                    <div className="hori_line"></div>
                    <a href="javascript:void(0);" onClick={() => this.getPhoneCode('new')} style={{ color: canPostPhoneCode ? '#d3b07a' : '#aaa' }}>
                      {isShowSendBtn2 ? '获取验证码' : `${seconds2}s后获取`}
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={this.handleSubmit}>立即更换</Button>
              </div>
            </div>
          </div>
          <div className="desc">
            <p className="label">操作提示：</p>
            <div className="desc_text">
              <p>1、更换绑定手机，需要原手机号码，原手机号码无法接受短信，请拨打客服电话800-810-1210。</p>
              <p>2、手机更换后，同时更改会员的登录账号，更换后请牢记新手机号码</p>
            </div>
          </div>
        </div>
        <Modal
          className='my-modal app-modal-box'
          visible={this.state.visible}
          closable={false}
          transparent
        // onClose={() => this.setState({ visible: false })}
        // maskClosable={true}
        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <UserAlert
            text={'手机号更换成功，请重新登录'}
            click={this.jumpTo}
          />
        </Modal>
      </UserLayout>
    );
  }
}

export default ChangePhone;
