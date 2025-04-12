"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, Circle, Save } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface ChecklistItem {
  id: string
  text: string
  checked: boolean
  category: string
  isExtra?: boolean
}

export default function Home() {
  const [items, setItems] = useState<ChecklistItem[]>([])
  const [showExtras, setShowExtras] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [saveIndicator, setSaveIndicator] = useState(false)

  useEffect(() => {
    // Initialize items from the checklist data
    const initialItems: ChecklistItem[] = [
      // Personal items
      { id: "1", text: "แปรงสีฟัน + ยาสีฟัน", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "2", text: "สบู่ + แชมพู (รวมถึงโฟมล้างหน้า ถ้าใช้)", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "3", text: "ผ้าเช็ดตัว 1-2 ผืน + ผ้าขนหนูผืนเล็ก 1 ผืน", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "4", text: "โรลออน / สเปรย์ระงับกลิ่นกาย", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "5", text: "หวี / กรรไกรตัดเล็บ / แป้ง / โลชั่น", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "6", text: "หน้ากากอนามัย + แอลกอฮอล์เจล / สเปรย์", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "7", text: "ทิชชู่แห้ง / ทิชชู่เปียก", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "8", text: "ยาสามัญประจำตัว + พลาสเตอร์ + ยาแก้ปวด / ยาแก้ท้องเสีย", checked: false, category: "ของใช้ส่วนตัว" },
      { id: "9", text: "ตะกร้าเล็กใส่ของอาบน้ำ", checked: false, category: "ของใช้ส่วนตัว", isExtra: true },
      { id: "10", text: "กระเป๋าเล็กหรือถุงใส่ของเวลาไปห้องน้ำรวม", checked: false, category: "ของใช้ส่วนตัว", isExtra: true },

      // Room items
      { id: "11", text: "พัดลม (แนะนำแบบเงียบๆ ถ้าใช้ตอนนอน)", checked: false, category: "ของใช้ในห้อง" },
      { id: "12", text: "ผ้าปูที่นอน 3 ฟุต + หมอน + ผ้าห่ม", checked: false, category: "ของใช้ในห้อง" },
      { id: "13", text: "ไม้แขวนเสื้อ 4-6 อัน", checked: false, category: "ของใช้ในห้อง" },
      { id: "14", text: "ตะกร้าใส่ผ้า / ตะกร้าผ้าเปียก", checked: false, category: "ของใช้ในห้อง" },
      { id: "15", text: "ผงซักฟอก / น้ำยาซักผ้า", checked: false, category: "ของใช้ในห้อง" },
      { id: "16", text: "ปลั๊กพ่วงแบบมีสวิตช์", checked: false, category: "ของใช้ในห้อง" },
      { id: "17", text: "โคมไฟอ่านหนังสือ (ถ้าไฟบนโต๊ะสว่างไม่พอ)", checked: false, category: "ของใช้ในห้อง" },
      { id: "18", text: "ถังขยะเล็ก + ถุงขยะ", checked: false, category: "ของใช้ในห้อง" },
      { id: "19", text: "ราวตากผ้าแบบพับได้ (หรือใช้แขวนที่ระเบียง)", checked: false, category: "ของใช้ในห้อง" },
      { id: "20", text: "พรมเช็ดเท้าเล็กๆ", checked: false, category: "ของใช้ในห้อง" },
      { id: "21", text: "กล่องเล็กๆ ใส่ของกระจุกกระจิก", checked: false, category: "ของใช้ในห้อง", isExtra: true },

      // Kitchen items
      { id: "22", text: "จาน + ช้อน + แก้วน้ำ / ขวดน้ำส่วนตัว", checked: false, category: "ของใช้ในห้องทำอาหาร" },
      { id: "23", text: "กล่องข้าว (เผื่ออุ่นกับไมโครเวฟ)", checked: false, category: "ของใช้ในห้องทำอาหาร" },
      { id: "24", text: "ฟองน้ำล้างจาน + น้ำยาล้างจานขวดเล็ก", checked: false, category: "ของใช้ในห้องทำอาหาร" },
      { id: "25", text: "ถุงใส่ของ / ถุงพลาสติกไว้เก็บขยะ", checked: false, category: "ของใช้ในห้องทำอาหาร" },

      // Study & IT items
      { id: "26", text: "สมุด / ปากกา / ดินสอ / ยางลบ", checked: false, category: "ของใช้เรียน & ไอที" },
      { id: "27", text: "กระเป๋าใส่อุปกรณ์เรียน", checked: false, category: "ของใช้เรียน & ไอที" },
      { id: "28", text: "โน้ตบุ๊ก / แท็บเล็ต / ที่ชาร์จ", checked: false, category: "ของใช้เรียน & ไอที" },
      { id: "29", text: "หูฟัง (ใช้เรียนหรือฟังเพลงตอนรูมเมตนอน)", checked: false, category: "ของใช้เรียน & ไอที" },
      { id: "30", text: "Power bank (ถ้าใช้มือถือเยอะ)", checked: false, category: "ของใช้เรียน & ไอที" },

      // Clothes
      { id: "31", text: "เสื้อผ้าใส่เรียน + ใส่อยู่หอ + ใส่นอน", checked: false, category: "เสื้อผ้า" },
      { id: "32", text: "ชุดกันหนาว / แจ็กเก็ต (เชียงใหม่อากาศเย็นบ่อย)", checked: false, category: "เสื้อผ้า" },
      { id: "33", text: "กางเกงใน / ถุงเท้า", checked: false, category: "เสื้อผ้า" },
      { id: "34", text: "รองเท้าแตะ + รองเท้าผ้าใบ", checked: false, category: "เสื้อผ้า" },
      { id: "35", text: "หมวก / ร่ม / เสื้อกันฝน", checked: false, category: "เสื้อผ้า" },
      { id: "36", text: "ถุงหรือกระเป๋าเล็กใส่ของเข้าห้องน้ำ", checked: false, category: "เสื้อผ้า" },

      // Extra room items
      { id: "37", text: "นาฬิกาปลุก / ตั้งปลุกในมือถือ", checked: false, category: "ของติดห้อง (เสริมชีวิตให้ง่ายขึ้น)" },
      { id: "38", text: "ของกินเล่น / ขนมแห้ง / มาม่า", checked: false, category: "ของติดห้อง (เสริมชีวิตให้ง่ายขึ้น)" },
      { id: "39", text: "กล่องเก็บของใต้เตียง / กล่องใส่ของมีฝาปิด", checked: false, category: "ของติดห้อง (เสริมชีวิตให้ง่ายขึ้น)" },
      { id: "40", text: "รูปถ่าย / ของตกแต่งเล็กๆ (ทำให้ห้องอบอุ่นขึ้น)", checked: false, category: "ของติดห้อง (เสริมชีวิตให้ง่ายขึ้น)" },
    ]

    // Load saved items from localStorage if available
    const savedItems = localStorage.getItem("dormitoryChecklist")
    if (savedItems) {
      setItems(JSON.parse(savedItems))
    } else {
      setItems(initialItems)
    }

    // Set theme based on user preference
    const savedDarkMode = localStorage.getItem("darkMode")
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode))
    }
  }, [])

  // Save items to localStorage whenever they change
  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem("dormitoryChecklist", JSON.stringify(items))
      setSaveIndicator(true)
      const timer = setTimeout(() => {
        setSaveIndicator(false)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [items])

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [darkMode])

  const toggleItem = (id: string) => {
    setItems(items.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item)))
  }

  const resetChecklist = () => {
    setItems(
      items.map((item) => ({
        ...item,
        checked: false,
      })),
    )
  }

  const getCategories = () => {
    return [...new Set(items.map((item) => item.category))]
  }

  const getProgress = () => {
    const totalItems = items.filter((item) => !item.isExtra || showExtras).length
    const checkedItems = items.filter((item) => item.checked && (!item.isExtra || showExtras)).length
    return totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0
  }

  const clearSavedData = () => {
    localStorage.removeItem("dormitoryChecklist")
    setItems(items.map((item) => ({ ...item, checked: false })))
    setSaveIndicator(false)
  }

  return (
    <div className={`min-h-screen ${darkMode ? "bg-black text-white" : "bg-white text-black"}`}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">เช็กลิสต์ของใช้เข้าหอพัก</h1>
            <div className="flex items-center space-x-2">
              <Label htmlFor="dark-mode" className="text-sm">
                {darkMode ? "🌙" : "☀️"}
              </Label>
              <Switch id="dark-mode" checked={darkMode} onCheckedChange={setDarkMode} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <p className="text-sm md:text-base text-gray-400">สำหรับ ม.4 โครงการวมว. มช.</p>
            <div className="flex items-center space-x-2">
              <Label htmlFor="show-extras" className="text-sm">
                แสดงของเสริม
              </Label>
              <Switch id="show-extras" checked={showExtras} onCheckedChange={setShowExtras} />
            </div>
          </div>

          <div className="bg-gray-800 rounded-full h-3 mb-2">
            <motion.div
              className="bg-white h-3 rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${getProgress()}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span>{getProgress()}% เสร็จสิ้น</span>
            <span>
              {items.filter((item) => item.checked && (!item.isExtra || showExtras)).length}/
              {items.filter((item) => !item.isExtra || showExtras).length} รายการ
            </span>
          </div>
        </header>

        <main>
          {getCategories().map((category) => (
            <section key={category} className="mb-8">
              <h2 className="text-xl font-semibold mb-4 border-b border-gray-800 pb-2">{category}</h2>
              <ul className="space-y-3">
                {items
                  .filter((item) => item.category === category && (!item.isExtra || showExtras))
                  .map((item) => (
                    <motion.li
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`flex items-center p-3 rounded-lg cursor-pointer ${
                        darkMode
                          ? item.checked
                            ? "bg-gray-800"
                            : "bg-gray-900 hover:bg-gray-800"
                          : item.checked
                            ? "bg-gray-100"
                            : "bg-gray-50 hover:bg-gray-100"
                      } ${item.isExtra ? "border-l-4 border-gray-500" : ""}`}
                      onClick={() => toggleItem(item.id)}
                    >
                      {item.checked ? (
                        <CheckCircle2 className="h-6 w-6 text-white mr-3 flex-shrink-0" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-400 mr-3 flex-shrink-0" />
                      )}
                      <span className={item.checked ? "line-through text-gray-400" : ""}>{item.text}</span>
                    </motion.li>
                  ))}
              </ul>
            </section>
          ))}
        </main>

        <footer className="mt-12 pb-8">
          <Button
            variant="outline"
            onClick={resetChecklist}
            className={`w-full ${darkMode ? "border-white hover:bg-gray-800" : "border-black hover:bg-gray-100"}`}
          >
            รีเซ็ตเช็กลิสต์
          </Button>
          <div className="flex justify-between items-center mt-4">
            <Button variant="ghost" onClick={clearSavedData} className="text-sm text-gray-500 hover:text-gray-300">
              ล้างข้อมูลที่บันทึกไว้
            </Button>
            <div
              className={`flex items-center gap-2 text-sm transition-opacity duration-300 ${saveIndicator ? "opacity-100" : "opacity-0"}`}
            >
              <Save className="h-4 w-4" />
              <span>บันทึกแล้ว</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
