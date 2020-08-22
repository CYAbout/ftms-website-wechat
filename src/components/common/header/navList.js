import config from '../../../config.json';
export default [
  {
    title: '首页',
    link: '/',
  },

  {
    title: '购车支持',
    link: '/',
    child: [
      {
        title: '数字展厅',
        link: '/3d/room/'
      },
      {
        title: '品牌车型',
        link: '/buycar/cartype'
      },
      {
        title: '纯正用品',
        link: '/buycar/pureuse'
      },
      {
        title: '金融服务',
        link: '/buycar/financial'
      },
      {
        title: '融资租赁',
        link: '/buycar/rent'
      },
      {
        title: '新车保险',
        link: '/buycar/newcar'
      },
      // {
      //   title: '安心二手车',
      //   link: 'http://www.ft-ucar.com.cn/'
      // },
      {
        title: '官方商城',
        link: `${config.mallServerPath}`
      },
    ]
  },

  {
    title: '车主专享',
    link: '/',
    child: [
      {
        title: '服务介绍',
        link: '/carowner/introduce'
      },
      {
        title: '服务大厅',
        link: '/carowner/lobby'
      },
      {
        title: '纯牌零件',
        link: '/carowner/part'
      },
      {
        title: '丰享汇',
        link: '/carowner/fengxianghui'
      },
      {
        title: '智能互联',
        link: '/carowner/capacity'
      },
    ]
  },
  {
    title: '品牌中心',
    link: '/',
    child: [
      {
        title: '企业品牌',
        link: '/brand/company'
      },
      {
        title: '企业介绍',
        link: '/brand/profile'
      },
      {
        title: '社会责任',
        link: '/brand/duty'
      },
      {
        title: '企业新闻',
        link: '/brand/news'
      },
      {
        title: '活动中心',
        link: '/brand/activity'
      },
      {
        title: '粉丝互动',
        link: '/brand/fans'
      },
    ]
  }
]