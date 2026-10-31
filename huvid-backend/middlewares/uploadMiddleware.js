import { mkdirSync } from 'node:fs'
import { unlink } from 'node:fs/promises'
import { randomUUID } from 'node:crypto'
import { resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import multer from 'multer'

export const uploadsDirectory = fileURLToPath(new URL('../uploads/', import.meta.url))
mkdirSync(uploadsDirectory, { recursive: true })

const allowedImageTypes = new Map([
  ['image/jpeg', '.jpg'],
  ['image/png', '.png'],
  ['image/webp', '.webp'],
  ['image/gif', '.gif'],
])

const storage = multer.diskStorage({
  destination: uploadsDirectory,
  filename: (_request, file, callback) => {
    callback(null, `${randomUUID()}${allowedImageTypes.get(file.mimetype)}`)
  },
})

export const uploadEmergencyPhoto = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024, files: 1 },
  fileFilter: (_request, file, callback) => {
    if (!allowedImageTypes.has(file.mimetype)) {
      const error = new Error('La evidencia debe ser una imagen JPG, PNG, WEBP o GIF.')
      error.status = 400
      callback(error)
      return
    }

    callback(null, true)
  },
}).single('foto')

export function handleEmergencyUploadError(error, _request, response, next) {
  if (!error) {
    return next()
  }

  if (error instanceof multer.MulterError) {
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : 400
    return response.status(status).json({
      error: error.code === 'LIMIT_FILE_SIZE'
        ? 'La imagen no puede superar los 5 MB.'
        : 'No fue posible procesar el archivo adjunto.',
    })
  }

  if (error.status === 400) {
    return response.status(400).json({ error: error.message })
  }

  return next(error)
}

export function getUploadedFilePath(filename) {
  return resolve(uploadsDirectory, filename)
}

export async function removeUploadedFile(file) {
  if (file) {
    await unlink(getUploadedFilePath(file.filename))
  }
}
