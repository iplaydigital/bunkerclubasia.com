<script setup lang="ts">
const lang = useState<'en'|'th'>('language')
const open = ref(false), text = ref(''), error = ref(''), messages = ref<any[]>([]), sending = ref(false)
let timer: ReturnType<typeof setInterval> | undefined
async function refresh() { try { messages.value = await $fetch<any[]>('/api/chat') } catch { error.value = lang.value === 'th' ? 'ไม่สามารถโหลดข้อความได้' : 'Unable to load messages.' } }
watch(open, value => { if (value) { refresh(); timer = setInterval(refresh, 10000) } else if (timer) clearInterval(timer) })
onUnmounted(() => { if (timer) clearInterval(timer) })
async function send() { if (!text.value.trim() || sending.value) return; sending.value = true; error.value = ''; try { await $fetch('/api/chat', { method:'POST', body:{ message:text.value } }); text.value=''; await refresh() } catch { error.value = lang.value === 'th' ? 'ส่งข้อความไม่สำเร็จ กรุณาลองใหม่' : 'Could not send. Please try again.' } finally { sending.value=false } }
</script>
<template><div class="chat"><div v-if="open" class="chat-panel"><div class="chat-head"><strong>BUNKER CLUB</strong><button aria-label="Close chat" @click="open=false">×</button></div><p class="chat-intro">{{ lang === 'th' ? 'ฝากข้อความถึงเราได้ที่นี่ ทีมงานจะตอบกลับเมื่อพร้อมให้บริการ' : 'Leave us a message and our team will reply when available.' }}</p><div class="chat-messages" aria-live="polite"><p v-for="m in messages" :key="m.id" :class="m.sender">{{ m.message }}</p></div><p v-if="error" class="error">{{ error }}</p><form @submit.prevent="send"><input v-model="text" maxlength="2000" :placeholder="lang === 'th' ? 'พิมพ์ข้อความ...' : 'Write a message...'" aria-label="Message"><button :disabled="sending">{{ lang === 'th' ? 'ส่ง' : 'Send' }}</button></form></div><button class="chat-toggle" @click="open=!open">{{ open ? '×' : (lang === 'th' ? 'แชตกับเรา' : 'CHAT WITH US') }}</button></div></template>
