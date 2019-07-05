module.exports = {
  'presets': [
    [
      '@babel/preset-env', //  允许最新js
      {
        'targets': { //  描述为项目支持的环境
          'browsers': [
            '> 1%', //  市场份额
            'last 2 versions', //  最后两版本
            'not ie <=11'
          ],
          'node': 'current'
        }
      }
    ]
  ],
  'plugins': [
    require('@vue/babel-plugin-transform-vue-jsx'),
    require('@babel/plugin-syntax-dynamic-import'), //  import()
    require('@babel/plugin-transform-runtime')
  ]
}
