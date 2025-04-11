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
      goal: "เพิ่มความเข้มข้น, เริ่มซ้อมจริง",
      days: [
        {
          name: "จันทร์",
          exercises: ["วิ่ง 600 ม. จับเวลา", "วิดพื้น (เริ่มใช้แบบเต็ม) 3x6", "ลุกนั่ง 3x20", "Swing 3x15"],
        },
        {
          name: "อังคาร",
          exercises: ["Goblet Squat 3x15", "Shoulder Press 3x10", "Russian Twist 3x16", "เดินเร็ว 20 นาที"],
        },
        {
          name: "พุธ",
          exercises: ["เดินเบา หรือ ยืดกล้ามเนื้อ"],
        },
        {
          name: "พฤหัสบดี",
          exercises: ["วิ่ง 700 ม.", "วิดพื้น 3x8", "ลุกนั่ง 3x25"],
        },
        {
          name: "ศุกร์",
          exercises: ["ซ้อมจริง:", "- วิ่ง 800 ม.", "- วิดพื้น 2 นาที", "- ลุกนั่ง 2 นาที"],
        },
        {
          name: "เสาร์",
          exercises: ["Cardio เบาๆ + ยืดกล้ามเนื้อ"],
        },
        {
          name: "อาทิตย์",
          exercises: ["พัก"],
        },
      ],
    },
    {
      number: 4,
      dateRange: "28 เม.ย. – 30 เม.ย.",
      goal: "ซ้อมจริง เตรียมสอบ",
      days: [
        {
          name: "จันทร์",
          exercises: ["ซ้อมจริง:", "- วิ่ง 800 ม.", "- วิดพื้น 2 นาที", "- ลุกนั่ง 2 นาที"],
        },
        {
          name: "อังคาร",
          exercises: ["ยืดกล้ามเนื้อ", "Cardio เบาๆ", "เดินเบา 10 นาที"],
        },
        {
          name: "พุธ",
          exercises: ["พัก เตรียมพร้อมเต็มที่!"],
        },
        {
          name: "พฤหัสบดี",
          exercises: [],
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
