import { query } from '../config/database.js'
import { removeUploadedFile } from '../middlewares/uploadMiddleware.js'

const allowedTypes = new Set(['maltrato', 'perdido', 'lesionado', 'abandono'])
const allowedUrgencies = new Set(['baja', 'media', 'alta', 'critica'])
const allowedStatuses = new Set(['recibido', 'en_revision', 'en_atencion', 'resuelto', 'cerrado'])

export async function listCasos(_request, response, next) {
  try {
    const result = await query(
      `SELECT casos.id, casos.usuario_id, casos.localidad_id, localidades.nombre AS localidad,
              casos.tipo, casos.direccion, casos.descripcion, casos.urgencia,
              casos.evidencia_url, casos.estado, casos.creado_en
       FROM casos_emergencia AS casos
       INNER JOIN localidades ON localidades.id = casos.localidad_id
       ORDER BY casos.creado_en DESC`,
    )

    return response.status(200).json({ casos: result.rows })
  } catch (error) {
    return next(error)
  }
}

export async function updateCasoEstado(request, response, next) {
  const { id } = request.params
  const { estado } = request.body ?? {}

  if (!/^[1-9]\d*$/.test(id)) {
    return response.status(400).json({ error: 'El identificador del caso no es válido.' })
  }

  if (typeof estado !== 'string' || !allowedStatuses.has(estado)) {
    return response.status(400).json({
      error: 'El estado debe ser recibido, en_revision, en_atencion, resuelto o cerrado.',
    })
  }

  try {
    const result = await query(
      `UPDATE casos_emergencia
       SET estado = $1, actualizado_en = NOW()
       WHERE id = $2
       RETURNING id, usuario_id, localidad_id, tipo, direccion, descripcion,
                 urgencia, evidencia_url, estado, creado_en, actualizado_en`,
      [estado, id],
    )

    if (result.rowCount === 0) {
      return response.status(404).json({ error: 'No se encontró el reporte solicitado.' })
    }

    return response.status(200).json({ caso: result.rows[0] })
  } catch (error) {
    return next(error)
  }
}

async function rejectReport(response, file, next, status, message) {
  try {
    await removeUploadedFile(file)
  } catch (error) {
    return next(error)
  }

  return response.status(status).json({ error: message })
}

// Función auxiliar para mapear el texto del selector web al formato de la BD
function normalizarTipo(tipoStr) {
  if (typeof tipoStr !== 'string') return ''
  const t = tipoStr.toLowerCase().trim()
  if (t.includes('maltrato')) return 'maltrato'
  if (t.includes('perdido')) return 'perdido'
  if (t.includes('lesionado')) return 'lesionado'
  if (t.includes('abandono')) return 'abandono'
  return t
}

export async function createCaso(request, response, next) {
  const { localidad, tipo, direccion, descripcion, urgencia } = request.body ?? {}
  const usuarioId = request.user?.id
  const validUserId = (
    typeof usuarioId === 'string' && /^\d+$/.test(usuarioId) && BigInt(usuarioId) > 0n
  ) || (Number.isSafeInteger(usuarioId) && usuarioId > 0)

  if (!validUserId) {
    return rejectReport(response, request.file, next, 401, 'El token no contiene un usuario válido.')
  }

  const tipoLimpio = normalizarTipo(tipo)
  const urgenciaLimpiada = typeof urgencia === 'string' ? urgencia.toLowerCase().trim() : ''

  if (
    typeof localidad !== 'string' || !localidad.trim()
    || !allowedTypes.has(tipoLimpio)
    || typeof direccion !== 'string' || !direccion.trim() || direccion.trim().length > 500
    || typeof descripcion !== 'string' || !descripcion.trim() || descripcion.trim().length > 5000
    || !allowedUrgencies.has(urgenciaLimpiada)
  ) {
    return rejectReport(
      response,
      request.file,
      next,
      400,
      'Completa una localidad, tipo, dirección, descripción y urgencia válidos.',
    )
  }

  try {
    const result = await query(
      `INSERT INTO casos_emergencia
         (usuario_id, localidad_id, tipo, direccion, descripcion, urgencia, evidencia_url)
       SELECT $1, id, $3, $4, $5, $6, $7
       FROM localidades
       WHERE LOWER(nombre) = LOWER($2)
       RETURNING id, usuario_id, localidad_id, tipo, direccion, descripcion,
                 urgencia, evidencia_url, estado, creado_en`,
      [
        String(usuarioId),
        localidad.trim(),
        tipoLimpio,
        direccion.trim(),
        descripcion.trim(),
        urgenciaLimpiada,
        request.file ? `/uploads/${request.file.filename}` : null,
      ],
    )

    if (result.rowCount === 0) {
      await removeUploadedFile(request.file)
      return response.status(400).json({ error: 'Selecciona una localidad válida de Bogotá.' })
    }

    return response.status(201).json({ caso: result.rows[0] })
  } catch (error) {
    if (request.file) {
      await removeUploadedFile(request.file).catch((cleanupError) => {
        console.error('No se pudo eliminar la evidencia de un reporte fallido:', cleanupError)
      })
    }
    return next(error)
  }
}