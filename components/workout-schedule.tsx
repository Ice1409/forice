"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Calendar, Dumbbell } from "lucide-react"
import type { WorkoutWeek } from "@/lib/types"
import DailyWorkout from "./daily-workout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface WorkoutScheduleProps {
  workoutData: WorkoutWeek[]
}

export default function WorkoutSchedule({ workoutData }: WorkoutScheduleProps) {
  const [activeWeek, setActiveWeek] = useState("1")

  return (
    <div className="bg-zinc-900 rounded-xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-gray-400" />
          <h2 className="text-2xl font-bold">ตารางการออกกำลังกาย</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveWeek((prev) => Math.max(Number.parseInt(prev) - 1, 1).toString())}
            disabled={activeWeek === "1"}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => setActiveWeek((prev) => Math.min(Number.parseInt(prev) + 1, workoutData.length).toString())}
            disabled={activeWeek === workoutData.length.toString()}
            className="p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <Tabs defaultValue="1" value={activeWeek} onValueChange={setActiveWeek} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          {workoutData.map((week, index) => (
            <TabsTrigger
              key={index}
              value={(index + 1).toString()}
              className="data-[state=active]:bg-white data-[state=active]:text-black"
            >
              Week {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {workoutData.map((week, index) => (
          <TabsContent key={index} value={(index + 1).toString()}>
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                <Dumbbell className="h-5 w-5 text-gray-400" />
                <h3 className="text-xl font-semibold">Goal</h3>
              </div>
              <p className="text-gray-300 ml-7">{week.goal}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {week.days.map((day, dayIndex) => (
                <motion.div
                  key={dayIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: dayIndex * 0.05 }}
                >
                  <DailyWorkout day={day} weekNumber={index + 1} />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
