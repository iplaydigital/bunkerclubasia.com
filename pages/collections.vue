<script setup lang="ts">
import { products } from '~/shared/products'
useSeoMeta({ title:'Collections – Bunker Club' })
</script>
<template><section class="wrap page"><div class="page-heading"><span class="eyebrow">THE BUNKER CLUB</span><h1>Collections</h1></div><div class="collection-meta"><span>ALL PRODUCTS</span><span>{{ products.length }} PRODUCTS</span></div><ProductGrid :items="products" /></section></template>
