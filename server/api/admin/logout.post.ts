export default defineEventHandler(event => { sameOrigin(event); deleteCookie(event, 'bc_admin', { path: '/' }); return { ok: true } })
