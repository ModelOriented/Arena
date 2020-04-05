const StatsPlugin = require('stats-webpack-plugin')

module.exports = {
  chainWebpack: config => config.optimization.minimize(false),
  publicPath: process.env.NODE_ENV === 'production' ? (process.env.TRAVIS ? (process.env.TRAVIS_BRANCH === 'master' ? '/' : ('/branch/' + process.env.TRAVIS_BRANCH + '/')) : '/') : '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  outputDir: 'dist'
}
