import { NextResponse } from "next/server"

// Simple in-memory storage for development/testing
const workoutStore = new Map()

export async function POST(req: Request) {
  try {
    // Parse request body
    let body
    try {
      body = await req.json()
    } catch (error) {
      console.error("Error parsing request body:", error)
      return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 })
    }

    const { weekNumber, dayName, completedExercises } = body

    if (!weekNumber || !dayName || !Array.isArray(completedExercises)) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Store in memory (this will reset on server restart)
    const key = `week${weekNumber}-${dayName}`
    workoutStore.set(key, {
      id: key,
      weekNumber,
      dayName,
      completedExercises,
      updatedAt: new Date().toISOString(),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error saving workout data:", error)
    return NextResponse.json({ success: false, error: "Failed to save workout data" }, { status: 500 })
  }
}

export async function GET(req: Request) {
  try {
    // Parse query parameters
    const url = new URL(req.url)
    const weekNumber = url.searchParams.get("weekNumber")
    const weekNum = weekNumber ? Number.parseInt(weekNumber) : null

    // Get workouts from memory
    const workouts = []

    workoutStore.forEach((workout) => {
      if (!weekNum || workout.weekNumber === weekNum) {
        workouts.push(workout)
      }
    })

    return NextResponse.json({ success: true, workouts })
  } catch (error) {
    console.error("Error in GET /api/workouts:", error)
    return NextResponse.json({ success: true, workouts: [] })
  }
}
