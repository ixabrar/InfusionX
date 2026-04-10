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
    { id: 6, name: 'Mansi Patil', initials: 'MP', score: 900 },
    { id: 7, name: 'Suraj Pingle', initials: 'SP', score: 890 },
    { id: 8, name: 'Vikas Gayke', initials: 'VG', score: 880 },
    { id: 9, name: 'Aryan Chavan', initials: 'AC', score: 870 },
    { id: 10, name: 'Raman Rajhans', initials: 'RR', score: 860 },
    { id: 11, name: 'Revati Mirapurkar', initials: 'RM', score: 850 },
    { id: 12, name: 'Soham Nemade', initials: 'SN', score: 840 },
    { id: 13, name: 'Om Pachpande', initials: 'OP', score: 830 },
    { id: 14, name: 'Anvi Shete', initials: 'AS', score: 820 },
    { id: 15, name: 'Arjun Sul', initials: 'AS', score: 810 },
    { id: 16, name: 'Jason Dennis', initials: 'JD', score: 0 },
    { id: 17, name: 'Kajal Karande', initials: 'KK', score: 800 },
    { id: 18, name: 'Amol Walzade', initials: 'AW', score: 790 },
    { id: 19, name: 'Arya Manalwar', initials: 'AM', score: 780 },
    { id: 20, name: 'Aditya Sahane', initials: 'AS', score: 770 },
    { id: 21, name: 'Sangaramsinh Deshmukh', initials: 'SD', score: 760 },
    { id: 22, name: 'Vishakha Unhale', initials: 'VU', score: 750 },
    { id: 23, name: 'Siddhi Sarode', initials: 'SS', score: 740 },
    { id: 24, name: 'Dipesh Ahire', initials: 'DA', score: 730 },
    { id: 25, name: 'Abhishek Ganesh Jadhav', initials: 'AJ', score: 720 },
    { id: 26, name: 'Manas Gaikwad', initials: 'MG', score: 710 },
    { id: 27, name: 'Sahil Bhor', initials: 'SB', score: 700 },
    { id: 28, name: 'Adwait Bhalerao', initials: 'AB', score: 690 },
    { id: 29, name: 'Samiksha Raut', initials: 'SR', score: 680 },
    { id: 30, name: 'Shivani Ghavate', initials: 'SG', score: 670 },
    { id: 31, name: 'Ujjwal Dinesh Yadav', initials: 'UY', score: 660 },
    { id: 32, name: 'Piyush Sonawane', initials: 'PS', score: 650 },
    { id: 33, name: 'Nikhil Patil', initials: 'NP', score: 640 },
    { id: 34, name: 'Madhura Patil', initials: 'MP', score: 630 },
    { id: 35, name: 'Sarthak Jadhav', initials: 'SJ', score: 620 },
    { id: 36, name: 'Anand Jain', initials: 'AJ', score: 610 },
    { id: 37, name: 'Tanisha Dhopte', initials: 'TD', score: 600 },
    { id: 38, name: 'Raj Fulsundar', initials: 'RF', score: 590 },
    { id: 39, name: 'Ansh Pandey', initials: 'AP', score: 580 },
    { id: 40, name: 'Siddhant Birajdar', initials: 'SB', score: 570 },
    { id: 41, name: 'Laxmi Birajdar', initials: 'LB', score: 560 },
    { id: 42, name: 'Yash Sharma', initials: 'YS', score: 550 },
    { id: 43, name: 'Prathamesh Devkar', initials: 'PD', score: 540 },
    { id: 44, name: 'Bhushan Kshirsagar', initials: 'BK', score: 0 },
    { id: 45, name: 'Tyagi Jain', initials: 'TJ', score: 0 },
    { id: 46, name: 'Viraj Ohal', initials: 'VO', score: 530 },
    { id: 47, name: 'Suyog Sudhir Sawji', initials: 'SS', score: 520 },
    { id: 48, name: 'Vaishnavi More', initials: 'VM', score: 510 },
    { id: 49, name: 'Om Naidu', initials: 'ON', score: 500 },
  ],
  blindcoding: [
    { id: 1, name: 'Siddhi Sarode', initials: 'SS', score: 2210 },
    { id: 2, name: 'Arya Shetye', initials: 'AS', score: 935 },
    { id: 3, name: 'Kajal Patil', initials: 'KP', score: 920 },
    { id: 4, name: 'Rohit Meel', initials: 'RM', score: 905 },
    { id: 5, name: 'Abhishek Nimbalkar', initials: 'AN', score: 890 },
    { id: 6, name: 'Om Ghodekar', initials: 'OG', score: 875 },
    { id: 7, name: 'Nishta Patil', initials: 'NP', score: 860 },
    { id: 8, name: 'Nikita Lavange', initials: 'NL', score: 845 },
    { id: 9, name: 'Vinit Paratane', initials: 'VP', score: 830 },
    { id: 10, name: 'Prasanna Burli', initials: 'PB', score: 815 },
    { id: 11, name: 'Aditya Satav', initials: 'AS', score: 800 },
    { id: 12, name: 'Raj Jogawade', initials: 'RJ', score: 785 },
    { id: 13, name: 'Sarthak Kundale', initials: 'SK', score: 770 },
    { id: 14, name: 'Vedant Mhaske', initials: 'VM', score: 755 },
    { id: 15, name: 'Abhishek Jawale', initials: 'AJ', score: 740 },
    { id: 16, name: 'Sanskar Dhamale', initials: 'SD', score: 725 },
    { id: 17, name: 'Meghana Konde', initials: 'MK', score: 710 },
    { id: 18, name: 'Saurabh Sharma', initials: 'SS', score: 695 },
    { id: 19, name: 'Ayush Pawar', initials: 'AP', score: 680 },
    { id: 20, name: 'Zeeshan Altaf Jagirdar', initials: 'ZJ', score: 665 },
    { id: 21, name: 'Bhavik Mahalle', initials: 'BM', score: 650 },
    { id: 22, name: 'Krrish Pardeshi', initials: 'KP', score: 635 },
    { id: 23, name: 'Sarthak Jadhav', initials: 'SJ', score: 620 },
    { id: 24, name: 'Abhishek Kalimath', initials: 'AK', score: 605 },
    { id: 25, name: 'Ruchita Suryawanshi', initials: 'RS', score: 590 },
    { id: 26, name: 'Shreyas Dambalkar', initials: 'SD', score: 575 },
    { id: 27, name: 'Sanket Devhare', initials: 'SD', score: 560 },
    { id: 28, name: 'Chaitanya Kulkarni', initials: 'CK', score: 545 },
    { id: 29, name: 'Adesh Phadtare', initials: 'AP', score: 530 },
    { id: 30, name: 'Prathamesh Devkar', initials: 'PD', score: 515 },
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
