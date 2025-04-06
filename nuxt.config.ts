import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
  ],

  devtools: { enabled: true },

  css: ['~/assets/css/tailwind.css'],

  compatibilityDate: '2024-11-01',

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  typescript: {
    typeCheck: true,
  },

  eslint: {
    config: {
      stylistic: {
        semi: true,
      },
    },
  },
});
