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
    console.log('📧 Intentando enviar email a:', params.to);
    console.log('📧 Desde:', params.from);
    console.log('📧 Asunto:', params.subject);
    
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
    
    console.log('📧 Enviando con SendGrid...');
    const response = await mailService.send(mailData);
    console.log('📧 SendGrid response:', response[0]?.statusCode);
    console.log('📧 Email enviado exitosamente');
    return true;
  } catch (error: any) {
    console.error('❌ SendGrid email error completo:', error);
    if (error.response) {
      console.error('❌ Response body:', error.response.body);
      console.error('❌ Response status:', error.response.status);
    }
    return false;
  }
}

export async function sendVerificationEmail(
  userEmail: string,
  userName: string,
  companyName: string,
  verificationToken: string
): Promise<boolean> {
  try {
    console.log('📧 Construyendo email de verificación...');
    
    const domain = process.env.REPLIT_DOMAINS?.split(',')[0] || 'localhost:5000';
    const verificationUrl = `${process.env.FRONTEND_URL || 'https://' + domain}/verificar-email?token=${verificationToken}`;
    
    console.log('📧 URL de verificación:', verificationUrl);
    console.log('📧 Domain usado:', domain);
    
    // HTML más simple para evitar problemas
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h1 style="color: #cad95e;">Festival NATUR 2025</h1>
        <h2>Hola ${userName},</h2>
        <p>Gracias por registrar <strong>${companyName}</strong> en Festival NATUR 2025.</p>
        <p><strong>Paso final:</strong> Verifica tu dirección de correo electrónico para activar tu cuenta empresarial.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${verificationUrl}" style="background: #cad95e; color: #000; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold;">
            Verificar mi cuenta
          </a>
        </div>
        <p>Si el botón no funciona, copia este enlace: <br>
        <code>${verificationUrl}</code></p>
        <p>Cordialmente,<br><strong>Equipo Festival NATUR</strong></p>
      </div>
    `;

    const textContent = `
Hola ${userName},

Gracias por registrar ${companyName} en Festival NATUR 2025.

Para completar tu registro, verifica tu email visitando:
${verificationUrl}

Cordialmente,
Equipo Festival NATUR
    `;

    console.log('📧 Enviando email a:', userEmail);
    
    const result = await sendEmail({
      to: userEmail,
      from: process.env.SENDGRID_FROM_EMAIL!,
      subject: `Verificación de cuenta - Festival NATUR 2025`,
      html: htmlContent,
      text: textContent
    });
    
    console.log('📧 Resultado del envío:', result);
    return result;
  } catch (error) {
    console.error('❌ Error en sendVerificationEmail:', error);
    return false;
  }
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