module.exports = {
  extends: 'airbnb-base',
  plugins: [
    'import',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
};
