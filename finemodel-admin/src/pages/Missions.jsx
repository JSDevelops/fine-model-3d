// src/pages/Missions.jsx
import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

function MissionModal({ mission, onClose, onSave, initialWeekId }) {
  const { state, dispatch } = useApp()
  const scenes = state.scenes || []
  const curriculum = state.curriculum || []
  const [form, setForm] = useState(mission ?? EMPTY_FORM)
  const [errors, setErrors] = useState({})

  const [aiLoading, setAiLoading] = useState(false)
  const [selectedWeek, setSelectedWeek] = useState(initialWeekId ?? '')

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  async function handleAIGenerate() {
    if (!selectedWeek) {
      dispatch({ type: 'NOTIFY', payload: { type: 'warning', message: 'Please select a Curriculum Week first.' } })
      return
    }
    const week = curriculum.find(w => w.id === selectedWeek)
    if (!week) return

    setAiLoading(true)
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY
      if (!apiKey) {
        throw new Error("Gemini API key is not configured in your VITE_GEMINI_API_KEY environment variable.")
      }

      const promptText = `You are an expert curriculum designer and hospitality English instructor. 
Create a simulated training mission for hotel or restaurant students based on this weekly syllabus:
- Week Topic: "${week.title}"
- Description: "${week.description}"
- Objectives: "${week.objectives ? week.objectives.join(', ') : ''}"

The difficulty level must be "${form.difficulty || 'easy'}".
Generate exactly ${form.steps || 3} dialogue steps.
Each step represents an interaction where a Guest/Customer says something in English, and the student must select or speak the correct response.
Make the incorrect choices sound realistic but grammatically or professionally incorrect (e.g. too casual, rude, or incorrect tableware/beverage selection).
Include target keywords the student needs to say.
Return JSON only.`

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptText }] }],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING", description: "Thai: A catchy name for the mission" },
                  description: { type: "STRING", description: "Thai: Brief description of the mission objectives" },
                  icon: { type: "STRING", description: "FontAwesome solid icon class (without 'fa-solid ' prefix, e.g. 'fa-door-open', 'fa-wine-glass', 'fa-clipboard-list', 'fa-mug-hot')" },
                  steps: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        id: { type: "INTEGER" },
                        npc: { type: "STRING", description: "English: What the customer/guest says" },
                        hint: { type: "STRING", description: "Thai: Helpful hint for the student" },
                        choices: {
                          type: "ARRAY",
                          items: {
                            type: "OBJECT",
                            properties: {
                              text: { type: "STRING", description: "English response choice" },
                              correct: { type: "BOOLEAN" }
                            },
                            required: ["text", "correct"]
                          }
                        },
                        keywords: {
                          type: "ARRAY",
                          items: { type: "STRING" },
                          description: "Lowercase english keywords that must be spoken by the student"
                        }
                      },
                      required: ["id", "npc", "hint", "choices", "keywords"]
                    }
                  }
                },
                required: ["name", "description", "icon", "steps"]
              }
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Failed to contact Gemini: ${response.statusText}`)
      }

      const data = await response.json()
      const textResult = data.candidates[0].content.parts[0].text
      const parsed = JSON.parse(textResult)

      setForm(p => ({
        ...p,
        name: parsed.name || p.name,
        description: parsed.description || p.description,
        icon: parsed.icon ? (parsed.icon.startsWith('fa-') ? parsed.icon : `fa-${parsed.icon}`) : p.icon,
        steps: parsed.steps || p.steps,
        sceneId: week.title.toLowerCase().includes('vip') || week.title.toLowerCase().includes('lounge') ? 'vip' : 'restaurant'
      }))

      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Mission and dialogue steps successfully generated by Gemini!' } })
    } catch (err) {
      console.error(err)
      dispatch({ type: 'NOTIFY', payload: { type: 'danger', message: `AI Generation failed: ${err.message}` } })
    } finally {
      setAiLoading(false)
    }
  }

  function handleSubmit() {
    const errs = validate(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave({ ...form, curriculumWeekId: selectedWeek })
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
        {!isEdit && (
          <div style={{ marginBottom: 20, padding: 14, background: 'rgba(29, 158, 117, 0.05)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
            <div className="form-section-title" style={{ color: 'var(--teal-600)', borderBottomColor: 'var(--teal-200)', marginBottom: 10 }}>
              <i className="fa-solid fa-wand-magic-sparkles" style={{ marginRight: 6 }} />
              Gemini AI Mission Creator
            </div>
            
            <div className="form-row" style={{ alignItems: 'flex-end', gap: 12 }}>
              <FormGroup label="Link to Lesson Plan Week">
                <Select value={selectedWeek} onChange={e => setSelectedWeek(e.target.value)}>
                  <option value="">— Select Lesson Week —</option>
                  {curriculum.map(w => (
                    <option key={w.id} value={w.id}>Week {w.week}: {w.title}</option>
                  ))}
                </Select>
              </FormGroup>
              
              <div style={{ paddingBottom: 16 }}>
                <Button 
                  variant="primary" 
                  icon={aiLoading ? "fa-circle-notch fa-spin" : "fa-wand-magic-sparkles"}
                  disabled={aiLoading || !selectedWeek}
                  onClick={handleAIGenerate}
                  style={{ width: '100%', whiteSpace: 'nowrap' }}
                >
                  {aiLoading ? "Generating..." : "Generate dialogues"}
                </Button>
              </div>
            </div>
            <div style={{ fontSize: 11, color: 'var(--text-3)' }}>
              Describe the lesson week and difficulty, then let Gemini draft the dialogue steps, keywords, and metadata.
            </div>
          </div>
        )}

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
          <Input type="number" min={1} max={20} value={Array.isArray(form.steps) ? form.steps.length : form.steps}
            onChange={e => set('steps', Number(e.target.value))} />
        </FormGroup>

        {Array.isArray(form.steps) && (
          <div className="ai-steps-preview">
            <div className="form-section-title" style={{ marginTop: 8, display: 'flex', alignItems: 'center', gap: 6, textTransform: 'none' }}>
              <i className="fa-solid fa-comments" style={{ color: 'var(--teal-600)' }} />
              AI Dialogue Steps Preview ({form.steps.length})
            </div>
            <div className="steps-scroll-container">
              {form.steps.map((st, idx) => (
                <div key={st.id || idx} className="preview-step-card">
                  <div className="step-badge">Step {idx + 1}</div>
                  <div className="preview-npc">
                    <strong>Guest:</strong> "{st.npc}"
                    {st.hint && <div className="preview-hint">💡 {st.hint}</div>}
                  </div>
                  <div className="preview-choices">
                    {st.choices.map((ch, cidx) => (
                      <div key={cidx} className={`preview-choice ${ch.correct ? 'correct' : 'incorrect'}`}>
                        <i className={`fa-solid ${ch.correct ? 'fa-circle-check' : 'fa-circle-xmark'}`} style={{ fontSize: 12 }} />
                        {ch.text}
                      </div>
                    ))}
                  </div>
                  <div className="preview-keywords">
                    <strong>Speech Keywords:</strong> {st.keywords.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  )
}

export default function Missions() {
  const { state, dispatch } = useApp()
  const location = useLocation()
  const [modal, setModal] = useState(null)   // null | 'add' | { mission }
  const [modalWeekId, setModalWeekId] = useState(null)
  const [filterScene, setFilterScene] = useState('')
  const [filterStatus, setFilterStatus] = useState('')
  const [deleteTarget, setDeleteTarget] = useState(null)

  const missions = state.missions.filter(m =>
    (!filterScene || m.sceneId === filterScene) &&
    (!filterStatus || m.status === filterStatus)
  )

  useEffect(() => {
    if (location.state?.preselectWeekId) {
      setModalWeekId(location.state.preselectWeekId)
      setModal('add')
      // Clear location state after opening modal
      window.history.replaceState({}, document.title)
    }
  }, [location.state])

  function handleSave(form) {
    let finalForm = { ...form }
    
    // Fallback if steps is not an array (manually added without AI)
    if (!Array.isArray(finalForm.steps)) {
      const stepsCount = Number(finalForm.steps) || 3
      finalForm.steps = Array.from({ length: stepsCount }).map((_, i) => ({
        id: i + 1,
        npc: `Welcome! How can I help you today? (Step ${i + 1})`,
        hint: "Respond politely.",
        choices: [
          { text: "Good evening, welcome! Right this way — I'll show you to your table.", correct: true },
          { text: "Over there.", correct: false }
        ],
        keywords: ["welcome"]
      }))
    }

    if (modal?.mission) {
      dispatch({ type: 'UPDATE_MISSION', payload: { ...modal.mission, ...finalForm } })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Mission "${finalForm.name}" updated.` } })
    } else {
      const newMissionId = 'm' + Date.now()
      dispatch({ type: 'ADD_MISSION', payload: { ...finalForm, id: newMissionId, completionRate: 0 } })
      
      // Auto-associate with the selected curriculum week if passed from UI
      if (finalForm.curriculumWeekId) {
        const week = state.curriculum.find(w => w.id === finalForm.curriculumWeekId)
        if (week) {
          const updatedIds = week.missionIds ? [...week.missionIds, newMissionId] : [newMissionId]
          dispatch({ type: 'UPDATE_WEEK', payload: { ...week, missionIds: updatedIds } })
        }
      }

      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Mission "${finalForm.name}" published!` } })
    }
    setModal(null)
    setModalWeekId(null)
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
          onClose={() => { setModal(null); setModalWeekId(null) }}
          onSave={handleSave}
          initialWeekId={modal === 'add' ? modalWeekId : (modal?.mission?.curriculumWeekId ?? null)}
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
