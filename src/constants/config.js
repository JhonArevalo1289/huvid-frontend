// Colores corporativos HUVID para referencia
export const HUVIDColors = {
  primary: '#1E5B42',      // Verde Principal
  accent: '#E67E22',       // Naranja Acento
  alert: '#D32F2F',        // Rojo Alerta
  bgLight: '#F4F6F5',      // Fondo Gris Suave
  bgWhite: '#FFFFFF',      // Blanco
  textDark: '#212121',     // Texto Principal
}

// Configuración de la aplicación
export const AppConfig = {
  name: 'HUVID',
  slogan: 'Huellas y vida conectadas por la tecnología',
  description: 'Plataforma tecnológica para la caracterización, reporte de emergencias y gestión centralizada de adopción y bienestar animal en Bogotá D.C.',
  location: 'Bogotá D.C., Colombia',
  contact: {
    email: 'info@huvid.com',
    phone: '+57 300 1234567',
  },
  social: {
    facebook: '#',
    twitter: '#',
    instagram: '#',
  },
  credit: 'Desarrollado como Proyecto de Titulación ADSO',
}

// Datos de ejemplo para desarrollo
export const MOCK_DATA = {
  // Mascotas en adopción
  pets: [
    {
      id: 1,
      nombre: 'Luna',
      especie: 'Gato',
      raza: 'Persa',
      salud: 'Excelente',
      color: 'Gris claro',
      ubicacion: 'Chapinero',
      imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&h=400&fit=crop'
    },
    {
      id: 2,
      nombre: 'Max',
      especie: 'Perro',
      raza: 'Golden Retriever',
      salud: 'Bueno',
      color: 'Dorado',
      ubicacion: 'Usaquén',
      imagen: 'https://images.unsplash.com/photo-1633722715463-d30628519e4f?w=400&h=400&fit=crop'
    },
  ],

  // Veterinarias aliadas
  veterinarias: [
    {
      id: 1,
      nombre: 'Clínica Veterinaria PetCare',
      barrio: 'Chapinero',
      telefono: '+57 300 1234567',
      website: 'www.petcare.com',
      horario: 'Lun-Dom 7:00 AM - 7:00 PM',
      especialidades: ['Cirugía', 'Dermatología', 'Emergencias']
    },
  ],
}

// Localidades de Bogotá D.C. (para formularios)
export const BOGOTA_LOCALITIES = [
  'Usaquén',
  'Chapinero',
  'Santa Fe',
  'San Cristóbal',
  'Usme',
  'Tunjuelito',
  'Bosa',
  'Kennedy',
  'Fontibón',
  'Engativá',
  'Suba',
  'Barrios Unidos',
  'Teusaquillo',
  'Los Mártires',
  'Antonio Nariño',
  'Puente Aranda',
  'La Candelaria',
  'Raffael Uribe Umaña',
  'Ciudad Bolívar',
  'Sumapaz',
]

// Tipos de casos para formulario
export const CASE_TYPES = [
  { value: 'maltrato', label: 'Maltrato Animal' },
  { value: 'perdido', label: 'Animal Perdido' },
  { value: 'lesionado', label: 'Animal Lesionado' },
  { value: 'abandono', label: 'Abandono' },
]

// Funciones utilitarias
export const Utils = {
  // Validar email
  isValidEmail: (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  },

  // Validar teléfono colombiano
  isValidPhone: (phone) => {
    const re = /^\+?57\s?[0-9]{10}|[0-9]{7,10}$/
    return re.test(phone.replace(/\s/g, ''))
  },

  // Formatear teléfono
  formatPhone: (phone) => {
    const cleaned = phone.replace(/\D/g, '')
    if (cleaned.length === 10) {
      return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3')
    }
    return phone
  },

  // Scroll suave a elemento
  smoothScrollTo: (elementId) => {
    const element = document.getElementById(elementId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  },
}

export default {
  HUVIDColors,
  AppConfig,
  MOCK_DATA,
  BOGOTA_LOCALITIES,
  CASE_TYPES,
  Utils,
}
