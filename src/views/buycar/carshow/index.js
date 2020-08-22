import React, { Component } from 'react';
import {MyCheckBox,MyInput} from '../../../components/dataview'
import Gotop from '../../../components/common/gotop'
import './index.less'

class Carshow extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value:''
    }
  }
  onChange = (type,val) => {
    // console.log(val)
    this.setState({
      [type]:val
    })
  }
  render() {
    return (
      <div className='carshow'>
        <MyCheckBox />
        <MyInput
          ruleName='phone'
          // maxLength={3}
          // txt='hahah'
          strict={true}
          value={this.state.value}
          onChange={(v) => this.onChange('value',v)}
         />
         {/* <Gotop /> */}
      </div>
    );
  }
}

export default Carshow;
