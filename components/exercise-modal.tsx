"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Dumbbell, X } from "lucide-react"
import type { ExerciseInstruction } from "@/lib/exercise-data"

interface ExerciseModalProps {
  isOpen: boolean
  onClose: () => void
  exercise: ExerciseInstruction | null
}

export default function ExerciseModal({ isOpen, onClose, exercise }: ExerciseModalProps) {
  const [open, setOpen] = useState(isOpen)

  useEffect(() => {
    setOpen(isOpen)
  }, [isOpen])

  const handleClose = () => {
    setOpen(false)
    onClose()
  }

  if (!exercise) return null

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="bg-zinc-900 border-zinc-800 text-white max-w-md md:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Dumbbell className="h-5 w-5 text-gray-400" />
              <DialogTitle className="text-xl font-bold">{exercise.name}</DialogTitle>
            </div>
            <button onClick={handleClose} className="rounded-full p-1 hover:bg-zinc-800">
              <X className="h-5 w-5" />
            </button>
          </div>
          <DialogDescription className="text-gray-400">กล้ามเนื้อที่ใช้: {exercise.muscles}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2 text-lg">วิธีทำ</h3>
            <ol className="space-y-2 list-decimal pl-5">
              {exercise.steps.map((step, index) => (
                <li key={index} className="text-gray-300">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {exercise.tips && (
            <div>
              <h3 className="font-medium mb-2 text-lg">เทคนิค</h3>
              <ul className="space-y-2 list-disc pl-5">
                {exercise.tips.map((tip, index) => (
                  <li key={index} className="text-gray-300">
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
