const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

const BASE_URL = '/'

module.exports = {
  baseUrl: BASE_URL,
  assetsDir: 'static/',

  // 打包时不生成.map文件
  // productionSourceMap: false,

  devServer: {
    port: 9000,
    disableHostCheck: true,
    proxy: {
      '/auth': {
        // target: 'http://192.168.9.12:9093/',  // 测试环境
        target: 'http://192.168.9.111:9093/',  // 无量
        // target: 'http://192.168.9.61:9093/',  // 葛全凯
        changeOrigin: true,
        ws: false,
        pathRewrite: {

        }
      },
      '/activity': {
        // target: 'http://47.98.39.207:19098/',
        target: 'http://192.168.9.111:9098/',
        // target: 'http://192.168.9.12:9098/',
        // target: 'http://192.168.9.63:9098/',
        // target: 'http://192.168.9.61:9098/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/': '/'
        }
      },
      '/1activity': {
        target: 'http://192.168.9.111:9098/',
        // target: 'http://192.168.9.63:9098/',
        // target: 'http://192.168.9.61:9098/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '1activity/': 'activity/'
        }
      },
      '/shops': {
        target: 'http://47.98.39.207:19192/',
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/shops': '/'
        }
      },
      '/sxwshop': {
        target: 'http://192.168.9.60:7096/', // 徐放龙
        changeOrigin: true,
        ws: false,
        pathRewrite: {
          '/sxwshop': '/'
        }
      }
    }
  }
}
