import crypto from "crypto";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "ghaithbenaomr@gmail.com";
const ADMIN_PASS = process.env.ADMIN_PASSWORD || "lms_2K26";
const SECRET_KEY = process.env.ADMIN_SECRET_KEY || "lms_2k26_admin_secret_key_98765";

export function validateCredentials(email: string, pass: string): boolean {
  if (!email || !pass) return false;
  return email.trim().toLowerCase() === ADMIN_EMAIL.toLowerCase() && pass === ADMIN_PASS;
}

export function generateToken(email: string): string {
  const cleanEmail = email.trim().toLowerCase();
  const hash = crypto.createHmac("sha256", SECRET_KEY).update(`${cleanEmail}:${ADMIN_PASS}`).digest("hex");
  return `${Buffer.from(cleanEmail).toString("base64")}.${hash}`;
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  try {
    const [b64Email, hash] = token.split(".");
    if (!b64Email || !hash) return false;

    const email = Buffer.from(b64Email, "base64").toString("utf-8");
    if (email.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) return false;

    const expectedHash = crypto.createHmac("sha256", SECRET_KEY).update(`${email}:${ADMIN_PASS}`).digest("hex");
    
    if (hash.length !== expectedHash.length) return false;
    return crypto.timingSafeEqual(Buffer.from(hash), Buffer.from(expectedHash));
  } catch (e) {
    return false;
  }
}
