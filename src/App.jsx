import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import LoadingScreen from './components/LoadingScreen'
import HomePage from './pages/HomePage'
import AdminPage from './pages/AdminPage'
import AdminLogin from './components/AdminLogin'

const DEFAULT_DATA = {
  promptverse: [
    { id: 1, name: 'Sakshi Thombare', initials: 'ST', score: 0 },
    { id: 2, name: 'Steve Pinto', initials: 'SP', score: 0 },
    { id: 3, name: 'Saloni Khatal', initials: 'SK', score: 0 },
    { id: 4, name: 'Shital Godse', initials: 'SG', score: 0 },
    { id: 5, name: 'Varun Upadhye', initials: 'VU', score: 0 },
    { id: 6, name: 'Mansi Patil', initials: 'MP', score: 0 },
    { id: 7, name: 'Suraj Pingle', initials: 'SP', score: 0 },
    { id: 8, name: 'Vikas Gayke', initials: 'VG', score: 0 },
    { id: 9, name: 'Aryan Chavan', initials: 'AC', score: 0 },
    { id: 10, name: 'Raman Rajhans', initials: 'RR', score: 0 },
    { id: 11, name: 'Revati Mirapurkar', initials: 'RM', score: 0 },
    { id: 12, name: 'Soham Nemade', initials: 'SN', score: 0 },
    { id: 13, name: 'Om Pachpande', initials: 'OP', score: 0 },
    { id: 14, name: 'Anvi Shete', initials: 'AS', score: 0 },
    { id: 15, name: 'Arjun Sul', initials: 'AS', score: 0 },
    { id: 16, name: 'Jason Dennis', initials: 'JD', score: 0 },
    { id: 17, name: 'Kajal Karande', initials: 'KK', score: 0 },
    { id: 18, name: 'Amol Walzade', initials: 'AW', score: 0 },
    { id: 19, name: 'Arya Manalwar', initials: 'AM', score: 0 },
    { id: 20, name: 'Aditya Sahane', initials: 'AS', score: 0 },
    { id: 21, name: 'Sangaramsinh Deshmukh', initials: 'SD', score: 0 },
    { id: 22, name: 'Vishakha Unhale', initials: 'VU', score: 0 },
    { id: 23, name: 'Siddhi Sarode', initials: 'SS', score: 0 },
    { id: 24, name: 'Dipesh Ahire', initials: 'DA', score: 0 },
    { id: 25, name: 'Abhishek Ganesh Jadhav', initials: 'AJ', score: 0 },
    { id: 26, name: 'Manas Gaikwad', initials: 'MG', score: 0 },
    { id: 27, name: 'Sahil Bhor', initials: 'SB', score: 0 },
    { id: 28, name: 'Adwait Bhalerao', initials: 'AB', score: 0 },
    { id: 29, name: 'Samiksha Raut', initials: 'SR', score: 0 },
    { id: 30, name: 'Shivani Ghavate', initials: 'SG', score: 0 },
    { id: 31, name: 'Ujjwal Dinesh Yadav', initials: 'UY', score: 0 },
    { id: 32, name: 'Piyush Sonawane', initials: 'PS', score: 0 },
    { id: 33, name: 'Nikhil Patil', initials: 'NP', score: 0 },
    { id: 34, name: 'Madhura Patil', initials: 'MP', score: 0 },
    { id: 35, name: 'Sarthak Jadhav', initials: 'SJ', score: 0 },
    { id: 36, name: 'Anand Jain', initials: 'AJ', score: 0 },
    { id: 37, name: 'Tanisha Dhopte', initials: 'TD', score: 0 },
    { id: 38, name: 'Raj Fulsundar', initials: 'RF', score: 0 },
    { id: 39, name: 'Ansh Pandey', initials: 'AP', score: 0 },
    { id: 40, name: 'Siddhant Birajdar', initials: 'SB', score: 0 },
    { id: 41, name: 'Laxmi Birajdar', initials: 'LB', score: 0 },
    { id: 42, name: 'Yash Sharma', initials: 'YS', score: 0 },
    { id: 43, name: 'Prathamesh Devkar', initials: 'PD', score: 0 },
    { id: 44, name: 'Bhushan Kshirsagar', initials: 'BK', score: 0 },
    { id: 45, name: 'Tyagi Jain', initials: 'TJ', score: 0 },
    { id: 46, name: 'Viraj Ohal', initials: 'VO', score: 0 },
    { id: 47, name: 'Suyog Sudhir Sawji', initials: 'SS', score: 0 },
    { id: 48, name: 'Vaishnavi More', initials: 'VM', score: 0 },
    { id: 49, name: 'Om Naidu', initials: 'ON', score: 0 },
  ],
  blindcoding: [
    { id: 1, name: 'Siddhi Sarode', initials: 'SS', score: 0 },
    { id: 2, name: 'Arya Shetye', initials: 'AS', score: 0 },
    { id: 3, name: 'Kajal Patil', initials: 'KP', score: 0 },
    { id: 4, name: 'Rohit Meel', initials: 'RM', score: 0 },
    { id: 5, name: 'Abhishek Nimbalkar', initials: 'AN', score: 0 },
    { id: 6, name: 'Om Ghodekar', initials: 'OG', score: 0 },
    { id: 7, name: 'Nishta Patil', initials: 'NP', score: 0 },
    { id: 8, name: 'Nikita Lavange', initials: 'NL', score: 0 },
    { id: 9, name: 'Vinit Paratane', initials: 'VP', score: 0 },
    { id: 10, name: 'Prasanna Burli', initials: 'PB', score: 0 },
    { id: 11, name: 'Aditya Satav', initials: 'AS', score: 0 },
    { id: 12, name: 'Raj Jogawade', initials: 'RJ', score: 0 },
    { id: 13, name: 'Sarthak Kundale', initials: 'SK', score: 0 },
    { id: 14, name: 'Vedant Mhaske', initials: 'VM', score: 0 },
    { id: 15, name: 'Abhishek Jawale', initials: 'AJ', score: 0 },
    { id: 16, name: 'Sanskar Dhamale', initials: 'SD', score: 0 },
    { id: 17, name: 'Meghana Konde', initials: 'MK', score: 0 },
    { id: 18, name: 'Saurabh Sharma', initials: 'SS', score: 0 },
    { id: 19, name: 'Ayush Pawar', initials: 'AP', score: 0 },
    { id: 20, name: 'Zeeshan Altaf Jagirdar', initials: 'ZJ', score: 0 },
    { id: 21, name: 'Bhavik Mahalle', initials: 'BM', score: 0 },
    { id: 22, name: 'Krrish Pardeshi', initials: 'KP', score: 0 },
    { id: 23, name: 'Sarthak Jadhav', initials: 'SJ', score: 0 },
    { id: 24, name: 'Abhishek Kalimath', initials: 'AK', score: 0 },
    { id: 25, name: 'Ruchita Suryawanshi', initials: 'RS', score: 0 },
    { id: 26, name: 'Shreyas Dambalkar', initials: 'SD', score: 0 },
    { id: 27, name: 'Sanket Devhare', initials: 'SD', score: 0 },
    { id: 28, name: 'Chaitanya Kulkarni', initials: 'CK', score: 0 },
    { id: 29, name: 'Adesh Phadtare', initials: 'AP', score: 0 },
    { id: 30, name: 'Prathamesh Devkar', initials: 'PD', score: 0 },
  ],
}

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [state, setState] = useState(() => {
    // Always use fresh DEFAULT_DATA - clears localStorage automatically with updated scores
    return JSON.parse(JSON.stringify(DEFAULT_DATA))
  })
  
  const [currentEvent, setCurrentEvent] = useState(() => {
    return localStorage.getItem('arena-event') || 'promptverse'
  })
  
  const [adminDashboardOpen, setAdminDashboardOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(() => {
    return localStorage.getItem('admin-auth') === 'true'
  })

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
            isAdminAuthenticated ? (
              <AdminPage 
                state={state}
                setState={setState}
                currentEvent={currentEvent}
                onEventSwitch={switchEvent}
                onUpdateScore={updateScore}
                onAddParticipant={addParticipant}
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
