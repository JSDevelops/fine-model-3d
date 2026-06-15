"use client";

import React, { useState } from 'react'
import { Save, BookOpen, Plus, Trash2, Calendar, FileCheck2 } from 'lucide-react'

export default function LessonBuilder() {
  const [course, setCourse] = useState('Food & Beverage Service (20701-2020)')
  const [unit, setUnit] = useState('Unit 2: Taking Food Orders')
  const [week, setWeek] = useState('Week 2')
  const [objective, setObjective] = useState('ผู้เรียนสามารถแนะนำเมนูและรับคำสั่งอาหารเป็นภาษาอังกฤษได้ถูกต้องตามเกณฑ์มาตรฐานสากล')
  const [published, setPublished] = useState(false)

  const [stages, setStages] = useState({
    f: { title: "Familiarize (เรียนคำศัพท์)", tech: "AR 3D Scanner", content: "เรียนรู้คำศัพท์วัสดุ อุปกรณ์ เช่น Saucer, Espresso cup, Ice Bucket และเครื่องดื่ม ผ่าน AR QR Code" },
    i: { title: "Interact (ฝึกสนทนากับ AI)", tech: "FineGPT Coach", content: "ฝึกออกเสียงคำสั่งและการทวนออเดอร์กับ AI Chatbot ประเมินระดับเสียงและสำเนียงการออกเสียง" },
    n: { title: "Navigate (สถานการณ์จำลอง)", tech: "3D Simulation", content: "เล่นด่านจำลองสเตจร้านอาหาร การแก้ไขปัญหาเฉพาะหน้าเมนูอาหารล่าช้าและการรับมือลูกค้าแพ้อาหาร" },
    e: { title: "Exhibit (ประเมินสมรรถนะ)", tech: "Rubric Assessment", content: "ทดสอบการรับออเดอร์ในด่านประเมินแบบสุ่ม เพื่อตัดสินระดับเลเวลสมรรถนะวิชาชีพ (KSA-C)" }
  })

  const handlePublish = (e) => {
    e.preventDefault()
    setPublished(true)
    setTimeout(() => setPublished(false), 2500)
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header Title */}
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Lesson Plan Builder</span>
          <h2 className="text-lg font-heading font-black text-white">4.1 ออกแบบแผนการสอนรายสัปดาห์ (F-I-N-E)</h2>
          <p className="text-slate-400 text-xs mt-0.5">วางโครงสร้างการเรียนการสอนรายวิชาบริการอาหารและเครื่องดื่ม</p>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[9px] uppercase text-slate-500 font-bold">เลือกรายวิชา</label>
            <select
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option>Food & Beverage Service (20701-2020)</option>
              <option>Hotel Reception (20701-2010)</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[9px] uppercase text-slate-500 font-bold">หน่วยการเรียนรู้</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
              >
                <option>Unit 2: Taking Food Orders</option>
                <option>Unit 1: Table Setting</option>
                <option>Unit 3: Special Needs</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase text-slate-500 font-bold">สัปดาห์ที่</label>
              <select
                value={week}
                onChange={(e) => setWeek(e.target.value)}
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
              >
                <option>Week 2</option>
                <option>Week 1</option>
                <option>Week 3</option>
              </select>
            </div>
          </div>
        </div>

        {/* Outcome Objective */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-slate-500 font-bold">ผลลัพธ์การเรียนรู้รายสัปดาห์ (Expected Outcome)</label>
          <textarea
            value={objective}
            onChange={(e) => setObjective(e.target.value)}
            className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 min-h-[50px] focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>

        {/* FINE Stages Config */}
        <div className="space-y-2 max-h-[170px] overflow-y-auto pr-1">
          <label className="text-[9px] uppercase text-slate-500 font-bold block">กำหนดกิจกรรมสี่ขั้นตอน (FINE Model Stages)</label>
          {Object.keys(stages).map((key) => (
            <div key={key} className="bg-slate-900/40 border border-white/5 p-3 rounded-xl flex items-start gap-3 hover:border-slate-800 transition">
              <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                <span className="text-xs font-black text-[#d4af37] uppercase">{key}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-200">{stages[key].title}</h4>
                  <span className="text-[9px] font-bold text-cyan-400 uppercase bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-md">
                    {stages[key].tech}
                  </span>
                </div>
                <textarea
                  value={stages[key].content}
                  onChange={(e) => {
                    const val = e.target.value
                    setStages(prev => ({
                      ...prev,
                      [key]: { ...prev[key], content: val }
                    }))
                  }}
                  className="w-full bg-slate-950/40 border-0 text-[10px] text-slate-400 mt-1 leading-relaxed focus:outline-none focus:ring-1 focus:ring-amber-500 rounded p-1 resize-none"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-4 flex items-center justify-between">
        {published && (
          <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            <FileCheck2 className="w-4 h-4 animate-bounce" /> เผยแพร่แผนการสอนไปยังผู้เรียนทุกคนแล้ว!
          </div>
        )}
        <button
          onClick={handlePublish}
          className="ml-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-black text-xs px-6 py-3 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition"
        >
          <Save className="w-4 h-4" /> บันทึกและเผยแพร่แผนการเรียน (Publish Plan)
        </button>
      </div>
    </div>
  )
}
