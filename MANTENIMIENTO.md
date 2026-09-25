# 🔧 Guía de Mantenimiento y Extensión - HUVID Frontend

## Introducción

Este documento proporciona instrucciones sobre cómo mantener, actualizar y extender el frontend de HUVID.

---

## 📋 Tabla de Contenidos

1. [Estructura del Código](#estructura-del-código)
2. [Agregar Nuevos Componentes](#agregar-nuevos-componentes)
3. [Modificar Componentes Existentes](#modificar-componentes-existentes)
4. [Integración con Backend](#integración-con-backend)
5. [Cambios de Estilos](#cambios-de-estilos)
6. [Troubleshooting](#troubleshooting)
7. [Mejores Prácticas](#mejores-prácticas)

---

## 🏗️ Estructura del Código

### Jerarquía de Componentes

```
App.jsx (Raíz)
├── Navbar
├── Hero
├── AdoptionGrid
├── AlliedVeterinarians
├── EmergencyFormModal
└── Footer
```

### Flujo de Props

```
App.jsx
├─→ Hero: onReportClick, onAdoptionClick
├─→ EmergencyFormModal: isOpen, onClose
```

### Estado Global

Actualmente manejado en `App.jsx`:
- `isModalOpen` - Visibilidad del modal

---

## ➕ Agregar Nuevos Componentes

### Paso 1: Crear el archivo del componente

```jsx
// src/components/NuevoComponente.jsx

/**
 * Descripción del componente
 * @param {Object} props - Props del componente
 * @returns {JSX.Element}
 */
export default function NuevoComponente({ prop1, prop2 }) {
  return (
    <div className="bg-white p-6 rounded-lg">
      {/* Contenido */}
    </div>
  )
}
```

### Paso 2: Agregar a las exportaciones

```javascript
// src/components/index.js
export { default as NuevoComponente } from './NuevoComponente'
```

### Paso 3: Importar en App.jsx

```jsx
import { NuevoComponente } from './components'

// En el return de App:
<NuevoComponente prop1={value1} prop2={value2} />
```

### Ejemplo: Componente de Testimonios

```jsx
// src/components/Testimonials.jsx

import { Star } from 'lucide-react'

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      nombre: 'María García',
      texto: 'Gracias HUVID por ayudarme a encontrar a Luna',
      rating: 5,
      imagen: 'https://...',
    }
  ]

  return (
    <section className="py-16 px-4 bg-[#F4F6F5]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-[#1E5B42] mb-12 text-center">
          Historias de Éxito
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(t => (
            <div key={t.id} className="bg-white rounded-lg p-6 shadow-md">
              <div className="flex gap-1 mb-4">
                {[...Array(t.rating)].map((_, i) => (
                  <Star key={i} size={18} className="text-[#E67E22] fill-current" />
                ))}
              </div>
              <p className="text-[#212121] mb-4">{t.texto}</p>
              <div className="flex items-center gap-3">
                <img src={t.imagen} alt={t.nombre} className="w-10 h-10 rounded-full" />
                <span className="font-semibold text-[#1E5B42]">{t.nombre}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

---

## ✏️ Modificar Componentes Existentes

### Cambiar Colores

1. Actualizar en el componente:
```jsx
// Antes
className="bg-[#1E5B42]"

// Después
className="bg-[#E67E22]"
```

2. O actualizar en `src/constants/config.js`:
```javascript
export const HUVIDColors = {
  primary: '#NUEVO_COLOR',
  // ...
}
```

### Agregar Nuevos Campos a Formulario

```jsx
// En EmergencyFormModal.jsx

const [formData, setFormData] = useState({
  localidad: '',
  tipoCase: '',
  especie: '',
  descripcion: '',
  telefono: '',
  email: '',
  nuevocampo: '',  // NUEVO CAMPO
})

// En el formulario:
<div>
  <label className="block text-sm font-semibold text-[#212121] mb-2">
    Nuevo Campo *
  </label>
  <input
    type="text"
    name="nuevocampo"
    value={formData.nuevocampo}
    onChange={handleInputChange}
    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42]"
    required
  />
</div>
```

### Cambiar Datos de Ejemplo

```jsx
// En AdoptionGrid.jsx

const pets = [
  {
    id: 1,
    nombre: 'Nuevo Nombre',
    especie: 'Nueva Especie',
    // ...
  }
]
```

---

## 🔌 Integración con Backend

### Ejemplo: Obtener Mascotas de API

```jsx
import { useEffect, useState } from 'react'

export default function AdoptionGrid() {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await fetch('/api/pets')
        if (!response.ok) throw new Error('Error al obtener mascotas')
        const data = await response.json()
        setPets(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchPets()
  }, [])

  if (loading) return <div>Cargando...</div>
  if (error) return <div className="text-red-500">Error: {error}</div>

  return (
    // Grid normalmente
  )
}
```

### Enviar Formulario a API

```jsx
// En EmergencyFormModal.jsx

const handleSubmit = async (e) => {
  e.preventDefault()
  
  try {
    const response = await fetch('/api/reports', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })

    if (!response.ok) throw new Error('Error al enviar')
    
    const result = await response.json()
    console.log('Reporte enviado:', result)
    onClose()
  } catch (error) {
    console.error('Error:', error)
  }
}
```

### Configurar URL Base de API

```javascript
// src/constants/config.js

export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api'

// Uso:
fetch(`${API_BASE_URL}/pets`)
```

---

## 🎨 Cambios de Estilos

### Cambiar Colores Corporativos

1. **En constants:**
```javascript
// src/constants/config.js
export const HUVIDColors = {
  primary: '#1E5B42',      // Verde
  accent: '#E67E22',       // Naranja
  alert: '#D32F2F',        // Rojo
  // ...
}
```

2. **En componentes:**
```jsx
className="bg-[#1E5B42]"  // Verde
className="bg-[#E67E22]"  // Naranja
className="bg-[#D32F2F]"  // Rojo
```

### Cambiar Tipografía

```jsx
// Tamaños
text-sm    // 14px
text-base  // 16px
text-lg    // 18px
text-xl    // 20px
text-2xl   // 24px
text-3xl   // 30px
text-4xl   // 36px

// Pesos
font-normal     // 400
font-medium     // 500
font-semibold   // 600
font-bold       // 700
```

### Cambiar Espaciado

```jsx
// Padding
p-2 p-4 p-6 p-8

// Margen
m-2 m-4 m-6 m-8

// Gap (entre elementos)
gap-2 gap-4 gap-6 gap-8

// Secciones
py-8 py-16 py-24
```

---

## 🐛 Troubleshooting

### Problema: Componente no aparece
**Solución**: Verificar que esté importado y agregado en App.jsx

### Problema: Estilos Tailwind no aplican
**Solución**: Usar la sintaxis correcta `className="bg-[#HEX]"`

### Problema: Modal no abre
**Solución**: Verificar que `isOpen` sea `true` en App.jsx

### Problema: ESLint error
**Solución**: Ejecutar `npm run lint -- --fix`

### Problema: Servidor de desarrollo no inicia
**Solución**: 
```bash
# Limpiar node_modules
rm -r node_modules package-lock.json
npm install
npm run dev
```

---

## ✅ Mejores Prácticas

### 1. Componentes Funcionales
```jsx
// ✅ Bien
function MiComponente({ prop }) {
  return <div>{prop}</div>
}

// ❌ Mal - No usar componentes de clase
class MiComponente extends React.Component { }
```

### 2. Props Documentation
```jsx
/**
 * Descripción del componente
 * @param {string} nombre - Nombre de la mascota
 * @param {number} edad - Edad en años
 * @returns {JSX.Element}
 */
export default function Card({ nombre, edad }) {
  return <div>{nombre} - {edad} años</div>
}
```

### 3. Usar Constantes
```jsx
// ✅ Bien
const COLORS = { primary: '#1E5B42' }
className={`bg-[${COLORS.primary}]`}

// ❌ Mal - Hard-coded colors
className="bg-[#1E5B42]"
```

### 4. Evitar Props Drilling
```jsx
// ✅ Bien - Pasar mínimas props
<Hero onReportClick={handleReport} />

// ❌ Mal - Demasiadas props
<Hero prop1={x} prop2={y} prop3={z} prop4={w} />
```

### 5. Nombrar Funciones Descriptivamente
```jsx
// ✅ Bien
const handleAdoptionRequest = () => { }
const openEmergencyModal = () => { }

// ❌ Mal
const handleClick = () => { }
const onClick = () => { }
```

### 6. Usar Tailwind Responsive
```jsx
// ✅ Bien
<div className="text-sm md:text-base lg:text-lg">
  Texto responsivo
</div>

// ❌ Mal - No responsive
<div style={{ fontSize: '16px' }}>
  Texto fijo
</div>
```

---

## 📚 Recursos Útiles

- [Documentación de React](https://react.dev)
- [Documentación de Tailwind CSS](https://tailwindcss.com)
- [Lucide Icons](https://lucide.dev)
- [Vite Documentation](https://vitejs.dev)

---

## 🔄 Workflow de Desarrollo

### 1. Crear rama
```bash
git checkout -b feature/nueva-funcionalidad
```

### 2. Hacer cambios
```bash
npm run dev  # Servidor de desarrollo
```

### 3. Verificar linting
```bash
npm run lint
```

### 4. Hacer commit
```bash
git add .
git commit -m "feat: descripción del cambio"
```

### 5. Hacer push
```bash
git push origin feature/nueva-funcionalidad
```

### 6. Crear pull request

---

## 📝 Checklist de Cambios

- [ ] Código escrito en componente
- [ ] ESLint pasa (`npm run lint`)
- [ ] Responsivo en mobile/tablet/desktop
- [ ] Colores corporativos aplicados
- [ ] Documentación actualizada
- [ ] Ejemplos incluidos si aplica
- [ ] Probado localmente (`npm run dev`)
- [ ] Push a rama feature
- [ ] Pull request creado

---

**Última actualización**: Septiembre 2026

---

*¿Preguntas? Consulta la documentación en FRONTEND_DOCS.md o COMPONENTES.md*
