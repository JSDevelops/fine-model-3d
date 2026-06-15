"use client";

import React from 'react'
import { Users, BookOpen, CheckCircle, BarChart3, TrendingUp, Star } from 'lucide-react'

export default function Analytics() {
  const ksac = [
    { label: "Knowledge (K) - คำศัพท์ขั้นตอนการบริการ", value: 85, color: "from-amber-600 to-amber-400" },
    { label: "Skill (S) - ทักษะการสื่อสารภาษาอังกฤษโต้ตอบ", value: 80, color: "from-cyan-600 to-cyan-400" },
    { label: "Attribute (A) - บุคลิกภาพ คุณลักษณะ มารยาทบริการ", value: 88, color: "from-emerald-600 to-emerald-400" },
    { label: "Competency (C) - สมรรถนะการปฏิบัติงานจริงในร้านอาหาร", value: 84, color: "from-indigo-600 to-indigo-400" }
  ]

  const students = [
    { name: "สิริวัลย์ เจริญดี", level: "ปวช.1 โรงแรม", vocab: "95%", speaking: "92%", sim: "Pass", overall: 94 },
    { name: "ณัฐพงศ์ ศรีสุข", level: "ปวช.1 โรงแรม", vocab: "88%", speaking: "85%", sim: "Pass", overall: 87 },
    { name: "ธนพล มั่งคั่ง", level: "ปวช.1 โรงแรม", vocab: "75%", speaking: "80%", sim: "Pass", overall: 79 },
    { name: "ปรียานุช สงวนสาย", level: "ปวช.1 โรงแรม", vocab: "90%", speaking: "88%", sim: "Pass", overall: 89 }
  ]

  return (
    <div className="flex flex-col h-full justify-between">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Class Analytics</span>
            <h2 className="text-lg font-heading font-black text-white">4.3 ติดตามและวิเคราะห์ผู้เรียน (Analytics)</h2>
            <p className="text-slate-400 text-xs mt-0.5">ภาพรวมผลลัพธ์การเรียนรู้และการทำกิจกรรมของชั้นเรียน</p>
          </div>
          <div className="bg-slate-900 border border-white/5 px-2.5 py-1 rounded-xl text-[10px] font-bold text-slate-400 flex items-center gap-1">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>อัปเดตเรียลไทม์</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center text-xs">
          <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col justify-center">
            <span className="text-slate-500 text-[9px] uppercase font-bold">นักเรียนทั้งหมด</span>
            <span className="text-white font-heading font-black text-lg mt-0.5">120 คน</span>
          </div>
          <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col justify-center">
            <span className="text-slate-500 text-[9px] uppercase font-bold">สำเร็จกิจกรรม</span>
            <span className="text-emerald-400 font-heading font-black text-lg mt-0.5">102 คน (85%)</span>
          </div>
          <div className="bg-slate-950/60 border border-white/5 p-3 rounded-xl flex flex-col justify-center">
            <span className="text-slate-500 text-[9px] uppercase font-bold">คะแนนเฉลี่ยคลาส</span>
            <span className="text-amber-400 font-heading font-black text-lg mt-0.5">82%</span>
          </div>
        </div>

        {/* KSA-C Outcomes Charts */}
        <div className="bg-[#151D2F]/40 border border-white/5 p-4 rounded-2xl">
          <h3 className="text-[10px] uppercase text-[#d4af37] font-bold tracking-wider mb-2 flex items-center gap-1.5">
            <BarChart3 className="w-3.5 h-3.5" /> ผลลัพธ์การเรียนรู้ KSA-C Framework
          </h3>
          <div className="space-y-2">
            {ksac.map((item, idx) => (
              <div key={idx} className="text-[9px]">
                <div className="flex justify-between text-slate-300 font-semibold mb-0.5">
                  <span>{item.label}</span>
                  <span className="text-white font-bold">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                  <div className={`bg-gradient-to-r ${item.color} h-full rounded-full`} style={{ width: `${item.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student list */}
        <div className="space-y-2 max-h-[120px] overflow-y-auto pr-1">
          <label className="text-[9px] uppercase text-slate-500 font-bold block">รายชื่อนักเรียนทำคะแนนดีเด่นล่าสุด</label>
          {students.map((student, idx) => (
            <div key={idx} className="bg-slate-900/60 border border-white/5 p-2 rounded-xl flex justify-between items-center text-[10px] hover:border-slate-800 transition">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-500/10 border border-amber-500/20 text-[#d4af37] flex items-center justify-center font-bold">
                  {idx + 1}
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">{student.name}</h4>
                  <span className="text-[8px] text-slate-500">{student.level}</span>
                </div>
              </div>
              
              <div className="flex gap-3 text-right">
                <div>
                  <span className="text-[8px] text-slate-500 block">Vocab</span>
                  <span className="text-slate-300 font-medium">{student.vocab}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block">Speaking</span>
                  <span className="text-slate-300 font-medium">{student.speaking}</span>
                </div>
                <div>
                  <span className="text-[8px] text-slate-500 block">Overall</span>
                  <span className="text-emerald-400 font-bold">{student.overall}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
