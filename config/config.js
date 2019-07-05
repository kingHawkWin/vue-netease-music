
const path = require('path')
module.exports = {
  'dev': {
    assetsSubDir: 'static', //  dev资源放置处
    assetsPubPath: '/', //  资源公共路径
    devtool: 'cheap-module-eval-source-map',
    notifyOnErrors: true
  },
  'prod': {
    assetsRoot: path.join(__dirname, '../dist'), //  prod根路径
    assetsSubDir: 'static', // 资源子目录
    assetsPubPath: '', //  资源公共路径
    devtool: 'source-map'
  }
}
