//生产环境标记
const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const externals = {
  // 属性名称 vue, 表示遇到 import xxx from 'vue' 这类引入 'vue'的，不去 node_modules 中找，而是去找全局变量 Vue（其他的为VueRouter、Vuex、axios、ELEMENT、echarts，注意全局变量是一个确定的值，不能修改为其他值，修改为其他大小写或者其他值会报错，若有异议可留言）
  vue: 'Vue',
  'vue-router': 'VueRouter',
  axios: 'axios',
  'element-ui': 'ELEMENT',
  'echarts': 'echarts'
}

//配置引用cdn的js、css地址
const cdn = {
  css: [
    'https://unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css'
  ],
  js: [
    'https://cdn.bootcdn.net/ajax/libs/vue/2.6.10/vue.min.js',
    'https://cdn.bootcdn.net/ajax/libs/vue-router/3.0.2/vue-router.min.js',
    'https://unpkg.com/element-ui@2.13.2/lib/index.js',
    'https://cdn.bootcdn.net/ajax/libs/axios/0.18.1/axios.min.js',
  ]
}



module.exports = {
  productionSourceMap: false,
  lintOnSave: false,
  assetsDir: 'static',
  parallel: false,
  publicPath: './',
  configureWebpack: (config) => {
    // 公共代码抽离
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          libs: {
            name: "chunk-libs",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial", // only package third parties that are initially dependent
          },
          common: {
            chunks: "all",
            test: /[\\/]src[\\/]js[\\/]/,
            name: "common",
            minChunks: 2,
            maxInitialRequests: 5,
            minSize: 0,
            priority: 60,
          },
          styles: {
            name: "styles",
            test: /\.(sa|sc|c)ss$/,
            chunks: "all",
            enforce: true,
          },
          pinyin: {
            // split pinyin libs
            name: "chunk-pinyin",
            test: /[\\/]node_modules[\\/]_?pinyin(.*)/,
            priority: 40,
            chunks: "async",
            reuseExistingChunk: true,
          },
          html2canvas: {
            // split html2canvas libs
            name: "chunk-html2canvas",
            test: /[\\/]node_modules[\\/]_?html2canvas(.*)/,
            priority: 40,
            chunks: "async",
            reuseExistingChunk: true,
          },
          runtimeChunk: {
            name: "manifest",
          },
        },
      },
    }
  },
  chainWebpack: config => {
    // 移除prefetch插件，避免加载多余的资源
    config.plugins.delete('prefetch')
    // 移除 preload 插件，避免加载多余的资源
    config.plugins.delete('preload');
    if (IS_PRODUCTION) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn
        return args
      })
      //视为一个外部库，而不将它打包进来
      config.externals(externals)
    }
  },
  devServer: {
    hot: true,
  },
  css: {
    loaderOptions: {
      // sass: {
      //   data: `
      //     @import "~@/style/variables.scss";
      //     @import "~@/style/mixin.scss";
      //   `,
      // },
      sass: {
        additionalData: `
                        @import "~@/style/variables.scss";
                        @import "~@/style/mixin.scss";
        `,
      }
    },
  },
}

