// src/pages/Students.jsx
import { useState } from 'react'
import { useApp } from '../hooks/useAppContext'
import { Badge, Button, Card, Modal, FormGroup, Input, Select, EmptyState } from '../components/ui'
import './Students.css'

const STATUS_BADGE = { active: 'teal', 'needs-help': 'red', inactive: 'gray' }
const STATUS_LABEL = { active: 'Active', 'needs-help': 'Needs help', inactive: 'Inactive' }

export default function Students() {
  const { state, dispatch } = useApp()
  const [search, setSearch] = useState('')
  const [addOpen, setAddOpen] = useState(false)
  const [deleteTarget, setDeleteTarget] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', initials: '', color: 'teal' })
  const [errors, setErrors] = useState({})
  const [reportTarget, setReportTarget] = useState(null)
  const [certPreviewOpen, setCertPreviewOpen] = useState(false)

  const students = state.students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )

  function handleAdd() {
    const errs = {}
    if (!form.name.trim()) errs.name = 'Name is required'
    if (!form.email.trim()) errs.email = 'Email is required'
    if (Object.keys(errs).length) { setErrors(errs); return }
    const initials = form.name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
    dispatch({ type: 'ADD_STUDENT', payload: { ...form, initials, sessions: 0, avgScore: 0, lastActive: 'Just now', status: 'active' } })
    dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Student "${form.name}" added.` } })
    setAddOpen(false)
    setForm({ name: '', email: '', initials: '', color: 'teal' })
    setErrors({})
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_STUDENT', payload: deleteTarget.id })
    dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Student "${deleteTarget.name}" removed.` } })
    setDeleteTarget(null)
  }

  const avgOverall = state.students.length
    ? (state.students.reduce((a, s) => a + s.avgScore, 0) / state.students.length).toFixed(1)
    : 0
  const needsHelp = state.students.filter(s => s.status === 'needs-help').length

  return (
    <div className="students-page">
      <div className="students-summary">
        <div className="summary-stat"><div className="ss-val">{state.students.length}</div><div className="ss-lab">Total students</div></div>
        <div className="summary-stat"><div className="ss-val">{avgOverall}</div><div className="ss-lab">Avg. score</div></div>
        <div className="summary-stat"><div className="ss-val" style={{ color: needsHelp > 0 ? 'var(--red-600)' : undefined }}>{needsHelp}</div><div className="ss-lab">Needs help</div></div>
      </div>

      <div className="page-toolbar">
        <input
          className="form-input search-input"
          type="search"
          placeholder="Search students..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          style={{ width: 220 }}
          aria-label="Search students"
        />
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="secondary" icon="fa-download">Export</Button>
          <Button icon="fa-user-plus" onClick={() => setAddOpen(true)}>Add student</Button>
        </div>
      </div>

      <Card style={{ padding: 0 }}>
        {students.length === 0 ? (
          <EmptyState icon="fa-users" title="No students found"
            subtitle={search ? 'Try a different search.' : 'Add your first student.'}
            action={!search && <Button icon="fa-user-plus" onClick={() => setAddOpen(true)}>Add student</Button>}
          />
        ) : (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th><th>Email</th><th>Sessions</th>
                <th>Avg score</th><th>Last active</th><th>Status</th><th></th>
              </tr>
            </thead>
            <tbody>
              {students.map(s => {
                const barColor = s.avgScore >= 70 ? 'var(--teal-400)' : s.avgScore >= 50 ? 'var(--amber-400)' : 'var(--red-400)'
                return (
                  <tr key={s.id}>
                    <td>
                      <div className="name-cell">
                        <div className={`avatar avatar-${s.color} avatar-md`}>{s.initials}</div>
                        <span>{s.name}</span>
                      </div>
                    </td>
                    <td className="muted">{s.email}</td>
                    <td className="center-cell">{s.sessions}</td>
                    <td>
                      <div className="score-cell">
                        <div className="mini-bar-wrap" style={{ width: 70 }}>
                          <div className="mini-bar-fill" style={{ width: `${s.avgScore}%`, background: barColor }} />
                        </div>
                        <span style={{ fontWeight: 500, color: s.avgScore >= 70 ? 'var(--teal-600)' : s.avgScore < 50 ? 'var(--red-600)' : undefined }}>
                          {s.avgScore > 0 ? s.avgScore.toFixed(1) : '—'}
                        </span>
                      </div>
                    </td>
                    <td className="muted">{s.lastActive}</td>
                    <td><Badge variant={STATUS_BADGE[s.status]}>{STATUS_LABEL[s.status]}</Badge></td>
                    <td>
                      <div className="row-actions">
                        <button 
                          className="icon-btn" 
                          title="View report"
                          onClick={() => { setReportTarget(s); setCertPreviewOpen(false); }}
                        >
                          <i className="fa-solid fa-chart-bar" aria-hidden="true" />
                        </button>
                        <button className="icon-btn" title="Edit"><i className="fa-solid fa-pen" aria-hidden="true" /></button>
                        <button className="icon-btn danger" title="Delete" onClick={() => setDeleteTarget(s)}>
                          <i className="fa-solid fa-trash" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </Card>

      {addOpen && (
        <Modal title="Add new student" onClose={() => setAddOpen(false)}
          footer={<>
            <Button variant="secondary" onClick={() => setAddOpen(false)}>Cancel</Button>
            <Button icon="fa-user-plus" onClick={handleAdd}>Add student</Button>
          </>}>
          <FormGroup label="Full name" required>
            <Input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Nattaya Kanjana" />
            {errors.name && <div className="form-error">{errors.name}</div>}
          </FormGroup>
          <FormGroup label="Email" required>
            <Input type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="student@email.com" />
            {errors.email && <div className="form-error">{errors.email}</div>}
          </FormGroup>
          <FormGroup label="Avatar color">
            <Select value={form.color} onChange={e => setForm(p => ({ ...p, color: e.target.value }))}>
              <option value="teal">Teal</option>
              <option value="blue">Blue</option>
              <option value="amber">Amber</option>
              <option value="red">Red</option>
              <option value="gray">Gray</option>
            </Select>
          </FormGroup>
        </Modal>
      )}

      {deleteTarget && (
        <Modal title="Remove student" onClose={() => setDeleteTarget(null)}
          footer={<>
            <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
            <Button variant="danger" icon="fa-trash" onClick={handleDelete}>Remove</Button>
          </>}>
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)' }}>
            Remove <strong>{deleteTarget.name}</strong> and all their session data? This cannot be undone.
          </p>
        </Modal>
      )}

      {reportTarget && (() => {
        // Fallback calculations for mock students
        const completedMissions = reportTarget.completedMissions || (
          reportTarget.avgScore > 0 
            ? state.missions.slice(0, Math.min(state.missions.length, Math.ceil(reportTarget.sessions / 4) || 2)).map(m => m.id)
            : []
        )
        const scores = reportTarget.scores || (
          completedMissions.reduce((acc, mId) => {
            acc[mId] = Math.round(reportTarget.avgScore + (Math.random() * 8 - 4))
            return acc
          }, {})
        )

        return (
          <Modal 
            title="Student Progress Report" 
            onClose={() => { setReportTarget(null); setCertPreviewOpen(false); }}
            footer={
              <>
                {reportTarget.avgScore >= 60 && (
                  <Button 
                    variant="secondary" 
                    icon="fa-award" 
                    onClick={() => setCertPreviewOpen(!certPreviewOpen)}
                    style={{ marginRight: 'auto' }}
                  >
                    {certPreviewOpen ? 'View Performance' : 'Preview Certificate'}
                  </Button>
                )}
                <Button variant="primary" onClick={() => { setReportTarget(null); setCertPreviewOpen(false); }}>Close</Button>
              </>
            }
          >
            {certPreviewOpen ? (
              <div className="admin-certificate-preview" style={{ padding: '8px 0' }}>
                <div className="certificate-frame" style={{ border: '8px double var(--teal-600)', padding: '24px 20px', textAlign: 'center', background: '#fffdf9' }}>
                  <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--teal-600)', letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 8 }}>
                    FINE Model 3D AR+AI Academy of Hospitality
                  </div>
                  <h2 style={{ fontSize: 18, fontFamily: 'Outfit, sans-serif', color: 'var(--text-1)', marginBottom: 2, fontStyle: 'italic', fontWeight: 'normal' }}>
                    Certificate of Completion
                  </h2>
                  <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 14 }}>
                    Hospitality Dialogue & Speech Training
                  </div>
                  <div style={{ fontSize: 10, color: 'var(--text-2)', marginBottom: 6 }}>
                    This is proudly presented to
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: 'var(--teal-700)', borderBottom: '2px solid var(--teal-500)', display: 'inline-block', paddingBottom: 2, paddingLeft: 12, paddingRight: 12, marginBottom: 14 }}>
                    {reportTarget.name}
                  </div>
                  <p style={{ fontSize: 10.5, color: 'var(--text-2)', maxWidth: 320, margin: '0 auto 16px', lineHeight: 1.5 }}>
                    for successfully completing all interactive 3D simulated scenarios and oral speech drills in hospitality English with distinction.
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', fontSize: 9, color: 'var(--text-3)', borderTop: '1px dashed var(--border-md)', paddingTop: 10 }}>
                    <div style={{ textAlign: 'left' }}>
                      <strong>Avg Score:</strong> {reportTarget.avgScore.toFixed(1)}/100<br />
                      <strong>Completed:</strong> {completedMissions.length} Scenarios
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <strong>Date:</strong> {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}<br />
                      <strong>ID:</strong> FV-{(100000 + Math.floor(Math.random() * 900000))}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="student-report">
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14, borderBottom: '1px solid var(--border)', paddingBottom: 12 }}>
                  <div className={`avatar avatar-${reportTarget.color} avatar-lg`}>{reportTarget.initials}</div>
                  <div>
                    <h3 style={{ margin: 0, fontSize: 14, fontWeight: 600 }}>{reportTarget.name}</h3>
                    <div style={{ fontSize: 11, color: 'var(--text-2)', marginTop: 2 }}>{reportTarget.email}</div>
                  </div>
                  <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                    <Badge variant={STATUS_BADGE[reportTarget.status]}>{STATUS_LABEL[reportTarget.status]}</Badge>
                    <div style={{ fontSize: 9, color: 'var(--text-3)', marginTop: 4 }}>Last Active: {reportTarget.lastActive}</div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
                  <div style={{ padding: 10, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-md)' }}>
                    <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Total Sessions</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--text-1)' }}>{reportTarget.sessions}</div>
                  </div>
                  <div style={{ padding: 10, background: 'var(--gray-50)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-md)' }}>
                    <div style={{ fontSize: 9, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 2 }}>Average Score</div>
                    <div style={{ fontSize: 18, fontWeight: 600, color: reportTarget.avgScore >= 70 ? 'var(--teal-600)' : 'var(--amber-600)' }}>
                      {reportTarget.avgScore > 0 ? `${reportTarget.avgScore.toFixed(1)}/100` : '—'}
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-3)', textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 8 }}>
                  Mission Progress ({completedMissions.length}/{state.missions.length})
                </div>
                <div style={{ maxHeight: 160, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {state.missions.map(m => {
                    const isDone = completedMissions.includes(m.id);
                    const scoreVal = scores[m.id] || 0;
                    const barColor = scoreVal >= 70 ? 'var(--teal-400)' : scoreVal >= 50 ? 'var(--amber-400)' : 'var(--red-400)';
                    return (
                      <div key={m.id} style={{ display: 'flex', alignItems: 'center', justifycontent: 'space-between', padding: '6px 8px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                          <i className={`fa-solid ${m.icon}`} style={{ color: 'var(--text-3)', fontSize: 10 }} />
                          <span style={{ fontSize: 11.5, fontWeight: 500, color: 'var(--text-1)' }}>{m.name}</span>
                        </div>
                        {isDone ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                            <span style={{ fontSize: 10.5, fontWeight: 600, color: scoreVal >= 70 ? 'var(--teal-600)' : 'var(--amber-600)' }}>
                              {scoreVal}
                            </span>
                            <i className="fa-solid fa-circle-check" style={{ color: 'var(--teal-400)', fontSize: 11 }} />
                          </div>
                        ) : (
                          <span style={{ fontSize: 10, color: 'var(--text-3)' }}>Not started</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </Modal>
        );
      })()}
    </div>
  )
}
