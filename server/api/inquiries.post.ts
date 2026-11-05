import { z } from 'zod'
import { products } from '../../shared/products'
const schema = z.object({ kind: z.enum(['contact','quote']), name: z.string().trim().min(1).max(120), email: z.string().trim().email().max(254), phone: z.string().trim().max(50).default(''), model: z.string().max(255).default(''), message: z.string().trim().max(4000).default('') })
export default defineEventHandler(async event => {
  sameOrigin(event); limit(event, 'inquiry', 5)
  const parsed = schema.safeParse(await readBody(event))
  if (!parsed.success || (parsed.data.kind === 'quote' && !products.some(p => p.slug === parsed.data.model)) || (parsed.data.kind === 'contact' && !parsed.data.message)) throw createError({ statusCode: 400, statusMessage: 'Invalid form' })
  const { kind, name, email, phone, model, message } = parsed.data
  await db().execute('INSERT INTO inquiries (kind,name,email,phone,model,message) VALUES (?,?,?,?,?,?)', [kind,name,email,phone,model,message])
  return { ok: true }
})
