const path = require('path')
const utils = require('./utils')
const config = require('../config/config')
const { VueLoaderPlugin } = require('vue-loader')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')
const isDev = process.env.NODE_ENV === 'development'
module.exports = {
  entry: path.join(__dirname, '../src/entry-client.js'), //  客户端入口文件
  output: {
    path: config.prod.assetsRoot, //  文件出路目录
    filename: utils.assetsPath('js/[name].[hash:7].js'), //  出口文件名
    chunkFilename: utils.assetsPath('js/[id].[hash:7].js'), //  按需加载模块文件名
    publicPath: isDev //  资源url前缀
      ? config.dev.assetsPubPath
      : config.prod.assetsPubPath
  },
  resolve: {
    extensions: ['.js', '.jsx', '.vue'], //  可省略
    alias: { //  常用路径别名
      '@': utils.resolveBasePath('./src'),
      'views': utils.resolveBasePath('./src/views'),
      'components': utils.resolveBasePath('./src/components'),
      'images': utils.resolveBasePath('./src/assets/images'),
      'fonts': utils.resolveBasePath('./src/assets/fonts'),
      'styles': utils.resolveBasePath('./src/assets/styles'),
      'store': utils.resolveBasePath('./src/store'),
      'router': utils.resolveBasePath('./src/router'),
      'api': utils.resolveBasePath('./src/api'),
      'lib': utils.resolveBasePath('./src/lib'),
      'views': utils.resolveBasePath('./src/views')
    }
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|vue)$/, //  jsx|js|vue
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre', //  强制预检查
        options: {
          formatter: require('eslint-formatter-friendly') //  格式化错误
        }
      },
      {
        test: /\.(jsx?)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: { //  转换资源url，使其能够被webpack处理
            video: ['src', 'poster'],
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          },
          hotReload: !!isDev //  HMR
        }
      },
      {
        test: /\.pug$/,
        loader: 'pug-plain-loader'
      },
      {
        test: /\.(png|svg|gif|bmp|webp|ico|jpe?g)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, //  小于10000转base64
          name: path.join('static', 'images', '[name].[hash:7].[ext]') //  大于10000存放地址
        }
      },
      {
        test: /\.(mp3|wav|wma|flac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/medias/[name].[hash:7].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf|ico)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/fonts/[name].[hash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(), //  v15需配合webpack插件才能使用
    new VueSSRClientPlugin() //  ssr的webpack插件
  ],
  performance: {
    maxEntrypointSize: 10485760, //  入口文件最大值
    maxAssetSize: 10485760 //  单个资源最大值
  }
}
