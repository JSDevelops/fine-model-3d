// src/main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import './index.css'
import { ProgressProvider } from './hooks/useProgress'
import Navbar from './components/layout/Navbar'
import Landing from './pages/Landing'
import Simulation from './pages/Simulation'
import { Progress, Leaderboard } from './pages/Progress'
import ARScanner from './pages/ARScanner'
import Curriculum from './pages/Curriculum'

function WithNav() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProgressProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<WithNav />}>
            <Route path="/"            element={<Landing />} />
            <Route path="/curriculum"  element={<Curriculum />} />
            <Route path="/progress"    element={<Progress />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Route>
          <Route path="/simulation/:missionId" element={<Simulation />} />
          <Route path="/ar"                    element={<ARScanner />} />
        </Routes>
      </BrowserRouter>
    </ProgressProvider>
  </StrictMode>
)

