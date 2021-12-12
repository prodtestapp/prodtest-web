import 'dayjs/plugin/utc'
import 'dayjs/plugin/timezone'
import 'dayjs/plugin/localizedFormat'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'prodtest-web',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/TailwindUI.js',
    '~/plugins/Axios.js',
    '~/plugins/CodeEditor.js',
    '~/plugins/Draggable.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',
    '@nuxtjs/auth-next',
    '@nuxtjs/toast',
    '@nuxtjs/dayjs'
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NUXT_ENV_API_BASE_URL
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  i18n: {
    locales: [
      { code: 'en', file: 'en.json' },
    ],
    defaultLocale: 'en',
    lazy: true,
    strategy: 'no_prefix',
    alwaysRedirect: true,
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_locale',
    },
    langDir: 'languages/',
  },

  auth: {
    strategies: {
      'laravelJWT': {
        provider: 'laravel/jwt',
        url: process.env.NUXT_ENV_API_BASE_URL + "/auth/",
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'token' },
          user: { url: 'me', method: 'get' },
          logout: { url: 'logout', method: 'post' },
        },
        token: {
          property: 'access_token',
          maxAge: 60 * 60
        },
        refreshToken: {
          maxAge: 20160 * 60
        },
      },
    }
  },

  toast: {
    position: 'top-right',
    register: []
  },

  dayjs: {
    locales: ['en'],
    defaultLocale: 'en',
    defaultTimeZone: 'Europe/Istanbul',
    plugins: [
      'utc',
      'timezone',
      "localizedFormat"
    ]
  }
}
