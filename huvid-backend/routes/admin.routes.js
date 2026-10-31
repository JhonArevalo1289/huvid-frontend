import { Router } from 'express'
import { createAdminMascota, createAdminVeterinaria } from '../controllers/admin.controller.js'
import { authMiddleware } from '../middlewares/authMiddleware.js'
import { requireStaffRole } from '../middlewares/requireStaffRole.js'
import { handleEmergencyUploadError, uploadEmergencyPhoto } from '../middlewares/uploadMiddleware.js'

const router = Router()

router.use(authMiddleware, requireStaffRole)
router.post('/mascotas', uploadEmergencyPhoto, handleEmergencyUploadError, createAdminMascota)
router.post('/veterinarias', createAdminVeterinaria)

export default router
