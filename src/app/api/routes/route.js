import { NextResponse } from "next/server"
import { findAllPaths } from "@/lib/pathfinding"

export async function POST(request) {
  const body = await request.json()

  if (!body.from || !body.to) {
    return NextResponse.json(
      { error: "Missing 'from' and 'to' fields" },
      { status: 400 }
    )
  }

  const results = findAllPaths(body.from, body.to)

  return NextResponse.json(results)
}
