import Loadable from 'react-loadable';
import Loading from '../components/common/loading';
// import Lobby from '../views/carowner/lobby'
const delay = 300
const timeout = 10000
// 首页
const Home = Loadable({
  loader: () => import('../views/home'),
  loading: Loading,
  delay, // 防止闪烁
  timeout, // 超时
});
// 搜索页
const Search = Loadable({
  loader: () => import('../views/home/search'),
  loading: Loading,
  delay, // 防止闪烁
  timeout, // 超时
});
// 登录 页
const Login = Loadable({
  loader: () => import('../views/login'),
  loading: Loading,
  delay,
  timeout,
});
const Forgetpwd = Loadable({
  loader: () => import('../views/login/forgetpwd'),
  loading: Loading,
  delay,
  timeout,
});
const Register = Loadable({
  loader: () => import('../views/login/register'),
  loading: Loading,
  delay,
  timeout,
});
// 个人中心及子页面
const Mine = Loadable({
  loader: () => import('../views/mine'),
  loading: Loading,
  delay,
  timeout,
});
const Accountinfo = Loadable({
  loader: () => import('../views/mine/accountinfo'),
  loading: Loading,
  delay,
  timeout,
});
const Addcar = Loadable({
  loader: () => import('../views/mine/addcar'),
  loading: Loading,
  delay,
  timeout,
});
const Changephone = Loadable({
  loader: () => import('../views/mine/changephone'),
  loading: Loading,
  delay,
  timeout,
});
const Changepwd = Loadable({
  loader: () => import('../views/mine/changepwd'),
  loading: Loading,
  delay,
  timeout,
});
const Mycard = Loadable({
  loader: () => import('../views/mine/mycard'),
  loading: Loading,
  delay,
  timeout,
});
const Myorder = Loadable({
  loader: () => import('../views/mine/myorder'),
  loading: Loading,
  delay,
  timeout,
});
const Myspoor = Loadable({
  loader: () => import('../views/mine/myspoor'),
  loading: Loading,
  delay,
  timeout,
});
const Orderdetail = Loadable({
  loader: () => import('../views/mine/myorder/detail'),
  loading: Loading,
  delay,
  timeout,
});
const Yuyue = Loadable({
  loader: () => import('../views/mine/yuyue'),
  loading: Loading,
  delay,
  timeout,
});
// 购车支持
const Carshow = Loadable({
  loader: () => import('../views/buycar/carshow'),
  loading: Loading,
  delay,
  timeout,
});
// 品牌车型
const Cartype = Loadable({
  loader: () => import('../views/buycar/cartype'),
  loading: Loading,
  delay,
  timeout,
});
// 品牌车型-车型对比
const CartypeCompare = Loadable({
  loader: () => import('../views/buycar/cartype/TypeCompare'),
  loading: Loading,
  delay,
  timeout,
});
// 品牌车型-车型详情
const CartypeDetail = Loadable({
  loader: () => import('../views/buycar/cartype/CarDetail'),
  loading: Loading,
  delay,
  timeout,
});
// 品牌车型-下载中心
const CartypeDownCenter = Loadable({
  loader: () => import('../views/buycar/cartype/DownCenter'),
  loading: Loading,
  delay,
  timeout,
});
// 品牌车型-精品安装
const CartypeInstall = Loadable({
  loader: () => import('../views/buycar/cartype/CarInstall'),
  loading: Loading,
  delay,
  timeout,
});
// 车型参数设置
const CartypeParams = Loadable({
  loader: () => import('../views/buycar/cartype/CarParams'),
  loading: Loading,
  delay,
  timeout,
});
const Chaxunjxs = Loadable({
  loader: () => import('../views/buycar/chaxunjxs'),
  loading: Loading,
  delay,
  timeout,
});
const Financial = Loadable({
  loader: () => import('../views/buycar/financial'),
  loading: Loading,
  delay,
  timeout,
});
const Newcar = Loadable({
  loader: () => import('../views/buycar/newcar'),
  loading: Loading,
  delay,
  timeout,
});
const Oldcar = Loadable({
  loader: () => import('../views/buycar/oldcar'),
  loading: Loading,
  delay,
  timeout,
});
const Pureuse = Loadable({
  loader: () => import('../views/buycar/pureuse'),
  loading: Loading,
  delay,
  timeout,
});
const Rent = Loadable({
  loader: () => import('../views/buycar/rent'),
  loading: Loading,
  delay,
  timeout,
});
const Shijia = Loadable({
  loader: () => import('../views/buycar/shijia'),
  loading: Loading,
  delay,
  timeout,
});

// 车主专享
const Capacity = Loadable({
  loader: () => import('../views/carowner/capacity'),
  loading: Loading,
  delay,
  timeout,
});
const Fengxianghui = Loadable({
  loader: () => import('../views/carowner/fengxianghui'),
  loading: Loading,
  delay,
  timeout,
});
const FengxiangDetail = Loadable({
  loader: () => import('../views/carowner/fengxianghui/detail'),
  loading: Loading,
  delay,
  timeout,
});
const FxhDetail = Loadable({
  loader: () => import('../views/carowner/fengxianghui/activitycontent'),
  loading: Loading,
  delay,
  timeout,
});
const StoryDetail = Loadable({
  loader: () => import('../views/carowner/fengxianghui/storyContent'),
  loading: Loading,
  delay,
  timeout,
});
// 定保通单独
const Dbt = Loadable({
  loader: () => import('../views/carowner/introduce/modules/dbt'),
  loading: Loading,
  delay,
  timeout,
});
// 延保服务单独
const Yb = Loadable({
  loader: () => import('../views/carowner/introduce/modules/yb'),
  loading: Loading,
  delay,
  timeout,
});
const Introduce = Loadable({
  loader: () => import('../views/carowner/introduce'),
  loading: Loading,
  delay,
  timeout,
});
const Shenbian = Loadable({
  loader: () => import('../views/carowner/introduce/modules/tabthreeShenbian'),
  loading: Loading,
  delay,
  timeout,
});
const Aiche = Loadable({
  loader: () => import('../views/carowner/introduce/modules/tabthreeAiche'),
  loading: Loading,
  delay,
  timeout,
});
const IntroduceDetail = Loadable({
  loader: () => import('../views/carowner/introduce/detail'),
  loading: Loading,
  delay,
  timeout,
});
const AicheDetail = Loadable({
  loader: () => import('../views/carowner/introduce/aichedetail'),
  loading: Loading,
  delay,
  timeout,
});
const Lobby = Loadable({
  loader: () => import('../views/carowner/lobby'),
  loading: Loading,
  delay,
  timeout,
});

const Part = Loadable({
  loader: () => import('../views/carowner/part'),
  loading: Loading,
  delay,
  timeout,
});
const GoodsType = Loadable({
  loader: () => import('../views/carowner/part/module/goodstype'),
  loading: Loading,
  delay,
  timeout,
});

// 品牌中心
const Activity = Loadable({
  loader: () => import('../views/brand/activity'),
  loading: Loading,
  delay,
  timeout,
});
const ActivityDetail = Loadable({
  loader: () => import('../views/brand/activity/detail'),
  loading: Loading,
  delay,
  timeout,
});
const Company = Loadable({
  loader: () => import('../views/brand/company'),
  loading: Loading,
  delay,
  timeout,
});
const Duty = Loadable({
  loader: () => import('../views/brand/duty'),
  loading: Loading,
  delay,
  timeout,
});
const Fans = Loadable({
  loader: () => import('../views/brand/fans'),
  loading: Loading,
  delay,
  timeout,
});
const FansInfo = Loadable({
  loader: () => import('../views/brand/fans/fansinfo'),
  loading: Loading,
  delay,
  timeout,
});
const MoreVideo = Loadable({
  loader: () => import('../views/brand/fans/morevideo'),
  loading: Loading,
  delay,
  timeout,
});
const MoreWenzhang = Loadable({
  loader: () => import('../views/brand/fans/morewenzhang'),
  loading: Loading,
  delay,
  timeout,
});
const FansDetail = Loadable({
  loader: () => import('../views/brand/fans/detail'),
  loading: Loading,
  delay,
  timeout,
});
const FansDetailTz = Loadable({
  loader: () => import('../views/brand/fans/detailtz'),
  loading: Loading,
  delay,
  timeout,
});
const News = Loadable({
  loader: () => import('../views/brand/news'),
  loading: Loading,
  delay,
  timeout,
});
const NewsDetail = Loadable({
  loader: () => import('../views/brand/news/detail'),
  loading: Loading,
  delay,
  timeout,
});
const Profile = Loadable({
  loader: () => import('../views/brand/profile'),
  loading: Loading,
  delay,
  timeout,
});

//footer连接页面
// 公告列表
const TenderList = Loadable({
  loader: () => import('../views/footer/gonggao/TenderList'),
  loading: Loading,
  delay,
  timeout,
});
const Gonggao = Loadable({
  loader: () => import('../views/footer/gonggao'),
  loading: Loading,
  delay,
  timeout,
});
const Wapmap = Loadable({
  loader: () => import('../views/footer/wapmap'),
  loading: Loading,
  delay,
  timeout,
});
const Zhaomu = Loadable({
  loader: () => import('../views/footer/zhaomu'),
  loading: Loading,
  delay,
  timeout,
});
const Zhengce = Loadable({
  loader: () => import('../views/footer/zhengce'),
  loading: Loading,
  delay,
  timeout,
});

const DM = Loadable({
  loader: () => import('../views/3d'),
  loading: Loading,
  delay,
  timeout,
});



export default [
  { path: "/", name: "Home", component: Home },
  { path: "/search", name: "Search", component: Search },
  { path: "/login", name: "Login", component: Login },
  { path: "/forgetpwd", name: "Forgetpwd", component: Forgetpwd },
  { path: "/register", name: "Register", component: Register },

  { path: "/mine", name: "Mine", component: Mine, needAuth: true },
  { path: "/mine/accountinfo", name: "Accountinfo", component: Accountinfo, needAuth: true },
  { path: "/mine/addcar", name: "Addcar", component: Addcar, needAuth: true },
  { path: "/mine/changephone", name: "Changephone", component: Changephone, needAuth: true },
  { path: "/mine/changepwd", name: "Changepwd", component: Changepwd, needAuth: true },
  { path: "/mine/mycard/:type", name: "Mycard", component: Mycard, needAuth: true },
  { path: "/mine/order/:type", name: "Myorder", component: Myorder, needAuth: true },
  { path: "/mine/myspoor", name: "Myspoor", component: Myspoor, needAuth: true },
  { path: "/mine/order/detail/:id", name: "Orderdetail", component: Orderdetail, needAuth: true },
  { path: "/mine/appointment/:type", name: "Yuyue", component: Yuyue, needAuth: true },

  { path: "/buycar/carshow", name: "Carshow", component: Carshow },
  { path: "/buycar/cartype", name: "Cartype", component: Cartype },
  { path: "/buycar/cartype/compare", name: "CartypeCompare", component: CartypeCompare },
  { path: "/buycar/cartype/detail/:alias", name: "CartypeDetail", component: CartypeDetail },
  { path: "/buycar/cartype/install/:cid", name: "CartypeInstall", component: CartypeInstall },
  { path: "/buycar/cartype/carparams/:alias", name: "CartypeParams", component: CartypeParams },
  { path: "/buycar/cartype/downcenter/:cid", name: "CartypeDownCenter", component: CartypeDownCenter },
  { path: "/buycar/chaxunjxs", name: "Chaxunjxs", component: Chaxunjxs },
  { path: "/buycar/financial", name: "Financial", component: Financial },
  { path: "/buycar/newcar", name: "Newcar", component: Newcar },
  { path: "/buycar/oldcar", name: "Oldcar", component: Oldcar },
  { path: "/buycar/pureuse", name: "Pureuse", component: Pureuse },
  { path: "/buycar/rent", name: "Rent", component: Rent },
  { path: "/buycar/shijia", name: "Shijia", component: Shijia },

  { path: "/carowner/capacity", name: "Capacity", component: Capacity },
  { path: "/carowner/fengxianghui", name: "Fengxianghui", component: Fengxianghui },
  { path: "/carowner/fengxianghui/detail/:type", name: "FengxiangDetail", component: FengxiangDetail },
  { path: "/carowner/fengxianghui/activitycontent/:id", name: "FxhDetail", component: FxhDetail },
  { path: "/carowner/fengxianghui/story/:id", name: "StoryDetail", component: StoryDetail },
  { path: "/carowner/introduce", name: "Introduce", component: Introduce },
  { path: "/carowner/introduce/dbt", name: "Dbt", component: Dbt },
  { path: "/carowner/introduce/yb", name: "Yb", component: Yb },
  { path: "/carowner/introduce/shenbian", name: "Shenbian", component: Shenbian },
  { path: "/carowner/introduce/aiche", name: "Aiche", component: Aiche },
  { path: "/carowner/introduce/content/:id", name: "IntroduceDetail", component: IntroduceDetail },
  { path: "/carowner/introduce/aichecontent/:id", name: "AicheDetail", component: AicheDetail },
  { path: "/carowner/lobby", name: "Lobby", component: Lobby },
  { path: "/carowner/part", name: "Part", component: Part },
  { path: "/carowner/goodstype/:id", name: "GoodsType", component: GoodsType },

  { path: "/brand/activity", name: "Activity", component: Activity },
  { path: "/brand/activity/detail/:id", name: "ActivityDetail", component: ActivityDetail },
  { path: "/brand/company", name: "Company", component: Company },
  { path: "/brand/duty", name: "Duty", component: Duty },
  { path: "/brand/fans", name: "Fans", component: Fans },
  { path: "/brand/fans/fansinfo/:id", name: "FansInfo", component: FansInfo },
  { path: "/brand/fans/morevideo", name: "MoreVideo", component: MoreVideo },
  { path: "/brand/fans/morewenzhang", name: "MoreWenzhang", component: MoreWenzhang },
  { path: "/brand/fans/detail/:id", name: "FansDetail", component: FansDetail },
  { path: "/brand/fans/detailtz/:id", name: "FansDetailTz", component: FansDetailTz },
  { path: "/brand/news", name: "News", component: News },
  { path: "/brand/news/detail/:id", name: "NewsDetail", component: NewsDetail },
  { path: "/brand/profile", name: "Profile", component: Profile },


  { path: "/footer/tenderlist", name: "TenderList", component: TenderList },
  { path: "/footer/gonggao/:bid", name: "Gonggao", component: Gonggao },
  { path: "/footer/wapmap", name: "Wapmap", component: Wapmap },
  { path: "/footer/zhaomu", name: "Zhaomu", component: Zhaomu },
  { path: "/footer/zhengce", name: "Zhengce", component: Zhengce },

  { path: "/3d/:type", name: "3d", component: DM },
]