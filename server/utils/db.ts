import mysql from 'mysql2/promise'
let pool: mysql.Pool | undefined
export function db() {
  const url = useRuntimeConfig().databaseUrl
  if (!url) throw createError({ statusCode: 503, statusMessage: 'Database is not configured' })
  if (!pool) pool = mysql.createPool({ uri: url, connectionLimit: 10, charset: 'utf8mb4' })
  return pool
}
