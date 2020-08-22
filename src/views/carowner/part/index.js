import React, { Component } from 'react';
import { Tabs,Button,Modal } from 'antd-mobile';
import {MyCheckBox,MyInput, MyRadio,MySwitch} from '../../../components/dataview'
import moment from 'moment'
import { comApi } from '../../../components/api';
import MyVideo from '../../../components/common/myvideo'
import Baoyang from '../lobby/module/baoyang'
import {getParamsObj} from '../../../utils/util'
import {carOwnerApi} from '../api'
import './index.less'
const closest = (el, selector) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class Part extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabIndex: +getParamsObj(props.location.search).tabindex || 0,
      lingjianType: [],
      lingjianValue:[],
      lingjianValueTxt:'',
      page: 1,
      row: 2,
      videoUrl: [],
      goodsType:[],
      goodsTypeList:[
      ],
      newActivity: [],
      sum: 0,
      ljTitleSave:'',
      goodsDetail:{},
      isShowTwo: false,
      showGoodsModal: false,
      data1: [{value:'1',label:'卡罗拉1'},{value:'vdv',label:'卡罗拉2'},{value:'3',label:'卡罗拉3'}],
      data2: [{value:'1',label:'23ef33'},{value:'vjyuu',label:'vjyuu'},{value:'3',label:'thr'}],
      data3: [{value:'1',label:'f34f43'},{value:'76ju',label:'76ju'},{value:'3',label:'thr'}],
      data4: [{value:'1',label:'f34f43'},{value:'76ju',label:'76ju'},{value:'3',label:'thr'}],
      allChecked:true
    }
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }
  componentDidMount() {
    this.getActivities()
    this.getVideo()
    this.getFirstClassify()

    // 官微的部分选项卡要求注释隐藏 而且有单独页面跳转 为了不单独将选项卡拆成但页面和配置路由 减少工作量 所以通过url带tabindex来判断 跳转的是那一选项卡
    let params = getParamsObj();
    this.setState({
      tabIndex: Number(params.tabIndex || params.tabindex)? Number(params.tabIndex || params.tabindex): 0
    })

    document.title = '纯牌零件'
  }

  componentWillReceiveProps(nextProps,nextState) {
    if(this.props.location.search !== nextProps.location.search) {
      this.setState({
        tabIndex:+getParamsObj().tabindex
      })
    }
  }
  // setIndex = (index) => {
  //   this.setState({
  //     fuwuIndex:index,
  //   })
  // }
  onChangeHandle(type,val) {
    console.log(type,val)
    if(type === 'allChecked') {
      if(!val) {return}
      this.setState({
        showCheckoutResult:'yes',
        lingjianValue: [],
        lingjianType:this.state.lingjianType.map(v => ({...v,checked:false}))
      })
    }
    if(type === 'lingjianValue') {
      this.setState({
        allChecked: val.length > 0 ? false : true,
        showCheckoutResult:'yes',
      })
    }
    this.setState({
      [type]: val
    },() => {
      if(type === 'lingjianValue' || type === 'allChecked') {
        this.getSecondClassify()
      }
    })
  }
  // lookGoodsTwo(v) {
  //   carOwnerApi.getList(v.id)
  //     .then(res => {
  //       if(res && res.code == 0) {
  //         this.setState({
  //           isShowTwo:true,
  //           goodsTypeList:res.data,
  //           titleName: v.title
  //         })
  //       }
  //     })
  // }
  // showGoodsModal =  (e,val) => {
  //   console.log(val)
  //   e.preventDefault(); 
  //   carOwnerApi.getDetail(val.id)
  //     .then(res => {
  //       if(res && res.code == 0) {
  //         this.setState({
  //           showGoodsModal:true,
  //           goodsDetail:res.data[0]
  //         })
  //       }
  //     })
  // }
  // onCloseGoodsModal =  () => {
  //   this.setState({
  //     showGoodsModal: false,
  //   });
  // }
  // onWrapTouchStart = (e) => {
  //   // fix touch to scroll background page on iOS
  //   if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
  //     return;
  //   }
  //   const pNode = closest(e.target, '.am-modal-content');
  //   if (!pNode) {
  //     e.preventDefault();
  //   }
  // }
  getFirstClassify() {
    carOwnerApi.getFirstClassify()
      .then(res => {
        if(res && res.code == 0) {
          this.setState({
            lingjianType:res.data.map(v => ({value:v.id,label:v.title})),
            // lingjianValue:res.data.map(v => v.id),
            // allChecked:true
          },() => this.getSecondClassify())
        }
      })
  }
  getSecondClassify(type) {
    this.setState({
      ljTitleSave:this.state.ljTitle
    })
    const opt = {
      id:this.state.lingjianValue,
    }
    console.log(opt)
    if(type === 'search') {
      opt.title = this.state.ljTitle
      opt.id = ''
    }
    console.log(opt)
    carOwnerApi.getSecondClassify(opt)
      .then(res => {
        if(res && res.code == 0) {
          this.setState({
            goodsType: res.data.list.map(v => ({img:v.picture,title:v.title,id:v.id})),
            sum: res.data.sum
          })
        }
      })
  }
  getActivities() {
    const opt = {
      page: this.state.page,
      row: this.state.row,
      type: 'recent',
      cate:'component'
    }
    carOwnerApi.getActivities(opt)
      .then(res => {
        if(res && res.code == 0) {
          this.setState({
            newActivity:res.data.list || [],
            page: this.state.page + 1
          })
        }
      })
  }
  getVideo() {
    comApi.getVideoUrl('SecurityCheck')
    .then(res => {
      if(res && res.code == '0') {
        this.setState({
          videoUrl:res.data
        })
      }
    })
  }
  render() {
    //  || !this.state.goodsType.length
    // if(!this.state.lingjianType.length) {
    //   return null
    // }
    const tabs = [
      { title: '品质保障' },
      { title: '产品介绍' },
      { title: '防伪查询' },
      { title: '保养计划' },
    ];
    return (
      <div className='part'>
        <div className="title-img-b">
            <img src={require('../../../imgs/chunpailj-banner.jpg')} alt=""/>
            {/* <span>纯牌零件</span> */}
          </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            page={this.state.tabIndex}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
            // onTabClick={(v,i) => this.setState({isShowTwo:false,})}
            onChange={(v,i) => {
               if(i == 1) {
                this.props.history.push('/carowner/part?tabindex=1')
               }
              this.props.history.push(`/carowner/part?tabindex=${i}`)
              this.setState({tabIndex:i})
            }}
          >

          <div className="one">
            <div className="item">
              <h3>安心品质</h3>
              <p>
              纯牌零件满足丰田全球标准，从设计开发到生产都经过了严格的检验。
              针对丰田车辆设计，使得每个零部件和车辆完美结合，使用安心。纯牌零件享有1年或2万公里保修期限。
              </p>
              <div className="img-box">
                <img src={require('../../../imgs/cp-pic-1.png')} alt=""/>
              </div>
              <div className="img-box">
                <img src={require('../../../imgs/cp-pic-2.png')} alt=""/>
              </div>
            </div>
            <div className="item item-2">
              <h3>物流品质</h3>
              <p>
              零件的仓储到物流，我们按照丰田品质标准，及时满足客户需求。从零件供给角度，全国范围内，一汽丰田目前拥有：
              </p>
              <ul className="icon-box">
                <li>
                  <img src={require('../../../imgs/cp-icon-1.png')} alt=""/>
                  <span>6个大型零件仓库</span>
                </li>
                <li>
                  <img src={require('../../../imgs/cp-icon-2.png')} alt=""/>
                  <span>16万平方米的仓储面积</span>
                </li>
                <li>
                  <img src={require('../../../imgs/cp-icon-3.png')} alt=""/>
                  <span>22万的货位数</span>
                </li>
                <li>
                  <img src={require('../../../imgs/cp-icon-4.png')} alt=""/>
                  <span>24小时不间断物流</span>
                </li>
              </ul>
            </div>
            {/* <div className="item"> */}
              {/* <h3>纯·真之旅</h3>
              {
                 this.state.newActivity&&!!this.state.newActivity.length && this.state.newActivity.map((v,i) => {
                  return (
                    <div className="wenzhang" key={i} onClick={() => this.props.history.push(`/brand/activity/detail/${v.id}`)}>
                      <div className="img-box">
                        <img src={v.thumb} alt=""/>
                      </div>
                      <h4>{v.title}</h4>
                      <div className="time">
                      {v.create_time}
                      </div>
                      <p>
                        {v.desc}
                      </p>
                    </div>
                  )
                })
              } */}
              
              {/* <div className="wenzhang">
                <div className="img-box">
                  <img src={require('../../../imgs/cp-pic-4.png')} alt=""/>
                </div>
                <h4>一汽丰田纯牌零件“纯真之旅活动在渤旅活动在渤旅活动在渤旅活动在渤海之滨”</h4>
                <div className="time">
                  2018-12-12
                </div>
                <p>
                纯牌零件满足全球标准，从设计到开发，纯牌零件满足全球标准，从设计到开发纯牌零件满足全球标准，从设计到开发
                纯牌零件满足全球标准，从设计到开发，纯牌零件满足全球标准，从设计到开发，纯牌零件满足全球标准，从设计
                </p>
              </div> */}
            {/* </div> */}
            {/* <div className="my-btn mb-8">
              <Button inline onClick={() => this.props.history.push('/brand/activity')} > &nbsp;&nbsp;&nbsp;参与更多活动&nbsp;&nbsp;&nbsp;</Button>
            </div> */}
          </div>
          <div className="two">
            <div className="search-box">
              <div className='all-checked'>
                <MySwitch
                  value={this.state.allChecked}
                  label='全部'
                  onChange={(v) => this.onChangeHandle('allChecked',!this.state.allChecked)}
                />
                <MyCheckBox
                  value={this.state.lingjianValue}
                  data={this.state.lingjianType}
                  isShowAll={false}
                  onChange={(v) => this.onChangeHandle('lingjianValue',v)}
                />
              </div>
              <div className="search-label">
                <MyInput
                  value={this.state.ljTitle}
                  placeholder='请输入部件名称'
                  onChange={(v) => this.onChangeHandle('ljTitle', v)}
                />
                <div className="search-img" onClick={() => this.getSecondClassify('search')}>
                  <img src={require('../../../imgs/search-0.png')} alt=""/>
                </div>
              </div>
              {
                (!!this.state.ljTitleSave || this.state.showCheckoutResult) ?
                 <div className="finded">
                共找到<span>{this.state.sum}</span>条<span>{this.state.ljTitleSave}</span>相关信息结果
              </div> : null}
              <ul className="goods-type-List">
              {
                !!this.state.goodsType.length && this.state.goodsType.map((v,i) => {
                  return (
                    <li key={i} onClick={() => this.props.history.push(`/carowner/goodstype/${v.id}?title=${v.title}`)}>
                    <div className="goods-img">
                      <img src={v.img} alt=""/>
                    </div>
                    <div className='type-name'>
                      【{v.title}】
                    </div>
                  </li>
                  )
                })
              }
              </ul>
            </div>
          {
            // !this.state.isShowTwo ?
            
            // :
            // <div className="goods-type-list-two">
            //   <h3 className='title'>{this.state.titleName}</h3>
            //   {!this.state.goodsTypeList.length && 
            //     <div style={{textAlign:'center',padding:'20px'}}>暂无数据</div>
            //   }
            //   <ul className="goods-type-List">
            //   {
            //     this.state.goodsTypeList.map((v,i) => {
            //       return (
            //         <li key={v.id} onClick={(e) => this.showGoodsModal(e,v)}>
            //         <div className="goods-img">
            //           <img src={v.main_pic} alt=""/>
            //         </div>
            //         <div className='type-name'>
            //         <img src={require(`../../../imgs/lable-lingjian.png`)} alt=""/>
            //           <span>{v.name}</span>
            //         </div>
            //       </li>
            //       )
            //     })
            //   }
            //   </ul>
            //   <Modal
            //     className='my-modal goods-modal-box'
            //     visible={this.state.showGoodsModal}
            //     transparent
            //     maskClosable={false}
            //     wrapProps={{ onTouchStart: this.onWrapTouchStart }}
            //   >
            //     <div className="my-modal-big">
            //     <div
            //       className="close"
            //       onClick={() => this.onCloseGoodsModal()}
            //     />
            //     {this.state.goodsDetail.id && <div className="my-modal-box">
                  
            //       <div className="modal-img">
            //         <img src={this.state.goodsDetail.main_pic} alt=""/>
            //       </div>
            //       <div className="img-list">
            //       {
            //         this.state.goodsDetail.extra_pic.map((v,i) => {
            //           return (
            //             <div className="img-box" key={i}>
            //               <img src={v} alt=""/>
            //             </div>
            //           )
            //         })
            //       }
            //         {/* <div className="img-box">
            //         <img src={require(`../../../imgs/${this.state.goodsDetail.img}`)} alt=""/>
            //         </div> */}
            //       </div>
            //       <div className="title">
            //         {this.state.goodsDetail.name}
            //       </div>
            //       <div className="detail" dangerouslySetInnerHTML={{__html:this.state.goodsDetail.description}} />
            //       {/* <ul className='detail-list'>
            //       {
            //         this.state.goodsDetail.list.map((v,i) => {
            //           return (
            //             <li key={i}>
            //             {v}
            //             </li>
            //           )
            //         })
            //       }
            //       </ul> */}
            //     </div>}
            //     </div>
            //   </Modal>
            // </div>
          }
          </div>
          <div className="three">
            <h3 className="title">
              真伪对比
            </h3>
            {/* <div className="video-box">
              <span className="paly-btn"></span>
              <img src={require('../../../imgs/zhenwei-videobg.png')} alt=""/>
            </div> */}
            {+this.state.tabIndex === 2 && <ul className="video-list">
              {
                this.state.videoUrl.map((v,i) => {
                  return (
                  <li key={i}>
                    <div className="video-box-play">
                      <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                    </div>
                    {/* <p>{v.videoName}</p> */}
                  </li>
                  )
                })
              }
              </ul>}
            <h3 className="title">
              防伪查询
            </h3>
            <div className="fangweichaxun">
              <p>丰田车保有量巨大，市场上也充斥着各种零件，</p>
              <p>稂莠不齐，严重危害了消费者利益。</p>
              <p>包括国内某电商销售的丰田纯牌零件也极有可能是冒假零件。</p>
              <p>那么问题来了，车主如何鉴别真假纯牌零件？</p>
            </div>
            <div className="biaoqianjieshao">
              <h4 className="num">01</h4>
              <div className="fangweichaxun">
                <p>16年10月开始，</p>
                <p>一汽丰田渠道内纯牌零件会陆续粘贴防伪标签。</p>
                <p>（具体图例参考右图）</p>
              </div>
              <div className="img-box">
                <img src={require('../../../imgs/zhenwei-pic-1.png')} alt=""/>
              </div>
              <h4 className="num">02</h4>
              <div className="fangweichaxun">
                <p>找到防伪标签，右侧有个灰色的图层，轻轻刮开图层。</p>
                <p>使用智能手机中的扫一扫功能，即可知道你购买的零件的真伪。</p>
                <p>就是这样简单有效。</p>
              </div>
              <div className="img-box">
                <img src={require('../../../imgs/zhenwei-pic-2.png')} alt=""/>
              </div>
            </div>
            <div className="chunzhen">
            <img src={require('../../../imgs/zhenwei-pic-3.png')} alt=""/>
            </div>
          </div>
          <div className="four">
            <Baoyang onChangeHandle={this.onChangeHandle} {...this.state}  />
          </div>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Part;
