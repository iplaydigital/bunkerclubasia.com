export default defineEventHandler(async event => { requireAdmin(event); const [rows] = await db().query('SELECT * FROM inquiries ORDER BY id DESC LIMIT 500'); return rows })
