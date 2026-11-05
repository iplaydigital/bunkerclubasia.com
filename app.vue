<script setup lang="ts">
const lang = useState<'en'|'th'>('language', () => 'en')
const route = useRoute()
useHead(() => ({ htmlAttrs: { lang: lang.value }, link: [{ rel: 'canonical', href: `https://www.bunkerclubasia.com${route.path === '/' ? '/' : route.path.replace(/\/$/, '') + '/'}` }], meta: [{ name: 'description', content: 'Bunker Club — premium golf bags and accessories inspired by automotive culture.' }] }))
</script>
<template>
  <div>
    <div class="announcement">{{ lang === 'th' ? 'จำหน่ายผ่านร้านค้าเท่านั้น' : 'AVAILABLE IN STORE' }}</div>
    <header class="header">
      <NuxtLink to="/" class="brand">BUNKER CLUB<span>ASIA</span></NuxtLink>
      <nav aria-label="Main navigation">
        <NuxtLink to="/collections">{{ lang === 'th' ? 'คอลเลกชัน' : 'COLLECTIONS' }}</NuxtLink>
        <NuxtLink to="/family-friends-collection">FAMILY &amp; FRIENDS</NuxtLink>
        <NuxtLink to="/about-us">{{ lang === 'th' ? 'เกี่ยวกับเรา' : 'ABOUT US' }}</NuxtLink>
        <NuxtLink to="/contact-us">{{ lang === 'th' ? 'ติดต่อเรา' : 'CONTACT US' }}</NuxtLink>
      </nav>
      <div class="header-actions"><NuxtLink to="/quote">{{ lang === 'th' ? 'ขอใบเสนอราคา' : 'REQUEST A QUOTE' }}</NuxtLink><button @click="lang = lang === 'en' ? 'th' : 'en'">{{ lang === 'en' ? 'TH' : 'EN' }}</button></div>
    </header>
    <main><NuxtPage /></main>
    <footer><div><NuxtLink to="/" class="brand">BUNKER CLUB<span>ASIA</span></NuxtLink></div><div><h3>EXPLORE</h3><NuxtLink to="/collections">Collections</NuxtLink><NuxtLink to="/about-us">About Us</NuxtLink><NuxtLink to="/contact-us">Contact Us</NuxtLink></div><div><h3>CONTACT</h3><a href="mailto:support@bunkerclubasia.com">support@bunkerclubasia.com</a><p>Daily, 09:00 AM – 06:00 PM</p></div><small>© {{ new Date().getFullYear() }} Bunker Club Asia</small></footer>
    <ChatWidget v-if="!route.path.startsWith('/admin')" />
  </div>
</template>
