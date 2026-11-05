import { createHmac, timingSafeEqual } from 'node:crypto'
import type { H3Event } from 'h3'
const attempts = new Map<string, { count: number, until: number }>()
export function limit(event: H3Event, action: string, max = 15) {
  const now = Date.now()
  for (const [key, value] of attempts) if (value.until < now) attempts.delete(key)
  const key = `${action}:${getRequestIP(event) || 'unknown'}`
  const record = attempts.get(key) || { count: 0, until: now + 60_000 }
  record.count++
  attempts.set(key, record)
  if (record.count > max) throw createError({ statusCode: 429, statusMessage: 'Too many requests' })
}
export function sameOrigin(event: H3Event) {
  const origin = getHeader(event, 'origin')
  const host = getHeader(event, 'host')
  if (!origin || !host) throw createError({ statusCode: 403, statusMessage: 'Invalid origin' })
  try { if (new URL(origin).host !== host) throw new Error() } catch { throw createError({ statusCode: 403, statusMessage: 'Invalid origin' }) }
}
function secret() {
  const value = useRuntimeConfig().sessionSecret
  if (!value || value.length < 32) throw createError({ statusCode: 503, statusMessage: 'Session secret is not configured' })
  return value
}
function sign(value: string) { return createHmac('sha256', secret()).update(value).digest('hex') }
export function createSession(event: H3Event) {
  const value = String(Date.now() + 8 * 60 * 60 * 1000)
  setCookie(event, 'bc_admin', `${value}.${sign(value)}`, { httpOnly: true, sameSite: 'strict', secure: process.env.NODE_ENV === 'production', path: '/', maxAge: 8 * 60 * 60 })
}
export function requireAdmin(event: H3Event) {
  const [value, signature] = (getCookie(event, 'bc_admin') || '').split('.')
  if (!value || !signature || !/^\d+$/.test(value) || Number(value) < Date.now()) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  const expected = Buffer.from(sign(value)); const actual = Buffer.from(signature)
  if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
}
