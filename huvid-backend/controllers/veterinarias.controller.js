import { query } from '../config/database.js'

export async function listVeterinarias(_request, response, next) {
  try {
    const result = await query(
      `SELECT veterinarias.id, veterinarias.nombre, veterinarias.direccion,
              veterinarias.telefono, veterinarias.horario_atencion,
              veterinarias.servicios, localidades.nombre AS localidad
       FROM veterinarias
       INNER JOIN localidades ON localidades.id = veterinarias.localidad_id
       WHERE veterinarias.activa = TRUE
       ORDER BY veterinarias.nombre ASC`,
    )

    return response.status(200).json({ veterinarias: result.rows })
  } catch (error) {
    return next(error)
  }
}
