"use client"

import { useState } from "react"
import { exerciseInstructions } from "@/lib/exercise-data"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

export default function ExerciseGuide() {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  const exerciseCategories = {
    all: "ทั้งหมด",
    upper: "ส่วนบน",
    lower: "ส่วนล่าง",
    core: "แกนกลาง",
    cardio: "คาร์ดิโอ",
  }

  const categorizeExercise = (muscles: string) => {
    const lowerMuscles = muscles.toLowerCase()
    if (lowerMuscles.includes("หัวใจ") || lowerMuscles.includes("ปอด")) return "cardio"
    if (lowerMuscles.includes("หน้าท้อง") || lowerMuscles.includes("แกนกลาง") || lowerMuscles.includes("หลัง"))
      return "core"
    if (lowerMuscles.includes("ขา") || lowerMuscles.includes("สะโพก") || lowerMuscles.includes("ก้น")) return "lower"
    return "upper"
  }

  const filteredExercises = Object.values(exerciseInstructions)
    .filter((exercise) => {
      const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = activeTab === "all" || categorizeExercise(exercise.muscles) === activeTab
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => a.name.localeCompare(b.name))

  return (
    <Card className="bg-zinc-900 border-zinc-800 text-white">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-gray-400" />
          <CardTitle>คู่มือการออกกำลังกาย</CardTitle>
        </div>
        <CardDescription className="text-gray-400">เรียนรู้วิธีการออกกำลังกายที่ถูกต้อง</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="ค้นหาท่าออกกำลังกาย..."
              className="pl-8 bg-zinc-800 border-zinc-700 text-white"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 bg-zinc-800">
              {Object.entries(exerciseCategories).map(([key, label]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="data-[state=active]:bg-white data-[state=active]:text-black"
                >
                  {label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-4">
              {filteredExercises.length > 0 ? (
                <div className="space-y-6">
                  {filteredExercises.map((exercise, index) => (
                    <div key={index} className="border-b border-zinc-800 pb-4 last:border-0">
                      <h3 className="text-lg font-bold mb-1">{exercise.name}</h3>
                      <p className="text-sm text-gray-400 mb-3">กล้ามเนื้อที่ใช้: {exercise.muscles}</p>

                      <div className="mb-3">
                        <h4 className="font-medium mb-2">วิธีทำ</h4>
                        <ol className="space-y-1 list-decimal pl-5">
                          {exercise.steps.map((step, stepIndex) => (
                            <li key={stepIndex} className="text-sm text-gray-300">
                              {step}
                            </li>
                          ))}
                        </ol>
                      </div>

                      {exercise.tips && (
                        <div>
                          <h4 className="font-medium mb-2">เทคนิค</h4>
                          <ul className="space-y-1 list-disc pl-5">
                            {exercise.tips.map((tip, tipIndex) => (
                              <li key={tipIndex} className="text-sm text-gray-300">
                                {tip}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-400">ไม่พบท่าออกกำลังกายที่ตรงกับการค้นหา</div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </CardContent>
    </Card>
  )
}
