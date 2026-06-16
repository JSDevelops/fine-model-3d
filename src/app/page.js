"use client";

import React from 'react'
import Link from 'next/link'
import { Smartphone, GraduationCap, ShieldCheck, Sparkles, BookOpen, Utensils, CheckCircle } from 'lucide-react'

export default function LandingPage() {
  const portalCards = [
    {
      title: "📱 แพลตฟอร์มนักเรียน (Student App)",
      desc: "ศึกษาคำศัพท์วัสดุอุปกรณ์แบบสแกน AR 3D, ฝึกประเมินบทสนทนาภาษาอังกฤษกับ AI และสู้เควสจำลองร้านอาหาร 3 มิติ เพื่อรับคะแนนประเมินลงพอร์ตโฟลิโอ",
      href: "/student",
      theme: "border-[#d4af37]/30 hover:border-[#d4af37] bg-[#d4af37]/5 hover:bg-[#d4af37]/10",
      btnText: "เปิดใช้งาน Student Mobile App",
      icon: <Smartphone className="w-8 h-8 text-[#d4af37]" />
    },
    {
      title: "👩‍🏫 พอร์ทัลจัดการเรียนสอนของครู (Teacher Portal)",
      desc: "ออกแบบแผนจัดการเรียนรู้วิชาบริการอาหารรายสัปดาห์ (F-I-N-E), สร้างโจทย์บริการจำลองด้วย AI, ตรวจสอบรายงานผลการประเมิน KSA-C และแก้ไขข้อสอบ",
      href: "/teacher",
      theme: "border-cyan-500/20 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10",
      btnText: "เปิดใช้งาน Teacher Management Portal",
      icon: <GraduationCap className="w-8 h-8 text-cyan-400" />
    },
    {
      title: "🛡️ คอนโซลแอดมินระบบ (Admin Console)",
      desc: "ตรวจสอบไดอะแกรมสถาปัตยกรรมทางเทคนิคของ REST API, ตั้งค่าอนุญาตเปิด-ปิดสิทธิ์ใช้งานรายตำแหน่ง และเช็กโครงสร้างการจัดตารางใน MySQL",
      href: "/admin",
      theme: "border-rose-500/20 hover:border-rose-400 bg-rose-500/5 hover:bg-rose-500/10",
      btnText: "เข้าสู่ระบบแอดมิน Operator Control",
      icon: <ShieldCheck className="w-8 h-8 text-rose-400" />
    }
  ]

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden select-none">
      
      {/* Background radial glowing effects */}
      <div className="absolute top-0 left-1/4 w-[450px] h-[450px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header Info */}
      <header className="glass-panel border-b border-white/5 py-4 px-6 relative z-10">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="FINE-MODEL Logo" className="w-9 h-9 object-contain rounded-lg shadow-[0_0_10px_rgba(212,175,55,0.15)] bg-slate-950/20" />
            <span className="font-heading text-sm font-black tracking-wider text-white">FINE-MODEL</span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/docs"
              className="text-[10px] text-slate-300 hover:text-amber-400 font-bold bg-white/5 hover:bg-white/10 border border-white/10 px-3.5 py-1.5 rounded-full transition flex items-center gap-1.5"
            >
              <BookOpen className="w-3.5 h-3.5" /> คู่มือการใช้งาน (Docs)
            </Link>
            <span className="text-[10px] uppercase bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2.5 py-0.5 rounded-full tracking-widest animate-pulse">
              SMART HOSPITALITY SUITE
            </span>
          </div>
        </div>
      </header>

      {/* Main Hero & Portals List */}
      <main className="flex-grow max-w-6xl mx-auto w-full px-6 py-12 flex flex-col justify-center gap-12 relative z-10">
        
        {/* Intro Hero banner */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/25 text-[#d4af37] text-xs font-bold shadow-lg animate-pulse-slow">
            <Sparkles className="w-4 h-4" /> แพลตฟอร์มจำลองการเรียนรู้ภาษาอังกฤษเพื่อวิชาชีพโรงแรม
          </div>
          
          <h1 className="font-heading text-4xl sm:text-5xl font-black leading-tight tracking-tight text-white mt-2">
            FINE Model 3D AR+AI
            <span className="block text-gold-gradient mt-1">Immersive Hospitality Ecosystem</span>
          </h1>

          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto">
            ยินดีต้อนรับสู่แพลตฟอร์มบูรณาการเทคโนโลยีความจริงเสริม (AR), ปัญญาประดิษฐ์ (AI) และการจำลองร้านอาหาร 3 มิติเชิงปฏิบัติการ กรุณาเลือกเปิดแพลตฟอร์มเข้าใช้ตามบทบาทหน้าที่ของท่านด้านล่างนี้
          </p>
        </div>

        {/* Portals Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          {portalCards.map((card, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-6 rounded-[28px] border transition-all duration-300 hover:-translate-y-1 ${card.theme}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-950/80 flex items-center justify-center border border-white/5 shadow-md">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-sm font-heading font-black text-white">{card.title}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-2">{card.desc}</p>
                </div>
              </div>

              <Link
                href={card.href}
                className="mt-6 w-full text-center bg-slate-950/80 hover:bg-slate-900 border border-white/10 text-white font-bold text-[10px] py-2.5 rounded-xl transition shadow"
              >
                {card.btnText}
              </Link>
            </div>
          ))}
        </div>

      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-5 text-center text-[10px] text-slate-500 relative z-10">
        <p>&copy; 2026 FINE Model 3D AR+AI Hospitality Learning Platform. All rights reserved.</p>
      </footer>

    </div>
  )
}
