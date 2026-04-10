import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// Your Firebase config - Get this from Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyCajLb3CWhcvPOhp6YLr099nUXqYxCCwNs",
  authDomain: "infusionx-leaderboard.firebaseapp.com",
  projectId: "infusionx-leaderboard",
  databaseURL: "https://infusionx-leaderboard-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: "infusionx-leaderboard.firebasestorage.app",
  messagingSenderId: "183844449168",
  appId: "1:183844449168:web:d1066b7cdfd227cd596115",
  measurementId: "G-LE791EG99C"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Get reference to the database
export const db = getDatabase(app)
