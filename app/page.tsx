"use client"
import { useState } from "react"
import Link from "next/link"
import {
  Dumbbell,
  CheckSquare,
  User,
  Settings,
  Music,
  Code,
  Lock,
  AlertCircle,
  Coffee,
  GraduationCap,
  GamepadIcon as GameController,
} from "lucide-react"

export default function Home() {
  const [numberCode, setNumberCode] = useState("")
  const [letterCode, setLetterCode] = useState("")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showWelcome, setShowWelcome] = useState(false)
  const [opacity, setOpacity] = useState(1)
  const [errorMessage, setErrorMessage] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorOpacity, setErrorOpacity] = useState(1)
  const [activeUser, setActiveUser] = useState("")

  const correctCodes = {
    ice: { number: "1712", letter: "IO" },
    oei: { number: "2202", letter: "OI" },
  }

  const handleNumberChange = (e) => {
    const value = e.target.value
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setNumberCode(value)
    }
  }

  const handleLetterChange = (e) => {
    const value = e.target.value
    if (value.length <= 2 && /^[a-zA-Z]*$/.test(value)) {
      setLetterCode(value.toUpperCase())
    }
  }

  const showErrorAnimation = (message) => {
    setErrorMessage(message)
    setShowError(true)
    setErrorOpacity(1)

    // Start fading out after 1 second
    setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setErrorOpacity((prevOpacity) => {
          const newOpacity = prevOpacity - 0.05
          if (newOpacity <= 0) {
            clearInterval(fadeInterval)
            setShowError(false)
            return 0
          }
          return newOpacity
        })
      }, 50)
    }, 1500)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check for Ice
    if (numberCode === correctCodes.ice.number && letterCode === correctCodes.ice.letter) {
      setActiveUser("ice")
      setIsAuthenticated(true)
      setShowWelcome(true)
      startWelcomeAnimation()
      return
    }

    // Check for Oei
    if (numberCode === correctCodes.oei.number && letterCode === correctCodes.oei.letter) {
      setActiveUser("oei")
      setIsAuthenticated(true)
      setShowWelcome(true)
      startWelcomeAnimation()
      return
    }

    // If neither code matches
    showErrorAnimation("รหัสไม่ถูกต้อง")
    setNumberCode("")
    setLetterCode("")
  }

  const startWelcomeAnimation = () => {
    // Start fading out after 1 second
    setTimeout(() => {
      const fadeInterval = setInterval(() => {
        setOpacity((prevOpacity) => {
          const newOpacity = prevOpacity - 0.05
          if (newOpacity <= 0) {
            clearInterval(fadeInterval)
            return 0
          }
          return newOpacity
        })
      }, 50)
    }, 1000)
  }

  // Login screen
  if (!isAuthenticated) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900">
        {showError && (
          <div
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
            style={{ opacity: errorOpacity }}
          >
            <div className="bg-red-900 bg-opacity-80 p-8 rounded-xl flex items-center space-x-4">
              <AlertCircle className="h-8 w-8 text-red-300" />
              <p className="text-3xl font-bold text-white">{errorMessage}</p>
            </div>
          </div>
        )}

        <div className="w-full max-w-md mx-auto flex flex-col items-center justify-center gap-6">
          <div className="text-center mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 font-mono tracking-tight mb-4">LOGIN</h1>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">รหัสลับระหว่างเรา</p>
          </div>

          <div className="bg-zinc-800 rounded-xl shadow-lg p-8 w-full border border-zinc-700">
            <div className="flex items-center justify-center mb-6">
              <Lock className="h-8 w-8 text-zinc-400" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <label className="block text-zinc-400 text-sm font-medium">PASSCODE</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={numberCode}
                    onChange={handleNumberChange}
                    placeholder="1234"
                    className="bg-zinc-900 text-white p-3 rounded flex-1 border border-zinc-700 focus:outline-none focus:border-blue-500 text-center font-mono"
                    maxLength={4}
                    autoFocus
                  />
                  <span className="text-zinc-400 text-xl">-</span>
                  <input
                    type="text"
                    value={letterCode}
                    onChange={handleLetterChange}
                    placeholder="AB"
                    className="bg-zinc-900 text-white p-3 rounded w-20 border border-zinc-700 focus:outline-none focus:border-blue-500 text-center font-mono"
                    maxLength={2}
                  />
                </div>
                <p className="text-xs text-zinc-500 mt-1">รูปแบบ: 1234 - AB</p>
              </div>

              <button
                type="submit"
                className="w-full bg-zinc-700 hover:bg-zinc-600 text-white py-3 px-4 rounded font-medium transition-colors"
              >
                เข้าสู่ระบบ
              </button>
            </form>
          </div>

          <div className="text-center text-zinc-500 text-xs mt-4">FOR ICE ONLY</div>
        </div>
      </main>
    )
  }

  // Welcome animation screen
  if (showWelcome && opacity > 0) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900">
        <div className="transition-opacity duration-1000 ease-out" style={{ opacity: opacity }}>
          <h1 className="text-7xl md:text-9xl font-bold text-white font-mono tracking-tight">
            {activeUser === "ice" ? "ICE" : "OEI"}
          </h1>
          <p className="text-xl text-zinc-400 text-center mt-4 font-mono">สวัสดีคร้าบบบ</p>
        </div>
      </main>
    )
  }

  // Ice dashboard
  if (activeUser === "ice") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-6">
          <div className="text-center mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 font-mono tracking-tight mb-4">ICE WEBSITE</h1>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">FOR ICE ONLY</p>
          </div>

          <div className="bg-zinc-800 rounded-xl shadow-lg p-6 w-full border border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <User className="h-6 w-6 text-white mr-2" />
                <span className="text-white font-medium">ICE</span>
              </div>
              <Settings className="h-5 w-5 text-zinc-400" />
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full mb-4"></div>

            <div className="flex justify-between items-center">
              <div className="text-zinc-400 text-sm">MEMBER SINCE 2025</div>
              <div className="px-2 py-1 bg-zinc-700 rounded text-xs text-white">ADMIN</div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Link href="/ice2" className="block">
              <div className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-4 text-left border-l-4 border-blue-500">
                <div className="flex items-center">
                  <Dumbbell className="h-5 w-5 text-blue-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">ตารางการออกกำลังกาย</div>
                    <div className="text-xs text-zinc-400">ตั้งแต่วันที่ 7/4/2025 - 30/4/2025</div>
                  </div>
                </div>
                <div className="bg-zinc-700 rounded-full p-1">
                  <Code className="h-4 w-4 text-blue-400" />
                </div>
              </div>
            </Link>

            <Link href="/ice1" className="block">
              <div className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-4 text-left border-l-4 border-green-500">
                <div className="flex items-center">
                  <CheckSquare className="h-5 w-5 text-green-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">เช็คลิสสิ่งที่ต้องเอาเข้าหอพัก</div>
                    <div className="text-xs text-zinc-400">หอโครงการวมว.มช.</div>
                  </div>
                </div>
                <div className="bg-zinc-700 rounded-full p-1">
                  <Code className="h-4 w-4 text-green-400" />
                </div>
              </div>
            </Link>
          </div>

          <div className="text-center text-zinc-500 text-xs mt-4">FOR ICE • 2025</div>
        </div>
      </main>
    )
  }

  // Oei dashboard
  if (activeUser === "oei") {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900">
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-6">
          <div className="text-center mb-2">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 font-mono tracking-tight mb-4">FOR OEI</h1>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">FOR OEI ONLY</p>
          </div>

          <div className="bg-zinc-800 rounded-xl shadow-lg p-6 w-full border border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <User className="h-6 w-6 text-white mr-2" />
                <span className="text-white font-medium">OEI</span>
              </div>
              <Settings className="h-5 w-5 text-zinc-400" />
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full mb-4"></div>

            <div className="flex justify-between items-center">
              <div className="text-zinc-400 text-sm">CONNECTED SINCE 2025</div>
              <div className="px-2 py-1 bg-zinc-700 rounded text-xs text-white">FAN ICE</div>
            </div>
          </div>

          <div className="w-full space-y-3">
            {/* <Link href="/study-planner" className="block">
              <div className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-4 text-left border-l-4 border-yellow-500">
                <div className="flex items-center">
                  <GraduationCap className="h-5 w-5 text-yellow-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">ตารางเรียน</div>
                    <div className="text-xs text-zinc-400">ภาคเรียนที่ 1/2568</div>
                  </div>
                </div>
                <div className="bg-zinc-700 rounded-full p-1">
                  <Code className="h-4 w-4 text-yellow-400" />
                </div>
              </div>
            </Link> */}
          </div>

          <div className="text-center text-zinc-500 text-xs mt-4">FOR OEI • 2025</div>
        </div>
      </main>
    )
  }

  // Fallback (shouldn't be reached)
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-zinc-900">
      <div className="text-white">Loading...</div>
    </main>
  )
}
