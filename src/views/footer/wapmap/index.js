import React, { Component } from 'react';
import { HTTPGet } from '../../../utils/http';
import config from '../../../config.json';

import './index.less'
class Wapmap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      typeList: [],
      dataArr: [
        // {
        //   title: '品牌车型',
        //   comUrl: '',
        //   list: [{ url: '', name: 'AVALON 亚洲龙' }, { url: '', name: 'CROWN 皇冠' }, { url: '', name: 'IZOA 奕泽' },]
        // },
        {
          title: '购车支持',
          comUrl: '/buycar',
          list: [{ url: '/3d/room', name: '数字展厅' }, { url: 'rent', name: '融资租赁' }, { url: 'cartype', name: '品牌车型' }, { url: 'newcar', name: '新车保险' }, { url: 'pureuse', name: '纯正用品' }, { url: 'financial', name: '金融服务' }, { url: `${config.mallServerPath}`, name: '官方商城' },]
        },
        {
          title: '车主专享',
          comUrl: '/carowner',
          list: [{ url: 'introduce', name: '服务介绍' }, { url: 'fengxianghui', name: '丰享汇' }, { url: 'lobby', name: '服务大厅' }, { url: 'capacity', name: '智能互联' }, { url: 'part', name: '纯牌零件' },]
        },
        {
          title: '品牌中心',
          comUrl: '/brand',
          list: [{ url: 'company', name: '企业品牌' }, { url: 'news', name: '企业新闻' }, { url: 'profile', name: '企业介绍' }, { url: 'activity', name: '活动中心' }, { url: 'duty', name: '社会责任' }, { url: 'fans', name: '粉丝互动' },]
        },
      ]
    }
  }
  componentDidMount() {
    document.title = '网站地图';
  }

  jumpLink(baseUrl, url) {
    if (url) {
      if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/3d')) {
        window.location.href = url
      } else {
        window.location.href = baseUrl + '/' + url
      }
    }
  }

  componentWillMount() {
    HTTPGet('/Website/Car/brandModels').then((result) => {
      if (result && result.code == 0) {
        let list = result.data
        this.setState({
          typeList: list
        })
      }
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className='wapmap'>
        <div className="title-img">
          <img src={require('../../../imgs/map-banner.png')} alt="" />
          {/* <span>网站地图</span> */}
        </div>
        <div className='map-box'>
          <h3 className="title-l">
            品牌车型
          </h3>
          <ul className="list">
            {
              this.state.typeList.map((type, index) => {
                const carSeries = type.car_series;
                const brandId = type.brand_id;
                if (carSeries && carSeries.length) {
                  return carSeries.map((cs, csi) => {
                    return (
                      <li key={csi} onClick={() => this.jumpLink('/buycar', `cartype/detail/${cs.alias}`)}>
                        {cs.name}
                      </li>
                    )
                  })
                }
              })
            }
          </ul>
        </div>
        {
          this.state.dataArr.map((v, i) => {
            return (
              <div key={i} className='map-box'>
                <h3 className="title-l">
                  {v.title}
                </h3>
                <ul className="list">
                  {
                    v.list.map((z, k) => {
                      return (
                        <li key={k} onClick={() => this.jumpLink(`${v.comUrl}`, `${z.url}`)}>
                          {z.name}
                        </li>
                      )
                    })
                  }
                </ul>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default Wapmap;
