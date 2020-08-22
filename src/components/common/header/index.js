import React, { Component } from 'react';
import { Accordion, List, Icon, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import navList from './navList'
import {setProps} from '../../../redux/search.redux'
import {setShowHeader} from '../../../redux/showHeader.redux'
import './index.less'
import { connect } from 'react-redux';
function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}


@withRouter
@connect(
  state => state,
  {setProps,setShowHeader}
)
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showNav: false,
      showSearch: false,
      sum: '',
      searchData: [],
      searchValue: '',
      beginPage: 1,
      pageSize: 10,
      activeKey: ''

    }
    this.onShowNav = this.onShowNav.bind(this)
    // this.onShowSearch = this.onShowSearch.bind(this)
    this.onChangeHandle = this.onChangeHandle.bind(this)
  }
  componentDidMount() {
    // 监听浏览器前进后退按钮事件，收回导航栏
    window.addEventListener("popstate", (e) => { 
      this.props.setShowHeader(false)
      }, false);
  }
  // componentWillReceiveProps(nextProps,nextState) {
  //   if(nextProps.showHeader.isShow !== this.props.showHeader.isShow) {
  //     this.setState({
  //       showNav:true
  //     })
  //   }
  // }
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
  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }
  onShowNav(e) {
    console.log('eeee', e)
    e && e.preventDefault()
    this.props.setShowHeader(!this.props.showHeader.isShow)
    if(!this.props.showHeader.isShow) {
      window.myModal()
    }else {
      window.myModal1()
    }
    return
    // this.setState({
    //   showSearch: false,
    //   showNav: !this.state.showNav
    // }, () => {
    //   if (this.state.showNav) {
    //     window.myModal()
    //   } else {
    //     window.myModal1()
    //   }
    // })

  }
  onChangeNavList = (key) => {
    console.log(key);
  }
  jumpLink(e, link) {
    e && e.preventDefault()
    if(link === '/search') {
      this.props.setProps({
        sum:'',
        searchData:[],
        searchValue:'',
        searchValueShow: '',
        beginPage: 1,
        pageSize: 10,
        showLoading: false,
        showNoData: false,
        scroll: 0
      })
    }
    window.myModal1()
    if (link.startsWith('http')) {
      window.location.href = link
    } else {
      this.props.history.push(link)
      this.props.setShowHeader(false)
      this.setState({
        activeKey: ''
      })
      return
      // this.setState({
      //   showSearch: false,
      //   showNav: false,
      //   activeKey: ''
      // })
    }
  }

  // onShowSearch(e) {
  //   e && e.preventDefault()
  //   this.setState({
  //     showSearch: !this.state.showSearch,
  //     showNav: false
  //   })
  // }
  // search() {
  //   const {searchValue,pageSize,beginPage} = this.state
  //   if(!searchValue) {
  //     Toast.info('请输入关键词进行搜索!', 1);
  //     return 
  //   }
  //   const opt = {
  //     searchContent: searchValue,
  //     pageSize,
  //     beginPage
  //   }
  //   comApi.search(opt)
  //     .then(res => {
  //       if(res && res.code == 0) {
  //         this.setState({
  //           searchData:res.data.dataList,
  //           sum:res.data.totalRows
  //         })
  //       }
  //     })
  // }
  // toDetail(type,id) {
  //   this.setState({
  //     showSearch: false
  //   })
  //   // ：1.车型  2.活动  3.文章
  //   if(type == 1) {
  //     this.props.history.push('/')
  //   }else if(type == 2) {
  //     this.props.history.push(`/brand/activity/detail/${id}`)
  //   }else if(type == 3) {
  //     this.props.history.push(`/brand/fans/detail/${id}`)
  //   }
  // }
  render() {
    const { showNav } = this.state
    const {isShow} = this.props.showHeader
    return (
      <div className='header'>
        <header>
          <div className='logo' onClick={(e) => this.jumpLink(e, '/')}>
            <img src={require('../../../imgs/new-logo-s.png')} alt='img' />
          </div>
          <ul className='nav'>
            <li onClick={(e) => this.jumpLink(e, '/search')}>
              {/* <img src={require('../../../imgs/search-0.png')} alt='img' /> */}
              <Icon type="search" />
            </li>
            <li onClick={(e) => this.jumpLink(e, '/mine')}>
              <img src={require('../../../imgs/title-mine.png')} alt='img' />
            </li>
            <li onClick={this.onShowNav}>
              <img src={require('../../../imgs/title-nav.png')} alt='img' />
            </li>
          </ul>
        </header>
        <div
          className='nav-list'
          // style={{height:isShow ? document.documentElement.clientHeight : 0}}
          style={{ height:isShow ? 'auto' : 0 }}
        // onTouchStart={this.onWrapTouchStart}
        >
          <Accordion activeKey={this.state.activeKey} accordion openAnimation={{}} className="my-accordion" onChange={(k) => {
            this.setState({
              activeKey: k
            })
            if (k === '首页') {
              this.jumpLink('', '/')
            } else {

            }
          }}>
            {
              navList.map((v, i) => {
                return (
                  !v.child ?
                    <Accordion.Panel key={v.title} header={v.title} className={`my-pad`} onClick={(e) => this.jumpLink(e, v.link)}>
                    </Accordion.Panel>
                    :
                    <Accordion.Panel key={v.title} header={v.title} className={`pad `}>
                      <List className="my-list">
                        {
                          v.child.map(z => {
                            return (
                              <List.Item key={z.title} onClick={(e) => this.jumpLink(e, z.link)}>
                                {z.title}
                              </List.Item>
                            )
                          })
                        }
                      </List>
                    </Accordion.Panel>
                )
              })
            }
          </Accordion>
        </div>
      </div>
    );
  }
}

export default Header;
