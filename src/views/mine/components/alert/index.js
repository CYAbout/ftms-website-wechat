import React, { Component, Fragment } from 'react';
import { Button } from 'antd-mobile';
import './index.less';

class UserAlert extends Component {
  render() {
    return (
      <Fragment>
        <div className="mine_alert">
          <img src={require('../../../../imgs/icon-succes.png')} alt="" />
          <div className='text'>{this.props.text}</div>
          <div className="btns">
            <div className="my-btn">
              <Button inline onClick={(e) => this.props.click()}>确定</Button>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

export default UserAlert;