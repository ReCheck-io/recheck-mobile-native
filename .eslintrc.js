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
    'comma-dangle': 0,
    'no-console': 0,
    'no-debugger': 0,
  },
};
