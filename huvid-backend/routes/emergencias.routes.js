import { Router } from 'express'
import { createCaso } from '../controllers/casos.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { handleEmergencyUploadError, uploadEmergencyPhoto } from '../middlewares/uploadMiddleware.js'

const router = Router()

router.post('/', authMiddleware, uploadEmergencyPhoto, handleEmergencyUploadError, createCaso)

export default router
