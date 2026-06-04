// src/pages/Landing.jsx
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { SCENES, MISSIONS } from '../data/missions'
import './Landing.css'

const DIFF_LABEL = { easy: 'Easy', medium: 'Medium', hard: 'Hard' }
const DIFF_BADGE  = { easy: 'badge-teal', medium: 'badge-amber', hard: 'badge-red' }

function MissionRow({ mission, score, completed, inProgress, onStart }) {
  const scene = SCENES.find(s => s.id === mission.sceneId)
  const barPct = score || 0
  const barColor = barPct >= 70 ? 'var(--teal-400)' : barPct >= 50 ? 'var(--amber-400)' : 'var(--red-400)'

  return (
    <div className={`mission-row ${inProgress ? 'in-progress' : ''}`} onClick={onStart} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onStart()}>
      <div className="mission-row-icon" style={{ background: scene?.bg }}>
        <i className={`fa-solid ${mission.icon}`} style={{ color: scene?.iconColor }} aria-hidden="true" />
      </div>
      <div className="mission-row-info">
        <div className="mission-row-name">
          {mission.name}
          {inProgress && <span className="in-prog-pill">In progress</span>}
        </div>
        <div className="mission-row-meta">
          {scene?.name} · {mission.steps.length} steps · <span className={`badge ${DIFF_BADGE[mission.difficulty]}`}>{DIFF_LABEL[mission.difficulty]}</span>
        </div>
      </div>
      <div className="mission-row-right">
        {completed ? (
          <>
            <div className="mission-score-bar">
              <div className="msb-track">
                <div className="msb-fill" style={{ width: `${barPct}%`, background: barColor }} />
              </div>
              <span className="msb-val" style={{ color: barColor }}>{barPct}</span>
            </div>
            <i className="fa-solid fa-circle-check" style={{ color: 'var(--teal-400)', fontSize: 16 }} aria-hidden="true" />
          </>
        ) : inProgress ? (
          <i className="fa-solid fa-circle-play" style={{ color: 'var(--teal-400)', fontSize: 16 }} aria-hidden="true" />
        ) : (
          <i className="fa-solid fa-chevron-right" style={{ color: 'var(--text-3)', fontSize: 14 }} aria-hidden="true" />
        )}
      </div>
    </div>
  )
}

export default function Landing() {
  const { state, dispatch } = useProgress()
  const navigate = useNavigate()

  // Find in-progress mission (started but not completed)
  const resumeMission = state.currentMission
    ? MISSIONS.find(m => m.id === state.currentMission)
    : null
  const resumeScene = resumeMission ? SCENES.find(s => s.id === resumeMission.sceneId) : null

  function startMission(mission) {
    dispatch({ type: 'SET_MISSION', payload: mission.id })
    navigate(`/simulation/${mission.id}`)
  }

  function resumeCurrent() {
    if (resumeMission) navigate(`/simulation/${resumeMission.id}`)
  }

  const completedCount = state.completedMissions.length
  const avgScore = completedCount
    ? Math.round(Object.values(state.scores).reduce((a, b) => a + b, 0) / completedCount)
    : 0

  return (
    <div className="landing">
      {/* ── Hero ── */}
      <div className="hero">
        <div className="hero-inner">
          <div className="hero-tag">
            <i className="fa-solid fa-cube" aria-hidden="true" /> AR + 3D Hospitality Training
          </div>
          <h1 className="hero-h1">Train smarter.<br />Speak with confidence.</h1>
          <p className="hero-sub">
            Practice real-world hospitality dialogues inside immersive 3D environments
            — with instant AI pronunciation feedback.
          </p>
          <div className="hero-btns">
            <button className="btn btn-primary btn-lg" onClick={() => {
              const first = MISSIONS.find(m => !state.completedMissions.includes(m.id)) ?? MISSIONS[0]
              startMission(first)
            }}>
              <i className="fa-solid fa-play" aria-hidden="true" /> Start training
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/ar')}>
              <i className="fa-solid fa-camera" style={{ marginRight: 6 }} aria-hidden="true" /> Open AR Mode
            </button>
            <button className="btn btn-secondary btn-lg" onClick={() => navigate('/progress')}>
              View my progress
            </button>
          </div>
          <div className="hero-stats">
            <div className="hstat"><div className="hstat-v">248</div><div className="hstat-l">Active students</div></div>
            <div className="hstat"><div className="hstat-v">{MISSIONS.length}</div><div className="hstat-l">Mission scenarios</div></div>
            <div className="hstat"><div className="hstat-v">{SCENES.length}</div><div className="hstat-l">3D environments</div></div>
            <div className="hstat"><div className="hstat-v">76</div><div className="hstat-l">Avg. score</div></div>
          </div>
        </div>
      </div>

      <div className="landing-content">
        {/* ── Resume banner ── */}
        {resumeMission && (
          <div className="resume-banner">
            <div className="resume-icon">
              <i className="fa-solid fa-flame" aria-hidden="true" />
            </div>
            <div className="resume-info">
              <div className="resume-title">Continue where you left off</div>
              <div className="resume-sub">
                {resumeMission.name} · {resumeScene?.name} · Step {state.currentStep + 1} of {resumeMission.steps.length}
              </div>
              <div className="resume-bar-wrap">
                <div className="resume-bar" style={{ width: `${Math.round(((state.currentStep) / resumeMission.steps.length) * 100)}%` }} />
              </div>
            </div>
            <button className="btn btn-primary" onClick={resumeCurrent}>
              <i className="fa-solid fa-arrow-right" aria-hidden="true" /> Resume
            </button>
          </div>
        )}

        {/* ── Scene cards ── */}
        <section>
          <h2 className="section-title">Choose a training environment</h2>
          <div className="scene-grid">
            {SCENES.map(scene => {
              const sceneMissions = MISSIONS.filter(m => m.sceneId === scene.id)
              const sceneDone = sceneMissions.filter(m => state.completedMissions.includes(m.id)).length
              return (
                <div key={scene.id} className="scene-card card">
                  <div className="scene-cover" style={{ background: scene.bg }}>
                    <i className={`fa-solid ${scene.icon}`} style={{ fontSize: 40, color: scene.iconColor }} aria-hidden="true" />
                    <span className="scene-cover-sub" style={{ color: scene.iconColor }}>{scene.subtitle}</span>
                  </div>
                  <div className="scene-card-body">
                    <div className="scene-card-name">{scene.name}</div>
                    <p className="scene-card-desc">{scene.description}</p>
                    <div className="scene-card-footer">
                      <span className={`badge badge-${scene.color}`}>{sceneMissions.length} missions</span>
                      <span className="scene-done">{sceneDone}/{sceneMissions.length} completed</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* ── My missions ── */}
        <section>
          <div className="section-header">
            <h2 className="section-title" style={{ margin: 0 }}>My missions</h2>
            <button className="btn btn-ghost btn-sm" onClick={() => navigate('/progress')}>See all</button>
          </div>
          <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
            {MISSIONS.map(m => (
              <MissionRow
                key={m.id}
                mission={m}
                score={state.scores[m.id]}
                completed={state.completedMissions.includes(m.id)}
                inProgress={state.currentMission === m.id}
                onStart={() => startMission(m)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
