// src/hooks/useProgress.jsx
import { createContext, useContext, useReducer, useEffect, useState } from 'react'
import { INITIAL_PROGRESS, CURRICULUM_INITIAL, VOCABULARIES_INITIAL, QUIZZES_INITIAL, MISSIONS, SCENES } from '../data/missions'
import { auth, db, isFirebaseEnabled } from '../config/firebase'
import { doc, getDoc, setDoc, collection, onSnapshot } from 'firebase/firestore'

const ProgressContext = createContext(null)

const STORAGE_KEY = 'fineverse_progress'

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : INITIAL_PROGRESS
  } catch {
    return INITIAL_PROGRESS
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PROGRESS':
      return {
        ...state,
        completedMissions: action.payload.completedMissions || [],
        scores: action.payload.scores || {},
        currentMission: action.payload.currentMission || null,
        currentStep: action.payload.currentStep || 0,
      }
    case 'SET_MISSION':
      return { ...state, currentMission: action.payload, currentStep: 0 }
    case 'NEXT_STEP':
      return { ...state, currentStep: state.currentStep + 1 }
    case 'COMPLETE_MISSION': {
      const { missionId, score } = action.payload
      const completed = state.completedMissions.includes(missionId)
        ? state.completedMissions
        : [...state.completedMissions, missionId]
      return {
        ...state,
        completedMissions: completed,
        scores: { ...state.scores, [missionId]: Math.max(state.scores[missionId] ?? 0, score) },
        currentMission: null,
        currentStep: 0,
      }
    }
    case 'RESET_MISSION':
      return { ...state, currentStep: 0 }
    case 'EXIT_MISSION':
      return { ...state, currentMission: null, currentStep: 0 }
    case 'LOGOUT':
      return INITIAL_PROGRESS
    default:
      return state
  }
}

export function ProgressProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, load)
  const [user, setUser] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  // Real-time Content States (Admin synced)
  const [curriculum, setCurriculum] = useState(CURRICULUM_INITIAL)
  const [vocabularies, setVocabularies] = useState(VOCABULARIES_INITIAL)
  const [quizzes, setQuizzes] = useState(QUIZZES_INITIAL)
  const [missions, setMissions] = useState(MISSIONS)
  const [scenes, setScenes] = useState(SCENES)

  // Listen to Auth State & Content Subscriptions
  useEffect(() => {
    // 1. Initial local user loading
    const localUser = localStorage.getItem('fineverse_local_user')
    if (localUser) {
      setUser(JSON.parse(localUser))
    }

    let unsubMissions = () => {}
    let unsubScenes = () => {}
    let unsubCurriculum = () => {}
    let unsubVocab = () => {}
    let unsubQuizzes = () => {}

    // 2. Firebase listeners (if enabled)
    if (isFirebaseEnabled) {
      setAuthLoading(true)
      const unsubscribeAuth = auth.onAuthStateChanged(async (currentUser) => {
        if (currentUser) {
          setUser(currentUser)
          localStorage.removeItem('fineverse_local_user') // Clear local guest to prioritize real account
          
          // Load student progress from Firestore
          try {
            const docRef = doc(db, 'students', currentUser.uid)
            const docSnap = await getDoc(docRef)
            
            if (docSnap.exists()) {
              const data = docSnap.data()
              dispatch({
                type: 'SET_PROGRESS',
                payload: {
                  completedMissions: data.completedMissions || [],
                  scores: data.scores || {},
                  currentMission: data.currentMission || null,
                  currentStep: data.currentStep || 0,
                }
              })
            }
          } catch (e) {
            console.error('Error fetching progress from Firestore:', e)
          }
        } else {
          // If logged out from Firebase, check if guest still exists in localStorage
          const guestUser = localStorage.getItem('fineverse_local_user')
          if (guestUser) {
            setUser(JSON.parse(guestUser))
          } else {
            setUser(null)
          }
        }
        setAuthLoading(false)
      })

      // Subscribe to real-time missions collection
      unsubMissions = onSnapshot(collection(db, 'missions'), (snapshot) => {
        let list = []
        snapshot.forEach(d => {
          const missionData = d.data()
          if (missionData && !Array.isArray(missionData.steps)) {
            const count = Number(missionData.steps) || 3
            missionData.steps = Array.from({ length: count }).map((_, i) => ({
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
          list.push(missionData)
        })
        if (list.length > 0) {
          setMissions(list)
        }
      })

      // Subscribe to real-time scenes collection
      unsubScenes = onSnapshot(collection(db, 'scenes'), (snapshot) => {
        let list = []
        snapshot.forEach(d => list.push(d.data()))
        if (list.length > 0) {
          setScenes(list)
        }
      })

      // Subscribe to real-time curriculum collection
      unsubCurriculum = onSnapshot(collection(db, 'curriculum'), (snapshot) => {
        let list = []
        snapshot.forEach(d => list.push(d.data()))
        if (list.length > 0) {
          setCurriculum(list.sort((a, b) => a.week - b.week))
        }
      })

      // Subscribe to real-time vocabularies collection
      unsubVocab = onSnapshot(collection(db, 'vocabularies'), (snapshot) => {
        let list = []
        snapshot.forEach(d => list.push(d.data()))
        if (list.length > 0) {
          setVocabularies(list)
        }
      })

      // Subscribe to real-time quizzes collection
      unsubQuizzes = onSnapshot(collection(db, 'quizzes'), (snapshot) => {
        let list = []
        snapshot.forEach(d => list.push(d.data()))
        if (list.length > 0) {
          setQuizzes(list)
        }
      })

      return () => {
        unsubscribeAuth()
        unsubMissions()
        unsubScenes()
        unsubCurriculum()
        unsubVocab()
        unsubQuizzes()
      }
    } else {
      setAuthLoading(false)
    }
  }, [])

  // Sync state modifications to Firestore or localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

    async function syncProgress() {
      if (isFirebaseEnabled && user && !user.isGuest) {
        try {
          const completedCount = state.completedMissions.length
          const avgScore = completedCount
            ? Math.round(Object.values(state.scores).reduce((a, b) => a + b, 0) / completedCount)
            : 0

          const docRef = doc(db, 'students', user.uid)
          await setDoc(docRef, {
            completedMissions: state.completedMissions,
            scores: state.scores,
            currentMission: state.currentMission || null,
            currentStep: state.currentStep || 0,
            avgScore: avgScore,
            sessions: completedCount + (state.currentMission ? 1 : 0),
            lastActive: 'Today'
          }, { merge: true })
        } catch (e) {
          console.error('Error syncing progress to Firestore:', e)
        }
      }
    }
    syncProgress()
  }, [state, user])

  const logout = async () => {
    localStorage.removeItem('fineverse_local_user')
    localStorage.removeItem(STORAGE_KEY)
    setUser(null)
    dispatch({ type: 'LOGOUT' })
    if (isFirebaseEnabled) {
      await auth.signOut()
    }
  }

  return (
    <ProgressContext.Provider value={{ state, dispatch, user, setUser, authLoading, logout, curriculum, vocabularies, quizzes, missions, scenes }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  return useContext(ProgressContext)
}

