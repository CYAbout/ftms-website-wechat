import React, { Component } from 'react';

import { HTTPGet } from '../../../utils/http';

import './tenderList.less'

class TenderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenderList: [],
      currentPage: 1,
      hasNextPage: false
    };
  }
  componentDidMount() {
    document.title = '供应商招募公告'
  }

  componentWillMount() {
    let url = '/Website/Tender/tenderList';
    HTTPGet(url).then((result) => {
      console.log(result);
      if (result && result.code == 0) {
        let data = result.data;
        this.setState({
          tenderList: data.dataList,
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage
        });
      }
    });
  }
  getMore() {
    let page = this.state.currentPage;
    page++;
    let url = '/Website/Tender/tenderList?page=' + page;
    HTTPGet(url).then((result) => {
      console.log(result);
      if (result && result.code == 0) {
        let data = result.data;
        let list = this.state.tenderList;
        for (let item of data.dataList) {
          list.push(item);
        }
        this.setState({
          tenderList: list,
          currentPage: data.currentPage,
          hasNextPage: data.hasNextPage
        });
      }
    });
  }
  jumpDetail(bid) {
    this.props.history.push(`/footer/gonggao/${bid}`);
  }
  render() {
    return (
      <div className='tender-list'>
        <div className='banner-img-outer'>
          {/* <div className='tender'>供应商招募公告</div> */}
          <img src={require(`../../../imgs/zhaobiao-banner.png`)} alt="" />
        </div>
        <div className='tender-main'>
          <ul>
            {this.state.tenderList.map((val) => {
              return (
                <li key={val.bid} onClick={() => { this.jumpDetail(val.bid) }}>
                  <div className='time'>
                    <img src={require(`../../../imgs/wenzhang-0.png`)} alt="" />
                    {val.addtime}
                  </div>
                  <p>{val.name}</p>
                </li>
              )
            })}
          </ul>
        </div>
        <div className={this.state.hasNextPage ? 'scan-more' : 'hidden'} onClick={() => { this.getMore(); }}>
          <div className='txt'>查看更多</div>
          <div className='icon'>
            <img src={require(`../../../imgs/down-1.png`)} alt="" />
          </div>
        </div>
      </div>
    );
  }
}

export default TenderList;
