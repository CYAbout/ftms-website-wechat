import React, { Component } from 'react';
import { getParamsObj } from '../../../../utils/util'


class Tabfive extends Component {

  componentDidMount() {
    document.title = '满意度调查'
    let params = getParamsObj();
    console.log(params)
    switch(params.oneindex) {
      case '0':
        document.title = '诚信服务';
        break;
      case '1':
        document.title = '延保服务';
        break;
      case '2':
        document.title = '服务活动';
        break;
      case '3':
        document.title = '保修政策';
        break;
      case '4':
        document.title = '满意度调查';
        break;
    }
  }
  render() {
    const dataHtml = [
      {
        name:'短信',
        color:'#ddb508',
        content:[{
          title:'短信推送调查问卷链接',
          content:'随机抽取用户并通过短信推送问卷链接。（请认准调查链接带有dd2.cn标识）'
        },{
          title:'填写问卷并参与抽奖',
          content:'点击问卷链接，填写您的意见与建议，答题结束后点击抽奖按钮参与抽奖。'
        }]
      },
      {
        name:'门店扫码',
        color:'#3994a1',
        content:[{
          title:'经销店扫码',
          content:'在经销店扫描海报活动上的二维码参与调查。'
        },{
          title:'填写问卷并参与抽奖',
          content:'进入调查问卷，填写您的意见与建议，答题结束后点击抽奖按钮参与抽奖。'
        }]
      },
      {
        name:'微信公众号',
        color:'#e66b5c',
        content:[{
          title:'关注微信公众号参与',
          content:'关注‘一汽丰田’官方微信公众号。进入‘品牌与我’菜单栏，点击‘客户之声’栏目。'
        },{
          title:'填写问卷并参与抽奖',
          content:'进入调查问卷，填写您的意见和建议，答题结束后点击抽奖按钮参与抽奖。'
        }]
      }
    ]
    return (
      <div className='tabfive-ex'>
        <img src={require('../../../../imgs/wap-diaocha.jpg')} alt=""/>
        {/* <div className="bg-box"> */}
          {/* <h3 className="dear-title">
            一汽丰田客户满意度调查
          </h3>
          <div className="dear">
            <p>亲爱的用户：</p>
            <p>感谢您长久以来对一汽丰田的支持与信任！</p>
            <p>为了给用户提供更为卓越的购车及售后服务，一汽丰田对客户满意度开展抽样调查。</p>
            <p>为了保证调查的公正、客观，我们将委托第三方调查公司“北京零点有数数据科技股份有限公司”进行调查的实施。</p>
            <p>您的评价不仅代表着众多一汽丰田车主的心声，更是推动我们锐意进取的原动力。期待您的积极参与！</p>
            <p>如果您对我们的调查有任何疑问，请拨打800-810-1210(座机拨打)或400-810-1210(手机拨打)进行咨询。</p>
          </div>
          <div className="canyu">
            <span>参与渠道</span>
          </div>
          <ul className='list-content'>
            {
              dataHtml.map((v) => {
                return (
                  <li className="color-box" key={v.name}>
                    <div style={{borderBottomColor:v.color}} className="color-title">
                      <span style={{backgroundColor:v.color}}>{v.name}</span>
                    </div>
                    {
                      v.content.map((z,i) => {
                        return (
                        <div className="color-border" key={z.title}>
                          <div style={{backgroundColor:v.color}} className="num">
                          {i+1}
                          </div>
                          <div className="color-content">
                            <h4>{z.title}</h4>
                            <p>{z.content}</p>
                          </div>
                        </div>
                        )
                      })
                    }
                  </li>
                )
              })
            }
            <li>
            <div className="erweima-box">
              <img src={require('../../../../imgs/diaocha-3.png')} alt=""/>
            </div>
            </li>
          </ul> */}
          {/* <div>123123</div> */}
        {/* </div> */}

      </div>
    );
  }
}

export default Tabfive;
