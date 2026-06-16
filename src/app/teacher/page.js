"use client";

import React, { useState } from 'react'
import LessonBuilder from '../../components/teacher/LessonBuilder'
import ScenarioBuilder from '../../components/teacher/ScenarioBuilder'
import Analytics from '../../components/teacher/Analytics'
import AssessmentBuilder from '../../components/teacher/AssessmentBuilder'
import ARItemsManager from '../../components/teacher/ARItemsManager'
import { GraduationCap, ArrowLeft, Calendar, Users, TrendingUp, Mail, Lock, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function TeacherPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [teacherTab, setTeacherTab] = useState('lesson')

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setLoginError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    if (email.toLowerCase().includes('teacher') || email.toLowerCase() === 'pimjai@fine-model.com') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('อีเมลผู้ใช้งานไม่ถูกต้อง (แนะนำใช้: pimjai@fine-model.com)')
    }
  }

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
            <GraduationCap className="w-5 h-5 text-amber-500" />
            Teacher Management Portal
            <span className="text-[9px] uppercase bg-amber-500/10 text-amber-400 font-bold border border-amber-500/20 px-2 py-0.5 rounded-full">
              ครูผู้สอน
            </span>
          </h1>
        </div>

        <span className="text-xs text-slate-400 font-medium hidden sm:inline">
          รายวิชาเรียน: การบริการอาหารและเครื่องดื่ม (20701-2020)
        </span>
      </header>

      {!isLoggedIn ? (
        /* DESKTOP TEACHER LOGIN PORTAL */
        <div className="flex-1 flex items-center justify-center p-6 relative z-10 font-sans">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="w-full max-w-md bg-[#151d2f]/50 border border-white/5 p-8 rounded-3xl backdrop-blur-md shadow-2xl">
            <div className="text-center mb-6">
              <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <GraduationCap className="w-7 h-7 text-[#d4af37]" />
              </div>
              <h3 className="text-lg font-heading font-black text-white">เข้าสู่ระบบพอร์ทัลครูผู้สอน</h3>
              <p className="text-xs text-slate-400 mt-1">บริหารจัดการแผนบทเรียน การประเมินผล และสถิติวิเคราะห์ KSA-C</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-500 font-bold block">อีเมลเข้าใช้งานวิชาการสอน (Teacher Email)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="pimjai@fine-model.com"
                    className="w-full bg-slate-950/80 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-500 font-bold block">รหัสผ่าน (Password)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-slate-950/80 border border-white/5 rounded-xl pl-10 pr-4 py-2.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
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
                className="w-full bg-[#d4af37] hover:bg-[#f59e0b] text-slate-950 font-bold text-xs py-3.5 rounded-xl shadow-lg shadow-amber-500/10 transition-all"
              >
                เข้าสู่ระบบบริการวิชาการ
              </button>
            </form>

            <div className="mt-6 text-center text-[9px] text-slate-500 leading-snug">
              <span>*กรอกรหัสผ่านใดๆ เพื่อเข้าระบบเป็น ครูพิมพ์ใจ แสนดี</span>
            </div>
          </div>
        </div>
      ) : (
        /* TEACHER DASHBOARD VIEW */
        <main className="flex-grow max-w-7xl mx-auto w-full p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-4 gap-6 items-stretch font-sans">
          {/* Left Side: Sidebar navigation tabs */}
          <div className="lg:col-span-1 bg-[#151D2F]/45 border border-white/5 rounded-3xl p-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block mb-2">เมนูจัดการเรียนรู้</span>
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => setTeacherTab('lesson')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    teacherTab === 'lesson'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  📖 4.1 Lesson Plan Builder
                </button>
                <button
                  onClick={() => setTeacherTab('scenario')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    teacherTab === 'scenario'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  ⚡ 4.2 AI Scenario Builder
                </button>
                <button
                  onClick={() => setTeacherTab('analytics')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    teacherTab === 'analytics'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  📊 4.3 Class Analytics
                </button>
                <button
                  onClick={() => setTeacherTab('assessment')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    teacherTab === 'assessment'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  📋 4.4 Assessment Builder
                </button>
                <button
                  onClick={() => setTeacherTab('ar_items')}
                  className={`text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center gap-2 border ${
                    teacherTab === 'ar_items'
                      ? 'bg-[#d4af37]/10 border-[#d4af37]/35 text-[#d4af37] shadow-sm'
                      : 'bg-transparent border-transparent text-slate-400 hover:text-white'
                  }`}
                >
                  🎨 4.5 AR & 3D Items Manager
                </button>
              </div>
            </div>

            {/* Quick info card */}
            <div className="mt-6 pt-4 border-t border-white/5 space-y-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#d4af37]" />
                <span>เรียน 18 สัปดาห์ (สัปดาห์ละ 1 หน่วย)</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" />
                <span>ชั้นเรียน: ปวช.1 โรงแรม (120 คน)</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>เป้าหมายผ่านเกณฑ์ KSA-C: &gt;70%</span>
              </div>
            </div>
          </div>

          {/* Right Side: Tab Workspaces */}
          <div className="lg:col-span-3 bg-slate-900/30 border border-white/5 p-6 rounded-3xl relative overflow-hidden flex flex-col min-h-[500px]">
            <div className="absolute top-0 left-1/4 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex-grow z-10">
              {teacherTab === 'lesson' && <LessonBuilder />}
              {teacherTab === 'scenario' && <ScenarioBuilder />}
              {teacherTab === 'analytics' && <Analytics />}
              {teacherTab === 'assessment' && <AssessmentBuilder />}
              {teacherTab === 'ar_items' && <ARItemsManager />}
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
