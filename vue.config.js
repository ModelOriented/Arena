const StatsPlugin = require('stats-webpack-plugin')
module.exports = {
  chainWebpack: config => config.optimization.minimize(false),
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}
