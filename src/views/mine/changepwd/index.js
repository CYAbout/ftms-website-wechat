import React, { Component, Fragment } from 'react';
import { Toast } from 'antd-mobile';
import UserLayout from '../components/layout';
import { Button, Modal } from 'antd-mobile';
import UserAlert from '../components/alert';
import {
  MyInput
} from '../../../components/dataview/';
import MyBack from '../components/back';
import { userApi } from '../api';
import config from '../../../config.json';

import './index.less';

class ChangePassword extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }

  componentDidMount() {
  }

  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }

  validator() {
    const { oldPassword, password, surePassword } = this.state;
    if (!oldPassword) {
      Toast.info('请输入原始密码', 1);
      return false;
    } else if (!password) {
      Toast.info('请输入新密码', 1);
      return false;
    } else if (!surePassword) {
      Toast.info('请输入确认新密码', 1);
      return false;
    } else {
      if (password.length < 6) {
        Toast.info('密码长度最小为6位', 1);
        return false;
      }
      if (password !== surePassword) {
        Toast.info('新密码与确认密码输入不一致，请检查', 1);
        return false;
      }
    }
    return true;
  }

  handleSubmit() {
    console.log(this.state);
    const validResult = this.validator();
    if (validResult) {
      const { oldPassword, password, surePassword } = this.state;
      const params = {
        oldPassword,
        password,
        surePassword
      }
      userApi.modifyPassword(params).then(res => {
        if (res && res.code === '0') {
          this.setState({
            visible: true,
            oldPassword: '',
            password: '',
            surePassword: ''
          })
          window.myModal()
        }
      })
    }
  }

  jumpTo() {
    localStorage.clear();
    // this.props.history.push('/login');
    window.location.href = `${config.wxBasePath}/Wechat/Service/registerTel.html`
  }

  render() {
    const { oldPassword, password, surePassword } = this.state;

    return (
      <UserLayout>
        <div className='mine_change_pwd'>
          <div className="ver_title">
            <MyBack />
            修改密码
          </div>
          <div className="ver_line"></div>
          <div className="card form">
            <ul>
              <li className="label_box">
                <div className="l">旧密码：</div>
                <div className="r">
                  <MyInput
                    type="password"
                    maxLength="20"
                    value={oldPassword}
                    placeholder='请输入原始密码'
                    onChange={(v) => this.onChangeHandle('oldPassword', v)}
                  />
                </div>
              </li>
              <li className="label_box">
                <div className="l">新密码：</div>
                <div className="r">
                  <MyInput
                    type="password"
                    maxLength="20"
                    value={password}
                    placeholder='请输入6-20位数字和字母的组合'
                    onChange={(v) => this.onChangeHandle('password', v)}
                  />
                </div>
              </li>
              <li className="label_box">
                <div className="l">确认密码：</div>
                <div className="r">
                  <MyInput
                    type="password"
                    maxLength="20"
                    value={surePassword}
                    placeholder='请再次输入新密码'
                    onChange={(v) => this.onChangeHandle('surePassword', v)}
                  />
                </div>
              </li>
            </ul>
            <div className="btns">
              <div className="my-btn">
                <Button inline onClick={this.handleSubmit}>立即更换</Button>
              </div>
            </div>
          </div>
          <div className="desc">
            <p className="label">操作提示：</p>
            <div className="desc_text">
              <p>1、登录密码是您在进行个人中心账户登录的唯一权限凭证，请修改后牢记密码。</p>
              <p>2、设置密码时，建议您不要使用过于简单的数字（如六位相同数字）或者易被破译的数字（如生日、电话号码等）。</p>
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
          <UserAlert
            text={'您的密码修改成功，请重新登录！'}
            click={this.jumpTo}
          />
        </Modal>
      </UserLayout>
    );
  }
}

export default ChangePassword;
