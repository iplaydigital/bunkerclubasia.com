import bcrypt from 'bcryptjs'
import { z } from 'zod'
export default defineEventHandler(async event => {
  sameOrigin(event); limit(event, 'login', 5)
  const body = z.object({ password: z.string().max(200) }).safeParse(await readBody(event))
  const hash = useRuntimeConfig().adminPasswordHash
  if (!hash) throw createError({ statusCode: 503, statusMessage: 'Admin is not configured' })
  if (!body.success || !await bcrypt.compare(body.data.password, hash)) throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' })
  createSession(event); return { ok: true }
})
