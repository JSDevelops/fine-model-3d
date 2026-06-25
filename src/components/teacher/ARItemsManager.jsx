"use client";

import React, { useState, useEffect } from 'react'
import { Plus, Trash2, Save, Info, RefreshCw, Layers, Sparkles, Key, QrCode } from 'lucide-react'
import ARScene from '../3d/ARScene'
import QRModal from './QRModal'

const MOCK_GENERATION_ITEMS = [
  {
    keywords: ["แก้วไวน์", "wine glass", "wineglass", "ไวน์"],
    title: "Red Wine Glass",
    thai: "แก้วไวน์แดง",
    pronunciation: "/red-wyn-glass/",
    description: "แก้วก้านบางที่มีกระเปาะกว้างสำหรับใส่ไวน์แดง เพื่อช่วยให้กลิ่นของไวน์ฟุ้งกระจายได้ดี",
    sentence: "Hold the red wine glass by the stem to keep the wine cool.",
    shapeType: "cylinder",
    shapeColor: "#ffffff",
    sizeW: 0.25,
    sizeH: 0.65,
    sizeD: 0.25,
    quizQ: "เพราะเหตุใดจึงควรจับแก้วไวน์บริเวณก้านแก้ว?",
    ansCorrect: "เพื่อไม่ให้ความร้อนจากมือเปลี่ยนอุณหภูมิไวน์",
    ansWrong1: "เพื่อความสวยงามเพียงอย่างเดียว",
    ansWrong2: "เพื่อไม่ให้แก้วตกแตก"
  },
  {
    keywords: ["แก้วกาแฟ", "coffee cup", "coffee mug", "ถ้วยกาแฟ", "กาแฟ"],
    title: "Coffee Mug",
    thai: "แก้วกาแฟมีหู",
    pronunciation: "/kof-fee mug/",
    description: "ถ้วยแก้วหนาพร้อมหูจับสำหรับเครื่องดื่มร้อน เช่น กาแฟ หรือ ชาร้อน",
    sentence: "Serve the hot Americano in this coffee mug with the handle facing right.",
    shapeType: "cylinder",
    shapeColor: "#d97706",
    sizeW: 0.3,
    sizeH: 0.4,
    sizeD: 0.3,
    quizQ: "การเสิร์ฟกาแฟร้อนในแก้วมีหู ควรหันหูจับไปทิศทางใดของลูกค้า?",
    ansCorrect: "ด้านขวามือของลูกค้า",
    ansWrong1: "ด้านซ้ายมือของลูกค้า",
    ansWrong2: "หันเข้าหาตัวผู้เสิร์ฟ"
  },
  {
    keywords: ["ช้อนซุป", "soup spoon", "ช้อน"],
    title: "Soup Spoon",
    thai: "ช้อนซุป",
    pronunciation: "/soop spoon/",
    description: "ช้อนทรงกลมใหญ่และลึกเป็นพิเศษสำหรับตักซุปทานได้ง่าย",
    sentence: "The soup spoon should be placed on the right side of the plate.",
    shapeType: "sphere",
    shapeColor: "#94a3b8",
    sizeW: 0.2,
    sizeH: 0.2,
    sizeD: 0.2,
    quizQ: "ช้อนซุปควรจัดวางไว้ตำแหน่งใดของโต๊ะอาหารหลัก?",
    ansCorrect: "ด้านขวามือของจานหลัก",
    ansWrong1: "ด้านบนของจานหลัก",
    ansWrong2: "ด้านซ้ายมือของจานหลัก"
  },
  {
    keywords: ["มีด", "มีดหั่นสเต็ก", "steak knife", "knife"],
    title: "Steak Knife",
    thai: "มีดสเต็ก",
    pronunciation: "/stake nyf/",
    description: "มีดที่มีฟันหยักคมพิเศษสำหรับใช้หั่นเนื้อสเต็กบนโต๊ะอาหาร",
    sentence: "We provide a sharp steak knife for all main meat dishes.",
    shapeType: "box",
    shapeColor: "#475569",
    sizeW: 0.1,
    sizeH: 0.7,
    sizeD: 0.1,
    quizQ: "มีดสเต็กควรวางโดยหันใบมีดคมไปทางทิศใด?",
    ansCorrect: "หันคมมีดเข้าหาจานอาหาร",
    ansWrong1: "หันคมมีดออกนอกโต๊ะ",
    ansWrong2: "หันคมมีดขึ้นด้านบน"
  },
  {
    keywords: ["ผ้าเช็ดปาก", "napkin", "ผ้าเช็ด"],
    title: "Table Napkin",
    thai: "ผ้าเช็ดปาก",
    pronunciation: "/tay-bul nap-kin/",
    description: "ผ้าสี่เหลี่ยมผืนผ้าสำหรับบริการลูกค้าเช็ดปากและนิ้วมือระหว่างมื้ออาหาร",
    sentence: "Kindly unfold the napkin and place it on your lap.",
    shapeType: "box",
    shapeColor: "#f1f5f9",
    sizeW: 0.5,
    sizeH: 0.05,
    sizeD: 0.5,
    quizQ: "ผ้าเช็ดปากควรได้รับการคลี่และวางไว้ส่วนใดของร่างกายลูกค้า?",
    ansCorrect: "วางบนหน้าตัก",
    ansWrong1: "พาดไว้ที่บ่า",
    ansWrong2: "ผูกไว้ที่ลำคอ"
  }
];

const findMockItem = (prompt) => {
  const cleanPrompt = prompt.toLowerCase().trim();
  for (const item of MOCK_GENERATION_ITEMS) {
    if (item.keywords.some(keyword => cleanPrompt.includes(keyword))) {
      return item;
    }
  }
  return {
    title: "Champagne Flute",
    thai: "แก้วแชมเปญ",
    pronunciation: "/sham-payn floot/",
    description: "แก้วทรงเรียวยาวและแคบสำหรับใส่แชมเปญ ช่วยเก็บรักษาฟองพรายอากาศ",
    sentence: "Pour the sparkling champagne into the flute glass.",
    shapeType: "cylinder",
    shapeColor: "#e2e8f0",
    sizeW: 0.2,
    sizeH: 0.7,
    sizeD: 0.2,
    quizQ: "รูปทรงของแก้วแชมเปญฟลูตมีจุดประสงค์หลักเพื่ออะไร?",
    ansCorrect: "รักษาความเย็นและฟองอากาศ",
    ansWrong1: "ทำให้ถือได้สะดวกที่สุด",
    ansWrong2: "เพื่อเพิ่มความจุของเครื่องดื่ม"
  };
};

export default function ARItemsManager() {
  const [items, setItems] = useState([])
  
  // Form States
  const [title, setTitle] = useState('')
  const [thai, setThai] = useState('')
  const [pronunciation, setPronunciation] = useState('')
  const [description, setDescription] = useState('')
  const [sentence, setSentence] = useState('')
  
  // 3D Shape Configuration States
  const [shapeType, setShapeType] = useState('box')
  const [shapeColor, setShapeColor] = useState('#d4af37')
  const [sizeW, setSizeW] = useState(0.6)
  const [sizeH, setSizeH] = useState(0.6)
  const [sizeD, setSizeD] = useState(0.6)

  // Quiz States
  const [quizQ, setQuizQ] = useState('')
  const [ansCorrect, setAnsCorrect] = useState('')
  const [ansWrong1, setAnsWrong1] = useState('')
  const [ansWrong2, setAnsWrong2] = useState('')

  const [message, setMessage] = useState('')
  const [qrItem, setQrItem] = useState(null)

  // Gemini AI States
  const [aiPrompt, setAiPrompt] = useState('')
  const [isAiGenerating, setIsAiGenerating] = useState(false)
  const [aiMessage, setAiMessage] = useState('')
  const [showApiKeyInput, setShowApiKeyInput] = useState(false)
  const [customApiKey, setCustomApiKey] = useState('')

  const handleGenerateWithAI = async () => {
    if (!aiPrompt.trim()) {
      alert('กรุณากรอกชื่ออุปกรณ์ที่ต้องการให้ AI ช่วยออกแบบ')
      return
    }

    setIsAiGenerating(true)
    setAiMessage('กำลังส่งข้อมูลให้ Gemini AI วิเคราะห์...')

    const apiKey = customApiKey || process.env.NEXT_PUBLIC_GEMINI_API_KEY || ''

    if (apiKey) {
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
                      text: `You are an AI assistant designed for a hospitality training application.
Generate a structured JSON configuration for a hotel/restaurant service equipment based on this request: "${aiPrompt}".
Respond ONLY in valid JSON format using this exact schema:
{
  "title": "English Name of the equipment (e.g. Red Wine Glass)",
  "thai": "ชื่อภาษาไทยกระชับ (เช่น แก้วไวน์แดง)",
  "pronunciation": "/English pronunciation spelling for Thai students (e.g. /red-wyn-glass/)/",
  "description": "คำอธิบายวัตถุนี้สั้นๆ ในภาษาไทย 1-2 ประโยค เกี่ยวกับลักษณะและการใช้งาน",
  "sentence": "A practical example sentence that hotel staff would say using this object in English.",
  "shapeType": "Choose one: 'box' or 'cylinder' or 'sphere'",
  "shapeColor": "A suitable hex color code for the 3D model (e.g. '#94a3b8' or '#ffffff' or '#d4af37')",
  "sizeW": 0.4,
  "sizeH": 0.6,
  "sizeD": 0.6,
  "quizQ": "คำถามทบทวนสั้นๆ ในภาษาไทยเกี่ยวกับอุปกรณ์นี้",
  "ansCorrect": "Correct English answer (matching the title or closely related word)",
  "ansWrong1": "Incorrect English answer option 1",
  "ansWrong2": "Incorrect English answer option 2"
}
Do not wrap your response in markdown code blocks or any extra text.`
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

        setTitle(parsed.title || '')
        setThai(parsed.thai || '')
        setPronunciation(parsed.pronunciation || '')
        setDescription(parsed.description || '')
        setSentence(parsed.sentence || '')
        setShapeType(parsed.shapeType || 'box')
        setShapeColor(parsed.shapeColor || '#d4af37')
        setSizeW(parsed.sizeW || 0.6)
        setSizeH(parsed.sizeH || 0.6)
        setSizeD(parsed.sizeD || 0.6)
        setQuizQ(parsed.quizQ || '')
        setAnsCorrect(parsed.ansCorrect || '')
        setAnsWrong1(parsed.ansWrong1 || '')
        setAnsWrong2(parsed.ansWrong2 || '')

        setAiMessage('✨ ดึงข้อมูลจาก Gemini AI และกรอกลงฟอร์มเรียบร้อยแล้ว!')
        setAiPrompt('')
      } catch (err) {
        console.error("Gemini API Error:", err)
        setAiMessage('⚠️ การเรียก API ผิดพลาด กำลังดึงข้อมูลจากระบบจำลอง (Mock Fallback)...')
        setTimeout(() => {
          applyMockData()
        }, 1500)
      } finally {
        setIsAiGenerating(false)
        setTimeout(() => setAiMessage(''), 4000)
      }
    } else {
      setAiMessage('ℹ️ ไม่พบคีย์ Gemini API กำลังกรอกข้อมูลดึงจากระบบจำลอง (Mock Fallback)...')
      setTimeout(() => {
        applyMockData()
        setIsAiGenerating(false)
        setTimeout(() => setAiMessage(''), 4000)
      }, 1200)
    }
  }

  const applyMockData = () => {
    const matched = findMockItem(aiPrompt)
    setTitle(matched.title)
    setThai(matched.thai)
    setPronunciation(matched.pronunciation)
    setDescription(matched.description)
    setSentence(matched.sentence)
    setShapeType(matched.shapeType)
    setShapeColor(matched.shapeColor)
    setSizeW(matched.sizeW)
    setSizeH(matched.sizeH)
    setSizeD(matched.sizeD)
    setQuizQ(matched.quizQ)
    setAnsCorrect(matched.ansCorrect)
    setAnsWrong1(matched.ansWrong1)
    setAnsWrong2(matched.ansWrong2)
    setAiMessage('✨ กรอกข้อมูลจำลองสำหรับ "' + matched.thai + '" เรียบร้อยแล้ว!')
    setAiPrompt('')
  }

  // Load items from localStorage on mount
  useEffect(() => {
    const cached = localStorage.getItem('fineverse_ar_items')
    if (cached) {
      try {
        setItems(JSON.parse(cached))
      } catch (e) {
        console.error(e)
      }
    }
  }, [])

  // Save items to localStorage
  const saveToStorage = (updatedList) => {
    localStorage.setItem('fineverse_ar_items', JSON.stringify(updatedList))
    setItems(updatedList)
  }

  const handleAddItem = (e) => {
    e.preventDefault()
    if (!title || !thai) {
      alert('กรุณากรอกชื่ออุปกรณ์ภาษาอังกฤษและภาษาไทย')
      return
    }

    const newItem = {
      id: 'item_' + Date.now(),
      title,
      thai,
      pronunciation: pronunciation || '/pronunciation/',
      description: description || 'ไม่มีรายละเอียดเพิ่มเติม',
      sentence: sentence || 'This is the item for service training.',
      audioText: title,
      shape: {
        type: shapeType,
        color: shapeColor,
        size: shapeType === 'box' ? [Number(sizeW), Number(sizeH), Number(sizeD)] : [Number(sizeW), Number(sizeH)]
      },
      quiz: quizQ ? {
        q: quizQ,
        answers: [ansCorrect, ansWrong1, ansWrong2].filter(Boolean),
        correct: 0
      } : null
    }

    const newList = [...items, newItem]
    saveToStorage(newList)

    // Clear form
    setTitle('')
    setThai('')
    setPronunciation('')
    setDescription('')
    setSentence('')
    setQuizQ('')
    setAnsCorrect('')
    setAnsWrong1('')
    setAnsWrong2('')

    setMessage('เพิ่มข้อมูลอุปกรณ์เรียบร้อยแล้ว!')
    setTimeout(() => setMessage(''), 3000)
  }

  const handleDeleteItem = (id) => {
    if (confirm('คุณแน่ใจหรือไม่ว่าต้องการลบอุปกรณ์ชิ้นนี้?')) {
      const newList = items.filter(item => item.id !== id)
      saveToStorage(newList)
    }
  }

  const handleResetDefaults = () => {
    if (confirm('คุณต้องการโหลดโมเดลตัวอย่างเริ่มต้นใหม่หรือไม่? (ข้อมูลที่สร้างขึ้นใหม่จะถูกแทนที่)')) {
      const sampleItems = [
        {
          id: 'sample_cup',
          title: 'Espresso Coffee Cup',
          thai: 'แก้วกาแฟเอสเปรสโซ่',
          pronunciation: '/e-spres-oh/',
          description: 'ถ้วยเซรามิกขนาดเล็ก (Demitasse) สำหรับเสิร์ฟกาแฟเอสเปรสโซ่ พร้อมจานรอง',
          sentence: 'Please serve the double espresso in a pre-heated cup.',
          audioText: 'Espresso Coffee Cup',
          shape: {
            type: 'cylinder',
            color: '#fafafa',
            size: [0.3, 0.4, 32]
          },
          quiz: {
            q: 'จานรองสำหรับถ้วยแก้วร้อน เรียกว่าอะไร?',
            answers: ['Saucer', 'Platter', 'Bowl'],
            correct: 0
          }
        },
        {
          id: 'sample_shaker',
          title: 'Cocktail Shaker',
          thai: 'กระบอกเขย่าค็อกเทล',
          pronunciation: '/shak-er/',
          description: 'กระบอกโลหะแฮนด์ทัมเบลอร์สำหรับใช้เขย่าผสมเครื่องดื่มและกรองน้ำแข็งออก',
          sentence: 'Pour the ingredients into the cocktail shaker with ice.',
          audioText: 'Cocktail Shaker',
          shape: {
            type: 'cylinder',
            color: '#94a3b8',
            size: [0.25, 0.6, 32]
          },
          quiz: {
            q: 'กระบอกเขย่าค็อกเทลมักทำจากวัสดุประเภทใด?',
            answers: ['Stainless Steel', 'Glass', 'Plastic'],
            correct: 0
          }
        }
      ]
      saveToStorage(sampleItems)
    }
  }

  return (<>
    <div className="flex flex-col h-full justify-between font-sans">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <span className="text-[10px] text-amber-400 font-bold uppercase tracking-widest block">AR & 3D Manager</span>
            <h2 className="text-lg font-heading font-black text-white">4.5 จัดการคลังอุปกรณ์ AR & โมเดล 3 มิติ</h2>
            <p className="text-slate-400 text-xs mt-0.5">เพิ่มรูปภาพ คำศัพท์ และกำหนดรูปทรง 3 มิติให้ผู้เรียนส่องผ่านกล้องมือถือ</p>
          </div>
          <button
            onClick={handleResetDefaults}
            className="text-[10px] text-amber-400 hover:text-amber-300 flex items-center gap-1 border border-amber-500/20 bg-amber-500/5 px-3 py-1.5 rounded-full transition"
          >
            <RefreshCw className="w-3 h-3" /> โหลดชุดตัวอย่างมาตรฐาน
          </button>
        </div>

        {/* Dynamic grid split: Left (Form Builder) and Right (Current Library) */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-5 items-stretch">
          
          {/* Left Form: Add New Item */}
          <form onSubmit={handleAddItem} className="xl:col-span-5 bg-slate-900/60 border border-white/5 p-4.5 rounded-2xl space-y-3 flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block border-b border-white/5 pb-1">รายละเอียดทั่วไป (General info)</span>

              {/* Gemini AI Helper */}
              <div className="bg-slate-950/80 border border-amber-500/20 rounded-xl p-3 space-y-2 relative overflow-hidden">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-amber-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" /> ผู้ช่วยเขียนรายละเอียดด้วย AI Gemini
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                    className="text-[8px] text-slate-400 hover:text-white flex items-center gap-1 bg-white/5 px-2 py-1 rounded-md border border-white/5 transition"
                  >
                    <Key className="w-2.5 h-2.5" /> คีย์ Gemini
                  </button>
                </div>

                {showApiKeyInput && (
                  <div className="space-y-1">
                    <input
                      type="password"
                      value={customApiKey}
                      onChange={(e) => setCustomApiKey(e.target.value)}
                      placeholder="ระบุ Gemini API Key (เช่น AIzaSy...)"
                      className="w-full bg-slate-900 border border-white/5 rounded-lg px-2.5 py-1.5 text-[9px] font-mono text-slate-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                )}

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={aiPrompt}
                    onChange={(e) => setAiPrompt(e.target.value)}
                    placeholder="เช่น แก้วแชมเปญ, ช้อนตักซุป..."
                    className="flex-grow bg-slate-900 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleGenerateWithAI();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleGenerateWithAI}
                    disabled={isAiGenerating}
                    className="bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-bold text-[10px] px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                  >
                    {isAiGenerating ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3" />}
                    {isAiGenerating ? 'กำลังเจน...' : 'เจนด้วย AI'}
                  </button>
                </div>
                {aiMessage && (
                  <p className="text-[9px] text-amber-400/90 leading-snug">
                    {aiMessage}
                  </p>
                )}
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">ชื่อภาษาอังกฤษ *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Soup Spoon"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">ชื่อภาษาไทย *</label>
                  <input
                    type="text"
                    required
                    value={thai}
                    onChange={(e) => setThai(e.target.value)}
                    placeholder="e.g. ช้อนซุป"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">คำอ่านออกเสียงสะกด</label>
                  <input
                    type="text"
                    value={pronunciation}
                    onChange={(e) => setPronunciation(e.target.value)}
                    placeholder="e.g. /soop spoon/"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">ประโยคตัวอย่างใช้สอน</label>
                  <input
                    type="text"
                    value={sentence}
                    onChange={(e) => setSentence(e.target.value)}
                    placeholder="Place the soup spoon on the right."
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[9px] uppercase text-slate-500 font-bold">คำอธิบายอุปกรณ์ (Description)</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="ช้อนทรงกลมใหญ่สำหรับใช้ตักทานซุป..."
                  className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 min-h-[40px] max-h-[60px] focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              {/* 3D Shape Settings */}
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block border-b border-white/5 pt-2 pb-1">ตั้งค่าโมเดล 3D (3D Mesh Configuration)</span>
              
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">รูปทรง 3 มิติ</label>
                  <select
                    value={shapeType}
                    onChange={(e) => setShapeType(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  >
                    <option value="box">Box (กล่อง)</option>
                    <option value="cylinder">Cylinder (ทรงกระบอก)</option>
                    <option value="sphere">Sphere (ทรงกลม)</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">สีโมเดล (Color)</label>
                  <div className="flex gap-2 items-center bg-slate-950 border border-white/5 rounded-xl px-2.5 py-1">
                    <input
                      type="color"
                      value={shapeColor}
                      onChange={(e) => setShapeColor(e.target.value)}
                      className="w-6 h-5 rounded cursor-pointer border-0 bg-transparent"
                    />
                    <span className="text-[10px] font-mono uppercase text-slate-400">{shapeColor}</span>
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">กว้าง / รัศมี</label>
                  <input
                    type="number"
                    step="0.05"
                    value={sizeW}
                    onChange={(e) => setSizeW(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">ความสูง (Height)</label>
                  <input
                    type="number"
                    step="0.05"
                    value={sizeH}
                    onChange={(e) => setSizeH(e.target.value)}
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">ความลึก (Depth) *เฉพาะกล่อง</label>
                  <input
                    type="number"
                    step="0.05"
                    disabled={shapeType !== 'box'}
                    value={sizeD}
                    onChange={(e) => setSizeD(e.target.value)}
                    className="w-full bg-slate-950 disabled:opacity-40 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Quiz Configuration */}
              <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider block border-b border-white/5 pt-2 pb-1">ตั้งค่าคำถามทบทวนคำศัพท์ (Vocab Quiz)</span>
              
              <div className="space-y-2">
                <div className="space-y-1">
                  <label className="text-[9px] uppercase text-slate-500 font-bold">คำถาม (ภาษาไทย)</label>
                  <input
                    type="text"
                    value={quizQ}
                    onChange={(e) => setQuizQ(e.target.value)}
                    placeholder="เช่น อุปกรณ์นี้ใช้สำหรับทำอะไร?"
                    className="w-full bg-slate-950 border border-white/5 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-emerald-500 font-bold">ช้อยส์ที่ถูก *</label>
                    <input
                      type="text"
                      value={ansCorrect}
                      onChange={(e) => setAnsCorrect(e.target.value)}
                      placeholder="ถูก"
                      className="w-full bg-slate-950 border border-emerald-500/20 rounded-xl px-2.5 py-1.5 text-xs text-emerald-400 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-rose-500 font-bold">ช้อยส์ผิด 1</label>
                    <input
                      type="text"
                      value={ansWrong1}
                      onChange={(e) => setAnsWrong1(e.target.value)}
                      placeholder="ผิด 1"
                      className="w-full bg-slate-950 border border-rose-500/20 rounded-xl px-2.5 py-1.5 text-xs text-rose-400 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[9px] uppercase text-rose-500 font-bold">ช้อยส์ผิด 2</label>
                    <input
                      type="text"
                      value={ansWrong2}
                      onChange={(e) => setAnsWrong2(e.target.value)}
                      placeholder="ผิด 2"
                      className="w-full bg-slate-950 border border-rose-500/20 rounded-xl px-2.5 py-1.5 text-xs text-rose-400 focus:outline-none focus:border-rose-500"
                    />
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-2 flex items-center justify-between">
              {message && (
                <div className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> {message}
                </div>
              )}
              <button
                type="submit"
                className="ml-auto bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 shadow-lg shadow-amber-500/10 transition"
              >
                <Plus className="w-4 h-4" /> เพิ่มอุปกรณ์
              </button>
            </div>
          </form>

          {/* Right Library list: Added items */}
          <div className="xl:col-span-7 flex flex-col gap-3 min-h-[380px] max-h-[440px] overflow-y-auto pr-1">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1">อุปกรณ์การเรียนรู้ทั้งหมด ({items.length})</span>
            
            {items.length === 0 ? (
              <div className="flex-grow flex flex-col justify-center items-center py-12 text-slate-500 bg-slate-900/25 border border-dashed border-white/5 rounded-2xl">
                <Layers className="w-8 h-8 text-slate-700 mb-2" />
                <span className="text-xs">ยังไม่มีอุปกรณ์ AR / 3D ในคลังของคุณ</span>
                <span className="text-[10px] text-slate-600 mt-1">กรอกข้อมูลฝั่งซ้ายเพื่อสร้าง หรือกดโหลดชุดตัวอย่างเพื่อทดสอบ</span>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 gap-3">
                {items.map((item) => (
                  <div key={item.id} className="bg-slate-950/45 border border-white/5 p-3.5 rounded-2xl flex flex-col justify-between hover:border-slate-800 transition">
                    <div>
                      
                      {/* Name tags */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="text-xs font-black text-white">{item.title}</h4>
                          <span className="text-[10px] text-amber-400 font-medium block">{item.thai}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="w-7 h-7 rounded-lg bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-400 hover:bg-rose-500/20 transition"
                          title="Delete item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Description & Sentence */}
                      <p className="text-[10px] text-slate-400 line-clamp-2 leading-relaxed mb-3">
                        {item.description}
                      </p>

                      {/* Small Live 3D Shape Preview Canvas */}
                      <div className="aspect-video w-full rounded-xl overflow-hidden bg-slate-950/80 border border-white/5 relative mb-3">
                        <ARScene selectedItem={item.id} itemTitle={item.title} customShape={item.shape} />
                        <div className="absolute top-2 left-2 bg-slate-900/80 px-2 py-0.5 rounded text-[8px] text-slate-400 border border-white/5 pointer-events-none">
                          3D Shape: {item.shape?.type} ({item.shape?.color})
                        </div>
                      </div>

                      {/* example conversation */}
                      <div className="bg-white/5 px-2.5 py-1.5 rounded-xl border border-white/5 text-[9px] italic text-slate-300 font-serif line-clamp-1 mb-2">
                        "{item.sentence}"
                      </div>

                    </div>

                    <div className="border-t border-white/5 pt-2 flex items-center justify-between text-[9px] text-slate-500">
                      <span className="truncate max-w-[80px]" title={item.id}>ID: {item.id.substring(0, 12)}…</span>
                      <div className="flex items-center gap-1.5">
                        {item.quiz && (
                          <span className="text-emerald-400 font-bold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md">Quiz ✓</span>
                        )}
                        <button
                          onClick={() => setQrItem(item)}
                          className="flex items-center gap-1 px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/20 text-amber-400 rounded-md transition"
                          title="สร้าง QR Code"
                        >
                          <QrCode className="w-3 h-3" /> QR
                        </button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>

    {/* QR Code Modal */}
    {qrItem && <QRModal item={qrItem} onClose={() => setQrItem(null)} />}
  </>
  )
}
