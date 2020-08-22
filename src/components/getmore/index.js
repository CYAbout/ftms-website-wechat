import React, { Component } from 'react';
import {Icon} from 'antd-mobile'

class GetMore extends Component {
  
  render() {
    console.log(this.props)
    if(this.props.noMore) {
      return null
      // return (
      //   <div className="lookmore" >
      //   暂无更多数据
      //   </div>
      // )
    }
    return (
      <div className="lookmore" >
        {!this.props.showLoading ? 
        <div onClick={() => this.props.getMoreData()}>
          <div>查看更多</div>
          <div><Icon type="down" size='md' /></div>
        </div>
        :
          <div>
            <div><Icon type="loading" size='md' /></div>
          </div>
        }
      </div>
    );
  }
}

export default GetMore;
