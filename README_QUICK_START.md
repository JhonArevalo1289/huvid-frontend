# HUVID Frontend - Guía de Inicio Rápido

## ¿Qué es HUVID?

**HUVID** es una plataforma tecnológica integrada para la caracterización, reporte de emergencias y gestión centralizada de adopción y bienestar animal en Bogotá D.C.

🐾 **Eslogan**: *"Huellas y vida conectadas por la tecnología"*

---

## 🚀 Inicio Rápido

### Requisitos
- **Node.js** 16+ ([Descargar](https://nodejs.org))
- **npm** (incluido con Node.js)

### Instalación

```bash
# 1. Navegar al directorio
cd c:\Proyectos\huvid-frontend

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev

# 4. Abrir en navegador
# http://localhost:5173
```

---

## 📁 Estructura del Proyecto

```
huvid-frontend/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Navbar.jsx       # Barra de navegación
│   │   ├── Hero.jsx         # Banner principal
│   │   ├── AdoptionGrid.jsx # Grid de adopciones
│   │   ├── AlliedVeterinarians.jsx  # Veterinarias
│   │   ├── EmergencyFormModal.jsx   # Modal de emergencias
│   │   ├── Footer.jsx       # Pie de página
│   │   └── index.js         # Exportaciones
│   ├── constants/
│   │   └── config.js        # Configuración y constantes
│   ├── App.jsx              # Componente principal
│   ├── App.css              # Estilos de App
│   ├── index.css            # Estilos globales (Tailwind)
│   └── main.jsx             # Punto de entrada
├── public/
│   ├── Huvid_F.png          # Logo HUVID
│   └── vite.svg
├── package.json             # Dependencias
├── tailwind.config.js       # Config de Tailwind
├── vite.config.js           # Config de Vite
├── FRONTEND_DOCS.md         # Documentación completa
├── COMPONENTES.md           # Guía de componentes
├── GUIA_ESTILOS.md          # Guía de estilos CSS
└── README.md                # Este archivo
```

---

## 🎨 Identidad Corporativa

### Colores

| Elemento | Color | Hex |
|----------|-------|-----|
| 🟢 Verde Principal | Verde Profundo | `#1E5B42` |
| 🟠 Acento | Naranja | `#E67E22` |
| 🔴 Alerta | Rojo | `#D32F2F` |
| ⚪ Fondo | Gris Suave | `#F4F6F5` |

### Logo

El logo está en `public/Huvid_F.png`:
- Huella con base verde y almohadillas naranjas
- Texto "HUVID" en verde corporativo

---

## 🧩 Componentes Principales

### 1️⃣ Navbar
Barra de navegación responsive con:
- Logo interactivo
- Menú desktop/mobile
- Botón de login

### 2️⃣ Hero
Banner principal con:
- Degradado verde oscuro
- Título y eslogan
- Botones de acción

### 3️⃣ Adoption Grid
Grid de mascotas en adopción:
- Tarjetas responsivas
- Información de mascota
- Botón "Solicitar Adopción"

### 4️⃣ Emergency Form Modal
Modal para reportes de emergencias:
- Formulario completo
- Validación de campos
- Preview de foto

### 5️⃣ Allied Veterinarians
Directorio de veterinarias:
- Listado completo
- Información de contacto
- Especialidades

### 6️⃣ Footer
Pie de página con:
- Información institucional
- Enlaces rápidos
- Redes sociales

---

## 💻 Comandos Disponibles

```bash
# Desarrollo
npm run dev        # Inicia servidor en http://localhost:5173

# Build
npm run build      # Compila para producción

# Preview
npm run preview    # Visualiza el build de producción

# Lint
npm run lint       # Verifica errores de ESLint
```

---

## 🛠 Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|------------|---------|----------|
| React | 18.3.1 | Librería UI |
| Tailwind CSS | 4.3.3 | Estilos CSS |
| Lucide Icons | 1.48.0 | Iconografía |
| Vite | 5.4.10 | Build tool |
| ESLint | 9.13.0 | Linting |

---

## 📖 Documentación

Para más detalles, consulta:

- **[FRONTEND_DOCS.md](./FRONTEND_DOCS.md)** - Documentación completa del proyecto
- **[COMPONENTES.md](./COMPONENTES.md)** - Guía detallada de cada componente
- **[GUIA_ESTILOS.md](./GUIA_ESTILOS.md)** - Sistema de diseño y estilos

---

## 🎯 Características Actuales

✅ Navbar responsive con menú mobile  
✅ Hero banner con call-to-action  
✅ Grid de adopciones con datos de ejemplo  
✅ Modal de formulario para emergencias  
✅ Directorio de veterinarias aliadas  
✅ Footer institucional  
✅ Identidad corporativa completa  
✅ Diseño 100% responsivo  
✅ Animaciones suaves  
✅ Accesibilidad implementada  

---

## 🚀 Próximos Pasos

1. Conectar backend API
2. Implementar sistema de autenticación
3. Integrar base de datos de mascotas
4. Sistema de notificaciones
5. Chat en vivo con veterinarias
6. Dashboard de usuario

---

## 📧 Contacto

**Email**: info@huvid.com  
**Teléfono**: +57 300 1234567  
**Ubicación**: Bogotá D.C., Colombia

---

## 👨‍💻 Desarrollo

**Crédito**: Desarrollado como Proyecto de Titulación ADSO

---

## 📝 Notas Importantes

1. **Imágenes**: Las mascotas en el grid usan URLs de Unsplash para demostración
2. **Datos**: Los datos de veterinarias son ejemplos; integrar con API
3. **Validación**: Los formularios incluyen validación básica
4. **Scroll**: Implementado scroll suave entre secciones
5. **Colores**: Usar las variables de color corporativo en todos los elementos

---

## ✅ Checklist de Verificación

- [ ] Servidor de desarrollo corriendo
- [ ] Todos los componentes visibles
- [ ] Navbar responsive funciona
- [ ] Modal de emergencias abre/cierra
- [ ] Scroll suave entre secciones
- [ ] Estilos aplican correctamente
- [ ] No hay errores en consola
- [ ] ESLint verifica correctamente

---

**¡Bienvenido a HUVID! 🐾**

*Huellas y vida conectadas por la tecnología*
