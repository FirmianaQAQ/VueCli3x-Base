/**
 * @Author: Firmiana
 * @Date: 2019-09-19 17:23:31
 * @Desc: user相关接口
 */
import { postAxios, getAxios } from '@tools/axios'

const register = async(o = {}, c = {}) => {
  return postAxios('user/register', o, {})
}
const getUserList = async(o = {}, c = {}) => {
  return getAxios('user/getUserList', o, {})
}

export default {
  register,
  getUserList
}
