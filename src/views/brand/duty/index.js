import React, { Component } from 'react';
import {Tabs} from 'antd-mobile'
import { comApi } from '../../../components/api';
import MyVideo from '../../../components/common/myvideo'
import './index.less'

class Duty extends Component {
  constructor(props) {
    super(props)
    this.state = {
      videoUrl: [],
      tabindex: 0
    }
  }
  componentDidMount() {
    this.getVideo()
  }
  getVideo() {
    comApi.getVideoUrl('Environment')
    .then(res => {
      if(res && res.code == '0') {
        this.setState({
          videoUrl:res.data
        })
      }
    })
  }
  render() {
    document.title="社会责任";
    return (
      <div className='duty'>
        <div className="title-img">
          <img src={require('../../../imgs/shehuizr-banner.png')} alt=""/>
          {/*<span style={{color:'#fff'}}>社会责任</span> */}
        </div>
        <div className="content">
          <h3 className="title">
          安全、环保、育人
          </h3>
          <div className="zeren-t">
            <p>“环境保护”，“交通安全”和“人才培养”与社会、企业和产品三方面紧密相连，</p>
            <p>一一对应，是一汽丰田企业社会责任的三大支柱，</p>
            <p>长期以来以此三大支柱为中心一汽丰田积极开展各项社会公益活动。</p>
          </div>
          <div className="zeren-c">
            <h3 className="title">
              <div>2018-2026年</div>
              <div>一汽丰田企业社会责任战略规划</div>
            </h3>
            <div className="zhanlue">
              <span>战略目标</span>：构筑有益于社会绿色健康可持续发展的社会责任体系，做“负责任的企业公民”。
            </div>
            <ul className="table-1">
              <li className="title">
                <span>时间</span>
                <span>2018-2020年</span>
                <span>2021-2023年</span>
                <span>2024-2026年</span>
              </li>
              <li>
                <span>运营</span>
                <span>体系化管理：构建企业社会责任体系</span>
                <span>企业社会责任同企业发展紧密连接</span>
                <span>产业联动：实现多跨产业联动</span>
              </li>
              <li>
                <span>方法</span>
                <span>坚持环保/育人/安全。构建企业社会责任体系</span>
                <span>企业社会责任融入企业管理及产品创新，建立可持续发展的企业社会责任体系</span>
                <span>围绕“人车社会”构建跨产业的企业社会责任体系，致力于人类社会的可持续发展</span>
              </li>
              <li>
                <span>周期</span>
                <span>2018-2020年（具体规划）</span>
                <span>2021-2023年（发展方向）</span>
                <span>2024-2026年（愿景展望）</span>
              </li>
              <li>
                <span>安全</span>
                <span>儿童交通安全主题教育行动/儿童交通安全体验营</span>
                <span>覆盖一/二线经销店实现面向客户的安全体验“场景化”</span>
                <span>相关产业联动，助推实现儿童交通安全“低伤亡”</span>
              </li>
              
              <li>
                <span>环保</span>
                <span>藏东高原景观恢复</span>
                <span>针对工厂、周边社区及特定生态区域进行有效治理</span>
                <span>联动产业上下游共同为建筑“美好城市和美好社会”贡献一己之力</span>
              </li>
              <li>
                <span>育人</span>
                <span>希望工程、丰田梦想之车、大学生筑梦行动</span>
                <span>覆盖全教育周期培养具有创新精神和社会实践能力的“双一流”人才</span>
                <span>推动人类社会可持续发展,助力中国教育事业蓬勃向上</span>
              </li>
            </ul>
          </div>
          <h3 className="title">
            实际行动
          </h3>
          <div className='tab-content'>
            <Tabs
              tabs={[{title:'安全'},{title:'环保'},{title:'育人'}]}
              animated={false}
              page={this.state.tabindex}
              swipeable={false}
              useOnPan={false}
              renderTabBar={props => <Tabs.DefaultTabBar {...props} page={3} />}
              onTabClick={(v,i) => this.setState({tabindex:i,})}
            >
            {+this.state.tabindex === 0 && <div className='wenzhang-anquan'>
              <h3 className="title mlr-0">
                <div>小手拉大手·中国家庭交通安全主题教育活动</div>
                {/* <div>安全主题教育活动</div> */}
              </h3>
              <p>
              随着汽车社会的到来，交通安全越来越重要，在这样的背景下，少年儿童的出行安全关系到他们的健康成长和生命安全，需要全社会予以关注。因此，儿童交通安全教育也日益成为社会进步的迫切需求。道路交通迅速发展，让人们日常出行变得越来越便捷。但与此同时，成年人的疏忽与儿童安全意识的缺乏，也让更多儿童的出行安全受到越来越大的威胁。据统计，中国每年有超过18500名14岁以下儿童死于道路交通事故，而这一数字还在逐年增长。
              </p>
              <p>
              从2008年起，一汽丰田汽车销售有限公司就携手中国关心下一代工作委员会等组织，持续开展“小手拉大手·中国家庭交通安全主题教育活动”项目。该项目围绕小朋友、家长、教师、幼儿园中间展开，以“体验+互动”的活动形式，在“寓教于乐”中将交通安全知识潜移默化地传递给小朋友，以期强化儿童及家庭交通安全意识，最终实现“交通事故零伤亡”的终极目标。
              </p>
              <p>
              截至今年，该活动已成功举办六届，影响家庭累计超过30万个。一汽丰田一直坚持“客户第一”的经营理念，在儿童安全教育活动中，一汽丰田始终将客户的真实体验放在心上，通过儿童绘画创作比赛、儿童剧目展演、交通安全乐园等丰富的活动形式，不断增加客户的参与感。活动受到了来自社会各界的一致好评，更打造了儿童交通安全领域的强势公益品牌。
              </p>
              <div className="img-box-two">
                <img src={require('../../../imgs/zeren-1.png')} alt=""/>
                <img src={require('../../../imgs/zeren-2.png')} alt=""/>
              </div>
              <p>
              2018年，一汽丰田与中国关心下一代工作委员会的再一次深入合作。依托于中国关心下一代工作委员会专业的调查研究，在今年的活动中，更加注重安全出行场景的打造，采用了竞赛和游戏的方式与小朋友们对话。活动中，将交通安全的严肃性和安全教育的趣味性进行了有机结合，让每一位小朋友都能在轻松、有趣的环节中将交通安全知识铭记于心。
              </p>
              <p>
              教育，要根植于爱。第六届全国儿童交通安全主题教育行动历时8个多月，面向全国1210所幼儿园的近十万家庭展开，交通安全的严肃性和安全教育的趣味性在活动中得到了有机结合。活动期间，共征集儿童交通安全主题绘画作品27000幅,儿童交通安全剧、儿童安全游戏、儿童安全故事390个，儿童安全课教师教案2320个。丰富多彩的活动内容,“体验+互动”的活动形式，让小朋友在游戏中学习交通安全的基本常识，理解遵守交通规则的重要性。
              </p>
              <p>
              同时，为了积极应对汽车市场年轻化趋势，一汽丰田一方面通过青少年儿童交通安全教育活动的举办和推广，以期形成良好的社会效应，借此呼吁年轻消费群体重视儿童交通安全问题；另一方面，在关爱儿童健康成长、关心儿童出行安全上，体现一汽丰田对未来汽年群体的长远关注。
              </p>
              <div className="img-box-two">
                <img src={require('../../../imgs/zeren-3.png')} alt=""/>
                <img src={require('../../../imgs/zeren-4.png')} alt=""/>
              </div>
            </div>}
            {+this.state.tabindex === 1 && <div className='wenzhang-anquan'>
              <div className="t-img">
                2018年藏东“丁青”雪豹守护行动
              </div>
              <ul className='hb-list'>
                <li>
                  <p>
                  西藏丁青县布托湖湿地景观恢复项目由一汽丰田、中国绿化基金会发起，丁青县人民政府、丁青县林业局、山水自然保护中心负责执行，项目希望从科学研究、生态修复、社区发展和自然体验四个角度出发，保障澜沧江上游最重要的水源涵养地——布托湖国家级湿 地公园的生态健康，促进整个景观生态系统的保护，并从基础研究和在地保护行动出发，为青藏高原东部草地恢复、水源涵养以及雪豹研究与保护等保护政策提供科学指导。
                  </p>
                  <img src={require('../../../imgs/hb-2.png')} alt=""/>
                </li>
                <li>
                  <p>
                  <span>布托湖国家级湿地公园：</span>位于西藏昌都市丁青县，距昌都机场4小时车程，约260公里。澜沧江支流色曲河上源湖盆区域，是澜沧江上游最大的湖泊。行政区范围属于丁青县丁青镇布托村和仲柏村，湿地公园规划总面积9763.06公顷。
                  </p>
                  <img src={require('../../../imgs/hb-3.png')} alt=""/>
                </li>
                <li>
                  <p>
                  中国拥有全球60%的雪豹栖息地。丁青县地处青藏高原腹地，是澜沧江的发源地，这里是中国雪豹分布的中心，也是面积最大的连续雪豹栖息地。丁青县与临近的玉树州一起，拥有全国最大最连续的雪豹栖息地澜沧江源区雪豹景观。
                  </p>
                  <img src={require('../../../imgs/hb-4.png')} alt=""/>
                  <p className="tishi">
                  图为丁青县与玉树州连接在一起，拥有全国最大最连续的一片雪豹栖息地：澜沧江源区雪豹景观
                  </p>
                </li>
              </ul>
              <h3 className="bl mt-4">
              三年项目总目标
              </h3>
              <ul className='mubiao-3'>
                <li>
                  <div>
                  <span>01</span>科学研究
                  </div>
                  <p>
                  开展草地管理与恢复、水源涵养以及雪豹种群等三个课题的研究。通过召开研讨会等形式，为青藏高原草地恢复以及雪豹研究与保护等保护政策提供科学的建议；
                  </p>
                </li>
                <li>
                  <div>
                  <span>02</span>野生动物野外保护与救护
                  </div>
                  <p>
                  加强雪豹等野生动植物的巡护与管理。全面监控县域内雪豹种群状况及伴生动物状况、以雪豹为主的野生动物栖息地变化情况和植被群落状况、县域存在的干扰状况。分组、分时段、分区域、分职能进行野外巡护。与执行机构共同合作开展野生动物救助，联合经验丰富的动物园或救助机构进行饲养，在康复之后开展野外放归行动；
                  </p>
                </li>
                <li>
                  <div>
                  <span>03</span>生态修复
                  </div>
                  <p>
                  对2000亩重度退化的草场进行植被恢复，并评估其水源涵养能力；对8000亩轻度退化的草场，通过草地管理，提高生物多样性和生产效率，评估出好的放牧方式；开展反盗猎巡护等工作，三年内实现区域内雪豹种群稳定；
                  </p>
                </li>
                <li>
                  <div>
                  <span>04</span>社区发展
                  </div>
                  <p>
                  通过建立人兽冲突基金、提高防护能力等，补偿牧民因为生态保护而受的损失，增加农牧民对于野生动物肇事的容忍度，实现人与野生动物和谐共生；
                  </p>
                </li>
                <li>
                  <div>
                  <span>05</span>自然体验
                  </div>
                  <p>
                  基于水鸟、植被以及雪豹等生物多样性调查，完善自然体验产品，建立自然体验基地，提高牧民参与生态保护的积极性；提供自然体验的机会，在规范游客影响的同时，让更多公众体验到优质的生态产品。
                  </p>
                </li>
              </ul>
              <h3 className="bl">
              雪豹视频
              </h3>
              <ul className="video-list">
              {
                this.state.videoUrl.map((v,i) => {
                  return (
                  <li key={i}>
                    <div className="video-box-play">
                      <MyVideo src={v.videoUrl} poster={v.picture}></MyVideo>
                    </div>
                    {/* <p>{v.videoName}</p> */}
                  </li>
                  )
                })
              }
              </ul>
            </div>}
            {+this.state.tabindex === 2 && <div className='wenzhang-anquan'>
              <h3 className='title'>“同·Young精彩”大学生筑梦行动</h3>
              <p>一汽丰田一直积极响应国家“精准扶贫”政策的号召，开展教育扶贫项目，致力于学子梦想的实现。“同•Young精彩”大学生筑梦行动启动于2017年，一汽丰田携手中国青少年发展基金会，每年在全国5所高校挑选200名品学兼优的大一新生，以助学金“直通车”的方式予以资助，以期在一定程度上缓解他们的生活、学习压力。</p>
              <p>一汽丰田对受助大学生的帮扶不仅体现在物质层面，而且延伸到了精神帮扶的层面，并一直持续关注着他们在学校及社会的表现，还进行了相关的回访，帮助他们建立自信，解除心理负担。在2018年的大学生筑梦行动中，一汽丰田邀请《新周刊》杂志副主编、青年作家蒋方舟为活动“梦想大使”，与同学们交流了关于成长和梦想的话题，以此鼓励学子坚守逐梦初心，努力拼搏，早日实现人生梦想。</p>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-1.png')} alt=""/>
                <img src={require('../../../imgs/yuren-2.png')} alt=""/>
              </div>
              <p>一汽丰田在与中国青少年发展基金会的公益合作中，逐步建立起从单一的“物质捐赠”到“物质捐赠+精神援助+人格培养”三位一体的公益合作模式，在这个过程中，还一直秉持着“授人以鱼，不如授人以渔”的公益态度，通过精神帮扶、社会实践等层面的努力，让每一位学子在拓展培训、社会实践等活动中，不断增加自己梦想的厚度。</p>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-3.png')} alt=""/>
                <img src={require('../../../imgs/yuren-4.png')} alt=""/>
              </div>
              <h3 className='title'>“梦想之车”儿童绘画大赛</h3>
              <p>自2004年至今，“梦想之车”全球儿童绘画大赛是一汽丰田一直持续的“公益教育”事业，该活动旨在激发孩子们的创作力，为孩子们提供宝贵的交流、表现机会，培养他们在汽车方面的兴趣，更让他们感受到拥有梦想的重要和喜悦。同时，活动还将提升中国孩子的艺术水平，加强国际间的艺术交流，最终实现中国艺术教育人才的储备。此次活动面向全国15岁以下、3个年龄分组（8岁以下组，8－11岁组，12－15岁组）的儿童展开，通过一幅幅绘画作品，分享他们对于环境保护、未来交通、生活家园及世界和平等的理解。
              </p>
              <p>
              6月2日下午，“画Young丰彩”2018年一汽丰田“梦想之车”全球儿童绘画大赛正式拉开大幕。活动中采用“线下体验+线上互动”的参赛模式，最大限度地将孩子们的参赛积极性调动了起来。而作为赛事体制中的一个亮点，应运而生的活动报名H5，通过其新颖的方式与良好的互动性，在增加活动趣味性、公正性、透明性等的同时，赢得了来自全国各地的参赛儿童及家长的极大好评。
              </p>
              <p>
              在2018年圣诞节来临之际，12月22日下午，“画Young丰彩”2018年一汽丰田“梦想之车”全球儿童绘画大赛总颁奖典礼于云·SPACE秀场拉开大幕，一汽丰田携手到场的公益嘉宾、绘画老师、媒体代表与每一个获奖家庭，在一座汽车梦幻乐园里，度过了一段美好的周末时光。
              </p>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-5.png')} alt=""/>
                <img src={require('../../../imgs/yuren-6.png')} alt=""/>
              </div>
              <h3 className='title'>
              儿童绘画大赛获奖作品
              </h3>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-7.png')} alt=""/>
                <img src={require('../../../imgs/yuren-8.png')} alt=""/>
              </div>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-9.png')} alt=""/>
                <img src={require('../../../imgs/yuren-10.png')} alt=""/>
              </div>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-11.png')} alt=""/>
                <img src={require('../../../imgs/yuren-12.png')} alt=""/>
              </div>
              <div className="img-box-two">
                <img src={require('../../../imgs/yuren-13.png')} alt=""/>
                <img src={require('../../../imgs/yuren-14.png')} alt=""/>
              </div>
            </div>}
            </Tabs>
          </div>

        </div>
      </div>
    );
  }
}

export default Duty;
