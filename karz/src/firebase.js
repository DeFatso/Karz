// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAMSS5k-WlMViWZSHAz1zLl7Vo565puUi0",
    authDomain: "karz-14dc1.firebaseapp.com",
    projectId: "karz-14dc1",
    storageBucket: "karz-14dc1.firebasestorage.app",
    messagingSenderId: "718291976411",
    appId: "1:718291976411:web:ab5e60b8f0f6d1752d8cfe",
    measurementId: "G-WF9EJZB2GL"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
