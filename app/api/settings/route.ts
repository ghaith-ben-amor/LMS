import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { getSiteSettings, updateSiteSettings } from "@/data/settings";

// Helper to check admin authorization
async function isAuthorizedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lms_admin_session")?.value;
  return verifyToken(token);
}

// GET /api/settings - Public access to check section visibility settings
export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
  } catch (error) {
    console.error("Settings GET error:", error);
    return NextResponse.json(
      { show_speakers: false, show_partners: false },
      { status: 200 }
    );
  }
}

// POST /api/settings - Admin only to update section visibility settings
export async function POST(request: Request) {
  try {
    if (!(await isAuthorizedAdmin())) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const body = await request.json();
    const updated = await updateSiteSettings({
      show_speakers: typeof body.show_speakers === "boolean" ? body.show_speakers : undefined,
      show_partners: typeof body.show_partners === "boolean" ? body.show_partners : undefined,
    });

    // Broadcast real-time update via WebSocket to all connected clients
    if (typeof (global as any).wssBroadcast === "function") {
      (global as any).wssBroadcast({
        type: "SETTINGS_UPDATED",
        settings: updated,
      });
    }

    return NextResponse.json({ success: true, settings: updated });
  } catch (error) {
    console.error("Settings POST error:", error);
    return NextResponse.json({ error: "Could not update settings" }, { status: 500 });
  }
}
