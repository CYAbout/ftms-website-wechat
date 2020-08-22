import React, { Component } from 'react';
import { Tabs, Button, Modal, Toast } from 'antd-mobile';

import { MyInput, MyRadio, MySelect, MyCheckBoxEX } from '../../../components/dataview';
import { HTTPGet, HTTPPost } from '../../../utils/http';
import { StringFormat, getParamsObj } from '../../../utils/util';
import config from '../../../config.json';

import './index.less'
const closest = (el, selector) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
const fontDecorationReg = 'Exterior'
const activeCidMap = {
  '6': true,
  '8': true,
  '9': true,
  '11': true,
  '31': true,
}
class Pureuse extends Component {
  constructor(props) {
    super(props)
    this.state = {
      index: 3,
      isShowTab1: false,
      isShowTab2: false,
      categoryList: [],
      total: 0,
      curcategory: ['DEFAULT'],
      searchValue1: ['1'],
      carList: [],
      curcar: ['DEFAULT'],
      sexData: [{ label: '先生', value: '1' }, { label: '女士', value: '0' }],
      sexValue: '1',
      phoneNo: '',
      uname: '',
      goodsDetail: {},
      showGoodsModal: false,
      showGoodsModalzx: false,
      zixunStep: 1,
      productList: [],
      provinceList: [],
      curprovince: '',
      cityList: [],
      curcity: '',
      dealerList: [],
      dealerNameMap: {},
      curdealer: '',
      curpure: '',
      leftSecond: 0,
      sendFlag: false,
      code: '',
      words: '',
      fontFlag: false,// 是否是外装精品
      mobileChanged: false,
      defaultMobile: '',
      firstInCome: true,
    }
  }
  componentDidMount() {
    document.title = '纯正用品'
  }

  componentWillMount() {
    let data = {
      classify: [],
      cid: [],
      name: ''
    };
    const query = getParamsObj(window.location.href)
    console.log(query)
    if (query && query.cid) {
      this.setState({
        curcar: [query.cid]
      })
      data.cid = [query.cid];
    }
    // 查询全部数据
    this.queryInfo(data, true);
    // 用品分类
    let categoryurl = '/Website/PureProducts/getClassify';
    HTTPGet(categoryurl).then((result) => {
      if (result && result.code == 0) {
        let categoryList = [];
        categoryList.push({ label: '全部', value: 'DEFAULT' });

        for (let item of result.data) {
          categoryList.push({ label: item.name, value: item.name });
        }
        this.setState({
          categoryList: categoryList
        });
      }
    });
    // 适用车型
    let vehicleurl = '/website/Maintenance/getVehicleList';
    HTTPGet(vehicleurl).then((result) => {
      if (result && result.code == 0) {
        let carList = [];
        carList.push({ label: '全部', value: 'DEFAULT' });
        for (let item of result.data) {
          carList.push({ label: item.name, value: item.cid });
        }
        this.setState({
          carList: carList
        });
      }
    });
  }
  onBoxClickHandle(type, val) {
    let arr = this.state[type];
    let index = arr.indexOf(val);
    if (index > -1) {
      if (val != 'DEFAULT')
        arr.splice(index, 1);
    } else {
      if (val == 'DEFAULT') {
        arr = ['DEFAULT']
      } else {
        index = arr.indexOf('DEFAULT');
        if (index > -1)
          arr.splice(index, 1);
        arr.push(val);
      }
    }
    if (arr.length === 0) {
      arr.push('DEFAULT');
    }
    this.setState({
      [type]: arr
    })
  }
  onChangeHandle(type, val) {
    if (type === 'phoneNo') {
      let mobileChanged = false;
      if (val !== this.state.defaultMobile) {
        mobileChanged = true;
      }
      this.setState({ mobileChanged })
    }

    this.setState({
      [type]: val
    })
  }
  setIndex(v, i) {
    console.log(v, i);
    let flag = false;
    if (+i === 0) {
      flag = !this.state.isShowTab1
      this.setState({
        isShowTab2: false,
        isShowTab1: flag
      })
      if (!flag) {
        this.setState({
          index: 3
        })
        return false;
      }
    }
    if (+i === 1) {
      flag = !this.state.isShowTab2
      this.setState({
        isShowTab1: false,
        isShowTab2: flag
      })
      if (!flag) {
        this.setState({
          index: 3
        })
        return false;
      }
    }
    console.log('111');
    this.setState({
      index: i
    })
  }
  showGoodsModal = (e, detail) => {
    console.log(detail)
    e.preventDefault();
    let url = '/Website/PureProducts/getDetail/id/' + detail.id;
    let flag = fontDecorationReg === detail['code'] && activeCidMap[detail.cid + ''];
    HTTPGet(url).then((result) => {
      if (result && result.code == 0) {
        let temp = result.data;
        let str = temp.name;
        let ret = str.match(/\w{3,}/);
        let name = temp.name;
        let code = '';
        if (ret) {
          let pos = ret.index;
          name = str.slice(0, pos).trim();
          code = str.slice(pos);
        }
        temp.name = name;
        temp.code = code;
        this.setState({
          showGoodsModal: true,
          goodsDetail: temp,
          fontFlag: flag,
        });
      }
    });
    window.myModal()
  }
  onCloseGoodsModal = () => {
    this.setState({
      showGoodsModal: false,
    });
    window.myModal1()
  }
  showGoodsModalzx = (e, pureid) => {
    e.preventDefault();
    let userInfo = localStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    // let url = '/Website/PureProducts/getUserInfo';
    // let data = {
    //   accessToken:userInfo.accessToken,
    //   id:pureid
    // }
    // HTTPPost(url,data).then(result=>{
    //   console.log(result,userInfo);
    // });
    if (userInfo) {
      this.getProvinceList();
      this.setState({
        phoneNo: userInfo.mobile ? userInfo.mobile : '',
        defaultMobile: userInfo.mobile ? userInfo.mobile : '',
        uname: userInfo.loginName ? userInfo.loginName : '',
        sexValue: userInfo.sex ? userInfo.sex : '1',
        showGoodsModalzx: true,
        curpure: pureid,
        code: '',
        curprovince: '',
        curcity: '',
        curdealer: '',
      });
    } else {
      localStorage.setItem("redirectUrl", window.location);
      // this.props.history.push('/login');
      window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
      return false;
    }
    window.myModal()
  }
  onCloseGoodsModalzx = () => {
    this.setState({
      showGoodsModalzx: false,
      zixunStep: 1
    });
    window.myModal1()
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
  zixunFun(e, step) {
    e.preventDefault();
    // if(step === 3) {
    //   this.setState({
    //     showGoodsModalzx:false
    //   })
    //   return
    // }
    // if(!this.state.sendFlag){
    //     Toast.info('请获取手机验证码',1);
    //   return;
    // }
    let userInfo = localStorage.getItem('userInfo');
    userInfo = JSON.parse(userInfo);
    let url = '/Website/PureProducts/consult';
    if (!this.state.uname) {
      Toast.info('请输入姓名', 1);
      return false;
    }
    if (!this.state.phoneNo) {
      Toast.info('请输入手机号码', 1);
      return false;
    }
    if (!this.state.code && this.state.mobileChanged) {
      Toast.info('请输入验证码', 1);
      return false;
    }
    if (!this.state.curdealer) {
      Toast.info('请选择经销商', 1);
      return false;
    }
    let data = {
      "accessToken": userInfo.accessToken, // 必需 ，用户登陆的token
      "id": this.state.curpure,	    // 必需，纯正用品主键id
      "name": this.state.uname,	// 必需，用户名
      "sex": this.state.sexValue,	    // 必需，性别，0女，1男
      "tel": this.state.phoneNo,       // 必需，手机号
      "code": this.state.code,		        // 必需，验证码
      "dealerName": this.state.dealerNameMap[this.state.curdealer]  // 必需，经销商名称
    };
    HTTPPost(url, data).then((result) => {
      if (result && result.code == 0) {
        this.setState({
          zixunStep: step
        })
      } else {
        Toast.info(result.msg, 1);
      }
    });
  }
  // 根据条件获取数据，并处理成前端需要的格式
  queryInfo(data, firstInCome = false) {
    let words = this.state.searchValue
    if (!data) {
      let classify = this.state.curcategory;
      let cid = this.state.curcar;
      if (classify.indexOf('DEFAULT') > -1) {
        classify = [];
      }
      if (cid.indexOf('DEFAULT') > -1) {
        cid = [];
      }
      data = {
        classify: classify,
        cid: cid,
        name: words
      }
    }
    let url = '/Website/PureProducts/getList';
    HTTPPost(url, data).then((result) => {
      if (result && result.code == 0) {
        let pList = [];
        let sum = 0;
        for (let m in result.data) {
          if (m != 'sum') {
            let mylist = { id: m };
            let temp = [];
            let item = result.data[m];
            if (item) {
              for (let n in item) {
                if (!mylist.title) {
                  mylist.title = item[n].classify;
                }
                temp.push(item[n]);
              }
            }
            mylist.list = temp;
            pList.push(mylist);
          } else {
            sum = result.data[m];
          }
        }
        this.setState({
          productList: pList,
          words: words,
          total: sum,
          firstInCome: firstInCome,
        });
        // if(pList.length>0){
        // }else{
        //   this.setState({
        //     words: words,
        //     total: sum
        //   });
        // }
      }
    });
  }
  // 用品详情
  getDetailInfo(id) {
    let url = '/Website/PureProducts/getDetail/id/' + id;
    HTTPGet(url).then((result) => {
      if (result && result.code == 0) {
        let temp = result.data;
        let str = temp.name;
        let pos = str.match(/\w{4,}/).index;
        let name = str.slice(0, pos).trim();
        let code = str.slice(pos);
        temp.name = name;
        temp.code = code;
        this.setState({
          goodsDetail: temp
        });
      }
    });
  }
  // 获取省份
  getProvinceList() {
    let url = '/website/Maintenance/getProvince';
    HTTPGet(url).then((result) => {
      if (result && result.code == 0) {
        let temp = [];
        for (let item of result.data) {
          temp.push({ label: item.name, value: item.cid });
        }
        this.setState({
          provinceList: temp
        });
      }
    });
  }
  // 获取城市
  getCityList(pid) {
    let url = '/website/Maintenance/getCity?cid=' + pid;
    HTTPGet(url).then((result) => {
      if (result && result.code == 0) {
        let temp = [];
        for (let item of result.data) {
          temp.push({ label: item.name, value: item.cid });
        }
        this.setState({
          cityList: temp
        });
      }
    });
  }
  // 获取经销商
  getDealerList(cid) {
    let url = '/website/Maintenance/getDealer?cid=' + cid;
    HTTPGet(url).then((result) => {
      if (result && result.code == 0) {
        let temp = [];
        let map = {};
        for (let item of result.data) {
          temp.push({ label: item.name, value: item.code });
          map[item.code] = item.name;
        }
        this.setState({
          dealerList: temp,
          dealerNameMap: map
        });
      }
    });
  }
  changeProvince(val) {
    this.setState({
      curprovince: val
    });
    this.getCityList(val);
  }
  changeCity(val) {
    this.setState({
      curcity: val
    });
    this.getDealerList(val);
  }
  getPhoneCode() {
    let mobile = this.state.phoneNo;
    if (!mobile) {
      Toast.info('请输入手机号码', 1);
      return;
    }
    let sec = this.state.leftSecond;
    if (sec <= 0) {
      const opt = {
        mobile: mobile,
        sendCodeType: 'consulting'
      }
      sec = 120;
      HTTPPost('/api/sendMobileCode', opt).then(res => {
        console.log('123', res)
        if (res && res.code === '0') {
          this.setState({
            leftSecond: 120,
            sendFlag: true
          }, () => {
            this.interval = setInterval(() => {
              let second = this.state.leftSecond;
              if (second <= 0) {
                clearInterval(this.interval);
              } else {
                second--
                this.setState({
                  leftSecond: second
                })
              }
            }, 1000)
          })
        }
      })
    }
  }
  resetCondition(key) {
    this.setState({
      [key]: ['DEFAULT']
    });
  }
  hideTab() {
    this.setState({
      isShowTab1: false,
      isShowTab2: false,
      index: 3
    });
  }
  jumpJiaZhaung(id) {
    window.myModal();
    this.props.history.push(`/buycar/cartype/install/${id}`);
  }
  strFactoryH(str) {
    let s = str.match(/\w{4,}/)
    if (s) {
      let pos = str.match(/\w{4,}/)['index'];
      let name = str.slice(0, pos).trim();
      let code = str.slice(pos);
      return name;
    } else {
      return str;
    }
  }
  strFactoryY(str) {
    let s = str.match(/\w{4,}/)
    if (s) {
      let pos = str.match(/\w{4,}/)['index'];
      let name = str.slice(0, pos).trim();
      let code = str.slice(pos);
      return code;
    } else {
      return '';
    }
  }
  render() {
    const { isShowTab1, isShowTab2, zixunStep, mobileChanged } = this.state
    return (
      <div className='pureuse'>
        <div className="title-img">
          <img src={require('../../../imgs/chunzheng-banner.png')} alt="" />
          {/* <span style={{ color: '#fff', left: '1rem' }}>纯正用品</span> */}
          <div className='tag-img'>
            <img src={require('../../../imgs/chunzheng-LOGO.png')} alt="" />
          </div>
        </div>
        <div className={this.state.index == 3 ? 'just-my-tabs' : 'just-my-tabs active'}>
          <Tabs
            tabs={[{ title: '用品分类' }, { title: '适用车型' },]}
            page={this.state.index}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} />}
            onChange={(v, i) => this.setIndex(v, i)}
            onTabClick={(v, i) => this.setIndex(v, i)}
          >
            <div className='isShowTab' style={{ height: isShowTab1 ? 'auto' : 0 }}>
              <MyCheckBoxEX
                value={this.state.curcategory}
                data={this.state.categoryList}
                onClick={(v) => this.onBoxClickHandle('curcategory', v)}
              />
              <div className="btns mt-4 pb-6">
                <div className="my-btn-nobg ">
                  <Button inline onClick={() => { this.resetCondition('curcategory') }}>重置</Button>
                </div>
                <div className="my-btn">
                  <Button inline onClick={() => { this.hideTab(); this.queryInfo(); }}>确定</Button>
                </div>
              </div>
            </div>
            <div className='isShowTab' style={{ height: isShowTab2 ? 'auto' : 0 }}>
              <MyCheckBoxEX
                value={this.state.curcar}
                data={this.state.carList}
                onClick={(v) => this.onBoxClickHandle('curcar', v)}
              />
              <div className="btns mt-4 pb-6">
                <div className="my-btn-nobg ">
                  <Button inline onClick={() => { this.resetCondition('curcar') }}>重置</Button>
                </div>
                <div className="my-btn">
                  <Button inline onClick={() => { this.hideTab(); this.queryInfo(); }}>确定</Button>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
        <div className="box">
          <div className="search">
            <div className="search-label">
              <MyInput
                value={this.state.searchValue}
                placeholder='请输入用品名称,如挡雨板'
                maxLength={30}
                onChange={(v) => this.onChangeHandle('searchValue', v)}
              />
              <div className="search-img" onClick={() => { this.queryInfo() }}>
                <img src={require('../../../imgs/search-0.png')} alt="" />
              </div>
            </div>
            <div className="finded-pure">
              {this.state.firstInCome ? null : (this.state.words ? <span>共找到<span className='red'>{this.state.total}</span>条<span className='red'>{this.state.words}</span>相关信息结果</span> : <span>共找到<span className='red'>{this.state.total}</span>条相关信息结果</span>)}
            </div>
          </div>
          {this.state.productList.length > 0 ? this.state.productList.map((val, index) => {
            return (
              <div className="item-type" key={'item-' + index}>
                <h3 className="lb">
                  {val.title}
                </h3>
                <ul>
                  {val.list.map((itemval, itemindex) => {
                    return (
                      <li key={'item-item-' + itemindex}>
                        <div className="img" onClick={(e) => this.showGoodsModal(e, itemval)}>
                          <img src={itemval.thumb} alt="" />
                        </div>
                        <div className="l">
                            <h3 
                              onClick={(e) => this.showGoodsModal(e, itemval)}
                              // dangerouslySetInnerHTML={{ __html: itemval.name.replace(' ', '<br/>') }}
                            >
                            {this.strFactoryH(itemval.name)}<br/>
                            {this.strFactoryY(itemval.name)}
                            </h3>
                          <div className="price">
                            {/*建议零售价：<span>{StringFormat.toCurrency(itemval.price)}</span> */}
                            建议零售价：<span className="price_span">请咨询当地经销商</span>
                          </div>
                          <div className="my-btn">
                            <Button onClick={(e) => this.showGoodsModalzx(e, itemval.id)}>我要咨询</Button>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          }) : <div className='no-data'>暂无数据</div>}
          <Modal
            className='my-modal goods-modal-box'
            visible={this.state.showGoodsModal}
            transparent
            maskClosable={false}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
            <div className="my-modal-big">
              <div
                className="close"
                onClick={() => this.onCloseGoodsModal()}
              />
              {this.state.goodsDetail.thumb && <div className="my-modal-box">

                <div className="modal-img">
                  <img src={this.state.goodsDetail.thumb} alt="" />
                </div>
                <div className="title">
                  <div className='l'>
                    <div>{this.state.goodsDetail.name}</div>
                    {this.state.goodsDetail.code ? <div>{this.state.goodsDetail.code}</div> : null}
                  </div>
                  <div className="price">
                    {/*建议零售价：<span>{StringFormat.toCurrency(this.state.goodsDetail.price)}</span> */}
                    建议零售价：<span className="price_span">请咨询当地经销商</span> 
                  </div>
                </div>
                <div className="detail" dangerouslySetInnerHTML={{ __html: this.state.goodsDetail.description }}>
                </div>
                {this.state.fontFlag && <div className='modal-btn' onClick={() => { this.jumpJiaZhaung(this.state.goodsDetail.id) }}>查看加装效果</div>}
                <div className='bottom-null'></div>
              </div>}
            </div>
          </Modal>
          <Modal
            className='my-modal goods-modal-box padding zixun-modal-box'
            visible={this.state.showGoodsModalzx}
            transparent
            maskClosable={false}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
            <div className="my-modal-big">
              {zixunStep !== 2 && <div
                className="close"
                onClick={() => this.onCloseGoodsModalzx()}
              />}
              {zixunStep === 1 && <div className="zixun-modal">
                <div className="zixun-t">
                  我要咨询
                  </div>
                <div className="label-box ">
                  <div className='l label-must'>
                    姓名：
                        </div>
                  <div className="r">
                    <MyInput
                      value={this.state.uname}
                      placeholder='请输入姓名'
                      onChange={(v) => this.onChangeHandle('uname', v)}
                    />
                  </div>
                </div>
                <div className="label-box sex-checked">
                  <div className='l'>
                  </div>
                  <div className="r ">
                    <MyRadio
                      value={this.state.sexValue}
                      data={this.state.sexData}
                      onChange={(v) => this.onChangeHandle('sexValue', v)}
                    />
                  </div>
                </div>
                <div className="label-box">
                  <div className='l label-must'>
                    手机：
                        </div>
                  <div className="r">
                    <MyInput
                      value={this.state.phoneNo}
                      placeholder='请输入手机号'
                      onChange={(v) => this.onChangeHandle('phoneNo', v)}
                    />
                    {
                      mobileChanged && (
                        <div className="btn_link">
                          <div className="hori_line"></div>
                          <a onClick={() => { this.getPhoneCode() }}>{this.state.leftSecond > 0 ? this.state.leftSecond + 's后获取' : '获取验证码'}</a>
                        </div>
                      )
                    }
                  </div>
                </div>
                {
                  mobileChanged && (
                    <div className="label-box">
                      <div className='l label-must'>
                        验证码：
                        </div>
                      <div className="r">
                        <MyInput
                          value={this.state.code}
                          placeholder='请输入手机验证码'
                          onChange={(v) => this.onChangeHandle('code', v)}
                        />
                      </div>
                    </div>
                  )
                }
                <div className="chose-jxs">
                  <h3>
                    选择经销商：
                  </h3>
                  <div className="two-label">
                    <MySelect
                      extra=""
                      value={this.state.curprovince}
                      data={this.state.provinceList}
                      onChange={(v) => this.changeProvince(v)}
                    />
                    <MySelect
                      extra=""
                      value={this.state.curcity}
                      data={this.state.cityList}
                      onChange={(v) => this.changeCity(v)}
                    />
                  </div>
                  <MySelect
                    extra="下拉选择/输入快捷检索"
                    value={this.state.curdealer}
                    data={this.state.dealerList}
                    onChange={(v) => this.onChangeHandle('curdealer', v)}
                  />
                  <div className="my-btn ">
                    <Button inline onClick={(e) => this.zixunFun(e, 2)}>提交</Button>
                  </div>
                </div>
              </div>}
              {
                zixunStep === 2 &&
                <div className='zixun-modal'>
                  <div className="success fpwd-box">
                    <div className="img">
                      <img src={require('../../../imgs/login-success.png')} alt="" />
                    </div>
                    <div className="txt">
                      您已提交成功！<br />
                      工作人员将于近日联系您，请耐心等待！
                      </div>
                  </div>
                  <div className="my-btn mt-4">
                    <Button inline onClick={(e) => this.onCloseGoodsModalzx()}>知道了</Button>
                  </div>
                </div>
              }

            </div>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Pureuse;
