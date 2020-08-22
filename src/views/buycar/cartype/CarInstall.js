import React, { Component } from 'react';
import { Modal } from 'antd-mobile';
import { HTTPGet } from '../../../utils/http';
import { StringFormat } from '../../../utils/util';
import Gotop from '../../../components/common/gotop';
import './carInstall.less';

const wzText = 'Exterior'
const returnKey = 'Common'
//储存旋转汽车图片
let catArrt = [
    //0：荣放
    [
        require('../../../imgs/chexingimg/rav4_boutique/D0W.png'),
        require('../../../imgs/chexingimg/rav4_boutique/D180W.png'),
        require('../../../imgs/chexingimg/rav4_boutique/D360W.png')
    ],
    //1：卡罗拉
    [
        require('../../../imgs/chexingimg/kaluola_boutique/D0C.png'),
        require('../../../imgs/chexingimg/kaluola_boutique/D360C.png'),
        require('../../../imgs/chexingimg/kaluola_boutique/D180C.png')
    ],
    //2：全新威驰
    [
        require('../../../imgs/chexingimg/weichi_boutique/D0A.png'),
        require('../../../imgs/chexingimg/weichi_boutique/D360A.png'),
        require('../../../imgs/chexingimg/weichi_boutique/D180A.png')
    ],
    //3：威驰
    [
        require('../../../imgs/chexingimg/vios_fs/chexingpeijian/D0B.png'),
        require('../../../imgs/chexingimg/vios_fs/chexingpeijian/D360B.png'),
        require('../../../imgs/chexingimg/vios_fs/chexingpeijian/D180B.png')
    ],
    //4：普拉多
    [
        require('../../../imgs/chexingimg/puladuo_boutique/D0B.png'),
        require('../../../imgs/chexingimg/puladuo_boutique/D180B.png'),
        require('../../../imgs/chexingimg/puladuo_boutique/D360B.png')
    ]
    
    
]

//储存内容和缩略图图片
let decorateArrt = [
    /*---------------------------------------rav4-----------------------------------------------*/
    [
        {
            title: '',  //表达题名字
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_2.png'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,//falsh代码这个角度没有该装饰
                {
                    vec3Transform: [2.15, 2.55, 0.55],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/dadengpj_img.png'),//当前角度的装饰图片
                }, false
            ]
        },
        {
            title: '尾灯装饰罩 PZD38-0R015',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/houchedeng.jpg'),
            status: false,
            angle: [
                false,
                false, {
                    vec3Transform: [0.84, 2.99, 2.5],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind_1_3.png'),
                }
            ]
        },
        {
            title: '侧门踏板 PZD50-0R030',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_4.png'),
            status: false,
            angle: [
                false,
                {
                    vec3Transform: [2.3, 4.25, 1.5],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_1_4.png'),
                }, {
                    vec3Transform: [2.2, 0.56, 1.5],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind_1_8.png'),
                }
            ]
        },
        {
            title: '车窗侧挡雨板 PZD33-0R020',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_5.png'),
            status: false,
            angle: [
                false,
                {
                    vec3Transform: [0.19, 4.4, 1.1],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_1_5.png'),
                }, {
                    vec3Transform: [0.28, 0.9, 1.72],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind1_5.png'),
                }
            ]
        },
        {
            title: '车身彩贴 PZD35-0R030',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_3.png'),
            status: false,
            angle: [
                false,
                {
                    vec3Transform: [0.8, 4, 2.4],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_front_1_3.png'),
                }, {
                    vec3Transform: [0.97, 0.48, 2.36],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/wzjp_behind_1_7.png'),
                }
            ]
        },
        {
            title: '挡泥板 PZD44-0R050',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/dangniban.jpg'),
            status: false,
            angle: [
                false,
                false, {
                    vec3Transform: [2.32, 2.85, 0.3],
                    decorate: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/dangniban.png'),
                }
            ]
        },
        {
            title: '轮毂（17寸） PZD40-0R001',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/20270423.jpg'),
            status: false,
            angle: false
        },
        {
            title: '前保险杠扰流板    PZD30-0R050',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/rav4-img1.jpg'),
            status: false,
            angle: false
        },
        {
            title: '后保险杠扰流板    PZD30-0R051',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/rav4-img2.jpg'),
            status: false,
            angle: false
        },
        {
            title: '后门踏板护板    PZD51-0R041',
            pic: require('../../../imgs/chexingimg/rav4_boutique/chexingpeijian/rav4-img3.jpg'),
            status: false,
            angle: false
        }
    ],

    //--------------------------------------卡罗拉--------------------------------------
    [
        {
            title: '排气管尾喉    PZD47-02004',  //表达题名字
            pic: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_5.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [2.55, 5.6, 0.5],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_5_c01.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '鲨鱼鳍    PZD34-02001',  //表达题名字
            pic: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_4.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [0.49, 3.8, 0.2],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_4_c01A.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '行李箱装饰条    PZD38-02070',  //表达题名字
            pic: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_3.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.82, 5.15, 0.9],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_3_c01.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '车窗侧挡雨板    PZD33-02030',  //表达题名字
            pic: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_front_big_2.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,//falsh代码这个角度没有该装饰
                {
                    vec3Transform: [0.45, 3.96, 1.35],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/kaluola_boutique/chexingpeijian/wzjp_Middle1_1.png'),//当前角度的装饰图片
                }, false
            ]
        },
    ],

    //--------------------------------------全新威驰--------------------------------------
    [
        {
            title: '前格栅装饰条    PZD39-0D030',  //表达题名字
            pic: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_2.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.93, 0.8, 2.15],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/xiantiao_img.png'),//当前角度的装饰图片
                },
                false
            ]
        },
        {
            title: '挡泥板    PZD44-0D020',  //表达题名字
            pic: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_4.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [2.9, 2.8, 0.4],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/dangnib_img.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '门把手装饰条    PZD38-0D020',  //表达题名字
            pic: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_5.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.68, 5.05, 0.7],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_5_b01.png'),//当前角度的装饰图片
                },
                {
                    vec3Transform: [1.83, 1.09, 1.1],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_5_c01.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '后门装饰条    PZD38-0D009',  //表达题名字
            pic: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_big_6.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.75, 4.23, 1.65],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/weichi_boutique/chexingpeijian/wzjp_front_6_c01.png'),//当前角度的装饰图片
                }
            ]
        }
    ],
    //--------------------------------------威驰--------------------------------------
    [
        {
            title: '挡泥板    PZD44-0D030',  //表达题名字
            pic: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/voisfs-img1.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.66, 0.67, 3.3],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/wzjp_front_4_c01.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '前格栅装饰条    PZD39-0D031',  //表达题名字
            pic: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/voisfs-img3.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                {
                    vec3Transform: [1.73, 1.3, 3.65],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/qiannl.png'),//当前角度的装饰图片
                }, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.79, 1.1, 0.65],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/wzjp_front_3_b01.png'),//当前角度的装饰图片
                },
                false
            ]
        },
        {
            title: '门把手贴 PZD38-0D020',  //表达题名字
            pic: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/voisfs-img2.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.04, 4.59, 1.05],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/wzjp_front_5_c01.png'),//当前角度的装饰图片
                },
                false
            ]
        },
        {
            title: '迎宾踏板    PZD64-0D050',  //表达题名字
            pic: require('../../../imgs/chexingimg/vios_fs/chexingpeijian/12951798.png'), //装饰缩略图
            status: false,//是否显示装饰
            angle: false
        }
    ],
    //--------------------------------普拉多----------------------------
    [
        {
            title: '专用车身装饰套件    PZD45-0P01F',  //表达题名字
            pic: require('../../../imgs/chexingimg/puladuo_boutique/74510746.jpg'), //装饰缩略图
            status: false,//是否显示装饰
            angle: false
        },
        {
            title: '备胎罩彩贴(都市款)    PZD35-60071',  //表达题名字
            pic: require('../../../imgs/chexingimg/puladuo_boutique/csct-ds.png'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                {
                    vec3Transform: [1.16, 2.64, 1.25],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/puladuo_boutique/chexingpeijian/btct-ds-icon.png'),//当前角度的装饰图片
                },
                false,
                false
            ]
        },
        {
            title: '车身彩贴(都市款)    PZD35-60070',  //表达题名字
            pic: require('../../../imgs/chexingimg/puladuo_boutique/btct-ds.png'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                {
                    vec3Transform: [0.85, 3.4, 2.3],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/puladuo_boutique/chexingpeijian/csct-ds-icon2.png'),//当前角度的装饰图片
                }, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.23, 0.3, 4.85],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/puladuo_boutique/chexingpeijian/csct-yy-icon.png'),//当前角度的装饰图片
                }
            ]
        },
        {
            title: '备胎罩彩贴(越野款)    PZD35-60061',  //表达题名字
            pic: require('../../../imgs/chexingimg/puladuo_boutique/csct-yy.png'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                {
                    vec3Transform: [1.16, 2.64, 1.25],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/puladuo_boutique/chexingpeijian/btct-yy-icon.png'),//当前角度的装饰图片
                },
                false,
                false
            ]
        },
        {
            title: '车身彩贴(越野款)    PZD35-60060',  //表达题名字
            pic: require('../../../imgs/chexingimg/puladuo_boutique/btct-yy.png'), //装饰缩略图
            status: false,//是否显示装饰
            angle: [ //角度的装饰
                false,
                {
                    vec3Transform: [0.94, 3.4, 2.4],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/puladuo_boutique/chexingpeijian/csct-yy-icon2.png'),//当前角度的装饰图片
                }, //falsh代码这个角度没有该装饰
                {
                    vec3Transform: [1.23, 0.8, 4.85],   //当前角度装饰的top, left ,width
                    decorate: require('../../../imgs/chexingimg/puladuo_boutique/chexingpeijian/csct-yy-icon.png'),//当前角度的装饰图片
                }
            ]
        },
    ]

]


//储存各个id。用来识别切换
let propsSearchnId = [
    //荣放
    {
        classify_id: 'rav4',
        product_id: 159,
        arrt_id: 0,
        name: '荣放'
    },
    //卡罗拉
    {
        classify_id: 'corolla',
        product_id: 245,
        arrt_id: 1,
        name: '卡罗拉'
    },
    //全新威驰
    {
        classify_id: 'vios',
        product_id: 160,
        arrt_id: 2,
        name: '全新威驰'
    },
    //威驰
    {
        classify_id: 'viosfs',
        product_id: 252,
        arrt_id: 3,
        name: '威驰'
    },
    //普拉多
    {
        classify_id: 'prado',
        product_id: 193,
        arrt_id: 4,
        name: '普拉多'
    }
]

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
class CarInstall extends Component {
    constructor(props) {
        super(props);

        this.state = {
            colorList: [],
            curColor: 'white',
            move: 0,
            modalFlag: false,
            selModalFlag: false,
            tabList: [],
            vehicleInfo: {},
            curPureid: '',
            pureMap: {},
            partInfo: {},
            dataRes: [],//接口数据储存
            decorateArrt: decorateArrt,//静态内容数组储存
            catArrts: catArrt[0],//汽车角度图片
            anglePic: [], //角度图片
            carType: 0,
            jiazhFlag: false,
        };
    }
    componentWillMount() {
        let cid = this.props.match.params.cid;
        let url = '/Website/PureProducts/viewLoadingEffect/id/' + cid;
        let selectedIndex = 0;
        HTTPGet(url).then((result) => {
            let pureMap = {};
            let tabList = [];
            console.log(result);
            if (result && result.code == 0) {
                let vehicleInfo = result.data.vehicleInfo;
                document.title = result.data.vehicleInfo.name

                let pureProductsList = result.data.pureProductsList;
                if (pureProductsList) {
                    for (let m in pureProductsList) {
                        let item = pureProductsList[m];
                        if (item.list) {
                            console.log(item.list);
                            for (let n in item.list) {
                                if (item.list[n].id == cid) {
                                    selectedIndex = n;
                                }
                                item.list[n].sel = false;
                            }
                            tabList.push({ id: item['classify_id'], title: item.title,code:item.code });
                            pureMap[item['classify_id']] = item.list;
                        }
                    }
                }
                if (tabList[0].id) {
                    let curPureid = tabList[0].id;
                    this.setState({
                        pureMap: pureMap,
                        tabList: tabList,
                        curPureid: curPureid,
                        vehicleInfo: vehicleInfo,
                    });
                } else {
                    this.setState({
                        vehicleInfo: vehicleInfo,
                    });
                }
                let ids;
                //获取地址栏参数，得到数组中的第几个
                if (vehicleInfo.alias) {
                    for (let i = 0; i < propsSearchnId.length; i++) {
                        if (propsSearchnId[i].classify_id == vehicleInfo.alias) {
                            ids = propsSearchnId[i].arrt_id
                            break;
                        }
                    }
                } else {
                    ids = 0
                }
                this.setState({ carType: ids });
                //将接口内容和本地的内容合并
                let waizhuang;
                //找到外装精品这个栏目
                for (let i = 0; i < 4; i++) {
                    //console.log(res.data.pureProductsList[i].title)
                    if (wzText === result.data.pureProductsList[i].code) {
                        waizhuang = result.data.pureProductsList[i]
                        for (let i = 0; i < waizhuang.list.length; i++) {
                            decorateArrt[this.state.carType][i].title = waizhuang.list[i].name
                            decorateArrt[this.state.carType][i].pic = waizhuang.list[i].thumb
                            decorateArrt[this.state.carType][i].price = waizhuang.list[i].price
                            //console.log(decorateArrt[this.state.carType][i].price)
                        }
                        break
                    }
                }
                //更新合并后的内容
                this.setState({
                    dataRes: result.data.pureProductsList,
                    decorateArrt: decorateArrt,
                    catPic: catArrt[this.state.carType][0],
                }, () => {
                    if (!this.props.location.search) {
                        this.changeSel(selectedIndex);
                    }
                })
            }
        });
    }
    changeCarPart(part, index) {
        // 这里可以写汽车配件更换的方法
        this.handleChecked(0, index, 0)
    }
    changeSel = (index) => {
        let map = this.state.pureMap;
        let list = map[this.state.curPureid];
        list[index].sel = !list[index].sel;
        let targetSel = list[index];
        console.log(this.state.curPureid)
        const tabs = this.state.tabList.filter(tab => tab.id === this.state.curPureid);
        if (tabs.length) {
            if (wzText === tabs[0].code) {
                this.changeCarPart(targetSel, index);
            }
        }

        this.setState({
            pureMap: map
        });
    }
    changeColor = (val) => {
        this.setState({
            curColor: val
        });
    }
    moveLeft = () => {
        // let m = this.state.move;
        // m = m*1000 - 4000;
        // m = m/1000;
        // this.setState({
        //     move: m
        // });
    }
    showSelModal() {
        let sel = this.state.selModalFlag;
        sel = !sel;
        this.setState({
            selModalFlag: sel
        });
    }
    showModal = (key, index) => (e) => {
        e.preventDefault(); // 修复 Android 上点击穿透
        e.stopPropagation();
        let id = this.state.pureMap[this.state.curPureid][index].id;
        let url = '/Website/PureProducts/getDetail/id/' + id;
        HTTPGet(url).then((result) => {
            if (result && result.code == 0) {
                window.myModal();
                let temp = result.data;
                let str = temp.name;
                let ret = str.match(/\w{4,}/);
                let name = str;
                let code = '';
                if (ret) {
                    let pos = ret.index;
                    name = str.slice(0, pos).trim();
                    code = str.slice(pos);
                }
                temp.name = name;
                temp.code = code;
                this.setState({
                    [key]: true,
                    partInfo: temp
                });
            }
        });
    }
    showJizhModal() {
        window.myModal();
        this.setState({
            jiazhFlag: true,
        });
    }
    onClose = key => () => {
        window.myModal1();
        this.setState({
            [key]: false,
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
    changeTab(val) {
        // 切换操作
        this.setState({
            curPureid: val
        });
    }
    getTotalPrice() {
        let total = 0;
        for (let item of this.state.tabList) {
            let curList = this.state.pureMap[item.id];
            if (curList && curList.length > 0) {
                total = curList.reduce((sum, val) => {
                    let price = val.price.replace(/[^\d.]/g, '');
                    if (val.sel) {
                        return sum * 1 + price * 1;
                    } else {
                        return sum;
                    }
                }, total)
            }
        }
        return StringFormat.toCurrency(total);
    }
    handleChecked(type, num, price) {
        //console.log(price)
        // let thisCurrents = this.state.curPureid
        // thisCurrents[type][num] = !thisCurrents[type][num]
        // let prices = this.price(price, thisCurrents[type][num])

        //判断图片角度
        if (type === 0) {
            for (let i = 0; i < 3; i++) {
                if (this.state.decorateArrt[this.state.carType][num].angle[i]) {
                    let decorateArrt = this.state.decorateArrt
                    decorateArrt[this.state.carType][num].status = !this.state.decorateArrt[this.state.carType][num].status;
                    let arrts = this.angleDecorate(i);
                    this.setState({ // 更新数据
                        anglesIndex: i,
                        catPic: catArrt[this.state.carType][i],
                        current: num,   //更新当前选中状态
                        anglePic: arrts,
                        // thisCurrent: thisCurrents,
                        // allPrice: prices,
                        decorateArrt: decorateArrt
                    })
                    break;
                }
            }
        }
    }
    //遍历装饰图片
    angleDecorate(angle) {
        let arrts = [];
        for (let i = 0; i < this.state.decorateArrt[this.state.carType].length; i++) {
            if (this.state.decorateArrt[this.state.carType][i].angle[angle] && this.state.decorateArrt[this.state.carType][i].status) {
                arrts[i] = this.state.decorateArrt[this.state.carType][i].angle[angle]
            }
        }
        return arrts
    }
    returnList() {
        this.props.history.push('/buycar/pureuse');
    }
    render() {
        return (
            <div className='car-install'>
                <div className='top-title'>
                    <div>{this.state.vehicleInfo.name}</div>
                    {/* <img src={require(`../../../imgs/down-yellow.png`)} className={this.state.selModalFlag? 'rotate':''} alt="img"/> */}
                </div>
                <div className={this.state.selModalFlag ? 'select-modal' : 'hidden'}>
                    <div className='inner'>
                        <div className='up'>
                            <div></div>
                        </div>
                        <div className='sel'>
                            <div className='title border-b'>轿车</div>
                            <ul>
                                <li className='active'>COROLLA&nbsp;卡罗拉</li>
                            </ul>
                            <div className='title border-b'>SUV</div>
                            <ul>
                                <li>RAV4&nbsp;荣放</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className='category padding'>
                    {this.state.tabList.map((val, index) => {
                        if (returnKey === val.code) {
                            return <div className={this.state.curPureid == val.id ? 'item current' : 'item'} onClick={() => { this.returnList() }} key={'tab-' + index}>{val.title}</div>
                        } else {
                            return <div className={this.state.curPureid == val.id ? 'item current' : 'item'} onClick={() => { this.changeTab(val.id) }} key={'tab-' + index}>{val.title}</div>
                        }
                    })}
                </div>
                {/*<div className='total padding'>
                    <span>
                        总计：
                        <span className='big'>{this.getTotalPrice()}</span>
                    </span>
                </div> */}
                <div className='xscroll' style={{ 'transform': 'translateX(' + this.state.move + 'rem)' }}>
                    {this.state.pureMap && this.state.pureMap[this.state.curPureid] ? this.state.pureMap[this.state.curPureid].map((val, index) => {
                        let str = val.name;
                        let ret = str.match(/\w{4,}/);
                        let name = str;
                        let code = '';
                        if (ret) {
                            let pos = ret.index;
                            name = str.slice(0, pos).trim();
                            code = str.slice(pos);
                        }
                        return <div className='item' key={'part-' + index} onClick={() => { this.changeSel(index) }}>
                            <img src={val.thumb} alt="img" />
                            <div className={val.sel ? 'info' : 'info show'}>
                                <div>{name}</div>
                                <div>{code}</div>
                            </div>
                            <div className={val.sel ? 'mask show' : 'mask'}>
                                <div className='top'>
                                    <div className='left'>
                                        <div className='img'>
                                            <img src={require(`../../../imgs/icon-selected.png`)} alt="img" />
                                        </div>
                                        <div className='b'></div>
                                    </div>
                                    <div className='r'>
                                        <div className='t'></div>
                                        <div className='r'></div>
                                    </div>
                                </div>
                                <div className='bottom' onClick={this.showModal('modalFlag', index)}>
                                    <img src={require(`../../../imgs/icon-scan.png`)} alt="img" />
                                    <div>查</div>
                                    <div>看</div>
                                    <div>详</div>
                                    <div>情</div>
                                </div>
                            </div>
                        </div>
                    }) : null}
                </div>
                <div className='arrow-l' onClick={this.moveLeft}>
                    <img src={require(`../../../imgs/icon-arrow-l.png`)} alt="img" />
                </div>
                <div className='arrow-r'>
                    <img src={require(`../../../imgs/icon-arrow-r.png`)} alt="img" />
                </div>
                <div className='car-flex'>
                    <div className='car' onClick={() => this.showJizhModal()}>
                        {/* {this.state.vehicleInfo['vehicle_thumb'] ? <img src={this.state.vehicleInfo['vehicle_thumb']} alt="img" /> : null} */}
                        <img src={this.state.catPic} alt="" />
                        <div>
                            {
                                this.state.anglePic.length !== 0 ?
                                    this.state.anglePic.map((v, i) => {
                                        return <img src={v.decorate} style={{
                                            top: v.vec3Transform[0] + 'rem',
                                            left: v.vec3Transform[1] + 'rem',
                                            width: v.vec3Transform[2] + 'rem'
                                        }} alt='' key={i} />
                                    })
                                    : ''
                            }
                        </div>
                    </div>
                </div>
                <div className = 'bcg_arrow'></div>
                {/* <div className='colors'>
                    {this.state.colorList.map((val,index)=>{
                        return  <div className={this.state.curColor == val.val? 'item up':'item'} onClick={()=>{this.changeColor(val.val)}} key={'color-'+index}>
                                    <img src={this.state.curColor == val.val ? val.lg :val.sm} className={this.state.curColor == val.val? 'lg':''} alt="img"/>
                                    <div className='text'>{val.title}</div>
                                </div>
                    })}
                </div> */}
                <Modal
                    visible={this.state.modalFlag}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('modalFlag')}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div className='car-info'>
                        <img src={require('../../../imgs/close-2.png')} onClick={this.onClose('modalFlag')} className='close' alt="img" />
                        <img src={this.state.partInfo.thumb} className='part' alt="img" />
                        <div className='info'>
                            <div className='l'>
                                <div>{this.state.partInfo.name}</div>
                                <div>{this.state.partInfo.code}</div>
                            </div>
                            <div className='r'>
                                <span>
                                    建议零售价
                                   {/* <span className='price'>{StringFormat.toCurrency(this.state.partInfo.price)}</span> */}
                                   <span className="price_span">请咨询当地经销商</span>
                                </span>
                            </div>
                        </div>
                        <div className='desc'>
                            {this.state.partInfo.description}
                        </div>
                    </div>
                </Modal>
                <Modal
                    visible={this.state.jiazhFlag}
                    transparent
                    maskClosable={false}
                    onClose={this.onClose('jiazhFlag')}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div className='jiazhuang-modal'>
                        <img src={require('../../../imgs/close-2.png')} onClick={this.onClose('jiazhFlag')} className='close' alt="img" />
                        <div className='car'>
                            <img src={this.state.catPic} alt="" />
                            <div>
                                {
                                    this.state.anglePic.length !== 0 ?
                                        this.state.anglePic.map((v, i) => {
                                            return <img src={v.decorate} style={{
                                                top: v.vec3Transform[0] + 'rem',
                                                left: v.vec3Transform[1] + 'rem',
                                                width: v.vec3Transform[2] + 'rem'
                                            }} alt='' key={i} />
                                        })
                                        : ''
                                }
                            </div>
                        </div>
                    </div>
                </Modal>
                <Gotop></Gotop>
            </div>
        )
    }
}

export default CarInstall;
