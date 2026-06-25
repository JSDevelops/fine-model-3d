"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import {
  Camera, Volume2, RefreshCw, CheckCircle2, XCircle,
  Sparkles, Mic, MicOff, AlertCircle, QrCode, ScanLine,
  ChevronDown, BookOpen, Utensils, MessageSquare, RotateCcw,
  Key, Loader2
} from 'lucide-react'

const ARScene = dynamic(() => import('../3d/ARScene'), { ssr: false })

// ── Speech similarity (Levenshtein + word overlap) ──────────────────────
function calculateSimilarity(targetStr, spokenStr) {
  const clean = (s) => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim()
  const s1 = clean(targetStr); const s2 = clean(spokenStr)
  if (s1 === s2) return 100
  if (!s1 || !s2) return 0
  const words1 = s1.split(" "); const words2 = s2.split(" ")
  let mc = 0; words1.forEach(w => { if (words2.includes(w)) mc++ })
  const wordScore = (mc / words1.length) * 100
  const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null))
  for (let i = 0; i <= s1.length; i++) track[0][i] = i
  for (let j = 0; j <= s2.length; j++) track[j][0] = j
  for (let j = 1; j <= s2.length; j++) for (let i = 1; i <= s1.length; i++) {
    const ind = s1[i - 1] === s2[j - 1] ? 0 : 1
    track[j][i] = Math.min(track[j][i - 1] + 1, track[j - 1][i] + 1, track[j - 1][i - 1] + ind)
  }
  const lev = track[s2.length][s1.length]
  const maxL = Math.max(s1.length, s2.length)
  return Math.max(0, Math.min(100, Math.round(wordScore * 0.6 + ((maxL - lev) / maxL) * 100 * 0.4)))
}

// ── Default sample items ─────────────────────────────────────────────────
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

// ── Main Component ───────────────────────────────────────────────────────
export default function Familiarize() {
  // QR & AI Scanner states
  const [scanPhase, setScanPhase] = useState('idle') // idle | scanning | found | notfound | ai-camera | ai-analyzing
  const [scannedItem, setScannedItem] = useState(null)
  const [allItems, setAllItems] = useState([])

  // Info card tab
  const [activeTab, setActiveTab] = useState('vocab') // vocab | usage | quiz | practice

  // Quiz
  const [quizState, setQuizState] = useState('question') // question | correct | wrong
  const [selectedAnswer, setSelectedAnswer] = useState(null)

  // Speech practice
  const [isRecording, setIsRecording] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [speechScore, setSpeechScore] = useState(null)
  const [isSpeechSupported, setIsSpeechSupported] = useState(false)

  // Scanner refs
  const qrScannerRef = useRef(null)
  const qrDivId = 'qr-reader-familiarize'
  const recognitionRef = useRef(null)

  // AI Camera States & Refs
  const videoRef = useRef(null)
  const aiStreamRef = useRef(null)
  const [aiStream, setAiStream] = useState(null)
  const [aiError, setAiError] = useState('')

  // Load items from localStorage
  useEffect(() => {
    const cached = localStorage.getItem('fineverse_ar_items')
    let items = SAMPLE_ITEMS
    if (cached) {
      try {
        const parsed = JSON.parse(cached)
        if (parsed && parsed.length > 0) items = parsed
      } catch (e) {}
    } else {
      localStorage.setItem('fineverse_ar_items', JSON.stringify(SAMPLE_ITEMS))
    }
    setAllItems(items)

    const SR = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
    if (SR) setIsSpeechSupported(true)

    return () => {
      stopQRScanner()
      stopAICamera()
    }
  }, [])

  // ── AI Camera Control ────────────────────────────────────────────────
  const stopAICamera = useCallback(() => {
    if (aiStreamRef.current) {
      aiStreamRef.current.getTracks().forEach(track => track.stop())
      aiStreamRef.current = null
    }
    setAiStream(null)
  }, [])

  const startAICamera = useCallback(async () => {
    setScanPhase('ai-camera')
    setScannedItem(null)
    setAiError('')
    
    // Stop any active QR scanner
    await stopQRScanner()

    // Give time to render the video element
    await new Promise(r => setTimeout(r, 150))

    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }
      })
      aiStreamRef.current = mediaStream
      setAiStream(mediaStream)
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }
    } catch (err) {
      console.error("Error starting AI camera:", err)
      setAiError("ไม่สามารถเปิดกล้องได้ กรุณาตรวจสอบสิทธิ์การใช้งานกล้องถ่ายรูป")
      setScanPhase('idle')
    }
  }, [])

  const captureAndAnalyze = async () => {
    if (!videoRef.current) return
    setScanPhase('ai-analyzing')
    setAiError('')

    try {
      const video = videoRef.current
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth || 640
      canvas.height = video.videoHeight || 480
      const ctx = canvas.getContext('2d')
      
      // Capture the current frame
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
      
      const dataUrl = canvas.toDataURL('image/jpeg', 0.85)
      const base64Data = dataUrl.split(',')[1]

      // Stop camera stream immediately
      stopAICamera()

      // Call Gemini API
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
      if (!apiKey) {
        throw new Error("ไม่พบ Gemini API Key ในระบบกรุณาตั้งค่าก่อนใช้งาน")
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `Identify the main hotel, restaurant, bar or kitchen service equipment in this image.
If there is no service equipment, identify the most prominent item.
Generate a structured JSON configuration for this equipment.
Respond ONLY in valid JSON format using this exact schema:
{
  "title": "English Name of the equipment (e.g. Soup Spoon)",
  "thai": "ชื่อภาษาไทยกระชับ (เช่น ช้อนซุป)",
  "pronunciation": "/English pronunciation spelling for Thai students (e.g. /suːp spuːn/)/",
  "description": "คำอธิบายวัตถุนี้สั้นๆ ในภาษาไทย 1-2 ประโยค เกี่ยวกับลักษณะและการใช้งาน",
  "how_to_use": "วิธีการใช้งานอุปกรณ์นี้ในการบริการอาหารและเครื่องดื่มเป็นภาษาไทย 1-2 ประโยค",
  "sentence": "A practical example sentence that hotel staff would say using this object in English.",
  "shapeType": "Choose one: 'box' or 'cylinder' or 'sphere'",
  "shapeColor": "A suitable hex color code for the 3D model (e.g. '#d4af37')",
  "sizeW": 0.4,
  "sizeH": 0.6,
  "sizeD": 0.6,
  "quiz": {
    "q": "คำถามทบทวนสั้นๆ เกี่ยวกับอุปกรณ์นี้เป็นภาษาไทย",
    "answers": ["ตัวเลือก A", "ตัวเลือก B", "ตัวเลือก C"],
    "correct": 0
  }
}
Do not wrap your response in markdown code blocks or any extra text.`
                  },
                  {
                    inlineData: {
                      mimeType: "image/jpeg",
                      data: base64Data
                    }
                  }
                ]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json'
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Gemini API error (Status ${response.status})`)
      }

      const resData = await response.json()
      const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || ''
      const parsed = JSON.parse(rawText)

      const newId = `ai_${Date.now()}`
      const newObj = {
        id: newId,
        title: parsed.title || 'Unknown Equipment',
        thai: parsed.thai || 'อุปกรณ์ไม่ระบุชื่อ',
        pronunciation: parsed.pronunciation || '/unknown/',
        description: parsed.description || 'ไม่มีรายละเอียด',
        how_to_use: parsed.how_to_use || parsed.description || '',
        sentence: parsed.sentence || 'No example sentence available.',
        audioText: parsed.title || 'Unknown Equipment',
        shape: {
          type: parsed.shapeType || 'cylinder',
          color: parsed.shapeColor || '#d4af37',
          size: parsed.shapeType === 'cylinder'
            ? [parsed.sizeW || 0.3, parsed.sizeH || 0.4, 32]
            : parsed.shapeType === 'sphere'
              ? [parsed.sizeW || 0.3, 32, 16]
              : [parsed.sizeW || 0.4, parsed.sizeH || 0.4, parsed.sizeD || 0.4]
        },
        quiz: parsed.quiz ? {
          q: parsed.quiz.q || 'คำถามทดสอบ?',
          answers: parsed.quiz.answers || ['ตัวเลือก 1', 'ตัวเลือก 2', 'ตัวเลือก 3'],
          correct: parsed.quiz.correct !== undefined ? parsed.quiz.correct : 0
        } : { q: 'คำถามทดสอบ?', answers: ['ตัวเลือก 1', 'ตัวเลือก 2'], correct: 0 }
      }

      setScannedItem(newObj)
      setScanPhase('found')
    } catch (err) {
      console.error("AI scanning error:", err)
      setAiError(err.message || "เกิดข้อผิดพลาดในการวิเคราะห์ภาพ")
      setScanPhase('notfound')
    }
  }

  // ── QR Scanner ──────────────────────────────────────────────────────
  const stopQRScanner = useCallback(async () => {
    if (qrScannerRef.current) {
      try { await qrScannerRef.current.stop() } catch (e) {}
      try { qrScannerRef.current.clear() } catch (e) {}
      qrScannerRef.current = null
    }
  }, [])

  const startQRScanner = useCallback(async () => {
    setScanPhase('scanning')
    setScannedItem(null)
    setActiveTab('vocab')
    setQuizState('question')
    setSelectedAnswer(null)
    setSpokenText('')
    setSpeechScore(null)
    setAiError('')

    // Stop active AI Camera if running
    stopAICamera()

    // Small delay so DOM renders the qr-reader div first
    await new Promise(r => setTimeout(r, 200))

    try {
      const { Html5Qrcode } = await import('html5-qrcode')
      await stopQRScanner()

      const scanner = new Html5Qrcode(qrDivId)
      qrScannerRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: { width: 220, height: 220 } },
        (decodedText) => {
          // Match URL: /item/{id}
          const match = decodedText.match(/\/item\/([^/?#]+)/)
          const itemId = match ? match[1] : decodedText.trim()

          // If it is a custom encoded QR code, decode the inline data directly
          if (itemId === 'custom') {
            try {
              const urlObj = new URL(decodedText)
              const d = urlObj.searchParams.get('d')
              if (d) {
                const jsonStr = decodeURIComponent(atob(d).split('').map((c) => {
                  return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
                }).join(''))
                const parsed = JSON.parse(jsonStr)
                if (parsed) {
                  stopQRScanner()
                  setScannedItem(parsed)
                  setScanPhase('found')
                  return
                }
              }
            } catch (e) {
              console.error("Error decoding inline QR data:", e)
            }
          }

          const cached = localStorage.getItem('fineverse_ar_items')
          let items = SAMPLE_ITEMS
          try { const p = JSON.parse(cached); if (p?.length) items = p } catch (e) {}

          const found = items.find(i => i.id === itemId)
          stopQRScanner()
          if (found) {
            setScannedItem(found)
            setScanPhase('found')
          } else {
            setScanPhase('notfound')
          }
        },
        () => {} // ongoing scan error — ignore
      )
    } catch (err) {
      console.error('QR Scanner error:', err)
      setScanPhase('idle')
    }
  }, [stopQRScanner, stopAICamera])

  const resetScan = useCallback(() => {
    stopQRScanner()
    stopAICamera()
    setScanPhase('idle')
    setScannedItem(null)
    setQuizState('question')
    setSelectedAnswer(null)
    setSpokenText('')
    setSpeechScore(null)
    setAiError('')
  }, [stopQRScanner, stopAICamera])

  // ── Speech practice ──────────────────────────────────────────────────
  const speak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      const u = new SpeechSynthesisUtterance(text)
      u.lang = 'en-US'; u.rate = 0.82
      window.speechSynthesis.cancel()
      window.speechSynthesis.speak(u)
    }
  }

  const startRecording = () => {
    if (!isSpeechSupported || !scannedItem) return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SR()
    recognitionRef.current = rec
    rec.lang = 'en-US'; rec.continuous = false; rec.interimResults = false
    rec.onstart = () => setIsRecording(true)
    rec.onresult = (e) => {
      const spoken = e.results[0][0].transcript
      setSpokenText(spoken)
      const score = calculateSimilarity(scannedItem.sentence || scannedItem.title, spoken)
      setSpeechScore(score)
      setIsRecording(false)
    }
    rec.onerror = () => setIsRecording(false)
    rec.onend = () => setIsRecording(false)
    rec.start()
  }

  const stopRecording = () => {
    recognitionRef.current?.stop()
    setIsRecording(false)
  }

  // ── Quiz handler ──────────────────────────────────────────────────────
  const handleQuizAnswer = (idx) => {
    setSelectedAnswer(idx)
    setQuizState(idx === scannedItem?.quiz?.correct ? 'correct' : 'wrong')
  }

  // ════════════════════════════════════════════════════════════════════
  // RENDER
  // ════════════════════════════════════════════════════════════════════

  // ── IDLE: invite to scan ─────────────────────────────────────────────
  if (scanPhase === 'idle') {
    return (
      <div className="flex flex-col h-full font-sans">
        <div className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-5">
          {/* Animated QR/AI icon */}
          <div className="relative">
            <div className="w-24 h-24 bg-amber-500/10 border-2 border-amber-500/30 rounded-3xl flex items-center justify-center">
              <QrCode className="w-12 h-12 text-[#d4af37]" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-400 rounded-full flex items-center justify-center animate-pulse">
              <ScanLine className="w-3 h-3 text-slate-950" />
            </div>
          </div>

          <div>
            <h2 className="text-base font-heading font-black text-white">สแกนและเรียนรู้อุปกรณ์</h2>
            <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed max-w-[250px]">
              สแกน QR Code บัตรอุปกรณ์ของครู หรือใช้กล้องถ่ายรูปวัตถุจริงรอบตัวเพื่อเปิดระบบเรียนรู้ 3D & AI ได้ทันที
            </p>
          </div>

          <div className="flex flex-col gap-3 w-full max-w-[280px]">
            <button
              onClick={startQRScanner}
              className="flex items-center justify-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 w-full"
            >
              <QrCode className="w-4.5 h-4.5" /> สแกน QR Code อุปกรณ์
            </button>
            <button
              onClick={startAICamera}
              className="flex items-center justify-center gap-2.5 px-6 py-3 bg-slate-900 hover:bg-slate-850 text-white font-black text-sm rounded-2xl border border-white/10 shadow-lg transition-all active:scale-95 w-full group"
            >
              <Sparkles className="w-4.5 h-4.5 text-amber-400 group-hover:animate-bounce" /> สแกนวิเคราะห์ด้วย AI
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── AI CAMERA: camera open for AI Scan ──────────────────────────────
  if (scanPhase === 'ai-camera') {
    return (
      <div className="flex flex-col h-full font-sans">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">สแกนด้วยกล้อง AI</span>
          <button
            onClick={resetScan}
            className="text-[9px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full transition"
          >
            <XCircle className="w-3 h-3" /> ยกเลิก
          </button>
        </div>

        {/* Video feed */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-950 border border-white/5 min-h-[300px]">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
          />
          {/* Overlay target indicator */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-48 h-48 border border-white/10 rounded-3xl flex items-center justify-center">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-400 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-400 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-400 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-400 rounded-br-xl" />
              <Sparkles className="w-8 h-8 text-amber-400/20" />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col items-center gap-2">
          <button
            onClick={captureAndAnalyze}
            className="flex items-center justify-center gap-2.5 px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-2xl shadow-lg shadow-amber-500/20 transition-all active:scale-95 w-full max-w-[280px]"
          >
            <Camera className="w-4 h-4" /> ถ่ายภาพวิเคราะห์ด้วย AI
          </button>
          <p className="text-[10px] text-slate-500 text-center">
            วางอุปกรณ์ให้อยู่ตรงกลางกรอบแล้วกดปุ่มเพื่อเริ่มวิเคราะห์
          </p>
        </div>
      </div>
    )
  }

  // ── AI ANALYZING: calling Gemini API ────────────────────────────────
  if (scanPhase === 'ai-analyzing') {
    return (
      <div className="flex flex-col h-full font-sans items-center justify-center text-center gap-6 px-4">
        <div className="relative">
          <div className="w-20 h-20 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center animate-spin">
            <Loader2 className="w-10 h-10 text-amber-400" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-amber-400 animate-pulse" />
          </div>
        </div>
        <div>
          <h3 className="text-sm font-heading font-black text-white">Gemini AI กำลังวิเคราะห์วัตถุ...</h3>
          <p className="text-[11px] text-slate-400 mt-2 leading-relaxed max-w-xs">
            กำลังจำแนกอุปกรณ์ สร้างโมเดล 3D แบบจำลอง<br/>
            และจัดเก็บข้อมูลบทเรียนทักษะบริการโรงแรม
          </p>
        </div>
      </div>
    )
  }

  // ── SCANNING: camera is open for QR code ──────────────────────────────
  if (scanPhase === 'scanning') {
    return (
      <div className="flex flex-col h-full font-sans">
        <div className="flex items-center justify-between mb-3 shrink-0">
          <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider">กำลังสแกน QR Code</span>
          <button
            onClick={resetScan}
            className="text-[9px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 border border-white/5 px-2.5 py-1 rounded-full transition"
          >
            <XCircle className="w-3 h-3" /> ยกเลิก
          </button>
        </div>

        {/* QR reader container — html5-qrcode will inject video here */}
        <div className="relative flex-1 rounded-2xl overflow-hidden bg-slate-950 border border-white/5 min-h-[300px]">
          <div id={qrDivId} className="w-full h-full" />

          {/* Scanning frame overlay */}
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
            <div className="relative w-52 h-52">
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-amber-400 rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-amber-400 rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-amber-400 rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-amber-400 rounded-br-lg" />
              {/* Scan line animation */}
              <div className="absolute left-2 right-2 top-1/2 h-0.5 bg-amber-400/60 animate-pulse" />
            </div>
          </div>
        </div>

        <p className="text-center text-[10px] text-slate-500 mt-3 leading-relaxed">
          จัด QR Code ให้อยู่กลางกรอบสีทอง ระบบจะสแกนอัตโนมัติ
        </p>
      </div>
    )
  }

  // ── NOT FOUND ─────────────────────────────────────────────────────────
  if (scanPhase === 'notfound') {
    return (
      <div className="flex flex-col h-full font-sans items-center justify-center text-center gap-4 px-4">
        <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-2xl flex items-center justify-center">
          <AlertCircle className="w-8 h-8 text-rose-400" />
        </div>
        <div>
          <h3 className="text-sm font-heading font-black text-white">
            {aiError ? 'วิเคราะห์ไม่สำเร็จ' : 'ไม่พบอุปกรณ์นี้ในระบบ'}
          </h3>
          <p className="text-[11px] text-slate-400 mt-1 leading-relaxed max-w-xs">
            {aiError || 'QR Code อาจไม่ใช่ของระบบนี้ หรือครูยังไม่ได้เพิ่มอุปกรณ์ชิ้นนี้'}
          </p>
        </div>
        <button onClick={resetScan} className="px-5 py-2.5 bg-amber-500 text-slate-950 font-black text-[11px] rounded-xl flex items-center gap-2 transition hover:bg-amber-400">
          <RotateCcw className="w-3.5 h-3.5" /> สแกนใหม่
        </button>
      </div>
    )
  }

  // ── FOUND: show item info ──────────────────────────────────────────────
  if (scanPhase === 'found' && scannedItem) {
    const item = scannedItem

    return (
      <div className="flex flex-col h-full font-sans overflow-hidden">

        {/* Header bar */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="min-w-0">
            <p className="text-[9px] text-amber-400 uppercase font-bold tracking-wider">อุปกรณ์ที่สแกนได้</p>
            <h2 className="text-sm font-heading font-black text-white truncate">{item.title}</h2>
          </div>
          <button
            onClick={resetScan}
            className="shrink-0 flex items-center gap-1 text-[9px] text-slate-400 hover:text-white bg-white/5 border border-white/5 px-2.5 py-1.5 rounded-full transition"
          >
            <QrCode className="w-3 h-3" /> สแกนใหม่
          </button>
        </div>

        {/* 3D Model Preview */}
        <div className="w-full h-44 rounded-2xl overflow-hidden bg-slate-950/80 border border-white/5 mb-3 relative shrink-0">
          <ARScene selectedItem={item.id} itemTitle={item.title} customShape={item.shape} />
          <div className="absolute top-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[8px] text-slate-400 border border-white/5 pointer-events-none flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-400" /> โมเดล 3D
          </div>
          <button
            onClick={() => speak(item.audioText || item.title)}
            className="absolute top-2 right-2 w-7 h-7 bg-amber-500/20 border border-amber-500/30 rounded-lg flex items-center justify-center hover:bg-amber-500/30 transition"
          >
            <Volume2 className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>

        {/* Tab selector */}
        <div className="grid grid-cols-4 bg-slate-950 p-0.5 rounded-xl border border-white/5 mb-3 shrink-0 gap-0.5">
          {[
            { id: 'vocab', icon: BookOpen, label: 'คำศัพท์' },
            { id: 'usage', icon: Utensils, label: 'วิธีใช้' },
            { id: 'quiz', icon: CheckCircle2, label: 'ทดสอบ' },
            { id: 'practice', icon: Mic, label: 'ฝึกพูด' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center py-1.5 rounded-lg transition text-[8px] font-bold gap-0.5 ${
                activeTab === tab.id
                  ? 'bg-amber-500 text-slate-950'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <tab.icon className="w-3 h-3" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab content — scrollable */}
        <div className="flex-1 overflow-y-auto space-y-2 pr-0.5">

          {/* ── VOCAB ── */}
          {activeTab === 'vocab' && (
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="text-base font-heading font-black text-white">{item.title}</h3>
                  <p className="text-amber-400 text-sm font-bold">{item.thai}</p>
                  <p className="text-slate-500 text-[10px] font-mono mt-0.5">{item.pronunciation}</p>
                </div>
                <button
                  onClick={() => speak(item.audioText || item.title)}
                  className="w-9 h-9 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center shrink-0 hover:bg-amber-500/20 transition"
                >
                  <Volume2 className="w-4 h-4 text-amber-400" />
                </button>
              </div>
              <p className="text-[11px] text-slate-300 leading-relaxed border-t border-white/5 pt-3">{item.description}</p>
              {item.sentence && (
                <div className="bg-slate-950/60 rounded-xl p-3">
                  <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider block mb-1">ตัวอย่างประโยค</span>
                  <p className="text-[11px] text-slate-200 italic leading-relaxed">"{item.sentence}"</p>
                  <button onClick={() => speak(item.sentence)} className="mt-1.5 text-[9px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition">
                    <Volume2 className="w-3 h-3" /> ฟังเสียง
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── USAGE ── */}
          {activeTab === 'usage' && (
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-7 h-7 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center">
                  <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                </div>
                <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">วิธีการใช้งาน</span>
              </div>
              <p className="text-[11px] text-slate-200 leading-relaxed">
                {item.how_to_use || item.description}
              </p>
              {item.sentence && (
                <>
                  <div className="border-t border-white/5 pt-3">
                    <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider block mb-2">ประโยคบริการมาตรฐาน</span>
                    <div className="bg-slate-950/60 rounded-xl p-3">
                      <p className="text-[11px] text-slate-200 italic">"{item.sentence}"</p>
                      <button onClick={() => speak(item.sentence)} className="mt-1.5 text-[9px] text-amber-400 hover:text-amber-300 flex items-center gap-1 transition">
                        <Volume2 className="w-3 h-3" /> ฟังเสียง
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── QUIZ ── */}
          {activeTab === 'quiz' && item.quiz && (
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] text-amber-400 uppercase font-bold tracking-wider block">🧠 แบบทดสอบความเข้าใจ</span>
              <p className="text-[12px] text-slate-200 font-bold leading-relaxed">{item.quiz.q}</p>

              {quizState === 'question' ? (
                <div className="space-y-2">
                  {item.quiz.answers.map((ans, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuizAnswer(idx)}
                      className="w-full text-left px-3 py-2.5 rounded-xl border border-white/5 bg-slate-950/60 text-[11px] text-slate-300 hover:border-amber-500/40 hover:text-white transition"
                    >
                      {String.fromCharCode(65 + idx)}. {ans}
                    </button>
                  ))}
                </div>
              ) : quizState === 'correct' ? (
                <div className="flex flex-col items-center py-4 gap-2">
                  <CheckCircle2 className="w-10 h-10 text-emerald-400" />
                  <p className="text-emerald-400 font-black text-sm">ถูกต้อง! 🎉</p>
                  <p className="text-slate-400 text-[10px]">คำตอบ: {item.quiz.answers[selectedAnswer]}</p>
                  <button onClick={() => { setQuizState('question'); setSelectedAnswer(null) }} className="mt-1 text-[9px] text-slate-400 hover:text-white flex items-center gap-1 transition">
                    <RotateCcw className="w-3 h-3" /> ทำอีกครั้ง
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center py-4 gap-2">
                  <XCircle className="w-10 h-10 text-rose-400" />
                  <p className="text-rose-400 font-black text-sm">ไม่ถูกต้อง</p>
                  <p className="text-slate-400 text-[10px]">คำตอบที่ถูก: <span className="text-emerald-400 font-bold">{item.quiz.answers[item.quiz.correct]}</span></p>
                  <button onClick={() => { setQuizState('question'); setSelectedAnswer(null) }} className="mt-1 text-[9px] text-slate-400 hover:text-white flex items-center gap-1 transition">
                    <RotateCcw className="w-3 h-3" /> ลองใหม่
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ── PRACTICE ── */}
          {activeTab === 'practice' && (
            <div className="bg-slate-900/60 border border-white/5 rounded-2xl p-4 space-y-3">
              <span className="text-[9px] text-purple-400 uppercase font-bold tracking-wider block">🎙️ ฝึกออกเสียงภาษาอังกฤษ</span>

              {item.sentence && (
                <div className="bg-slate-950/60 rounded-xl p-3">
                  <span className="text-[8px] text-slate-500 uppercase font-bold tracking-wider block mb-1.5">ประโยคฝึกพูด</span>
                  <p className="text-[11px] text-slate-200 italic leading-relaxed">"{item.sentence}"</p>
                  <button onClick={() => speak(item.sentence)} className="mt-2 flex items-center gap-1.5 text-[9px] text-amber-400 hover:text-amber-300 transition">
                    <Volume2 className="w-3.5 h-3.5" /> ฟังตัวอย่างก่อน
                  </button>
                </div>
              )}

              {isSpeechSupported ? (
                <div className="space-y-2">
                  <button
                    onClick={isRecording ? stopRecording : startRecording}
                    className={`w-full py-3 rounded-xl font-black text-xs flex items-center justify-center gap-2 transition-all ${
                      isRecording
                        ? 'bg-rose-500/20 border border-rose-500/40 text-rose-400 animate-pulse'
                        : 'bg-purple-500/10 border border-purple-500/30 text-purple-300 hover:bg-purple-500/20'
                    }`}
                  >
                    {isRecording ? <><MicOff className="w-4 h-4" /> หยุดบันทึก</> : <><Mic className="w-4 h-4" /> เริ่มพูด</>}
                  </button>

                  {spokenText && (
                    <div className="bg-slate-950/60 rounded-xl p-3 space-y-2">
                      <p className="text-[9px] text-slate-500 uppercase font-bold">คุณพูดว่า:</p>
                      <p className="text-[11px] text-slate-200 italic">"{spokenText}"</p>
                      {speechScore !== null && (
                        <div className="flex items-center gap-2 pt-1">
                          <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-700 ${speechScore >= 80 ? 'bg-emerald-400' : speechScore >= 50 ? 'bg-amber-400' : 'bg-rose-400'}`}
                              style={{ width: `${speechScore}%` }}
                            />
                          </div>
                          <span className={`text-[10px] font-black ${speechScore >= 80 ? 'text-emerald-400' : speechScore >= 50 ? 'text-amber-400' : 'text-rose-400'}`}>
                            {speechScore}%
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-4 text-[10px] text-slate-500">
                  <MicOff className="w-6 h-6 mx-auto mb-2 text-slate-700" />
                  เบราว์เซอร์นี้ไม่รองรับการรับเสียง<br/>กรุณาใช้ Chrome บน Android/Desktop
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}
