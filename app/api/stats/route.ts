import { NextResponse } from "next/server";
import { SITE_STATS } from "@/lib/data/science";

export function GET() {
  return NextResponse.json(SITE_STATS);
}
