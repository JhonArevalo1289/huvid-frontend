import { query } from '../config/database.js'

function isValidUserId(userId) {
  if (typeof userId === 'string') {
    return /^[1-9]\d*$/.test(userId)
  }
  return Number.isSafeInteger(userId) && userId > 0
}

export async function listMascotasDisponibles(_request, response, next) {
  try {
    const result = await query(
      `SELECT mascotas.id, mascotas.nombre, mascotas.especie, mascotas.raza,
              mascotas.edad, mascotas.descripcion, mascotas.salud,
              COALESCE(localidades.nombre, mascotas.ubicacion) AS localidad,
              mascotas.imagen_url, mascotas.estado, mascotas.creado_en
       FROM mascotas
       LEFT JOIN localidades ON localidades.id = mascotas.localidad_id
       WHERE mascotas.estado = 'disponible'
       ORDER BY mascotas.creado_en DESC, mascotas.id DESC`,
    )

    return response.status(200).json({ mascotas: result.rows })
  } catch (error) {
    return next(error)
  }
}

export async function createSolicitudAdopcion(request, response, next) {
  const { mascotaId } = request.params
  const { nombre, telefono, motivo, direccion } = request.body ?? {}
  const usuarioId = request.user?.id

  if (!/^[1-9]\d*$/.test(mascotaId)) {
    return response.status(400).json({ error: 'El identificador de la mascota no es válido.' })
  }
  if (!isValidUserId(usuarioId)) {
    return response.status(401).json({ error: 'El token no contiene un usuario válido.' })
  }
  if (
    typeof nombre !== 'string' || !nombre.trim() || nombre.trim().length > 120
    || typeof telefono !== 'string' || !telefono.trim() || telefono.trim().length > 30
    || typeof motivo !== 'string' || !motivo.trim() || motivo.trim().length > 5000
    || typeof direccion !== 'string' || !direccion.trim() || direccion.trim().length > 500
  ) {
    return response.status(400).json({ error: 'Completa nombre, teléfono, motivo y dirección con datos válidos.' })
  }

  try {
    const result = await query(
      `WITH mascota_solicitada AS (
         UPDATE mascotas
         SET estado = 'solicitado', actualizado_en = NOW()
         WHERE id = $1 AND estado = 'disponible'
         RETURNING id
       )
       INSERT INTO solicitudes_adopcion
         (mascota_id, usuario_id, nombre_solicitante, telefono, motivo, direccion)
       SELECT id, $2, $3, $4, $5, $6
       FROM mascota_solicitada
       RETURNING id, mascota_id, usuario_id, nombre_solicitante, telefono,
                 motivo, direccion, estado, creado_en`,
      [
        mascotaId,
        String(usuarioId),
        nombre.trim(),
        telefono.trim(),
        motivo.trim(),
        direccion.trim(),
      ],
    )

    if (result.rowCount === 0) {
      return response.status(409).json({ error: 'La mascota ya no está disponible para adopción.' })
    }

    return response.status(201).json({ solicitud: result.rows[0] })
  } catch (error) {
    return next(error)
  }
}
