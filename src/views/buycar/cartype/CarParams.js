import React, { Component } from 'react';

import {HTTPGet} from '../../../utils/http';

import './carParams.less';

class CarParams extends Component{
    constructor(props) {
        super(props);
        this.state = {
          paramInfo: [],
          alias: '',
          tableLen:{
              width: '100%'
          },
          fixedRow:{},
        };
      }
    componentWillMount(){
        let alias = this.props.match.params.alias;
        this.getDetailInfo(alias);
    }
    getDetailInfo(alias){
        let url = '/api/getCarDetailInfo/'+alias;
        HTTPGet(url).then((result)=>{
            console.log(result);
            if(result&&result.code == 0 && result.data){
                let cfglist = result.data.configuration;
                let tableLen = (19+25*(cfglist.length))/10;
                let mylist = [];
                for(let m in cfglist[0].spec){
                    let item = cfglist[0].spec[m];
                    let temp = {title:'',list:[]};
                    temp.title = item.catalog;
                    for(let n in item.params){
                        let temp1 = {title:'',list:[]};
                        temp1.title = item.params[n].name;
                        temp1.list[0] = item.params[n].txt;
                        temp.list[n] = temp1;
                    }
                    mylist[m] = temp;
                }
                let list0 = {title:'基本参数',list:[]};
                let nameList = [];
                let priceList = [];
                for(let k in cfglist){
                    nameList.push(cfglist[k].name);
                    priceList.push(cfglist[k].price);
                    for(let m in cfglist[k].spec){
                        let item = cfglist[k].spec[m];
                        for(let n in item.params){
                            mylist[m].list[n].list[k] = item.params[n].txt;
                        }
                    }
                }
                list0.list.push({title:'型号',list:nameList});
                list0.list.push({title:'参考价(元)',list:priceList});
                // mylist.unshift(list0);
                this.setState({
                    paramInfo: mylist,
                    alias:alias,
                    tableLen:{width: tableLen+'rem'},
                    fixedRow:list0
                })
            }
        });
    }
    myScroll=(base,follow)=>()=>{
        let left = document.getElementById(base).scrollLeft;
        document.getElementById(follow).scrollLeft = left;
    }
    goBack() {
        this.props.history.push('/buycar/cartype/detail/' + this.state.alias);
    }
    render(){
        return (
            <div className='car-params'>
                <div className='fixed-title'>
                    <div className='title-lg'>
                    <p onClick={this.goBack.bind(this)}><i></i>车型详情</p>
                        参数配置
                    </div>
                    {this.state.fixedRow.title?<div className='xscroll fixed-param'>
                        <div className='subtitle absolute'>
                            {this.state.fixedRow.title}
                        </div>
                        <div className='subtitle'>
                            &nbsp;
                        </div>
                        <div className='table'>
                            {this.state.fixedRow.list.map((inner,innerindex)=>{
                                return (
                                    <div className='tr' key={'inner-'+innerindex}>
                                        <div className='th' dangerouslySetInnerHTML={{__html:inner.title}}></div>
                                        {inner.list.map((deep,deepindex)=>{
                                            if(deep == '有'){
                                                return (
                                                    <div className='td' key={'item-'+deepindex}><div className='fill'></div></div>
                                                )
                                            }else if(deep == '无'){
                                                return (
                                                    <div className='td' key={'item-'+deepindex}><div>-</div></div>
                                                )
                                            }else{
                                                return (
                                                    <div className='td' key={'item-'+deepindex}><div dangerouslySetInnerHTML={{__html:deep}}></div></div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>:null}
                    {this.state.fixedRow.title?<div className='xscroll def' id='scrolltitle' onScroll={this.myScroll('scrolltitle','scrollinfo')}>
                        <div className='subtitle'>
                            {this.state.fixedRow.title}
                        </div>
                        <div className='table' style={this.state.tableLen}>
                            {this.state.fixedRow.list.map((inner,innerindex)=>{
                                return (
                                    <div className='tr' key={'inner-'+innerindex}>
                                        <div className='th myhide' dangerouslySetInnerHTML={{__html:inner.title}}></div>
                                        {inner.list.map((deep,deepindex)=>{
                                            if(deep == '有'){
                                                return (
                                                    <div className='td' key={'item-'+deepindex}><div className='fill'></div></div>
                                                )
                                            }else if(deep == '无'){
                                                return (
                                                    <div className='td' key={'item-'+deepindex}><div>-</div></div>
                                                )
                                            }else{
                                                return (
                                                    <div className='td' key={'item-'+deepindex}><div dangerouslySetInnerHTML={{__html:deep}}></div></div>
                                                )
                                            }
                                        })}
                                    </div>
                                )
                            })}
                        </div>
                    </div>:null}
                </div>
                <div style={{height:'4rem'}}></div>
                <div className='xscroll fixed-param fixed-param-zindex'>
                    {this.state.paramInfo.map((val,index)=>{
                        return (
                            <div key={'t-'+index}>
                                <div className='subtitle absolute'>
                                    {val.title}
                                </div>
                                <div className='subtitle'>
                                    &nbsp;
                                </div>
                                <div className='table'>
                                    {val.list.map((inner,innerindex)=>{
                                        return (
                                            <div className='tr' key={'inner-'+innerindex}>
                                                <div className='th' dangerouslySetInnerHTML={{__html:inner.title}}></div>
                                                {inner.list.map((deep,deepindex)=>{
                                                    if(deep == '有'){
                                                        return (
                                                            <div className='td' key={'item-'+deepindex}><div className='fill'></div></div>
                                                        )
                                                    }else if(deep == '无'){
                                                        return (
                                                            <div className='td' key={'item-'+deepindex}><div>-</div></div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className='td' key={'item-'+deepindex}><div dangerouslySetInnerHTML={{__html:deep}}></div></div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='xscroll def' id='scrollinfo' onScroll={this.myScroll('scrollinfo','scrolltitle')}>
                    {this.state.paramInfo.map((val,index)=>{
                        return (
                            <div key={'t-'+index}>
                                <div className='subtitle'>
                                    &nbsp;
                                </div>
                                <div className='table' style={this.state.tableLen}>
                                    {val.list.map((inner,innerindex)=>{
                                        return (
                                            <div className='tr' key={'inner-'+innerindex}>
                                                <div className='th myhide' dangerouslySetInnerHTML={{__html:inner.title}}></div>
                                                {inner.list.map((deep,deepindex)=>{
                                                    if(deep == '有'){
                                                        return (
                                                            <div className='td' key={'item-'+deepindex}><div className='fill'></div></div>
                                                        )
                                                    }else if(deep == '无'){
                                                        return (
                                                            <div className='td' key={'item-'+deepindex}><div>-</div></div>
                                                        )
                                                    }else{
                                                        return (
                                                            <div className='td' key={'item-'+deepindex}><div dangerouslySetInnerHTML={{__html:deep}}></div></div>
                                                        )
                                                    }
                                                })}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>
                <div className='null-block'></div>
            </div>
        )
    }
}

export default CarParams;
