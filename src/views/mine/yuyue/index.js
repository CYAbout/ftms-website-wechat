import React, { Component } from 'react';
import UserLayout from '../components/layout';
import { Modal } from 'antd-mobile';
import UserConfirm from '../components/alert/confirm';
import { userApi } from '../api';
import MyBack from '../components/back';
import TestDriver from './testDriver';
import MainTain from './mainTain';
import GetMore from '../../../components/getmore'
import './index.less';

const TypeEnum = {
  testDrive: {
    title: '预约试驾',
    timeLabel: '预计购买时间',
    timeLabel1: '预计到店时间'
  },
  maintain: {
    title: '预约保养',
    timeLabel: '预计到店时间'
  },
  repair: {
    title: '预约维修',
    timeLabel: '预计到店时间'
  },
}

const STATUS = {
  CANCEL: '已取消',
  COMMIT: '已提交',
  LOST_EFFICACY: '已过期'
}

const STATUS_MAINTAIN = {
  '0': '已提交',
  '5': '已取消',
  '7': '已过期',
}

class MyAppointment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      type: props.match.params.type,
      data: [],
      currentId: null,
      userInfo: {},
      showLoading: false,
      beginPage: 1,
      pageSize: 5,
      hasNextPage: true
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.cancel = this.cancel.bind(this);
    this.getfirstData = this.getfirstData.bind(this)
  }

  componentDidMount() {
    this.getfirstData()
  }
  getfirstData() {
    const { type, beginPage, pageSize, data } = this.state;
    const user = localStorage.getItem('userInfo');
    if (user) {
      this.setState({
        userInfo: JSON.parse(user)
      })
    }
    if (type === 'testDrive') {
      // 预约试驾
      const opt = {
        beginPage,
        pageSize,
        mallMemberId: ''
      }
      userApi.getDriveList(opt).then(res => {
        if (res && res.code === '0' && res.data) {
          if (res.data.dataList) {
            this.setState({
              data: [...data, ...res.data.dataList],
              hasNextPage: res.data.hasNextPage,
              beginPage: beginPage + 1
            });
          }
          this.setState({
            showLoading: false,
          });
        }
      })
    } else if (type === 'maintain' || type === 'repair') {
      // 预约保养/维修
      const param = type === 'maintain' ? 1 : 2;
      const opt = {
        beginPage,
        pageSize,
        serviceType: param,
        token: ''
      }
      userApi.getMainTainList(opt).then(res => {
        if (res && res.code === '0' && res.data) {
          if (res.data.dataList) {
            this.setState({
              data: [...data, ...res.data.dataList],
              hasNextPage: res.data.hasNextPage,
              beginPage: beginPage + 1
            });
          }
          this.setState({
            showLoading: false,
          });
        }
        // else {
        //   const data = [
        //     {
        //       "id": 955,//id
        //       "orderNo": "201903071112",//预约编号
        //       "address": "宁海县梅林街道平安西路12号(高速出口处汽车4S园区)",//经销商地址
        //       "thumb": "http://homesite.ftms.devbmsoft.cn/Public/Img/2016/1228/14387852.png",//车型图片地址
        //       "description": "adaef",//故障描述
        //       "createtime": "1552290858",//创建时间 时间戳需转换 
        //       "clationname": "REIZ 锐志",//车型名称
        //       "faultpart": "轮胎坏了",//故障部位
        //       "name": "王丽鹏",//用户名
        //       "mobile": "18710250215",//手机号
        //       "dealername": "宁波和信丰田",//经销商名称
        //       "gotime": "2019-2-19 09:00",//到店时间
        //       "serviceStatus": 0//服务状态 0 已提交 5 已取消
        //     },
        //     {
        //       "id": 956,
        //       "orderNo": "201903071112",
        //       "address": "北京市朝阳区来广营西路95号",
        //       "thumb": "http://homesite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/03/382828428244822542693446625463.png",
        //       "description": "aefaefa",
        //       "createtime": "1552290858",
        //       "clationname": "全新RAV4荣放",
        //       "faultpart": "轮胎坏了",
        //       "name": "赵鹏",
        //       "mobile": "18710250215",
        //       "dealername": "北京北苑丰田",
        //       "gotime": "2019-2-19 09:00",
        //       "serviceStatus": 5
        //     }
        //   ]
        //   this.setState({
        //     data
        //   });
        // }
      })
    }
  }

  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }

  handleSubmit(id) {
    console.log(id)
    this.setState({
      visible: true,
      currentId: id
    })
    window.myModal()
  }

  handleOk() {
    const { currentId, type } = this.state;
    if (currentId) {
      if (type === 'testDrive') {
        userApi.cancelTestCar(currentId).then(res => {
          if (res && res.code === '0') {
            this.refreshData();
          }
        })
      } else if (type === 'maintain' || type === 'repair') {
        userApi.cancelService(currentId).then(res => {
          if (res && res.code === '0') {
            this.refreshData();
          }
        })
      }
    }
  }

  refreshData() {
    this.setState(preState => {
      const cloneData = Array.from(preState.data);
      const data = cloneData.filter((d) => d.id === preState.currentId);
      const index = cloneData.findIndex(d => d.id === preState.currentId)
      if (data && data.length) {
        const status = preState.type === 'testDrive' ? 'CANCEL' : (preState.type === 'maintain' || preState.type === 'repair') ? 5 : null;
        data[0].subscribeStatus = status;
        data[0].serviceStatus = status;
        cloneData[index] = data[0];
      }
      console.log(cloneData)
      return {
        data: cloneData,
        visible: false
      }
    })
    window.myModal1()
  }

  cancel() {
    this.setState({
      visible: false,
      currentId: null
    })
    window.myModal1()
  }

  getList() {
    const { type } = this.state;
    // 根据不同的类型进行列表查询
  }
  getMoreData() {
    this.setState({
      showLoading: true
    })
    this.getfirstData()
  }
  render() {
    const { data, type, userInfo, hasNextPage } = this.state;
    const EL = type === 'testDrive' ? TestDriver : (type === 'maintain' || type === 'repair') ? MainTain : null;
    console.log('el', EL)
    return (
      <UserLayout>
        <div className='mine_appointment'>
          <div className="ver_title"><MyBack />{TypeEnum[type].title}</div>
          <div className="ver_line"></div>
          {
            data && data.length > 0 ? <EL
              typeEnum={TypeEnum}
              status={STATUS}
              mSataus={STATUS_MAINTAIN}
              type={type}
              userInfo={userInfo}
              data={data}
              click={this.handleSubmit.bind(this)}
            /> : (
                <div className="no_data">
                  <img src={require(`../../../imgs/no-data.jpg`)} alt="" />
                </div>
              )
          }
          {!!data.length && <GetMore
            showLoading={this.state.showLoading}
            noMore={!this.state.hasNextPage}
            getMoreData={() => this.getMoreData()}
          />}
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

export default MyAppointment;
