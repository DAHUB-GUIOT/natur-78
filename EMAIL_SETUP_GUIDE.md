# Configuración de Email - SendGrid

## Problema Actual
Los emails de verificación no se están enviando porque SendGrid requiere que el email remitente esté verificado como "Sender Identity".

## Error Encontrado
```
The from address does not match a verified Sender Identity. Mail cannot be sent until this error is resolved.
```

## Solución

### Paso 1: Verificar Sender Identity en SendGrid
1. Ir a: https://app.sendgrid.com/settings/sender_auth
2. Hacer clic en "Create New Sender"
3. Completar el formulario con tu información:
   - From Name: Festival NATUR
   - From Email: (tu email real que vas a verificar)
   - Reply To: (mismo email o uno diferente)
   - Company Address, City, etc.
4. Hacer clic en "Create"
5. Verificar el email que SendGrid te enviará

### Paso 2: Actualizar el Código
Una vez que tengas el email verificado, actualizar en `server/emailService.ts`:

```typescript
// Cambiar de:
from: 'festivalnatur@gmail.com'

// A tu email verificado:
from: 'tu-email-verificado@ejemplo.com'
```

### Opciones de Email Remitente
- **Opción 1**: Usar tu email personal verificado (recomendado para desarrollo)
- **Opción 2**: Verificar el dominio `festivalnatur.com` completo (para producción)
- **Opción 3**: Crear un email específico como `noreply@tudominio.com` y verificarlo

## Estado Actual
- ✅ SendGrid API Key configurado
- ✅ Sistema de envío de emails implementado
- ❌ Sender Identity no verificado
- ❌ Emails no se pueden enviar

## Próximos Pasos
1. Verificar email en SendGrid
2. Informar qué email usar
3. Actualizar configuración
4. Probar envío de emails