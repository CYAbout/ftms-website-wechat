import React, { Component } from 'react';
import {carOwnerApi} from '../../../carowner/api'
import {Modal,Tabs} from 'antd-mobile'
import {getParamsObj} from '../../../../utils/util'
import '../index.less'

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
class GoodsType extends Component {
  constructor(props) {
    super(props)
    this.state = {
      goodsTypeList: [],
      titleName: getParamsObj(props.location.search).title,
      showGoodsModal:false,
      goodsDetail:{}
    }
  }
  componentDidMount() {
    this.lookGoodsTwo()
  }
  showGoodsModal =  (e,val) => {
    console.log(val)
    e.preventDefault(); 
    carOwnerApi.getDetail(val.id)
      .then(res => {
        if(res && res.code == 0) {
          this.setState({
            showGoodsModal:true,
            goodsDetail:res.data[0]
          })
        }
      })
    window.myModal()
  }
  onCloseGoodsModal =  () => {
    this.setState({
      showGoodsModal: false,
    });
    window.myModal1()
  }
  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  }
  lookGoodsTwo() {
    const id  = this.props.match.params.id
    if(!id) {
      return
    }
    carOwnerApi.getList(id)
      .then(res => {
        if(res && res.code == 0) {
          this.setState({
            // isShowTwo:true,
            goodsTypeList:res.data,
            // titleName: v.title
          })
        }
      })
  }
  setIndex(v,i) {
    this.props.history.push(`/carowner/part?tabindex=${i}`)
  }
  render() {
    console.log(this.state.titleName,getParamsObj(this.props.location.search))
    const tabs = [
      { title: '品质保障' },
      { title: '产品介绍' },
      { title: '防伪查询' },
      { title: '保养计划' },
    ];
    return (
      <div className="part">
      <div className="title-img">
            <img src={require('../../../../imgs/chunpailj-banner.jpg')} alt=""/>
            {/* <span>纯牌零件</span> */}
          </div>
        <div className="just-my-tabs">
          <Tabs
            tabs={tabs}
            page={1}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
            onTabClick={(v,i) => this.setIndex(v,i)}
          />
        </div>
      <div className='goods-type box-big'>
        <div className="goods-type-list-two">
          {this.state.titleName && <h3 className='title'>{this.state.titleName !== 'null' ? this.state.titleName : ''}</h3>}
          {!this.state.goodsTypeList.length && 
            <div style={{textAlign:'center',padding:'20px'}}>暂无数据</div>
          }
          <ul className="goods-type-List">
          {
            this.state.goodsTypeList.map((v,i) => {
              return (
                <li key={v.id} onClick={(e) => this.showGoodsModal(e,v)}>
                <div className="goods-img">
                  <img src={v.main_pic} alt=""/>
                </div>
                <div className='type-name'>
                <img src={require(`../../../../imgs/lable-lingjian.png`)} alt=""/>
                  <span>{v.name}</span>
                </div>
              </li>
              )
            })
          }
          </ul>
          <Modal
            className='my-modal goods-modal-box'
            visible={this.state.showGoodsModal}
            transparent
            maskClosable={false}
            wrapProps={{ onTouchStart: this.onWrapTouchStart }}
          >
            <div className="my-modal-big">
            <div
              className="close"
              onClick={() => this.onCloseGoodsModal()}
            />
            {this.state.goodsDetail.id && <div className="my-modal-box">
              
              <div className="modal-img">
                <img src={this.state.goodsDetail.main_pic} alt=""/>
              </div>
              <div className="img-list">
              {
                this.state.goodsDetail.extra_pic.filter(v => v).map((v,i) => {
                  return (
                    <div className="img-box" key={i}>
                      <img src={v} alt=""/>
                    </div>
                  )
                })
              }
                {/* <div className="img-box">
                <img src={require(`../../../imgs/${this.state.goodsDetail.img}`)} alt=""/>
                </div> */}
              </div>
              <div className="title">
                {this.state.goodsDetail.name}
              </div>
              <div className="detail" dangerouslySetInnerHTML={{__html:this.state.goodsDetail.description}} />
              {/* <ul className='detail-list'>
              {
                this.state.goodsDetail.list.map((v,i) => {
                  return (
                    <li key={i}>
                    {v}
                    </li>
                  )
                })
              }
              </ul> */}
            </div>}
            </div>
          </Modal>
        </div>
      </div>
      </div>
    );
  }
}

export default GoodsType;
