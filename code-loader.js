const loaderUtils = require('loader-utils')

module.exports = function (source, map) {
  const index = loaderUtils.parseQuery(this.resourceQuery).index
  source = source.replace(/^\n*/, '').replace(/\n*$/, '')
  this.callback(
    null,
    `export default function (Component) {
      if (!Component.exports.computed) {
        Component.exports.computed = {}
      }
      Component.exports.computed.code${index} = () => {
        return ${JSON.stringify(source)}
      }
    }`,
    map
  )
}
