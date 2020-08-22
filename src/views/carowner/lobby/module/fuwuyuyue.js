import React, { Component } from 'react';
import { Button, Toast, Modal } from 'antd-mobile'
import { loginApi } from '../../../login/api'
import { getParamsObj } from '../../../../utils/util'
import {
  MyInput,
  MySelect,
  MyDate,
  MyInputarea,
  MyRadio,
  MySwitch,
  MyCheckBox

} from '../../../../components/dataview/'
import Jingxiaoshang from '../../../../components/jingxiaoshang'
import moment from 'moment'
import { withRouter } from 'react-router-dom'
import UserAgreement from '../../../../components/useragreement/index';

@withRouter
class Fuwuyuyue extends Component {
  constructor(props) {
    super(props)
    this.state = {
      carList: [],
      userData: {},
      seconds: 60,
      isShowSendBtn: true,
      showUser: false,
      defaultMobile: '',
      mobileChanged: false,
      gongliArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(v => ({ label: v, value: v })),
      modalToLink: props.type === 'two' ? '/mine/appointment/maintain' : (this.props.type === 'three' ? '/mine/appointment/repair' : '/mine/appointment/testDrive'),
      // clickFlag: false
    }
  }

  componentWillReceiveProps(nextprops) {
    const { defaultMobile } = this.state;
    if (nextprops.tel && nextprops.tel.length === 11 && !defaultMobile) {
      this.setState({
        defaultMobile: nextprops.tel
      })
    }
  }

  componentDidMount() {
    // this.getUserInfo()
    let params = getParamsObj();

    switch(params.tabIndex) {
      case '0':
        document.title = '保养计划';
        break;
      case '1':
        document.title = '预约保养';
        break;
      case '2':
        document.title = '预约维修';
        break;
      case '3':
        document.title = '违章查询';
        break;
      case '4':
        document.title = '紧急救援';
        break;
    }
  }
  componentWillUnmount() {
    // this.setState({
    //   clickFlag: false
    // })
  }
  shouldComponentUpdate(nextprops, nextState) {
    if (nextState.seconds !== this.state.seconds) {
      // return false
    }
    return true
  }
  interval = null
  getPhoneCode() {
    const codeType = this.props.type === 'two' ? 'upkeep' : (this.props.type === 'three' ? 'maintenance' : 'testDrive')
    const data = this.state
    console.log(this.props)
    if (!this.props.tel) {
      Toast.info('请输入手机号！', 1)
      return
    }
    if (!data.isShowSendBtn) {
      return
    }
    const opt = {
      mobile: this.props.tel,
      sendCodeType: codeType
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
  handleMobileChange(val) {
    let mobileChanged = false;
    if (val !== this.state.defaultMobile) {
      mobileChanged = true;
    }
    this.setState({
      mobileChanged
    }, () => {
      this.props.onChangeHandle('mobileChanged', mobileChanged)
      this.props.onChangeHandle('tel', val)
    })
  }
  render() {
    const { seconds, isShowSendBtn, mobileChanged } = this.state
    return (
      <div className='fuwuyuyue'>
        <h3 className='title'>
          个人信息
        </h3>
        <div className="my-line-m" />
        <div className="label-box ">
          <div className='l label-must justify'>
            填写您的姓<div>名：</div>
          </div>
          <div className="r">
            <MyInput
              value={this.props.name}
              placeholder='请输入姓名'
              // ruleName='name'
              maxLength={10}
              onChange={(v) => this.props.onChangeHandle('name', v)}
            />
          </div>
        </div>
        <div className="label-box sex-checked">
          <div className='l '>
          </div>
          <div className="r ">
            <MyRadio
              value={this.props.sex}
              data={this.props.sexData}
              onChange={(v) => this.props.onChangeHandle('sex', v)}
            />
          </div>
        </div>
        <div className="label-box">
          <div className='l label-must justify'>
            填写您的手<div>机：</div>
          </div>
          <div className="r icon-input">
            <MyInput
              value={this.props.tel}
              ruleName='phone'
              placeholder='请输入手机号'
              maxLength={11}
              onChange={(v) => this.handleMobileChange(v)}
            />
            {
              mobileChanged && (
                <span style={{ color: isShowSendBtn ? '#000' : '#ccc' }} className="get-btn" onClick={() => this.getPhoneCode()}>
                  {isShowSendBtn ? '获取验证码' : `${seconds}s后获取`}
                </span>
              )
            }
          </div>
        </div>
        {
          mobileChanged && (
            <div className="label-box ">
              <div className='l label-must justify'>
                填写验证<div>码：</div>
              </div>
              <div className="r">
                <MyInput
                  value={this.props.code}
                  placeholder='请输入手机验证码'
                  maxLength={6}
                  ruleName='num'
                  onChange={(v) => this.props.onChangeHandle('code', v)}
                />
              </div>
            </div>
          )
        }
        <h3 className='title pt-4'>
          {this.props.type == 'shijia' ? '试驾信息' : '预约信息'}
        </h3>
        <div className="my-line-m" />
        <ul>
          <li className='label-box'>
            <div className='l label-must justify'>
              选择车<div>型：</div>
            </div>
            <div className="r">
              <MySelect
                extra="请选择车型"
                value={this.props.cid}
                data={this.props.carType}
                onChange={(v) => this.props.onChangeHandle('cid', v)}
              />
            </div>
          </li>
          <li className='label-box'>
            <div className='l label-must justify'>
              预约{this.props.type == 'shijia' ? '试驾' : ''}时<div>间：</div>
            </div>
            <div className="r">
              <MyDate
                extra="请选择预约时间"
                mode='datetime'
                format='YYYY-MM-DD HH:mm'
                minDate={new Date(moment().get('year'), moment().get('month'), moment().get('date') + 1, 0, 0, 0)}
                maxDate={moment().get('month')+6>12?new Date(moment().get('year')+1, moment().get('month')-6, moment().get('date') + 1, 23, 59, 0):new Date(moment().get('year'), moment().get('month')+6, moment().get('date') + 1, 23, 59, 0)}
                value={this.props.gotime}
                onChange={(v) => this.props.onChangeHandle('gotime', v)}
              />
            </div>
          </li>
          {/* <li className='label-box'>
            <div className='l'>
            </div>
            <div className="r">
              <MySelect
                extra="请选择预约时间"
                value={this.props.type3}
                data={this.props.data3}
                onChange={(v) => this.props.onChangeHandle('type3', v)}
              />
            </div>
          </li> */}
          {this.props.type == 'shijia' ? null : <li className='label-box'>
            <div className='l label-must justify'>
              行驶里<div>程：</div>
            </div>
            <div className="r licheng">
              {/* <MyInput
                placeholder="请填写行驶公里数"
                ruleName='count'
                value={this.props.mileage}
                onChange={(v) => this.props.onChangeHandle('mileage', v)}
              /> */}
              <MySelect
                extra="请选择行驶公里数"
                value={this.props.drivingMileage}
                data={this.state.gongliArr}
                onChange={(v) => this.props.onChangeHandle('drivingMileage', v)}
              />
            </div>
          </li>}
          {/* {
            this.props.type === 'two' &&
            <li className='label-box by-checkbox-box'>
              <div className='l label-must justify'>
                推荐保养项<div>目：</div>
                </div>
              <div className="r by-checkbox">
                <MyCheckBox
                  data={this.props.baoyangItemData}
                  value={this.props.baoyangItem}
                  onChange={(v) => this.props.onChangeHandle('baoyangItem', v)}
                />
              </div>
            </li>
          } */}
          {this.props.type === 'three' &&
            <li className='label-box'>
              <div className='l label-must justify'>
                故障部<div>位：</div>
              </div>
              <div className="r">
                {/* <MySelect
                extra="请选择故障部位"
                value={this.props.faultPart}
                data={this.props.faultPartData}
                onChange={(v) => this.props.onChangeHandle('faultPart', v)}
              /> */}
                <MyInput
                  placeholder="请填写故障部位"
                  value={this.props.faultPart}
                  onChange={(v) => this.props.onChangeHandle('faultPart', v)}
                />
              </div>
            </li>}
          {
            this.props.type === 'three' &&
            <li className='label-box'>
              <div className='l label-must justify'>
                故障描<div>述：</div>
              </div>
              <div className="r">
                <MyInputarea
                  placeholder='请输入故障描述'
                  value={this.props.description}
                  onChange={(v) => this.props.onChangeHandle('description', v)}
                />
              </div>
            </li>
          }
          {
            this.props.type === 'shijia' &&
            <li className='label-box jihua'>
              <div className='l label-must justify'>
                计划购车时<div>间：</div>
              </div>
              <div className="r">
                <MyRadio
                  value={this.props.buyTime}
                  data={this.props.buyTimeData}
                  onChange={(v) => this.props.onChangeHandle('buyTime', v)}
                />
              </div>
            </li>
          }
        </ul>
        <h3 className='title pt-4'>
          经销商信息
        </h3>
        <div className="my-line-m" />
        <div className='label-box jingxiaoshang-tt'>
          <div className='l label-must'>
            附近的经销商：
          </div>
          <div className="r">
          </div>
        </div>
        <Jingxiaoshang {...this.props} onSearch={() => {
          this.props.onSearch()
        }} onChangeHandle={this.props.onChangeHandle} />
        <Modal
          className='my-modal app-modal-box yuyue-modal-box'
          visible={this.props.successModal}
          transparent
        // onClose={() => this.props.close()}
        >
          <div
            className="close"
            onClick={() => this.props.close()}
          />
          <div className="img-box">
            <img src={require('../../../../imgs/login-success.png')} alt="" />
          </div>
          <div className='app-txt'>您的预约已经提交！</div>
          <div className='app-txt'>经销商会第一时间联系您，请耐心等待！</div>
          {/* <div>{this.props.tabIndex}</div> */}
          <div className="my-btn mb-4 mt-4">
            <Button inline onClick={() => {
              const link = this.props.tabIndex == 1 ? '/mine/appointment/maintain' : (this.props.tabIndex == 2 ? '/mine/appointment/repair' : '/mine/appointment/testDrive')
              this.props.history.push(link)
            }}>查看预约</Button>
          </div>
        </Modal>

        {/* <div className="two-label">
          <MySelect
            extra=""
            value={this.props.type3}
            data={this.props.data3}
            onChange={(v) => this.props.onChangeHandle('type3', v)}
          />
          <MySelect
            extra=""
            value={this.props.type3}
            data={this.props.data3}
            onChange={(v) => this.props.onChangeHandle('type3', v)}
          />
        </div>
        <div className="search-label">
          <MyInput
            value={this.props.phone}
            placeholder='请输入手机号'
            onChange={(v) => this.props.onChangeHandle('phone', v)}
          />
          <div className="search-img">
            <img src={require('../../../../imgs/search-0.png')} alt=""/>
          </div>
        </div> */}
        {/* <div className="serach-jieguo">
          共为您找到 <span style={{color:'#e50020'}}>100</span> 家经销商
        </div>
        <div className="my-map">
        my-map
        </div> */}
        {/* <div className="address-list">
          <ul>
            {this.props.addressData.map((v,i) => {
              return (
                <li className={this.props.addressValue === v.id ? 'checked' : ''} key={v.id} onClick={() => this.props.onChangeHandle('addressValue', v.id)}>
                  <div className="top">
                    <div className="address-text">
                      <span className='xuhao'>{this.props.addressValue !== v.id && (i+1)}</span>
                      <span>{v.title}</span>
                    </div>
                    <div className="num">
                    {v.num}
                    </div>
                  </div>
                  {
                    this.props.addressValue === v.id && <div className="bottom">
                    <div>{v.address}</div>
                    <div>{v.phone1} -- {v.phone2}</div>
                  </div>
                  }
                </li>
              )
            })}
          </ul>
          
        </div> */}
        <div className="agree">
          <MySwitch
            value={this.props.isAgree}
            label='我已同意'
            onChange={() => {
              this.props.onChangeHandle('isAgree', !this.props.isAgree ? true : false)
            }
            } />
          <span onClick={() => this.setState({ showUser: true })}>《隐私协议》</span>
        </div>
        <UserAgreement show={this.state.showUser} close={() => this.setState({ showUser: false })} />
        <div className="my-btn">
          {/* <Button inline onClick={() => {
              // 防止点击多次 
              if(this.state.clickFlag) {
                alert(1)
                return null
              } else {
                this.setState({
                  clickFlag: true
                })
                this.props.postYuYue()
              }
          }}>马上预约</Button> */}
          <Button inline onClick={() => {this.props.postYuYue()}}>马上预约</Button>
          
        </div>
        <div style={{fontSize:'0.23rem',lineHeight:'0.4rem',color:'#7f7f7f',paddingLeft:'0.2rem',marginTop:'0.5rem',textAlign:'center'}}>
        一汽丰田感谢您在线预约试驾，您预约的经销店会尽快与您联络<br/>具体试驾时间及车型，请与经销店协商
        </div>
      </div>
    );
  }
}

export default Fuwuyuyue;
