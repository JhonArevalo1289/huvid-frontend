import { query } from '../config/database.js'
import { removeUploadedFile } from '../middlewares/uploadMiddleware.js'

function isNonEmptyString(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
}

function isValidEventDate(value) {
  return typeof value === 'string'
    && /^\d{4}-\d{2}-\d{2}$/.test(value)
    && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
    && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value
}

export async function listNoticias(_request, response, next) {
  try {
    const result = await query(
      `SELECT id, titulo, resumen, contenido, tipo, imagen_url, fecha_evento,
              publicada_en, creado_en
       FROM noticias
       WHERE publicada = TRUE
       ORDER BY COALESCE(fecha_evento::timestamp with time zone, publicada_en, creado_en) DESC,
                id DESC`,
    )

    return response.status(200).json({ noticias: result.rows })
  } catch (error) {
    return next(error)
  }
}

export async function createAdminNoticia(request, response, next) {
  const { titulo, resumen = '', contenido, tipo = 'noticia', fecha_evento: fechaEvento = '' } = request.body ?? {}
  const validType = tipo === 'noticia' || tipo === 'evento'

  if (
    !isNonEmptyString(titulo, 200)
    || !isNonEmptyString(contenido, 10000)
    || typeof resumen !== 'string'
    || resumen.trim().length > 1000
    || !validType
    || (fechaEvento && !isValidEventDate(fechaEvento))
    || (tipo === 'evento' && !fechaEvento)
  ) {
    await removeUploadedFile(request.file).catch((error) => {
      console.error('No se pudo eliminar la imagen de una noticia inválida:', error)
    })
    return response.status(400).json({ error: 'Completa un título, contenido y tipo válidos; los eventos requieren una fecha válida.' })
  }

  try {
    const result = await query(
      `INSERT INTO noticias
         (autor_id, titulo, resumen, contenido, tipo, imagen_url, fecha_evento, publicada, publicada_en)
       VALUES ($1, $2, $3, $4, $5, $6, $7, TRUE, NOW())
       RETURNING id, titulo, resumen, contenido, tipo, imagen_url, fecha_evento,
                 publicada_en, creado_en`,
      [
        request.user.id,
        titulo.trim(),
        resumen.trim() || null,
        contenido.trim(),
        tipo,
        request.file ? `/uploads/${request.file.filename}` : null,
        fechaEvento || null,
      ],
    )

    return response.status(201).json({ noticia: result.rows[0] })
  } catch (error) {
    await removeUploadedFile(request.file).catch((cleanupError) => {
      console.error('No se pudo eliminar la imagen de una noticia no registrada:', cleanupError)
    })
    return next(error)
  }
}
