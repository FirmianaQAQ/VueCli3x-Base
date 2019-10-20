/**
 * @Author: Firmiana
 * @Date: 2019-09-19 17:35:32
 * @Desc: 封装的axios方法
 */
import axios from 'axios'
import qs from 'qs'
// import store from '@store/index'
// import * as types from '@store/mutation-types'
import utils from '@tools/utils'
import TheGlobal from '@/plugins/TheGlobal'

const baseUrl = process.env.VUE_APP_URL
const TIMEOUT = 21000

// 重组URL
async function getUrl(path, hostType) {
  return `${baseUrl}/${path}`
}
// 重组header
async function getHeader(
  token,
  contentType = 'json',
  acceptType = 'normal',
  headerParams = {}
) {
  // const k = store.state.device === APP ? 'i-token' : 'token'
  const typeMap = {
    form: 'application/x-www-form-urlencoded;charset=UTF-8',
    json: 'application/json',
    formData: 'multipart/form-data'
  }

  const t = TheGlobal.Token
  // const t = utils.helper.getToken()
  const acceptMap = {
    normal: 'application/json, text/plain, */*',
    export:
      'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8'
  }
  // const t = 'web_5WS2ESYan8pa2u+2/98vM/Dr78Q978canhikFpXQuXo='
  return {
    // 'i-token': token || t,
    'token': token || t,
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': typeMap[contentType],
    Accept: acceptMap[acceptType],
    ...headerParams
  }
}
// 重组参数
function joinParams(params, paramsType = 'normal') {
  const joinMap = {
    normal: () => {
      return params
    },
    stringify: () => {
      // return utils.base.paramToStr(params).replace(/\?/, '')
      return qs.stringify(params)
    }
  }
  return joinMap[paramsType]()
}
// 处理结果
function result(r, c) {
  const { showErrMsg = true, returnType = 'res' } = c
  // 接口正常返回
  if (r.status === 200) {
    const res = r.data
    // 处理角色权限首次上线异常
    // if (res.code === 44401) {
    //   message.error('登录过期，请重新登录')
    //   store.dispatch(types.INITIALIZE_LOGIN_OUT_GET, () => {
    //     this.$router.push('/login')
    //   })
    //   return
    // }
    // 异常处理
    if (
      res.code === 200 ||
      res.code === 0 ||
      res.errcode === 0 ||
      res.returnCode === 0
    ) {
      return returnType === 'res' ? res : res.data
    }
    if (showErrMsg) {
      // 调用外部js msgBox弹窗
      utils.base.msgBox('error', res.msg)
      // console.log(res.msg)
    }
    // 返回错误信息
    if (c.retrunErrorCode) {
      return res
    }
    return -1
  }
  console.error(r)
  return -1
}
// 错误处理
function statusError(config) {
  const response = config.response
  if (!response) {
    // 防止某些接口挂掉，导致页面空白
    console.log('系统错误')
    return
  }
  // const status = response
  // const msgMap = {
  //   400: '请求错误',
  //   401: '未授权，请登录',
  //   403: '拒绝访问',
  //   404: `请求地址出错${response.config.url}`,
  //   408: '请求超时',
  //   500: '服务器内部错误',
  //   501: '服务未实现',
  //   502: '网关错误',
  //   503: '服务不可用',
  //   504: '网关超时',
  //   505: 'HTTP版本不受支持'
  // }
  // const funcMap = {
  //   401: () => {
  //     store.dispatch(types.INITIALIZE_LOGIN_OUT_GET, () => {
  //       this.$router.push('/login?rurl=' + this.$route.path)
  //     })
  //   }
  // }
  // response.status !== 401 && message.error(msgMap[status] || '系统错误')
  // funcMap[status] && funcMap[status]()
}

// post方法
export async function postAxios(path, params = {}, c = {}) {
  const config = {
    shadow: true,
    ...c
  }
  try {
    // 更具环境配置自动拼接url ${ENV === 'dev' ? ':7001' : '/xxxx'}
    const url = await getUrl(path, config.hostType)
    // 整合参数
    const obj = {
      method: 'POST',
      url: url,
      timeout: c.timeout || TIMEOUT,
      // params: query
      data: joinParams(params, c.paramsType)
    }
    // 获取header
    // config.contentType
    // form: 'application/x-www-form-urlencoded;charset=UTF-8',
    const headers = await getHeader(
      config.token,
      config.contentType,
      config.acceptType,
      config.headerParams
    )

    const r = await axios({
      ...obj,
      headers
    })
    // 接口返回后取消遮罩

    // 接口正常返回
    return result(r, c)
  } catch (e) {
    statusError(JSON.parse(JSON.stringify(e)))
    return -1
  }
}
// get方法
export async function getAxios(path, params = {}, c = {}) {
  try {
    // ${ENV === 'dev' ? ':7001' : '/xxxx'}
    const config = {
      shadow: true,
      ...c
    }
    const url = await getUrl(path, config.hostType)
    // let token = localStorage.getItem('token') || store.state.token
    const headers = await getHeader(
      config.token,
      config.contentType,
      config.acceptType,
      config.headerParams
    )
    const r = await axios.get(`${url}?${qs.stringify(params)}`, {
      headers: headers,
      timeout: c.timeout || TIMEOUT
    })

    return result(r, c)
  } catch (e) {
    statusError(e)
    return -1
  }
}

/**
 * 方法请求第二个参数c的字段描述
 * shadow: 是否显示loading 默认值true
 * loadingText: loading 文字
 * returnType: 告诉方法返回res还是res.data 默认res
 * hostType: 告诉方法要用哪个host发起请求 默认值是host 在getUrl方法中被配置
 * contentType: 告诉方法用哪个请求头 默认值json 在getHeader中配置
 * paramsType： 告诉方法参数提交方式 默认值normal即body里json提交 在joinParams种配置
 * showErrMsg： 接口请求错误显示错误信息,默认true，
 * retrunErrorCode: 是否返回错误码  还是 -1
 * headerParams: 是否需要向header里增加参数
 * timeout:超时设置 默认10秒
 */
