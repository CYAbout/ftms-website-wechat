import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';

import {getAll,add} from '../../../../redux/compare.redux';
import CarItem from './CarItem';
import {HTTPGet} from '../../../../utils/http';
import {StringFormat} from '../../../../utils/util';

import './carInner.less'

@connect(
  state => state,
  {getAll,add}
)
class CarInner extends Component {
  constructor(props){
    super(props)
    let brand = props.brand;
    for(let i in brand){
      brand[i]['activeFlag'] = false;
    }
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    let map = {};
    for(let item of list){
      map[item.version.id] = item.version.id;
    }
    this.state = {
        detailFlag: false,
        brand: brand,
        versionList: [],
        carIndex: 0,
        versionMap: map,
    }
  }
  addToCompare(val){
    let item = {
      carinfo: this.state.brand[this.state.carIndex],
      version: val
    }
    if(this.checkId(val.id)){
      return false;
    }
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    if(list.length<4){
      list.push(item);
      let str = JSON.stringify(list);
      localStorage.setItem('compareList',str);
      this.setState({
        versionMap:{}
      })
    }else{
      Toast.info('最多只能添加4个',1);
      return false;
    }
  }
  showInfo(val){
      let list = this.state.brand;
      let cid = list[val].cid;
      let url = '/Website/Car/getVersion/cid/'+cid;
      HTTPGet(url).then((result)=>{
        if(result && result.code == 0){
          for(let i in list){
            if(i == val){
              list[val].activeFlag = !list[val].activeFlag;
            } else {
              list[i].activeFlag = false;
            }
          }
          let flag = list.some(val=>val.activeFlag);
          let versionList = result.data;
          this.setState({
            brand: list,
            detailFlag: flag,
            versionList: versionList,
            carIndex: val
          });
        }
      })
  }
  checkId(id){
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    if(list.length===0){
      return false;
    }
    let flag = false;
    for(let i in list){
      let item = list[i]
      if(item.version.id == id){
        flag = true;
        break;
      }
    }
    return flag;
  }
  render() {
    return (
      <div className='car-inner'>
        <div className='car-row'>
          {this.state.brand.map((val,index)=>{
            return <CarItem carinfo={val} brandid={this.props.brandid} showInfo={()=>{this.showInfo(index)}} key={'car-'+index}></CarItem>
          })}
        </div>
        <div className={this.state.detailFlag ? 'car-info' : 'car-info hidden'}>
            <div className={this.state.brand[1]&&this.state.brand[1].activeFlag ? 'up r': 'up'}>
                <div></div>
            </div>
            <div className='info'>
                <div className='list'>
                    <div>
                        <ul>
                          {this.state.versionList.map((val,index)=>{
                            return <li key={'item-'+index}>
                                      {this.checkId(val.id)?
                                      <img src={require(`../../../../imgs/compare-add-lg.png`)} className='img' alt="img"/>
                                      :<img src={require(`../../../../imgs/compare-add.png`)} className='img' onClick={()=>{this.addToCompare(val);}} alt="img"/>
                                      }
                                      <div className='detail'>
                                          <div className='name' dangerouslySetInnerHTML={{__html:val.version+val.name}}></div>
                                          <div className='price'>{StringFormat.toCurrency(val['shop_price'])}</div>
                                      </div>
                                  </li>
                          })}
                        </ul>
                    </div>
                </div>
                <div className='tip'>
                    提示:点击选择增加车型对比
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default CarInner;
