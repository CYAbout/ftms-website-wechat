import React, { Component } from 'react';
import { getParamsObj } from '../../../../utils/util'

class Tabone extends Component {
  constructor(props){
    super(props)
    this.state = {
      step:1,
      stepData:[
        {
          img:'carowner-phone.png',
          title:'1、保养提醒&预约',
          list:[
            '根据车主的用车需求来推测车辆的保养时间并提醒车主',
            '根据车主的实际需求给车主提出保养、维修方面的专业建议',
            '使用服务进程控制看板来识别可用的技师、工位、并向车主建议可行的预约时间',
          ]
        },
        {
          img:'carowner-phone2.png',
          title:'2、预约准备',
          list:[
            '准备所需零件、工具以及人员，确保保养&维修服务可以顺利进行',
            '合理安排人员提升工作效率，避免出现技师怠工的现象',
            '与车主进行预约确认，减少失约车主',
          ]
        },
        {
          img:'carowner-phone3.png',
          title:'3、接待',
          list:[
            '引导车主停车、并热情问候车主',
            '确认车主到店目的、以及车主和车辆的信息',
            '安装车辆检查三件套保护车主车辆',
            '与车主一同进行环车检查',
            '提供保养 & 维修建议，向车主解释工作项目、预估费用和交车时间',
            '在此确认车主的所有需求、填写施工单',
          ]
        },
        {
          img:'carowner-phone4.png',
          title:'4、生产',
          list:[
            '根据技术水平和当天工作计划分配工单',
            '优先对待返修和等待车主',
            '利用可视化管理工作来跟踪技师的作业情况',
            '出现追加作业的情况，必须与车主进行事先确认来取得授权',
          ]
        },
        {
          img:'carowner-phone5.png',
          title:'5、交车',
          list:[
            '像车主进行问候',
            '展示旧件或指出修理的部位',
            '解释费用明细',
            '确认车况、交换车主物品',
            '开具发票、陪同车主付款',
            '感谢车主并进行送别',
          ]
        },
        {
          img:'carowner-phone6.png',
          title:'6、维修后跟踪服务',
          list:[
            '在72小时以内回访车主',
            '记录车主的反馈',
            '对车主的要求、以及不满意车主进行跟踪回访',
          ]
        },
      ]
    }
  }
  setStep(count) {
    const num = this.state.step + count
    if(num < 1 || num > 6) {
      return
    }
    this.setState({
      step:num
    })
  }
  componentDidMount() {
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
    const data = this.state.stepData[this.state.step-1]
    return (
      <div>
        <h3 className="title">
          诚信服务
        </h3>
        <div className="title-detail bg">
        自2003年成立至今，一汽丰田秉承“专业对车，诚信待人”的服务理念，从对车到对人开展双重关注，潜心打造“诚信服务”品牌。
          <p>
          专业是售后服务的基础，诚意是完善售后服务需秉承的态度。
          </p>
        </div>
        <h3 className="title">
        标准服务流程6步法
        </h3>
        <div className="title-detail">
          <p>目前一汽丰田已形成了快速保养、快速钣喷、定保通、24小时救援、身边杂志等多项特色服务项目，及上门服务、经销店开放日、服务节、爱车养护课堂、服务嘉年华、卡罗拉DAY等多种特色服务营销活动。</p>
          <p>
          并以T-TEP技术人材培育体系等一项又一项举措，给车辆提供专业高品质服务的同时，也让客户充分感受到温暖与关怀。
          </p>
        </div>
        {
        <div className="baoyang-text">
          <div className="top">
            <h4>{data.title}</h4>
            <img src={require(`../../../../imgs/${data.img}`)} alt=""/>
          </div>
          <ul>
            {
              data.list.map((v,i) => {
                return (
                  <li key={i}>{v}</li>
                )
              })
            }
          </ul>
        </div>
        }
        <div className="btn">
          <span onClick={() => this.setStep(-1)}>
            <img src={require('../../../../imgs/carowner-lbtn.png')} alt=""/>
          </span>
          <span onClick={() => this.setStep(1)}>
            <img src={require('../../../../imgs/carowner-rbtn.png')} alt=""/>
          </span>
        </div>
      </div>
    );
  }
}

export default Tabone;
