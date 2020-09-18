module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins: ['arena'],
  'extends': [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  rules: {
    'no-console': 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'arena/no-hardcode-param-types': ['error', ['observation', 'variable', 'model', 'dataset']]
  },
  globals: { 'BUILDINFO': true },
  parserOptions: {
    parser: 'babel-eslint'
  },
  overrides: [
    {
      files: ['src/plots/**', 'src/configuration/**'],
      rules: {
        'arena/no-hardcode-param-types': 'off'
      }
    }
  ],
}
