// Firebase App (the core Firebase SDK) is always required and must be listed first
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDR41Rt6B7Fw7h6fdsN_EGYxUMbmj1y2Es",
  authDomain: "ansic-dashboard.firebaseapp.com",
  projectId: "ansic-dashboard",
  storageBucket: "ansic-dashboard.firebasestorage.app",
  messagingSenderId: "147350435955",
  appId: "1:147350435955:web:7c926c5d6f32d605175206"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; 