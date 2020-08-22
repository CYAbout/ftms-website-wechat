import React, { Component } from 'react';
import {Button,Icon} from 'antd-mobile'
import { connect } from 'react-redux';
import {toRetry} from '../../../redux/loadretry.redux'
@connect(
  state => state,
  {toRetry}
)
class Loading extends Component {
  render() {
    const props = this.props
    if (props.error) {
      if(this.props.loadretry.retryCount > 0) {
        // return <div>Error!  <Button inline onClick={ props.retry }>重试</Button></div>;
        return null
      }else {
        props.toRetry(1)
        props.retry()
        return null
      }
      // return <div>Error! <Button inline onClick={ props.retry }>重试</Button></div>;
    } else if (props.timedOut) {
      // return <div>Taking a long time... <Button inline onClick={ props.retry }>重试</Button></div>;
      return null
    } else if (props.pastDelay) {
      return (
        <div style={{height: '100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <Icon type="loading" color='#d3b07a' size='lg' />
        </div>
      );
    } else {
      if(this.props.loadretry.retryCount != 0) {
        props.toRetry(0)
      }
      return null;
    }
  }
}

export default Loading;
