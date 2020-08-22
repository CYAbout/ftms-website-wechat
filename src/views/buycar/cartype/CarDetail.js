import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast, Modal } from 'antd-mobile';
import { Link } from 'react-router-dom';
import { HTTPGet } from '../../../utils/http';
import { StringFormat } from '../../../utils/util';
import Gotop from '../../../components/common/gotop';
import CompareSide from './components/CompareSide';
import { getAll, add } from '../../../redux/compare.redux';
import config from '../../../config.json';

import './carDetail.less'

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
const jiazhuangMap = {
    rav4: 159,
    corolla: 245,
    vios: 160,
    viosfs: 252,
    prado: 193
}
@connect(
    state => state,
    { getAll, add }
)
class CarDetail extends Component {
    constructor(props) {
        super(props);
        let list = localStorage.getItem('compareList') ? localStorage.getItem('compareList') : '[]';
        list = JSON.parse(list);
        let map = {};
        for (let item of list) {
            map[item.version.id] = item.version.id;
        }
        this.state = {
            pureFlag: false,
            carinfo: {},
            carList: [],
            carouselList: [],
            alias: '',
            aliasMap: {
                'corolla': 'corolla',
                'rav4': 'rav4',
                'viosfs': 'viosfs',
                'vios': 'vios',
                'prado': 'prado',
            },
            topFlag: false,
            versionList: [],
            topversionList: [],
            versionMap: map,
            bottomFlagList: [],
            modalFlag: false,
            imgurl: '',
            cid:''
        };
    }
    componentDidMount() {
        document.title = '车型详情'
    }
    componentWillMount() {
        let alias = this.props.match.params.alias;
        this.getDetailInfo(alias);
    }
    addToCompare(val) {
        let item = {
            carinfo: {
                cid: this.state.carinfo.cid,
                name: this.state.carinfo.carName,
                price: this.state.carinfo.kind,
                alias: this.state.carinfo.carAliasName
            },
            version: val
        }
        if (this.checkId(val.id)) {
            return false;
        }
        let list = localStorage.getItem('compareList') ? localStorage.getItem('compareList') : '[]';
        list = JSON.parse(list);
        if (list.length < 4) {
            list.push(item);
            let str = JSON.stringify(list);
            localStorage.setItem('compareList', str);
            this.setState({
                versionMap: {}
            })
        } else {
            Toast.info('最多只能添加4个', 1);
            return false;
        }
    }
    getDetailInfo(alias) {
        let url = '/api/getCarDetailInfo/' + alias;
        HTTPGet(url).then((result) => {
            console.log(result);
            if (result && result.code == 0 && result.data) {
                let mylist = result.data.proDetailImageUrlList;
                if (mylist) {
                    let list = [];
                    list.push(mylist[0]);
                    list.push(mylist[1]);
                    list.push(mylist[2]);
                    this.setState({
                        carinfo: result.data,
                        carouselList: list,
                        alias: alias,
                    })
                } else {
                    this.setState({
                        carinfo: result.data,
                        alias: alias,
                    })
                }
                this.setState({
                    cid: result.data.cid
                })
                let cid = result.data.cid;
                this.getVersionList(cid,'top');
                let brandurl = `/Website/Car/getMoreCars/alias/${alias}`;
                // 更多车型
                HTTPGet(brandurl).then((ret) => {
                    if (ret && ret.code == 0) {
                        let list = ret.data;
                        let bottomFlagList = [];
                        let carList = [];
                        for (let i in list) {
                            bottomFlagList.push(false);
                            carList.push(list[i]['car_series'][0])
                        }
                        this.setState({
                            carList: carList,
                            bottomFlagList: bottomFlagList
                        })
                    }
                });
            }
        });
    }
    getVersionList(cid,pos = 'bottom') {
        let url = '/Website/Car/getVersion/cid/' + cid;
        HTTPGet(url).then((result) => {
            if (result && result.code == 0) {
                let versionList = result.data;
                if(pos === 'bottom'){
                    this.setState({
                        versionList: versionList,
                    });
                }else{
                    this.setState({
                        versionList: versionList,
                        topversionList: versionList,
                    });
                }
            }
        })
    }
    jumpDown() {
        this.props.history.push('/buycar/cartype/downcenter/' + this.state.carinfo.cid);
    }
    jumpOther(car) {
        if (car.is3d == '1') {
            this.props.history.push(`/3d/${car.alias}`);
        } else {
            let target = `/buycar/cartype/detail/${car.alias}/`;
            this.props.history.push(target);
            this.getDetailInfo(car.alias);
        }
    }
    jumpCompare() {
        this.props.history.push('/buycar/cartype/compare');
    }
    jumpShijia() {
        this.props.history.push('/buycar/shijia?cid=' + this.state.carinfo.cid);
    }
    jump(url) {
        this.props.history.push(url);
    }
    jumpTo() {
        this.props.history.push(`/3d/${this.state.alias}`)
    }
    checkId(id) {
        let list = localStorage.getItem('compareList') ? localStorage.getItem('compareList') : '[]';
        list = JSON.parse(list);
        let flag = false;
        for (let item of list) {
            if (item.version.id == id) {
                flag = true;
                break;
            }
        }
        return flag;
    }
    changeVersionListFlag() {
        let flag = this.state.topFlag;
        this.setState({
            topFlag: !flag
        });
    }
    getBottomFlag() {
        let flag = false;
        if (this.state.bottomFlagList.length > 0) {
            flag = this.state.bottomFlagList.some((val) => val);
        }
        return flag;
    }
    showBottom(index) {
        let cid = this.state.carList[index].cid;
        let url = '/Website/Car/getVersion/cid/' + cid;
        HTTPGet(url).then((result) => {
            if (result && result.code == 0) {
                let list = this.state.bottomFlagList;
                for (let i in list) {
                    if (i == index) {
                        list[i] = !list[i];
                    } else {
                        list[i] = false;
                    }
                }
                let versionList = result.data;
                this.setState({
                    versionList: versionList,
                    bottomFlagList: list
                });
            }
        })
    }
    jumpMall() {
        window.open(`${config.mallServerPath}/details/${this.state.carinfo.productId}`);
    }
    jumpParams() {
        this.props.history.push(`/buycar/cartype/carparams/${this.state.alias}`);
    }
    clearStyle(str) {
        if (!str) {
            return '';
        }
        return str.replace(/<img[^>]*>/gi, function (match) {
            var m = match.replace(/style=\"(.*)\"/gi, '');
            return m;
        });
    }
    showModal(url) {
        window.myModal();
        this.setState({
            modalFlag: true,
            imgurl: url,
        });
    }
    onClose = key => () => {
        window.myModal1();
        this.setState({
            [key]: false,
        });
    }
    // jumpCompare(car){
    //     let list = localStorage.getItem('compareList')?localStorage.getItem('compareList'):'[]';
    //     list = JSON.parse(list);
    //     if(list.length>4){
    //         this.props.history.push('/buycar/cartype/compare');
    //         Toast.info('最多选择4辆车',1);
    //     }else{
    //         let item = {};
    //         if(car){
    //             item = {
    //                 carinfo: car,
    //                 version: ''
    //             }
    //         }else{
    //             item = {
    //                 carinfo: {
    //                     cid: this.state.carinfo.cid,
    //                     name: this.state.carinfo.carName,
    //                     price: this.state.carinfo.kind,
    //                     alias: this.state.carinfo.carAliasName
    //                 },
    //                 version: ''
    //             }
    //         }
    //         list.push(item);
    //         let str = JSON.stringify(list);
    //         localStorage.setItem('compareList',str);
    //         this.props.history.push('/buycar/cartype/compare');
    //     }
    // }
    render() {
        return (
            <div className='car-detail'>
                {/* {this.state.carinfo.isThreeDimensions ? <div className='detail3d' onClick={this.jumpTo.bind(this)}><img src={require(`../../../imgs/modal-show.png`)} alt="img" /></div> : null} */}
                {this.state.carinfo.proImageUrl ? <img src={this.state.carinfo.proImageUrl} className='w-100' alt="img" /> : null}
                <div className='inner'>
                    <div className='info'>
                        {this.state.carinfo.logos ? <img src={this.state.carinfo.logos} className='logo' alt="img" /> : <div></div>}
                        <div className='price'>价格：<span className='lg'>{StringFormat.rangePrice(this.state.carinfo.kind)}</span></div>
                    </div>
                    <div className='btns border-b'>
                        <div className='btn' onClick={() => { this.jumpParams() }}>
                            <img src={require(`../../../imgs/icon-param.png`)} alt="img" />
                            参数配置
                </div>
                        <div className='btn' onClick={() => { this.changeVersionListFlag(); }}>
                            <img src={require(`../../../imgs/icon-plus.png`)} alt="img" />
                            加入对比
                </div>
                    </div>
                    <div className='car-info-outer'>
                        <div className={this.state.topFlag ? 'car-info' : 'car-info hidden'}>
                            <div className='up r'>
                                <div></div>
                            </div>
                            <div className='modal-info'>
                                <div className='list'>
                                    <div>
                                        <ul>
                                            {this.state.topversionList.map((val, index) => {
                                                return <li key={'item-' + index}>
                                                    {this.checkId(val.id) ?
                                                        <img src={require(`../../../imgs/compare-add-lg.png`)} className='img' alt="img" />
                                                        : <img src={require(`../../../imgs/compare-add.png`)} className='img' onClick={() => { this.addToCompare(val); }} alt="img" />
                                                    }
                                                    <div className='detail'>
                                                        <div className='name' dangerouslySetInnerHTML={{ __html: val.version + val.name }}></div>
                                                        <div className='price'>{StringFormat.toCurrency(val['shop_price'])}</div>
                                                    </div>
                                                </li>
                                            })}
                                        </ul>
                                    </div>
                                </div>
                                <div className='tip'>
                                    提示:点击选择增加车型对比
                      </div>
                            </div>
                        </div>
                    </div>
                    <div className='tools fr-a-c'>
                        <div className={jiazhuangMap[this.state.alias] || this.state.carinfo.isHaveBoutique === 1 ? 'item' : 'hidden'}>
                            <div>
                                {
                                    jiazhuangMap[this.state.alias] ? (
                                        <a href={`/buycar/cartype/install/${jiazhuangMap[this.state.alias]}?def=false`}>
                                            <img src={require(`../../../imgs/icon-pure.png`)} alt="img" />
                                        </a>
                                    ) : (
                                            <a href={`/buycar/pureuse?cid=${this.state.carinfo.cid}`}>
                                                <img src={require(`../../../imgs/icon-pure.png`)} alt="img" />
                                            </a>
                                        )
                                }
                            </div>
                            <div className='text'>
                                纯正用品
                    </div>
                        </div>
                        <div className='item'>
                            <div>
                                <a href={"/buycar/newcar?tab=1&cid=" + this.state.carinfo.cid}>
                                    <img src={require(`../../../imgs/icon-calc-secure.png`)} alt="img" />
                                </a>
                            </div>
                            <div className='text'>
                                保险计算器
                    </div>
                        </div>
                        <div className='item'>
                            <div>
                                <a href={"/buycar/financial?tab=1&cid=" + this.state.carinfo.cid}>
                                    <img src={require(`../../../imgs/icon-calc-finace.png`)} alt="img" />
                                </a>
                            </div>
                            <div className='text'>
                                金融计算器
                    </div>
                        </div>
                        <div className='item' onClick={()=>{this.jumpDown();}}>
                            <div>
                                <img src={require(`../../../imgs/icon-down-center.png`)} alt="img"/>
                            </div>
                            <div className='text'>
                                下载中心
                            </div>
                        </div>
                    </div>
                    <div className='title border-b'>
                        车型展示
            </div>
                    <div className='car-carousel'>
                        {this.state.carouselList.length == 3 ?
                            <div className='car-show'>
                                <div className="show-content">
                                    <i className="full-screen" onClick={() => { this.showModal(this.state.carouselList[0]) }}></i>
                                    <img src={this.state.carouselList[0]} alt="img" onClick={() => { this.showModal(this.state.carouselList[0]) }} />
                                </div>
                                <div className='imgs'>
                                    <div className="show-content">
                                        <i className="full-screen small" onClick={() => { this.showModal(this.state.carouselList[1]) }} ></i>
                                        <img src={this.state.carouselList[1]} alt="img" onClick={() => { this.showModal(this.state.carouselList[1]) }} />
                                    </div>
                                    <div className="show-content">
                                        <i className="full-screen small" onClick={() => { this.showModal(this.state.carouselList[2]) }}></i>
                                        <img src={this.state.carouselList[2]} alt="img" onClick={() => { this.showModal(this.state.carouselList[2]) }} />
                                    </div>

                                </div>
                            </div>
                            : null
                        }
                    </div>
                    <div className='advantage border-b'>车型亮点</div>
                    <div className='advantage-item' dangerouslySetInnerHTML={{ __html: this.clearStyle(this.state.carinfo.phoneDetailInfo) }}>
                    </div>
                    {this.state.carList.length > 0 ? <div className='advantage border-b'>更多车型</div> : null}
                </div>
                <div className='xscroll'>
                    {this.state.carList.map((val, index) => {
                        return <div className='item' key={'item-' + index}>
                            <div className='car-tag'>
                                {val.isnew > 0 ? <img src={require(`../../../imgs/modal-new.png`)} alt="img" className='new' /> : <div className='new'></div>}
                                {val.is3d > 0 ? <img src={require(`../../../imgs/modal-show.png`)} alt="img" className='show' /> : <div className='show'></div>}
                            </div>
                            <div className='car-pic'>
                                <img src={val.thumb} onClick={() => { this.jumpOther(val) }} alt="img" />
                            </div>
                            <div className='car-name border-b'>
                                {val.name}
                            </div>
                            <div className='car-price border-b'>
                                {val.price ? '价格:' + StringFormat.rangePrice(val.price) : '价格请咨询当地经销商'}
                            </div>
                            <div className="car-btn">
                                <div  className='car-compare_xq'>
                                    <img src={require('../../../imgs/fwhd-0.png')} alt="" />
                                    <span onClick={() => { this.jumpOther(val) }}>查看详情</span>
                                </div>
                                {/* <div className={'car-compare'} onClick={()=>{this.jumpCompare(val)}}>
                                    对比
                                </div> */}
                                {this.state.bottomFlagList[index] ? 
                                    <div className='car-compare active' onClick={() => { this.showBottom(index) }}>
                                        <img src={require(`../../../imgs/icon-plus-1.png`)} alt="img" />
                                        {/* <span>加入对比</span> */}
                                    </div> 
                                    : 
                                    <div className={this.state.bottomFlagList[index] ? 'car-compare active' : 'car-compare'} onClick={() => { this.showBottom(index) }}>
                                        <img src={require(`../../../imgs/icon-plus.png`)} alt="img" />
                                       {/* <span>加入对比</span> */}
                                    </div>}
                            </div>

                        </div>
                    })}
                </div>
                <div className='car-info-outer'>
                    <div className={this.getBottomFlag() ? 'car-info bottom' : 'car-info bottom hidden'}>
                        <div className='up c'>
                            <div></div>
                        </div>
                        <div className='modal-info'>
                            <div className='list'>
                                <div>
                                    <ul>
                                        {this.state.versionList.map((val, index) => {
                                            return <li key={'item-' + index}>
                                                {this.checkId(val.id) ?
                                                    <img src={require(`../../../imgs/compare-add-lg.png`)} className='img' alt="img" />
                                                    : <img src={require(`../../../imgs/compare-add.png`)} className='img' onClick={() => { this.addToCompare(val); }} alt="img" />
                                                }
                                                <div className='detail'>
                                                    <div className='name' dangerouslySetInnerHTML={{ __html: val.version + val.name }}></div>
                                                    <div className='price'>{StringFormat.toCurrency(val['shop_price'])}</div>
                                                </div>
                                            </li>
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className='tip'>
                                提示:点击选择增加车型对比
                  </div>
                        </div>
                    </div>
                </div>
                <div className='date'>
                    {this.state.carinfo.isThreeDimensions ? <div className='btn' onClick={this.jumpTo.bind(this)}>
                        <img src={require(`../../../imgs/btn_select_3Dicon.png`)} alt="img" />
                        全景看车
                    </div> : null}
                    {/* <img src={require(`../../../imgs/modal-show.png`)} alt="img"/> */}
                    <div className='btn' onClick={() => { this.jumpShijia() }}>
                        <img src={require(`../../../imgs/home-btn4.png`)} alt="img" />
                        预约试驾
                    </div>
                    <div className={this.state.carinfo.isPresell == 1 ? 'btn' : 'hidden'} onClick={() => { this.jumpMall(); }}>
                        <img src={require(`../../../imgs/buy.png`)} alt="img" />
                        立即订购
                </div>
                </div>
                <Modal
                    visible={this.state.modalFlag}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modalFlag')}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div className='car-detail-modal'>
                        <img src={require('../../../imgs/close-2.png')} onClick={this.onClose('modalFlag')} className='close' alt="img" />
                        <img src={this.state.imgurl} className='info' alt="img" />
                    </div>
                </Modal>
                <CompareSide jumpCompare={() => { this.jumpCompare(); }}></CompareSide>
                <Gotop></Gotop>
            </div>
        );
    }
}

export default CarDetail;
