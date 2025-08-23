# Festival NATUR - Export Manual COMPLETO

## 🎯 Resumen del Proyecto

**Festival NATUR** es una plataforma integral de turismo sostenible que conecta empresas y viajeros en un ecosistema completo con:

- **Portal Empresas (B2B)**: Dashboard con mapa 3D, gestión de experiencias, networking
- **Portal Viajeros (B2C)**: Marketplace de experiencias, mapa interactivo, reservas
- **Sistema Unificado**: Autenticación dual, mensajería, perfiles completos
- **Funcionalidades Completas**: 32+ rutas, 9 modelos de base de datos, sistema de 7 pasos

## 📦 Archivos del Export Manual

### 1. **EXPORT-MANUAL.md** - Configuración Base
```
✅ package.json - Dependencias completas
✅ tsconfig.json - Configuración TypeScript
✅ vite.config.ts - Configuración Vite
✅ tailwind.config.ts - Configuración Tailwind CSS
✅ drizzle.config.ts - Configuración base de datos
✅ .env - Variables de entorno
✅ Scripts de instalación y comandos
```

### 2. **EXPORT-BACKEND.md** - Backend Completo
```
✅ shared/schema.ts - 9 modelos de base de datos (87 campos en users)
✅ server/index.ts - Servidor Express con sesiones
✅ server/db.ts - Conexión PostgreSQL
✅ server/storage.ts - Implementación DatabaseStorage (parcial)
```

### 3. **EXPORT-FRONTEND.md** - Frontend Base
```
✅ client/src/App.tsx - Router con 32+ rutas
✅ client/src/index.css - Estilos completos con tema claro/oscuro
✅ Configuración de componentes y hooks
```

### 4. **EXPORT-PAGES.md** - Páginas Principales
```
✅ client/src/main.tsx - Entry point React
✅ client/src/pages/Index.tsx - Homepage completa con navegación
```

## 🚀 Instalación Rápida

### 1. Crear Proyecto
```bash
mkdir festival-natur
cd festival-natur
npm init -y
```

### 2. Instalar Dependencias
```bash
# Copiar package.json del EXPORT-MANUAL.md
npm install
```

### 3. Estructura de Archivos
```bash
mkdir -p client/src/{components,pages,hooks,lib,contexts}
mkdir -p server
mkdir -p shared
mkdir -p attached_assets

# Copiar todos los archivos de los exports
```

### 4. Variables de Entorno (.env)
```env
DATABASE_URL=postgresql://user:pass@host:port/db
SENDGRID_API_KEY=SG.xxxxx
SESSION_SECRET=festival-natur-secret-2025
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
FRONTEND_URL=http://localhost:5000
```

### 5. Base de Datos
```bash
npm run db:push
```

### 6. Iniciar Desarrollo
```bash
npm run dev
# Servidor en http://localhost:5000
```

## 📄 Archivos Restantes por Copiar

### Backend Completo (Ver servidor actual)
```
server/routes.ts - API completa con todas las rutas
server/emailService.ts - Servicio SendGrid completo
server/googleAuth.ts - Autenticación Google OAuth
server/storage.ts - Implementación completa DatabaseStorage
shared/messaging-schema.ts - Esquemas de mensajería
```

### Frontend Páginas Principales (Ver cliente actual)
```
client/src/pages/MinimalistPortalEmpresas.tsx - Portal Empresas
client/src/pages/PortalViajerosNew.tsx - Portal Viajeros  
client/src/pages/PortalEmpresasAuth.tsx - Auth Empresas
client/src/pages/AuthViajeros.tsx - Auth Viajeros
client/src/pages/ExperienciasOptimized.tsx - Gestión experiencias
client/src/pages/Marketplace.tsx - Marketplace viajeros
client/src/pages/AdminDashboard.tsx - Panel admin
```

### Componentes UI (Ver cliente actual)
```
client/src/components/ui/ - Componentes shadcn/ui
client/src/components/layout/ - Layouts principales
client/src/components/accessibility/ - Accesibilidad
client/src/hooks/ - Custom hooks
client/src/lib/ - Utilidades y configuración
client/src/contexts/ - Context providers
```

## 🔐 Cuentas de Prueba

### Usuario Empresa Completo
```
Email: dahub.tech@gmail.com
Password: 12345678
Acceso: Portal Empresas completo + Portal Viajeros
Nivel: Premium (100% completado)
```

### Usuario Admin
```
Email: admin@festivalnatur.com  
Password: admin123
Acceso: Todas las funcionalidades
Nivel: Certified
```

## 🌐 URLs del Sistema

### Desarrollo Local
```
http://localhost:5000 - Aplicación principal
http://localhost:5000/portal-empresas - Portal Empresas
http://localhost:5000/portal-viajeros - Portal Viajeros
http://localhost:5000/admin - Panel administrativo
```

### Producción
```
https://festivalnatur.com - Dominio principal
https://natur-78-1-dahubtech.replit.app - Backup Replit
```

## ⚙️ Funcionalidades Implementadas

### Sistema de Autenticación
- ✅ Login local + Google OAuth
- ✅ Registro empresarial de 6 pasos
- ✅ Verificación por email (SendGrid)
- ✅ Sesiones persistentes
- ✅ Roles: viajero, empresa, admin

### Portal Empresas (B2B)
- ✅ Dashboard minimalista con mapa 3D
- ✅ Sidebar compacto (200px → 60px colapsado)
- ✅ Gestión de experiencias (6 pasos)
- ✅ Directorio de empresas
- ✅ Sistema de mensajería B2B
- ✅ Perfil empresarial completo

### Portal Viajeros (B2C)
- ✅ Marketplace de experiencias
- ✅ Mapa interactivo con filtros
- ✅ Sistema de reservas
- ✅ Búsqueda avanzada
- ✅ Experiencias categorizadas

### Sistema Completo
- ✅ 32+ rutas funcionales
- ✅ 9 modelos de base de datos
- ✅ Sistema de progreso de 7 pasos
- ✅ Notificaciones por email
- ✅ Responsive design mobile-first
- ✅ Tema claro/oscuro
- ✅ Accesibilidad (WCAG 2.1)

## 🗄️ Base de Datos (9 Tablas)

1. **users** - 87 campos, autenticación completa
2. **user_profiles** - Perfiles extendidos
3. **companies** - Información empresarial
4. **experiences** - Experiencias turísticas (50+ campos)
5. **experience_categories** - Categorías
6. **messages** - Sistema de mensajería
7. **conversations** - Hilos de conversación
8. **admin_logs** - Logs administrativos
9. **user_sessions** - Sesiones activas

## 🎨 Diseño y UI

### Tema Visual
- **Colores**: Verde NATUR (#CAD95E), Crema (#FCF8EE), Verde oscuro (#0a1a0a)
- **Fuentes**: Gasoek One (títulos), Unbounded (texto)
- **Efectos**: Glassmorphism, Brutalist cards
- **Responsive**: Mobile-first, breakpoints optimizados

### Componentes
- **shadcn/ui**: Sistema completo de componentes
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animaciones fluidas
- **Radix UI**: Primitivos accesibles

## 🔧 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Servidor completo (puerto 5000)

# Producción  
npm run build        # Compilar aplicación
npm start           # Servidor producción

# Base de datos
npm run db:push      # Sincronizar esquema
npm run db:push --force # Forzar sincronización

# Verificación
npm run check        # Verificar TypeScript
```

## 📊 Estado del Proyecto

### ✅ Completado
- Arquitectura full-stack completa
- Autenticación dual (local + Google)
- Portales funcionando (Empresas + Viajeros)
- Base de datos con 9 modelos
- 32+ rutas implementadas
- Sistema de mensajería
- Panel administrativo
- Responsive design
- Documentación completa

### 🎯 Listo para Deployment
- ✅ Código optimizado y limpio
- ✅ Variables de entorno configuradas
- ✅ Base de datos estructurada
- ✅ Tests de usuarios funcionando
- ✅ Documentación completa
- ✅ Git repository sincronizado

## 📞 Soporte

Para implementar el proyecto completo:
1. **Seguir la instalación rápida** de este documento
2. **Copiar archivos faltantes** del servidor actual de Replit
3. **Configurar variables de entorno** según tu hosting
4. **Sincronizar base de datos** con `npm run db:push --force`
5. **Probar con cuentas de prueba** proporcionadas

---

**Festival NATUR 2025** - Plataforma completa de turismo sostenible 🌿

*Export generado el 23 de agosto, 2025 - Versión 1.0*