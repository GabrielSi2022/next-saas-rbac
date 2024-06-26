/** @type {import ('eslint').Linter.Config} */
module.exports = {
  extends: ['@rocketseat/esling-config/react'],
  plugins: ['simple-import-sort'],
  rules: {
    'simple-import-sort/imports': 'error',
  },
}
