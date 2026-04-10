import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import AdminLogin from './components/AdminLogin'
import NewEntriesPage from './pages/NewEntriesPage'
import {
  getParticipants,
  subscribeToParticipants,
  addParticipant as fbAddParticipant,
  updateScore as fbUpdateScore,
  resetAllPoints as fbResetAllPoints,
  removeParticipant as fbRemoveParticipant,
  initializeEvent,
} from './services/firebaseService'

const DEFAULT_DATA = {
  promptverse: [],
  blindcoding: [],
}

function AppContent() {
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  
  // Initialize state as empty - all data from Firebase based on URL
  const [state, setState] = useState({
    promptverse: [],
    blindcoding: [],
  })

  // Get current event STRICTLY from URL
  const [currentEvent, setCurrentEvent] = useState(() => {
    const path = location.pathname
    if (path === '/blindcoding') return 'blindcoding'
    if (path === '/promptverse') return 'promptverse'
    return 'promptverse' // default
  })

  const [scrollY, setScrollY] = useState(0)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  // Update currentEvent when URL changes - STRICT URL-ONLY MODE
  useEffect(() => {
    const path = location.pathname
    console.log('🔄 URL changed to:', path)
    
    if (path === '/blindcoding') {
      console.log('📍 Switching to blindcoding (from URL)')
      setCurrentEvent('blindcoding')
    } else if (path === '/promptverse') {
      console.log('📍 Switching to promptverse (from URL)')
      setCurrentEvent('promptverse')
    }
  }, [location.pathname])

  // Session timeout - logout after 30 minutes of inactivity (in-memory only)
  useEffect(() => {
    if (!isAdminAuthenticated) return

    let timeout
    const resetTimer = () => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        console.log('⏱️ Admin session timeout - logging out')
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
    console.log('📡 Subscribing to', currentEvent, 'participants...')
    setIsLoading(true)
    
    const unsubscribe = subscribeToParticipants(currentEvent, (participants) => {
      console.log(`✅ Received ${participants.length} participants for ${currentEvent}`)
      setState(prev => ({
        ...prev,
        [currentEvent]: participants
      }))
      setIsLoading(false)
    })

    return () => {
      console.log('🔌 Unsubscribing from', currentEvent)
      unsubscribe && unsubscribe()
    }
  }, [currentEvent])

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const switchEvent = (event) => {
    setCurrentEvent(event)
    setAdminDashboardOpen(false)
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

  // Add participant to any event (for NewEntriesPage)
  const addParticipantToEvent = (event, name) => {
    fbAddParticipant(event, name).catch(error => {
      console.error('Error adding participant:', error)
    })
  }

  const removeParticipant = (participantId) => {
    fbRemoveParticipant(currentEvent, participantId).catch(error => {
      console.error('Error removing participant:', error)
    })
  }

  const resetAllPoints = () => {
    fbResetAllPoints(currentEvent).catch(error => {
      console.error('Error resetting points:', error)
    })
  }

  const clearAllParticipants = () => {
    resetAllPoints()
  }

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />
  }

  return (
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
        path="/new-entries" 
        element={
          <NewEntriesPage 
            onAddParticipant={addParticipantToEvent}
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
              onRemoveParticipant={removeParticipant}
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
                  onRemoveParticipant={removeParticipant}
                  onResetPoints={resetAllPoints}
                  onClearAllParticipants={clearAllParticipants}
                />
              </div>
            </>
          )
        } 
      />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
