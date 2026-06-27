// src/pages/Curriculum.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useProgress } from '../hooks/useProgress'
import { MISSIONS } from '../data/missions'
import { useTTS } from '../hooks/useSpeech'
import './Curriculum.css'

export default function Curriculum() {
  const { curriculum, vocabularies, quizzes, state } = useProgress()
  const navigate = useNavigate()
  const [selectedWeek, setSelectedWeek] = useState(1)
  const [quizState, setQuizState] = useState(null) // null | { currentIdx, answers: [], completed: boolean }
  const { speak, speaking } = useTTS()

  // Calculate total weeks dynamically to support unlimited lessons
  const maxCurriculumWeek = curriculum.reduce((max, c) => Math.max(max, Number(c.week)), 2)
  const maxVocabWeek = vocabularies.reduce((max, v) => Math.max(max, Number(v.week)), 0)
  const maxQuizWeek = quizzes.reduce((max, q) => {
    const vocab = vocabularies.find(v => v.id === q.vocabularyId)
    return Math.max(max, vocab ? Number(vocab.week) : 0)
  }, 0)
  const totalWeeks = Math.max(maxCurriculumWeek, maxVocabWeek, maxQuizWeek)

  // Filter items based on selected week
  const activeCurriculum = curriculum.find(c => Number(c.week) === selectedWeek)
  const activeVocabs = vocabularies.filter(v => Number(v.week) === selectedWeek)
  const activeQuizzes = quizzes.filter(q => {
    // Match quiz to vocab of the selected week
    const vocabIds = activeVocabs.map(v => v.id)
    return vocabIds.includes(q.vocabularyId)
  })

  // Quiz state machine functions
  function startQuiz() {
    if (activeQuizzes.length === 0) return
    setQuizState({
      currentIdx: 0,
      answers: [],
      completed: false
    })
  }

  function handleSelectAnswer(option) {
    if (!quizState || quizState.completed) return
    const isCorrect = option === activeQuizzes[quizState.currentIdx].correctAnswer
    const nextAnswers = [...quizState.answers, { questionId: activeQuizzes[quizState.currentIdx].id, answer: option, isCorrect }]

    if (quizState.currentIdx + 1 < activeQuizzes.length) {
      setQuizState({
        ...quizState,
        currentIdx: quizState.currentIdx + 1,
        answers: nextAnswers
      })
    } else {
      setQuizState({
        ...quizState,
        completed: true,
        answers: nextAnswers
      })
    }
  }

  const correctCount = quizState?.answers.filter(a => a.isCorrect).length || 0
  const totalQuestions = activeQuizzes.length

  return (
    <div className="curriculum-page">
      {/* Week Selector Tab Bar */}
      <div className="week-tabs">
        {Array.from({ length: totalWeeks }).map((_, i) => {
          const wNum = i + 1
          const isActive = selectedWeek === wNum
          return (
            <button
              key={wNum}
              className={`week-tab ${isActive ? 'active' : ''}`}
              onClick={() => {
                setSelectedWeek(wNum)
                setQuizState(null)
              }}
            >
              Week {wNum}
            </button>
          )
        })}
      </div>

      <div className="curriculum-layout">
        {/* Left Column: Lesson Outline & Missions */}
        <div className="curr-left">
          {activeCurriculum ? (
            <>
              <section className="curr-card card">
                <div className="curr-header-row">
                  <span className="week-badge">Week {activeCurriculum.week} Lesson</span>
                  <h2 className="curr-title">{activeCurriculum.title}</h2>
                </div>
                <p className="curr-desc">{activeCurriculum.description}</p>

                {activeCurriculum.objectives && (
                  <div className="curr-objectives">
                    <h4>Learning Objectives</h4>
                    <ul>
                      {activeCurriculum.objectives.map((obj, idx) => (
                        <li key={idx}><i className="fa-solid fa-circle-check" aria-hidden="true" /> {obj}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </section>

              <section className="missions-section">
                <h3 className="section-title">Associated Missions</h3>
                <div className="missions-list">
                  {activeCurriculum.missionIds && activeCurriculum.missionIds.length > 0 ? (
                    MISSIONS.filter(m => activeCurriculum.missionIds?.includes(m.id)).map(m => {
                      const done = state.completedMissions.includes(m.id)
                      const score = state.scores[m.id]
                      return (
                        <div key={m.id} className="curr-mission-row card">
                          <div className="curr-mission-info">
                            <i className={`fa-solid ${m.icon} mission-icon`} aria-hidden="true" />
                            <div>
                              <div className="m-name">{m.name}</div>
                              <div className="m-meta">{m.difficulty.toUpperCase()} · {m.steps.length} steps</div>
                            </div>
                          </div>
                          <div className="curr-mission-action">
                            {done ? (
                              <span className="m-score-tag">Passed: {score}/100</span>
                            ) : (
                              <span className="m-not-started">Not started</span>
                            )}
                            <button className="btn btn-primary btn-sm" onClick={() => navigate(`/simulation/${m.id}`)}>
                              {done ? 'Retry' : 'Start'}
                            </button>
                          </div>
                        </div>
                      )
                    })
                  ) : (
                    <div className="empty-vocab card" style={{ padding: '20px 10px' }}>No training scenarios linked for this week.</div>
                  )}
                </div>
              </section>
            </>
          ) : (
            <>
              <section className="curr-card card">
                <div className="curr-header-row">
                  <span className="week-badge">Week {selectedWeek} Lesson</span>
                  <h2 className="curr-title">No syllabus defined yet</h2>
                </div>
                <p className="curr-desc">The lesson objectives and 3D simulation training scenarios for this week haven't been published by the instructor yet.</p>
              </section>
              <section className="missions-section">
                <h3 className="section-title">Associated Missions</h3>
                <div className="empty-vocab card" style={{ padding: '20px 10px' }}>No training scenarios linked for this week.</div>
              </section>
            </>
          )}
        </div>

        {/* Right Column: Vocabulary Cards & Quizzes */}
        <div className="curr-right">
          <section className="vocab-section">
            <h3 className="section-title">Vocabulary & Pronunciation</h3>
            <div className="vocab-grid">
              {activeVocabs.length === 0 ? (
                <div className="empty-vocab card">No vocabulary added for this week yet.</div>
              ) : (
                activeVocabs.map(v => (
                  <div key={v.id} className="vocab-card card">
                    <div className="vocab-card-header">
                      <div>
                        <div className="v-word">{v.word}</div>
                        <div className="v-phonetic">{v.phonetic}</div>
                      </div>
                      <button
                        className="speak-audio-btn"
                        onClick={() => speak(v.word)}
                        title="Listen pronunciation"
                      >
                        <i className="fa-solid fa-volume-high" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="v-translation">{v.translation}</div>
                    <div className="v-definition">{v.definition}</div>
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="quiz-section-wrapper">
            <h3 className="section-title">Weekly Knowledge Quiz</h3>
            {activeQuizzes.length === 0 ? (
              <div className="empty-vocab card">No quiz questions available for this week.</div>
            ) : !quizState ? (
              <div className="quiz-start-card card">
                <div className="quiz-icon-box">
                  <i className="fa-solid fa-puzzle-piece" aria-hidden="true" />
                </div>
                <h4>Ready to test your knowledge?</h4>
                <p>Answer {activeQuizzes.length} multiple choice questions matching this week's vocabulary words.</p>
                <button className="btn btn-primary" onClick={startQuiz}>Start Quiz</button>
              </div>
            ) : quizState.completed ? (
              <div className="quiz-result-card card">
                <div className="quiz-result-badge">
                  <i className="fa-solid fa-flag-checkered" aria-hidden="true" />
                </div>
                <h4>Quiz Completed!</h4>
                <p>You scored {correctCount} out of {totalQuestions} questions correctly.</p>
                <div className="quiz-score-display">{Math.round((correctCount / totalQuestions) * 100)}%</div>
                <button className="btn btn-secondary" onClick={startQuiz}>Retry Quiz</button>
              </div>
            ) : (
              <div className="quiz-play-card card">
                <div className="quiz-progress-bar">
                  <div className="qp-fill" style={{ width: `${((quizState.currentIdx) / totalQuestions) * 100}%` }} />
                </div>
                <div className="quiz-q-meta">Question {quizState.currentIdx + 1} of {totalQuestions}</div>
                <div className="quiz-q-text">{activeQuizzes[quizState.currentIdx].question}</div>
                <div className="quiz-options">
                  {activeQuizzes[quizState.currentIdx].options.map((opt, idx) => (
                    <button
                      key={idx}
                      className="quiz-opt-btn"
                      onClick={() => handleSelectAnswer(opt)}
                    >
                      <span className="opt-letter">{String.fromCharCode(65 + idx)}</span>
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

