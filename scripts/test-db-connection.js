#!/usr/bin/env node

// Script para probar la conexión a la base de datos
require('dotenv').config();

console.log('🔍 Probando conexión a la base de datos...\n');

// Mostrar configuración (sin mostrar credenciales completas)
console.log('📋 Configuración actual:');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('DATABASE_URL configurada:', !!process.env.DATABASE_URL);

if (process.env.DATABASE_URL) {
  // Mostrar solo el host y puerto sin credenciales
  const url = new URL(process.env.DATABASE_URL);
  console.log('Host:', url.hostname);
  console.log('Puerto:', url.port || '5432');
  console.log('Base de datos:', url.pathname.slice(1));
}

console.log('');

if (!process.env.DATABASE_URL) {
  console.log('❌ DATABASE_URL no está configurada.');
  console.log('📖 Crea un archivo .env basado en .env.example\n');
  process.exit(1);
}

// Probar conexión
try {
  const { Pool } = require('@neondatabase/serverless');
  
  const pool = new Pool({ 
    connectionString: process.env.DATABASE_URL,
    connectionTimeoutMillis: 5000
  });
  
  console.log('🔌 Intentando conectar...');
  
  pool.query('SELECT NOW() as current_time, version() as postgres_version', (err, result) => {
    if (err) {
      console.log('❌ Error de conexión:');
      console.log('Tipo:', err.code || 'UNKNOWN');
      console.log('Mensaje:', err.message);
      
      if (err.code === 'ENOTFOUND') {
        console.log('\n💡 Sugerencias:');
        console.log('- Verifica que el host sea correcto');
        console.log('- Verifica tu conexión a internet');
      } else if (err.code === 'ECONNREFUSED') {
        console.log('\n💡 Sugerencias:');
        console.log('- Verifica que PostgreSQL esté corriendo');
        console.log('- Verifica el puerto (usualmente 5432)');
      } else if (err.message.includes('authentication')) {
        console.log('\n💡 Sugerencias:');
        console.log('- Verifica el usuario y contraseña');
        console.log('- Verifica los permisos de la base de datos');
      }
      
      console.log('\n📖 Consulta SETUP-LOCAL.md para más ayuda.');
      process.exit(1);
    } else {
      console.log('✅ Conexión exitosa!');
      console.log('Tiempo actual:', result.rows[0].current_time);
      console.log('Versión PostgreSQL:', result.rows[0].postgres_version.split(' ')[0]);
      
      // Probar esquema
      pool.query('SELECT table_name FROM information_schema.tables WHERE table_schema = \'public\'', (schemaErr, schemaResult) => {
        if (schemaErr) {
          console.log('⚠️  No se pudo verificar el esquema:', schemaErr.message);
        } else {
          const tables = schemaResult.rows.map(row => row.table_name);
          console.log('Tablas encontradas:', tables.length);
          
          if (tables.length === 0) {
            console.log('\n🔄 La base de datos está vacía.');
            console.log('Ejecuta: npm run db:push');
          } else {
            console.log('Algunas tablas:', tables.slice(0, 5).join(', '));
            if (tables.length > 5) {
              console.log('... y', tables.length - 5, 'más');
            }
          }
        }
        
        console.log('\n🎉 ¡Todo listo para desarrollo!');
        console.log('Ejecuta: npm run dev');
        pool.end();
      });
    }
  });

} catch (importError) {
  console.log('❌ Error al importar dependencias:');
  console.log(importError.message);
  console.log('\n💡 Intenta:');
  console.log('npm install');
  process.exit(1);
}