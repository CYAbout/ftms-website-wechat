import React, { Component } from 'react';
import PicList from './module/picList'
import './index.less'
class FengxiangDetail extends Component {
  
  render() {
    const type = this.props.match.params.type
    const list = [{
      title:'基础权益',
      type: 'quanyi',
      img:'fxh-list-1.png',
      miaoshu:'加入丰享汇，入会即享100积分；到店消费即享丰富积分返还；积分可抵扣现金。'
    },{
      title:'专享福利',
      type: 'fuli',
      img:'fxh-list-2.png',
      miaoshu:'加入丰享汇，参与活动，即有机会享有优惠卡券，活动卡券及丰富的异业权益。'
    },{
      title:'积分获取',
      type: 'huoqu',
      img:'fxh-list-3.png',
      miaoshu:'丰享汇会员可通过多种渠道获取积分'
    },{
      title:'积分使用',
      type: 'shiyong',
      img:'fxh-list-4.png',
      miaoshu:'丰享汇会员可通过多种渠道消费积分。'
    },]
    const shiyongData = ['维修','保养','积分商城','纯牌零件','精品配件']
    let data =  list.find(v => type === v.type)
    return (
      <div className='fengxiang-detail'>
        <div className="title-img">
          <img src={require('../../../imgs/fxh-banner.png')} alt=""/>
        </div>
        <h3 className='title'>
          {data.title}
        </h3>
        <div className="img-box">
          <img src={require(`../../../imgs/${data.img}`)} alt=""/>
        </div>
        <div className="miaoshu">
          {data.miaoshu}
        </div>
        {type === 'shiyong' && <div className="miaoshu-list miaoshu-list-sy ">
            <div className="item">
              <div className="l">
                <img src={require(`../../../imgs/shiyong-icon-1.png`)} alt=""/>
              </div>
              <div className="r">
                丰享汇会员享受维修、保养、生日月工时费等服务或进行精品、零件消费是，均可使用积分抵现，10积分=1元
              </div>
            </div>
            <div className="item">
              <div className="l">
              </div>
              <div className="r">
                更可到商城兑换保养服务、精品配件或精美礼品
              </div>
            </div>
            <ul className="arr">
            {
              shiyongData.map((v,i) => {
                return (
                <li className='item' key={i}>
                  <div className="l">
                  <img src={require(`../../../imgs/shiyong-icon-${i+2}.png`)} alt=""/>
                  </div>
                  <div className="r">
                    {v}
                  </div>
                </li>
                )
              })
            }
            </ul>
          </div>}
          {type === 'quanyi' && <div className="miaoshu-list miaoshu-list-qy ">
            <div className="item">
              <div className="l">
                <img src={require(`../../../imgs/shiyong-icon-7.png`)} alt=""/>
              </div>
              <div className="r">
              <div>增换购</div>
                <p>荣耀卡及以上级别增换购本品牌，可享10000积分赠送</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-3.png`)} alt=""/>
              </div>
              <div className="r">
                <div>推荐购</div>
                <p>推荐购车得积分</p>
                <p>1~3台推荐购车赠送3000积分/台；</p>
                <p>4~5台推荐购车赠送4500积分/台；</p>
                <p>6~10台推荐购车赠送6000积分/台；</p>
                <p>10台以上推荐购车赠送9000积分/台；</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-8.png`)} alt=""/>
              </div>
              <div className="r">
              <div>生日惊喜</div>
                <p>荣耀卡及以上级别生日当月赠送50%维修保养工时费积分</p>
              </div>
            </div>
          </div>}
          {type === 'fuli' && <div className="miaoshu-list miaoshu-list-qy ">
            <div className="item">
              <div className="l">
                <img src={require(`../../../imgs/shiyong-icon-9.png`)} alt=""/>
              </div>
              <div className="r">
              <div>优惠卡券</div>
              <p>参与活动，既有机会获取保养代金券</p>
              <p>（适用于一汽丰田丰享汇特许经销商）</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-10.png`)} alt=""/>
              </div>
              <div className="r">
                <div>活动卡券</div>
                <p>参与活动，既有机会获取购物卡、视频网站会员卡等丰富卡券</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-11.png`)} alt=""/>
              </div>
              <div className="r">
              <div>异业权益</div>
                <p>更多异业权益敬请期待……</p>
              </div>
            </div>
          </div>}
            {type === 'huoqu' && <div className="miaoshu-list miaoshu-list-qy ">
            <div className="item">
              <div className="l">
                <img src={require(`../../../imgs/shiyong-icon-12.png`)} alt=""/>
              </div>
              <div className="r">
              <div>认证车辆得积分</div>
              <p>认证1辆送100积分</p>
              <p>认证2辆送1000积分</p>
              <p>认证3辆送3000积分</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-3.png`)} alt=""/>
              </div>
              <div className="r">
                <div>推荐购得积分</div>
                <p>推荐购车得积分</p>
                <p>1~3台推荐购车赠送3000积分/台；</p>
                <p>4~5台推荐购车赠送4500积分/台；</p>
                <p>6~10台推荐购车赠送6000积分/台；</p>
                <p>10台以上推荐购车赠送9000积分/台；</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-13.png`)} alt=""/>
              </div>
              <div className="r">
              <div>续保得积分</div>
                <p>续保活动得积分</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-10.png`)} alt=""/>
              </div>
              <div className="r">
              <div>活动卡券</div>
                <p>消费积分赠送随卡级增长最高达80%</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-7.png`)} alt=""/>
              </div>
              <div className="r">
              <div>增换购积分</div>
                <p>增换购本品牌送10000积分</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-6.png`)} alt=""/>
              </div>
              <div className="r">
              <div>购买精品配件得积分</div>
                <p>纯牌零件、纯正精品消费即可获得积分</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-14.png`)} alt=""/>
              </div>
              <div className="r">
              <div>参与活动得积分</div>
                <p>参与节点活动，积分翻倍</p>
              </div>
            </div>
            <div className="item">
              <div className="l">
              <img src={require(`../../../imgs/shiyong-icon-4.png`)} alt=""/>
              </div>
              <div className="r">
              <div>积分商城得积分</div>
                <p>参与商城活动，赢取积分</p>
              </div>
            </div>
          </div>}
        <PicList type={type} />
      </div>
    );
  }
}

export default FengxiangDetail;
