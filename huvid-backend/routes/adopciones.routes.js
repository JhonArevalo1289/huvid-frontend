import { Router } from 'express'
import { createSolicitudAdopcion, listMascotasDisponibles } from '../controllers/adopciones.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'

const router = Router()

router.get('/', listMascotasDisponibles)
router.post('/:mascotaId/solicitudes', authMiddleware, createSolicitudAdopcion)

export default router
