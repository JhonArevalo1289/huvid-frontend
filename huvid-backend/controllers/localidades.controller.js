import { listLocalidades } from '../models/localidades.model.js'

export async function getLocalidades(_request, response, next) {
  try {
    const localidades = await listLocalidades()
    return response.status(200).json({ localidades })
  } catch (error) {
    return next(error)
  }
}
