// src/components/auth/AuthModal.jsx
import { useState } from 'react'
import { auth, db, isFirebaseEnabled } from '../../config/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import './AuthModal.css'

export default function AuthModal({ isOpen, onClose, onAuthSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  if (!isOpen) return null

  // Helper to extract initials
  function getInitials(fullName) {
    if (!fullName) return 'ST'
    const parts = fullName.trim().split(/\s+/)
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
    }
    return parts[0].substring(0, 2).toUpperCase()
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    if (!isFirebaseEnabled) {
      // Mock Auth for local fallback mode
      setTimeout(() => {
        setLoading(false)
        const mockUser = {
          uid: 'local_guest_' + Date.now(),
          displayName: isSignUp ? name : (email.split('@')[0] || 'Local Guest'),
          email: email || 'guest@fineverse.local',
        }
        localStorage.setItem('fineverse_local_user', JSON.stringify(mockUser))
        if (onAuthSuccess) onAuthSuccess(mockUser)
        onClose()
      }, 800)
      return
    }

    try {
      if (isSignUp) {
        // Sign Up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Update display name
        await updateProfile(user, { displayName: name })

        // Create student profile in Firestore
        const initials = getInitials(name)
        const colors = ['teal', 'blue', 'amber', 'gray', 'purple']
        const randomColor = colors[Math.floor(Math.random() * colors.length)]

        await setDoc(doc(db, 'students', user.uid), {
          id: user.uid,
          name: name,
          email: email,
          initials: initials,
          color: randomColor,
          sessions: 0,
          avgScore: 0,
          completedMissions: [],
          scores: {},
          lastActive: 'Today',
          status: 'active'
        })

        if (onAuthSuccess) onAuthSuccess(user)
      } else {
        // Sign In
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        if (onAuthSuccess) onAuthSuccess(userCredential.user)
      }
      onClose()
    } catch (err) {
      console.error(err)
      let msg = 'Authentication failed. Please check your credentials.'
      if (err.code === 'auth/email-already-in-use') msg = 'This email is already registered.'
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/wrong-password') msg = 'Invalid email or password.'
      if (err.code === 'auth/weak-password') msg = 'Password should be at least 6 characters.'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  function handleGuestMode() {
    const guestUser = {
      uid: 'guest_' + Math.random().toString(36).substr(2, 9),
      displayName: 'Guest Student',
      email: 'guest@fineverse.local',
      isGuest: true
    }
    localStorage.setItem('fineverse_local_user', JSON.stringify(guestUser))
    if (onAuthSuccess) onAuthSuccess(guestUser)
    onClose()
  }

  return (
    <div className="auth-overlay" onClick={onClose}>
      <div className="auth-container" onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose} 
          style={{ position: 'absolute', top: 16, right: 16, border: 'none', background: 'none', cursor: 'pointer', fontSize: 18, color: 'var(--text-3)' }}
          aria-label="Close modal"
        >
          <i className="fa-solid fa-xmark" aria-hidden="true" />
        </button>

        <div className="auth-header">
          <div className="auth-logo-wrap" style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
            <img src="/logo.png" alt="FINE Logo" style={{ height: 48, objectFit: 'contain' }} />
          </div>
          <h2 className="auth-title">
            {isSignUp ? 'Create your account' : 'Welcome to FINE Model 3D AR+AI'}
          </h2>
          <p className="auth-subtitle">
            {isFirebaseEnabled 
              ? (isSignUp ? 'Sign up to track and sync your progress' : 'Sign in to access your dashboard')
              : 'Local Fallback Mode — credentials stored in browser'
            }
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && (
            <div className="auth-error">
              <i className="fa-solid fa-circle-exclamation" aria-hidden="true" />
              <span>{error}</span>
            </div>
          )}

          {isSignUp && (
            <div className="auth-input-group">
              <label className="auth-label">Full Name</label>
              <input
                type="text"
                className="auth-input"
                required
                placeholder="Nattaya Kanjana"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>
          )}

          <div className="auth-input-group">
            <label className="auth-label">Email Address</label>
            <input
              type="email"
              className="auth-input"
              required
              placeholder="student@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="auth-input-group">
            <label className="auth-label">Password</label>
            <input
              type="password"
              className="auth-input"
              required
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? (
              <i className="fa-solid fa-circle-notch fa-spin" aria-hidden="true" />
            ) : (
              <i className={`fa-solid ${isSignUp ? 'fa-user-plus' : 'fa-right-to-bracket'}`} aria-hidden="true" />
            )}
            {isSignUp ? 'Sign Up' : 'Sign In'}
          </button>
        </form>

        <div className="auth-toggle">
          {isSignUp ? 'Already have an account? ' : 'New to FINE Model 3D AR+AI? '}
          <button className="auth-toggle-link" onClick={() => { setIsSignUp(!isSignUp); setError(null) }}>
            {isSignUp ? 'Sign In' : 'Create Account'}
          </button>
        </div>

        <div className="auth-divider">or</div>

        <button className="auth-guest-btn" onClick={handleGuestMode}>
          <i className="fa-solid fa-user-clock" style={{ marginRight: 8 }} aria-hidden="true" />
          Continue as Guest
        </button>
      </div>
    </div>
  )
}
