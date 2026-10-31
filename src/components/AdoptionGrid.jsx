import { useCallback, useEffect, useMemo, useState } from 'react'
import { Activity, Heart, MapPin, X } from 'lucide-react'

const API_URL = 'http://localhost:3000'

function getImageUrl(path) {
  if (!path) {
    return null
  }

  try {
    return new URL(path, API_URL).toString()
  } catch {
    return null
  }
}

async function readResponse(response) {
  try {
    return await response.json()
  } catch {
    throw new Error('El servidor devolvió una respuesta inválida.')
  }
}

export default function AdoptionGrid({ token, user, onLoginClick }) {
  const [pets, setPets] = useState([])
  const [selectedPet, setSelectedPet] = useState(null)
  const [filters, setFilters] = useState({ especie: '', edad: '', localidad: '' })
  const [notice, setNotice] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const loadPets = useCallback(async (signal) => {
    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`${API_URL}/api/adopciones`, { signal })
      const result = await readResponse(response)
      if (!response.ok) {
        throw new Error(result.error || 'No fue posible cargar las mascotas.')
      }
      if (!Array.isArray(result.mascotas)) {
        throw new Error('El servidor devolvió un catálogo inválido.')
      }
      setPets(result.mascotas)
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
    loadPets(controller.signal)
    return () => controller.abort()
  }, [loadPets])

  const filterOptions = useMemo(() => ({
    especies: [...new Set(pets.map((pet) => pet.especie).filter(Boolean))].sort(),
    edades: [...new Set(pets.map((pet) => pet.edad).filter(Boolean))].sort(),
    localidades: [...new Set(pets.map((pet) => pet.localidad).filter(Boolean))].sort(),
  }), [pets])

  const filteredPets = pets.filter((pet) => (
    (!filters.especie || pet.especie === filters.especie)
    && (!filters.edad || pet.edad === filters.edad)
    && (!filters.localidad || pet.localidad === filters.localidad)
  ))

  const updateFilter = (event) => {
    const { name, value } = event.target
    setFilters((current) => ({ ...current, [name]: value }))
  }

  const handleAdoptionClick = (pet) => {
    setError('')
    setNotice(null)
    if (!token) {
      setNotice({ type: 'error', text: 'Inicia sesión para enviar una solicitud de adopción.' })
      onLoginClick()
      return
    }
    setSelectedPet(pet)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setNotice(null)
    setError('')

    if (!token) {
      onLoginClick()
      return
    }

    const formData = new FormData(event.currentTarget)
    setIsSubmitting(true)
    try {
      const response = await fetch(`${API_URL}/api/adopciones/${encodeURIComponent(selectedPet.id)}/solicitudes`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(Object.fromEntries(formData.entries())),
      })
      const result = await readResponse(response)
      if (!response.ok) {
        throw new Error(result.error || 'No fue posible enviar la solicitud.')
      }

      setPets((current) => current.filter((pet) => pet.id !== selectedPet.id))
      setNotice({ type: 'success', text: `Solicitud enviada para ${selectedPet.nombre}. Nos pondremos en contacto contigo.` })
      setSelectedPet(null)
    } catch (requestError) {
      setError(requestError.message || 'No fue posible conectar con el servidor.')
      if (requestError.message?.includes('ya no está disponible')) {
        setPets((current) => current.filter((pet) => pet.id !== selectedPet.id))
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="adopciones" className="bg-white px-4 py-12" aria-labelledby="adoption-title">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-center">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Encuentra un compañero</p>
          <h2 id="adoption-title" className="text-4xl font-bold text-[#1E5B42]">Mascotas en adopción</h2>
        </div>

        <div className="mb-7 grid gap-4 rounded-xl bg-[#F4F6F5] p-4 sm:grid-cols-3">
          <label className="text-sm font-semibold text-[#212121]">
            Especie
            <select name="especie" value={filters.especie} onChange={updateFilter} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal">
              <option value="">Todas las especies</option>
              {filterOptions.especies.map((especie) => <option key={especie} value={especie}>{especie}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-[#212121]">
            Edad
            <select name="edad" value={filters.edad} onChange={updateFilter} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal">
              <option value="">Todas las edades</option>
              {filterOptions.edades.map((edad) => <option key={edad} value={edad}>{edad}</option>)}
            </select>
          </label>
          <label className="text-sm font-semibold text-[#212121]">
            Localidad
            <select name="localidad" value={filters.localidad} onChange={updateFilter} className="mt-1 w-full rounded-lg border border-gray-300 bg-white px-3 py-2 font-normal">
              <option value="">Todas las localidades</option>
              {filterOptions.localidades.map((localidad) => <option key={localidad} value={localidad}>{localidad}</option>)}
            </select>
          </label>
        </div>

        {notice && (
          <p className={`mb-6 rounded-lg px-4 py-3 ${notice.type === 'success' ? 'bg-[#1E5B42]/10 text-[#1E5B42]' : 'bg-red-50 text-red-800'}`} role={notice.type === 'success' ? 'status' : 'alert'}>
            {notice.text}
          </p>
        )}

        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-800" role="alert">
            <p>{error}</p>
            <button type="button" onClick={() => loadPets()} className="mt-2 font-semibold underline">Reintentar</button>
          </div>
        )}

        {isLoading && <p className="py-12 text-center text-[#212121]/70" role="status">Cargando mascotas...</p>}

        {!isLoading && !error && pets.length === 0 && (
          <p className="rounded-xl bg-[#F4F6F5] p-8 text-center text-[#212121]/70">No hay mascotas disponibles para adopción por el momento.</p>
        )}

        {!isLoading && !error && pets.length > 0 && filteredPets.length === 0 && (
          <p className="rounded-xl bg-[#F4F6F5] p-8 text-center text-[#212121]/70">No encontramos mascotas con esos filtros.</p>
        )}

        {!isLoading && !error && filteredPets.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPets.map((pet) => {
              const imageUrl = getImageUrl(pet.imagen_url)
              return (
                <article key={pet.id} className="overflow-hidden rounded-xl bg-[#F4F6F5] shadow-sm ring-1 ring-black/5">
                  {imageUrl ? (
                    <img src={imageUrl} alt={`${pet.nombre}, ${pet.especie}`} className="h-52 w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-52 items-center justify-center bg-[#1E5B42]/10 text-[#1E5B42]">Foto no disponible</div>
                  )}
                  <div className="p-5">
                    <h3 className="text-2xl font-bold text-[#1E5B42]">{pet.nombre}</h3>
                    <p className="mt-1 text-[#212121]/70">{[pet.especie, pet.raza, pet.edad].filter(Boolean).join(' · ')}</p>
                    {pet.descripcion && <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-[#212121]">{pet.descripcion}</p>}
                    {pet.salud && <div className="mt-4 flex items-center gap-2 text-sm"><Activity size={17} className="text-[#1E5B42]" aria-hidden="true" /> Salud: <strong>{pet.salud}</strong></div>}
                    {(pet.localidad || pet.ubicacion) && <div className="mt-2 flex items-center gap-2 text-sm"><MapPin size={17} className="text-[#E67E22]" aria-hidden="true" /> {pet.localidad || pet.ubicacion}</div>}
                    <button type="button" onClick={() => handleAdoptionClick(pet)} className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#E67E22] px-4 py-3 font-bold text-white hover:bg-[#D97013]">
                      <Heart size={18} aria-hidden="true" /> Solicitar adopción
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {selectedPet && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="adoption-form-title">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between bg-[#1E5B42] p-5 text-white">
              <div><p className="text-sm text-white/75">Solicitud para {selectedPet.nombre}</p><h2 id="adoption-form-title" className="text-xl font-bold">Solicitar adopción</h2></div>
              <button type="button" onClick={() => setSelectedPet(null)} disabled={isSubmitting} className="rounded p-2 hover:bg-white/10 disabled:opacity-60" aria-label="Cerrar formulario"><X size={22} /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4 p-5">
              <label className="block text-sm font-semibold">Nombre<input name="nombre" required maxLength={120} defaultValue={user?.nombre ?? ''} autoComplete="name" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label>
              <label className="block text-sm font-semibold">Teléfono<input name="telefono" type="tel" required maxLength={30} autoComplete="tel" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label>
              <label className="block text-sm font-semibold">Motivo de adopción<textarea name="motivo" required maxLength={5000} rows="3" className="mt-1 w-full resize-y rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label>
              <label className="block text-sm font-semibold">Dirección en Bogotá<input name="direccion" required maxLength={500} autoComplete="street-address" className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 font-normal focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" /></label>
              {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
              <div className="flex justify-end gap-3 border-t border-gray-200 pt-4">
                <button type="button" onClick={() => setSelectedPet(null)} disabled={isSubmitting} className="rounded-lg border border-gray-300 px-4 py-2 font-semibold text-[#212121] hover:bg-gray-100 disabled:opacity-60">Cancelar</button>
                <button type="submit" disabled={isSubmitting} className="rounded-lg bg-[#E67E22] px-4 py-2 font-bold text-white hover:bg-[#D97013] disabled:cursor-wait disabled:opacity-60">{isSubmitting ? 'Enviando...' : 'Enviar solicitud'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  )
}
