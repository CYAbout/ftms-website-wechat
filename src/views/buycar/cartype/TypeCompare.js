import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getAll,del,preAdd} from '../../../redux/compare.redux';
import {HTTPGet} from '../../../utils/http';
import {StringFormat} from '../../../utils/util';
import Gotop from '../../../components/common/gotop';
import CompareSide from './components/CompareSide';

import './typeCompare.less'

@connect(
    state => state,
    {getAll,del,preAdd}
  )
class TypeCompare extends Component {
  constructor(props) {
    super(props);
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    let flagList = [];
    for(let i in list){
        flagList.push(false);
    }
    this.state = {
      modal: false,
      modal1: false,
      linkName: '',
      compareList: list,
      tempList: [
          '',
          '',
          '',
          ''
      ],
      versionList: [],
      curversion: {},
      flagList: flagList,
      compareDataList: [],
      paramsTitleList: [],
      fixedFlag: false,
      titleFlag: false,
    };
  }
  componentWillMount(){
      this.getCompateInfo();
  }
  componentDidMount(){
    window.addEventListener('scroll', this.scrollMove);
    document.title = '车型对比'
  }
  componentWillUnmount(){
    // 清除定时器，移出监听事件
    window.removeEventListener("scroll",this.scrollMove,false);
  }
  scrollMove = () => {
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    this.setState({
        titleFlag: scrollTop > 80,
    })
  }
  getCompateInfo(){
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    if(list&&list.length>0){
        let flagList = [];
        let idList = [];
        for(let i in list){
            flagList.push(false);
            if(list[i].version){
                idList.push(list[i].version.id);
            }
        }
        if(idList.length>0){
            let url = '/Website/Vehicle/attribute';
            url = url + '?modelIds=' + idList.join(',');
            HTTPGet(url).then((result)=>{
              if(result&&result.code == 0){
                  let paramsTitleList = [];
                  for(let m of result.data){
                      paramsTitleList.push(m.catalog);
                  }
                  this.setState({
                      compareDataList: result.data,
                      paramsTitleList: paramsTitleList,
                      flagList: flagList,
                      compareList: list,
                  });
              }
            });
        }
    }else{
        this.setState({
            compareDataList: [],
            paramsTitleList: [],
            flagList: []
        });
    }
  }
  delItem(index,fix=true){
    let list = localStorage.getItem('compareList');
    list = JSON.parse(list);
    let flagList = this.state.flagList;
    list.splice(index,1);
    flagList.splice(index,1);
    if(!fix){
        let str = JSON.stringify(list);
        localStorage.setItem('compareList',str);
        this.setState({
          compareList: list,
          flagList: flagList,
          fixedFlag: false
        },()=>{
            this.getCompateInfo();
        });
    }else{
        let str = JSON.stringify(list);
        localStorage.setItem('compareList',str);
        this.setState({
          compareList: list,
          flagList: flagList
        },()=>{
            this.getCompateInfo();
        });
    }
  }
  showSelect(index){
      let flag = this.state.modal;
      flag = !flag;
      let url = '/Website/Car/getVersion/cid/'+this.state.compareList[index].carinfo.cid;
      let version = this.state.compareList[index].version.id;
      let flagList = this.state.flagList;
      for(let i in flagList){
        if(i == index){
            flagList[i] = !flagList[i];
        } else {
            flagList[i] = false;
        }
      }
      HTTPGet(url).then((result)=>{
          if(result && result.code == 0){
              this.setState({
                  modal:flag,
                  versionList:result.data,
                  curversion: version,
                  flagList: flagList
              });
          }
      });
  }
  showModal(){
    let flag1 = this.state.modal1;
    flag1 = !flag1;
    this.setState({
        modal1: flag1
    });
  }
  changeLink(val){
    this.setState({
        linkName: val
    });
  }
  jumpIndex(){
    this.props.history.push('/buycar/cartype');
  }
  openModal(){
      this.compareSide.showModal();
  }
  chooseVersion(versionindex,id){
    let flagList = this.state.flagList;
    let index = 0;
    for(let i in flagList){
        if(flagList[i]){
            index = i;
            break;
        }
    }
    let version = this.state.versionList[versionindex];
    let compareList = this.state.compareList;
    for(let item of compareList){
        if(item.version&&item.version.id == id){
            return false;
        }
    }
    compareList[index].version = version;
    flagList[index] = false;
    let str = JSON.stringify(compareList);
    localStorage.setItem('compareList',str);
    this.setState({
        compareList: compareList,
        flagList:flagList
    },()=>{
        this.getCompateInfo();
    });
  }
  fix(index){
      if(index !=0){
        let list = this.state.compareList.map(val=>val);
        let flagList = this.state.flagList;
        let item = list[index];
        list.splice(index,1);
        list.unshift(item);
        flagList.splice(index,1);
        flagList.unshift(false);
        let str = JSON.stringify(list);
        localStorage.setItem('compareList',str);
        this.setState({
            compareList: list,
            flagList: flagList,
            fixedFlag:true
        },()=>{
            setTimeout(() => {
                this.getCompateInfo();
            }, 100);
        });
      }else{
          this.setState({
            fixedFlag:true
          });
      }
  }
  resetFix(){
      this.setState({
        fixedFlag:false
      });
  }
  myscroll=(base,follow)=>()=>{
    let left = document.getElementById(base).scrollLeft;
    document.getElementById(follow).scrollLeft = left;
  }
  closeCallback(){
    this.getCompateInfo();
  }
  onRef = (ref) => {
    this.compareSide = ref
  }
  checkId(id){
    let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    list = JSON.parse(list);
    if(list.length===0){
      return false;
    }
    let flag = false;
    for(let i in list){
      let item = list[i]
      if(item.version.id == id){
        flag = true;
        break;
      }
    }
    return flag;
  }
  render() {
    return (
      <div 
    //   className={this.state.titleFlag ? 'to-fixed-box typeCompare' : 'typeCompare'}
      className='typeCompare'

      >
        <div 
            // className='fixed-title-compare'
            className='to-fixed-box fixed-title-compare'
        >
            {/* <div className='top-title border-b' >
            车型对比
            </div> */}
            <div className='xscroll comparetitle' >
                <div 
                    className=' data-container fixed'
                    // className='data-container fixed'
                >
                    <div className='left'>
                        <div className='row'>
                            <div className='l fill'></div>
                            <div>标配</div>
                        </div>
                        <div className='row'>
                            <div className='l clip'></div>
                            <div>选配</div>
                        </div>
                        <div className='row'>
                            <div className='l'>-</div>
                            <div>无</div>
                        </div>
                    </div>
                    {this.state.fixedFlag&&this.state.compareList[0]&&this.state.compareList[0].carinfo&&this.state.compareList[0].version?<div className='right fill'>
                        <div className='top'>
                            <div className='close'>
                                <img src={require(`../../../imgs/close-outer.png`)} onClick={()=>{this.delItem(0,false)}} alt="img"/>
                            </div>
                            <div className='name'>{this.state.compareList[0].carinfo.name}</div>
                            <div className='price'>
                                <span><span>价格:</span><span>{StringFormat.toCurrency(this.state.compareList[0].version['shop_price'])}</span></span>
                            </div>
                            <div className='sel' onClick={()=>{this.showSelect(0)}}>
                                {this.state.compareList[0].version?<div dangerouslySetInnerHTML={{__html:this.state.compareList[0].version.version+this.state.compareList[0].version.name}}></div>:
                                    <div className='font-red'>选择版本对比</div>}
                                <img src={require(`../../../imgs/down-1.png`)} className={this.state.flagList[0]?'rotate':''} alt="img"/>
                            </div>
                        </div>
                        <div className='bottom' onClick={()=>{this.resetFix()}}>取消固定</div>
                    </div>:null}
                </div>
                <div className='data-container to-scroll-t' id='comparetitle' onScroll={this.myscroll('comparetitle','compareinfo')}>
                    <div className='left'>
                        <div className='row'>
                            <div className='l fill'></div>
                            <div>标配</div>
                        </div>
                        <div className='row'>
                            <div className='l clip'></div>
                            <div>选配</div>
                        </div>
                        <div className='row'>
                            <div className='l'>-</div>
                            <div>无</div>
                        </div>
                    </div>
                    {this.state.tempList.map((item,index)=>{
                        let val = this.state.compareList[index];
                        return (
                            val&&val.carinfo ?   <div className='right fill' key={'item-'+index}>
                                        <div className='top'>
                                            <div className='close'>
                                                <img src={require(`../../../imgs/close-outer.png`)} onClick={()=>{this.delItem(index)}} alt="img"/>
                                            </div>
                                            <div className='name'>{val.carinfo.name}</div>
                                            <div className='price'>
                                                <span><span>价格:</span><span>{val.version?StringFormat.toCurrency(val.version['shop_price']):''}</span></span>
                                            </div>
                                            <div className='sel' onClick={()=>{this.showSelect(index)}}>
                                                {val.version?<div dangerouslySetInnerHTML={{__html:val.version.version+val.version.name}}></div>:
                                                    <div className='font-red'>选择版本对比</div>}
                                                <img src={require(`../../../imgs/down-1.png`)} className={this.state.flagList[index]?'rotate':''} alt="img"/>
                                            </div>
                                        </div>
                                        <div className='bottom' onClick={()=>{this.fix(index)}}>固定在左侧</div>
                                    </div>
                                :
                                    <div className='right null' onClick={()=>{this.openModal();}} key={'item-'+index}>
                                        <img src={require(`../../../imgs/compare-add-lg.png`)} className='add' alt="img"/>
                                        <div className='tip'>
                                        添加车型
                                        </div>
                                    </div>
                        )
                    })}
                </div>
                <div className={this.state.flagList.some(val=>val)?'sel-ref':'sel-ref hidden'}>
                    <div className='up'>
                        <div></div>
                    </div>
                    <div className='container'>
                        <ul>
                            {this.state.versionList.map((version,versionindex)=>{
                                if(version.id == this.state.curversion){
                                    return  <li key={'version-'+versionindex} className='active'>
                                                <div className='l' dangerouslySetInnerHTML={{__html:version.version+version.name}}></div>
                                                <div className='r b'>{StringFormat.toCurrency(version['shop_price'])}</div>
                                            </li>
                                }else if(this.checkId(version.id)){
                                    return  <li key={'version-'+versionindex} className='disable'>
                                                <div className='l' dangerouslySetInnerHTML={{__html:version.version+version.name}}></div>
                                                <div className='r b'>{StringFormat.toCurrency(version['shop_price'])}</div>
                                            </li>
                                }else{
                                    return  <li key={'version-'+versionindex} onClick={()=>{this.chooseVersion(versionindex,version.id)}}>
                                                <div className='l' dangerouslySetInnerHTML={{__html:version.version+version.name}}></div>
                                                <div className='r b'>{StringFormat.toCurrency(version['shop_price'])}</div>
                                            </li>
                                }
                            })}
                        </ul>
                    </div>
                </div>
            </div>
            {this.state.compareDataList.length>0?<div className='base-param border-b absolute'>
                <div className='l'>基本参数</div>
                <div className='r' onClick={()=>{this.showModal()}}>
                    <img src={require(`../../../imgs/down-yellow.png`)} className={this.state.modal1 ? 'add rotate':'add'} alt="img"/>
                </div>
            </div>:null}
            {this.state.compareDataList.length>0?<div className='base-param border-b'>
                <div className='l'>&nbsp;</div>
            </div>:null}
            {/* <div className='base-param border-b absolute'>
                <div className='l'>基本参数</div>
                <div className='r' onClick={()=>{this.showModal()}}>
                    <img src={require(`../../../imgs/down-yellow.png`)} className={this.state.modal1 ? 'add rotate':'add'} alt="img"/>
                </div>
            </div>
            <div className='base-param border-b'>
                <div className='l'>&nbsp;</div>
            </div> */}
            <div style={{position:'relative',width:'100%'}}>
                <div className={this.state.modal1 ? 'half-modal':'hidden'}>
                    <div className='container'>
                        {this.state.paramsTitleList.map((val,index)=>{
                            if(index === 0){
                                return <a href='#' key={'title-'+index} className={this.state.linkName == val? 'item mt-3 active': 'item mt-3'} onClick={()=>{this.showModal();this.changeLink(val)}}>{val}</a>
                            }else{
                                return <a href={'#comparetitle-'+index} key={'title-'+index} className={this.state.linkName == val? 'item mt-3 active': 'item mt-3'} onClick={()=>{this.showModal();this.changeLink(val)}}>{val}</a>
                            }
                        })}
                    </div>
                </div>
            </div>
        </div>
        <div className='block'></div>
        <div className='xscroll compareinfo' >
            <div style={{position: 'absolute'}}>
            {this.state.compareDataList.map((val,index)=>{
                return <div key={'compare-'+index}>
                    <div className='subtitle pos' id={'comparetitle-'+index}>{val.catalog}</div>
                    <div className={this.state.fixedFlag?'table fixed2':'table fixed1'}>
                    {val.params.map((item,itemindex)=>{
                        return (
                            <div className='tr' key={'compare-'+index+itemindex}>
                                <div className='th'><div className='text-l' dangerouslySetInnerHTML={{__html:item.name}}></div></div>
                                {this.state.tempList.map((inner,innerindex)=>{
                                    let myinfo = item.value[innerindex]
                                    if(myinfo){
                                        if(myinfo === '有'){
                                            return <div className='td' key={'compare-'+index+itemindex+innerindex}><div className='fill'></div></div>
                                        }else if(myinfo === '无'){
                                            return <div className='td' key={'compare-'+index+itemindex+innerindex}><div>-</div></div>
                                        }else{
                                            return <div className='td' key={'compare-'+index+itemindex+innerindex}><div dangerouslySetInnerHTML={{__html:myinfo}}></div></div>
                                        }
                                    } else {
                                        return <div className='td' key={'compare-'+index+itemindex+innerindex}><div>&nbsp;</div></div>
                                    }
                                })}
                            </div>
                        )
                    })}
                    </div>
                </div>
            })}
            </div>
            <div id='compareinfo' onScroll={this.myscroll('compareinfo','comparetitle')}>
            {this.state.compareDataList.map((val,index)=>{
                return <div key={'compare-'+index}>
                    <div className='subtitle'>&nbsp;</div>
                    <div className='table xscroll'>
                    {val.params.map((item,itemindex)=>{
                        return (
                            <div className='tr' key={'compare-'+index+itemindex}>
                                <div className='th myhide'><div className='text-l' dangerouslySetInnerHTML={{__html:item.name}}></div></div>
                                {this.state.tempList.map((inner,innerindex)=>{
                                    let myinfo = item.value[innerindex]
                                    if(myinfo){
                                        if(myinfo === '有'){
                                            return <div className='td' key={'compare-'+index+itemindex+innerindex}><div className='fill'></div></div>
                                        }else if(myinfo === '无'){
                                            return <div className='td' key={'compare-'+index+itemindex+innerindex}><div>-</div></div>
                                        }else{
                                            return <div className='td' key={'compare-'+index+itemindex+innerindex}><div dangerouslySetInnerHTML={{__html:myinfo}}></div></div>
                                        }
                                    } else {
                                        return <div className='td' key={'compare-'+index+itemindex+innerindex}><div>&nbsp;</div></div>
                                    }
                                })}
                            </div>
                        )
                    })}
                    </div>
                </div>
            })}
            </div>
        </div>
        <div className='null-block'></div>
        <Gotop></Gotop>
        <CompareSide closeCallback={()=>{this.closeCallback()}} onRef={this.onRef}></CompareSide>
      </div>
    );
  }
}

export default TypeCompare;
