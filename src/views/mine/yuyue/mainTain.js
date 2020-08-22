import React, { Component, Fragment } from 'react';
import { Button } from 'antd-mobile';
import moment from 'moment';
import { withRouter } from 'react-router-dom';

@withRouter
class MainTain extends Component {
  jump(type, id) {
    let index = 0;
    if (type === 'maintain') {
      index = 1;
    } else if (type === 'repair') {
      index = 2;
    }
    let url = id?`/carowner/lobby?tabIndex=${index}&id=${id}&modify=1`:`/carowner/lobby?tabIndex=${index}`;
    this.props.history.push(url);
  }
  render() {
    return this.props.data.map((yy, index) => {
      return <div className="card" key={index}>
        <div className="head">
          <div className="code">
            预约编号：{yy.orderNo}
          </div>
          <div className="status">
            {this.props.mSataus[yy.serviceStatus]}
          </div>
        </div>
        <div className="md">
          <p className="name">{yy.dealername}</p>
          <p className="time">{moment(yy.createtime + '000' - 0).format('YYYY-MM-DD HH:mm')}</p>
          <div className="addr">
            <i></i>
            {yy.address}
          </div>
        </div>
        <div className="ver_line"></div>
        <div className="car_info">
          <div className="img-box">
            <img src={yy.thumb || require(`../../../imgs/yuyue-car.png`)} alt="" />
          </div>
          <div className="info">
            <div className="title">{yy.clationname}</div>
            <div className="detail">
              <p>{yy.name}</p>
              <p>{yy.mobile}</p>
              <p>{this.props.typeEnum[this.props.type].timeLabel}: {yy.gotime}</p>
            </div>
          </div>
        </div>
        <div className="ver_line"></div>
        {
          this.props.type === 'repair' && (
            <div className="maintain_info">
              <p>故障部位：<span>{yy.faultpart}</span></p>
              <p>故障描述：<span>{yy.description}</span></p>
            </div>
          )
        }

        {
          yy.serviceStatus === 0 && <Fragment>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={(e) => this.props.click(yy.id)}>取消预约</Button>
                <Button inline onClick={this.jump.bind(this, this.props.type, yy.id)}>修改</Button>
              </div>
            </div>
          </Fragment>
        }
        {
          yy.serviceStatus === 5 && <Fragment>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={this.jump.bind(this, this.props.type, '')}>再次预约</Button>
              </div>
            </div>
          </Fragment>
        }
      </div>
    })
  }
}

export default MainTain;