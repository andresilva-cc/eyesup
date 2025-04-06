/**
 * @filename: lint-staged.config.js
 * @type {import('lint-staged').Configuration}
 */
export default {
  '*.{js,mjs,cjs,ts,mts,cts,vue}': 'eslint',
  '*.{css,vue}': 'stylelint',
};
