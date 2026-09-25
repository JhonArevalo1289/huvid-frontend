/* eslint-disable no-unused-vars */
// EJEMPLOS DE USO Y PERSONALIZACIÓN DE COMPONENTES HUVID

import { useState } from 'react'
import { Navbar, AdoptionGrid, Footer } from './components'
import Hero from './components/Hero'
import EmergencyFormModal from './components/EmergencyFormModal'
import { HUVIDColors, AppConfig, Utils } from './constants/config'
import { Heart, MapPin, Phone, Mail } from 'lucide-react'

// ============================================================
// 1. USAR COMPONENTES INDIVIDUALES
// ============================================================

function SimpleExample() {
  return (
    <div>
      <Navbar />
      <Hero 
        onReportClick={() => console.log('Report clicked')}
        onAdoptionClick={() => console.log('Adoption clicked')}
      />
      <AdoptionGrid />
      <Footer />
    </div>
  )
}

// ============================================================
// 2. PERSONALIZAR CON PROPS
// ============================================================

function CustomExample() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleReportClick = () => {
    setIsModalOpen(true)
  }

  const handleAdoptionScroll = () => {
    document.getElementById('adopciones').scrollIntoView({
      behavior: 'smooth'
    })
  }

  return (
    <Hero 
      onReportClick={handleReportClick}
      onAdoptionClick={handleAdoptionScroll}
    />
  )
}

// ============================================================
// 3. USAR CONSTANTES Y COLORES
// ============================================================

function ColorExample() {
  return (
    <button
      style={{
        backgroundColor: HUVIDColors.primary,
        color: 'white',
      }}
    >
      Botón con color corporativo
    </button>
  )
}

// ============================================================
// 4. SCROLL SUAVE A SECCIONES
// ============================================================

function ScrollExample() {
  return (
    <div>
      <button onClick={() => Utils.smoothScrollTo('adopciones')}>
        Ir a Adopciones
      </button>

      <section id="adopciones" className="py-16">
        Contenido de adopciones
      </section>
    </div>
  )
}

// ============================================================
// 5. VALIDAR FORMULARIOS
// ============================================================

function ValidationExample() {
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = (e) => {
    e.preventDefault()
    const newErrors = {}

    if (!Utils.isValidEmail(email)) {
      newErrors.email = 'Email inválido'
    }

    if (!Utils.isValidPhone(phone)) {
      newErrors.phone = 'Teléfono inválido'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    console.log('Formulario válido')
    setErrors({})
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      {errors.email && <span className="text-red-500">{errors.email}</span>}
      
      <input
        type="tel"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        placeholder="Teléfono"
      />
      {errors.phone && <span className="text-red-500">{errors.phone}</span>}
      
      <button type="submit">Enviar</button>
    </form>
  )
}

// ============================================================
// 6. USAR LUCIDE ICONS
// ============================================================

function IconsExample() {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Heart className="text-[#E67E22]" size={24} />
        <span>Me encanta esta mascota</span>
      </div>

      <div className="flex items-center gap-2">
        <MapPin className="text-[#1E5B42]" size={24} />
        <span>Ubicación: Chapinero</span>
      </div>

      <div className="flex items-center gap-2">
        <Phone className="text-[#E67E22]" size={24} />
        <span>Llamar: +57 300 1234567</span>
      </div>

      <div className="flex items-center gap-2">
        <Mail className="text-[#1E5B42]" size={24} />
        <span>Email: info@huvid.com</span>
      </div>
    </div>
  )
}

// ============================================================
// 7. CREAR GRID PERSONALIZADO
// ============================================================

function CustomPetGrid({ pets }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {pets.map(pet => (
        <div
          key={pet.id}
          className="bg-[#F4F6F5] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <img
            src={pet.imagen}
            alt={pet.nombre}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-bold text-[#1E5B42] mb-2">
              {pet.nombre}
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              {pet.especie} - {pet.raza}
            </p>
            <button className="w-full bg-[#E67E22] text-white py-2 rounded-lg hover:bg-[#D97013] transition">
              Ver Detalles
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

// ============================================================
// 8. RESPONSIVE DESIGN PATTERNS
// ============================================================

function ResponsiveExample() {
  return (
    <div>
      <div className="md:hidden">
        Menú móvil
      </div>

      <div className="hidden md:block">
        Menú desktop
      </div>

      <h1 className="text-2xl md:text-4xl lg:text-6xl">
        Título Responsivo
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        Contenido responsivo
      </div>

      <div className="px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16">
        Padding responsivo
      </div>
    </div>
  )
}

// ============================================================
// EXPORTS
// ============================================================

export {
  SimpleExample,
  CustomExample,
  ColorExample,
  ScrollExample,
  ValidationExample,
  IconsExample,
  CustomPetGrid,
  ResponsiveExample,
}
