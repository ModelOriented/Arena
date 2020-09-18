module.exports = {
  rules: {
    'no-hardcode-param-types': {
      meta: {
        schema: [
          { 'type': 'array', 'items': { 'type': 'string' } }
        ]
      },
      create: function (context) {
        return {
          Literal (node) {
            if (context.options[0].includes(node.value)) {
              context.report(node, 'Do not use hardcoded param types')
            }
          }
        }
      }
    }
  }
}
