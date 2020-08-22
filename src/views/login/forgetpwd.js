import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Tabs, Button, Toast } from 'antd-mobile'
import { MyInput, MyInput2 } from '../../components/dataview'
import { loginApi } from './api'
import {rule} from '../../utils/rules'
import config from '../../config.json';


import './index.less'
class Forgetpwd extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      picCodeImg: null,
      codeKey: null,
      seconds: 60,
      isShowSendBtn: true,
      canPostPhoneCode: false,
    }
    this.onHandleChange = this.onHandleChange.bind(this)
    this.getPicCodeData = this.getPicCodeData.bind(this)
  }
  componentDidMount() {
    this.getPicCodeData()
    document.title = '忘记密码'
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
  onChangeStep(step) {
    const data = this.state
    console.log(step)
    if (step === 2) {
      if (!data.phone) {
        Toast.info('请输入手机号！', 1)
        return
      }else{
        if(!/^1[3|4|5|7|8][0-9]{9}$/.test(data.phone)){
          Toast.info('请输入正确的手机号！', 1)
          return
        }
      }
      if (!data.picnum) {
        Toast.info('请输入图形验证码！', 1)
        return
      }
      if (!data.code) {
        Toast.info('请输入手机验证码！', 1)
        return
      }
      const opt = {
        imgCodeKey: data.codekey,
        imgVerificationCode: data.picnum,
        mobile: data.phone,
        mobileVerificationCode: data.code,
      }
      loginApi.findPasswordCheck(opt)
        .then(res => {
          if (res && res.code == 0) {
            this.setState({
              step: 2,
            })
          }
        })
    }
    if (step === 3) {
      if(!data.pwd) {
        Toast.info('请输入密码！', 1)
        return
      }
      if(!data.pwdt) {
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
      const opt = {
        imgCodeKey: data.codekey,
        imgVerificationCode: data.picnum,
        mobile: data.phone,
        mobileVerificationCode: data.code,
        password: data.pwd,
        surePassword: data.pwdt
      }
      loginApi.findPassword(opt).then(res => {
        console.log(res)
        if (res && res.code === '0') {
          this.setState({
            step: 3,
          })
        } else {
          this.setState({
            step: 2,
          })
        }
      })
    }

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
  // findPassword = () => {
  //   const data = this.state
  //   const opt = {
  //     imgCodeKey: data.codekey,
  //     imgVerificationCode: data.picnum,
  //     mobile: data.phone,
  //     mobileVerificationCode: data.code,
  //   }
  //   console.log(opt)

  // }
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
      sendCodeType: 'findPassword'
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
    const { picCodeImg, isShowSendBtn, seconds, step, canPostPhoneCode } = this.state
    console.log(this.props)
    return (
      <div className='login'>
        <div className="c">
          <div className = 'title'>
            <h3>Oh no!</h3>
            <p>密码走丢了,别担心～</p>
            <span></span>
          </div>
          
          {
            step === 1 &&
            <div className='fpwd-box' style = {{padding: '0 0.5rem'}}>
              <div className="icon-input icon-input-phone mt-4">
                <MyInput2
                  value={this.state.phone}
                  ruleName='phone'
                  onChange={(v) => this.onHandleChange('phone', v)}
                  placeholder='请输入手机号码'
                  maxLength={11}
                />
              </div>
              <div className="icon-input icon-input-picnum">
                <MyInput2
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
                <MyInput2
                  value={this.state.code}
                  onChange={(v) => this.onHandleChange('code', v)}
                  placeholder='请输入手机验证码'
                />
                <span className={canPostPhoneCode?'get-btn able':'get-btn'} onClick={() => this.getPhoneCode()}>
                  {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                </span>
              </div>
            </div>
          }
          {
            step === 2 &&
            <div className='fpwd-box'>
              <div className="icon-input icon-input-pwd">
                <MyInput2
                  type='password'
                  value={this.state.pwd}
                  onChange={(v) => this.onHandleChange('pwd', v)}
                  placeholder='请设置您的密码'
                />
              </div>
              <div className="icon-input icon-input-pwdt">
                <MyInput2
                  type='password'
                  value={this.state.pwdt}
                  onChange={(v) => this.onHandleChange('pwdt', v)}
                  placeholder='请再次确认密码'
                />
              </div>
            </div>
          }
          {
            step === 3 &&
            <div className="success fpwd-box">
              <div className="img">
                <img src={require('../../imgs/login-success.png')} alt="" />
              </div>
              <div className="txt">
                重设密码成功
                </div>
            </div>
          }
          {
            step <= 2 ?
              <div className="my-btn">
                <Button onClick={() => this.onChangeStep(step + 1)}>
                  {step === 1 ? '下一步' : '提交'}
                </Button>
              </div>
              :
              <div className="my-btn">
                <Button onClick={() => {
                  window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
                }}>
                  去登录
                </Button>
              </div>
          }
        </div>
      </div>
    );
  }
}
export default Forgetpwd;
