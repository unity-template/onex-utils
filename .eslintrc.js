const { getESLintConfig } = require('@iceworks/spec');

module.exports = getESLintConfig('rax-ts', {
  rules: {
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": ["error"] 
  }
});
