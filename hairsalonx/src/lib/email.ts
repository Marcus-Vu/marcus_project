import { Resend } from 'resend';

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Email templates
const emailTemplates = {
  signupConfirmation: (data: { email: string; confirmationUrl: string; salonName?: string }) => ({
    subject: `Bevestig je aanmelding bij ${data.salonName || 'HairsalonX'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Bevestig je aanmelding</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f9f9f9; padding: 30px; border-radius: 8px;">
            <h1 style="color: #2563eb; margin-top: 0;">Welkom bij ${data.salonName || 'HairsalonX'}!</h1>
            <p>Bedankt voor je aanmelding. Klik op de onderstaande knop om je emailadres te bevestigen:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.confirmationUrl}" 
                 style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Email bevestigen
              </a>
            </div>
            <p style="font-size: 14px; color: #666;">Of kopieer deze link naar je browser:</p>
            <p style="font-size: 12px; word-break: break-all; background: #eee; padding: 10px; border-radius: 4px;">${data.confirmationUrl}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">Deze link verloopt over 24 uur. Als je je niet hebt aangemeld, kun je deze email negeren.</p>
          </div>
        </body>
      </html>
    `,
  }),
  
  passwordReset: (data: { email: string; resetUrl: string; salonName?: string }) => ({
    subject: `Wachtwoord reset aanvraag bij ${data.salonName || 'HairsalonX'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Wachtwoord reset</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f9f9f9; padding: 30px; border-radius: 8px;">
            <h1 style="color: #2563eb; margin-top: 0;">Wachtwoord reset</h1>
            <p>Je hebt een wachtwoord reset aangevraagd voor je account bij ${data.salonName || 'HairsalonX'}. Klik op de onderstaande knop om een nieuw wachtwoord in te stellen:</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${data.resetUrl}" 
                 style="background: #2563eb; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: bold;">
                Wachtwoord resetten
              </a>
            </div>
            <p style="font-size: 14px; color: #666;">Of kopieer deze link naar je browser:</p>
            <p style="font-size: 12px; word-break: break-all; background: #eee; padding: 10px; border-radius: 4px;">${data.resetUrl}</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">Deze link verloopt over 1 uur. Als je geen reset hebt aangevraagd, kun je deze email negeren.</p>
          </div>
        </body>
      </html>
    `,
  }),
  
  bookingConfirmation: (data: { 
    customerName: string; 
    serviceName: string; 
    bookingDate: string; 
    bookingTime: string;
    salonName?: string;
    salonAddress?: string;
    salonPhone?: string;
  }) => ({
    subject: `Afspraak bevestigd bij ${data.salonName || 'HairsalonX'}`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Afspraak bevestigd</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #f9f9f9; padding: 30px; border-radius: 8px;">
            <h1 style="color: #2563eb; margin-top: 0;">Je afspraak is bevestigd!</h1>
            <p>Beste ${data.customerName},</p>
            <p>Je afspraak bij ${data.salonName || 'HairsalonX'} is succesvol geboekt:</p>
            <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0; border-left: 4px solid #2563eb;">
              <p style="margin: 5px 0;"><strong>Behandeling:</strong> ${data.serviceName}</p>
              <p style="margin: 5px 0;"><strong>Datum:</strong> ${data.bookingDate}</p>
              <p style="margin: 5px 0;"><strong>Tijd:</strong> ${data.bookingTime}</p>
              ${data.salonAddress ? `<p style="margin: 5px 0;"><strong>Locatie:</strong> ${data.salonAddress}</p>` : ''}
              ${data.salonPhone ? `<p style="margin: 5px 0;"><strong>Telefoon:</strong> ${data.salonPhone}</p>` : ''}
            </div>
            <p>We zien je graag verschijnen!</p>
            <hr style="border: none; border-top: 1px solid #ddd; margin: 30px 0;">
            <p style="font-size: 12px; color: #999;">Wil je je afspraak wijzigen of annuleren? Neem dan contact met ons op.</p>
          </div>
        </body>
      </html>
    `,
  }),
};

export async function sendEmail({
  to,
  template,
  data,
  from = process.env.EMAIL_FROM || 'noreply@hairsalonx.nl',
}: {
  to: string;
  template: keyof typeof emailTemplates;
  data: any;
  from?: string;
}) {
  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_mock_key') {
    console.error('RESEND_API_KEY not configured');
    return {
      success: false,
      error: 'Email service not configured',
      mock: true,
    };
  }

  try {
    const templateFn = emailTemplates[template];
    if (!templateFn) {
      throw new Error(`Unknown email template: ${template}`);
    }

    const { subject, html } = templateFn(data);

    const { data: responseData, error } = await resend.emails.send({
      from,
      to,
      subject,
      html,
    });

    if (error) {
      console.error('Resend email error:', error);
      return {
        success: false,
        error: error.message,
      };
    }

    console.log('Email sent successfully:', responseData?.id);
    return {
      success: true,
      messageId: responseData?.id,
    };
  } catch (error) {
    console.error('Email send error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

// Health check function
export async function checkEmailService() {
  const apiKey = process.env.RESEND_API_KEY;
  
  if (!apiKey || apiKey === 're_mock_key') {
    return {
      configured: false,
      status: 'not_configured',
      message: 'RESEND_API_KEY not set or is mock value',
    };
  }

  // Basic validation - Resend keys start with 're_'
  if (!apiKey.startsWith('re_')) {
    return {
      configured: false,
      status: 'invalid_key',
      message: 'RESEND_API_KEY format is invalid',
    };
  }

  return {
    configured: true,
    status: 'ready',
    message: 'Email service is configured',
  };
}
