import pg from 'pg'
import { env } from './env.js'

const { Pool } = pg

export const pool = env.databaseUrl
  ? new Pool({ connectionString: env.databaseUrl, client_encoding: 'UTF8' })
  : null

export async function query(text, params) {
  if (!pool) {
    throw new Error('DATABASE_URL no está configurada.')
  }

  return pool.query(text, params)
}