// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import { AppProvider } from './hooks/useAppContext'
import AppShell from './components/layout/AppShell'
import Dashboard from './pages/Dashboard'
import Missions from './pages/Missions'
import Students from './pages/Students'
import { Scenes, Scores, AICoach, Settings } from './pages/OtherPages'
import Curriculum from './pages/Curriculum'
import Vocabulary from './pages/Vocabulary'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppShell />}>
            <Route path="/"           element={<Dashboard />} />
            <Route path="/scenes"     element={<Scenes />} />
            <Route path="/missions"   element={<Missions />} />
            <Route path="/curriculum" element={<Curriculum />} />
            <Route path="/vocabulary" element={<Vocabulary />} />
            <Route path="/ai"         element={<AICoach />} />
            <Route path="/students"   element={<Students />} />
            <Route path="/scores"     element={<Scores />} />
            <Route path="/settings"   element={<Settings />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AppProvider>
  </StrictMode>
)
