// src/components/layout/Topbar.jsx
import { useLocation } from 'react-router-dom'
import './Topbar.css'

const PAGE_TITLES = {
  '/':         'Dashboard',
  '/scenes':   '3D Scenes',
  '/missions': 'Mission Management',
  '/ai':       'AI Coach Settings',
  '/students': 'Student Management',
  '/scores':   'Scores & Reports',
  '/settings': 'Settings',
}

export default function Topbar() {
  const { pathname } = useLocation()
  const title = PAGE_TITLES[pathname] ?? 'FINE Model 3D AR+AI Admin'

  return (
    <header className="topbar">
      <h1 className="topbar-title">{title}</h1>
      <div className="topbar-right">
        <div className="search-box">
          <i className="fa-solid fa-magnifying-glass" aria-hidden="true" />
          <input type="search" placeholder="Search..." aria-label="Search" />
        </div>
        <button className="icon-btn notif-btn" title="Notifications" aria-label="Notifications">
          <i className="fa-solid fa-bell" aria-hidden="true" />
          <span className="notif-dot" aria-hidden="true" />
        </button>
        <button className="icon-btn" title="Refresh" aria-label="Refresh page">
          <i className="fa-solid fa-rotate-right" aria-hidden="true" />
        </button>
      </div>
    </header>
  )
}
