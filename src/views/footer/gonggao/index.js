import React, { Component } from 'react';
import { Button } from 'antd-mobile'

import { HTTPGet } from '../../../utils/http';

import './index.less'
class Gonggao extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tenderInfo: {}
    };
  }
  componentWillMount() {
    let bid = this.props.match.params.bid;
    let url = `/Website/Tender/detail?bid=${bid}`;
    HTTPGet(url).then((result) => {
      console.log(result);
      if (result && result.code == 0) {
        this.setState({
          tenderInfo: result.data
        });
      }
    });
  }

  render() {
    return (
      <div className='gong-gao'>
        <div className='banner-img-outer'>
          <div className='tender'>招标文件</div>
          <img src={require(`../../../imgs/zhaobiao-banner.png`)} alt="" />
        </div>
        <div className='tender-detail-main'>
          <div className='tender-title mb-8'>
            {this.state.tenderInfo.name}
          </div>
          {/* <a href={this.state.tenderInfo.files}><div className='down'>下载招募申请书</div></a> */}
          <div className='tender-content' dangerouslySetInnerHTML={{ __html: this.state.tenderInfo.content }}></div>
        </div>
      </div>
    );
  }
}

export default Gonggao;
