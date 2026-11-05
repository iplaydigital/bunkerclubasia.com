<script setup lang="ts">
import { products } from '~/shared/products'
useSeoMeta({ title:'Family & Friends Collection – Bunker Club' })
</script>
<template><section class="wrap page"><div class="page-heading"><span class="eyebrow">THE BUNKER CLUB</span><h1>Family &amp; Friends Collection</h1></div><ProductGrid :items="products.filter(p => p.slug.includes('family-friends'))" /></section></template>
