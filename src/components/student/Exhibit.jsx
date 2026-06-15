"use client";

import React from 'react'
import { Award, ShieldAlert, Star, ShieldCheck, CheckCircle2 } from 'lucide-react'

export default function Exhibit() {
  const rubrics = [
    {
      name: "Greeting & Welcome (การต้อนรับลูกค้า)",
      score: 25,
      max: 25,
      feedback: "กล่าวต้อนรับสุภาพ มีอายคอนแทคและวางท่าทางเหมาะสมตามมาตรฐานโรงแรมระดับ 5 ดาว"
    },
    {
      name: "Taking Orders (การรับคำสั่งอาหาร)",
      score: 25,
      max: 25,
      feedback: "จดออเดอร์แม่นยำ ทวนออเดอร์สม่ำเสมอเป็นภาษาอังกฤษได้อย่างคล่องแคล่วและถูกต้อง"
    },
    {
      name: "Recommend Menu (การแนะนำรายการอาหาร)",
      score: 20,
      max: 25,
      feedback: "เสนอตัวเลือกเชฟแนะนำได้ดี แต่อาจเสริมรายละเอียดส่วนผสม/วัตถุดิบให้น่าสนใจยิ่งขึ้น"
    },
    {
      name: "Handling Complaints (การเผชิญหน้าและแก้ปัญหา)",
      score: 20,
      max: 25,
      feedback: "นอบน้อม ขอโทษและเสนอทางแก้ไขปัญหาความล่าช้าของเครื่องดื่มได้รวดเร็ว ดึงอารมณ์ลูกค้าให้ดีขึ้นได้"
    },
    {
      name: "Professional Attitude (บุคลิกภาพจิตบริการ)",
      score: 5,
      max: 5,
      feedback: "แต่งกายเรียบร้อย ยิ้มแย้มแจ่มใส รักษามารยาทวิชาชีพได้อย่างยอดเยี่ยม"
    }
  ]

  const totalScore = rubrics.reduce((acc, curr) => acc + curr.score, 0)
  const maxScore = rubrics.reduce((acc, curr) => acc + curr.max, 0)
  const percentage = Math.round((totalScore / maxScore) * 100)

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Overview Card */}
      <div className="bg-[#151D2F]/60 border border-[#d4af37]/25 p-5 rounded-2xl relative overflow-hidden flex items-center justify-between shadow-lg">
        {/* Decorative backdrop */}
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />

        <div className="space-y-1">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">Performance Assessment</span>
          <h2 className="text-xl font-heading font-black text-white">รายงานประเมินสมรรถนะวิชาชีพ</h2>
          <p className="text-slate-400 text-xs mt-0.5">การรับออเดอร์ภาษาอังกฤษด้วย FINE Model 3D</p>
        </div>

        <div className="text-center shrink-0">
          <div className="w-16 h-16 rounded-full border-2 border-[#d4af37] flex flex-col justify-center items-center bg-[#d4af37]/10 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
            <span className="text-lg font-heading font-black text-white leading-none">{totalScore}</span>
            <span className="text-[9px] text-[#d4af37] border-t border-[#d4af37]/30 mt-0.5 pt-0.5 w-8 font-bold">/{maxScore}</span>
          </div>
          <span className="text-[9px] font-bold text-amber-400 uppercase tracking-wider block mt-1">ดีเยี่ยม (Excellent)</span>
        </div>
      </div>

      {/* Rubrics breakdown list */}
      <div className="mt-4 flex-1 space-y-3 overflow-y-auto max-h-[260px] pr-1">
        {rubrics.map((r, idx) => (
          <div key={idx} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl hover:border-slate-800 transition">
            <div className="flex items-start justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-200">{r.name}</h4>
                <p className="text-[10px] text-slate-400 mt-1 leading-relaxed">
                  {r.feedback}
                </p>
              </div>
              <div className="bg-white/5 border border-white/5 px-2.5 py-1 rounded-lg text-center shrink-0 ml-4">
                <span className="text-xs font-bold text-amber-400">{r.score}</span>
                <span className="text-[9px] text-slate-500">/{r.max}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Scorecard with Stars */}
      <div className="mt-4 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
            <Award className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold">สมรรถนะการปฏิบัติงาน</span>
            <span className="text-xs font-bold text-white block mt-0.5">ผ่านเกณฑ์มาตรฐานวิชาชีพระดับสูง</span>
          </div>
        </div>

        <div className="flex items-center gap-0.5">
          {[1, 2, 3, 4, 5].map((s) => (
            <Star
              key={s}
              className={`w-4 h-4 ${
                s <= 5 ? 'fill-amber-400 text-amber-400' : 'text-slate-700'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
