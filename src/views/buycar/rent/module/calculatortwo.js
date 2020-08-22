import React,{ Component } from 'react'
import { Button,Slider,Toast } from 'antd-mobile';
import {MySelect,MyInput} from '../../../../components/dataview'
import {HTTPGet,HTTPPost} from '../../../../utils/http';
import {StringFormat} from '../../../../utils/util';

class Calculatortwo extends Component {
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
      stageList: [],
      stageNum: [''],
      maxFinalPaymentProportion: 100,
      downPaymentProportion: 5,
      finalPaymentProportion: 0,
      leaseInfo: {},
      stageMap:{},
      priceList: {}
    }
  }
  componentWillMount(){
    let renturl = '/api/getLeaseConfig/faw_lease';
    HTTPGet(renturl).then((reuslt)=>{
      if(reuslt && reuslt.code == 0){
        let list = [];
        let map = {};
        for(let item of reuslt.data){
          list.push({label:item.stageNum,value:item.stageNum});
          map[item.stageNum+''] = item;
        }
        this.setState({
          stageList: list,
          stageMap: map
        });
      }
    });
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
    let downPaymentProportion = this.state.stageMap[stageNum[0]].downPaymentProportion;
    let finalPaymentProportion = this.state.stageMap[stageNum[0]].finalPaymentProportion;
    downPaymentProportion = parseInt(downPaymentProportion);
    finalPaymentProportion = parseInt(finalPaymentProportion);
    this.setState({
      stageNum: stageNum,
      finalPaymentProportion:finalPaymentProportion,
      maxFinalPaymentProportion:downPaymentProportion
    });
  }
  getLease(){
    let url = '/api/fawLease';
    if(!this.state.type[0]){
      Toast.info('请选择融资类型',1);
      return false;
    }
    if(!this.state.vehicle[0]){
      Toast.info('请选车型',1);
      return false;
    }
    if(!this.state.version[0]){
      Toast.info('请选择车型配置',1);
      return false;
    }
    if(!this.state.actualPrice){
      Toast.info('请填写实际销售价',1);
      return false;
    }
    if(!this.state.stageNum[0]){
      Toast.info('请选择期限',1);
      return false;
    }
    if(!this.state.downPaymentProportion){
      Toast.info('请选择首付款比例',1);
      return false;
    }
    let data={
      carModelsId: this.state.vehicle[0],
      carVersionId: this.state.version[0],
      // carVersionId: this.state.vehicle[0],
      financingType: this.state.type[0],
      actualPrice: this.state.actualPrice,
      stageNum: this.state.stageNum[0],
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
    },()=>{
      console.log(this.state)
    })
  }
  log = (name) => {
    return (value) => {
      this.onChangeHandle(name,value)
    };
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
            <li className="my-line mb-4" />
            <li>
              <div className="label-box">
                <div className='l label-must'>
                  首款比例：
                </div>
                <div className="r">
                <p><span>{this.state.downPaymentProportion}%</span></p>
                </div>
              </div>
            </li>
            <li className="bili">
            <Slider
              value={this.state.downPaymentProportion}
              min={5}
              max={this.state.maxFinalPaymentProportion}
              onChange={this.log('downPaymentProportion')}
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
              <div className="label-box-nobg">
                <div className='l label-must'>
                  尾款比例：
                </div>
                <div className="r">
                {/* <p><span>{this.state.finalPaymentProportion}%</span></p> */}
                <MyInput
                  placeholder=""
                  value={this.state.finalPaymentProportion?this.state.finalPaymentProportion+'%':''}
                />
                </div>
              </div>
            </li>
            {/* <li className="bili">
            <Slider
              value={this.state.finalPaymentProportion}
              min={0}
              max={100}
              onChange={()=>{}}
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
            </li> */}
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
                计息本金（元）：
                  </div>
                <div className="r res-g">
                  {StringFormat.toCurrency(this.state.leaseInfo.drawThePrincipal)}
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
export default Calculatortwo