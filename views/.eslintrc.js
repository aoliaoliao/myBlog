// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: [ 'plugin:vue/essential', 'airbnb-base' ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  rules: {
    // don't require .vue extension when importing
    'import/extensions': [ 'error', 'always', {
      js: 'never',
      vue: 'never'
    } ],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': "off",
    'linebreak-style': "off",
    // allow optionalDependencies
    'import/no-extraneous-dependencies': "off",
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': [ "error", "never" ],
    // allow async-await
    'generator-star-spacing': 'off',
    // // allow debugger during development
    "comma-dangle": "off",
    "space-in-parens": [ "error", "never" ],
    "space-before-function-paren": "off",
    "eqeqeq": "off",
    "no-useless-call": "off",
    "padded-blocks": "off",
    "prefer-promise-reject-errors": 'off',
    "func-call-spacing": 'off',
    "no-useless-escape": "off",
    "template-curly-spacing": [ "error", "never" ],
    "no-console": process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "array-bracket-spacing": [ "error", "always" ],
    "prefer-const": "off",
    "arrow-parens": "off",
    "no-else-return": "off",
    "max-len": "off",
    "computed-property-spacing": [ "error", "always" ],
    "no-shadow": "off",
    "no-return-assign": "off",
    "no-nested-ternary": "off",
    "no-underscore-dangle": "off",
    "no-bitwise": "off",
    "no-empty": [ "error", {
      "allowEmptyCatch": true
    } ],
    "no-mixed-operators": "off"
  }
}
