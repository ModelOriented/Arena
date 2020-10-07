export default {
  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'Arena',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@fortawesome/fontawesome/styles.css',
    '@/assets/sass/main.sass'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/font-awesome.js',
    { src: '@/plugins/vimeo-player.js', ssr: false }
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios'
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {},

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    styleResources: {
      sass: './assets/sass/variables.sass'
    },
    publicPath: process.env.NODE_ENV === 'production' ? '/' : '/_nuxt/',
    extend (config, { isDev, isClient }) {
      config.module.rules.push({
        resourceQuery: /blockType=codesrc/,
        loader: require.resolve('./code-loader.js')
      })
    },
    babel: {
      babelrc: true
    },
    vendor: [
      'vue-vimeo-player'
    ]
  },

  router: {
    base: '/docs/'
  }
}