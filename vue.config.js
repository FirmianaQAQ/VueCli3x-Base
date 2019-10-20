const path = require('path')
// 显示当前环境
module.exports = {
  publicPath: './', // 基本路径(vue-cli3.3新版本)
  outputDir: 'dist', // 输出文件目录
  assetsDir: 'static', // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  // dev配置
  devServer: {
    open: true, // 配置自动启动浏览器
    port: 8828,
    https: false,
    hot: true, // 热更新
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
    // Stylus 的在每个单文件组件和 Stylus 文件中导入
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach(type => addStyleResource(config.module.rule('stylus').oneOf(type)))

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
          '@views': path.resolve(__dirname, './src/views'),
          '@api': path.resolve(__dirname, './src/api'),
          '@components': path.resolve(__dirname, './src/components'),
          '@assets': path.resolve(__dirname, './src/assets'),
          '@router': path.resolve(__dirname, './src/router'),
          '@store': path.resolve(__dirname, './src/store'),
          '@plugins': path.resolve(__dirname, './src/plugins'),
          '@public': path.resolve(__dirname, './src/public'),
          '@tools': path.resolve(__dirname, './src/tools')
        } // 别名配置
      },
      // 打印信息
      stats: {
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
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
// stylus 自动化导入文件 (用于颜色、变量、mixin……)，使用 style-resources-loader
function addStyleResource(rule) {
  rule.use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [
        path.resolve(__dirname, './src/assets/stylus/style.styl')
      ]
    })
}
