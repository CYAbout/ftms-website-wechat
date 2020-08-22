import React, { Component } from 'react';
import { brandApi } from '../api';
import {share} from '../../../utils/myshare'
import config from '../../../config.json';

import './index.less'
class FansDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      thumb_up: false
    }
  }
  componentDidMount() {
    this.getDetail()
  }
  getDetail() {
    const id = this.props.match.params.id
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if (!accessToken) {
      // return
    }
    brandApi.getDetail({ id, accessToken })
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            data: res.data.dataList,
            thumb_up:res.data.thumb_up
          })
        }
      })
  }
  collect(id) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if(!accessToken) {
      localStorage.setItem("redirectUrl", window.location)
      // window.location.href = '/login'
      window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
      return
    }
    brandApi.collect({accessToken,id})
    .then(res => {
      if(res && res.code == '0') {
        this.setState({
          thumb_up:res.data.thumb_up,
          data:{...this.state.data,like_num:res.data.like_num}
        })
      }
    })
  }
  render() {
    console.log(this.props)
    const { data } = this.state
    if (!data.title) {
      return <div className='no-data'>暂无数据</div>
    }
    return (
      <div className='fans-detail box-big'>
        <h3 className="title mt-8 ">
          {data.title}
        </h3>
        <div className="time com-fans-pl ">
          <div className="com-fans-time">
            {data.create_time}
          </div>
          <div className="com-fans-pl">
            <span className="kan">{data.read_num}</span>
            <span onClick={() => share()} className="shar">{data.share_num}</span>
            <span className={this.state.thumb_up ? 'liked' : 'like'} onClick={() => this.collect(data.id)}>{data.like_num}</span>
          </div>
        </div>
        <div className="content" dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    );
  }
}

export default FansDetail;
