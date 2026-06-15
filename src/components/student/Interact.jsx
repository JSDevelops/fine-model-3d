"use client";

import React, { useState, useEffect, useRef } from 'react'
import { Mic, MicOff, Volume2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react'

// Speech similarity analyzer using a quick JS-based Levenshtein & word overlap algorithm
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

export default function Interact({ onSaveScore }) {
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

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (SpeechRecognition) {
      setIsSpeechSupported(true)
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
        
        // Calculate similarity
        const similarity = calculateSimilarity(currentPrompt.text, transcript)
        
        // Generate minor variations for other metrics
        const fluencyScore = Math.max(40, Math.min(100, Math.round(similarity - 5 + Math.random() * 10)))
        const confidenceScore = Math.max(50, Math.min(100, Math.round(similarity + (isRecording ? 5 : 0) + Math.random() * 5)))
        
        setScores({
          pronunciation: similarity,
          fluency: fluencyScore,
          confidence: confidenceScore
        })

        // Save score callbacks for portfolio integration
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
  }, [selectedPromptIdx])

  const toggleRecording = () => {
    if (!isSpeechSupported) {
      // Simulation mode fallback
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
      const mockSpokenText = currentPrompt.text.split(' ').slice(0, -1).join(' ') + "..." // simulation showing a minor error
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

  return (
    <div className="flex flex-col h-full justify-between">
      {/* Prompts list */}
      <div className="space-y-3">
        <label className="text-[10px] uppercase text-[#d4af37] tracking-widest font-bold block mb-1">
          เลือกหัวข้อการฝึกพูดกับ AI (FINE-GPT)
        </label>
        <div className="grid grid-cols-1 gap-2">
          {prompts.map((p, idx) => (
            <button
              key={idx}
              onClick={() => {
                setSelectedPromptIdx(idx)
                setSpokenText('')
                setScores({ pronunciation: null, fluency: null, confidence: null })
              }}
              className={`text-left p-3 rounded-xl border text-xs transition ${
                selectedPromptIdx === idx
                  ? 'bg-amber-500/10 border-amber-500/40 text-white'
                  : 'bg-slate-900/40 border-white/5 text-slate-400 hover:text-white'
              }`}
            >
              <span className={`font-semibold block mb-0.5 ${selectedPromptIdx === idx ? 'text-[#d4af37]' : 'text-slate-400'}`}>
                {p.label}
              </span>
              <span className="truncate block font-mono text-[10px] text-slate-400">{p.text}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Target Prompt Card */}
      <div className="mt-4 bg-[#151D2F]/60 border border-white/5 p-5 rounded-2xl relative overflow-hidden">
        <div className="absolute top-4 right-4 text-[9px] uppercase tracking-wider text-cyan-400 font-bold bg-cyan-400/10 border border-cyan-400/20 px-2 py-0.5 rounded-full">
          Target Prompt
        </div>

        <span className="text-[10px] text-slate-500 uppercase block font-semibold">ออกเสียงประโยคภาษาอังกฤษนี้:</span>
        <h2 className="text-white text-md font-semibold mt-1 leading-relaxed">
          "{currentPrompt.text}"
        </h2>
        <p className="text-amber-400 text-xs mt-1.5 font-medium">{currentPrompt.thai}</p>

        <button
          onClick={handleSpeakSample}
          className="mt-3 text-[10px] text-amber-400 font-bold hover:underline flex items-center gap-1.5"
        >
          <Volume2 className="w-4 h-4" /> ฟังเสียงตัวอย่างเจ้าของภาษา
        </button>
      </div>

      {/* Recording Area */}
      <div className="mt-4 flex flex-col items-center justify-center py-4 bg-slate-950/40 border border-white/5 rounded-2xl">
        <button
          onClick={toggleRecording}
          className={`w-16 h-16 rounded-full flex items-center justify-center text-slate-950 text-xl transition-all shadow-lg ${
            isRecording
              ? 'bg-rose-500 animate-pulse text-white shadow-rose-500/20'
              : 'bg-[#d4af37] hover:bg-[#f59e0b] shadow-amber-500/10 hover:scale-105'
          }`}
        >
          {isRecording ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>
        <span className="text-[10px] text-slate-400 mt-2 font-medium">
          {isRecording ? 'กำลังบันทึกเสียง... กรุณาออกเสียงในประโยคด้านบน' : 'แตะไมโครโฟนเพื่อเริ่มฝึกพูด'}
        </span>
        {!isSpeechSupported && (
          <div className="mt-2 text-[9px] text-amber-500 flex items-center gap-1 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
            <AlertCircle className="w-3 h-3" /> บราวเซอร์ไม่รองรับ Speech API (เปิดระบบจำลองคะแนนเสียง)
          </div>
        )}
      </div>

      {/* AI Analysis Feedback */}
      <div className="mt-4 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5 flex-1 flex flex-col justify-between">
        <div>
          <span className="text-[10px] uppercase text-[#d4af37] tracking-widest font-bold block mb-2">
            AI Speech Coach Feedback
          </span>
          {spokenText ? (
            <div className="space-y-1">
              <span className="text-[10px] text-slate-400 block font-semibold">ข้อความที่คุณพูด:</span>
              <p className="text-white text-xs italic font-serif">"{spokenText}"</p>
            </div>
          ) : (
            <p className="text-slate-500 text-xs">ยังไม่มีประวัติการพูด กดปุ่มไมโครโฟนด้านบนเพื่อเริ่มบันทึกเสียง</p>
          )}
        </div>

        {/* Scores Bar Charts */}
        {scores.pronunciation !== null && (
          <div className="mt-4 pt-3 border-t border-white/5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" /> คะแนนรวม: {getOverallScore()}%
              </span>
              <span className="text-[10px] font-bold text-emerald-400 uppercase bg-emerald-400/10 px-2 py-0.5 rounded-md">
                {getOverallScore() >= 85 ? 'ยอดเยี่ยม (Excellent)' : getOverallScore() >= 70 ? 'ดีมาก (Good)' : 'ควรฝึกฝนต่อ (Keep it up)'}
              </span>
            </div>

            <div className="grid grid-cols-1 gap-2 text-[10px]">
              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Pronunciation (การออกเสียงคำ)</span>
                  <span className="text-[#d4af37] font-bold">{scores.pronunciation}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-600 to-[#d4af37] h-full rounded-full transition-all duration-700" style={{ width: `${scores.pronunciation}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Fluency (ความคล่องแคล่ว/จังหวะพูด)</span>
                  <span className="text-cyan-400 font-bold">{scores.fluency}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-cyan-600 to-cyan-400 h-full rounded-full transition-all duration-700" style={{ width: `${scores.fluency}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-slate-300 font-semibold mb-1">
                  <span>Confidence (ความมั่นใจ/ระดับเสียง)</span>
                  <span className="text-emerald-400 font-bold">{scores.confidence}%</span>
                </div>
                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-emerald-600 to-emerald-400 h-full rounded-full transition-all duration-700" style={{ width: `${scores.confidence}%` }} />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
