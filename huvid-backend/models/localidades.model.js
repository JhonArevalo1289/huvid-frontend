import { query } from '../config/database.js'

export async function listLocalidades() {
  const result = await query(
    'SELECT id, nombre FROM localidades ORDER BY nombre ASC',
  )
  return result.rows
}