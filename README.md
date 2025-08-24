# Festival NATUR - Plataforma de Turismo Sostenible

Una plataforma integral que conecta empresas de turismo sostenible con viajeros conscientes, centrada en la biodiversidad y prácticas regenerativas de Colombia.

## ✨ Nuevo: Sistema de Registro Empresarial Completo

Registro empresarial de 6 pasos que crea automáticamente perfiles completos:

1. **Información Personal** - Datos básicos y credenciales
2. **Información Empresarial** - Categorías, subcategorías y descripción
3. **Ubicación y Contacto** - Dirección, ciudad y sitio web
4. **Perfil y Servicios** - Foto de perfil, biografía y mercado objetivo
5. **Certificaciones** - Prácticas sostenibles (opcional)
6. **Redes Sociales** - Links a plataformas sociales (opcional)

## 🚀 Configuración Local

**Para ejecutar el proyecto localmente, consulta [SETUP-LOCAL.md](./SETUP-LOCAL.md)**

### Inicio Rápido

```bash
# 1. Clonar el repositorio
git clone https://github.com/DAHUB-GUIOT/natur-78.git
cd natur-78

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de base de datos

# 4. Configurar base de datos
npm run db:push

# 5. Ejecutar servidor de desarrollo
npm run dev
```

**Servidor disponible:** `http://localhost:5000`

### Solución Rápida de Problemas

```bash
# Probar conexión a base de datos
node scripts/test-db-connection.js

# Configuración automática
node scripts/setup-local.js

# Resetear completamente
rm -rf node_modules package-lock.json && npm install
```

## 🚀 Stack Tecnológico

### Backend
- **Express.js** + TypeScript - Framework web
- **PostgreSQL** + Drizzle ORM - Base de datos
- **bcryptjs** - Encriptación de contraseñas
- **SendGrid** - Envío de emails
- **express-session** - Gestión de sesiones

### Frontend
- **React 18** + TypeScript - Librería UI
- **Vite** - Build tool y dev server
- **Tailwind CSS** - Framework CSS
- **shadcn/ui** - Sistema de componentes
- **TanStack Query** - Estado del servidor
- **Wouter** - Router ligero
- **Framer Motion** - Animaciones
- **Mapbox GL** - Mapas interactivos

## 📁 Estructura del Proyecto

```
festival-natur/
├── client/              # Frontend React
│   ├── src/
│   │   ├── components/  # Componentes reutilizables
│   │   ├── pages/       # Páginas de la aplicación
│   │   ├── hooks/       # Custom hooks
│   │   ├── lib/         # Utilidades
│   │   └── contexts/    # Context providers
├── server/              # Backend Express
│   ├── db.ts           # Configuración base de datos
│   ├── routes.ts       # API routes
│   ├── storage.ts      # Capa de datos
│   ├── emailService.ts # Servicio de emails
│   └── googleAuth.ts   # Autenticación OAuth
├── shared/              # Tipos y schemas compartidos
│   └── schema.ts       # Esquemas Drizzle
└── package.json
```

## 🗄️ Modelos de Base de Datos (9 Tablas)

1. **users** - Usuarios y empresas (87 campos)
2. **user_profiles** - Perfiles detallados
3. **companies** - Información empresarial
4. **experiences** - Experiencias turísticas (50+ campos)
5. **experience_categories** - Categorías de experiencias
6. **messages** - Sistema de mensajería
7. **conversations** - Conversaciones
8. **admin_logs** - Logs administrativos
9. **user_sessions** - Sesiones de usuario

## ⚙️ Configuración Local

### 1. Clonar e Instalar
```bash
git clone https://github.com/tu-usuario/festival-natur.git
cd festival-natur
npm install
```

### 2. Variables de Entorno
Crear archivo `.env`:
```env
# Base de datos
DATABASE_URL=postgresql://usuario:password@host:port/database

# Emails
SENDGRID_API_KEY=tu_sendgrid_api_key

# Autenticación
SESSION_SECRET=tu_session_secret_super_seguro
GOOGLE_CLIENT_ID=tu_google_client_id
GOOGLE_CLIENT_SECRET=tu_google_client_secret

# Frontend (opcional)
FRONTEND_URL=http://localhost:5000
```

### 3. Base de Datos
```bash
# Crear tablas
npm run db:push

# O con force si hay conflictos
npm run db:push --force
```

### 4. Ejecutar Desarrollo
```bash
# Servidor completo (frontend + backend)
npm run dev

# El servidor corre en http://localhost:5000
```

## 🔐 Cuentas de Prueba

### Usuario Empresa (Completo)
- **Email**: dahub.tech@gmail.com
- **Password**: 12345678
- **Acceso**: Portal Empresas completo

### Usuario Admin
- **Email**: admin@festivalnatur.com
- **Password**: admin123
- **Acceso**: Todas las funcionalidades

## 🌐 URLs del Sistema

### Desarrollo Local
- **Aplicación**: http://localhost:5000
- **Portal Empresas**: http://localhost:5000/portal-empresas
- **Portal Viajeros**: http://localhost:5000/portal-viajeros

### Producción
- **Principal**: https://festivalnatur.com
- **Respaldo**: https://natur-78-1-dahubtech.replit.app

## 🎯 Funcionalidades Principales

### Portal Empresas (B2B)
- Dashboard con mapa interactivo 3D
- Registro empresarial de 6 pasos
- Gestión de experiencias turísticas
- Sistema de mensajería B2B
- Directorio de empresas

### Portal Viajeros (B2C)
- Marketplace de experiencias
- Búsqueda y filtros avanzados
- Mapa de experiencias
- Sistema de reservas

### Sistema Común
- Autenticación dual (local + Google)
- 4 niveles de verificación
- Sistema de 7 pasos de progreso
- Mensajería directa
- Notificaciones por email

## 📋 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor completo (puerto 5000)

# Producción
npm run build        # Compilar para producción
npm start           # Servidor de producción

# Base de datos
npm run db:push      # Sincronizar esquema
npm run db:push --force # Forzar sincronización

# Verificación
npm run check        # Verificar tipos TypeScript
```

## 🔧 Scripts de Base de Datos

### Crear Usuario Admin
```sql
INSERT INTO users (email, password, first_name, last_name, role, email_verified, registration_complete, is_active) 
VALUES ('admin@festivalnatur.com', '$2b$10$...', 'Admin', 'NATUR', 'empresa', true, true, true);
```

### Verificar Usuarios
```sql
SELECT email, role, email_verified, registration_complete FROM users;
```

## 🐛 Solución de Problemas

### Error de Puerto en Uso
```bash
# Matar procesos en puerto 5000
lsof -ti:5000 | xargs kill -9
```

### Error de Base de Datos
```bash
# Recrear esquema
npm run db:push --force
```

### Problemas de Autenticación
- Verificar variables de entorno
- Confirmar hash de contraseñas
- Revisar configuración de sesiones

## 🚀 Deployment

### Replit
1. Conectar repositorio GitHub
2. Configurar variables de entorno
3. Deploy automático

### Otros Providers
- Vercel + Neon (PostgreSQL)
- Railway + PostgreSQL
- Heroku + Postgres addon

## 📞 Soporte Técnico

Para problemas técnicos o preguntas sobre implementación:
- Revisar logs del servidor
- Verificar configuración de base de datos
- Confirmar variables de entorno
- Probar cuentas de prueba

---

**Festival NATUR 2025** - Conectando empresas y viajeros en el ecosistema de turismo sostenible 🌿