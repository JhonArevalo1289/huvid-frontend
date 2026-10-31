import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'

export function authMiddleware(request, response, next) {
  const match = request.headers.authorization?.match(/^Bearer\s+(\S+)$/i)

  if (!match) {
    return response.status(401).json({ error: 'Se requiere un token Bearer válido.' })
  }
  if (!env.jwtSecret) {
    return response.status(500).json({ error: 'JWT_SECRET no está configurada.' })
  }

  try {
    request.user = jwt.verify(match[1], env.jwtSecret)
    return next()
  } catch {
    return response.status(401).json({ error: 'El token es inválido o ha expirado.' })
  }
}