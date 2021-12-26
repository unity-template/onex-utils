const { getESLintConfig } = require('@iceworks/spec');
const { off } = require('process');

module.exports = getESLintConfig('rax-ts', {
  plugins: [
    "eslint-plugin-tsdoc"
  ],
  rules: {
    "no-shadow": "off",
    "tsdoc/syntax": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
    "@iceworks/best-practices/recommend-polyfill": "off",
    "@iceworks/best-practices/recommend-functional-component": "off",
    "indent": ["error", 4],
    "@typescript-eslint/indent": "off",
    "tsdoc/syntax": "warn"
  }
});
