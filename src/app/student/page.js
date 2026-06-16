"use client";

import React, { useState } from 'react'
import Familiarize from '../../components/student/Familiarize'
import Interact from '../../components/student/Interact'
import Navigate from '../../components/student/Navigate'
import Exhibit from '../../components/student/Exhibit'
import Portfolio from '../../components/student/Portfolio'
import { Smartphone, Cpu, BookOpen, Award, UserCheck, ArrowLeft, Lock, Mail, ShieldAlert } from 'lucide-react'
import Link from 'next/link'

export default function StudentPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [studentTab, setStudentTab] = useState('familiarize')
  const [studentScores, setStudentScores] = useState([])

  const handleSaveStudentScore = (activityName, scoreVal) => {
    setStudentScores(prev => [{ name: activityName, score: scoreVal, date: new Date().toLocaleDateString() }, ...prev])
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) {
      setLoginError('กรุณากรอกอีเมลและรหัสผ่าน')
      return
    }
    // Simulate validation
    if (email.toLowerCase().includes('student') || email.toLowerCase() === 'student.siriwan@fine-model.com') {
      setIsLoggedIn(true)
      setLoginError('')
    } else {
      setLoginError('อีเมลผู้ใช้งานไม่ถูกต้อง (แนะนำใช้: student.siriwan@fine-model.com)')
    }
  }

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Back button */}
      <div className="w-full max-w-md mb-3 flex justify-between items-center z-10 font-sans">
        <Link
          href="/"
          className="text-xs text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full transition"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> กลับหน้าหลักพอร์ทัล
        </Link>
        <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
          Student Mobile App
        </span>
      </div>

      {/* Phone Device Mockup Frame */}
      <div className="w-full max-w-md bg-[#0b101e] border-4 border-slate-950 rounded-[36px] shadow-2xl relative overflow-hidden flex flex-col h-[525px] justify-between z-10">
        
        {/* Phone Speaker Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-4.5 bg-slate-950 rounded-b-xl z-50 flex items-center justify-center">
          <div className="w-12 h-1 bg-slate-800 rounded-full" />
        </div>

        {!isLoggedIn ? (
          /* MOBILE LOGIN FORM */
          <div className="flex-1 flex flex-col justify-center px-6 pt-10 pb-6 font-sans">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3">
                <Smartphone className="w-6 h-6 text-[#d4af37]" />
              </div>
              <h3 className="text-md font-heading font-black text-white">เข้าสู่ระบบนักเรียน</h3>
              <p className="text-[10px] text-slate-400 mt-1">ล็อกอินเข้าเรียนเพื่อผ่านเกณฑ์สมรรถนะ FINE Model</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[9px] uppercase text-slate-500 font-bold block">อีเมลเข้าใช้งาน (Email Address)</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student.siriwan@fine-model.com"
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
                <div className="bg-rose-500/15 border border-rose-500/30 p-2.5 rounded-xl text-[9px] text-rose-400 flex items-center gap-1.5 leading-snug">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  <span>{loginError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#d4af37] hover:bg-[#f59e0b] text-slate-950 font-bold text-xs py-3 rounded-xl shadow-lg shadow-amber-500/10 transition-all"
              >
                เข้าสู่ระบบบริการนักเรียน
              </button>
            </form>

            <div className="mt-6 text-center text-[9px] text-slate-500 leading-snug">
              <span>*กรอกรหัสผ่านใดๆ เพื่อเข้าระบบเป็น Student Siriwan</span>
            </div>
          </div>
        ) : (
          /* MOBILE DASHBOARD SCREEN */
          <>
            <div className="flex-1 pt-6 px-4 pb-20 overflow-y-auto">
              {studentTab === 'familiarize' && <Familiarize />}
              {studentTab === 'interact' && <Interact onSaveScore={handleSaveStudentScore} />}
              {studentTab === 'navigate' && <Navigate onSaveScore={handleSaveStudentScore} />}
              {studentTab === 'exhibit' && <Exhibit />}
              {studentTab === 'portfolio' && <Portfolio scoreList={studentScores} />}
            </div>

            {/* Mobile Bottom Navigation Bar */}
            <nav className="absolute bottom-0 w-full bg-[#151D2F]/90 backdrop-blur-md border-t border-white/5 py-2 px-4 flex justify-between items-center z-45">
              <button
                onClick={() => setStudentTab('familiarize')}
                className={`flex flex-col items-center gap-1.5 ${studentTab === 'familiarize' ? 'text-[#d4af37] font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Smartphone className="w-4 h-4" />
                <span className="text-[8px] font-sans">F-Familiarize</span>
              </button>
              <button
                onClick={() => setStudentTab('interact')}
                className={`flex flex-col items-center gap-1.5 ${studentTab === 'interact' ? 'text-[#d4af37] font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Cpu className="w-4 h-4" />
                <span className="text-[8px] font-sans">I-Interact</span>
              </button>
              <button
                onClick={() => setStudentTab('navigate')}
                className={`flex flex-col items-center gap-1.5 ${studentTab === 'navigate' ? 'text-[#d4af37] font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <BookOpen className="w-4 h-4" />
                <span className="text-[8px] font-sans">N-Navigate</span>
              </button>
              <button
                onClick={() => setStudentTab('exhibit')}
                className={`flex flex-col items-center gap-1.5 ${studentTab === 'exhibit' ? 'text-[#d4af37] font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <Award className="w-4 h-4" />
                <span className="text-[8px] font-sans">E-Exhibit</span>
              </button>
              <button
                onClick={() => setStudentTab('portfolio')}
                className={`flex flex-col items-center gap-1.5 ${studentTab === 'portfolio' ? 'text-[#d4af37] font-bold' : 'text-slate-500 hover:text-slate-300'}`}
              >
                <UserCheck className="w-4 h-4" />
                <span className="text-[8px] font-sans">Portfolio</span>
              </button>
            </nav>
          </>
        )}

      </div>
    </div>
  )
}
