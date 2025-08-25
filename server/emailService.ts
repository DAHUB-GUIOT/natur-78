import { MailService } from '@sendgrid/mail';

if (!process.env.SENDGRID_API_KEY) {
  throw new Error("SENDGRID_API_KEY environment variable must be set");
}

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY!);

interface EmailParams {
  to: string;
  from: string;
  subject: string;
  text?: string;
  html?: string;
}

export async function sendEmail(params: EmailParams): Promise<boolean> {
  try {
    await mailService.send({
      to: params.to,
      from: params.from,
      subject: params.subject,
      text: params.text || '',
      html: params.html,
    });
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
    <html>
    <head>
      <meta charset="utf-8">
      <title>Verificación de Email - Festival NATUR</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #cad95e, #22c55e); padding: 30px; text-align: center; color: white; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { display: inline-block; background: #cad95e; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .footer { background: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin:0; font-size: 2.5em; font-weight: bold;">NATUR</h1>
          <p style="margin:5px 0 0 0; font-size: 1.2em;">Festival de Turismo Sostenible</p>
        </div>
        
        <div class="content">
          <h2>¡Bienvenido al Festival NATUR!</h2>
          <p>Hola <strong>${userName}</strong>,</p>
          
          <p>Gracias por registrar <strong>${companyName}</strong> en nuestra plataforma de turismo sostenible.</p>
          
          <p>Para completar tu registro y activar tu cuenta empresarial, por favor verifica tu dirección de correo electrónico:</p>
          
          <div style="text-align: center;">
            <a href="${verificationUrl}" class="button">VERIFICAR MI EMAIL</a>
          </div>
          
          <p>Una vez verificado tu email, podrás:</p>
          <ul>
            <li>Acceder al Portal Empresas completo</li>
            <li>Aparecer en el directorio de empresas sostenibles</li>
            <li>Crear y gestionar experiencias turísticas</li>
            <li>Conectar con otros empresarios del sector</li>
            <li>Participar en la red de turismo sostenible</li>
          </ul>
          
          <p>Si el botón no funciona, copia y pega este enlace en tu navegador:</p>
          <p style="word-break: break-all; background: #eee; padding: 10px; border-radius: 3px;">${verificationUrl}</p>
          
          <p><strong>Importante:</strong> Este enlace expira en 24 horas por seguridad.</p>
          
          <p>¡Esperamos verte pronto en el Festival NATUR 2025!</p>
          
          <p>Saludos cordiales,<br>
          <strong>Equipo Festival NATUR</strong></p>
        </div>
        
        <div class="footer">
          <p>Festival NATUR - Turismo Sostenible y Regenerativo</p>
          <p>Este es un email automático, por favor no respondas a este mensaje.</p>
        </div>
      </div>
    </body>
    </html>
  `;

  return await sendEmail({
    to: userEmail,
    from: 'no-reply@festivalnatur.com',
    subject: 'Verifica tu email - Festival NATUR',
    html: htmlContent,
    text: `Hola ${userName}, gracias por registrar ${companyName} en Festival NATUR. Para verificar tu email, visita: ${verificationUrl}`
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
    to: 'festivalnatur@gmail.com',
    from: 'no-reply@festivalnatur.com',
    subject: `Nueva empresa registrada: ${companyName}`,
    html: htmlContent,
    text: `Nueva empresa registrada: ${companyName} por ${userName} (${userEmail}) en categoría ${companyCategory}`
  });
}