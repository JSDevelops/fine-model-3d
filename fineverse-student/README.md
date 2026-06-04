# FINEVERSE Student App

React + Vite + Three.js student-facing training interface for FINEVERSE.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5174

## Project Structure

```
src/
├── main.jsx                          # Entry + React Router
├── index.css                         # Global tokens & base styles
├── data/
│   └── missions.js                   # 4 missions × full dialogue scripts + SCENES
├── hooks/
│   ├── useProgress.jsx               # Student progress state (sessionStorage)
│   └── useSpeech.js                  # Web Speech API — TTS + STT + scoreTranscript()
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx / .css         # Top nav with live progress bar
│   └── simulation/
│       ├── Scene3D.jsx               # Three.js procedural 3D scenes (Restaurant + VIP)
│       ├── CoachPanel.jsx / .css     # NPC bubble · choice buttons · mic · score ring
└── pages/
    ├── Landing.jsx / .css            # Hero · resume banner · scene cards · mission list
    ├── Simulation.jsx / .css         # Full-screen sim shell + MissionComplete screen
    └── Progress.jsx / .css          # Progress overview + Leaderboard
```

## Key Features

| Feature | Implementation |
|---------|---------------|
| 3D scenes | Three.js procedural geometry via @react-three/fiber |
| Orbit controls | @react-three/drei OrbitControls |
| NPC voice (TTS) | Web Speech Synthesis API |
| Speech input (STT) | webkitSpeechRecognition (Chrome/Safari) |
| Score calculation | Keyword match + word overlap vs correct answer |
| Progress persistence | sessionStorage via useReducer |
| Routing | React Router v6 |

## Speech Notes

- **TTS**: Works in all modern browsers
- **STT**: Requires Chrome or Safari (uses `webkitSpeechRecognition`)
- Falls back to multiple-choice mode in unsupported browsers

## Missions Included

| Mission | Scene | Steps | Difficulty |
|---------|-------|-------|------------|
| Welcoming Guests | Restaurant | 4 | Easy |
| Taking Food Orders | Restaurant | 6 | Medium |
| Beverage Recommendation | Restaurant | 3 | Medium |
| VIP Guest Check-in | VIP Lounge | 4 | Hard |

## Phase Roadmap

- **Phase 2 (current)**: React UI + Three.js + Web Speech API
- **Phase 3**: Firebase Auth, Firestore scores, AR.js camera scan
