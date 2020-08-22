import React, { Component } from 'react';
import { connect } from 'react-redux';

import {getAll} from '../../../../redux/compare.redux';
import { Modal,Icon,Toast } from 'antd-mobile';
import { HTTPGet } from '../../../../utils/http';
import {StringFormat} from '../../../../utils/util';

import './compareSide.less';

function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

@connect(
    state => state,
    {getAll}
)
class CompareSide extends Component{
    constructor(props) {
        super(props);
        let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
        list = JSON.parse(list);
        this.state = {
            compareFlag: false,
            compareList: list,
            step: 1,
            typeList: [],
            versionList: [],
            carinfo: {},
            version: {},
        };
    }
    componentDidMount(){
        if(this.props.onRef){
            this.props.onRef(this)
        }
    }
    closeModal = (e,value)=>{
        e.preventDefault();
        e.stopPropagation(); 
        let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
        list = JSON.parse(list);
        let flag = this.state.compareFlag;
        if(!flag){
            window.myModal();
        }else{
            window.myModal1();
        }
        this.setState({
            compareFlag: !flag,
            compareList: list,
        });

    }
    showModal(){
        let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
        list = JSON.parse(list);
        window.myModal();
        this.setState({
            compareFlag: true,
            compareList: list,
        });
    }
    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
            return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
            e.preventDefault();
        }
    }
    delItem(index){
        let list = localStorage.getItem('compareList');
        list = JSON.parse(list);
        list.splice(index,1);
        let str = JSON.stringify(list);
        localStorage.setItem('compareList',str);
        this.setState({
            compareList: list
        });
    }
    delAll(){
        localStorage.setItem('compareList','[]');
        this.setState({
            compareList: []
        });
    }
    startCompare(){
        let list = this.state.compareList;
        if(list.length>1){
            this.props.jumpCompare();
        }else{
            Toast.info('请至少选择两辆车进行对比',1);
        }
    }
    // true下一步 false上一步
    changeStep(flag = true){
        let step = this.state.step;
        if(flag){
            step ++;
            if( step>3){
                step = 1;
            }
            this.setState({step:step});
        }else{
            step--;
            if(step < 1){
                return false;
            }
            this.setState({step:step});
        }
    }
    getTypeList(){
        let typeList = this.state.typeList;
        if(typeList&&typeList.length>0){
            this.changeStep();
            return false;
        }
        HTTPGet('/Website/Car/brandModels').then((result) => {
            if (result && result.code == 0) {
                let list = result.data
                this.setState({
                    typeList: list,
                    step:2,
                })
            }
        })
    }
    selectCar(car){
        let url = '/Website/Car/getVersion/cid/'+car.cid;
        HTTPGet(url).then((result)=>{
        if(result && result.code == 0){
            let versionList = result.data;
            this.setState({
                versionList: versionList,
                carinfo: car,
                step:3,
            });
          }
        })
    }
    selectVersion(version){
        let item = {
            carinfo: this.state.carinfo,
            version: version
          }
          let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
          list = JSON.parse(list);
          let flag = list.some((val)=>{
            return (val.version.id+'') === (version.id+'')
          });
          if(flag){
            Toast.info('不能选择重复的版本',1);
            return false;
          }
          if(list.length<4){
            list.push(item);
            let str = JSON.stringify(list);
            localStorage.setItem('compareList',str);
            this.setState({
                compareList:list,
                step:1,
            })
          }else{
            Toast.info('最多只能添加4个',1);
            return false;
          }
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
    render(){
        return (
            <div>
                <div className={this.props.closeCallback?'fix-btn-type hide':'fix-btn-type'} onClick={(e)=>this.closeModal(e,'modal1')}>
                    <div className='arrow'>
                    <Icon type='left'></Icon>
                    </div>
                    <div className='circle'>VS</div>
                    <div className='text'>
                        <div>车型</div>
                        <div>对比</div>
                    </div>
                </div>
                <Modal
                visible={this.state.compareFlag}
                transparent
                maskClosable={true}
                onClose={(e)=>{
                    this.closeModal(e,'compareFlag')
                }}
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                wrapClassName='modal-tr'
                >
                    <div className='compare-container'>
                        {this.state.step === 1&&<div>
                            <div className='compare-title'>
                            车型对比
                            </div>
                            {this.state.compareList.map((val,index)=>{
                            return <div className='compare-item' key={'compare-item-'+index}>
                                    <div className='inner'>
                                        <div>
                                        <div className='name'>{val.carinfo.name}</div>
                                        <div className='type' dangerouslySetInnerHTML={{__html:val.version.version+val.version.name}}></div>
                                        </div>
                                        <div onClick={()=>{this.delItem(index)}}>
                                        <Icon type='cross'></Icon>
                                        </div>
                                    </div>
                                    </div>
                            })}
                            {this.state.compareList.length<4&&<div className='compare-item'>
                                <div className='inner-add' onClick={()=>{this.getTypeList()}}>
                                    <div>添加车型</div>
                                    <div><img src={require(`../../../../imgs/add-crose.png`)} alt="img"/></div>
                                </div>
                            </div>}
                            <div className='compare-item'>
                                <div className='inner-last'>
                                    <div className='l'>
                                    最多可选4个
                                    </div>
                                    <div className='r' onClick={()=>{this.delAll()}}>
                                    <img src={require(`../../../../imgs/clear.png`)} alt="img"/>
                                    <span>清空</span>
                                    </div>
                                </div>
                            </div>
                            <div className='compare-btn' onClick={(e)=>{
                                e.stopPropagation(); 
                                if(this.props.closeCallback){
                                    this.setState({
                                        compareFlag: false
                                    },()=>{
                                        window.myModal1();
                                        this.props.closeCallback();
                                    })
                                }else{
                                    this.startCompare();
                                }
                            }}>
                            开始比对
                            </div>
                        </div>}
                        {this.state.step === 2&&<div>
                            <div className='compare-title flex'>
                                <div onClick={()=>{this.changeStep(false)}}>
                                    <img src={require(`../../../../imgs/tab-icon-l.png`)} alt="img"/>
                                </div>
                                <div className='grow'>
                                选择车型
                                </div>
                            </div>
                            {this.state.typeList.map((val,index)=>{
                                let list = val['car_series'];
                                return <div key={'type-'+index}>
                                    <div className='compare-item'>
                                        <div className='inner-text'>
                                            {val.title}
                                        </div>
                                    </div>
                                    {list.length>0&&list.map((innerval,innerid)=>{
                                        return <div className='compare-item' key={'type-inner-'+innerid}>
                                            <div className='inner-text content' onClick={()=>{this.selectCar(innerval)}}>
                                                {innerval.name}
                                            </div>
                                        </div>
                                    })}
                                </div>
                            })}
                        </div>}
                        {this.state.step === 3&&<div>
                            <div className='compare-title flex'>
                                <div onClick={()=>{this.changeStep(false)}}>
                                    <img src={require(`../../../../imgs/tab-icon-l.png`)} alt="img"/>
                                </div>
                                <div className='grow'>
                                选择版本
                                </div>
                            </div>
                            {this.state.versionList.map((val,index)=>{
                                return <div key={'type-'+index}>
                                    <div className='compare-item'>
                                        {this.checkId(val.id)?<div className='inner-version'>
                                            <div className='carName disable' dangerouslySetInnerHTML={{__html:val.version+val.name}}></div>
                                            <div className='price'>{StringFormat.toCurrency(val['shop_price'])}</div>
                                        </div>:<div className='inner-version' onClick={()=>{this.selectVersion(val)}}>
                                            <div className='carName' dangerouslySetInnerHTML={{__html:val.version+val.name}}></div>
                                            <div className='price'>{StringFormat.toCurrency(val['shop_price'])}</div>
                                        </div>}
                                    </div>
                                </div>
                            })}
                        </div>}
                        <div className='arrow' onClick={(e)=>this.closeModal(e,'modal1')}>
                            <Icon type='right'></Icon>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
export default CompareSide;
