export default defineEventHandler(event => {
  setResponseHeader(event, 'X-Content-Type-Options', 'nosniff')
  setResponseHeader(event, 'Referrer-Policy', 'strict-origin-when-cross-origin')
  setResponseHeader(event, 'X-Frame-Options', 'DENY')
  setResponseHeader(event, 'Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
  if (getRequestURL(event).pathname.startsWith('/admin') || getRequestURL(event).pathname.startsWith('/api/')) setResponseHeader(event, 'Cache-Control', 'no-store')
})
