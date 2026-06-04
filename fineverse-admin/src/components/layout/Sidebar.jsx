// src/components/layout/Sidebar.jsx
import { NavLink } from 'react-router-dom'
import './Sidebar.css'

const NAV = [
  { section: 'Overview', items: [
    { to: '/',         icon: 'fa-gauge',       label: 'Dashboard' },
  ]},
  { section: 'Training', items: [
    { to: '/scenes',   icon: 'fa-cube',        label: '3D Scenes',  badge: '2' },
    { to: '/missions', icon: 'fa-list-check',  label: 'Missions' },
    { to: '/curriculum', icon: 'fa-book-open',  label: 'Curriculum' },
    { to: '/vocabulary', icon: 'fa-spell-check', label: 'Vocabulary' },
    { to: '/ai',       icon: 'fa-microphone',  label: 'AI Coach' },
  ]},
  { section: 'Users', items: [
    { to: '/students', icon: 'fa-users',       label: 'Students' },
    { to: '/scores',   icon: 'fa-chart-bar',   label: 'Scores & Reports' },
  ]},
  { section: 'System', items: [
    { to: import.meta.env.VITE_STUDENT_URL || 'http://127.0.0.1:5174', icon: 'fa-graduation-cap', label: 'Student View', external: true },
    { to: '/settings', icon: 'fa-gear',        label: 'Settings' },
  ]},
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <img src="/logo.png" alt="FINE Logo" className="logo-img" />
        <div>
          <div className="logo-name">FINE Model 3D AR+AI</div>
          <div className="logo-sub">Admin Panel</div>
        </div>
      </div>

      <nav className="sidebar-nav">
        {NAV.map(group => (
          <div key={group.section} className="nav-group">
            <div className="nav-section-label">{group.section}</div>
            {group.items.map(item => {
              if (item.external) {
                return (
                  <a
                    key={item.to}
                    href={item.to}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nav-item"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                    <span>{item.label}</span>
                    <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: 9, marginLeft: 'auto', opacity: 0.5 }} />
                  </a>
                )
              }
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                >
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                  <span>{item.label}</span>
                  {item.badge && <span className="nav-badge">{item.badge}</span>}
                </NavLink>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="avatar avatar-teal avatar-sm">AD</div>
        <div className="footer-info">
          <div className="footer-name">Admin User</div>
          <div className="footer-role">Super Admin</div>
        </div>
        <button className="icon-btn" title="Sign out">
          <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true" />
        </button>
      </div>
    </aside>
  )
}
