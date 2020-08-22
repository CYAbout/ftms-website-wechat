import React, { Component } from 'react';
import { carOwnerApi } from '../api';
import moment from 'moment'
import './index.less'
class FxhDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:[]
    }
  }
  componentDidMount() {
    this.activityDetail()
  }
  componentWillReceiveProps(nextProps) {
    if(this.props.match.params.id != nextProps.match.params.id) {
      this.activityDetail(nextProps.match.params.id)
    }
  }
  activityDetail(ids) {
    const id = ids ? ids : this.props.match.params.id
    console.log(id)
    carOwnerApi.activityDetail(id)
    .then(res => {
      if(res && res.code == 0) {
        this.setState({
          data: res.data
        })
        document.title = res.data.title
      }
    })
  }
  render() {
    console.log(this.props)
    const {data} = this.state
    if(!data.title) {
      return <div className='no-data'>暂无数据</div>
    }
    return (
      <div className='fxh-detail'>
        <h3 className="title">
          {data.title}
        </h3>
        <div className="time">
          <div className="com-fans-time">
          {moment(data.activityDate).format('YYYY-MM-DD')}
          </div>
          {/* <div className="com-fans-pl">
            <span className="kan">{data.read_num}</span>
            <span className="pl">{data.share_num}</span>
            <span className="like">{data.like_num}</span>
          </div> */}
        </div>

        {/* <div className="content">
          <div className="pic">
            <img src={data.thumb} alt=""/>
          </div>
          <p>{data.description}</p>
        </div> */}
        <div className="content" dangerouslySetInnerHTML={{__html:data.content}} />
      </div>
    );
  }
}

export default FxhDetail;
