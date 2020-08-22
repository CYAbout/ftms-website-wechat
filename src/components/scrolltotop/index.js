import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { Toast } from 'antd-mobile';
import { connect } from 'react-redux';
import { setShowFooterShare } from '../../redux/showHeader.redux';
@connect(
  state => state,
  {setShowFooterShare}
)
class ScrollToTop extends Component {
  componentWillReceiveProps(nextProps){
    //当路由切换时
    // console.log('nextProps.location,this.props.location',nextProps.location,this.props.location)
    // 
    // Toast.info('componentWillReceiveProps',1)
    if(this.props.location.pathname !== nextProps.location.pathname){
      this.props.setShowFooterShare(false)
      window.myModal1()
      window.scrollTo(0,0)
    }
  }
  render() {
    return this.props.children
  }
}

export default withRouter(ScrollToTop);
