module.exports = {
  'root': true, //  不会影响项目之外
  'env': {
    'browser': true,
    'node': true
  },
  'extends': [ //  规则
    'standard',
    'plugin:vue/recommended'
  ],
  'parserOptions': {
    'parser': 'babel-eslint',
    'ecmaVersion': 9,
    'sourceType': 'module',
    'ecmaFeatures': {
      'impliedStrict': true, //  可以为全局严格模式
      //'jsx': true
    }
  },
  'rules': {
    'no-var': 'error',
    'strict': 'error',
    'eol-last': 'error' //  文件末尾必须换行
  },

}
