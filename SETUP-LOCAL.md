# Configuración Local - Festival NATUR

## Dependencias Principales

```json
{
  "dependencies": {
    "express": "^4.21.2",
    "react": "^18.x",
    "typescript": "^5.x",
    "drizzle-orm": "^0.39.1",
    "@tanstack/react-query": "^5.60.5",
    "wouter": "^3.x",
    "tailwindcss": "^3.x",
    "framer-motion": "^11.18.2",
    "@neondatabase/serverless": "^0.10.4",
    "bcryptjs": "^3.0.2",
    "@sendgrid/mail": "^8.1.5",
    "express-session": "^1.18.2"
  }
}
```

## Variables de Entorno (.env)

```env
# PostgreSQL Database
DATABASE_URL=postgresql://username:password@hostname:port/database_name

# SendGrid Email Service
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Session Management
SESSION_SECRET=festival-natur-super-secret-key-2025

# Google OAuth (Opcional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Frontend URL
FRONTEND_URL=http://localhost:5000
```

## Base de Datos - SQL Setup

### Crear Tablas Principales
```sql
-- Users table (main authentication)
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  password VARCHAR,
  first_name VARCHAR,
  last_name VARCHAR,
  company_name VARCHAR,
  role VARCHAR DEFAULT 'viajero',
  email_verified BOOLEAN DEFAULT false,
  registration_complete BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  profile_completion INTEGER DEFAULT 0,
  verification_level VARCHAR DEFAULT 'basic',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Experiences table
CREATE TABLE experiences (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  title VARCHAR NOT NULL,
  description TEXT,
  category VARCHAR NOT NULL,
  status VARCHAR DEFAULT 'pendiente',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  sender_id INTEGER REFERENCES users(id),
  receiver_id INTEGER REFERENCES users(id),
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Usuarios de Prueba
```sql
-- Usuario empresa principal
INSERT INTO users (email, password, first_name, last_name, company_name, role, email_verified, registration_complete, is_active, verification_level, profile_completion)
VALUES ('dahub.tech@gmail.com', '$2b$10$gmw1fQxrFpIMskLf29OM6eKEymBifvF3SJR5vbDJDpLvpj1bxhY9y', 'David', 'Hub', 'DaHub Technology Solutions', 'empresa', true, true, true, 'premium', 100);

-- Usuario admin
INSERT INTO users (email, password, first_name, last_name, company_name, role, email_verified, registration_complete, is_active, verification_level, profile_completion)
VALUES ('admin@festivalnatur.com', '$2b$10$rQZ8kqx7y5E7aDzB1vYqE.XB6OMJ4A1K2QaZZpFl3vXzV8YU7uWGG', 'Admin', 'Festival NATUR', 'Festival NATUR Admin', 'empresa', true, true, true, 'certified', 100);
```

## Comandos de Inicio Rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar base de datos
npm run db:push

# 3. Iniciar servidor
npm run dev
```

## Estructura de Archivos Clave

```
src/
├── server/
│   ├── index.ts        # Servidor Express
│   ├── routes.ts       # API endpoints
│   ├── db.ts          # Conexión PostgreSQL
│   └── emailService.ts # SendGrid
├── client/src/
│   ├── App.tsx        # App principal React
│   ├── pages/         # Páginas del sistema
│   └── components/    # Componentes UI
└── shared/
    └── schema.ts      # Esquemas Drizzle
```

## Scripts package.json

```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx server/index.ts",
    "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "db:push": "drizzle-kit push"
  }
}
```