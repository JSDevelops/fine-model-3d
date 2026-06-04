// src/pages/Curriculum.jsx
import { useState } from 'react'
import { useApp } from '../hooks/useAppContext'
import { Card, Badge } from '../components/ui'
import './Curriculum.css'

export default function Curriculum() {
  const { state, dispatch } = useApp()
  const { curriculum = [], missions = [] } = state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ week: 1, title: '', description: '', objectives: '', missionIds: [], mediaUrl: '', mediaType: 'image' })

  const handleOpenEdit = (w) => {
    setFormData({
      id: w.id,
      week: w.week,
      title: w.title,
      description: w.description,
      objectives: w.objectives.join('\n'),
      missionIds: w.missionIds || [],
      mediaUrl: w.mediaUrl || '',
      mediaType: w.mediaType || 'image'
    })
    setIsModalOpen(true)
  }

  const handleOpenCreate = () => {
    // Find next week number
    const maxWeek = curriculum.reduce((max, item) => (item.week > max ? item.week : max), 0)
    setFormData({
      week: maxWeek + 1,
      title: '',
      description: '',
      objectives: '',
      missionIds: [],
      mediaUrl: '',
      mediaType: 'image'
    })
    setIsModalOpen(true)
  }

  const handleSave = (e) => {
    e.preventDefault()
    const processed = {
      ...formData,
      week: parseInt(formData.week) || 1,
      objectives: formData.objectives.split('\n').map(o => o.trim()).filter(Boolean),
      missionIds: formData.missionIds || [],
      mediaUrl: formData.mediaUrl || '',
      mediaType: formData.mediaType || 'image'
    }

    if (formData.id) {
      dispatch({ type: 'UPDATE_WEEK', payload: processed })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Updated Week ${processed.week} details.` } })
    } else {
      dispatch({ type: 'ADD_WEEK', payload: processed })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Added Week ${processed.week} to curriculum.` } })
    }
    setIsModalOpen(false)
  }

  const handleDelete = (id, weekNum) => {
    if (window.confirm(`Are you sure you want to delete Week ${weekNum} from the curriculum?`)) {
      dispatch({ type: 'DELETE_WEEK', payload: id })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Deleted Week ${weekNum} from curriculum.` } })
    }
  }

  return (
    <div className="curriculum-page">
      <div className="curriculum-header">
        <div>
          <h1 className="page-title">Syllabus & Weekly Curriculum</h1>
          <p className="page-subtitle">Organize study schedules, learning objectives, and 3D simulation training scenarios by week.</p>
        </div>
        <button className="btn btn-primary btn-md" onClick={handleOpenCreate}>
          <i className="fa-solid fa-plus" aria-hidden="true" /> Add New Week
        </button>
      </div>

      <div className="weeks-list">
        {curriculum.length === 0 ? (
          <div className="empty-state">
            <i className="fa-solid fa-book-open" aria-hidden="true" />
            <div className="empty-title">No weeks defined</div>
            <div className="empty-sub">Get started by creating the first week of the training curriculum.</div>
            <button className="btn btn-primary btn-sm" onClick={handleOpenCreate}>Add Week 1</button>
          </div>
        ) : (
          curriculum
            .sort((a, b) => a.week - b.week)
            .map(w => (
              <Card key={w.id} className="week-card">
                {w.mediaUrl && (
                  <div className="week-media-container">
                    {w.mediaType === 'video' ? (
                      <video src={w.mediaUrl} controls className="week-media-video" />
                    ) : (
                      <img src={w.mediaUrl} alt={w.title} className="week-media-image" />
                    )}
                  </div>
                )}
                <div className="week-card-head">
                  <div className="week-card-title-group">
                    <span className="week-number-tag">WEEK {w.week}</span>
                    <h3 className="week-title">{w.title}</h3>
                  </div>
                  <div className="week-card-actions">
                    <button className="icon-btn" onClick={() => handleOpenEdit(w)} title="Edit Week">
                      <i className="fa-solid fa-pen" aria-hidden="true" />
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDelete(w.id, w.week)} title="Delete Week">
                      <i className="fa-solid fa-trash" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <p className="week-description">{w.description}</p>

                {w.objectives && w.objectives.length > 0 && (
                  <div className="week-section">
                    <h4 className="week-section-title">Learning Objectives:</h4>
                    <ul className="objectives-list">
                      {w.objectives.map((obj, i) => (
                        <li key={i}>{obj}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="week-section">
                  <h4 className="week-section-title">Linked 3D Scenarios:</h4>
                  <div className="linked-missions">
                    {w.missionIds && w.missionIds.length > 0 ? (
                      w.missionIds.map(mid => {
                        const mission = missions.find(m => m.id === mid)
                        return mission ? (
                          <Badge key={mid} variant="teal">
                            <i className={`fa-solid ${mission.icon}`} aria-hidden="true" style={{ marginRight: 4 }} />
                            {mission.name}
                          </Badge>
                        ) : null
                      })
                    ) : (
                      <span className="no-missions-label">No missions linked yet.</span>
                    )}
                  </div>
                </div>
              </Card>
            ))
        )}
      </div>

      {isModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <form onSubmit={handleSave}>
              <div className="modal-header">
                <h3 className="modal-title">{formData.id ? 'Edit Week Details' : 'Add New Week'}</h3>
                <button type="button" className="modal-close" onClick={() => setIsModalOpen(false)} aria-label="Close modal">
                  <i className="fa-solid fa-xmark" aria-hidden="true" />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Week Number</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="form-input"
                      value={formData.week}
                      onChange={e => setFormData({ ...formData, week: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Week Topic / Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Greeting and Seating Guests"
                      className="form-input"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Summary / Description</label>
                  <textarea
                    required
                    placeholder="Provide a brief summary of what students will focus on this week..."
                    className="form-textarea"
                    value={formData.description}
                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Learning Objectives (one objective per line)</label>
                  <textarea
                    required
                    placeholder="e.g.&#10;Polite seating phrases&#10;Handling escorting etiquette"
                    className="form-textarea"
                    rows="3"
                    value={formData.objectives}
                    onChange={e => setFormData({ ...formData, objectives: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Media Type</label>
                    <select
                      className="form-input"
                      value={formData.mediaType}
                      onChange={e => setFormData({ ...formData, mediaType: e.target.value })}
                    >
                      <option value="image">Image</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Media URL / Path</label>
                    <input
                      type="text"
                      placeholder="e.g. /welcoming_guests.png or online URL"
                      className="form-input"
                      value={formData.mediaUrl}
                      onChange={e => setFormData({ ...formData, mediaUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Associate 3D Simulation Missions</label>
                  <div className="missions-selector-grid">
                    {missions.map(m => (
                      <label key={m.id} className="mission-selector-item">
                        <input
                          type="checkbox"
                          checked={formData.missionIds.includes(m.id)}
                          onChange={e => {
                            const checked = e.target.checked
                            setFormData({
                              ...formData,
                              missionIds: checked
                                ? [...formData.missionIds, m.id]
                                : formData.missionIds.filter(id => id !== m.id)
                            })
                          }}
                        />
                        <span className="mission-selector-label">
                          <i className={`fa-solid ${m.icon}`} aria-hidden="true" style={{ marginRight: 5, color: 'var(--teal-400)' }} />
                          {m.name}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Week</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
