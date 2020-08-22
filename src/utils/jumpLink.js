export const toJump = (type, url, id, hasDetail) => {
  if ((hasDetail === false || hasDetail == '1') && url) {
    window.open(url)
    return
  }
  //结果类型：1.车型信息 2.活动:活动中心 3.活动:丰享汇 4.文章:爱车课堂 5.文章:企业新闻 6.文章:粉丝互动
  const links = {
    activity: '/brand/activity/detail/',
    fengxianghui: '/carowner/fengxianghui/activitycontent/',
    aiche: '/carowner/introduce/aichecontent/',
    news: '/brand/news/detail/',
    fans: '/brand/fans/detail/',
    story: '/carowner/fengxianghui/story/'
  }
  const origin = window.location.origin
  url = `${origin}${links[type]}${id}`
  window.open(url)
}