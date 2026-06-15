"use client";

import React, { useState } from 'react'
import { Sparkles, Loader2, Code, ArrowRight, RotateCcw, Cpu } from 'lucide-react'

export default function ScenarioBuilder() {
  const [name, setName] = useState('Customer is Vegetarian')
  const [level, setLevel] = useState('Intermediate')
  const [customer, setCustomer] = useState('Tourist')
  const [problem, setProblem] = useState('ลูกค้าไม่ทานเนื้อสัตว์และสอบถามว่าน้ำซุปผสมน้ำต้มกระดูกหมูหรือไม่')
  const [loading, setLoading] = useState(false)
  const [generatedScript, setGeneratedScript] = useState(null)

  const handleGenerateAI = (e) => {
    e.preventDefault()
    setLoading(true)
    setGeneratedScript(null)

    setTimeout(() => {
      setLoading(false)
      setGeneratedScript({
        scenarioName: name,
        difficulty: level,
        customerType: customer,
        dialogueSteps: [
          {
            step: 1,
            customerSays: "Excuse me, I'm a vegetarian. Does this soup contain any animal stock or pork bone?",
            options: [
              { text: "No, sir. This is a pure vegetable broth prepared separately.", correct: true, score: 20 },
              { text: "I don't know. The kitchen makes it. It should be fine.", correct: false, score: 0 }
            ]
          },
          {
            step: 2,
            customerSays: "Great! In that case, I will order the vegetable stir-fry and steamed rice.",
            options: [
              { text: "Excellent choice. I will note down no meat or oyster sauce for your stir-fry.", correct: true, score: 20 }
            ]
          }
        ],
        aiFeedback: "สถานการณ์นี้ช่วยส่งเสริมสมรรถนะการฟังสำเนียงและตอบสนองความต้องการพิเศษด้านโภชนาการ (Special Dietary Needs) ของผู้มารับบริการ"
      })
    }, 2000)
  }

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Scenario Builder</span>
          <h2 className="text-lg font-heading font-black text-white">4.2 สร้างสถานการณ์จำลองด้วยระบบปัญญาประดิษฐ์ (AI)</h2>
          <p className="text-slate-400 text-xs mt-0.5">ออกแบบบทสนทนาโต้ตอบและเหตุการณ์ฉุกเฉินเฉพาะหน้า</p>
        </div>

        {/* Inputs Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="space-y-1">
            <label className="text-[9px] uppercase text-slate-500 font-bold">ชื่อสถานการณ์</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[9px] uppercase text-slate-500 font-bold">ระดับความยาก</label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option>Intermediate</option>
              <option>Easy</option>
              <option>Hard</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className="text-[9px] uppercase text-slate-500 font-bold">ประเภทลูกค้า</label>
            <select
              value={customer}
              onChange={(e) => setCustomer(e.target.value)}
              className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option>Tourist</option>
              <option>Business Delegate</option>
              <option>Family</option>
              <option>VIP Guest</option>
            </select>
          </div>
        </div>

        {/* Problem/Goal */}
        <div className="space-y-1">
          <label className="text-[9px] uppercase text-slate-500 font-bold">ปัญหาหลัก / เงื่อนไขเฉพาะ (Problem & Goals)</label>
          <textarea
            value={problem}
            onChange={(e) => setProblem(e.target.value)}
            className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-2 text-xs text-slate-300 min-h-[45px] focus:outline-none focus:border-amber-500 resize-none"
          />
        </div>

        {/* Generated Script Display Area */}
        <div className="bg-slate-950/60 border border-white/5 p-4 rounded-xl flex-1 max-h-[160px] overflow-y-auto pr-1">
          {loading ? (
            <div className="h-full flex flex-col justify-center items-center py-6 text-slate-500">
              <Loader2 className="w-8 h-8 animate-spin text-amber-500 mb-2" />
              <span className="text-xs">AI กำลังวิเคราะห์แนวคิดและรันสคริปต์ฉากสนทนา...</span>
            </div>
          ) : generatedScript ? (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-white/5 pb-1">
                <span className="text-[10px] font-bold text-amber-400 flex items-center gap-1">
                  <Code className="w-3.5 h-3.5" /> AI SCRIPT GENERATED SUCCESSFULLY
                </span>
                <span className="text-[8px] font-bold text-slate-500">JSON FORMAT</span>
              </div>
              <div className="text-[10px] font-mono text-slate-300 space-y-2 leading-relaxed">
                <div>
                  <span className="text-cyan-400">"scenario":</span> "{generatedScript.scenarioName}"
                </div>
                <div>
                  <span className="text-cyan-400">"steps":</span> [
                  {generatedScript.dialogueSteps.map((step, idx) => (
                    <div key={idx} className="pl-4 mt-1">
                      <div><span className="text-emerald-400">"guest":</span> "{step.customerSays}"</div>
                      <div><span className="text-emerald-400">"options":</span> [ {step.options.map(o => `"${o.text}"`).join(', ')} ]</div>
                    </div>
                  ))}
                  ]
                </div>
                <div className="text-amber-400/90 text-[10px] mt-2 italic">
                  💡 {generatedScript.aiFeedback}
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col justify-center items-center py-6 text-slate-500">
              <Cpu className="w-8 h-8 text-slate-700 mb-2" />
              <span className="text-xs">ป้อนข้อมูลด้านบนแล้วกดปุ่ม "สร้างด้วย AI" เพื่อเริ่มต้น</span>
            </div>
          )}
        </div>
      </div>

      {/* Button */}
      <button
        disabled={loading}
        onClick={handleGenerateAI}
        className="mt-4 w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-heading font-black text-xs py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-500/10 transition"
      >
        {loading ? (
          <>
            <Loader2 className="w-4.5 h-4.5 animate-spin" />
            <span>AI กำลังจัดโครงสร้างบทสนทนา...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4.5 h-4.5" /> สร้างสถานการณ์ด้วยปัญญาประดิษฐ์ (Create with AI)
          </>
        )}
      </button>
    </div>
  )
}
