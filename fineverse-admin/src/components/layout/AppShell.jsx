// src/components/layout/AppShell.jsx
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'
import { useApp } from '../../hooks/useAppContext'
import { Notification } from '../ui'
import './AppShell.css'

export default function AppShell() {
  const { state, dispatch } = useApp()
  return (
    <div className="app-shell">
      <Sidebar />
      <div className="main-area">
        <Topbar />
        <main className="page-content">
          <Outlet />
        </main>
      </div>
      {state.notification && (
        <Notification
          {...state.notification}
          onClose={() => dispatch({ type: 'CLEAR_NOTIFY' })}
        />
      )}
    </div>
  )
}
