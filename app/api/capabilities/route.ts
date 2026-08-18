import { NextResponse } from "next/server";
import { CAPABILITIES } from "@/lib/data/science";

export function GET() {
  return NextResponse.json(CAPABILITIES);
}
