module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
  ],
  parserOptions: {
    parser: 'babel-eslint',
  },
  rules: {
    'no-alert': 0,
    'no-console': 0,
    'no-debugger': 0,
    'comma-dangle': 0,
    'no-return-assign': 0,
    'import/prefer-default-export': 0,
  },
};
