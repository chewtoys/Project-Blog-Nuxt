const pkg = require('./package')

const nodeExternals = require('webpack-node-externals')

const axios = require('axios')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: "Bactoria's Blog",
    meta: [
      { charset: 'utf-8' },
      { property: "fb:app_id", content: '223610565072661' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      { property: 'og:type', content:'website'},
      { property: 'og:title', content:'bactoria 블로그'},
      { property: 'og:description', content:'bactoria 블로그입니다.'},
      { property: 'og:image', content:'https://avatars0.githubusercontent.com/u/25674959?s=460&v=4'},
      { property: 'og:url', content:'https://bactoria.me'}
    ],
    script: [
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/image/me3.jpg' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },

  router: {
    middleware: 'category'
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000000' },

  /*
  ** Global CSS
  */
  css: [
    'vuetify/src/stylus/main.styl',
    '@/assets/scss/main.scss',

    /*for tui-editor*/
    'codemirror/lib/codemirror.css',
    'tui-editor/dist/tui-editor.css',
    'tui-editor/dist/tui-editor-contents.css',
    'highlight.js/styles/github.css',

    '@/assets/scss/paginate.scss'
  ],
  env: {
    baseUrl: 'https://bactoria.me/api'
    /*
    ** Plugins to load before mounting the App
    */

  },
  plugins: [
    '@/plugins/vuetify'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // With options
    '@nuxtjs/proxy',
    // for RSS feed
    '@nuxtjs/feed'
  ],

  proxy: {
    // Simple proxy

  },
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },
  feed: [{
    path: '/rss',

    async create(feed) {
      feed.options = {
        title: 'bactoria 블로그',
        link: 'https://bactoria.me/rss',
        description: 'bactoria 블로그',
        image: 'https://avatars0.githubusercontent.com/u/25674959?s=460&v=4',
      }

      return axios.get('https://bactoria.me/api/feed')
        .then((res) => {
          res.data.forEach(post => {
            feed.addItem({
              title: post.title,
              description: post.content,
              link: 'https://bactoria.me/post/' + post.id,
              date: new Date(post.createdDate)
            })
          })
        })
    },
    cacheTime: 1000 * 60 * 15, // 15 min
    type: 'rss2'
  }],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

      if (ctx.isServer) {
        config.externals = [
          nodeExternals({
            whitelist: [/^vuetify/]
          })
        ]
      }
    },
    uglify: {
      uglifyOptions: {
        compress: false
      },
      cache: '/path/to/cache/dir'
    },
    vendor: [ 'babel-polyfill', 'eventsource-polyfill', 'tui-editor' , 'vuejs-paginate']
  }

}
