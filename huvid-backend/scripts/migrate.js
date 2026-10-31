import { readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { pool } from '../config/database.js'

if (!pool) {
  console.error('Configura DATABASE_URL en .env antes de ejecutar las migraciones.')
  process.exitCode = 1
} else {
  try {
    const migrationPath = new URL('../migrations/001_initial_schema.sql', import.meta.url)
    const migration = await readFile(fileURLToPath(migrationPath), 'utf8')
    await pool.query(migration)
    console.log('Migración 001_initial_schema.sql ejecutada correctamente.')
  } catch (error) {
    const causes = error.errors?.map((cause) => `${cause.code ?? 'ERROR'}: ${cause.message}`).join('; ')
    const details = [error.message, error.code, causes].filter(Boolean).join(' | ') || String(error)
    console.error('No se pudo ejecutar la migración:', details)
    process.exitCode = 1
  } finally {
    await pool.end()
  }
}