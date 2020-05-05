const StatsPlugin = require('stats-webpack-plugin')
const webpack = require('webpack')

module.exports = {
  chainWebpack: config => config.optimization.minimize(false),
  publicPath: process.env.NODE_ENV === 'production' ? (process.env.TRAVIS ? (process.env.TRAVIS_BRANCH === 'master' ? '/' : ('/branch/' + process.env.TRAVIS_BRANCH + '/')) : '/') : '/',
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
      plugins: [
          new webpack.DefinePlugin({
              'BUILDINFO': JSON.stringify({
                  time: new Date().getTime(),
                  branch: process.env.TRAVIS_BRANCH,
                  commit: process.env.TRAVIS_COMMIT,
                  buildurl: process.env.TRAVIS_BUILD_WEB_URL
              })
          })
      ]
  },
  outputDir: 'dist'
}
