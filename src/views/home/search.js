import React, { Component } from 'react';
import {Toast } from 'antd-mobile';
import {MyInput} from '../../components/dataview'
import {comApi} from '../../components/api'
import GetMore from '../../components/getmore'
import {setProps} from '../../redux/search.redux'
import { toJump } from '../../utils/jumpLink';
import { connect } from 'react-redux';
import './index.less'

let scrollTop = 0 
@connect(
  state => state,
  {setProps}
)
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      sum:'',
      searchData:[],
      searchValue:'',
      searchValueShow: '',
      beginPage: 1,
      pageSize: 10,
      showLoading: false,
      showNoData: false
    }
  }
  componentDidMount() {
    window.scrollTo(0,this.props.searchData.scroll)
    window.addEventListener('scroll', this.onScrollHandle.bind(this))
  }

  componentWillUnmount() {
    window.removeEventListener("scroll",this.onScrollHandle,false);
    this.props.setProps({
      scroll: scrollTop,
    })
  }
  onScrollHandle() {
    scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  }
  searchClick() {
    this.props.setProps({beginPage:1})
    setTimeout(() => {
      this.search()
    },100)
    

    // this.setState({
    //   beginPage:1
    // },() => this.search())
  }
  search(type) {
    // const {searchValue,pageSize,beginPage} = this.state
    const {searchValue,pageSize,beginPage} = this.props.searchData
    if(!searchValue) {
      // Toast.info('请输入关键词进行搜索!', 1);
      // this.setState({
      //   searchData:[],
      //   searchValue:'',
      //   sum: ''
      // })
      this.props.setProps({
        searchData:[],
        searchValue:'',
        sum: ''
      })
      return 
    }
    // this.setState({
    //   searchValueShow:searchValue
    // })
    this.props.setProps({
      searchValueShow:searchValue
    })
    const opt = {
      searchContent: searchValue,
      pageSize,
      beginPage
    }
    if(type !== 'more') {
      // this.setState({
      //   searchData:[],
      // })
      this.props.setProps({
        searchData:[],
        beginPage: 1
      })
    }

    comApi.search(opt)
      .then(res => {
        if(res && res.code == 0) {
          if(res.data.dataList) {
            const newData =  this.changeColor(res.data.dataList)
            // this.setState({
            //   searchData:[...this.state.searchData,...newData],
            //   beginPage:this.state.beginPage + 1,
            //   hasNextPage:res.data.hasNextPage,
            //   sum:res.data.totalRows,
            // })
            this.props.setProps({
              searchData:[...this.props.searchData.searchData,...newData],
              beginPage:this.props.searchData.beginPage + 1,
              hasNextPage:res.data.hasNextPage,
              sum:res.data.totalRows,
            })
          }
          // if(!res.data.dataList.length) {
            
          // }
          // this.setState({
          //   showNoData: true,
          //   showLoading:false,
          // })
          this.props.setProps({
            showNoData: true,
            showLoading:false,
          })
        }
      })
  }
  changeColor(data) {
    // const val = this.state.searchValue
    const val = this.props.searchData.searchValue
    const newSearchData = data.map(v => {
      const str =  v.title ? v.title.replace(`${val}`, `<span class='colorTxt'>${val}</span>`) :  v.title
      const strp = v.description ? v.description.replace(`${val}`, `<span class='colorTxt'>${val}</span>`) : v.description
      console.log(str)
      return {...v,title:str,description:strp}
    })
    return newSearchData
  }
  toDetail(type, id, url,description) {
    // 结果类型:
    // 1.车型信息 
    // 2.活动:活动中心 
    // 3.活动:丰享汇 
    // 4.文章:爱车课堂 
    // 5.文章:企业新闻 
    // 6.文章:粉丝互动
    if(type == 1 ) {
      // let newTab = window.open(newTab);
      // newTab.location = url
      this.props.history.push(`/buycar/cartype/detail/${url}`)
      return
    }
    if(url) {
      window.open(url)
      return
    }
    const links = [
      '/buycar/cartype/detail/avalon/',
      '/brand/activity/detail/',
      '/carowner/fengxianghui/activitycontent/',
      '/carowner/introduce/aichecontent/',
      '/brand/news/detail/',
      '/brand/fans/detail/'
    ]
    const origin = window.location.origin
    // url = `${origin}${links[type-1]}${id}`
    // window.open(url)
    this.props.history.push(`${links[type-1]}${id}`)
  }
  getMoreData() {
    // this.setState({
    //   showLoading: true
    // })
    this.props.setProps({
      showLoading: true
    })
    this.search('more')
  }
  onChangeHandle(type, val) {
    this.props.setProps({
      [type]: val
    })
    // this.setState({
    //   [type]: val
    // })
  }
  render() {
    // const { searchValueShow,searchData,sum,showNoData,searchValue } = this.state
    const { searchValueShow,searchData,sum,showNoData,searchValue,showLoading,hasNextPage } = this.props.searchData
    return (
      <div className="search"  ref={ node => this.contentNode = node }>
      <div className="search-label">
        <MyInput
          // value={this.state.searchValue}
          value={searchValue}
          placeholder='请输入您想查询的内容…'
          onChange={(v) => this.onChangeHandle('searchValue', v)}
        />
        <div className="search-img" onClick={() => this.searchClick()}>
          <img src={require('../../imgs/search-0.png')} alt="" />
        </div>
      </div>
      {showNoData && <div className="finded">
      <div>共找到<span> {sum} </span>条<span> {searchValueShow} </span>相关信息结果</div>
      </div>}
      <ul className="search-data">
        {searchData.map((v,i) => {
          return (
          <li key={i} onClick={() => this.toDetail(v.type,v.id,v.url,v.description)}>
            <h3 dangerouslySetInnerHTML={{__html:v.title}}></h3>
            {v.type != 1 ? <p className='content' dangerouslySetInnerHTML={{__html:v.description}}>
            </p> : null}
            <p className='url'>
              {v.url}
            </p>
          </li>
          )
        })}
      </ul>
      {
        !searchData.length && showNoData && <div className='no-data'>暂无数据</div>
      }
      {!!searchData.length && <GetMore
        // showLoading={this.state.showLoading} 
        // noMore={!this.state.hasNextPage}
        showLoading={showLoading} 
        noMore={!hasNextPage}
        getMoreData={() => this.getMoreData()} 
      />}
    </div>
    );
  }
}

export default Search;
