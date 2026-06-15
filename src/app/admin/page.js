"use client";

import React, { useState } from 'react'
import SystemFlow from '../../components/admin/SystemFlow'
import SchemaViewer from '../../components/admin/SchemaViewer'
import UserAccess from '../../components/admin/UserAccess'
import { ShieldAlert, ArrowLeft, HardDrive, Terminal, Shield, RefreshCw, Mail, Lock } from 'lucide-react'
import Link from 'next/link'

export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [adminTab, setAdminTab] = useState('flow')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setLoginError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    if (email.toLowerCase().includes('admin') || email.toLowerCase() === 'admin@fineverse.com') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('อีเมลผู้ใช้งานไม่ถูกต้อง (แนะนำใช้: admin@fineverse.com)')
    }
  }

  const techStack = [
    { title: "Frontend Layer", tech: "Next.js, Tailwind CSS, Shadcn/ui, Three.js, PWA", desc: "สถาปัตยกรรมตอบสนองความเร็วสูงและเรนเดอร์กราฟิกสามมิติบนบราวเซอร์อย่างประณีต" },
    { title: "Backend API Layer", tech: "Laravel 11, Sanctum, Spatie, Queue, Node.js", desc: "การควบคุมความปลอดภัย คิวงานประมวลผลวิดีโอ/บันทึกเสียง และระบบจัดการผู้ใช้งาน" },
    { title: "Database & Storage", tech: "MySQL, Redis Cache, Cloud Bucket Storage", desc: "ฐานข้อมูลบันทึกคะแนนสมรรถนะผู้เรียนและเก็บบันทึกวิดีโอเสียงสอบเพื่อทำพอร์ต" },
    { title: "AI Speech & Engine", tech: "OpenAI GPT-4o, Whisper API, Web Speech API", desc: "ระบบคีย์เวิร์ดวิเคราะห์เสียงประเมินคะแนนสะเนียงและความถูกต้องบทสนทนาเรียบง่าย" }
  ]

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col font-sans select-none antialiased">
      
      {/* Header */}
      <header className="glass-panel border-b border-white/5 py-4 px-6 flex justify-between items-center z-10 font-sans">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full transition"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> กลับหน้าหลักพอร์ทัล
          </Link>
          <div className="h-6 w-px bg-white/10" />
          <h1 className="font-heading text-md font-black text-white flex items-center gap-1.5 leading-none">
            <Shield className="w-5 h-5 text-amber-500" />
            Admin Operator Control
            <span className="text-[9px] uppercase bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">
              ผู้ดูแลระบบ
            </span>
          </h1>
        </div>

        <span className="text-xs text-slate-400 font-mono flex items-center gap-1.5 hidden sm:flex">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          SYSTEM OK (PORT: 3000)
        </span>
      </header>

      {!isLoggedIn ? (
        /* DESKTOP ADMIN LOGIN CONSOLE */
        <div className="flex-grow flex items-center justify-center p-6 relative z-10 font-sans">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-md bg-[#151d2f]/50 border border-white/5 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Shield className="w-7 h-7 text-rose-400" />
              </div>
              <h3 className="text-lg font-heading font-black text-white">เข้าสู่ระบบแอดมินหลังบ้าน</h3>
              <p className="text-xs text-slate-400 mt-1">ล็อกอินเข้าจัดการโครงสร้างระบบฐานข้อมูลและการไหลของข้อมูล</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-500 font-bold block font-mono">ระบบจัดการแอดมินอีเมล (Admin Email)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@fineverse.com"
                    className="w-full bg-slate-950/80 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-500 font-bold block font-mono">รหัสควบคุมความปลอดภัย (Admin Password)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              {loginError && (
                <div className="bg-rose-500/15 border border-rose-500/30 p-2.5 rounded-xl text-[10px] text-rose-400 flex items-center gap-1.5 leading-snug">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#f59e0b] text-slate-950 font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-amber-500/10 transition-all font-mono"
              >
                ACCESS SYSTEM CONSOLE
              </button>
            </form>

            <div className="mt-6 text-center text-[9px] text-slate-500 leading-snug font-mono">
              <span>*กรอกรหัสผ่านใดๆ เพื่อเข้าระบบเป็น แอดมินสุทธิพจน์</span>
            </div>
          </div>
        </div>
      ) : (
        /* ADMIN DASHBOARD VIEW */
        <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch font-sans">
          
          {/* Left Side: Sidebar navigation tabs */}
          <div className="lg:col-span-1 bg-[#151D2F]/45 border border-white/5 rounded-3xl p-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">ผังผู้ดูแลระบบ</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setAdminTab('flow')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    adminTab === 'flow'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  🛠️ 1. System Flowchart
                </button>
                <button
                  onClick={() => setAdminTab('access')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    adminTab === 'access'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  👥 2. Role Permissions
                </button>
                <button
                  onClick={() => setAdminTab('schema')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    adminTab === 'schema'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  🗄️ 5.3 Database Schema
                </button>
                <button
                  onClick={() => setAdminTab('stack')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    adminTab === 'stack'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 5.1 Technology Stack
                </button>
              </div>
            </div>

            {/* Console specs */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-3 text-[10px] text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[#d4af37]" />
                <span>Shell: Next.js + Turbopack</span>
              </div>
              <div className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-cyan-400" />
                <span>DB Host: mysql://localhost</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>API Gateway: REST Routing</span>
              </div>
            </div>
          </div>

          {/* Right Side: Tab Workspaces */}
          <div className="lg:col-span-3 bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden flex flex-col min-h-[500px]">
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex-grow z-10">
              {adminTab === 'flow' && <SystemFlow />}
              {adminTab === 'access' && <UserAccess />}
              {adminTab === 'schema' && <SchemaViewer />}
              
              {adminTab === 'stack' && (
                <div className="space-y-3 font-sans">
                  <div>
                    <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block font-sans">Technology Stack</span>
                    <h2 className="text-lg font-heading font-black text-white">5.1 องค์ประกอบซอฟต์แวร์ระบบ (Tech Stack)</h2>
                    <p className="text-slate-400 text-xs mt-0.5 font-sans">เครื่องมือและองค์ประกอบเทคโนโลยีหลักที่นำมารันแพลตฟอร์ม</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 max-h-[220px] overflow-y-auto pr-1">
                    {techStack.map((tech, idx) => (
                      <div key={idx} className="bg-slate-950/50 border border-white/5 p-3 rounded-xl hover:border-slate-800 transition text-[10px] font-sans">
                        <span className="text-[#d4af37] font-black uppercase tracking-wider block mb-1">
                          {tech.title}
                        </span>
                        <p className="text-white font-mono font-bold text-[9px] mb-1">{tech.tech}</p>
                        <p className="text-slate-400 leading-relaxed text-[9px]">{tech.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </main>
      )}

      {/* Footer */}
      <footer className="glass-panel border-t border-white/5 py-4 text-center text-[10px] text-slate-500">
        <p>&copy; 2026 FINE Model 3D AR+AI Hospitality Learning Platform. All rights reserved.</p>
      </footer>

    </div>
  )
}
