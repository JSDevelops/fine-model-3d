// src/components/ui.jsx — shared atomic components

import './ui.css'

export function Badge({ variant = 'teal', children }) {
  return <span className={`badge badge-${variant}`}>{children}</span>
}

export function Button({ variant = 'primary', size = 'md', icon, children, onClick, type = 'button', disabled }) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <i className={`fa-solid ${icon}`} aria-hidden="true" />}
      {children}
    </button>
  )
}

export function Card({ children, className = '', style }) {
  return <div className={`card ${className}`} style={style}>{children}</div>
}

export function StatCard({ label, value, change, changeType = 'up', icon }) {
  return (
    <div className="stat-card">
      <div className="stat-label">
        {icon && <i className={`fa-solid ${icon}`} aria-hidden="true" />}
        {label}
      </div>
      <div className="stat-value">{value}</div>
      {change && (
        <div className={`stat-change stat-${changeType}`}>
          <i className={`fa-solid fa-arrow-trend-${changeType}`} aria-hidden="true" />
          {change}
        </div>
      )}
    </div>
  )
}

export function Avatar({ initials, color = 'teal', size = 'md' }) {
  return <div className={`avatar avatar-${color} avatar-${size}`}>{initials}</div>
}

export function Modal({ title, onClose, children, footer }) {
  return (
    <div className="modal-backdrop" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box" role="dialog" aria-modal="true">
        <div className="modal-header">
          <span className="modal-title">{title}</span>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            <i className="fa-solid fa-xmark" />
          </button>
        </div>
        <div className="modal-body">{children}</div>
        {footer && <div className="modal-footer">{footer}</div>}
      </div>
    </div>
  )
}

export function FormGroup({ label, required, hint, children }) {
  return (
    <div className="form-group">
      {label && (
        <label className="form-label">
          {label}{required && <span className="required-mark">*</span>}
        </label>
      )}
      {children}
      {hint && <div className="form-hint">{hint}</div>}
    </div>
  )
}

export function Input({ ...props }) {
  return <input className="form-input" {...props} />
}

export function Select({ children, ...props }) {
  return <select className="form-input" {...props}>{children}</select>
}

export function Textarea({ ...props }) {
  return <textarea className="form-textarea" {...props} />
}

export function Notification({ message, type, onClose }) {
  if (!message) return null
  return (
    <div className={`notification notification-${type}`}>
      <i className={`fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'}`} aria-hidden="true" />
      {message}
      <button className="notif-close" onClick={onClose} aria-label="Dismiss">
        <i className="fa-solid fa-xmark" />
      </button>
    </div>
  )
}

export function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="empty-state">
      <i className={`fa-solid ${icon}`} aria-hidden="true" />
      <div className="empty-title">{title}</div>
      {subtitle && <div className="empty-sub">{subtitle}</div>}
      {action}
    </div>
  )
}
