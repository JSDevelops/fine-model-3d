// src/components/layout/Navbar.jsx
import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useProgress } from '../../hooks/useProgress'
import { MISSIONS } from '../../data/missions'
import AuthModal from '../auth/AuthModal'
import './Navbar.css'

export default function Navbar() {
  const { state, user, logout } = useProgress()
  const navigate = useNavigate()
  const [authOpen, setAuthOpen] = useState(false)

  const completed = state.completedMissions.length
  const total = MISSIONS.length
  const overallPct = total ? Math.round((completed / total) * 100) : 0

  function getInitials(name) {
    if (!name) return 'ST'
    const parts = name.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return parts[0].substring(0, 2).toUpperCase()
  }

  const initials = user ? getInitials(user.displayName || user.email) : ''

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo" onClick={() => navigate('/')} role="button" tabIndex={0}>
          <img src="/logo.png" alt="FINE Logo" className="nav-logo-img" />
          <div>
            <div className="nav-logo-name">FINE Model 3D AR+AI</div>
            <div className="nav-logo-sub">Hospitality Training</div>
          </div>
        </div>

        <div className="navbar-links">
          <NavLink to="/"          end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
          <NavLink to="/curriculum"    className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Curriculum</NavLink>
          <NavLink to="/ar"            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>AR Mode</NavLink>
          <NavLink to="/progress"      className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>My progress</NavLink>
          <NavLink to="/leaderboard"   className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Leaderboard</NavLink>
          <a href={import.meta.env.VITE_ADMIN_URL || "http://127.0.0.1:5173"} target="_blank" rel="noopener noreferrer" className="nav-link">
            <i className="fa-solid fa-user-shield" style={{ marginRight: 4 }} /> Admin
          </a>
        </div>

        <div className="navbar-right">
          <div className="nav-progress">
            <div className="nav-prog-label">{completed}/{total} missions</div>
            <div className="nav-prog-bar">
              <div className="nav-prog-fill" style={{ width: `${overallPct}%` }} />
            </div>
            <div className="nav-prog-pct">{overallPct}%</div>
          </div>
          
          {user ? (
            <div className="nav-profile">
              <div 
                className={`avatar avatar-${user.isGuest ? 'gray' : 'teal'} avatar-sm`} 
                title={user.displayName || user.email}
              >
                {initials}
              </div>
              <button className="nav-logout-btn" onClick={logout} title="Sign Out">
                <i className="fa-solid fa-right-from-bracket" aria-hidden="true" />
              </button>
            </div>
          ) : (
            <button className="btn btn-secondary btn-sm" onClick={() => setAuthOpen(true)}>
              Sign In
            </button>
          )}
        </div>
      </nav>

      {/* Mobile Bottom Navigation Tab Bar */}
      <div className="mobile-bottom-nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'mbtn-tab active' : 'mbtn-tab'}>
          <i className="fa-solid fa-house" aria-hidden="true" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/curriculum" className={({ isActive }) => isActive ? 'mbtn-tab active' : 'mbtn-tab'}>
          <i className="fa-solid fa-book-open" aria-hidden="true" />
          <span>Lessons</span>
        </NavLink>
        <NavLink to="/ar" className={({ isActive }) => isActive ? 'mbtn-tab active' : 'mbtn-tab'}>
          <i className="fa-solid fa-camera" aria-hidden="true" />
          <span>AR Mode</span>
        </NavLink>
        <NavLink to="/progress" className={({ isActive }) => isActive ? 'mbtn-tab active' : 'mbtn-tab'}>
          <i className="fa-solid fa-chart-line" aria-hidden="true" />
          <span>Progress</span>
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => isActive ? 'mbtn-tab active' : 'mbtn-tab'}>
          <i className="fa-solid fa-trophy" aria-hidden="true" />
          <span>Rank</span>
        </NavLink>
      </div>

      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </>
  )
}

