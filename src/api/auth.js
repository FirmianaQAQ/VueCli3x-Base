/**
 * @Author: Firmiana
 * @Date: 2019-10-14 21:45:44
 * @Desc: auth相关
 */
import { postAxios, getAxios } from '@tools/AppAxios'
import axios from 'axios'

const login = async(o = {}, c = {}) => {
  return postAxios('auth/login', o, {})
}

const loginOut = async(o = {}, c = {}) => {
  return postAxios('auth/loginOut', o, {})
}

const getUserInfo = async(o = {}, c = {}) => {
  return getAxios('auth/info', o, {})
}

const getBingImage = async() => {
  const res = await axios.get(
    'https://jsonp.afeld.me/?url=https%3A%2F%2Fwww.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1'
  )
  const { data } = res
  let imgUrl = ''
  if (data) {
    imgUrl = 'https://www.bing.com' + data.images[0].url
  }
  return imgUrl
}

export default {
  login,
  loginOut,
  getUserInfo,
  getBingImage
}
