import { NextResponse } from "next/server"
import { buildings } from "@/lib/campusData"

export async function GET() {
  return NextResponse.json(buildings)
}
