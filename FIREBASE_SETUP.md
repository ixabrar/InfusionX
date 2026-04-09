# Firebase Setup Instructions

## Step 1: Create Firebase Project

1. Go to https://console.firebase.google.com/
2. Click **"Create Project"**
3. Enter project name: `mpulse-leaderboard`
4. Click **Create Project** (disable Google Analytics)
5. Wait for project to be created

## Step 2: Set Up Realtime Database

1. In Firebase Console, click **Realtime Database** (left menu)
2. Click **Create Database**
3. Choose location (closest to you)
4. Start in **Test mode** (for development)
5. Copy the database URL (looks like `https://mpulse-leaderboard.firebaseio.com`)

## Step 3: Get Firebase Config

1. In Firebase Console, click **Settings** (⚙ icon)
2. Click **Project Settings**
3. Scroll to **Your apps** section
4. Click **Web app** icon (or add if needed)
5. Copy the config object

## Step 4: Update Firebase Config

Edit `src/config/firebase.js` and replace the placeholder with your actual config:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  databaseURL: "https://YOUR_PROJECT.firebaseio.com",
  projectId: "YOUR_PROJECT",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
}
```

## Step 5: Set Database Rules

In Firebase Console > Realtime Database > Rules, paste:

```json
{
  "rules": {
    "participants": {
      ".read": true,
      ".write": true
    }
  }
}
```

**⚠️ WARNING:** This allows anyone to write. For production, use authentication!

## Step 6: Initialize Database

1. Run dev server: `npm run dev`
2. Go to http://localhost:5173/admin
3. Open browser DevTools Console (F12)
4. Paste this code:

```javascript
import { initializeEvent } from './src/services/firebaseService'

const blindCodingData = [
  { id: 1, name: "Siddhi Sarode", initials: "SS", score: 0 },
  { id: 2, name: "Arya Shetye", initials: "AS", score: 0 },
  // ... (all 30 participants)
];

const promptverseData = [
  { id: 1, name: "Sakshi Thombare", initials: "ST", score: 0 },
  { id: 2, name: "Steve Pinto", initials: "SP", score: 0 },
  // ... (all 49 participants)
];

initializeEvent('blindcoding', blindCodingData);
initializeEvent('promptverse', promptverseData);
```

## Done! ✅

Your leaderboard is now connected to Firebase and will work with concurrent users on Vercel!

**All changes:**
- Real-time updates across all users
- No need for separate API
- Scales automatically
- Free tier covers 100 concurrent connections
