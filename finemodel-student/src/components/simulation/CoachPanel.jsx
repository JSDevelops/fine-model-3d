// src/components/simulation/CoachPanel.jsx
import { useState, useEffect } from 'react'
import { useTTS, useSTT, scoreTranscript, computeSpeechDiff } from '../../hooks/useSpeech'
import './CoachPanel.css'

/* ── Waveform animation ── */
function Waveform() {
  return (
    <div className="waveform" aria-hidden="true">
      {[0, 0.1, 0.2, 0.15, 0.05, 0.25, 0.1].map((delay, i) => (
        <div key={i} className="wave-bar" style={{ animationDelay: `${delay}s` }} />
      ))}
    </div>
  )
}

/* ── Score ring SVG ── */
function ScoreRing({ score }) {
  const r = 30, circ = 2 * Math.PI * r
  const dash = Math.round((score / 100) * circ)
  const color = score >= 70 ? '#1D9E75' : score >= 50 ? '#BA7517' : '#E24B4A'
  return (
    <svg width="80" height="80" viewBox="0 0 80 80" aria-label={`Score: ${score} out of 100`}>
      <circle cx="40" cy="40" r={r} fill="none" stroke="#E4E3E0" strokeWidth="10" />
      <circle cx="40" cy="40" r={r} fill="none" stroke={color} strokeWidth="10"
        strokeDasharray={`${dash} ${circ}`} strokeDashoffset={circ / 4}
        transform="rotate(-90 40 40)" style={{ transition: 'stroke-dasharray 0.6s ease' }} />
      <text x="40" y="44" textAnchor="middle" fontSize="18" fontWeight="500"
        fill={color} fontFamily="IBM Plex Sans, sans-serif">{score}</text>
    </svg>
  )
}

/* ── Main CoachPanel ── */
export default function CoachPanel({ step, stepIndex, totalSteps, onCorrect, onNext }) {
  const [phase, setPhase] = useState('dialogue') // 'dialogue' | 'score'
  const [selected, setSelected]   = useState(null)
  const [isCorrect, setIsCorrect] = useState(null)
  const [score, setScore]         = useState(null)
  const [inputMode, setInputMode] = useState('choice') // 'choice' | 'speech'
  const [lastTranscript, setLastTranscript] = useState('')

  const { speak, stop: stopTTS, speaking } = useTTS()
  const { start: startSTT, stop: stopSTT, transcript, listening, error: sttError, supported: sttSupported } = useSTT()

  // Reset on step change
  useEffect(() => {
    setPhase('dialogue')
    setSelected(null)
    setIsCorrect(null)
    setScore(null)
    setLastTranscript('')
    stopTTS()
  }, [stepIndex])

  // Evaluate speech when transcript arrives
  useEffect(() => {
    if (!listening && transcript && phase === 'dialogue') {
      const correct = step.choices.find(c => c.correct)
      const s = scoreTranscript(transcript, correct.text, step.keywords)
      const passed = s >= 60
      setLastTranscript(transcript)
      setScore(s)
      setIsCorrect(passed)
      setPhase('score')
      if (passed) onCorrect(s)
    }
  }, [listening, transcript])

  function pickChoice(choice) {
    if (selected !== null) return
    setSelected(choice.text)
    setIsCorrect(choice.correct)
    const s = choice.correct ? Math.floor(Math.random() * 15) + 82 : Math.floor(Math.random() * 30) + 30
    setScore(s)
    setPhase('score')
    if (choice.correct) onCorrect(s)
  }

  function handleMic() {
    if (listening) { stopSTT(); return }
    startSTT()
  }

  function handleTTS() {
    if (speaking) { stopTTS(); return }
    speak(step.npc)
  }

  return (
    <div className="coach-panel">
      {/* NPC dialogue */}
      <div className="panel-section npc-section">
        <div className="panel-label">Guest says</div>
        <div className="npc-name">
          <i className="fa-solid fa-user-circle" aria-hidden="true" /> Guest
        </div>
        <div className="npc-bubble">{step.npc}</div>
        <button className="tts-btn" onClick={handleTTS} aria-label={speaking ? 'Stop voice' : 'Play guest voice'}>
          <i className={`fa-solid ${speaking ? 'fa-stop' : 'fa-volume-high'}`} aria-hidden="true" />
          {speaking ? 'Stop' : 'Play guest voice'}
        </button>
      </div>

      {phase === 'dialogue' && (
        <>
          {/* Hint */}
          {step.hint && (
            <div className="hint-box">
              <i className="fa-solid fa-lightbulb" aria-hidden="true" />
              {step.hint}
            </div>
          )}

          {/* Input mode toggle */}
          <div className="panel-section">
            <div className="panel-label">Your response</div>
            <div className="mode-toggle">
              <button className={`mode-btn ${inputMode === 'choice' ? 'active' : ''}`} onClick={() => setInputMode('choice')}>
                <i className="fa-solid fa-list" aria-hidden="true" /> Choose
              </button>
              <button className={`mode-btn ${inputMode === 'speech' ? 'active' : ''}`} onClick={() => setInputMode('speech')}>
                <i className="fa-solid fa-microphone" aria-hidden="true" /> Speak
              </button>
            </div>
          </div>

          {inputMode === 'choice' ? (
            <div className="panel-section choices-section">
              {step.choices.map((c, i) => (
                <button key={i} className="choice-btn" onClick={() => pickChoice(c)}
                  disabled={selected !== null}>
                  <span className="choice-letter">{String.fromCharCode(65 + i)}</span>
                  {c.text}
                </button>
              ))}
            </div>
          ) : (
            <div className="panel-section speech-section">
              {!sttSupported && (
                <div className="stt-unsupported">
                  <i className="fa-solid fa-triangle-exclamation" aria-hidden="true" />
                  Speech recognition requires Chrome or Safari. Please use the choice mode.
                </div>
              )}
              {sttSupported && (
                <>
                  <button
                    className={`mic-ring ${listening ? 'recording' : ''}`}
                    onClick={handleMic}
                    aria-label={listening ? 'Stop recording' : 'Start recording'}
                  >
                    <i className={`fa-solid ${listening ? 'fa-stop' : 'fa-microphone'}`} aria-hidden="true" />
                  </button>
                  {listening && <Waveform />}
                  <div className="mic-hint">
                    {listening ? 'Listening… tap to stop' : 'Tap to record your response'}
                  </div>
                  {transcript && !listening && (
                    <div className="transcript-box">
                      <span className="transcript-label">You said:</span> {transcript}
                    </div>
                  )}
                  {sttError && (
                    <div className="stt-error">
                      <i className="fa-solid fa-circle-exclamation" aria-hidden="true" /> {sttError}
                    </div>
                  )}
                </>
              )}
            </div>
          )}
        </>
      )}

      {phase === 'score' && (
        <div className="panel-section score-section">
          <div className="panel-label">AI Coach feedback</div>
          <div className="score-row">
            <ScoreRing score={score} />
            <div className="score-breakdown">
              <div className={`score-result ${isCorrect ? 'pass' : 'fail'}`}>
                <i className={`fa-solid ${isCorrect ? 'fa-circle-check' : 'fa-circle-xmark'}`} aria-hidden="true" />
                {isCorrect ? 'Great response!' : 'Try again'}
              </div>
              {inputMode === 'speech' ? (
                (() => {
                  const correctOption = step.choices.find(c => c.correct)
                  const diff = computeSpeechDiff(lastTranscript, correctOption?.text || '')
                  return (
                    <div className="speech-diff-box">
                      <div className="diff-title">AI Pronunciation Alignment:</div>
                      <div className="diff-text">
                        {diff.correctWords.map((w, idx) => (
                          <span key={idx} className={`diff-word ${w.status}`}>
                            {w.text}{' '}
                          </span>
                        ))}
                      </div>
                      {diff.extraWords.length > 0 && (
                        <div className="diff-extra">
                          <span className="diff-extra-label">Extra spoken words:</span>{' '}
                          {diff.extraWords.map((w, idx) => (
                            <span key={idx} className="extra-word">
                              {w}{' '}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })()
              ) : (
                !isCorrect && (
                  <div className="correct-answer">
                    <div className="ca-label">Model answer:</div>
                    <div className="ca-text">{step.choices.find(c => c.correct)?.text}</div>
                  </div>
                )
              )}
              <div className="score-bars">
                {[
                  { label: 'Vocabulary', val: Math.min(100, score + 5) },
                  { label: 'Pronunciation', val: score },
                  { label: 'Tone', val: Math.min(100, score + 8) },
                ].map(b => (
                  <div key={b.label} className="score-bar-row">
                    <span className="sbar-label">{b.label}</span>
                    <div className="sbar-track">
                      <div className="sbar-fill" style={{
                        width: `${b.val}%`,
                        background: b.val >= 70 ? 'var(--teal-400)' : b.val >= 50 ? 'var(--amber-400)' : 'var(--red-400)'
                      }} />
                    </div>
                    <span className="sbar-val">{Math.min(100, b.val)}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={onNext}>
            {stepIndex + 1 < totalSteps
              ? <><i className="fa-solid fa-arrow-right" aria-hidden="true" /> Next step</>
              : <><i className="fa-solid fa-flag-checkered" aria-hidden="true" /> Finish mission</>
            }
          </button>
        </div>
      )}
    </div>
  )
}
