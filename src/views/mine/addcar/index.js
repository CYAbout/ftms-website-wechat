import React, { Component, Fragment } from 'react';
import UserLayout from '../components/layout';
import { Button, Toast } from 'antd-mobile';
import moment from 'moment';
import {
  MyInput
} from '../../../components/dataview/';
import {
  getParamsObj
} from '../../../utils/util';
import MyBack from '../components/back';
import './index.less';
import { userApi } from '../api';

const BindSuccess = (props) => {
  return (
    <div className="failed">
      <img src={require(`../../../imgs/icon-succes.png`)} alt="" />
      <div className="title">绑定爱车成功</div>
      <div className="desc">您可以在【个人中心】--【我的爱车】中查看已添加的爱车啦～</div>
      <div className="btns">
        <div className="my-btn">
          <Button inline onClick={(e) => props.click('back')}>查看我的爱车</Button>
        </div>
      </div>
    </div>
  )
}

const BindFailed = (props) => {
  return (
    <div className="failed">
      <img src={require(`../../../imgs/icon-x.png`)} alt="" />
      <div className="title">{props.text}</div>
      <div className="desc">{`${props.msg ? props.msg : '车主信息不匹配'} ，添加爱车失败，请检查您添加的车是否为您本人的车`}</div>
      <div className="btns">
        <div className="my-btn">
          <Button inline onClick={(e) => props.click('back')}>回到个人中心</Button>
        </div>
        <div className="my-btn">
          <Button inline onClick={(e) => props.click(0)}>重新添加</Button>
        </div>
      </div>
    </div>
  )
}

class Addcar extends Component {

  constructor(props) {
    super(props);
    let params = getParamsObj();
    let index = 0;
    let carId = '';
    if(params.id){
      index = 1
      carId = params.id;
    }
    this.state = {
      carInfo: null,
      userInfo: {},
      carCode: '', // 车架号
      msg: '', // 失败信息
      step: index, // 0查询表单，1查询成功，2查询失败，3绑定成功，4绑定失败
      carTag: '', // 车牌号
      engine: '', // 发动机
      modifyFlag: false,
      carId: carId
    };
    this.onChangeHandle = this.onChangeHandle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleBind = this.handleBind.bind(this);
    this.setStep = this.setStep.bind(this);
    this.jumpTo = this.jumpTo.bind(this);
  }
  componentWillMount(){
    // this.setState({
    //   step: 1
    // })
  }
  componentDidMount() {
    let userInfo = localStorage.getItem('userInfo');
    let params = getParamsObj();
    if (userInfo) {
      userInfo = JSON.parse(userInfo);
      this.setState({
        userInfo
      })
    }
    console.log(userInfo, 90909090, localStorage)

    if(params.id&&params.carCode){
      let url = `/api/loveCarInfo/${params.id}/${params.carCode}`;
      userApi.carQuery(url).then(res=>{
        if(res && res.code == 0){
          this.setState({
            modifyFlag: true,
            carInfo:res.data,
            carTag: res.data.carnumber,
            engine: res.data.carenginecode,
          })
        }
      });
    }else{
      // this.setState({
      //   userInfo
      // })
    }
    document.title = '添加爱车'
  }

  onChangeHandle(type, val) {
    this.setState({
      [type]: val
    })
  }

  handleSubmit() {
    const { carCode } = this.state;
    if (!carCode) {
      Toast.info('请输入车架号', 1);
      return;
    } else {
      if (carCode.length !== 17) {
        Toast.info('请输入17位车架号', 1);
        return;
      }
    }
    this.queryCarByCode();
  }

  handleBind() {
    let { carCode, userInfo, step,carTag,engine } = this.state;
    let reg1 = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{5,6}$/;
    if(carTag&&!reg1.test(carTag)){
      Toast.info('请输入正确的车牌号!',1);
      return false;
    }
    // let reg2 = /\d{6}[A-Z]{1}/;
    // if(engine&&!reg2.test(engine)){
    //   Toast.info('请输入正确的发动机号!',1);
    //   return false;
    // }
    if(this.state.modifyFlag){
      let params = {
        carEngineCode:this.state.engine,
        carNumber:this.state.carTag,
        id:+this.state.carId,
      };
      userApi.carUpdate(params).then(res=>{
        if(res && res.code == 0){
          Toast.info('修改成功！',1);
          this.props.history.push('/mine');
        }
      });
    }else{
      userApi.carBind({ carCode, mobile: userInfo.mobile,carNumber: carTag ,carEngineCode: engine })
        .then(res => {
          if (res && res.code === '0') {
            step = 3;
          } else {
            this.setState({
              msg: res.msg
            })
            step = 4;
          }
          this.setState({ step });
        })
    }
  }

  setStep(step) {
    if (step === 'back') {
      this.props.history.push('/mine');
    } else {
      this.setState({ step });
    }
  }

  jumpTo() {
    this.props.history.push('/mine');
  }

  queryCarByCode() {
    const { carCode, userInfo } = this.state;
    // const data = {
    //   "img": "http://homesite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/03/722214118758155692565456259574.png", // 车型图片
    //   "title_short": "COROLLA 卡罗拉", // 短标题
    //   "title_long": "COROLLA 卡罗拉 1.2T GL-I", // 长标题
    //   "color": "超级白色", // 颜色
    //   "carCode": "LFMA086CXH0144605",  // 车架号
    //   "phone": "15298885355",          // 手机号
    //   "salesdate": "2017-10-30",        // 购车时间
    //   img_logo: "http://homesite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/03/353868375887271678768326695657.png",
    // }
    // const myCarInfo = {
    //   carModelName: data.title_short,
    //   carVersion: data.title_long,
    //   color: data.color,
    //   carCode: data.carCode,
    //   carPic: data.img,
    //   mobile: data.phone,
    //   buyTime: data.salesdate,
    //   logos: data.img_logo,
    //   longTitle: data.title_long
    // }
    // this.setState({
    //   carInfo: myCarInfo,
    //   step: 4,
    //   msg: 'sfsdfdsfs'
    // })
    // return;
    userApi.getMyLoveCar({ carCode, mobile: userInfo.mobile })
      .then(res => {
        if (res) {
          if (res.code === '0') {
            const { data } = res;
            if (data) {
              const myCarInfo = {
                carModelName: data.title_short,
                carVersion: data.title_long,
                color: data.color,
                carCode: data.carCode,
                carPic: data.img,
                mobile: data.phone,
                buyTime: data.salesdate,
                logos: data.img_logo,
                longTitle: data.title_long
              }
              this.setState({
                carInfo: myCarInfo,
                step: res.data ? 1 : 2
              })
            } else {
              this.setStep(2);
            }
          } else {
            this.setStep(2);
          }
        }
        // this.setState({
        //   carInfo: carInfo,//res.data,
        //   step: res.data ? 1 : 2
        // })
      })
  }
  render() {
    const { carInfo, step, userInfo, carCode, msg } = this.state;
    let EL = null;
    if (step === 0) {
      EL = <Fragment>
        <ul>
          <li className="label_box">
            <div className="l">请输入车架号：</div>
            <div className="r">
              <MyInput
                value={carCode}
                placeholder='请输入属于您本人的汽车车架号'
                onChange={(v) => this.onChangeHandle('carCode', v)}
              />
            </div>
          </li>
          <li className="label_box">
            <div className="l">请输入手机号：</div>
            <div className="r">
              <MyInput
                value={userInfo.mobile}
                disabled
                placeholder='请输入您的手机号'
              // onChange={(v) => this.onChangeHandle('mobile', v)}
              />
            </div>
          </li>
        </ul>
        <div className="btns">
          <div className="my-btn">
            <Button inline onClick={this.handleSubmit}>下一步</Button>
          </div>
        </div>
      </Fragment>

    } else if (step === 1) {
      EL = <Fragment>
            
      </Fragment>
    } else if (step === 2) {
      EL = <BindFailed text="车主信息匹配不成功" click={this.setStep} />
    } else if (step === 3) {
      EL = <BindSuccess click={this.setStep} />
    } else if (step === 4) {
      EL = <BindFailed text="绑定爱车失败" msg={msg} click={this.setStep} />
    }
    if(step === 1){
      return (
        <UserLayout>
          <div className='add_car'>
            <div className="ver_title"><MyBack />添加爱车</div>
            <div className="ver_line"></div>
            {
              carInfo?<div className="card form">
              <div className='inner'>
                <div className='title'>
                {carInfo.longTitle ? carInfo.longTitle : carInfo.carModelName + carInfo.carVersion}
                </div>
                <div className='info'>
                  <ul>
                    <li>颜色：{carInfo.color}</li>
                    <li>车架号：{carInfo.carCode}</li>
                    <li>购车人手机号：{carInfo.mobile ? carInfo.mobile.substring(0, 3) + '****' + carInfo.mobile.substring(7) : ''}</li>
                    <li>购车时间：{carInfo.buyTime ? carInfo.buyTime.toString().indexOf('-') > -1 ? carInfo.buyTime : moment(carInfo.buyTime + '000' - 0).format('YYYY-MM-DD') : ''}</li>
                  </ul>
                </div>
              </div>
            </div>:null
            }
            <div className="card form">
              <div className='inner'>
                <ul className='info'>
                  <li>
                    <div className="label-box">
                      <div className='l'>
                        请输入车牌号:
                        </div>
                      <div className="r">
                      <MyInput
                        extra="请输入车牌号"
                        value={this.state.carTag}
                        maxLength={8}
                        onChange={(v) => this.onChangeHandle('carTag',v)}
                      />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="label-box">
                      <div className='l'>
                        请输入发动机号:
                        </div>
                      <div className="r">
                      <MyInput
                        extra="请输入发动机号"
                        value={this.state.engine}
                        maxLength={8}
                        onChange={(v) => this.onChangeHandle('engine',v)}
                      />
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className='desc'>
                      注：为了方便您更好的使用违章查询功能，我们建议您输入车牌号与发动机号(非必填)。
                    </div>
                  </li>
                  <li>
                  <div className='mybtn' onClick={(e) => {this.handleBind();}}>{this.state.modifyFlag?'保存':'立即绑定'}</div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </UserLayout>
      );
    } else{
      return (
        <UserLayout>
          <div className='add_car'>
            <div className="ver_title"><MyBack />添加爱车</div>
            <div className="ver_line"></div>
            <div className="card form">
            {
              EL
            }
            </div>
            </div>
        </UserLayout>
      );
    }
  }
}

export default Addcar;
