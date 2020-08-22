import React, { Component } from 'react';
import GetMore from '../../../components/getmore'
import { comApi } from '../../../components/api';
import MyVideo from '../../../components/common/myvideo'
import {share} from '../../../utils/myshare'
import { brandApi } from '../api'
import config from '../../../config.json';

import './index.less'
class MoreVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: [],
      showLoading: false,
      beginPage: 1,
      pageSize: 5,
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.getVideo()
  }
  getVideo() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    comApi.getVideoUrlByPaging({
      accessToken,
      beginPage: this.state.beginPage,
      pageSize: this.state.pageSize,
      type: 'Recommend'
    })
      .then(res => {
        if (res && res.code == '0') {
          if (res.data.dataList) {
            this.setState({
              videoUrl: res.data.dataList,
              hasNextPage: res.data.hasNextPage,
              beginPage: this.state.beginPage + 1,
            })
          }
          this.setState({
            showLoading: false
          })
        }
      })
  }
  getMoreData() {
    // 请求
    this.setState({
      showLoading: true
    })
    this.getVideo()
  }
  collectVideo(id) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if(!accessToken) {
      localStorage.setItem("redirectUrl", window.location)
      // window.location.href = '/login'
      window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
      return
    }
    brandApi.collectVideo({accessToken,id})
    .then(res => {
      if(res && res.code == '0') {
        const videoUrl = this.state.videoUrl.map((v) => {
          if (v.id == id) {
            if(res.data.thumb_up) {
              v.isThumbUp = 1
            } else {
              v.isThumbUp = 0
            }
            v.likeNum = res.data.like_num
          }
          return v
        })
        this.setState({
          videoUrl,
        })
      }
    })
  }
  render() {
    console.log(this.props)
    return (
      <div className='more-video'>
        <div className="title-img">
          <img src={require('../../../imgs/fans-banner.png')} alt="" />
          <span style={{ color: '#fff' }}>粉丝互动</span>
        </div>
        <h3 className='title mt-8'>
          <div>视频专区</div>
          <p>每部视频，皆有内涵与诉说的故事笑容与泪水或是一汽丰田与你相伴的每一天</p>
        </h3>
        {/* <ul>
          <li>
            <div className="img video-box">
            <span className="play-btn"></span>
              <img src={require('../../../imgs/jctj-1.png')} alt=""/>
            </div>
            <div className='b video-b'>
              <h4 className="title">
              天津一汽丰田天津一汽丰田天津一汽丰田天津
              </h4>
              <div className="com-fans-pl">
                <span className="kan">987</span>
                <span className="pl">3231</span>
                <span className="like">2</span>
              </div>
            </div>
          </li>
        </ul> */}
        <ul className="video-list">
          {
            this.state.videoUrl.map((v, i) => {
              return (
                <li key={i}>
                  <div className="video-box-play">
                    <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                  </div>
                  <div className="shipinzq">
                    <p>{v.videoName}</p>
                    <div className="com-fans-pl">
                      <span className="kan">{v.readNum}</span>
                      <span className="shar" onClick={()=>share()}>{v.shareNum}</span>
                      <span
                        className={v.isThumbUp == 1 ? 'liked' : 'like'}
                        onClick={() => this.collectVideo(v.id)}
                      >{v.likeNum}</span>
                    </div>
                  </div>
                </li>
              )
            })
          }
        </ul>
        <GetMore
          showLoading={this.state.showLoading}
          noMore={!this.state.hasNextPage}
          getMoreData={this.getMoreData}
        />
      </div>
    );
  }
}

export default MoreVideo;
