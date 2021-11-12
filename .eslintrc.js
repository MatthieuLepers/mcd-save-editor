module.exports = {
  root: true,
  parserOptions: {
    parser: '@babel/eslint-parser',
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    jest: true,
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  globals: {
    __static: true,
  },
  plugins: [
    'vue',
  ],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: '.electron-vue/webpack.renderer.config.js',
      },
    },
  },
  rules: {
    'global-require': 0,
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': 0,
    'import/newline-after-import': 0,
    'no-shadow': 0,
    'no-multi-assign': 0,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': ['error', 'windows'],
    'max-len': [
      'error',
      {
        code: 2000,
        tabWidth: 2,
      },
    ],
    'semi-style': 0,
    'function-paren-newline': 0,
    'class-methods-use-this': 0,
    'object-curly-newline': 0,
    'vue/custom-event-name-casing': 0,
    'vue/no-mutating-props': 0,
    'import/no-cycle': 0,
  },
};
