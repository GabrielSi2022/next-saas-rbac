/** @type {import ('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/esling-config/node'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
