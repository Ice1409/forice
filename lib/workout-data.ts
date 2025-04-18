import type { WorkoutWeek } from "./types"

export function getWorkoutData(): WorkoutWeek[] {
  return [
    {
      number: 1,
      dateRange: "7 – 13 เม.ย.",
      goal: "สร้างความเคยชินกับร่างกาย, ฝึกพื้นฐานเบาๆ",
      days: [
        {
          name: "จันทร์",
          exercises: [
            "เดินเร็ว 10 นาที",
            "วิ่งเหยาะ 3x1 นาที (พัก 1 นาที)",
            "วิดพื้นเข่า 3x5",
            "ลุกนั่ง 3x10",
            "Goblet Squat (ลูกตุ้ม) 2x10",
          ],
        },
        {
          name: "อังคาร",
          exercises: [
            "เดินเร็ว 15 นาที",
            "Russian Twist (ลูกตุ้ม) 3x10 (ซ้าย–ขวา = 1)",
            "แพลงก์ 2x20 วิ",
            "Shoulder Press (ลูกตุ้ม) 2x8/ข้าง",
          ],
        },
        {
          name: "พุธ",
          exercises: ["เดินชิลล์ 15 นาที", "ยืดเหยียดเต็มตัว"],
        },
        {
          name: "พฤหัสบดี",
          exercises: ["วิ่งเหยาะ 4x1 นาที", "วิดพื้นเข่า 3x6", "ลุกนั่ง 3x12", "Kettlebell Swing (ลูกตุ้ม) 2x12"],
        },
        {
          name: "ศุกร์",
          exercises: ["เดินเร็ว 20 นาที", "Goblet Squat 3x10", "Russian Twist 3x12"],
        },
        {
          name: "เสาร์",
          exercises: ["คาร์ดิโอเบาๆ (ปั่นจักรยาน/เดินเร็ว) 25 นาที"],
        },
        {
          name: "อาทิตย์",
          exercises: ["พัก"],
        },
      ],
    },
    {
      number: 2,
      dateRange: "14 – 20 เม.ย.",
      goal: "เพิ่มความแข็งแรง, พัฒนาความอึด",
      days: [
        {
          name: "จันทร์",
          exercises: ["วิ่ง 4x1.5 นาที", "วิดพื้นเข่า 3x7", "ลุกนั่ง 3x14", "Swing 2x15"],
        },
        {
          name: "อังคาร",
          exercises: ["Goblet Squat 3x12", "Shoulder Press 3x8", "แพลงก์ 2x30 วิ", "เดินเร็ว 20 นาที"],
        },
        {
          name: "พุธ",
          exercises: ["พัก หรือเดินชิลล์ 15 นาที"],
        },
        {
          name: "พฤหัสบดี",
          exercises: ["วิ่ง 5x1 นาที", "วิดพื้นเข่า 3x8", "ลุกนั่ง 3x16", "Russian Twist 3x14"],
        },
        {
          name: "ศุกร์",
          exercises: ["ทดสอบ: ลุกนั่งภายใน 2 นาที", "ทดสอบ: วิดพื้นภายใน 2 นาที"],
        },
        {
          name: "เสาร์",
          exercises: ["เดินเร็ว หรือ ปั่นจักรยาน 20–25 นาที"],
        },
        {
          name: "อาทิตย์",
          exercises: ["พัก"],
        },
      ],
    },
    {
      number: 3,
      dateRange: "21 – 27 เม.ย.",
      goal: "พัฒนาความอึด, ฝึกเกินเกณฑ์แบบค่อยๆ",
      days: [
        {
          name: "จันทร์",
          exercises: ["วิ่ง 600 ม. จับเวลา", "วิดพื้น 3×8", "ลุกนั่ง 3×25", "Kettlebell Swing 3×15"],
        },
        {
          name: "อังคาร",
          exercises: ["Goblet Squat 3×15", "Shoulder Press 3×10/ข้าง", "Russian Twist 3×16", "เดินเร็ว 20 นาที"],
        },
        {
          name: "พุธ",
          exercises: ["เดินเบาๆ หรือยืดกล้ามเนื้อทั้งตัว"],
        },
        {
          name: "พฤหัสบดี",
          exercises: ["วิ่ง 700 ม.", "วิดพื้น 3×10", "ลุกนั่ง 3×28", "Swing 3×15"],
        },
        {
          name: "ศุกร์",
          exercises: ["ซ้อมจริง (จับเวลา):", "วิ่ง 800 ม.", "วิดพื้น 2 นาที", "ลุกนั่ง 2 นาที"],
        },
        {
          name: "เสาร์",
          exercises: ["คาร์ดิโอเบา 25 นาที + ยืดเหยียด"],
        },
        {
          name: "อาทิตย์",
          exercises: ["พัก"],
        },
      ],
    },
    {
      number: 4,
      dateRange: "28 เม.ย. – 4 พ.ค.",
      goal: "ฝึกเต็มรูปแบบ, ซ้อมจริงสลับเบา",
      days: [
        {
          name: "จันทร์",
          exercises: ["วิ่ง 2x800 ม. (พัก 3 นาที)", "วิดพื้น 3×12", "ลุกนั่ง 3×30", "Russian Twist 3×18"],
        },
        {
          name: "อังคาร",
          exercises: ["Goblet Squat 3×15", "Swing 3×18", "Shoulder Press 3×10/ข้าง", "แพลงก์ 2×40 วิ"],
        },
        {
          name: "พุธ",
          exercises: ["เดินเร็ว + ยืดเหยียด 30 นาที"],
        },
        {
          name: "พฤหัสบดี",
          exercises: ["วิ่ง 900 ม.", "วิดพื้น 3×14", "ลุกนั่ง 3×32"],
        },
        {
          name: "ศุกร์",
          exercises: ["ทดสอบจำลอง:", "วิ่ง 800 ม.", "วิดพื้น 2 นาที", "ลุกนั่ง 2 นาที"],
        },
        {
          name: "เสาร์",
          exercises: ["คาร์ดิโอ (เช่น ปั่นจักรยาน, วิ่งช้า 20–30 นาที)"],
        },
        {
          name: "อาทิตย์",
          exercises: ["พัก"],
        },
      ],
    },
    {
      number: 5,
      dateRange: "5 – 8 พ.ค.",
      goal: "ซ้อมจริง, เตรียมสอบให้พร้อมสุดๆ",
      days: [
        {
          name: "จันทร์",
          exercises: [
            "ซ้อมจริง (จัดเต็ม):",
            "วิ่ง 800 ม. (เป้าหมาย < 2.50 นาที)",
            "วิดพื้น 2 นาที (เป้าหมาย > 25 ครั้ง)",
            "ลุกนั่ง 2 นาที (เป้าหมาย > 38 ครั้ง)",
          ],
        },
        {
          name: "อังคาร",
          exercises: ["เดินเร็ว + ยืดเหยียดเบาๆ", "ฝึกท่าลมหายใจ, ความมั่นใจ"],
        },
        {
          name: "พุธ",
          exercises: ["ซ้อมเบา 50% (เน้นความชัวร์)", "จบด้วยยืดเหยียด+พักเยอะๆ"],
        },
        {
          name: "พฤหัสบดี",
          exercises: ["พักร่างกาย", "นอนเร็ว ตื่นเช้ากระฉับกระเฉง", "เชื่อมั่นในตัวเอง 💪🔥"],
        },
        {
          name: "ศุกร์",
          exercises: [],
        },
        {
          name: "เสาร์",
          exercises: [],
        },
        {
          name: "อาทิตย์",
          exercises: [],
        },
      ],
    },
  ]
}
