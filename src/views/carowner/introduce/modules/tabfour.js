import React, { Component } from 'react';
import { getParamsObj } from '../../../../utils/util'


class Tabfour extends Component {
  
  componentDidMount() {
    document.title = '保修政策'
    let params = getParamsObj();
    switch(params.oneindex) {
      case '0':
        document.title = '诚信服务';
        break;
      case '1':
        document.title = '延保服务';
        break;
      case '2':
        document.title = '服务活动';
        break;
      case '3':
        document.title = '保修政策';
        break;
      case '4':
        document.title = '满意度调查';
        break;
    }
  }
  render() {
    const tableData = [
      ['大对象','详细对象','保修期','说明'],
      ['整车保修','全车型','3年或10万公里','两者以先到者为准'],
      ['皇冠','12年7月26以后生产','4年或10万公里','两者以先到者为准'],
      ['出租车','花冠EX','1年或10万公里','两者以先到者为准'],
      ['双擎HEV电池','普锐斯（新）','5年或20万公里','两者以先到者为准'],
      ['','卡罗拉双擎','8年或20万公里','两者以先到者为准'],
      ['发动机','皇冠2.0T','6年或10万公里','两者以先到者为准'],
      ['蓄电池','全车型','2年或5万公里','第二年维修半价、两者以先到者为准'],
      [' ','花冠EX出租车','1年或10万公里','两者以先到者为准'],
      ['零件保修','','1年或2万公里','两者以先到者为准'],
      ['易损件','','6个月或1万公里','两者以先到者为准'],
    ]
    return (
      <div className='tabfour'>
        <div className="top-box">
          <h3 className="title">
            保修的定义
          </h3>
          <div className='center-text'>
            保修是由品质问题引起的，在保修期内，<br />
            由经销商店实施的免费修理。
          </div>
          <h3 className="title">
            保修的对象和范围
          </h3>
        </div>
        <div className="pic-content">
          <img src={require('../../../../imgs/baoxiu-1.png')} alt=""/>
          <img src={require('../../../../imgs/baoxiu-2.png')} alt=""/>
        </div>
        <div className="table-box">
          <div className="table-title">
            <h3>保修期</h3>
            <div>2017年1月22</div>
          </div>
          <ul>
          {
            tableData.map((v,i) => {
              return (
                <li key={i}>
                  {
                    v.map((z,a) => <span key={a}>{z}</span>)
                  }
                </li>
              )
            })
          }
          </ul>
        </div>
      </div>
    );
  }
}

export default Tabfour;
