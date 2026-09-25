# Guía de Estilos HUVID Frontend

## 📐 Sistema de Diseño

Esta guía establece las normas de estilizado para mantener la consistencia visual en toda la plataforma HUVID.

---

## 🎨 Paleta de Colores

### Colores Corporativos

| Color | Valor Hex | Uso | Ejemplo Tailwind |
|-------|-----------|-----|------------------|
| **Verde Principal** | `#1E5B42` | Navbar, botones primarios, encabezados | `bg-[#1E5B42] text-[#1E5B42]` |
| **Naranja Acento** | `#E67E22` | Botones secundarios, highlights, adopción | `bg-[#E67E22]` |
| **Rojo Alerta** | `#D32F2F` | Botones de emergencia, alerts, critical | `bg-[#D32F2F]` |
| **Gris Fondo** | `#F4F6F5` | Fondos de secciones, contenedores | `bg-[#F4F6F5]` |
| **Blanco** | `#FFFFFF` | Fondos principales, tarjetas | `bg-white` |
| **Texto Oscuro** | `#212121` | Texto principal | `text-[#212121]` |
| **Gris Claro** | `#888888` | Texto secundario | `opacity-70` |

### Degradados Utilizados

```jsx
// Hero banner
from-[#1E5B42] to-[#123829]

// Hover buttons
hover:bg-[#154431]  // Verde más oscuro
hover:bg-[#D97013]  // Naranja más oscuro
hover:bg-[#B71C1C]  // Rojo más oscuro
```

---

## 📝 Tipografía

### Fuentes
- **Font Stack**: Sistema nativo (`-apple-system, BlinkMacSystemFont, 'Segoe UI', etc.`)
- **Sin serif** para máxima legibilidad web

### Tamaños y Estilos

| Elemento | Tamaño | Peso | Clase Tailwind | Uso |
|----------|--------|------|-----------------|-----|
| **H1** | 48px (3xl) | Bold (700) | `text-3xl md:text-6xl font-bold` | Títulos principales (Hero) |
| **H2** | 36px (2xl) | Bold (700) | `text-4xl font-bold` | Títulos de sección |
| **H3** | 24px (xl) | Bold (700) | `text-xl font-bold` | Subtítulos |
| **Body** | 16px (base) | Normal (400) | `text-base` | Texto descriptivo |
| **Small** | 14px (sm) | Normal (400) | `text-sm` | Etiquetas, descripciones |
| **XSmall** | 12px (xs) | Normal (400) | `text-xs` | Créditos, notas |
| **Label** | 14px (sm) | Semibold (600) | `text-sm font-semibold` | Labels de formularios |

### Ejemplo

```jsx
// Título principal
<h1 className="text-5xl md:text-6xl font-bold text-[#1E5B42]">
  HUVID
</h1>

// Subtítulo
<p className="text-xl md:text-2xl font-semibold text-[#E67E22]">
  Huellas y vida conectadas por la tecnología
</p>

// Descripción
<p className="text-lg text-[#212121] opacity-80">
  Plataforma tecnológica para la caracterización...
</p>
```

---

## 🎯 Espaciado

Se utiliza el sistema de espaciado de Tailwind (múltiplos de 4px):

| Clase | Valor | Uso |
|-------|-------|-----|
| `p-2` | 8px | Espaciado interno pequeño |
| `p-4` | 16px | Espaciado interno estándar |
| `p-6` | 24px | Espaciado interno grande |
| `gap-2` | 8px | Espaciado entre elementos |
| `gap-4` | 16px | Espaciado estándar entre elementos |
| `gap-6` | 24px | Espaciado grande entre elementos |
| `my-8` | Margen vertical 32px | Espaciado entre secciones |
| `py-16` | Padding vertical 64px | Espaciado de secciones |

### Ejemplo

```jsx
// Sección con espaciado
<section className="py-16 px-4">
  <div className="max-w-6xl mx-auto">
    {/* Contenido con gap entre elementos */}
    <div className="grid gap-6">
      {/* Items */}
    </div>
  </div>
</section>
```

---

## 🔲 Componentes Comunes

### Botones

#### Botón Primario (Verde)
```jsx
<button className="bg-[#1E5B42] text-white px-6 py-2 rounded-lg hover:bg-[#154431] transition font-medium">
  Acción Primaria
</button>
```

#### Botón Secundario (Naranja)
```jsx
<button className="bg-[#E67E22] text-white px-6 py-2 rounded-lg hover:bg-[#D97013] transition font-medium">
  Solicitar Adopción
</button>
```

#### Botón Alerta (Rojo)
```jsx
<button className="bg-[#D32F2F] text-white px-6 py-2 rounded-lg hover:bg-[#B71C1C] transition font-medium">
  Reportar Emergencia
</button>
```

#### Botón Outline
```jsx
<button className="border-2 border-white text-white hover:bg-white hover:text-[#1E5B42] px-6 py-2 rounded-lg transition font-medium">
  Secundario
</button>
```

#### Propiedades Comunes
- `rounded-lg` (8px border-radius)
- `hover:` para efectos en hover
- `transition` para animaciones suaves
- `font-medium` para peso de fuente

### Tarjetas

```jsx
<div className="bg-[#F4F6F5] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition p-4">
  {/* Contenido de la tarjeta */}
</div>
```

**Propiedades**:
- Fondo gris claro `#F4F6F5`
- Esquinas redondeadas `rounded-lg`
- Sombra `shadow-md` con hover `shadow-lg`
- Transición suave `transition`
- Padding `p-4` o `p-6`

### Inputs/Formularios

```jsx
<input
  type="text"
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-[#1E5B42] focus:ring-2 focus:ring-[#1E5B42] focus:ring-opacity-30"
/>
```

**Propiedades**:
- Borde gris `border-gray-300`
- Focus verde `focus:border-[#1E5B42]`
- Ring color `focus:ring-[#1E5B42]`
- Ring opacity `focus:ring-opacity-30`

---

## 🔄 Animaciones

### Transiciones

```jsx
// Transición suave
transition

// Con duración específica
transition-all duration-300

// Transformación en hover
hover:scale-105
hover:scale-110

// Opacidad
hover:opacity-80
```

### Ejemplos Comunes

```jsx
// Botón interactivo
<button className="transition hover:scale-105 hover:shadow-lg">
  Click me
</button>

// Link hover
<a className="hover:text-[#1E5B42] transition">
  Enlace
</a>

// Tarjeta interactiva
<div className="transform hover:scale-105 transition duration-300 shadow-md hover:shadow-lg">
  Tarjeta
</div>
```

---

## 📱 Responsividad

### Breakpoints Tailwind
```
- sm: 640px
- md: 768px   (tablets)
- lg: 1024px  (desktops)
- xl: 1280px  (desktops grandes)
- 2xl: 1536px
```

### Ejemplo Completo

```jsx
<div>
  {/* Oculto en móvil, visible en md */}
  <div className="hidden md:flex">
    Desktop Navigation
  </div>
  
  {/* Visible solo en móvil */}
  <div className="md:hidden">
    Mobile Menu
  </div>
  
  {/* Tamaño responsivo */}
  <h1 className="text-2xl md:text-4xl lg:text-6xl">
    Título Responsivo
  </h1>
  
  {/* Grid responsivo */}
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* Items */}
  </div>
</div>
```

---

## 🎭 Estados

### Hover
```jsx
hover:bg-[#1E5B42]    // Cambio de fondo
hover:text-[#E67E22]  // Cambio de texto
hover:shadow-lg       // Cambio de sombra
hover:scale-105       // Transformación
```

### Focus (para inputs)
```jsx
focus:outline-none              // Sin outline default
focus:border-[#1E5B42]          // Borde en color
focus:ring-2                    // Ring de 2px
focus:ring-[#1E5B42]            // Color del ring
focus:ring-opacity-30           // Opacidad del ring
```

### Disabled
```jsx
disabled:opacity-50
disabled:cursor-not-allowed
disabled:bg-gray-400
```

---

## 📦 Contenedores

### Ancho Máximo
```jsx
<div className="max-w-6xl mx-auto">
  {/* Contenido centrado con ancho máximo */}
</div>
```

### Secciones
```jsx
<section className="py-16 px-4 bg-white">
  <div className="max-w-6xl mx-auto">
    {/* Contenido */}
  </div>
</section>
```

### Flex para Alineación
```jsx
// Centrado horizontal y vertical
<div className="flex items-center justify-center">
  Contenido
</div>

// Espaciado entre elementos
<div className="flex justify-between items-center">
  Elemento 1
  Elemento 2
</div>
```

---

## 🌐 Accesibilidad

### Contrast
- Verde `#1E5B42` en blanco: ✓ Suficiente contraste (WCAG AA)
- Naranja `#E67E22` en blanco: ✓ Suficiente contraste (WCAG AA)
- Texto gris debe usar `opacity-70` máximo

### Focus Visible
```jsx
focus:outline-none focus:ring-2 focus:ring-[#1E5B42]
```

### Semantic HTML
```jsx
<nav>              {/* Navbar */}
<header>           {/* Encabezado */}
<section>          {/* Sección */}
<article>          {/* Contenido principal */}
<footer>           {/* Pie de página */}
<button>           {/* Botones, no divs */}
<a href="">        {/* Enlaces */}
<label htmlFor="">  {/* Labels conectados */}
```

---

## 📋 Checklist de Estilizado

- [ ] Colores corporativos correctos
- [ ] Tipografía consistente
- [ ] Espaciado uniforme
- [ ] Componentes responsivos
- [ ] Estados hover/focus definidos
- [ ] Sombras y profundidad aplicadas
- [ ] Transiciones suaves
- [ ] Accesibilidad verificada

---

**Mantener esta guía actualizada es responsabilidad del equipo de desarrollo.**
