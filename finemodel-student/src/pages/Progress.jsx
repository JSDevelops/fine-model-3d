// src/pages/Progress.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { db, isFirebaseEnabled } from '../config/firebase'
import { collection, query, orderBy, limit, onSnapshot, doc, getDoc } from 'firebase/firestore'
import './Progress.css'

const DIFF_BADGE = { easy: 'badge-teal', medium: 'badge-amber', hard: 'badge-red' }

function CertificateModal({ isOpen, onClose, userName, avgScore, completedCount }) {
  if (!isOpen) return null

  function handlePrint() {
    window.print()
  }

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <div className="cert-modal-overlay" onClick={onClose}>
      <div className="cert-modal-content" onClick={e => e.stopPropagation()}>
        <div className="certificate-frame">
          <div className="cert-header">FINE Model 3D AR+AI Academy of Hospitality</div>
          <h1 className="cert-title">Certificate of Completion</h1>
          <div className="cert-subtitle">Hospitality Dialogue & speech Training</div>
          <p className="cert-text">This is proudly presented to</p>
          <div className="cert-name">{userName || 'Hospitality Student'}</div>
          <p className="cert-text">
            for successfully completing all interactive 3D simulated scenarios and oral speech drills in hospitality English with distinction.
          </p>
          <div className="cert-seal">
            <span>FINE MODEL</span>
            <span style={{ fontSize: 6, marginTop: 2 }}>GOLD SEAL</span>
          </div>
          <div className="cert-meta-grid">
            <div style={{ textAlign: 'left' }}>
              <strong>Average Score:</strong> {avgScore}/100<br />
              <strong>Completed:</strong> {completedCount} Mission Scenarios
            </div>
            <div style={{ textAlign: 'right' }}>
              <strong>Date Issued:</strong> {currentDate}<br />
              <strong>Certificate ID:</strong> FV-{(100000 + Math.floor(Math.random() * 900000))}
            </div>
          </div>
        </div>
        <div className="cert-actions">
          <button className="btn btn-secondary" onClick={onClose}>Close</button>
          <button className="btn btn-primary" onClick={handlePrint}>
            <i className="fa-solid fa-print" style={{ marginRight: 6 }} aria-hidden="true" /> Print / Save PDF
          </button>
        </div>
      </div>
    </div>
  )
}

export function Progress() {
  const { state, user, missions = [], scenes = [] } = useProgress()
  const navigate  = useNavigate()
  const [certOpen, setCertOpen] = useState(false)

  const completed = state.completedMissions.length
  const total     = missions.length
  const pct       = total ? Math.round((completed / total) * 100) : 0
  const avgScore  = completed
    ? Math.round(Object.values(state.scores).reduce((a, b) => a + b, 0) / completed)
    : 0

  const allPassed = completed === total && avgScore >= 60

  return (
    <div className="progress-page">
      {allPassed && (
        <div className="certificate-trigger-card">
          <div className="cert-trigger-info">
            <h3><i className="fa-solid fa-medal" style={{ marginRight: 8, color: '#fbbf24' }} aria-hidden="true" />Congratulations!</h3>
            <p>You have successfully completed the FINE Model 3D AR+AI Hospitality Training. Your digital certificate is ready.</p>
          </div>
          <button className="btn btn-primary" onClick={() => setCertOpen(true)} style={{ background: '#fbbf24', color: '#1e293b', border: 'none' }}>
            <i className="fa-solid fa-award" style={{ marginRight: 6 }} aria-hidden="true" /> View Certificate
          </button>
        </div>
      )}

      <div className="prog-summary">
        <div className="prog-card">
          <div className="prog-ring">
            <svg width="90" height="90" viewBox="0 0 90 90" aria-label={`${pct}% complete`}>
              <circle cx="45" cy="45" r="36" fill="none" stroke="var(--gray-200)" strokeWidth="10" />
              <circle cx="45" cy="45" r="36" fill="none" stroke="var(--teal-400)" strokeWidth="10"
                strokeDasharray={`${Math.round((pct / 100) * 226)} 226`} strokeDashoffset="56.5"
                transform="rotate(-90 45 45)" />
              <text x="45" y="50" textAnchor="middle" fontSize="18" fontWeight="500"
                fill="var(--teal-600)" fontFamily="IBM Plex Sans, sans-serif">{pct}%</text>
            </svg>
          </div>
          <div>
            <div className="prog-big">{completed} / {total}</div>
            <div className="prog-lab">Missions completed</div>
          </div>
        </div>
        <div className="prog-stat-grid">
          <div className="prog-stat">
            <div className="ps-val">{avgScore || '—'}</div>
            <div className="ps-lab">Avg. score</div>
          </div>
          <div className="prog-stat">
            <div className="ps-val">{completed}</div>
            <div className="ps-lab">Passed</div>
          </div>
          <div className="prog-stat">
            <div className="ps-val" style={{ color: 'var(--amber-400)' }}>{total - completed}</div>
            <div className="ps-lab">Remaining</div>
          </div>
        </div>
      </div>

      {scenes.map(scene => {
        const sceneMissions = missions.filter(m => m.sceneId === scene.id)
        const sceneBg = scene.bg || (scene.color === 'blue' ? '#E6F1FB' : '#E1F5EE')
        const sceneIconColor = scene.iconColor || (scene.color === 'blue' ? '#185FA5' : '#0F6E56')
        return (
          <div key={scene.id} className="scene-section">
            <div className="scene-section-header">
              <div className="ss-icon" style={{ background: sceneBg }}>
                <i className={`fa-solid ${scene.icon}`} style={{ color: sceneIconColor }} aria-hidden="true" />
              </div>
              <div>
                <div className="ss-name">{scene.name}</div>
                <div className="ss-sub">{sceneMissions.filter(m => state.completedMissions.includes(m.id)).length}/{sceneMissions.length} missions done</div>
              </div>
            </div>
            <div className="mission-progress-list">
              {sceneMissions.map(m => {
                const done  = state.completedMissions.includes(m.id)
                const score = state.scores[m.id]
                const barColor = score >= 70 ? 'var(--teal-400)' : score >= 50 ? 'var(--amber-400)' : 'var(--red-400)'
                return (
                  <div key={m.id} className="mp-row">
                    <div className="mp-icon" style={{ background: sceneBg }}>
                      <i className={`fa-solid ${m.icon}`} style={{ color: sceneIconColor }} aria-hidden="true" />
                    </div>
                    <div className="mp-info">
                      <div className="mp-name">{m.name}</div>
                      <div className="mp-meta">
                        <span className={`badge ${DIFF_BADGE[m.difficulty]}`}>{m.difficulty}</span>
                        · {m.steps.length} steps · Pass: {m.passingScore}+
                      </div>
                    </div>
                    {done && score !== undefined ? (
                      <div className="mp-score-wrap">
                        <div className="mp-bar"><div className="mp-fill" style={{ width: `${score}%`, background: barColor }} /></div>
                        <span className="mp-score" style={{ color: barColor }}>{score}</span>
                      </div>
                    ) : (
                      <span className="mp-not-done">{m.id === state.currentMission ? 'In progress' : 'Not started'}</span>
                    )}
                    <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/simulation/${m.id}`)}>
                      {done ? 'Retry' : 'Start'}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        )
      })}

      <CertificateModal 
        isOpen={certOpen} 
        onClose={() => setCertOpen(false)} 
        userName={user?.displayName || (user?.email ? user.email.split('@')[0] : 'Guest Student')} 
        avgScore={avgScore} 
        completedCount={completed} 
      />
    </div>
  )
}

// ── Leaderboard ──────────────────────────────────────────
const FAKE_BOARD = [
  { rank: 1, name: 'Nattaya K.',   initials: 'NK', color: 'teal',  score: 91, sessions: 24, badge: 'fa-trophy' },
  { rank: 2, name: 'Somchai C.',   initials: 'SC', color: 'blue',  score: 87, sessions: 18, badge: 'fa-medal'  },
  { rank: 3, name: 'Pimchanok A.', initials: 'PA', color: 'amber', score: 83, sessions: 20, badge: 'fa-award'  },
  { rank: 4, name: 'Wanchai T.',   initials: 'WT', color: 'gray',  score: 78, sessions: 7,  badge: null        },
  { rank: 5, name: 'You',          initials: 'ME', color: 'teal',  score: 0,  sessions: 0,  badge: null, isMe: true },
]

export function Leaderboard() {
  const { state, user } = useProgress()
  const [board, setBoard] = useState([])
  const [loading, setLoading] = useState(false)

  const completed = state.completedMissions.length

  useEffect(() => {
    if (!isFirebaseEnabled) {
      const myAvg = completed ? Math.round(Object.values(state.scores).reduce((a, b) => a + b, 0) / completed) : 0
      const mySessions = completed
      const localBoard = FAKE_BOARD.map(p => {
        if (p.isMe) {
          const dispName = user ? (user.displayName || user.email.split('@')[0]) : 'You'
          const initials = user ? (user.displayName?.split(' ').filter(Boolean).map(n=>n[0]).join('').toUpperCase() || 'ME') : 'ME'
          return { ...p, score: myAvg, sessions: mySessions, name: dispName, initials }
        }
        return p
      }).sort((a,b) => b.score - a.score)
      
      localBoard.forEach((p, idx) => p.rank = idx + 1)
      setBoard(localBoard)
      return
    }

    setLoading(true)
    // Real-time listener — auto-updates when any student score changes
    const q = query(collection(db, 'students'), orderBy('avgScore', 'desc'), limit(10))
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      let list = []
      let idx = 1
      snapshot.forEach(docSnap => {
        const data = docSnap.data()
        list.push({
          rank: idx++,
          name: data.name || 'Anonymous',
          initials: data.initials || 'ST',
          color: data.color || 'teal',
          score: Math.round(data.avgScore) || 0,
          sessions: data.sessions || 0,
          isMe: user && user.uid === (data.id || docSnap.id)
        })
      })

      // Append current user if not in top-10
      if (user && !user.isGuest && !list.some(p => p.isMe)) {
        try {
          const userDoc = await getDoc(doc(db, 'students', user.uid))
          if (userDoc.exists()) {
            const udata = userDoc.data()
            list.push({
              rank: '—',
              name: udata.name || 'You',
              initials: udata.initials || 'ME',
              color: udata.color || 'teal',
              score: Math.round(udata.avgScore) || 0,
              sessions: udata.sessions || 0,
              isMe: true
            })
          }
        } catch (err) {
          console.error('Error fetching current user doc:', err)
        }
      }

      setBoard(list)
      setLoading(false)
    }, (err) => {
      console.error('Leaderboard snapshot error:', err)
      setBoard(FAKE_BOARD)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [user, completed])

  const rankColors = { 1: '#B8860B', 2: '#9B9A97', 3: '#A0522D' }
  const getBadge = (rank) => {
    if (rank === 1) return 'fa-trophy'
    if (rank === 2) return 'fa-medal'
    if (rank === 3) return 'fa-award'
    return null
  }

  return (
    <div className="leaderboard-page">
      <div className="card lb-podium">
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '20px 0' }}>
            <i className="fa-solid fa-circle-notch fa-spin" style={{ fontSize: 24, color: 'var(--teal-400)' }} aria-hidden="true" />
          </div>
        ) : (
          <div className="podium">
            {board.slice(0, 3).map(p => (
              <div key={p.rank} className={`podium-slot rank-${p.rank}`}>
                <div className={`avatar avatar-${p.color} avatar-md`}>{p.initials}</div>
                <div className="podium-name">{p.name}</div>
                <div className="podium-score">{p.score}</div>
                <div className="podium-block" style={{ background: rankColors[p.rank] ?? 'var(--gray-200)' }}>
                  <i className={`fa-solid ${getBadge(p.rank)}`} style={{ color: '#fff', fontSize: 14 }} aria-hidden="true" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="card" style={{ padding: 0 }}>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '30px 0' }}>
            <span>Loading leaderboard data…</span>
          </div>
        ) : (
          <table className="lb-table">
            <thead>
              <tr><th>#</th><th>Student</th><th>Avg score</th><th>Sessions</th></tr>
            </thead>
            <tbody>
              {board.map(p => (
                <tr key={p.rank + '-' + p.name} className={p.isMe ? 'me-row' : ''}>
                  <td style={{ color: rankColors[p.rank] ?? 'var(--text-3)', fontWeight: 600 }}>{p.rank}</td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div className={`avatar avatar-${p.color} avatar-sm`}>{p.initials}</div>
                      {p.name}{p.isMe && <span className="badge badge-teal">You</span>}
                    </div>
                  </td>
                  <td style={{ fontWeight: 500, color: p.score >= 80 ? 'var(--teal-600)' : undefined }}>
                    {p.score || '—'}
                  </td>
                  <td style={{ color: 'var(--text-3)' }}>{p.sessions || '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

