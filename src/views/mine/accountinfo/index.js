import React, { Component, Fragment } from 'react';
import UserLayout from '../components/layout';
import { Button, Modal, ImagePicker, Toast } from 'antd-mobile';
import UserAlert from '../components/alert';
import {
  MyInput,
  MyRadio
} from '../../../components/dataview/';
import MyBack from '../components/back';
import { replaceSpeString } from '../../../utils/util';
import { userApi } from '../api';
import './index.less';

class AccountInfo extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      sexData: [{ label: '男', value: '1' }, { label: '女', value: '0' }],
      sexValue: '1',
      files: [],
      userName: '',
      userInfo: {},
      selected: false,
      changeImg: false,
      imgUrl: require(`../../../imgs/avatar-default.png`),
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  componentDidMount() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
    }
    this.setState({
      userInfo,
      sexValue: userInfo.sex || '1',
      userName: userInfo.loginName,
      imgUrl: userInfo.memberLogo || require(`../../../imgs/avatar-default.png`)
    })
  }
  
  onChangeHandle(type, val) {
    if (type === 'userName') {
      val = replaceSpeString(val);
    }
    this.setState({
      [type]: val
    })
  }

  handleSubmit() {
    // console.log(this.state);
    // let st= document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    // // alert( st);
    
    // window.scrollTo(0,st)
    let { userName, sexValue, userInfo, imgUrl, changeImg } = this.state;
    if (!userName) {
      Toast.info('请输入用户名', 1);
      return;
    }
    const params = {
      loginName: userName,
      sex: sexValue,
      memberLogo: null
    }
    if (changeImg) {
      params.memberLogo = imgUrl;
    }
    userApi.modifyUserInfo(params).then(res => {
      if (res && res.code === '0') {
        this.setState({
          visible: true
        }, () => {
          // 更新用户信息
          userInfo.loginName = userName;
          userInfo.sex = sexValue;
          userInfo.memberLogo = imgUrl;
          localStorage.setItem('userInfo', JSON.stringify(userInfo));
        })
      }
    })
  }

  jumpTo() {
    // alert(this.state.ST);
    this.props.history.push('/mine');
  }

  onChange(files, type, index) {
    const { selected, userInfo } = this.state;
    const file = files[files.length - 1];
    const isLt10M = file.file.size / 1024 / 1024 < 10
    const imgUrl = file.url;
    console.log(isLt10M, file.size / 1024 / 1024)
    if (!isLt10M) {
      Toast.info('图片大小不能超过10M');
      return;
    }
    userApi.uploadAvatar({
      imgUrl,
      accessToken: userInfo.accessToken
    }, userInfo.accessToken).then(res => {
      if (res && res.code === '0') {
        const url = res.data.imgNetworkAddress;
        this.setState({
          files: [files[0]],
          imgUrl: url,
          changeImg: true
        }, () => {
          if (this.state.files.length === 1 && !selected) {
            const arr = document.getElementsByClassName('am-flexbox-item');
            const parent = document.getElementsByClassName('am-flexbox')[0];
            const pre = arr[0];
            parent.removeChild(pre);
            this.setState({ selected: true });
          }
        });
      }
    })
  };
  // onAddImageClick(e) {
  //   console.log('xxxxxx')
  //   e.preventDefault();
  //   const { files } = this.state;
  //   if (files && files.length) {
  //     const _this = this;
  //     const reader = new FileReader();
  //     reader.readAsDataURL(files[0]);
  //     reader.onload = function (e) {
  //       _this.setState({
  //         imgUrl: this.result
  //       });
  //     }
  //   }
  // };

  render() {
    const { visible, sexData, sexValue, files, userName, imgUrl } = this.state;

    return (
      <UserLayout>
        <div className='mine_account_info'>
          <div className="ver_title"><MyBack />账户信息</div>
          <div className="ver_line"></div>
          <div className="card form">
            <div className="avatar">
              <div className="img">
                <img src={imgUrl} alt="头像" />
              </div>
              <div className="upload-box">
                <ImagePicker
                  files={files}
                  onChange={this.onChange.bind(this)}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={true}
                // onAddImageClick={this.onAddImageClick.bind(this)}
                />
              </div>
            </div>
            <ul>
              <li className="label_box tishi">
                <div className="l">用户名：</div>
                <div className="r">
                  <MyInput
                    ref="keyword"
                    placeholder='请输入用户名'
                    maxLength={15}
                    value={userName}
                    onChange={(v) => this.onChangeHandle('userName', v)}
                  />
                  <p>*限定十五个字符以内</p>
                </div>
              </li>
              <li className="label_box">
                <div className="l">性别：</div>
                <div className="r">
                  <MyRadio
                    value={sexValue}
                    data={sexData}
                    onChange={(v) => this.onChangeHandle('sexValue', v)}
                  />
                </div>
              </li>
            </ul>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={this.handleSubmit}>保存</Button>
              </div>
            </div>
          </div>
        </div>
        <Modal
          className='my-modal app-modal-box'
          visible={visible}
          closable={false}
          transparent
        // onClose={() => this.setState({ visible: false })}
        // maskClosable={true}
        // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <UserAlert
            text={'您的信息已保存'}
            click={this.jumpTo}
          />
        </Modal>
      </UserLayout>
    );
  }
}

export default AccountInfo;
