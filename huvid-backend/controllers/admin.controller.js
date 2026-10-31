import { removeUploadedFile } from '../middlewares/uploadMiddleware.js'
import { query } from '../config/database.js'

function isNonEmptyString(value, maxLength) {
  return typeof value === 'string' && value.trim().length > 0 && value.trim().length <= maxLength
}

export async function createAdminMascota(request, response, next) {
  const { nombre, especie, edad, localidad, descripcion } = request.body ?? {}

  if (
    !isNonEmptyString(nombre, 100)
    || !isNonEmptyString(especie, 60)
    || !isNonEmptyString(edad, 60)
    || !isNonEmptyString(localidad, 80)
    || !isNonEmptyString(descripcion, 10000)
  ) {
    await removeUploadedFile(request.file).catch((error) => {
      console.error('No se pudo eliminar la imagen de una mascota inválida:', error)
    })
    return response.status(400).json({ error: 'Completa nombre, especie, edad, localidad y descripción con datos válidos.' })
  }

  try {
    const result = await query(
      `INSERT INTO mascotas (nombre, especie, edad, descripcion, localidad_id, ubicacion, imagen_url)
       SELECT $1, $2, $3, $4, localidades.id, localidades.nombre, $6
       FROM localidades
       WHERE LOWER(localidades.nombre) = LOWER($5)
       RETURNING id, nombre, especie, edad, descripcion, ubicacion,
                 localidad_id, imagen_url, estado, creado_en`,
      [
        nombre.trim(),
        especie.trim(),
        edad.trim(),
        descripcion.trim(),
        localidad.trim(),
        request.file ? `/uploads/${request.file.filename}` : null,
      ],
    )

    if (result.rowCount === 0) {
      await removeUploadedFile(request.file)
      return response.status(400).json({ error: 'Selecciona una localidad válida de Bogotá.' })
    }

    return response.status(201).json({ mascota: result.rows[0] })
  } catch (error) {
    await removeUploadedFile(request.file).catch((cleanupError) => {
      console.error('No se pudo eliminar la imagen de una mascota no registrada:', cleanupError)
    })
    return next(error)
  }
}

export async function createAdminVeterinaria(request, response, next) {
  const { nombre, direccion, telefono, horario_atencion: horario, servicios, localidad } = request.body ?? {}
  const validServices = Array.isArray(servicios)
    && servicios.length > 0
    && servicios.length <= 30
    && servicios.every((service) => isNonEmptyString(service, 100))

  if (
    !isNonEmptyString(nombre, 160)
    || !isNonEmptyString(direccion, 1000)
    || !isNonEmptyString(telefono, 30)
    || !isNonEmptyString(horario, 200)
    || !isNonEmptyString(localidad, 80)
    || !validServices
  ) {
    return response.status(400).json({ error: 'Completa los datos de la veterinaria y al menos un servicio válido.' })
  }

  const cleanServices = servicios.map((service) => service.trim())

  try {
    const result = await query(
      `INSERT INTO veterinarias
         (nombre, direccion, telefono, horario_atencion, servicios, localidad_id)
       SELECT $1, $2, $3, $4, $5::text[], localidades.id
       FROM localidades
       WHERE LOWER(localidades.nombre) = LOWER($6)
       RETURNING id, nombre, direccion, telefono, horario_atencion, servicios,
                 localidad_id, activa, creado_en`,
      [
        nombre.trim(),
        direccion.trim(),
        telefono.trim(),
        horario.trim(),
        cleanServices,
        localidad.trim(),
      ],
    )

    if (result.rowCount === 0) {
      return response.status(400).json({ error: 'Selecciona una localidad válida de Bogotá.' })
    }

    return response.status(201).json({ veterinaria: result.rows[0] })
  } catch (error) {
    return next(error)
  }
}
