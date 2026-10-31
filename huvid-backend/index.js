import cors from 'cors'
import express from 'express'
import { env } from './config/env.js'
import { errorHandler } from './middlewares/errorHandler.js'
import apiRouter from './routes/index.js'
import { uploadsDirectory } from './middlewares/uploadMiddleware.js'

const app = express()

app.disable('x-powered-by')
app.use(cors({
  origin: env.corsOrigin.split(',').map((origin) => origin.trim()),
  credentials: true,
}))
app.use(express.json({ limit: '1mb', defaultCharset: 'utf-8' }))
app.use('/uploads', express.static(uploadsDirectory))
app.use('/api', (_request, response, next) => {
  response.set('Content-Type', 'application/json; charset=utf-8')
  next()
})
app.use('/api', apiRouter)
app.use(errorHandler)

app.listen(env.port, () => {
  console.log(`HUVID API escuchando en http://localhost:${env.port}`)
})