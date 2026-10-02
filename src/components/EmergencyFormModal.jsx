import { useState } from 'react'
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

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
    setFormData({ localidad: '', tipo: '', direccion: '', descripcion: '', urgencia: '' })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Encabezado */}
        <div className="bg-[#1E5B42] text-white p-6 flex justify-between items-center sticky top-0">
          <h2 className="text-2xl font-bold">Reportar Caso / Emergencia</h2>
          <button
            onClick={onClose}
            className="hover:bg-[#154431] p-1 rounded transition"
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
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30 resize-none"
              required
            />
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

          {/* Botones de Acción */}
          <div className="flex gap-4 justify-end pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg text-[#212121] hover:bg-gray-100 transition font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#D32F2F] text-white rounded-lg hover:bg-[#B71C1C] transition font-medium"
            >
              Enviar Reporte
            </button>
          </div>

        </form>
      </div>
    </div>
  )
}
