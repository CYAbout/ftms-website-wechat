import React, { Component } from 'react';
import { Button, Icon } from 'antd-mobile';
import { Link, withRouter } from "react-router-dom";
import CarList from '../components/carList';
import { userApi } from '../api';
import { translateMobile } from '../../../utils/util';
import moment from 'moment';
import config from '../../../config.json';

import './index.less';

@withRouter
class UserHome extends Component {

  state = {
    loveCarList: [], //已绑定车集合
    userInfo:JSON.parse(localStorage.getItem('userInfo')) || {}
  }
  // componentWillMount(){
  //   const user = localStorage.getItem('userInfo');
  //   if (user) {
  //     this.setState({
  //       userInfo: JSON.parse(user)
  //     })
  //   }
  // }
  componentDidMount() {
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.setState({
        userInfo: JSON.parse(user)
      })
    }
    this.getLoveCars()
  }

  getLoveCars() {
    userApi.getLoveCarList().then((res) => {
      if (res && res.code === '0') {
        this.setState({
          loveCarList: res.data
        })
      }
    })
  }

  handleLogout() {
    // userApi.logout().then(res => {
    //   if (res && res.code === '0') {
    //     // localStorage.removeItem('userInfo')
    //     localStorage.clear()
    //     this.props.history.push('/');
    //   }
    // })

    userApi.wxLogout().then(res => {
      if (res && res.code === '0') {
        // localStorage.removeItem('userInfo')
        localStorage.clear()
        // this.props.history.push('/');
        window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
      }
    })
  }

  jumpTo(path) {
    this.props.history.push(path)
  }
  toModifyBind(id,carCode){
    this.props.history.push(`/mine/addcar?id=${id}&carCode=${carCode}`);
  }
  render() {
    const { loveCarList, userInfo } = this.state;
    return (
      <div className="user_home">
        <div className="user_info card">
          <Link to="/mine/accountinfo" className="edit_link">
            <img src={require(`../../../imgs/edit.png`)} alt="" />
          </Link>
          <div className="base">
            <div className="imgBox">
              <img onClick={this.jumpTo.bind(this, '/mine/accountinfo')} src={userInfo.memberLogo ? userInfo.memberLogo : require(`../../../imgs/avatar.png`)} alt="" />
            </div>
            <div className="name">
              <p>HI! {userInfo.realName || userInfo.loginName || userInfo.mobile}</p>
              <p className="sex">性别：{userInfo.sex === '0' ? '女' : userInfo.sex === '1' ? '男' : ''}</p>
              <Link to="/mine/myspoor">
                <img src={require(`../../../imgs/icon-footprint.png`)} alt="" />
                我的足迹<Icon type="right" />
              </Link>
            </div>
          </div>
          <div className="op">
            <div className="item">
              <div className="left">
                <i className="user_icon icon_pass"></i>
                <div>
                  <p className="title">
                    <span>登录密码</span>
                  </p>
                  <p className="desc">
                    用于保护账号信息和登录安全
                      </p>
                </div>
              </div>
              <div className="right">
                <div className="my-btn">
                  <Button inline onClick={this.jumpTo.bind(this, '/mine/changepwd')}>修改密码</Button>
                </div>
              </div>
            </div>
            <div className="item">
              <div className="left">
                <i className="user_icon icon_phone"></i>
                <div>
                  <p className="title">
                    <span>安全手机</span>
                  </p>
                  <p className="desc">
                    {translateMobile(userInfo.mobile)}
                  </p>
                </div>
              </div>
              <div className="right">
                <div className="my-btn">
                  <Button inline onClick={this.jumpTo.bind(this, '/mine/changephone')}>更换手机号</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card_tile">
          <span>我的卡券</span>
          <Link to='/mine/mycard/unused'>查看全部<Icon type="right"></Icon></Link>
        </div>
        <div className="user_ticket card base">
          <div className="column">
            <Link to='/mine/mycard/unused'>
              <img src={require(`../../../imgs/icon-card-no.png`)} alt="" />
              <span>未使用</span>
            </Link>
          </div>
          <div className="line"></div>
          <div className="column">
            <Link to='/mine/mycard/used'>
              <img src={require(`../../../imgs/icon-card-passed.png`)} alt="" />
              <span>已使用</span>
            </Link>
          </div>
          <div className="line"></div>
          <div className="column">
            <Link to='/mine/mycard/stale'>
              <img src={require(`../../../imgs/icon-card-invalid.png`)} alt="" />
              <span>已过期</span>
            </Link>
          </div>
        </div>
        <div className="card_tile">我的预约</div>
        <div className="user_appointment card base yy">
          <div className="column">
            <Link to='/mine/appointment/testDrive'>
              <img src={require(`../../../imgs/icon-yy-sj.png`)} alt="" />
              <span>预约试驾</span>
            </Link>
          </div>
          <div className="line"></div>
          <div className="column">
            <Link to='/mine/appointment/maintain'>
              <img src={require(`../../../imgs/icon-yy-by.png`)} alt="" />
              <span>预约保养</span>
            </Link>
          </div>
          <div className="line"></div>
          <div className="column">
            <Link to='/mine/appointment/repair'>
              <img src={require(`../../../imgs/icon-yy-wx.png`)} alt="" />
              <span>预约维修</span>
            </Link>
          </div>
        </div>
        <div className="card_tile">我的订单
        <Link to='/mine/order/all'>查看全部<Icon type="right"></Icon></Link>
        </div>
        <div className="user_order card base order">
          <div className="column">
            <Link to='/mine/order/paying'>
              <img src={require(`../../../imgs/icon-order-paying.png`)} alt="" />
              <span>待支付</span>
            </Link>
          </div>
          <div className="line"></div>
          <div className="column">
            <Link to='/mine/order/paid'>
              <img src={require(`../../../imgs/icon-order-payed.png`)} alt="" />
              <span>已支付</span>
            </Link>
          </div>
          <div className="line"></div>
          <div className="column">
            <Link to='/mine/order/completed'>
              <img src={require(`../../../imgs/icon-order-completed.png`)} alt="" />
              <span>已完成</span>
            </Link>
          </div>
        </div>
        <div className="card_tile">
          我的爱车
            <Link to='/mine/addcar' className="btn">添加爱车</Link>
        </div>
        <div className="user_car card">
          {/* <CarList data={loveCarList} btn={{text:'修改',click:this.toModifyBind}}/> */}
          {
            loveCarList&&loveCarList.length>0?loveCarList.map((val,index)=>{
              let carInfo = val;
              return <div className="card form" key={index}>
                <div className='inner'>
                  <div className='title'>
                  {carInfo.longTitle ? carInfo.longTitle : carInfo.carModelName + carInfo.carVersion}
                  </div>
                  <div className='info'>
                    <ul>
                      <li>颜色：{carInfo.color}</li>
                      <li>车架号：{carInfo.carCode}</li>
                      <li>车牌号：{carInfo.carnumber}</li>
                      <li>发动机号：{carInfo.carenginecode}</li>
                      <li>购车时间：{carInfo.buyTime ? carInfo.buyTime.toString().indexOf('-') > -1 ? carInfo.buyTime : moment(carInfo.buyTime + '000' - 0).format('YYYY-MM-DD') : ''}</li>
                    </ul>
                  </div>
                  <div className='mybtn' onClick={()=>{this.toModifyBind(carInfo.id,carInfo.carCode)}}>修改</div>
                </div>
              </div>
              }):<div className="no_bind">
              <img src={require(`./../../../imgs/car-no-bind.png`)} className='nofound' alt="" />
            </div>
          }
        </div>
       <div className="my-btn">
          <Button inline onClick={this.handleLogout.bind(this)}>退出登录</Button>
        </div>
      </div>
    )
  }
}

export default UserHome;