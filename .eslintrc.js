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
    'global-require': 'off',
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never',
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/newline-after-import': 'off',
    'no-shadow': 'off',
    'no-multi-assign': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'linebreak-style': ['error', 'unix'],
    'max-len': ['error', {
      code: 1024,
      tabWidth: 2,
    }],
    'semi-style': 'off',
    'function-paren-newline': 'off',
    'class-methods-use-this': 'off',
    'object-curly-newline': 'off',
    'vue/custom-event-name-casing': 'off',
    'vue/no-mutating-props': 'off',
    'import/no-cycle': 'off',
  },
};
