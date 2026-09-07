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
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 40px 10px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
          
          <!-- Banner Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #31103f 100%); padding: 35px 30px; text-align: center; border-bottom: 2px solid #3b82f6;">
              <table role="presentation" width="100%">
                <tr>
                  <td align="center">
                    <span style="display: inline-block; background: linear-gradient(90deg, #3b82f6, #8b5cf6); padding: 4px 16px; border-radius: 20px; font-size: 11px; font-weight: 700; letter-spacing: 2px; color: #ffffff; text-transform: uppercase; margin-bottom: 12px;">Official Delegate Pass</span>
                    <h1 style="margin: 8px 0 0 0; font-size: 32px; font-weight: 900; letter-spacing: 3px; color: #ffffff; text-shadow: 0 0 20px rgba(59,130,246,0.5);">
                      LMS <span style="color: #60a5fa;">2K26</span>
                    </h1>
                    <p style="margin: 6px 0 0 0; font-size: 13px; color: #94a3b8; letter-spacing: 1px;">LOCAL MOTIVATION SEMINAR</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Welcome Message -->
          <tr>
            <td style="padding: 35px 35px 20px 35px;">
              <h2 style="margin: 0 0 12px 0; font-size: 22px; font-weight: 700; color: #f8fafc;">
                Welcome, <span style="color: #38bdf8;">${escapeHtml(delegate.full_name)}</span>! 🎉
              </h2>
              <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #cbd5e1;">
                Congratulations! Your registration for <strong>LMS 2K26</strong> has been officially confirmed. We are thrilled to welcome you as a distinguished delegate.
              </p>
            </td>
          </tr>

          <!-- VIP PASS BADGE CARD -->
          <tr>
            <td style="padding: 10px 35px 25px 35px;">
              <div style="background: linear-gradient(145deg, #1e293b, #0f172a); border: 1px solid rgba(56, 189, 248, 0.3); border-radius: 16px; padding: 25px; box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);">
                
                <!-- Badge Top Header -->
                <table role="presentation" width="100%" style="margin-bottom: 15px; border-bottom: 1px dashed rgba(255,255,255,0.15); padding-bottom: 12px;">
                  <tr>
                    <td style="font-size: 11px; font-weight: 700; color: #38bdf8; text-transform: uppercase; letter-spacing: 1.5px;">DELEGATE PASS CODE</td>
                    <td align="right" style="font-family: monospace; font-size: 14px; font-weight: 700; color: #fbbf24; background: rgba(251, 191, 36, 0.1); padding: 4px 10px; border-radius: 6px; border: 1px solid rgba(251, 191, 36, 0.2);">
                      ${passCode}
                    </td>
                  </tr>
                </table>

                <!-- Delegate Info Table -->
                <table role="presentation" width="100%" style="font-size: 14px; line-height: 1.8;">
                  <tr>
                    <td style="color: #94a3b8; width: 35%;">Full Name:</td>
                    <td style="color: #f8fafc; font-weight: 600;">${escapeHtml(delegate.full_name)}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8;">Email Address:</td>
                    <td style="color: #f8fafc;">${escapeHtml(delegate.email)}</td>
                  </tr>
                  ${delegate.organization ? `
                  <tr>
                    <td style="color: #94a3b8;">Organization:</td>
                    <td style="color: #f8fafc;">${escapeHtml(delegate.organization)}</td>
                  </tr>` : ""}
                  ${delegate.position ? `
                  <tr>
                    <td style="color: #94a3b8;">Position:</td>
                    <td style="color: #f8fafc;">${escapeHtml(delegate.position)}</td>
                  </tr>` : ""}
                  ${delegate.tshirt_size ? `
                  <tr>
                    <td style="color: #94a3b8;">T-Shirt Size:</td>
                    <td style="color: #a78bfa; font-weight: 700;">${escapeHtml(delegate.tshirt_size)}</td>
                  </tr>` : ""}
                  <tr>
                    <td style="color: #94a3b8;">Registration Date:</td>
                    <td style="color: #cbd5e1;">${registeredDate}</td>
                  </tr>
                </table>

              </div>
            </td>
          </tr>

          <!-- EVENT DETAILS GRID -->
          <tr>
            <td style="padding: 0 35px 25px 35px;">
              <h3 style="margin: 0 0 14px 0; font-size: 16px; font-weight: 700; color: #f8fafc; text-transform: uppercase; letter-spacing: 1px;">
                Event Details
              </h3>
              
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td width="50%" style="padding-right: 8px;">
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
                      <div style="font-size: 11px; color: #38bdf8; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">📅 Dates</div>
                      <div style="font-size: 13px; color: #f8fafc; font-weight: 600;">March 15 – 17, 2026</div>
                      <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">3 Unforgettable Days</div>
                    </div>
                  </td>
                  <td width="50%" style="padding-left: 8px;">
                    <div style="background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 14px;">
                      <div style="font-size: 11px; color: #a78bfa; font-weight: 700; text-transform: uppercase; margin-bottom: 4px;">📍 Venue</div>
                      <div style="font-size: 13px; color: #f8fafc; font-weight: 600;">Hasdrubal Hall</div>
                      <div style="font-size: 11px; color: #94a3b8; margin-top: 2px;">Golden Tulip Resort</div>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CALL TO ACTION BUTTON -->
          <tr>
            <td align="center" style="padding: 10px 35px 35px 35px;">
              <a href="https://lms-2026.vercel.app" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #2563eb, #7c3aed); color: #ffffff; text-decoration: none; font-weight: 700; font-size: 15px; padding: 14px 36px; border-radius: 12px; box-shadow: 0 10px 25px rgba(37,99,235,0.4); text-transform: uppercase; letter-spacing: 1px;">
                Explore Event Website →
              </a>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #0b0f19; padding: 25px 35px; border-top: 1px solid rgba(255,255,255,0.08); text-align: center;">
              <p style="margin: 0 0 6px 0; font-size: 12px; color: #64748b;">
                Local Motivation Seminar 2026 • Building Tomorrows Leaders
              </p>
              <p style="margin: 0; font-size: 11px; color: #475569;">
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
      text: `Hello ${delegate.full_name},\n\nYour registration for LMS 2K26 (Local Motivation Seminar) has been confirmed!\n\nPass Code: LMS-2026-${String(delegate.id).padStart(4, "0")}\nDates: March 15 - 17, 2026\nVenue: Hasdrubal Hall & Golden Tulip Resort\n\nThank you for registering!`,
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
<body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #e2e8f0;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #111827; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.6);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #1e1b4b 0%, #31103f 100%); padding: 30px; text-align: center; border-bottom: 2px solid #f59e0b;">
              <span style="background: rgba(245, 158, 11, 0.2); border: 1px solid rgba(245, 158, 11, 0.4); color: #fbbf24; padding: 4px 14px; border-radius: 12px; font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 1.5px;">ADMIN NOTIFICATION</span>
              <h1 style="margin: 12px 0 4px 0; font-size: 24px; font-weight: 800; color: #ffffff;">
                🚨 New Delegate Registered!
              </h1>
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">LMS 2K26 Control Center</p>
            </td>
          </tr>

          <!-- Details Table -->
          <tr>
            <td style="padding: 30px;">
              <div style="background: #1e293b; border-radius: 14px; padding: 20px; border: 1px solid rgba(255,255,255,0.08);">
                <h3 style="margin: 0 0 16px 0; font-size: 16px; color: #38bdf8; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 8px;">
                  Registrant Details (${passCode})
                </h3>
                <table role="presentation" width="100%" style="font-size: 14px; line-height: 1.8;">
                  <tr>
                    <td style="color: #94a3b8; width: 35%;">Full Name:</td>
                    <td style="color: #f8fafc; font-weight: 700;">${escapeHtml(delegate.full_name)}</td>
                  </tr>
                  <tr>
                    <td style="color: #94a3b8;">Email:</td>
                    <td style="color: #60a5fa;"><a href="mailto:${escapeHtml(delegate.email)}" style="color: #60a5fa; text-decoration: none;">${escapeHtml(delegate.email)}</a></td>
                  </tr>
                  ${delegate.phone ? `
                  <tr>
                    <td style="color: #94a3b8;">Phone:</td>
                    <td style="color: #f8fafc;">${escapeHtml(delegate.phone)}</td>
                  </tr>` : ""}
                  ${delegate.organization ? `
                  <tr>
                    <td style="color: #94a3b8;">Organization:</td>
                    <td style="color: #f8fafc;">${escapeHtml(delegate.organization)}</td>
                  </tr>` : ""}
                  ${delegate.position ? `
                  <tr>
                    <td style="color: #94a3b8;">Position:</td>
                    <td style="color: #f8fafc;">${escapeHtml(delegate.position)}</td>
                  </tr>` : ""}
                  ${delegate.tshirt_size ? `
                  <tr>
                    <td style="color: #94a3b8;">T-Shirt Size:</td>
                    <td style="color: #a78bfa; font-weight: 700;">${escapeHtml(delegate.tshirt_size)}</td>
                  </tr>` : ""}
                  ${delegate.dietary_restrictions ? `
                  <tr>
                    <td style="color: #94a3b8;">Dietary Notes:</td>
                    <td style="color: #f87171;">${escapeHtml(delegate.dietary_restrictions)}</td>
                  </tr>` : ""}
                  ${delegate.emergency_contact_name ? `
                  <tr>
                    <td style="color: #94a3b8;">Emergency Contact:</td>
                    <td style="color: #cbd5e1;">${escapeHtml(delegate.emergency_contact_name)} (${escapeHtml(delegate.emergency_contact_phone || "N/A")})</td>
                  </tr>` : ""}
                  <tr>
                    <td style="color: #94a3b8;">Timestamp:</td>
                    <td style="color: #94a3b8;">${registeredDate}</td>
                  </tr>
                </table>
              </div>

              <div style="text-align: center; margin-top: 25px;">
                <a href="https://lms-2026.vercel.app/admin" target="_blank" style="display: inline-block; background: linear-gradient(135deg, #f59e0b, #d97706); color: #000000; font-weight: 800; text-decoration: none; padding: 12px 28px; border-radius: 10px; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">
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
      text: `New Registration Alert!\n\nName: ${delegate.full_name}\nEmail: ${delegate.email}\nOrganization: ${delegate.organization || "N/A"}\nT-Shirt: ${delegate.tshirt_size || "N/A"}\n\nView at https://lms-2026.vercel.app/admin`,
    });

    console.log(`[Mailer] Admin notification email successfully sent to ${adminEmail}. Message ID: ${info.messageId}`);
    return { success: true, messageId: info.messageId };
  } catch (error: any) {
    console.error(`[Mailer] Failed to send admin notification email:`, error);
    return { success: false, error: error?.message || "Failed to send email" };
  }
}

