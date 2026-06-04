// src/pages/Scenes.jsx
import { useState } from 'react'
import { Badge, Card, Button, Modal, FormGroup, Input, Select } from '../components/ui'
import { useApp } from '../hooks/useAppContext'
import { isFirebaseEnabled } from '../config/firebase'

const EMPTY_SCENE_FORM = {
  name: '',
  subtitle: 'Custom Room',
  icon: 'fa-cube',
  color: 'teal',
  status: 'active',
  objects: [
    { id: 'floor', name: 'Floor', type: 'box', position: [0, -0.01, 0], size: [8, 0.02, 8], color: '#2A2A2A' }
  ],
  hotspots: []
}

function validateScene(f) {
  const errs = {}
  if (!f.name.trim()) errs.name = 'Scene name is required'
  if (!f.icon.trim()) errs.icon = 'Icon class is required'
  return errs
}

function SceneModal({ scene, onClose, onSave, dispatch }) {
  const [form, setForm] = useState(scene ?? EMPTY_SCENE_FORM)
  const [errors, setErrors] = useState({})
  const [activeTab, setActiveTab] = useState('objects') // 'objects' | 'hotspots'
  const [aiPrompt, setAiPrompt] = useState('')
  const [aiLoading, setAiLoading] = useState(false)

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }))

  async function handleAIGenerate() {
    if (!aiPrompt.trim()) return
    setAiLoading(true)
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are a 3D designer for a hospitality training application. Your task is to output a 3D scene representation based on the user's prompt: "${aiPrompt}".
                    The scene will be rendered in Three.js on a floor of size 8x8.
                    All objects must have appropriate positions and sizes.
                    A standard room should have:
                    1. A floor: type box, size [8, 0.02, 8], position [0, -0.01, 0].
                    2. Back wall: size [8, 3, 0.1], position [0, 1.5, -4].
                    3. Left wall: size [0.1, 3, 8], position [-4, 1.5, 0].
                    4. Right wall: size [0.1, 3, 8], position [4, 1.5, 0].
                    Other custom objects representing furniture (desks, tables, chairs, cabinets, coffee machines, plants, etc.) must be placed within coordinates X [-3.8 to 3.8], Z [-3.8 to 3.8], with their base resting on the floor (Y >= 0).
                    Colors should match the theme (e.g. coffee counter might be wood/brown, carpet might be gray). Use Hex codes for colors.
                    Supported types are: 'box', 'sphere', 'cylinder'.
                    Generate at least 1-2 interactive hotspots where students would interact with customers or execute tasks (position Y should be around 0.8 to 1.2, near a table or counter).
                    Return JSON only.`
                  }
                ]
              }
            ],
            generationConfig: {
              responseMimeType: 'application/json',
              responseSchema: {
                type: "OBJECT",
                properties: {
                  name: { type: "STRING", description: "A descriptive name for the 3D scene, e.g., 'Cozy Coffee Shop'" },
                  subtitle: { type: "STRING", description: "A layout descriptor, e.g., 'Bustling Cafe' or 'Standard Room'" },
                  icon: { type: "STRING", description: "FontAwesome solid icon class (without 'fa-solid ' prefix, e.g. 'fa-mug-hot', 'fa-bed', 'fa-briefcase', 'fa-spa')" },
                  color: { type: "STRING", enum: ["teal", "blue"], description: "Color theme for UI badges and headers" },
                  objects: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        id: { type: "STRING" },
                        name: { type: "STRING" },
                        type: { type: "STRING", enum: ["box", "sphere", "cylinder"] },
                        position: {
                          type: "ARRAY",
                          items: { type: "NUMBER" },
                          description: "[x, y, z] coordinates"
                        },
                        size: {
                          type: "ARRAY",
                          items: { type: "NUMBER" },
                          description: "[width, height, depth] or [radius, height, segments]"
                        },
                        color: { type: "STRING", description: "Hex color code starting with #" }
                      },
                      required: ["id", "name", "type", "position", "size", "color"]
                    }
                  },
                  hotspots: {
                    type: "ARRAY",
                    items: {
                      type: "OBJECT",
                      properties: {
                        id: { type: "STRING" },
                        label: { type: "STRING" },
                        position: {
                          type: "ARRAY",
                          items: { type: "NUMBER" },
                          description: "[x, y, z] coordinates"
                        },
                        active: { type: "BOOLEAN" }
                      },
                      required: ["id", "label", "position", "active"]
                    }
                  }
                },
                required: ["name", "subtitle", "icon", "color", "objects", "hotspots"]
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
        subtitle: parsed.subtitle || p.subtitle,
        icon: parsed.icon ? (parsed.icon.startsWith('fa-') ? parsed.icon : `fa-${parsed.icon}`) : p.icon,
        color: parsed.color || p.color,
        objects: parsed.objects || p.objects,
        hotspots: parsed.hotspots || p.hotspots
      }))
      
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Scene layout successfully generated by Gemini!' } })
    } catch (err) {
      console.error(err)
      dispatch({ type: 'NOTIFY', payload: { type: 'danger', message: `AI Generation failed: ${err.message}` } })
    } finally {
      setAiLoading(false)
    }
  }

  function handleSubmit() {
    const errs = validateScene(form)
    if (Object.keys(errs).length) { setErrors(errs); return }
    onSave(form)
  }

  const updateObject = (idx, key, val) => {
    setForm(prev => {
      const updated = [...prev.objects]
      updated[idx] = { ...updated[idx], [key]: val }
      return { ...prev, objects: updated }
    })
  }

  const updateObjectCoord = (objIdx, coordIdx, val) => {
    setForm(prev => {
      const updated = [...prev.objects]
      const pos = [...updated[objIdx].position]
      pos[coordIdx] = Number(val)
      updated[objIdx] = { ...updated[objIdx], position: pos }
      return { ...prev, objects: updated }
    })
  }

  const updateObjectSize = (objIdx, sizeIdx, val) => {
    setForm(prev => {
      const updated = [...prev.objects]
      const size = [...updated[objIdx].size]
      size[sizeIdx] = Number(val)
      updated[objIdx] = { ...updated[objIdx], size }
      return { ...prev, objects: updated }
    })
  }

  const addObject = () => {
    setForm(prev => ({
      ...prev,
      objects: [...prev.objects, { id: 'obj_' + Date.now(), name: 'New Object', type: 'box', position: [0, 0.5, 0], size: [1, 1, 1], color: '#378ADD' }]
    }))
  }

  const removeObject = (idx) => {
    setForm(prev => ({
      ...prev,
      objects: prev.objects.filter((_, i) => i !== idx)
    }))
  }

  const updateHotspot = (idx, key, val) => {
    setForm(prev => {
      const updated = [...prev.hotspots]
      updated[idx] = { ...updated[idx], [key]: val }
      return { ...prev, hotspots: updated }
    })
  }

  const updateHotspotCoord = (hsIdx, coordIdx, val) => {
    setForm(prev => {
      const updated = [...prev.hotspots]
      const pos = [...updated[hsIdx].position]
      pos[coordIdx] = Number(val)
      updated[hsIdx] = { ...updated[hsIdx], position: pos }
      return { ...prev, hotspots: updated }
    })
  }

  const addHotspot = () => {
    setForm(prev => ({
      ...prev,
      hotspots: [...prev.hotspots, { id: 'hs_' + Date.now(), label: 'New Hotspot', position: [0, 1, 0], active: true }]
    }))
  }

  const removeHotspot = (idx) => {
    setForm(prev => ({
      ...prev,
      hotspots: prev.hotspots.filter((_, i) => i !== idx)
    }))
  }

  const isEdit = !!scene

  return (
    <Modal
      title={isEdit ? 'Edit 3D Scene' : 'Create New 3D Scene'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>Cancel</Button>
          <Button variant="primary" icon="fa-check" onClick={handleSubmit}>
            {isEdit ? 'Save Changes' : 'Create Scene'}
          </Button>
        </>
      }
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 20 }}>
        {/* Left column: Scene General Details & Table Tabs */}
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FormGroup label="Scene Name" required hint={errors.name}>
              <Input
                value={form.name}
                onChange={e => set('name', e.target.value)}
                placeholder="e.g. Cozy Restaurant"
                style={errors.name ? { borderColor: 'var(--red-400)' } : {}}
              />
            </FormGroup>
            <FormGroup label="Subtitle/Layout" required>
              <Input
                value={form.subtitle}
                onChange={e => set('subtitle', e.target.value)}
                placeholder="e.g. Standard Room"
              />
            </FormGroup>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 4 }}>
            <FormGroup label="FontAwesome Solid Icon Class" required hint={errors.icon}>
              <Input
                value={form.icon}
                onChange={e => set('icon', e.target.value)}
                placeholder="e.g. fa-utensils"
                style={errors.icon ? { borderColor: 'var(--red-400)' } : {}}
              />
            </FormGroup>
            <FormGroup label="Theme Color">
              <Select value={form.color} onChange={e => set('color', e.target.value)}>
                <option value="teal">Teal (Gold)</option>
                <option value="blue">Blue</option>
              </Select>
            </FormGroup>
          </div>

          {/* Tabs for Objects / Hotspots */}
          <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginTop: 16, marginBottom: 12, gap: 16 }}>
            <button
              type="button"
              onClick={() => setActiveTab('objects')}
              style={{
                background: 'none', border: 'none', borderBottom: activeTab === 'objects' ? '2px solid var(--teal-400)' : 'none',
                padding: '6px 4px', fontSize: 13, fontWeight: 500, color: activeTab === 'objects' ? 'var(--text-1)' : 'var(--text-3)',
                cursor: 'pointer'
              }}
            >
              3D Objects ({form.objects?.length || 0})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('hotspots')}
              style={{
                background: 'none', border: 'none', borderBottom: activeTab === 'hotspots' ? '2px solid var(--teal-400)' : 'none',
                padding: '6px 4px', fontSize: 13, fontWeight: 500, color: activeTab === 'hotspots' ? 'var(--text-1)' : 'var(--text-3)',
                cursor: 'pointer'
              }}
            >
              Interactive Hotspots ({form.hotspots?.length || 0})
            </button>
          </div>

          {activeTab === 'objects' ? (
            <div>
              <div style={{ maxHeight: 280, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--gray-100)' }}>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Pos [X,Y,Z]</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Size [W,H,D]</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Color</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.objects?.map((obj, i) => (
                      <tr key={obj.id || i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '4px 6px' }}>
                          <input
                            type="text"
                            value={obj.name}
                            onChange={e => updateObject(i, 'name', e.target.value)}
                            style={{ width: 85, padding: '3px 6px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)' }}
                          />
                        </td>
                        <td style={{ padding: '4px 6px' }}>
                          <select
                            value={obj.type}
                            onChange={e => updateObject(i, 'type', e.target.value)}
                            style={{ width: 75, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)' }}
                          >
                            <option value="box">box</option>
                            <option value="sphere">sphere</option>
                            <option value="cylinder">cylinder</option>
                          </select>
                        </td>
                        <td style={{ padding: '4px 6px', whiteSpace: 'nowrap' }}>
                          <input type="number" step="0.05" value={obj.position?.[0] ?? 0} onChange={e => updateObjectCoord(i, 0, e.target.value)} style={{ width: 38, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)', marginRight: 2 }} title="X" />
                          <input type="number" step="0.05" value={obj.position?.[1] ?? 0} onChange={e => updateObjectCoord(i, 1, e.target.value)} style={{ width: 38, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)', marginRight: 2 }} title="Y" />
                          <input type="number" step="0.05" value={obj.position?.[2] ?? 0} onChange={e => updateObjectCoord(i, 2, e.target.value)} style={{ width: 38, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)' }} title="Z" />
                        </td>
                        <td style={{ padding: '4px 6px', whiteSpace: 'nowrap' }}>
                          <input type="number" step="0.05" value={obj.size?.[0] ?? 1} onChange={e => updateObjectSize(i, 0, e.target.value)} style={{ width: 38, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)', marginRight: 2 }} title="W / R" />
                          <input type="number" step="0.05" value={obj.size?.[1] ?? 1} onChange={e => updateObjectSize(i, 1, e.target.value)} style={{ width: 38, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)', marginRight: 2 }} title="H" />
                          <input type="number" step="0.05" value={obj.size?.[2] ?? 1} onChange={e => updateObjectSize(i, 2, e.target.value)} style={{ width: 38, padding: '3px 4px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)' }} title="D" />
                        </td>
                        <td style={{ padding: '4px 6px' }}>
                          <input
                            type="color"
                            value={obj.color?.startsWith('#') ? obj.color : '#cccccc'}
                            onChange={e => updateObject(i, 'color', e.target.value)}
                            style={{ width: 32, height: 20, padding: 0, border: 'none', background: 'none', cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '4px 6px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => removeObject(i)}
                            style={{ background: 'none', border: 'none', color: 'var(--red-400)', cursor: 'pointer' }}
                            title="Delete object"
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addObject}
                style={{
                  marginTop: 10, padding: '5px 12px', fontSize: 12, border: '1px dashed var(--border-md)', borderRadius: 'var(--radius-md)',
                  background: 'none', color: 'var(--teal-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <i className="fa-solid fa-plus" /> Add 3D object
              </button>
            </div>
          ) : (
            <div>
              <div style={{ maxHeight: 280, overflowY: 'auto', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', padding: 4 }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--border)', background: 'var(--gray-100)' }}>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Label</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Position [X, Y, Z]</th>
                      <th style={{ textAlign: 'left', padding: '6px 8px', color: 'var(--text-3)' }}>Active</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.hotspots?.map((hs, i) => (
                      <tr key={hs.id || i} style={{ borderBottom: '1px solid var(--border)' }}>
                        <td style={{ padding: '6px 8px' }}>
                          <input
                            type="text"
                            value={hs.label}
                            onChange={e => updateHotspot(i, 'label', e.target.value)}
                            style={{ width: 180, padding: '4px 6px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)' }}
                          />
                        </td>
                        <td style={{ padding: '6px 8px', whiteSpace: 'nowrap' }}>
                          <input type="number" step="0.05" value={hs.position?.[0] ?? 0} onChange={e => updateHotspotCoord(i, 0, e.target.value)} style={{ width: 45, padding: '4px 6px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)', marginRight: 3 }} title="X" />
                          <input type="number" step="0.05" value={hs.position?.[1] ?? 0} onChange={e => updateHotspotCoord(i, 1, e.target.value)} style={{ width: 45, padding: '4px 6px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)', marginRight: 3 }} title="Y" />
                          <input type="number" step="0.05" value={hs.position?.[2] ?? 0} onChange={e => updateHotspotCoord(i, 2, e.target.value)} style={{ width: 45, padding: '4px 6px', fontSize: 11, border: '1px solid var(--border-md)', borderRadius: 'var(--radius-sm)', background: 'var(--surface)', color: 'var(--text-1)' }} title="Z" />
                        </td>
                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                          <input
                            type="checkbox"
                            checked={hs.active !== false}
                            onChange={e => updateHotspot(i, 'active', e.target.checked)}
                            style={{ cursor: 'pointer' }}
                          />
                        </td>
                        <td style={{ padding: '6px 8px', textAlign: 'center' }}>
                          <button
                            type="button"
                            onClick={() => removeHotspot(i)}
                            style={{ background: 'none', border: 'none', color: 'var(--red-400)', cursor: 'pointer' }}
                            title="Delete hotspot"
                          >
                            <i className="fa-solid fa-trash" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                onClick={addHotspot}
                style={{
                  marginTop: 10, padding: '5px 12px', fontSize: 12, border: '1px dashed var(--border-md)', borderRadius: 'var(--radius-md)',
                  background: 'none', color: 'var(--teal-400)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6
                }}
              >
                <i className="fa-solid fa-plus" /> Add interactive hotspot
              </button>
            </div>
          )}
        </div>

        {/* Right column: Gemini AI scene layout generator */}
        <div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(197, 160, 89, 0.08), rgba(55, 138, 221, 0.08))',
            border: '1px solid var(--border-md)', borderRadius: 'var(--radius-lg)', padding: '16px 18px',
            display: 'flex', flexDirection: 'column', gap: 12, position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <i className="fa-solid fa-wand-magic-sparkles" style={{ color: 'var(--teal-400)', fontSize: 16 }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-1)' }}>Gemini 3D Assistant</span>
            </div>
            <p style={{ fontSize: 11, color: 'var(--text-2)', lineHeight: 1.5 }}>
              Describe a theme (e.g. &quot;Airport lounge with reception desk, sofa seating, and plants&quot;) and let Gemini layout the Three.js shapes.
            </p>

            <textarea
              value={aiPrompt}
              onChange={e => setAiPrompt(e.target.value)}
              placeholder="e.g. A modern hotel lobby with a large brown counter desk at the back, two blue spherical armchairs in the front, and yellow floor tiles."
              disabled={aiLoading}
              style={{
                width: '100%', minHeight: 90, padding: 8, fontSize: 12, lineHeight: 1.4,
                border: '1px solid var(--border-md)', borderRadius: 'var(--radius-md)',
                background: 'var(--surface)', color: 'var(--text-1)', resize: 'vertical',
                outline: 'none', fontFamily: 'inherit'
              }}
            />

            <Button
              variant="primary"
              onClick={handleAIGenerate}
              disabled={aiLoading || !aiPrompt.trim()}
              style={{ width: '100%', justifyContent: 'center' }}
            >
              {aiLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin" style={{ marginRight: 6 }} /> Generating Layout...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-wand-magic-sparkles" style={{ marginRight: 6 }} /> Generate 3D Scene
                </>
              )}
            </Button>

            {aiLoading && (
              <div style={{
                marginTop: 6, display: 'flex', flexDirection: 'column', gap: 4,
                fontSize: 10, color: 'var(--teal-400)', alignItems: 'center'
              }}>
                <div className="mini-bar-wrap" style={{ width: '100%', height: 4 }}>
                  <div className="mini-bar-fill" style={{
                    width: '100%', height: '100%',
                    animation: 'shimmer 1.5s infinite linear',
                    background: 'linear-gradient(to right, var(--teal-400) 0%, var(--blue-400) 50%, var(--teal-400) 100%)',
                    backgroundSize: '200% 100%'
                  }} />
                </div>
                <span>Drafting objects & coordinate vectors...</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  )
}

export function Scenes() {
  const { state, dispatch } = useApp()
  const [modal, setModal] = useState(null) // null | 'add' | { scene }
  const [deleteTarget, setDeleteTarget] = useState(null)

  const scenes = state.scenes || []

  function handleSave(form) {
    if (modal?.scene) {
      dispatch({ type: 'UPDATE_SCENE', payload: { ...modal.scene, ...form } })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Scene "${form.name}" updated successfully.` } })
    } else {
      dispatch({ type: 'ADD_SCENE', payload: form })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Scene "${form.name}" created successfully!` } })
    }
    setModal(null)
  }

  function handleDelete() {
    dispatch({ type: 'DELETE_SCENE', payload: deleteTarget.id })
    dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Scene "${deleteTarget.name}" has been deleted.` } })
    setDeleteTarget(null)
  }

  return (
    <div className="scenes-page-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <style>{`
        .scenes-page-wrapper .modal-box {
          max-width: 900px;
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Interactive 3D Environments</div>
          <div style={{ fontSize: 12, color: 'var(--text-3)', marginTop: 2 }}>Manage spatial settings, procedural shapes, and interactive training areas.</div>
        </div>
        <Button icon="fa-plus" onClick={() => setModal('add')}>New Scene</Button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {scenes.map(sc => (
          <Card key={sc.id} style={{ padding: 0, overflow: 'hidden', border: '1px solid var(--border)' }}>
            <div style={{
              height: 100, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: sc.color === 'teal' ? 'var(--teal-50)' : 'var(--blue-50)',
              flexDirection: 'column', gap: 6
            }}>
              <i className={`fa-solid ${sc.icon}`}
                style={{ fontSize: 36, color: sc.color === 'teal' ? 'var(--teal-400)' : 'var(--blue-400)' }}
                aria-hidden="true" />
              <span style={{ fontSize: 11, fontWeight: 500, color: sc.color === 'teal' ? 'var(--teal-400)' : 'var(--blue-400)' }}>
                {sc.subtitle}
              </span>
            </div>
            <div style={{ padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{sc.name}</div>
                  <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>3D procedural · {sc.subtitle}</div>
                </div>
                <Badge variant={sc.color || 'teal'}>Active</Badge>
              </div>
              <div style={{ fontSize: 11, color: 'var(--text-2)', marginBottom: 10, lineHeight: 1.5 }}>
                Objects: {sc.objects?.length || 0} · Hotspots: {sc.hotspots?.length || 0}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: 11, color: 'var(--text-3)' }}>
                  {sc.missionCount || 0} missions · {sc.sessionCount || 0} sessions
                </span>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button className="icon-btn" onClick={() => setModal({ scene: sc })} title="Edit Scene">
                    <i className="fa-solid fa-pen" aria-hidden="true" />
                  </button>
                  <button className="icon-btn danger" onClick={() => setDeleteTarget(sc)} title="Delete Scene">
                    <i className="fa-solid fa-trash" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card style={{ border: '1px solid var(--border)' }}>
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

      {(modal === 'add' || modal?.scene) && (
        <SceneModal
          scene={modal?.scene ?? null}
          onClose={() => setModal(null)}
          onSave={handleSave}
          dispatch={dispatch}
        />
      )}

      {deleteTarget && (
        <Modal
          title="Delete Scene"
          onClose={() => setDeleteTarget(null)}
          footer={
            <>
              <Button variant="secondary" onClick={() => setDeleteTarget(null)}>Cancel</Button>
              <Button variant="danger" icon="fa-trash" onClick={handleDelete}>Delete</Button>
            </>
          }
        >
          <p style={{ fontSize: 13, lineHeight: 1.6, color: 'var(--text-2)' }}>
            Are you sure you want to delete scene <strong>"{deleteTarget.name}"</strong>?
            This action cannot be undone and any missions linked to this scene might be affected.
          </p>
        </Modal>
      )}
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

