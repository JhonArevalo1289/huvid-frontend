import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar({ activeTab, setActiveTab, onLoginClick }) {
  const [isOpen, setIsOpen] = useState(false)

  const navigateTo = (tab) => {
    setActiveTab(tab)
    setIsOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const navigationItems = [
    { id: 'inicio', label: 'Inicio' },
    { id: 'reportar', label: 'Reportar Caso' },
    { id: 'adopciones', label: 'Adopciones' },
    { id: 'veterinarias', label: 'Veterinarias Aliadas' },
  ]

  return (
    <nav className="bg-white border-b-4 border-[#1E5B42] shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo y Marca */}
          <button type="button" onClick={() => navigateTo('inicio')} className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition" aria-label="Ir a Inicio">
            <div className="flex items-center space-x-1">
              {/* Isotipo de la Huella */}
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  {/* Almohadillas superiores (Naranja) */}
                  <ellipse cx="30" cy="25" rx="10" ry="15" fill="#E67E22" />
                  <ellipse cx="50" cy="15" rx="12" ry="18" fill="#E67E22" />
                  <ellipse cx="70" cy="25" rx="10" ry="15" fill="#E67E22" />
                  
                  {/* Almohadillas laterales (Naranja) */}
                  <ellipse cx="18" cy="50" rx="9" ry="13" fill="#E67E22" />
                  <ellipse cx="82" cy="50" rx="9" ry="13" fill="#E67E22" />
                  
                  {/* Almohadilla base (Verde) */}
                  <ellipse cx="50" cy="75" rx="18" ry="22" fill="#1E5B42" />
                </svg>
              </div>
              <span className="text-2xl font-bold text-[#1E5B42]">HUVID</span>
            </div>
          </button>

          {/* Menú Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <button key={item.id} type="button" onClick={() => navigateTo(item.id)} className={`font-medium transition ${activeTab === item.id ? 'text-[#1E5B42] border-b-2 border-[#E67E22] pb-1' : 'text-[#212121] hover:text-[#1E5B42]'}`} aria-current={activeTab === item.id ? 'page' : undefined}>
                {item.label}
              </button>
            ))}
          </div>

          {/* Botón Login Desktop */}
          <div className="hidden md:block">
            <button type="button" onClick={onLoginClick} className="bg-[#1E5B42] text-white px-6 py-2 rounded-lg hover:bg-[#154431] transition font-medium">
              Iniciar Sesión
            </button>
          </div>

          {/* Botón Menú Mobile */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={() => setIsOpen((current) => !current)}
              className="text-[#1E5B42] hover:text-[#154431] transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Mobile */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigationItems.map((item) => (
              <button key={item.id} type="button" onClick={() => navigateTo(item.id)} className={`block w-full rounded-md px-3 py-2 text-left transition ${activeTab === item.id ? 'bg-[#F4F6F5] font-semibold text-[#1E5B42]' : 'text-[#212121] hover:bg-[#F4F6F5]'}`}>
                {item.label}
              </button>
            ))}
            <button type="button" onClick={onLoginClick} className="w-full mt-2 bg-[#1E5B42] text-white px-4 py-2 rounded-lg hover:bg-[#154431] transition font-medium">
              Iniciar Sesión
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
