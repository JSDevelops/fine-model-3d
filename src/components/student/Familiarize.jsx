"use client";

import React, { useState, useRef, useEffect } from 'react'
import ARScene from '../3d/ARScene'
import { 
  Camera, 
  Volume2, 
  HelpCircle, 
  RefreshCw, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Mic, 
  MicOff, 
  AlertCircle, 
  MessageSquare, 
  ClipboardList, 
  Info,
  Layers,
  Key
} from 'lucide-react'

// Speech similarity analyzer using Levenshtein distance & word overlap
function calculateSimilarity(targetStr, spokenStr) {
  const clean = (s) => s.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
  const s1 = clean(targetStr);
  const s2 = clean(spokenStr);
  
  if (s1 === s2) return 100;
  if (!s1 || !s2) return 0;
  
  const words1 = s1.split(" ");
  const words2 = s2.split(" ");
  
  let matchCount = 0;
  words1.forEach(word => {
    if (words2.includes(word)) {
      matchCount++;
    }
  });
  
  const wordScore = (matchCount / words1.length) * 100;
  
  // Levenshtein distance
  const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1, // deletion
        track[j - 1][i] + 1, // insertion
        track[j - 1][i - 1] + indicator // substitution
      );
    }
  }
  const levDistance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  const charScore = ((maxLength - levDistance) / maxLength) * 100;
  
  // 60% word matching, 40% character distance
  const finalScore = Math.round(wordScore * 0.6 + charScore * 0.4);
  return Math.max(0, Math.min(100, finalScore));
}

const MOCK_SCAN_ITEMS = [
  {
    object_name_en: "Wine Glass",
    object_name_th: "แก้วไวน์",
    description_en: "A stemmed glass designed specifically for serving wine.",
    description_th: "แก้วที่มีก้านออกแบบมาโดยเฉพาะสำหรับการเสิร์ฟไวน์ เพื่อป้องกันอุณหภูมิจากมือ",
    how_to_use_en: "Hold the glass by the stem to prevent transferring heat. Place it on the right side of the guest's place setting.",
    how_to_use_th: "จับแก้วบริเวณก้านแก้วเพื่อไม่ให้ความร้อนจากมือส่งผลต่ออุณหภูมิไวน์ จัดวางไว้ทางด้านขวาของจานผู้รับบริการ",
    dialogue_en: "Staff: Would you like a glass of red wine with your steak, sir?\nGuest: Yes, please. A glass of Cabernet Sauvignon.",
    dialogue_th: "พนักงาน: รับไวน์แดงสักแก้วทานคู่กับสเต็กดีไหมครับท่าน?\nลูกค้า: ครับ รบกวนขอคาร์เบอร์เนต์ โซวีญง สักแก้วครับ",
    practice_phrase: "Would you like a glass of red wine with your steak, sir?"
  },
  {
    object_name_en: "Coffee Mug",
    object_name_th: "แก้วกาแฟมีหู",
    description_en: "A heavy cup with a handle used for hot beverages like coffee or tea.",
    description_th: "ถ้วยหนามีหูจับสำหรับใส่เครื่องดื่มร้อน เช่น กาแฟ หรือชา",
    how_to_use_en: "Serve hot beverages with the handle facing the guest's right side. Place it on a saucer if appropriate.",
    how_to_use_th: "เสิร์ฟเครื่องดื่มร้อนโดยหันหูจับแก้วไปทางขวาของผู้รับบริการเสมอ จัดวางบนจานรองแก้วให้เรียบร้อย",
    dialogue_en: "Staff: Here is your fresh hot Americano, ma'am. Enjoy your coffee.\nGuest: Thank you, it smells wonderful.",
    dialogue_th: "พนักงาน: นี่คือกาแฟอเมริกาโน่ร้อน ๆ ของคุณครับท่าน ขอให้มีความสุขกับกาแฟครับ\nลูกค้า: ขอบคุณค่ะ หอมมากเลย",
    practice_phrase: "Here is your fresh hot Americano, ma'am."
  },
  {
    object_name_en: "Table Napkin",
    object_name_th: "ผ้าเช็ดปากบนโต๊ะอาหาร",
    description_en: "A square piece of cloth used at the table for wiping the mouth and fingers.",
    description_th: "ผ้าสี่เหลี่ยมผืนผ้าสำหรับเช็ดปากและนิ้วมือระหว่างการรับประทานอาหาร",
    how_to_use_en: "Unfold and place on the guest's lap when they sit down, or fold into creative shapes for table decoration.",
    how_to_use_th: "คลี่ผ้าออกและวางบนตักของผู้รับบริการเมื่อพวกเขานั่งลง หรือพับเป็นรูปทรงต่าง ๆ เพื่อตกแต่งโต๊ะอาหาร",
    dialogue_en: "Staff: Allow me to place the napkin on your lap, ma'am.\nGuest: Oh, thank you. That is very thoughtful.",
    dialogue_th: "พนักงาน: ขออนุญาตวางผ้าเช็ดปากบนตักให้นะครับท่าน\nลูกค้า: โอ้ว ขอบคุณค่ะ ใส่ใจบริการดีมากเลย",
    practice_phrase: "Allow me to place the napkin on your lap, ma'am."
  },
  {
    object_name_en: "Dessert Spoon",
    object_name_th: "ช้อนของหวาน",
    description_en: "A medium-sized spoon used specifically for eating desserts.",
    description_th: "ช้อนขนาดกลางที่ออกแบบมาสำหรับรับประทานของหวานโดยเฉพาะ",
    how_to_use_en: "Place it horizontally above the guest's dinner plate with the handle pointing to the right.",
    how_to_use_th: "จัดวางในแนวนอนด้านบนจานอาหารหลักของผู้รับบริการ โดยหันหูจับช้อนไปทางขวามือ",
    dialogue_en: "Staff: I have brought a dessert spoon for your chocolate mousse, sir.\nGuest: Thank you very much, I appreciate it.",
    dialogue_th: "พนักงาน: ผมนำช้อนขนมหวานสำหรับช็อกโกแลตมูสมาให้แล้วครับท่าน\nลูกค้า: ขอบคุณมากครับ",
    practice_phrase: "I have brought a dessert spoon for your chocolate mousse, sir."
  }
]

export default function Familiarize() {
  const [mode, setMode] = useState('sim') // 'sim' | 'ai'
  const [arItems, setArItems] = useState([])
  const [selectedItemIndex, setSelectedItemIndex] = useState(0)
  const [isScanning, setIsScanning] = useState(false)
  const [scanPhase, setScanPhase] = useState('none') // 'none' | 'scanning' | 'resolving' | 'ready'
  const [hasCamera, setHasCamera] = useState(false)
  const [quizState, setQuizState] = useState('study') // 'study' | 'question' | 'correct' | 'wrong'
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  
  // Gemini AI Scanner specific state
  const [customApiKey, setCustomApiKey] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [aiResult, setAiResult] = useState(null)
  const [scanLogs, setScanLogs] = useState([])
  const [isRecording, setIsRecording] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [scores, setScores] = useState({ pronunciation: null, fluency: null, confidence: null })
  const [isSpeechSupported, setIsSpeechSupported] = useState(false)

  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const recognitionRef = useRef(null)

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

    // Check Speech Recognition support
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSpeechSupported(true)
      }
    }
  }, [])

  const startCamera = async () => {
    setIsScanning(true)
    setScanPhase('scanning')
    setQuizState('study')
    setScores({ pronunciation: null, fluency: null, confidence: null })
    setSpokenText('')
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment', width: 640, height: 480 }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setHasCamera(true)
      
      // Auto-transition from scanning state to waiting for snapshot in AI mode
      // or auto-trigger 3D load in Sim mode
      if (mode === 'sim') {
        setTimeout(() => setScanPhase('loading'), 1500)
        setTimeout(() => setScanPhase('ready'), 3000)
      } else {
        setScanPhase('scanning')
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable", err)
      setHasCamera(false)
      if (mode === 'sim') {
        setTimeout(() => setScanPhase('loading'), 1000)
        setTimeout(() => setScanPhase('ready'), 2000)
      }
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
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = 'en-US'
      utterance.rate = 0.8
      window.speechSynthesis.speak(utterance)
    } else {
      alert("ขออภัย บราวเซอร์ของคุณไม่รองรับระบบเสียงสังเคราะห์")
    }
  }

  // Captures current video frame, converts to base64, and calls Gemini API
  const handleCaptureAndAnalyze = async () => {
    if (!videoRef.current && hasCamera) return

    setScanPhase('resolving')
    setScanLogs([{ text: 'กำลังตรวจจับเฟรมภาพจากกล้อง...', type: 'info' }])

    let base64Image = ''
    if (hasCamera && videoRef.current) {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = videoRef.current.videoWidth || 640
        canvas.height = videoRef.current.videoHeight || 480
        const ctx = canvas.getContext('2d')
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
        const dataUrl = canvas.toDataURL('image/jpeg')
        base64Image = dataUrl.split(',')[1]
      } catch (e) {
        console.error("Failed to capture image frame:", e)
      }
    }

    // Determine API Key
    const apiKey = customApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''

    if (apiKey && base64Image) {
      setScanLogs(prev => [...prev, { text: 'กำลังส่งข้อมูลภาพไปยัง Gemini API...', type: 'info' }])
      try {
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
                      text: `Identify the hospitality, hotel, or restaurant object in this picture. Respond ONLY in valid JSON format using this exact schema:
{
  "object_name_en": "Common English Name",
  "object_name_th": "ชื่อวัตถุในภาษาไทย",
  "description_en": "Explain what this object is and its role in a restaurant/hotel context in 1-2 sentences.",
  "description_th": "คำอธิบายภาษาไทยสั้นๆ กระชับ 1-2 ประโยค",
  "how_to_use_en": "Direct instructions on how hospitality staff should use or handle this object.",
  "how_to_use_th": "แนะนำขั้นตอนวิธีการนำไปใช้งานในงานบริการจริง",
  "dialogue_en": "Staff: A sample dialogue line by staff using this object.\\nGuest: A guest response.",
  "dialogue_th": "บทสนทนาจำลองในภาษาไทยแปล",
  "practice_phrase": "A key service sentence involving the object for the student to repeat."
}
Do not wrap your response in markdown code blocks.`
                    },
                    {
                      inlineData: {
                        mimeType: 'image/jpeg',
                        data: base64Image
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

        const resData = await response.json()
        const rawText = resData.candidates?.[0]?.content?.parts?.[0]?.text || ''
        const parsed = JSON.parse(rawText)

        setScanLogs(prev => [...prev, { text: `Gemini ตรวจพบ: ${parsed.object_name_en}`, type: 'success' }])
        
        setTimeout(() => {
          setAiResult(parsed)
          stopCamera()
        }, 1200)

      } catch (err) {
        console.error("Gemini API Error:", err)
        setScanLogs(prev => [...prev, { text: 'การเชื่อมต่อผิดพลาด กำลังโหลดแบบจำลองเสมือน (Fallback)...', type: 'warning' }])
        setTimeout(triggerMockScan, 1500)
      }
    } else {
      // Key is missing or camera isn't mockable
      setScanLogs(prev => [...prev, { text: 'ไม่ได้ตั้งค่า API Key หรือจำลองการสแกนอัตโนมัติ...', type: 'info' }])
      setTimeout(triggerMockScan, 1500)
    }
  }

  const triggerMockScan = () => {
    // Pick a random mock item
    const randomIdx = Math.floor(Math.random() * MOCK_SCAN_ITEMS.length)
    const matched = MOCK_SCAN_ITEMS[randomIdx]

    setScanLogs(prev => [...prev, { text: `จำลองการตรวจพบ: ${matched.object_name_en}`, type: 'success' }])
    
    setTimeout(() => {
      setAiResult(matched)
      stopCamera()
    }, 1200)
  }

  const toggleRecording = (targetText) => {
    if (typeof window === 'undefined') return;
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      simulateVoiceCoach(targetText);
      return;
    }

    if (isRecording) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsRecording(false);
    } else {
      try {
        const rec = new SpeechRecognition();
        rec.continuous = false;
        rec.lang = 'en-US';
        rec.interimResults = false;
        rec.maxAlternatives = 1;

        rec.onstart = () => {
          setIsRecording(true);
          setSpokenText('');
          setScores({ pronunciation: null, fluency: null, confidence: null });
        };

        rec.onresult = (event) => {
          const transcript = event.results[0][0].transcript;
          setSpokenText(transcript);
          
          const similarity = calculateSimilarity(targetText, transcript);
          const fluencyScore = Math.max(40, Math.min(100, Math.round(similarity - 5 + Math.random() * 10)));
          const confidenceScore = Math.max(50, Math.min(100, Math.round(similarity + Math.random() * 5)));
          
          setScores({
            pronunciation: similarity,
            fluency: fluencyScore,
            confidence: confidenceScore
          });
        };

        rec.onerror = (e) => {
          console.error("Speech recognition error", e.error);
          setIsRecording(false);
        };

        rec.onend = () => {
          setIsRecording(false);
        };

        recognitionRef.current = rec;
        rec.start();
      } catch (e) {
        console.error(e);
        setIsRecording(false);
      }
    }
  };

  const simulateVoiceCoach = (targetText) => {
    setIsRecording(true);
    setSpokenText('กำลังฟังเสียงและประมวลผล...');
    setScores({ pronunciation: null, fluency: null, confidence: null });
    
    setTimeout(() => {
      setIsRecording(false);
      const words = targetText.split(' ');
      const mockSpokenText = words.slice(0, -1).join(' ') + (words.length > 1 ? " " : "") + "...";
      setSpokenText(mockSpokenText);
      
      const pScore = Math.floor(Math.random() * 15) + 82;
      const fScore = Math.floor(Math.random() * 15) + 80;
      const cScore = Math.floor(Math.random() * 15) + 85;
      
      setScores({
        pronunciation: pScore,
        fluency: fScore,
        confidence: cScore
      });
    }, 2000);
  };

  const getOverallScore = () => {
    if (scores.pronunciation === null) return 0
    return Math.round((scores.pronunciation + scores.fluency + scores.confidence) / 3)
  }

  // Renders standard sim empty list warning
  if (mode === 'sim' && arItems.length === 0) {
    return (
      <div className="flex flex-col h-full font-sans">
        {/* Toggle Mode */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 mb-3">
          <button onClick={() => setMode('sim')} className="flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all bg-amber-500 text-slate-950 shadow-md">
            📦 3D & AR Simulation
          </button>
          <button onClick={() => { setMode('ai'); stopCamera(); }} className="flex-1 py-1.5 text-[10px] font-bold rounded-lg transition-all text-slate-400 hover:text-white">
            🤖 Gemini AI Scanner
          </button>
        </div>

        <div className="flex flex-col items-center justify-center p-8 text-center bg-[#151D2F]/40 border border-white/5 rounded-3xl h-[380px]">
          <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mb-4">
            <Camera className="w-8 h-8 text-[#d4af37] animate-pulse" />
          </div>
          <h3 className="text-sm font-heading font-black text-white">รีเซ็ตข้อมูลภาพ 3D เก่าออกแล้ว</h3>
          <p className="text-[11px] text-slate-400 mt-2 max-w-xs leading-relaxed">
            โมเดล 3 มิติ และรูปภาพข้อมูลเก่าถูกรีเซ็ตลบออกเรียบร้อยแล้ว กรุณาเข้าสู่ระบบแดชบอร์ดจัดการของครูเพื่อเพิ่มอุปกรณ์ชิ้นใหม่
          </p>
        </div>
      </div>
    )
  }

  const currentItem = arItems[selectedItemIndex]
  const currentQuiz = currentItem?.quiz || { q: '', answers: [], correct: 0 }

  const handleQuizAnswer = (idx) => {
    setSelectedAnswer(idx)
    if (idx === currentQuiz.correct) {
      setQuizState('correct')
    } else {
      setQuizState('wrong')
    }
  }

  return (
    <div className="flex flex-col h-full font-sans text-slate-100">
      {/* Mode Selector Tab */}
      <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 mb-3 shrink-0">
        <button
          onClick={() => {
            setMode('sim');
            stopCamera();
            setAiResult(null);
            setQuizState('study');
          }}
          className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${
            mode === 'sim'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          📦 3D & AR Simulation
        </button>
        <button
          onClick={() => {
            setMode('ai');
            stopCamera();
            setQuizState('study');
          }}
          className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${
            mode === 'ai'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🤖 Gemini AI Scanner
        </button>
      </div>

      {/* Mode 1: 3D & AR Simulation Mode */}
      {mode === 'sim' && (
        <>
          {/* Upper Area: AR Scanner / 3D Viewer */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner">
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
                    <span className="text-[10px]">กล้องกำลังทำงาน (หรือโหมดจำลองภาพเสมือน)</span>
                  </div>
                )}

                {/* Scanning Laser Overlay */}
                {scanPhase === 'scanning' && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center pointer-events-none bg-black/35">
                    <div className="w-40 h-40 border-2 border-dashed border-amber-400 rounded-3xl animate-pulse flex items-center justify-center">
                      <div className="w-full h-0.5 bg-amber-400 animate-[bounce_2s_infinite]" />
                    </div>
                    <div className="mt-4 text-[9px] font-bold bg-slate-950/80 px-2.5 py-1.5 rounded-full border border-amber-500/30 text-amber-400 tracking-widest uppercase">
                      🔍 Scanning for QR / Menu Item
                    </div>
                  </div>
                )}

                {/* Loading AR Asset */}
                {scanPhase === 'loading' && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/65 z-20">
                    <RefreshCw className="w-8 h-8 animate-spin text-amber-400 mb-2" />
                    <span className="text-[9px] text-amber-400 font-bold tracking-wider uppercase">Loading 3D AR Model...</span>
                  </div>
                )}

                {/* Interactive 3D Canvas overlaid on top */}
                {scanPhase === 'ready' && (
                  <div className="absolute inset-0 z-30">
                    <ARScene selectedItem={currentItem.id} customShape={currentItem.shape} />
                    
                    <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur border border-[#d4af37]/30 px-3 py-2 rounded-xl text-[9px] text-slate-300 pointer-events-none flex flex-col">
                      <span className="font-bold text-[#d4af37]">✨ โหมดสแกน AR 3D สัมฤทธิ์ผล</span>
                      <span>หมุน / ซูม โมเดล 3 มิติ เพื่อเรียนรู้วัสดุอุปกรณ์จริง</span>
                    </div>
                  </div>
                )}

                {/* Scanner Controls Header */}
                <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-center pointer-events-auto">
                  <span className="bg-slate-950/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-full text-[9px] font-bold text-white flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    AR CAM ACTIVE
                  </span>
                  <button
                    onClick={stopCamera}
                    className="bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 text-[10px] px-3 py-1 rounded-full font-bold transition-all"
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
                  <span className="bg-slate-950/80 border border-white/5 px-2 py-0.5 rounded-lg text-[9px] font-bold text-slate-400">
                    3D Hologram Preview
                  </span>
                  <button
                    onClick={startCamera}
                    className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-lg shadow-amber-500/25 transition-all"
                  >
                    <Camera className="w-3.5 h-3.5" /> สแกน AR ด้วยกล้อง
                  </button>
                </div>

                <div className="z-10 bg-slate-950/70 backdrop-blur border border-white/5 p-2 rounded-xl max-w-xs self-start pointer-events-none">
                  <h4 className="text-[10px] font-bold text-[#d4af37] uppercase tracking-wider">
                    {currentItem.title}
                  </h4>
                  <p className="text-[9px] text-slate-300 mt-0.5 leading-relaxed">
                    {currentItem.description}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Selector tabs */}
          <div className="mt-3 flex gap-2 overflow-x-auto pb-1 max-w-full">
            {arItems.map((item, idx) => (
              <button
                key={item.id || idx}
                onClick={() => {
                  setSelectedItemIndex(idx)
                  setQuizState('study')
                  setSelectedAnswer(null)
                }}
                className={`px-3 py-1.5 text-[10px] font-bold rounded-xl border transition-all whitespace-nowrap ${
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
          <div className="flex-1 mt-3 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5 flex flex-col justify-between overflow-y-auto">
            {quizState === 'study' ? (
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-heading text-sm font-bold text-white flex items-center gap-1.5">
                      {currentItem.title}
                      <span className="text-[10px] font-normal text-slate-400">{currentItem.pronunciation}</span>
                    </h3>
                    <p className="text-xs text-amber-400 font-medium mt-0.5">{currentItem.thai}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(currentItem.title)}
                    className="w-7 h-7 rounded-full bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-400 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                  <span className="text-[9px] uppercase text-slate-500 block font-bold tracking-wider">Example Dialogue:</span>
                  <p className="text-slate-200 text-xs italic mt-1 font-serif">
                    "{currentItem.sentence}"
                  </p>
                  <button
                    onClick={() => handleSpeak(currentItem.sentence)}
                    className="mt-2 text-[9px] text-amber-400 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> ฟังประโยคสนทนา
                  </button>
                </div>

                {currentQuiz.q && (
                  <button
                    onClick={() => setQuizState('question')}
                    className="w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-[10px] py-2.5 rounded-xl flex items-center justify-center gap-1 transition"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-amber-400" /> ทำแบบสอบถามคำศัพท์ (Vocab Quiz)
                  </button>
                )}
              </div>
            ) : (
              /* Quiz Mode */
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[9px] uppercase text-amber-400 font-bold tracking-widest">Vocabulary Quiz</span>
                    <button
                      onClick={() => setQuizState('study')}
                      className="text-[9px] text-slate-400 hover:text-white"
                    >
                      ย้อนกลับไปอ่าน
                    </button>
                  </div>
                  <h4 className="text-slate-200 text-xs font-semibold mb-2">
                    {currentQuiz.q}
                  </h4>
                  <div className="space-y-1.5">
                    {currentQuiz.answers.map((ans, idx) => (
                      <button
                        key={idx}
                        disabled={quizState === 'correct' || quizState === 'wrong'}
                        onClick={() => handleQuizAnswer(idx)}
                        className={`w-full text-left p-2.5 rounded-xl text-[10px] transition border flex justify-between items-center ${
                          selectedAnswer === idx
                            ? idx === currentQuiz.correct
                              ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400 font-bold'
                              : 'bg-rose-500/10 border-rose-500 text-rose-400 font-bold'
                            : 'bg-white/5 border-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        {ans}
                        {selectedAnswer === idx && (
                          idx === currentQuiz.correct ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  {quizState === 'correct' && (
                    <div className="bg-emerald-500/15 border border-emerald-500/30 p-2 rounded-xl text-[9px] text-emerald-400 flex items-center gap-1.5 mb-2">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>คำตอบถูกต้อง! ยอดเยี่ยมมากสำหรับการเรียนรู้คำศัพท์นี้</span>
                    </div>
                  )}
                  {quizState === 'wrong' && (
                    <div className="bg-rose-500/15 border border-rose-500/30 p-2 rounded-xl text-[9px] text-rose-400 flex items-center gap-1.5 mb-2">
                      <div className="w-3.5 h-3.5 rounded-full border-2 border-rose-500 shrink-0" />
                      <span>ยังไม่ถูกต้อง ลองศึกษาคำตอบอีกครั้งหรือกดย้อนกลับ</span>
                    </div>
                  )}
                  <button
                    onClick={() => {
                      setQuizState('study')
                      setSelectedAnswer(null)
                      if (quizState === 'correct') {
                        setSelectedItemIndex(prev => (prev + 1) % arItems.length)
                      }
                    }}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[10px] py-2 rounded-xl flex items-center justify-center gap-1 transition"
                  >
                    เรียนรู้อุปกรณ์ชิ้นถัดไป <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {/* Mode 2: Gemini AI Scanner Mode */}
      {mode === 'ai' && (
        <div className="flex-grow flex flex-col justify-between overflow-y-auto">
          {/* Upper Area: Gemini AI Camera Viewport */}
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shadow-inner shrink-0">
            {isScanning ? (
              <div className="absolute inset-0 z-10 flex flex-col justify-between">
                {/* Live Camera View */}
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
                    <span className="text-[10px]">กล้องกำลังทำงาน (หรือโหมดจำลองภาพเสมือน)</span>
                  </div>
                )}

                {/* AI Laser Scanning Effect */}
                {scanPhase === 'scanning' && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/20 pointer-events-none">
                    <div className="w-36 h-36 border-2 border-cyan-400 rounded-3xl animate-pulse flex items-center justify-center">
                      <div className="w-full h-0.5 bg-cyan-400 shadow-[0_0_8px_cyan] animate-[bounce_2s_infinite]" />
                    </div>
                    <div className="mt-3 text-[9px] font-bold bg-slate-950/80 px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 tracking-wider">
                      🤖 POINT CAMERA & CAPTURE
                    </div>
                  </div>
                )}

                {/* Resolving / Submitting to Gemini */}
                {scanPhase === 'resolving' && (
                  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/80 z-20 p-4 text-center">
                    <RefreshCw className="w-8 h-8 animate-spin text-cyan-400 mb-2" />
                    <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-widest mb-2">Analyzing with Gemini AI...</span>
                    
                    {/* Live Resolving Logs */}
                    <div className="w-full max-w-[240px] bg-slate-950/90 border border-white/5 rounded-xl p-2.5 text-[8px] font-mono text-left space-y-1">
                      {scanLogs.map((log, idx) => (
                        <div key={idx} className={`${
                          log.type === 'success' ? 'text-emerald-400' : log.type === 'warning' ? 'text-amber-400' : 'text-slate-400'
                        }`}>
                          &gt; {log.text}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Capture overlay controls */}
                <div className="absolute bottom-4 left-4 right-4 z-40 flex justify-center gap-3">
                  {scanPhase === 'scanning' && (
                    <button
                      onClick={handleCaptureAndAnalyze}
                      className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[10px] px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-cyan-500/25 transition-all"
                    >
                      📸 ถ่ายภาพ & วิเคราะห์ด้วย AI
                    </button>
                  )}
                </div>

                {/* Top header controls */}
                <div className="absolute top-4 left-4 right-4 z-40 flex justify-between items-center pointer-events-auto">
                  <span className="bg-slate-950/80 backdrop-blur border border-white/10 px-2 py-0.5 rounded-full text-[9px] font-bold text-cyan-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                    GEMINI LENS
                  </span>
                  <button
                    onClick={stopCamera}
                    className="bg-rose-500/20 border border-rose-500/40 text-rose-300 hover:bg-rose-500/30 text-[9px] px-2.5 py-0.5 rounded-full font-bold transition-all"
                  >
                    ปิดกล้อง
                  </button>
                </div>
              </div>
            ) : (
              /* Idle / Standby View */
              <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl flex items-center justify-center mb-3">
                  <Camera className="w-6 h-6 text-cyan-400 animate-pulse" />
                </div>
                <h4 className="text-xs font-bold text-white">เปิดกล้องสแกนด้วย Gemini AI</h4>
                <p className="text-[9px] text-slate-400 mt-1 max-w-[250px] leading-relaxed">
                  สแกนภาชนะ อุปกรณ์ หรือขวดไวน์รอบตัวคุณ เพื่อเรียนรู้อธิบายคำศัพท์ วิธีจับใช้งาน และตัวอย่างบทสนทนาทันที
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={startCamera}
                    className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-[9px] px-4 py-2 rounded-xl flex items-center gap-1 transition"
                  >
                    <Camera className="w-3.5 h-3.5" /> เปิดใช้งานเลนส์ AI
                  </button>
                  <button
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                    className="bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 font-bold text-[9px] px-3 py-2 rounded-xl flex items-center gap-1 transition"
                  >
                    <Key className="w-3.5 h-3.5" /> คีย์ Gemini
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Optional custom API key form */}
          {showApiKeyInput && (
            <div className="mt-2 p-3 bg-slate-950/80 border border-cyan-500/20 rounded-xl space-y-1.5 shrink-0">
              <label className="text-[8px] uppercase tracking-wider text-cyan-400 font-bold block">ระบุ Gemini API Key ของคุณ (ไม่บังคับ - มีระบบ Fallback)</label>
              <input
                type="password"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
                placeholder="AIzaSy..."
                className="w-full bg-slate-900 border border-white/10 rounded-lg px-2.5 py-1.5 text-[9px] font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
              />
              <p className="text-[7px] text-slate-500 leading-snug">
                *ระบบมี Mock Fallback อัตโนมัติในกรณีไม่มีคีย์ โดยการสุ่มสแกนแก้วไวน์ แก้วกาแฟ ช้อนขนมหวาน และผ้าเช็ดปาก
              </p>
            </div>
          )}

          {/* AI Result Cards */}
          {aiResult ? (
            <div className="mt-3 space-y-3 flex-grow">
              {/* 1. Header Information */}
              <div className="bg-[#151D2F]/40 border border-white/5 p-4 rounded-2xl">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-[8px] uppercase text-cyan-400 font-bold tracking-widest flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Gemini AI Resolved Object
                    </span>
                    <h3 className="font-heading text-sm font-bold text-white mt-1">
                      {aiResult.object_name_en}
                    </h3>
                    <p className="text-xs text-[#d4af37] font-medium mt-0.5">{aiResult.object_name_th}</p>
                  </div>
                  <button
                    onClick={() => handleSpeak(aiResult.object_name_en)}
                    className="w-7 h-7 rounded-full bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center text-cyan-400 transition"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="mt-2.5 text-[9px] text-slate-300 leading-relaxed border-t border-white/5 pt-2 space-y-1 font-sans">
                  <div>
                    <span className="font-bold text-white block">📖 คำอธิบายวัสดุ (Description):</span>
                    <span className="text-slate-400 italic">"{aiResult.description_en}"</span>
                    <span className="block text-slate-400 mt-0.5">{aiResult.description_th}</span>
                  </div>
                </div>
              </div>

              {/* 2. Usage Instructions (คำแนะนำการใช้งาน) */}
              <div className="bg-[#151D2F]/40 border border-white/5 p-4 rounded-2xl space-y-1">
                <span className="text-[8px] uppercase text-[#d4af37] font-bold tracking-widest flex items-center gap-1">
                  <Info className="w-3.5 h-3.5" /> วิธีการจับและใช้บริการ (Usage Guide)
                </span>
                <div className="text-[9px] text-slate-300 leading-relaxed pt-1 space-y-1.5 font-sans">
                  <div>
                    <span className="font-semibold text-slate-200">English Instruction:</span>
                    <p className="text-slate-400">"{aiResult.how_to_use_en}"</p>
                  </div>
                  <div className="border-t border-white/5 pt-1.5">
                    <span className="font-semibold text-slate-200">คู่มือบริการภาษาไทย:</span>
                    <p className="text-slate-400">{aiResult.how_to_use_th}</p>
                  </div>
                </div>
              </div>

              {/* 3. Dialogue Example (ตัวอย่างบทสนทนา) */}
              <div className="bg-[#151D2F]/40 border border-white/5 p-4 rounded-2xl space-y-1">
                <span className="text-[8px] uppercase text-emerald-400 font-bold tracking-widest flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> บทสนทนาบริการจำลอง (Service Dialogue)
                </span>
                <div className="text-[9px] leading-relaxed pt-1 space-y-1.5">
                  <div className="bg-slate-950/60 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Dialogue English:</span>
                    <p className="text-slate-200 italic font-serif mt-0.5 whitespace-pre-line">
                      {aiResult.dialogue_en}
                    </p>
                    <button
                      onClick={() => handleSpeak(aiResult.dialogue_en)}
                      className="mt-1.5 text-[8px] text-cyan-400 font-bold hover:underline flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" /> ฟังเสียงบทสนทนา
                    </button>
                  </div>
                  <div className="bg-slate-950/40 p-2.5 rounded-xl border border-white/5 text-slate-400 font-sans">
                    <span className="text-[8px] text-slate-500 block uppercase font-sans">คำแปลภาษาไทย:</span>
                    <p className="mt-0.5 whitespace-pre-line">
                      {aiResult.dialogue_th}
                    </p>
                  </div>
                </div>
              </div>

              {/* 4. Speech Practice (ฝึกพูดออกเสียง) */}
              <div className="bg-slate-950/80 border border-cyan-500/20 p-4 rounded-2xl space-y-3">
                <div>
                  <span className="text-[8px] uppercase text-cyan-400 font-bold tracking-widest flex items-center gap-1">
                    <ClipboardList className="w-3.5 h-3.5" /> ฝึกอ่านออกเสียงกับ AI (Speech Practice)
                  </span>
                  <p className="text-[9px] text-slate-400 mt-1">
                    ฝึกออกเสียงประโยคบริการด้านล่างนี้ และกดปุ่มไมโครโฟนเพื่อทำการประเมินสำเนียงและจังหวะพูด
                  </p>
                </div>

                <div className="bg-slate-900/60 p-3 rounded-xl border border-white/5">
                  <p className="text-white text-xs font-bold font-serif leading-relaxed">
                    "{aiResult.practice_phrase || `This is a ${aiResult.object_name_en.toLowerCase()}.`}"
                  </p>
                  <button
                    onClick={() => handleSpeak(aiResult.practice_phrase)}
                    className="mt-2 text-[8px] text-amber-400 font-bold hover:underline flex items-center gap-1.5"
                  >
                    <Volume2 className="w-3.5 h-3.5" /> ฟังตัวอย่างเสียงอ่าน
                  </button>
                </div>

                {/* Mic Record Toggle */}
                <div className="flex flex-col items-center py-2 bg-[#151D2F]/20 rounded-xl border border-white/5">
                  <button
                    onClick={() => toggleRecording(aiResult.practice_phrase)}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 transition-all ${
                      isRecording
                        ? 'bg-rose-500 animate-pulse text-white shadow-lg shadow-rose-500/25'
                        : 'bg-cyan-400 hover:bg-cyan-300 shadow-md shadow-cyan-400/10 hover:scale-105'
                    }`}
                  >
                    {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                  <span className="text-[9px] text-slate-400 mt-2 font-medium">
                    {isRecording ? 'กำลังฟังเสียงพูดของคุณ...' : 'แตะเพื่อเปิดไมโครโฟนและเริ่มออกเสียง'}
                  </span>
                  {!isSpeechSupported && (
                    <div className="mt-1.5 text-[8px] text-amber-500 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                      <AlertCircle className="w-3 h-3" /> บราวเซอร์ไม่รองรับ Speech API (เปิดระบบจำลองคะแนนเสียง)
                    </div>
                  )}
                </div>

                {/* Pronunciation Feedback */}
                {spokenText && (
                  <div className="space-y-3 pt-2 border-t border-white/5">
                    <div className="space-y-1">
                      <span className="text-[8px] text-slate-500 uppercase block font-semibold">สิ่งที่คุณออกเสียง:</span>
                      <p className="text-white text-xs italic font-serif font-semibold">"{spokenText}"</p>
                    </div>

                    {scores.pronunciation !== null && (
                      <div className="space-y-2.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-white flex items-center gap-1">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" /> คะแนนการออกเสียง: {getOverallScore()}%
                          </span>
                          <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded-md ${
                            getOverallScore() >= 80 ? 'bg-emerald-400/10 text-emerald-400' : 'bg-amber-400/10 text-amber-400'
                          }`}>
                            {getOverallScore() >= 80 ? 'ดีเยี่ยม (Excellent)' : 'ผ่านเกณฑ์ (Keep practicing)'}
                          </span>
                        </div>

                        {/* Visual bar charts */}
                        <div className="grid grid-cols-1 gap-2 text-[9px] font-sans">
                          <div>
                            <div className="flex justify-between text-slate-400 mb-0.5">
                              <span>Pronunciation (ออกเสียงถูกต้อง)</span>
                              <span className="text-cyan-400 font-bold">{scores.pronunciation}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-cyan-400 h-full rounded-full transition-all duration-700" style={{ width: `${scores.pronunciation}%` }} />
                            </div>
                          </div>
                          <div>
                            <div className="flex justify-between text-slate-400 mb-0.5">
                              <span>Fluency (ความลื่นไหลเป็นธรรมชาติ)</span>
                              <span className="text-amber-400 font-bold">{scores.fluency}%</span>
                            </div>
                            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                              <div className="bg-amber-400 h-full rounded-full transition-all duration-700" style={{ width: `${scores.fluency}%` }} />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Try scanning again */}
              <button
                onClick={() => {
                  setAiResult(null)
                  startCamera()
                }}
                className="w-full bg-[#151D2F]/60 hover:bg-[#151D2F]/80 text-white font-bold text-[10px] py-2.5 rounded-xl border border-white/5 flex items-center justify-center gap-1.5 transition shrink-0"
              >
                🔄 สแกนวิเคราะห์วัตถุชิ้นอื่นต่อ
              </button>
            </div>
          ) : (
            /* Idle Instruction */
            !isScanning && (
              <div className="flex-1 flex flex-col justify-center items-center p-8 text-center text-slate-500 font-sans border border-dashed border-white/10 rounded-2xl mt-3">
                <Layers className="w-10 h-10 text-slate-600 mb-3" />
                <h4 className="text-xs font-bold text-slate-300">เลนส์วิเคราะห์วัตถุอัจฉริยะ</h4>
                <p className="text-[9px] text-slate-400 mt-1 max-w-[200px] leading-relaxed">
                  คลิกปุ่ม **"เปิดใช้งานเลนส์ AI"** เพื่อเปิดกล้อง ถ่ายรูปอุปกรณ์อาหารบริการรอบตัว แล้วให้ Gemini วิเคราะห์และพาฝึกพูดทันที
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  )
}
