import pluginVueA11y from 'eslint-plugin-vuejs-accessibility';

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  ...pluginVueA11y.configs['flat/recommended'],
);
