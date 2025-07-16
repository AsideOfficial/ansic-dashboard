// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDR41Rt6B7Fw7h6fdsN_EGYxUMbmj1y2Es",
  authDomain: "ansic-dashboard.firebaseapp.com",
  projectId: "ansic-dashboard",
  storageBucket: "ansic-dashboard.firebasestorage.app",
  messagingSenderId: "147350435955",
  appId: "1:147350435955:web:7c926c5d6f32d605175206"
};

// Firebase 앱 초기화
const app = initializeApp(firebaseConfig);

// Firestore 인스턴스 생성
export const db = getFirestore(app);

console.log('Firebase initialized with project:', firebaseConfig.projectId); 