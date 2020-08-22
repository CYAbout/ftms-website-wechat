
import React from 'react'
import {ActionSheet} from 'antd-mobile'
const loadBshare = () => {
  let el = document.createElement('script');
  // el.src = "http://static.bshare.cn/b/buttonLite.js#style=-1&amp;uuid=&amp;pophcol=2&amp;lang=zh";
  document.body.appendChild(el);
  // let script1 = document.createElement('script');
  //   script1.src = "http://static.bshare.cn/b/bshareC0.js";
  //   document.body.appendChild(script1);
  el.onload = el.readystatechange =  () => {
    if (!el.readyState || /loaded|complete/.test(el.readyState)) {
      toShareCustom()
      el.onload = el.readystatechange = null;
    }
  }
}
loadBshare()
// 自定义
const toShareCustom = () => {
  const myCustoms = [
    {
    // title: "一汽丰田官方网站",
    // url: 'http://wapsite.ftms.devbmsoft.cn', // 自定义网址
    // summary: '一汽丰田官方网站',
    pic: "http://wapsite.ftms.devbmsoft.cn/Public/Uploads/Picture/images/2019/04/60c2c05813f6995b7d998398d667c1f.png" // 自定义图片
    }
  ]
  myCustoms.forEach(v => {
    console.log(v)
    window.bShare.addEntry(v);
  })
}

const dataList = [
  { url: 'share-wb', title: '微博',shortName: 'sinaminiblog' },
  // { url: 'share-pyq', title: '微信朋友圈',shortName: 'weixin' },
  { url: 'share-qq', title: 'QQ好友',shortName: 'qqim' },
  { url: 'share-qqzone', title: 'QQ空间',shortName: 'qzone' },
    // { url: 'OpHiXAcYzmPQHcdlLFrc', title: '发送给朋友' },
    // { url: 'wvEzCMiDZjthhAOcwTOu', title: '新浪微博' },
    // { url: 'cTTayShKtEIdQVEMuiWt', title: '生活圈' },
    // { url: 'umnHwvEgSyQtXlZjNJTt', title: '微信好友' },
    // { url: 'SxpunpETIwdxNjcJamwB', title: 'QQ' },
].map(obj => ({
  icon: <img src={require(`../imgs/${obj.url}.png`)} alt={obj.title} style={{ width: 36 }} />,
  // icon: <img src={require(`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`)} alt={obj.title} style={{ width: 36 }} />,
  // icon: <img src={`https://gw.alipayobjects.com/zos/rmsportal/${obj.url}.png`} alt={obj.title} style={{ width: 36 }} />,
  title: obj.title,
  shortName: obj.shortName
}));

// const toShare = (shortName) => {
//   console.log(shortName)
//   window.bShare.share('',shortName, 0)
// }
export const share = (val,noShortName,pic) => {

  const url = window.location.href
  const desc = '一汽丰田官网'
  const title = '一汽丰田官网'
  const content = '一汽丰田官网'
  const pics = pic ? pic : "https://image.ftms.com.cn/Public/Uploads/Picture/images/2019/04/3baaf123-d3a3-46c3-92cb-87cab25eb445.png"

  const shareObj = {
    qqim:`https://connect.qq.com/widget/shareqq/index.html?url=${url}&desc=${desc}&pics=${pics}&site=bshare`,
    qzone: `http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=${url}&title=${title}&pics=${pics}&summary=${content}`,
    sinaminiblog:`http://service.weibo.com/share/share.php?url=${url}&title=${title}&pic=${pics}&summary=${content}&searchPic=false`
  }
  if(val) {
    // toShare(val)
    console.log(val)
    window.open(shareObj[val])
    return
  }
  ActionSheet.showShareActionSheetWithOptions({
    // options: dataList.filter(v => v.shortName !== noShortName),
    options: dataList,
    title: '分享到',
    // message: 'I am description, description, description',
  },
  (buttonIndex) => {
    console.log(buttonIndex)
    const name = buttonIndex > -1 ? dataList[buttonIndex].title : 'cancel'
    const shortName = buttonIndex > -1 ? dataList[buttonIndex].shortName : null
    if(shortName) {
      // toShare(shortName)
      // console.log(shareObj[shortName])
      window.open(shareObj[shortName])
    }
    
  })
}