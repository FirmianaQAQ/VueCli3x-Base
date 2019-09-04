const path = require('path')

module.exports = {
  publicPath: './', // 基本路径
  outputDir: 'dist', // 输出文件目录
  // dev配置
  devServer: {
    open: true,
    port: 8828,
    https: false,
    hot: true,
    proxy: null,
    overlay: {
      warnings: false,
      errors: true
    }, // 错误、警告在页面弹出
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000,
      ignored: /node_modules/
    }
  },
  // 文件名中的hash
  filenameHashing: true,
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // 调整内联文件大小限制 10kb
  chainWebpack: config => {
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap(options => Object.assign(options, { limit: 10240 }))
  },
  // webpack配置
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      config.mode = 'production'
    } else {
      // 为开发环境修改配置...
      config.mode = 'development'
    }
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@components': path.resolve(__dirname, './src/components'),
          '@views': path.resolve(__dirname, './src/views'),
          '@assets': path.resolve(__dirname, './src/assets')
        } // 别名配置
      }
    })
  },
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: false,
  // css相关配置
  css: {},
  // 第三方插件配置
  pluginOptions: {},
  // PWA 插件相关配置
  pwa: {}
}
