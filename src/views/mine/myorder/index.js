import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Link } from "react-router-dom";
import { Button, Modal, Icon } from 'antd-mobile';
import UserConfirm from '../components/alert/confirm';
import GetMore from '../../../components/getmore';
import UserLayout from '../components/layout';
import { orderApi } from '../api';
import MyBack from '../components/back';
import config from '../../../config.json';
import './index.less';

const OrderStatus = {
  COMMIT: '待支付',
  PAID: '已支付',
  REFUND: '退款中',
  REFUNDED: '已退款',
  COMPLETED: '已完成',
  CANCELED: '已取消'
}

const StatusEnum = {
  paying: 'COMMIT',
  paid: 'PAID',
  completed: 'COMPLETED'
}

class MyOrder extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      visible: false,
      type: props.match.params.type || 'all',
      data: [],
      listData: [],
      currentId: null,
      pagination: {
        current: 1,
        totalPage: 1,
        total: 0
      },
      refreshing: false,
      showLoading: false,
      height: document.documentElement.clientHeight
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    const _this = this;
    console.log(this.refs)
    console.log('ReactDOM.findDOMNode(this.ptr)', ReactDOM.findDOMNode(this.ptr))
    const hei = this.state.height // - ReactDOM.findDOMNode(this.ptr).offsetTop// findDOMNode(this.ptr).offsetTop;
    setTimeout(() => this.setState({
      height: hei,
      data: _this.getList(),
    }), 0);
    // this.getList();
  }

  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }

  handleSubmit(id, type, refundNo) {
    console.log(id)
    this.setState({
      // visible: true,
      currentId: id
    }, () => {
      const userInfo = JSON.parse((localStorage.getItem('userInfo')))
      console.log(userInfo)
      userInfo.data = { ACCESS_TOKEN: userInfo.accessToken }
      // 跳转到商城
      switch (type) {
        case 'detail':
          window.open(`${config.mallServerPath}/user/order/deatils/${id}?token=${userInfo.accessToken}`);
          break;
        case 'pay':
          window.open(`${config.mallServerPath}/pay/${id}?token=${userInfo.accessToken}`);
          break;
        case 'hx':
          // window.location.href = `${config.mallServerPath}/account/orderList/Payfor?id=${id}`;
          break;
        case 'refund':
          window.open(`${config.mallServerPath}/user/order/refund/detail/${refundNo}&${id}?token=${userInfo.accessToken}`);
          break;
        case 'rebuy':
          // window.location.href = `${config.mallServerPath}/avalon/success/${id}`;
          break;
      }
    })
  }

  handleOk() {
    const { currentId, type } = this.state;
    if (currentId) {
      // 取消订单，跳转到商城
    }
  }

  cancel() {
    this.setState({
      visible: false,
      currentId: null
    })
    window.myModal1()
  }

  getList(isRefresh) {
    let { type, pagination } = this.state;
    if (isRefresh && pagination.current === pagination.totalPage) {
      return;
    }
    const params = {
      cardStatus: type,
      beginPage: isRefresh ? pagination.current + 1 : pagination.current,
      pageSize: 10,
      orderStatus: StatusEnum[type]
    }
    orderApi.getOrders(params).then(res => {
      this.setState({ refreshing: false });
      const data = res.data;
      let listData = data.dataList || [];
      if (isRefresh) {
        listData = this.state.listData;
        listData = listData.concat(data.dataList);
      }
      this.setState({ showLoading: false })
      if (res && res.code === '0') {
        this.setState({
          data: res.data,
          listData,
          pagination: {
            current: data.currentPage,
            totalPage: data.totalPages,
            total: data.totalRows
          }
        })
      }
    })
  }

  handleSearch(type, refreshing) {
    this.setState({ type, showLoading: refreshing }, () => {
      this.getList(refreshing);
    });
  }

  render() {
    const { pagination, type, listData, showLoading } = this.state;

    return (
      <UserLayout>
        <div className='mine_order'>
          <div className="ver_title"><MyBack />我的订单</div>
          <div className="ver_line"></div>
          <div className="search_area">
            <div className={type === 'all' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('all')}>全部</Button>
            </div>
            <div className={type === 'paying' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('paying')}>待支付</Button>
            </div>
            <div className={type === 'paid' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('paid')}>已支付</Button>
            </div>
            <div className={type === 'completed' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('completed')}>已完成</Button>
            </div>
          </div>
          {
            listData.length ? (
              listData.map((order) => {
                return (
                  <div className="card" key={order.orderNo} style={{ marginBottom: '.5rem' }}>
                    <div className="head">
                      <div className="code">
                        订单号：{order.orderNo}
                      </div>
                      <div className="status">
                        {OrderStatus[order.orderStatus]}
                      </div>
                    </div>
                    {/* <div className="md">
                            <p className="name">就是打开进风口了多福多寿</p>
                            <p className="time">2018-01-01 10:00:00</p>
                            <div className="addr">
                              <i></i>
                              北京市谢谢谢谢谢谢谢谢谢谢谢谢的三六九等失联飞机啊飞机阿里房间打扫
                            </div>
                          </div>
                          <div className="ver_line"></div> */}
                    <a href={`${config.mallServerPath}/account/orderList/Payfor?id=${order.orderNo}`}>
                      <div className="car_info">
                        <div className="img-box">
                          <img src={order.goodsImg} alt="" />
                        </div>
                        <div className="info">
                          <div className="title">{order.goodsName}</div>
                          <div className="detail">
                            <p>外观颜色：{order.attrs[1].attributeValueName}</p>
                            <p>内饰：{order.attrs[2].attributeValueName}</p>
                            <p className="money">支付金额：<span>¥ </span><span>{order.depositPrice}</span></p>
                          </div>
                        </div>
                      </div>
                    </a>
                    {
                      order.orderStatus !== 'CANCELED' && <div className="ver_line"></div>
                    }
                    <div className="btns">
                      <div className="my-btn">
                        {
                          order.orderStatus === 'COMMIT' && (
                            <React.Fragment>
                              <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'pay')}>立即支付</Button>
                              <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'detail')}>订单详情</Button>
                            </React.Fragment>
                          )
                        }
                        {
                          order.orderStatus === 'PAID' && (
                            <React.Fragment>
                              {/* <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'hx')}>查看核销码</Button> */}
                              <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'detail')}>订单详情</Button>
                            </React.Fragment>
                          )
                        }
                        {
                          order.orderStatus === 'COMPLETED' && <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'detail')}>订单详情</Button>
                        }
                        {
                          order.orderStatus === 'REFUND' && (
                            <React.Fragment>
                              <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'refund', order.refundNo)}>查看退款</Button>
                              <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'detail')}>订单详情</Button>
                            </React.Fragment>
                          )
                        }
                        {
                          order.orderStatus === 'REFUNDED' && <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'detail')}>订单详情</Button>
                        }
                        {
                          order.orderStatus === 'CANCELED' && (
                            <React.Fragment>
                              {/* <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'rebuy')}>再次购买</Button> */}
                              <Button inline onClick={(e) => this.handleSubmit(order.orderNo, 'detail')}>订单详情</Button>
                            </React.Fragment>
                          )
                        }

                      </div>
                    </div>
                  </div>
                )
              })
            ) : (
                <div className="no_data">
                  <img src={require(`../../../imgs/no-data.jpg`)} alt="" />
                </div>
              )
          }
          {
            pagination.total > 0 && pagination.current !== pagination.totalPage && (
              // <div className="load_more">
              //   <a href="javascript:void(0)" onClick={this.handleSearch.bind(this, type, true)}>查看更多</a>
              //   <Icon type="down" style={{ color: '#999999' }} />
              // </div>
              <GetMore showLoading={showLoading} getMoreData={(e) => this.handleSearch(type, true)} />
            )
          }
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

export default MyOrder;
