// src/pages/Simulation.jsx
import { useState, Suspense, lazy } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import CoachPanel from '../components/simulation/CoachPanel'
import './Simulation.css'

// Lazy-load 3D scene to avoid blocking initial render
const Scene3D = lazy(() => import('../components/simulation/Scene3D'))

function StepDots({ total, current, scores }) {
  return (
    <div className="step-dots" aria-label={`Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }).map((_, i) => {
        const done   = scores[i] !== undefined
        const active = i === current && !done
        return (
          <div
            key={i}
            className={`dot ${done ? 'done' : ''} ${active ? 'active' : ''}`}
            style={active ? { width: 18 } : {}}
          />
        )
      })}
    </div>
  )
}

function MissionComplete({ mission, scores, onRestart, onHome }) {
  const totalScore = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0
  const passed = totalScore >= mission.passingScore
  const color = passed ? 'var(--teal-400)' : 'var(--red-400)'

  return (
    <div className="mission-complete">
      <div className="mc-card">
        <div className="mc-icon" style={{ background: passed ? 'var(--teal-50)' : 'var(--red-50)' }}>
          <i className={`fa-solid ${passed ? 'fa-trophy' : 'fa-rotate-right'}`}
            style={{ color, fontSize: 32 }} aria-hidden="true" />
        </div>
        <h2 className="mc-title">{passed ? 'Mission complete!' : 'Keep practising!'}</h2>
        <p className="mc-sub">
          {passed
            ? `You passed "${mission.name}" with a score of ${totalScore}/100.`
            : `Your score was ${totalScore}/100. The passing score is ${mission.passingScore}. Give it another try!`}
        </p>

        <div className="mc-score-ring">
          <svg width="100" height="100" viewBox="0 0 100 100" aria-label={`Final score: ${totalScore}`}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="var(--gray-200)" strokeWidth="10" />
            <circle cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="10"
              strokeDasharray={`${Math.round((totalScore / 100) * 251)} 251`}
              strokeDashoffset="63" transform="rotate(-90 50 50)" />
            <text x="50" y="55" textAnchor="middle" fontSize="22" fontWeight="600"
              fill={color} fontFamily="IBM Plex Sans, sans-serif">{totalScore}</text>
          </svg>
        </div>

        <div className="mc-step-scores">
          {scores.map((s, i) => (
            <div key={i} className="mc-step-row">
              <span className="mc-step-label">Step {i + 1}</span>
              <div className="mc-step-bar">
                <div style={{ width: `${s}%`, height: '100%', background: s >= 70 ? 'var(--teal-400)' : s >= 50 ? 'var(--amber-400)' : 'var(--red-400)', borderRadius: 3 }} />
              </div>
              <span className="mc-step-val">{s}</span>
            </div>
          ))}
        </div>

        <div className="mc-actions">
          {!passed && (
            <button className="btn btn-secondary" onClick={onRestart}>
              <i className="fa-solid fa-rotate-right" aria-hidden="true" /> Try again
            </button>
          )}
          <button className="btn btn-primary" onClick={onHome}>
            <i className="fa-solid fa-house" aria-hidden="true" /> Back to home
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Simulation() {
  const { missionId } = useParams()
  const { state, dispatch, missions = [], scenes = [] } = useProgress()
  const navigate = useNavigate()

  const mission = missions.find(m => m.id === missionId)
  const scene   = mission ? scenes.find(s => s.id === mission.sceneId) : null

  const [stepIndex, setStepIndex]   = useState(state.currentStep ?? 0)
  const [stepScores, setStepScores] = useState([])
  const [phase, setPhase]           = useState('sim') // 'sim' | 'complete'
  const [hotspotLit, setHotspotLit] = useState(false)

  if (!mission) {
    return (
      <div className="sim-error">
        <p>Mission not found.</p>
        <button className="btn btn-primary" onClick={() => navigate('/')}>Go home</button>
      </div>
    )
  }

  const step = mission.steps[stepIndex]
  const completedSteps = stepScores.length

  function handleCorrect(score) {
    setStepScores(prev => [...prev, score])
  }

  function handleNext() {
    const nextIdx = stepIndex + 1
    if (nextIdx < mission.steps.length) {
      setStepIndex(nextIdx)
      dispatch({ type: 'NEXT_STEP' })
    } else {
      // Mission finished
      const avg = Math.round(stepScores.reduce((a, b) => a + b, 0) / stepScores.length)
      dispatch({ type: 'COMPLETE_MISSION', payload: { missionId: mission.id, score: avg } })
      setPhase('complete')
    }
  }

  function handleRestart() {
    setStepIndex(0)
    setStepScores([])
    setPhase('sim')
    dispatch({ type: 'RESET_MISSION' })
  }

  function handleExit() {
    dispatch({ type: 'EXIT_MISSION' })
    navigate('/')
  }

  if (phase === 'complete') {
    return (
      <div className="sim-shell">
        <MissionComplete
          mission={mission}
          scores={stepScores}
          onRestart={handleRestart}
          onHome={() => navigate('/')}
        />
      </div>
    )
  }

  return (
    <div className="sim-shell">
      {/* ── Top bar ── */}
      <div className="sim-topbar">
        <button className="btn btn-ghost btn-sm" onClick={handleExit}>
          <i className="fa-solid fa-arrow-left" aria-hidden="true" /> Back
        </button>
        <div className="sim-topbar-center">
          <span className="sim-mission-name">{mission.name}</span>
          <span className="sim-scene-name">
            <i className={`fa-solid ${scene?.icon}`} aria-hidden="true" /> {scene?.name}
          </span>
        </div>
        <div className="sim-step-pill">
          Step {stepIndex + 1} of {mission.steps.length}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="sim-body">
        {/* 3D Viewport */}
        <div className="sim-viewport">
          <Suspense fallback={
            <div className="scene-loading">
              <i className="fa-solid fa-cube fa-spin" style={{ fontSize: 32, color: 'var(--teal-400)' }} aria-hidden="true" />
              <span>Loading 3D scene…</span>
            </div>
          }>
            <Scene3D sceneId={mission.sceneId} scenes={scenes} onHotspotClick={() => setHotspotLit(true)} />
          </Suspense>

          {/* Overlay controls */}
          <div className="viewport-controls">
            <button className="vp-ctrl-btn" title="Orbit view">
              <i className="fa-solid fa-rotate" aria-hidden="true" /> Orbit
            </button>
            <button className="vp-ctrl-btn" title="Reset camera">
              <i className="fa-solid fa-crosshairs" aria-hidden="true" /> Reset
            </button>
          </div>

          {/* Hotspot hint */}
          {!hotspotLit && (
            <div className="hotspot-hint">
              <i className="fa-solid fa-circle-dot" aria-hidden="true" /> Click the glowing dot to interact
            </div>
          )}
        </div>

        {/* Coach Panel */}
        <div className="sim-panel">
          <CoachPanel
            step={step}
            stepIndex={stepIndex}
            totalSteps={mission.steps.length}
            onCorrect={handleCorrect}
            onNext={handleNext}
          />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="sim-footer">
        <div className="sim-footer-left">
          <i className="fa-solid fa-list-check" style={{ color: 'var(--teal-400)' }} aria-hidden="true" />
          <span>{completedSteps}/{mission.steps.length} done</span>
        </div>
        <StepDots total={mission.steps.length} current={stepIndex} scores={stepScores.reduce((acc, s, i) => { acc[i] = s; return acc }, {})} />
        <div className="sim-footer-right">
          <span style={{ fontSize: 11, color: 'var(--text-3)' }}>Pass: {mission.passingScore}+</span>
        </div>
      </div>
    </div>
  )
}
