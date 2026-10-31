import { query } from '../config/database.js'

const staffRoles = ['fundacion', 'administrador']

export async function requireStaffRole(request, response, next) {
  const userId = request.user?.id
  const validUserId = (
    typeof userId === 'string' && /^[1-9]\d*$/.test(userId)
  ) || (Number.isSafeInteger(userId) && userId > 0)

  if (!validUserId) {
    return response.status(403).json({ error: 'El usuario no tiene permisos para esta operación.' })
  }

  try {
    const result = await query(
      `SELECT roles.nombre AS rol
       FROM usuarios
       INNER JOIN roles ON roles.id = usuarios.rol_id
       WHERE usuarios.id = $1 AND usuarios.activo = TRUE`,
      [String(userId)],
    )

    if (!staffRoles.includes(result.rows[0]?.rol)) {
      return response.status(403).json({ error: 'Solo una fundación o un administrador puede registrar recursos.' })
    }

    return next()
  } catch (error) {
    return next(error)
  }
}
