import React, { Component } from 'react';
import { Link ,withRouter} from 'react-router-dom'
import { Toast } from 'antd-mobile';

import { StringFormat } from '../../../../utils/util';

import './carItem.less'

class CarItem extends Component {
  changeStyle() {
    this.props.showInfo();
  }
  getLink(car) {
    if (car.is3d === '1') {
      return `/3d/${car.alias}`
    } else {
      return `/buycar/cartype/detail/${car.alias}`
    }
  }
  jumpCompare(){
    let car = this.props.carinfo;
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    if(list.length>4){
      Toast.info('最多选择4辆车',1);
      this.props.history.push('/buycar/cartype/compare');
    }else{
      let item = {
        carinfo: this.props.carinfo,
        version: ''
      }
      list.push(item);
      let str = JSON.stringify(list);
      localStorage.setItem('compareList',str);
      this.props.history.push('/buycar/cartype/compare');
    }
  }
  render() {
    return (
      <div className='car-item'>
        <div className='car-tag'>
          {this.props.carinfo.isnew ? <img src={require(`../../../../imgs/modal-new.png`)} alt="img" className='new' /> : <div className='new'></div>}
          {this.props.carinfo.is3d ? <img src={require(`../../../../imgs/modal-show.png`)} alt="img" className='show' /> : <div className='show'></div>}
        </div>
        <div className='car-pic'>
          <Link to={this.getLink(this.props.carinfo)}><img src={this.props.carinfo.thumb} alt="img" /></Link>
        </div>
        <div className='car-name border-b'>
          {this.props.carinfo.name}
        </div>
        <div className='car-price border-b'>
          {this.props.carinfo.price ? (/[\d.]+/.test(this.props.carinfo.price) ? '价格:' + StringFormat.rangePrice(this.props.carinfo.price) : this.props.carinfo.price) : '价格请咨询当地经销商'}
        </div>
        <div className="car-btn">
          <div  className='car-compare_xq'>
            <img src={require('../../../../imgs/fwhd-0.png')} alt="" />
            <Link to={this.getLink({ ...this.props.carinfo, is3d: 0 })}>查看详情</Link>
          </div>
          <div onClick={this.changeStyle.bind(this)} className={this.props.carinfo.activeFlag ? 'car-compare active' : 'car-compare'}>
            <img src={this.props.carinfo.activeFlag ?require(`../../../../imgs/icon-plus-1.png`):require(`../../../../imgs/icon-plus.png`)} alt="img"/>
          </div>
          {/* <div className={'car-compare'} onClick={()=>{this.jumpCompare()}}>
            对比
          </div> */}
        </div>
      </div>
    );
  }
}

export default withRouter(CarItem);
