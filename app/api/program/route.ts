import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "@/src/lib/auth";
import {
  getAllAgendaItems,
  getAgendaItem,
  createAgendaItem,
  updateAgendaItem,
  deleteAgendaItem,
  reorderAgendaItems,
  AgendaItemInput,
} from "@/src/data/agenda";

// Helper to check admin authorization
async function isAuthorizedAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("lms_admin_session")?.value;
  return verifyToken(token);
}

// ─── GET /api/program ─────────────────────────────────────────────────────
export async function GET() {
  try {
    const items = await getAllAgendaItems();
    return NextResponse.json({ items });
  } catch (error) {
    console.error("Agenda GET error:", error);
    return NextResponse.json({ error: "Could not load agenda" }, { status: 500 });
  }
}

// ─── POST /api/program ────────────────────────────────────────────────────
// Body: AgendaItemInput
export async function POST(request: Request) {
  try {
    if (!(await isAuthorizedAdmin())) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const body = await request.json();

    const dayLabel = typeof body.day_label === "string" ? body.day_label.trim() : "";
    const dayDate = typeof body.day_date === "string" ? body.day_date.trim() : "";
    const time = typeof body.time === "string" ? body.time.trim() : "";
    const activity = typeof body.activity === "string" ? body.activity.trim() : "";
    const description = typeof body.description === "string" ? body.description.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";

    if (!dayLabel || !time || !activity) {
      return NextResponse.json(
        { error: "day_label, time, and activity are required" },
        { status: 400 }
      );
    }

    const input: AgendaItemInput = {
      day_label: dayLabel,
      day_date: dayDate,
      time,
      activity,
      description,
      location,
      duration: typeof body.duration === "string" ? body.duration.trim() || undefined : undefined,
      speaker: typeof body.speaker === "string" ? body.speaker.trim() || undefined : undefined,
      sort_order: typeof body.sort_order === "number" ? body.sort_order : undefined,
    };

    const item = await createAgendaItem(input);
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    console.error("Agenda POST error:", error);
    return NextResponse.json({ error: "Could not create agenda item" }, { status: 500 });
  }
}

// ─── PUT /api/program ─────────────────────────────────────────────────────
// Body: { id, ...fields } OR { reorder: [id1, id2, ...] }
export async function PUT(request: Request) {
  try {
    if (!(await isAuthorizedAdmin())) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const body = await request.json();

    // Bulk reorder
    if (Array.isArray(body.reorder)) {
      await reorderAgendaItems(body.reorder as number[]);
      return NextResponse.json({ success: true });
    }

    const id = Number(body.id);
    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ error: "Valid id is required" }, { status: 400 });
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id: _id, ...rest } = body;
    const updated = await updateAgendaItem(id, rest as Partial<AgendaItemInput>);
    if (!updated) {
      return NextResponse.json({ error: "Agenda item not found" }, { status: 404 });
    }
    return NextResponse.json({ item: updated });
  } catch (error) {
    console.error("Agenda PUT error:", error);
    return NextResponse.json({ error: "Could not update agenda item" }, { status: 500 });
  }
}

// ─── DELETE /api/program ──────────────────────────────────────────────────
// Body: { id }
export async function DELETE(request: Request) {
  try {
    if (!(await isAuthorizedAdmin())) {
      return NextResponse.json({ error: "Unauthorized admin access" }, { status: 401 });
    }

    const body = await request.json();
    const id = Number(body.id);

    if (!Number.isInteger(id) || id < 1) {
      return NextResponse.json({ error: "Valid id is required" }, { status: 400 });
    }

    const deleted = await deleteAgendaItem(id);
    if (!deleted) {
      return NextResponse.json({ error: "Agenda item not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Agenda DELETE error:", error);
    return NextResponse.json({ error: "Could not delete agenda item" }, { status: 500 });
  }
}


