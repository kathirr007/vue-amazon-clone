const URL = "http://localhost:4004"


export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/png', href: '/icon.png' },
      { rel: 'stylesheet', href: '/css/font-awesome/css/all.css' },
      { rel: 'stylesheet', href: '/css/default.css' },
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/main.scss',
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: '~/plugins/filters'},
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    // Doc: https://auth.nuxtjs.org/
    '@nuxtjs/auth',
    // Doc: https://github.com/nuxt-community/proxy-module
    '@nuxtjs/proxy'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
    // proxy: true,
    baseURL: URL
  },

  proxy: {
    // "/api": process.env.API_URL
    /* "/api": {
      target: "http://localhost:4004",
      pathRewrite: {
        '^/api' : '/'
      }
    } */
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            propertName: 'token'
          },
          logout: true
        }
      }
    }
  }
}
