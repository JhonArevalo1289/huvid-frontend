import { Router } from 'express'
import adminRouter from './admin.routes.js'
import adopcionesRouter from './adopciones.routes.js'
import authRouter from './auth.routes.js'
import casosRouter from './casos.routes.js'
import emergenciasRouter from './emergencias.routes.js'
import healthRouter from './health.routes.js'
import localidadesRouter from './localidades.routes.js'
import noticiasRouter from './noticias.routes.js'
import veterinariasRouter from './veterinarias.routes.js'

const router = Router()

router.use('/healthcheck', healthRouter)
router.use('/auth', authRouter)
router.use('/admin', adminRouter)
router.use('/adopciones', adopcionesRouter)
router.use('/casos', casosRouter)
router.use('/emergencias', emergenciasRouter)
router.use('/localidades', localidadesRouter)
router.use('/noticias', noticiasRouter)
router.use('/veterinarias', veterinariasRouter)

export default router