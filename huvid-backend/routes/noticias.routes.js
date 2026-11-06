import { Router } from 'express'
import { listNoticias } from '../controllers/noticias.controller.js'

const router = Router()

router.get('/', listNoticias)

export default router
