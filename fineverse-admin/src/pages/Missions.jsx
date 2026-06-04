// src/pages/Missions.jsx
import { useState } from 'react'
import { useApp } from '../hooks/useAppContext'
import { Badge, Button, Card, Modal, FormGroup, Input, Select, Textarea, EmptyState } from '../components/ui'
import './Missions.css'

const DIFF_BADGE = { easy: 'teal', medium: 'amber', hard: 'red' }
const STATUS_BADGE = { active: 'teal', draft: 'amber', inactive: 'gray' }

const EMPTY_FORM = {
  name: '', description: '', sceneId: '', difficulty: '',
  status: 'active', passingScore: 60, steps: 3, icon: 'fa-clipboard-list',
}

function validate(f) {
  const errs = {}
  if (!f.name.trim()) errs.name = 'Mission name is required'
  if (!f.sceneId)     errs.sceneId = 'Please select a scene'
  if (!f.difficulty)  errs.difficulty = 'Please select a difficulty'
  return errs
}

function MissionModal({ mission, onClose, onSave }) {
  const { state } = useApp()
  const scenes = state.scenes || []
  const [form, setForm] = useState(mission ?? EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  function handleSubmit() {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  const isEdit = !!mission

  return (
    <Modal
      title={isEdit ? 'Edit mission' : 'Add new mission'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="fa-check" onClick={handleSubmit}>
            {isEdit ? 'Save changes' : 'Publish mission'}
          </Button>
        </>
      }
    >
      <div className="mission-form">
        <div className="form-section-title">Basic information</div>

        <FormGroup label="Mission name" required hint={errors.name}>
          <Input
            value={form.name}
            onChange={e => set('name', e.target.value)}
            placeholder="e.g. Taking Food Orders"
            style={errors.name ? { borderColor: 'var(--red-400)' } : {}}
          />
          {errors.name && <div className="form-error">{errors.name}</div>}
        </FormGroup>

        <FormGroup label="Description">
          <Textarea
            value={form.description}
            onChange={e => set('description', e.target.value)}
            placeholder="Briefly describe what students practise in this mission..."
          />
        </FormGroup>

        <div className="form-row">
          <FormGroup label="Scene" required>
            <Select value={form.sceneId} onChange={e => set('sceneId', e.target.value)}
              style={errors.sceneId ? { borderColor: 'var(--red-400)' } : {}}>
              <option value="">— Select scene —</option>
              {scenes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </Select>
            {errors.sceneId && <div className="form-error">{errors.sceneId}</div>}
          </FormGroup>

          <FormGroup label="Difficulty" required>
            <Select value={form.difficulty} onChange={e => set('difficulty', e.target.value)}
              style={errors.difficulty ? { borderColor: 'var(--red-400)' } : {}}>
              <option value="">— Select —</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
            {errors.difficulty && <div className="form-error">{errors.difficulty}</div>}
          </FormGroup>
        </div>

        <div className="form-section-title" style={{ marginTop: 8 }}>Settings</div>
        <div className="form-row">
          <FormGroup label="Status">
            <Select value={form.status} onChange={e => set('status', e.target.value)}>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="inactive">Inactive</option>
            </Select>
          </FormGroup>
          <FormGroup label="Passing score" hint="Minimum score to pass">
            <Input type="number" min={0} max={100} value={form.passingScore}
              onChange={e => set('passingScore', Number(e.target.value))} />
          </FormGroup>
        </div>

        <FormGroup label="Number of dialogue steps">
          <Input type="number" min={1} max={20} value={form.steps}
            onChange={e => set('steps', Number(e.target.value))} />
        </FormGroup>
      </div>
    </Modal>
  )
}

export default function Missions() {
  const { state, dispatch } = useApp()
  const [modal, setModal] = useState(null)   // null | 'add' | { mission }
  const [filterScene, setFilterScene] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const missions = state.missions.filter(m =>
    (!filterScene || m.sceneId === filterScene) &&
    (!filterStatus || m.status === filterStatus)
  )

  function handleSave(form) {
    if (modal?.mission) {
      dispatch({ type: 'UPDATE_MISSION', payload: { ...modal.mission, ...form } })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Mission "${form.name}" updated.` } })
    } else {
      dispatch({ type: 'ADD_MISSION', payload: { ...form, completionRate: 0 } })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Mission "${form.name}" published!` } })
    }
    setModal(null)
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_MISSION', payload: deleteTarget.id })
    dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Mission "${deleteTarget.name}" deleted.` } })
    setDeleteTarget(null)
  }

  const scenes = state.scenes || []

  return (
    <div className="missions-page">
      <div className="page-toolbar">
        <div className="filters">
          <Select value={filterScene} onChange={e => setFilterScene(e.target.value)} style={{ width: 160 }}>
            <option value="">All scenes</option>
            {scenes.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </Select>
          <Select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={{ width: 130 }}>
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="inactive">Inactive</option>
          </Select>
        </div>
        <Button icon="fa-plus" onClick={() => setModal('add')}>New mission</Button>
      </div>

      <Card style={{ padding: 0 }}>
        {missions.length === 0 ? (
          <EmptyState
            icon="fa-list-check"
            title="No missions found"
            subtitle="Try adjusting the filters or add a new mission."
            action={<Button icon="fa-plus" onClick={() => setModal('add')}>Add mission</Button>}
          />
        ) : (
          <table className="missions-table">
            <thead>
              <tr>
                <th>Mission</th>
                <th>Scene</th>
                <th>Difficulty</th>
                <th>Steps</th>
                <th>Completion</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {missions.map(m => {
                const scene = scenes.find(s => s.id === m.sceneId)
                const barColor = m.completionRate >= 70 ? 'var(--teal-400)' : m.completionRate >= 40 ? 'var(--amber-400)' : 'var(--red-400)'
                return (
                  <tr key={m.id}>
                    <td>
                      <div className="mission-name-cell">
                        <div className="mission-icon-sm">
                          <i className={`fa-solid ${m.icon}`} aria-hidden="true" />
                        </div>
                        <div>
                          <div className="mission-name">{m.name}</div>
                          {m.description && (
                            <div className="mission-desc">{m.description.slice(0, 50)}{m.description.length > 50 ? '…' : ''}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td><span className="scene-label">{scene?.name ?? '—'}</span></td>
                    <td><Badge variant={DIFF_BADGE[m.difficulty] ?? 'gray'}>{m.difficulty}</Badge></td>
                    <td className="center-cell">{m.steps}</td>
                    <td>
                      <div className="completion-cell">
                        <div className="mini-bar-wrap">
                          <div className="mini-bar-fill" style={{ width: `${m.completionRate}%`, background: barColor }} />
                        </div>
                        <span className="completion-pct">{m.completionRate}%</span>
                      </div>
                    </td>
                    <td><Badge variant={STATUS_BADGE[m.status] ?? 'gray'}>{m.status}</Badge></td>
                    <td>
                      <div className="row-actions">
                        <button className="icon-btn" title="Edit" onClick={() => setModal({ mission: m })}>
                          <i className="fa-solid fa-pen" aria-hidden="true" />
                        </button>
                        <button className="icon-btn" title="Duplicate">
                          <i className="fa-solid fa-copy" aria-hidden="true" />
                        </button>
                        <button className="icon-btn danger" title="Delete" onClick={() => setDeleteTarget(m)}>
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

      {(modal === 'add' || modal?.mission) && (
        <MissionModal
          mission={modal?.mission ?? null}
          onClose={() => setModal(null)}
          onSave={handleSave}
        />
      )}

      {deleteTarget && (
        <Modal
          title="Delete mission"
          onClose={() => setDeleteTarget(null)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button variant="danger" icon="fa-trash" onClick={handleDelete}>Delete</Button>
            </>
          }
        >
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)' }}>
            Are you sure you want to delete <strong>"{deleteTarget.name}"</strong>?
            This action cannot be undone.
          </p>
        </Modal>
      )}
    </div>
  )
}
