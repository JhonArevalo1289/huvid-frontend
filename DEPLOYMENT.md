# 🚀 Guía de Despliegue - HUVID Frontend

## Introducción

Este documento describe cómo desplegar la aplicación HUVID en diferentes plataformas.

---

## 📋 Pre-requisitos

- Node.js 16+ instalado
- npm instalado
- Repositorio Git configurado
- Acceso a plataforma de hosting (Vercel, Netlify, etc.)

---

## 🏗️ Build para Producción

### Paso 1: Compilar la aplicación

```bash
cd c:\Proyectos\huvid-frontend
npm run build
```

Esto generará una carpeta `dist/` con los archivos optimizados.

### Paso 2: Verificar el build

```bash
npm run preview
# Acceder a http://localhost:4173
```

### Paso 3: Verificar que no hay errores

```bash
npm run lint
```

---

## 🌐 Despliegue en Vercel (Recomendado)

### Opción A: Desde línea de comandos

```bash
# Instalar Vercel CLI
npm install -g vercel

# Desplegar
vercel

# Seguir las instrucciones interactivas
```

### Opción B: Desde GitHub

1. Hacer push del código a GitHub
2. Ir a https://vercel.com/
3. Conectar repositorio
4. Vercel detectará automáticamente que es Vite
5. Hacer click en "Deploy"

### Configuración recomendada en Vercel

- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Node Version**: 18.x

---

## 🔶 Despliegue en Netlify

### Opción A: Desde línea de comandos

```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Desplegar
netlify deploy --prod
```

### Opción B: Conectar desde Git

1. Ir a https://app.netlify.com/
2. Click en "New site from Git"
3. Seleccionar repositorio GitHub
4. Configurar:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
5. Deploy

---

## 🟦 Despliegue en GitHub Pages

### Paso 1: Configurar vite.config.js

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/huvid-frontend/',  // Cambiar según nombre del repo
  plugins: [react()],
})
```

### Paso 2: Agregar dependencia

```bash
npm install --save-dev gh-pages
```

### Paso 3: Agregar scripts en package.json

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### Paso 4: Desplegar

```bash
npm run deploy
```

---

## 🐳 Despliegue con Docker

### Crear Dockerfile

```dockerfile
# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine
WORKDIR /app
RUN npm install -g serve
COPY --from=builder /app/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
```

### Crear .dockerignore

```
node_modules
npm-debug.log
.git
.gitignore
README.md
```

### Compilar y ejecutar

```bash
# Compilar imagen
docker build -t huvid-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 huvid-frontend
```

---

## 📦 Despliegue en Servidor Apache/Nginx

### Para Nginx

1. Compilar el proyecto:
```bash
npm run build
```

2. Copiar contenido de `dist/` al servidor:
```bash
scp -r dist/* usuario@servidor:/var/www/huvid/
```

3. Configurar Nginx:
```nginx
server {
    listen 80;
    server_name huvid.com;

    root /var/www/huvid;
    index index.html index.htm;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
}
```

### Para Apache

1. Compilar el proyecto
2. Copiar `dist/` a `public_html/`
3. Crear `.htaccess` en la raíz:

```apache
<IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.html$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.html [L]
</IfModule>
```

---

## 🔐 Configuración de Variables de Entorno

### Crear archivo .env.production

```env
VITE_API_URL=https://api.huvid.com
VITE_APP_NAME=HUVID
VITE_APP_VERSION=1.0.0
```

### Usar en código

```javascript
const API_URL = import.meta.env.VITE_API_URL
```

---

## 🔍 Verificación Post-Despliegue

### Checklist

- [ ] Sitio accesible por HTTPS
- [ ] Navbar se carga correctamente
- [ ] Menú mobile funciona
- [ ] Modal abre/cierra
- [ ] Formularios se envían
- [ ] Imágenes se cargan
- [ ] Scroll suave funciona
- [ ] Responsividad funciona
- [ ] No hay errores en consola
- [ ] Pagina carga en menos de 3s

### Pruebas de Performance

```bash
# Lighthouse
npm install -g lighthouse
lighthouse https://huvid.com --view
```

---

## 📊 Monitoreo

### Google Analytics

Agregar código en `src/main.jsx`:

```jsx
// Google Analytics
window.dataLayer = window.dataLayer || []
function gtag(){dataLayer.push(arguments)}
gtag('js', new Date())
gtag('config', 'GA_MEASUREMENT_ID')
```

### Sentry (Manejo de errores)

```bash
npm install @sentry/react @sentry/tracing
```

```javascript
import * as Sentry from "@sentry/react"

Sentry.init({
  dsn: "your-sentry-dsn",
  environment: "production",
})
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Install dependencies
      run: npm install
    
    - name: Run linter
      run: npm run lint
    
    - name: Build
      run: npm run build
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
        vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 🆘 Troubleshooting

### Problema: "npm ERR! 404"
**Solución**: `npm cache clean --force && npm install`

### Problema: "Build fails"
**Solución**: 
```bash
npm run build 2>&1 | tail -20  # Ver último error
```

### Problema: "CORS error en API"
**Solución**: Configurar headers CORS en backend

### Problema: "Asset not found"
**Solución**: Verificar configuración de `base` en `vite.config.js`

---

## 📝 Documentación de Despliegue

| Plataforma | Complejidad | Costo | Recomendación |
|-----------|-----------|------|---------------|
| Vercel | Muy Fácil | Gratis | ⭐⭐⭐⭐⭐ |
| Netlify | Muy Fácil | Gratis | ⭐⭐⭐⭐ |
| GitHub Pages | Fácil | Gratis | ⭐⭐⭐ |
| Docker | Medio | Varía | ⭐⭐⭐⭐ |
| Nginx/Apache | Difícil | Varía | ⭐⭐⭐ |

---

## 🎯 Recomendación Final

**Para un inicio rápido: Usar Vercel**

Ventajas:
- Conexión directa con GitHub
- Deploy automático en cada push
- SSL automático
- CDN global
- Plan gratuito generoso
- Excelente para aplicaciones React/Vite

---

## 📞 Soporte

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- GitHub Pages: https://pages.github.com
- Vite Deployment: https://vitejs.dev/guide/static-deploy.html

---

**Última actualización**: Septiembre 2026

---

*¡Tu aplicación HUVID está lista para ir al mundo!* 🚀
