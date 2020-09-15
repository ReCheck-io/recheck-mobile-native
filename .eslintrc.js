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
    'semi': 0,
    'no-unused-expressions': 0,
    'consistent-return': 0,
    'prefer-const': 0,
    'no-unused-vars': 0,
    'no-shadow': 0,
    'no-alert': 0,
    'no-console': 0,
    'no-debugger': 0,
    'comma-dangle': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
    'import/prefer-default-export': 0,
  },
};
