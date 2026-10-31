import { useCallback, useEffect, useState } from 'react'
import { AlertTriangle, CalendarDays, MapPin, RefreshCw } from 'lucide-react'

const API_URL = 'http://localhost:3000'
const urgencyStyles = {
  baja: 'bg-green-100 text-green-800',
  media: 'bg-yellow-100 text-yellow-800',
  alta: 'bg-orange-100 text-orange-800',
  critica: 'bg-red-100 text-red-800',
}
const statusLabels = {
  recibido: 'Recibido',
  en_revision: 'En revisión',
  en_atencion: 'En atención',
  resuelto: 'Resuelto',
  cerrado: 'Cerrado',
}
const statusOptions = Object.keys(statusLabels)
const typeLabels = {
  maltrato: 'Maltrato animal',
  perdido: 'Animal perdido',
  lesionado: 'Animal lesionado',
  abandono: 'Abandono',
}

function formatLabel(value) {
  return String(value ?? '')
    .replaceAll('_', ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function formatDate(value) {
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Fecha no disponible'
    : new Intl.DateTimeFormat('es-CO', { dateStyle: 'medium', timeStyle: 'short' }).format(date)
}

export default function CasosList({ token: authToken, onLoginClick }) {
  const [casos, setCasos] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatingIds, setUpdatingIds] = useState(() => new Set())
  const [statusNotice, setStatusNotice] = useState(null)

  const loadCasos = useCallback(async (signal, showLoading = true) => {
    const token = authToken || window.localStorage.getItem('huvid_token')
    if (!token) {
      setIsLoading(false)
      setError('Inicia sesión para consultar el historial de emergencias.')
      return
    }

    if (showLoading) {
      setIsLoading(true)
    }
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/casos`, {
        headers: { Authorization: `Bearer ${token}` },
        signal,
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'No fue posible cargar los reportes.')
      }

      if (!Array.isArray(result.casos)) {
        throw new Error('El servidor devolvió un listado de reportes inválido.')
      }
      setCasos(result.casos)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setError(requestError.message || 'No fue posible conectar con el servidor.')
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false)
      }
    }
  }, [authToken])

  const handleStatusChange = async (casoId, estado) => {
    const token = authToken || window.localStorage.getItem('huvid_token')
    if (!token) {
      setStatusNotice({ type: 'error', message: 'Inicia sesión para cambiar el estado del reporte.' })
      return
    }

    setUpdatingIds((current) => new Set(current).add(casoId))
    setStatusNotice(null)
    try {
      const response = await fetch(`${API_URL}/api/casos/${encodeURIComponent(casoId)}/estado`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado }),
      })
      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'No fue posible actualizar el estado del reporte.')
      }
      if (!result.caso) {
        throw new Error('El servidor no devolvió el reporte actualizado.')
      }

      setCasos((current) => current.map((caso) => (
        caso.id === result.caso.id ? { ...caso, ...result.caso } : caso
      )))
      setStatusNotice({ type: 'success', message: `Estado del reporte #${casoId} actualizado.` })
    } catch (requestError) {
      setStatusNotice({
        type: 'error',
        message: requestError.message || 'No fue posible conectar con el servidor.',
      })
    } finally {
      setUpdatingIds((current) => {
        const next = new Set(current)
        next.delete(casoId)
        return next
      })
    }
  }

  useEffect(() => {
    const controller = new AbortController()
    loadCasos(controller.signal)
    const intervalId = window.setInterval(() => loadCasos(controller.signal, false), 30000)

    return () => {
      controller.abort()
      window.clearInterval(intervalId)
    }
  }, [loadCasos])

  if (!authToken && !window.localStorage.getItem('huvid_token')) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-[#1E5B42]">Historial de emergencias</h1>
          <p className="mt-3 text-[#212121]/70">{error}</p>
          <button type="button" onClick={onLoginClick} className="mt-6 rounded-lg bg-[#1E5B42] px-5 py-3 font-semibold text-white hover:bg-[#154431]">
            Iniciar sesión
          </button>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="casos-title">
      <div className="mb-7 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 id="casos-title" className="text-3xl font-bold text-[#1E5B42]">Historial de emergencias</h1>
          <p className="mt-2 text-[#212121]/70">Reportes ordenados desde el más reciente.</p>
        </div>
        <button
          type="button"
          onClick={() => loadCasos()}
          disabled={isLoading}
          className="inline-flex items-center gap-2 rounded-lg border border-[#1E5B42] px-4 py-2 font-semibold text-[#1E5B42] hover:bg-[#1E5B42]/10 disabled:opacity-60"
        >
          <RefreshCw size={17} className={isLoading ? 'animate-spin' : ''} />
          Actualizar
        </button>
      </div>

      {isLoading && (
        <div className="rounded-xl bg-white p-8 text-center text-[#212121]/70 shadow-sm" role="status">
          Cargando reportes...
        </div>
      )}

      {statusNotice && (
        <p
          className={`mb-5 rounded-lg px-4 py-3 text-sm font-medium ${statusNotice.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
          role={statusNotice.type === 'error' ? 'alert' : 'status'}
        >
          {statusNotice.message}
        </p>
      )}

      {!isLoading && error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800" role="alert">
          <p>{error}</p>
          <button type="button" onClick={() => loadCasos()} className="mt-3 font-semibold underline">
            Reintentar
          </button>
        </div>
      )}

      {!isLoading && !error && casos.length === 0 && (
        <div className="rounded-xl bg-white p-8 text-center text-[#212121]/70 shadow-sm">
          Aún no hay reportes de emergencia.
        </div>
      )}

      {!isLoading && !error && casos.length > 0 && (
        <div className="grid gap-5 md:grid-cols-2">
          {casos.map((caso) => {
            const urgency = String(caso.urgencia ?? '').toLowerCase()
            const imageUrl = caso.evidencia_url
              ? new URL(caso.evidencia_url, API_URL).toString()
              : null

            return (
              <article key={caso.id} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-black/5">
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={`Evidencia del caso ${caso.id}`}
                    className="h-56 w-full object-cover"
                    loading="lazy"
                  />
                )}
                <div className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <h2 className="text-xl font-bold text-[#1E5B42]">
                      {typeLabels[caso.tipo] ?? formatLabel(caso.tipo)}
                    </h2>
                    <span className={`rounded-full px-3 py-1 text-xs font-bold ${urgencyStyles[urgency] ?? 'bg-gray-100 text-gray-800'}`}>
                      <AlertTriangle size={14} className="mr-1 inline" aria-hidden="true" />
                      Urgencia {formatLabel(urgency)}
                    </span>
                  </div>

                  <div className="flex items-start gap-2 text-sm text-[#212121]/75">
                    <MapPin size={17} className="mt-0.5 shrink-0 text-[#1E5B42]" aria-hidden="true" />
                    <p><span className="font-semibold">{caso.localidad}</span> · {caso.direccion}</p>
                  </div>

                  <p className="whitespace-pre-wrap text-sm leading-6 text-[#212121]">{caso.descripcion}</p>

                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-100 pt-4 text-sm">
                    <label className="flex items-center gap-2 font-semibold text-[#1E5B42]">
                      Estado
                      <select
                        value={caso.estado}
                        onChange={(event) => handleStatusChange(caso.id, event.target.value)}
                        disabled={updatingIds.has(caso.id)}
                        aria-label={`Cambiar estado del reporte ${caso.id}`}
                        className="rounded-lg border border-[#1E5B42]/30 bg-white px-2.5 py-1.5 text-sm text-[#1E5B42] disabled:cursor-wait disabled:opacity-60"
                      >
                        {statusOptions.map((status) => (
                          <option key={status} value={status}>{statusLabels[status]}</option>
                        ))}
                      </select>
                      {updatingIds.has(caso.id) && <span className="text-xs text-gray-500">Guardando...</span>}
                    </label>
                    <span className="inline-flex items-center gap-1.5 text-[#212121]/65">
                      <CalendarDays size={16} aria-hidden="true" />
                      {formatDate(caso.creado_en)}
                    </span>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}
