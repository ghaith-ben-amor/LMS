import nodemailer from "nodemailer";
import type { Delegate } from "@/src/data/delegates";

export interface MailResult {
  success: boolean;
  messageId?: string;
  error?: string;
  simulated?: boolean;
}

/**
 * Creates nodemailer transporter based on environment variables
 */
function getTransporter() {
  let host = process.env.SMTP_HOST;
  let port = Number(process.env.SMTP_PORT) || 587;
  let user = process.env.SMTP_USER;
  let pass = process.env.SMTP_PASS;

  const dsn = process.env.MAILER_DSN;
  if (dsn) {
    try {
      const parsed = new URL(dsn);
      host = parsed.hostname || host;
      port = parsed.port ? Number(parsed.port) : port;
      user = parsed.username ? decodeURIComponent(parsed.username) : user;
      pass = parsed.password ? decodeURIComponent(parsed.password) : pass;
    } catch (e) {
      console.error("[Mailer] Failed to parse MAILER_DSN:", e);
    }
  }

  if (!host || !user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for other ports
    auth: {
      user,
      pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
}


/**
 * Generates rich HTML Invitation Pass Email Template for LMS 2K26
 */
export function generateInvitationHtml(delegate: Delegate): string {
  const passCode = `LMS-2026-${String(delegate.id).padStart(4, "0")}`;
  const registeredDate = new Date(delegate.created_at || Date.now()).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>LMS 2K26 Official Invitation Pass</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F9F6F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050507; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0D0B10; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(122, 28, 40, 0.25);">
          
          <!-- Banner Header (LMS 2K26 Delegate Portal) -->
          <tr>
            <td style="background: linear-gradient(135deg, #1f070b 0%, #4a0e17 50%, #0d0b10 100%); padding: 40px 30px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.4);">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <div style="font-size: 36px; line-height: 1; margin-bottom: 10px; filter: drop-shadow(0 0 10px rgba(212,175,55,0.4));">🏆</div>
                    <span style="display: inline-block; background: linear-gradient(135deg, rgba(212,175,55,0.2) 0%, rgba(122,28,40,0.4) 100%); border: 1px solid rgba(212, 175, 55, 0.5); padding: 5px 18px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 2.5px; color: #F7E4BE; text-transform: uppercase; margin-bottom: 14px;">Official Delegate Pass</span>
                    <h1 style="margin: 8px 0 0 0; font-family: Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: 900; letter-spacing: 4px; color: #F7E4BE; text-shadow: 0 2px 15px rgba(212, 175, 55, 0.4);">
                      LMS <span style="color: #D4AF37;">2K26</span>
                    </h1>
                    <p style="margin: 8px 0 0 0; font-size: 12px; color: #C5C0B6; letter-spacing: 2px; text-transform: uppercase;">LOCAL MOTIVATION SEMINAR • DELEGATE SUMMIT 2K26</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 35px 35px 20px 35px;">
              <h2 style="margin: 0 0 12px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 700; color: #F9F6F0;">
                Greetings, <span style="color: #F7E4BE; border-bottom: 1px dashed #D4AF37;">${escapeHtml(delegate.full_name)}</span> 🎉
              </h2>
              <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #C5C0B6;">
                Congratulations! Your registration for <strong style="color: #F7E4BE;">LMS 2K26</strong> has been officially confirmed. We are honored to welcome you as a distinguished delegate.
              </p>
            </td>
          </tr>

          <!-- VIP PASS BADGE CARD -->
          <tr>
            <td style="padding: 10px 35px 25px 35px;">
              <div style="background: linear-gradient(145deg, #15121A 0%, #0D0B10 100%); border: 1px solid rgba(212, 175, 55, 0.4); border-radius: 20px; padding: 25px; box-shadow: 0 10px 30px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05);">
                
                <!-- Badge Top Header -->
                <table role="presentation" width="100%" style="margin-bottom: 16px; border-bottom: 1px dashed rgba(212, 175, 55, 0.3); padding-bottom: 14px;">
                  <tr>
                    <td style="font-size: 11px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 2px;">DELEGATE PASS CODE</td>
                    <td align="right" style="font-family: monospace; font-size: 14px; font-weight: 800; color: #050507; background: linear-gradient(135deg, #F7E4BE 0%, #D4AF37 100%); padding: 5px 14px; border-radius: 8px; box-shadow: 0 2px 10px rgba(212,175,55,0.3);">
                      ${passCode}
                    </td>
                  </tr>
                </table>

                <!-- Delegate Info Table -->
                <table role="presentation" width="100%" style="font-size: 14px; line-height: 1.9;">
                  <tr>
                    <td style="color: #8E887D; width: 35%;">Full Name:</td>
                    <td style="color: #F9F6F0; font-weight: 700;">${escapeHtml(delegate.full_name)}</td>
                  </tr>
                  <tr>
                    <td style="color: #8E887D;">Email Address:</td>
                    <td style="color: #F9F6F0;">${escapeHtml(delegate.email)}</td>
                  </tr>
                  ${delegate.organization ? `
                  <tr>
                    <td style="color: #8E887D;">Organization:</td>
                    <td style="color: #F7E4BE; font-weight: 600;">${escapeHtml(delegate.organization)}</td>
                  </tr>` : ""}
                  ${delegate.cin ? `
                  <tr>
                    <td style="color: #8E887D;">CIN Number:</td>
                    <td style="color: #F7E4BE; font-weight: 700; font-family: monospace;">${escapeHtml(delegate.cin)}</td>
                  </tr>` : ""}
                  ${delegate.gender ? `
                  <tr>
                    <td style="color: #8E887D;">Gender:</td>
                    <td style="color: #F9F6F0;">${escapeHtml(delegate.gender)}</td>
                  </tr>` : ""}
                  ${delegate.position ? `
                  <tr>
                    <td style="color: #8E887D;">Role / Position:</td>
                    <td style="color: #F7E4BE; font-weight: 600;">${escapeHtml(delegate.position)}</td>
                  </tr>` : ""}
                  <tr>
                    <td style="color: #8E887D;">Registered Date:</td>
                    <td style="color: #C5C0B6;">${registeredDate}</td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- EVENT DETAILS GRID -->
          <tr>
            <td style="padding: 0 35px 25px 35px;">
              <h3 style="margin: 0 0 14px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 15px; font-weight: 700; color: #D4AF37; text-transform: uppercase; letter-spacing: 1.5px;">
                Event Details
              </h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding-right: 8px;">
                    <div style="background: rgba(21, 18, 26, 0.8); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 14px; padding: 16px;">
                      <div style="font-size: 11px; color: #D4AF37; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">📅 Dates</div>
                      <div style="font-size: 13px; color: #F9F6F0; font-weight: 700;">October 2 – 4, 2026</div>
                      <div style="font-size: 11px; color: #8E887D; margin-top: 2px;">3 Unforgettable Days</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px;">
                    <div style="background: rgba(21, 18, 26, 0.8); border: 1px solid rgba(212, 175, 55, 0.2); border-radius: 14px; padding: 16px;">
                      <div style="font-size: 11px; color: #D4AF37; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">📍 Venue</div>
                      <div style="font-size: 13px; color: #F9F6F0; font-weight: 700;">Hasdrubal Hall</div>
                      <div style="font-size: 11px; color: #8E887D; margin-top: 2px;">Golden Tulip Resort</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CALL TO ACTION BUTTON -->
          <tr>
            <td align="center" style="padding: 10px 35px 35px 35px;">
              <a href="https://lms-xi-liard.vercel.app" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #A88726 100%); color: #050507; text-decoration: none; font-weight: 800; font-size: 14px; padding: 16px 40px; border-radius: 14px; box-shadow: 0 10px 30px rgba(212,175,55,0.35); text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid #F7E4BE;">
                Explore Event Website →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #050507; padding: 25px 35px; border-top: 1px solid rgba(212, 175, 55, 0.2); text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #C5C0B6;">
                Local Motivation Seminar 2026 • Building Tomorrow's Leaders
              </p>
              <p style="margin: 0; font-size: 11px; color: #8E887D;">
                If you have any questions, please reach out to the organizing team.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Escapes unsafe HTML characters to prevent XSS in email previewers
 */
function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Main helper to send invitation pass email to a registered delegate
 */
export async function sendInvitationEmail(delegate: Delegate): Promise<MailResult> {
  try {
    const transporter = getTransporter();

    if (!transporter) {
      console.warn(`[Mailer] SMTP credentials not set. Simulated invitation email for ${delegate.email}`);
      return {
        success: false,
        simulated: true,
        error: "SMTP credentials not configured in environment variables (SMTP_HOST, SMTP_USER, SMTP_PASS)",
      };
    }

    const senderEmail = process.env.MAIL_FROM || process.env.SMTP_USER || "ghaithbenaomr@gmail.com";
    const fromAddress = process.env.SMTP_FROM || `LMS 2K26 Organizing Team <${senderEmail}>`;

    const htmlContent = generateInvitationHtml(delegate);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: delegate.email,
      subject: `🎉 Confirmation & Official Invitation Pass - LMS 2K26 (#LMS-2026-${String(delegate.id).padStart(4, "0")})`,
      html: htmlContent,
      text: `Hello ${delegate.full_name},\n\nYour registration for LMS 2K26 (Local Motivation Seminar) has been confirmed!\n\nPass Code: LMS-2026-${String(delegate.id).padStart(4, "0")}\nDates: October 2 - 4, 2026\nVenue: Hasdrubal Hall & Golden Tulip Resort\n\nThank you for registering!`,
    });

    console.log(`[Mailer] Invitation email successfully sent to ${delegate.email}. Message ID: ${info.messageId}`);
    return {
      success: true,
      messageId: info.messageId,
    };
  } catch (error: any) {
    console.error(`[Mailer] Error sending invitation email to ${delegate.email}:`, error);
    return {
      success: false,
      error: error?.message || "Failed to send email",
    };
  }
}

/**
 * Generates HTML notification email template for the Admin when a new delegate registers
 */
export function generateAdminNotificationHtml(delegate: Delegate): string {
  const passCode = `LMS-2026-${String(delegate.id).padStart(4, "0")}`;
  const registeredDate = new Date(delegate.created_at || Date.now()).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>New Delegate Registration Alert</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #F9F6F0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #050507; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #0D0B10; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 24px; overflow: hidden; box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 40px rgba(122, 28, 40, 0.25);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1f070b 0%, #4a0e17 50%, #0d0b10 100%); padding: 30px; text-align: center; border-bottom: 1px solid rgba(212, 175, 55, 0.4);">
              <span style="background: rgba(212, 175, 55, 0.15); border: 1px solid rgba(212, 175, 55, 0.4); color: #F7E4BE; padding: 5px 16px; border-radius: 14px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">ADMIN NOTIFICATION</span>
              <h1 style="margin: 14px 0 4px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 26px; font-weight: 800; color: #F7E4BE; text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);">
                🚨 New Delegate Registered!
              </h1>
              <p style="margin: 4px 0 0 0; font-size: 12px; color: #C5C0B6; letter-spacing: 1px;">LMS 2K26 CONTROL CENTER</p>
            </td>
          </tr>

          <!-- Details Table -->
          <tr>
            <td style="padding: 30px;">
              <div style="background: linear-gradient(145deg, #15121A 0%, #0D0B10 100%); border-radius: 18px; padding: 22px; border: 1px solid rgba(212, 175, 55, 0.3); box-shadow: inset 0 1px 1px rgba(255,255,255,0.05);">
                <h3 style="margin: 0 0 16px 0; font-family: Georgia, 'Times New Roman', serif; font-size: 16px; color: #D4AF37; border-bottom: 1px dashed rgba(212, 175, 55, 0.3); padding-bottom: 10px;">
                  Registrant Details (${passCode})
                </h3>
                <table role="presentation" width="100%" style="font-size: 14px; line-height: 1.9;">
                  <tr>
                    <td style="color: #8E887D; width: 35%;">Full Name:</td>
                    <td style="color: #F9F6F0; font-weight: 700;">${escapeHtml(delegate.full_name)}</td>
                  </tr>
                  <tr>
                    <td style="color: #8E887D;">Email:</td>
                    <td style="color: #F7E4BE;"><a href="mailto:${escapeHtml(delegate.email)}" style="color: #F7E4BE; text-decoration: underline;">${escapeHtml(delegate.email)}</a></td>
                  </tr>
                  ${delegate.phone ? `
                  <tr>
                    <td style="color: #8E887D;">Phone:</td>
                    <td style="color: #F9F6F0;">${escapeHtml(delegate.phone)}</td>
                  </tr>` : ""}
                  ${delegate.cin ? `
                  <tr>
                    <td style="color: #8E887D;">CIN Number:</td>
                    <td style="color: #F7E4BE; font-weight: 700; font-family: monospace;">${escapeHtml(delegate.cin)}</td>
                  </tr>` : ""}
                  ${delegate.gender ? `
                  <tr>
                    <td style="color: #8E887D;">Gender:</td>
                    <td style="color: #F9F6F0;">${escapeHtml(delegate.gender)}</td>
                  </tr>` : ""}
                  ${delegate.organization ? `
                  <tr>
                    <td style="color: #8E887D;">Organization / Dept:</td>
                    <td style="color: #F7E4BE; font-weight: 600;">${escapeHtml(delegate.organization)}</td>
                  </tr>` : ""}
                  ${delegate.position ? `
                  <tr>
                    <td style="color: #8E887D;">Role / Position:</td>
                    <td style="color: #F7E4BE; font-weight: 600;">${escapeHtml(delegate.position)}</td>
                  </tr>` : ""}
                  ${delegate.dietary_restrictions ? `
                  <tr>
                    <td style="color: #8E887D;">Dietary Notes:</td>
                    <td style="color: #A32B3A; font-weight: 600;">${escapeHtml(delegate.dietary_restrictions)}</td>
                  </tr>` : ""}
                  ${delegate.emergency_contact_name ? `
                  <tr>
                    <td style="color: #8E887D;">Emergency Contact:</td>
                    <td style="color: #C5C0B6;">${escapeHtml(delegate.emergency_contact_name)} (${escapeHtml(delegate.emergency_contact_phone || "N/A")})</td>
                  </tr>` : ""}
                  <tr>
                    <td style="color: #8E887D;">Timestamp:</td>
                    <td style="color: #8E887D;">${registeredDate}</td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; margin-top: 28px;">
                <a href="https://lms-xi-liard.vercel.app/admin" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #D4AF37 0%, #A88726 100%); color: #050507; font-weight: 800; text-decoration: none; padding: 14px 34px; border-radius: 12px; font-size: 13px; text-transform: uppercase; letter-spacing: 1.5px; border: 1px solid #F7E4BE; box-shadow: 0 8px 25px rgba(212,175,55,0.3);">
                  Open Admin Dashboard →
                </a>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

/**
 * Sends an email notification to the Admin when a new delegate registers
 */
export async function sendAdminNotificationEmail(delegate: Delegate): Promise<MailResult> {
  try {
    const transporter = getTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || "ghaithbenaomr@gmail.com";

    if (!transporter) {
      console.warn(`[Mailer] SMTP not set. Simulated admin notification for ${delegate.full_name}`);
      return { success: false, simulated: true, error: "SMTP not configured" };
    }

    const fromAddress = process.env.SMTP_FROM || `LMS 2K26 System <ghaithbenaomr@gmail.com>`;
    const htmlContent = generateAdminNotificationHtml(delegate);

    const info = await transporter.sendMail({
      from: fromAddress,
      to: adminEmail,
      subject: `🚨 New Registration Alert: ${delegate.full_name} (#LMS-2026-${String(delegate.id).padStart(4, "0")})`,
      html: htmlContent,
      text: `New Registration Alert!\n\nName: ${delegate.full_name}\nEmail: ${delegate.email}\nOrganization: ${delegate.organization || "N/A"}\n\nView at https://lms-2026.vercel.app/admin`,
    });

    console.log(`[Mailer] Admin notification email successfully sent to ${adminEmail}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Mailer] Failed to send admin notification email:`, error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}

