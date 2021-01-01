const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('rax-ts', {
  plugins: [
    "eslint-plugin-tsdoc"
  ],
  rules: {
    "no-shadow": "off",
    "tsdoc/syntax": ["error"],
    "@typescript-eslint/no-shadow": ["error"],
  }
});
