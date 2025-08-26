import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

if (!process.env.SENDGRID_FROM_EMAIL) {
  throw new Error("SENDGRID_FROM_EMAIL environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  headers?: Record<string, string>;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    // Configuración simple y directa
    const mailData: any = {
      to: params.to,
      from: params.from,
      subject: params.subject,
      html: params.html
    };
    
    // Solo agregar texto si existe
    if (params.text) {
      mailData.text = params.text;
    }
    
    await mailService.send(mailData);
    return true;
  } catch (error) {
    console.error('SendGrid email error:', error);
    return false;
  }
}

export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  companyName: string,
  verificationToken: string
): Promise<boolean> {
  const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000';
  const verificationUrl = `${process.env.FRONTEND_URL || 'https://' + domain}/verificar-email?token=${verificationToken}`;
  
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verificación de cuenta - Festival NATUR</title>
      <style>
        @media only screen and (max-width: 600px) {
          .container { width: 100% !important; padding: 10px !important; }
          .button { display: block !important; width: 80% !important; }
        }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: white; border: 1px solid #e0e0e0; }
        .header { background: linear-gradient(135deg, #cad95e, #22c55e); padding: 40px 30px; text-align: center; color: white; }
        .content { padding: 40px 30px; background: white; }
        .button { display: inline-block; background: #cad95e; color: #000; padding: 16px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 25px 0; font-size: 16px; }
        .footer { background: #f8f8f8; padding: 30px; text-align: center; font-size: 14px; color: #666; border-top: 1px solid #e0e0e0; }
        .verification-box { background: #f0f8ff; border: 1px solid #cad95e; padding: 20px; border-radius: 8px; margin: 20px 0; }
        h1 { margin: 0; font-size: 2.2em; font-weight: 700; }
        h2 { color: #2c5530; margin-top: 0; }
        .benefits { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Festival NATUR</h1>
          <p style="margin: 10px 0 0 0; font-size: 1.1em; opacity: 0.9;">Turismo Sostenible y Regenerativo 2025</p>
        </div>
        
        <div class="content">
          <h2>Hola ${userName},</h2>
          <p>Gracias por registrar <strong>${companyName}</strong> en Festival NATUR 2025.</p>
          
          <div class="verification-box">
            <p><strong>Paso final:</strong> Verifica tu dirección de correo electrónico para activar tu cuenta empresarial.</p>
            
            <div style="text-align: center; margin: 25px 0;">
              <a href="${verificationUrl}" class="button" style="color: #000;">Verificar mi cuenta</a>
            </div>
          </div>
          
          <div class="benefits">
            <h3 style="color: #2c5530; margin-top: 0;">Tu acceso incluye:</h3>
            <ul style="margin: 0; padding-left: 20px;">
              <li>Dashboard empresarial personalizado</li>
              <li>Presencia en el directorio oficial</li>
              <li>Herramientas de creación de experiencias</li>
              <li>Red de contactos del sector turístico</li>
              <li>Participación en eventos NATUR 2025</li>
            </ul>
          </div>
          
          <p>Si el botón anterior no funciona, copia y pega esta dirección en tu navegador:</p>
          <p style="word-break: break-all; background: #f5f5f5; padding: 15px; border-radius: 5px; font-family: monospace; font-size: 14px;">${verificationUrl}</p>
          
          <p style="color: #666; font-size: 14px;">Este enlace de verificación caduca en 24 horas por seguridad.</p>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p>Nos complace tenerte en nuestra comunidad de turismo sostenible.</p>
          
          <p>Cordialmente,<br>
          <strong>Equipo Festival NATUR</strong><br>
          <span style="color: #666; font-size: 14px;">Bogotá, Colombia</span></p>
        </div>
        
        <div class="footer">
          <p><strong>Festival NATUR 2025</strong><br>
          Plataforma Oficial de Turismo Sostenible y Regenerativo</p>
          <p style="margin: 15px 0 5px 0; font-size: 12px;">
            Este es un mensaje transaccional de verificación de cuenta.<br>
            No es necesario responder a este correo electrónico.
          </p>
          <p style="margin: 5px 0; font-size: 12px;">
            Si no te registraste en Festival NATUR, puedes ignorar este mensaje.
          </p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `Verificación de cuenta - Festival NATUR 2025`,
    html: htmlContent,
    text: `Hola ${userName},

Gracias por registrar ${companyName} en Festival NATUR 2025.

Para completar tu registro y activar tu cuenta empresarial, por favor verifica tu dirección de correo electrónico visitando el siguiente enlace:

${verificationUrl}

Este enlace de verificación caduca en 24 horas por seguridad.

Con tu cuenta activa tendrás acceso completo al portal empresarial, directorio oficial y herramientas para crear experiencias turísticas sostenibles.

Cordialmente,
Equipo Festival NATUR
Bogotá, Colombia

---
Este es un mensaje transaccional de verificación. Si no te registraste en Festival NATUR, puedes ignorar este correo.`,
    replyTo: process.env.SENDGRID_FROM_EMAIL!,
    headers: {
      'X-Entity-Type': 'account-verification',
      'Precedence': 'bulk'
    }
  });
}

export async function sendAdminNotification(
  userName: string,
  companyName: string,
  userEmail: string,
  companyCategory: string
): Promise<boolean> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Nueva Empresa Registrada - Festival NATUR</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #333; padding: 20px; text-align: center; color: white; }
        .content { background: #f9f9f9; padding: 30px; }
        .info-box { background: white; border-left: 4px solid #cad95e; padding: 15px; margin: 15px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; font-size: 2em;">NATUR - Nuevo Registro</h1>
        </div>
        
        <div class="content">
          <h2>Nueva empresa registrada</h2>
          <p>Se ha registrado una nueva empresa en la plataforma Festival NATUR:</p>
          
          <div class="info-box">
            <h3>Información de la Empresa</h3>
            <p><strong>Empresa:</strong> ${companyName}</p>
            <p><strong>Contacto:</strong> ${userName}</p>
            <p><strong>Email:</strong> ${userEmail}</p>
            <p><strong>Categoría:</strong> ${companyCategory}</p>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-CO')}</p>
          </div>
          
          <p>El usuario debe verificar su email antes de poder acceder completamente a la plataforma.</p>
          
          <p>Saludos,<br>
          <strong>Sistema Festival NATUR</strong></p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: process.env.SENDGRID_FROM_EMAIL!,
    from: process.env.SENDGRID_FROM_EMAIL!,
    subject: `Nueva empresa registrada: ${companyName}`,
    html: htmlContent,
    text: `Nueva empresa registrada: ${companyName} por ${userName} (${userEmail}) en categoría ${companyCategory}`
  });
}