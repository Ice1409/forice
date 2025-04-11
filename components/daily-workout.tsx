"use client"

import type React from "react"

import { useState } from "react"
import type { WorkoutDay } from "@/lib/types"
import { CheckCircle, Circle, Info } from "lucide-react"
import { motion } from "framer-motion"
import { getExerciseInstruction } from "@/lib/exercise-data"
import ExerciseModal from "./exercise-modal"

interface DailyWorkoutProps {
  day: WorkoutDay
}

export default function DailyWorkout({ day }: DailyWorkoutProps) {
  const [completedExercises, setCompletedExercises] = useState<number[]>([])
  const [selectedExercise, setSelectedExercise] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleExercise = (index: number) => {
    setCompletedExercises((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
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
    <div className="bg-zinc-800 rounded-lg p-4 h-full">
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
