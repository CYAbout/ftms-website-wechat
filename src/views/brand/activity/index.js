import React, { Component } from 'react';
import {Icon } from 'antd-mobile';
import GetMore from '../../../components/getmore'
import {brandApi} from '../api'
import moment from 'moment'
import './index.less'
import { toJump } from '../../../utils/jumpLink';

class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      newActivity: [],
      oldActivity: [],
      page: 1,
      row: 5,
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.curActivityList()
    this.pastActivityList()
  }
  curActivityList() {
    const opt = {
      page: 1,
      row: 2,
      type: 'recent'
    }
    brandApi.getActivities(opt)
      .then(res => {
        if(res && res.code == 0) {
          this.setState({
            newActivity:res.data.list
          })
        }
      })
  }
  pastActivityList() {
    const opt = {
      page: this.state.page,
      row: this.state.row,
      type: 'end'
    }
    brandApi.getActivities(opt)
      .then(res => {
        if(res && res.code == 0) {
          if(res.data.list) {
            this.setState({
              oldActivity:[...this.state.oldActivity,...res.data.list],
              page: this.state.page + 1,
              hasNextPage:res.data.hasNextPage,
            })
          }
          this.setState({
            showLoading:false,
          })
        }
      })
  }
  getMoreData() {
    // 请求
    this.setState({
      showLoading:true
    })
    this.pastActivityList()
  }
  render() {
    document.title="活动中心";
    const {newActivity,oldActivity} = this.state
    return (
      <div className='activity'>
        <div className="title-img">
          <img src={require('../../../imgs/activity-banner.png')} alt=""/>
          {/*<span style={{color:'#fff'}}>活动中心</span> */}
        </div>
        <h3 className="title">
          近期活动
        </h3>
        {
          newActivity.map((v,i) => {
            return (
              <div className="wenzhang jinqi" key={i} onClick={() => toJump('activity',v.url,v.id,v.has_detail)}>
                <div className="img-box">
                  <img src={v.thumb} alt=""/>
                </div>
                <h4 className={v.is_sale ? 'cu-icon' : 'no-cu-icon'}>{v.title}</h4>
                <div className="time">
                {/* {moment(v.activityDate).format('YYYY-MM-DD')} */}
                {v.create_time}
                </div>
              </div>
            )
          })
        }
        <h3 className="title">
          往期活动
        </h3>
        <ul className="wangqi">
          {
            oldActivity.map((v,i) => {
              return (
                <li className="wenzhang" key={i} onClick={() => toJump('activity',v.url,v.id,v.has_detail)}>
                  <div className="img-box">
                    <img src={v.thumb} alt=""/>
                  </div>
                  <div className="text">
                    <h4>{v.title}【活动已结束】</h4>
                    <div className="time">
                    {/* {moment(v.activityDate).format('YYYY-MM-DD')} */}
                    {v.create_time}
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        {!!oldActivity.length && <GetMore
            showLoading={this.state.showLoading} 
            noMore={!this.state.hasNextPage}
            getMoreData={() => this.getMoreData()} 
          />}
      </div>
    );
  }
}

export default Activity;
