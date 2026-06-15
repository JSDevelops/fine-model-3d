"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  ArrowLeft, 
  BookOpen, 
  Smartphone, 
  GraduationCap, 
  Shield, 
  Check, 
  ExternalLink, 
  Key, 
  FileText, 
  Layers, 
  Activity, 
  Camera, 
  Mic, 
  Play, 
  Database 
} from 'lucide-react'

export default function DocsPage() {
  const [activeRole, setActiveRole] = useState('student') // 'student' | 'teacher' | 'admin'

  const credentials = [
    { role: "นักเรียน (Student)", email: "student.siriwan@fineverse.com", password: "รหัสผ่านใดก็ได้ (เช่น 123456)", desc: "ใช้ฝึกฝนผ่านโมเดล 3D/AR, กล้อง AI Scanner, สตรีม Live API และทำเควสจำลอง" },
    { role: "ครูผู้สอน (Teacher)", email: "pimjai@fineverse.com", password: "รหัสผ่านใดก็ได้ (เช่น 123456)", desc: "ใช้ออกแบบแผนการเรียน จัดการคลังไอเทม 3D/AR ประเมินคะแนน และดูรายงานวิเคราะห์ผล" },
    { role: "ผู้ดูแลระบบ (Admin)", email: "admin@fineverse.com", password: "รหัสผ่านใดก็ได้ (เช่น 123456)", desc: "ใช้ควบคุมสิทธิ์ สังเกตผังโครงสร้างการไหลของข้อมูล (System Flow) และฐานข้อมูล" }
  ]

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col justify-between font-sans relative overflow-hidden select-none antialiased">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <header className="glass-panel border-b border-white/5 py-4 px-6 relative z-10">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> กลับหน้าหลักพอร์ทัล
            </Link>
            <div className="h-4 w-px bg-white/10" />
            <span className="font-heading text-sm font-black tracking-wider text-white">FINEVERSE DOCS</span>
          </div>
          <span className="text-[9px] uppercase bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full tracking-widest">
            User Guide v1.0
          </span>
        </div>
      </header>

      {/* Main Body */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-10 relative z-10 space-y-8">
        
        {/* Title */}
        <div className="text-center space-y-2 max-w-xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-bold">
            <BookOpen className="w-3.5 h-3.5" /> คู่มือการใช้งานระบบนิเวศจำลอง
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-black text-gold-gradient tracking-tight">
            FINE Model 3D AR+AI Documentation
          </h1>
          <p className="text-slate-400 text-xs leading-relaxed">
            ขั้นตอนการทดสอบและแนวทางการเรียนรู้สำหรับนักเรียน ครู และผู้ดูแลระบบ บนแพลตฟอร์มจำลองเสมือนจริงเพื่อวิชาชีพบริการโรงแรม
          </p>
        </div>

        {/* Credentials Table Card */}
        <div className="bg-[#151D2F]/40 border border-white/5 p-5 rounded-3xl backdrop-blur-md">
          <h3 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <Key className="w-4 h-4 text-amber-400" /> บัญชีเข้าใช้งานระบบจำลอง (Simulation Credentials)
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[10px] font-sans border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-500 font-bold">
                  <th className="py-2 pr-4">บทบาท (Role)</th>
                  <th className="py-2 pr-4">อีเมล (Email)</th>
                  <th className="py-2 pr-4">รหัสผ่าน (Password)</th>
                  <th className="py-2">หน้าที่การใช้งาน</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-slate-300 font-mono">
                {credentials.map((cred, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-2.5 pr-4 font-sans font-bold text-white flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#d4af37]" /> {cred.role}
                    </td>
                    <td className="py-2.5 pr-4 text-cyan-400 font-semibold">{cred.email}</td>
                    <td className="py-2.5 pr-4 text-slate-400">{cred.password}</td>
                    <td className="py-2.5 font-sans text-slate-400 leading-snug">{cred.desc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Dynamic Role Tab Buttons */}
        <div className="flex bg-slate-950 p-1 rounded-2xl border border-white/5 max-w-md mx-auto shrink-0">
          <button
            onClick={() => setActiveRole('student')}
            className={`flex-grow py-2 text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeRole === 'student'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-4 h-4" /> 1. นักเรียน (Student)
          </button>
          <button
            onClick={() => setActiveRole('teacher')}
            className={`flex-grow py-2 text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeRole === 'teacher'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> 2. ครูผู้สอน (Teacher)
          </button>
          <button
            onClick={() => setActiveRole('admin')}
            className={`flex-grow py-2 text-xs font-black rounded-xl transition flex items-center justify-center gap-1.5 ${
              activeRole === 'admin'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" /> 3. แอดมิน (Admin)
          </button>
        </div>

        {/* Tab Guides Content */}
        <div className="space-y-4">
          
          {/* STUDENT GUIDE */}
          {activeRole === 'student' && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">Step 1</span>
                  <Smartphone className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">เข้าสู่ระบบพอร์ทัลนักเรียน</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  เข้าหน้าเว็บเลือกพอร์ทัล **"Student App"** กรอกอีเมล `student.siriwan@fineverse.com` และป้อนรหัสผ่านใดๆ เพื่อสวมบทบาทเป็นผู้เรียนฝึกฝน
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">Step 2</span>
                  <Camera className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">F - Familiarize (เรียนรู้อุปกรณ์ & AI Scanner)</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  หมุนโมเดล 3D แบบโฮโลแกรมเพื่อทำความเข้าใจอุปกรณ์บริการ หรือสลับมาที่ **"Gemini AI Scanner"** เพื่อเปิดกล้องถ่ายอุปกรณ์จริงรอบตัว ให้ AI ระบุชื่อ คำอธิบาย วิธีใช้งาน และนำข้อความมาฝึกออกเสียง
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">Step 3</span>
                  <Mic className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">I - Interact (ฝึกโต้ตอบสำเนียงภาษากับ AI)</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ฝึกพูดประโยคบริการลูกค้าที่ถูกต้องตามสคริปต์ หรือสลับไปที่ **"Gemini Live Coach"** สตรีมเสียงไมค์สดสองทางและภาพกล้อง เพื่อโต้ตอบกับอาจารย์จำลอง AI แบบมีเสียงและแสดงบทสนทนา (Live Transcript) สด ๆ
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">Step 4</span>
                  <Play className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">N - Navigate (สถานการณ์จำลอง 3D)</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  เดินทางบนด่านจำลองร้านอาหาร 3 มิติ เพื่อฝึกแก้ปัญหาเฉพาะหน้าระหว่างทำงาน เช่น จัดการแก้ไขเหตุการณ์ออเดอร์ช้า หรือการทวนรายการสั่งอาหารให้กับลูกค้า
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">Step 5</span>
                  <FileText className="w-5 h-5 text-amber-400" />
                </div>
                <h3 className="text-sm font-bold text-white">E - Exhibit & Portfolio (พอร์ตการประเมินวิชาชีพ)</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  เข้าด่านทดสอบรับออเดอร์ Rubrics เพื่อให้ระบบวิเคราะห์คะแนนสมรรถนะ KSA-C และเข้าไปตรวจสอบรายงานพอร์ตโฟลิโอส่วนตัว สรุปผลคะแนนเฉลี่ยการพูดและทักษะ เพื่อดาวน์โหลดประกาศนียบัตรวิชาชีพ
                </p>
              </div>
            </div>
          )}

          {/* TEACHER GUIDE */}
          {activeRole === 'teacher' && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37] font-bold border border-[#d4af37]/20 px-2 py-0.5 rounded-full">Week Plan</span>
                  <GraduationCap className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">4.1 Lesson Plan Builder</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ออกแบบแผนการสอนวิชาบริการอาหารรายสัปดาห์ ครูสามารถใช้ระบบ **CRUD** เพื่อบันทึก, เพิ่มแผนใหม่, คืนค่าเริ่มต้น หรือลบแผนการสอน โดยแผนที่บันทึกจะบันทึกคงอยู่อัตโนมัติในฐานข้อมูลเครื่อง
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37] font-bold border border-[#d4af37]/20 px-2 py-0.5 rounded-full">AI Scenario</span>
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">4.2 AI Scenario Builder</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ครูกำหนดสคริปต์บทสนทนาและโจทย์ตอบคำถามภาษาอังกฤษให้กับ AI Coach เพื่อใช้ป้อนความท้าทายประเมินเสียงพูดของนักเรียนในด่านต่าง ๆ
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37] font-bold border border-[#d4af37]/20 px-2 py-0.5 rounded-full">Analytics</span>
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">4.3 Class Analytics</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ติดตามภาพรวมความก้าวหน้าของห้องเรียน ดูเปอร์เซ็นต์อัตราการสอบผ่าน KSA-C ของผู้เรียนทุกคน และเจาะลึกรายละเอียดประวัติผลคะแนนรายบุคคล
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37] font-bold border border-[#d4af37]/20 px-2 py-0.5 rounded-full">Rubric Code</span>
                  <FileText className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">4.4 Assessment Builder</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  กำหนดเกณฑ์รูบริกประเมินตัดสินคะแนน (ระดับเชี่ยวชาญ/ดี/ปรับปรุง) และตั้งค่าข้อสอบสุ่มแบบฟอร์มคำถามประเมินสมรรถนะ
                </p>
              </div>

              {/* Step 5 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3 md:col-span-2">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-[#d4af37]/10 text-[#d4af37] font-bold border border-[#d4af37]/20 px-2 py-0.5 rounded-full">AR Manager</span>
                  <Camera className="w-5 h-5 text-cyan-400" />
                </div>
                <h3 className="text-sm font-bold text-white">4.5 AR & 3D Items Manager (แผงสร้างโฮโลแกรมครู)</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  สร้างและปรับแต่งโมเดล 3D แบบกำหนดเอง (เช่น แก้วกาแฟ, ขวดไวน์) โดยปรับแต่งทรง (Box, Cylinder, Sphere) ขนาด มิติความกว้าง สีสัน และข้อสอบ Vocabulary Quiz เพื่อเผยแพร่ไปให้นักเรียนสแกนเรียนรู้แบบเรียลไทม์
                </p>
              </div>
            </div>
          )}

          {/* ADMIN GUIDE */}
          {activeRole === 'admin' && (
            <div className="grid md:grid-cols-2 gap-4">
              {/* Step 1 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20 px-2 py-0.5 rounded-full">Flow Diagram</span>
                  <Shield className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-sm font-bold text-white">1. System Flowchart</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ตรวจสอบแผนผังแสดงสถาปัตยกรรมการไหลของข้อมูลในระบบจาก Frontend ไปยัง Backend API และการจัดการ Assets บนคลาวด์
                </p>
              </div>

              {/* Step 2 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20 px-2 py-0.5 rounded-full">Roles Check</span>
                  <Layers className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-sm font-bold text-white">2. Role Permissions</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  แผงควบคุมหลักสำหรับการเปิด-ปิดสิทธิ์การเข้าถึงฟีเจอร์แต่ละบทบาท (เช่น การอนุญาตให้นักเรียนเปิดใช้กล้อง AR หรืออนุญาตให้ครูออกแบบแผนการสอน)
                </p>
              </div>

              {/* Step 3 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20 px-2 py-0.5 rounded-full">Tech Stack</span>
                  <Activity className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-sm font-bold text-white">5.1 Technology Stack</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ตรวจสอบชุดเทคโนโลยีที่รันอยู่บนระบบนิเวศจำลอง (Next.js, Laravel 11, Three.js, MySQL, Redis, OpenAI Whisper, Google Gemini)
                </p>
              </div>

              {/* Step 4 */}
              <div className="bg-[#151D2F]/30 border border-white/5 p-5 rounded-3xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[9px] uppercase tracking-wider bg-rose-500/10 text-rose-400 font-bold border border-rose-500/20 px-2 py-0.5 rounded-full">SQL Database</span>
                  <Database className="w-5 h-5 text-rose-400" />
                </div>
                <h3 className="text-sm font-bold text-white">5.3 Database Schema</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-sans">
                  ตรวจสอบผังความสัมพันธ์โครงสร้างตารางข้อมูลใน MySQL (เช่น ตารางนักเรียน, แผนบทเรียน, ข้อมูลประเมินเสียงพูด, บันทึกประวัติสมรรถนะ)
                </p>
              </div>
            </div>
          )}

        </div>

      </main>

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-5 text-center text-[10px] text-slate-500 relative z-10">
        <p>&copy; 2026 FINE Model 3D AR+AI Hospitality Learning Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}
