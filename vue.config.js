const StatsPlugin = require('stats-webpack-plugin')
module.exports = {
  chainWebpack: config => config.optimization.minimize(false),
  publicPath: process.env.NODE_ENV === 'production' ? '/Arena/' : '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  }
}
