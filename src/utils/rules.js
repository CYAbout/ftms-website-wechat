export const rule = {
  phone(data) {
    const arr = data.split('')
    const two = [0,1,2,3,4,5,6,7,8,9]
    let flag = 0
    arr.forEach((v,i) => {
      if(i > 10) {
        flag++
      }
      if(i === 0) {
        if(+v !== 1) {
          flag++
        }
      }
      if(i === 1) {
        if(two.indexOf(+v) === -1 ) {
          flag++
        }
      }
      if(i >= 2) {
        if(!(/^[0-9]*$/.test(data))) {
          flag++
        }
      }
    })
    if(flag === 0) {
      // console.log(data)
      return data
    }else {
      return false
    }
  },
  // 数字
  num(data) {
    const reg = /^[0-9]*$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  xiaoshu(data) {
    const reg = /^[0-9\.]*$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  // 正整数
  count(data) {
    const one = +data.split('')[0]
    const reg = /^[1-9]*$/
    const reg2 = /^[0-9]*$/
    if(reg.test(one)) {
      console.log(one)
      if(reg2.test(data)) {
        return data
      }else {
        return false
      }
    }else {
      console.log('one',one)
      return false
    }
   
  },
  // 字母
  letter(data) {
    const reg = /^[A-Za-z]+$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  // 小写字母
  lowercase(data) {
    const reg = /^[a-z]+$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  // 大写字母
  capital(data) {
    const reg = /^[A-Z]+$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  // 字母+数字
  letterNum(data) {
    const reg = /^[A-Za-z0-9]+$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  // 大写字母+数字
  capitalNum(data) {
    const reg = /^[A-Z0-9]+$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  name(data) {
    const reg = /^[\u4e00-\u9fa5]+$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  },
  pwd(data) {
    const reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/
    if(reg.test(data)) {
      return data
    }else {
      return false
    }
  }
}