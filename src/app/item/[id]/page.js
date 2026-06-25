"use client";

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { ArrowLeft, Volume2, CheckCircle, XCircle, RotateCcw } from 'lucide-react'

const ARScene = dynamic(() => import('../../../components/3d/ARScene'), { ssr: false })

const SAMPLE_ITEMS = [
  {
    id: 'sample_cup', title: 'Espresso Coffee Cup', thai: 'แก้วกาแฟเอสเปรสโซ่',
    pronunciation: '/e-spres-oh/',
    description: 'ถ้วยเซรามิกขนาดเล็ก (Demitasse) สำหรับเสิร์ฟกาแฟเอสเปรสโซ่ พร้อมจานรอง',
    how_to_use: 'วางถ้วยบนจานรองโดยหันหูจับไปทางขวา เสิร์ฟพร้อมช้อนชาเล็กและน้ำตาล 1-2 ก้อน',
    sentence: 'Please serve the double espresso in a pre-heated cup.',
    audioText: 'Espresso Coffee Cup',
    shape: { type: 'cylinder', color: '#fafafa', size: [0.3, 0.4, 32] },
    quiz: { q: 'จานรองสำหรับถ้วยแก้วร้อน เรียกว่าอะไร?', answers: ['Saucer', 'Platter', 'Bowl'], correct: 0 }
  },
  {
    id: 'sample_shaker', title: 'Cocktail Shaker', thai: 'กระบอกเขย่าค็อกเทล',
    pronunciation: '/shak-er/',
    description: 'กระบอกโลหะสแตนเลสสำหรับเขย่าผสมเครื่องดื่มและกรองน้ำแข็งออก',
    how_to_use: 'ใส่ส่วนผสมและน้ำแข็ง ปิดฝาให้แน่น เขย่าแรงๆ 10-15 วินาที กรองลงแก้วที่เตรียมไว้',
    sentence: 'Pour the ingredients into the cocktail shaker with ice.',
    audioText: 'Cocktail Shaker',
    shape: { type: 'cylinder', color: '#94a3b8', size: [0.25, 0.6, 32] },
    quiz: { q: 'กระบอกเขย่าค็อกเทลมักทำจากวัสดุประเภทใด?', answers: ['Stainless Steel', 'Glass', 'Plastic'], correct: 0 }
  },
  {
    id: 'sample_wine_glass', title: 'Wine Glass', thai: 'แก้วไวน์',
    pronunciation: '/waɪn glæs/',
    description: 'แก้วก้านยาวสำหรับเสิร์ฟไวน์แดงหรือไวน์ขาว จับที่ก้านเพื่อรักษาอุณหภูมิ',
    how_to_use: 'จับบริเวณก้านแก้วเสมอ เทไวน์ประมาณ 1/3 ของแก้ว จัดวางทางขวาของจานผู้รับบริการ',
    sentence: 'Hold the wine glass by its stem, not the bowl.',
    audioText: 'Wine Glass',
    shape: { type: 'cylinder', color: '#e8d5b7', size: [0.2, 0.5, 32] },
    quiz: { q: 'ส่วนใดของแก้วไวน์ที่ควรจับเพื่อไม่ให้มือถ่ายความร้อน?', answers: ['Stem', 'Bowl', 'Base'], correct: 0 }
  },
  {
    id: 'sample_plate', title: 'Dinner Plate', thai: 'จานอาหารหลัก',
    pronunciation: '/ˈdɪnər pleɪt/',
    description: 'จานเซรามิกกลมสำหรับเสิร์ฟอาหารจานหลัก (Main Course) ขนาดมาตรฐาน 27-30 ซม.',
    how_to_use: 'วางตรงกลางหน้าผู้รับบริการ ห่างจากขอบโต๊ะประมาณ 2 ซม. จัดอาหารให้เป็นระเบียบและสวยงาม',
    sentence: 'Place the dinner plate in the center of the cover.',
    audioText: 'Dinner Plate',
    shape: { type: 'cylinder', color: '#f1f5f9', size: [0.55, 0.04, 32] },
    quiz: { q: 'จานสำหรับเสิร์ฟอาหารจานหลัก เรียกว่าอะไร?', answers: ['Dinner Plate', 'Side Plate', 'Soup Bowl'], correct: 0 }
  }
]

export default function ItemPage() {
  const { id } = useParams()
  const [item, setItem] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [quizState, setQuizState] = useState('study') // study | question | correct | wrong
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  useEffect(() => {
    if (!id) return

    // 1. Check if it's a custom QR code containing inline base64 encoded item details
    if (id === 'custom') {
      try {
        const searchParams = new URLSearchParams(window.location.search)
        const d = searchParams.get('d')
        if (d) {
          const jsonStr = decodeURIComponent(atob(d).split('').map((c) => {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
          }).join(''))
          const parsed = JSON.parse(jsonStr)
          if (parsed) {
            setItem(parsed)
            return
          }
        }
      } catch (e) {
        console.error("Error decoding inline custom QR data:", e)
      }
    }

    // 2. Otherwise lookup in localStorage (synced on same browser) or fallback to SAMPLE_ITEMS
    const cached = localStorage.getItem('fineverse_ar_items')
    let items = SAMPLE_ITEMS
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (parsed && parsed.length > 0) items = parsed
      } catch (e) {}
    }

    const found = items.find(i => i.id === id)
    if (found) {
      setItem(found)
    } else {
      setNotFound(true)
    }
  }, [id])

  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'
      u.rate = 0.85
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    }
  }

  const handleAnswer = (idx) => {
    setSelectedAnswer(idx)
    setQuizState(idx === item.quiz?.correct ? 'correct' : 'wrong')
  }

  if (notFound) return (
    <div className="min-h-screen bg-[#050811] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center mb-4">
        <XCircle className="w-8 h-8 text-rose-400" />
      </div>
      <h2 className="text-white font-black text-lg mb-2">ไม่พบอุปกรณ์</h2>
      <p className="text-slate-400 text-sm max-w-xs leading-relaxed mb-6">
        QR Code นี้อาจหมดอายุ หรือครูยังไม่ได้เพิ่มอุปกรณ์ชิ้นนี้ในระบบ
      </p>
      <Link href="/student" className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black text-sm rounded-xl">
        ไปหน้านักเรียน
      </Link>
    </div>
  )

  if (!item) return (
    <div className="min-h-screen bg-[#050811] flex items-center justify-center">
      <div className="w-10 h-10 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <div className="min-h-screen bg-[#050811] text-slate-100 font-sans flex flex-col items-center p-4">
      {/* Background glows */}
      <div className="fixed top-0 right-1/4 w-96 h-96 bg-[#d4af37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 mt-2">
          <Link href="/student" className="text-xs text-slate-400 hover:text-white flex items-center gap-1.5 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full transition">
            <ArrowLeft className="w-3.5 h-3.5" /> กลับ
          </Link>
          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-widest bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
            🎯 QR Item View
          </span>
        </div>

        {/* 3D Model */}
        <div className="w-full h-64 rounded-2xl overflow-hidden bg-slate-950/80 border border-white/5 mb-4 relative">
          <ARScene selectedItem={item.id} itemTitle={item.title} customShape={item.shape} />
          <div className="absolute top-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[8px] text-slate-400 border border-white/5 pointer-events-none">
            3D Preview
          </div>
        </div>

        {/* Vocabulary Card */}
        <div className="bg-[#0b101e] border border-white/5 rounded-2xl p-4 mb-4 space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h1 className="text-xl font-heading font-black text-white leading-tight">{item.title}</h1>
              <p className="text-amber-400 text-sm font-bold mt-0.5">{item.thai}</p>
              <p className="text-slate-500 text-[11px] mt-0.5 font-mono">{item.pronunciation}</p>
            </div>
            <button
              onClick={() => speak(item.audioText || item.title)}
              className="shrink-0 w-10 h-10 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center hover:bg-amber-500/20 transition"
            >
              <Volume2 className="w-5 h-5 text-amber-400" />
            </button>
          </div>

          <p className="text-slate-300 text-[12px] leading-relaxed border-t border-white/5 pt-3">
            {item.description}
          </p>

          {item.sentence && (
            <div className="bg-slate-900/60 rounded-xl p-3">
              <span className="text-[9px] text-slate-500 uppercase font-bold tracking-wider block mb-1">ตัวอย่างประโยค</span>
              <p className="text-slate-200 text-[12px] leading-relaxed italic">"{item.sentence}"</p>
              <button
                onClick={() => speak(item.sentence)}
                className="mt-2 text-[9px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition"
              >
                <Volume2 className="w-3 h-3" /> ฟังเสียง
              </button>
            </div>
          )}
        </div>

        {/* Mini Quiz */}
        {item.quiz && (
          <div className="bg-[#0b101e] border border-white/5 rounded-2xl p-4 mb-6">
            <span className="text-[9px] text-amber-400 uppercase font-bold tracking-wider block mb-3">🧠 ทดสอบความเข้าใจ</span>
            <p className="text-slate-200 text-[12px] font-bold mb-3 leading-relaxed">{item.quiz.q}</p>

            {quizState === 'study' ? (
              <div className="space-y-2">
                {item.quiz.answers.map((ans, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    className="w-full text-left px-3 py-2.5 rounded-xl border border-white/5 bg-slate-900/60 text-[11px] text-slate-300 hover:border-amber-500/40 hover:text-white transition"
                  >
                    {String.fromCharCode(65 + idx)}. {ans}
                  </button>
                ))}
              </div>
            ) : quizState === 'correct' ? (
              <div className="flex flex-col items-center py-3 gap-2">
                <CheckCircle className="w-10 h-10 text-emerald-400" />
                <p className="text-emerald-400 font-black text-sm">ถูกต้อง! 🎉</p>
                <p className="text-slate-400 text-[11px]">ตอบ: {item.quiz.answers[selectedAnswer]}</p>
                <button onClick={() => { setQuizState('study'); setSelectedAnswer(null); }} className="mt-1 text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition">
                  <RotateCcw className="w-3 h-3" /> ทำอีกครั้ง
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-3 gap-2">
                <XCircle className="w-10 h-10 text-rose-400" />
                <p className="text-rose-400 font-black text-sm">ไม่ถูกต้อง</p>
                <p className="text-slate-400 text-[11px]">คำตอบที่ถูก: <span className="text-emerald-400 font-bold">{item.quiz.answers[item.quiz.correct]}</span></p>
                <button onClick={() => { setQuizState('study'); setSelectedAnswer(null); }} className="mt-1 text-[10px] text-slate-400 hover:text-white flex items-center gap-1 transition">
                  <RotateCcw className="w-3 h-3" /> ลองใหม่
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
