import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { getParamsObj } from '../../../../utils/util'

@withRouter
class Tabthree extends Component {

  setIndex = (index) => {
    if(index == 3) {
      this.props.history.push('/carowner/introduce/aiche')
    }
    if(index == 2) {
      this.props.history.push('/carowner/introduce/shenbian')
    }
    // this.props.setIndex('',index)
  }

  componentDidMount() {
    document.title = '服务活动'
    let params = getParamsObj();
    switch(params.oneindex) {
      case '0':
        document.title = '诚信服务';
        break;
      case '1':
        document.title = '延保服务';
        break;
      case '2':
        document.title = '服务活动';
        break;
      case '3':
        document.title = '保修政策';
        break;
      case '4':
        document.title = '满意度调查';
        break;
    }
  }
  render() {
    return (
      <div className='tabthree'>
        <ul>
          <li>
            <div className="fwhd-img">
              <img src={require('../../../../imgs/fwhd-1.png')} alt=""/>
            </div>
            <h3 className='border-title'>身边杂志</h3>
            <p>精彩文章、活动资讯、微刊小程序......您身边的诚信服务。</p>
            <div className="fwhd-btn" onClick={() => this.setIndex(2)}>
              <img src={require('../../../../imgs/fwhd-0.png')} alt=""/>
              查看详情
            </div>
          </li>
          <li>
            <div className="fwhd-img">
              <img src={require('../../../../imgs/fwhd-2.png')} alt=""/>
            </div>
            <h3 className='border-title'>爱车课堂</h3>
            <p>爱车更懂车。</p>
            <div className="fwhd-btn" onClick={() => this.setIndex(3)}>
              <img src={require('../../../../imgs/fwhd-0.png')} alt=""/>
              查看详情
            </div>
          </li>
          <li>
            <div className="fwhd-img" >
              <img src={require('../../../../imgs/fwhd-3.png')} alt=""/>
            </div>
            <h3 className='border-title'>服务节</h3>
            <p>每年定期开展春夏秋冬四季服务节，向车主提供不同季节需求的服务项目优惠及客户关爱。</p>
          </li>

          <li>
            <div className="fwhd-img">
              <img src={require('../../../../imgs/fwhd-4.png')} alt=""/>
            </div>
            <h3 className='border-title'>服务嘉年华</h3>
            <p>
              展现一汽丰田诚信服务品牌魅力的大型展示体验类活动。<br />
              服务嘉年华户外体验活动旨在使消费者在各项互动体验中感受经销店售后服务的内容、流程，寓教于乐中收获快乐与知识。
            </p>
          </li>
          <li>
            <div className="fwhd-img">
              <img src={require('../../../../imgs/fwhd-5.png')} alt=""/>
            </div>
            <h3 className='border-title'>经销商开放日</h3>
            <p>邀请车主走进经销店，通过亲身参观体验售后的服务项目，让车主真正理解一汽丰田经销店的高水平及差异化服务标准。</p>
          </li>
          <li>
            <div className="fwhd-img">
              <img src={require('../../../../imgs/fwhd-6.png')} alt=""/>
            </div>
            <h3 className='border-title'>上门服务</h3>
            <p>为因距离4S店远而无法享受到专业化服务的客户，提供便利的维修保养服务，提高远距离客户的满意度。</p>
          </li>
        </ul>
      </div>
    );
  }
}

export default Tabthree;
