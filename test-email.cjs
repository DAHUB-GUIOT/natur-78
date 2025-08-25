const { MailService } = require('@sendgrid/mail');

const mailService = new MailService();
mailService.setApiKey(process.env.SENDGRID_API_KEY);

async function testEmail() {
  try {
    console.log('Testing SendGrid configuration...');
    console.log('SendGrid API Key exists:', !!process.env.SENDGRID_API_KEY);
    
    if (!process.env.SENDGRID_API_KEY) {
      throw new Error('SENDGRID_API_KEY not found');
    }
    
    const result = await mailService.send({
      to: 'nicolasdominguez2603@gmail.com',
      from: 'no-reply@festivalnatur.com',
      subject: 'Test Email - Festival NATUR',
      text: 'This is a test email to verify SendGrid configuration.',
      html: '<p>This is a test email to verify SendGrid configuration.</p>'
    });
    
    console.log('Email sent successfully! Status:', result[0].statusCode);
  } catch (error) {
    console.error('SendGrid Error:', error.response?.body || error.message);
  }
}

testEmail();