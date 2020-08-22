import React, { Component, Fragment } from 'react';
// import { Link } from "react-router-dom";
import { Button, Modal, Icon, PullToRefresh } from 'antd-mobile';
import moment from 'moment';
// import UserConfirm from '../components/alert/confirm';
import GetMore from '../../../components/getmore';
import UserLayout from '../components/layout';
import { userApi } from '../api';
import MyBack from '../components/back';
import './index.less';
import { list } from 'postcss';

const OrderStatus = {
  COMMIT: '已提交',
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

class MyCard extends Component {

  constructor(props) {
    super(props);
    console.log(props)
    this.state = {
      visible: false,
      type: props.match.params.type || 'unused',
      data: {},
      listData: [],
      currentId: null,
      pagination: {
        current: 0,
        totalPage: 1,
        total: 0
      },
      refreshing: false,
      showLoading: false,
      height: document.documentElement.clientHeight
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleOk = this.handleOk.bind(this);
    // this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    this.getList();
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

  // handleOk() {
  //   const { currentId, type } = this.state;
  //   if (currentId) {

  //   }
  // }

  // cancel() {
  //   this.setState({
  //     visible: false,
  //     currentId: null
  //   })
  // }

  getList(isRefresh) {
    let { type, pagination } = this.state;
    
    if (isRefresh && pagination.current === pagination.totalPage) {
      return;
    }
    let page = !isRefresh ? 1 : pagination.current + 1;
    const params = {
      cardStatus: type,
      beginPage: page,
      pageSize: 5
    }
    // test
    // let data = {
    //   "sumCard": 1, //我的卡券总数
    //   "unusedNum": 1,//未使用卡券数
    //   "usedNum": 0,//已使用卡券数
    //   "staleNum": 0,//过期卡券数
    //   "basePageObject": {
    //     "currentPage": 1,
    //     "totalPages": 1,
    //     "pageSize": 1,
    //     "totalRows": 3,
    //     "currentRow": 0,
    //     "hasNextPage": true,
    //     "hasPreviousPage": false,
    //     "dataList": [
    //       {
    //         "depositPrice": 0.01,
    //         "listPrice": 4888,
    //         "goodsName": "RAV4荣放-元宵活动",
    //         "goodsImg": "http://dev01.homesite.ftms.devwox.com:8000/Public/Uploads/Picture/images/2019/02/384456754832632926835656154437.png",
    //         "cardUse": "新车购买",
    //         "effectTime": 1550246400000,
    //         "expireTime": 1551338940000,
    //         "useStatus": "unused"
    //       },
    //       {
    //         "depositPrice": 0.01,
    //         "listPrice": 4888,
    //         "goodsName": "RAV4荣放-元宵活动",
    //         "goodsImg": "http://dev01.homesite.ftms.devwox.com:8000/Public/Uploads/Picture/images/2019/02/384456754832632926835656154437.png",
    //         "cardUse": "新车购买",
    //         "effectTime": 1550246400000,
    //         "expireTime": 1551338940000,
    //         "useStatus": "unused"
    //       }
    //     ]
    //   }
    // }
    userApi.getCardList(params).then(res => {
      this.setState({ showLoading: false });
      if (res && res.code === '0') {
        const data = res.data;
        let listData = data.basePageObject ? data.basePageObject.dataList : [];
        if (isRefresh) {
          listData = this.state.listData;
          listData = listData.concat(data.basePageObject.dataList);
        }
        this.setState({
          data: res.data,
          listData,
          pagination: {
            current: data.basePageObject.currentPage,
            totalPage: data.basePageObject.totalPages,
            total: data.basePageObject.totalRows
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
    let { data, type, pagination, listData, showLoading } = this.state;
    console.log('lll', pagination)
    // const cards = data && data.basePageObject ? data.basePageObject.dataList : [];
    return (
      <UserLayout>
        <div className='mine_card'>
          <div className="ver_title"><MyBack />我的卡券</div>
          <div className="ver_line"></div>
          <div className="search_area">
            <div className={type === 'unused' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('unused')}>未使用({data.unusedNum || 0})</Button>
            </div>
            <div className={type === 'used' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('used')}>已使用({data.usedNum || 0})</Button>
            </div>
            <div className={type === 'stale' ? 'my-btn active' : 'my-btn'}>
              <Button inline onClick={(e) => this.handleSearch('stale')}>已过期({data.staleNum || 0})</Button>
            </div>
          </div>
          {
            listData.length ? (
              <div className="card">
                {
                  listData.map((card, index) => {
                    return (
                      <div className={(type === 'used' || type === 'stale') ? 'card_content unused' : 'card_content'} key={index}>
                        <div className="left">
                          <div className="face">
                            <span className="unit">¥</span>
                            <span>{card.depositPrice}</span>
                          </div>
                          <div className="desc">
                            <span>{`【${card.depositPrice}元抵${card.listPrice}元】`}</span>
                          </div>
                        </div>
                        <div className="right">
                          <div className="top">
                            <p>
                              <span>使用范围：</span>
                              <span>{card.cardUse}</span>
                            </p>
                            <p>
                              <span>使用规则：</span>
                              <span>{`${card.depositPrice}元抵${card.listPrice}元`}</span>
                            </p>
                          </div>
                          {/* <div className="ver_line_dotted"></div> */}
                          <div className="bottom">
                            <span>有效期:{moment(card.effectTime).format('YYYY-MM-DD')}-{moment(card.expireTime).format('YYYY-MM-DD')}</span>
                          </div>
                          {
                            type === 'used' && <img className="used-tag" src={require('../../../imgs/card-used-tag.png')} alt="" />
                          }
                          {
                            type === 'stale' && <img className="used-tag" src={require('../../../imgs/card-stale-tag.png')} alt="" />
                          }
                        </div>
                      </div>
                    )
                  })
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

            ) : (
                <div className="no_data">
                  <img src={require(`../../../imgs/no-data.jpg`)} alt="" />
                </div>
              )
          }
        </div>

        {/* <Modal
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
        </Modal> */}
      </UserLayout>
    );
  }
}

export default MyCard;
