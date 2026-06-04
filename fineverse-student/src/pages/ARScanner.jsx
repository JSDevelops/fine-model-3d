// src/pages/ARScanner.jsx
import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'
import { useTTS, useSTT, scoreTranscript, computeSpeechDiff } from '../hooks/useSpeech'
import './ARScanner.css'

/* ── Web Audio Beep generator ── */
function playScanBeep() {
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext
    const ctx = new AudioContext()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.setValueAtTime(1000, ctx.currentTime) // High-pitch beep
    gain.gain.setValueAtTime(0.08, ctx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15)
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    osc.stop(ctx.currentTime + 0.15)
  } catch (e) {
    console.warn('Audio Context not allowed or failed:', e)
  }
}

/* ── Hotspot inside AR view ── */
function ARHotspot({ position, label, onClick }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(clock.elapsedTime * 4) * 0.08)
    }
  })
  return (
    <group ref={ref} position={position} onClick={onClick}>
      <mesh>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshBasicMaterial color="#38bdf8" />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.11, 16, 16]} />
        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.3} />
      </mesh>
      <Html center distanceFactor={4} style={{ pointerEvents: 'none' }}>
        <div style={{
          background: 'rgba(15, 23, 42, 0.9)', color: '#38bdf8', padding: '2px 6px',
          border: '1px solid rgba(56, 189, 248, 0.4)', borderRadius: 4, fontSize: 10,
          fontWeight: 600, whiteSpace: 'nowrap', fontFamily: 'Inter, sans-serif'
        }}>
          {label}
        </div>
      </Html>
    </group>
  )
}

/* ── 3D Coffee Maker Model ── */
function CoffeeMaker({ onSelectHotspot }) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Base */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial color="#334155" metalness={0.6} roughness={0.2} />
      </mesh>
      {/* Back Column */}
      <mesh position={[0, 0.6, -0.3]}>
        <boxGeometry args={[0.75, 1.0, 0.2]} />
        <meshStandardMaterial color="#475569" metalness={0.5} roughness={0.3} />
      </mesh>
      {/* Top Head */}
      <mesh position={[0, 1.05, 0.1]}>
        <boxGeometry args={[0.75, 0.12, 0.6]} />
        <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Filter Holder */}
      <mesh position={[0, 0.85, 0.2]} rotation={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.1, 12]} />
        <meshStandardMaterial color="#1e293b" metalness={0.8} roughness={0.1} />
      </mesh>
      {/* Filter Handle */}
      <mesh position={[0.18, 0.85, 0.35]} rotation={[0.2, 0.4, 1.5]}>
        <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
        <meshStandardMaterial color="#0f172a" roughness={0.7} />
      </mesh>
      {/* Espresso Cup */}
      <mesh position={[0, 0.2, 0.15]}>
        <cylinderGeometry args={[0.14, 0.1, 0.2, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>
      {/* Cup Handle */}
      <mesh position={[-0.14, 0.22, 0.15]} rotation={[0, 0, 1.5]}>
        <torusGeometry args={[0.06, 0.02, 8, 16]} />
        <meshStandardMaterial color="#f8fafc" roughness={0.2} />
      </mesh>

      {/* Hotspots */}
      <ARHotspot 
        position={[0.2, 0.95, 0.3]} 
        label="Portafilter Handle" 
        onClick={() => onSelectHotspot({
          title: "Espresso Portafilter",
          desc: "Insert coffee grounds, press with a tamper, and lock into the group head. Speak 'Double shot of espresso, please' to trigger."
        })}
      />
      <ARHotspot 
        position={[0, 0.25, 0.25]} 
        label="Demitasse Cup" 
        onClick={() => onSelectHotspot({
          title: "Serving Demi-Cup",
          desc: "Pre-warm the cup. Serve with a small spoon, a sugar cube, and a shot of sparkling water on the side."
        })}
      />
    </group>
  )
}

/* ── 3D Cocktail Shaker Model ── */
function CocktailShaker({ onSelectHotspot }) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Shaker Main Tumbler */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.3, 0.24, 0.8, 24]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Shaker Cap/Strainer lid */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.22, 0.3, 0.16, 20]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Top Cap */}
      <mesh position={[0, 1.02, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.12, 16]} />
        <meshStandardMaterial color="#cbd5e1" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Lemon Garnish decoration */}
      <mesh position={[0.35, 0.7, 0.1]} rotation={[1.2, 0.5, 0.8]}>
        <torusGeometry args={[0.1, 0.03, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#fef08a" roughness={0.5} />
      </mesh>

      {/* Hotspots */}
      <ARHotspot 
        position={[0, 0.95, 0.1]} 
        label="Strainer Cap" 
        onClick={() => onSelectHotspot({
          title: "Built-in Strainer",
          desc: "Remove the top cap to strain the cocktail over fresh ice. Keeps ice cubes and fruit pulp inside the shaker."
        })}
      />
      <ARHotspot 
        position={[0.3, 0.65, 0.1]} 
        label="Lemon Rim" 
        onClick={() => onSelectHotspot({
          title: "Citrus Garnish",
          desc: "A fresh lemon wheel or wedge adds visual flair and essential oils. Rub along the glass rim for aroma."
        })}
      />
    </group>
  )
}

/* ── 3D VIP Welcome Tray ── */
function VIPWelcomeTray({ onSelectHotspot }) {
  return (
    <group position={[0, -0.6, 0]}>
      {/* Golden Tray */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.65, 0.65, 0.04, 32]} />
        <meshStandardMaterial color="#fbbf24" metalness={0.95} roughness={0.05} />
      </mesh>
      {/* Champagne Bottle */}
      <group position={[-0.15, 0.07, 0]}>
        <mesh position={[0, 0.3, 0]}>
          <cylinderGeometry args={[0.1, 0.12, 0.5, 16]} />
          <meshStandardMaterial color="#065f46" metalness={0.3} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.6, 0]}>
          <cylinderGeometry args={[0.04, 0.1, 0.15, 12]} />
          <meshStandardMaterial color="#065f46" metalness={0.3} roughness={0.2} />
        </mesh>
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.1, 10]} />
          <meshStandardMaterial color="#047857" metalness={0.2} />
        </mesh>
        {/* Golden Foil */}
        <mesh position={[0, 0.73, 0]}>
          <cylinderGeometry args={[0.032, 0.032, 0.08, 10]} />
          <meshStandardMaterial color="#fbbf24" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>
      {/* Champagne Flute Glass */}
      <group position={[0.2, 0.07, 0.15]}>
        {/* Base */}
        <mesh position={[0, 0.01, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.01, 12]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.4} roughness={0.1} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.18, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.34, 8]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.4} roughness={0.1} />
        </mesh>
        {/* Bowl */}
        <mesh position={[0, 0.45, 0]}>
          <cylinderGeometry args={[0.08, 0.06, 0.22, 12]} />
          <meshStandardMaterial color="#f8fafc" transparent opacity={0.4} roughness={0.1} />
        </mesh>
      </group>

      {/* Hotspots */}
      <ARHotspot 
        position={[-0.15, 0.78, 0]} 
        label="Champagne Foil" 
        onClick={() => onSelectHotspot({
          title: "VIP Champagne",
          desc: "Serve champagne chilled to 6–8°C. Cut the foil under the collar, keep your thumb on the cork, and twist the bottle."
        })}
      />
      <ARHotspot 
        position={[0.2, 0.4, 0.15]} 
        label="Flute Glass" 
        onClick={() => onSelectHotspot({
          title: "Champagne Flute",
          desc: "A tall, narrow glass design preserves champagne bubbles (effervescence) and directs the aroma to the nose."
        })}
      />
    </group>
  )
}

/* ── Mock Database for AI scanner ── */
const MOCK_AI_OBJECTS = [
  {
    titleEn: 'Espresso Demitasse Cup',
    titleTh: 'ถ้วยกาแฟเอสเปรสโซ',
    descEn: 'A small cup designed for serving a single or double shot of espresso. It typically holds around 60-90ml and is pre-heated to retain temperature.',
    descTh: 'ถ้วยขนาดเล็กที่ออกแบบมาสำหรับเสิร์ฟเอสเปรสโซ 1 หรือ 2 ช็อต มักจะมีความจุประมาณ 60-90 มิลลิลิตร และต้องอุ่นถ้วยล่วงหน้าเพื่อรักษาอุณหภูมิ',
    practicePhrase: 'Please serve the double espresso in a pre heated demitasse cup',
    keywords: ['serve', 'double', 'espresso', 'pre-heated', 'cup']
  },
  {
    titleEn: 'Cocktail Shaker',
    titleTh: 'กระบอกเขย่าค็อกเทล',
    descEn: 'A metal canister used to mix beverages (typically alcoholic) by shaking. It contains a built-in strainer cap for filtering ice cubes.',
    descTh: 'กระบอกโลหะที่ใช้ผสมเครื่องดื่ม (โดยเฉพาะแอลกอฮอล์) ด้วยการเขย่า ภายในมีฝากรองในตัวสำหรับกรองน้ำแข็งออก',
    practicePhrase: 'Shake the cocktail vigorously with ice cubes and strain it into the glass',
    keywords: ['shake', 'cocktail', 'ice', 'strain', 'glass']
  },
  {
    titleEn: 'Champagne Flute',
    titleTh: 'แก้วแชมเปญทรงสูง',
    descEn: 'A stem glass with a tall, narrow bowl designed to preserve the effervescence of champagne and sparkling wines.',
    descTh: 'แก้วมีก้านที่มีทรงแก้วสูงและแคบ ออกแบบมาเพื่อรักษาฟองและการซ่าของแชมเปญและสปาร์กลิงไวน์',
    practicePhrase: 'Pour the chilled champagne slowly into the tall flute glass',
    keywords: ['pour', 'champagne', 'slowly', 'tall', 'flute']
  },
  {
    titleEn: 'Porcelain Dinner Plate',
    titleTh: 'จานดินเนอร์กระเบื้องพอร์ซเลน',
    descEn: 'A large flat dish, typically 10-12 inches in diameter, used for serving the main course of a meal in fine dining restaurants.',
    descTh: 'จานแบนขนาดใหญ่ โดยทั่วไปมีเส้นผ่านศูนย์กลาง 10-12 นิ้ว ใช้สำหรับเสิร์ฟอาหารจานหลักในร้านอาหารระดับหรู',
    practicePhrase: 'We will present the roasted chicken on a hot dinner plate',
    keywords: ['present', 'chicken', 'hot', 'dinner', 'plate']
  },
  {
    titleEn: 'Dinner Fork',
    titleTh: 'ส้อมดินเนอร์',
    descEn: 'A standard four-pronged fork used for eating the main course of a meal.',
    descTh: 'ส้อมสี่ขาขนาดมาตรฐานสำหรับใช้รับประทานอาหารจานหลัก',
    practicePhrase: 'Please place the dinner fork on the left side of the plate',
    keywords: ['place', 'dinner', 'fork', 'left', 'plate']
  },
  {
    titleEn: 'Soup Spoon',
    titleTh: 'ช้อนซุป',
    descEn: 'A spoon with a round bowl designed specifically for drinking soup.',
    descTh: 'ช้อนที่มีส่วนช้อนกลมออกแบบมาสำหรับการรับประทานซุปโดยเฉพาะ',
    practicePhrase: 'The soup spoon should be placed on the outer right side',
    keywords: ['soup', 'spoon', 'placed', 'outer', 'right']
  },
  {
    titleEn: 'Dinner Knife',
    titleTh: 'มีดดินเนอร์',
    descEn: 'A table knife with a slightly serrated blade used for cutting main course food.',
    descTh: 'มีดสำหรับใช้รับประทานอาหารจานหลัก มีใบมีดฟันเลื่อยเล็กน้อย',
    practicePhrase: 'Use the dinner knife to cut the roasted chicken',
    keywords: ['use', 'dinner', 'knife', 'cut', 'roasted', 'chicken']
  },
  {
    titleEn: 'Dinner Napkin',
    titleTh: 'ผ้าเช็ดปากดินเนอร์',
    descEn: 'A cloth napkin placed on the lap to protect clothing and wipe lips.',
    descTh: 'ผ้าเช็ดปากสำหรับวางบนตักของแขกเพื่อปกป้องเสื้อผ้าและเช็ดริมฝีปาก',
    practicePhrase: 'Fold the dinner napkin neatly and place it on the plate',
    keywords: ['fold', 'dinner', 'napkin', 'neatly', 'place', 'plate']
  },
  {
    titleEn: 'Wine Glass',
    titleTh: 'แก้วไวน์',
    descEn: 'A stemmed glass container designed specifically for serving wine.',
    descTh: 'แก้วมีก้านสำหรับเสิร์ฟไวน์แดงหรือไวน์ขาวแก่ลูกค้า',
    practicePhrase: 'Pour the red wine carefully into the large wine glass',
    keywords: ['pour', 'red', 'wine', 'carefully', 'large', 'glass']
  },
  {
    titleEn: 'Caesar Salad',
    titleTh: 'ซีซาร์สลัด',
    descEn: 'A classic appetizer salad of romaine lettuce and croutons dressed with lemon juice, olive oil, and parmesan cheese.',
    descTh: 'สลัดยอดนิยมทำจากผักกาดโรเมนและขนมปังกรอบ คลุกเคล้าน้ำมะนาว น้ำมันมะกอก และพาร์เมซานชีส',
    practicePhrase: 'Would you like to start with a fresh Caesar Salad',
    keywords: ['start', 'fresh', 'Caesar', 'Salad']
  },
  {
    titleEn: 'Creamy Mushroom Soup',
    titleTh: 'ซุปครีมเห็ด',
    descEn: 'A warm, thick soup made from fresh mushrooms, cream, and vegetable stock.',
    descTh: 'ซุปอุ่นเนื้อข้นทำจากเห็ดสด ครีม และน้ำสต๊อกผัก',
    practicePhrase: 'This warm soup is perfect for a cold evening',
    keywords: ['warm', 'soup', 'perfect', 'cold', 'evening']
  },
  {
    titleEn: 'Chocolate Lava Cake',
    titleTh: 'เค้กช็อกโกแลตลาวา',
    descEn: 'A popular dessert featuring a warm chocolate cake with a liquid chocolate center.',
    descTh: 'ของหวานยอดนิยมที่มีเค้กช็อกโกแลตอุ่นๆ พร้อมไส้ช็อกโกแลตลาวาไหลเยิ้ม',
    practicePhrase: 'For dessert I highly recommend our chocolate lava cake',
    keywords: ['dessert', 'highly', 'recommend', 'chocolate', 'lava', 'cake']
  },
  {
    titleEn: 'Stainless Steel Wine Bucket',
    titleTh: 'ถังแช่ไวน์สเตนเลส',
    descEn: 'A container filled with ice and water used to keep wine bottles chilled at the guest\'s table.',
    descTh: 'ภาชนะสำหรับใส่น้ำแข็งและน้ำ ใช้เพื่อรักษาความเย็นของขวดไวน์ข้างโต๊ะอาหารของแขก',
    practicePhrase: 'Place the white wine bottle inside the bucket filled with ice water',
    keywords: ['place', 'white', 'wine', 'bucket', 'ice', 'water']
  }
]

/* ── Futuristic AI Hologram Model & Overlay ── */
function AIScannerModel({ result, onSpeak, speaking, recording, onStartRecord, onStopRecord, score, transcript, speechDiff }) {
  const ringRef = useRef()
  const meshRef = useRef()

  useFrame(({ clock }) => {
    if (ringRef.current) {
      ringRef.current.rotation.y = clock.getElapsedTime() * 0.5
      ringRef.current.rotation.x = clock.getElapsedTime() * 0.2
    }
    if (meshRef.current) {
      meshRef.current.rotation.y = -clock.getElapsedTime() * 0.3
      meshRef.current.position.y = -0.2 + Math.sin(clock.getElapsedTime() * 2) * 0.05
    }
  })

  return (
    <group>
      {/* Outer Hologram Scanning Rings */}
      <group ref={ringRef} position={[0, -0.2, 0]}>
        <mesh>
          <torusGeometry args={[0.7, 0.015, 8, 48]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} wireframe />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.55, 0.01, 8, 48]} />
          <meshBasicMaterial color="#0891b2" transparent opacity={0.4} wireframe />
        </mesh>
      </group>

      {/* Inner Glowing Hologram Object (rotating) */}
      <mesh ref={meshRef} position={[0, -0.2, 0]}>
        <dodecahedronGeometry args={[0.3, 1]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.25} wireframe />
      </mesh>

      {/* Futuristic Floating 3D Panel */}
      {result && (
        <Html position={[0.85, 0.3, 0]} center distanceFactor={3.5}>
          <div className="hologram-3d-card">
            <div className="holo-header">
              <span className="holo-ai-badge"><i className="fa-solid fa-microchip" aria-hidden="true" /> AI ANALYZED</span>
              <button className="holo-speak-btn" onClick={() => onSpeak(result.titleEn)} disabled={speaking}>
                <i className={`fa-solid ${speaking ? 'fa-spinner fa-spin' : 'fa-volume-high'}`} aria-hidden="true" />
              </button>
            </div>
            
            <div className="holo-names">
              <h2 className="holo-title-en">{result.titleEn}</h2>
              <h3 className="holo-title-th">{result.titleTh}</h3>
            </div>

            <div className="holo-desc-tabs">
              <div className="holo-desc-sec">
                <strong>Description:</strong>
                <p>{result.descEn}</p>
                <p className="holo-th-text">{result.descTh}</p>
              </div>
            </div>

            <div className="holo-coach-section">
              <div className="holo-coach-title">
                <i className="fa-solid fa-microphone-lines" aria-hidden="true" /> AI Pronunciation Coach
              </div>
              <p className="holo-coach-phrase">"{result.practicePhrase}"</p>
              
              <div className="holo-coach-controls">
                {recording ? (
                  <button className="holo-mic-btn recording" onClick={onStopRecord}>
                    <div className="holo-mic-pulse" />
                    <i className="fa-solid fa-stop" aria-hidden="true" /> Stop & Grade
                  </button>
                ) : (
                  <button className="holo-mic-btn" onClick={onStartRecord}>
                    <i className="fa-solid fa-microphone" aria-hidden="true" /> Record Speech
                  </button>
                )}
              </div>

              {transcript && (
                <div className="holo-coach-feedback">
                  <div className="holo-feedback-meta">
                    <span>You said:</span>
                    <span className={`holo-score-badge ${score >= 80 ? 'high' : score >= 60 ? 'mid' : 'low'}`}>
                      {score}% Match
                    </span>
                  </div>
                  
                  <div className="holo-transcript-diff">
                    {speechDiff.correctWords.map((word, index) => (
                      <span 
                        key={index} 
                        className={`holo-diff-word status-${word.status}`}
                      >
                        {word.text}
                      </span>
                    ))}
                  </div>

                  {speechDiff.extraWords.length > 0 && (
                    <div className="holo-extra-words">
                      Unrecognized: {speechDiff.extraWords.join(', ')}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Html>
      )}
    </group>
  )
}

export default function ARScanner() {
  const navigate = useNavigate()
  const videoRef = useRef(null)
  
  const [loading, setLoading] = useState(true)
  const [cameraActive, setCameraActive] = useState(false)
  const [cameraError, setCameraError] = useState(null)
  const [activeItem, setActiveItem] = useState('coffeemaker') // 'coffeemaker' | 'shaker' | 'tray'
  const [selectedHotspot, setSelectedHotspot] = useState(null)
  const [scanStatus, setScanStatus] = useState('Align target to detect QR markers')
  
  // High-Tech scan states
  const [unlockedItems, setUnlockedItems] = useState(['coffeemaker'])
  const [isScanning, setIsScanning] = useState(false)
  const [flashActive, setFlashActive] = useState(false)
  const [scanLogs, setScanLogs] = useState([])

  // AI Scanner & speech states
  const [mode, setMode] = useState('qr') // 'qr' | 'ai'
  const [aiResult, setAiResult] = useState(null)
  const [score, setScore] = useState(0)
  const [speechDiff, setSpeechDiff] = useState({ correctWords: [], extraWords: [] })

  const { speak, speaking } = useTTS()
  const { start: startSTT, stop: stopSTT, transcript: sttTranscript, listening: sttListening } = useSTT()

  // Real-time speech alignment feedback
  useEffect(() => {
    if (sttTranscript && aiResult) {
      const computedScore = scoreTranscript(sttTranscript, aiResult.practicePhrase, aiResult.keywords || [])
      const diff = computeSpeechDiff(sttTranscript, aiResult.practicePhrase)
      setScore(computedScore)
      setSpeechDiff(diff)
    }
  }, [sttTranscript, aiResult])

  const handleSwitchMode = (newMode) => {
    if (isScanning) return
    setMode(newMode)
    setSelectedHotspot(null)
    setAiResult(null)
    setScore(0)
    setSpeechDiff({ correctWords: [], extraWords: [] })
    window.speechSynthesis.cancel()
    stopSTT()
    if (newMode === 'ai') {
      setScanStatus('Position object in scanner and click Analyze')
    } else {
      setScanStatus('Align target to detect QR markers')
    }
  }

  function triggerMockScan() {
    const randomObj = MOCK_AI_OBJECTS[Math.floor(Math.random() * MOCK_AI_OBJECTS.length)]
    setScanLogs(prev => [...prev, { text: `Mock matched: ${randomObj.titleEn}`, time: '1.6s', type: 'success' }])
    
    setTimeout(() => {
      setAiResult(randomObj)
      setScore(0)
      setSpeechDiff({ correctWords: [], extraWords: [] })
      setIsScanning(false)
      setScanStatus(`Analysis complete: ${randomObj.titleEn}`)
    }, 1800)
  }

  const handleCaptureAndAnalyze = async () => {
    if (!videoRef.current) return
    setIsScanning(true)
    setSelectedHotspot(null)
    setAiResult(null)
    setScore(0)
    setSpeechDiff({ correctWords: [], extraWords: [] })
    setScanStatus('Capturing image frame...')
    
    // Flash and sound effects
    setFlashActive(true)
    playScanBeep()
    setTimeout(() => setFlashActive(false), 200)

    // Capture canvas
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth || 640
    canvas.height = videoRef.current.videoHeight || 480
    const ctx = canvas.getContext('2d')
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height)
    const base64Image = canvas.toDataURL('image/jpeg').split(',')[1]

    setScanLogs([{ text: 'Accessing video buffer stream...', time: '0.1s', type: 'info' }])
    
    setTimeout(() => {
      setScanLogs(prev => [...prev, { text: 'Rendering 2D raster frame...', time: '0.4s', type: 'info' }])
    }, 400)

    setTimeout(() => {
      setScanLogs(prev => [...prev, { text: 'Submitting visual tensor payload to Gemini API...', time: '0.8s', type: 'info' }])
    }, 800)

    const apiKey = import.meta.env.VITE_GEMINI_API_KEY
    if (apiKey && apiKey !== 'your_gemini_key') {
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
                      text: 'Identify the service or hospitality-related object in the picture. Respond ONLY in valid JSON format. JSON schema: {"object_name_en": string, "object_name_th": string, "description_en": string, "description_th": string, "practice_phrase_en": string}. Do not wrap the response in markdown blocks.'
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
        
        setScanLogs(prev => [...prev, { text: `Gemini resolved: ${parsed.object_name_en}`, time: '1.4s', type: 'success' }])
        
        setTimeout(() => {
          setAiResult({
            titleEn: parsed.object_name_en,
            titleTh: parsed.object_name_th,
            descEn: parsed.description_en,
            descTh: parsed.description_th,
            practicePhrase: parsed.practice_phrase_en || `This is a ${parsed.object_name_en.toLowerCase()} for hospitality service.`,
            keywords: parsed.object_name_en.split(' ')
          })
          setIsScanning(false)
          setScanStatus(`Analysis complete: ${parsed.object_name_en}`)
        }, 1800)

      } catch (e) {
        console.error('Gemini API call failed:', e)
        setScanLogs(prev => [...prev, { text: 'Gemini call failed. Running local mock fallback...', time: '1.3s', type: 'warning' }])
        setTimeout(triggerMockScan, 1000)
      }
    } else {
      setTimeout(() => {
        setScanLogs(prev => [...prev, { text: 'Gemini key unset. Loading local classifier...', time: '1.1s', type: 'info' }])
      }, 1200)
      setTimeout(triggerMockScan, 1800)
    }
  }

  // 1. Initialize video stream
  useEffect(() => {
    setLoading(true)
    setCameraError(null)

    navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' }
    })
    .then(stream => {
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraActive(true)
      setLoading(false)
    })
    .catch(err => {
      console.warn('Environment camera failed, trying front camera...', err)
      navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }
        setCameraActive(true)
        setLoading(false)
      })
      .catch(fallbackErr => {
        console.error('Camera access denied:', fallbackErr)
        setCameraError('Camera access denied. Please verify browser camera permissions.')
        setLoading(false)
      })
    })

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  // 2. Simulate QR Scanner action with high-tech visual feedback
  function handleScanQR(itemToUnlock) {
    if (isScanning) return
    setIsScanning(true)
    setSelectedHotspot(null)
    setScanStatus(`Calibrating camera for QR marker: ${itemToUnlock.toUpperCase()}…`)
    setScanLogs([])

    const addLog = (timeStr, text, type = '') => {
      setScanLogs(prev => [...prev, { time: timeStr, text, type }])
    }

    // Sequence of mock scanning steps
    addLog('0.0s', 'Initializing CCD Scanner Matrix...', 'info')
    
    setTimeout(() => {
      addLog('0.3s', 'Targeting high-contrast regions in viewport...', 'info')
      setScanStatus('Targeting QR symbol...')
    }, 300)

    setTimeout(() => {
      addLog('0.7s', 'QR Anchor frames detected. Resolving perspective tilt...', 'warning')
    }, 700)

    setTimeout(() => {
      addLog('1.1s', 'Grid locked. Reading raw byte sequence from matrix...', 'info')
    }, 1100)

    setTimeout(() => {
      addLog('1.5s', 'Checksum verified: 0xF8C1. Decrypted successfully.', 'info')
    }, 1500)

    setTimeout(() => {
      addLog('1.8s', `Hardware match: [FV-${itemToUnlock.toUpperCase()}-MODULE]`, 'success')
      setScanStatus('Match Found!')
    }, 1800)

    setTimeout(() => {
      // Trigger flash and beep
      setFlashActive(true)
      playScanBeep()
      
      // Update unlocked items and switch to it
      setUnlockedItems(prev => [...prev, itemToUnlock])
      setActiveItem(itemToUnlock)
      setIsScanning(false)
      setScanStatus(`Marker matched! Unlocked ${itemToUnlock === 'shaker' ? 'Cocktail Shaker' : 'VIP Champagne Tray'}`)
      
      if (itemToUnlock === 'shaker') {
        setSelectedHotspot({
          title: "Beverage Shaker Unlocked!",
          desc: "Target QR matched. Tap the highlighted blue hotspots on the metallic shaker to study standard bar shaking and straining protocols."
        })
      } else {
        setSelectedHotspot({
          title: "VIP Champagne Tray Unlocked!",
          desc: "Target QR matched. Tap the highlighted blue hotspots on the golden champagne tray to study VIP escort and serving protocols."
        })
      }

      // Turn off flash after a short delay
      setTimeout(() => setFlashActive(false), 200)
    }, 2100)
  }

  function handleSwitchItem(itemType) {
    if (isScanning) return
    setActiveItem(itemType)
    setSelectedHotspot(null)
    setScanStatus(`Viewing ${itemType === 'coffeemaker' ? 'Coffee Machine' : itemType === 'shaker' ? 'Cocktail Shaker' : 'VIP Champagne Tray'}`)
  }

  return (
    <div className="ar-page">
      {/* Visual camera flash overlay */}
      <div className={`ar-camera-flash ${flashActive ? 'flash' : ''}`} />

      {loading && (
        <div className="ar-loading">
          <i className="fa-solid fa-spinner fa-spin" style={{ fontSize: 32, color: '#0ea5e9' }} aria-hidden="true" />
          <span>Opening device camera…</span>
        </div>
      )}

      {cameraError && (
        <div className="ar-loading" style={{ padding: 24, textAlign: 'center' }}>
          <i className="fa-solid fa-triangle-exclamation" style={{ fontSize: 40, color: '#ef4444' }} aria-hidden="true" />
          <h3 style={{ margin: '14px 0 8px', color: '#fff' }}>Camera Access Required</h3>
          <p style={{ fontSize: 13, color: '#94a3b8', maxWidth: 300, lineHeight: 1.6 }}>{cameraError}</p>
          <button className="btn btn-primary" onClick={() => navigate('/')} style={{ marginTop: 16 }}>
            Back to Home
          </button>
        </div>
      )}

      {/* Fullscreen Video Feed */}
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="ar-video"
        style={{ display: cameraActive ? 'block' : 'none' }}
      />

      {/* Three.js Interactive R3F Canvas Layer */}
      {cameraActive && (
        <div className="ar-canvas-container">
          <Canvas
            camera={{ position: [0, 1.2, 3], fov: 45 }}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.setClearColor(0x000000, 0) // Transparent clear color
            }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[2, 4, 3]} intensity={1.2} />
            <pointLight position={[-2, 3, -1]} intensity={0.5} />

            {mode === 'qr' ? (
              <>
                {activeItem === 'coffeemaker' && <CoffeeMaker onSelectHotspot={setSelectedHotspot} />}
                {activeItem === 'shaker' && <CocktailShaker onSelectHotspot={setSelectedHotspot} />}
                {activeItem === 'tray' && <VIPWelcomeTray onSelectHotspot={setSelectedHotspot} />}
              </>
            ) : (
              <AIScannerModel 
                result={aiResult}
                onSpeak={(t) => speak(t)}
                speaking={speaking}
                recording={sttListening}
                onStartRecord={startSTT}
                onStopRecord={stopSTT}
                score={score}
                transcript={sttTranscript}
                speechDiff={speechDiff}
              />
            )}

            <OrbitControls
              enablePan={false}
              minDistance={1.8}
              maxDistance={5}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 6}
            />
          </Canvas>
        </div>
      )}

      {/* Reticle Scanner Box Grid */}
      {cameraActive && !selectedHotspot && (
        <div className="ar-scanner-overlay">
          <div className="ar-scanner-corners" />
          <div className="ar-scanline" />
          <div className="ar-scanner-text">{scanStatus}</div>
          
          {isScanning && scanLogs.length > 0 && (
            <div className="ar-scan-console">
              {scanLogs.map((log, idx) => (
                <div key={idx} className="console-log-line">
                  <span className="console-timestamp">[{log.time}]</span>
                  <span className={`console-text ${log.type}`}>{log.text}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* HUD Layer */}
      {cameraActive && (
        <div className="ar-hud">
          <div className="ar-topbar">
            <button className="ar-back-btn" onClick={() => navigate('/')} disabled={isScanning}>
              <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Home
            </button>
            
            <div className="ar-mode-tabs">
              <button 
                className={`ar-tab-btn ${mode === 'qr' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('qr')}
                disabled={isScanning}
              >
                <i className="fa-solid fa-qrcode" aria-hidden="true" /> QR Model
              </button>
              <button 
                className={`ar-tab-btn ${mode === 'ai' ? 'active' : ''}`}
                onClick={() => handleSwitchMode('ai')}
                disabled={isScanning}
              >
                <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true" /> AI Scanner
              </button>
            </div>

            <div className="ar-status-badge">
              <span className="ar-status-dot" />
              Live AR Simulation
            </div>
          </div>

          <div className="ar-bottom-panel">
            {/* Hotspot details card */}
            {selectedHotspot && (
              <div className="ar-info-card">
                <div className="ar-info-title">
                  <i className="fa-solid fa-circle-info" aria-hidden="true" />
                  {selectedHotspot.title}
                </div>
                <div className="ar-info-desc">{selectedHotspot.desc}</div>
                <div className="ar-info-action">
                  <i className="fa-solid fa-hand-pointer" aria-hidden="true" />
                  Drag outside the card to rotate 3D object
                </div>
              </div>
            )}

            {/* Quick Item select */}
            {mode === 'qr' ? (
              <div className="ar-action-bar">
                <button 
                  className={`ar-action-btn ${activeItem === 'coffeemaker' ? 'primary' : ''}`}
                  onClick={() => handleSwitchItem('coffeemaker')}
                  disabled={isScanning}
                >
                  <i className="fa-solid fa-mug-hot" aria-hidden="true" /> Espresso Maker
                </button>

                {unlockedItems.includes('shaker') ? (
                  <button 
                    className={`ar-action-btn ${activeItem === 'shaker' ? 'primary' : ''}`}
                    onClick={() => handleSwitchItem('shaker')}
                    disabled={isScanning}
                  >
                    <i className="fa-solid fa-martini-glass-shaker" aria-hidden="true" /> Cocktail Shaker
                  </button>
                ) : (
                  <button className="ar-action-btn" onClick={() => handleScanQR('shaker')} disabled={isScanning}>
                    <i className="fa-solid fa-qrcode" aria-hidden="true" /> Scan QR (Shaker)
                  </button>
                )}

                {unlockedItems.includes('tray') ? (
                  <button 
                    className={`ar-action-btn ${activeItem === 'tray' ? 'primary' : ''}`}
                    onClick={() => handleSwitchItem('tray')}
                    disabled={isScanning}
                  >
                    <i className="fa-solid fa-bell" aria-hidden="true" /> VIP Tray
                  </button>
                ) : (
                  <button className="ar-action-btn" onClick={() => handleScanQR('tray')} disabled={isScanning}>
                    <i className="fa-solid fa-qrcode" aria-hidden="true" /> Scan QR (VIP Tray)
                  </button>
                )}
              </div>
            ) : (
              <div className="ar-action-bar">
                <button 
                  className="ar-action-btn primary ai-scan-trigger-btn"
                  onClick={handleCaptureAndAnalyze}
                  disabled={isScanning}
                  style={{ width: '100%', maxWidth: 320, margin: '0 auto' }}
                >
                  <i className="fa-solid fa-camera-retro" aria-hidden="true" /> 
                  {isScanning ? 'Analyzing object...' : 'Analyze Object with Gemini AI'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

