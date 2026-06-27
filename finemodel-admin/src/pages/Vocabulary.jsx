// src/pages/Vocabulary.jsx
import { useState } from 'react'
import { useApp } from '../hooks/useAppContext'
import { Card, Badge } from '../components/ui'
import './Vocabulary.css'

export default function Vocabulary() {
  const { state, dispatch } = useApp()
  const { vocabularies = [], quizzes = [] } = state

  const [activeTab, setActiveTab] = useState('vocab') // 'vocab' | 'quiz'

  // Vocabulary CRUD states
  const [isVocabModalOpen, setIsVocabModalOpen] = useState(false)
  const [vocabForm, setVocabForm] = useState({ word: '', phonetic: '', definition: '', translation: '', imageUrl: '', week: 1 })

  // Quiz CRUD states
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false)
  const [quizForm, setQuizForm] = useState({ question: '', imageUrl: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '', vocabularyId: '' })

  // Live Simulator states
  const [simState, setSimState] = useState('idle') // 'idle' | 'playing' | 'ended'
  const [simIndex, setSimIndex] = useState(0)
  const [simScore, setSimScore] = useState(0)
  const [selectedOption, setSelectedOption] = useState(null)
  const [simResults, setSimResults] = useState([]) // array of { question, correct, chosen }

  // --- Vocabulary Actions ---
  const handleOpenVocabCreate = () => {
    setVocabForm({ word: '', phonetic: '', definition: '', translation: '', imageUrl: '/vocabulary/cutlery.png', week: 1 })
    setIsVocabModalOpen(true)
  }

  const handleOpenVocabEdit = (v) => {
    setVocabForm({ ...v })
    setIsVocabModalOpen(true)
  }

  const handleSaveVocab = (e, keepOpen = false) => {
    if (e) e.preventDefault()

    // Form validation check for button triggers
    if (!vocabForm.word.trim() || !vocabForm.translation.trim()) {
      alert('Please fill in both the Vocabulary Word and Thai Translation fields.')
      return
    }

    const processed = { ...vocabForm, week: parseInt(vocabForm.week) || 1 }
    if (vocabForm.id) {
      dispatch({ type: 'UPDATE_VOCABULARY', payload: processed })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Updated vocabulary: "${processed.word}"` } })
    } else {
      dispatch({ type: 'ADD_VOCABULARY', payload: processed })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Added new vocabulary: "${processed.word}"` } })
    }

    if (keepOpen && !vocabForm.id) {
      // Clear fields to let user type next word, but preserve the week and image folder pattern
      setVocabForm({
        word: '',
        phonetic: '',
        definition: '',
        translation: '',
        imageUrl: vocabForm.imageUrl || '/vocabulary/cutlery.png',
        week: vocabForm.week
      })
    } else {
      setIsVocabModalOpen(false)
    }
  }

  const handleDeleteVocab = (id, word) => {
    if (window.confirm(`Are you sure you want to delete vocabulary "${word}"?`)) {
      dispatch({ type: 'DELETE_VOCABULARY', payload: id })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: `Deleted vocabulary: "${word}"` } })
    }
  }

  // --- Quiz Actions ---
  const handleOpenQuizCreate = () => {
    setQuizForm({ question: '', imageUrl: '', option1: '', option2: '', option3: '', option4: '', correctAnswer: '', vocabularyId: '' })
    setIsQuizModalOpen(true)
  }

  const handleOpenQuizEdit = (q) => {
    setQuizForm({
      id: q.id,
      question: q.question,
      imageUrl: q.imageUrl || '',
      option1: q.options[0] || '',
      option2: q.options[1] || '',
      option3: q.options[2] || '',
      option4: q.options[3] || '',
      correctAnswer: q.correctAnswer || '',
      vocabularyId: q.vocabularyId || ''
    })
    setIsQuizModalOpen(true)
  }

  const handleSaveQuiz = (e) => {
    e.preventDefault()
    // Auto-pull image from selected vocabulary if empty
    let finalImageUrl = quizForm.imageUrl
    if (!finalImageUrl && quizForm.vocabularyId) {
      const vocab = vocabularies.find(v => v.id === quizForm.vocabularyId)
      if (vocab) finalImageUrl = vocab.imageUrl
    }

    const processed = {
      id: quizForm.id,
      question: quizForm.question,
      imageUrl: finalImageUrl || '/vocabulary/cutlery.png',
      options: [quizForm.option1, quizForm.option2, quizForm.option3, quizForm.option4].filter(Boolean),
      correctAnswer: quizForm.correctAnswer,
      vocabularyId: quizForm.vocabularyId
    }

    if (quizForm.id) {
      dispatch({ type: 'UPDATE_QUIZ', payload: processed })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Updated quiz question details.' } })
    } else {
      dispatch({ type: 'ADD_QUIZ', payload: processed })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Added new quiz question.' } })
    }
    setIsQuizModalOpen(false)
  }

  const handleDeleteQuiz = (id, index) => {
    if (window.confirm(`Are you sure you want to delete Quiz Question #${index + 1}?`)) {
      dispatch({ type: 'DELETE_QUIZ', payload: id })
      dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Deleted quiz question.' } })
    }
  }

  // --- Quiz Simulator Logic ---
  const startSimulator = () => {
    if (quizzes.length === 0) {
      alert('Please add some quiz questions first to run the simulator.')
      return
    }
    setSimState('playing')
    setSimIndex(0)
    setSimScore(0)
    setSelectedOption(null)
    setSimResults([])
  }

  const handleSelectOption = (opt) => {
    if (selectedOption !== null) return // Answered already
    setSelectedOption(opt)
    const currentQuiz = quizzes[simIndex]
    const isCorrect = opt === currentQuiz.correctAnswer
    if (isCorrect) setSimScore(prev => prev + 1)

    setSimResults(prev => [...prev, {
      question: currentQuiz.question,
      correct: currentQuiz.correctAnswer,
      chosen: opt,
      isCorrect
    }])
  }

  const handleNextQuiz = () => {
    const nextIdx = simIndex + 1
    if (nextIdx < quizzes.length) {
      setSimIndex(nextIdx)
      setSelectedOption(null)
    } else {
      setSimState('ended')
    }
  }

  return (
    <div className="vocab-quiz-page">
      <div className="vocab-header">
        <div>
          <h1 className="page-title">Vocabulary & Mock Quizzes</h1>
          <p className="page-subtitle">Manage terminology dictionaries, spelling notes, illustrations, and multiple-choice quizzes.</p>
        </div>
        <div className="tab-buttons">
          <button className={`tab-btn ${activeTab === 'vocab' ? 'active' : ''}`} onClick={() => setActiveTab('vocab')}>
            <i className="fa-solid fa-spell-check" /> Vocabulary
          </button>
          <button className={`tab-btn ${activeTab === 'quiz' ? 'active' : ''}`} onClick={() => setActiveTab('quiz')}>
            <i className="fa-solid fa-circle-question" /> Mock Quizzes
          </button>
        </div>
      </div>

      {/* ========================================================
          VOCABULARY LIST TAB
          ======================================================== */}
      {activeTab === 'vocab' && (
        <div className="tab-content">
          <div className="action-row">
            <h2 className="section-title">Vocabulary Dictionary ({vocabularies.length})</h2>
            <button className="btn btn-primary btn-sm" onClick={handleOpenVocabCreate}>
              <i className="fa-solid fa-plus" /> Add Vocabulary Word
            </button>
          </div>

          {vocabularies.length === 0 ? (
            <div className="empty-state">
              <i className="fa-solid fa-language" />
              <div className="empty-title">No vocabulary words defined</div>
              <div className="empty-sub">Define vocabulary cards with translations and images to help students study.</div>
              <button className="btn btn-primary btn-sm" onClick={handleOpenVocabCreate}>Add Word</button>
            </div>
          ) : (
            <div className="vocab-grid">
              {vocabularies.map(v => (
                <Card key={v.id} className="vocab-card">
                  {v.imageUrl && (
                    <div className="vocab-card-img">
                      <img src={v.imageUrl} alt={v.word} />
                      <Badge variant="teal" className="vocab-week-badge">Week {v.week}</Badge>
                    </div>
                  )}
                  <div className="vocab-card-body">
                    <div className="vocab-card-head">
                      <div>
                        <h3 className="vocab-word">{v.word}</h3>
                        <span className="vocab-phonetic">{v.phonetic}</span>
                      </div>
                      <div className="vocab-actions">
                        <button className="icon-btn" onClick={() => handleOpenVocabEdit(v)} title="Edit Word">
                          <i className="fa-solid fa-pen" />
                        </button>
                        <button className="icon-btn danger" onClick={() => handleDeleteVocab(v.id, v.word)} title="Delete Word">
                          <i className="fa-solid fa-trash" />
                        </button>
                      </div>
                    </div>

                    <div className="vocab-details">
                      <div className="vocab-detail-section">
                        <span className="vocab-sec-label">Thai Translation</span>
                        <p className="vocab-translation-text">{v.translation}</p>
                      </div>
                      <div className="vocab-detail-section">
                        <span className="vocab-sec-label">English Definition</span>
                        <p className="vocab-definition-text">{v.definition}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ========================================================
          QUIZ & LIVE SIMULATOR TAB
          ======================================================== */}
      {activeTab === 'quiz' && (
        <div className="tab-content quiz-tab-layout">
          {/* Left panel: List of questions */}
          <div className="quiz-list-panel">
            <div className="action-row">
              <h2 className="section-title">Quiz Questions ({quizzes.length})</h2>
              <button className="btn btn-primary btn-sm" onClick={handleOpenQuizCreate}>
                <i className="fa-solid fa-plus" /> Add Question
              </button>
            </div>

            <div className="quizzes-stack">
              {quizzes.length === 0 ? (
                <div className="empty-state" style={{ padding: '24px 10px' }}>
                  <i className="fa-solid fa-clipboard-question" />
                  <div className="empty-title">No questions yet</div>
                  <div className="empty-sub">Add questions to see them here and in the simulator.</div>
                </div>
              ) : (
                quizzes.map((q, idx) => (
                  <div key={q.id} className="quiz-row-card">
                    <img src={q.imageUrl} alt="" className="quiz-row-thumb" />
                    <div className="quiz-row-info">
                      <div className="quiz-row-num">QUESTION #{idx + 1}</div>
                      <div className="quiz-row-text">{q.question}</div>
                      <div className="quiz-row-meta">
                        Ans: <strong style={{ color: 'var(--teal-400)' }}>{q.correctAnswer}</strong> · {q.options.length} options
                      </div>
                    </div>
                    <div className="quiz-row-actions">
                      <button className="icon-btn" onClick={() => handleOpenQuizEdit(q)}>
                        <i className="fa-solid fa-pen" />
                      </button>
                      <button className="icon-btn danger" onClick={() => handleDeleteQuiz(q.id, idx)}>
                        <i className="fa-solid fa-trash" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Right panel: LIVE QUIZ SIMULATOR */}
          <div className="simulator-panel">
            <Card className="sim-frame">
              <div className="sim-frame-head">
                <i className="fa-solid fa-laptop-code" style={{ color: 'var(--teal-400)' }} />
                <span>Student Quiz Simulator Preview</span>
                {simState === 'playing' && <Badge variant="teal">Playing</Badge>}
              </div>

              {simState === 'idle' && (
                <div className="sim-idle-screen">
                  <div className="sim-icon-glow">
                    <i className="fa-solid fa-gamepad" />
                  </div>
                  <h3>Quiz Simulator</h3>
                  <p>Interactive player simulating the student quiz UI experience. Run through mock tests in real-time.</p>
                  <button className="btn btn-primary" onClick={startSimulator} disabled={quizzes.length === 0}>
                    <i className="fa-solid fa-play" /> Start Quiz Simulator
                  </button>
                </div>
              )}

              {simState === 'playing' && (() => {
                const currentQuiz = quizzes[simIndex]
                return (
                  <div className="sim-playing-screen">
                    <div className="sim-playing-header">
                      <span>Question {simIndex + 1} of {quizzes.length}</span>
                      <span>Score: {simScore}/{quizzes.length}</span>
                    </div>

                    <div className="sim-image-container">
                      <img src={currentQuiz.imageUrl} alt="Quiz Question illustration" />
                    </div>

                    <div className="sim-question-text">{currentQuiz.question}</div>

                    <div className="sim-options-grid">
                      {currentQuiz.options.map(opt => {
                        const isChosen = selectedOption === opt
                        const isCorrect = opt === currentQuiz.correctAnswer
                        let optClass = ''
                        if (selectedOption !== null) {
                          if (isCorrect) optClass = 'correct'
                          else if (isChosen) optClass = 'wrong'
                          else optClass = 'disabled'
                        }
                        return (
                          <button
                            key={opt}
                            className={`sim-opt-btn ${optClass}`}
                            onClick={() => handleSelectOption(opt)}
                            disabled={selectedOption !== null}
                          >
                            <span className="opt-marker">
                              {selectedOption !== null && isCorrect && <i className="fa-solid fa-check" />}
                              {selectedOption !== null && isChosen && !isCorrect && <i className="fa-solid fa-xmark" />}
                            </span>
                            {opt}
                          </button>
                        )
                      })}
                    </div>

                    {selectedOption !== null && (
                      <button className="btn btn-primary next-quiz-btn animate-fade" onClick={handleNextQuiz}>
                        {simIndex + 1 < quizzes.length ? 'Next Question' : 'View Results'} <i className="fa-solid fa-arrow-right" />
                      </button>
                    )}
                  </div>
                )
              })()}

              {simState === 'ended' && (
                <div className="sim-ended-screen">
                  <div className="sim-trophy-ring">
                    <i className="fa-solid fa-trophy" />
                  </div>
                  <h3>Quiz Finished!</h3>
                  <div className="sim-score-badge">Your score: {simScore} / {quizzes.length}</div>
                  
                  <div className="sim-summary-box">
                    {simResults.map((r, idx) => (
                      <div key={idx} className="sim-result-row">
                        <span className={`sim-indicator-bullet ${r.isCorrect ? 'correct' : 'wrong'}`} />
                        <div className="sim-result-info">
                          <div className="sim-result-q">Q{idx + 1}: {r.question}</div>
                          <div className="sim-result-sub">
                            Your answer: <span className={r.isCorrect ? 'text-correct' : 'text-wrong'}>{r.chosen}</span> 
                            {!r.isCorrect && <span> (Correct: {r.correct})</span>}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button className="btn btn-primary" onClick={startSimulator}>
                    <i className="fa-solid fa-rotate-right" /> Try again
                  </button>
                </div>
              )}
            </Card>
          </div>
        </div>
      )}

      {/* ========================================================
          VOCABULARY MODAL FORM
          ======================================================== */}
      {isVocabModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <form onSubmit={(e) => handleSaveVocab(e, false)}>
              <div className="modal-header">
                <h3 className="modal-title">{vocabForm.id ? 'Edit Vocabulary Word' : 'Add New Vocabulary Word'}</h3>
                <button type="button" className="modal-close" onClick={() => setIsVocabModalOpen(false)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Vocabulary Word</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Cutlery"
                      className="form-input"
                      value={vocabForm.word}
                      onChange={e => setVocabForm({ ...vocabForm, word: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phonetic Spelling</label>
                    <input
                      type="text"
                      placeholder="e.g. /ˈkʌt.lər.i/"
                      className="form-input"
                      value={vocabForm.phonetic}
                      onChange={e => setVocabForm({ ...vocabForm, phonetic: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Thai Translation</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ช้อนส้อม"
                      className="form-input"
                      value={vocabForm.translation}
                      onChange={e => setVocabForm({ ...vocabForm, translation: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Week Association</label>
                    <input
                      type="number"
                      required
                      min="1"
                      className="form-input"
                      value={vocabForm.week}
                      onChange={e => setVocabForm({ ...vocabForm, week: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">English Definition</label>
                  <textarea
                    required
                    placeholder="Provide the English definition or usage guidelines..."
                    className="form-textarea"
                    value={vocabForm.definition}
                    onChange={e => setVocabForm({ ...vocabForm, definition: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Sample Image URL / Path</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. /vocabulary/cutlery.png"
                    className="form-input"
                    value={vocabForm.imageUrl}
                    onChange={e => setVocabForm({ ...vocabForm, imageUrl: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsVocabModalOpen(false)}>Cancel</button>
                {!vocabForm.id && (
                  <button 
                    type="button" 
                    className="btn btn-secondary btn-sm" 
                    onClick={() => handleSaveVocab(null, true)}
                    style={{ borderColor: 'var(--teal-500)', color: 'var(--teal-500)', background: 'transparent' }}
                  >
                    Save & Add Another
                  </button>
                )}
                <button type="submit" className="btn btn-primary btn-sm">Save Word</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          QUIZ MODAL FORM
          ======================================================== */}
      {isQuizModalOpen && (
        <div className="modal-backdrop">
          <div className="modal-box">
            <form onSubmit={handleSaveQuiz}>
              <div className="modal-header">
                <h3 className="modal-title">{quizForm.id ? 'Edit Quiz Question' : 'Add New Quiz Question'}</h3>
                <button type="button" className="modal-close" onClick={() => setIsQuizModalOpen(false)}>
                  <i className="fa-solid fa-xmark" />
                </button>
              </div>

              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Quiz Question Text</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. What object is shown in this picture?"
                    className="form-input"
                    value={quizForm.question}
                    onChange={e => setQuizForm({ ...quizForm, question: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Link to Vocabulary (Auto-images)</label>
                    <select
                      className="form-input"
                      value={quizForm.vocabularyId}
                      onChange={e => setQuizForm({ ...quizForm, vocabularyId: e.target.value })}
                    >
                      <option value="">-- None (Manually input image URL below) --</option>
                      {vocabularies.map(v => (
                        <option key={v.id} value={v.id}>{v.word}</option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Manual Image URL / Path (Optional)</label>
                    <input
                      type="text"
                      placeholder="e.g. /vocabulary/cutlery.png"
                      className="form-input"
                      value={quizForm.imageUrl}
                      onChange={e => setQuizForm({ ...quizForm, imageUrl: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ margin: '12px 0 6px', fontWeight: 500, fontSize: 12, color: 'var(--text-3)' }}>Multiple Choice Options:</div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Option A</label>
                    <input
                      type="text"
                      required
                      placeholder="Choice A"
                      className="form-input"
                      value={quizForm.option1}
                      onChange={e => setQuizForm({ ...quizForm, option1: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option B</label>
                    <input
                      type="text"
                      required
                      placeholder="Choice B"
                      className="form-input"
                      value={quizForm.option2}
                      onChange={e => setQuizForm({ ...quizForm, option2: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Option C</label>
                    <input
                      type="text"
                      required
                      placeholder="Choice C"
                      className="form-input"
                      value={quizForm.option3}
                      onChange={e => setQuizForm({ ...quizForm, option3: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Option D</label>
                    <input
                      type="text"
                      required
                      placeholder="Choice D"
                      className="form-input"
                      value={quizForm.option4}
                      onChange={e => setQuizForm({ ...quizForm, option4: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{ marginTop: 8 }}>
                  <label className="form-label" style={{ color: 'var(--teal-400)', fontWeight: 600 }}>Correct Answer Selection</label>
                  <select
                    required
                    className="form-input"
                    style={{ borderColor: 'var(--teal-400)', color: 'var(--teal-400)', fontWeight: 600 }}
                    value={quizForm.correctAnswer}
                    onChange={e => setQuizForm({ ...quizForm, correctAnswer: e.target.value })}
                  >
                    <option value="">-- Choose Correct Choice --</option>
                    {quizForm.option1 && <option value={quizForm.option1}>Option A ({quizForm.option1})</option>}
                    {quizForm.option2 && <option value={quizForm.option2}>Option B ({quizForm.option2})</option>}
                    {quizForm.option3 && <option value={quizForm.option3}>Option C ({quizForm.option3})</option>}
                    {quizForm.option4 && <option value={quizForm.option4}>Option D ({quizForm.option4})</option>}
                  </select>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setIsQuizModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary btn-sm">Save Question</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
