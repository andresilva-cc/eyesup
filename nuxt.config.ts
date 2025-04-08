import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  modules: [
    '@nuxt/eslint',
    '@nuxt/test-utils/module',
    '@nuxt/fonts',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],

  devtools: { enabled: true },

  app: {
    head: {
      title: 'EyesUp',
    },
  },

  css: [
    '~/assets/css/tailwind.css',
    '~/assets/css/global.css',
  ],

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
