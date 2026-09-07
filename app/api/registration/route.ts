import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";
import type { RegistrationFormData } from "@/src/data/delegates";
import { deleteDelegate, getAllDelegates, registerDelegate, getDelegateByEmail } from "@/src/data/delegates";
import { sendInvitationEmail, sendAdminNotificationEmail } from "@/src/lib/mailer";


export async function GET() {
  try {
    const delegates = await getAllDelegates();
    return NextResponse.json({ delegates });
  } catch (error) {
    console.error("Could not load registrations:", error);
    return NextResponse.json({ error: "Could not load registrations" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
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

    const deleted = await deleteDelegate(id);
    if (!deleted) {
      return NextResponse.json({ error: "Registration not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Could not delete registration:", error);
    return NextResponse.json({ error: "Could not delete registration" }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const body = await request.json();

    const fullName = typeof body.full_name === "string" ? body.full_name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!fullName || !email || !emailPattern.test(email)) {
      return NextResponse.json(
        { error: "A valid full name and email are required" },
        { status: 400 }
      );
    }

    if (fullName.length > 120 || email.length > 180) {
      return NextResponse.json(
        { error: "Full name or email is too long" },
        { status: 400 }
      );
    }

    

    // Check if delegate already exists with this email
    const existingDelegate = await getDelegateByEmail(email);
    if (existingDelegate) {
      return NextResponse.json(
        { error: "A delegate with this email is already registered" },
        { status: 409 }
      );
    }
    
    // Register the delegate
    const delegate = await registerDelegate({
      full_name: fullName,
      email,
      organization: typeof body.organization === "string" ? body.organization.trim() : undefined,
      position: typeof body.position === "string" ? body.position.trim() : undefined,
      phone: typeof body.phone === "string" ? body.phone.trim() : undefined,
      dietary_restrictions: typeof body.dietary_restrictions === "string" ? body.dietary_restrictions.trim() : undefined,
      emergency_contact_name: typeof body.emergency_contact_name === "string" ? body.emergency_contact_name.trim() : undefined,
      emergency_contact_phone: typeof body.emergency_contact_phone === "string" ? body.emergency_contact_phone.trim() : undefined,
    } satisfies RegistrationFormData);

    
    // Trigger automated HTML invitation pass email (to delegate)
    const mailResult = await sendInvitationEmail(delegate);

    // Trigger admin notification email alert (to admin)
    void sendAdminNotificationEmail(delegate).catch((err) => {
      console.error("[Mailer] Admin notification email dispatch error:", err);
    });


    return NextResponse.json(
      { 
        success: true, 
        delegate: {
          id: delegate.id,
          full_name: delegate.full_name,
          email: delegate.email,
          created_at: delegate.created_at,
        },
        email_sent: mailResult.success,
        email_simulated: mailResult.simulated || false,
      },
      { status: 201 }
    );

    
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Failed to register delegate. Please try again." },
      { status: 500 }
    );
  }
}