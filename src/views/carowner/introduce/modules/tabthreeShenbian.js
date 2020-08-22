import React, { Component } from 'react';
import {Tabs} from 'antd-mobile'
// import {withRouter} from 'react-router-dom'
import {carOwnerApi} from '../../api'
import GetMore from '../../../../components/getmore'
import '../index.less'
// @withRouter
class Shenbian extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading:false,
      data:[],
      beginPage: 1,
      pageSize: 5
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.getMoreData()
    document.title = '身边杂志'
  }
  lookDetail(id) {
    console.log(id)
    // this.props.history.push(`/carowner/introduce/content/${id}`)
    const origin = window.location.origin
    const url = `${origin}/carowner/introduce/content/${id}`
    window.open(url)
  }
  getMoreData() {
    const {beginPage,pageSize,data} = this.state
    this.setState({
      showLoading: true
    })
    carOwnerApi.getMagazineList({beginPage,pageSize})
      .then(res => {
        if(res && res.code === '0') {
          if(res.data.dataList) {
            this.setState({
              data: [...data,...res.data.dataList],
              beginPage: beginPage + 1,
              hasNextPage: res.data.hasNextPage
            })
          }
          this.setState({
            showLoading: false
          })
        }
      })
  }
  setIndex = (v,i) => {
    console.log(this.props.history)
    this.props.history.push(`/carowner/introduce?oneindex=${i}`)
  }
  render() {
    const tabs = [
      { title: '诚信服务' },
      { title: '服务产品' },
      { title: '服务活动' },
      { title: '保修政策' },
      { title: '满意度调查' },
    ];
    return (
      <div className="introduce">
      <div className="title-img-b">
          <img src={require('../../../../imgs/czzx-top-pic.jpg')} alt=""/>
          {/* <span>服务介绍</span> */}
        </div>
        <div className="content just-my-tabs">
          <Tabs
            tabs={tabs}
            page={2}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} prefixCls = {'shenbian'}/>}
            // onChange={(v,i) => this.setIndex(1)}
            onTabClick={(v,i) => this.setIndex(v,i)}
          />
          </div>
      <div className='tabthree-shenbian'>
        <ul className="shenbian-list">
        {
          this.state.data.map((v,i) => {
            return (
              <li key={v.magazineId}>
                <div className="fwhd-img">
                  <img src={v.smallImg} alt=""/>
                </div>
                <h3 className='border-title'>{v.title}</h3>
                <p>更新时间：{v.createAt}</p>
                <div className="fwhd-btn" onClick={() => this.lookDetail(v.magazineId)}>
                  <img src={require('../../../../imgs/shenbian-0.png')} alt=""/>
                  在线阅读
                </div>
              </li>
            )
          })
        }
        </ul>
        {
          !!this.state.data.length ?
          <GetMore
          showLoading={this.state.showLoading}
          noMore={!this.state.hasNextPage}
          getMoreData={this.getMoreData}
        />
        : 
        // null
        <div className='no-data'>暂无数据</div>
        }
      </div>
      </div>
    );
  }
}

export default Shenbian;
