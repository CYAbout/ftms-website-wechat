import React, { Component } from 'react';
import UserCom from './module/usercom'
import GetMore from '../../../components/getmore'
import {Modal} from 'antd-mobile'
import {brandApi} from '../api'
import './index.less'
import { resolve } from 'url';

class FansInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      data:{
      },
      list:[],
      page:1
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.getPersonInfo()
  }
  getPersonInfo() {
    if(this.props.match.params.id) {
      const opt = {
        id:this.props.match.params.id,
        page:this.state.page,
        showApp1Modal:false
      }
      brandApi.getPersonInfo(opt)
        .then(res => {
          if(res && res.code == 0) {
            if(res.data.list) {
              this.setState({
                data:res.data,
                list:[...this.state.list,...res.data.list],
                page:this.state.page + 1,
                hasNextPage:res.data.hasNextPage
              })
            }
            this.setState({
              showLoading:false
            })
          }
        })
    }
    
  }
  getMoreData() {
    this.setState({
      showLoading:true
    })
    this.getPersonInfo()
  }
  render() {
    console.log(this.props)
    const {data} = this.state
    return (
      <div className='fans-info'>
        <div className="t">
          <div className="fans-photo">
            <div className="l">
              <img src={data.avatarurl} alt=""/>
            </div>
            <div className="r">
              <div className="name">
                <h4>{data.nickname}</h4>
                <span>{data.city}</span>
              </div>
              <p>{data.sign}</p>
            </div>
          </div>
          <div className="b">
            <div>粉丝 <span>{data.fans}</span></div>
            <div>关注 <span>{data.attention}</span></div>
            <div className='btn' onClick={() => this.setState({
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
            onClose={() => this.setState({showApp1Modal:false},()=>window.myModal1())}
          >
            <div className="img-box">
              <img src={require('../../../imgs/fc-ewm.png')} alt=""/>
            </div>
            <div className='app-txt'>更多精彩内容尽在丰潮世界</div>
          </Modal>
        </div>
        <ul>
        {
          this.state.list.map((v,i) => {
            return <UserCom notShowGZ={true} key={v.id} isVideo={!!v.video} data={v} />
          })
        }
        </ul>
        {!!this.state.list.length && <GetMore
          showLoading={this.state.showLoading}
          noMore={!this.state.hasNextPage}
          getMoreData={this.getMoreData} 
        />}
      </div>
    );
  }
}

export default FansInfo;
