import React, { Component } from 'react';

import { Modal, Icon } from 'antd-mobile';
import CarInner from './components/CarInner';
import CompareSide from './components/CompareSide';
import { HTTPGet } from '../../../utils/http';
import Gotop from '../../../components/common/gotop';

import './index.less'
class Cartype extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal1: false,
      typeList: [],
      brandid: '13'
    };
  }
  componentDidMount() {
    document.title = '品牌车型'
  }
  componentWillMount() {
    HTTPGet('/Website/Car/brandModels').then((result) => {
      if (result && result.code == 0) {
        let list = result.data
        this.setState({
          typeList: list
        })
      }
    })
  }
  getCompareList() {
    let list = this.props.getAll()['compareList'];
    return list;
  }
  jumpCompare() {
    this.props.history.push('/buycar/cartype/compare');
  }
  changeBrandid(val) {
    this.setState({
      brandid: val
    });
  }
  jumpShijia() {
    this.props.history.push('/buycar/shijia');
  }
  render() {
    return (
      <div className='cartype'>
        {/* <div className='top-title border-b'>
          品牌车型
        </div> */}
        <div className='tag-container border-b'>
          <div className='tag-row'>
            {this.state.typeList.map((val, index) => {
              let list = val['car_series'];
              if (list && list.length > 0) {
                return <a href={'#brand-' + val['brand_id']} className={this.state.brandid == val['brand_id'] ? 'tag current' : 'tag'} onClick={() => { this.changeBrandid(val['brand_id']) }} key={'tag-' + index}>{val.title}</a>
              } else {
                return <a href={'#brand-' + val['brand_id']} className={this.state.brandid == val['brand_id'] ? 'tag current' : 'tag'} onClick={() => { this.changeBrandid(val['brand_id']) }} key={'tag-' + index}>{val.title}(敬请期待)</a>
              }
            })}
          </div>
        </div>
        {this.state.typeList.map((val, index) => {
          let list = val['car_series'];
          if (list.length > 0) {
            let temp = []
            for (let i = 0; i < list.length; i++) {
              if (i % 2 == 0) {
                if (list[i + 1])
                  temp.push([list[i], list[i + 1]]);
                else
                  temp.push([list[i]]);
              }
            }
            return (
              <div key={'brand-' + index} id={'brand-' + val['brand_id']} className='pos'>
                <div className='tag-title border-b'>
                  {val.title}
                </div>
                <div className='car-list border-b'>
                  {temp.map((brand, brandindex) => {
                    return <CarInner brand={brand} brandid={val['brand_id']} key={'branditem-' + brandindex}></CarInner>
                  })}
                </div>
              </div>
            )
          } else {
            return null;
          }
        })}
        <div className='date'>
          <div className='btn' onClick={() => { this.jumpShijia() }}>
            <img src={require(`../../../imgs/home-btn4.png`)} alt="img" />
            预约试驾
            </div>
        </div>
        <CompareSide jumpCompare={() => { this.jumpCompare(); }}></CompareSide>
        <Gotop></Gotop>
      </div>
    );
  }
}

export default Cartype;
