import { useCallback, useEffect, useState } from 'react'
import { Building2, PawPrint, RefreshCw } from 'lucide-react'

const API_URL = 'http://localhost:3000'
const staffRoleIds = new Set(['2', '3'])
const fieldClass = 'mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]/20'

async function readResponse(response) {
  try {
    return await response.json()
  } catch {
    throw new Error('El servidor devolvió una respuesta inválida.')
  }
}

export default function AdminDashboard({ token, user }) {
  const [localidades, setLocalidades] = useState([])
  const [isLoadingLocalidades, setIsLoadingLocalidades] = useState(true)
  const [localidadesError, setLocalidadesError] = useState('')
  const [submittingForm, setSubmittingForm] = useState('')
  const [notice, setNotice] = useState(null)

  const loadLocalidades = useCallback(async (signal) => {
    setIsLoadingLocalidades(true)
    setLocalidadesError('')
    try {
      const response = await fetch(`${API_URL}/api/localidades`, { signal })
      const result = await readResponse(response)
      if (!response.ok) {
        throw new Error(result.error || 'No fue posible cargar las localidades.')
      }
      if (!Array.isArray(result.localidades)) {
        throw new Error('El servidor devolvió una lista de localidades inválida.')
      }
      setLocalidades(result.localidades)
    } catch (requestError) {
      if (requestError.name !== 'AbortError') {
        setLocalidadesError(requestError.message || 'No fue posible conectar con el servidor.')
      }
    } finally {
      if (!signal?.aborted) {
        setIsLoadingLocalidades(false)
      }
    }
  }, [])

  useEffect(() => {
    const controller = new AbortController()
    loadLocalidades(controller.signal)
    return () => controller.abort()
  }, [loadLocalidades])

  const handleSubmit = async (event, formType) => {
    event.preventDefault()
    const form = event.currentTarget
    if (!token) {
      setNotice({ type: 'error', text: 'Tu sesión no está activa. Inicia sesión nuevamente.' })
      return
    }

    const formData = new FormData(form)
    const values = Object.fromEntries(formData.entries())
    const requestBody = formType === 'veterinaria'
      ? {
          ...values,
          servicios: values.servicios.split(',').map((service) => service.trim()).filter(Boolean),
        }
      : formData
    const endpoint = formType === 'mascota' ? 'mascotas' : 'veterinarias'
    setSubmittingForm(formType)
    setNotice(null)

    try {
      const headers = { Authorization: `Bearer ${token}` }
      if (formType === 'veterinaria') {
        headers['Content-Type'] = 'application/json'
      }

      const response = await fetch(`${API_URL}/api/admin/${endpoint}`, {
        method: 'POST',
        headers,
        body: formType === 'veterinaria' ? JSON.stringify(requestBody) : requestBody,
      })
      const result = await readResponse(response)
      if (!response.ok) {
        throw new Error(result.error || 'No fue posible guardar el registro.')
      }

      form.reset()
      setNotice({
        type: 'success',
        text: formType === 'mascota'
          ? 'La mascota quedó registrada para adopción.'
          : 'La veterinaria aliada quedó registrada correctamente.',
      })
    } catch (requestError) {
      setNotice({
        type: 'error',
        text: requestError.message || 'No fue posible conectar con el servidor.',
      })
    } finally {
      setSubmittingForm('')
    }
  }

  if (!staffRoleIds.has(String(user?.rol_id))) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-12">
        <div className="rounded-xl bg-white p-8 text-center shadow-md">
          <h1 className="text-2xl font-bold text-[#1E5B42]">Acceso restringido</h1>
          <p className="mt-3 text-[#212121]/70">Esta sección es exclusiva para fundaciones y administradores.</p>
        </div>
      </section>
    )
  }

  const localityOptions = (
    <>
      <option value="">Selecciona una localidad</option>
      {localidades.map((localidad) => (
        <option key={localidad.id} value={localidad.nombre}>{localidad.nombre}</option>
      ))}
    </>
  )

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8" aria-labelledby="admin-title">
      <div className="mb-8">
        <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-[#E67E22]">Gestión HUVID</p>
        <h1 id="admin-title" className="text-3xl font-bold text-[#1E5B42]">Panel de administración</h1>
        <p className="mt-2 text-[#212121]/70">Registra mascotas en adopción y nuevas veterinarias aliadas.</p>
      </div>

      {notice && (
        <p className={`mb-6 rounded-lg px-4 py-3 text-sm font-medium ${notice.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`} role={notice.type === 'error' ? 'alert' : 'status'}>
          {notice.text}
        </p>
      )}

      {localidadesError && (
        <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-red-800" role="alert">
          <p>{localidadesError}</p>
          <button type="button" onClick={() => loadLocalidades()} className="mt-2 inline-flex items-center gap-2 font-semibold underline">
            <RefreshCw size={16} aria-hidden="true" /> Reintentar
          </button>
        </div>
      )}

      {!localidadesError && localidades.length === 0 && !isLoadingLocalidades && (
        <p className="mb-6 rounded-lg bg-amber-50 p-4 text-amber-900" role="status">No hay localidades disponibles. Verifica la migración inicial de la base de datos.</p>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-2">
        <form onSubmit={(event) => handleSubmit(event, 'mascota')} className="space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center gap-3">
            <PawPrint className="text-[#E67E22]" size={24} aria-hidden="true" />
            <h2 className="text-xl font-bold text-[#1E5B42]">Registrar mascota</h2>
          </div>
          <label className="block text-sm font-semibold text-[#212121]">Nombre
            <input name="nombre" required maxLength={100} className={fieldClass} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#212121]">Especie
              <input name="especie" required maxLength={60} placeholder="Perro, gato..." className={fieldClass} />
            </label>
            <label className="block text-sm font-semibold text-[#212121]">Edad
              <input name="edad" required maxLength={60} placeholder="Ej. 2 años" className={fieldClass} />
            </label>
          </div>
          <label className="block text-sm font-semibold text-[#212121]">Localidad
            <select name="localidad" required disabled={isLoadingLocalidades || localidades.length === 0} className={fieldClass}>
              {localityOptions}
            </select>
          </label>
          <label className="block text-sm font-semibold text-[#212121]">Descripción
            <textarea name="descripcion" required maxLength={10000} rows="4" className={`${fieldClass} resize-y`} />
          </label>
          <label className="block text-sm font-semibold text-[#212121]">Foto de la mascota (opcional)
            <input name="foto" type="file" accept="image/*" className={`${fieldClass} file:mr-3 file:rounded-md file:border-0 file:bg-[#1E5B42]/10 file:px-3 file:py-2 file:font-semibold file:text-[#1E5B42]`} />
            <span className="mt-1 block text-xs font-normal text-[#212121]/60">JPG, PNG, WEBP o GIF. Máximo 5 MB.</span>
          </label>
          <button type="submit" disabled={Boolean(submittingForm) || localidades.length === 0} className="w-full rounded-lg bg-[#1E5B42] px-4 py-3 font-bold text-white hover:bg-[#154431] disabled:cursor-wait disabled:opacity-60">
            {submittingForm === 'mascota' ? 'Guardando...' : 'Registrar mascota'}
          </button>
        </form>

        <form onSubmit={(event) => handleSubmit(event, 'veterinaria')} className="space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-black/5">
          <div className="flex items-center gap-3">
            <Building2 className="text-[#E67E22]" size={24} aria-hidden="true" />
            <h2 className="text-xl font-bold text-[#1E5B42]">Registrar veterinaria</h2>
          </div>
          <label className="block text-sm font-semibold text-[#212121]">Nombre del establecimiento
            <input name="nombre" required maxLength={160} className={fieldClass} />
          </label>
          <label className="block text-sm font-semibold text-[#212121]">Dirección
            <input name="direccion" required maxLength={1000} className={fieldClass} />
          </label>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-semibold text-[#212121]">Teléfono
              <input name="telefono" type="tel" required maxLength={30} className={fieldClass} />
            </label>
            <label className="block text-sm font-semibold text-[#212121]">Horario de atención
              <input name="horario_atencion" required maxLength={200} placeholder="Lun-Sáb · 8:00 a. m. - 6:00 p. m." className={fieldClass} />
            </label>
          </div>
          <label className="block text-sm font-semibold text-[#212121]">Servicios
            <input name="servicios" required placeholder="Urgencias, cirugía, vacunación" className={fieldClass} />
            <span className="mt-1 block text-xs font-normal text-[#212121]/60">Separa cada servicio con una coma.</span>
          </label>
          <label className="block text-sm font-semibold text-[#212121]">Localidad
            <select name="localidad" required disabled={isLoadingLocalidades || localidades.length === 0} className={fieldClass}>
              {localityOptions}
            </select>
          </label>
          <button type="submit" disabled={Boolean(submittingForm) || localidades.length === 0} className="w-full rounded-lg bg-[#1E5B42] px-4 py-3 font-bold text-white hover:bg-[#154431] disabled:cursor-wait disabled:opacity-60">
            {submittingForm === 'veterinaria' ? 'Guardando...' : 'Registrar veterinaria'}
          </button>
        </form>
      </div>
    </section>
  )
}
