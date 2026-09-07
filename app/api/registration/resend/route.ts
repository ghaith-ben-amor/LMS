import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";
import { getAllDelegates } from "@/src/data/delegates";
import { sendInvitationEmail } from "@/src/lib/mailer";

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("lms_admin_session")?.value;
    if (!verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const body = await request.json();

    const id = Number(body.id);

    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ error: "A valid registration id is required" }, { status: 400 });
    }

    const delegates = await getAllDelegates();

    const delegate = delegates.find((d) => d.id === id);

    if (!delegate) {
      return NextResponse.json({ error: "Delegate not found" }, { status: 404 });
    }

    const mailResult = await sendInvitationEmail(delegate);

    return NextResponse.json({
      success: mailResult.success,
      simulated: mailResult.simulated || false,
      error: mailResult.error,
      delegate: {
        id: delegate.id,
        full_name: delegate.full_name,
        email: delegate.email,
      },
    });
  } catch (error) {
    console.error("Error resending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
