const fs = require('fs')
const path = require('path')
const MFS = require('memory-fs') //  文件写入内存，而不是硬盘
const webpack = require('webpack')
const chokidar = require('chokidar') //  监听文件变化，兼容性优于fs.watch
const devConfig = require('./webpack.config.dev')
const serverConfig = require('./webpack.config.server')
const webpackDevMiddleware = require('./middleware/dev') //  webpack热加载所需
const webpackHotMiddleware = require('./middleware/hot') //  配合热加载实现热模块替换
const readFile = (fs, file) => { //  读取vue-ssr-webpack-plugin的生成文件
  try {
    return fs.readFileSync(path.join(devConfig.output.path, file), 'utf-8')
  } catch (e) {
    console.log('读取文件错误：', e)
  }
}
module.exports = function setupDevServer (app, templatePath, cb) {
  let bundle
  let template
  let clientManifest
  const update = () => { //  监听到改变后更新函数
    if (bundle && clientManifest) {
      cb(bundle, {
        template,
        clientManifest
      })
    }
  }
  template = fs.readFileSync(templatePath, 'utf-8')
  chokidar.watch(templatePath).on('change', () => { //  监听html模板
    template = fs.readFileSync(templatePath, 'utf-8')
    update()
  })
  //  修改webpack入口，配合热模块替换
  devConfig.entry.app = ['webpack-hot-middleware/client?path=/__webpack_hmr&timeout=1000&reload=true', devConfig.entry.app]
  const clientCompiler = webpack(devConfig) //  编译clientWebpack，插入koa middleware
  const devMiddleware = webpackDevMiddleware(clientCompiler, {
    publicPath: devConfig.output.publicPath,
    noInfo: true
  })
  app.use(devMiddleware)
  clientCompiler.plugin('done', stats => {
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(err => console.warn(err))
    if (stats.errors.length) return
    clientManifest = JSON.parse(readFile(
      devMiddleware.fileSystem,
      'vue-ssr-client-manifest.json'
    ))
    update()
  })
  app.use(webpackHotMiddleware(clientCompiler)) //  插入koa middleware
  const serverCompiler = webpack(serverConfig)
  const mfs = new MFS()
  serverCompiler.outputFileSystem = mfs
  serverCompiler.watch({}, (err, stats) => {
    if (err) throw err
    stats = stats.toJson()
    if (stats.errors.length) return
    bundle = JSON.parse(readFile(mfs, 'vue-ssr-server-bundle.json')) //  vue-ssr-webpack-plugin生成的bundle
    update()
  })
}
