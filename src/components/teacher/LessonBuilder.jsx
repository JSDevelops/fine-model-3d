"use client";

import React, { useState, useEffect } from 'react'
import { Save, BookOpen, Plus, Trash2, Calendar, FileCheck2, RefreshCw, Layers } from 'lucide-react'

const DEFAULT_LESSONS = [
  {
    id: "fb-u2-w2",
    course: "Food & Beverage Service (20701-2020)",
    unit: "Unit 2: Taking Food Orders",
    week: "Week 2",
    objective: "ผู้เรียนสามารถแนะนำเมนูและรับคำสั่งอาหารเป็นภาษาอังกฤษได้ถูกต้องตามเกณฑ์มาตรฐานสากล",
    stages: {
      f: { title: "Familiarize (เรียนคำศัพท์)", tech: "AR 3D Scanner", content: "เรียนรู้คำศัพท์วัสดุ อุปกรณ์ เช่น Saucer, Espresso cup, Ice Bucket และเครื่องดื่ม ผ่าน AR QR Code" },
      i: { title: "Interact (ฝึกสนทนากับ AI)", tech: "FineGPT Coach", content: "ฝึกออกเสียงคำสั่งและการทวนออเดอร์กับ AI Chatbot ประเมินระดับเสียงและสำเนียงการออกเสียง" },
      n: { title: "Navigate (สถานการณ์จำลอง)", tech: "3D Simulation", content: "เล่นด่านจำลองสเตจร้านอาหาร การแก้ไขปัญหาเฉพาะหน้าเมนูอาหารล่าช้าและการรับมือลูกค้าแพ้อาหาร" },
      e: { title: "Exhibit (ประเมินสมรรถนะ)", tech: "Rubric Assessment", content: "ทดสอบการรับออเดอร์ในด่านประเมินแบบสุ่ม เพื่อตัดสินระดับเลเวลสมรรถนะวิชาชีพ (KSA-C)" }
    }
  },
  {
    id: "fb-u1-w1",
    course: "Food & Beverage Service (20701-2020)",
    unit: "Unit 1: Table Setting",
    week: "Week 1",
    objective: "ผู้เรียนสามารถจัดโต๊ะอาหารแบบตะวันตก (Western Table Setting) ได้ถูกต้องตามตำแหน่งอุปกรณ์และประเภทบริการ",
    stages: {
      f: { title: "Familiarize (เรียนคำศัพท์)", tech: "AR 3D Scanner", content: "เรียนรู้คำศัพท์ประเภทแก้ว จาน ช้อน ส้อม มีด (Dinner Fork, Butter Knife, Red Wine Glass) ในแบบ 3 มิติ" },
      i: { title: "Interact (ฝึกสนทนากับ AI)", tech: "FineGPT Coach", content: "ฝึกทักทายและต้อนรับแขกที่โต๊ะอาหารเป็นภาษาอังกฤษ (Welcoming & Seating guests)" },
      n: { title: "Navigate (สถานการณ์จำลอง)", tech: "3D Simulation", content: "จัดโต๊ะอาหารแบบ Fine Dining บนโต๊ะจำลอง 3 มิติโดยวางตำแหน่งอุปกรณ์ให้ถูกต้อง" },
      e: { title: "Exhibit (ประเมินสมรรถนะ)", tech: "Rubric Assessment", content: "ประเมินความเร็วและความถูกต้องในการจัดวางอุปกรณ์รับประทานอาหารตามเมนูที่สุ่ม" }
    }
  }
]

export default function LessonBuilder() {
  const [lessons, setLessons] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [published, setPublished] = useState(false)
  const [notification, setNotification] = useState('')

  // Load from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('fineverse_lessons')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setLessons(parsed)
      } catch (e) {
        console.error("Failed to parse lessons, loading defaults:", e)
        setLessons(DEFAULT_LESSONS)
        localStorage.setItem('fineverse_lessons', JSON.stringify(DEFAULT_LESSONS))
      }
    } else {
      setLessons(DEFAULT_LESSONS)
      localStorage.setItem('fineverse_lessons', JSON.stringify(DEFAULT_LESSONS))
    }
  }, [])

  const handleSave = (e) => {
    if (e) e.preventDefault()
    if (lessons.length === 0) return

    localStorage.setItem('fineverse_lessons', JSON.stringify(lessons))
    setPublished(true)
    setNotification('บันทึกและเผยแพร่แผนการสอนไปยังผู้เรียนแล้ว!')
    setTimeout(() => {
      setPublished(false)
      setNotification('')
    }, 2500)
  }

  const handleAddNew = () => {
    const newLesson = {
      id: `lesson-${Date.now()}`,
      course: "Food & Beverage Service (20701-2020)",
      unit: `Unit ${lessons.length + 1}: New Service Unit`,
      week: `Week ${lessons.length + 1}`,
      objective: "ระบุเป้าหมายและผลลัพธ์การเรียนรู้ที่คาดหวังของแผนการเรียนนี้",
      stages: {
        f: { title: "Familiarize (เรียนคำศัพท์)", tech: "AR 3D Scanner", content: "รายละเอียดกิจกรรมเรียนคำศัพท์ผ่านโมเดล 3 มิติและกล้องสแกน AR" },
        i: { title: "Interact (ฝึกสนทนากับ AI)", tech: "FineGPT Coach", content: "รายละเอียดกิจกรรมการฝึกพูดและประเมินระดับเสียงและสำเนียง" },
        n: { title: "Navigate (สถานการณ์จำลอง)", tech: "3D Simulation", content: "รายละเอียดการเล่นและปฏิบัติในด่านจำลองสามมิติ" },
        e: { title: "Exhibit (ประเมินสมรรถนะ)", tech: "Rubric Assessment", content: "รายละเอียดการทำข้อสอบประเมินตัดสินสมรรถนะ (KSA-C)" }
      }
    }

    const updated = [newLesson, ...lessons]
    setLessons(updated)
    setSelectedIndex(0)
    localStorage.setItem('fineverse_lessons', JSON.stringify(updated))

    setNotification('เพิ่มแผนการสอนใหม่เรียบร้อย!')
    setTimeout(() => setNotification(''), 2000)
  }

  const handleDelete = () => {
    if (lessons.length === 0) return
    const name = lessons[selectedIndex].week + ": " + lessons[selectedIndex].unit
    if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบแผนการเรียน "${name}"?`)) return

    const updated = lessons.filter((_, idx) => idx !== selectedIndex)
    setLessons(updated)
    setSelectedIndex(0)
    localStorage.setItem('fineverse_lessons', JSON.stringify(updated))

    setNotification('ลบแผนการเรียนการสอนสำเร็จ!')
    setTimeout(() => setNotification(''), 2000)
  }

  const handleResetDefaults = () => {
    if (!confirm("คุณต้องการรีเซ็ตแผนการสอนทั้งหมดกลับไปเป็นค่าเริ่มต้นของโครงการหรือไม่?")) return
    setLessons(DEFAULT_LESSONS)
    setSelectedIndex(0)
    localStorage.setItem('fineverse_lessons', JSON.stringify(DEFAULT_LESSONS))

    setNotification('รีเซ็ตเป็นแผนการสอนเริ่มต้นเรียบร้อย!')
    setTimeout(() => setNotification(''), 2000)
  }

  const handleFieldChange = (field, val) => {
    const updated = [...lessons]
    updated[selectedIndex] = {
      ...updated[selectedIndex],
      [field]: val
    }
    setLessons(updated)
  }

  const handleStageChange = (stageKey, subField, val) => {
    const updated = [...lessons]
    const currentStage = updated[selectedIndex].stages[stageKey]
    updated[selectedIndex].stages[stageKey] = {
      ...currentStage,
      [subField]: val
    }
    setLessons(updated)
  }

  if (lessons.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-[#151D2F]/40 border border-white/5 rounded-3xl h-[350px] font-sans">
        <Layers className="w-12 h-12 text-slate-500 mb-3 animate-pulse" />
        <h3 className="text-sm font-heading font-black text-white">ไม่มีแผนการสอนในระบบ</h3>
        <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
          ปัจจุบันยังไม่มีแผนบทเรียนการสอนถูกสร้างอยู่ ครูสามารถเพิ่มแผนใหม่ได้ทันที
        </p>
        <button
          onClick={handleAddNew}
          className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
        >
          <Plus className="w-4 h-4" /> สร้างแผนการสอนใหม่
        </button>
      </div>
    )
  }

  const currentLesson = lessons[selectedIndex]

  return (
    <div className="flex flex-col h-full justify-between font-sans">
      <div className="space-y-4">
        {/* Header Title */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Lesson Plan Builder</span>
            <h2 className="text-lg font-heading font-black text-white">4.1 ออกแบบแผนการสอนรายสัปดาห์ (F-I-N-E)</h2>
            <p className="text-slate-400 text-xs mt-0.5">วางโครงสร้างและเนื้อหากิจกรรมในระบบผู้เรียนผ่านพอร์ทัลจัดการของครู</p>
          </div>
          <button
            onClick={handleResetDefaults}
            className="text-[9px] font-bold text-slate-400 hover:text-white bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg flex items-center gap-1 transition"
            title="รีเซ็ตบทเรียนกลับเป็นค่าตั้งต้น"
          >
            <RefreshCw className="w-3 h-3" /> คืนค่าเริ่มต้น
          </button>
        </div>

        {/* Manager Action Bar (CRUD select and buttons) */}
        <div className="flex flex-col sm:flex-row gap-2 bg-slate-950 p-2 rounded-2xl border border-white/5 items-center justify-between">
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <span className="text-[9px] uppercase font-bold text-slate-400 whitespace-nowrap">จัดการแผน:</span>
            <select
              value={selectedIndex}
              onChange={(e) => setSelectedIndex(Number(e.target.value))}
              className="bg-slate-900 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-amber-400 font-bold focus:outline-none w-full sm:w-[220px]"
            >
              {lessons.map((les, idx) => (
                <option key={les.id} value={idx}>
                  {les.week} - {les.unit}
                </option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 w-full sm:w-auto shrink-0 justify-end">
            <button
              onClick={handleAddNew}
              className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/20 font-bold text-[10px] px-3 py-2 rounded-xl flex items-center gap-1 transition"
            >
              <Plus className="w-3.5 h-3.5" /> สร้างแผนใหม่
            </button>
            <button
              onClick={handleDelete}
              className="bg-rose-500/10 border border-rose-500/30 text-rose-400 hover:bg-rose-500/20 font-bold text-[10px] px-3 py-2 rounded-xl flex items-center gap-1 transition"
            >
              <Trash2 className="w-3.5 h-3.5" /> ลบแผนนี้
            </button>
          </div>
        </div>

        {/* Input Fields Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-[#151D2F]/20 p-3 rounded-2xl border border-white/5">
          <div className="space-y-1">
            <label className="text-[9px] uppercase text-slate-500 font-bold">ชื่อรายวิชาเรียน (Course Name)</label>
            <input
              type="text"
              value={currentLesson.course}
              onChange={(e) => handleFieldChange('course', e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="text-[9px] uppercase text-slate-500 font-bold">หน่วยการเรียนรู้ (Unit)</label>
              <input
                type="text"
                value={currentLesson.unit}
                onChange={(e) => handleFieldChange('unit', e.target.value)}
                placeholder="Unit 1: Table Setting"
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[9px] uppercase text-slate-500 font-bold">สัปดาห์เรียน (Week)</label>
              <input
                type="text"
                value={currentLesson.week}
                onChange={(e) => handleFieldChange('week', e.target.value)}
                placeholder="Week 1"
                className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>
        </div>

        {/* Outcome Objective */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-slate-500 font-bold">ผลลัพธ์การเรียนรู้รายสัปดาห์ (Expected Outcome)</label>
          <textarea
            value={currentLesson.objective}
            onChange={(e) => handleFieldChange('objective', e.target.value)}
            className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 min-h-[50px] focus:outline-none focus:border-amber-500 resize-none font-sans"
          />
        </div>

        {/* FINE Stages Config */}
        <div className="space-y-2 max-h-[165px] overflow-y-auto pr-1">
          <label className="text-[9px] uppercase text-slate-500 font-bold block">กำหนดกิจกรรมสี่ขั้นตอน (FINE Model Stages)</label>
          {Object.keys(currentLesson.stages).map((key) => {
            const stage = currentLesson.stages[key]
            return (
              <div key={key} className="bg-slate-900/40 border border-white/5 p-3 rounded-xl flex items-start gap-3 hover:border-slate-800 transition">
                <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0">
                  <span className="text-xs font-black text-[#d4af37] uppercase">{key}</span>
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center">
                    {/* Stage Title */}
                    <input
                      type="text"
                      value={stage.title}
                      onChange={(e) => handleStageChange(key, 'title', e.target.value)}
                      className="bg-transparent border-b border-dashed border-white/10 text-xs font-bold text-slate-200 focus:outline-none focus:border-amber-500 py-0.5 w-[160px]"
                    />
                    {/* Technology Used */}
                    <input
                      type="text"
                      value={stage.tech}
                      onChange={(e) => handleStageChange(key, 'tech', e.target.value)}
                      placeholder="Technology Used"
                      className="bg-cyan-500/5 border border-cyan-500/20 text-[9px] text-cyan-400 font-bold uppercase px-2 py-0.5 rounded focus:outline-none focus:border-cyan-400 w-[120px]"
                    />
                  </div>
                  {/* Stage Content */}
                  <textarea
                    value={stage.content}
                    onChange={(e) => handleStageChange(key, 'content', e.target.value)}
                    className="w-full bg-slate-950/40 border border-white/5 text-[10px] text-slate-400 leading-relaxed focus:outline-none focus:border-amber-500 rounded-lg p-2 resize-none font-sans"
                    rows={2}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Bar */}
      <div className="mt-4 flex items-center justify-between shrink-0">
        <div className="flex-1 mr-4">
          {notification && (
            <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20 max-w-max">
              <FileCheck2 className="w-4 h-4 animate-bounce" /> {notification}
            </div>
          )}
        </div>
        <button
          onClick={handleSave}
          className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-black text-xs px-6 py-3 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition"
        >
          <Save className="w-4 h-4" /> บันทึกและเผยแพร่แผนการเรียน (Publish Plan)
        </button>
      </div>
    </div>
  )
}
