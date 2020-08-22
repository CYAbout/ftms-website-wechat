import React, { Component } from 'react';
import { Tabs, Icon } from 'antd-mobile';
import GetMore from '../../../components/getmore'
import { brandApi } from '../api'
import './index.less'
import Swiper from 'react-id-swiper'
import { user } from '../../../redux/user.redux';
import 'react-id-swiper/src/styles/css/swiper.css';

class Introduce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showLoading: false,
      data: [],
      pageSize: 500,
      beginPage: 1,
      loop: true,
      params: {
        // direction: 'vertical',
        // mousewheel: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      },
    }
    this.getMoreData = this.getMoreData.bind(this)
  }
  componentDidMount() {
    this.companyHistory()
  }
  companyHistory() {
    const opt = {
      beginPage: this.state.beginPage,
      pageSize: this.state.pageSize,
    }
    brandApi.companyHistory(opt)
      .then(res => {
        if (res && res.code == 0) {
          if (res.data.dataList) {
            const newData = res.data.dataList.map((v, i) => {
              const top = v.detailList.filter((z, y) => z.isTop == '1')
              const bottom = v.detailList.filter((z, y) => z.isTop == '0')
              const newArr = [...top, ...bottom]
              return { ...v, detailList: newArr }
            })
            this.setState({
              data: [...this.state.data, ...newData],
              beginPage: this.state.beginPage + 1,
              hasNextPage: res.data.hasNextPage,
            })
          }
          this.setState({
            showLoading: false
          })
        }
      })
  }
  getMoreData() {
    // 请求
    this.setState({
      showLoading: true
    })
    this.companyHistory()
  }

  render() {
    const tabs = [
      { title: '企业概况' },
      { title: '企业风采' },
      { title: '品牌历程' },
    ];
    document.title="企业介绍";
    return (
      <div className='profile'>
        <div className="title-img">
          <img src={require('../../../imgs/qiyejieshao-banner.png')} alt="" />
          {/*<span style={{ color: '#fff' }}>企业介绍</span> */}
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
          // onTabClick={(v,i) => this.setState({isShowTwo:false,})}
          >
            <div>
              <h3 className="title">
                企业概要
              <p>Company brief</p>
              </h3>
              <div className="img-box">
                <img src={require('../../../imgs/qiyejieshao-pic-1.png')} alt="" />
              </div>
              <ul className="car-canshu">
                <li>
                  <span>中文全称</span>
                  <span>一汽丰田汽车销售有限公司</span>
                </li>
                <li>
                  <span>英文全称</span>
                  <span>FAW TOYOTA MOTOR SALES CO., LTD.</span>
                </li>
                <li>
                  <span>简称</span>
                  <span>FTMS</span>
                </li>
                <li>
                  <span>成立时间</span>
                  <span>2003年9月25日</span>
                </li>
                <li>
                  <span>注册资金</span>
                  <span>2500万美元</span>
                </li>
                <li>
                  <span>公司性质</span>
                  <span>中外合资经营企业</span>
                </li>
                <li>
                  <span>主要业务</span>
                  <span>一汽丰田旗下的国产丰田品牌汽车的销售售后服务和市场管理</span>
                </li>
                <li>
                  <span>所在地</span>
                  <span>北京市朝阳区</span>
                </li>
              </ul>
              <ul className="table-1">
                <li className='title'>
                  <span>出资者</span>
                  <span>出资额($)</span>
                  <span>占注册资</span>
                </li>
                <li>
                  <span>第一汽车股份有限公司(FAW)</span>
                  <span>9.5Mil</span>
                  <span>38%</span>
                </li>
                <li>
                  <span>丰田汽车公司(TMC)</span>
                  <span>8Mil</span>
                  <span>32%</span>
                </li>
                <li>
                  <span>天津一汽丰田(TFTM)</span>
                  <span>6.5Mil</span>
                  <span>25%</span>
                </li>
                <li>
                  <span>四川一汽丰田(SFTM)</span>
                  <span>1.25Mil</span>
                  <span>5%</span>
                </li>
                <li>
                  <span>合计</span>
                  <span>25Mil</span>
                  <span>100%</span>
                </li>
              </ul>
              <div className="qitelinian">
                <h3 className="title mlr-0">
                  企业理念
                <p>Business ethic</p>
                </h3>
                <Swiper {...this.state.params}>
                  <div className="shiming">
                    <h4>企业使命</h4>
                    <div>让更多客户体验拥有汽车的喜悦，为推动汽车社会的发展贡献力量。</div>
                  </div>
                  <div className="shiming">
                    <h4>企业精神</h4>
                    <div>尊重、挑战、速度、诚信</div>
                  </div>
                  <div className="shiming">
                    <h4>企业行动指南</h4>
                    <div>See The Dealers（倾听）</div>
                    <div>Plan Ahead（预案）</div>
                    <div>Keep Learning（学习）</div>
                  </div>
                </Swiper>

              </div>
              <h3 className="title">
                经营理念
              <p>Management concepts</p>
              </h3>
              <div className="img-box">
                <img src={require('../../../imgs/qiyejieshao-jingying.png')} alt="" />
              </div>
              <div className="last">
                <h4>客户第一、经销店第二、厂家第三</h4>
                <div>
                  一汽丰田汽车销售有限公司以“客户第一”为经营理念，
                  在销售及售后服务等方面为客户提供便捷、优质的服务，让更多客户体验拥有汽车的喜悦，是我们执着如一的追求。
              </div>
                <p>
                  QDR=品质（Quality）、耐久性（Durability）、可靠性（Reliability）
              </p>
              </div>
            </div>
            <div>
              <ul className="fengc">
                <li className='item-wz'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-1.jpeg')} alt="" />
                  </div>
                  <h4 className="title">
                    整合营销 全面精彩
                </h4>
                  <p>
                    一汽丰田坚持企业的崇高使命，以“客户第一”为经营理念，始终如一为客户提供更便捷、更优质的服务，
                    让更多客户体验拥有汽车的快乐，为推动汽车社会的发展贡献力量。
                </p>
                </li>
                <li className='item-wz'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-2.jpeg')} alt="" />
                  </div>
                  <h4 className="title">
                    魅力商品 惊喜体验
                </h4>
                  <p>
                    一汽丰田近几年产品体系年轻化，以年轻人对汽车外观、内部性能以及社交精神层面的高需求为导向，
                    打造全新的人·车·生活全程呵护体系，更加注重体验感、价值感。
                </p>
                </li>
                <li className='item-wz'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-3.png')} alt="" />
                  </div>
                  <h4 className="title">
                    社会公益活动
                </h4>
                  <p>
                    一汽丰田汽车销售有限公司秉持“安全、环保、育人”理念，积极开展社会公益活动，践行企业社会责任。
                    2017年9月5日，一汽丰田援建的第十八所希望学校正式启用，标志着这个凝聚了爱与希望的公益项目取得了阶段性成果。
                </p>
                </li>
              </ul>
              {/* <ul className="other-fengc">
                <li className='item-wz-5'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-4.png')} alt="" />
                  </div>
                  <h4 className="title">
                    创意恒久 沟通无限
                </h4>
                  <p>
                    一汽丰田汽车销售有限公司通过开展各项活动，积极与客户、政府、媒体沟通交流，为让客户真正体验到安心、舒适的汽车生活而不断努力。
                </p>
                </li>
                <li className='item-wz-5'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-5.png')} alt="" />
                  </div>
                  <h4 className="title">
                    培育人才
                </h4>
                  <p>
                    一汽丰田汽车销售有限公司通过开展各项活动，积极与客户、政府媒体沟通交流，为让客户真正体验到安心、舒适的汽车生活而不断努力。
                </p>
                </li>
                <li className='item-wz-5'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-6.png')} alt="" />
                  </div>
                  <h4 className="title">
                    团队优先
                </h4>
                  <p>
                    一汽丰田汽车销售有限公司在切实保障员工权益、丰富员工生活的同时不忘增强员工的团队精神、协作精神、助人精神及社会责任感，使其真正领会企业的真谛。
                </p>
                </li>
                <li className='item-wz-5'>
                  <div className="img-box">
                    <img src={require('../../../imgs/aa-7.png')} alt="" />
                  </div>
                  <h4 className="title">
                    工会介绍
                </h4>
                  <p>
                    一汽丰田汽车销售有限公司重视人才培养，除统一组织新入职员工培训、升职人员培训、能力的同时，不忘增强员工的团队凝聚力，使其真正体会企业文化的内涵。
                </p>
                </li>

              </ul> */}
            </div>
            <div>
              {this.state.data.length && <ul className="licheng">
                {
                  this.state.data.map((v, i) => {
                    return (
                      <li className="bg-item-wz" key={i}>
                        <div className="time-title">
                          {v.year}
                        </div>
                        {
                          v.detailList.map((z, x) => {
                            if (z.isTop == 1) {
                              return (
                                <h4 key={x}>
                                  {z.content}
                                </h4>
                              )
                            } else {
                              return (
                                <p key={x} className='item'>
                                  {z.content}
                                </p>
                              )
                            }
                          })
                        }
                      </li>
                    )
                  })
                }
              </ul>}
              {!!this.state.data.length && <GetMore
                showLoading={this.state.showLoading}
                noMore={!this.state.hasNextPage}
                getMoreData={this.getMoreData}
              />}
              {
                !this.state.data.length && <div className='no-data'>暂无数据</div>
              }
            </div>
          </Tabs>
        </div>
        <div className="join-us" onClick={() => window.location = 'http://www.hotjob.cn/wt/FTMS/web/index?brandCode=null'}>
          <div className="img">
            <img src={require('../../../imgs/join-us-2.png')} alt="" />
          </div>
          <div className="txt">
            加入我们
          </div>
        </div>
      </div>
    );
  }
}

export default Introduce;
