"use client";

import React, { useState } from 'react'
import { Database, Link, Key, Layers, Columns } from 'lucide-react'

export default function SchemaViewer() {
  const [activeTable, setActiveTable] = useState('users')

  const tables = {
    users: {
      name: "users",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสผู้ใช้" },
        { name: "name", type: "VARCHAR", desc: "ชื่อ-นามสกุล" },
        { name: "email", type: "VARCHAR", desc: "อีเมลเข้าใช้งาน" },
        { name: "password", type: "VARCHAR", desc: "รหัสผ่านแฮช" },
        { name: "avatar", type: "VARCHAR", desc: "ที่อยู่ไฟล์รูปโปรไฟล์" },
        { name: "status", type: "ENUM", desc: "สถานะ: active / suspended" }
      ]
    },
    courses: {
      name: "courses",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสหลักสูตร" },
        { name: "title", type: "VARCHAR", desc: "ชื่อรายวิชาเรียน" },
        { name: "description", type: "TEXT", desc: "คำอธิบายรายละเอียด" },
        { name: "teacher_id", type: "INT (FK)", desc: "ผู้สอนที่รับผิดชอบ (users.id)" },
        { name: "status", type: "VARCHAR", desc: "สถานะรายวิชา" }
      ]
    },
    lessons: {
      name: "lessons",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสบทเรียน" },
        { name: "course_id", type: "INT (FK)", desc: "รหัสหลักสูตร (courses.id)" },
        { name: "week_no", type: "INT", desc: "สัปดาห์ที่เรียน" },
        { name: "topic", type: "VARCHAR", desc: "หัวข้อบทเรียน" },
        { name: "objective", type: "TEXT", desc: "วัตถุประสงค์เชิงพฤติกรรม" },
        { name: "fine_stage", type: "VARCHAR", desc: "เฟสการสอน: F, I, N, E" },
        { name: "content", type: "JSON", desc: "เนื้อหาบทเรียนย่อย" }
      ]
    },
    ar_objects: {
      name: "ar_objects",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสออบเจ็กต์ AR" },
        { name: "lesson_id", type: "INT (FK)", desc: "เชื่อมบทเรียน (lessons.id)" },
        { name: "title", type: "VARCHAR", desc: "ชื่ออุปกรณ์ 3D" },
        { name: "category", type: "VARCHAR", desc: "หมวดหมู่: equipment, menu" },
        { name: "model_url", type: "VARCHAR", desc: "ที่อยู่ลิงก์ไฟล์ .GLB หรือ .USDZ" },
        { name: "thumbnail", type: "VARCHAR", desc: "ไฟล์รูปภาพตัวอย่าง" },
        { name: "audio_url", type: "VARCHAR", desc: "ไฟล์บันทึกเสียงออกเสียงพรีเซต" },
        { name: "description", type: "TEXT", desc: "คำนิยามคำแปลศัพท์" }
      ]
    },
    simulations: {
      name: "simulations",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสสถานการณ์จำลอง" },
        { name: "title", type: "VARCHAR", desc: "ชื่อโจทย์สถานการณ์" },
        { name: "description", type: "TEXT", desc: "รายละเอียดเหตุการณ์" },
        { name: "level", type: "VARCHAR", desc: "ความยาก: Easy, Medium, Hard" },
        { name: "scenario_json", type: "JSON", desc: "สคริปต์ขั้นตอนโต้ตอบทั้งหมด" },
        { name: "created_by", type: "INT (FK)", desc: "ครูผู้สร้าง (users.id)" }
      ]
    },
    assessments: {
      name: "assessments",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสแบบประเมิน" },
        { name: "lesson_id", type: "INT (FK)", desc: "เชื่อมบทเรียน (lessons.id)" },
        { name: "type", type: "VARCHAR", desc: "ประเภท: quiz, speaking, simulation" },
        { name: "rubric", type: "JSON", desc: "รายละเอียดเกณฑ์ Rubric ละเอียด" },
        { name: "max_score", type: "INT", desc: "คะแนนเต็ม" },
        { name: "status", type: "VARCHAR", desc: "สถานะพร้อมใช้งาน" }
      ]
    },
    attempts: {
      name: "attempts",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสการทำทดสอบ" },
        { name: "user_id", type: "INT (FK)", desc: "รหัสนักเรียน (users.id)" },
        { name: "assessment_id", type: "INT (FK)", desc: "แบบประเมินที่ทำ (assessments.id)" },
        { name: "score", type: "INT", desc: "คะแนนที่ทำได้" },
        { name: "feedback", type: "TEXT", desc: "คำแนะนำย้อนกลับจาก AI/ครู" },
        { name: "created_at", type: "TIMESTAMP", desc: "วันเวลาทำกิจกรรม" }
      ]
    },
    portfolios: {
      name: "portfolios",
      columns: [
        { name: "id", type: "INT (PK)", desc: "รหัสพอร์ต" },
        { name: "user_id", type: "INT (FK)", desc: "รหัสนักเรียน (users.id)" },
        { name: "title", type: "VARCHAR", desc: "หัวข้อใบรับรอง/ผลงาน" },
        { name: "file_url", type: "VARCHAR", desc: "ที่อยู่ไฟล์บันทึกหลักฐาน" },
        { name: "type", type: "VARCHAR", desc: "ประเภท: pdf, voice_record, video" },
        { name: "created_at", type: "TIMESTAMP", desc: "วันเวลาอัปโหลด" }
      ]
    }
  }

  const currentTable = tables[activeTable]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-sans">Database Schema</span>
            <h2 className="text-lg font-heading font-black text-white">5.3 แผงโครงสร้างตารางหลักฐานข้อมูล (Database Schema)</h2>
            <p className="text-slate-400 text-xs mt-0.5 font-sans">ตารางความสัมพันธ์เชิงโครงสร้างระบบฐานข้อมูลหลัก</p>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex flex-wrap gap-1 bg-slate-950/60 p-1 rounded-xl border border-white/5">
          {Object.keys(tables).map((key) => (
            <button
              key={key}
              onClick={() => setActiveTable(key)}
              className={`px-2 py-1 text-[8px] font-bold rounded-lg transition-all ${
                activeTable === key
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {key}
            </button>
          ))}
        </div>

        {/* Active DB Table structure */}
        <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-xl flex-1 max-h-[190px] overflow-y-auto pr-1">
          <div className="flex items-center gap-1.5 mb-2 border-b border-white/5 pb-1">
            <Database className="w-4 h-4 text-amber-400" />
            <span className="text-xs font-mono font-bold text-white">Table: tb_{currentTable.name}</span>
          </div>

          <table className="w-full text-left font-mono text-[9px] leading-relaxed">
            <thead>
              <tr className="text-slate-500 border-b border-white/5">
                <th className="py-1">Column (คอลัมน์)</th>
                <th className="py-1">DataType</th>
                <th className="py-1">Description (คำอธิบาย)</th>
              </tr>
            </thead>
            <tbody className="text-slate-300 divide-y divide-white/5">
              {currentTable.columns.map((c, idx) => (
                <tr key={idx} className="hover:bg-white/5">
                  <td className="py-1.5 font-bold text-cyan-400 flex items-center gap-1">
                    {c.type.includes('PK') || c.type.includes('FK') ? (
                      <Key className="w-2.5 h-2.5 text-amber-500 shrink-0" />
                    ) : (
                      <div className="w-2.5 h-2.5 shrink-0" />
                    )}
                    {c.name}
                  </td>
                  <td className="py-1.5 text-amber-400 font-semibold">{c.type}</td>
                  <td className="py-1.5 text-slate-400 text-[8px]">{c.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
