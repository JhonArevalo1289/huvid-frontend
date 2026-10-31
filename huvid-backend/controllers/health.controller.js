export function getHealthcheck(_request, response) {
  response.status(200).json({
    status: 'ok',
    service: 'huvid-api',
    timestamp: new Date().toISOString(),
  })
}