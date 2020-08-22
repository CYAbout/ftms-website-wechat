import React, { Component } from 'react';
import { Icon } from 'antd-mobile'
import GetMore from '../../../components/getmore'
import { brandApi } from '../api'
import { toJump } from '../../../utils/jumpLink';
import './index.less'

class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      data: [],
      page: 1,
      row: 6,
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.newsList()
  }
  newsList() {
    const { page, row, data } = this.state
    brandApi.newsList({ page, row })
      .then(res => {
        if (res && res.code == 0) {
          if (res.data.dataList) {
            this.setState({
              data: [...data, ...res.data.dataList],
              page: page + 1,
              hasNextPage: res.data.hasNextPage
            })
          }
          this.setState({
            showLoading: false
          })
        }
      })
  }
  getMoreData() {
    this.setState({
      showLoading: true
    })
    this.newsList()
  }
  render() {
    document.title="企业新闻";
    return (
      <div className='news'>
        <div className="title-img">
          <img src={require('../../../imgs/news-banner.png')} alt="" />
          {/*<span>企业新闻</span> */}
        </div>
       {/* <h3 className="title">
          企业新闻
        </h3> */}
        <ul className="new-c">
          {
            this.state.data.map((v, i) => {
              return (
                <li key={v.id} className="wenzhang">
                  <h4>{v.title}</h4>
                  <div className="time">
                    {v.addtime}
                  </div>
                  <p>
                    {v.description}
                  </p>
                  <div className="fwhd-btn" onClick={() => {
                    toJump('news',v.url,v.id,v.isLink)
                  }}>
                    <img src={require('../../../imgs/duwudat-0.png')} alt="" />
                    查看详情
                </div>
                </li>
              )
            })
          }

          {/* <li className="wenzhang">
            <h4>一汽丰田纯牌零件“纯真之旅活动在渤旅活动在渤旅活动在渤旅活动在渤海之滨”</h4>
            <div className="time">
              2018-12-12
            </div>
            <p>
            纯牌零件满足全球标准，从设计到开发，纯牌零件满足全球标准，从设计到开发纯牌零件满足全球标准，从设计到开发
            纯牌零件满足全球标准，从设计到开发，纯牌零件满足全球标准，从设计到开发，纯牌零件满足全球标准，从设计
            </p>
            <div className="fwhd-btn">
              <img src={require('../../../imgs/duwudat-0.png')} alt=""/>
              查看详情
            </div>
          </li> */}
        </ul>
        {!!this.state.data.length && <GetMore
          showLoading={this.state.showLoading}
          noMore={!this.state.hasNextPage}
          getMoreData={this.getMoreData}
        />}
      </div>
    );
  }
}

export default Profile;
