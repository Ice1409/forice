"use client"
import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { Heart, Dumbbell, CheckSquare, User, LogOut, Code, Lock, AlertCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function Home() {
  // For the 4-digit code
  const [digitCodes, setDigitCodes] = useState(["", "", "", ""])
  const digitRefs = [useRef(null), useRef(null), useRef(null), useRef(null)]

  // For the 2-letter code
  const [letterCodes, setLetterCodes] = useState(["", ""])
  const letterRefs = [useRef(null), useRef(null)]

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

  // Check if user is already authenticated
  useEffect(() => {
    const savedAuth = localStorage.getItem("authState")
    if (savedAuth) {
      const { isAuth, user } = JSON.parse(savedAuth)
      if (isAuth) {
        setIsAuthenticated(true)
        setActiveUser(user)
      }
    }
  }, [])

  // Handle digit input changes
  const handleDigitChange = (index, value) => {
    if (value.length > 1 || !/^\d*$/.test(value)) return

    const newDigits = [...digitCodes]
    newDigits[index] = value
    setDigitCodes(newDigits)

    // Auto-focus to next input
    if (value !== "" && index < 3) {
      digitRefs[index + 1].current.focus()
    } else if (value !== "" && index === 3) {
      // Move to letter inputs when all digits are filled
      letterRefs[0].current.focus()
    }
    
    // Check if this completes all inputs and try to submit
    if (value !== "" && index === 3) {
      const allDigitsFilled = newDigits.every(d => d !== "")
      if (allDigitsFilled) {
        checkForAutoSubmit(newDigits, letterCodes)
      }
    }
  }

  // Handle letter input changes
  const handleLetterChange = (index, value) => {
    if (value.length > 1 || !/^[a-zA-Z]*$/.test(value)) return

    const newLetters = [...letterCodes]
    newLetters[index] = value.toUpperCase()
    setLetterCodes(newLetters)

    // Auto-focus to next input
    if (value !== "" && index < 1) {
      letterRefs[index + 1].current.focus()
    }
    
    // Check if this was the last input and try to submit
    if (index === 1 && value !== "") {
      const allLettersFilled = [...newLetters.slice(0, index), value].every(l => l !== "")
      if (allLettersFilled) {
        checkForAutoSubmit(digitCodes, [...newLetters.slice(0, index), value.toUpperCase()])
      }
    }
  }

  // Check if all inputs are filled and try to submit automatically
  const checkForAutoSubmit = (digits, letters) => {
    const allDigitsFilled = digits.every(d => d !== "")
    const allLettersFilled = letters.every(l => l !== "")
    
    if (allDigitsFilled && allLettersFilled) {
      validateAndSubmit(digits, letters)
    }
  }
  
  // Validate the codes and submit
  const validateAndSubmit = (digits, letters) => {
    const numberCode = digits.join("")
    const letterCode = letters.join("")

    // Check for Ice
    if (numberCode === correctCodes.ice.number && letterCode === correctCodes.ice.letter) {
      setActiveUser("ice")
      setIsAuthenticated(true)
      setShowWelcome(true)
      // Save authentication state
      localStorage.setItem("authState", JSON.stringify({ isAuth: true, user: "ice" }))
      startWelcomeAnimation()
      return
    }

    // Check for Oei
    if (numberCode === correctCodes.oei.number && letterCode === correctCodes.oei.letter) {
      setActiveUser("oei")
      setIsAuthenticated(true)
      setShowWelcome(true)
      // Save authentication state
      localStorage.setItem("authState", JSON.stringify({ isAuth: true, user: "oei" }))
      startWelcomeAnimation()
      return
    }

    // If neither code matches
    showErrorAnimation("รหัสไม่ถูกต้อง")
    setDigitCodes(["", "", "", ""])
    setLetterCodes(["", ""])
    digitRefs[0].current.focus()
  }

  // Handle backspace key
  const handleKeyDown = (e, type, index) => {
    if (e.key === "Backspace" && e.target.value === "") {
      e.preventDefault()
      if (type === "digit" && index > 0) {
        digitRefs[index - 1].current.focus()
      } else if (type === "letter" && index === 0) {
        digitRefs[3].current.focus()
      } else if (type === "letter" && index > 0) {
        letterRefs[index - 1].current.focus()
      }
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

  const handleLogout = () => {
    localStorage.removeItem("authState")
    setIsAuthenticated(false)
    setActiveUser("")
    setDigitCodes(["", "", "", ""])
    setLetterCodes(["", ""])
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
            <p className="text-zinc-400 uppercase tracking-widest text-sm">รหัสลับ</p>
          </div>

          <div className="bg-zinc-800 rounded-xl shadow-lg p-8 w-full border border-zinc-700">
            <div className="flex items-center justify-center mb-6">
              <Lock className="h-8 w-8 text-zinc-400" />
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <label className="block text-zinc-400 text-sm font-medium mb-4">PASSCODE</label>
                <div className="flex justify-center space-x-2">
                  {/* All inputs in a single row */}
                  {digitCodes.map((digit, index) => (
                    <input
                      key={`digit-${index}`}
                      ref={digitRefs[index]}
                      type="text"
                      value={digit}
                      onChange={(e) => handleDigitChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "digit", index)}
                      className="bg-zinc-900 text-white p-3 rounded w-12 h-12 border border-zinc-700 focus:outline-none focus:border-blue-500 text-center font-mono text-xl"
                      maxLength={1}
                      autoFocus={index === 0}
                    />
                  ))}
                  
                  {/* Separator line */}
                  <div className="flex items-center">
                    <div className="w-4 h-0.5 bg-zinc-700 mx-1"></div>
                  </div>
                  
                  {/* Letter inputs */}
                  {letterCodes.map((letter, index) => (
                    <input
                      key={`letter-${index}`}
                      ref={letterRefs[index]}
                      type="text"
                      value={letter}
                      onChange={(e) => handleLetterChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, "letter", index)}
                      className="bg-zinc-900 text-white p-3 rounded w-12 h-12 border border-zinc-700 focus:outline-none focus:border-blue-500 text-center font-mono text-xl uppercase mb-4"
                      maxLength={1}
                    />
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-3 text-center">รูปแบบ เช่น: 1234 - AB (เดากันไม่ถูกหรอก)</p>
              </div>
            </div>
          </div>

          <div className="text-center text-zinc-500 text-xs mt-4">@ {new Date().getFullYear()} • From ICE</div>
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-1 font-mono tracking-tight mb-4">
              ICE WEBSITE
            </h1>
            <p className="text-zinc-400 uppercase tracking-widest text-sm">FOR ICE ONLY</p>
          </div>

          <div className="bg-zinc-800 rounded-xl shadow-lg p-6 w-full border border-zinc-700">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <User className="h-6 w-6 text-white mr-2" />
                <span className="text-white font-medium">ICE</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full mb-4"></div>

            <div className="flex justify-between items-center">
              <div className="text-zinc-400 text-sm">MEMBER SINCE 2025</div>
              <div className="px-2 py-1 bg-zinc-700 rounded text-xs text-white">ADMIN</div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Link href="/ICEWORKOUT1714" className="block">
              <motion.div
                className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-4 text-left border-l-4 border-blue-500"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
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
              </motion.div>
            </Link>

            <Link href="/DORMITORYCHECKLIST1217" className="block">
              <motion.div
                className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-4 text-left border-l-4 border-green-500"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
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
              </motion.div>
            </Link>
          </div>

          <div className="text-center text-zinc-500 text-xs mt-4">FOR ICE • {new Date().getFullYear()}</div>
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
              <button
                onClick={handleLogout}
                className="flex items-center gap-1 px-3 py-1 bg-zinc-700 hover:bg-zinc-600 rounded-md text-sm transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </button>
            </div>

            <div className="h-1 w-full bg-gradient-to-r from-zinc-700 to-zinc-600 rounded-full mb-4"></div>

            <div className="flex justify-between items-center">
              <div className="text-zinc-400 text-sm">CONNECTED SINCE 2025</div>
              <div className="px-2 py-1 bg-zinc-700 rounded text-xs text-white">FAN ICE</div>
            </div>
          </div>

          <div className="w-full space-y-3">
            <Link href="https://foroei.netlify.app/" className="block">
              <motion.div
                className="flex items-center justify-between bg-zinc-800 hover:bg-zinc-700 transition-colors rounded-xl p-4 text-left border-l-4 border-pink-500"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center">
                  <Heart className="h-5 w-5 text-pink-400 mr-3" />
                  <div>
                    <div className="font-medium text-white">FOR OEI WEBSITE</div>
                    <div className="text-xs text-zinc-400">เว็ปสำหรับเอยยย</div>
                  </div>
                </div>
                <div className="bg-zinc-700 rounded-full p-1">
                  <Code className="h-4 w-4 text-pink-400" />
                </div>
              </motion.div>
            </Link>
          </div>

          <div className="text-center text-zinc-500 text-xs mt-4">FOR OEI • {new Date().getFullYear()}</div>
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