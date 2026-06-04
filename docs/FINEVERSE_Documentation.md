



FINEVERSE
AR + 3D Hospitality Training Platform

Technical Documentation  ·  Phase 1 & 2
Version 1.0  ·  2025



React + Vite
2 Apps
Phase 3 Ready

1. Project Overview
FINEVERSE คือแพลตฟอร์มฝึกอบรมสายงาน Hospitality ด้วยระบบจำลอง 3 มิติ และ AI Coach ที่ช่วยให้นักเรียนฝึกบทสนทนาภาษาอังกฤษในสภาพแวดล้อมเสมือนจริง

1.1 วัตถุประสงค์
ฝึกทักษะการสื่อสารภาษาอังกฤษในบริบท Hospitality จริง
ให้ผู้เรียนฝึกซ้ำได้ไม่จำกัดครั้งโดยไม่ต้องมีผู้สอน
ให้ feedback ทันทีด้วย AI Speech Coach
ผู้สอนจัดการบทเรียน (Mission) ได้ผ่าน Admin Dashboard

1.2 ภาพรวมระบบ
App
รายละเอียด
fineverse-admin
Admin Dashboard — จัดการ Missions, Students, Scenes, AI settings (port 5173)
fineverse-student
Student App — Landing page, 3D Simulation, AI Coach, Progress tracking (port 5174)


2. Tech Stack
2.1 Frontend (ทั้ง 2 App)
Technology
Version
ใช้ทำ
React
18.2.0
UI Framework
Vite
5.1.0
Build tool + Dev server
React Router
6.22.0
Client-side routing
Three.js
0.155.0
3D rendering engine
@react-three/fiber
8.15.0
React bindings for Three.js
@react-three/drei
9.88.0
OrbitControls, Html overlay
Web Speech API
Browser built-in
TTS + STT (Phase 2)


3. โครงสร้างไฟล์
3.1 fineverse-admin
fineverse-admin/
├── .github/workflows/         ← CI/CD GitHub Actions
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx               ← Entry point + React Router
    ├── index.css              ← CSS variables & base styles
    ├── data/
    │   └── store.js           ← Mock data (missions, students, scenes)
    ├── hooks/
    │   └── useAppContext.jsx  ← Global state (useReducer)
    ├── components/
    │   ├── ui.jsx / ui.css   ← Shared UI atoms
    │   └── layout/
    │       ├── AppShell.jsx   ← Main wrapper
    │       ├── Sidebar.jsx    ← Navigation
    │       └── Topbar.jsx     ← Header
    └── pages/
        ├── Dashboard.jsx      ← Stats, charts, activity
        ├── Missions.jsx       ← CRUD missions
        ├── Students.jsx       ← Student management
        └── OtherPages.jsx     ← Scenes, Scores, AI, Settings

3.2 fineverse-student
fineverse-student/
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx               ← Entry + Router
    ├── data/
    │   └── missions.js        ← Mission scripts + SCENES data
    ├── hooks/
    │   ├── useProgress.jsx   ← Progress state (sessionStorage)
    │   └── useSpeech.js      ← Web Speech API (TTS + STT)
    ├── components/
    │   ├── layout/Navbar.jsx ← Top navigation
    │   └── simulation/
    │       ├── Scene3D.jsx   ← Three.js 3D scenes
    │       └── CoachPanel.jsx← AI Coach dialogue panel
    └── pages/
        ├── Landing.jsx        ← Home + mission list
        ├── Simulation.jsx     ← Full simulation view
        └── Progress.jsx       ← Progress + Leaderboard

4. State Management
4.1 Admin — useAppContext
ใช้ React useReducer ผ่าน Context API เก็บ state ทุกอย่างในหน่วยความจำ (Phase 3 จะย้ายไป Firebase Firestore)

Actions ที่รองรับ
Action type
ผลลัพธ์
ADD_MISSION
เพิ่ม mission ใหม่ พร้อม auto-generate id
UPDATE_MISSION
แก้ไข mission ที่มีอยู่
DELETE_MISSION
ลบ mission ตาม id
ADD_STUDENT
เพิ่มนักเรียนใหม่
DELETE_STUDENT
ลบนักเรียนตาม id
NOTIFY
แสดง toast notification
CLEAR_NOTIFY
ซ่อน notification

4.2 Student — useProgress
เก็บ progress ของนักเรียนใน sessionStorage — ข้าม page ได้ แต่ clear เมื่อปิด browser (Phase 3 จะ sync Firebase)

State structure
const state = {
  completedMissions: [],   // array ของ mission IDs ที่ผ่านแล้ว
  scores: {},              // { missionId: score }
  currentMission: null,   // mission ID ที่กำลังเล่น
  currentStep: 0,         // step index ปัจจุบัน
}

5. Web Speech API — AI Coach
5.1 Text-to-Speech (TTS)
ใช้ Web Speech Synthesis API ให้ตัวละคร NPC พูดออกเสียงได้จริง รองรับทุก browser สมัยใหม่

ทำงานได้ใน Chrome, Firefox, Safari, Edge — ไม่ต้องติดตั้งเพิ่ม

การใช้งาน
const { speak, stop, speaking } = useTTS()
speak('Good evening, welcome to our restaurant!', {
  rate: 0.9,    // ความเร็วพูด (0.5 - 2.0)
  lang: 'en-US' // ภาษา
})

5.2 Speech-to-Text (STT)
ใช้ webkitSpeechRecognition ให้นักเรียนพูดตอบได้จริง ระบบจะแปลงเสียงเป็นข้อความแล้วเปรียบเทียบกับคำตอบที่ถูก

⚠️  STT รองรับเฉพาะ Chrome และ Safari — browser อื่นจะ fallback ให้เลือก Multiple Choice แทน

5.3 การคำนวณคะแนน (scoreTranscript)
ฟังก์ชัน scoreTranscript() คำนวณคะแนนจาก 2 ส่วน:
Keyword match (50%) — ตรวจว่ามีคำสำคัญครบไหม เช่น "welcome", "table", "order"
Word overlap (50%) — เปรียบเทียบคำพูดกับคำตอบที่ถูก


6. ระบบ 3D Scenes
6.1 Procedural Geometry
ฉาก 3D ทั้งหมดสร้างด้วย Three.js procedural geometry ไม่ใช้ไฟล์ .gltf หรือ .obj ทำให้โหลดเร็ว ไม่มี external asset

Scene ที่มีอยู่
Scene
Difficulty
Objects ในฉาก
Restaurant Scene
Standard Room
โต๊ะ เก้าอี้ เครื่องชงกาแฟ เคาน์เตอร์ หน้าต่าง
VIP Reception Lounge
Luxury Room
เปียโน โคมระย้า เก้าอี้ Lounge เคาน์เตอร์ VIP

6.2 Hotspot System
แต่ละฉากมี Hotspot (จุดกลมเขียวลอย) ที่กดแล้วเริ่ม dialogue ได้ ใช้ useFrame hook สร้าง floating animation

7. Mission System
7.1 Missions ที่มีในโปรเจค
Mission
Scene
Steps
Difficulty
Pass Score
Welcoming Guests
Restaurant
4
Easy
60
Taking Food Orders
Restaurant
6
Medium
60
Beverage Recommendation
Restaurant
3
Medium
60
VIP Guest Check-in
VIP Lounge
4
Hard
70

8. Deployment
8.1 Local Development
รัน 2 app พร้อมกัน คนละ terminal:

Admin: cd fineverse-admin && npm install && npm run dev  →  http://localhost:5173

Student: cd fineverse-student && npm install && npm run dev  →  http://localhost:5174

8.2 GitHub + CI/CD
โปรเจคมี GitHub Actions workflows 3 ไฟล์:
ci.yml — Build check ทุก Pull Request (ทั้ง 2 app)
deploy-admin.yml — Auto deploy Admin เมื่อ push to main
deploy-student.yml — Auto deploy Student เมื่อ push to main

ขั้นตอน push ครั้งแรก
git init && git add . && git commit -m "feat: initial commit"
git branch -M main
git remote add origin https://github.com/USERNAME/fineverse.git
git push -u origin main
GitHub repo → Settings → Pages → Source: GitHub Actions
แก้ base ใน vite.config.js ให้ตรงกับชื่อ repo แล้ว push อีกครั้ง

8.3 Vercel (แนะนำ)
วิธีที่ง่ายและเร็วที่สุด — deploy แยก URL ได้ทั้ง 2 app:
cd fineverse-admin   && npx vercel --prod
cd fineverse-student && npx vercel --prod

Vercel auto-deploy ทุกครั้งที่ push to main branch

9. Phase Roadmap

Phase
สถานะ
หัวข้อ
รายละเอียด
1
✅ Done
Admin Dashboard
Mission CRUD, Student management, Dashboard charts, CI/CD
2
✅ Done
Student UI + AI Coach
Three.js 3D scenes, Web Speech API TTS+STT, Progress tracking
3
🔜 Next
AR + Firebase
AR.js camera scan, Firebase Auth + Firestore, Student certificates

9.1 Phase 3 — รายละเอียด
Firebase Integration
Firebase Auth — Sign in/Sign up สำหรับนักเรียน
Firestore — เก็บ scores, progress, missions แบบ real-time
Firebase Storage — เก็บไฟล์เสียง (Phase 4)

AR Integration
AR.js หรือ model-viewer — แสดง 3D object ซ้อนกล้องจริง
QR Code scanner — สแกนเพื่อเข้าสู่ AR experience
WebXR Device API — รองรับ VR headset (Phase 4)

Environment Variables (Phase 3)
สร้างไฟล์ .env ในแต่ละ app — อย่า commit ไฟล์นี้:
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=project_id

10. Troubleshooting

ปัญหา
วิธีแก้
3D scene ไม่แสดง
ตรวจสอบว่า three / @react-three/fiber ติดตั้งครบ, ลอง npm install ใหม่
STT ไม่ทำงาน
ใช้ Chrome หรือ Safari เท่านั้น, ให้สิทธิ์ microphone ใน browser
TTS ไม่มีเสียง
กด interact กับหน้าเว็บก่อน (browser policy กัน autoplay)
GitHub Pages 404
ตรวจ base ใน vite.config.js ให้ตรงกับชื่อ repo
npm install ล้มเหลว
ลบ node_modules/ แล้วรัน npm install ใหม่
Port ชน
Admin ใช้ 5173, Student ใช้ 5174 — อย่าเปิดซ้ำ


FINEVERSE Technical Documentation
Phase 1 & 2 Complete  ·  Phase 3 Coming Soon