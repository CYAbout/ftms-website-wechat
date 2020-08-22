import React, { Component, Fragment } from 'react';
import UserLayout from '../components/layout';
import { Button, Modal } from 'antd-mobile';
import moment from 'moment';
import UserConfirm from '../components/alert/confirm';
import { orderApi } from '../api';
import MyBack from '../components/back';
import './index.less';

const OrderStatus = {
  COMMIT: '已提交',
  PAID: '已支付',
  REFUND: '退款中',
  REFUNDED: '已退款',
  COMPLETED: '已完成',
  CANCELED: '已取消'
}

const WarningEnum = {
  COMMIT: '若未及时付款，系统将自动取消',
  PAID: '已支付',
  REFUND: '退款中',
  REFUNDED: '已退款',
  COMPLETED: '已完成',
  CANCELED: '已取消'
}

class MyOrderDetail extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      visible: false,
      orderCode: props.match.params.id,
      order: {},
      currentId: null,
      pagination: {
        current: 1,
        total: 0
      }
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.getOrderDetail();
  }

  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }

  handleSubmit(id) {
    console.log(id)
    this.setState({
      // visible: true,
      currentId: id
    })
  }

  handleOk() {
    const { currentId, type } = this.state;
    if (currentId) {

    }
  }

  cancel() {
    this.setState({
      visible: false,
      currentId: null
    })
    window.myModal1()
  }

  getOrderDetail() {
    const { orderCode } = this.state;
    const params = {
      orderNo: orderCode
    }
    orderApi.getOrderDetail(params).then(res => {
      if (res && res.code === '0') {
        // test
        this.setState({
          order: res.data
        })
      }
    })
  }

  handleSearch(type) {
    this.setState({ type }, () => {
      this.getList();
    });
  }

  render() {
    const { order } = this.state;
    const { goodsInfo } = order;
    return (
      <UserLayout>
        <div className='mine_order detail'>
          <div className="ver_title"><MyBack />订单详情</div>
          <div className="ver_line"></div>
          <div className="card">
            <div className="order_info">
              <div className="no text">
                <span className="code">
                  订单号：{order.orderNo}
                </span>
                <span className="status">
                  {OrderStatus[order.orderStatus]}
                </span>
              </div>
              <div className="text">
                <span>
                  提交日期：
                  </span>
                <span>
                  {moment(order.commitTime).format('YYYY-MM-DD hh:mm:ss')}
                </span>
              </div>
              <div className="text">
                <span>
                  购车人：
                  </span>
                <span>
                  {order.extractName}
                </span>
              </div>
              <div className="text">
                <span>
                  联系电话：
                  </span>
                <span>
                  {order.extractMobilephone}
                </span>
              </div>
            </div>
            <div className="ver_line2"></div>
            <div className="warning">
              <span>{WarningEnum[order.orderStatus]}</span>
              <div className="interval">00:28:56</div>
            </div>
          </div>
          <div className="main_title">商品信息</div>
          {
            goodsInfo && goodsInfo.length > 0 && (
              <div className="product_img">
                {/* <img src={goodsInfo[0].goodsImg} alt="" /> */}
                <img src={`http://103.235.232.73/ftms/official_ftms/img/user/banner.jpg`} alt="" />
              </div>
            )
          }
          <div className="card">
            <div className="goods_info">
              <div className="head">
                <span className="version">
                  亚洲龙2.5L 自然吸气
                </span>
                <span>
                  x1
                </span>
              </div>
              <div className="text">
                <span>
                  外观颜色：
                  </span>
                <span>
                  黑
                </span>
              </div>
              <div className="text">
                <span>
                  内饰：
                  </span>
                <span>
                  红 + 黑
                </span>
              </div>
              <div className="text">
                <span>
                  配送方式：
                  </span>
                <span>
                  到店提车
                </span>
              </div>
              <div className="text">
                <span>
                  支付模式：
                  </span>
                <span>
                  在线支付
                </span>
              </div>
              <div className="text special">
                <span>
                  意向金：
                </span>
                <span className="price">
                  <span>¥</span>
                  <span>800</span>
                </span>
              </div>
            </div>
            <div className="ver_line2"></div>
            <div className="warning">
              <span>{WarningEnum[order.orderStatus]}</span>
              <div className="interval">00:28:56</div>
            </div>
          </div>
          <div className="main_title">订单跟踪</div>
          <div className="card">
            <div className="my_step">
              <div className="step_item current">
                <div className="step_title">
                  <p>2018-09-01</p>
                  <p>19:00:00</p>
                </div>
                <div className="step_tail"></div>
                <div className="step_icon">
                  <img src={require(`../../../imgs/icon-step-current.png`)} alt="" />
                </div>
                <div className="step_content">
                  订单提交成功
                </div>
              </div>
              <div className="step_item">
                <div className="step_title">
                  <p>2018-09-01</p>
                  <p>19:00:00</p>
                </div>
                <div className="step_tail"></div>
                <div className="step_icon">
                  <img src={require(`../../../imgs/icon-step-history.png`)} alt="" />
                </div>
                <div className="step_content">
                  订单提交成功
                </div>
              </div>
            </div>
          </div>
          <div className="btns">
            <div className="my-btn">
              <Button inline>立即支付</Button>
            </div>
            <div className="my-btn">
              <Button inline>取消订单</Button>
            </div>
          </div>
        </div>

        <Modal
          className='my-modal app-modal-box'
          visible={this.state.visible}
          closable={false}
          transparent
        // onClose={() => this.setState({ visible: false })}
        // maskClosable={true}
        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <UserConfirm
            text={'确定要取消预约吗？'}
            click={this.handleOk}
            cancel={this.cancel}
          />
        </Modal>
      </UserLayout>
    );
  }
}

export default MyOrderDetail;
