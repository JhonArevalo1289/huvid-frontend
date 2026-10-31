import { useState } from 'react'
import { Eye, EyeOff, LockKeyhole, Mail, X } from 'lucide-react'

export default function LoginModal({ onClose, onLogin }) {
  const [showPassword, setShowPassword] = useState(false)
  const [mode, setMode] = useState('login')
  const [credentials, setCredentials] = useState({ nombre: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target
    setCredentials((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      const response = await fetch(`http://localhost:3000/api/auth/${mode === 'register' ? 'register' : 'login'}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...(mode === 'register' ? { nombre: credentials.nombre } : {}),
          email: credentials.email,
          password: credentials.password,
        }),
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'No fue posible completar la solicitud.')
      }

      onLogin({ user: data.user, token: data.token })
      onClose()
    } catch (requestError) {
      setError(requestError.message || 'No fue posible conectar con el servidor.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4" role="dialog" aria-modal="true" aria-labelledby="login-title">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
        <div className="flex items-center justify-between rounded-t-2xl bg-[#1E5B42] p-6 text-white">
          <div>
            <p className="text-sm text-white/70">Acceso HUVID</p>
            <h2 id="login-title" className="text-2xl font-bold">{mode === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-2 hover:bg-white/10" aria-label="Cerrar inicio de sesión">
            <X size={22} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5 p-6">
          {mode === 'register' && (
            <label className="block text-sm font-semibold text-[#212121]">
              Nombre completo
              <input name="nombre" type="text" value={credentials.nombre} onChange={handleChange} required maxLength={120} autoComplete="name" className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2.5 outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]/20" />
            </label>
          )}
          <label className="block text-sm font-semibold text-[#212121]">
            Correo electrónico
            <span className="relative mt-2 block">
              <Mail className="absolute left-3 top-3 text-[#1E5B42]" size={19} aria-hidden="true" />
              <input name="email" type="email" value={credentials.email} onChange={handleChange} required maxLength={254} autoComplete="email" placeholder="tu@email.com" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-3 outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]/20" />
            </span>
          </label>
          <label className="block text-sm font-semibold text-[#212121]">
            Contraseña
            <span className="relative mt-2 block">
              <LockKeyhole className="absolute left-3 top-3 text-[#1E5B42]" size={19} aria-hidden="true" />
              <input name="password" type={showPassword ? 'text' : 'password'} value={credentials.password} onChange={handleChange} required minLength={mode === 'register' ? 8 : undefined} autoComplete={mode === 'register' ? 'new-password' : 'current-password'} placeholder="••••••••" className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-11 outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]/20" />
              <button type="button" onClick={() => setShowPassword((current) => !current)} className="absolute right-3 top-2.5 text-gray-500" aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}>
                {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
              </button>
            </span>
          </label>
          {mode === 'register' && (
            <p className="text-sm text-[#212121]/70">El registro crea una cuenta ciudadana. Las cuentas institucionales requieren habilitación administrativa.</p>
          )}
          {error && <p className="text-sm text-red-700" role="alert">{error}</p>}
          <button type="submit" disabled={isSubmitting} className="w-full rounded-lg bg-[#1E5B42] px-4 py-3 font-bold text-white transition hover:bg-[#154431] disabled:cursor-wait disabled:opacity-60">
            {isSubmitting ? 'Procesando...' : mode === 'login' ? 'Ingresar' : 'Crear cuenta'}
          </button>
          <button type="button" onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError('') }} className="w-full text-sm font-semibold text-[#1E5B42] hover:text-[#E67E22]">
            {mode === 'login' ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
          <button type="button" onClick={onClose} className="w-full text-sm font-semibold text-[#1E5B42] hover:text-[#E67E22]">Continuar como visitante</button>
        </form>
      </div>
    </div>
  )
}
