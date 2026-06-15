"use client";

import React, { useState } from 'react'
import RestaurantScene from '../3d/RestaurantScene'
import ReceptionRoomScene from '../3d/ReceptionRoomScene'
import { Landmark, ShoppingBag, Send, AlertTriangle, ArrowRight, RotateCcw } from 'lucide-react'

const scenarios = {
  restaurant: [
    {
      id: 'r1',
      title: "การจัดสรรคิวต้อนรับลูกค้า (Walk-in Crowd)",
      table: 1,
      steps: [
        {
          sender: 'customer',
          text: "Hi, we don't have a reservation. Do you have a table for four?",
          choices: [
            { text: "Good evening! Yes, we have a table ready. Please follow me.", correct: true, feedback: "ต้อนรับสุภาพและพาเดินไปโต๊ะได้ถูกต้อง (+20)" },
            { text: "No reservation, no entry. Go away.", correct: false, feedback: "ปฏิเสธหยาบคายเกินไป ไม่เป็นมืออาชีพ" },
            { text: "Just sit anywhere you like.", correct: false, feedback: "ปล่อยให้ลูกค้าหาโต๊ะเอง ไม่เป็นระเบียบ" }
          ]
        },
        {
          sender: 'waiter',
          text: "Here is your table by the window. May I present our food menu?",
          choices: [
            { text: "Thank you. What is the special chef's selection for tonight?", correct: true, feedback: "นำเสนอเมนูและทวนคำสั่งดีเยี่ยม (+20)" },
            { text: "I want to order directly. Bring me beer.", correct: false, feedback: "ลูกค้าอยากคุยรายละเอียดเมนูก่อนเสิร์ฟเบียร์" }
          ]
        },
        {
          sender: 'customer',
          text: "I will take the house special burger and iced tea, please.",
          choices: [
            { text: "Certainly. That's one special burger and iced tea. I will place your order.", correct: true, feedback: "จดบันทึกและทวนออเดอร์เรียบร้อย จบภารกิจ (+20)" }
          ]
        }
      ]
    },
    {
      id: 'r2',
      title: "ลูกค้ามีประวัติการแพ้อาหาร (Food Allergy Handling)",
      table: 2,
      steps: [
        {
          sender: 'customer',
          text: "Excuse me, does the special sauce contain any peanut? I am highly allergic.",
          choices: [
            { text: "Let me check with the chef immediately, sir. I will ensure your meal is safe.", correct: true, feedback: "ใส่ใจสุขภาพลูกค้าและเข้าไปเช็กห้องครัว (+20)" },
            { text: "Probably not. Just eat it.", correct: false, feedback: "อันตรายมาก! อาจทำให้ลูกค้าช็อกจากการแพ้ได้" }
          ]
        },
        {
          sender: 'waiter',
          text: "The chef confirmed the sauce does contain peanut oil. We can make a custom olive oil sauce for you.",
          choices: [
            { text: "That would be perfect, thank you for checking!", correct: true, feedback: "เสนอทางเลือกและแก้ไขปัญหาปลอดภัย จบภารกิจ (+20)" }
          ]
        }
      ]
    }
  ],
  vip: [
    {
      id: 'v1',
      title: "ต้อนรับแขกวีไอพี (VIP Lounge Welcoming)",
      table: "VIP Sofa",
      steps: [
        {
          sender: 'customer',
          text: "We are here for the international host banquet. Where is our seating area?",
          choices: [
            { text: "Welcome, Ambassadors. It is our absolute honor to host you today. Please step this way to the private VIP sofa lounge.", correct: true, feedback: "ทักทายระดับสูงสุดเป็นเกียรติและนำทางเรียบร้อย (+20)" },
            { text: "Hi! Find a seat over there on the big sofa.", correct: false, feedback: "ภาษาพูดเป็นกันเองเกินไปสำหรับแขกระดับทูต/วีไอพี" }
          ]
        },
        {
          sender: 'waiter',
          text: "Thank you. The lounge is magnificent. Can we order some drinks?",
          choices: [
            { text: "Certainly. May I recommend our vintage champagne trolley service?", correct: true, feedback: "นำเสนอแชมเปญได้เหมาะสมกับ VIP (+20)" }
          ]
        },
        {
          sender: 'customer',
          text: "Splendid. Pour us some vintage Champagne, please.",
          choices: [
            { text: "My pleasure, Ambassador. Enjoy your evening.", correct: true, feedback: "รินไวน์ตามมารยาทสากล จบภารกิจ (+20)" }
          ]
        }
      ]
    }
  ]
}

export default function Navigate({ onSaveScore }) {
  const [lab, setLab] = useState('restaurant') // 'restaurant' | 'vip'
  const [activeScenarioIdx, setActiveScenarioIdx] = useState(0)
  const [selectedTable, setSelectedTable] = useState(null)
  const [stepIndex, setStepIndex] = useState(0)
  const [chatLog, setChatLog] = useState([])
  const [score, setScore] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [feedbackMsg, setFeedbackMsg] = useState('')

  const activeScenarioList = scenarios[lab]
  const currentScenario = activeScenarioList[activeScenarioIdx]
  const currentStep = currentScenario.steps[stepIndex]

  const startScenario = (idx) => {
    setActiveScenarioIdx(idx)
    setSelectedTable(activeScenarioList[idx].table)
    setStepIndex(0)
    setChatLog([{ sender: 'customer', text: activeScenarioList[idx].steps[0].text }])
    setScore(0)
    setIsFinished(false)
    setFeedbackMsg('')
  }

  const handleSelectChoice = (choice) => {
    // Show student choice in log
    const updatedLog = [
      ...chatLog,
      { sender: 'waiter', text: choice.text }
    ]
    setChatLog(updatedLog)
    setFeedbackMsg(choice.feedback)

    if (choice.correct) {
      const newScore = score + 20
      setScore(newScore)
      
      setTimeout(() => {
        if (stepIndex + 1 < currentScenario.steps.length) {
          // Progress to next step customer dialogue
          setStepIndex(stepIndex + 1)
          setChatLog(prev => [
            ...prev,
            { sender: 'customer', text: currentScenario.steps[stepIndex + 1].text }
          ])
          setFeedbackMsg('')
        } else {
          // Finished scenario
          setIsFinished(true)
          if (onSaveScore) {
            onSaveScore('3D Simulation: ' + currentScenario.title.split(' ')[0], newScore + 40) // total score scaling
          }
        }
      }, 1500)
    } else {
      // Wrong choice, deduct score or reset
      setScore(Math.max(0, score - 10))
    }
  }

  const handleTableSelect = (tableId) => {
    setSelectedTable(tableId)
    // Check if table clicked matches the active mission table
    const matchedIdx = activeScenarioList.findIndex(s => s.table === tableId)
    if (matchedIdx !== -1) {
      startScenario(matchedIdx)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Lab selector */}
      <div className="flex gap-2 mb-3 bg-slate-900/60 p-1.5 rounded-xl border border-white/5">
        <button
          onClick={() => { setLab('restaurant'); startScenario(0); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            lab === 'restaurant'
              ? 'bg-[#d4af37] text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          🍽️ Main Dining Restaurant
        </button>
        <button
          onClick={() => { setLab('vip'); startScenario(0); }}
          className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all ${
            lab === 'vip'
              ? 'bg-[#d4af37] text-slate-950 shadow-lg'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          👑 VIP Reception Suite 3D
        </button>
      </div>

      {/* 3D Canvas Port */}
      <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-white/5 bg-[#050811] shadow-2xl">
        <div className="absolute top-4 left-4 z-10 bg-slate-950/80 border border-white/10 px-3 py-1 rounded-full text-[10px] text-slate-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping" />
          3D Viewport: {lab === 'restaurant' ? 'Restaurant Dining Space' : 'VIP Lounge Lounge'}
        </div>

        {lab === 'restaurant' ? (
          <RestaurantScene
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            activeMissionName={currentScenario ? currentScenario.title : null}
          />
        ) : (
          <ReceptionRoomScene
            selectedTable={selectedTable}
            onTableSelect={handleTableSelect}
            activeMissionName={currentScenario ? currentScenario.title : null}
          />
        )}
      </div>

      {/* Simulation Info & Scenario Selector */}
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-[10px] font-bold">
        <div className="bg-[#151D2F]/60 border border-white/5 p-2 rounded-xl">
          <span className="text-slate-500 block uppercase font-semibold">Active Mission</span>
          <span className="text-amber-400 mt-0.5 truncate block">{currentScenario ? currentScenario.title : 'None'}</span>
        </div>
        <div className="bg-[#151D2F]/60 border border-white/5 p-2 rounded-xl">
          <span className="text-slate-500 block uppercase font-semibold">Table Station</span>
          <span className="text-cyan-400 mt-0.5 block">{selectedTable || 'Click 3D Table'}</span>
        </div>
        <div className="bg-[#151D2F]/60 border border-white/5 p-2 rounded-xl">
          <span className="text-slate-500 block uppercase font-semibold">Current Score</span>
          <span className="text-emerald-400 mt-0.5 block">{score} XP</span>
        </div>
      </div>

      {/* Interactive Chat overlay and Choices panel */}
      <div className="mt-4 flex-1 p-4 rounded-2xl bg-[#151D2F]/40 border border-white/5 flex flex-col justify-between overflow-y-auto">
        <div className="space-y-3">
          <span className="text-[10px] text-[#d4af37] uppercase font-bold tracking-widest block border-b border-white/5 pb-1">
            Dialogue Interaction Screen
          </span>
          <div className="space-y-2 max-h-[140px] overflow-y-auto pr-1">
            {chatLog.map((log, idx) => (
              <div
                key={idx}
                className={`flex flex-col max-w-[85%] p-2.5 rounded-2xl text-xs leading-relaxed ${
                  log.sender === 'customer'
                    ? 'bg-slate-900 border border-white/5 text-slate-200 self-start rounded-tl-none'
                    : 'bg-[#d4af37]/15 border border-[#d4af37]/20 text-[#d4af37] self-end rounded-tr-none ml-auto'
                }`}
              >
                <span className="text-[9px] uppercase font-bold text-slate-500 mb-0.5">
                  {log.sender === 'customer' ? 'Guest (ลูกค้า)' : 'You (พนักงานบริการ)'}
                </span>
                <p className="italic">"{log.text}"</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Panel */}
        <div className="mt-4 pt-3 border-t border-white/5">
          {feedbackMsg && (
            <div className={`p-2 rounded-xl text-[10px] font-bold flex items-center gap-1.5 mb-3 border ${
              feedbackMsg.includes('ถูกต้อง')
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                : 'bg-rose-500/10 border-rose-500/30 text-rose-400'
            }`}>
              <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
              <span>{feedbackMsg}</span>
            </div>
          )}

          {isFinished ? (
            <div className="text-center py-2 bg-emerald-500/10 border border-emerald-500/25 rounded-2xl">
              <span className="text-emerald-400 text-xs font-bold block">🎉 ภารกิจสำเร็จลุล่วง!</span>
              <p className="text-[10px] text-slate-400 mt-0.5">คะแนนประเมินความสามารถจัดเก็บลงระบบพอร์ตโฟลิโอเรียบร้อย</p>
              <button
                onClick={() => startScenario(activeScenarioIdx)}
                className="mt-3 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 mx-auto transition"
              >
                <RotateCcw className="w-4 h-4" /> เล่นซ้ำด่านนี้
              </button>
            </div>
          ) : (
            currentStep && (
              <div className="space-y-2">
                <span className="text-[9px] uppercase font-semibold text-slate-500 block">เลือกประโยคสนทนาภาษาอังกฤษตอบรับที่เหมาะสม:</span>
                <div className="grid grid-cols-1 gap-2">
                  {currentStep.choices.map((choice, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectChoice(choice)}
                      className="text-left bg-slate-900 hover:bg-[#151D2F] border border-white/5 p-3 rounded-xl text-xs text-slate-300 hover:border-[#d4af37]/40 hover:text-white transition-all flex items-center justify-between"
                    >
                      <span>{choice.text}</span>
                      <Send className="w-3.5 h-3.5 text-[#d4af37] shrink-0 ml-2" />
                    </button>
                  ))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}
