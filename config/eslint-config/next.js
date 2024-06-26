/** @type {import ('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/esling-config/next'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
