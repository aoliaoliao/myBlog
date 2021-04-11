module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true
  },
  extends: ['airbnb-base', 'plugin:prettier/recommended', 'eslint:recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    parser: 'babel-eslint', //词法解析器使用babel-eslint，以更好的适配es6的新api
    ecmaVersion: 2018
  },
  rules: {
    'prettier/prettier': 'error',
    'generator-star-spacing': 'off',
    'import/no-named-as-default': 'off',
    'import/no-named-as-default-member': 'off',
    'no-unused-vars': [
      'error',
      { vars: 'all', args: 'none', ignoreRestSiblings: false }
    ], // 没有使用的参数，不会报错。因为个人觉的把可用的参数写上去 有利于以后的维护。
    'no-var': 'error',
    'no-console': 0
  }
}
