/**
 * @Author: Firmiana
 * @Date: 2019-10-14 21:45:44
 * @Desc: auth相关
 */
import { postAxios, getAxios } from '@tools/axios'

const login = async(o = {}, c = {}) => {
  return postAxios('auth/login', o, {})
}
const loginOut = async(o = {}, c = {}) => {
  return postAxios('auth/loginOut', o, {})
}
const getUserInfo = async(o = {}, c = {}) => {
  return getAxios('auth/info', o, {})
}

export default {
  login,
  loginOut,
  getUserInfo
}
