import { NextResponse } from "next/server"
import { generateId } from "@/lib/utils"

let inMemoryReports = [
  {
    id: "rep-seed-1",
    buildingId: "block-34",
    buildingName: "Block 34 (School of CSE)",
    barrierType: "lift",
    barrierLabel: "Elevator Out of Service",
    severity: "high",
    severityLabel: "High Priority — Impedes Movement",
    description: "North mechanical lab elevator is shut down for scheduled hydraulic maintenance. Wheelchair users should use the external ramp connecting to Block 32.",
    locationDetails: "Ground floor north lobby next to CSE Lab 302",
    photo: "/lpu_photos/lpu-campus-5.jpg",
    author: "Priya Singh (Wheelchair User)",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
    likes: 24,
    status: "investigating",
  },
  {
    id: "rep-seed-2",
    buildingId: "block-37",
    buildingName: "Block 37 (Central Library)",
    barrierType: "ramp",
    barrierLabel: "Ramp Resurfacing Verified",
    severity: "low",
    severityLabel: "Low / Resolution Note",
    description: "Campus estate team completed resurfacing the west entrance ramp with smooth brushed concrete and dual handrails. Zero step bump remaining.",
    locationDetails: "Main West Entrance facing Central Courtyard",
    photo: "/lpu_photos/lpu-campus-3.jpg",
    author: "Arjun Mehta (Accessibility Club)",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    likes: 42,
    status: "resolved",
  },
  {
    id: "rep-seed-3",
    buildingId: "block-13",
    buildingName: "Block 13 (Engineering Central Workshops)",
    barrierType: "kerb",
    barrierLabel: "Steep 4-Inch Kerb & Gravel",
    severity: "high",
    severityLabel: "High Priority — Blocks Wheelchairs",
    description: "Delivery bay has loose crushed gravel and an unramped 4-inch threshold lip. Students in manual wheelchairs cannot enter lathe lab safely.",
    locationDetails: "East machinery delivery bay gate",
    photo: "/lpu_photos/lpu-campus-13.jpg",
    author: "Rahul Verma (Student Rep)",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    likes: 19,
    status: "active",
  },
]

export async function GET() {
  return NextResponse.json(inMemoryReports)
}

export async function POST(request) {
  try {
    const body = await request.json()

    if (!body.buildingId || !body.barrierType || !body.severity || !body.description) {
      return NextResponse.json(
        { error: "Missing required fields (buildingId, barrierType, severity, description)" },
        { status: 400 }
      )
    }

    const report = {
      id: body.id || `rep-${generateId()}`,
      buildingId: body.buildingId,
      buildingName: body.buildingName || body.buildingId,
      barrierType: body.barrierType,
      barrierLabel: body.barrierLabel || body.barrierType,
      severity: body.severity,
      severityLabel: body.severityLabel || body.severity,
      description: body.description,
      locationDetails: body.locationDetails || "",
      photo: body.photo || null,
      author: body.author || "You (Student Contributor)",
      timestamp: body.timestamp || new Date().toISOString(),
      likes: 0,
      status: "active",
    }

    inMemoryReports.unshift(report)

    return NextResponse.json(report, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: "Invalid JSON payload" }, { status: 400 })
  }
}
