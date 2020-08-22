import React,{ Component } from 'react';
import { Button,Slider,Toast } from 'antd-mobile';
import {MySelect,MyInput} from '../../../../components/dataview';
import {HTTPGet,HTTPPost} from '../../../../utils/http';
import {StringFormat} from '../../../../utils/util';

class Calculatorthree extends Component {
  constructor(props) {
    super(props)
    this.state = {
      step:1,
      vehicleList:[],
      vehicle: [''],
      versionList: [],
      version: [''],
      typeList:[
        {label:'直租',value:'1'},
        {label:'回租',value:'2'},
      ],
      type: ['1'],
      actualPrice: '',
      purchaseTax: '',
      premiumFee: '',
      stageNum: [''],
      accountManagementFee: '',
      downPaymentProportion: 0,
      finalPaymentProportion: 0,
      gpsPriceType: ['-1'],
      gpsPriceTypeMap: {
        '0':'厂商项目基础价格',
        '500':'厂商项目1档',
        '1000':'厂商项目2档',
        '1500':'厂商项目3档',
        '2000':'厂商项目4档'
      },
      gpsList: [
        {label:'厂商项目基础价格',value:0},
        {label:'厂商项目1档',value:500},
        {label:'厂商项目2档',value:1000},
        {label:'厂商项目3档',value:1500},
        {label:'厂商项目4档',value:2000},
      ],
      stageList: [
        {
          label: '12',
          value: '12'
        },
        {
          label: '24',
          value: '24'
        },
        {
          label: '36',
          value: '36'
        },
        {
          label: '48',
          value: '48'
        }
      ],
      stageNum: [''],
      leaseInfo: {},
      stageMap:{
        '12':{
          "stageNum": 12,
          "downPaymentProportion": "0", 
          "finalPaymentProportion": "100"
        },
        '24':{
          "stageNum": 24,
          "downPaymentProportion": "0", 
          "finalPaymentProportion": "100"
        },
        '36':{
          "stageNum": 36,
          "downPaymentProportion": "0", 
          "finalPaymentProportion": "100"
        },
        '48':{
          "stageNum": 48,
          "downPaymentProportion": "0", 
          "finalPaymentProportion": "100"
        }
      },
      priceList:{},
    }
  }
  onChangeVehicle(cid){
    let url = '/Website/Car/getVersion/cid/'+cid[0];
    HTTPGet(url).then((reuslt)=>{
      if(reuslt && reuslt.code == 0){
        let list = [];
        let priceList = {};
        for (let item of reuslt.data){
          list.push({label:<span dangerouslySetInnerHTML={{ __html: item.version + item.name }}></span>,value:item.id})
          priceList[item.id] = item['shop_price'];
        }
        this.setState({
          versionList: list,
          vehicle: cid,
          priceList:priceList,
          version: '',
          actualPrice: ''
        });
      }
    });
  }
  onChangeVersion(version){
    let price = this.state.priceList[version[0]];
    this.setState({
      version: version,
      actualPrice: price
    });
  }
  onChangeType(type){
    this.setState({
      type: type
    });
  }
  onChangeStageNum(stageNum){
    // let downPaymentProportion = this.state.stageMap[stageNum[0]].downPaymentProportion;
    // let finalPaymentProportion = this.state.stageMap[stageNum[0]].finalPaymentProportion;
    // downPaymentProportion = parseInt(downPaymentProportion);
    // finalPaymentProportion = parseInt(finalPaymentProportion);
    this.setState({
      stageNum: stageNum
    });
  }
  onChangeGps(gps){
    this.setState({
      gpsPriceType: gps
    });
  }
  getLease(){
    let url = '/api/yiXinLease';
    if(!this.state.type[0]){
      Toast.info('请选择融资类型',1);
      return false;
    }
    if(!this.state.vehicle[0]){
      Toast.info('请选择车型',1);
      return false;
    }
    if(!this.state.version[0]){
      Toast.info('请选择车型配置',1);
      return false;
    }
    if(!this.state.actualPrice){
      Toast.info('请选填写实际销售价',1);
      return false;
    }
    if(!this.state.premiumFee){
      Toast.info('请填写保险金额',1);
      return false;
    }
    if(!this.state.stageNum[0]){
      Toast.info('请选择期限',1);
      return false;
    }
    if(!this.state.downPaymentProportion){
      Toast.info('请选择首付比例',1);
      return false;
    }
    if(!this.state.finalPaymentProportion){
      Toast.info('请选择尾款比例',1);
      return false;
    }
    if(this.state.gpsPriceType[0]=='-1'){
      Toast.info('请选择GPS价格类型',1);
      return false;
    }
    let data={
      carModelsId: this.state.vehicle[0],
      carVersionId: this.state.version[0],
      // carVersionId: this.state.vehicle[0],
      financingType: this.state.type[0],
      actualPrice: this.state.actualPrice,
      purchaseTax: this.state.purchaseTax,
      premiumFee: this.state.premiumFee,
      stageNum: this.state.stageNum[0],
      accountManagementFee: this.state.accountManagementFee,
      gpsPriceType: this.state.gpsPriceTypeMap[this.state.gpsPriceType[0]+''],
      gpsPrice: this.state.gpsPriceType[0],
      downPaymentProportion: this.state.downPaymentProportion,
      finalPaymentProportion: this.state.finalPaymentProportion,
    };
    HTTPPost(url,data).then((reuslt)=>{
      if(reuslt && reuslt.code == 0){
        this.setState({
          leaseInfo: reuslt.data,
          step: 2
        });
      }
    });
  }
  onChangeStep(step) {
    if(step == 2){
      this.getLease();
    }else{
      this.setState({
        step
      })
    }
  }
  onChangeHandle(type,val) {
    this.setState({
      [type]: val
    })
  }
  log = (name) => {
    return (value) => {
      this.onChangeHandle(name,value)
    };
  }
  calcManageFee(){
    if(this.state.actualPrice||this.state.purchaseTax){
      let actualPrice = this.state.actualPrice?this.state.actualPrice:0;
      let purchaseTax = this.state.purchaseTax?this.state.purchaseTax:0;
      let fee = actualPrice*1+purchaseTax*1;
      fee = fee * 0.05;
      if((fee+'').indexOf('.')>-1){
        let arr = (fee+'').split('.');
        fee = arr[0]+'.'+(arr[1]*100+'').substring(0,2);
      }
      return '最大为'+fee;
    }else{
      return '--';
    }
  }
  render() {
    const {step} = this.state
    return (
      <div className='info-box'>
        {step === 1 ?
          <div className="title">
          <span>01</span>
          选择车型输入信息
        </div>
        :
        <div className="title">
          <span>02</span>
          生成金融方案
        </div>
        
        }
        {step === 1 && <div className="one">
          <ul className='info'>
            <li>
              <div className="label-box">
                <div className='l label-must justify'>
                  融资类型
                  </div>：
                <div className="r">
                <MySelect
                  extra="选择融资类型"
                  value={this.state.type}
                  data={this.state.typeList}
                  onChange={(v) => this.onChangeType(v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box">
                <div className='l label-must justify'>
                  车型
                  </div>：
                <div className="r">
                <MySelect
                  extra="选择车型"
                  value={this.state.vehicle}
                  data={this.props.vehicleList}
                  onChange={(v) => this.onChangeVehicle(v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box">
                <div className='l label-must justify'>
                  配置
                  </div>：
                <div className="r">
                <MySelect
                  extra="选择车型配置"
                  value={this.state.version}
                  data={this.state.versionList}
                  onChange={(v) => this.onChangeVersion(v)}
                />
                </div>
              </div>
            </li>
            <li className="my-line mb-4" />
            <li>
              <div className="label-box-nobg">
                <div className='l label-must'>
                  实际销售价(元)：
                  </div>
                <div className="r">
                <MyInput
                  placeholder="系统计算获得，可修改"
                  value={this.state.actualPrice}
                  onChange={(v) => this.onChangeHandle('actualPrice', v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                  购置税(元)：
                  </div>
                <div className="r">
                <MyInput
                  placeholder="请输入购置税"
                  value={this.state.purchaseTax}
                  onChange={(v) => this.onChangeHandle('purchaseTax', v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l label-must'>
                  保险金额(元)：
                  </div>
                <div className="r">
                <MyInput
                  placeholder="请输入保险金额"
                  value={this.state.premiumFee}
                  onChange={(v) => this.onChangeHandle('premiumFee', v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box mt-4">
                <div className='l label-must'>
                  期限 (月)：
                  </div>
                <div className="r">
                <MySelect
                  extra="选择期限"
                  value={this.state.stageNum}
                  data={this.state.stageList}
                  onChange={(v) => this.onChangeStageNum(v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className='manageFee'>{this.calcManageFee()}</div>
              <div className="label-box-nobg">
                <div className='l'>
                  账户管理费（元）：
                  </div>
                <div className="r">
                <MyInput
                  placeholder="请输入账户管理费"
                  value={this.state.accountManagementFee}
                  onChange={(v) => this.onChangeHandle('accountManagementFee', v)}
                />
                </div>
              </div>
            </li>
            <li>
              <div className="label-box label-must mt-4">
                <div className='l label-must'>
                  首付比例：
                </div>
                <div className="r">
                <p><span>{this.state.downPaymentProportion}%</span></p>
                </div>
              </div>
            </li>
            <li className="bili">
            <Slider
              value={this.state.downPaymentProportion}
              min={0}
              max={99}
              onChange={this.log('downPaymentProportion')}
              onAfterChange={this.log('downPaymentProportion')}
              trackStyle={{
                backgroundColor: '#d3b078',
                height: '5px',
              }}
              railStyle={{
                // backgroundColor: 'blue',
                height: '5px',
              }}
              handleStyle={{
                borderColor: '#000',
                borderWidth:'1px',
                height: '14px',
                width: '14px',
                marginLeft: '-7px',
                marginTop: '-4.5px',
                backgroundColor: '#fff',
              }}
            />
            </li>
            <li className="my-line mb-4" />
            <li>
              <div className="label-box">
                <div className='l label-must'>
                  尾款比例：
                </div>
                <div className="r">
                <p><span>{this.state.finalPaymentProportion}%</span></p>
                </div>
              </div>
            </li>
            <li className="bili">
            <Slider
              value={this.state.finalPaymentProportion}
              min={0}
              max={99}
              onChange={this.log('finalPaymentProportion')}
              onAfterChange={this.log('finalPaymentProportion')}
              trackStyle={{
                backgroundColor: '#d3b078',
                height: '5px',
              }}
              railStyle={{
                // backgroundColor: 'blue',
                height: '5px',
              }}
              handleStyle={{
                borderColor: '#000',
                borderWidth:'1px',
                height: '14px',
                width: '14px',
                marginLeft: '-7px',
                marginTop: '-4.5px',
                backgroundColor: '#fff',
              }}
            />
            </li>
            <li className="my-line mb-4" />
            <li>
              <div className="label-box mt-4">
                <div className='l label-must '>
                  GPS价格类型：
                  </div>
                <div className="r">
                <MySelect
                  extra="选择价格类型"
                  value={this.state.gpsPriceType}
                  data={this.state.gpsList}
                  onChange={(v) => this.onChangeGps(v)}
                />
                </div>
              </div>
            </li>
            <li className="my-line mb-4" />
            <li className="my-btn mt-4">
              <Button inline onClick={() => this.onChangeStep(2)}>生成方案</Button>
            </li>
          </ul>
        </div>}
        {step === 2 && <div className="one">
          <ul className='info'>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                实际销售价（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.actualPrice)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                首付金额（元）：
                  </div>
                <div className="r res-r">
                  {StringFormat.toCurrency(this.state.leaseInfo.downPayment)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                尾款比例：
                  </div>
                <div className="r res-g">
                  {this.state.leaseInfo.finalPaymentProportion}%
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                尾款金额（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.finalPayment)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                GPS价格（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.gpsPrice)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                合计融资额（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.financingAmount)}
                </div>
              </div>
            </li>
            <li>
              <div className="label-box-nobg">
                <div className='l'>
                月供（元）：
                  </div>
                <div className="r res-r">
                  {StringFormat.toCurrency(this.state.leaseInfo.monthlyRent)}
                </div>
              </div>
            </li>
          </ul>
        </div>}
        <div className="tishi-b">
          注：以上数据仅供参考，实际支付金额以最终客户贷款合同为准，详情可咨询当地经销商。
        </div>
      </div>
    )
  }
}
export default Calculatorthree