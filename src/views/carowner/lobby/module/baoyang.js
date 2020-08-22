import React, { Component } from 'react';
import { Button, Toast } from 'antd-mobile';
import { withRouter } from 'react-router-dom'
import { carOwnerApi } from '../../api'
import moment from 'moment'
import { getParamsObj } from '../../../../utils/util'
import {
  MyInput,
  MySelect,
  MyDate
} from '../../../../components/dataview'
class Baoyang extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null,
      isShowResult: false,
      carType: [],
      changeProjectList: [],
      checkProjectList: [],
      gongliArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(v => ({ label: v, value: v }))
    }
  }
  componentDidMount() {
    this.getMaintainCarType()

    let params = getParamsObj();
    
    switch(params.tabIndex) {
      case '0':
        document.title = '保养计划';
        break;
      case '1':
        document.title = '预约保养';
        break;
      case '2':
        document.title = '预约维修';
        break;
      case '3':
        document.title = '违章查询';
        break;
      case '4':
        document.title = '紧急救援';
        break;
    }
  }
  getMaintainCarType() {
    if (this.props.carType && !!this.props.carType.length) {
      // return
    }
    carOwnerApi.getMaintainCarType()
      .then(res => {
        if (res) {
          this.setState({
            carType: res.data.map(v => {
              return {
                value: v.code,
                label: v.name
              }
            })
          })
        }
      })
  }
  restData() {
    const arr = ['modelType', 'displacement', 'purchaseYear', 'drivingMileage', 'lastMaintenanceTime']
    const that = this
    arr.forEach((v) => {
      that.props.onChangeHandle(v, '')
    })
    this.setState({
      isShowResult: false
    })
  }
  getData() {
    const { modelType, displacement, purchaseYear, drivingMileage, lastMaintenanceTime } = this.props

    if (!modelType) {
      Toast.info('请选择车型!', 1);
      return false;
    } else if (!drivingMileage) {
      Toast.info('请选择行驶里程数!', 1);
      return false;
    } else {
      carOwnerApi.maintainPlan({
        code: modelType[0],
        displacement: displacement ? displacement : null,
        purchaseYear: purchaseYear ? moment(purchaseYear).format('YYYY') : null,
        driveMileage: drivingMileage[0],
        lastMaintenanceTime: lastMaintenanceTime ? moment(lastMaintenanceTime).format('YYYY-MM') : null
      })
        .then(res => {
          if (res && res.code === '0' && res.data) {
            this.setState({
              checkProjectList: res.data.checkProjectList || [],
              changeProjectList: res.data.changeProjectList || [],
              isShowResult: true
            })
          }
        })
    }
  }
  render() {
    const { isShowResult, checkProjectList, changeProjectList } = this.state
    // console.log(this.props)
    return (
      <div className='baoyang'>
        <ul>
          <li className='label-box'>
            <div className='l label-must'>
              车型：&nbsp;&nbsp;&nbsp;
            </div>
            <div className="r">
              <MySelect
                extra="请选择你的车型"
                value={this.props.modelType}
                data={this.state.carType}
                onChange={(v) => this.props.onChangeHandle('modelType', v)}
              />
            </div>
          </li>
          {/* <li className='label-box'>
            <div className='l'>
              排量：&nbsp;&nbsp;&nbsp;
            </div>
            <div className="r">
              <MyInput
                value={this.props.displacement}
                placeholder='请输入排量'
                ruleName='xiaoshu'
                onChange={(v) => this.props.onChangeHandle('displacement',v)}
              />
            </div>
          </li> */}
          <li className='label-box'>
            <div className='l'>
              购买年份：
            </div>
            <div className="r">
              {/* <MyDate
                extra="请输入上次保养时间"
                mode='month'
                format='YYYY-MM'
                value={this.props.lastMaintenanceTime}
                onChange={(v) => this.props.onChangeHandle('lastMaintenanceTime',v)}
              /> */}
              <MyDate
                extra="请选择年款"
                maxDate={new Date(moment().get('year'), 1, 1, 23, 59, 59)}
                mode='year'
                format='YYYY'
                value={this.props.purchaseYear}
                onChange={(v) => this.props.onChangeHandle('purchaseYear', v)}
              />
            </div>
          </li>
          <li className='label-box'>
            <div className='l label-must'>
              行驶里程数：
            </div>
            <div className="r licheng">
              <MySelect
                extra="请选择行驶公里数"
                value={this.props.drivingMileage}
                data={this.state.gongliArr}
                onChange={(v) => this.props.onChangeHandle('drivingMileage', v)}
              />
            </div>
          </li>
          <li className='label-box'>
            <div className='l'>
              上次保养时间：
            </div>
            <div className="r">
              <MyDate
                extra="请输入上次保养时间"
                maxDate={new Date(moment().get('year'), moment().get('month'), 1, 23, 59, 59)}
                mode='month'
                format='YYYY-MM'
                value={this.props.lastMaintenanceTime}
                onChange={(v) => this.props.onChangeHandle('lastMaintenanceTime', v)}
              />
            </div>
          </li>
        </ul>
        <div className="btns">
          <div className="my-btn mb-8">
            <Button inline onClick={() => this.getData()}>查询</Button>
          </div>
          <div className="my-btn mb-8">
            <Button inline onClick={() => this.restData()}>重置</Button>
          </div>
        </div>
        <div className="my-line" />
        {isShowResult && <div className="my-table">
          <div className="title">
            <h3>更换</h3>
          </div>
          <ul className="list">
            <li>
              <span>序号</span>
              <span>更换项目</span>
              <span>操作说明</span>
              <span>配件类型</span>
              <span>操作</span>
            </li>
            {
              changeProjectList.map((v, i) => {
                const origin = window.location.origin
                const url = `${origin}/carowner/goodstype/${v.accessoriesCode}?title=${v.accessoriesType}`
                return (
                  <li key={i}>
                    <span>{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: v.projectName }}></span>
                    <span dangerouslySetInnerHTML={{ __html: v.operateExplain }}></span>
                    <span dangerouslySetInnerHTML={{ __html: v.accessoriesType }}></span>
                    <span>
                      {/* {accessoriesCode} */}
                      {/* this.props.history.push(`/carowner/goodstype/${v.accessoriesCode}?title=${v.accessoriesType}`) */}
                      {v.accessoriesCode ? <span className='table-btn' onClick={() => window.open(url)}>
                        查看配件
                      </span> : null}
                    </span>
                  </li>
                )
              })
            }
          </ul>
        </div>}

        {isShowResult && <div className="my-table">
          <div className="title">
            <h3>检查</h3>
          </div>
          <ul className="list">
            <li>
              <span>序号</span>
              <span>检查项目</span>
              <span>操作说明</span>
            </li>
            {
              checkProjectList.map((v, i) => {
                return (
                  <li key={i}>
                    <span>{i + 1}</span>
                    <span dangerouslySetInnerHTML={{ __html: v.projectName }}></span>
                    <span dangerouslySetInnerHTML={{ __html: v.operateExplain }}></span>
                    {/* <span>{v.accessoriesType}</span>
                    <span>
                      <span className='table-btn'>查看配件</span>
                    </span> */}
                  </li>
                )
              })
            }
          </ul>
          <div className="my-btn mt-8">
            <Button inline onClick={() => {
              if (this.props.type === 'fwdt') {
                console.log(this.props.drivingMileage)
                {/* this.props.setIndex('', 1, this.props.modelType[0], this.props.drivingMileage[0]) */}
                const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                const accessToken = userInfo && userInfo.accessToken
                const url = `/carowner/lobby?tabIndex=1&modelType=${this.props.modelType[0]}&drivingMileage=${this.props.drivingMileage[0]}`
                console.log(url)
                if (!accessToken) {
                  localStorage.removeItem('userInfo')
                  localStorage.setItem("redirectUrl", url)
                }
               window.location.href=url;
              } else {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'))
                const accessToken = userInfo && userInfo.accessToken
                const url = `/carowner/lobby?tabIndex=1&modelType=${this.props.modelType[0]}&drivingMileage=${this.props.drivingMileage[0]}`
                console.log(url)
                if (!accessToken) {
                  localStorage.removeItem('userInfo')
                  localStorage.setItem("redirectUrl", url)
                }
                this.props.history.push(url)
              }
              // localStorage.setItem('tabsIndex',1)
            }}>立即预约保养</Button>
          </div>
        </div>}

      </div>
    );
  }
}

export default withRouter(Baoyang);
