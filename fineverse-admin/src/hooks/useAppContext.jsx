// src/hooks/useAppContext.jsx
import { createContext, useContext, useReducer, useEffect } from 'react'
import { MISSIONS_INITIAL, STUDENTS_INITIAL, CURRICULUM_INITIAL, VOCABULARIES_INITIAL, QUIZZES_INITIAL, SCENES_INITIAL } from '../data/store'
import { db, isFirebaseEnabled } from '../config/firebase'
import { collection, doc, setDoc, deleteDoc, onSnapshot, getDocs } from 'firebase/firestore'

const AppContext = createContext(null)

const MISSIONS_KEY = 'fineverse_admin_missions'
const STUDENTS_KEY = 'fineverse_admin_students'
const CURRICULUM_KEY = 'fineverse_admin_curriculum'
const VOCABULARIES_KEY = 'fineverse_admin_vocabularies'
const QUIZZES_KEY = 'fineverse_admin_quizzes'
const SCENES_KEY = 'fineverse_admin_scenes'

function loadInitialState() {
  try {
        const cachedMissions = localStorage.getItem(MISSIONS_KEY)
    const cachedStudents = localStorage.getItem(STUDENTS_KEY)
    const cachedCurriculum = localStorage.getItem(CURRICULUM_KEY)
    const cachedVocabularies = localStorage.getItem(VOCABULARIES_KEY)
    const cachedQuizzes = localStorage.getItem(QUIZZES_KEY)
    const cachedScenes = localStorage.getItem(SCENES_KEY)
    return {
      missions: cachedMissions ? JSON.parse(cachedMissions) : MISSIONS_INITIAL,
      students: cachedStudents ? JSON.parse(cachedStudents) : STUDENTS_INITIAL,
      curriculum: cachedCurriculum ? JSON.parse(cachedCurriculum) : CURRICULUM_INITIAL,
      vocabularies: cachedVocabularies ? JSON.parse(cachedVocabularies) : VOCABULARIES_INITIAL,
      quizzes: cachedQuizzes ? JSON.parse(cachedQuizzes) : QUIZZES_INITIAL,
      scenes: cachedScenes ? JSON.parse(cachedScenes) : SCENES_INITIAL,
      notification: null,
    }
  } catch {
    return {
      missions: MISSIONS_INITIAL,
      students: STUDENTS_INITIAL,
      curriculum: CURRICULUM_INITIAL,
      vocabularies: VOCABULARIES_INITIAL,
      quizzes: QUIZZES_INITIAL,
      scenes: SCENES_INITIAL,
      notification: null,
    }
  }
}

function reducer(state, action) {
  switch (action.type) {
    case 'SET_MISSIONS':
      return { ...state, missions: action.payload }
    case 'SET_STUDENTS':
      return { ...state, students: action.payload }
    case 'SET_CURRICULUM':
      return { ...state, curriculum: action.payload }
    case 'SET_VOCABULARIES':
      return { ...state, vocabularies: action.payload }
    case 'SET_QUIZZES':
      return { ...state, quizzes: action.payload }
    case 'SET_SCENES':
      return { ...state, scenes: action.payload }
    case 'ADD_MISSION':
      return { ...state, missions: [...state.missions, { ...action.payload, id: 'm' + Date.now() }] }
    case 'UPDATE_MISSION':
      return { ...state, missions: state.missions.map(m => m.id === action.payload.id ? action.payload : m) }
    case 'DELETE_MISSION':
      return { ...state, missions: state.missions.filter(m => m.id !== action.payload) }
    case 'ADD_STUDENT':
      return { ...state, students: [...state.students, { ...action.payload, id: 's' + Date.now() }] }
    case 'DELETE_STUDENT':
      return { ...state, students: state.students.filter(s => s.id !== action.payload) }
    case 'ADD_WEEK':
      return { ...state, curriculum: [...state.curriculum, { ...action.payload, id: 'w' + Date.now() }] }
    case 'UPDATE_WEEK':
      return { ...state, curriculum: state.curriculum.map(w => w.id === action.payload.id ? action.payload : w) }
    case 'DELETE_WEEK':
      return { ...state, curriculum: state.curriculum.filter(w => w.id !== action.payload) }
    case 'ADD_VOCABULARY':
      return { ...state, vocabularies: [...state.vocabularies, { ...action.payload, id: 'v' + Date.now() }] }
    case 'UPDATE_VOCABULARY':
      return { ...state, vocabularies: state.vocabularies.map(v => v.id === action.payload.id ? action.payload : v) }
    case 'DELETE_VOCABULARY':
      return { ...state, vocabularies: state.vocabularies.filter(v => v.id !== action.payload) }
    case 'ADD_QUIZ':
      return { ...state, quizzes: [...state.quizzes, { ...action.payload, id: 'q' + Date.now() }] }
    case 'UPDATE_QUIZ':
      return { ...state, quizzes: state.quizzes.map(q => q.id === action.payload.id ? action.payload : q) }
    case 'DELETE_QUIZ':
      return { ...state, quizzes: state.quizzes.filter(q => q.id !== action.payload) }
    case 'ADD_SCENE':
      return { ...state, scenes: [...state.scenes, { ...action.payload, id: 'scene_' + Date.now(), objects: action.payload.objects || [], hotspots: action.payload.hotspots || [], missionCount: 0, sessionCount: 0 }] }
    case 'UPDATE_SCENE':
      return { ...state, scenes: state.scenes.map(s => s.id === action.payload.id ? action.payload : s) }
    case 'DELETE_SCENE':
      return { ...state, scenes: state.scenes.filter(s => s.id !== action.payload) }
    case 'NOTIFY':
      return { ...state, notification: action.payload }
    case 'CLEAR_NOTIFY':
      return { ...state, notification: null }
    case 'RESET_DATA':
      return { 
        ...state, 
        missions: MISSIONS_INITIAL, 
        students: STUDENTS_INITIAL, 
        curriculum: CURRICULUM_INITIAL,
        vocabularies: VOCABULARIES_INITIAL,
        quizzes: QUIZZES_INITIAL,
        scenes: SCENES_INITIAL
      }
    default:
      return state
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadInitialState)

  // Sync to localStorage as local cache fallback
  useEffect(() => {
    try {
      localStorage.setItem(MISSIONS_KEY, JSON.stringify(state.missions))
      localStorage.setItem(STUDENTS_KEY, JSON.stringify(state.students))
      localStorage.setItem(CURRICULUM_KEY, JSON.stringify(state.curriculum))
      localStorage.setItem(VOCABULARIES_KEY, JSON.stringify(state.vocabularies))
      localStorage.setItem(QUIZZES_KEY, JSON.stringify(state.quizzes))
      localStorage.setItem(SCENES_KEY, JSON.stringify(state.scenes))
    } catch (e) {
      console.error('Failed to write to localStorage', e)
    }
  }, [state.missions, state.students, state.curriculum, state.vocabularies, state.quizzes, state.scenes])

  // Real-time Firestore sync
  useEffect(() => {
    if (!isFirebaseEnabled) return

    // 1. Listen to missions collection
    const unsubMissions = onSnapshot(collection(db, 'missions'), (snapshot) => {
      let missionsList = []
      snapshot.forEach(docSnap => {
        missionsList.push(docSnap.data())
      })
      
      // Seed initial missions if empty
      if (missionsList.length === 0) {
        MISSIONS_INITIAL.forEach(async (m) => {
          await setDoc(doc(db, 'missions', m.id), m)
        })
        missionsList = MISSIONS_INITIAL
      }
      
      dispatch({ type: 'SET_MISSIONS', payload: missionsList })
    })

    // 2. Listen to students collection
    const unsubStudents = onSnapshot(collection(db, 'students'), (snapshot) => {
      let studentsList = []
      snapshot.forEach(docSnap => {
        studentsList.push(docSnap.data())
      })
      
      // Seed initial students if empty
      if (studentsList.length === 0) {
        STUDENTS_INITIAL.forEach(async (s) => {
          await setDoc(doc(db, 'students', s.id), s)
        })
        studentsList = STUDENTS_INITIAL
      }

      dispatch({ type: 'SET_STUDENTS', payload: studentsList })
    })

    // 3. Listen to curriculum collection
    const unsubCurriculum = onSnapshot(collection(db, 'curriculum'), (snapshot) => {
      let curriculumList = []
      snapshot.forEach(docSnap => {
        curriculumList.push(docSnap.data())
      })
      
      // Seed initial curriculum if empty
      if (curriculumList.length === 0) {
        CURRICULUM_INITIAL.forEach(async (w) => {
          await setDoc(doc(db, 'curriculum', w.id), w)
        })
        curriculumList = CURRICULUM_INITIAL
      }

      dispatch({ type: 'SET_CURRICULUM', payload: curriculumList })
    })

    // 4. Listen to vocabularies collection
    const unsubVocabularies = onSnapshot(collection(db, 'vocabularies'), (snapshot) => {
      let vocabList = []
      snapshot.forEach(docSnap => {
        vocabList.push(docSnap.data())
      })
      
      // Seed initial vocabularies if empty
      if (vocabList.length === 0) {
        VOCABULARIES_INITIAL.forEach(async (v) => {
          await setDoc(doc(db, 'vocabularies', v.id), v)
        })
        vocabList = VOCABULARIES_INITIAL
      }

      dispatch({ type: 'SET_VOCABULARIES', payload: vocabList })
    })

    // 5. Listen to quizzes collection
    const unsubQuizzes = onSnapshot(collection(db, 'quizzes'), (snapshot) => {
      let quizList = []
      snapshot.forEach(docSnap => {
        quizList.push(docSnap.data())
      })
      
      // Seed initial quizzes if empty
      if (quizList.length === 0) {
        QUIZZES_INITIAL.forEach(async (q) => {
          await setDoc(doc(db, 'quizzes', q.id), q)
        })
        quizList = QUIZZES_INITIAL
      }

      dispatch({ type: 'SET_QUIZZES', payload: quizList })
    })

    // 6. Listen to scenes collection
    const unsubScenes = onSnapshot(collection(db, 'scenes'), (snapshot) => {
      let scenesList = []
      snapshot.forEach(docSnap => {
        scenesList.push(docSnap.data())
      })
      
      // Seed initial scenes if empty
      if (scenesList.length === 0) {
        SCENES_INITIAL.forEach(async (sc) => {
          await setDoc(doc(db, 'scenes', sc.id), sc)
        })
        scenesList = SCENES_INITIAL
      }

      dispatch({ type: 'SET_SCENES', payload: scenesList })
    })

    return () => {
      unsubMissions()
      unsubStudents()
      unsubCurriculum()
      unsubVocabularies()
      unsubQuizzes()
      unsubScenes()
    }
  }, [])

  // Firebase Firestore CRUD Action Interceptor
  const customDispatch = async (action) => {
    if (isFirebaseEnabled) {
      try {
        switch (action.type) {
          case 'ADD_MISSION': {
            const newId = 'm' + Date.now()
            const missionData = { ...action.payload, id: newId }
            await setDoc(doc(db, 'missions', newId), missionData)
            break
          }
          case 'UPDATE_MISSION': {
            await setDoc(doc(db, 'missions', action.payload.id), action.payload, { merge: true })
            break
          }
          case 'DELETE_MISSION': {
            await deleteDoc(doc(db, 'missions', action.payload))
            break
          }
          case 'ADD_STUDENT': {
            const newId = 's' + Date.now()
            const studentData = { ...action.payload, id: newId }
            await setDoc(doc(db, 'students', newId), studentData)
            break
          }
          case 'DELETE_STUDENT': {
            await deleteDoc(doc(db, 'students', action.payload))
            break
          }
          case 'ADD_WEEK': {
            const newId = 'w' + Date.now()
            const weekData = { ...action.payload, id: newId }
            await setDoc(doc(db, 'curriculum', newId), weekData)
            break
          }
          case 'UPDATE_WEEK': {
            await setDoc(doc(db, 'curriculum', action.payload.id), action.payload, { merge: true })
            break
          }
          case 'DELETE_WEEK': {
            await deleteDoc(doc(db, 'curriculum', action.payload))
            break
          }
          case 'ADD_VOCABULARY': {
            const newId = 'v' + Date.now()
            const vocabData = { ...action.payload, id: newId }
            await setDoc(doc(db, 'vocabularies', newId), vocabData)
            break
          }
          case 'UPDATE_VOCABULARY': {
            await setDoc(doc(db, 'vocabularies', action.payload.id), action.payload, { merge: true })
            break
          }
          case 'DELETE_VOCABULARY': {
            await deleteDoc(doc(db, 'vocabularies', action.payload))
            break
          }
          case 'ADD_QUIZ': {
            const newId = 'q' + Date.now()
            const quizData = { ...action.payload, id: newId }
            await setDoc(doc(db, 'quizzes', newId), quizData)
            break
          }
          case 'UPDATE_QUIZ': {
            await setDoc(doc(db, 'quizzes', action.payload.id), action.payload, { merge: true })
            break
          }
          case 'DELETE_QUIZ': {
            await deleteDoc(doc(db, 'quizzes', action.payload))
            break
          }
          case 'ADD_SCENE': {
            const newId = 'scene_' + Date.now()
            const sceneData = { ...action.payload, id: newId, objects: action.payload.objects || [], hotspots: action.payload.hotspots || [], missionCount: 0, sessionCount: 0 }
            await setDoc(doc(db, 'scenes', newId), sceneData)
            break
          }
          case 'UPDATE_SCENE': {
            await setDoc(doc(db, 'scenes', action.payload.id), action.payload, { merge: true })
            break
          }
          case 'DELETE_SCENE': {
            await deleteDoc(doc(db, 'scenes', action.payload))
            break
          }
          case 'RESET_DATA': {
            // Clean out current collections and seed defaults
            const missionsSnap = await getDocs(collection(db, 'missions'))
            for (const d of missionsSnap.docs) {
              await deleteDoc(d.ref)
            }
            const studentsSnap = await getDocs(collection(db, 'students'))
            for (const d of studentsSnap.docs) {
              await deleteDoc(d.ref)
            }
            const curriculumSnap = await getDocs(collection(db, 'curriculum'))
            for (const d of curriculumSnap.docs) {
              await deleteDoc(d.ref)
            }
            const vocabSnap = await getDocs(collection(db, 'vocabularies'))
            for (const d of vocabSnap.docs) {
              await deleteDoc(d.ref)
            }
            const quizSnap = await getDocs(collection(db, 'quizzes'))
            for (const d of quizSnap.docs) {
              await deleteDoc(d.ref)
            }
            const scenesSnap = await getDocs(collection(db, 'scenes'))
            for (const d of scenesSnap.docs) {
              await deleteDoc(d.ref)
            }
            
            for (const m of MISSIONS_INITIAL) {
              await setDoc(doc(db, 'missions', m.id), m)
            }
            for (const s of STUDENTS_INITIAL) {
              await setDoc(doc(db, 'students', s.id), s)
            }
            for (const w of CURRICULUM_INITIAL) {
              await setDoc(doc(db, 'curriculum', w.id), w)
            }
            for (const v of VOCABULARIES_INITIAL) {
              await setDoc(doc(db, 'vocabularies', v.id), v)
            }
            for (const q of QUIZZES_INITIAL) {
              await setDoc(doc(db, 'quizzes', q.id), q)
            }
            for (const sc of SCENES_INITIAL) {
              await setDoc(doc(db, 'scenes', sc.id), sc)
            }
            dispatch({ type: 'NOTIFY', payload: { type: 'success', message: 'Cloud database reset successfully.' } })
            break
          }
          default:
            dispatch(action)
        }
      } catch (err) {
        console.error('Firebase DB Error:', err)
        dispatch({ type: 'NOTIFY', payload: { type: 'danger', message: 'Cloud sync failed: ' + err.message } })
      }
    } else {
      // Local fallback
      dispatch(action)
    }
  }

  return (
    <AppContext.Provider value={{ state, dispatch: customDispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  return useContext(AppContext)
}

