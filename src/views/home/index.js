import React, { Component } from 'react';
import { SegmentedControl, Carousel, Toast } from 'antd-mobile'
import Swiper from 'react-id-swiper'
import Carswiper from '../../components/carswiper'
// import Gotop from '../../components/common/gotop'
import { homeApi } from './api'
import config from '../../config.json'
import './index.less'
import 'react-id-swiper/src/styles/css/swiper.css';
const BMap = window.BMap || {}
class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tabsValue: ['轿车', 'SUV', '中型客车', '原装进口'],
      tabsIndex: -1,
      carList: [
      ],
      showLastFlex: false,
      page: 0,
      bottomList: [
        // {
        //   title: '数字展厅',
        //   link: '/3d/room',
        //   imgName: 'home-show.png'
        // },
        // {
        //   title:'官方商城',
        //   link:'https://mall.ftms.com.cn/wx',
        //   imgName:'home-shop.png'
        // },
        // {
        //   title: '丰享汇',
        //   link: '/carowner/fengxianghui',
        //   imgName: 'home-fengxiang.png'
        // },
        // {
        //   title: '粉丝互动',
        //   link: '/brand/fans',
        //   imgName: 'home-fans.png'
        // },
        // {
        //   title: '安心二手车',
        //   link: 'http://www.ft-ucar.com.cn/',
        //   imgName: 'home-esc-1.png'
        // },
      ],
      params: {
        // direction: 'vertical',
        // mousewheel: true,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        }
      },
      lbData: [],
      show: false,
      carList: []
    }
  }
  componentWillMount() {
    this.slideshow()
  }
  componentDidMount() {
    this.brandModels()
    this.getAdvertisement()
  }
  // "id": "1",              // id
  // "name": "广告位测试",   // 广告位名称
  // "pc_pic": "http://homesite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/03/757226784895923185322933541689.jpg",// 广告位pc端图片
  // "m_pic": "",            // 广告位移动端图片
  // "url": "www.baidu.com", // 跳转链接
  // "position": "pc"        // 显示位置，pc：pc端显示，app：移动端显示
  getAdvertisement() {
    homeApi.getAdvertisement('app')
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            bottomList: res.data.filter(v => v.list.position.includes('app'))
          })
        }
      })
  }
  brandModels() {
    homeApi.brandModels()
      .then(res => {
        let carList = res.data;
        // for(let m in carList){
        //   let brandid = carList[m]['brand_id'];
        //   let item = carList[m]['car_series'];
        //   for(let n in item){
        //     item[n].brandid = brandid;
        //   }
        // }
        if (res && res.code == 0) {
          this.setState({
            carList: carList,
            // tabsValue: res.data.filter(v => !!v.car_series.length).map(v => v.title)
            tabsValue: res.data.map(v => v.title)
          })
        }
      })
  }
  slideshow() {
    homeApi.slideshow(3)
      .then(res => {
        if (res && res.code == 0) {
          this.setState({
            lbData: res.data
          })
        }
      })
  }

  jumpLink(e, link) {
    e && e.preventDefault()
    if (link.startsWith('http')) {
      window.location.href = link
    } else {
      this.props.history.push(link)
    }
  }

  onChange = (v, e) => {
    e.preventDefault()
    const haveYuanzhuang = this.state.carList.find(v => +v.brand_id === 16).car_series.length
    console.log(!haveYuanzhuang)
    if (v === 3 && !haveYuanzhuang ) {
      this.setState({
        tabsValue: ['轿车', 'SUV', '中型客车', '原装进口（敬请期待）'],
        showLastFlex: true,
        tabsIndex: this.state.tabsIndex
      }, () => this.forceUpdate())

      // selectedIndex
      // if(this.state.tabsIndex == -1 || this.state.tabsIndex != 2 || this.state.tabsIndex != 1) {
      //   this.setState({
      //     showLastFlex:true
      //   })
      //   return false
      // }
      return false
    } else {
      this.setState({
        tabsValue: ['轿车', 'SUV', '中型客车', '原装进口'],
        showLastFlex: false,
        tabsIndex: v,
      }, () => this.forceUpdate())
      // this.setState({
      //   tabsIndex: v,
      // })
    }

  }
  onValueChange = (v) => {
    // if(v == 3) {
    //   return
    // }
  }

  onTmove(e) {
    console.log(e.target)
  }
  jumpSwiper(url) {
    return
    console.log(url)
    Toast.info(url, 1)

    window.location.href = url
  }
  goLucky() {
    const userString = localStorage.getItem('userInfo');
    let token = '';
    console.log(userString)
    if (userString) {
      const user = JSON.parse(userString);
      token = user.accessToken;
    }
    window.open(`${config.mallServerPath}/luckdraw?token=${token}`)
  }
  goOther(url) {
    window.location.href = url;
  }
  render() {
    const { tabsValue, tabsIndex, bottomList, tabs, params, lbData, carList, showLastFlex } = this.state
    if (!lbData) {
      return null
    }
    console.log(lbData)
    return (
      <div className="home">
        <div className="t">
          {
            tabsIndex === -1 ?
              <div className="img-box" onTouchEnd={this.onTmove}>
                {!!lbData.length && <Swiper {...params}>
                  {
                    lbData.map((v, i) => {
                      return (
                        <div
                          className="v-item"
                          key={v.id}
                        // onClick={() => this.jumpSwiper(v.mUrl)}
                        >
                          <a href={v.mUrl}>
                            <img index={v.id} src={v.mThumb} alt="img" />
                          </a>
                        </div>
                      )
                    })
                  }
                </Swiper>}
              </div>
              :
              <div className="tabs">
                <Carswiper tabs={carList[tabsIndex].car_series.length ? carList[tabsIndex].car_series : carList[tabsIndex - 1].car_series} onChange={this.onChange} />
              </div>
          }
          <div className={ showLastFlex ? 'flex-2 car-nav' : 'car-nav'}>
            <SegmentedControl
              className={'box' + tabsIndex}
              selectedIndex={tabsIndex}
              values={tabsValue}
              tintColor={'#d3b078'}
              onChange={(e) => this.onChange(e.nativeEvent.selectedSegmentIndex, e)}
              onValueChange={(v) => this.onValueChange(v)}
            />
          </div>
          <div className="modal" />
        </div>

        <ul className="b">
        {
            bottomList.map((v, i) => {
              return (
                <li key={i} onClick={this.goOther.bind(this,v.list.m_url)}>
                  <img src={v.list.m_pic} alt="img" />
                  <a>
                    {v.list.name}
                  </a>
                </li>
              )
            })
          }
          {/* {
            bottomList.map((v, i) => {
              return (
                <li key={i}>
                  <img src={require(`../../imgs/${v.imgName}`)} alt="img" />
                    <span
                    
                      onClick={(e) => this.jumpLink(e,v.link)}
                    >
                      {v.title}
                    </span>
                </li>
              )
            })
          } */}
        </ul>
        {/* <Gotop /> */}
        <div className="lucky" onClick={this.goLucky.bind(this)}>
          <img src={require(`../../imgs/choujiang.png`)} alt="" />
        </div>
      </div>
    );
  }
}

export default Home;
