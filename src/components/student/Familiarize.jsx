"use client";

import React, { useState, useRef, useEffect } from 'react'
import ARScene from '../3d/ARScene'
import { Camera, Volume2, HelpCircle, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react'

export default function Familiarize() {
  const [arItems, setArItems] = useState([])
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState('none') // 'none' | 'scanning' | 'loading' | 'ready'
  const [hasCamera, setHasCamera] = useState(false)
  const [quizState, setQuizState] = useState('study') // 'study' | 'question' | 'correct' | 'wrong'
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)

  // Load items from localStorage dynamically
  useEffect(() => {
    const cached = localStorage.getItem('fineverse_ar_items')
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        setArItems(parsed)
      } catch (e) {
        console.error("Failed to parse AR items:", e)
      }
    }
  }, [])

  const startCamera = async () => {
    setIsScanning(true)
    setScanPhase('scanning')
    setQuizState('study')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 640, height: 480 }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setHasCamera(true)
      
      // Simulate AR marker scanning flow
      setTimeout(() => setScanPhase('loading'), 2000)
      setTimeout(() => setScanPhase('ready'), 3500)
    } catch (err) {
      console.warn("Camera access denied or unavailable", err)
      setHasCamera(false)
      // Fallback flow without camera
      setTimeout(() => setScanPhase('loading'), 1500)
      setTimeout(() => setScanPhase('ready'), 3000)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop())
      streamRef.current = null;
    }
    setIsScanning(false)
    setScanPhase('none')
  }

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const handleSpeak = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    } else {
      alert("ขออภัย บราวเซอร์ของคุณไม่รองรับระบบเสียงสังเคราะห์")
    }
  }

  if (arItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center bg-[#151D2F]/40 border border-white/5 rounded-3xl h-[400px] font-sans">
        <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-4">
          <Camera className="w-8 h-8 text-[#d4af37] animate-pulse" />
        </div>
        <h3 className="text-sm font-heading font-black text-white">รีเซ็ตข้อมูลภาพ 3D เก่าออกแล้ว</h3>
        <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
          โมเดล 3 มิติ และรูปภาพข้อมูลเก่าถูกรีเซ็ตลบออกเรียบร้อยแล้ว กรุณาเข้าสู่ระบบแดชบอร์ดจัดการของครูเพื่อเพิ่มอุปกรณ์ชิ้นใหม่
        </p>
      </div>
    )
  }

  const currentItem = arItems[selectedItemIndex]
  const currentQuiz = currentItem.quiz || { q: '', answers: [], correct: 0 }

  const handleQuizAnswer = (idx) => {
    setSelectedAnswer(idx)
    if (idx === currentQuiz.correct) {
      setQuizState('correct')
    } else {
      setQuizState('wrong')
    }
  }

  return (
    <div className="flex flex-col h-full font-sans">
      {/* Upper Area: AR Scanner / 3D Viewer */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
        {/* Scanning Screen */}
        {isScanning ? (
          <div className="absolute inset-0 z-10 flex flex-col justify-between">
            {/* Live Camera Feed */}
            {hasCamera ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-slate-900 flex items-center justify-center text-slate-500 flex-col gap-2">
                <Camera className="w-8 h-8 animate-pulse text-amber-500" />
                <span className="text-xs">กล้องกำลังทำงาน (หรือโหมดจำลองภาพเสมือน)</span>
              </div>
            )}

            {/* Scanning Laser Overlay */}
            {scanPhase === 'scanning' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none bg-black/35">
                <div className="w-48 h-48 border-2 border-dashed border-amber-400 rounded-3xl animate-pulse flex items-center justify-center">
                  <div className="w-full h-0.5 bg-amber-400 animate-[bounce_2s_infinite]" />
                </div>
                <div className="mt-4 text-xs font-bold bg-slate-950/80 px-3 py-1.5 rounded-full border border-amber-500/30 text-amber-400 tracking-widest uppercase">
                  🔍 Scanning for QR / Menu Item
                </div>
              </div>
            )}

            {/* Loading AR Asset */}
            {scanPhase === 'loading' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/65 z-20">
                <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mb-2" />
                <span className="text-xs text-amber-400 font-bold tracking-wider uppercase">Loading 3D AR Model...</span>
              </div>
            )}

            {/* Interactive 3D Canvas overlaid on top */}
            {scanPhase === 'ready' && (
              <div className="absolute inset-0 z-30">
                <ARScene selectedItem={currentItem.id} customShape={currentItem.shape} />
                
                {/* Float helper instructions */}
                <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur border border-[#d4af37]/30 px-3 py-2 rounded-xl text-[10px] text-slate-300 pointer-events-none flex flex-col">
                  <span className="font-bold text-[#d4af37]">✨ โหมดสแกน AR 3D สัมฤทธิ์ผล</span>
                  <span>หมุน / ซูม โมเดล 3 มิติ เพื่อเรียนรู้วัสดุอุปกรณ์จริง</span>
                </div>
              </div>
            )}

            {/* Scanner Controls Header */}
            <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-center pointer-events-auto">
              <span className="bg-slate-950/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                AR CAM ACTIVE
              </span>
              <button
                onClick={stopCamera}
                className="bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 text-xs px-3 py-1 rounded-full font-bold transition-all"
              >
                ปิดกล้อง
              </button>
            </div>
          </div>
        ) : (
          /* Static Preview of 3D Scene */
          <div className="absolute inset-0 flex flex-col justify-between p-4">
            <div className="w-full h-full absolute inset-0 z-0">
              <ARScene selectedItem={currentItem.id} customShape={currentItem.shape} />
            </div>

            <div className="z-10 flex justify-between items-start">
              <span className="bg-slate-950/80 border border-white/5 px-2.5 py-1 rounded-xl text-xs font-bold text-slate-400">
                3D Hologram Preview
              </span>
              <button
                onClick={startCamera}
                className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/25 transition-all"
              >
                <Camera className="w-4 h-4" /> สแกน AR ด้วยกล้อง
              </button>
            </div>

            <div className="z-10 bg-slate-950/70 backdrop-blur border border-white/5 p-3 rounded-xl max-w-xs self-start pointer-events-none">
              <h4 className="text-xs font-bold text-[#d4af37] uppercase tracking-wider">
                {currentItem.title}
              </h4>
              <p className="text-[10px] text-slate-300 mt-0.5 leading-relaxed">
                {currentItem.description}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Selector tabs */}
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1 max-w-full">
        {arItems.map((item, idx) => (
          <button
            key={item.id || idx}
            onClick={() => {
              setSelectedItemIndex(idx)
              setQuizState('study')
              setSelectedAnswer(null)
            }}
            className={`px-4 py-2 text-xs font-bold rounded-xl border transition-all whitespace-nowrap ${
              selectedItemIndex === idx
                ? 'bg-amber-500/10 border-amber-500 text-amber-400 shadow-md'
                : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
            }`}
          >
            {item.title}
          </button>
        ))}
      </div>

      {/* Vocab Study / Quiz Panel */}
      <div className="flex-1 mt-4 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5 flex flex-col justify-between">
        {quizState === 'study' ? (
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-heading text-lg font-bold text-white flex items-center gap-2">
                  {currentItem.title}
                  <span className="text-xs font-normal text-slate-400">{currentItem.pronunciation}</span>
                </h3>
                <p className="text-sm text-amber-400 font-medium mt-0.5">{currentItem.thai}</p>
              </div>
              <button
                onClick={() => handleSpeak(currentItem.title)}
                className="w-8 h-8 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-400 transition"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] uppercase text-slate-500 block font-bold tracking-wider">Example Dialogue:</span>
              <p className="text-slate-200 text-xs italic mt-1 font-serif">
                "{currentItem.sentence}"
              </p>
              <button
                onClick={() => handleSpeak(currentItem.sentence)}
                className="mt-2 text-[10px] text-amber-400 font-bold hover:underline flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" /> ฟังประโยคสนทนา
              </button>
            </div>

            {currentQuiz.q && (
              <button
                onClick={() => setQuizState('question')}
                className="mt-4 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-1 transition"
              >
                <HelpCircle className="w-4 h-4 text-amber-400" /> ทำแบบสอบถามคำศัพท์ (Vocab Quiz)
              </button>
            )}
          </div>
        ) : (
          /* Quiz Mode */
          <div className="flex-1 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-[10px] uppercase text-amber-400 font-bold tracking-widest">Vocabulary Quiz</span>
                <button
                  onClick={() => setQuizState('study')}
                  className="text-[10px] text-slate-400 hover:text-white"
                >
                  ย้อนกลับไปอ่าน
                </button>
              </div>
              <h4 className="text-slate-200 text-sm font-semibold mb-3">
                {currentQuiz.q}
              </h4>
              <div className="space-y-2">
                {currentQuiz.answers.map((ans, idx) => (
                  <button
                    key={idx}
                    disabled={quizState === 'correct' || quizState === 'wrong'}
                    onClick={() => handleQuizAnswer(idx)}
                    className={`w-full text-left p-3 rounded-xl text-xs transition border flex justify-between items-center ${
                      selectedAnswer === idx
                        ? idx === currentQuiz.correct
                          ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                          : 'bg-rose-500/10 border-rose-500 text-rose-400 font-bold'
                        : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                    }`}
                  >
                    {ans}
                    {selectedAnswer === idx && (
                      idx === currentQuiz.correct ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <div className="w-4 h-4 rounded-full border-2 border-rose-500" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Answer feedback */}
            <div className="mt-4">
              {quizState === 'correct' && (
                <div className="bg-emerald-500/15 border border-emerald-500/30 p-2.5 rounded-xl text-[10px] text-emerald-400 flex items-center gap-2 mb-3">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>คำตอบถูกต้อง! ยอดเยี่ยมมากสำหรับการเรียนรู้คำศัพท์นี้</span>
                </div>
              )}
              {quizState === 'wrong' && (
                <div className="bg-rose-500/15 border border-rose-500/30 p-2.5 rounded-xl text-[10px] text-rose-400 flex items-center gap-2 mb-3">
                  <div className="w-4 h-4 rounded-full border-2 border-rose-500 shrink-0" />
                  <span>ยังไม่ถูกต้อง ลองศึกษาคำตอบอีกครั้งหรือกดย้อนกลับ</span>
                </div>
              )}
              <button
                onClick={() => {
                  setQuizState('study')
                  setSelectedAnswer(null)
                  // Advance to next item if correct
                  if (quizState === 'correct') {
                    setSelectedItemIndex(prev => (prev + 1) % arItems.length)
                  }
                }}
                className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1 transition"
              >
                เรียนรู้อุปกรณ์ชิ้นถัดไป <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

