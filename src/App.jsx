import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BlogNews from './components/BlogNews' // Componente de noticias
import EmergencyFormModal from './components/EmergencyFormModal'
import AdoptionGrid from './components/AdoptionGrid'
import AdminDashboard from './components/AdminDashboard'
import AlliedVeterinarians from './components/AlliedVeterinarians'
import CasosList from './components/CasosList'
import LoginModal from './components/LoginModal' // Modal de Login
import Footer from './components/Footer'
import './index.css'

const readStoredValue = (key, fallback) => {
  try {
    const storedValue = window.localStorage.getItem(key)
    return storedValue ? JSON.parse(storedValue) : fallback
  } catch {
    return fallback
  }
}

const readStoredAuth = () => {
  const storedUser = readStoredValue('huvid_user', readStoredValue('huvid-user', null))
  const token = window.localStorage.getItem('huvid_token') || storedUser?.token

  if (!token || !storedUser || typeof storedUser !== 'object' || !storedUser.id || !storedUser.email || !storedUser.nombre) {
    return { user: null, token: null }
  }

  const user = {
    id: storedUser.id,
    nombre: storedUser.nombre,
    email: storedUser.email,
    rol_id: storedUser.rol_id,
  }
  return { user, token }
}

function App() {
  const [activeTab, setActiveTab] = useState('inicio')
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false)
  const [auth, setAuth] = useState(readStoredAuth)
  const [notification, setNotification] = useState('')
  const user = auth.user

  const handleLogin = ({ user: authenticatedUser, token }) => {
    window.localStorage.setItem('huvid_token', token)
    window.localStorage.setItem('huvid_user', JSON.stringify(authenticatedUser))
    setAuth({ user: authenticatedUser, token })
    if (activeTab === 'reportar') {
      setIsEmergencyOpen(true)
      setNotification('')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('huvid_token')
    window.localStorage.removeItem('huvid_user')
    window.localStorage.removeItem('huvid-user')
    setAuth({ user: null, token: null })
    if (activeTab === 'admin') {
      setActiveTab('inicio')
    }
  }

  const handleReportClick = () => {
    setActiveTab('reportar')
    if (auth.token) {
      setIsEmergencyOpen(true)
      return
    }
    setNotification('Inicia sesión para registrar un reporte de emergencia.')
    setIsLoginOpen(true)
  }

  const handleOpenEmergencyForm = () => {
    if (!auth.token) {
      setNotification('Inicia sesión para registrar un reporte de emergencia.')
      setIsLoginOpen(true)
      return
    }
    setIsEmergencyOpen(true)
  }

  const handleEmergencySubmit = async (report) => {
    if (!auth.token) {
      throw new Error('Tu sesión no está activa. Inicia sesión para enviar el reporte.')
    }

    const formData = new FormData()
    formData.append('localidad', report.localidad)
    formData.append('tipo', report.tipo)
    formData.append('direccion', report.direccion)
    formData.append('descripcion', report.descripcion)
    formData.append('urgencia', report.urgencia)
    if (report.foto) {
      formData.append('foto', report.foto)
    }

    let response
    try {
      response = await fetch('http://localhost:3000/api/emergencias', {
        method: 'POST',
        headers: { Authorization: `Bearer ${auth.token}` },
        body: formData,
      })
    } catch {
      throw new Error('No fue posible conectar con el servidor. Inténtalo nuevamente.')
    }

    let result
    try {
      result = await response.json()
    } catch {
      throw new Error('El servidor devolvió una respuesta inválida. Inténtalo nuevamente.')
    }

    if (!response.ok) {
      throw new Error(result.error || 'No fue posible enviar el reporte. Inténtalo nuevamente.')
    }

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
          onLogout={handleLogout}
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
                onReportClick={handleReportClick}
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
              {!user && <p className="mb-4 text-sm text-[#212121]/70">Debes iniciar sesión para enviar un reporte.</p>}
              <button type="button" onClick={handleOpenEmergencyForm} className="rounded-lg bg-[#D32F2F] px-6 py-3 font-bold text-white hover:bg-[#B71C1C]">Abrir formulario de reporte</button>
              </div>
            </div>
          )}

          {activeTab === 'adopciones' && <AdoptionGrid token={auth.token} user={user} onLoginClick={() => setIsLoginOpen(true)} />}

          {activeTab === 'veterinarias' && <AlliedVeterinarians />}

          {activeTab === 'casos' && <CasosList token={auth.token} onLoginClick={() => setIsLoginOpen(true)} />}

          {activeTab === 'admin' && <AdminDashboard token={auth.token} user={user} />}
        </main>
      </div>

      <EmergencyFormModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} onSubmit={handleEmergencySubmit} />
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} onLogin={handleLogin} />}
      
      <Footer setActiveTab={setActiveTab} />
    </div>
  )
}

export default App