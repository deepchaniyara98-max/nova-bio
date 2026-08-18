import { NextResponse } from "next/server";
import type { ContactPayload } from "@/types/science";

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload;

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields." }, { status: 400 });
  }

  return NextResponse.json({
    ok: true,
    id: `nb-${Date.now()}`,
  });
}
