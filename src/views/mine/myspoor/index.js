import React, { Component } from 'react';
import { Icon } from 'antd-mobile';
import moment from 'moment';
import UserLayout from '../components/layout';
import MyBack from '../components/back';
import { userApi } from '../api';
import './index.less';

class Myspoor extends Component {

  state = {
    data: []
  }

  componentDidMount() {
    userApi.getMyFootPrint().then(res => {
      if (res && res.code === '0') {
        this.setState({
          data: res.data.dataList
        })
      }
    })
  }

  render() {
    const { data } = this.state;
    return (
      <UserLayout>
        <div className='mine_spoor'>
          <div className="ver_title"><MyBack />我的足迹</div>
          <div className="ver_line"></div>
          {
            data.length > 0 ? (
              <div className="card">
                <div className="spoor_content">
                  <div className="my_step">
                    {
                      data.map((foot, index) => {
                        return (
                          <div className="step_item current">
                            <div className="step_tail"></div>
                            <div className="step_icon">
                              <img src={index < data.length - 1 ? require(`../../../imgs/icon-step-circle.png`) : require(`../../../imgs/icon-step-start.png`)} alt="" />
                            </div>
                            <div className="step_content">
                              <div className="spoor_header">
                                <i className="spoor_footer"></i>
                                <span>{moment(foot.createTime).format('YYYY-MM-DD')}</span>
                              </div>
                              <div className="info">
                                {foot.description}
                              </div>
                            </div>
                          </div>
                        )
                      })
                    }
                  </div>
                </div>
              </div>
            ) : (
                <div className="no_data">
                  <img src={require(`../../../imgs/no-data.jpg`)} alt="" />
                </div>
              )
          }
        </div>
      </UserLayout>
    );
  }
}

export default Myspoor;
