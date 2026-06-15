"use client";

import React, { useState } from 'react'
import { ClipboardCheck, Save, Award, Eye, FileSpreadsheet, PlusCircle } from 'lucide-react'

export default function AssessmentBuilder() {
  const [activeTab, setActiveTab] = useState('quiz')
  const [saved, setSaved] = useState(false)

  const [assessments, setAssessments] = useState({
    quiz: {
      title: "แบบทดสอบก่อน-หลังเรียน (Quiz / Test)",
      maxScore: 20,
      description: "แบบทดสอบปรนัยจำนวน 20 ข้อเพื่อใช้วัดระดับความจำและความรู้ด้านคำศัพท์และสำนวนบริการสากล",
      criteria: ["คำศัพท์ในหมวดอาหารและเครื่องดื่ม", "อุปกรณ์จัดโต๊ะอาหาร", "สำนวนรับมือข้อร้องเรียน"]
    },
    speaking: {
      title: "เกณฑ์ประเมินทักษะพูด (Speaking Rubric)",
      maxScore: 30,
      description: "เกณฑ์การให้คะแนนสำหรับการออกเสียงประโยคภาษาอังกฤษผ่าน AI วิเคราะห์เสียง",
      criteria: ["ความถูกต้องของการออกเสียง (Pronunciation - 10 คะแนน)", "ความคล่องแคล่วในการโต้ตอบ (Fluency - 10 คะแนน)", "ความมั่นใจและระดับเสียงพูด (Confidence - 10 คะแนน)"]
    },
    simulation: {
      title: "เกณฑ์ประเมินสถานการณ์จำลอง (Simulation Rubric)",
      maxScore: 40,
      description: "เกณฑ์การให้คะแนนพฤติกรรมและการทำเควสในการบริการร้านอาหารจำลอง 3D",
      criteria: ["ลำดับขั้นตอนการต้อนรับและการจัดที่นั่ง (10 คะแนน)", "การเสนอเมนูและการทวนจดออเดอร์ (15 คะแนน)", "ความเร็วและความประณีตในการแก้ปัญหาเฉพาะหน้า (15 คะแนน)"]
    },
    observation: {
      title: "แบบประเมินพฤติกรรม (Observation Form)",
      maxScore: 10,
      description: "แบบบันทึกประเมินพฤติกรรม มารยาทวิชาชีพ จิตบริการ และการมีส่วนร่วมในห้องเรียน",
      criteria: ["มารยาทและบุคลิกภาพวิชาชีพการโรงแรม (5 คะแนน)", "ความมีวินัยและการตรงต่อเวลา (5 คะแนน)"]
    }
  })

  const handleSave = (e) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const currentAssessment = assessments[activeTab]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Assessment Builder</span>
          <h2 className="text-lg font-heading font-black text-white">4.4 ออกแบบแบบประเมินและรูบริก (Assessment Builder)</h2>
          <p className="text-slate-400 text-xs mt-0.5">กำหนดน้ำหนักคะแนนและข้อสอบสำหรับตัดสินสมรรถนะผู้เรียน</p>
        </div>

        {/* Tab Selector buttons */}
        <div className="flex flex-wrap gap-1.5 bg-slate-950/60 p-1 rounded-xl border border-white/5">
          {Object.keys(assessments).map((key) => (
            <button
              key={key}
              onClick={() => {
                setActiveTab(key)
                setSaved(false)
              }}
              className={`flex-1 py-1.5 text-[9px] font-bold rounded-lg transition-all ${
                activeTab === key
                  ? 'bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {key === 'quiz' ? '📝 ควิซศัพท์' : key === 'speaking' ? '🎙️ พูด AI' : key === 'simulation' ? '🍽️ ด่าน 3D' : '👁️ พฤติกรรม'}
            </button>
          ))}
        </div>

        {/* Selected Assessment Config Card */}
        <div className="bg-[#151D2F]/60 border border-white/5 p-4 rounded-xl space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xs font-bold text-white flex items-center gap-1.5">
                <ClipboardCheck className="w-4 h-4 text-amber-400" />
                {currentAssessment.title}
              </h3>
              <p className="text-[10px] text-slate-400 mt-1">
                {currentAssessment.description}
              </p>
            </div>
            <div className="bg-slate-950 border border-white/5 px-2.5 py-1 rounded-lg shrink-0 ml-4">
              <span className="text-[8px] text-slate-500 block">คะแนนเต็ม</span>
              <span className="text-xs font-bold text-amber-400">{currentAssessment.maxScore} คะแนน</span>
            </div>
          </div>

          {/* Criteria Editor */}
          <div className="space-y-1.5 pt-2 border-t border-white/5">
            <span className="text-[9px] uppercase text-slate-500 font-bold block">เกณฑ์การตัดสินและหัวข้อย่อย:</span>
            <div className="space-y-1.5 max-h-[100px] overflow-y-auto pr-1">
              {currentAssessment.criteria.map((crit, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={crit}
                    onChange={(e) => {
                      const val = e.target.value
                      const updatedCriteria = [...currentAssessment.criteria]
                      updatedCriteria[idx] = val
                      setAssessments(prev => ({
                        ...prev,
                        [activeTab]: { ...prev[activeTab], criteria: updatedCriteria }
                      }))
                    }}
                    className="flex-1 bg-slate-950/80 border border-white/5 rounded-lg px-2.5 py-1.5 text-[10px] text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Save action */}
      <div className="mt-4 flex items-center justify-between">
        {saved && (
          <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
            ✓ อัปเดตข้อมูลแบบประเมินและเกณฑ์เรียบร้อยแล้ว
          </span>
        )}
        <button
          onClick={handleSave}
          className="ml-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-heading font-black text-xs px-6 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition"
        >
          <Save className="w-4 h-4" /> บันทึกเกณฑ์ประเมิน (Save Assessment)
        </button>
      </div>
    </div>
  )
}
