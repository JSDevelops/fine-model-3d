// src/pages/Dashboard.jsx
import { useApp } from '../hooks/useAppContext'
import { ACTIVITY } from '../data/store'
import { StatCard, Card } from '../components/ui'
import './Dashboard.css'

const WEEK_DATA = [
  { day: 'Mon', v: 22 }, { day: 'Tue', v: 32 }, { day: 'Wed', v: 15 },
  { day: 'Thu', v: 38 }, { day: 'Fri', v: 28 }, { day: 'Sat', v: 8 }, { day: 'Sun', v: 4 },
]
const MAX = Math.max(...WEEK_DATA.map(d => d.v))

const ACTIVITY_COLORS = { success: 'teal', info: 'blue', danger: 'red', warning: 'amber' }

export default function Dashboard() {
  const { state } = useApp()
  const scenes = state.scenes || []

  const totalSessions = state.students.reduce((a, s) => a + s.sessions, 0)
  const avgScore = (state.students.reduce((a, s) => a + s.avgScore, 0) / state.students.length).toFixed(1)

  const topStudents = [...state.students]
    .sort((a, b) => b.avgScore - a.avgScore)
    .slice(0, 4)

  return (
    <div className="dashboard">
      <div className="stat-grid">
        <StatCard label="Total Students"   value={state.students.length} change="+12 this week" changeType="up"   icon="fa-users" />
        <StatCard label="Total Sessions"   value={totalSessions}          change="+8 vs yesterday" changeType="up" icon="fa-play" />
        <StatCard label="Avg. Score"       value={avgScore}               change="-2.1 this week"  changeType="down" icon="fa-star" />
        <StatCard label="Active Missions"  value={state.missions.filter(m => m.status === 'active').length} icon="fa-list-check" />
      </div>

      <div className="dash-grid">
        <Card className="chart-card">
          <div className="card-title">Weekly sessions
            <span className="card-action">View all</span>
          </div>
          <div className="bar-chart">
            {WEEK_DATA.map(d => (
              <div key={d.day} className="bar-col">
                <div className="bar-wrap">
                  <div className="bar-fill" style={{ height: `${(d.v / MAX) * 100}%` }} />
                </div>
                <div className="bar-label">{d.day}</div>
                <div className="bar-val">{d.v}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="card-title">Scene usage</div>
          <div className="donut-wrap">
            <svg width="88" height="88" viewBox="0 0 88 88" aria-hidden="true">
              <circle cx="44" cy="44" r="32" fill="none" stroke="var(--gray-100)" strokeWidth="16" />
              <circle cx="44" cy="44" r="32" fill="none" stroke="var(--teal-400)" strokeWidth="16"
                strokeDasharray="120 81" strokeDashoffset="25" transform="rotate(-90 44 44)" />
              <circle cx="44" cy="44" r="32" fill="none" stroke="var(--blue-400)" strokeWidth="16"
                strokeDasharray="81 120" strokeDashoffset="-95" transform="rotate(-90 44 44)" />
            </svg>
          </div>
          <div className="scene-legend">
            {scenes.map((sc, i) => (
              <div key={sc.id} className="legend-row">
                <div className="legend-dot" style={{ background: i % 2 === 0 ? 'var(--teal-400)' : 'var(--blue-400)' }} />
                <div className="legend-label">{sc.name}</div>
                <div className="legend-val">{i === 0 ? '60%' : i === 1 ? '40%' : '0%'}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="dash-grid">
        <Card>
          <div className="card-title">Recent activity <span className="card-action">See all</span></div>
          <div className="activity-list">
            {ACTIVITY.map(a => (
              <div key={a.id} className="activity-row">
                <div className={`activity-dot dot-${ACTIVITY_COLORS[a.type]}`} />
                <div className="activity-text">{a.text}</div>
                <div className="activity-time">{a.time}</div>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="card-title">Top students this week</div>
          <table className="top-table">
            <thead>
              <tr><th>#</th><th>Name</th><th>Sessions</th><th>Avg</th></tr>
            </thead>
            <tbody>
              {topStudents.map((s, i) => (
                <tr key={s.id}>
                  <td className={`rank rank-${i + 1}`}>{i + 1}</td>
                  <td>
                    <div className="name-cell">
                      <div className={`avatar avatar-${s.color} avatar-sm`}>{s.initials}</div>
                      {s.name.split(' ')[0] + ' ' + s.name.split(' ')[1]?.[0] + '.'}
                    </div>
                  </td>
                  <td>{s.sessions}</td>
                  <td className={s.avgScore >= 80 ? 'score-hi' : ''}>{s.avgScore.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
