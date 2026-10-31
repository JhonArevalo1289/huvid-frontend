# HUVID Backend

API REST inicial con Node.js 20+, Express y PostgreSQL. El healthcheck no requiere que PostgreSQL esté disponible.

## Requisitos

- Node.js 20 o superior y npm.
- PostgreSQL 14 o superior para ejecutar la migración y conectar datos.

## Instalación y ejecución local

Desde esta carpeta (`huvid-backend`):

```powershell
npm install
Copy-Item .env.example .env
```

Para usar la API sin base de datos, inicia directamente el servidor:

```powershell
npm run dev
```

Comprueba `http://localhost:3000/api/healthcheck`. La respuesta esperada incluye `"status": "ok"`.

## Inicializar PostgreSQL

1. Crea una base de datos y usuario. En `psql` puedes ejecutar:

```sql
CREATE USER huvid_user WITH PASSWORD 'elige_una_clave_local';
CREATE DATABASE huvid OWNER huvid_user;
```

2. Edita `.env` y configura `DATABASE_URL` con esos valores. Mantén `JWT_SECRET` como un secreto largo y aleatorio, y configura `CORS_ORIGIN` con el origen del frontend.
3. Aplica las tablas y datos iniciales:

```powershell
npm run db:migrate
```

4. Inicia el servidor:

```powershell
npm run dev
```

En modo producción usa `npm start`.

El CORS permite credenciales desde los orígenes listados en `CORS_ORIGIN` (por defecto, `http://localhost:5173`). Si cambias el puerto del frontend, actualiza esa variable y reinicia el servidor.

## Rutas disponibles

- `GET /api/healthcheck`: estado del servicio.
- `POST /api/emergencias`: alias para crear un reporte con evidencia opcional; requiere JWT y recibe `multipart/form-data` con la imagen en el campo `foto`.
- `POST /api/auth/register`: crea una cuenta ciudadana. Los roles de fundación y administrador deben asignarse mediante un proceso confiable y no pueden autoseleccionarse en el registro público.
- `GET /api/adopciones`: lista mascotas disponibles con localidad, edad, descripción e imagen.
- `POST /api/adopciones/:mascotaId/solicitudes`: registra una solicitud para una mascota disponible; requiere `Authorization: Bearer <token>` y JSON con `nombre`, `telefono`, `motivo` y `direccion`. La mascota pasa a estado `solicitado` al guardar la solicitud.
- `GET /api/veterinarias`: lista las veterinarias aliadas activas, con localidad, contacto, horario y servicios.
- `GET /api/localidades`: lista las localidades disponibles para los formularios.
- `POST /api/admin/mascotas`: registra una mascota en adopción; requiere JWT de fundación o administrador y `multipart/form-data` con `nombre`, `especie`, `edad`, `localidad`, `descripcion` y una imagen opcional en `foto`.
- `POST /api/admin/veterinarias`: registra una veterinaria aliada; requiere JWT de fundación o administrador y JSON con `nombre`, `direccion`, `telefono`, `horario_atencion`, `servicios` (arreglo de textos) y `localidad`.
- `GET /api/casos`: lista los reportes con el nombre de la localidad y ordenados del más reciente; requiere `Authorization: Bearer <token>`.
- `PATCH /api/casos/:id/estado`: actualiza el estado de un reporte autenticado. Recibe JSON con `estado`: `recibido`, `en_revision`, `en_atencion`, `resuelto` o `cerrado`.
- `POST /api/auth/register`: crea una cuenta con contraseña cifrada y devuelve usuario y JWT. Recibe `name`, `email`, `password` y opcionalmente `role` (`ciudadano` por defecto; también `fundacion`).
- `POST /api/auth/login`: valida `email` y `password` y devuelve usuario y JWT.
- `POST /api/casos`: crea un reporte de emergencia y requiere `Authorization: Bearer <token>`. Envía `multipart/form-data` con `localidad`, `tipo`, `direccion`, `descripcion`, `urgencia` y, opcionalmente, `foto` (JPG, PNG, WEBP o GIF de hasta 5 MB). El usuario se obtiene del JWT verificado; la evidencia se sirve desde `/uploads/`.

Las rutas que requieran sesión pueden usar `authMiddleware` desde `middlewares/authMiddleware.js`; el cliente debe enviar el token como `Authorization: Bearer <token>`.

La migración `migrations/001_initial_schema.sql` crea roles, usuarios, localidades, casos de emergencia, mascotas, solicitudes de adopción, veterinarias aliadas y noticias; además incluye roles y localidades iniciales. También agrega `evidencia_url` a `casos_emergencia` y `edad` y `descripcion` a `mascotas` en bases existentes. El modelo se basa en los campos visibles actualmente en el frontend y debe contrastarse con el MER definitivo antes de producción.