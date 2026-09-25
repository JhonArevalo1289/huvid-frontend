import { useState } from 'react'
import { X, Upload, Phone, Mail } from 'lucide-react'

/**
 * Componente EmergencyFormModal - Modal para reportar emergencias
 * @param {boolean} isOpen - Controla visibilidad del modal
 * @param {Function} onClose - Callback al cerrar el modal
 */
export default function EmergencyFormModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    localidad: '',
    tipoCase: '',
    especie: '',
    descripcion: '',
    telefono: '',
    email: '',
  })

  const [photoPreview, setPhotoPreview] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Formulario enviado:', formData)
    // Aquí iría la lógica para enviar el formulario
    onClose()
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
          
          {/* Localidad/Barrio */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">
              Localidad/Barrio en Bogotá *
            </label>
            <input
              type="text"
              name="localidad"
              value={formData.localidad}
              onChange={handleInputChange}
              placeholder="Ej: Chapinero, La Candelaria"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30"
              required
            />
          </div>

          {/* Tipo de Caso */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">
              Tipo de Caso *
            </label>
            <select
              name="tipoCase"
              value={formData.tipoCase}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30"
              required
            >
              <option value="">Selecciona un tipo de caso</option>
              <option value="maltrato">Maltrato Animal</option>
              <option value="perdido">Animal Perdido</option>
              <option value="lesionado">Animal Lesionado</option>
              <option value="abandono">Abandono</option>
            </select>
          </div>

          {/* Especie/Raza */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">
              Especie/Raza *
            </label>
            <input
              type="text"
              name="especie"
              value={formData.especie}
              onChange={handleInputChange}
              placeholder="Ej: Perro, Gato, Loro, etc."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30"
              required
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">
              Descripción del Estado de Salud *
            </label>
            <textarea
              name="descripcion"
              value={formData.descripcion}
              onChange={handleInputChange}
              placeholder="Describe el estado, comportamiento y cualquier detalle importante..."
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30 resize-none"
              required
            />
          </div>

          {/* Adjuntar Foto */}
          <div>
            <label className="block text-sm font-semibold text-[#212121] mb-2">
              Adjuntar Foto
            </label>
            <div className="flex items-center gap-4">
              <label className="flex-1 flex items-center justify-center border-2 border-dashed border-[#1E5B42] rounded-lg p-6 cursor-pointer hover:bg-[#F4F6F5] transition">
                <div className="text-center">
                  <Upload size={32} className="text-[#1E5B42] mx-auto mb-2" />
                  <span className="text-sm text-[#212121]">Click para seleccionar foto</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoChange}
                  className="hidden"
                />
              </label>
              
              {photoPreview && (
                <div className="w-24 h-24 rounded-lg overflow-hidden border border-gray-300">
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Datos de Contacto */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-[#212121] mb-2">
                Teléfono *
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-[#1E5B42]" size={20} />
                <input
                  type="tel"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  placeholder="Ej: 3001234567"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#212121] mb-2">
                Email *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 text-[#1E5B42]" size={20} />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Ej: tu@email.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30"
                  required
                />
              </div>
            </div>
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
