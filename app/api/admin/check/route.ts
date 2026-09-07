import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("lms_admin_session")?.value;
    const authenticated = verifyToken(token);

    return NextResponse.json({ authenticated });
  } catch (error) {
    console.error("Admin check error:", error);
    return NextResponse.json({ authenticated: false });
  }
}
