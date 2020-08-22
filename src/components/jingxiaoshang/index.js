import React, {Component,PureComponent} from 'react'
import {
  MyInput,
  MySelect,
  MyDate,
  MyInputarea,
  MyRadio,
  MySwitch
} from '../dataview'
import {Map, Marker, NavigationControl, InfoWindow,MarkerList} from 'react-bmap'
import {carOwnerApi} from '../../views/carowner/api'
import './index.less'

class Jingxiaoshang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      // mapData:props.addressData.map((v,i) => ({text:v.name,location:`${v.lng},${v.lat}`}))
    }
  }
  shouldComponentUpdate(nextProps) {
    if(JSON.stringify(nextProps) == JSON.stringify(this.props)) {
      return false
    }else {
      return true
    }
  }
  // shouldComponentUpdate(nextProps,nextState) {
  //   console.log(nextProps)
  // }
  // componentDidMount() {
  //   this.setMap()
  // }
  // setMap() {
  //   const mapData = this.props.addressData.map((v,i) => ({text:v.name,location:`${v.lng},${v.lat}`}))
  //   this.setState({
  //     mapData
  //   })
  // }
  // componentWillReceiveProps() {
  //   this.setMap()
  // }
  render() {
    // if(!this.props.provinceValue) {
    //   return null
    // }
    // console.log(this.props.addressAllData)
    const {addressAllData} = this.props
    const dataPo = addressAllData ? {
      lng: +addressAllData.lng, 
      lat: +addressAllData.lat
    }
    :
    {
      lng: 116.402544, 
      lat: 39.928216
    }
    const titleData= addressAllData ? {
      title: addressAllData.name,
      text: addressAllData.address
    }
    :
    {
      title:'',
      text: ''
    }
    // console.log('dataPo',dataPo,titleData,addressAllData)
    const titleBox = (
      !!addressAllData && <InfoWindow
        position={dataPo} 
        text={titleData.text} title={titleData.title}
      />
    )
    return (
      <div className='jingxiaoshang'>
        <div className="two-label">
          <MySelect
            extra=""
            value={this.props.provinceValue}
            data={this.props.province}
            onChange={(v) => this.props.onChangeHandle('provinceValue', v)}
          />
          <MySelect
            extra=""
            value={this.props.citysValue}
            data={this.props.citys}
            onChange={(v) => this.props.onChangeHandle('citysValue', v,'',v)}
          />
        </div>
        <div className="search-label">
          <MyInput
            value={this.props.dealerName}
            placeholder='输入经销商名称快速查询'
            onChange={(v) => this.props.onChangeHandle('dealerName', v)}
          />
          <div className="search-img" onClick={() => {
            // console.log('jxs')
            this.props.onSearch()
          }}>
            <img src={require('../../imgs/search-0.png')} alt=""/>
          </div>
        </div>
        <div className="serach-jieguo">
          共为您找到 <span style={{color:'#e50020'}}>{this.props.sum}</span> 家经销商
        </div>
        <div className="my-map">
        {/* my-map */}
        <Map center={dataPo} zoom="11">
          {/* <Marker position={{lng: 116.402544, lat: 39.928216}}  /> */}
          {/* <NavigationControl />  */}
          {titleBox}
          <MarkerList 
            data={this.props.mapData || []} 
            fillStyle="#db4138" 
            // animation={true} 
            isShowShadow={false} 
            multiple={false}
            autoViewport={true}
            // isShowText={true}
            // textOptions={{size:10}}
            // viewportOptions={
            //   {size:1,icon:'../../imgs/activity-1.png'}
            // }
        />
        </Map>
        </div>
        <div className="address-list">
          <ul>
            {this.props.addressData.map((v,i) => {
              return (
                <li className={this.props.addressValue === v.id ? 'checked' : ''} key={v.id} onClick={() => this.props.onChangeHandle('addressValue', v.id,v.name,v)}>
                  <div className="top">
                    <div className="address-text">
                      <span className='xuhao'>{this.props.addressValue !== v.id && (i+1)}</span>
                      <span>{v.name}</span>
                    </div>
                    <div className="num">
                    {v.distance}km
                    </div>
                  </div>
                  {
                    this.props.addressValue === v.id && <div className="bottom">
                    <div>{v.address}</div>
                    <div>销售热线：{v.phone_seal}</div>
                    <div>服务热线：{v.phone_service}</div>
                    {this.props.jumpShijia?<div className='btn' onClick={(e)=>{this.props.jumpShijia(e,v)}}>
                        <img src={require(`../../imgs/home-btn4.png`)} alt="img"/>
                        预约试驾
                    </div>:null}
                    
                  </div>
                  }
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    )
  }
}

export default Jingxiaoshang