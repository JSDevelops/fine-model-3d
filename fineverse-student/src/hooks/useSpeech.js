// src/hooks/useSpeech.js
// Web Speech API wrapper — Phase 2 real implementation

import { useState, useRef, useCallback, useEffect } from 'react'

const TTS_SUPPORTED = typeof window !== 'undefined' && 'speechSynthesis' in window
const STT_SUPPORTED = typeof window !== 'undefined' &&
  ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window)

/* ── Text-to-Speech ─────────────────────────────────────── */
export function useTTS() {
  const [speaking, setSpeaking] = useState(false)
  const utterRef = useRef(null)

  const speak = useCallback((text, { rate = 0.9, pitch = 1, lang = 'en-US' } = {}) => {
    if (!TTS_SUPPORTED) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.lang  = lang
    utter.rate  = rate
    utter.pitch = pitch

    // Prefer a female English voice if available
    const voices = window.speechSynthesis.getVoices()
    const preferred = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female'))
      || voices.find(v => v.lang.startsWith('en'))
    if (preferred) utter.voice = preferred

    utter.onstart = () => setSpeaking(true)
    utter.onend   = () => setSpeaking(false)
    utter.onerror = () => setSpeaking(false)
    utterRef.current = utter
    window.speechSynthesis.speak(utter)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
    setSpeaking(false)
  }, [])

  useEffect(() => () => window.speechSynthesis.cancel(), [])

  return { speak, stop, speaking, supported: TTS_SUPPORTED }
}

/* ── Speech-to-Text ─────────────────────────────────────── */
export function useSTT() {
  const [transcript, setTranscript] = useState('')
  const [listening, setListening] = useState(false)
  const [error, setError] = useState(null)
  const recognitionRef = useRef(null)

  const start = useCallback(() => {
    if (!STT_SUPPORTED) {
      setError('Speech recognition not supported in this browser.')
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const rec = new SpeechRecognition()
    rec.lang = 'en-US'
    rec.interimResults = true
    rec.maxAlternatives = 1
    rec.continuous = false

    rec.onstart = () => { setListening(true); setError(null); setTranscript('') }
    rec.onresult = (e) => {
      const t = Array.from(e.results).map(r => r[0].transcript).join(' ')
      setTranscript(t)
    }
    rec.onerror  = (e) => { setError(e.error); setListening(false) }
    rec.onend    = () => setListening(false)

    recognitionRef.current = rec
    rec.start()
  }, [])

  const stop = useCallback(() => {
    recognitionRef.current?.stop()
    setListening(false)
  }, [])

  useEffect(() => () => recognitionRef.current?.abort(), [])

  return { start, stop, transcript, listening, error, supported: STT_SUPPORTED }
}

/* ── Score calculator — compare transcript vs correct answer ─ */
export function scoreTranscript(transcript, correctText, keywords = []) {
  if (!transcript) return 0
  const t = transcript.toLowerCase()
  const correct = correctText.toLowerCase()

  // Keyword hit rate
  const kwHits = keywords.filter(kw => t.includes(kw.toLowerCase())).length
  const kwScore = keywords.length ? (kwHits / keywords.length) * 100 : 60

  // Word overlap with correct answer
  const tWords = new Set(t.replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean))
  const cWords = correct.replace(/[^a-z\s]/g, '').split(/\s+/).filter(Boolean)
  const overlap = cWords.filter(w => tWords.has(w)).length
  const overlapScore = cWords.length ? (overlap / cWords.length) * 100 : 0

  const raw = kwScore * 0.5 + overlapScore * 0.5
  return Math.min(100, Math.max(0, Math.round(raw)))
}

/* ── Speech Align Diff (LCS algorithm) ──────────────────── */
export function computeSpeechDiff(transcript, correctText) {
  if (!transcript) {
    return {
      correctWords: correctText.split(/\s+/).map(w => ({ text: w, status: 'miss' })),
      extraWords: []
    }
  }

  const clean = w => w.toLowerCase().replace(/[^a-z0-9]/g, '')

  const tWords = transcript.split(/\s+/).map(w => ({ raw: w, clean: clean(w) })).filter(x => x.clean)
  const cWords = correctText.split(/\s+/).map(w => ({ raw: w, clean: clean(w) }))

  const n = cWords.length
  const m = tWords.length
  const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      if (cWords[i - 1].clean === tWords[j - 1].clean) {
        dp[i][j] = dp[i - 1][j - 1] + 1
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1])
      }
    }
  }

  const alignedCorrect = []
  const matchedTranscriptIndices = new Set()
  let i = n, j = m
  while (i > 0 && j > 0) {
    if (cWords[i - 1].clean === tWords[j - 1].clean) {
      alignedCorrect.push({ index: i - 1, status: 'match', text: cWords[i - 1].raw })
      matchedTranscriptIndices.add(j - 1)
      i--
      j--
    } else if (dp[i - 1][j] >= dp[i][j - 1]) {
      alignedCorrect.push({ index: i - 1, status: 'miss', text: cWords[i - 1].raw })
      i--
    } else {
      j--
    }
  }
  while (i > 0) {
    alignedCorrect.push({ index: i - 1, status: 'miss', text: cWords[i - 1].raw })
    i--
  }

  alignedCorrect.reverse()

  const extraWords = tWords
    .filter((_, idx) => !matchedTranscriptIndices.has(idx))
    .map(x => x.raw)

  return {
    correctWords: alignedCorrect,
    extraWords
  }
}

