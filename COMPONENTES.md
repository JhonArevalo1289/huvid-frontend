# Guía de Componentes HUVID Frontend

## 📚 Índice de Componentes

### 1. Navbar.jsx

**Propósito**: Barra de navegación principal responsiva

**Props**: Ninguno

**Características**:
- Logo interactivo con isotipo de huella
- Menú desktop horizontal
- Menú mobile con ícono hamburgesa
- Botón de login
- Borde inferior en verde corporativo

**Uso**:
```jsx
import Navbar from './components/Navbar'

<Navbar />
```

**Estilos Aplicados**:
- Fondo blanco con borde-bottom verde #1E5B42
- Navegación responsive con Tailwind
- Transiciones suaves en hover

---

### 2. Hero.jsx

**Propósito**: Banner principal con call-to-action

**Props**:
- `onReportClick` (function) - Callback al hacer click en "Reportar Caso"
- `onAdoptionClick` (function) - Callback al hacer click en "Ver Adopciones"

**Características**:
- Degradado verde oscuro (from-[#1E5B42] to-[#123829])
- Título principal "HUVID"
- Eslogan destacado en naranja
- Descripción de la plataforma
- Dos botones de acción principales

**Uso**:
```jsx
import Hero from './components/Hero'

<Hero 
  onReportClick={() => setIsModalOpen(true)}
  onAdoptionClick={() => scrollToAdoptions()}
/>
```

**Estilos Aplicados**:
- Gradiente personalizado
- Botones con efectos hover (scale)
- Sombras drop-shadow para texto

---

### 3. EmergencyFormModal.jsx

**Propósito**: Modal para reportar emergencias y casos de maltrato

**Props**:
- `isOpen` (boolean) - Controla visibilidad del modal
- `onClose` (function) - Callback al cerrar

**Características**:
- Validación de formulario
- Preview de foto en vivo
- Campos de contacto con ícono
- Scroll interno en altura máxima
- Encabezado verde corporativo

**Campos del Formulario**:
- Localidad/Barrio (required)
- Tipo de Caso (select con opciones)
- Especie/Raza (required)
- Descripción estado de salud (textarea, required)
- Adjuntar foto (file input, opcional)
- Teléfono (required)
- Email (required)

**Uso**:
```jsx
import EmergencyFormModal from './components/EmergencyFormModal'
const [isModalOpen, setIsModalOpen] = useState(false)

<EmergencyFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
```

**Estilos Aplicados**:
- Overlay negro semi-transparente
- Animación fade-in
- Focus ring en inputs personalizados
- Zona de drop file dashed border

---

### 4. AdoptionGrid.jsx

**Propósito**: Mostrar mascotas disponibles para adopción

**Props**: Ninguno

**Características**:
- Grid responsive (1 col mobile, 2 col tablet, 3 col desktop)
- Tarjetas con imagen, nombre, raza, salud
- Ubicación con ícono de mapa
- Botón "Solicitar Adopción" en naranja
- Efecto hover con scale
- Datos de ejemplo incluidos

**Datos Incluidos**:
- 6 mascotas de ejemplo (perros y gatos)
- Imágenes de Unsplash
- Información completa de estado

**Uso**:
```jsx
import AdoptionGrid from './components/AdoptionGrid'

<AdoptionGrid />
```

**Estilos Aplicados**:
- Tarjetas con fondo #F4F6F5
- Sombras suaves con hover aumentado
- Transiciones suaves de transformación

---

### 5. AlliedVeterinarians.jsx

**Propósito**: Directorio de veterinarias aliadas

**Props**: Ninguno

**Características**:
- Grid responsive de veterinarias
- Información completa de contacto
- Horarios de atención
- Especialidades en badges
- Borde izquierdo verde para diferenciación
- Datos de ejemplo incluidos

**Información por Veterinaria**:
- Nombre
- Ubicación (barrio)
- Teléfono (clickeable)
- Website (enlace externo)
- Horario de atención
- Especialidades (badges verdes)

**Uso**:
```jsx
import AlliedVeterinarians from './components/AlliedVeterinarians'

<AlliedVeterinarians />
```

**Estilos Aplicados**:
- Fondo gris claro #F4F6F5
- Tarjetas blancas con borde-left verde
- Íconos naranja para detalles

---

### 6. Footer.jsx

**Propósito**: Pie de página institucional

**Props**: Ninguno

**Características**:
- Información de marca HUVID
- Enlaces rápidos a secciones
- Información de contacto
- Redes sociales (Facebook, Twitter, Instagram)
- Crédito ADSO
- Fondo verde corporativo

**Secciones**:
1. Información de Marca
2. Enlaces Rápidos
3. Contacto (email, teléfono, ubicación)
4. Redes Sociales
5. Crédito de Proyecto

**Uso**:
```jsx
import Footer from './components/Footer'

<Footer />
```

**Estilos Aplicados**:
- Fondo verde #1E5B42
- Texto blanco
- Detalles en naranja en hover
- Links clickeables

---

### 7. App.jsx

**Propósito**: Componente raíz principal

**Características**:
- Gestión de estado del modal
- Orquestación de componentes
- Integración completa de la interfaz

**Estado Manejado**:
- `isModalOpen` - Visibilidad del modal de emergencias

**Funciones**:
- `openModal()` - Abre el modal
- `closeModal()` - Cierra el modal
- Scroll suave a secciones

**Estructura Completa**:
```
Navbar
  ↓
Hero (con scroll smooth)
  ↓
AdoptionGrid
  ↓
AlliedVeterinarians
  ↓
EmergencyFormModal (overlay)
  ↓
Footer
```

---

## 🎨 Sistema de Colores

| Uso | Código Hex | Clase Tailwind |
|-----|-----------|----------------|
| Verde Principal | #1E5B42 | `bg-[#1E5B42]` |
| Naranja Acento | #E67E22 | `bg-[#E67E22]` |
| Rojo Alerta | #D32F2F | `bg-[#D32F2F]` |
| Fondo Gris | #F4F6F5 | `bg-[#F4F6F5]` |
| Texto Principal | #212121 | `text-[#212121]` |
| Blanco | #FFFFFF | `bg-white` |

---

## 🔧 Librerías Utilizadas en Componentes

### Lucide Icons Utilizados
```jsx
// Navbar
Menu, X

// EmergencyFormModal
X, Upload, Phone, Mail

// AdoptionGrid
Heart, MapPin, Activity

// AlliedVeterinarians
MapPin, Phone, Globe, Clock

// Footer
Mail, Phone, MapPin, Facebook, Twitter, Instagram
```

---

## 📱 Responsividad

Todos los componentes utilizan Tailwind CSS responsive:

- **Mobile First**: Diseñados primero para móvil
- **Breakpoints Tailwind**:
  - `md:` - Tablets y superiores (768px+)
  - `lg:` - Desktops (1024px+)

Ejemplo en Navbar:
```jsx
<div className="hidden md:flex">     {/* Oculto en móvil */}
<div className="md:hidden">           {/* Solo visible en móvil */}
```

---

## 🎯 Mejores Prácticas

1. **Props Drilling**: Minimizado, funciones callback en componentes superiores
2. **State Management**: Manejo local en App.jsx, lifting up cuando es necesario
3. **Accesibilidad**: Navegación por teclado, labels en forms, semantic HTML
4. **Performance**: Componentes funcionales, sin re-renders innecesarios
5. **Diseño**: Consistencia en colores, espaciado y tipografía

---

## 🚀 Próximas Mejoras

- [ ] Componente de búsqueda y filtros
- [ ] Galería de fotos mejorada
- [ ] Sistema de comentarios en adopciones
- [ ] Mapa interactivo de ubicaciones
- [ ] Chat en vivo con veterinarias
- [ ] Dashboard de usuario
- [ ] Sistema de notificaciones

---

**Última actualización**: Septiembre 2026
