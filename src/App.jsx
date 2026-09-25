import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import BlogNews from './components/BlogNews' // Componente de noticias
import EmergencyFormModal from './components/EmergencyFormModal'
import AdoptionGrid from './components/AdoptionGrid'
import AlliedVeterinarians from './components/AlliedVeterinarians'
import LoginModal from './components/LoginModal' // Modal de Login
import Footer from './components/Footer'
import './index.css'

function App() {
  const [activeTab, setActiveTab] = useState('inicio') // 'inicio', 'reportar', 'adopciones', 'veterinarias'
  const [isLoginOpen, setIsLoginOpen] = useState(false)
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
      <div>
        {/* Navbar recibe la pestaña activa y función para cambiarla */}
        <Navbar 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          onLoginClick={() => setIsLoginOpen(true)} 
        />

        {/* Renderizado condicional según la pestaña seleccionada */}
        <main>
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

          {activeTab === 'adopciones' && <AdoptionGrid />}

          {activeTab === 'veterinarias' && <AlliedVeterinarians />}
        </main>
      </div>

      <EmergencyFormModal isOpen={isEmergencyOpen} onClose={() => setIsEmergencyOpen(false)} />
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}
      
      <Footer setActiveTab={setActiveTab} />
    </div>
  )
}

export default App