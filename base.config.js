/**
 * @Author: Firmiana
 * @Date: 2019-09-16 16:27:08
 * @Desc: config配置，包含不同环境接口
 */
const baseConfig = {
  version: '1.0.0',
  // 不通业务接口前缀
  api: {
    host: ''
  },
  // 腾讯云上传配置
  cosAccount: {
    url: '',
    bucket: '',
    region: '',
    resourceUrl: ''
  },
  port: 8828 // 调试端口
}

const config = {
  development: {
    ...baseConfig
  },
  production: {
    ...baseConfig
  }
}

export default config
