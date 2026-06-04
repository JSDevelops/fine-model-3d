// src/config/firebase.js
import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

// Fallback to local emulator config if no real API key is set
const isPlaceholder = !firebaseConfig.apiKey || 
                      firebaseConfig.apiKey.includes('your_key') || 
                      firebaseConfig.apiKey === '';

const useEmulator = import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true' || isPlaceholder;

const actualConfig = useEmulator ? {
  apiKey: 'fake-api-key-for-local-emulator',
  authDomain: 'fineverse-local.firebaseapp.com',
  projectId: 'fineverse-local',
  storageBucket: 'fineverse-local.appspot.com',
  messagingSenderId: '123456789',
  appId: '1:123456789:web:fakeapp'
} : firebaseConfig;

let app
let auth
let db
let isFirebaseEnabled = false

try {
  app = getApps().length === 0 ? initializeApp(actualConfig) : getApp()
  auth = getAuth(app)
  db = getFirestore(app)
  isFirebaseEnabled = true

  if (useEmulator) {
    try {
      console.log('Firebase running in LOCAL EMULATOR mode (Firestore port 8080, Auth port 9099).');
      connectFirestoreEmulator(db, '127.0.0.1', 8080);
      connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true });
    } catch (e) {
      // Catch "already connected" errors on Vite hot-reloads
      console.warn('Firebase emulator connection warning (expected during hot reloads):', e.message);
    }
  } else {
    console.log('Firebase initialized successfully with production credentials.');
  }
} catch (error) {
  console.error('Firebase initialization failed:', error)
}

export { app, auth, db, isFirebaseEnabled }

