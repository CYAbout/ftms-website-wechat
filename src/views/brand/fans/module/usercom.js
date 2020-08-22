import React, { Component } from 'react';
import {Link,withRouter} from 'react-router-dom'
import MyVideo from '../../../../components/common/myvideo'
import {Modal} from 'antd-mobile'
import {share} from '../../../../utils/myshare'
@withRouter
class UserCom extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showApp1Modal:false
    }
  }
  render() {
    if(!this.props.data.id) {
      return null
    }
    const {isVideo,data,notShowGZ,tabTwoIndex} = this.props
    return (
      <div className="com-fans">
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
          { !notShowGZ && <div className="r" onClick={() => this.setState({
              showApp1Modal:true
            },()=>window.myModal())}>
          <img src={require('../../../../imgs/add.png')} alt=""/>
            关注
          </div>}
        </div>
        <div className="modal-box">
        <Modal
          className='my-modal app-modal-box'
          visible={this.state.showApp1Modal}
          transparent
          onClose={() => this.setState({showApp1Modal:false},()=>window.myModal1())}
        >
          <div className="img-box">
            <img src={require('../../../../imgs/fc-ewm.png')} alt=""/>
          </div>
          <div className='app-txt'>更多精彩内容尽在丰潮世界</div>
        </Modal>
        </div>
        <div className="com-fans-content" onClick={() => this.props.history.push(`/brand/fans/detailtz/${data.id}?tabTwoIndex=${tabTwoIndex}`)}>
        {data.topic && `#${data.topic}#`}{data.title}
        </div>
        {!isVideo ? <div className="com-fans-pic" onClick={() => this.props.history.push(`/brand/fans/detailtz/${data.id}?tabTwoIndex=${tabTwoIndex}`)}>
        {
          data.thumbs.length === 1 ?
          <div className='img-1'>
            <div className="img">
              <img src={data.thumbs[0]} alt=""/>
            </div>
          </div>
          : data.thumbs.length === 2 ?
          <div className='img-2'>
            <div className="img">
              <img src={data.thumbs[0]} alt=""/>
            </div>
            <div className="img">
              <img src={data.thumbs[1]} alt=""/>
            </div>
          </div>
          : data.thumbs.length > 2 ?
          <div className='img-3'>
            <div className="img">
              <img src={data.thumbs[0]} alt=""/>
            </div>
            <div className="img-box">
              <div className="img">
              <img src={data.thumbs[1]} alt=""/>
              </div>
              <div className="img">
              <img src={data.thumbs[2]} alt=""/>
              </div>
            </div>
          </div>
          : null
          // data.thumbs.map((v,i) => {
          //   return (
          //     <div className="img" key={i}>
          //       <img src={v} alt=""/>
          //     </div>
          //   )
          // })
        }
        </div>
        :
        <div className="com-fans-video" onClick={() => this.props.history.push(`/brand/fans/detailtz/${data.id}?tabTwoIndex=${tabTwoIndex}`)}>
          {/* <div className="play-btn">
          </div> */}
          {/* <div className="img">
            <img src={data.thumbs[0]} alt=""/>
          </div> */}
          <div className="video-box-play">
            <MyVideo src={data.video}  poster={data.thumbs[0]} />
          </div>
        </div>}

        <div className="com-fans-footer">
          <div className="com-fans-time">
            {data.createtime}
          </div>
          <div className="com-fans-pl">
            <span className="kan">{data.view <= 0 ? 0 :data.view }</span>
            <span className="pl"onClick={() => this.setState({
              showApp1Modal:true
            },() => window.myModal())}>{data.reply <= 0 ? 0 :data.reply }</span>
            <span className="like"onClick={() => this.setState({
              showApp1Modal:true
            },() => window.myModal())}>{data.zan <= 0 ? 0 :data.zan }</span>
            <span className="shar" onClick={() => share()}>{data.share <= 0 ? 0 :data.share }</span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserCom;
