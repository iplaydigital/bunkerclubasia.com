export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  runtimeConfig: { databaseUrl: '', adminPasswordHash: '', sessionSecret: '', siteUrl: 'https://www.bunkerclubasia.com' },
  app: { head: { title: 'Bunker Club', meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }] } },
  compatibilityDate: '2025-01-01',
})
