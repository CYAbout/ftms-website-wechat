import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

@withRouter
class MineBack extends Component {

  hanleClick() {
    const backUrl = this.props.url;
    if (backUrl) {
      this.props.history.push(backUrl);
    } else {
      this.props.history.push('/mine');
    }
  }

  render() {
    return <div className="mine-back">
      <a href="javascript:void(0)" onClick={this.hanleClick.bind(this)}>
        <img src={require(`../../../../imgs/icon-back.png`)} alt="" />
      </a>
    </div>
  }
}

export default MineBack;
