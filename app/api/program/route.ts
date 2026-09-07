import { NextResponse } from "next";
import {
  getDynamicProgramSchedule,
  saveProgramEvent,
  deleteProgramEvent,
  resetProgramScheduleToDefault,
} from "@/src/data/program";

export async function GET() {
  try {
    const schedule = getDynamicProgramSchedule();
    return NextResponse.json({ schedule });
  } catch (error) {
    console.error("Could not load program agenda:", error);
    return NextResponse.json({ error: "Could not load program agenda" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const activity = typeof body.activity === "string" ? body.activity.trim() : "";
    const time = typeof body.time === "string" ? body.time.trim() : "";
    const location = typeof body.location === "string" ? body.location.trim() : "";
    const dayNumber = Number(body.day_number) || 1;

    if (!activity || !time || !location) {
      return NextResponse.json(
        { error: "Time, activity title, and location are required." },
        { status: 400 }
      );
    }

    const savedItem = saveProgramEvent({
      id: typeof body.id === "string" ? body.id : undefined,
      day_number: dayNumber,
      time,
      activity,
      description: typeof body.description === "string" ? body.description.trim() : "",
      location,
      duration: typeof body.duration === "string" ? body.duration.trim() : undefined,
      speaker: typeof body.speaker === "string" ? body.speaker.trim() : undefined,
    });

    const updatedSchedule = getDynamicProgramSchedule();
    return NextResponse.json({ success: true, item: savedItem, schedule: updatedSchedule }, { status: 200 });
  } catch (error) {
    console.error("Save agenda error:", error);
    return NextResponse.json({ error: "Failed to save agenda session." }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const body = await request.json();
    const id = typeof body.id === "string" ? body.id : "";

    if (!id) {
      return NextResponse.json({ error: "Session ID is required." }, { status: 400 });
    }

    deleteProgramEvent(id);
    const updatedSchedule = getDynamicProgramSchedule();
    return NextResponse.json({ success: true, schedule: updatedSchedule });
  } catch (error) {
    console.error("Delete agenda error:", error);
    return NextResponse.json({ error: "Failed to delete agenda session." }, { status: 500 });
  }
}

export async function PUT() {
  try {
    const defaultSchedule = resetProgramScheduleToDefault();
    return NextResponse.json({ success: true, schedule: defaultSchedule });
  } catch (error) {
    console.error("Reset agenda error:", error);
    return NextResponse.json({ error: "Failed to reset agenda." }, { status: 500 });
  }
}
