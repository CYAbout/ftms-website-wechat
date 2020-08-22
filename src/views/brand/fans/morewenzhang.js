import React, { Component } from 'react';
import GetMore from '../../../components/getmore'
import { brandApi } from '../api';
import {share} from '../../../utils/myshare'
import { toJump } from '../../../utils/jumpLink';
import config from '../../../config.json';

import './index.less'
class MoreWenzhang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      page: 1,
      row: 5,
      tuwenData:[]
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.getList()
  }
  getList() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    const {page,row,tuwenData} = this.state
    brandApi.getList({page,row,accessToken})
    .then(res => {
      if(res && res.code == 0) {
        if(res.data.dataList) {
          this.setState({
            tuwenData: [...tuwenData,...res.data.dataList],
            page: page + 1,
            hasNextPage:res.data.hasNextPage
          })
        }
        this.setState({
          showLoading: false,
        })
      }
    })
  }
  getMoreData() {
    this.setState({
      showLoading: true,
    })
    this.getList()
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
        const tuwenData = this.state.tuwenData.map((v) => {
          if (v.id == id) {
            // if(res.data.thumb_up) {
            //   v.isThumbUp = 1
            // } else {
            //   v.isThumbUp = 0
            // }
            v.thumb_up = res.data.thumb_up
            v.like_num = res.data.like_num
          }
          return v
        })
        this.setState({
          tuwenData,
        })
      }
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className='more-wenzahang'>
        <div className="title-img">
          <img src={require('../../../imgs/fans-banner.png')} alt=""/>
          <span style={{color:'#fff'}}>粉丝互动</span>
        </div>
        <h3 className="title mt-8 mb-4 box-big">
          精彩文章
        </h3>
        <ul>
          {
            this.state.tuwenData.map((v,i) => {
              return (
                <li key={v.id}>
                  <div className="img" onClick={() => toJump('fans',v.url,v.id,v.has_detail)}>
                    <img src={v.pc_pic} alt=""/>
                  </div>
                  <h4 className="title" onClick={() => toJump('fans',v.url,v.id,v.has_detail)}>
                    {v.title}
                  </h4>
                  <div className='b more-wenzhang-footer'>
                  <div className="com-fans-time ">
                  {v.create_time}
                  </div>
                  <div className="com-fans-pl">
                    <span className="kan">{v.read_num}</span>
                    <span className="shar" onClick={()=>share()}>{v.share_num}</span>
                    <span onClick={() => this.collect(v.id)} className={v.thumb_up ? 'liked' : 'like'}>{v.like_num}</span>
                  </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        {!!this.state.tuwenData.length && <GetMore
          showLoading={this.state.showLoading}
          noMore={!this.state.hasNextPage}
          getMoreData={this.getMoreData} 
        />}
      </div>
    );
  }
}

export default MoreWenzhang;
