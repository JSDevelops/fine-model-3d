"use client";

import React, { useState, useEffect, useRef } from 'react'
import { 
  Mic, 
  MicOff, 
  Volume2, 
  Sparkles, 
  AlertCircle, 
  RefreshCw, 
  Camera, 
  CameraOff, 
  Wifi, 
  WifiOff, 
  Key, 
  Play, 
  Square,
  MessageSquare,
  VolumeX
} from 'lucide-react'

// Speech similarity analyzer (Levenshtein & word overlap)
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
  
  const track = Array(s2.length + 1).fill(null).map(() => Array(s1.length + 1).fill(null));
  for (let i = 0; i <= s1.length; i += 1) track[0][i] = i;
  for (let j = 0; j <= s2.length; j += 1) track[j][0] = j;
  for (let j = 1; j <= s2.length; j += 1) {
    for (let i = 1; i <= s1.length; i += 1) {
      const indicator = s1[i - 1] === s2[j - 1] ? 0 : 1;
      track[j][i] = Math.min(
        track[j][i - 1] + 1,
        track[j - 1][i] + 1,
        track[j - 1][i - 1] + indicator
      );
    }
  }
  const levDistance = track[s2.length][s1.length];
  const maxLength = Math.max(s1.length, s2.length);
  const charScore = ((maxLength - levDistance) / maxLength) * 100;
  
  const finalScore = Math.round(wordScore * 0.6 + charScore * 0.4);
  return Math.max(0, Math.min(100, finalScore));
}

const MOCK_CONVERSATIONS = [
  { prompt: "Greeting & Welcoming", ai: "Welcome to Fine Dining Restaurant, my name is Alex. How may I assist you today?", user: "Hello, we have a reservation for two under Siriwan." },
  { prompt: "Taking Food Orders", ai: "Excellent. For the main course tonight, I recommend our Chef's Special Beef Steak. Would you like to try it?", user: "Yes, that sounds delicious. What is the preparation time?" },
  { prompt: "Wine Recommendation", ai: "Our Cabernet Sauvignon pairs perfectly with the beef steak. Would you like a glass or a full bottle?", user: "We would prefer a glass of red wine, please." },
  { prompt: "Handling Complains", ai: "I sincerely apologize for the delay. Let me check with our kitchen chef right away.", user: "Thank you. We appreciate your quick service." }
]

export default function Interact({ onSaveScore }) {
  const [activeTab, setActiveTab] = useState('standard') // 'standard' | 'live'
  
  // Standard Mode State
  const [selectedPromptIdx, setSelectedPromptIdx] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [scores, setScores] = useState({ pronunciation: null, fluency: null, confidence: null })
  const [isSpeechSupported, setIsSpeechSupported] = useState(false)
  const recognitionRef = useRef(null)

  const prompts = [
    {
      label: "การทักทายลูกค้า (Greeting)",
      text: "Good evening, sir. Do you have a reservation under your name?",
      thai: "สวัสดีตอนเย็นครับท่าน ไม่ทราบว่าได้ทำการจองไว้ในชื่อของคุณไหมครับ?"
    },
    {
      label: "การแนะนำเมนูเด่น (Menu Recommendation)",
      text: "May I recommend our chef's special beef steak for tonight?",
      thai: "ขออนุญาตแนะนำสเต็กเนื้อสูตรพิเศษจากเชฟในค่ำคืนนี้ดีไหมครับ?"
    },
    {
      label: "การแก้ปัญหาอาหารช้า (Service Delay Recovery)",
      text: "I am terribly sorry for the delay. I will check with the kitchen immediately.",
      thai: "ผมต้องกราบขออภัยอย่างสูงในความล่าช้าครับ จะรีบดำเนินการเช็กกับทางห้องครัวให้ทันทีครับ"
    }
  ]
  const currentPrompt = prompts[selectedPromptIdx]

  // Live Mode State
  const [customApiKey, setCustomApiKey] = useState('AIzaSyAkk92tJrfj-f5R40wPyHIRquBK1qdCIdE')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [liveStatus, setLiveStatus] = useState('disconnected') // 'disconnected' | 'connecting' | 'connected'
  const [liveCamera, setLiveCamera] = useState(false)
  const [liveLogs, setLiveLogs] = useState([])
  const [liveTranscript, setLiveTranscript] = useState([
    { sender: 'ai', text: "Welcome to FINE Multimodal Voice Coach. Click 'เชื่อมต่อ Live API' to begin." }
  ])
  const [isLiveSpeaking, setIsLiveSpeaking] = useState(false)

  const socketRef = useRef(null)
  const audioCtxRef = useRef(null)
  const inputAudioCtxRef = useRef(null)
  const micNodeRef = useRef(null)
  const videoRef = useRef(null)
  const streamRef = useRef(null)
  const mediaStreamRef = useRef(null)
  const nextAudioStartTimeRef = useRef(0)
  const simulationIntervalRef = useRef(null)
  const cameraIntervalRef = useRef(null)

  // Initialize Speech Recognition for Standard Mode
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSpeechSupported(true)
      }
    }
  }, [])

  // Standard Mode Speech Recognition setup
  useEffect(() => {
    if (typeof window === 'undefined') return
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition && activeTab === 'standard') {
      const rec = new SpeechRecognition()
      rec.continuous = false;
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;

      rec.onstart = () => {
        setIsRecording(true)
        setSpokenText('')
        setScores({ pronunciation: null, fluency: null, confidence: null })
      }

      rec.onresult = (event) => {
        const transcript = event.results[0][0].transcript
        setSpokenText(transcript)
        
        const similarity = calculateSimilarity(currentPrompt.text, transcript)
        const fluencyScore = Math.max(40, Math.min(100, Math.round(similarity - 5 + Math.random() * 10)))
        const confidenceScore = Math.max(50, Math.min(100, Math.round(similarity + Math.random() * 5)))
        
        setScores({
          pronunciation: similarity,
          fluency: fluencyScore,
          confidence: confidenceScore
        })

        if (onSaveScore) {
          onSaveScore('AI Speaking Coach: ' + currentPrompt.label.split(' ')[0], similarity)
        }
      }

      rec.onerror = (e) => {
        console.error("Speech recognition error", e.error)
        setIsRecording(false)
      }

      rec.onend = () => {
        setIsRecording(false)
      }

      recognitionRef.current = rec
    }
  }, [selectedPromptIdx, activeTab])

  // Stop camera and mic when switching tabs or unmounting
  useEffect(() => {
    return () => {
      disconnectLive();
    }
  }, [])

  // Standard voice recording toggle
  const toggleRecording = () => {
    if (!isSpeechSupported) {
      simulateVoiceCoach()
      return
    }

    if (isRecording) {
      recognitionRef.current.stop()
    } else {
      try {
        recognitionRef.current.start()
      } catch (e) {
        console.error(e)
      }
    }
  }

  const simulateVoiceCoach = () => {
    setIsRecording(true)
    setSpokenText('กำลังจำลองบทพูดของคุณ...')
    setScores({ pronunciation: null, fluency: null, confidence: null })
    
    setTimeout(() => {
      setIsRecording(false)
      const mockSpokenText = currentPrompt.text.split(' ').slice(0, -1).join(' ') + "..."
      setSpokenText(mockSpokenText)
      
      const pScore = Math.floor(Math.random() * 15) + 82
      const fScore = Math.floor(Math.random() * 15) + 80
      const cScore = Math.floor(Math.random() * 15) + 85
      
      setScores({
        pronunciation: pScore,
        fluency: fScore,
        confidence: cScore
      })

      if (onSaveScore) {
        onSaveScore('AI Speaking Coach: ' + currentPrompt.label.split(' ')[0], pScore)
      }
    }, 2000)
  }

  const handleSpeakSample = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      const utterance = new SpeechSynthesisUtterance(currentPrompt.text)
      utterance.lang = 'en-US'
      utterance.rate = 0.85
      window.speechSynthesis.speak(utterance)
    }
  }

  const getOverallScore = () => {
    if (scores.pronunciation === null) return 0
    return Math.round((scores.pronunciation + scores.fluency + scores.confidence) / 3)
  }

  // --- GEMINI LIVE API CONNECTION LOGIC ---

  const connectLive = async () => {
    setLiveStatus('connecting')
    setLiveLogs([{ text: 'กำลังเริ่มต้นช่องสัญญาณเสียง...', type: 'info' }])
    setLiveTranscript([{ sender: 'system', text: 'กำลังเชื่อมต่อระบบ Live API...' }])

    const apiKey = customApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''
    
    if (!apiKey) {
      setLiveLogs(prev => [...prev, { text: 'ไม่พบ API Key รันระบบทดสอบจำลองภาพและเสียง (Simulator)...', type: 'warning' }])
      setTimeout(startLiveSimulation, 1500)
      return
    }

    try {
      // Initialize output AudioContext (24kHz PCM for Gemini response)
      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      audioCtxRef.current = new AudioContextClass({ sampleRate: 24000 })
      nextAudioStartTimeRef.current = 0

      // Connect WebSocket
      const wsUrl = `wss://generativelanguage.googleapis.com/ws/google.ai.generativelanguage.v1alpha.GenerativeService.BidiGenerateContent?key=${apiKey}`
      const ws = new WebSocket(wsUrl)
      socketRef.current = ws

      ws.onopen = () => {
        setLiveStatus('connected')
        setLiveLogs(prev => [...prev, { text: 'เชื่อมต่อกับเซิร์ฟเวอร์ Gemini แล้ว', type: 'success' }])
        setLiveTranscript([{ sender: 'ai', text: "Hello! I am your real-time Gemini Voice Coach. Let's practice hospitality dialogue. Tell me your name." }])

        // Send Setup Config
        const setupMsg = {
          setup: {
            model: "models/gemini-2.0-flash-exp",
            generationConfig: {
              responseModalities: ["AUDIO", "TEXT"],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: "Aoede" // Aoede, Charon, Fenrir, Kore, Puck
                  }
                }
              }
            }
          }
        }
        ws.send(JSON.stringify(setupMsg))

        // Start mic stream
        startMicStream()

        // Start camera stream if selected
        if (liveCamera) {
          startLiveCamera()
        }
      }

      ws.onmessage = async (event) => {
        try {
          const message = JSON.parse(event.data)
          
          // Handle server content / parts
          const modelTurn = message.serverContent?.modelTurn
          if (modelTurn) {
            const parts = modelTurn.parts || []
            for (const part of parts) {
              // Handle incoming text
              if (part.text) {
                setLiveTranscript(prev => {
                  const last = prev[prev.length - 1]
                  if (last && last.sender === 'ai') {
                    // Append text
                    return [...prev.slice(0, -1), { sender: 'ai', text: last.text + part.text }]
                  }
                  return [...prev, { sender: 'ai', text: part.text }]
                })
              }
              
              // Handle incoming audio data
              const inlineData = part.inlineData
              if (inlineData && inlineData.data && inlineData.mimeType?.startsWith('audio/pcm')) {
                playPcmChunk(inlineData.data)
              }
            }
          }
        } catch (e) {
          console.error("Error parsing Live WS message:", e)
        }
      }

      ws.onerror = (err) => {
        console.error("Live WebSocket error:", err)
        setLiveLogs(prev => [...prev, { text: 'เกิดข้อผิดพลาดในการเชื่อมต่อ WebSocket', type: 'error' }])
      }

      ws.onclose = () => {
        setLiveStatus('disconnected')
        setLiveLogs(prev => [...prev, { text: 'ปิดการเชื่อมต่อ WebSocket แล้ว', type: 'info' }])
        disconnectLive()
      }

    } catch (err) {
      console.error("Failed to connect to Live API:", err)
      setLiveLogs(prev => [...prev, { text: 'เชื่อมต่อล้มเหลว โหลดโหมดจำลอง (Simulator)...', type: 'error' }])
      startLiveSimulation()
    }
  }

  const disconnectLive = () => {
    // Close WebSocket
    if (socketRef.current) {
      socketRef.current.close()
      socketRef.current = null
    }

    // Stop mic stream
    if (micNodeRef.current) {
      micNodeRef.current.disconnect()
      micNodeRef.current = null
    }
    if (inputAudioCtxRef.current) {
      inputAudioCtxRef.current.close()
      inputAudioCtxRef.current = null
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(t => t.stop())
      mediaStreamRef.current = null
    }

    // Stop output audio
    if (audioCtxRef.current) {
      audioCtxRef.current.close()
      audioCtxRef.current = null
    }

    // Stop camera
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop())
      streamRef.current = null
    }
    if (cameraIntervalRef.current) {
      clearInterval(cameraIntervalRef.current)
      cameraIntervalRef.current = null
    }

    // Stop simulation
    if (simulationIntervalRef.current) {
      clearInterval(simulationIntervalRef.current)
      simulationIntervalRef.current = null
    }

    setLiveStatus('disconnected')
    setIsLiveSpeaking(false)
  }

  const startMicStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      mediaStreamRef.current = stream

      const AudioContextClass = window.AudioContext || window.webkitAudioContext
      // Create a dedicated input context resampled at 16000Hz (expected by Gemini PCM)
      const inputCtx = new AudioContextClass({ sampleRate: 16000 })
      inputAudioCtxRef.current = inputCtx

      const source = inputCtx.createMediaStreamSource(stream)
      // script processor node to process 16kHz audio buffer
      const processor = inputCtx.createScriptProcessor(2048, 1, 1)
      micNodeRef.current = processor

      processor.onaudioprocess = (e) => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN) {
          const floatSamples = e.inputBuffer.getChannelData(0)
          
          // Convert Float32 to Int16 PCM
          const int16Samples = new Int16Array(floatSamples.length)
          for (let i = 0; i < floatSamples.length; i++) {
            const s = Math.max(-1, Math.min(1, floatSamples[i]))
            int16Samples[i] = s < 0 ? s * 0x8000 : s * 0x7FFF
          }

          // Convert Int16 PCM to Base64
          const base64Audio = arrayBufferToBase64(int16Samples.buffer)

          // Send real-time input chunk
          const audioChunk = {
            realtimeInput: {
              mediaChunks: [
                {
                  mimeType: "audio/pcm;rate=16000",
                  data: base64Audio
                }
              ]
            }
          }
          socketRef.current.send(JSON.stringify(audioChunk))
        }
      }

      source.connect(processor)
      processor.connect(inputCtx.destination)

    } catch (err) {
      console.error("Failed to capture mic for Live API:", err)
      setLiveLogs(prev => [...prev, { text: 'ไม่สามารถสตรีมไมโครโฟนได้: ' + err.message, type: 'error' }])
    }
  }

  const playPcmChunk = (base64Data) => {
    if (!audioCtxRef.current) return

    try {
      const raw = window.atob(base64Data)
      const rawLength = raw.length
      const bytes = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; i++) {
        bytes[i] = raw.charCodeAt(i)
      }

      // Convert PCM 16-bit to Float32
      const int16Samples = new Int16Array(bytes.buffer)
      const floatSamples = new Float32Array(int16Samples.length)
      for (let i = 0; i < int16Samples.length; i++) {
        floatSamples[i] = int16Samples[i] / 32768.0
      }

      // Play buffer sequentially
      const audioBuffer = audioCtxRef.current.createBuffer(1, floatSamples.length, 24000)
      audioBuffer.copyToChannel(floatSamples, 0)

      const source = audioCtxRef.current.createBufferSource()
      source.buffer = audioBuffer
      source.connect(audioCtxRef.current.destination)

      const now = audioCtxRef.current.currentTime
      if (nextAudioStartTimeRef.current < now) {
        nextAudioStartTimeRef.current = now
      }

      source.start(nextAudioStartTimeRef.current)
      nextAudioStartTimeRef.current += audioBuffer.duration
      setIsLiveSpeaking(true)

      source.onended = () => {
        if (audioCtxRef.current && audioCtxRef.current.currentTime >= nextAudioStartTimeRef.current - 0.05) {
          setIsLiveSpeaking(false)
        }
      }

    } catch (err) {
      console.error("Error decoding/playing PCM chunk:", err)
    }
  }

  const toggleLiveCamera = async () => {
    if (liveStatus === 'connected') {
      if (liveCamera) {
        // Stop camera
        if (streamRef.current) {
          streamRef.current.getTracks().forEach(t => t.stop())
          streamRef.current = null
        }
        if (cameraIntervalRef.current) {
          clearInterval(cameraIntervalRef.current)
          cameraIntervalRef.current = null
        }
        setLiveCamera(false)
      } else {
        // Start camera
        startLiveCamera()
        setLiveCamera(true)
      }
    } else {
      setLiveCamera(!liveCamera)
    }
  }

  const startLiveCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 320, height: 240 }
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      // Grab base64 image frames at 1fps and stream to WebSocket
      cameraIntervalRef.current = setInterval(async () => {
        if (socketRef.current && socketRef.current.readyState === WebSocket.OPEN && videoRef.current) {
          const canvas = document.createElement('canvas')
          canvas.width = 320
          canvas.height = 240
          const ctx = canvas.getContext('2d')
          ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
          const dataUrl = canvas.toDataURL('image/jpeg', 0.6)
          const base64Frame = dataUrl.split(',')[1]

          const frameChunk = {
            realtimeInput: {
              mediaChunks: [
                {
                  mimeType: "image/jpeg",
                  data: base64Frame
                }
              ]
            }
          }
          socketRef.current.send(JSON.stringify(frameChunk))
        }
      }, 1200)

    } catch (err) {
      console.error("Live Camera start error:", err)
      setLiveLogs(prev => [...prev, { text: 'ไม่สามารถเปิดกล้องได้: ' + err.message, type: 'error' }])
      setLiveCamera(false)
    }
  }

  // --- LOCAL SIMULATION MODE LOGIC (Fallback) ---

  const startLiveSimulation = () => {
    setLiveStatus('connected')
    setLiveLogs(prev => [...prev, { text: 'เปิดใช้งานโหมดจำลอง Live Chat (Simulator)', type: 'success' }])
    
    const initialText = "Hello! I am your AI hospitality simulation trainer. Let's practice table greeting and order taking. How can I help you today?"
    setLiveTranscript([{ sender: 'ai', text: initialText }])
    handleSpeak(initialText)

    let round = 0
    simulationIntervalRef.current = setInterval(() => {
      if (round < MOCK_CONVERSATIONS.length) {
        const stage = MOCK_CONVERSATIONS[round]
        
        // 1. Simulate student response in transcript
        setTimeout(() => {
          setLiveTranscript(prev => [...prev, { sender: 'user', text: stage.user }])
          setLiveLogs(prev => [...prev, { text: `ได้รับข้อความจากนักเรียน (ด่าน ${stage.prompt})`, type: 'info' }])
        }, 5000)

        // 2. Simulate AI response
        setTimeout(() => {
          setLiveTranscript(prev => [...prev, { sender: 'ai', text: stage.ai }])
          handleSpeak(stage.ai)
          setIsLiveSpeaking(true)
          setTimeout(() => setIsLiveSpeaking(false), 3000)
        }, 8500)

        round++
      } else {
        clearInterval(simulationIntervalRef.current)
      }
    }, 12000)
  }

  // Helper buffers
  function arrayBufferToBase64(buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  return (
    <div className="flex flex-col h-full font-sans text-slate-100 justify-between">
      {/* Mode Selector Header */}
      <div className="flex bg-slate-950 p-1 rounded-xl border border-white/5 mb-3 shrink-0">
        <button
          onClick={() => {
            setActiveTab('standard');
            disconnectLive();
          }}
          className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${
            activeTab === 'standard'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          💬 Standard Prompts
        </button>
        <button
          onClick={() => {
            setActiveTab('live');
          }}
          className={`flex-1 py-1.5 text-[10px] font-black rounded-lg transition-all ${
            activeTab === 'live'
              ? 'bg-amber-500 text-slate-950 shadow-md'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🎙️ Gemini Live Coach
        </button>
      </div>

      {/* TAB 1: STANDARD PROMPTS MODE */}
      {activeTab === 'standard' && (
        <div className="flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Prompts selection */}
          <div className="space-y-2.5">
            <label className="text-[9px] uppercase text-[#d4af37] tracking-widest font-black block">
              เลือกโจทย์การฝึกพูดกับ AI (Speaking Prompt)
            </label>
            <div className="grid grid-cols-1 gap-1.5">
              {prompts.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSelectedPromptIdx(idx)
                    setSpokenText('')
                    setScores({ pronunciation: null, fluency: null, confidence: null })
                  }}
                  className={`text-left p-2.5 rounded-xl border text-[10px] transition leading-snug ${
                    selectedPromptIdx === idx
                      ? 'bg-amber-500/10 border-amber-500/40 text-white'
                      : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
                  }`}
                >
                  <span className={`font-bold block ${selectedPromptIdx === idx ? 'text-[#d4af37]' : 'text-slate-400'}`}>
                    {p.label}
                  </span>
                  <span className="truncate block font-mono text-[9px] text-slate-500">{p.text}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt Detail Card */}
          <div className="mt-3 bg-[#151D2F]/40 border border-white/5 p-4 rounded-2xl relative overflow-hidden">
            <div className="absolute top-3 right-3 text-[8px] uppercase tracking-wider text-cyan-400 font-bold bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
              Target Script
            </div>
            <span className="text-[8px] text-slate-500 uppercase block font-semibold">ฝึกพูดตามสคริปต์ด้านล่าง:</span>
            <h2 className="text-white text-xs font-bold mt-1 leading-relaxed font-serif">
              "{currentPrompt.text}"
            </h2>
            <p className="text-amber-400 text-[10px] mt-1 font-medium">{currentPrompt.thai}</p>

            <button
              onClick={handleSpeakSample}
              className="mt-2.5 text-[8px] text-amber-400 font-bold hover:underline flex items-center gap-1"
            >
              <Volume2 className="w-3.5 h-3.5" /> ฟังตัวอย่างเสียงเจ้าของภาษา
            </button>
          </div>

          {/* Micro Recording Button */}
          <div className="mt-3 flex flex-col items-center justify-center py-3 bg-slate-950/40 border border-white/5 rounded-2xl">
            <button
              onClick={toggleRecording}
              className={`w-12 h-12 rounded-full flex items-center justify-center text-slate-950 transition-all ${
                isRecording
                  ? 'bg-rose-500 animate-pulse text-white shadow-lg shadow-rose-500/20'
                  : 'bg-[#d4af37] hover:bg-[#f59e0b] shadow-md shadow-amber-500/10 hover:scale-105'
              }`}
            >
              {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
            <span className="text-[9px] text-slate-400 mt-2 font-medium">
              {isRecording ? 'กำลังบันทึก... ออกเสียงบททวนด้านบน' : 'แตะไมโครโฟนเพื่อพูดออกเสียง'}
            </span>
          </div>

          {/* AI Score Feedback */}
          <div className="mt-3 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5 flex-grow flex flex-col justify-between">
            <div>
              <span className="text-[9px] uppercase text-[#d4af37] tracking-widest font-black block mb-2">
                AI Speech Coach Evaluation
              </span>
              {spokenText ? (
                <div className="space-y-1">
                  <span className="text-[8px] text-slate-500 block font-semibold font-sans">คำพูดของคุณ (STT):</span>
                  <p className="text-white text-xs italic font-serif">"{spokenText}"</p>
                </div>
              ) : (
                <p className="text-slate-500 text-[10px] font-sans">ยังไม่มีประวัติบันทึกเสียงแตะไมโครโฟนเพื่อเริ่มฝึกหัด</p>
              )}
            </div>

            {scores.pronunciation !== null && (
              <div className="mt-3 pt-2 border-t border-white/5 space-y-2.5 font-sans">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-white flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> คะแนนรวม: {getOverallScore()}%
                  </span>
                  <span className={`text-[8px] font-bold uppercase px-2 py-0.5 rounded ${
                    getOverallScore() >= 80 ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {getOverallScore() >= 80 ? 'ดีเยี่ยม' : 'พยายามอีกนิด'}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-2 text-[9px]">
                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>Pronunciation (ออกเสียงถูกต้อง)</span>
                      <span className="text-[#d4af37] font-bold">{scores.pronunciation}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-amber-500 h-full rounded-full" style={{ width: `${scores.pronunciation}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-slate-400 mb-0.5">
                      <span>Fluency (จังหวะความลื่นไหล)</span>
                      <span className="text-cyan-400 font-bold">{scores.fluency}%</span>
                    </div>
                    <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-cyan-400 h-full rounded-full" style={{ width: `${scores.fluency}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: GEMINI LIVE API COACH MODE */}
      {activeTab === 'live' && (
        <div className="flex-1 flex flex-col justify-between overflow-y-auto">
          {/* Top Panel - Camera and Connection state */}
          <div className="flex gap-2 items-stretch shrink-0">
            {/* Live Camera Viewport */}
            <div className="w-1/3 aspect-video bg-slate-950 border border-slate-800 rounded-xl overflow-hidden relative flex items-center justify-center shrink-0">
              {liveCamera && liveStatus === 'connected' ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-[8px] text-slate-500 flex flex-col items-center gap-1 text-center p-1">
                  <CameraOff className="w-4 h-4 text-slate-600" />
                  <span>กล้องปิดอยู่</span>
                </div>
              )}
            </div>

            {/* Connection and Key control */}
            <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 flex flex-col justify-between">
              <div className="flex justify-between items-center">
                <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded flex items-center gap-1 ${
                  liveStatus === 'connected' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-slate-900 text-slate-400'
                }`}>
                  {liveStatus === 'connected' ? <Wifi className="w-3 h-3" /> : <WifiOff className="w-3 h-3" />}
                  {liveStatus === 'connected' ? 'LIVE CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>

              <div className="flex gap-1.5 mt-2">
                <button
                  onClick={toggleLiveCamera}
                  className={`flex-1 py-1 rounded-lg text-[8px] font-bold border transition ${
                    liveCamera ? 'bg-cyan-500/10 border-cyan-500/35 text-cyan-400' : 'bg-white/5 border-white/5 text-slate-400'
                  }`}
                >
                  {liveCamera ? 'ปิดกล้องสตรีม' : 'เปิดกล้องสตรีม'}
                </button>
                
                {liveStatus === 'disconnected' ? (
                  <button
                    onClick={connectLive}
                    className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[8px] py-1 rounded-lg flex items-center justify-center gap-1 transition"
                  >
                    <Play className="w-2.5 h-2.5 fill-current" /> เชื่อมต่อ Live API
                  </button>
                ) : (
                  <button
                    onClick={disconnectLive}
                    className="flex-1 bg-rose-500 hover:bg-rose-400 text-white font-bold text-[8px] py-1 rounded-lg flex items-center justify-center gap-1 transition"
                  >
                    <Square className="w-2.5 h-2.5 fill-current" /> ปิดการเชื่อมต่อ
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Custom API Key input hidden */}

          {/* System logs console */}
          <div className="mt-2 bg-slate-950 border border-white/5 rounded-xl p-2 max-h-[50px] overflow-y-auto font-mono text-[8px] text-slate-400 shrink-0">
            {liveLogs.length === 0 ? (
              <span>&gt; ระบบสแตนด์บาย... สัญญาณเชื่อมต่อ Live API พร้อมใช้งาน</span>
            ) : (
              liveLogs.map((log, idx) => (
                <div key={idx} className={log.type === 'success' ? 'text-emerald-400' : log.type === 'error' ? 'text-rose-400' : 'text-slate-400'}>
                  &gt; {log.text}
                </div>
              ))
            )}
          </div>

          {/* Live conversation scrolling chat portal */}
          <div className="flex-1 mt-3 bg-slate-950/60 border border-white/5 rounded-2xl p-4 flex flex-col justify-between min-h-[160px] max-h-[200px] overflow-y-auto">
            <div className="space-y-3 overflow-y-auto flex-grow pr-1">
              {liveTranscript.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-2.5 rounded-2xl text-[9px] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-amber-500 text-slate-950 font-bold rounded-tr-none'
                      : msg.sender === 'system'
                      ? 'bg-slate-900 text-slate-400 border border-white/5 rounded-none text-center italic w-full'
                      : 'bg-[#151D2F] text-slate-200 border border-white/5 rounded-tl-none font-serif'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Speaking / listening visual feedback wave */}
            <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between shrink-0">
              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${liveStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
                {liveStatus === 'connected' ? 'LIVE AUDIO ACTIVE' : 'LIVE IDLE'}
              </span>
              
              {/* Mic sound wave representation */}
              {liveStatus === 'connected' && (
                <div className="flex items-center gap-0.5">
                  <div className={`w-1 bg-[#d4af37] rounded-full transition-all ${isLiveSpeaking ? 'h-4 animate-[bounce_1s_infinite_100ms]' : 'h-1.5'}`} />
                  <div className={`w-1 bg-[#d4af37] rounded-full transition-all ${isLiveSpeaking ? 'h-6 animate-[bounce_1s_infinite_200ms]' : 'h-1.5'}`} />
                  <div className={`w-1 bg-[#d4af37] rounded-full transition-all ${isLiveSpeaking ? 'h-3 animate-[bounce_1s_infinite_300ms]' : 'h-1.5'}`} />
                  <div className={`w-1 bg-[#d4af37] rounded-full transition-all ${isLiveSpeaking ? 'h-5 animate-[bounce_1s_infinite_400ms]' : 'h-1.5'}`} />
                </div>
              )}
            </div>
          </div>

          {/* Quick service phrase helper card */}
          <div className="mt-2.5 p-3 rounded-xl bg-[#151D2F]/20 border border-white/5 text-[9px] text-slate-400 flex items-start gap-2 shrink-0">
            <VolumeX className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed font-sans">
              <span className="font-bold text-white block">💡 คำแนะนำในการโต้ตอบ:</span>
              เมื่อระบบเชื่อมต่อสำเร็จ คุณสามารถสวมบทบาทเป็นพนักงานบริการโต้ตอบคำถามของลูกค้าภาษาอังกฤษได้ทันทีผ่านสัญญาณไมค์สด
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
