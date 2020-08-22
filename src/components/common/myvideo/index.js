import React, { Component } from 'react'
import {setShowHeader} from '../../../redux/showHeader.redux'
import {Modal} from 'antd-mobile'
import "./index.less"
import { connect } from 'react-redux';
// let videoDom
@connect(
  state=>state,
  {setShowHeader}
)
class MyVideo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal:false
    }
  }
  componentDidMount(){
    // console.time('aaa')
    // let videoIframeDomWindow = document.querySelector('.my-video-iframe')
    // console.log(videoIframeDomWindow)
    // videoIframeDomWindow.onload = () => {
    //   console.log('加载完成')
    //   console.timeEnd('aaa')
    //   let videoDom = videoIframeDomWindow.contentWindow.document.getElementById('youku-playerBox')
    //   console.log(videoDom)
    // }
    console.log(this.props)
  }
  showModal = () => {
    this.setState({
      showModal: true
    },() => window.myModal())
  }
  closeModal = () => {
    this.setState({
      showModal: false
    },() => window.myModal1())
    // window.myModal1()
  }
  render() {
    const { src } = this.props
    const isMp4 = src.endsWith('.mp4') || src.endsWith('.ogg') || src.endsWith('.webm')
    return (
      <div className='my-video-box'>
        {
          isMp4 ?
            //   <video
            //   preload="auto"
            //   controls
            //   webkit-playsinline="true" 
            //   playsInline
            //   x5-video-player-type="h5"
            //   x5-video-player-fullscreen="true"
            //   x5-video-orientation="portraint"
            //   poster={this.props.poster}
            //   src={this.props.src} >
            // </video>
            <video
              // preload="auto"
              controls
              // airplay
              // x-webkit-airplay
              webkit-playsinline="true"
              playsInline
              x5-playsinline=""
              x5-video-player-type="h5"
              x5-video-player-fullscreen=""
              x5-video-orientation="portraint"
              poster={this.props.poster}
              src={this.props.src} >
            </video>
            :
            <div className='video-modal-app' onClick={this.showModal}>
              <img src={this.props.poster} alt=""/>
            </div>
        }
        {this.state.showModal && <Modal
          className='my-modal video-modal-box'
          visible={this.state.showModal}
          transparent
        // onClose={() => this.props.close()}
        >
          {/* {this.props.poster} */}
          {this.state.showModal && <div className='t'>
            <iframe className="my-video-iframe" src={this.props.src} width="100%" height='100%' frameBorder={0} allowFullScreen={true}>
            </iframe>
          </div>}
          <div className="img-box" onClick={this.closeModal}>
            <img src={require('../../../imgs/icon-x.png')} alt="" />
          </div>
        </Modal>}
      </div>
    );
  }
}
export default MyVideo


