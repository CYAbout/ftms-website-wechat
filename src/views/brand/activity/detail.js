import React, { Component } from 'react';
import { brandApi } from '../api';

import './index.less'
class ActivityDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  componentDidMount() {
    this.getDetailActivity()
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id != nextProps.match.params.id) {
      this.getDetailActivity(nextProps.match.params.id)
    }
  }
  getDetailActivity(ids) {
    const id = ids ? ids : this.props.match.params.id
    console.log(id)
    brandApi.getDetailActivity(id)
    .then(res => {
      if(res && res.code == 0) {
        this.setState({
          data: res.data
        })
      }
    })
  }
  render() {
    document.title="活动中心";
    console.log(this.props)
    const {data} = this.state
    if(!data.title) {
      return <div className='no-data'>暂无数据</div>
    }
    return (
      <div className='activity-detail'>
        <h3 className="title">
          {data.title}
        </h3>
        <div className="time">
          <div className="com-fans-time">
          {data.create_time}
          </div>
          {/* <div className="com-fans-pl">
            <span className="kan">{data.read_num}</span>
            <span className="pl">{data.share_num}</span>
            <span className="like">{data.like_num}</span>
          </div> */}
        </div>

        <div className="content">
          <div className="pic">
            <img src={data.thumb} alt=""/>
          </div>
          {/* <p>{data.desc}</p> */}
        </div>
        <div className="content" dangerouslySetInnerHTML={{__html:data.content}} />
      </div>
    );
  }
}

export default ActivityDetail;
