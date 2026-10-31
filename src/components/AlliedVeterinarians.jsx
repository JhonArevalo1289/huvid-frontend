import { useCallback, useEffect, useMemo, useState } from 'react'
import { Clock3, MapPin, Phone, RefreshCw, Stethoscope } from 'lucide-react'

const API_URL = 'http://localhost:3000'

function formatServices(services) {
  if (Array.isArray(services)) {
    return services.filter((service) => typeof service === 'string' && service.trim())
  }
  if (typeof services === 'string') {
    return services.split(/[,\u00b7]/).map((service) => service.trim()).filter(Boolean)
  }
  return []
}

export default function AlliedVeterinarians() {
  const [clinics, setClinics] = useState([])
  const [filters, setFilters] = useState({ localidad: '', servicio: '' })
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')

  const loadClinics = useCallback(async (signal) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/veterinarias`, { signal })
      const result = await response.json()
      if (!response.ok) {
        throw new Error(result.error || 'No fue posible cargar las veterinarias aliadas.')
      }
      if (!Array.isArray(result.veterinarias)) {
        throw new Error('El servidor devolvió un directorio inválido.')
      }
      setClinics(result.veterinarias)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setError(requestError.message || 'No fue posible conectar con el servidor.')
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoading(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadClinics(controller.signal)
    return () => controller.abort()
  }, [loadClinics])

  const localities = useMemo(
    () => [...new Set(clinics.map((clinic) => clinic.localidad).filter(Boolean))].sort(),
    [clinics],
  )

  const services = useMemo(
    () => [...new Set(clinics.flatMap((clinic) => formatServices(clinic.servicios)))].sort(),
    [clinics],
  )

  const filteredClinics = clinics.filter((clinic) => (
    (!filters.localidad || clinic.localidad === filters.localidad)
    && (!filters.servicio || formatServices(clinic.servicios).includes(filters.servicio))
  ))

  const updateFilter = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  return (
    <section id="veterinarias" className="bg-[#F4F6F5] px-4 py-12" aria-labelledby="vets-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Red de atención</p>
          <h1 id="vets-title" className="text-4xl font-bold text-[#1E5B42]">Veterinarias aliadas</h1>
          <p className="mt-3 max-w-2xl text-[#212121]/70">Clínicas comprometidas con el bienestar animal y conectadas con la comunidad HUVID.</p>
        </div>

        <div className="mb-7 grid gap-4 rounded-xl bg-white p-4 shadow-sm sm:grid-cols-2">
          <label className="text-sm font-semibold text-[#212121]">
            Localidad
            <select name="localidad" value={filters.localidad} onChange={updateFilter} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal">
              <option value="">Todas las localidades</option>
              {localities.map((localidad) => <option key={localidad} value={localidad}>{localidad}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-[#212121]">
            Servicio
            <select name="servicio" value={filters.servicio} onChange={updateFilter} className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal">
              <option value="">Todos los servicios</option>
              {services.map((service) => <option key={service} value={service}>{service}</option>)}
            </select>
          </label>
        </div>

        {isLoading && <p className="rounded-xl bg-white p-8 text-center text-[#212121]/70" role="status">Cargando veterinarias aliadas...</p>}

        {!isLoading && error && (
          <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-800" role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => loadClinics()} className="mt-3 inline-flex items-center gap-2 font-semibold underline">
              <RefreshCw size={16} aria-hidden="true" /> Reintentar
            </button>
          </div>
        )}

        {!isLoading && !error && clinics.length === 0 && (
          <p className="rounded-xl bg-white p-8 text-center text-[#212121]/70">Aún no hay veterinarias aliadas registradas.</p>
        )}

        {!isLoading && !error && clinics.length > 0 && filteredClinics.length === 0 && (
          <p className="rounded-xl bg-white p-8 text-center text-[#212121]/70">No encontramos veterinarias con esos filtros.</p>
        )}

        {!isLoading && !error && filteredClinics.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {filteredClinics.map((clinic) => (
              <article key={clinic.id} className="rounded-xl border-l-4 border-[#1E5B42] bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-[#1E5B42]">{clinic.nombre}</h2>
                <div className="mt-5 space-y-3 text-sm text-[#212121]/80">
                  <p className="flex items-start gap-3"><MapPin size={18} className="mt-0.5 shrink-0 text-[#E67E22]" aria-hidden="true" /><span>{clinic.direccion} · {clinic.localidad}, Bogotá D.C.</span></p>
                  <p className="flex items-center gap-3"><Phone size={18} className="shrink-0 text-[#E67E22]" aria-hidden="true" /><a href={`tel:${clinic.telefono}`} className="hover:text-[#1E5B42]">{clinic.telefono}</a></p>
                  <p className="flex items-center gap-3"><Clock3 size={18} className="shrink-0 text-[#E67E22]" aria-hidden="true" /><span>{clinic.horario_atencion}</span></p>
                  <div className="flex items-start gap-3">
                    <Stethoscope size={18} className="mt-0.5 shrink-0 text-[#E67E22]" aria-hidden="true" />
                    <ul className="flex flex-wrap gap-2" aria-label="Servicios">
                      {formatServices(clinic.servicios).map((service) => (
                        <li key={service} className="rounded-full bg-[#1E5B42]/10 px-2.5 py-1 text-xs font-semibold text-[#1E5B42]">{service}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
