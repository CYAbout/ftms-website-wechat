import React, { Component, Fragment } from 'react';
import { Button } from 'antd-mobile';
import { withRouter } from 'react-router-dom';
import moment from 'moment';

@withRouter
class TestDriver extends Component {

  jump(url) {
    if (url) {
      this.props.history.push(url);
    }
  }

  render() {
    return this.props.data.map(yy => {
      return <div className="card">
        <div className="head">
          <div className="code">
            预约编号：{yy.no}
          </div>
          <div className="status">
            {this.props.status[yy.subscribeStatus]}
          </div>
        </div>
        <div className="md">
          <p className="name">{yy.dealerName}</p>
          <p className="time">{moment(yy.addTime).format('YYYY-MM-DD HH:mm')}</p>
          <div className="addr">
            <i></i>
            {yy.address}
          </div>
        </div>
        <div className="ver_line"></div>
        <div className="car_info">
          <div className="img-box">
            <img src={yy.goodsImg || require(`../../../imgs/yuyue-car.png`)} alt="" />
          </div>
          <div className="info">
            <div className="title">{yy.productname}</div>
            <div className="detail">
              <p>{yy.name}</p>
              <p>{yy.mobile}</p>
              <p>{this.props.typeEnum[this.props.type].timeLabel1}: {moment(yy.driveDate).format('YYYY-MM-DD HH:mm')}</p>
              <p>{this.props.typeEnum[this.props.type].timeLabel}: {yy.planShoppingTime}</p>
            </div>
          </div>
        </div>
        {
          yy.subscribeStatus === 'COMMIT' && <Fragment>
            <div className="ver_line"></div>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={(e) => this.props.click(yy.id)}>取消预约</Button>
                <Button inline onClick={this.jump.bind(this, `/buycar/shijia?id=${yy.id}`)}>修改</Button>
              </div>
            </div>
          </Fragment>
        }
        {
          yy.subscribeStatus === 'CANCEL' && <Fragment>
            <div className="ver_line"></div>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={this.jump.bind(this,`/buycar/shijia`)}>再次预约</Button>
                {/* <Button inline onClick={this.jump.bind(this, `/buycar/shijia?id=${yy.id}`)}>修改</Button> */}
              </div>
            </div>
          </Fragment>
        }
      </div>
    })
  }
}

export default TestDriver;