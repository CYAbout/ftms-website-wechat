import React, { Component } from 'react';
import {
  MyRadio,
  MySelect,
  MyDate,
  MyCheckBoxEX
} from '../../../components/dataview';
import {StringFormat} from '../../../utils/util';
const insuranceRateAndValue = {
  '1':{
    accident:{
      '1':950,
      '2':1100
    },
    responsibility:{
      rate:0,
      value:{
        '1':1204,
        '2':1359,
        '3':1631,
        '4':2124,
      }
    },
    lost:{
      rate:0.0135,
      value:566
    },
    drive:{
      rate:0.0067
    },
    deductible:{
      rate:0.15
    },
    burning:{
      rate:0.0015,
      value:0
    },
    glass:{
      rate:{
        '1':0.0036,
        '2':0.0021
      },
      value:0
    },
    steal:{
      rate:0.0041,
      value:120
    },
    scratch:{
      rate:0,
      value:{
        '1':850,
        '2':1100,
        '3':1500,
        '4':2250
      }
    }
  },
  '2':{
    accident:{
      '1':950,
      '2':1100
    },
    responsibility:{
      rate:0,
      value:{
        '1':1227,
        '2':1374,
        '3':1635,
        '4':2130,
      }
    },
    lost:{
      rate:0.0122,
      value:368
    },
    drive:{
      rate:0.0043
    },
    deductible:{
      rate:0.15
    },
    burning:{
      rate:0.0015,
      value:0
    },
    glass:{
      rate:{
        '1':0.0028,
        '2':0.0015
      },
      value:0
    },
    steal:{
      rate:0.0039,
      value:120
    },
    scratch:{
      rate:0,
      value:{
        '1':850,
        '2':1100,
        '3':1500,
        '4':2250
      }
    }
  }
}
class NewCarSetp2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accidentInsurance: '1',
      accidentInsuranceList: [{
        value: '1',
        label: '6座以下'
      }, {
        value: '2',
        label: '6座及以上'
      }],
      responsibilityInsuranceBase: ['1'],
      responsibilityInsurance: '1',
      responsibilityInsuranceList: [
        {
          value: '1',
          label: '20万'
        }, {
          value: '2',
          label: '30万'
        }, {
          value: '3',
          label: '50万'
        }, {
          value: '4',
          label: '100万'
        }
      ],
      lostInsurance: ['1'],
      driveInsuranceBase: ['1'],
      driveInsurance: '5',
      driveInsuranceList: [{
        value: '1',
        label: '1人'
      }, {
        value: '2',
        label: '2人'
      }, {
        value: '3',
        label: '3人'
      }, {
        value: '4',
        label: '4人'
      }, {
        value: '5',
        label: '5人'
      }],
      deductibleInsurance: ['1'],
      burningInsurance: ['1'],
      stealInsurance: ['1'],
      glassInsurance: '',
      glassInsuranceBase: ['1'],
      glassInsurance: '1',
      glassInsuranceList: [{
        value: '1',
        label: '进口'
      }, {
        value: '2',
        label: '国产'
      }],
      scratchInsuranceBase: ['1'],
      scratchInsurance: '1',
      scratchInsuranceList: [{
        value: '1',
        label: '2千'
      }, {
        value: '2',
        label: '5千'
      }, {
        value: '3',
        label: '1万'
      }, {
        value: '4',
        label: '2万'
      }],
      baseList: [
        {
          label: '',
          value: '1',
        },
      ],
    }
  }
  onChangeHandle(key, value) {
    let list = this.state[key+'Base'];
    if(list){
      this.setState({
        [key]: value,
        [key+'Base']: ['1']
      })
    }else{
      this.setState({
        [key]: value
      })
    }
  }
  onBoxChange(key, value){
    console.log(key,value);
    let mykey = key.replace('Base','');
    let base = this.state[key];
    if(base.length!=0){
      this.setState({
        [key]: [],
        [mykey]: ''
      })
    }else{
      this.setState({
        [key]: [value]
      })
    }
  }
  myClick = v => (e)=>{
    e.preventDefault();
    this.props.showModal(v);
  }
  calcTotal(){
    let total = 0;
    let price = 0;
    let t = 100000;
    // 事故
    price = this.calcAccidentInsurance();
    total += price*t;
    // 商业第三责任
    price = this.calcResponsibilityInsurance();
    total += price*t;
    // 车辆损失
    price = this.calcLostInsurance();
    total += price*t;
    // 司乘
    price = this.calcDriverInsurance();
    total += price*t;
    // 不计免赔
    price = this.calcDeductibleInsurance();
    total += price*t;
    // 自燃
    price = this.calcBurningInsurance();
    total += price*t;
    // 玻璃
    price = this.calcGlassInsurance();
    total += price*t;
    // 盗抢
    price = this.calcStealInsurance();
    total += price*t;
    // 车身划痕
    price = this.calcScratchInsurance();
    total += price*t;
    return total/t;
  }
  // 计算 事故
  calcAccidentInsurance(){
    let map = insuranceRateAndValue[this.props.selectInfo.type].accident;
    return map[this.state.accidentInsurance].toFixed(2);
  }
  // 计算 三责险
  calcResponsibilityInsurance(){
    if(this.state.responsibilityInsuranceBase.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].responsibility;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate;
      let val = map.value[this.state.responsibilityInsurance];
      if(!val){
        val = 0;
      }
      return this.plus(val,this.times(carPrice,rate)).toFixed(2);
    }
  }
  // 计算 车辆损失险
  calcLostInsurance(){
    if(this.state.lostInsurance.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].lost;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate;
      let val = map.value;
      return this.plus(val,this.times(carPrice,rate)).toFixed(2);
    }
  }
  // 计算 司乘险
  calcDriverInsurance(){
    if(this.state.driveInsuranceBase.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].drive;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate;
      let partRate = this.times(this.state.driveInsurance,0.2);
      let temp = this.times(carPrice,rate).toFixed(2);
      return this.times(temp,partRate).toFixed(2);
    }
  }
  // 计算 不计免赔特约险
  calcDeductibleInsurance(){
    if(this.state.deductibleInsurance.length==0){
      return 0;
    }else{
      let rate = insuranceRateAndValue[this.props.selectInfo.type].deductible.rate;
      let r = this.calcResponsibilityInsurance();
      let l = this.calcLostInsurance();
      return this.times(this.plus(r,l),rate).toFixed(2);
    }
  }
  // 计算 自然损失险
  calcBurningInsurance(){
    if(this.state.burningInsurance.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].burning;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate;
      let val = map.value;
      return this.plus(val,this.times(carPrice,rate)).toFixed(2);
    }
  }
  // 计算 玻璃单独破碎险
  calcGlassInsurance(){
    if(this.state.glassInsuranceBase.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].glass;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate[this.state.glassInsurance];
      if(!rate){
        return 0;
      }
      let val = map.value;
      if(!val){
        val = 0;
      }
      return this.plus(val,this.times(carPrice,rate)).toFixed(2);
    }
  }
  // 计算 全车盗抢险
  calcStealInsurance(){
    if(this.state.stealInsurance.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].steal;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate;
      let val = map.value;
      return this.plus(val,this.times(carPrice,rate)).toFixed(2);
    }
  }
  // 计算 车身划痕险
  calcScratchInsurance(){
    if(this.state.scratchInsuranceBase.length==0){
      return 0;
    }else{
      let map = insuranceRateAndValue[this.props.selectInfo.type].scratch;
      let carPrice = this.props.selectInfo.carPrice;
      let rate = map.rate;
      let val = map.value[this.state.scratchInsurance];
      if(!val){
        val = 0;
      }
      return this.plus(val,this.times(carPrice,rate)).toFixed(2);
    }
  }
  plus(num1,num2,times=100000){
    let temp = num1*times+num2*times;
    return temp/times;
  }
  times(num,float,times=100000){
    let temp = (num*times)*(float*times);
    return temp/times/times;
  }
  render() {
    const { 
      accidentInsurance,
      accidentInsuranceList,
      responsibilityInsuranceBase,
      responsibilityInsurance,
      responsibilityInsuranceList,
      lostInsurance,
      driveInsuranceBase,
      driveInsurance,
      driveInsuranceList,
      deductibleInsurance,
      burningInsurance,
      glassInsuranceBase,
      glassInsurance,
      stealInsurance,
      glassInsuranceList,
      scratchInsuranceBase,
      scratchInsurance,
      scratchInsuranceList,
      baseList } = this.state;
    return (
      <div className="step_two">
        <div className="title">
          <span>02</span>
          <span>选择保险</span>
        </div>
        <div className="btn black">强制保险</div>
        <div className="card">
          <div className="head">
            <div className="left">交通事故责任强制保险 <i className="info" onClick={this.myClick(['家用6座以下950/年；','家用6座及以上1100/年。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcAccidentInsurance(),{fixed:2})}</div>
          </div>
          <div className="ver_line"></div>
          <div className="content">
            <MyRadio
              value={accidentInsurance}
              data={accidentInsuranceList}
              onChange={(v) => this.onChangeHandle('accidentInsurance', v)}
            />
          </div>
        </div>
        <div className="btn">商业保险</div>
        <div className="card">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={responsibilityInsuranceBase}
                data={baseList}
                onClick={(v) => this.onBoxChange('responsibilityInsuranceBase', v)}
              />
              商业第三人责任险 <i className="info" onClick={this.myClick(['车辆发生事故时，赔偿第三方造成的人身及财产损失。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcResponsibilityInsurance(),{fixed:2})}</div>
          </div>
          <div className="ver_line"></div>
          <div className="content large">
            <MyRadio
              value={responsibilityInsurance}
              data={responsibilityInsuranceList}
              onChange={(v) => this.onChangeHandle('responsibilityInsurance', v)}
            />
          </div>
        </div>
        <div className="card single">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={lostInsurance}
                data={baseList}
                onClick={(v) => this.onBoxChange('lostInsurance', v)}
              />
              车辆损失险 <i className="info" onClick={this.myClick(['车辆发生碰撞后，由保险公司赔偿爱车损失的费用。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcLostInsurance(),{fixed:2})}</div>
          </div>
        </div>
        <div className="card">
          <div className="head">
            <div className="left">
            <MyCheckBoxEX
                value={driveInsuranceBase}
                data={baseList}
                onClick={(v) => this.onBoxChange('driveInsuranceBase', v)}
              />
            司乘险<i className="info" onClick={this.myClick(['赔偿全车被盗、抢劫、抢夺造成的车辆财产损失。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcDriverInsurance(),{fixed:2})}</div>
          </div>
          <div className="ver_line"></div>
          <div className="content large">
            <MyRadio
              value={driveInsurance}
              data={driveInsuranceList}
              onChange={(v) => this.onChangeHandle('driveInsurance', v)}
            />
          </div>
        </div>
        <div className="card single">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={deductibleInsurance}
                data={baseList}
                onClick={(v) => this.onBoxChange('deductibleInsurance', v)}
              />
              不计免赔特约险 <i className="info" onClick={this.myClick(['当保险事故发生后，保险公司将为您承担全部费用。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcDeductibleInsurance(),{fixed:2})}</div>
          </div>
        </div>
        <div className="card single">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={burningInsurance}
                data={baseList}
                onClick={(v) => this.onBoxChange('burningInsurance', v)}
              />
              自然损失险 <i className="info" onClick={this.myClick(['赔偿车子因电器、线路、运载货物等自身原因引发火灾造成的损失。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcBurningInsurance(),{fixed:2})}</div>
          </div>
        </div>
        <div className="card">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={glassInsuranceBase}
                data={baseList}
                onClick={(v) => this.onBoxChange('glassInsuranceBase', v)}
              />
              玻璃单独破碎险<i className="info" onClick={this.myClick(['赔偿保险车辆在使用过程中，发生车窗、挡风玻璃的单独破碎损失。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcGlassInsurance(),{fixed:2})}</div>
          </div>
          <div className="ver_line"></div>
          <div className="content large">
            <MyRadio
              value={glassInsurance}
              data={glassInsuranceList}
              onChange={(v) => this.onChangeHandle('glassInsurance', v)}
            />
          </div>
        </div>
        <div className="card single">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={stealInsurance}
                data={baseList}
                onClick={(v) => this.onBoxChange('stealInsurance', v)}
              />
              全车盗抢险 <i className="info" onClick={this.myClick(['赔偿全车被盗窃、抢劫、抢夺造成的车辆财产损失。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcStealInsurance(),{fixed:2})}</div>
          </div>
        </div>
        <div className="card">
          <div className="head">
            <div className="left">
              <MyCheckBoxEX
                value={scratchInsuranceBase}
                data={baseList}
                onClick={(v) => this.onBoxChange('scratchInsuranceBase', v)}
              />
              车身划痕险<i className="info" onClick={this.myClick(['赔偿他人恶意行为造成的保险车辆的车身人为划痕。'])}></i></div>
            <div className="right">{StringFormat.toCurrency(this.calcScratchInsurance(),{fixed:2})}</div>
          </div>
          <div className="ver_line"></div>
          <div className="content large">
            <MyRadio
              value={scratchInsurance}
              data={scratchInsuranceList}
              onChange={(v) => this.onChangeHandle('scratchInsurance', v)}
            />
          </div>
        </div>
        <div className="description">
          <p className="price">新车保险参考价格：<span>{StringFormat.toCurrency(this.calcTotal(),{fixed:2})}</span></p>
          <p>此保险测算价格仅供参考，实际保费以保单为准</p>
        </div>
      </div>
    )
  }
}

export default NewCarSetp2;