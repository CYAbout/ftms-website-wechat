import React, { Component } from 'react';
import { Tabs } from 'antd-mobile'
import { carOwnerApi } from '../../api'
import { comApi } from '../../../../components/api';
import GetMore from '../../../../components/getmore'
import MyVideo from '../../../../components/common/myvideo'
import { toJump } from '../../../../utils/jumpLink';
import { getParamsObj } from '../../../../utils/util'
import '../index.less'

class Aiche extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      page: 1,
      videoPage: 1,
      row: 5,
      videoUrl: [],
      showLoading: false,
      showVideoLoading: false,
      aicheindex: +getParamsObj().aicheindex || 0
    }
    this.getMoreData = this.getMoreData.bind(this)
    this.getVideo = this.getVideo.bind(this)
  }
  componentDidMount() {
    this.getMoreData()
    this.getVideo()
    document.title = '爱车课堂'
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        aicheindex: +getParamsObj().aicheindex
      })
    }
  }
  getMoreData() {
    const { page, row } = this.state
    this.setState({ showLoading: true })
    carOwnerApi.carList({ page, row })
      .then(res => {
        if (res && res.code === '0') {
          if (res.data.dataList) {
            this.setState({
              data: [...this.state.data, ...res.data.dataList],
              page: +page + 1,
              hasNextPage: res.data.hasNextPage
            })
          }
          this.setState({
            showLoading: false
          })
        }
      })
  }
  getVideo() {
    const { videoPage, row } = this.state
    this.setState({ showVideoLoading: true })
    comApi.getVideoUrlByPaging({
      type: 'LoveCarClass',
      beginPage: videoPage,
      pageSize: row
    })
      .then(res => {
        if (res && res.code == '0') {
          console.log(res.data, [...this.state.videoUrl, ...res.data.dataList])
          if (res.data.dataList) {
            this.setState({
              videoUrl: [...this.state.videoUrl, ...res.data.dataList],
              videoPage: res.data.currentPage + 1,
              hasVideoNextPage: res.data.hasNextPage
            })
          }
          this.setState({
            showVideoLoading: false
          })
        }
      })
  }
  lookDetail(id) {
    console.log(id)
    this.props.history.push(`/carowner/introduce/aichecontent/${id}`)
  }
  setIndex(v, i) {
    this.props.history.push(`/carowner/introduce?oneindex=${i}`)
  }
  setAicheIndex(v, i) {
    this.props.history.push(`/carowner/introduce/aiche?aicheindex=${i}`)
  }
  render() {
    const imgArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
    const tabs = [
      { title: '诚信服务' },
      { title: '服务产品' },
      { title: '服务活动' },
      { title: '保修政策' },
      { title: '满意度调查' },
    ];
    console.log('this.state.videoUrl', this.state.videoUrl)
    return (
      <div className="introduce">
        <div className="title-img-b">
          <img src={require('../../../../imgs/czzx-top-pic.jpg')} alt="" />
          {/* <span>服务介绍</span> */}
        </div>
        <div className="content just-my-tabs">
          <Tabs
            tabs={tabs}
            page={2}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} prefixCls = {'none'}/>}
            onTabClick={(v, i) => this.setIndex(v, i)}
          />
        </div>
        <div className='tabthree-aiche tab-content mt-4'>
          <Tabs
            tabs={[{ title: '爱车养护课堂' }, { title: '汽车使用答疑' }]}
            animated={false}
            swipeable={false}
            useOnPan={false}
            page={this.state.aicheindex}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={2} prefixCls = {'aiche'}/>}
            onTabClick={(v, i) => this.setAicheIndex(v, i)}
          >
          </Tabs>
          {+this.state.aicheindex === 0 && <div className='jingcaiwenzhang'>
            <h3 className="title">
              精彩文章
          </h3>
            <ul className='list'>
              {
                this.state.data.map((v, i) => {
                  return (
                    <li key={v.id} onClick={() => toJump('aiche', v.url, v.id, v.islink)}>
                      <div className="l">
                        <h4>{v.title}</h4>
                        <p>
                          <span>
                            发布时间：
                        </span>
                          <span className='time'>
                            <img src={require('../../../../imgs/wenzhang-0.png')} alt="" />
                          </span>
                          <span>
                            {v.addtime}
                          </span>
                        </p>
                      </div>
                      <div className="r">
                        <img src={v.m_pic} alt=""/>
                      </div>
                    </li>
                  )
                })
              }

            </ul>
            {/* <div className="fwhd-btn" onClick={() => null}>
            <img src={require('../../../../imgs/wenzhang-3.png')} alt=""/>
            查看更多
          </div> */}
            {
              !!this.state.data.length ?
                <GetMore
                  showLoading={this.state.showLoading}
                  noMore={!this.state.hasNextPage}
                  getMoreData={this.getMoreData}
                />
                :
                <div className='no-data'>暂无数据</div>
            }
            <h3 className="title">
              精彩视频
          </h3>
            <ul className="video-list">
              {
                this.state.videoUrl.map((v, i) => {
                  return (
                    <li key={i}>
                      <div className="video-box-play">
                        <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                      </div>
                      <p>{v.videoName}</p>
                    </li>
                  )
                })
              }
            </ul>
            {
              !!this.state.videoUrl.length ?
                <GetMore
                  showLoading={this.state.showVideoLoading}
                  noMore={!this.state.hasVideoNextPage}
                  getMoreData={this.getVideo}
                />
                : 
                // null
                <div className='no-data'>暂无数据</div>
            }
          </div>}

          {+this.state.aicheindex !== 0 && <div>
            <ul className='all-img-list'>
              {
                imgArr.map(((v, i) => {
                  return (
                    <li key={i}>
                      <img src={require(`../../../../imgs/aiche-${v}.png`)} alt="" />
                    </li>
                  )
                }))
              }
            </ul>
          </div>}

        </div>
      </div>
    );
  }
}

export default Aiche;
