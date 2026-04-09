import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import AdminLogin from './components/AdminLogin'
import {
  getParticipants,
  subscribeToParticipants,
  addParticipant as fbAddParticipant,
  updateScore as fbUpdateScore,
  resetAllPoints as fbResetAllPoints,
  initializeEvent,
} from './services/firebaseService'

const DEFAULT_DATA = {
  promptverse: [],
  blindcoding: [],
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('arena-state')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.error('Failed to parse saved state:', e)
        return { promptverse: [], blindcoding: [] }
      }
    }
    return { promptverse: [], blindcoding: [] }
  })

  const [currentEvent, setCurrentEvent] = useState(() => {
    return localStorage.getItem('arena-event') || 'promptverse'
  })

  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('admin-auth') === 'true'
  })

  // Monitor localStorage changes and sync auth state
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAdminAuthenticated(localStorage.getItem('admin-auth') === 'true')
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Session timeout - logout after 30 minutes of inactivity
  useEffect(() => {
    if (!isAdminAuthenticated) return

    let timeout
    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        localStorage.removeItem('admin-auth')
        localStorage.removeItem('admin-login-time')
        setIsAdminAuthenticated(false)
      }, 30 * 60 * 1000) // 30 minutes
    }

    // Set initial timeout
    resetTimer()

    // Reset timeout on user activity
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart']
    events.forEach(event => window.addEventListener(event, resetTimer))

    return () => {
      clearTimeout(timeout)
      events.forEach(event => window.removeEventListener(event, resetTimer))
    }
  }, [isAdminAuthenticated])

  // Subscribe to Firebase updates for current event
  useEffect(() => {
    setIsLoading(true)
    const unsubscribe = subscribeToParticipants(currentEvent, (participants) => {
      setState(prev => ({
        ...prev,
        [currentEvent]: participants
      }))
      setIsLoading(false)
    })

    return () => unsubscribe && unsubscribe()
  }, [currentEvent])

  // Persist state to localStorage as backup

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const getParticipants = () => {
    return [...state[currentEvent]].sort((a, b) => b.score - a.score)
  }

  const switchEvent = (event) => {
    setCurrentEvent(event)
    setAdminOpen(false)
  }

  const updateScore = (participantId, delta) => {
    const participant = state[currentEvent].find(p => p.id === participantId)
    if (participant) {
      const newScore = Math.max(0, participant.score + delta)
      fbUpdateScore(currentEvent, participantId, newScore).catch(error => {
        console.error('Error updating score:', error)
      })
    }
  }

  const addParticipant = (name) => {
    fbAddParticipant(currentEvent, name).catch(error => {
      console.error('Error adding participant:', error)
    })
  }

  const resetAllPoints = () => {
    fbResetAllPoints(currentEvent).catch(error => {
      console.error('Error resetting points:', error)
    })
  }

  const clearAllParticipants = () => {
    // This would require a function to delete all participants
    // For now, just reset all points
    resetAllPoints()
  }

  const participants = getParticipants()

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <Navigate to="/promptverse" replace />
          } 
        />
        <Route 
          path="/promptverse" 
          element={
            <HomePage 
              participants={state.promptverse}
              currentEvent="promptverse"
              onSwitchEvent={switchEvent}
              onUpdateScore={updateScore}
              onAddParticipant={addParticipant}
              state={state}
              scrollY={scrollY}
            />
          } 
        />
        <Route 
          path="/blindcoding" 
          element={
            <HomePage 
              participants={state.blindcoding}
              currentEvent="blindcoding"
              onSwitchEvent={switchEvent}
              onUpdateScore={updateScore}
              onAddParticipant={addParticipant}
              state={state}
              scrollY={scrollY}
            />
          } 
        />
        <Route 
          path="/admin" 
          element={
            isAdminAuthenticated ? (
              <AdminPage 
                state={state}
                setState={setState}
                currentEvent={currentEvent}
                onEventSwitch={switchEvent}
                onUpdateScore={updateScore}
                onAddParticipant={addParticipant}
                onResetPoints={resetAllPoints}
                onClearAllParticipants={clearAllParticipants}
              />
            ) : (
              <>
                <AdminLogin 
                  onLoginSuccess={() => setIsAdminAuthenticated(true)}
                />
                {/* Render admin page behind login */}
                <div style={{ visibility: 'hidden', position: 'absolute' }}>
                  <AdminPage 
                    state={state}
                    setState={setState}
                    currentEvent={currentEvent}
                    onEventSwitch={switchEvent}
                    onUpdateScore={updateScore}
                    onAddParticipant={addParticipant}
                    onResetPoints={resetAllPoints}
                    onClearAllParticipants={clearAllParticipants}
                  />
                </div>
              </>
            )
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
