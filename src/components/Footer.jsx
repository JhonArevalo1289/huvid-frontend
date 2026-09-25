import { Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-[#1E5B42] text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          
          {/* Información de la Marca */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative w-8 h-8">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                  <ellipse cx="30" cy="25" rx="10" ry="15" fill="#E67E22" />
                  <ellipse cx="50" cy="15" rx="12" ry="18" fill="#E67E22" />
                  <ellipse cx="70" cy="25" rx="10" ry="15" fill="#E67E22" />
                  <ellipse cx="18" cy="50" rx="9" ry="13" fill="#E67E22" />
                  <ellipse cx="82" cy="50" rx="9" ry="13" fill="#E67E22" />
                  <ellipse cx="50" cy="75" rx="18" ry="22" fill="#FFFFFF" />
                </svg>
              </div>
              <span className="text-xl font-bold">HUVID</span>
            </div>
            <p className="text-sm text-gray-200 leading-relaxed">
              Huellas y vida conectadas por la tecnología. Plataforma dedicada al bienestar animal en Bogotá D.C.
            </p>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h4 className="font-bold text-lg mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2 text-sm text-gray-200">
              <li>
                <a href="#inicio" className="hover:text-[#E67E22] transition">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#reportar" className="hover:text-[#E67E22] transition">
                  Reportar Caso
                </a>
              </li>
              <li>
                <a href="#adopciones" className="hover:text-[#E67E22] transition">
                  Adopciones
                </a>
              </li>
              <li>
                <a href="#veterinarias" className="hover:text-[#E67E22] transition">
                  Veterinarias Aliadas
                </a>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contacto</h4>
            <div className="space-y-3 text-sm text-gray-200">
              <div className="flex items-center gap-2">
                <Mail size={18} className="text-[#E67E22]" />
                <a href="mailto:info@huvid.com" className="hover:text-[#E67E22] transition">
                  info@huvid.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={18} className="text-[#E67E22]" />
                <a href="tel:+573001234567" className="hover:text-[#E67E22] transition">
                  +57 300 1234567
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={18} className="text-[#E67E22]" />
                <span>Bogotá D.C., Colombia</span>
              </div>
            </div>
          </div>

        </div>

        {/* Redes Sociales */}
        <div className="border-t border-gray-700 pt-8 flex justify-between items-center flex-col md:flex-row gap-4">
          
          {/* Redes */}
          <div className="flex items-center gap-4 text-sm">
            <a href="#facebook" className="text-gray-200 hover:text-[#E67E22] transition">
              Facebook
            </a>
            <a href="#twitter" className="text-gray-200 hover:text-[#E67E22] transition">
              Twitter
            </a>
            <a href="#instagram" className="text-gray-200 hover:text-[#E67E22] transition">
              Instagram
            </a>
          </div>

          {/* Crédito */}
          <p className="text-xs text-gray-300 text-center md:text-right">
            Desarrollado como Proyecto de Titulación ADSO
          </p>

        </div>

      </div>
    </footer>
  )
}
