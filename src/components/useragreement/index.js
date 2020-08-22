import React, { Component } from 'react';
import { Modal, Tabs } from 'antd-mobile'
import './index.less'

const closest = (el, selector) => {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}
class UserAgreement extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }
  componentDidMount() {
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
  render() {
    return (
      <div className="user-agreement">
        <Modal
          className='my-modal user-modal-box'
          visible={this.props.show}
          transparent
          maskClosable={false}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <div className='my-modal-big'>
            <h1>隐私政策</h1>
            <div
              className="close"
              onClick={() => this.props.close()}
            />
            <div className='user_register_rotocol'>
              <h2>一汽丰田顾客个人信息保护基本方针</h2>
              <div>一汽丰田汽车销售有限公司(以下简称“一汽丰田销售”)、一汽丰田销售认定的经销商（以下简称 “一汽丰田经销商”）及其各自的关联公司（包括但不限于其各自的母公司、车辆的制造公司及丰田汽车（中国）投资有限公司）（以下将“一汽丰田销售”、“一汽丰田经销商”及其各自的关联公司统称为“一汽丰田”）认为严格遵守个人信息保护相关的中国法律法规，妥善处理顾客个人姓名、地址、电话号码、邮箱地址等 能够识别顾客个人及其家庭成员身份的信息（以下简称“个人信息”），是企业重要的社会责任。基于此，“一汽丰田”制定了如下的保护个人信息基本方针。</div>
              <h2>1.个人信息的取得</h2>
              <div>1)“一汽丰田”于以下情形取得个人信息：</div>
              <p>① 销售产品、提供服务时取得的个人信息</p>
              <p>② 为了提供问询对应等取得的个人信息（包括使用来电显示取得的联系方式）；</p>
              <p>③ 实施各项调查（包括“一汽丰田”委托外部公司实施的）时取得的个人信息； </p>
              <p>④ “一汽丰田”取得的其他个人信息。</p>
              <div>2)“一汽丰田”将在取得顾客的同意后，取得其个人信息。</div>

              <h2>2.个人信息的处理 </h2>
              <div>1）关于个人信息的使用 </div>
              <p>“一汽丰田”根据前述第1.条规定取得的个人信息，将仅在“一汽丰田”内部根据需要进行共享，并且仅为以下目的或其他合法、正当的目的使用：</p>
              <p>① 与顾客进行的交易；</p>
              <p>② 商品及服务的企划、开发、改善；</p>
              <p>③ 发送与“一汽丰田”的产品、服务、宣传活动（包括但不限于汽车、保险等）相关的信息或通知；（但在未取得顾客同意的情况下，我们不会发送商业性目的的上述信息或通知）</p>

              <p>④ 在产品企划、开发或提高服务质量及顾客满意度等方面，实施的各项调查；</p>
              <p>⑤ 顾客问询、联系“一汽丰田经销商”及丰田顾客服务中心时，进行迅速的对应；</p>
              <p>⑥ 根据法律规定或政府机关、法院、调解机构、仲裁机构等的通知、指导等而采取的对应； </p>
              <p>⑦ 其他取得个人信息时所明示的使用目的</p>
              <div>2）向第三方提供个人信息</div>
              <p>“一汽丰田”根据前述第1.条规定取得的个人信息，在未取得顾客同意的情况下，不会向第三方提供或出售。但是，为了实现上述使用目的，在必要的范围内，会提供给业务受托方。于此情形下，“一汽丰田”会要求业务受托方妥当处理“一汽丰田”所提供的个人信息，并进行妥善管理。</p>
              <div>3）妥善管理个人信息 </div>
              <p>为了对个人信息严格保密，防止不正当接触个人信息，防止个人信息丢失、损坏、被篡改、泄露等，“一汽丰田”采取了妥善的安全措施，并且将在因前述事由导致事故后采取救济措施。</p>
              <h2>3.问询等</h2>
              <p>关于个人信息的相关问询，请就近联系“一汽丰田经销商”或“一汽丰田顾客服务中心”。“一汽丰田”将严格遵守个人信息保护相关的中国法律法规，进行妥善处理。</p>
              <p>·关于就近的“一汽丰田经销商”</p>
              <p>【http://www.ftms.com.cn/buycar/chaxunjxs】</p>
              <p>·“一汽丰田顾客服务中心”</p>
              <p>【电话：800-810-1210，400-810-1210】</p>
              <h2>4.遵纪守法与改善</h2>
              <p>“一汽丰田”将严格遵守个人信息保护相关的中国法律法规，并为了妥善处理个人信息而进行持续性的改善，并会将改善内容随时体现在本基本方针中。</p>
            </div>

          </div>
        </Modal>
      </div>
    );
  }
}

export default UserAgreement;
