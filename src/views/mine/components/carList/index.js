import React, { Component } from 'react';
import moment from 'moment';
import { Button } from 'antd-mobile';
import './index.less';

class MyCarList extends Component {
  render() {
    console.log(this.props)
    return (
      <section className="mine_car_list">
        {
          this.props.data && this.props.data.length === 0 ? (
            <div className="no_bind">
              <img src={require(`../../../../imgs/car-no-bind.png`)} alt="" />
            </div>
          ) : this.props.data && this.props.data.map(car => {
            return (
              <div className="list_bg" key={car.carCode}>
                <div className="car_img">
                  <img src={car.carPic ? car.carPic : require(`../../../../imgs/no-sale-car.png`)} alt="" />
                </div>
                <div className="info">
                  <div className="title">
                    <img src={car.logos} alt="" />
                  </div>
                  <div className="subtitle">{car.longTitle ? car.longTitle : car.carModelName + car.carVersion}</div>
                  <div className="detail">
                    <ul>
                      <li className="label_box">
                        <div className="l">颜色：</div>
                        <div className="r">{car.color}</div>
                      </li>
                      <li className="label_box">
                        <div className="l">车架号：</div>
                        <div className="r">{car.carCode}</div>
                      </li>
                      <li className="label_box">
                        <div className="l">购车人手机号：</div>
                        <div className="r">{car.mobile ? car.mobile.substring(0, 3) + '****' + car.mobile.substring(7) : ''}</div>
                      </li>
                      <li className="label_box">
                        <div className="l">购车时间：</div>
                        <div className="r">{car.buyTime ? car.buyTime.toString().indexOf('-') > -1 ? car.buyTime : moment(car.buyTime + '000' - 0).format('YYYY-MM-DD') : ''}</div>
                      </li>
                    </ul>
                    {
                      this.props.btn && (
                        <div className="btns">
                          <div className="my-btn">
                            <Button inline onClick={(e) => this.props.btn.click(car.mobile, car.code)}>{this.props.btn.text}</Button>
                          </div>
                        </div>
                      )
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </section>
    )
  }
}

export default MyCarList;