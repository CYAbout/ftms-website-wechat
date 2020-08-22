export const translateParams = (params) => {
  let paramString = '';
  if (params) {
    const validParams = Object.keys(params).filter((key) => params[key]);
    console.log(validParams)
    paramString = validParams.map((key) => {
      return key + '=' + encodeURIComponent(params[key]);
    }).join('&');
  }
  return paramString;
}
export const getParamsObj = (href) => {
  let url = href ? href : window.location.href;
  let obj = {};
  let reg = /\?/;
  if(url.match(reg)) {
      //判断传入参数，以问号截取，问号后是参数
      let chars = url.split('?')[1];
      //再截&号
      let arr = chars.split('&');
      //获得截取后的数组为键值对字符串
      for (let i = 0; i < arr.length; i++) {
          //保守一点确定看是否为 name=value形式
          let num = arr[i].indexOf("=");
          if (num > 0) {
              //拼接字符串
              let name = arr[i].substring(0, num);
              let value = arr[i].substr(num + 1);
              //拼接对象，并转码
              obj[decodeURIComponent(name)] = decodeURIComponent(value);
          }
      }
  }
  return obj
}
/**
 * 字符串格式化工具类
 */
export class StringFormat {
  /**
   * 将数字或数字类型的字符串格式化成货币形式如￥12,234,256.00
   * @param val 传入的值
   * @param option fixed:保留的小数位数,cash:货币符号默认是人民币￥
   */
  static toCurrency(val, op = { fixed: 0, cash: '￥' }) {
    let option = Object.assign({ fixed: 0, cash: '￥' },op)
    let num = val + '';
    if (!val) {
      return option.cash+'0.00';
    }
    num = num.replace(/[^\d.]/g,'');
    if (!num) {
      return option.cash+'0.00';
    }
    if (num.indexOf('.') > -1) {
      let arr = num.split('.');
      if (option.fixed > 0) {
        while (arr[1].length < option.fixed) {
          arr[1] += '0';
        }
        return option.cash + arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + arr[1];
      } else {
        return option.cash + arr[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
    } else {
      if (option.fixed > 0) {
        let ret = '';
        while (ret.length < option.fixed) {
          ret += '0';
        }
        return option.cash + num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,') + '.' + ret;
      } else {
        return option.cash + num.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
      }
    }
  }
  /**
   * 将数字类型区间值的字符串格式化成货币形式如￥12,234,256.00 ~ ￥12,234,258.00
   * @param val 传入的值
   * @param sep 分隔符默认是~
   * @param option fixed:保留的小数位数,cash:货币符号默认是人民币￥
   */
  static rangePrice(val, sep = '~', option = { fixed: 0, cash: '￥' }) {
    if(!val){
      return '';
    }
    if (val.indexOf(sep) < 0){
      return '';
    }
    let arr = val.split(sep);
    return StringFormat.toCurrency(arr[0].trim(), option) + ' ' + sep + ' ' + StringFormat.toCurrency(arr[1].trim(), option);
  }
}

// 手机号中间四位加*
export const translateMobile = (mobile) => {
  if (mobile && mobile.length === 11) {
    return mobile.substr(0, 3) + "****" + mobile.substr(7);
  }
  return mobile;
}

// 特殊字符替换
export const replaceSpeString = (value) => {
  var pattern = new RegExp("[`~!%¥@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
  var rs = "";
  for (var i = 0; i < value.length; i++) {
    rs = rs + value.substr(i, 1).replace(pattern, '');
  }
  return rs;
}