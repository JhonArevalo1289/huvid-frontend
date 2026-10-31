import { useRef, useState } from 'react'
import { X } from 'lucide-react'

/**
 * Componente EmergencyFormModal - Modal para reportar emergencias
 * @param {boolean} isOpen - Controla visibilidad del modal
 * @param {Function} onClose - Callback al cerrar el modal
 */
const localidadesBogota = [
  'Usaquén', 'Chapinero', 'Santa Fe', 'San Cristóbal', 'Usme', 'Tunjuelito',
  'Bosa', 'Kennedy', 'Fontibón', 'Engativá', 'Suba', 'Barrios Unidos',
  'Teusaquillo', 'Los Mártires', 'Antonio Nariño', 'Puente Aranda', 'La Candelaria',
  'Rafael Uribe Uribe', 'Ciudad Bolívar', 'Sumapaz',
]

export default function EmergencyFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    localidad: '',
    tipo: '',
    direccion: '',
    descripcion: '',
    urgencia: '',
  })
  const [foto, setFoto] = useState(null)
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const photoInput = useRef(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await onSubmit({ ...formData, foto })
      setFormData({ localidad: '', tipo: '', direccion: '', descripcion: '', urgencia: '' })
      setFoto(null)
      if (photoInput.current) {
        photoInput.current.value = ''
      }
    } catch (submitError) {
      setError(submitError.message || 'No fue posible enviar el reporte. Inténtalo nuevamente.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Encabezado */}
        <div className="bg-[#1E5B42] text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">Reportar Caso / Emergencia</h2>
          <button
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
            className="hover:bg-[#154431] p-1 rounded transition disabled:opacity-60"
            aria-label="Cerrar formulario de reporte"
          >
            <X size={24} />
          </button>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div>
            <label className="mb-2 block text-sm font-semibold text-[#212121]">Localidad de Bogotá *</label>
            <select name="localidad" value={formData.localidad} onChange={handleInputChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" required>
              <option value="">Selecciona una localidad</option>
              {localidadesBogota.map((localidad) => <option key={localidad} value={localidad}>{localidad}</option>)}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#212121]">Tipo de emergencia *</label>
            <select name="tipo" value={formData.tipo} onChange={handleInputChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" required>
              <option value="">Selecciona el tipo de emergencia</option>
              <option value="maltrato">Maltrato animal</option>
              <option value="perdido">Animal perdido</option>
              <option value="lesionado">Animal lesionado</option>
              <option value="abandono">Abandono</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#212121]">Dirección *</label>
            <input
              name="direccion"
              value={formData.direccion}
              onChange={handleInputChange}
              placeholder="Calle, carrera, número o punto de referencia"
              maxLength={500}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#212121]">Descripción *</label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe qué ocurrió y el estado del animal..."
              rows="4"
              maxLength={5000}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30 resize-none"
              required
            />
          </div>

          <div>
            <label htmlFor="emergency-photo" className="mb-2 block text-sm font-semibold text-[#212121]">Foto o evidencia (opcional)</label>
            <input
              id="emergency-photo"
              ref={photoInput}
              name="foto"
              type="file"
              accept="image/*"
              onChange={(event) => {
                setFoto(event.target.files?.[0] ?? null)
                setError('')
              }}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 file:mr-4 file:rounded-md file:border-0 file:bg-[#1E5B42]/10 file:px-3 file:py-2 file:font-semibold file:text-[#1E5B42]"
            />
            <p className="mt-1 text-xs text-gray-600">JPG, PNG, WEBP o GIF. Máximo 5 MB.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-[#212121]">Nivel de urgencia *</label>
            <select name="urgencia" value={formData.urgencia} onChange={handleInputChange} className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#1E5B42] focus:outline-none focus:ring-2 focus:ring-[#1E5B42]/20" required>
              <option value="">Selecciona el nivel de urgencia</option>
              <option value="baja">Baja</option>
              <option value="media">Media</option>
              <option value="alta">Alta</option>
              <option value="critica">Crítica</option>
            </select>
          </div>

          {error && <p className="text-sm text-red-700" role="alert">{error}</p>}

          {/* Botones de Acción */}
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-6 py-2 border border-gray-300 rounded-lg text-[#212121] hover:bg-gray-100 transition font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-[#D32F2F] text-white rounded-lg hover:bg-[#B71C1C] transition font-medium disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Reporte'}
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
