import React, { Component } from 'react';
import { brandApi } from '../api';
import GetMore from '../../../components/getmore'
import {Link} from 'react-router-dom'
import {Modal} from 'antd-mobile'
import {share} from '../../../utils/myshare'
import {getParamsObj} from '../../../utils/util'

import './index.less'
class FansDetailTz extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showApp1Modal:false,
      showLoading:false,
      data:{
        title:''
      },
      plData: [],
      page: 1,
      totalpage: 0,
      tabs: getParamsObj().tabTwoIndex,
    }
  }
  componentDidMount() {
    this.getPostDetail()
    this.getRemarkList()
  }
  getMoreData = () => {
    this.setState({
      showLoading: true
    })
    this.getRemarkList()
  }
  getPostDetail() {
    const id = this.props.match.params.id
    brandApi.getPostDetail({id})
    .then(res => {
      if(res && res.code == 0) {
        this.setState({
          data: res.data,
          // data: res.data.replace(/<video(([\s\S])*?)<\/video>/g, '')
        })
      }
    })
  }
  getRemarkList() {
    const {page,plData} = this.state
    const id = this.props.match.params.id

    brandApi.getRemarkList({id,page})
    .then(res => {
      if(res && res.code == 0) {
        if(res.data.list) {
          this.setState({
            plData: [...plData,...res.data.list],
            page: page + 1,
            hasNextPage:res.data.hasNextPage,
            totalpage:res.data.totalpage
          })
        }
        this.setState({
          showLoading: false
        })
      }
    })
  }
  render() {
    console.log(this.props)
    const {data,plData} = this.state
    if(!data.title) {
      return <div className='no-data'>暂无数据</div>
    }
    return (
      <div className='fans-detail-tz fans'>
        <h3 className="mt-8 mb-4">
          {data.title}
        </h3>
        <div className="time">
          {data.topic && <div className="flag">
          #{data.topic}#
          </div>}
          <div className="com-fans-time">
          {data.createtime}
          </div>
          <div className="com-fans-pl">
            <span className="kan">{data.view <= 0 ? 0 :data.view }</span>
            <span className="pl" 
              // onClick={() => this.setState({showApp1Modal:true},() => window.myModal())}
            >{data.reply <= 0 ? 0 :data.reply }</span>
            <span className="like" 
            // onClick={() => this.setState({showApp1Modal:true},() => window.myModal())}
            >{data.zan <= 0 ? 0 :data.zan }</span>
            <span className="shar" onClick={() => share()}>{data.share <= 0 ? 0 :data.share }</span>
          </div>
        </div>
        <div className="com-fans-title">
          <div className="l">
            <span className="img">
            <Link to={`/brand/fans/fansinfo/${data.userId}`}>
              <img src={data.authorinfo.avatarurl} alt=""/>
            </Link>
            </span>
            <span className="name">
              <h4>{data.authorinfo.nickname}</h4>
              <span className="tags">
                {
                  data.authorinfo.tags.map((v,i) => {
                    return (
                      <span key={i} className="tag-1" style={{backgroundColor:v.color}}>
                        {v.label}
                      </span>
                    )
                  })
                }
                {
                  !!data.authorinfo.isowner && <span className="tag-2">
                    认证车主
                  </span>
                }
              </span>
            </span>
          </div>
          <div className="r" onClick={() => this.setState({
              showApp1Modal:true
            },()=>window.myModal())}>
            <img src={require('../../../imgs/add.png')} alt=""/>
            关注
          </div>
        </div>
        <Modal
          className='my-modal app-modal-box'
          visible={this.state.showApp1Modal}
          transparent
          onClose={() => this.setState({showApp1Modal:false},() => window.myModal1())}
        >
          <div className="img-box">
            <img src={require('../../../imgs/fc-ewm.png')} alt=""/>
          </div>
          <div className='app-txt'>更多精彩内容尽在丰潮世界</div>
        </Modal>
        <div className="content" dangerouslySetInnerHTML={{__html:data.content}} />

        <div className="pl-list">
          <h3>评论</h3>
          {!!plData.length ? <ul>
            {
              plData.map((v,i) => {
                return (
                  <li key={v.id}>
                  <div className="com-fans-title">
                    <div className="l">
                      <span className="img">
                      <Link to={`/brand/fans/fansinfo/${v.uid}`}>
                        <img src={v.authorinfo.avatarurl} alt=""/>
                      </Link>
                      </span>
                      <span className="name">
                        <h4>{v.authorinfo.nickname}</h4>
                        <span className="tags">
                          {
                            v.authorinfo.tags.map((v,i) => {
                              return (
                                <span key={i} className="tag-1" style={{backgroundColor:v.color}}>
                                  {v.label}
                                </span>
                              )
                            })
                          }
                          {
                            !!v.authorinfo.isowner && <span className="tag-2">
                              认证车主
                            </span>
                          }
                        </span>
                      </span>
                    </div>
                    <div className="lou">
                      {v.lc}楼
                    </div>
                  </div>
                    <div className='two'>
                      {v.tid != '0' && v.tcomment.id &&<div className="other-man">
                        <p>{v.tcomment.nickname}</p>
                        <p>{v.tcomment.content}</p>
                      </div>}
                      {v.content}
                    </div>
                    <div className='three'>
                      {v.topic && <div className="flag">
                        #{v.topic}#
                        </div>}
                        <div className="com-fans-time">
                        {v.createtime}
                        </div>
                        <div className="com-fans-pl" onClick={() => this.setState({showApp1Modal:true},()=>window.myModal())}>
                          <span className="pl">{v.reply <= 0 ? 0 :v.reply }</span>
                          <span className="like">{v.up <= 0 ? 0 :v.up }</span>
                        </div>
                    </div>
                </li>
                )
              })
            }
          </ul>
          :
          <div className="no-data">
            暂无评论
          </div>
          }
        </div>
        {!!plData.length && <GetMore
            showLoading={this.state.showLoading} 
            noMore={this.state.totalpage < this.state.page }
            getMoreData={() => this.getMoreData()} 
          />}
      </div>
    );
  }
}

export default FansDetailTz;
