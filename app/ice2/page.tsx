import WorkoutSchedule from "@/components/workout-schedule"
import ExerciseGuide from "@/components/exercise-guide"
import { getWorkoutData } from "@/lib/workout-data"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar, BookOpen } from "lucide-react"

export default function Home() {
  const workoutData = getWorkoutData()

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12 text-center">
          <h1 className="mb-10"></h1>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mb-2">ICE WORKOUT</h1>
          <p className="text-gray-400 text-lg"></p>
        </header>

        <Tabs defaultValue="schedule" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="schedule" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <Calendar className="h-4 w-4 mr-2" />
              ตารางการออกกำลังกาย
            </TabsTrigger>
            <TabsTrigger value="guide" className="data-[state=active]:bg-white data-[state=active]:text-black">
              <BookOpen className="h-4 w-4 mr-2" />
              คู่มือท่าออกกำลังกาย
            </TabsTrigger>
          </TabsList>

          <TabsContent value="schedule">
            <WorkoutSchedule workoutData={workoutData} />
          </TabsContent>

          <TabsContent value="guide">
            <ExerciseGuide />
          </TabsContent>
        </Tabs>
          <div className="text-center text-zinc-500 text-xs mt-4">FOR ICE • {new Date().getFullYear()}</div>
      </div>
    </main>
  )
}
