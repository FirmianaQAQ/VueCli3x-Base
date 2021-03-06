/**
 * @Author: Firmiana
 * @Date: 2019-04-03 11:18:19
 * @Last Modified by: Firmiana
 * @Last Modified time: 2019-10-20 14:46:54
 * @Desc: 基础方法/未分a类方法
 */

import that from '@/main.js'

/**
* 外部使用msgBox的推出方法
*/
export function msgBox(type, str) {
  that.$msg({ type: type, text: str })
}

/**
 * 解析查询查询为对象默认解析浏览器url
 * @returns {{}}
 */
export function searchToObj() {
  const search = window.location.href.split('?')[1]
  if (!search) {
    return {}
  }
  const arr = search.split('&')
  const obj = {}
  arr.forEach(item => {
    const r = item.split('=')
    obj[r[0]] = r[1]
  })
  // console.log(obj)
  return obj
}

/**
 * 转对象为字符串参数
 * @param o {object} 要处理的对象
 * @returns {string}
 */
export function paramToStr(o = {}) {
  let str = ''
  for (const k in o) {
    str += `${k}=${o[k]}&`
  }
  return str ? `?${str.replace(/&$/, '')}` : str
}

/**
 * 截取字符串
 * @param str {string} 要截取的对象
 * @param start {number} 起始位置
 * @param end {number} 结束位置
 * @returns {string}
 */
export function strStartEnd(str, start = 7, end = 11) {
  str += ''
  return str.substring(start, end)
}

/**
 * 首字母大写
 * @param str {string} 要处理的字符串
 */
export function titleCase(str) {
  return `${str[0].toUpperCase()}${str.substring(1)}`
}

/**
 * 给小于10的数字 前置补0
 * @param n {number} 数字
 * @returns {string}
 */
export function zeroFill(n) {
  return n < 10 ? '0' + n : n
}

/**
 * 计算字符长度，汉字算2个
 * @param str {string} 要计算的字符串
 * @returns {number}
 */
export function calcStrLength(str = '') {
  return str.replace(/[\u0391-\uFFE5]/g, 'aa').length
}

/**
 * 千分位分割
 * @param num {number} 要处理的数字
 * @return {string}
 */
export function toThousands(num) {
  num = +num
  num = (num || 0) + ''
  let r = ''
  while (num.length > 3) {
    r = ',' + num.slice(-3) + r
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    r = num + r
  }
  return r
}

/**
 * 数字动画
 * @param dom {document} 动画数字显示的dom
 * @param num {number} 起始数字
 * @param maxNum {number} 结束数字
 */
export function numRunFun(dom, num, maxNum) {
  // console.log(maxNum)
  if (num === 0) {
    dom.innerHTML = maxNum
    return
  }
  var numText = num
  var golb // 为了清除requestAnimationFrame
  function numSlideFun() {
    numText += 1 // 速度的计算可以为小数
    if (numText >= maxNum) {
      numText = maxNum
      window.cancelAnimationFrame(golb)
    } else {
      golb = window.requestAnimationFrame(numSlideFun)
    }
    dom.innerHTML = ~~numText
  }

  numSlideFun()
}

/**
 * 获取各浏览器激活字段
 * @returns {string}
 */
export function getHiddenName() {
  let name = ''
  if ('hidden' in document) {
    name = 'hidden'
  }
  if ('webkitHidden' in document) {
    name = 'webkitHidden'
  }
  if ('mozHidden' in document) {
    name = 'mozHidden'
  }
  return name
}

/**
 * 获取字节长度
 * @param val {string} 要处理的字符串
 * @returns {number}
 */
export function getByteLen(val) {
  let len = 0
  for (let i = 0; i < val.length; i++) {
    if (val[i].match(/[^\x00-\xff]/gi) !== null) {
      len += 1
    } else {
      len += 0.5
    }
  }
  return Math.floor(len)
}

/**
 * 清理数组
 * @param {Array} actual 当前数组
 */
export function cleanArray(actual) {
  const newArray = []
  for (let i = 0; i < actual.length; i++) {
    if (actual[i]) {
      newArray.push(actual[i])
    }
  }
  return newArray
}

/**
 * 转化成参数
 * @param json {object} 要处理的对象
 * @return {string}
 */
export function jsonToParam(json) {
  if (!json) return ''
  return cleanArray(
    Object.keys(json).map(key => {
      if (json[key] === undefined) return ''
      return encodeURIComponent(key) + '=' + encodeURIComponent(json[key])
    })
  ).join('&')
}

/**
 * 解析search部分成Obj
 * @param url {string} url
 * @return {*}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"') +
    '"}'
  )
}

/**
 * url操作/转换
 * @param url
 */
export function getQueryObject(url) {
  url = url === null ? window.location.href : url
  const search = url.substring(url.lastIndexOf('?') + 1)
  const obj = {}
  const reg = /([^?&=]+)=([^?&=]*)/g
  search.replace(reg, (rs, $1, $2) => {
    const name = decodeURIComponent($1)
    let val = decodeURIComponent($2)
    val = String(val)
    obj[name] = val
    return rs
  })
  return obj
}

/**
 * 获取实时随机字符串
 */
export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536, 10) + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function toMoney(value, p) {
  let num = value + ''
  num = num.replace(new RegExp(',', 'g'), '')
  let symble = ''
  if (/^([-+]).*$/.test(num)) {
    symble = num.replace(/^([-+]).*$/, '$1')
    num = num.replace(/^([-+])(.*)$/, '$2')
  }
  if (/^[0-9]+(\.[0-9]+)?$/.test(num)) {
    num = num.replace(new RegExp('^[0]+', 'g'), '')
    if (/^\./.test(num)) {
      num = '0' + num
    }
    let decimal = num.replace(/^[0-9]+(\.[0-9]+)?$/, '$1')
    let integer = num.replace(/^([0-9]+)(\.[0-9]+)?$/, '$1')
    const re = /(\d+)(\d{3})/
    while (re.test(integer)) {
      integer = integer.replace(re, '$1,$2')
    }
    if (+p) {
      decimal = decimal.substr(0, (+p + 1))
    }
    if (p === 0) {
      decimal = ''
    }
    return symble + integer + decimal
  } else {
    return p
  }
}
