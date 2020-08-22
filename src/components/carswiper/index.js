import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import { withRouter } from "react-router-dom";
import './index.less'

@withRouter
class Carswiper extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 0
    }
  }
  componentWillReceiveProps(nextprops) {
    console.log(nextprops)
    this.setState({
      page: 0
    })
  }
  handleJupm = (val, car) => {
    console.log(val, car)
    if (val === 'cartype') {
      this.props.history.push(`/buycar/cartype/detail/${car.alias}`)
    } else if (val === 'yuyue') {
      this.props.history.push(`/buycar/shijia?cid=${car.cid}`)
    } else if (val === 'lookcar') {
      this.props.history.push(`/3d/${car.alias}`)
    }
  }
  changePage = (p, i) => {
    this.setState({
      page: i
    })
  }
  carJump(car){
    if(car.is3d === '1'){
      this.props.history.push(`/3d/${car.alias}`)
    }else{
      this.props.history.push(`/buycar/cartype/detail/${car.alias}`)
    }
  }
  renderContent = tab => {
    return (<div className='tab-content'>
      <div className="top">
        <div className="title-price">
          <div className="title">
            {tab.name}
          </div>
          <div className="price">
            <span>{tab.keywords}</span>
            <span>|</span>
            <span>{tab.price}</span>
          </div>
        </div>
        <ul className="btn">
          {
            tab.is3d === '1' && <li onClick={() => this.handleJupm('lookcar', tab)}>全景看车</li>
          }
          <li onClick={() => this.handleJupm('cartype', tab)}>车型详情</li>
          {
             +tab.is_presell === 0 ?
              <li onClick={() => this.handleJupm('yuyue',tab)}>预约试驾</li>
              :
              null
          }
          {/* {
          +tab.is_presell === 1 ?
          <li onClick={() => this.handleJupm('dinggou')}>立即订购</li>
          :
          null
        } */}
        </ul>
      </div>
      <div className="bottom">
        <img src={tab.big_thumb} alt="" onClick={()=>{this.carJump(tab)}}/>
      </div>
    </div>);
  }
  render() {
    const { page } = this.state
    const { tabs } = this.props

    const tabProps = {
      renderTab: (tab) => {
        return (
          <div className='car-item'>
            <div className="img-new">
              {!!tab.isnew ? <img src={require('../../imgs/modal-new.png')} alt="" /> : <span></span>}
              {!!tab.is3d ? <img src={require('../../imgs/modal-show.png')} alt="" /> : <span></span>}
            </div>
            <div className="img-item">
              <img src={tab.thumb} alt="" />
            </div>
            <div className="title">
              {tab.name}
            </div>
          </div>
        )
      }
    }
    return (
      <div className='carswiper'>
        {
          !tabs.length &&
          <div className='jqqd'>
            敬请期待
          </div>
        }
        <Tabs
          // animated={false}
          page={page}
          tabBarPosition='bottom'
          tabs={tabs}
          onChange={this.changePage}
          tabBarUnderlineStyle={{ borderStyle: 'none' }}
          renderTabBar={props => <Tabs.DefaultTabBar {...props} {...tabProps} page={2.5} />}
        >
          {this.renderContent}
        </Tabs>
        <div className="close-btn" onClick={(e) => this.props.onChange(-1, e)}>
          <img src={require('../../imgs/modal-close.png')} alt="" />
        </div>
      </div>
    );
  }
}

export default Carswiper;
