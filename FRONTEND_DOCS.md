# HUVID Frontend - Plataforma de Gestión y Bienestar Animal

## Descripción del Proyecto

HUVID es una plataforma tecnológica diseñada para la caracterización, reporte de emergencias y gestión centralizada de adopción y bienestar animal en Bogotá D.C.

## Estructura de Identidad Corporativa

### Colores Principales
- **Verde Principal HUVID**: `#1E5B42` - Barra de navegación, botones primarios y estructura visual
- **Naranja Acento HUVID**: `#E67E22` - Botones de acción, destacados de adopción y detalles visuales
- **Rojo Alerta**: `#D32F2F` - Botones y elementos de reportes de emergencia/maltrato
- **Fondo Contenedores**: `#F4F6F5` (gris suave) y `#FFFFFF` (blanco)
- **Texto Principal**: `#212121`

### Logo e Isotipo
- Huella con base verde (#1E5B42) y almohadillas superiores naranjas (#E67E22)
- Texto "HUVID" en verde
- Eslogan: "Huellas y vida conectadas por la tecnología"

## Estructura de Componentes

### 📁 src/components/

#### 1. **Navbar.jsx**
- Cabecera limpia en fondo blanco con borde inferior verde
- Isotipo interactivo con marca HUVID
- Menú responsive: "Inicio", "Reportar Caso", "Adopciones", "Veterinarias Aliadas"
- Botón "Iniciar Sesión" con fondo verde
- Menú mobile con hamburgresa interactivo

#### 2. **Hero.jsx**
- Banner principal con degradado verde oscuro
- Título "HUVID" destacado
- Eslogan principal
- Descripción de la plataforma
- Botones de acción:
  - "Reportar Caso / Emergencia" (Rojo #D32F2F)
  - "Ver Mascotas en Adopción" (Borde blanco)

#### 3. **EmergencyFormModal.jsx**
- Modal para reportar emergencias o animales perdidos
- Encabezado con franja verde
- Campos:
  - Localidad/Barrio en Bogotá
  - Tipo de caso (Maltrato, Perdido, Lesionado, Abandono)
  - Especie/Raza
  - Descripción del estado de salud
  - Adjuntar foto (preview en vivo)
  - Teléfono y Email de contacto
- Validación de formulario

#### 4. **AdoptionGrid.jsx**
- Grid responsive de tarjetas de mascotas
- Muestra: foto, nombre, especie, raza, estado de salud, ubicación
- Botón "Solicitar Adopción" en naranja
- Efecto hover con sombras suaves
- Datos de ejemplo con imágenes

#### 5. **AlliedVeterinarians.jsx**
- Listado de veterinarias aliadas
- Información de contacto, ubicación, website, horarios
- Especialidades destacadas
- Diseño responsivo en grid

#### 6. **Footer.jsx**
- Información institucional de HUVID
- Enlaces rápidos
- Información de contacto
- Redes sociales (Facebook, Twitter, Instagram)
- Crédito: "Desarrollado como Proyecto de Titulación ADSO"

### 7. **App.jsx**
- Componente principal
- Gestión de estado para el modal de reportes
- Integración de todos los componentes

## Instalación y Desarrollo

### Requisitos Previos
- Node.js >= 16
- npm o yarn

### Instalación

```bash
# Clonar el repositorio
git clone <repositorio>

# Navegar al directorio
cd huvid-frontend

# Instalar dependencias
npm install
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Acceder a http://localhost:5173
```

### Build para Producción

```bash
# Compilar para producción
npm run build

# Preview del build
npm run preview
```

### Linting

```bash
# Verificar errores de ESLint
npm run lint
```

## Tecnologías Utilizadas

- **React** 18.3.1 - Librería de UI
- **Tailwind CSS** 4.3.3 - Framework de CSS utilitario
- **Lucide Icons** 1.48.0 - Iconografía
- **Vite** 5.4.10 - Build tool
- **ESLint** 9.13.0 - Linting

## Configuración de Tailwind CSS

El proyecto utiliza **Tailwind CSS v4** con configuración personalizada en `tailwind.config.js`. Los colores corporativos están disponibles para uso directo en clases.

### Clases de Color Personalizadas (Ejemplos)
```jsx
bg-[#1E5B42]  // Verde HUVID
bg-[#E67E22]  // Naranja Acento
bg-[#D32F2F]  // Rojo Alerta
bg-[#F4F6F5]  // Fondo Gris
```

## Iconografía

Se utiliza **Lucide Icons** para todos los iconos. Importar según sea necesario:

```jsx
import { Menu, X, Heart, MapPin, Phone, Mail } from 'lucide-react'
```

## Características Principales

✅ **Navbar Responsive** - Navegación adaptable a dispositivos móviles  
✅ **Modal de Emergencias** - Formulario completo con validación  
✅ **Grid de Adopciones** - Tarjetas interactivas de mascotas  
✅ **Directorio de Veterinarias** - Información de clínicas aliadas  
✅ **Diseño Responsivo** - Compatible con todos los dispositivos  
✅ **Identidad Corporativa** - Aplicación consistente de colores y tipografía  
✅ **Accesibilidad** - Navegación por teclado y lectores de pantalla

## Notas de Desarrollo

- Las imágenes de mascotas en el grid de adopciones utilizan URLs de ejemplo (Unsplash)
- El formulario de emergencias incluye preview de foto en vivo
- Los datos de veterinarias son ejemplos; conectar con API real según sea necesario
- Todos los enlaces de scroll suave implementados con `scrollIntoView()`

## Próximas Mejoras

- [ ] Integración con backend API
- [ ] Sistema de autenticación
- [ ] Gestión de adopciones en base de datos
- [ ] Panel de administrador
- [ ] Notificaciones en tiempo real
- [ ] Búsqueda y filtros avanzados

## Créditos

Desarrollado como Proyecto de Titulación ADSO

---

**Diseñado con ❤️ para el bienestar animal en Bogotá D.C.**
