export interface WorkoutExercise {
  name: string
  sets?: number
  reps?: number | string
  duration?: string
}

export interface WorkoutDay {
  name: string
  exercises: string[]
}

export interface WorkoutWeek {
  number: number
  dateRange: string
  goal: string
  days: WorkoutDay[]
}
