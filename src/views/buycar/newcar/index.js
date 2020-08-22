import React, { Component } from 'react';
import { Tabs, Button, Modal, Toast } from 'antd-mobile';
import {
  MyRadio,
  MySelect,
  MyDate
} from '../../../components/dataview';
import Step2 from './step2';
import Gotop from '../../../components/common/gotop';
import { HTTPGet } from '../../../utils/http';
import { StringFormat } from '../../../utils/util';

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

class Newcar extends Component {
  constructor(props) {
    super(props);
    let str = props.location.search.replace('?', '');
    let arr = str.split('&');
    let param = {};
    let index = '';
    let curvehicle = '';
    if (arr && arr.length > 0) {
      for (let item of arr) {
        let myarr = item.split('=');
        param[myarr[0]] = myarr[1];
      }
    }
    if (param.tab) {
      index = param.tab * 1;
    }
    if (param.cid) {
      curvehicle = [+param.cid];
    }
    this.state = {
      step: 1,
      planTimeType: [
        { value: '1', label: '一周内' }, { value: '2', label: '一个月内' }
      ],
      planTimeValue: '1',
      typeList: [
        { value: '1', label: '个人' }, { value: '2', label: '企业' }
      ],
      curtype: '1',
      vehicleList: [],
      modal: false,
      modalInfo: [],
      vehicle: curvehicle,
      versionList: [],
      priceList: [],
      version: '',
      price: '',
      activityList: [],
      index: index,
    }
  }
  componentDidMount() {
    document.title = '新车保险'
  }
  componentWillMount() {
    let url = '/api/getInsuranceActiveList/0';
    HTTPGet(url).then((result) => {
      if (result && result.code == 0) {
        this.setState({
          activityList: result.data
        });
      }
    });
    HTTPGet('/Website/Car/brandModels').then((result) => {
      if (result && result.code == 0) {
        let list = [];
        let map = {};
        for (let item of result.data) {
          if (item && item.car_series && item.car_series.length > 0) {
            for (let i of item.car_series) {
              list.push({
                label: i.name,
                value: +i.cid
              });
            }
          }
        }
        this.setState({
          vehicleList: list
        })
      }
    })
    let cid = this.state.vehicle;
    if (cid.length === 1) {
      this.onChangeVehicle(cid);
    }
  }
  onChangeVehicle(cid) {
    let url = '/Website/Car/getVersion/cid/' + cid[0];
    HTTPGet(url).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let list = [];
        let i = 0;
        let priceList = [];
        for (let item of reuslt.data) {
          list.push({ label: <span dangerouslySetInnerHTML={{ __html: item.version + item.name }}></span>, value: i })
          priceList[i] = item['shop_price'];
          // priceList[i] = item['price'];
          i++;
        }
        this.setState({
          versionList: list,
          vehicle: cid,
          priceList: priceList,
          version: ''
        });
      }
    });
  }
  onChangeVersion(version) {
    let price = this.state.priceList[version[0]];
    this.setState({
      version: version,
      price: price
    });
  }
  toNext() {
    if (!this.state.vehicle) {
      Toast.info('请选择车型', 1);
      return false;
    }
    if (!this.state.version) {
      Toast.info('请选择车型配置', 1);
      return false;
    }
    this.setState(preState => {
      return {
        step: preState.step + 1
      }
    })
  }

  onChangeHandle(key, v) {
    this.setState({
      [key]: v
    })
  }
  showModal = (info) => {
    // e.preventDefault(); // 修复 Android 上点击穿透
    window.myModal();
    this.setState({
      modal: true,
      modalInfo: info
    });
  }
  onClose = key => () => {
    window.myModal1();
    this.setState({
      [key]: false,
    });
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  getSelectInfo() {
    return {
      carPrice: this.state.price,
      type: this.state.curtype
    }
  }
  setIndex(v, i) {
    this.setState({
      index: i
    })
  }
  render() {
    const tabs = [
      { title: 'AAA品牌保险' },
      { title: '保险计算器' },
    ];
    const { step } = this.state;
    return (
      <div className='newcar'>
        <div className="title-img">
          <img src={require('../../../imgs/newcar/banner.png')} alt="" />
          {/* <span className='ss'>新车保险</span> */}
          <div className='tag-img'>
            <img src={require('../../../imgs/logo-3a.png')} alt="" />
          </div>
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            page={this.state.index}
            animated={false}
            swipeable={false}
            useOnPan={false}
            onTabClick={(v, i) => this.setIndex(v, i)}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} />}
          >
            <div className="insurance">
              <div className="desc">
                2007年，一汽丰田以“安心感、优惠的价格、标准化流程、信息透明”为开发理念，在国内率先推出AAA品牌保险服务，旨在为消费者提供轻松购买、便捷理赔的全方位专享保险服务。
              </div>
              <h3 className="title">三大优势</h3>
              <div className="desc small">
                从2007年至今，一汽丰田AAA品牌保险为无数车主演绎了一汽丰田“安心、安全、爱用”的客户服务理念，让他们可以享受到安心、便捷、专业化、标准化的汽车保险服务。
              </div>
              <div className="center">
                <img width="100%" src={require('../../../imgs/newcar/img1.png')} alt="" />
                <div className="a1">
                  <p className="title">
                    <span className="red">A</span>
                    <span>：安心——专属维修</span>
                  </p>
                  <p>丰田认证专业人员</p>
                  <p>严格遵守丰田标准作业方法维修</p>
                </div>
                <img width="100%" src={require('../../../imgs/newcar/img2.png')} alt="" />
                <div className="a1">
                  <p className="title">
                    <span className="red">A</span>
                    <span>：安全——专属配件</span>
                  </p>
                  <p>100%丰田纯牌零件</p>
                  <p>满足丰田全球标准</p>
                </div>
                <img width="100%" src={require('../../../imgs/newcar/img3.png')} alt="" />
                <div className="a1">
                  <p className="title">
                    <span className="red">A</span>
                    <span>：爱用——专属服务</span>
                  </p>
                  <p>国内一线保险企业产品</p>
                  <p>一站式贴心服务</p>
                </div>
              </div>
              {this.state.activityList.map((val, index) => {
                return (
                  <div className="huikui" key={'activity-' + index}>
                    <div className="title">
                      <p>{val.activityTitle}</p>
                    </div>
                    <div className="line"></div>
                    <div className="content">
                      {val.activityContent}
                    </div>
                  </div>
                )
              })}
              <h3 className="title">保险合作平台</h3>
              <div className="desc">
                积极应对激烈变化的市场，持续强化AAA品牌保险服务，建立客户可以信赖的领先于市场的保险服务品牌。
              </div>
              <div className="imgs">
                <img className="big" src={require('../../../imgs/newcar/platform-1.png')} alt="" />
                <img width="100%" className="plus" src={require('../../../imgs/newcar/icon-plus.png')} alt="" />
                <img className="big" src={require('../../../imgs/newcar/platform-X.png')} alt="" />
                <img width="100%" className="plus" src={require('../../../imgs/newcar/icon-plus.png')} alt="" />
                <img className="big" src={require('../../../imgs/newcar/platform-Y.png')} alt="" />
              </div>
            </div>
            <div className="computed">
              {
                step === 1 && <React.Fragment>
                  <div className="title">
                    <span>01</span>
                    <span>选择车型输入信息</span>
                  </div>
                  <ul>
                    <li className='label-box'>
                      <div className='l'>
                        选择车型
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="请选择车型"
                          value={this.state.vehicle}
                          data={this.state.vehicleList}
                          onChange={(v) => this.onChangeVehicle(v)}
                        />
                      </div>
                    </li>
                    <li className='label-box'>
                      <div className='l'>
                        配置
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="请选择车型配置"
                          value={this.state.version}
                          data={this.state.versionList}
                          onChange={(v) => this.onChangeVersion(v)}
                        />
                      </div>
                    </li>
                    <li className='label-box'>
                      <div className='l'>
                        价格
                      </div>：
                      <div className="r">
                        <span className="price">{StringFormat.toCurrency(this.state.price)}</span>
                      </div>
                    </li>
                    <li className='label-box'>
                      <div className='l'>
                        使用性质
                      </div>：
                      <div className="r">
                        <MyRadio
                          value={this.state.curtype}
                          data={this.state.typeList}
                          onChange={(v) => this.onChangeHandle('curtype', v)}
                        />
                      </div>
                    </li>
                    {/* <li className='label-box'>
                      <div className='l'>
                        购车时间
                      </div>：
                      <div className="r">
                        <MyRadio
                          value={this.state.planTimeValue}
                          data={this.state.planTimeType}
                          onChange={(v) => this.onChangeHandle('planTimeValue', v)}
                        />
                      </div>
                    </li> */}
                    <li className='label-box'>
                      <div className='l'>
                        购车时间
                      </div>：
                      <div className="r">
                        <MyDate
                          extra="请选择时间"
                          value={this.state.buyTime}
                          onChange={(v) => this.onChangeHandle('buyTime', v)}
                        />
                      </div>
                    </li>
                    <li className='label-box'>
                      <div className='l'>
                        保险开始时间
                      </div>：
                      <div className="r">
                        <MyDate
                          extra="请选择时间"
                          value={this.state.yyTime}
                          onChange={(v) => this.onChangeHandle('yyTime', v)}
                        />
                      </div>
                    </li>
                  </ul>
                  <div className="my-btn mb-8">
                    <Button inline onClick={() => this.toNext()}>下一步</Button>
                  </div>
                </React.Fragment>
              }
              {
                step === 2 && <Step2 selectInfo={this.getSelectInfo()} onChangeHandle={this.onChangeHandle.bind(this)} showModal={this.showModal} />
              }
            </div>
          </Tabs>
        </div>
        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={false}
          onClose={this.onClose('modal')}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          afterClose={() => { }}
          wrapClassName='modal-newcar'
        >
          <div className='calc-container'>
            <img src={require(`../../../imgs/newcar/icon-info.png`)} alt="img" />
            {this.state.modalInfo.map((val, index) => {
              return <div className='text' key={index}>{val}</div>
            })}
            <div className='btn' onClick={this.onClose('modal')}>确定</div>
          </div>
        </Modal>
        {/* <Gotop /> */}
      </div>
    );
  }
}

export default Newcar;
