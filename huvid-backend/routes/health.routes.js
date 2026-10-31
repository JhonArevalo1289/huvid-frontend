import { Router } from 'express'
import { getHealthcheck } from '../controllers/health.controller.js'

const router = Router()

router.get('/', getHealthcheck)

export default router