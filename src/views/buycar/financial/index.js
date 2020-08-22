import React, { Component } from 'react';

import { Tabs, Button, Slider, Toast } from 'antd-mobile';
import { MyInput, MyRadio, MySelect } from '../../../components/dataview';
import { HTTPGet, HTTPPost } from '../../../utils/http';
import { StringFormat } from '../../../utils/util';

import './index.less'

class Financial extends Component {
  constructor(props) {
    super(props)
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
      feeRateInclude: [3, 4, 6, 7],//提示费率的机构编号
      downPayment: 0,
      finalPayment: 0,
      schemeMould: [
        { label: '售价（元）', keyWord: 'carPrice', color: '#d3b07a' },
        { label: '首付金额（元）', keyWord: 'downPaymentMoney', color: '#d3b07a' },
        { label: '贷款金额（元）', keyWord: 'loanMoney', color: '#ec676d' },
        { label: '月供（元）', keyWord: 'monthPaymentMoney', color: '#ec676d' },
        { label: '利率', keyWord: 'rate', color: '#d3b07a' },
        { label: '尾款金额（元）', keyWord: 'finalPaymentMoney', color: '#ec676d' },
      ],
      activity: {},
      step: 1,
      vehicleList: [],
      curvehicle: curvehicle,
      priceList: [],
      versionList: [],
      curversion: '',
      actualPrice: '',
      organList: [],
      curorgan: '',
      productTypeList: [],
      curproducttype: '',
      productList: [],
      curproduct: '',
      stageList: [],
      curstage: '',
      stageMap: {},
      stageInfo: {},
      schemeData: {},
      index: index,
      organStatusMap: {},
      showDownPayment: true,
      showFinalPayment: true
    }
  }
  componentDidMount() {
    document.title = '金融服务'
  }
  componentWillMount() {
    // 促销活动
    let url1 = '/api/getFinanceActiveList/0';
    // 车型列表
    let url2 = '/api/financeVehicleList';
    HTTPGet(url1).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let activity = {};
        let list = [];
        for (let item of reuslt.data) {
          activity.activityTitle = item.activityTitle;
          list.push(item);
        }
        activity.list = list;
        this.setState({
          activity: activity
        });
      }
    });
    HTTPGet(url2).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let vehicleList = [];
        for (let item of reuslt.data) {
          vehicleList.push({
            label: item.cName,
            value: item.cid
          });
        }
        this.setState({
          vehicleList: vehicleList
        });
      }
    });
    let cid = this.state.curvehicle;
    if (cid.length === 1) {
      this.onChangeVehicle(cid);
    }
  }
  onChangeVehicle(val) {
    let cid = val[0];
    let url = '/api/vehicleVersionList/' + cid;
    HTTPGet(url).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let list = [];
        let priceList = [];
        for (let item of reuslt.data) {
          list.push({ label: item.version, value: item.versionId })
          priceList[item.versionId] = item['price'];
        }
        this.setState({
          versionList: list,
          curvehicle: val,
          priceList: priceList,
          curversion: '',
          actualPrice: '',
          organList: [],
          curorgan: '',
          productTypeList: [],
          curproducttype: '',
          productList: [],
          curproduct: '',
          stageList: [],
          curstage: '',
          stageMap: {},
          downPayment: 0,
          finalPayment: 0,
        });
      }
    });
  }
  onChangeVersion(version) {
    let price = this.state.priceList[version[0]];
    let url = '/api/financeOrganList/' + version[0];
    HTTPGet(url).then(result => {
      if (result && result.code == 0) {
        let organList = [];
        let organStatusMap = {};
        for (let item of result.data) {
          organStatusMap[item.organId + ''] = item.status;
          organList.push({
            value: item.organId,
            label: item.organName,
            status: item.status
          });
        }
        this.setState({
          curversion: version,
          actualPrice: price,
          organList: organList,
          curorgan: '',
          productTypeList: [],
          curproducttype: '',
          productList: [],
          curproduct: '',
          stageList: [],
          curstage: '',
          stageMap: {},
          downPayment: 0,
          finalPayment: 0,
          organStatusMap: organStatusMap,
        });
      } else {
        this.setState({
          curversion: version,
          actualPrice: price
        });
      }
    });
  }
  onChangeOrgan(organ) {
    let url = `/api/financeProductTypeList/${this.state.curversion[0]}/${organ[0]}`;
    let status = this.state.organStatusMap[organ[0] + ''];
    if (status != '1') {
      Toast.info('请选择其他的金融机构', 1);
      return false;
    }
    HTTPGet(url).then(result => {
      if (result && result.code == 0) {
        let productTypeList = [];
        for (let item of result.data) {
          productTypeList.push({
            value: item.typeId,
            label: item.typeName
          });
        }
        this.setState({
          curorgan: organ,
          productTypeList: productTypeList,
          curproducttype: '',
          productList: [],
          curproduct: '',
          stageList: [],
          curstage: '',
          stageMap: {},
          downPayment: 0,
          finalPayment: 0,
        });
      } else {
        this.setState({
          curorgan: organ
        });
      }
    });
  }
  onChangeProductType(type) {
    let url = `/api/financeProductList/${type[0]}/${this.state.curorgan[0]}/${this.state.curversion[0]}`;
    HTTPGet(url).then(result => {
      if (result && result.code == 0) {
        let productList = [];
        for (let item of result.data) {
          productList.push({
            value: item.productId,
            label: item.productName
          });
        }
        this.setState({
          curproducttype: type,
          productList: productList,
          curproduct: '',
          stageList: [],
          curstage: '',
          stageMap: {},
          downPayment: 0,
          finalPayment: 0,
        });
      } else {
        this.setState({
          curproducttype: type
        });
      }
    });
  }
  onChangeProduct(product) {
    let url = `/api/financeProductDetail/${product[0]}/${this.state.curversion[0]}`;
    HTTPGet(url).then(result => {
      if (result && result.code == 0) {
        let stageList = [];
        let stageMap = {};
        let showDownPayment = true;
        let showFinalPayment = true;
        for (let item of result.data.stageList) {
          stageList.push({
            value: item.stages,
            label: item.stages
          });
          stageMap[item.stages] = item;
          if (item.downPaymentFrom === 0 && item.downPaymentTo === 0) {
            showDownPayment = false
          }
          if (item.finalPaymentFrom === 0 && item.finalPaymentTo === 0) {
            showFinalPayment = false
          }
        }
        this.setState({
          showDownPayment,
          showFinalPayment,
          curproduct: product,
          stageList: stageList,
          curstage: '',
          stageMap: stageMap,
          downPayment: 0,
          finalPayment: 0,
        });
      } else {
        this.setState({
          curproduct: product
        });
      }
    });
  }
  onChangeStage(stage) {
    let stageInfo = this.state.stageMap[stage[0]];
    let finalPayment = stageInfo.finalPaymentFrom;
    // if (this.state.curproducttype[0] != 34){
    //   finalPayment = 0;
    // }
    this.setState({
      curstage: stage,
      stageInfo: stageInfo,
      downPayment: stageInfo.downPaymentFrom,
      finalPayment: finalPayment,
    });
  }
  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }
  log = (name) => {
    return (value) => {
      let stageInfo = this.state.stageInfo;
      if (value >= stageInfo.downPaymentFrom && value <= stageInfo.downPaymentTo)
        this.onChangeHandle(name, value)
    };
  }
  onChangeStep() {
    let url = '/api/financeProgram';
    let data = {
      cid: this.state.curvehicle[0],
      versionId: this.state.curversion[0],
      organId: this.state.curorgan[0],
      productId: this.state.curproduct[0],
      downPaymentProportion: this.state.downPayment,
      finalPaymentProportion: this.state.finalPayment,
      carPrice: parseFloat(this.state.actualPrice),
      stages: this.state.curstage[0]
    };
    HTTPPost(url, data).then(result => {
      if (result && result.code == 0) {
        this.setState({
          step: 2,
          schemeData: result.data
        });
      } else {
        if (result.msg)
          Toast.info(result.msg, 1);
        return false;
      }
    });
    // this.setState({step:2});
  }
  // 处理为空时为默认
  numDef(num, def = 0) {
    if (num) {
      return num;
    } else {
      return def;
    }
  }
  setIndex(v, i) {
    this.setState({
      index: i
    })
  }
  render() {
    const { step, showDownPayment, showFinalPayment } = this.state
    return (
      <div className='financial'>
        <div className="title-img">
          <img src={require('../../../imgs/jinrong-banner.png')} alt="" />
          {/* <span style={{ color: '#fff' }}>金融服务</span> */}
          <div className='tag-img'>
            <img src={require('../../../imgs/tag-finace.png')} alt="" />
          </div>
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={[{ title: '贴心金融' }, { title: '金融计算器' },]}
            animated={false}
            swipeable={false}
            useOnPan={false}
            page={this.state.index}
            onTabClick={(v, i) => this.setIndex(v, i)}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} />}
          >
            <div className='tiexin'>
              <div className="t box-big ">
                <p>一汽丰田的经销店与两家金融公司以及多家银行合作，融资租赁机构开展汽车个人贷款业务。</p>
                <p>客户需要贷款购车时，可以根据自身条件选择不同的金融机构，经销店会为客户提供便捷、安心的一站式服务。</p>
              </div>
              <h3 className="title box-big">
                {this.state.activity.activityTitle ? this.state.activity.activityTitle : ''}
              </h3>
              <ul className="jinrong-type box-big">
                {this.state.activity.list ? this.state.activity.list.map((val, index) => {
                  return (
                    <li key={'activity-' + index}>
                      <div className="img">
                        <img src={val.wapActivityPic} alt="" />
                      </div>
                      <ul className="list">
                        {val.activityContent.map((inner, innerindex) => {
                          return <li key={'inner-' + innerindex}>{inner}</li>
                        })}
                      </ul>
                    </li>
                  )
                }) : null}
              </ul>
              <div className="hezuopt ">
                <h3 className="title pt-8 ">
                  金融合作平台
                </h3>
                <ul className="pic-list box-big">
                  {
                    '1.2.3.4.5.6.7.8'.split('.').map((v, i) => {
                      return (
                        <li key={i}>
                          <img src={require(`../../../imgs/jinrong-l-${v}.png`)} alt="" />
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
              <div className="chuangxinc box-big">
                <h3 className="title pt-8 mt-0">
                  金融创新产品
                </h3>
                <p>一汽丰田在传统定额本息产品之外，还开发了6款金融创新产品，给不同客户提供丰富的选择。</p>
                <ul>
                  <li>
                    <div className="img">
                      <img src={require(`../../../imgs/jinrong-b-1.png`)} alt="" />
                    </div>
                    <div className="r">
                      <h4>安享贷</h4>
                      <p>超低首付，2-3年低利息金融产品，赠送客户一年三大保障延保产品</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src={require(`../../../imgs/jinrong-b-2.png`)} alt="" />
                    </div>
                    <div className="r">
                      <h4>附加贷</h4>
                      <p>购置税、保险、精品、保养等贷款享受低利息</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src={require(`../../../imgs/jinrong-b-3.png`)} alt="" />
                    </div>
                    <div className="r">
                      <h4>田园贷</h4>
                      <p>1年0利息，2年、3年低利息，针对农村户籍客户的专属产品，适用绿色快捷审批通道</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src={require(`../../../imgs/jinrong-b-4.png`)} alt="" />
                    </div>
                    <div className="r">
                      <h4>轻松贷</h4>
                      <p>尾款型金融产品，首付、尾款比例根据客户的需求均可定制</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src={require(`../../../imgs/jinrong-b-5.png`)} alt="" />
                    </div>
                    <div className="r">
                      <h4>保客贷</h4>
                      <p>专享0利息贷款产品，面向在一汽丰田合作2+6金融平台发生过车贷业务的客户</p>
                    </div>
                  </li>
                  <li>
                    <div className="img">
                      <img src={require(`../../../imgs/jinrong-b-6.png`)} alt="" />
                    </div>
                    <div className="r">
                      <h4>定保贷</h4>
                      <p>多年联保，一价锁定，化整为零，用车无忧</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="tishi-b">
                注：具体详情请咨询当地经销商
              </div>
            </div>
            <div className='jisuanqi box-big'>
              <div className="info-box">
                {step === 1 ?
                  <div className="title">
                    <span>01</span>
                    选择车型输入信息
                </div>
                  :
                  <div className="title">
                    <span>02</span>
                    生成金融方案
                </div>
                }
                {step === 2 && <ul className="info jieguoye">
                  {
                    this.state.schemeMould.map((v, i) => {
                      return (
                        <li key={i}>
                          <div className="label-box ">
                            <div className='l'>
                              {v.keyWord == 'rate' && this.state.feeRateInclude.indexOf(this.state.curorgan[0]) > -1 ? '费率' : v.label}
                            </div>：
                          <div className="r">
                              {v.keyWord == 'rate' ? <p style={{ color: v.color }}>{this.state.schemeData[v.keyWord]}%</p> : <p style={{ color: v.color }}>{StringFormat.toCurrency(this.state.schemeData[v.keyWord])}</p>}
                            </div>
                          </div>
                        </li>
                      )
                    })
                  }
                </ul>}
                {step === 1 && <ul className="info">
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        车型
                          </div>：
                      <div className="r">
                        <MySelect
                          extra="选择车型"
                          value={this.state.curvehicle}
                          data={this.state.vehicleList}
                          onChange={(v) => this.onChangeVehicle(v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        配置
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="选择车型配置"
                          value={this.state.curversion}
                          data={this.state.versionList}
                          onChange={(v) => this.onChangeVersion(v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="my-line mb-4" />
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        售价<span style={{ display: 'inline-block' }}>(元)</span>
                      </div>：
                      <div className="r">
                        <MyInput
                          placeholder="系统计算获得，可修改"
                          value={this.state.actualPrice}
                          onChange={(v) => this.onChangeHandle('actualPrice', v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="my-line mb-4" />
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        金融机构
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="选择金融机构"
                          value={this.state.curorgan}
                          data={this.state.organList}
                          onChange={(v) => this.onChangeOrgan(v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        金融产品类型
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="选择金融产品类型"
                          value={this.state.curproducttype}
                          data={this.state.productTypeList}
                          onChange={(v) => this.onChangeProductType(v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        金融产品名称
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="选择金融产品"
                          value={this.state.curproduct}
                          data={this.state.productList}
                          onChange={(v) => this.onChangeProduct(v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="my-line mb-4" />
                  <li>
                    <div className="label-box label-must">
                      <div className='l label-must'>
                        分期数
                      </div>：
                      <div className="r">
                        <MySelect
                          extra="选择分期数"
                          value={this.state.curstage}
                          data={this.state.stageList}
                          onChange={(v) => this.onChangeStage(v)}
                        />
                      </div>
                    </div>
                  </li>
                  <li className="my-line mb-4" />
                  {
                    showDownPayment && (
                      <React.Fragment>
                        <li>
                          <div className="label-box label-must">
                            <div className='l label-must'>
                              首付比例
                      </div>：
                      <div className="r">
                              <p><span>{this.state.downPayment}%</span></p>
                            </div>
                          </div>
                        </li>
                        <li className="bili">
                          <Slider
                            value={this.state.downPayment}
                            min={0}
                            max={100}
                            onChange={this.log('downPayment')}
                            onAfterChange={this.log('downPayment')}
                            trackStyle={{
                              backgroundColor: '#d3b078',
                              height: '5px',
                            }}
                            railStyle={{
                              // backgroundColor: 'blue',
                              height: '5px',
                            }}
                            handleStyle={{
                              borderColor: '#000',
                              borderWidth: '1px',
                              height: '14px',
                              width: '14px',
                              marginLeft: '-7px',
                              marginTop: '-4.5px',
                              backgroundColor: '#fff',
                            }}
                          />
                        </li>
                      </React.Fragment>
                    )
                  }
                  {
                    showFinalPayment && (
                      <React.Fragment>
                        <li className="my-line mb-4" />
                        <li>
                          <div className="label-box label-must">
                            <div className='l label-must'>
                              尾款比例
                      </div>：
                      <div className="r">
                              <p><span>{this.state.finalPayment}%</span></p>
                            </div>
                          </div>
                        </li>
                        <li className="bili">
                          <Slider
                            value={this.state.finalPayment}
                            min={0}
                            max={100}
                            trackStyle={{
                              backgroundColor: '#d3b078',
                              height: '5px',
                            }}
                            railStyle={{
                              // backgroundColor: 'blue',
                              height: '5px',
                            }}
                            handleStyle={{
                              borderColor: '#000',
                              borderWidth: '1px',
                              height: '14px',
                              width: '14px',
                              marginLeft: '-7px',
                              marginTop: '-4.5px',
                              backgroundColor: '#fff',
                            }}
                          />
                        </li>
                      </React.Fragment>
                    )
                  }

                  <li className="my-line mb-4" />
                  <li className="my-btn">
                    <Button inline onClick={() => this.onChangeStep()}>生成方案</Button>
                  </li>
                </ul>}
                <div className="tishi-b">
                  注：以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商。
                </div>
              </div>
              <div className="info-box">
              </div>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Financial;
