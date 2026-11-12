import { NextResponse } from "next/server"
import { generateId } from "@/lib/utils"

let reports = []

export async function GET() {
  return NextResponse.json(reports)
}

export async function POST(request) {
  const body = await request.json()

  if (!body.buildingId || !body.barrierType || !body.severity || !body.description) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    )
  }

  const report = {
    id: generateId(),
    buildingId: body.buildingId,
    barrierType: body.barrierType,
    severity: body.severity,
    description: body.description,
    locationDetails: body.locationDetails || "",
    timestamp: new Date().toISOString(),
    status: "pending",
  }

  reports.push(report)

  return NextResponse.json(report, { status: 201 })
}
