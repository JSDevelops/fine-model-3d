// src/pages/Scenes.jsx
import { SCENES } from '../data/store'
import { Badge, Card } from '../components/ui'
import { useApp } from '../hooks/useAppContext'
import { isFirebaseEnabled } from '../config/firebase'

export function Scenes() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {SCENES.map(sc => (
          <Card key={sc.id} style={{ padding: 0, overflow: 'hidden' }}>
            <div style={{
              height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: sc.color === 'teal' ? 'var(--teal-50)' : 'var(--blue-50)',
              flexDirection: 'column', gap: 6
            }}>
              <i className={`fa-solid ${sc.icon}`}
                style={{ fontSize: 36, color: sc.color === 'teal' ? 'var(--teal-600)' : 'var(--blue-600)' }}
                aria-hidden="true" />
              <span style={{ fontSize: 11, fontWeight: 500, color: sc.color === 'teal' ? 'var(--teal-600)' : 'var(--blue-600)' }}>
                {sc.subtitle}
              </span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{sc.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>3D procedural · {sc.subtitle}</div>
                </div>
                <Badge variant="teal">Active</Badge>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 10, lineHeight: 1.5 }}>
                Objects: {sc.objects?.length || 0}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                  {sc.missionCount} missions · {sc.sessionCount} sessions
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="icon-btn"><i className="fa-solid fa-pen" aria-hidden="true" /></button>
                  <button className="icon-btn"><i className="fa-solid fa-eye" aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Planned scenes — Phase 3 roadmap</div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[['fa-spa','Spa & Wellness'],['fa-building','Hotel Lobby'],['fa-plane','Airline Cabin']].map(([icon, name]) => (
            <div key={name} style={{
              padding: '10px 14px', border: '1px dashed var(--border-md)', borderRadius: 'var(--radius-md)',
              display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--text-2)'
            }}>
              <i className={`fa-solid ${icon}`} aria-hidden="true" />
              {name}
              <Badge variant="amber">Phase 3</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

// ── Scores ──────────────────────────────────────────────
export function Scores() {
  const BARS = [
    { label: 'Welcoming Guests', pct: 88 },
    { label: 'Taking Orders', pct: 74 },
    { label: 'VIP Check-in', pct: 52 },
    { label: 'Beverage Rec.', pct: 61 },
    { label: 'Lounge Briefing', pct: 33 },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 12 }}>
        {[
          { label: 'Total sessions', value: '1,247' },
          { label: 'Pass rate (≥60)', value: '72%' },
          { label: 'Avg attempts / mission', value: '2.4' },
          { label: 'Certificates issued', value: '—', note: 'Phase 3' },
        ].map(s => (
          <div key={s.label} className="stat-card">
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            {s.note && <div className="stat-change stat-neutral">{s.note}</div>}
          </div>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Mission completion rates</div>
          {BARS.map(b => {
            const color = b.pct >= 70 ? 'var(--teal-400)' : b.pct >= 50 ? 'var(--amber-400)' : 'var(--red-400)'
            return (
              <div key={b.label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10, fontSize: 12 }}>
                <span style={{ width: 130, color: 'var(--text-2)', flexShrink: 0 }}>{b.label}</span>
                <div style={{ flex: 1, height: 8, background: 'var(--gray-100)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ width: `${b.pct}%`, height: '100%', background: color, borderRadius: 4 }} />
                </div>
                <span style={{ fontWeight: 500, minWidth: 32, textAlign: 'right' }}>{b.pct}%</span>
              </div>
            )
          })}
        </Card>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Score distribution</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 4, height: 100 }}>
            {[{l:'0–30',h:8},{l:'31–50',h:15},{l:'51–60',h:30},{l:'61–75',h:80},{l:'76–90',h:100},{l:'91–100',h:65}].map(b => (
              <div key={b.l} style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', gap:4, height:'100%' }}>
                <div style={{ flex:1, width:'100%', display:'flex', alignItems:'flex-end' }}>
                  <div style={{ width:'100%', height:`${b.h}%`, background:'var(--teal-200)', borderRadius:'3px 3px 0 0', minHeight:4 }} />
                </div>
                <span style={{ fontSize:9, color:'var(--text-3)', textAlign:'center' }}>{b.l}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

// ── AI Coach ────────────────────────────────────────────
export function AICoach() {
  const AI_STATUS = [
    { name: 'Speech-to-Text (STT)', status: 'Active',   badge: 'teal', phase: 'Phase 2', note: 'Web Speech API STT' },
    { name: 'Text-to-Speech (TTS)', status: 'Active',   badge: 'teal', phase: 'Phase 2', note: 'speechSynthesis TTS' },
    { name: 'AR Camera Overlay',    status: 'Active',   badge: 'teal', phase: 'Phase 3', note: 'Three.js procedural models + Webcam' },
    { name: 'QR Code Simulator',    status: 'Active',   badge: 'teal', phase: 'Phase 3', note: 'Web Audio API scan effect' },
    { name: 'Score evaluation',     status: 'Active',   badge: 'teal', phase: 'Phase 2', note: 'Keyword matching + overlap checks' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>AI Speech Coach settings</div>
          {[
            { label: 'Engine', type: 'select', opts: ['Web Speech API (browser) — Active'] },
            { label: 'Passing score threshold', type: 'number', val: 60 },
            { label: 'Feedback language', type: 'select', opts: ['Thai + English', 'English only'] },
          ].map(f => (
            <div key={f.label} className="form-group">
              <label className="form-label">{f.label}</label>
              {f.type === 'select'
                ? <select className="form-input">{f.opts.map(o => <option key={o}>{o}</option>)}</select>
                : <input className="form-input" type="number" defaultValue={f.val} />
              }
            </div>
          ))}
          <button className="btn btn-primary btn-sm">Save settings</button>
        </Card>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Text-to-Speech (NPC voice)</div>
          {[
            { label: 'Engine', type: 'select', opts: ['Web Speech Synthesis (built-in)'] },
            { label: 'Voice / accent', type: 'select', opts: ['en-US Female','en-GB Female','en-US Male'] },
          ].map(f => (
            <div key={f.label} className="form-group">
              <label className="form-label">{f.label}</label>
              <select className="form-input">{f.opts.map(o => <option key={o}>{o}</option>)}</select>
            </div>
          ))}
          <div className="form-group">
            <label className="form-label">Speech rate</label>
            <input className="form-input" type="range" min="0.5" max="2" step="0.1" defaultValue="0.9" />
          </div>
          <button className="btn btn-secondary btn-sm" style={{ width: '100%' }}>
            <i className="fa-solid fa-play" aria-hidden="true" /> Preview voice
          </button>
        </Card>
      </div>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>AI system status</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
          <thead>
            <tr>{['Component','Status','Phase','Notes'].map(h =>
              <th key={h} style={{ textAlign:'left', padding:'8px 10px', fontSize:11, color:'var(--text-3)', borderBottom:'1px solid var(--border)', background:'var(--gray-50)' }}>{h}</th>
            )}</tr>
          </thead>
          <tbody>
            {AI_STATUS.map(r => (
              <tr key={r.name}>
                <td style={{ padding:'9px 10px', borderBottom:'1px solid var(--border)' }}>{r.name}</td>
                <td style={{ padding:'9px 10px', borderBottom:'1px solid var(--border)' }}><Badge variant={r.badge}>{r.status}</Badge></td>
                <td style={{ padding:'9px 10px', borderBottom:'1px solid var(--border)', color:'var(--text-2)' }}>{r.phase}</td>
                <td style={{ padding:'9px 10px', borderBottom:'1px solid var(--border)', color:'var(--text-3)', fontSize:11 }}>{r.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  )
}

// ── Settings ─────────────────────────────────────────────
export function Settings() {
  const { dispatch } = useApp()
  const PHASES = [
    { label: 'Phase 1', badge: 'teal', title: 'Code refactor', desc: 'Separate LandingPage, Dashboard, Simulation · Dynamic JSON missions · Remove dead code' },
    { label: 'Phase 2', badge: 'teal', title: 'AI Audio', desc: 'Web Speech API STT · speechSynthesis TTS · Real score comparison vs script' },
    { label: 'Phase 3', badge: 'teal', title: 'AR + Cloud', desc: 'AR.js camera · QR scan · Firebase Auth + Firestore · Student portfolio & certificates' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Platform settings</div>
          {[
            { label: 'Platform name', val: 'FINE Model 3D AR+AI', type: 'text' },
            { label: 'Default language', type: 'select', opts: ['English','Thai'] },
            { label: 'Session timeout (min)', val: 30, type: 'number' },
          ].map(f => (
            <div key={f.label} className="form-group">
              <label className="form-label">{f.label}</label>
              {f.type === 'select'
                ? <select className="form-input">{f.opts.map(o=><option key={o}>{o}</option>)}</select>
                : <input className="form-input" type={f.type} defaultValue={f.val} />
              }
            </div>
          ))}
          <div style={{ display:'flex', gap:8 }}>
            <button className="btn btn-primary btn-sm" onClick={() => {
              dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Settings saved.' } })
            }}>Save</button>
            <button className="btn btn-secondary btn-sm" onClick={() => {
              if (window.confirm('Are you sure you want to reset all data to default mock records? This will erase custom missions and settings.')) {
                dispatch({ type: 'RESET_DATA' })
              }
            }}>Reset database</button>
          </div>
        </Card>
        <Card>
          <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 14 }}>Firebase / Backend</div>
          <div className="form-group">
            <label className="form-label">Auth provider</label>
            <select className="form-input" value={isFirebaseEnabled ? 'firebase' : 'local'} readOnly>
              <option value="local">None (local only)</option>
              <option value="firebase">Firebase Auth (Active)</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Database</label>
            <select className="form-input" value={isFirebaseEnabled ? 'firestore' : 'local'} readOnly>
              <option value="local">In-memory (resets on refresh)</option>
              <option value="firestore">Firebase Firestore (Active)</option>
            </select>
          </div>
          {isFirebaseEnabled ? (
            <div style={{ padding:'10px 12px', background:'var(--teal-50)', borderRadius:'var(--radius-md)', fontSize:11, color:'var(--teal-600)', lineHeight:1.6 }}>
              <i className="fa-solid fa-circle-check" aria-hidden="true" /> Connected to Firebase Cloud Firestore. All data is synchronized in real-time.
            </div>
          ) : (
            <div style={{ padding:'10px 12px', background:'var(--blue-50)', borderRadius:'var(--radius-md)', fontSize:11, color:'var(--blue-600)', lineHeight:1.6 }}>
              <i className="fa-solid fa-circle-info" aria-hidden="true" /> Running in Local Fallback mode. Add VITE_FIREBASE_* variables to `.env` to enable real-time sync.
            </div>
          )}
        </Card>
      </div>
      <Card>
        <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 12 }}>Development roadmap</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }}>
          {PHASES.map(p => (
            <div key={p.label} style={{ padding: '12px 14px', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
              <div style={{ display:'flex', alignItems:'center', gap:6, marginBottom:8 }}>
                <Badge variant={p.badge}>{p.label}</Badge>
                <span style={{ fontWeight:500, fontSize:12 }}>{p.title}</span>
              </div>
              <p style={{ fontSize:11, color:'var(--text-2)', lineHeight:1.6 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}

