import React, { Component } from 'react';
import { Tabs,Modal } from 'antd-mobile';
import {Link} from 'react-router-dom'
import GetMore from '../../../components/getmore'
import { comApi } from '../../../components/api';
import MyVideo from '../../../components/common/myvideo'
import UserCom from './module/usercom'
import { brandApi } from '../api';
import {share} from '../../../utils/myshare'
import {getParamsObj} from '../../../utils/util'
import './index.less'
import { connect } from 'react-redux';
import { setTabIndexFans } from '../../../redux/tabs.redux'
import { toJump } from '../../../utils/jumpLink';
import config from '../../../config.json';

@connect(
  state => state,
  {setTabIndexFans}
)
class Fans extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      tabType: 'recom',
      page: 1,
      row: 5,
      data:[],
      hotData: [],
      showHot: true,
      videoUrl: [],
      videoUrl2: [],
      tuwenData:[],
      totalpage: 0,
      tabTwoIndex: getParamsObj().tabTwoIndex || 0,
      modalImgName:'',
      showApp1Modal: false,
      modalTxt: '',
      fansOneIndex: +getParamsObj().fansOneIndex || 0,
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.getPostList()
    this.getHotTopic()
    this.getList()
    this.getVideo()
  }
  getVideo() {
    comApi.getVideoUrl('FengChao')
    .then(res => {
      if(res && res.code == '0') {
        this.setState({
          videoUrl:res.data
        })
      }
    })
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    comApi.getVideoUrlByPaging({
      accessToken,
      beginPage: 1,
      pageSize: 2,
      type: 'Recommend'
    })
    .then(res => {
      if(res && res.code == '0') {
        this.setState({
          videoUrl2:res.data.dataList
        })
      }
    })
  }
  getMoreData() {
    this.setState({
      showLoading: true
    })
    this.getPostList()
  }
  getPostList() {
    const tabFans = this.props.tabsIndex.tabFans
    const opt = {
      dir:tabFans == '0' ? 'recom' : (tabFans == '1' ? 'all' : 'video'),
      page:this.state.page,
    }
    brandApi.getPostList(opt)
      .then(res => {
        if(res && res.code == 0) {
          if(res.data.list) {
            this.setState({
              data:[...this.state.data,...res.data.list],
              page:this.state.page + 1,
              totalpage:res.data.totalpage,
            })
          }
          this.setState({
            showLoading: false
          })
        }
      })
  }
  getHotTopic() {
    brandApi.getHotTopic()
    .then(res => {
      if(res && res.code == 0) {
        this.setState({
          hotData:res.data
        })
      }
    })
  }
  getList() {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    brandApi.getList({page:1,row:2,accessToken})
    .then(res => {
      if(res && res.code == 0) {
        this.setState({
          tuwenData:res.data.dataList
        })
      }
    })
  }
  setTabs(v,i){
    this.props.setTabIndexFans(i)
    this.setState({
      tabTwoIndex: i,
      tabType:v.type,
      page: 1,
      data:[]
    },() => {
      this.getPostList()
    })
  }
  setmodal = (name,txt) => {
    this.setState({
      modalImgName: name,
      showApp1Modal: true,
      modalTxt: txt,
    })
    window.myModal()
  }
  collectVideo(id) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if(!accessToken) {
      localStorage.setItem("redirectUrl", `${window.location}`)
      localStorage.setItem("fansOneIndex", 1)
      // window.location.href = '/login'
      window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
      return
    }
    brandApi.collectVideo({accessToken,id})
    .then(res => {
      if(res && res.code == '0') {
        const videoUrl = this.state.videoUrl2.map((v) => {
          console.log(v.id,id)
          if (v.id == id) {
            console.log(res.data.thumb_up)
            if(res.data.thumb_up) {
              v.isThumbUp = 1
            } else {
              v.isThumbUp = 0
            }
            // v.thumb_up = res.data.thumb_up
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
  collect(id) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    const accessToken = userInfo && userInfo.accessToken
    if(!accessToken) {
      localStorage.setItem("redirectUrl", `${window.location}`)
      localStorage.setItem("fansOneIndex", 1)
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
    const tabs = [
      { title: '丰潮世界' },
      { title: '精彩推荐' },
    ];
    return (
      <div className='fans'>
        <div className="title-img">
          <img src={require('../../../imgs/fans-banner.png')} alt=""/>
          <span style={{color:'#fff'}}>粉丝互动</span>
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            page={this.state.fansOneIndex}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props}  />}
            onTabClick={(v,i) => this.setState({fansOneIndex:i,})}
          >
          {+this.state.fansOneIndex === 0 && <div>
            <div className="fans-t">
              <h3 className="title">
                丰潮世界
              </h3>
              <div className="txt">
                <p>这是一个一汽丰田与粉丝互联共建的生态世界。</p>
                <p>这，是我们与粉丝共同的家！</p>
                <p>在我们的愿景中，丰潮世界将实现去品牌化，</p>
                <p>由粉丝自主运营管理，我们仅提供必要的技术与服务，</p>
                <p>真正成为“粉丝们的一汽丰田”欢迎共建丰潮世界。</p>
                <p>让越来越多的人享受汽车生活带来的喜悦！</p>
              </div>
              <div className="img-box">
                <img src={require('../../../imgs/fans-1.png')} alt=""/>
              </div>
              {/* <div className="img-box video-box">
                <span className="play-btn"></span>
                <img src={require('../../../imgs/fans-2.png')} alt=""/>
              </div> */}
              <ul className="video-list">
              {
                this.state.videoUrl.map((v,i) => {
                  return (
                  <li key={i}>
                    <div className="video-box-play">
                      <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                    </div>
                    {/* <p>{v.videoName}</p> */}
                  </li>
                  )
                })
              }
              </ul>
            </div>
            <h3 className="title mb-2">
              粉丝论坛
            </h3>
            <div className="tab-content">
              <Tabs
                tabs={[
                  { title: '推荐',type:'recom'},
                  { title: '全部',type:'all' },
                  // { title: '视频',type:'video' },
                ]}
                page={this.props.tabsIndex.tabFans}
                animated={false}
                swipeable={false}
                useOnPan={false}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} page={5} />}
                onTabClick={(v,i) => this.setTabs(v,i)}
              >
              <div className="data-nav-box">
                {this.state.tabType === 'recom' && <div className="huatis">
                  <div className="hot-btn" onClick={() => this.setState({showHot: !this.state.showHot})}>
                    <span>热门话题</span>
                  </div>
                  <ul style={{height:this.state.showHot ? 'auto' : 0,overflow:this.state.showHot ? 'auto' : 'hidden'}}>
                    {
                      this.state.hotData && this.state.hotData.map((v,i) => {
                        return (
                          <li key={v.id}>
                            # {v.title} #
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>}
                {
                  this.state.data.map((v,i) => {
                    return <UserCom key={v.id} isVideo={!!v.video} data={v} tabTwoIndex={this.state.tabTwoIndex} />
                  })
                }
                {/* <UserCom isVideo={true} /> */}
                {!!this.state.data.length && <GetMore
                  showLoading={this.state.showLoading} 
                  noMore={this.state.totalpage < this.state.page }
                  getMoreData={this.getMoreData} 
                />}
              </div>
              </Tabs>
            </div>
          </div>}
          {+this.state.fansOneIndex === 1 && <div className='tuijian'>
            <h3 className="title">
              <div>图文专区</div>
              <p>被定格的每个风景，都是与你一汽丰田的回忆欣赏精彩文章</p>
            </h3>
            <h3 className="title-bl">
              精彩文章
            </h3>
            <ul className="jingcaiwenzhang">
            {
              this.state.tuwenData.map((v,i) => {
                return (
                  <li key={v.id} className="jcwz">
                    <div className='t' onClick={() => {
                      toJump('fans',v.url,v.id,v.has_detail)
                    }}>
                      <div className="l">
                        {v.title}
                      </div>
                      <div className="r">
                        <img src={v.pc_pic} alt=""/>
                      </div>
                    </div>
                    <div className='b'>
                    <div className="com-fans-time">
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
            <div className="btn-box">
              <div className="fwhd-btn">
                <img src={require('../../../imgs/duwudat-0.png')} alt=""/>
                <Link to='/brand/fans/morewenzhang'>查看全部</Link>
              </div>
            </div>
            <div className="video-zhuanqu">
              <h3 className='title mlr-0'>
                <div>视频专区</div>
                <p>每部视频，皆有内涵与诉说的故事笑容与泪水或是一汽丰田与你相伴的每一天</p>
              </h3>
              <ul className="video-list">
              {
                this.state.videoUrl2.map((v,i) => {
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
              <div className="btn-box">
                <div className="fwhd-btn">
                  <img src={require('../../../imgs/duwudat-0.png')} alt=""/>
                  <Link to='/brand/fans/morevideo'>查看全部</Link>
                </div>
              </div>
            </div>
            <h3 className="title">
              粉丝精彩，无处不在
            </h3>
            <h3 className="title-bl">
              微信公众号
            </h3>
            <Modal
              className='my-modal app-modal-box'
              visible={this.state.showApp1Modal}
              transparent
              onClose={() => this.setState({showApp1Modal:false},() => window.myModal1())}
            >
              <div className="my-modal-big">
                <div
                  className="close"
                  onClick={() => this.setState({showApp1Modal:false},() => window.myModal1())}
                />
                <div className="img-box">
                  {this.state.modalImgName && <img src={require(`../../../imgs/${this.state.modalImgName}`)} alt=""/>}
                </div>
                {this.state.modalTxt && <div className='app-txt'>{this.state.modalTxt}</div>}
              </div>
            </Modal>
            <ul className="ewm-wx">
              <li onClick={() => this.setmodal('fshd-1.png','一汽丰田')}>
                <img src={require('../../../imgs/fshd-1.png')} alt=""/>
                一汽丰田
              </li>
              <li onClick={() => this.setmodal('fshd-2.png','亚洲龙 AVALON')}>
                <img src={require('../../../imgs/fshd-2.png')} alt=""/>
                亚洲龙 AVALON
              </li>
              <li onClick={() => this.setmodal('fshd-3.png','奕泽说')}>
                <img src={require('../../../imgs/fshd-3.png')} alt=""/>
                奕泽说
              </li>
              <li onClick={() => this.setmodal('fshd-4.png','卡罗拉双擎汇')}>
                <img src={require('../../../imgs/fshd-4.png')} alt=""/>
                卡罗拉双擎汇
              </li>
              <li onClick={() => this.setmodal('fshd-5.png','RAV4 荣放')}>
                <img src={require('../../../imgs/fshd-5.png')} alt=""/>
                RAV4 荣放
              </li>
            </ul>
            <h3 className="title-bl">
            微博
            </h3>
            <div className="weib-dy">
              <div className="img">
                <img src={require('../../../imgs/fshd-6.png')} alt=""/>
                @一汽丰田官方微博
              </div>
              <div className="img"  onClick={() => this.setmodal('fshd-7.png','@一汽丰田官方微博')}>
                <img src={require('../../../imgs/fshd-7.png')} alt=""/>
              </div>
            </div>
            <h3 className="title-bl">
              抖音
            </h3>
            <div className="weib-dy">
              <div className="img">
                <img src={require('../../../imgs/fshd-8.png')} alt=""/>
                <p>@一汽丰田</p>
                <p style={{color:'#737373'}}>抖音号：581273644<br />一汽丰田官方账号</p>
              </div>
              <div className="img"  onClick={() => this.setmodal('fshd-9.png','@一汽丰田抖音号')}>
                <img src={require('../../../imgs/fshd-9.png')} alt=""/>
              </div>
            </div>
          </div>}
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Fans;
