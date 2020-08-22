import React, { Component } from 'react';
import {carOwnerApi} from '../api'
import './index.less'

class IntroduceDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data:{

      }
    }
  }
  componentDidMount() {
    this.getContent()
  }
  getContent() {
    const id = this.props.match.params.id
    console.log(id)
    carOwnerApi.getMagazineDetail(id)
      .then(res => {
        if(res && res.code === '0')
        this.setState({
          data:res.data
        })
        document.title = res.data.title
      })
  }
  render() {
    const data = this.state.data
    return (
      <div className='introduce'>
        <div className="aichecontent-detail">
          <h3>{data.title && data.title}</h3>
          <div className="time">
          <div className="com-fans-time">
          {data.createAt && data.createAt}
          </div>
        </div>
        {data.content && <div dangerouslySetInnerHTML={{__html:data.content}} />}
        </div>
      </div>
    );
  }
}

export default IntroduceDetail;
