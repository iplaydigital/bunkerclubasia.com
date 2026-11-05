<script setup lang="ts">
defineProps<{ items: { slug:string, name:string, price:string, image:string }[] }>()
</script>
<template><div class="product-grid"><NuxtLink v-for="item in items" :key="item.slug" :to="'/'+item.slug" class="product"><div class="product-image"><img :src="item.image" :alt="item.name" loading="lazy"></div><h3>{{ item.name }}</h3><p>{{ item.price }}</p></NuxtLink></div></template>
