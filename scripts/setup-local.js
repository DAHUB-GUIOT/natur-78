#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Configurando Festival NATUR para desarrollo local...\n');

// 1. Verificar archivo .env
if (!fs.existsSync('.env')) {
  console.log('📝 Creando archivo .env desde .env.example...');
  if (fs.existsSync('.env.example')) {
    fs.copyFileSync('.env.example', '.env');
    console.log('✅ Archivo .env creado. Por favor edítalo con tus credenciales.\n');
  } else {
    console.log('❌ No se encontró .env.example\n');
  }
} else {
  console.log('✅ Archivo .env ya existe.\n');
}

// 2. Verificar NODE_ENV
process.env.NODE_ENV = 'development';

// 3. Verificar dependencias
console.log('📦 Verificando dependencias...');
try {
  execSync('npm list --depth=0', { stdio: 'pipe' });
  console.log('✅ Dependencias instaladas.\n');
} catch (error) {
  console.log('📦 Instalando dependencias...');
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencias instaladas.\n');
}

// 4. Verificar conexión a base de datos
console.log('🔍 Verificando configuración de base de datos...');
require('dotenv').config();

if (!process.env.DATABASE_URL) {
  console.log('❌ DATABASE_URL no está configurada en .env');
  console.log('📖 Consulta SETUP-LOCAL.md para configurar la base de datos.\n');
  process.exit(1);
}

// 5. Verificar conexión
console.log('🔌 Probando conexión a base de datos...');
try {
  // Importar y probar conexión
  const { Pool } = require('@neondatabase/serverless');
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  pool.query('SELECT NOW()', (err, result) => {
    if (err) {
      console.log('❌ Error de conexión:', err.message);
      console.log('📖 Verifica tu DATABASE_URL en .env\n');
      process.exit(1);
    } else {
      console.log('✅ Conexión a base de datos exitosa.\n');
      
      // 6. Ejecutar migraciones
      console.log('🔄 Ejecutando migraciones de base de datos...');
      try {
        execSync('npm run db:push', { stdio: 'inherit' });
        console.log('✅ Migraciones aplicadas.\n');
      } catch (migrationError) {
        console.log('⚠️  Error en migraciones:', migrationError.message);
        console.log('🔧 Puedes ejecutar manualmente: npm run db:push\n');
      }
      
      // 7. Mostrar resumen
      console.log('🎉 ¡Configuración completada!\n');
      console.log('📚 Comandos útiles:');
      console.log('  npm run dev          - Iniciar servidor de desarrollo');
      console.log('  npm run db:studio    - Abrir interfaz de base de datos');
      console.log('  npm run db:push      - Aplicar cambios de esquema');
      console.log('  npm run db:seed      - Poblar base de datos con datos de prueba');
      console.log('\n🌐 El servidor estará disponible en: http://localhost:5000');
      console.log('\n👤 Cuentas de prueba:');
      console.log('  Admin: admin@festivalnatur.com / admin123');
      console.log('  Empresa: dahub.tech@gmail.com / dahub123');
      
      process.exit(0);
    }
  });
  
} catch (importError) {
  console.log('❌ Error al conectar:', importError.message);
  console.log('📖 Verifica que hayas instalado las dependencias correctamente.\n');
  process.exit(1);
}