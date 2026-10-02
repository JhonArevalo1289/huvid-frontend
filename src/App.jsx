import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BlogNews from './components/BlogNews' // Componente de noticias
import EmergencyFormModal from './components/EmergencyFormModal'
import AdoptionGrid from './components/AdoptionGrid'
import AlliedVeterinarians from './components/AlliedVeterinarians'
import LoginModal from './components/LoginModal' // Modal de Login
import Footer from './components/Footer'
import './index.css'

const initialPets = [
  { id: 1, nombre: 'Luna', especie: 'Gata', raza: 'Criolla', salud: 'Excelente', ubicacion: 'Chapinero', imagen: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&h=450&fit=crop', estado: 'Disponible' },
  { id: 2, nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', salud: 'Bueno', ubicacion: 'Usaquén', imagen: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&h=450&fit=crop', estado: 'Disponible' },
  { id: 3, nombre: 'Mico', especie: 'Perro', raza: 'Beagle', salud: 'Excelente', ubicacion: 'La Candelaria', imagen: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&h=450&fit=crop', estado: 'Disponible' },
]

const readStoredValue = (key, fallback) => {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

function App() {
  const [activeTab, setActiveTab] = useState('inicio') // 'inicio', 'reportar', 'adopciones', 'veterinarias'
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false)
  const [pets, setPets] = useState(() => readStoredValue('huvid-pets', initialPets))
  const [emergencyReports, setEmergencyReports] = useState(() => readStoredValue('huvid-emergency-reports', []))
  const [user, setUser] = useState(() => readStoredValue('huvid-user', null))
  const [notification, setNotification] = useState('')

  useEffect(() => {
    window.localStorage.setItem('huvid-pets', JSON.stringify(pets))
  }, [pets])

  useEffect(() => {
    window.localStorage.setItem('huvid-emergency-reports', JSON.stringify(emergencyReports))
  }, [emergencyReports])

  useEffect(() => {
    if (user) {
      window.localStorage.setItem('huvid-user', JSON.stringify(user))
    } else {
      window.localStorage.removeItem('huvid-user')
    }
  }, [user])

  const handleAdoptionRequest = (petId, application) => {
    setPets((currentPets) => currentPets.map((pet) => (
      pet.id === petId ? { ...pet, estado: 'Solicitado', solicitud: application } : pet
    )))
  }

  const handleEmergencySubmit = (report) => {
    setEmergencyReports((currentReports) => [
      { ...report, id: Date.now(), createdAt: new Date().toISOString() },
      ...currentReports,
    ])
    setIsEmergencyOpen(false)
    setActiveTab('inicio')
    setNotification('Reporte enviado correctamente. Gracias por ayudar a un animal.')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Navbar recibe la pestaña activa y función para cambiarla */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLoginClick={() => setIsLoginOpen(true)} 
          user={user}
          onLogout={() => setUser(null)}
        />

        {/* Renderizado condicional según la pestaña seleccionada */}
        <main>
          {activeTab === 'inicio' && notification && (
            <div className="mx-auto mt-4 flex max-w-6xl items-center justify-between gap-4 rounded-lg border border-[#1E5B42]/20 bg-[#1E5B42]/10 px-4 py-3 text-sm font-medium text-[#1E5B42]" role="status">
              <span>{notification}</span>
              <button type="button" onClick={() => setNotification('')} className="font-bold hover:text-[#E67E22]" aria-label="Cerrar notificación">×</button>
            </div>
          )}

          {activeTab === 'inicio' && (
            <>
              <Hero 
                onReportClick={() => setActiveTab('reportar')} 
                onAdoptionClick={() => setActiveTab('adopciones')} 
              />
              <BlogNews />
            </>
          )}

          {activeTab === 'reportar' && (
            <div className="mx-auto max-w-3xl px-4 py-12">
              <div className="rounded-xl bg-white p-8 shadow-md">
              <h2 className="text-2xl font-bold text-[#1E5B42] mb-4">Reportar Caso o Emergencia</h2>
              <p className="mb-6 text-[#212121]/70">Reporta maltrato, pérdida o lesiones para activar una ruta de atención en Bogotá.</p>
              <button type="button" onClick={() => setIsEmergencyOpen(true)} className="rounded-lg bg-[#D32F2F] px-6 py-3 font-bold text-white hover:bg-[#B71C1C]">Abrir formulario de reporte</button>
              </div>
            </div>
          )}

          {activeTab === 'adopciones' && <AdoptionGrid pets={pets} onAdoptionRequest={handleAdoptionRequest} />}

          {activeTab === 'veterinarias' && <AlliedVeterinarians />}
        </main>
      </div>

      <EmergencyFormModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} onSubmit={handleEmergencySubmit} />
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={setUser} />}
      
      <Footer setActiveTab={setActiveTab} />
    </div>
  )
}

export default App