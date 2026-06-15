"use client";

import React, { useState } from 'react'
import { Award, Volume2, Video, FileText, Download, CheckCircle, ExternalLink, PenTool } from 'lucide-react'

export default function Portfolio({ scoreList }) {
  const [downloading, setDownloading] = useState(false)
  const [reflectionText, setReflectionText] = useState('')
  const [savedReflection, setSavedReflection] = useState(false)

  const handleDownload = () => {
    setDownloading(true)
    setTimeout(() => {
      setDownloading(false)
      alert("ดาวน์โหลดเอกสารรายงาน Portfolio (PDF) สำเร็จแล้ว! ไฟล์จัดเก็บในเครื่องของคุณเรียบร้อย")
    }, 2000)
  }

  const handleSaveReflection = (e) => {
    e.preventDefault()
    setSavedReflection(true)
    setTimeout(() => setSavedReflection(false), 2000)
  }

  const portfolioItems = [
    {
      title: "Voice Record: AI Speaking Coach",
      type: "audio",
      icon: <Volume2 className="w-5 h-5 text-[#d4af37]" />,
      desc: "Good evening, sir. Do you have a reservation...",
      date: "13/06/2026",
      score: "92%"
    },
    {
      title: "Simulation Playthrough Video",
      type: "video",
      icon: <Video className="w-5 h-5 text-cyan-400" />,
      desc: "Walk-in Crowd & Order Taking table 1",
      date: "13/06/2026",
      score: "Pass"
    },
    {
      title: "Reflection Report (แบบสะท้อนคิด)",
      type: "document",
      icon: <FileText className="w-5 h-5 text-emerald-400" />,
      desc: "ประเมินพฤติกรรม มารยาทวิชาชีพ และสิ่งต้องปรับปรุงรายบุคคล",
      date: "13/06/2026",
      score: "Complete"
    }
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Passing Badge / Certificate */}
      <div className="bg-[#151D2F]/60 border border-[#d4af37]/20 p-5 rounded-2xl relative overflow-hidden flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37] shrink-0 animate-pulse">
          <Award className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <span className="text-[10px] text-[#d4af37] font-bold uppercase tracking-widest block">Digital Certificate</span>
          <h3 className="text-sm font-bold text-white mt-0.5">ใบรับรองสมรรถนะการสื่อสารโรงแรม</h3>
          <p className="text-[10px] text-slate-400 mt-0.5">ผ่านการรับรองหลักสูตรร่วมจำลองสถานการณ์ 3D & AR</p>
        </div>
      </div>

      {/* Portfolio Items list */}
      <div className="mt-4 flex-1 space-y-2 overflow-y-auto max-h-[170px] pr-1">
        {portfolioItems.map((item, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-white/5 p-3 rounded-xl flex items-center justify-between hover:border-slate-800 transition">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center shrink-0">
                {item.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                <span className="text-[9px] text-slate-500">{item.desc}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[9px] text-slate-500 block">{item.date}</span>
              <span className="text-xs font-bold text-emerald-400 mt-0.5 block">{item.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Reflection sheet */}
      <form onSubmit={handleSaveReflection} className="mt-4 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5">
        <label className="text-[10px] uppercase text-[#d4af37] tracking-widest font-bold block mb-1">
          เขียนสะท้อนคิดเกี่ยวกับบทเรียน (Reflection Sheet)
        </label>
        <div className="flex gap-2 items-center">
          <textarea
            value={reflectionText}
            onChange={(e) => setReflectionText(e.target.value)}
            placeholder="พฤติกรรมการต้อนรับและคำศัพท์ที่ต้องการปรับปรุงในวันนี้คือ..."
            className="flex-1 min-h-[40px] text-xs bg-slate-950 border border-white/5 rounded-xl p-2 text-slate-300 focus:outline-none focus:border-[#d4af37] resize-none"
          />
          <button
            type="submit"
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-2 h-10 rounded-xl font-bold text-xs shrink-0 transition"
          >
            บันทึก
          </button>
        </div>
        {savedReflection && (
          <span className="text-[9px] text-emerald-400 flex items-center gap-1 mt-1 font-bold">
            <CheckCircle className="w-3.5 h-3.5" /> บันทึกรายงานการสะท้อนคิดเรียบร้อยแล้ว!
          </span>
        )}
      </form>

      {/* PDF Download Button */}
      <button
        disabled={downloading}
        onClick={handleDownload}
        className="mt-4 w-full bg-[#d4af37] hover:bg-[#f59e0b] disabled:bg-slate-700 text-slate-950 font-heading font-black py-3 rounded-xl flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/10 transition"
      >
        {downloading ? (
          <>
            <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            <span>กำลังจัดทำไฟล์รายงาน PDF...</span>
          </>
        ) : (
          <>
            <Download className="w-4.5 h-4.5" /> ดาวน์โหลดแฟ้มสะสมผลงาน (Download Portfolio PDF)
          </>
        )}
      </button>
    </div>
  )
}
