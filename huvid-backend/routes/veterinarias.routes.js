import { Router } from 'express'
import { listVeterinarias } from '../controllers/veterinarias.controller.js'

const router = Router()

router.get('/', listVeterinarias)

export default router
