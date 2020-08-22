import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Tabs, Button, Toast } from 'antd-mobile'
import { MyInput } from '../../components/dataview'
import { loginApi } from './api'
import debounce from 'lodash/debounce';
import { getParamsObj } from '../../utils/util'

import './index.less'
class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginType: 0,
      picCodeImg: null,
      codekey: null,
      seconds: 60,
      isShowSendBtn: true,
      canPostPhoneCode: false,
    }
    // this.onChangelogintype = this.onChangelogintype.bind(this)
    this.onHandleChange = this.onHandleChange.bind(this)
    this.getPicCodeData = this.getPicCodeData.bind(this)
    this.getPhoneCode = debounce(this.getPhoneCode, 500);
  }
  componentDidMount() {
    this.getPicCodeData()
  }
  componentWillUnmount() {
    clearInterval(this.interval)
    localStorage.removeItem('redirectUrl')
    localStorage.removeItem('tabsIndex')
    localStorage.removeItem('fansOneIndex')
  }
  interval = null
  onHandleChange(type, v) {
    if (type === 'picnum' && v.length === 4) {
      // 校验图片验证码，成功才能发送手机验证码
      const opt = {
        codeKey: this.state.codekey,
        signCode: v,
      }
      loginApi.checkImageCode(opt)
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
  onChangelogintype(v, i) {
    this.setState({
      loginType: i,
    })
  }
  goLogin = () => {
    // loginApi.logout()
    if (this.state.loginType === 0) {
      this.goLogin1()
    } else {
      this.goLogin2()
    }
  }
  goLogin1 = () => {
    const data = this.state
    if (!data.phone) {
      Toast.info('请输入手机号！', 1)
      return
    } else {
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(data.phone)) {
        Toast.info('请输入正确的手机号！', 1)
        return
      }
    }
    if (!data.code) {
      Toast.info('请输入短信验证码！', 1)
      return
    }
    if (!data.picnum) {
      Toast.info('请输入图片验证码！', 1)
      return
    }
    const opt = {
      imgCodeKey: data.codekey,
      imgVerificationCode: data.picnum,
      mobile: data.phone,
      mobileVerificationCode: data.code,
    }
    console.log(opt)
    loginApi.login1(opt).then(res => {
      console.log(res)
      if (res && res.code == '0') {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        let url = '/mine'
        const redirectUrl = localStorage.getItem('redirectUrl')
        const tabsIndex = localStorage.getItem('tabsIndex')
        const fansOneIndex = localStorage.getItem('fansOneIndex')
        if (redirectUrl) {
          if (tabsIndex || tabsIndex == 0) {
            if (redirectUrl.indexOf('?') > -1) {
              url = `${redirectUrl}&tabsIndex=${tabsIndex}`
            } else {
              url = `${redirectUrl}?tabsIndex=${tabsIndex}`
            }
          } else if (fansOneIndex) {
            url = `${redirectUrl}?fansOneIndex=${fansOneIndex}`
          } else {
            url = redirectUrl
          }
          localStorage.removeItem('redirectUrl')
          localStorage.removeItem('tabsIndex')
          localStorage.removeItem('fansOneIndex')
        }
        window.location.href = url
      }
    })
  }
  goLogin2 = () => {
    const data = this.state
    if (!data.phone) {
      Toast.info('请输入手机号！', 1)
      return
    } else {
      if (!/^1[3|4|5|7|8][0-9]{9}$/.test(data.phone)) {
        Toast.info('请输入正确的手机号！', 1)
        return
      }
    }
    if (!data.pwd) {
      Toast.info('请输入密码！', 1)
      return
    }
    const opt = {
      mobile: data.phone,
      password: data.pwd,
    }
    console.log(opt)
    loginApi.login2(opt).then(res => {
      console.log(res)
      if (res && res.code === '0') {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        let url = '/mine'
        const redirectUrl = localStorage.getItem('redirectUrl')
        const tabsIndex = localStorage.getItem('tabsIndex')
        const fansOneIndex = localStorage.getItem('fansOneIndex')
        if (redirectUrl) {
          if (tabsIndex || tabsIndex == 0) {
            if (getParamsObj(redirectUrl).tabsIndex || getParamsObj(redirectUrl).tabsIndex == 0) {
              url = redirectUrl
            } else {
              url = `${redirectUrl}?tabsIndex=${tabsIndex}`
            }
          } else if (fansOneIndex) {
            url = `${redirectUrl}?fansOneIndex=${fansOneIndex}`
          } else {
            url = redirectUrl
          }
          localStorage.removeItem('redirectUrl')
          localStorage.removeItem('tabsIndex')
          localStorage.removeItem('fansOneIndex')
        }
        window.location.href = url
        // this.props.history.push('/')
      }
    })
  }
  getPhoneCode() {
    if (!this.state.phone) {
      Toast.info('请输入手机号！', 1)
      return
    }
    if (!this.state.canPostPhoneCode) {
      Toast.info('请输入正确的图片验证码！', 1)
      return
    }
    const data = this.state
    if (!data.isShowSendBtn) {
      return
    }
    const opt = {
      mobile: data.phone,
      sendCodeType: 'login'
    }
    loginApi.sendMobileCode(opt).then(res => {
      console.log(res)
      if (res && res.code == '0') {
        this.setState({
          isShowSendBtn: false
        })
        this.interval = setInterval(() => this.tick(), 1000)
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
  getPicCodeData() {
    loginApi.getPicCode().then(res => {
      if (res && res.code === '0') {
        this.setState({
          picCodeImg: res.data.imgData,
          codekey: res.codekey
        })
      }
    })
  }
  render() {
    const { picCodeImg, isShowSendBtn, seconds, canPostPhoneCode } = this.state
    return (
      <div className='login'>
        <div className="c">
          <h3>登录</h3>
          <div className="tab-content">
            <Tabs
              tabs={[{ title: '快捷登录' }, { title: '账号登录' }]}
              animated={false}
              swipeable={false}
              useOnPan={false}
              onChange={(v, i) => this.onChangelogintype(v, i)}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} />}
            />
          </div>
          <div className="icon-input icon-input-phone mt-4">
            <MyInput
              value={this.state.phone}
              ruleName='phone'
              onChange={(v) => this.onHandleChange('phone', v)}
              placeholder='请输入手机号码'
              maxLength={11}
            />
          </div>
          {
            this.state.loginType === 0 ?
              <div>
                <div className="icon-input icon-input-picnum">
                  <MyInput
                    value={this.state.picnum}
                    onChange={(v) => this.onHandleChange('picnum', v)}
                    placeholder='请输入图形验证码'
                    // ruleName='letterNum'
                    maxLength={4}
                  />
                  <span className="picnum-btn" onClick={this.getPicCodeData}>
                    {picCodeImg && <img src={picCodeImg} alt="" />}
                  </span>
                </div>
                <div className="icon-input icon-input-msg">
                  <MyInput
                    value={this.state.code}
                    onChange={(v) => this.onHandleChange('code', v)}
                    placeholder='请输入手机验证码'
                  />
                  <span className={canPostPhoneCode ? 'get-btn able' : 'get-btn'} onClick={() => this.getPhoneCode()}
                  >
                    {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                  </span>
                </div>
              </div>
              :
              <div className="icon-input icon-input-pwd">
                <MyInput
                  type='password'
                  value={this.state.pwd}
                  onChange={(v) => this.onHandleChange('pwd', v)}
                  placeholder='请输入您的密码'
                />
              </div>
          }
          {
            this.state.loginType === 1 &&
            <div className="forget-link">
              <Link to={`/forgetpwd`}>忘记密码？</Link>
            </div>
          }
          <div className="my-btn">
            <Button onClick={() => this.goLogin()}>登录</Button>
          </div>
          <div className="toregister">
            如果您还没有账号，请
            <Link to={`/register`}>注册</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
