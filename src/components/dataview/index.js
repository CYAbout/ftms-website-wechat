import React, { Component } from 'react';
import { Picker, DatePicker, Radio, Flex, Toast } from 'antd-mobile'
import { rule } from '../../utils/rules'
import { connect } from 'react-redux';
import { isBlur } from '../../redux/inputBlur.redux'
import moment from 'moment'

import './index.less'

// const RadioItem = Radio.RadioItem;

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}
class MySwitch extends Component {

  render() {
    return (
      <div className='my-switch'>
        <input id='my-switch' onChange={(e) => this.props.onChange(e.target)} type="checkbox" checked={this.props.value} />
        <label htmlFor='my-switch'>{this.props.label}</label>
      </div>
    );
  }
}

class MyRadio extends Component {

  render() {
    return (
      <ul className='my-radio'>
        {
          this.props.data.map((v, i) => {
            return (
              <li className='item' key={i}>
                <Radio
                  checked={this.props.value === v.value}
                  value={v.value}
                  onChange={e => {
                    console.log(e.target)
                    this.props.onChange(e.target.value)
                  }}
                >{v.label}</Radio>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
class MyCheckBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: props.data || [],
      value: props.value || [],
      allChecked: props.allChecked || false
    }
  }
  componentDidMount() {

  }
  componentWillUpdate(nextProps, nextState) {
    if (JSON.stringify(nextProps.data) !== JSON.stringify(this.props.data)) {
      this.setState({
        data: nextProps.data
      })
    }

  }
  onChange(t) {
    const { data } = this.state
    const item = this.state.data.find(v => v.value === t.value).value
    const newData = data.map((v) => {
      if (item === v.value) {
        v.checked = t.checked
      }
      return v
    })
    const newValue = newData.filter(v => v.checked).map(v => v.value)
    const allChecked = newData.length === newValue.length
    this.setState({
      data: newData,
      value: newValue,
      allChecked
    }, () => this.props.onChange(newValue))
  }
  onChangeAll = (t) => {
    const { data, value } = this.state
    const isAllChecked = data.length === value.length
    const newData = data.map((v) => {
      v.checked = !isAllChecked
      return v
    })
    const newValue = newData.filter(v => v.checked).map(v => v.value)
    const allChecked = newData.length === newValue.length
    this.setState({
      data: newData,
      value: newValue,
      allChecked
    }, () => this.props.onChange(newValue))
  }
  render() {
    // if(!this.state.data.length) {
    //   return null
    // }
    console.log(this.props.data, this.state.data)
    const { isShowAll = true, allName = '全部' } = this.props
    return (
      <ul className='my-switch my-checkbox'>
        {isShowAll && <li>
          <input
            id={`my-switch-all`}
            onChange={(e) => this.onChangeAll(e.target)}
            type="checkbox"
            // value={v.value}
            checked={this.state.allChecked}
          />
          <label htmlFor={`my-switch-all`}>{allName}</label>
        </li>}
        {
          this.state.data.map((v) => {
            return (
              <li key={v.value}>
                <input
                  id={`my-switch-${v.value}`}
                  onChange={(e) => this.onChange(e.target)}
                  type="checkbox"
                  value={v.value}
                  checked={v.checked}
                />
                <label htmlFor={`my-switch-${v.value}`}>{v.label}</label>
              </li>
            )
          })
        }

      </ul>
    )
  }
}
@connect(
  state => state,
  { isBlur }
)
class MyInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valuelength: props.value && props.value.length,
      toastInfo: {
        phone: '请输入正确的手机号！',
        num: '请输入数字！',
        count: '请输入有效数字！',
        letter: '请输入字母！',
        lowercase: '请输入小写字母！',
        capital: '请输入大写字母！',
        letterNum: '请输入数字或字母！',
        capitalNum: '请输入数字或大写字母！',
        name: '不能输入数字或符号！',
      }
    }
  }
  toRule(data) {
    const { ruleName, txt, value = '', num = [] } = this.props
    // 严格校验
    // const strict = ['phone','count'].indexOf(ruleName) === -1
    // 判断删除  
    // console.log(data,value)
    // if(data.length < value.length && strict) {
    //   this.props.onChange(data)
    //   return
    // }
    // 最大值最小值校验
    // if(num.length && data) {
    //   if(data < num[0] || data > num[1]) {
    //     return
    //   }
    // }
    // if(ruleName === 'letterNum') {
    //   if(rule.name(data)) {
    //     return
    //   }
    // }
    if (!ruleName) {
      console.log(data)
      this.props.onChange(data)
    } else {
      if (rule[ruleName](data) || !data) {
        this.props.onChange(data)
      } else {
        const info = txt ? txt : this.state.toastInfo[ruleName]
        Toast.info(info, 1)
      }
    }
  }
  render() {
    return (
      <div className='my-input'>
        <input
          onBlur={() => this.props.isBlur(0)}
          onFocus={() => this.props.isBlur(1)}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          disabled={this.props.disabled}
          value={this.props.value || ''}
          type={this.props.type || "text"}
          onChange={(e) => {
            this.toRule(e.target.value)
          }}
        />
      </div>
    );
  }
}
class MyInput2 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      valuelength: props.value && props.value.length,
      toastInfo: {
        phone: '请输入正确的手机号！',
        num: '请输入数字！',
        count: '请输入有效数字！',
        letter: '请输入字母！',
        lowercase: '请输入小写字母！',
        capital: '请输入大写字母！',
        letterNum: '请输入数字或字母！',
        capitalNum: '请输入数字或大写字母！',
        name: '不能输入数字或符号！',
      }
    }
  }
  toRule(data) {
    const { ruleName, txt, value = '', num = [] } = this.props
    // 严格校验
    // const strict = ['phone','count'].indexOf(ruleName) === -1
    // 判断删除  
    // console.log(data,value)
    // if(data.length < value.length && strict) {
    //   this.props.onChange(data)
    //   return
    // }
    // 最大值最小值校验
    // if(num.length && data) {
    //   if(data < num[0] || data > num[1]) {
    //     return
    //   }
    // }
    // if(ruleName === 'letterNum') {
    //   if(rule.name(data)) {
    //     return
    //   }
    // }
    if (!ruleName) {
      console.log(data)
      this.props.onChange(data)
    } else {
      if (rule[ruleName](data) || !data) {
        this.props.onChange(data)
      } else {
        const info = txt ? txt : this.state.toastInfo[ruleName]
        Toast.info(info, 1)
      }
    }
  }
  render() {
    return (
      <div className='my-input2'>
        <input
          // onBlur={() => this.props.isBlur(0)}
          // onFocus={() => this.props.isBlur(1)}
          placeholder={this.props.placeholder}
          maxLength={this.props.maxLength}
          disabled={this.props.disabled}
          value={this.props.value || ''}
          type={this.props.type || "text"}
          onChange={(e) => {
            this.toRule(e.target.value)
          }}
        />
      </div>
    );
  }
}
class MyInputarea extends Component {

  render() {
    return (
      <div className='my-input'>
        <textarea
          rows={this.props.rows || '3'}
          placeholder={this.props.placeholder}
          value={this.props.value}
          onChange={(e) => {
            this.props.onChange(e.target.value)
          }}
        />
      </div>
    );
  }
}




class MySelect extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    // 防止父组件state更新导致下拉跳动
    if ((this.props.data && !this.props.data.length) || JSON.stringify(this.props.data) !== JSON.stringify(nextProps.data)) {
      return true;
    }
    if (nextProps.value === this.props.value) {
      return false
    }
    return true
  }
  render() {
    const CustomChildren = props => (
      <div
        className='my-picker'
        onClick={props.onClick}
        style={{ color: props.value && props.value.length && (props.value[0] !== '') && '#000' }}
      >
        {props.extra}
      </div>
    );
    return (
      <div className='my-select'>
        <Picker
          disabled={this.props.disabled}
          data={this.props.data}
          extra={this.props.extra}
          cols={1}
          value={this.props.value}
          onChange={(v) => {
            this.props.onChange(v)
          }}
        >
          <CustomChildren value={this.props.value} />
        </Picker>
      </div>
    );
  }
}
class MySearchSelect extends Component {

  render() {
    const CustomChildren = props => (
      <div
        className='my-picker'
        onClick={props.onClick}
        style={{ color: props.value && props.value.length && '#000' }}
      >
        {props.extra}
      </div>
    );
    return (
      <div className='my-search-select'>
        <Picker
          disabled={this.props.disabled}
          data={this.props.data}
          extra={this.props.extra}
          cols={1}
          value={this.props.value}
          onChange={(v) => {
            this.props.onChange(v)
          }}
        >
          <div>
            <input />
            <CustomChildren value={this.props.value} />
          </div>
        </Picker>
      </div>
    );
  }
}

class MyDate extends Component {

  render() {
    const CustomChildren1 = props => {
      let data = props.extra
      if (data.indexOf('-') !== -1) {
        data = moment(data).format(props.format)
      }
      return (
        <div
          className='my-picker'
          onClick={props.onClick}
          style={{ color: props.value && '#000' }}
        >
          {data}
        </div>
      )
    };
    return (
      <div className='my-date'>
        <DatePicker
          mode={this.props.mode || 'date'}
          value={this.props.value}
          // value={moment().format()}
          maxDate={this.props.maxDate}
          minDate={this.props.minDate}
          onChange={(v) => {
            this.props.onChange(v)
          }}
          extra={this.props.extra}
        >
          <CustomChildren1 format={this.props.format || 'YYYY-MM-DD'} value={this.props.value} />
        </DatePicker>
      </div>
    );
  }
}
class MyCheckBoxEX extends Component {

  render() {
    return (
      <ul className='my-checkbox'>
        {
          this.props.data.map((v, i) => {
            return (
              <li className='item' key={i}>
                <Radio
                  checked={this.props.value.indexOf(v.value) > -1}
                  value={v.value}
                  onClick={e => {
                    this.props.onClick(v.value)
                  }}
                >{v.label}</Radio>
              </li>
            )
          })
        }
      </ul>
    );
  }
}
export {
  MyInput,
  MyInput2,
  MySelect,
  MyDate,
  MyInputarea,
  MyRadio,
  MySwitch,
  MyCheckBoxEX,
  MyCheckBox,
  MySearchSelect
};
