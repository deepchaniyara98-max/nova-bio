import { NextResponse } from "next/server";
import { VISUALIZATION_EDGES, VISUALIZATION_NODES } from "@/lib/data/science";

export function GET() {
  return NextResponse.json({
    nodes: VISUALIZATION_NODES,
    edges: VISUALIZATION_EDGES,
  });
}
