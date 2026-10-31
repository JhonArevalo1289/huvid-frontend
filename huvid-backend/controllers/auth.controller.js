import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import { query } from '../config/database.js'

const passwordRounds = 12
const allowedRoles = new Set(['ciudadano'])

function assertJwtSecret() {
  if (!env.jwtSecret) {
    const error = new Error('JWT_SECRET no está configurada.')
    error.status = 500
    throw error
  }
}

function createToken(user) {
  assertJwtSecret()
  return jwt.sign(
    { id: user.id, email: user.email, rol_id: user.rol_id },
    env.jwtSecret,
    { expiresIn: env.jwtExpiresIn },
  )
}

function formatUser(row) {
  return {
    id: row.id,
    nombre: row.nombre,
    email: row.email,
    rol_id: row.rol_id,
  }
}

export async function register(request, response) {
  try {
    const name = String(request.body?.nombre ?? request.body?.name ?? '').trim()
    const email = String(request.body?.email ?? '').trim().toLowerCase()
    const password = request.body?.password
    const roleId = Number(request.body?.rol_id ?? 1)

    if (!name || name.length > 120 || !email || email.length > 254) {
      return response.status(400).json({ error: 'Nombre y correo electrónico son obligatorios y deben ser válidos.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ error: 'El correo electrónico no es válido.' })
    }
    if (typeof password !== 'string' || password.length < 8) {
      return response.status(400).json({ error: 'La contraseña debe tener al menos 8 caracteres.' })
    }
    if (!Number.isSafeInteger(roleId) || roleId < 1) {
      return response.status(400).json({ error: 'El rol seleccionado no es válido.' })
    }
    if (roleId !== 1) {
      return response.status(403).json({ error: 'El registro público solo permite cuentas ciudadanas. Solicita a un administrador la habilitación de una cuenta institucional.' })
    }

    assertJwtSecret()
    const passwordHash = await bcrypt.hash(password, passwordRounds)
    const result = await query(
      `INSERT INTO usuarios (rol_id, nombre, email, password_hash)
       SELECT id, $2, $3, $4
       FROM roles
       WHERE id = $1 AND nombre = ANY($5::text[])
       RETURNING id, nombre, email, telefono, rol_id, activo, creado_en, actualizado_en`,
      [roleId, name, email, passwordHash, [...allowedRoles]],
    )

    if (result.rowCount === 0) {
      return response.status(400).json({ error: 'No se pudo asignar el rol ciudadano.' })
    }

    const user = formatUser(result.rows[0])
    return response.status(201).json({ user, token: createToken(user) })
  } catch (error) {
    if (error?.code === '23505') {
      return response.status(409).json({ error: 'Ya existe una cuenta con ese correo electrónico.' })
    }
    console.error('Error al registrar usuario:', error)
    return response.status(500).json({ error: 'No fue posible completar el registro.' })
  }
}

export async function login(request, response, next) {
  try {
    const email = String(request.body?.email ?? '').trim().toLowerCase()
    const password = request.body?.password

    if (!email || typeof password !== 'string' || !password) {
      return response.status(400).json({ error: 'Correo electrónico y contraseña son obligatorios.' })
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return response.status(400).json({ error: 'El correo electrónico no es válido.' })
    }

    const result = await query(
      `SELECT id, nombre, email, password_hash, telefono, rol_id, activo, creado_en, actualizado_en
       FROM usuarios
       WHERE LOWER(email) = $1 AND activo = TRUE`,
      [email],
    )
    const row = result.rows[0]

    if (!row || !(await bcrypt.compare(password, row.password_hash))) {
      return response.status(401).json({ error: 'Correo electrónico o contraseña incorrectos.' })
    }

    const user = formatUser(row)
    return response.status(200).json({ user, token: createToken(user) })
  } catch (error) {
    return next(error)
  }
}