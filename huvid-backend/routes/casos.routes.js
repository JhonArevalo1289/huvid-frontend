import { Router } from 'express'
import { createCaso, listCasos, updateCasoEstado } from '../controllers/casos.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { handleEmergencyUploadError, uploadEmergencyPhoto } from '../middlewares/uploadMiddleware.js'

const router = Router()

router.get('/', authMiddleware, listCasos)
router.patch('/:id/estado', authMiddleware, updateCasoEstado)
router.post('/', authMiddleware, uploadEmergencyPhoto, handleEmergencyUploadError, createCaso)

export default router
