# FINEVERSE Admin Dashboard

React + Vite admin panel for the FINEVERSE AR Hospitality Training Platform.

## Quick Start

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Project Structure

```
src/
├── main.jsx                    # Entry point + router
├── index.css                   # Global CSS variables & base styles
├── data/
│   └── store.js                # In-memory mock data (scenes, missions, students)
├── hooks/
│   └── useAppContext.jsx        # Global state (useReducer) — AppContext
├── components/
│   ├── ui.jsx / ui.css         # Shared atomic components (Button, Card, Badge, Modal…)
│   └── layout/
│       ├── AppShell.jsx        # Main layout wrapper (sidebar + topbar + <Outlet />)
│       ├── Sidebar.jsx         # Sticky sidebar navigation
│       └── Topbar.jsx          # Header bar with title + search
└── pages/
    ├── Dashboard.jsx           # Stats, bar chart, activity feed, top students
    ├── Missions.jsx            # Full CRUD — list, add, edit, delete missions
    ├── Students.jsx            # Student list with search, add, delete
    └── OtherPages.jsx          # Scenes · Scores · AI Coach · Settings
```

## State Management

Global state via `useReducer` in `AppProvider`.
Supported actions:
- `ADD_MISSION` / `UPDATE_MISSION` / `DELETE_MISSION`
- `ADD_STUDENT` / `DELETE_STUDENT`
- `NOTIFY` / `CLEAR_NOTIFY`

> All data is in-memory. Phase 3 will connect Firebase Auth + Firestore.

## Phase Roadmap

| Phase | Status | Focus |
|-------|--------|-------|
| 1 — Admin Dashboard | ✅ Done | This codebase |
| 2 — Student UI + AI Coach | Next | Web Speech API, TTS |
| 3 — AR + Firebase | Planned | AR.js, Firestore, Auth |
