import { NextResponse } from "next/server";
import { RESEARCH_AREAS } from "@/lib/data/science";

export function GET() {
  return NextResponse.json(RESEARCH_AREAS);
}
