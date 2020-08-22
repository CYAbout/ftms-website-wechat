import React, { Component } from 'react';

import './index.less'
class Zhaomu extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showPic: '1',
      xpos: 0,
      xposStyle: {},
    }
  }
  componentDidMount() {
    document.title = '经销商招募';
  }

  changeXpos(val) {
    let pos = this.state.xpos;
    pos = (pos * 10 + val * 23) / 10;
    if (pos <= 0 && pos >= -6.9) {
      this.setState({
        xpos: pos,
        xposStyle: {
          'transform': `translateX(${pos}rem)`
        }
      });
    }
  }
  render() {
    return (
      <div className='zhaomu'>
        <div className="title-img">
          <img src={require('../../../imgs/zhaomu-banner.png')} alt="" />
          {/* <span>经销商招募</span> */}
        </div>
        <div className="c">
          <h3 className="title">
            <div>一汽丰田汽车销售有限公司</div>
            <div>经销商招募函（4S店）</div>
          </h3>
          <div className="t">
            <p>一汽丰田汽车销售有限公司成立于2003年，是由中国第一汽车股份有限公司和丰田汽车公司等公司合资组建的汽车销售公司。</p>
            <p>一汽丰田汽车销售有限公司目前经营销售以下系列产品：CROWN皇冠、AVALON亚洲龙、COROLLA卡罗拉、
COROLLA卡罗拉（双擎）、COROLLA卡罗拉（双擎E+）、VIOS威驰、威驰FS、PRADO普拉多、RAV4荣放、
IZOA奕泽、COASTER柯斯达以及进口的PREVIA普瑞维亚、HIACE。</p>
            <p>一汽丰田汽车销售有限公司秉承客户至上、客户利益最大化的汽车价值观，将继续以“专业对车、诚意待人”的服务理念，为消费者提供完善、满意、真诚的购车体验和服务体验。</p>
          </div>
          <div className="tk">
            <h3 className="title-l">
              一、总原则
            </h3>
            <p>1、申请人自愿接受一汽丰田汽车销售有限公司按标准对其进行的评审、考核及最终认定结果</p>
            <p>2、申请人被认定后自愿遵守一汽丰田汽车销售有限公司对其进行的各项指导、管理和违约处罚</p>
            <p>3、申请及面试过程中涉及的一切费用由申请人自理，一汽丰田汽车销售有限公司不予承担</p>
          </div>
          <div className="tk">
            <h3 className="title-l">
              二、申请经销商基本条件
            </h3>
            <p>1、申请人需诚信守法，产权清晰，无违法记录</p>
            <p>2、申请人愿意成立独立的法人单位，仅用于从事一汽丰田汽车销售有限公司项目经营，注册资金不低于1000万元</p>
            <p>3、申请人需确保土地以建设符合一汽丰田汽车销售有限公司标准的4S店</p>
            <p>4、申请人需确保2000万元以上的流动资金和一定的融资能力</p>
            <p className='dian'>目前一汽丰田汽车销售有限公司有大、中、小以及MINI店共5种类型4S店标准，各类型具体标准如下：（一汽丰田汽车销售有限公司所提供的建店成本为预估值，仅供参考！）</p>
            <p className='dian'>申请人自愿遵守一汽丰田汽车销售有限公司的经销店设计标准建成4S店。</p>
          </div>
          <div className='xscroll'>
            <ul className="table-1" style={this.state.xposStyle}>
              <li>
                <div>店铺类型</div>
                <div>土地面积㎡</div>
                <div>面宽m</div>
                <div>注册资本</div>
                <div>流动资金</div>
                <div>建店成本预估（不含土地）</div>
              </li>
              <li>
                <div className='two'>
                  <div>大规模店</div>
                  <div>A</div>
                </div>
                <div>8,000~</div>
                <div>68~</div>
                <div>1,000万~</div>
                <div>2,000万~</div>
                <div>1,800~2,000万</div>
              </li>
              <li>
                <div className='two'>
                  <div>中规模店</div>
                  <div>B</div>
                </div>
                <div>7,000~</div>
                <div>64~</div>
                <div>1,000万~</div>
                <div>2,000万~</div>
                <div>1,200~1,400万</div>
              </li>
              <li>
                <div className='two'>
                  <div>小规模店</div>
                  <div>C</div>
                </div>
                <div>5,000~</div>
                <div>55~</div>
                <div>1,000万~</div>
                <div>2,000万~</div>
                <div>800~1,000万</div>
              </li>
              <li>
                <div className='two'>
                  <div>MINI店</div>
                  <div>D</div>
                </div>
                <div>2,400~</div>
                <div>40~</div>
                <div>1,000万~</div>
                <div>2,000万~</div>
                <div>500~600万</div>
              </li>
              <li>
                <div className='two'>
                  <div>MINI店</div>
                  <div>E</div>
                </div>
                <div>2,300~</div>
                <div>40~</div>
                <div>1,000万~</div>
                <div>2,000万~</div>
                <div>300~400万</div>
              </li>
            </ul>
          </div>
          <div className="btn-2">
            <span onClick={() => { this.changeXpos(1) }}>
              <img src={require('../../../imgs/zhaomu-l.png')} alt="" />
            </span>
            <span onClick={() => { this.changeXpos(-1) }}>
              <img src={require('../../../imgs/zhaomu-r.png')} alt="" />
            </span>
          </div>
          <h3 className="title-l">
            三、申请流程
          </h3>
          <div className="lc-swiper">
            {
              this.state.showPic === '1' &&
              <div className="img">
                <img src={require('../../../imgs/zhaomu-3.png')} alt="" />
              </div>
            }
            {
              this.state.showPic === '2' &&
              <div className="img">
                <img src={require('../../../imgs/zhaomu-2.png')} alt="" />
              </div>
            }

          </div>
          <div className="btn-2">
            <span onClick={() => this.setState({ showPic: '1' })}>
              <img src={require('../../../imgs/zhaomu-l.png')} alt="" />
            </span>
            <span onClick={() => this.setState({ showPic: '2' })}>
              <img src={require('../../../imgs/zhaomu-r.png')} alt="" />
            </span>
          </div>
          <p className='dian'> 申请人必须提供申请表格中涉及的所有资料。在评价过程中，如有需要我司会通知申请人补充申请表格以外的材料，请申请人理解和积极配合。</p>
          <h3 className="title-l">
            四、招商地区
          </h3>
          <p className='dian'>18年4S店招募工作暂时结束，待19年新招募工作开始后会公布招募地区等其他细节，现暂不受理相关申请。</p>
          <h3 className="title-l">
            五、申请材料邮寄地址
          </h3>
          <p>北京市朝阳区东三环中路1号环球金融中心西楼3F</p>
          <p>邮编：100020</p>
          <p>一汽丰田汽车销售有限公司 网络部 网络开发室</p>
          <p>电话：010-59529569/9351/9605</p>
          <p>Email：wangluokaifashi@ftms.com.cn</p>
          <h3 className="title-l">
            六、纪检部门联系方式
          </h3>
          <p>一汽丰田汽车销售有限公司纪委：</p>
          <p>电话：010-59529129</p>
          <p>Email：jc@ftms.com.cn</p>
          <br />
          <p>一汽集团纪委：</p>
          <p>电话：0431-85903333</p>
          <p>Email：xfs_jjw@faw.com.cn</p>
        </div>
      </div>
    );
  }
}

export default Zhaomu;
