import React, { Component } from 'react';
import { Toast, Modal } from 'antd-mobile';

import {MyInput,MySelect} from '../../../components/dataview/index.js';
import UserAgreement from '../../../components/useragreement/index'
import {HTTPGet,HTTPPost} from '../../../utils/http';
import Gotop from '../../../components/common/gotop';


import './downCenter.less';

// 这个是区分产品手册和壁纸的key
const SHOUCE = '产品手册'

class DownCenter extends Component{
    constructor(props) {
        super(props);
        this.state = {
          carList:[],
          curCar: '',
          gender: true,
          agree: false,
          picList:[],
          info: {},
          uname: '',
          phoneNo: '',
          validateCode: '',
          leftSecond: 0,
          sendFlag: false,
          showUser: false
        };
    }
    componentWillMount(){
        this.getWallPaper();
    }
    getWallPaper(id) {
        let cid = id || this.props.match.params.cid;
        let url = '/api/getWallpaper/'+cid;
        let allurl = '/Website/Car/brandModels';
        let userInfo = localStorage.getItem('userInfo');
        if(userInfo){
            this.setState({
                phoneNo: userInfo.mobile?userInfo.mobile:'',
                uname: userInfo.realName?userInfo.realName:''
            });
        }
        HTTPGet(url).then((result)=>{
            let mylist = result.data;
            let shouce = {};
            let picList = []
            for (let i in mylist) {
                if(mylist[i].name == SHOUCE){
                    shouce = mylist[i];
                }else{
                    picList.push(mylist[i]);
                }
            }
            this.setState({
                picList: picList,
                info: shouce
            });
        });
        HTTPGet(allurl).then((result)=>{
            let curCar = [];
            let carList = [];
            if(result&&result.code == 0){
                let temp = result.data;
                if(temp){
                    for (let m in temp) {
                        if(temp[m]&&temp[m].car_series){
                            let series = temp[m].car_series;
                            for (let n in series){
                                if(series[n] && series[n].name){
                                    if(series[n].cid == cid){
                                        curCar.push(series[n].name);
                                    }
                                    carList.push({
                                        label: series[n].name,
                                        value: series[n].name,
                                        cid: series[n].cid
                                    });
                                }
                            }
                        }
                    }
                }
            }
            this.setState({
                carList: carList,
                curCar: [...curCar]
            });
        });
    }
    handleChange=(val)=>{
        console.log(val);
        console.log(this.state.carList);
        this.setState({
            curCar: val
        });
        let name = val[0];
        let cid;
        let carList = this.state.carList;
        carList.map((item,index) => {
            if (item.value === name) {
                cid = item.cid;
            }
        })
        console.log(cid);
        this.getWallPaper(cid);
    }
    changeFlag=()=>{
        let flag = this.state.gender;
        flag = !flag;
        this.setState({
            gender: flag
        });
    }
    changeSelFlag=()=>{
        let sel = this.state.agree;
        sel = !sel;
        this.setState({
            agree: sel
        });
    }
    changeUName=(v)=>{
        this.setState({
            uname: v
        })
    }
    changePhone=(v)=>{
        this.setState({
            phoneNo: v
        })
    }
    changeValidateCode=(v)=>{
        this.setState({
            validateCode: v
        })
    }
    downLoad(url){
        console.log(this.state.carList);
        // window.open('https://www.baidu.com/img/bd_logo1.png','_self');
        let storeurl = '/api/insertDownLoadRecord';
        let	agree = this.state.agree ? 'Y' : '';
        let	carModelName = this.state.curCar[0];
        let	mobile = this.state.phoneNo;
        let	mobileVerificationCode = this.state.validateCode;
        let	name = this.state.uname;
        let	sex = this.state.gender ? '1' : '0';
        if(!name){
            Toast.info('请输入姓名',1);
            return;
        }
        if(!mobile){
            Toast.info('请输入手机号码',1);
            return;
        }
        if(!/^1[0-9][0-9]{9}$/.test(mobile)){
            Toast.info('请输入正确的手机号！', 1)
            return
          }
        if(!mobileVerificationCode){
            Toast.info('请输入验证码',1);
            return;
        }
        if(agree != 'Y'){
            Toast.info('请阅读《隐私政策》',1);
            return;
        }
        if(!this.state.sendFlag){
            Toast.info('请获取短信验证码',1);
            return;
        }
        let data = {
            agree: agree,
            carModelName: carModelName,
            mobile: mobile,
            mobileVerificationCode: mobileVerificationCode,
            name: name,
            sex: sex
        };
        HTTPPost(storeurl,data).then((result)=>{
            console.log(this.state.picList);
            console.log(this.state.info);
            window.location.href = this.state.info.files;
            // // var src = this.state.info.files;
            // // var iframe = document.createElement('iframe');
            // // iframe.style.display = 'none';
            // // iframe.src = "javascript: '<script>location.href=\"" + src + "\"<\/script>'";
            // // document.getElementsByTagName('body')[0].appendChild(iframe);
        });
    }
    getPhoneCode() {
        let mobile = this.state.phoneNo;
        if(!mobile){
            Toast.info('请输入手机号码',1);
            return;
        }
        let sec = this.state.leftSecond;
        if(sec <= 0){
            const opt = {
              mobile: mobile,
              sendCodeType:'downloadCatalogue'
            }
            sec = 120;
            HTTPPost('/api/sendMobileCode',opt).then(res => {
              console.log('123',res)
              if(res && res.code === '0') {
                  this.setState({
                    leftSecond: 120,
                    sendFlag: true
                  },()=>{
                    this.interval = setInterval(() => {
                        let second = this.state.leftSecond;
                        if(second<=0){
                            clearInterval(this.interval);
                        }else{
                            second--
                            this.setState({
                                leftSecond:second
                            })
                        }
                    }, 1000)
                  })
              }
            })
        }
    }
    render() {
        return (
          <div className='down-center'>
            <div className='top-title border-b'>
                车型型录
            </div>
            {this.state.info.thumb?<img src={this.state.info.thumb} className='img-lg' alt="img"/>:null}
            <div className='row'>
                <div className='desc'>
                    <div>已</div>
                    <div>选</div>
                    <div>车</div>
                    <div>型:</div>
                </div>
                <div className='right'>
                    <MySelect data={this.state.carList} extra={this.state.curCar[0]} value={this.state.curCar} onChange={this.handleChange}></MySelect>
                </div>
            </div>
            <div className='row'>
                <div className='desc'>
                    <div>姓</div>
                    <div>名:</div>
                </div>
                <div className='right'>
                    <MyInput value={this.state.uname} onChange={this.changeUName} placeholder='请输入姓名'></MyInput>
                </div>
            </div>
            <div className='row'>
                <div className='desc'>
                </div>
                <div className='right radio'>
                    <div className='radio-item' onClick={this.changeFlag}>
                        <img src={this.state.gender ? require(`../../../imgs/radio-1.png`):require(`../../../imgs/radio-0.png`)} alt="img"/>
                        <div>先生</div>
                    </div>
                    <div className='radio-item' onClick={this.changeFlag}>
                        <img src={this.state.gender ? require(`../../../imgs/radio-0.png`):require(`../../../imgs/radio-1.png`)} alt="img"/>
                        <div>女士</div>
                    </div>
                </div>
            </div>
            <div className='row'>
                <div className='desc'>
                    <div>手</div>
                    <div>机:</div>
                </div>
                <div className='right'>
                    <MyInput value={this.state.phoneNo} maxLength="11" onChange={this.changePhone} placeholder='请输入手机号'></MyInput>
                </div>
            </div>
            {
                this.state.phoneNo?
                    <div className='row'>
                            <div className='desc'>
                                <div>验</div>
                                <div>证</div>
                                <div>码:</div>
                            </div>
                            <div className='right fr'>
                                <MyInput
                                    placeholder='请输入验证码'
                                    maxLength={6}
                                    value={this.state.validateCode}
                                    onChange={this.changeValidateCode}
                                />
                                <div className="btn_link">
                                    <div className="hori_line"></div>
                                    <a onClick={()=>{this.getPhoneCode()}}>{this.state.leftSecond > 0 ? this.state.leftSecond+'s后获取':'获取验证码'}</a>
                                </div>
                            </div>
                        </div>: null
            }
            
            <div className='agree'>
                <div className='inner'>
                    <img onClick={this.changeSelFlag} src={this.state.agree ? require(`../../../imgs/radio-1.png`):require(`../../../imgs/radio-0.png`)} alt="img"/>
                    <span>我已阅读并接受所有的</span>
                    <span className='file' onClick={() => this.setState({showUser: true})}>《隐私政策》</span>
                </div>
            </div>
            <a onClick={()=>this.downLoad(this.state.info.files)}  className='btn-block'>立即下载</a>
            {/* <a href="http://homesite.ftms.devbmsoft.cn/download.php?files=/vehicle/corolla/download/viso1.pdf" download="haha.pdf" className='btn-block'>立即下载</a> */}
            <div className='divider'>
                <div className='x'></div>
                <img src={require(`../../../imgs/icon-care.png`)} alt="img"/>
                <div className='x'></div>
            </div>
            <div className='info-row'>产品(含具体配置、相关细节等)以经销商展示、销售的适用于中国大陆的具体车型及产品为准。</div>
            <div className='info-row'>本产品网页中提及的所有价格(包括整车、配件、金融产品等)均为厂商建议零售价格。</div>
            <div className='info-row'>厂商建议零售价格仅为建议，不具有任何约束力。</div>
            <div className='info-row'>具体的零售交易价格、产品配置及交易细节请与相关授权经销商协商确定。</div>
            <div className='info-row'>更多详情，敬请莅临一汽丰田授权的当地经销商，或致电400-810-1210。</div>
            <div className='bgpic-title border-b'>
                精彩壁纸(1024*768)
            </div>
            <div className='bgpic-container'>
                {this.state.picList.map((val,index)=>{
                    return val.thumb?<img src={val.thumb} key={'img-'+index} alt="img"/>:null;
                })}
            </div>
            <Gotop></Gotop>
            <UserAgreement show={this.state.showUser} close={() => this.setState({ showUser: false})}></UserAgreement>
          </div>
        )
    }
}

export default DownCenter;
