import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'

const DEFAULT_DATA = {
  promptverse: [
    { id: 1, name: 'Aditya Sharma', initials: 'AS', score: 980 },
    { id: 2, name: 'Priya Nair', initials: 'PN', score: 870 },
    { id: 3, name: 'Rohan Mehta', initials: 'RM', score: 810 },
    { id: 4, name: 'Sneha Patel', initials: 'SP', score: 740 },
    { id: 5, name: 'Kiran Rao', initials: 'KR', score: 690 },
    { id: 6, name: 'Divya Iyer', initials: 'DI', score: 640 },
    { id: 7, name: 'Arjun Verma', initials: 'AV', score: 580 },
    { id: 8, name: 'Meera Singh', initials: 'MS', score: 520 },
  ],
  blindcoding: [
    { id: 1, name: 'Varun Das', initials: 'VD', score: 950 },
    { id: 2, name: 'Ananya Kumar', initials: 'AK', score: 900 },
    { id: 3, name: 'Siddharth Joshi', initials: 'SJ', score: 840 },
    { id: 4, name: 'Tanvi Bhatt', initials: 'TB', score: 760 },
    { id: 5, name: 'Ravi Pillai', initials: 'RP', score: 710 },
    { id: 6, name: 'Nisha Reddy', initials: 'NR', score: 660 },
    { id: 7, name: 'Gautam Chopra', initials: 'GC', score: 600 },
    { id: 8, name: 'Pooja Menon', initials: 'PM', score: 545 },
  ],
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem('arena-state')
    return saved ? JSON.parse(saved) : JSON.parse(JSON.stringify(DEFAULT_DATA))
  })
  
  const [currentEvent, setCurrentEvent] = useState(() => {
    return localStorage.getItem('arena-event') || 'promptverse'
  })
  
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  // Persist state to localStorage
  useEffect(() => {
    localStorage.setItem('arena-state', JSON.stringify(state))
    localStorage.setItem('arena-event', currentEvent)
  }, [state, currentEvent])

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
    setState(prev => ({
      ...prev,
      [currentEvent]: prev[currentEvent].map(p =>
        p.id === participantId
          ? { ...p, score: Math.max(0, p.score + delta) }
          : p
      ),
    }))
  }

  const addParticipant = (name) => {
    const initials = name
      .trim()
      .split(' ')
      .map(w => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
    
    setState(prev => ({
      ...prev,
      [currentEvent]: [
        ...prev[currentEvent],
        {
          id: Date.now(),
          name: name.trim(),
          initials,
          score: 0,
        },
      ],
    }))
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
            <HomePage 
              participants={participants}
              currentEvent={currentEvent}
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
            <AdminPage 
              state={state}
              setState={setState}
              currentEvent={currentEvent}
              onEventSwitch={switchEvent}
              onUpdateScore={updateScore}
              onAddParticipant={addParticipant}
            />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
