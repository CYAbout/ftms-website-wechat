import React, { Component } from 'react';
import { Tabs } from 'antd-mobile';
import Tabone from './modules/tabone';
import Tabtwo from './modules/tabtwo';
import Tabthree from './modules/tabthree';
import Tabfour from './modules/tabfour';
import Tabfive from './modules/tabfive';
import Tabdingbaotong_wx from './modules/tabdingbaotong_wx';
import TabthreeShenbian from './modules/tabthreeShenbian';
import TabthreeAiche from './modules/tabthreeAiche';
import { getParamsObj } from '../../../utils/util'
import { carOwnerApi } from '../api'
import './index.less'

class Introduce extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // tabIndex: +getParamsObj(props.location.search).tabs,
      oneIndex: +getParamsObj().oneindex || 0,
      twoIndex: +getParamsObj().twoindex || 0
      // carType: []
    }
  }
  componentDidMount() {

    let params = getParamsObj();
    // 官微的部分选项卡要求注释隐藏 而且有单独页面跳转 为了不单独将选项卡拆成但页面和配置路由 减少工作量 所以通过url带oneindex来判断 跳转的是那一选项卡
    this.setState({
      oneIndex: Number(params.oneindex)? Number(params.oneindex): 0
    })
  }
  componentWillReceiveProps(nextProps, nextState) {
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        oneIndex: +getParamsObj().oneindex
      })
    }
    if (this.props.location.search !== nextProps.location.search) {
      this.setState({
        twoIndex: +getParamsObj().twoindex
      })
    }
  }
  // getTabIndex(v,i) {
  //   const tabIndex = getParamsObj().tabsIndex ? +getParamsObj().tabsIndex : 0
  //   if (tabIndex) {
  //     this.setState({
  //       tabIndex: 1,
  //       subTabIndex: tabIndex
  //     })
  //   }else {
  //     this.setState({
  //       tabIndex: 1,
  //       subTabIndex: i
  //     })
  //   }
  // }
  setOneIndex(v, i) {
    this.props.history.push(`/carowner/introduce?oneindex=${i}`)
    // this.setState({
    //   oneIndex: i,
    // })
  }
  setTwoIndex(v, i) {
    switch(i) {
      case 0:
        document.title = '延保服务';
        break;
      case 1:
        document.title = '延保计算器';
        break;
      // case 2:
      //   document.title = '延保计算器';
      //   break;
    }
    this.props.history.push(`/carowner/introduce?oneindex=1&twoindex=${i}`)
    // this.setState({
    //   twoIndex:i
    // })
  }
  componentDidMount() {
    // this.getCarType()
    // this.getTabIndex();
  }
  // getCarType() {
  //   if(!!this.state.carType.length) {
  //     return
  //   }
  //   carOwnerApi.getVehicleList()
  //     .then(res => {
  //       if(res && res.code == '0') {
  //         this.setState({
  //           carType:res.data.map(v => {
  //             return {
  //               value:v.cid,
  //               label:v.name
  //             }
  //           })
  //         })
  //       }
  //     })
  // }
  render() {
    // console.log('this.state.tabIndex',this.state.tabIndex)
    // if(!this.state.tabIndex) {
    //   return null
    // }
    const tabs = [
      { title: '诚信服务' },
      { title: '服务产品' },
      { title: '服务活动' },
      { title: '保修政策' },
      { title: '满意度调查' },
      { title: '定保通' },
    ];
    return (
      <div className='introduce'>
        <div className="title-img-b">
          <img src={require('../../../imgs/czzx-top-pic.jpg')} alt="" />
          {/* <span>服务介绍</span> */}
        </div>
        <div className="content just-my-tabs">
          <Tabs
            tabs={tabs}
            page={this.state.oneIndex}
            animated={false}
            swipeable={false}
            useOnPan={false}
            renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3}  prefixCls = {'none'}/>}
            // onChange={(v, i) => this.setState({ tabIndex: i })}
            onTabClick={(v, i) => this.setOneIndex(v, i)}
          >
            <Tabone />
            <Tabtwo setTwoIndex={(v, i) => this.setTwoIndex(v, i)} twoIndex={this.state.twoIndex} />
            <Tabthree setIndex={this.setOneIndex} />
            {/* {
              this.state.fuwuIndex === 1 ?
                <Tabthree setIndex={this.setIndex} />
              :
              this.state.fuwuIndex === 2 ?
                <TabthreeShenbian />
              :
                <TabthreeAiche />
            } */}

            <Tabfour />
            <Tabfive />
            <Tabdingbaotong_wx />
          </Tabs>
        </div>
      </div>
    );
  }
}

export default Introduce;
