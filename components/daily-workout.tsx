"use client"

import type React from "react"
import { useState, useEffect } from "react"
import type { WorkoutDay } from "@/lib/types"
import { CheckCircle, Circle, Info, Save, CloudOff } from "lucide-react"
import { motion } from "framer-motion"
import { getExerciseInstruction } from "@/lib/exercise-data"
import ExerciseModal from "./exercise-modal"
import { useToast } from "@/hooks/use-toast"

interface DailyWorkoutProps {
  day: WorkoutDay
  weekNumber: number
}

export default function DailyWorkout({ day, weekNumber }: DailyWorkoutProps) {
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isOfflineMode, setIsOfflineMode] = useState(false)
  const { toast } = useToast()

  // Local storage key
  const localStorageKey = `workout-progress-week${weekNumber}-${day.name}`

  // Load from local storage
  const loadFromLocalStorage = () => {
    if (typeof window === "undefined") return false

    try {
      const saved = localStorage.getItem(localStorageKey)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setCompletedExercises(parsed)
          return true
        }
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error)
    }
    return false
  }

  // Save to local storage
  const saveToLocalStorage = (exercises: number[]) => {
    if (typeof window === "undefined") return

    try {
      localStorage.setItem(localStorageKey, JSON.stringify(exercises))
    } catch (error) {
      console.error("Error saving to localStorage:", error)
    }
  }

  // Save to server
  const saveToServer = async (exercises: number[]) => {
    try {
      setIsSaving(true)

      const response = await fetch("/api/workouts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          weekNumber,
          dayName: day.name,
          completedExercises: exercises,
        }),
      })

      if (!response.ok) {
        throw new Error("Server error")
      }

      return true
    } catch (error) {
      console.error("Error saving to server:", error)
      if (!isOfflineMode) {
        setIsOfflineMode(true)
        toast({
          title: "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์",
          description: "กำลังใช้โหมดออฟไลน์",
          variant: "destructive",
        })
      }
      return false
    } finally {
      setIsSaving(false)
    }
  }

  // Load saved data on component mount
  useEffect(() => {
    const loadSavedProgress = async () => {
      // First try to load from local storage
      const loadedFromLocal = loadFromLocalStorage()

      // Then try to load from server
      try {
        const response = await fetch(`/api/workouts?weekNumber=${weekNumber}`)

        if (!response.ok) {
          throw new Error("Server error")
        }

        const data = await response.json()

        if (data.success && Array.isArray(data.workouts)) {
          const dayWorkout = data.workouts.find((w: any) => w.id === `week${weekNumber}-${day.name}`)

          if (dayWorkout && Array.isArray(dayWorkout.completedExercises)) {
            // Only update if server data is newer or local storage was empty
            if (!loadedFromLocal || (dayWorkout.updatedAt && new Date(dayWorkout.updatedAt) > new Date())) {
              setCompletedExercises(dayWorkout.completedExercises)
              saveToLocalStorage(dayWorkout.completedExercises)
            }
          }
        }
      } catch (error) {
        console.error("Error loading from server:", error)
        setIsOfflineMode(true)
      }
    }

    loadSavedProgress()
  }, [weekNumber, day.name])

  const toggleExercise = async (index: number) => {
    const newCompletedExercises = completedExercises.includes(index)
      ? completedExercises.filter((i) => i !== index)
      : [...completedExercises, index]

    // Update UI immediately for better UX
    setCompletedExercises(newCompletedExercises)

    // Always save to local storage
    saveToLocalStorage(newCompletedExercises)

    // Try to save to server if not in offline mode
    if (!isOfflineMode) {
      await saveToServer(newCompletedExercises)
    }
  }

  const openExerciseInfo = (exercise: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedExercise(exercise)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedExercise(null)
  }

  const progress = day.exercises.length > 0 ? Math.round((completedExercises.length / day.exercises.length) * 100) : 0

  const exerciseInstruction = selectedExercise ? getExerciseInstruction(selectedExercise) : null

  return (
    <div className="bg-zinc-800 rounded-lg p-4 h-full relative">
      {isSaving && (
        <div className="absolute top-2 right-2">
          <Save className="h-4 w-4 text-gray-400 animate-pulse" />
        </div>
      )}

      {isOfflineMode && (
        <div className="absolute top-2 right-2 flex items-center gap-1 text-xs text-amber-400">
          <CloudOff className="h-3 w-3" />
          <span>Offline Mode</span>
        </div>
      )}

      <h3 className="text-lg font-bold mb-2">{day.name}</h3>

      {day.exercises.length > 0 ? (
        <>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400 mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-zinc-700 rounded-full h-2">
              <motion.div
                className="bg-white h-2 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <ul className="space-y-2">
            {day.exercises.map((exercise, index) => (
              <li key={index} className="flex items-start gap-2 hover:bg-zinc-700 p-2 rounded transition-colors">
                <div className="cursor-pointer" onClick={() => toggleExercise(index)}>
                  {completedExercises.includes(index) ? (
                    <CheckCircle className="h-5 w-5 text-white shrink-0 mt-0.5" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-400 shrink-0 mt-0.5" />
                  )}
                </div>
                <span
                  className={`text-sm flex-1 ${completedExercises.includes(index) ? "line-through text-gray-400" : "text-gray-200"}`}
                  onClick={() => toggleExercise(index)}
                >
                  {exercise}
                </span>
                {getExerciseInstruction(exercise) && (
                  <button
                    onClick={(e) => openExerciseInfo(exercise, e)}
                    className="p-1 rounded-full hover:bg-zinc-600 transition-colors"
                    title="View exercise instructions"
                  >
                    <Info className="h-4 w-4 text-gray-400" />
                  </button>
                )}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-gray-400 text-sm">{day.exercises[0] || "Rest day"}</p>
      )}

      <ExerciseModal isOpen={isModalOpen} onClose={closeModal} exercise={exerciseInstruction} />
    </div>
  )
}
