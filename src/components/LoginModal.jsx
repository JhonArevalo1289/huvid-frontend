import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, X } from 'lucide-react'

export default function LoginModal({ onClose }) {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({ email: '', password: '' })
  const [message, setMessage] = useState('')

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setMessage('Demo lista: conecta este formulario con tu servicio de autenticación.')
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between rounded-t-2xl bg-[#1E5B42] p-6 text-white">
          <div>
            <p className="text-sm text-white/70">Acceso HUVID</p>
            <h2 id="login-title" className="text-2xl font-bold">Iniciar sesión</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10" aria-label="Cerrar inicio de sesión">
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          <label className="block text-sm font-semibold text-[#212121]">
            Correo electrónico
            <span className="relative mt-2 block">
              <Mail className="absolute left-3 top-3 text-[#1E5B42]" size={19} aria-hidden="true" />
              <input name="email" type="email" value={credentials.email} onChange={handleChange} required placeholder="tu@email.com" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]/20" />
            </span>
          </label>
          <label className="block text-sm font-semibold text-[#212121]">
            Contraseña
            <span className="relative mt-2 block">
              <LockKeyhole className="absolute left-3 top-3 text-[#1E5B42]" size={19} aria-hidden="true" />
              <input name="password" type={showPassword ? 'text' : 'password'} value={credentials.password} onChange={handleChange} required placeholder="••••••••" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-11 outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]/20" />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-2.5 text-gray-500" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </span>
          </label>
          <button type="submit" className="w-full rounded-lg bg-[#1E5B42] px-4 py-3 font-bold text-white transition hover:bg-[#154431]">Ingresar</button>
          {message && <p className="rounded-lg bg-[#F4F6F5] p-3 text-sm text-[#1E5B42]" role="status">{message}</p>}
          <button type="button" onClick={onClose} className="w-full text-sm font-semibold text-[#1E5B42] hover:text-[#E67E22]">Continuar como visitante</button>
        </form>
      </div>
    </div>
  )
}
