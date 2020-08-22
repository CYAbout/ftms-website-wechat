import React, { Component } from 'react';
import { Tabs } from 'antd-mobile'

import Calculatorone from './module/calculatorone'
import Calculatortwo from './module/calculatortwo'
import Calculatorthree from './module/calculatorthree'
import Swiper from 'react-id-swiper'
import 'react-id-swiper/src/styles/css/swiper.css';
import { HTTPGet, HTTPPost } from '../../../utils/http';

import './index.less'

class Rent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rentdesc: {
        title: '惬享美好汽车生活，从易租贷开始',
        desc: '易租贷为一汽丰田首款品牌融资租赁产品，尊享私人定制，为您提供丰富灵活的用车金融方案，实现超低首付、超低月供，首付低至5%，让您无需一次性投入大笔资金，就可先享心仪座驾及配套服务。合同期末，根据您的需求，还可以自由选择续租、购买、返还或置换，让您轻松实现驾趣梦想，畅快出行。'
      },
      typeList: [],
      vehicleList: [],
      activity: {
        list: []
      }
    }
  }
  componentDidMount() {
    document.title = '融资租赁'
  }
  componentWillMount() {
    let url = '/api/getFinanceActiveList/1';
    HTTPGet(url).then((reuslt) => {
      if (reuslt && reuslt.code == 0) {
        let list = []
        let activity = {};
        let typeList = [];
        let vehicleList = [];
        for (let item of reuslt.data) {
          activity.title = item.activityTitle;
          list.push(item);
          typeList.push(item.activityCarModels);
          vehicleList.push({
            label: item.activityCarModels,
            value: item.cid
          });
        }
        activity.list = list;
        this.setState({
          activity: activity,
          typeList: typeList,
          vehicleList: vehicleList
        });
      }
    });
  }
  render() {
    const params = {
      slidesPerView: 2,
      spaceBetween: 30,
      slidesPerGroup: 2,
      // loop: true,
      loopFillGroupWithBlank: true,
      // pagination: {
      //   el: '.swiper-pagination',
      //   clickable: true,
      // },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      }
    };
    return (
      <div className='rent'>
        <div className="title-img">
          <img src={require('../../../imgs/zulin-banner.png')} alt="" />
          {/* <span style={{color:'#fff',left:'1rem'}}>融资租赁</span> */}
          <div className='tag-img'>
            <img src={require('../../../imgs/yizudai.png')} alt="" />
          </div>
        </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={[{ title: '易租贷产品介绍' }, { title: '易租贷计算器' },]}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} />}
          >
            <div className="jieshao-zulin box-big">
              <h3 className='box-big mt-8 mb-4'>{this.state.rentdesc.title}</h3>
              <p className='t box-big'>
                {this.state.rentdesc.desc}
                <br />
                <br />
                支持车型:{this.state.typeList.join('、')}{this.state.typeList.length > 0 ? '。' : ''}
              </p>
              <h3 className='box-big mt-8 mb-4 b'>{this.state.activity.title}</h3>
              <div className="swiper-box">
                {/* <ul>
                  {this.state.activity.list&&this.state.activity.list.map((inner,innerindex)=>{
                    return <li key={'typeinner-'+innerindex}>
                      <div>
                        <img src={inner.wapActivityPic} alt="" />
                        <div className='name'>{inner.activityCarModels}</div>
                        <div className='info'>{inner.activityContent[0]}</div>
                      </div>
                    </li>
                  })}
                </ul> */}
                {!!this.state.activity.list.length &&
                  <Swiper {...params}>
                    {
                      this.state.activity.list.map((inner, innerindex) => {
                        return (
                          <div
                            className="v-item"
                            key={innerindex}
                          >
                            <img src={inner.wapActivityPic} alt="" />
                            <div className='name'>{inner.activityCarModels}</div>
                            <div className='info'>{inner.activityContent[0]}</div>
                          </div>
                          // <li key={'typeinner-'+innerindex}>
                          //   <div>
                          //     <img src={inner.wapActivityPic} alt="" />
                          //     <div className='name'>{inner.activityCarModels}</div>
                          //     <div className='info'>{inner.activityContent[0]}</div>
                          //   </div>
                          // </li>
                        )
                      })
                    }
                  </Swiper>
                }
                {/* <Swiper>
                  <div>Slide 1</div>
                  <div>Slide 2</div>
                  <div>Slide 3</div>
                  <div>Slide 4</div>
                  <div>Slide 5</div>
                </Swiper> */}
              </div>
              <h3 className='box-big mt-8 mb-4 b'>流程</h3>
              <ul className="step">
                <li>
                  <img src={require('../../../imgs/zulin-1.png')} alt="" />
                  选择心仪车辆
              </li>
                <li>
                  <img src={require('../../../imgs/zulin-2.png')} alt="" />
                  商定易租贷方案
              </li>
                <li>
                  <img src={require('../../../imgs/zulin-3.png')} alt="" />
                  资料准备提交
              </li>
                <li>
                  <img src={require('../../../imgs/zulin-4.png')} alt="" />
                  审批
              </li>
                <li>
                  <img src={require('../../../imgs/zulin-5.png')} alt="" />
                  签约
              </li>
                <li>
                  <img src={require('../../../imgs/zulin-6.png')} alt="" />
                  提车
              </li>
              </ul>
              <div className="bg-text box-big">
                <span className='pt-5'>
                  <span className="t">
                    <span className="b">
                      无
                  </span>
                    压力
                </span>
                  <span className="s">
                    首付5%起，低月供
                </span>
                </span>
                <span className='pt-5'>
                  <span className="t">
                    <span className="b">
                      不
                  </span>
                    操心
                </span>
                  <span className="s">
                    购置税、保险精品、上牌
                  </span>
                  <span className="s mt-05">
                    站式打包服务
                  </span>
                </span>
                <span className='pt-2'>
                  <span className="t">
                    <span className="b">
                      够
                  </span>
                    灵活
                </span>
                  <span className="s">
                    合同期满，
                  </span>
                  <span className="s mt-05">
                    还换、买、续任你选
                  </span>
                </span>
                <span className='pt-2'>
                  <span className="t">
                    <span className="b">
                      巧
                  </span>
                    组合
                </span>
                  <span className="s">
                    金融方案灵活组合
                </span>
                </span>
              </div>
              <h3 className='box-big mt-8 mb-4 b'>易租贷产品计划</h3>
              <div className="wuyou">
                <h3 className="bl box-big">
                  首付无忧计划
                </h3>
                <div className="gray">
                  <span>首付5%</span>
                  <span>24期尾款60%<span className='brown'>/</span>36期尾款50%<span className='brown'>/</span>48期尾款30%</span>
                </div>
                <div className="img">
                  <span className='l b'>首付5%</span>
                  <span className='r'>尾款30%-60%</span>
                  <img src={require('../../../imgs/zulin-pic-3.png')} alt="" />
                </div>
              </div>
              <div className="wuyou">
                <h3 className="bl box-big">
                  月供无忧计划
                </h3>
                <div className="gray">
                  <span>24期首付40%,尾款60%</span>
                  <span>36期首付50%,尾款50%<span className='brown'>/</span>48期首付70%,尾款30%</span>
                </div>
                <div className="img">
                  <span className='l'>首付5%</span>
                  <span className='r'>尾款30%-60%</span>
                  <img src={require('../../../imgs/zulin-pic-2.png')} alt="" />
                </div>
              </div>
              <div className="wuyou-t">
                <h3 className="bl box-big">
                  随心专享计划
                </h3>
                <ul>
                  <li>
                    <span>首付</span>
                    <span>期限</span>
                    <span>尾款</span>
                  </li>
                  <li>
                    <span>5%-40%</span>
                    <span>24</span>
                    <span>60%</span>
                  </li>
                  <li>
                    <span>5%-50%</span>
                    <span>36</span>
                    <span>50%</span>
                  </li>
                  <li>
                    <span>5%-70%</span>
                    <span>48</span>
                    <span>30%</span>
                  </li>
                </ul>
                <div className='tishi box-big'>
                  <span>*</span>
                  <p>一汽丰田可能会根据市场情况对以上产品作出调整。</p>
                </div>
                <div className="hezuo">
                  <h3 className='box-big mt-8 mb-4 b'>合作伙伴</h3>
                  <div className="img box-big">
                    <img src={require('../../../imgs/zlfooter-1.png')} alt="" />
                  </div>
                  <div className="img box-big">
                    <img src={require('../../../imgs/zlfooter-2.png')} alt="" />
                  </div>
                  <div className="img box-big">
                    <img src={require('../../../imgs/zlfooter-3.png')} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="calculator pt-4 tab-content">
              <Tabs
                tabs={[{ title: '丰田租赁' }, { title: '一汽租赁' }, { title: '易鑫租赁' },]}
                animated={false}
                swipeable={false}
                useOnPan={false}
                renderTabBar={props => <Tabs.DefaultTabBar {...props} />}
              >
                <Calculatorone vehicleList={this.state.vehicleList} />
                <Calculatortwo vehicleList={this.state.vehicleList} />
                <Calculatorthree vehicleList={this.state.vehicleList} />
              </Tabs>
            </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Rent;
