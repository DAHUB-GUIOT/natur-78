# Configuración Local - Festival NATUR

## Requisitos Previos

- Node.js 18+ 
- PostgreSQL 15+ (local o remoto)
- Git

## 1. Clonar y Configurar el Proyecto

```bash
git clone https://github.com/DAHUB-GUIOT/natur-78.git
cd natur-78
npm install
```

## 2. Configuración de Base de Datos

### Opción A: PostgreSQL Local

1. Instalar PostgreSQL localmente
2. Crear una base de datos:
```sql
CREATE DATABASE natur_local;
CREATE USER natur_user WITH PASSWORD 'natur_password';
GRANT ALL PRIVILEGES ON DATABASE natur_local TO natur_user;
```

3. Crear archivo `.env` en la raíz del proyecto:
```env
DATABASE_URL=postgresql://natur_user:natur_password@localhost:5432/natur_local
PGHOST=localhost
PGPORT=5432
PGUSER=natur_user
PGPASSWORD=natur_password
PGDATABASE=natur_local
NODE_ENV=development
SESSION_SECRET=tu_clave_secreta_super_segura_aqui
SENDGRID_API_KEY=tu_sendgrid_key_aqui
```

### Opción B: Base de Datos Remota (Recomendado)

Para desarrollo rápido, puedes usar una base de datos remota como Neon, Supabase o Railway:

#### Neon (Gratis)
1. Crear cuenta en [neon.tech](https://neon.tech)
2. Crear proyecto y base de datos
3. Copiar la URL de conexión
4. Crear archivo `.env`:
```env
DATABASE_URL=postgresql://username:password@host/database?sslmode=require
NODE_ENV=development
SESSION_SECRET=tu_clave_secreta_super_segura_aqui
SENDGRID_API_KEY=tu_sendgrid_key_aqui
```

#### Supabase (Gratis)
1. Crear cuenta en [supabase.com](https://supabase.com)
2. Crear proyecto
3. Ir a Settings > Database
4. Copiar la URL de conexión directa
5. Usar en `.env` como arriba

## 3. Migrar la Base de Datos

```bash
# Pushear el esquema a la base de datos
npm run db:push

# Opcional: Poblar con datos de prueba
npm run db:seed
```

## 4. Configurar Variables de Entorno Adicionales

### SendGrid (Para Emails)
1. Crear cuenta en [sendgrid.com](https://sendgrid.com)
2. Crear API Key
3. Agregar a `.env`: `SENDGRID_API_KEY=tu_key_aqui`

### Google OAuth (Opcional)
Si quieres usar login con Google:
1. Ir a [Google Cloud Console](https://console.cloud.google.com)
2. Crear proyecto y habilitar Google+ API
3. Crear credenciales OAuth 2.0
4. Agregar a `.env`:
```env
GOOGLE_CLIENT_ID=tu_client_id
GOOGLE_CLIENT_SECRET=tu_client_secret
```

## 5. Ejecutar el Proyecto

```bash
# Desarrollo (hot reload)
npm run dev

# Producción
npm run build
npm start
```

El proyecto estará disponible en: `http://localhost:5000`

## 6. Estructura de Archivos Importante

```
proyecto/
├── client/          # Frontend React
├── server/          # Backend Express
├── shared/          # Tipos y esquemas compartidos
├── .env            # Variables de entorno (crear este archivo)
├── package.json
└── drizzle.config.ts
```

## 7. Comandos Útiles

```bash
# Ver logs de la base de datos
npm run db:studio

# Resetear base de datos (CUIDADO)
npm run db:drop
npm run db:push

# Ver migraciones
npm run db:generate

# Instalar dependencias
npm install

# Linter y formato
npm run lint
npm run format
```

## 8. Solución de Problemas Comunes

### Error de Conexión a Base de Datos
1. Verificar que PostgreSQL esté corriendo
2. Verificar credenciales en `.env`
3. Verificar que la base de datos existe
4. Probar conexión: `psql $DATABASE_URL`

### Error de Permisos
```bash
# Dar permisos al usuario
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO natur_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO natur_user;
```

### Error de Módulos
```bash
rm -rf node_modules package-lock.json
npm install
```

### Puerto en Uso
```bash
# Encontrar proceso usando puerto 5000
lsof -i :5000
# Matar proceso
kill -9 PID
```

## 9. Configuración de Desarrollo

### VS Code (Recomendado)
Instalar extensiones:
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- PostgreSQL
- Thunder Client (para probar APIs)

### Configuración de Base de Datos para Desarrollo
```json
// .vscode/settings.json
{
  "sqltools.connections": [
    {
      "name": "NATUR Local",
      "driver": "PostgreSQL",
      "previewLimit": 50,
      "server": "localhost",
      "port": 5432,
      "database": "natur_local",
      "username": "natur_user",
      "password": "natur_password"
    }
  ]
}
```

## 10. Deployment Local con Docker (Opcional)

```dockerfile
# Dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE 5000
CMD ["npm", "start"]
```

```yaml
# docker-compose.yml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "5000:5000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/natur
    depends_on:
      - db
  
  db:
    image: postgres:15
    environment:
      - POSTGRES_DB=natur
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

Ejecutar con: `docker-compose up`

## Cuentas de Prueba

Una vez configurado, puedes usar estas cuentas:

**Admin:**
- Email: admin@festivalnatur.com
- Password: admin123

**Empresa:**
- Email: dahub.tech@gmail.com  
- Password: dahub123

## Soporte

Si tienes problemas:
1. Verificar que todos los servicios estén corriendo
2. Revisar logs en la consola
3. Verificar archivo `.env`
4. Probar conexión a base de datos manualmente