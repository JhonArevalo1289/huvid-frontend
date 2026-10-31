import { Router } from 'express'
import { getLocalidades } from '../controllers/localidades.controller.js'

const router = Router()

router.get('/', getLocalidades)

export default router
