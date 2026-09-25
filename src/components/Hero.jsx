/**
 * Componente Hero - Banner principal de HUVID
 * @param {Function} onReportClick - Callback al hacer click en "Reportar Caso"
 * @param {Function} onAdoptionClick - Callback al hacer click en "Ver Adopciones"
 */
export default function Hero({ onReportClick, onAdoptionClick }) {
  return (
    <section
      id="inicio"
      className="bg-linear-to-r from-[#1E5B42] to-[#123829] py-20 px-4 text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        
        {/* Título Principal */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          HUVID
        </h1>

        {/* Eslogan */}
        <p className="text-xl md:text-2xl font-semibold text-[#E67E22] mb-6">
          Huellas y vida conectadas por la tecnología
        </p>

        {/* Descripción */}
        <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-3xl mx-auto leading-relaxed">
          Plataforma tecnológica para la caracterización, reporte de emergencias y gestión centralizada de adopción y bienestar animal en Bogotá D.C.
        </p>

        {/* Botones de Acción */}
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <button
            onClick={onReportClick}
            className="bg-[#D32F2F] hover:bg-[#B71C1C] text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 shadow-lg"
          >
            Reportar Caso / Emergencia
          </button>

          <button
            onClick={onAdoptionClick}
            className="border-2 border-white text-white hover:bg-white hover:text-[#1E5B42] font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Ver Mascotas en Adopción
          </button>
        </div>

      </div>
    </section>
  )
}
