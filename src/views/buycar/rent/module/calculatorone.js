import React, { Component } from 'react'
import { Button, Toast, ActivityIndicator } from 'antd-mobile';

import { MySelect, MyInput } from '../../../../components/dataview'
import { HTTPGet, HTTPPost } from '../../../../utils/http';
import { StringFormat } from '../../../../utils/util';

class Calculatorone extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step: 1,
      vehicleList: [],
      vehicle: [''],
      versionList: [],
      version: [''],
      typeList: [
        { label: '直租', value: '1' },
        { label: '回租', value: '2' },
      ],
      type: ['1'],
      actualPrice: '',
      purchaseTax: '',
      suppliesAddFee: '',
      registrationServiceFee: '',
      premiumFee: '',
      carVesselTax: '',
      totalFee: '',
      stageNum: [''],
      downPayment: '',
      cashDeposit: '',
      finalPaymentProportion: '',
      downPaymentProportion: '',
      stageList: [],
      stageMap: {},
      leaseInfo: {},
      priceList: {},
      animateFlag: false,
    }
  }
  componentWillMount() {
    let renturl = '/api/getLeaseConfig/toyota_lease';
    HTTPGet(renturl).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let list = [];
        let map = {};
        for (let item of reuslt.data) {
          list.push({ label: item.stageNum, value: item.stageNum });
          map[item.stageNum + ''] = item;
        }
        this.setState({
          stageList: list,
          stageMap: map
        });
      }
    });
  }
  onChangeVehicle(cid) {
    let url = '/Website/Car/getVersion/cid/' + cid[0];
    HTTPGet(url).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let list = [];
        let priceList = {};
        for (let item of reuslt.data) {
          list.push({ label: <span dangerouslySetInnerHTML={{ __html: item.version + item.name }}></span>, value: item.id })
          priceList[item.id] = item['shop_price'];
        }
        this.setState({
          versionList: list,
          vehicle: cid,
          priceList: priceList,
          version: '',
          actualPrice: ''
        }, () => {
          this.calcTotal();
        });
      }
    });
  }
  onChangeVersion(version) {
    let price = this.state.priceList[version[0]];
    this.setState({
      version: version,
      actualPrice: price
    }, () => {
      this.calcTotal();
    });
  }
  onChangeType(type) {
    this.setState({
      type: type
    });
  }
  onChangeStageNum(stageNum) {
    let finalPaymentProportion = this.state.stageMap[stageNum[0]].finalPaymentProportion
    finalPaymentProportion = parseInt(finalPaymentProportion);
    let downPaymentProportion = this.state.stageMap[stageNum[0]].downPaymentProportion
    downPaymentProportion = parseInt(downPaymentProportion);
    this.setState({
      stageNum: stageNum,
      finalPaymentProportion: finalPaymentProportion,
      downPaymentProportion: downPaymentProportion
    });
  }
  onChangeStep(step) {
    if (step == 3) {
      this.getLease();
    } else if (step == 2) {
      if (!this.state.type[0]) {
        Toast.info('请选择融资类型', 1);
        return false;
      }
      if (!this.state.vehicle[0]) {
        Toast.info('请选择车型', 1);
        return false;
      }
      if (!this.state.version[0]) {
        Toast.info('请选择车型配置', 1);
        return false;
      }
      if (!this.state.actualPrice) {
        Toast.info('请填写实际销售价', 1);
        return false;
      }
      this.setState({
        step
      })
    } else {
      this.setState({
        step
      })
    }
  }
  onChangeHandle(k, v) {
    this.setState({
      [k]: v
    }, () => {
      this.calcTotal();
    });
  }
  onChangeFinal(v) {
    let val = v.replace('%', '');
    this.setState({
      finalPaymentProportion: val
    });

  }
  calcTotal() {
    let total = 0;
    total += parseFloat(this.numDef(this.state.actualPrice));
    total += parseFloat(this.numDef(this.state.purchaseTax));
    total += parseFloat(this.numDef(this.state.suppliesAddFee));
    total += parseFloat(this.numDef(this.state.registrationServiceFee));
    total += parseFloat(this.numDef(this.state.premiumFee));
    total += parseFloat(this.numDef(this.state.carVesselTax));
    this.setState({
      totalFee: total
    });
  }
  numDef(val) {
    if (val) {
      return val;
    } else {
      return 0;
    }
  }
  getLease() {
    let url = '/api/toyotaLease';

    if (!this.state.stageNum[0]) {
      Toast.info('请选择期限', 1);
      return false;
    }
    if (!this.state.downPayment) {
      Toast.info('请填写首付款', 1);
      return false;
    }
    if (!this.state.finalPaymentProportion) {
      Toast.info('请填写尾款比例', 1);
      return false;
    }
    let data = {
      carModelsId: this.state.vehicle[0],
      carVersionId: this.state.version[0],
      // carVersionId: this.state.vehicle[0],
      financingType: this.state.type[0],
      actualPrice: this.state.actualPrice,
      purchaseTax: this.state.purchaseTax,
      suppliesAddFee: this.state.suppliesAddFee,
      registrationServiceFee: this.state.registrationServiceFee,
      premiumFee: this.state.premiumFee,
      carVesselTax: this.state.carVesselTax,
      totalFee: this.state.totalFee,
      stageNum: this.state.stageNum[0],
      downPayment: this.state.downPayment,
      cashDeposit: this.state.cashDeposit,
      finalPaymentProportion: this.state.finalPaymentProportion,
    };
    this.setState({
      animateFlag: true
    });
    window.myModal();
    HTTPPost(url, data).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        this.setState({
          leaseInfo: reuslt.data,
          step: 3,
          animateFlag: false,
        });
      } else {
        this.setState({
          animateFlag: false,
        });
      }
      window.myModal1();
    });
  }
  getRate() {
    if (this.state.stageNum[0]) {
      if (this.state.downPayment) {
        if (this.state.totalFee == 0 || !this.state.totalFee) {
          return '--'
        }
        let rate = this.state.downPayment / this.state.totalFee;
        rate = parseInt(rate * 100);
        return rate.toFixed(2) + '%';
      } else {
        return '--'
      }
    } else {
      return '--'
    }
  }
  getLeftText() {
    if (this.state.stageNum[0]) {
      if (this.state.downPaymentProportion) {
        if (this.state.actualPrice == 0 || !this.state.totalFee) {
          return '--'
        }
        return `实际售价的5%-${this.state.downPaymentProportion}%`
      } else {
        return '--'
      }
    } else {
      return '--'
    }
  }
  getRightText() {
    if (this.state.stageNum[0]) {
      if (this.state.downPaymentProportion) {
        if (this.state.actualPrice == 0 || !this.state.totalFee) {
          return '--'
        }
        let val1 = this.state.totalFee * 5;
        val1 = parseInt(val1 / 100);
        let val2 = this.state.totalFee * this.state.downPaymentProportion;
        val2 = parseInt(val2 / 100);
        return `${val1}~${val2}`
      } else {
        return '--'
      }
    } else {
      return '--'
    }
  }
  render() {
    const { step } = this.state
    return (
      <div className='info-box'>
        {step === 1 ?
          <div className="title">
            <span>01</span>
            选择车型输入信息
        </div>
          : step === 2 ?
            <div className="title">
              <span>02</span>
              填写融资信息
        </div>
            :
            <div className="title">
              <span>03</span>
              生成金融方案
        </div>
        }
        {step === 1 && <div className="one">
          <ul className='info'>
            <li>
              <div className="label-box">
                <div className='l label-must justify'>
                  融资类型
                  </div>：
                <div className="r">
                  <MySelect
                    extra="选择融资类型"
                    value={this.state.type}
                    data={this.state.typeList}
                    onChange={(v) => this.onChangeType(v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box">
                <div className='l label-must justify'>
                  车型
                  </div>：
                <div className="r">
                  <MySelect
                    extra="选择车型"
                    value={this.state.vehicle}
                    data={this.props.vehicleList}
                    onChange={(v) => this.onChangeVehicle(v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box">
                <div className='l label-must justify'>
                  配置
                  </div>：
                <div className="r">
                  <MySelect
                    extra="选择车型配置"
                    value={this.state.version}
                    data={this.state.versionList}
                    onChange={(v) => this.onChangeVersion(v)}
                  />
                </div>
              </div>
            </li>
            <li className="my-line mb-4" />
            <li>
              <div className="label-box-nobg">
                <div className='l label-must'>
                  实际销售价(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="系统计算获得，可修改"
                    value={this.state.actualPrice}
                    onChange={(v) => this.onChangeHandle('actualPrice', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  购置税(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入购置税"
                    value={this.state.purchaseTax}
                    onChange={(v) => this.onChangeHandle('purchaseTax', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  精品加装费(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入精品加装费"
                    value={this.state.suppliesAddFee}
                    onChange={(v) => this.onChangeHandle('suppliesAddFee', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  上牌服务费(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入上牌服务费"
                    value={this.state.registrationServiceFee}
                    onChange={(v) => this.onChangeHandle('registrationServiceFee', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  保险费(首年)(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入保险费"
                    value={this.state.premiumFee}
                    onChange={(v) => this.onChangeHandle('premiumFee', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  车船税(首年)(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入车船税"
                    value={this.state.carVesselTax}
                    onChange={(v) => this.onChangeHandle('carVesselTax', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  合计(元)：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder=""
                    value={this.state.totalFee}
                    onChange={(v) => { }}
                  />
                </div>
              </div>
            </li>
            <li className="my-btn mt-4">
              <Button inline onClick={() => this.onChangeStep(2)}>下一步</Button>
            </li>
          </ul>
        </div>}
        {step === 2 && <div className="one">
          <ul className='info'>
            <li>
              <div className="label-box">
                <div className='l label-must'>
                  期限（月）：
                  </div>
                <div className="r">
                  <MySelect
                    extra="选择期限"
                    value={this.state.stageNum}
                    data={this.state.stageList}
                    onChange={(v) => this.onChangeStageNum(v)}
                  />
                </div>
              </div>
            </li>
            <li className="my-line mb-4" />
            <li>
              <div className="input-tishi">
                <span>{this.getLeftText()}</span>
                <span>{this.getRightText()}</span>
              </div>
              <div className="label-box-nobg no-mt">
                <div className='l label-must'>
                  首付款（元）（{this.getRate()}）：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入首付款"
                    value={this.state.downPayment}
                    onChange={(v) => this.onChangeHandle('downPayment', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  保证金（元）：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入保证金"
                    value={this.state.cashDeposit}
                    onChange={(v) => this.onChangeHandle('cashDeposit', v)}
                  />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l label-must'>
                  (残值率) 尾款比例：
                  </div>
                <div className="r">
                  <MyInput
                    placeholder="请输入尾款比例"
                    value={this.state.finalPaymentProportion + '%'}
                    onChange={(v) => this.onChangeFinal(v)}
                  />
                </div>
              </div>
            </li>
            <li className="my-btn mt-4">
              <Button inline onClick={() => this.onChangeStep(3)}>生成方案</Button>
            </li>
          </ul>
        </div>}
        {step === 3 && <div className="one">
          <ul className='info'>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  实际销售价（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.actualPrice)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  融资金额（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.financingAmount)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  月租金（元）：
                  </div>
                <div className="r res-r">
                  {StringFormat.toCurrency(this.state.leaseInfo.monthlyRent)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  尾款比例：
                  </div>
                <div className="r res-g">
                  {this.state.leaseInfo.finalPaymentProportion}%
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  期末留购价（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.finalPayment)}
                </div>
              </div>
            </li>
          </ul>
        </div>}
        <div className="tishi-b">
          注：以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商。
        </div>
        <ActivityIndicator
          toast
          text="方案生成中..."
          animating={this.state.animateFlag}
        />
      </div>
    )
  }
}
export default Calculatorone