import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Toast, Button } from 'antd-mobile'
import { MyInput, MySwitch } from '../../components/dataview'
import { connect } from 'react-redux'
import { loginApi } from './api'
import UserAgreement from '../../components/useragreement/index';
import {rule} from '../../utils/rules'
import './index.less'
// import { setScrollApp, closeModal } from '../../redux/scroll.redux';
import {closeModal,openModal} from '../../utils/setModal';
// @connect(
//   state => state,
//   { setScrollApp,closeModal }
// )
class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginType: 0,
      agree: true,
      picCodeImg: null,
      codekey: null,
      seconds: 60,
      isShowSendBtn: true,
      canPostPhoneCode: false,
      showUser: false
    }
    this.onHandleChange = this.onHandleChange.bind(this)
    this.getPicCodeData = this.getPicCodeData.bind(this)
  }
  componentDidMount() {
    this.getPicCodeData()
    // this.interval = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.interval)
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
  goRegister() {
    const data = this.state
    if (!data.phone) {
      Toast.info('请输入手机号！', 1)
      return
    }else{
      if(!/^1[3|4|5|7|8][0-9]{9}$/.test(data.phone)){
        Toast.info('请输入正确的手机号！', 1)
        return
      }
    }
    if(!data.picnum) {
      Toast.info('请输入图片验证码！', 1)
      return
    }
    if (!data.code) {
      Toast.info('请输入短信验证码！', 1)
      return
    }
    if (!data.pwd) {
      Toast.info('请输入密码！', 1)
      return
    }
    if (!data.pwdt) {
      Toast.info('请输入确认密码！', 1)
      return
    }
    if (data.pwd !== data.pwdt) {
      Toast.info('两次密码输入不一致，请检查！', 1)
      return
    }
    if(!rule.pwd(data.pwd )) {
      Toast.info('请输入6-20位数字和字母的组合！', 1)
      return
    }
    if (!data.agree) {
      Toast.info('请阅读协议！', 1)
      return
    }
    const opt = {
      imgCodeKey: data.codekey,
      imgVerificationCode: data.picnum,
      loginName: data.username,
      mobile: data.phone,
      mobileVerificationCode: data.code,
      password: data.pwd,
      surePassword: data.pwdt,
    }
    localStorage.setItem('userInfo', JSON.stringify(opt))
    loginApi.register(opt).then(res => {
      console.log(res)
      if (res && res.code === '0') {
        localStorage.setItem('userInfo', JSON.stringify(res.data))
        let url = '/mine'
        const redirectUrl = localStorage.getItem('redirectUrl')
        const tabsIndex = localStorage.getItem('tabsIndex')
        if (redirectUrl) {
          if(tabsIndex+'') {
            url = `${redirectUrl}?tabsIndex=${tabsIndex}`
          }else {
            url = redirectUrl
          }
          localStorage.removeItem('redirectUrl')
          localStorage.removeItem('tabsIndex')
        }
        window.location.href = url

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
      sendCodeType: 'register'
    }
    loginApi.sendMobileCode(opt).then(res => {
      console.log(res)
      if (res && res.code === '0') {
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
  render() {
    const { picCodeImg, isShowSendBtn, seconds, canPostPhoneCode } = this.state
    return (
      <div className='login'>
        <div className="c">
          <h3>注册</h3>
          <div className="icon-input icon-input-phone mt-4">
            <MyInput
              value={this.state.phone}
              ruleName='phone'
              maxLength={11}
              onChange={(v) => {
                this.onHandleChange('phone', v)
              }}
              placeholder='请输入手机号码'
            />
          </div>
          <div className="icon-input icon-input-picnum">
            <MyInput
              value={this.state.picnum}
              onChange={(v) => this.onHandleChange('picnum', v)}
              placeholder='请输入图形验证码'
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
            <span className={canPostPhoneCode?'get-btn able':'get-btn'} onClick={() => this.getPhoneCode()}>
              {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
            </span>
          </div>
          <div className="icon-input icon-input-user">
            <MyInput
              value={this.state.username}
              onChange={(v) => this.onHandleChange('username', v)}
              placeholder='请输入用户名'
            />
          </div>
          <div className="icon-input icon-input-pwd">
            <MyInput
              type='password'
              value={this.state.pwd}
              onChange={(v) => this.onHandleChange('pwd', v)}
              placeholder='请设置您的密码'
            />
          </div>
          <div className="icon-input icon-input-pwdt">
            <MyInput
              type='password'
              value={this.state.pwdt}
              onChange={(v) => this.onHandleChange('pwdt', v)}
              placeholder='请再次确认密码'
            />
          </div>
          <div className="agree">
            <MySwitch
              label='我已阅读并同意'
              value={this.state.agree}
              onChange={(v) => {
                this.setState({ agree: !this.state.agree })
              }}
            />
            <span onClick={() => {
              // openModal()
              window.myModal()
              console.log(window.oobj)
              this.setState({ showUser: true })
            }}>
              《一汽丰田用户注册协议》
            </span>
          </div>
          <UserAgreement show={this.state.showUser} close={() => {
            this.setState({ showUser: false },() => window.myModal1())
          }} />
          <div className="my-btn">
            <Button
              onClick={() => this.goRegister()}
            >注册</Button>
          </div>
          <div className="toregister">
            如果您已有账号，请
          <Link to={`/login`}>登录</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
